import { createContext, useEffect } from 'react'
import { IntlProvider } from 'react-intl'
import { Outlet, useLocation } from 'react-router'
import { DEFAULT_LOCALE, messages, type Locale } from '../i18n'

export const LocaleContext = createContext<Locale>(DEFAULT_LOCALE)

export function LocaleProvider({ locale }: { locale: Locale }) {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <LocaleContext value={locale}>
      <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={DEFAULT_LOCALE}>
        <div className={locale}>
          <Outlet />
        </div>
      </IntlProvider>
    </LocaleContext>
  )
}
