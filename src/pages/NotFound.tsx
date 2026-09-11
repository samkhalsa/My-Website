import { FormattedMessage, useIntl } from 'react-intl'
import { Link } from 'react-router'
import { useLocale } from '../locale/useLocale'
import { localePath } from '../locale/paths'
import { usePageTitle } from '../lib/usePageTitle'
import { PageTopNav } from '../components/PageTopNav'

export function NotFound() {
  const intl = useIntl()
  const locale = useLocale()
  usePageTitle(intl.formatMessage({ id: 'title.notFound' }))
  return (
    <>
      <PageTopNav />
      <header className="big journal-header">
        <FormattedMessage id="notFound.title" />
      </header>
      <section className="small">
        <p className="no-margins">
          <Link className="journal-permalink" to={localePath('/', locale)}>
            ← <FormattedMessage id="notFound.home" />
          </Link>
        </p>
      </section>
    </>
  )
}
