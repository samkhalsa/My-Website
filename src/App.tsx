import { BrowserRouter, Route, Routes } from 'react-router'
import { MotionConfig } from 'motion/react'
import { DEFAULT_LOCALE, LOCALES } from './i18n'
import { LocaleProvider } from './locale/LocaleProvider'
import { Home } from './pages/Home'
import { Journal } from './pages/Journal'
import { Post } from './pages/Post'
import { NotFound } from './pages/NotFound'

export function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <Routes>
          {LOCALES.map((locale) => (
            <Route
              key={locale}
              path={locale === DEFAULT_LOCALE ? '/' : `/${locale}`}
              element={<LocaleProvider locale={locale} />}
            >
              <Route index element={<Home />} />
              <Route path="journal" element={<Journal />} />
              <Route path="journal/:slug" element={<Post />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          ))}
        </Routes>
      </MotionConfig>
    </BrowserRouter>
  )
}
