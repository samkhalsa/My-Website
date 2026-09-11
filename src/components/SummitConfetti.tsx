import { useEffect, useState } from 'react'

const STORAGE_KEY = 'summit-confetti-seen'
const COUNT = 40
const LIFETIME_MS = 7500

type Piece = { id: number; x: number; delay: number; dur: number; size: number; spin: number; sway: number }

function makePieces(): Piece[] {
  return Array.from({ length: COUNT }, (_, id) => ({
    id,
    x: Math.random() * 100,
    delay: Math.random() * 1.8,
    dur: 3.2 + Math.random() * 2.8,
    size: 1.1 + Math.random() * 1.7,
    spin: (Math.random() - 0.5) * 540,
    sway: 1.5 + Math.random() * 2.5,
  }))
}

/** Mountains fall like confetti the first time the site is opened in this browser. */
export function SummitConfetti() {
  const [pieces, setPieces] = useState<Piece[] | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    try {
      if (localStorage.getItem(STORAGE_KEY)) return
      localStorage.setItem(STORAGE_KEY, new Date().toISOString())
    } catch {
      return
    }
    setPieces(makePieces())
  }, [])

  useEffect(() => {
    if (!pieces) return
    const timer = window.setTimeout(() => setPieces(null), LIFETIME_MS)
    return () => window.clearTimeout(timer)
  }, [pieces])

  if (!pieces) return null

  return (
    <div className="summit-confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="summit-confetti-piece"
          style={
            {
              '--x': `${p.x}vw`,
              '--delay': `${p.delay}s`,
              '--dur': `${p.dur}s`,
              '--size': `${p.size}rem`,
              '--spin': `${p.spin}deg`,
              '--sway': `${p.sway}vw`,
            } as React.CSSProperties
          }
        >
          <span>🏔️</span>
        </span>
      ))}
    </div>
  )
}
