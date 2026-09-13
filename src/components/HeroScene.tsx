import { useState, type ReactNode } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { PENSEUM_URL } from '../content/site'
import hero from '../content/hero.json'
import { Butterflies } from './Butterflies'

const WIDTHS = [2400, 1600, 1000, 640]
const srcSet = (name: string, ext: 'webp' | 'jpg') => WIDTHS.map((w) => `/hero/${name}-${w}.${ext} ${w}w`).join(', ')

/** Full-screen home hero: the grass-hill scene with the site line over it. */
export function HeroScene() {
  const intl = useIntl()
  const summit = intl.formatMessage({ id: 'home.summit' })
  const [loaded, setLoaded] = useState(false)

  return (
    <header className={`big hero-scene${hero.landscape ? '' : ' hero-scene--placeholder'}`}>
      {hero.landscape ? (
        <picture className="hero-scene-media">
          {hero.portrait ? (
            <>
              <source media="(orientation: portrait)" type="image/webp" srcSet={srcSet('scene-portrait', 'webp')} sizes="100vw" />
              <source media="(orientation: portrait)" type="image/jpeg" srcSet={srcSet('scene-portrait', 'jpg')} sizes="100vw" />
            </>
          ) : null}
          <source type="image/webp" srcSet={srcSet('scene', 'webp')} sizes="100vw" />
          <img
            src="/hero/scene-1600.jpg"
            srcSet={srcSet('scene', 'jpg')}
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
      <Butterflies />
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
    </header>
  )
}
