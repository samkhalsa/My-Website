import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { FormattedMessage } from 'react-intl'

const CLAMP_EM = 7.25
const EASE: [number, number, number, number] = [0.075, 0.82, 0.165, 1]
const URL_RE = /(https?:\/\/[^\s<]+[^\s<.,;:!?)\]])/g

/** Renders plain text, turning bare URLs into links. */
function Linkify({ text }: { text: string }): ReactNode {
  const parts = text.split(URL_RE)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} className="underline" href={part} target="_blank" rel="noopener noreferrer">
        {part.replace(/^https?:\/\//, '')}
      </a>
    ) : (
      part
    ),
  )
}

export function JournalBody({ text, clamp = true }: { text: string; clamp?: boolean }) {
  const ref = useRef<HTMLParagraphElement>(null)
  // null means the text fits within the clamp height and needs no "read more".
  const [clampPx, setClampPx] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)
  // Only animate after the reader toggles; the initial clamp must be instant.
  const [interacted, setInteracted] = useState(false)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    if (!clamp) return
    const el = ref.current
    if (!el) return
    const measure = () => {
      if (!el.isConnected) return
      const px = CLAMP_EM * parseFloat(getComputedStyle(el).fontSize)
      setClampPx(el.scrollHeight > px + 1 ? px : null)
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [clamp, text])

  const body = (
    <p ref={ref} className="journal-body journal-body--pre">
      <Linkify text={text} />
    </p>
  )

  if (!clamp) return body

  const clamped = clampPx !== null && !expanded
  const duration = reduced || !interacted ? 0 : 0.45

  return (
    <>
      <motion.div
        className="journal-body-expand"
        initial={false}
        animate={{ height: clamped ? clampPx : 'auto' }}
        transition={{ duration, ease: EASE }}
      >
        {body}
        {clampPx !== null ? (
          <motion.div
            className="journal-body-expand-fade"
            initial={false}
            animate={{ opacity: expanded ? 0 : 1 }}
            transition={{ duration: duration && 0.3 }}
          />
        ) : null}
      </motion.div>
      {clampPx !== null ? (
        <p className="journal-read-more">
          <button
            type="button"
            className="journal-more-btn"
            aria-expanded={expanded}
            onClick={() => {
              setInteracted(true)
              setExpanded((v) => !v)
            }}
          >
            <FormattedMessage id={expanded ? 'journal.readLess' : 'journal.readMore'} />
          </button>
        </p>
      ) : null}
    </>
  )
}
