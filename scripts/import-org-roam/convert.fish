#!/usr/bin/env fish

set zettleDir "../../content/zettelkasten/"

rm -rf $zettleDir
mkdir $zettleDir

for full_path_file in (fd .org /home/andrea/Dropbox/org-roam/)
  set file_name (echo $full_path_file | rut -r ".*?/org-roam/(.*?)\.org" -t "{{1}}")
  set mod_time (stat $full_path_file | grep Modify | rut -r "Modify: (.*?)\..*" -t "{{1}}")
  set output_path $zettleDir/$file_name.mdx
  set raw_tags (cat $full_path_file | grep "#+roam_tags:" | rut -d "#+roam_tags: " -f 2 | string split " ")

  set tags ""
  for t in $raw_tags
    set tags $tags "--variable tags="$t
  end

  set tags (echo $tags)

  set pandoc_command 'pandoc --from org --to markdown \
          --template markdown.template '$tags' \
          --variable wid="WID:'$file_name'" \
          --variable last_modified_date="'$mod_time'" \
          '$full_path_file' | \
        sed -re "s/\]\(20/\]\(WID:20/" | 
        sed -re "s/\.org\)/\)/g"'
 
  eval $pandoc_command  > $output_path

end 
