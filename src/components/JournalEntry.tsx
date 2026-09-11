import { Link } from 'react-router'
import type { JournalEntry as Entry } from '../content/types'
import { pickText, pickTitle } from '../content/journal'
import { useLocale } from '../locale/useLocale'
import { localePath } from '../locale/paths'
import { JournalBody } from './JournalBody'
import { JournalPhotos } from './JournalPhotos'
import { LinkCard } from './LinkCard'
import { YouTubeEmbed } from './YouTubeEmbed'

export function JournalEntry({ entry, full = false, index = 0 }: { entry: Entry; full?: boolean; index?: number }) {
  const locale = useLocale()
  const title = pickTitle(entry, locale)
  const text = pickText(entry, locale)
  const permalink = localePath(`/journal/${entry.slug}`, locale)
  const alt = title ?? entry.date
  const Tag = full ? 'article' : 'li'
  const className = ['journal-entry', full ? 'journal-entry--full' : '', 'journal-entry--enter']
    .filter(Boolean)
    .join(' ')

  return (
    <Tag className={className} style={{ animationDelay: `${Math.min(index, 6) * 0.08}s` }}>
      <time dateTime={entry.dateTime} className="journal-date">
        <Link className="journal-permalink" to={permalink}>
          {entry.date}
        </Link>
      </time>
      {title ? (
        <p className="journal-entry-title">
          {full ? (
            title
          ) : (
            <Link className="underline" to={permalink}>
              {title}
            </Link>
          )}
        </p>
      ) : null}
      <JournalBody key={locale} text={text} clamp={!full} />
      {entry.links?.length ? (
        <div className="journal-link-cards">
          {entry.links.map((link) => (
            <LinkCard key={link.href} link={link} />
          ))}
        </div>
      ) : null}
      {entry.youtube ? (
        <YouTubeEmbed id={entry.youtube} title={alt} />
      ) : entry.photos?.length ? (
        <JournalPhotos photos={entry.photos} alt={alt} />
      ) : null}
    </Tag>
  )
}
