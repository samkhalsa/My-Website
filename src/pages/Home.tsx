import { FormattedMessage, useIntl } from 'react-intl'
import type { ReactNode } from 'react'
import { PENSEUM_URL } from '../content/site'
import { usePageTitle } from '../lib/usePageTitle'
import { LastSeen } from '../components/LastSeen'
import { Footer } from '../components/Footer'

export function Home() {
  const intl = useIntl()
  usePageTitle(intl.formatMessage({ id: 'title.home' }))
  const summit = intl.formatMessage({ id: 'home.summit' })
  return (
    <>
      <header className="big">
        <span>
          <FormattedMessage
            id="home.hero"
            values={{
              name: (chunks: ReactNode) => (
                <span className="name" data-tip={summit} tabIndex={0}>
                  {chunks}
                  <span className="summit" role="img" aria-label={summit}>
                    🏔️
                  </span>
                </span>
              ),
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
