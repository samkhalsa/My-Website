import { en } from './en'
import { hi } from './hi'

export const LOCALES = ['en', 'hi'] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'en'

export const messages: Record<Locale, Record<string, string>> = { en, hi }

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}
