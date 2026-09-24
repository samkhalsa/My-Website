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

# Emits only widths the source can honour (never upscales); adds the source
# width itself when it falls between the presets. Echoes the widths used.
variants() {
  local name=$1 src=$2 srcw used=()
  srcw=$(sips -g pixelWidth "$src" | awk '/pixelWidth/ {print $2}')
  rm -f "$DIR/$name"-[0-9]*.jpg "$DIR/$name"-[0-9]*.webp
  for w in "${WIDTHS[@]}"; do
    [ "$w" -le "$srcw" ] && used+=("$w")
  done
  if [ "${#used[@]}" -eq 0 ] || [ "${used[0]}" -lt "$srcw" ]; then
    used=("$srcw" ${used[@]+"${used[@]}"})
  fi
  for w in "${used[@]}"; do
    sips -Z "$w" "$src" --out "$DIR/$name-$w.jpg" >/dev/null
    cwebp -quiet -q "$QUALITY" "$DIR/$name-$w.jpg" -o "$DIR/$name-$w.webp"
  done
  echo "  $name (source ${srcw}px): ${used[*]} (webp + jpg)" >&2
  echo "${used[*]}"
}

json_list() { local out="" w; for w in "$@"; do out+="$w, "; done; printf '[%s]' "${out%, }"; }

landscape=false
portrait=false
lw=""
pw=""

if [ -f "$DIR/scene.jpg" ]; then
  echo "landscape:"
  lw=$(variants scene "$DIR/scene.jpg")
  sips -Z 32 "$DIR/scene.jpg" --out "$DIR/scene-blur.jpg" >/dev/null
  landscape=true
else
  echo "no $DIR/scene.jpg found; hero will show the placeholder"
  rm -f "$DIR"/scene-*.jpg "$DIR"/scene-*.webp
fi

if [ -f "$DIR/scene-portrait.jpg" ]; then
  echo "portrait:"
  pw=$(variants scene-portrait "$DIR/scene-portrait.jpg")
  portrait=true
fi

# shellcheck disable=SC2086
printf '{ "landscape": %s, "portrait": %s, "widths": %s, "portraitWidths": %s }\n' \
  "$landscape" "$portrait" "$(json_list $lw)" "$(json_list $pw)" > src/content/hero.json
echo "  wrote src/content/hero.json"

# Preload the landscape WebP set so the browser fetches it before the JS runs.
if [ "$landscape" = true ]; then
  srcset=""
  for w in $lw; do srcset+="/hero/scene-$w.webp ${w}w, "; done
  srcset=${srcset%, }
  line="    <link rel=\"preload\" as=\"image\" type=\"image/webp\" imagesrcset=\"$srcset\" imagesizes=\"100vw\" />"
else
  line=""
fi
perl -0pi -e "s#(<!-- hero-preload -->)\n.*?\n?(\s*<!-- /hero-preload -->)#\$1\n$line\n\$2#s" index.html
echo "  updated index.html preload"
