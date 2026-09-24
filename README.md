# samitkhalsa

Personal website of Samit Khalsa. A small React single-page app (Vite, react-router, react-intl, motion) deployed on Vercel.

## Develop

```sh
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve dist/ locally
```

## Editing content

- **Hero, footer, links:** `src/content/site.ts` (past-work list, contact links) and the `home.hero` string in `src/i18n/en.ts` / `src/i18n/hi.ts`.
- **Last seen line:** edit `public/last-seen.json`. `name` is the phrase after "Was seen ...", so it carries its own preposition ("at a birthday party", "tinkering with Jev"). `createdAt` is an ISO timestamp; the site renders it as relative time ("2 days ago"). `nameHi` / `cityHi` are optional Hindi overrides.
- **Journal entries:** add an object to `src/content/journal.json`. Required: `id`, `slug` (lowercase letters, digits, hyphens; never change it once published), `date` (`2026.09.11`), `dateTime` (`2026-09-11`), `text`. Optional: `title`, `titleHi`, `textHi`, `photos` (paths under `public/journal/`), `youtube` (video id), `links` (`{ href, title, image? }`). Entries are sorted newest first automatically. The build fails on duplicate or malformed slugs.
- **Hindi strings:** `src/i18n/hi.ts` must define every key in `en.ts` (TypeScript enforces this).

## Hero scene

The home page is one screen: the portrait fills it, with the text and footer laid over it. To replace the picture:

1. Save the landscape image as `public/hero/scene.jpg` (16:9, head in the upper-middle with room below it for the text).
2. Optionally save a tall version for phones as `public/hero/scene-portrait.jpg` (9:16 or taller, head in the top third). If you skip this, cut one from the landscape file with ffmpeg the way the current one was made, and keep `PORTRAIT_CROP` in `src/content/stickers.ts` in sync with the crop. Phones fill the screen by height, so this file's width is what decides how sharp they look: the current one is 528px wide and a 3× phone stretches it about 2.2×; cutting it from a larger original at 1100px+ wide makes it crisp.
3. Run `npm run hero`. It writes the WebP/JPEG sizes, a blur placeholder, `src/content/hero.json`, and the preload tag in `index.html`. Commit the generated files.

**Stickers:** the painted stickers on the face are clickable. Each one is a line in `src/content/stickers.ts` with its link and its position as a percentage of the landscape image. After changing the picture, re-measure them (a quick way: temporarily outline `.sticker-hotspot` in DevTools).

Without `scene.jpg` the hero shows a gradient placeholder.

## Routes

`/`, `/journal`, `/journal/<slug>` and the same under `/hi`. `vercel.json` rewrites every path to `index.html` so deep links work on Vercel.

## Deploy

1. Import the GitHub repo into Vercel. The Vite preset is detected automatically (build `npm run build`, output `dist`).
2. Domains: `samits.life` is primary; `www.samits.life`, `samits.world` and `www.samits.world` redirect to it. DNS lives at GoDaddy: each apex has an `A` record to `76.76.21.21` and each `www` a `CNAME` to `cname.vercel-dns.com`. Vercel issues TLS automatically.
3. `SITE_URL` in `src/content/site.ts` is set to the primary domain.
4. Turn off GitHub Pages in the repo settings so it no longer serves the old site.
