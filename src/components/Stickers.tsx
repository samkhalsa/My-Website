import { useLayoutEffect, useState, type CSSProperties, type ReactNode, type RefObject } from 'react'
import { Link } from 'react-router'
import { STICKERS, type Sticker } from '../content/stickers'
import { useLocale } from '../locale/useLocale'
import { localePath } from '../locale/paths'

/** Where `object-position` puts the image inside the hero; keep in sync with HeroScene. */
export const OBJECT_POSITION = { x: 0.5, y: 0.45 }

type Rect = { left: number; top: number; width: number; height: number }

/** The on-screen box of an `object-fit: cover` image inside `host`. */
function coverRect(host: HTMLElement, img: HTMLImageElement): Rect | null {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  if (!iw || !ih) return null
  const cw = host.clientWidth
  const ch = host.clientHeight
  const scale = Math.max(cw / iw, ch / ih)
  const width = iw * scale
  const height = ih * scale
  return { left: (cw - width) * OBJECT_POSITION.x, top: (ch - height) * OBJECT_POSITION.y, width, height }
}

function StickerLink({ s, className, style, children }: { s: Sticker; className: string; style: CSSProperties; children: ReactNode }) {
  const locale = useLocale()
  if (s.href.startsWith('/')) {
    return (
      <Link to={localePath(s.href, locale)} className={className} style={style} aria-label={s.label}>
        {children}
      </Link>
    )
  }
  return (
    <a href={s.href} className={className} style={style} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
      {children}
    </a>
  )
}

/**
 * Renders the project stickers positioned in image coordinates so they stay
 * on the face regardless of how the cover-fit crops the picture.
 */
export function Stickers({
  hostRef,
  imgRef,
  ready,
}: {
  hostRef: RefObject<HTMLElement | null>
  imgRef: RefObject<HTMLImageElement | null>
  ready: boolean
}) {
  const [rect, setRect] = useState<Rect | null>(null)

  useLayoutEffect(() => {
    const host = hostRef.current
    const img = imgRef.current
    if (!ready || !host || !img) return
    const measure = () => setRect(coverRect(host, img))
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(host)
    return () => observer.disconnect()
  }, [hostRef, imgRef, ready])

  if (!rect) return null

  return (
    <div
      className="stickers"
      style={
        {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          '--img-w': `${rect.width}px`,
        } as CSSProperties
      }
    >
      {STICKERS.map((s) => {
        const style = {
          '--x': `${s.x}%`,
          '--y': `${s.y}%`,
          '--w': s.w ?? 5,
          '--h': s.h ?? 5,
          '--r': `${s.rotate ?? 0}deg`,
          '--s': s.size ?? 1,
          '--bg': s.color ?? '#fff',
        } as CSSProperties
        if (s.hotspot) {
          return (
            <StickerLink key={s.label} s={s} className="sticker-hotspot" style={style}>
              <span className="sticker-hotspot-label">{s.label}</span>
            </StickerLink>
          )
        }
        return (
          <StickerLink key={s.label} s={s} className="sticker" style={style}>
            {s.emoji ? (
              <span className="sticker-emoji" aria-hidden="true">
                {s.emoji}
              </span>
            ) : null}
            {s.label}
          </StickerLink>
        )
      })}
    </div>
  )
}
