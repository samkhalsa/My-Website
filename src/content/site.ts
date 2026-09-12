/** Set this to the custom domain once it is attached in Vercel (used for canonical metadata). */
export const SITE_URL = 'https://samits.life'

export const PENSEUM_URL = 'https://penseum.com'

/** Shown under "PAST WORK" in the footer. Fill in as needed. */
export const PAST_WORK: { href: string; label: string }[] = [
  { href: 'https://doppel.health/', label: 'Doppel Health' },
  { href: 'https://digitaldashdev.com', label: 'Digital Dash Dev' },
]

/** Optional "More" link at the end of the past-work list. */
export const MORE_HREF: string | null = null

/** Shown under "SKILLS & REPOS" in the footer: Claude Code skills, open-source repos, tools. */
export const SKILLS: { href: string; label: string }[] = [
  { href: 'https://github.com/samkhalsa/creator-scraper', label: 'Creator Scraper' },
  { href: 'https://github.com/samkhalsa/health-brain-starter', label: 'Health Brain Starter' },
]

/** Optional "More" link at the end of the skills list. */
export const SKILLS_MORE_HREF: string | null = 'https://github.com/samkhalsa'

export const CONTACT = [
  { id: 'contact.x', href: 'https://x.com/samitkhalsa', emoji: '🐦' },
  { id: 'contact.linkedin', href: 'https://www.linkedin.com/in/heyimsamit/', emoji: '💼' },
  { id: 'contact.github', href: 'https://github.com/samkhalsa', emoji: '🐙' },
] as const
