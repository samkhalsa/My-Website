import { useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export function PhotoOverlay({ src, alt, onClose }: { src: string | null; alt: string; onClose: () => void }) {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!src) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [src, onClose])

  return (
    <AnimatePresence>
      {src ? (
        <motion.div
          className="journal-photo-zoom"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
        >
          <div className="journal-photo-zoom-backdrop" />
          <div className="journal-photo-zoom-stage">
            <img src={src} alt={alt} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
