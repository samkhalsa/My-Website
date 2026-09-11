import { FormattedMessage } from 'react-intl'
import { Link, useLocation } from 'react-router'
import { useLocale } from '../locale/useLocale'
import { localePath, stripLocale } from '../locale/paths'

const ITEMS = [
  { to: '/', id: 'nav.home' },
  { to: '/journal', id: 'nav.journal' },
] as const

const isCurrent = (path: string, to: string) =>
  to === '/journal' ? path === '/journal' || path.startsWith('/journal/') : path === to

export function PageTopNav() {
  const locale = useLocale()
  const { path } = stripLocale(useLocation().pathname)
  return (
    <nav className="small page-top-nav">
      <ul className="h-list">
        {ITEMS.map((item) => {
          const current = isCurrent(path, item.to)
          return (
            <li key={item.to}>
              <Link
                to={localePath(item.to, locale)}
                className={current ? 'current' : undefined}
                aria-current={current ? 'page' : undefined}
              >
                <FormattedMessage id={item.id} />
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
