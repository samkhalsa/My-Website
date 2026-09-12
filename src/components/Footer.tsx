import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router'
import { CONTACT, MORE_HREF, PAST_WORK, SKILLS, SKILLS_MORE_HREF } from '../content/site'
import { useLocale } from '../locale/useLocale'
import { localePath } from '../locale/paths'
import { LangSwitcher } from './LangSwitcher'

function LinkList({
  titleId,
  items,
  moreHref,
}: {
  titleId: string
  items: { href: string; label: string }[]
  moreHref: string | null
}) {
  return (
    <div>
      <FormattedMessage id={titleId} />
      <ul className="v-list">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noopener noreferrer">
              {item.label}
            </a>
          </li>
        ))}
        {moreHref ? (
          <li>
            <a href={moreHref} target="_blank" rel="noopener noreferrer" className="more-link">
              <FormattedMessage id="footer.more" />
            </a>
          </li>
        ) : null}
      </ul>
    </div>
  )
}

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
        <LinkList titleId="footer.pastWork" items={PAST_WORK} moreHref={MORE_HREF} />
        <LinkList titleId="footer.skills" items={SKILLS} moreHref={SKILLS_MORE_HREF} />
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
