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
  // left cheek, top to bottom
  { label: 'Journal', href: '/journal', x: 44.0, y: 33.5, w: 4.2, h: 7.2, hotspot: true },
  { label: 'X', href: 'https://x.com/samitkhalsa', x: 42.9, y: 39.4, w: 3.2, h: 5.4, hotspot: true },
  { label: 'Penseum', href: 'https://penseum.com', x: 44.8, y: 45.4, w: 5.2, h: 10, hotspot: true },
  { label: 'Boba', href: '/journal', x: 42.6, y: 53.2, w: 3.6, h: 8.4, hotspot: true },
  // right cheek, top to bottom
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/heyimsamit/', x: 58.7, y: 44.2, w: 2.6, h: 4.4, hotspot: true },
  { label: 'Western University', href: 'https://www.uwo.ca/', x: 57.2, y: 48.2, w: 4.2, h: 6, hotspot: true },
  { label: 'Ivey', href: 'https://www.ivey.uwo.ca/', x: 57.6, y: 53.6, w: 3.2, h: 6, hotspot: true },
  { label: 'Digital Dash Dev', href: 'https://digitaldashdev.com', x: 53.9, y: 58.8, w: 2.8, h: 4.8, hotspot: true },
  { label: 'GitHub', href: 'https://github.com/samkhalsa', x: 56.3, y: 59.2, w: 2.8, h: 4.8, hotspot: true },
]
