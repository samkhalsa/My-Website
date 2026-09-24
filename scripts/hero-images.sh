#!/usr/bin/env bash
# Generates responsive variants of the home hero scene.
#
#   public/hero/scene.jpg           -> required, landscape 16:9 (2400x1350 ideal)
#   public/hero/scene-portrait.jpg  -> portrait 9:16 for phones (1350x2400+). Without
#                                      it phones stretch the landscape image ~2-3x.
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
# Resamples by width (not -Z, which fits the longest side and would turn a
# portrait "528" into a 528px-TALL image while the srcset still says 528w).
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
    sips --resampleWidth "$w" "$src" --out "$DIR/$name-$w.jpg" >/dev/null
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

# Preload the WebP set the <picture> will pick so the browser fetches it before
# the JS runs. With a portrait set, each preload is gated on orientation so a
# phone doesn't download a landscape variant it never shows. Without one, the
# 16:9 scene is sized by height on portrait screens, so ask for 16/9 of the
# viewport height there (mirrors LANDSCAPE_SIZES in src/components/HeroScene.tsx).
preload() {  # name widths media sizes
  local name=$1 widths=$2 media=$3 sizes=$4 srcset="" w
  for w in $widths; do srcset+="/hero/$name-$w.webp ${w}w, "; done
  srcset=${srcset%, }
  printf '    <link rel="preload" as="image" type="image/webp"%s imagesrcset="%s" imagesizes="%s" />' \
    "${media:+ media=\"$media\"}" "$srcset" "$sizes"
}
line=""
if [ "$landscape" = true ] && [ "$portrait" = true ]; then
  line="$(preload scene-portrait "$pw" "(orientation: portrait)" "100vw")"
  line+=$'\n'"$(preload scene "$lw" "(orientation: landscape)" "100vw")"
elif [ "$landscape" = true ]; then
  line="$(preload scene "$lw" "" "(orientation: portrait) 178vh, 100vw")"
fi
perl -0pi -e "s#(<!-- hero-preload -->)\n.*?\n?(\s*<!-- /hero-preload -->)#\$1\n$line\n\$2#s" index.html
echo "  updated index.html preload"
