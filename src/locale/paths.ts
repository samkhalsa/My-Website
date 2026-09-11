import { DEFAULT_LOCALE, isLocale, type Locale } from '../i18n'

/** Prefix an app path with the locale segment. English (the default) has no prefix. */
export function localePath(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path
  return path === '/' ? `/${locale}` : `/${locale}${path}`
}

/** Split a pathname into its locale and the locale-free app path. */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  const match = pathname.match(/^\/([a-z]{2})(?=\/|$)/)
  const seg = match?.[1]
  if (seg && isLocale(seg) && seg !== DEFAULT_LOCALE) {
    const rest = pathname.slice(seg.length + 1)
    return { locale: seg, path: rest === '' ? '/' : rest }
  }
  return { locale: DEFAULT_LOCALE, path: pathname }
}
