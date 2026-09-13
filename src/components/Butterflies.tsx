import type { CSSProperties } from 'react'

type Spec = {
  x: string
  y: string
  dx: string
  dy: string
  dur: string
  delay: string
  flap: string
  scale: number
  mobile?: boolean
}

// Right third of the frame, like the reference. `mobile: false` hides one on phones.
const SPECS: Spec[] = [
  { x: '78%', y: '38%', dx: '9vw', dy: '6vh', dur: '26s', delay: '0s', flap: '.34s', scale: 1 },
  { x: '86%', y: '50%', dx: '-7vw', dy: '8vh', dur: '21s', delay: '-9s', flap: '.4s', scale: 0.8 },
  { x: '70%', y: '58%', dx: '6vw', dy: '-9vh', dur: '30s', delay: '-16s', flap: '.37s', scale: 0.65, mobile: false },
]

function Wing({ side }: { side: 'left' | 'right' }) {
  // Forewing + hindwing of a monarch; the right wing is the left one mirrored.
  return (
    <svg className={`butterfly-wing butterfly-wing--${side}`} viewBox="0 0 12 24" aria-hidden="true">
      <g transform={side === 'right' ? 'scale(-1 1) translate(-12 0)' : undefined}>
        <path
          d="M12 12 C 9.5 4.5, 2.5 3, 1 7.5 C 0.2 10.5, 4 12, 7.5 12 C 4 12.6, 0.8 14.8, 1.8 18.6 C 3.2 22.4, 9 19.8, 12 13.4 Z"
          fill="#f28c28"
          stroke="#1a1a1a"
          strokeWidth=".9"
          strokeLinejoin="round"
        />
        <path d="M12 12 L 3 7.6 M12 12 L 2.4 11.4 M12 12.6 L 3 17.4" stroke="#1a1a1a" strokeWidth=".6" fill="none" />
        <path d="M1.6 9.2 l1.2 -.3 M1.2 16.4 l1.3 .3" stroke="#fff" strokeWidth=".7" strokeLinecap="round" />
      </g>
    </svg>
  )
}

export function Butterflies() {
  return (
    <div className="butterflies" aria-hidden="true">
      {SPECS.map((s, i) => (
        <span
          key={i}
          className={`butterfly${s.mobile === false ? ' butterfly--desktop' : ''}`}
          style={
            {
              '--x': s.x,
              '--y': s.y,
              '--dx': s.dx,
              '--dy': s.dy,
              '--dur': s.dur,
              '--delay': s.delay,
              '--flap': s.flap,
              '--scale': s.scale,
            } as CSSProperties
          }
        >
          <span className="butterfly-body">
            <Wing side="left" />
            <span className="butterfly-thorax" />
            <Wing side="right" />
          </span>
        </span>
      ))}
    </div>
  )
}
