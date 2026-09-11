import raw from './journal.json'
import type { JournalEntry } from './types'
import type { Locale } from '../i18n'

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const all = raw as JournalEntry[]
const seen = new Set<string>()
for (const entry of all) {
  if (!SLUG_RE.test(entry.slug)) throw new Error(`journal: bad slug "${entry.slug}"`)
  if (seen.has(entry.slug)) throw new Error(`journal: duplicate slug "${entry.slug}"`)
  seen.add(entry.slug)
}

/** All entries, newest first. */
export const entries: JournalEntry[] = [...all].sort((a, b) =>
  a.dateTime < b.dateTime ? 1 : a.dateTime > b.dateTime ? -1 : 0,
)

export const findEntry = (slug: string) => entries.find((e) => e.slug === slug)

export const pickText = (e: JournalEntry, locale: Locale) => (locale === 'hi' && e.textHi) || e.text
export const pickTitle = (e: JournalEntry, locale: Locale) => (locale === 'hi' && e.titleHi) || e.title
