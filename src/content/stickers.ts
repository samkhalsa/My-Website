/**
 * Stickers placed on the hero portrait. `x` / `y` are percentages of the
 * source image (0–100, measured from its top-left), so they stay glued to
 * the face at every viewport size. `rotate` in degrees, `size` scales the
 * sticker relative to the image width (1 = default).
 */
export type Sticker = {
  label: string
  href: string
  x: number
  y: number
  rotate?: number
  size?: number
  /** Optional leading emoji. */
  emoji?: string
  /** Background colour; default white. */
  color?: string
}

export const STICKERS: Sticker[] = [
  { label: 'Penseum', href: 'https://penseum.com', x: 50, y: 46, rotate: -8, size: 1.25, color: '#ffe600' },
  { label: 'Doppel Health', href: 'https://doppel.health/', x: 38, y: 40, rotate: 10, emoji: '🩺' },
  { label: 'Digital Dash Dev', href: 'https://digitaldashdev.com', x: 62, y: 40, rotate: -12, emoji: '⚡' },
  { label: 'Creator Scraper', href: 'https://github.com/samkhalsa/creator-scraper', x: 40, y: 52, rotate: 6, emoji: '🎯' },
  { label: 'Health Brain', href: 'https://github.com/samkhalsa/health-brain-starter', x: 61, y: 53, rotate: -5, emoji: '🧠' },
  { label: 'summit', href: '#', x: 50, y: 31, rotate: 4, emoji: '🏔️', size: 0.9 },
]
