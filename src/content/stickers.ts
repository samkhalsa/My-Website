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

export const STICKERS: Sticker[] = [
  // left cheek
  { label: 'Journal', href: '/journal', x: 42.9, y: 41.7, w: 3.8, h: 6.4, hotspot: true },
  { label: 'X', href: 'https://x.com/samitkhalsa', x: 46.2, y: 42.5, w: 3, h: 5, hotspot: true },
  { label: 'Penseum', href: 'https://penseum.com', x: 45.0, y: 47.3, w: 4.2, h: 7.6, hotspot: true },
  { label: 'Boba', href: '/journal', x: 43.3, y: 51.6, w: 3, h: 8, hotspot: true },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/heyimsamit/', x: 46.2, y: 52.4, w: 2.8, h: 4.8, hotspot: true },
  // right cheek
  { label: 'Western University', href: 'https://www.uwo.ca/', x: 56.2, y: 40.9, w: 4.2, h: 6, hotspot: true },
  { label: 'Digital Dash Dev', href: 'https://digitaldashdev.com', x: 56.7, y: 46.8, w: 3, h: 5, hotspot: true },
  { label: 'GitHub', href: 'https://github.com/samkhalsa', x: 56.1, y: 51.8, w: 3, h: 5, hotspot: true },
]
