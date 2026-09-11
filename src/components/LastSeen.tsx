import { FormattedMessage } from 'react-intl'
import { useLocale } from '../locale/useLocale'
import { useLastSeen } from '../lib/useLastSeen'
import { formatRelative } from '../lib/relativeTime'

export function LastSeen() {
  const locale = useLocale()
  const state = useLastSeen()

  if (state.status === 'error') return null
  if (state.status === 'loading') {
    return (
      <p className="loading">
        <FormattedMessage id="home.lastSeen.loading" />
      </p>
    )
  }

  const { venue, createdAt } = state.data
  const name = (locale === 'hi' && venue?.nameHi) || venue?.name
  const city = (locale === 'hi' && venue?.location?.cityHi) || venue?.location?.city
  const when = createdAt ? formatRelative(createdAt, locale) : ''

  return (
    <p className="last-seen">
      <FormattedMessage
        id="home.lastSeen"
        values={{
          venue: name ?? <FormattedMessage id="home.lastSeen.somewhere" />,
          city: city ?? <FormattedMessage id="home.lastSeen.thisUniverse" />,
          when: when || <FormattedMessage id="home.lastSeen.sometime" />,
        }}
      />
    </p>
  )
}
