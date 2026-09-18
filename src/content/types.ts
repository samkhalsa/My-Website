export type JournalLink = { href: string; title: string; image?: string }

export type JournalEntry = {
  id: string
  /** Hand-written, stable permalink segment: lowercase letters, digits, hyphens. */
  slug: string
  /** Display date, e.g. "2026.09.11". */
  date: string
  /** ISO date used for sorting and <time dateTime>, e.g. "2026-09-11". */
  dateTime: string
  title?: string
  titleHi?: string
  text: string
  textHi?: string
  /** Absolute paths under /public, e.g. "/journal/2026-09-11-1.jpg". */
  photos?: string[]
  /** YouTube video id. */
  youtube?: string
  links?: JournalLink[]
}

export type LastSeen = {
  venue?: {
    /** Phrase that follows "Was seen ..."; carries its own preposition, e.g. "at a birthday party", "tinkering with Jev". */
    name?: string
    nameHi?: string
    location?: { city?: string; cityHi?: string }
  }
  createdAt?: string
}
