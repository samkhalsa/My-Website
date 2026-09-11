import type { JournalLink } from '../content/types'

export function LinkCard({ link }: { link: JournalLink }) {
  return (
    <a className="journal-link-card" href={link.href} target="_blank" rel="noopener noreferrer">
      {link.image ? <img src={link.image} alt="" loading="lazy" /> : null}
      <span className="journal-link-card-title">{link.title}</span>
    </a>
  )
}
