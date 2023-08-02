#!/bin/bash
# uvcorchestra.com/scripts/generateSitemap.sh
# Created by Alexander Burdiss 8/2/23
# Copyright (c) Alexander Burdiss
#
# A simple sitemap generator.
#

version="1.0.0"
projectName="uvcorchestra.com"
# Files to ignore from the sitemap
ignoredFiles=(
  "./404.html"
)

# Get the current path and ensure that the script is ran from the right place.
dirname=$(pwd)
# enable +(...) glob syntax
shopt -s extglob
# trim however many trailing slashes exist
currentPath=${dirname%%+(/)}
# remove everything before the last / that still remains
currentPath=${currentPath##*/}
# correct for dirname=/ case
currentPath=${currentPath:-/}
if [ "$currentPath" != "$projectName" ]; then
    echo
    echo "Error: Script not ran from correct directory. Please run from the root directory using \`./scripts/bundlejs.sh\`"
    echo
    exit 1
fi

sitemapfile=sitemap.xml
touch $sitemapfile
now=$(date +%F)

echo "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" > $sitemapfile
echo "<!-- created with generateSitemap.sh v$version $now -->" >> $sitemapfile
echo "<urlset" >> $sitemapfile
echo "  xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"" >> $sitemapfile
echo "  xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\"" >> $sitemapfile
echo "  xsi:schemaLocation=\"http://www.sitemaps.org/schemas/sitemap/0.9" >> $sitemapfile
echo "            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd\"" >> $sitemapfile
echo ">" >> $sitemapfile

# Map over all the URLs and add them to the sitemap.
# get all file names in project
filenames=()
while IFS=  read -r -d $'\0'; do
    filenames+=("$REPLY")
done < <(find . -name '*.html' -print0)

for i in "${filenames[@]}"; do
  if [[ ! " ${ignoredFiles[*]} " =~ " ${i} " ]]; then
      # whatever you want to do when array doesn't contain value
      # echo $i;
      temp_var="${i#.}"
      path="${temp_var%index.html}"
      priority="0.80";
      if [[ $path == "/" ]]; then
        priority="1.00"
      fi
      echo "  <url>" >> $sitemapfile
      echo "    <loc>https://uvcorchestra.com$path</loc>" >> $sitemapfile
      echo "    <lastmod>$now</lastmod>" >> $sitemapfile
      echo "    <priority>$priority</priority>" >> $sitemapfile
      echo "  </url>" >> $sitemapfile
  fi
done

echo "</urlset>" >> $sitemapfile

echo "Sitemap Generated"