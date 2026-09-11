import { FormattedMessage, useIntl } from 'react-intl'
import type { ReactNode } from 'react'
import { PENSEUM_URL } from '../content/site'
import { usePageTitle } from '../lib/usePageTitle'
import { LastSeen } from '../components/LastSeen'
import { Footer } from '../components/Footer'

export function Home() {
  const intl = useIntl()
  usePageTitle(intl.formatMessage({ id: 'title.home' }))
  return (
    <>
      <header className="big">
        <span>
          <FormattedMessage
            id="home.hero"
            values={{
              u: (chunks: ReactNode) => (
                <a className="underline" href={PENSEUM_URL} target="_blank" rel="noopener noreferrer">
                  {chunks}
                </a>
              ),
            }}
          />
        </span>
      </header>
      <section className="small">
        <LastSeen />
        <Footer />
      </section>
    </>
  )
}
