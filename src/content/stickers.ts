/**
 * Clickable stickers on the hero portrait. Coordinates are percentages of the
 * source image (0–100 from its top-left), so they stay glued to the face at
 * every viewport size. `w` / `h` are the sticker's size as a percentage of
 * the image width. Measured against public/hero/scene.jpg (1672×941).
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

export const STICKERS: Sticker[] = [
  { label: 'Penseum', href: 'https://penseum.com', x: 42.6, y: 48.2, w: 7, h: 13.5, hotspot: true },
  { label: 'Doppel Health', href: 'https://doppel.health/', x: 55.2, y: 65, w: 3.6, h: 6.4, hotspot: true },
  { label: 'Western University', href: 'https://www.uwo.ca/', x: 58.4, y: 52, w: 5.2, h: 8.6, hotspot: true },
  { label: 'Ivey', href: 'https://www.ivey.uwo.ca/', x: 58.3, y: 59.3, w: 3.6, h: 6, hotspot: true },
  { label: 'Journal', href: '/journal', x: 43.2, y: 35.2, w: 4.2, h: 7.4, hotspot: true },
]
