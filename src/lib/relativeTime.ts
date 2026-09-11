import type { Locale } from '../i18n'

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 31536000],
  ['month', 2592000],
  ['week', 604800],
  ['day', 86400],
  ['hour', 3600],
  ['minute', 60],
]

/** "2 days ago" / "2 दिन पहले" for an ISO timestamp. */
export function formatRelative(iso: string, locale: Locale, now = Date.now()): string {
  const diff = (Date.parse(iso) - now) / 1000
  if (Number.isNaN(diff)) return ''
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  for (const [unit, seconds] of UNITS) {
    if (Math.abs(diff) >= seconds) return rtf.format(Math.round(diff / seconds), unit)
  }
  return rtf.format(0, 'second')
}
