import { FormattedMessage, useIntl } from 'react-intl'
import { Link, useParams } from 'react-router'
import { findEntry, pickTitle } from '../content/journal'
import { useLocale } from '../locale/useLocale'
import { localePath } from '../locale/paths'
import { usePageTitle } from '../lib/usePageTitle'
import { PageTopNav } from '../components/PageTopNav'
import { JournalEntry } from '../components/JournalEntry'

export function Post() {
  const { slug = '' } = useParams()
  const locale = useLocale()
  const intl = useIntl()
  const entry = findEntry(slug)
  const journalTitle = intl.formatMessage({ id: 'title.journal' })
  const heading = entry ? (pickTitle(entry, locale) ?? entry.date) : intl.formatMessage({ id: 'journal.notFound' })
  usePageTitle(`${heading} — ${journalTitle}`)
  const backTo = localePath('/journal', locale)

  return (
    <>
      <PageTopNav />
      <header className="big journal-header">
        <Link to={backTo}>
          <FormattedMessage id="journal.title" />
        </Link>
      </header>
      <section className="small journal">
        {entry ? (
          <JournalEntry key={entry.id} entry={entry} full />
        ) : (
          <div className="journal-not-found">
            <p>
              <FormattedMessage id="journal.notFound" />
            </p>
          </div>
        )}
        <p className="journal-back">
          <Link className="journal-permalink" to={backTo}>
            ← <FormattedMessage id="journal.back" />
          </Link>
        </p>
      </section>
    </>
  )
}
