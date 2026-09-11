import { useCallback, useState } from 'react'
import { PhotoOverlay } from './PhotoOverlay'

export function JournalPhotos({ photos, alt }: { photos: string[]; alt: string }) {
  const [zoomed, setZoomed] = useState<string | null>(null)
  const close = useCallback(() => setZoomed(null), [])
  return (
    <>
      <div className="journal-photos">
        {photos.map((src) => (
          <button key={src} type="button" className="journal-photo-btn" onClick={() => setZoomed(src)}>
            <img className="journal-photo" src={src} alt={alt} loading="lazy" />
          </button>
        ))}
      </div>
      <PhotoOverlay src={zoomed} alt={alt} onClose={close} />
    </>
  )
}
