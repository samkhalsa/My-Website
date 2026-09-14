import { useState, type ReactNode } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { PENSEUM_URL } from '../content/site'
import hero from '../content/hero.json'

const srcSet = (name: string, widths: number[], ext: 'webp' | 'jpg') =>
  widths.map((w) => `/hero/${name}-${w}.${ext} ${w}w`).join(', ')
// Middle preset as the plain fallback src (or the largest if there are fewer).
const fallback = (widths: number[]) => widths[Math.min(1, widths.length - 1)]

/** Full-screen home page: the grass-hill scene with the site line and footer over it. */
export function HeroScene({ children }: { children?: ReactNode }) {
  const intl = useIntl()
  const summit = intl.formatMessage({ id: 'home.summit' })
  const [loaded, setLoaded] = useState(false)

  return (
    <header className={`big hero-scene${hero.landscape ? '' : ' hero-scene--placeholder'}`}>
      {hero.landscape ? (
        <picture className="hero-scene-media">
          {hero.portrait ? (
            <>
              <source media="(orientation: portrait)" type="image/webp" srcSet={srcSet('scene-portrait', hero.portraitWidths, 'webp')} sizes="100vw" />
              <source media="(orientation: portrait)" type="image/jpeg" srcSet={srcSet('scene-portrait', hero.portraitWidths, 'jpg')} sizes="100vw" />
            </>
          ) : null}
          <source type="image/webp" srcSet={srcSet('scene', hero.widths, 'webp')} sizes="100vw" />
          <img
            src={`/hero/scene-${fallback(hero.widths)}.jpg`}
            srcSet={srcSet('scene', hero.widths, 'jpg')}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            className={loaded ? 'is-loaded' : undefined}
            onLoad={() => setLoaded(true)}
          />
        </picture>
      ) : (
        <div className="hero-scene-media" />
      )}
      <div className="hero-scene-content">
        <span className="hero-scene-text">
          <FormattedMessage
            id="home.hero"
            values={{
              name: (chunks: ReactNode) => (
                <span className="name" data-tip={summit} tabIndex={0}>
                  {chunks}
                  <span className="summit" role="img" aria-label={summit}>
                    🏔️
                  </span>
                </span>
              ),
              u: (chunks: ReactNode) => (
                <a className="underline" href={PENSEUM_URL} target="_blank" rel="noopener noreferrer">
                  {chunks}
                </a>
              ),
            }}
          />
        </span>
        {children ? <div className="small hero-scene-footer">{children}</div> : null}
      </div>
    </header>
  )
}
