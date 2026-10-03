#!/bin/sh
# Assembles the static site into dist/. Large pages are stored in _parts/ as
# line-split chunks (the repo was populated through an API with a per-request size limit).
set -e
rm -rf dist && mkdir -p dist
cp index.html dist/ && cp -r assets dist/
for f in webvan/index.html webvan/page.js radioshack/index.html radioshack/page.js pets-com/index.html pets-com/page.js pets-com/map-bay.svg; do
  mkdir -p "dist/$(dirname "$f")"
  if [ -f "$f" ]; then cp "$f" "dist/$f"; else cat _parts/$(echo "$f" | tr / _).* > "dist/$f"; fi
done
ls -R dist
