import { useIntl } from 'react-intl'
import { usePageTitle } from '../lib/usePageTitle'
import { HeroScene } from '../components/HeroScene'
import { LastSeen } from '../components/LastSeen'
import { Footer } from '../components/Footer'

export function Home() {
  const intl = useIntl()
  usePageTitle(intl.formatMessage({ id: 'title.home' }))
  return (
    <>
      <HeroScene />
      <section className="small">
        <LastSeen />
        <Footer />
      </section>
    </>
  )
}
