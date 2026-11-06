# Wixnova — Next.js site

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 — the v3 "playful editorial" design
(two26-inspired concept in Wixnova logo lime), converted from the static HTML version.

## Run it
Requires **Node.js 18.18+** (20 or 22 recommended).

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:
```bash
npm run build
npm start          # serves the production build on :3000
```

Static hosting (cPanel, any host without Node): uncomment `output: 'export'` in `next.config.mjs`,
run `npm run build`, then upload the generated `out/` folder.
Deploy to Vercel: push to GitHub and import the repo — no config needed.

## Structure
```
app/
  layout.tsx            fonts (next/font/local), header, footer, metadata
  globals.css           design-system classes (.cond .sticker .pill .btn-talk .chip .card .shot .chat …)
  page.tsx              Home
  about/ services/ portfolio/ blog/ contact/ careers/   → one page.tsx each
  not-found.tsx         404
  fonts/                Anton, Funnel Display, Funnel Sans (OFL, Latin subset)
  icon.svg              favicon
components/
  Header.tsx            sticky header (hides on scroll) + fullscreen menu      (client)
  Footer.tsx            lime CTA footer + giant wordmark
  Newsletter.tsx        footer signup                                         (client)
  ContactForm.tsx       validation, ?service= preselect, POST to endpoint     (client)
  interactive.tsx       Filterable grid, TestimonialStack, ChatFaq, Pricing, CaseStudies dialog (client)
  effects.tsx           ScrollEffects (reveal/pop), WordFill, DrawPath, CountUp (client)
  sections.tsx          reusable sections: Marquee, ServicesPath, Process, Testimonials, Industries, PricingSection, FaqSection
  ui.tsx                Logo, TalkButton, Sticker, Shot, SectionHead, PageHero, Avatar
  Icon.tsx              icon set
lib/
  content.ts            ALL copy & data (services, projects, reviews, pricing, FAQ, team, jobs, posts…)
  logo.ts               Wixnova wordmark SVG path
tailwind.config.ts      tokens: lime #B5E96B, ink #10140C, paper #F3F4EC, fonts, type scale
```

## Editing content
Almost everything lives in `lib/content.ts`. Items marked **SAMPLE** (projects & results, testimonials, team,
milestones, pricing, blog posts, jobs, email/phone/socials) are placeholders — replace before launch.

## Contact form
Copy `.env.example` → `.env.local` and set `NEXT_PUBLIC_CONTACT_ENDPOINT` (e.g. Formspree).
Empty = demo success state. You can also swap `submit` in `components/ContactForm.tsx` for an API route / server action.

## Notes
- `lib/logo.ts` is traced from the PNG logo on wixnova.com — paste the original SVG path for perfectly crisp edges.
- `Shot` mockups are illustrations; replace with `next/image` screenshots of real work.
- All content renders without JS; motion respects `prefers-reduced-motion`.
