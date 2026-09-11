import { FormattedMessage, useIntl } from 'react-intl'
import { entries } from '../content/journal'
import { usePageTitle } from '../lib/usePageTitle'
import { PageTopNav } from '../components/PageTopNav'
import { JournalEntry } from '../components/JournalEntry'
import { ScrollToTopButton } from '../components/ScrollToTopButton'

export function Journal() {
  const intl = useIntl()
  usePageTitle(intl.formatMessage({ id: 'title.journal' }))
  return (
    <>
      <PageTopNav />
      <header className="big journal-header">
        <FormattedMessage id="journal.title" />
      </header>
      <section className="small journal">
        <ul className="journal-entries">
          {entries.map((entry, i) => (
            <JournalEntry key={entry.id} entry={entry} index={i} />
          ))}
        </ul>
      </section>
      <ScrollToTopButton />
    </>
  )
}
