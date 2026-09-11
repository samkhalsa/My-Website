import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { CONTACT, MORE_HREF, PAST_WORK } from '../content/site'
import { useLocale } from '../locale/useLocale'
import { localePath } from '../locale/paths'
import { LangSwitcher } from './LangSwitcher'

export function Footer() {
  const locale = useLocale()
  return (
    <>
      <footer>
        <div>
          <p className="no-margins">
            <Link to={localePath('/journal', locale)}>
              <FormattedMessage id="footer.readJournal" />{' '}
            </Link>
          </p>
        </div>
        <div>
          <FormattedMessage id="footer.pastWork" />
          <ul className="v-list">
            {PAST_WORK.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
            {MORE_HREF ? (
              <li>
                <a href={MORE_HREF} target="_blank" rel="noopener noreferrer" className="more-link">
                  <FormattedMessage id="footer.more" />
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      </footer>
      <footer>
        <div>
          <ul className="h-list contact">
            {CONTACT.map((c) => (
              <li key={c.href}>
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  <span className="emoji" aria-hidden="true">
                    {c.emoji}
                  </span>
                  <FormattedMessage id={c.id} />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <LangSwitcher />
        </div>
      </footer>
    </>
  )
}
