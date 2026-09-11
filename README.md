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
- **Last seen line:** edit `public/last-seen.json`. `createdAt` is an ISO timestamp; the site renders it as relative time ("2 days ago"). `nameHi` / `cityHi` are optional Hindi overrides.
- **Journal entries:** add an object to `src/content/journal.json`. Required: `id`, `slug` (lowercase letters, digits, hyphens; never change it once published), `date` (`2026.09.11`), `dateTime` (`2026-09-11`), `text`. Optional: `title`, `titleHi`, `textHi`, `photos` (paths under `public/journal/`), `youtube` (video id), `links` (`{ href, title, image? }`). Entries are sorted newest first automatically. The build fails on duplicate or malformed slugs.
- **Hindi strings:** `src/i18n/hi.ts` must define every key in `en.ts` (TypeScript enforces this).

## Routes

`/`, `/journal`, `/journal/<slug>` and the same under `/hi`. `vercel.json` rewrites every path to `index.html` so deep links work on Vercel.

## Deploy

1. Import the GitHub repo into Vercel. The Vite preset is detected automatically (build `npm run build`, output `dist`).
2. Add the custom domain under Project → Settings → Domains. At the registrar, point the apex to Vercel's `A` record (`76.76.21.21`) and `www` to `cname.vercel-dns.com`; Vercel shows the exact records and issues TLS automatically.
3. Set `SITE_URL` in `src/content/site.ts` to the final domain.
4. Turn off GitHub Pages in the repo settings so it no longer serves the old site.
