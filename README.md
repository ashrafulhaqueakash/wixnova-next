# Wixnova — Next.js site

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · **GSAP 3 (ScrollTrigger + SplitText)** · **Lenis smooth scroll**

Playful-editorial design (two26-inspired concept) in the Wixnova logo lime, filled with the real content from wixnova.com.

## Run it
Requires **Node.js 18.18+** (20 or 22 recommended).
```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```
Static hosting (cPanel etc.): uncomment `output: 'export'` in `next.config.mjs`, run `npm run build`, upload `out/`.
Vercel: import the repo — no config needed.

## Pages
`/` home · `/services` (all 14 services) · `/work` (client results & reviews) · `/pricing` (plans + one-time projects) ·
`/about` · `/careers` · `/contact`

## Content
All copy lives in **`lib/data.json`** (taken from wixnova.com: services, pricing, process, comparison table, reviews,
video testimonials, leadership, FAQs, about, careers). `lib/content.ts` exposes it with types. Edit the JSON — pages update.
Wrap words in `**double asterisks**` inside statements to make them fill in lime-green.

## Motion system
- `components/Motion.tsx` — mounted once in the layout. Starts Lenis and (re)initialises animations on every route change.
- `lib/animations.ts` — the GSAP engine. Add a data-attribute to any element to animate it:

| Attribute | Effect |
|---|---|
| `data-split` / `data-split="load"` | headline characters rise out of masked lines (on scroll / on page load) |
| `data-reveal` | fade + rise when it enters the viewport (batched) |
| `data-stagger` | children cascade in with a tilt |
| `data-pop` | sticker springs in (elastic) |
| `data-wordfill` | words fill with ink as you scroll; child `[data-pop-at="0.5"]` stickers pop at that progress |
| `data-draw-wrap` + `data-draw` | SVG path draws itself while scrolling |
| `data-marquee` / `="reverse"` | infinite band that speeds up, skews and flips direction with scroll velocity |
| `data-parallax="0.3"` | parallax drift |
| `data-hscroll` + `data-hscroll-track` | pinned horizontal scroll (desktop) |
| `data-count="150"` | count-up number |
| `data-footer-logo` | footer wordmark rises in |
| `data-progress` | top scroll-progress bar |
| `.btn-talk` | magnetic hover (mouse only) |

Everything respects `prefers-reduced-motion`; if JS fails, content is shown after 2.5s (`.anim-fallback`).

## Still to plug in
- **Contact form:** copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_CONTACT_ENDPOINT` (e.g. Formspree).
- **Newsletter:** connect your email provider in `components/Newsletter.tsx`.
- **Visuals:** `Shot` mockups are illustrations — swap for real screenshots/showreel with `next/image` / `<video>`.
- **Logo:** `lib/logo.ts` is traced from the PNG logo — paste the original SVG path for perfectly crisp edges.
- **Socials:** only the LinkedIn link found on wixnova.com is included — add more in `lib/data.json`.
