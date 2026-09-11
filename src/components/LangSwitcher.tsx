import { Link, useLocation } from 'react-router'
import { LOCALES, type Locale } from '../i18n'
import { useLocale } from '../locale/useLocale'
import { localePath, stripLocale } from '../locale/paths'

const LABELS: Record<Locale, string> = { en: 'EN', hi: 'हि' }

export function LangSwitcher() {
  const locale = useLocale()
  const { path } = stripLocale(useLocation().pathname)
  return (
    <ul className="h-list lang-switcher">
      {LOCALES.map((l) => (
        <li key={l}>
          <Link to={localePath(path, l)} className={l === locale ? 'current' : undefined} lang={l} hrefLang={l}>
            {LABELS[l]}
          </Link>
        </li>
      ))}
    </ul>
  )
}
