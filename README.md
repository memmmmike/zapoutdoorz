# ZAP Outdoorz 2026 — Lineup Explorer

An interactive single-page site for the **ZAP Campout 2026** lineup. Browse every
DJ, live act, and collective playing September 4–6, filter by category, search by
name, and stream sets inline via SoundCloud / Bandcamp before you get to the woods.

Built with [TanStack Start](https://tanstack.com/start) (React 19 + Vite 7),
Tailwind CSS v4, and shadcn/ui.

## Develop

Requires **Node ≥ 22.12**.

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (emits .vercel/output via the Nitro Vercel preset)
npm run preview  # preview the production build
npm run lint     # eslint
npm run format   # prettier --write .
```

## Project layout

```
src/
  routes/
    __root.tsx      # app shell: <html>, head/meta, fonts, error + 404 boundaries
    index.tsx       # the whole lineup experience (hero, filter bar, grid, modal)
  data/lineup.ts    # the 43-artist lineup + verified streaming links
  styles.css        # Tailwind v4 theme tokens (neon / cream / bark palette)
  lib/              # server config + SSR error capture/render helpers
  components/ui/    # shadcn/ui primitives
```

Routing is **file-based** (TanStack Router). `routeTree.gen.ts` is generated —
don't edit it by hand. See `src/routes/README.md` for conventions.

## Deploying to Vercel

The build uses the Nitro **`vercel`** preset and emits the Build Output API v3
layout to `.vercel/output`, so the Vercel Git integration deploys with no extra
setup. `vercel.json` pins the build/install commands; `engines.node` pins the
runtime to Node 22.

Connect the repo to a Vercel project (under `memmmmike's projects`) and push —
Vercel runs `npm run build` and serves `.vercel/output` directly.

## Lineup data

Artist streaming links in `src/data/lineup.ts` were verified against Resident
Advisor, Bandcamp, official sites, and press coverage. Acts without a confirmed
profile are intentionally link-less and render as **TBA**. A handful of
medium-confidence handles are flagged in a comment at the top of that file and
are worth a final check before launch.
