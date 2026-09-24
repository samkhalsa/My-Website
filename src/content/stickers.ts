/**
 * Clickable stickers on the hero portrait. Coordinates are percentages of the
 * landscape source image (0–100 from its top-left), so they stay glued to the
 * face at every viewport size. `w` / `h` are the sticker's size as a
 * percentage of the image width. Measured against public/hero/scene.jpg
 * (1672×941).
 *
 * A sticker with `hotspot: true` is invisible until hovered (the picture
 * already shows the sticker); without it, a white label sticker is drawn.
 */
export type Sticker = {
  label: string
  href: string
  x: number
  y: number
  w?: number
  h?: number
  rotate?: number
  size?: number
  hotspot?: boolean
  emoji?: string
  color?: string
}

/**
 * How scene-portrait.jpg is cut from scene.jpg (see scripts/hero-images.sh):
 * a crop at (x, y) of size w×h from the source, then padded to `padH` tall.
 * Used to translate the coordinates above onto the portrait image.
 */
export const PORTRAIT_CROP = { x: 576, y: 0, w: 528, h: 940, padH: 1176, srcW: 1672, srcH: 941 }

// No painted stickers on the current (grass hill) image. Add entries here
// when the picture has something worth linking; see the type above.
export const STICKERS: Sticker[] = []
