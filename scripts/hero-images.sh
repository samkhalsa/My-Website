#!/usr/bin/env bash
# Generates responsive variants of the home hero scene.
#
#   public/hero/scene.jpg           -> required, landscape 16:9 (2400x1350 ideal)
#   public/hero/scene-portrait.jpg  -> optional, portrait 9:16 for phones
#
# Writes scene-{w}.webp / scene-{w}.jpg (and -portrait- variants), a tiny
# scene-blur.jpg placeholder, updates src/content/hero.json and the preload
# link in index.html. Run with:  npm run hero
set -euo pipefail

cd "$(dirname "$0")/.."
DIR=public/hero
WIDTHS=(2400 1600 1000 640)
QUALITY=82

command -v cwebp >/dev/null || { echo "cwebp not found (brew install webp)"; exit 1; }

variants() {
  local name=$1 src=$2
  for w in "${WIDTHS[@]}"; do
    sips -Z "$w" "$src" --out "$DIR/$name-$w.jpg" >/dev/null
    cwebp -quiet -q "$QUALITY" "$DIR/$name-$w.jpg" -o "$DIR/$name-$w.webp"
  done
  echo "  $name: ${WIDTHS[*]} (webp + jpg)"
}

landscape=false
portrait=false

if [ -f "$DIR/scene.jpg" ]; then
  echo "landscape:"
  variants scene "$DIR/scene.jpg"
  sips -Z 32 "$DIR/scene.jpg" --out "$DIR/scene-blur.jpg" >/dev/null
  landscape=true
else
  echo "no $DIR/scene.jpg found; hero will show the placeholder"
fi

if [ -f "$DIR/scene-portrait.jpg" ]; then
  echo "portrait:"
  variants scene-portrait "$DIR/scene-portrait.jpg"
  portrait=true
fi

printf '{ "landscape": %s, "portrait": %s }\n' "$landscape" "$portrait" > src/content/hero.json
echo "  wrote src/content/hero.json"

# Preload the landscape WebP set so the browser fetches it before the JS runs.
if [ "$landscape" = true ]; then
  srcset=""
  for w in "${WIDTHS[@]}"; do srcset+="/hero/scene-$w.webp ${w}w, "; done
  srcset=${srcset%, }
  line="    <link rel=\"preload\" as=\"image\" type=\"image/webp\" imagesrcset=\"$srcset\" imagesizes=\"100vw\" />"
else
  line=""
fi
perl -0pi -e "s#(<!-- hero-preload -->)\n.*?\n?(\s*<!-- /hero-preload -->)#\$1\n$line\n\$2#s" index.html
echo "  updated index.html preload"
