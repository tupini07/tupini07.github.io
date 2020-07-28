#!/usr/bin/env fish

set zettleDir "../../content/zettelkasten/"

rm -rf $zettleDir
mkdir $zettleDir

for full_path_file in (fd .org /home/andrea/Dropbox/org-roam/)
  set file_name (echo $full_path_file | rut -r ".*?/org-roam/(.*?)\.org" -t "{{1}}")
  set mod_time (stat $full_path_file | grep Modify | rut -r "Modify: (.*?)\..*" -t "{{1}}")
  set output_path $zettleDir/$file_name.mdx

  pandoc --from org \
    --to markdown \
    --template markdown.template  \
    --variable tags=tag1 \
    --variable tags=tag2 \
    --variable tags=tag3 \
    --variable wid="WID:"$file_name \
    --variable last_modified_date=$mod_time \
    $full_path_file | \
  sed -re 's/\]\(20/\]\(WID:20/' | 
  sed -re 's/\.org\)/\)/g' > $output_path

end 
