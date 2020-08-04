#!/usr/bin/env python
import os
from pathlib import Path
from datetime import datetime
from typing import Union, List
import requests
import tqdm

ZETTLDIR = "../../content/zettelkasten/"
ORG_ROAM_DIR = "/home/andrea/Dropbox/org-roam/"


def get_file_metadata(file_path: str, meta_name: str, raw=False) -> str:
    meta_real_name = f"#+{meta_name}: "
    with open(file_path, "r") as file:
        relevant_line = [x for x in file.readlines() if meta_name in x]
        if len(relevant_line) == 0:
            return None

        meta_value: str = relevant_line[0].split(
            meta_real_name)[1].replace("\n", "")

        if " " in meta_value:
            meta_value = meta_value.split(" ")

        if raw:
            return meta_value
        else:
            return marshall_metadata_to_pandoc_variable(meta_name, meta_value)


def marshall_metadata_to_pandoc_variable(var_name: str, metadata: Union[str, List[str]]) -> str:
    def variabilize(xd): return f'--variable {var_name}="{xd}"' if xd else ' '

    if type(metadata) == list:
        return " ".join(variabilize(x) for x in metadata)
    else:
        return variabilize(metadata)


if __name__ == "__main__":
    os.system(f'rm -rf {ZETTLDIR}')
    os.system(f'mkdir {ZETTLDIR}')

    for ffile_path in tqdm.tqdm([x for x in os.listdir(ORG_ROAM_DIR) if x.endswith(".org")]):
        raw_fpath = ORG_ROAM_DIR + ffile_path
        f_path = Path(raw_fpath)
        f_stats = f_path.stat()

        f_name = f_path.stem
        mod_time = datetime.fromtimestamp(f_stats.st_mtime)
        output_path = f"{ZETTLDIR}{f_name}.mdx"

        variables = " ".join(x for x in
                             [get_file_metadata(raw_fpath, y) for y in [
                                 "roam_tags",
                                 "external_reference",
                                 "wikidata_entity"
                             ]]
                             if x is not None
                             )

        wikidata_entity = get_file_metadata(
            raw_fpath, "wikidata_entity", raw=True)
        if wikidata_entity and wikidata_entity != 'null':
            # get the title of the respective wikipedia page
            respective_wp_entity_response: str = requests.get(
                f"https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&props=sitelinks&ids={wikidata_entity}&sitefilter=enwiki"
            ).json()

            try:
                respective_wp_entity = respective_wp_entity_response[
                    "entities"][wikidata_entity]["sitelinks"]["enwiki"]["title"]

                variables += f' --variable wikipedia_link="https://en.wikipedia.org/wiki/{respective_wp_entity}"'
            except KeyError:
                print(f"Didn't find a corresponding wikipedia entry for entity '{wikidata_entity}'. File: {f_name}")

        os.system('pandoc --from org --to markdown '
                  '--template markdown.template '
                  f'--variable wid="WID:{f_name}" '
                  f'--variable last_modified_date="{mod_time.isoformat()}" '
                  f'{variables} '
                  f'{f_path.absolute()} | '
                  f'sed -re "s/\]\(20/\]\(WID:20/" | sed -re "s/\.org\)/\)/g" '
                  f'> {output_path}')
