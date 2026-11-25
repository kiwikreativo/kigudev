# Kiguidev SEO Action Plan

From the audit of 2026-11-25 ([FULL-AUDIT-REPORT.md](FULL-AUDIT-REPORT.md)).
Audit score: **75/100**. The ticked items are done in the working tree and go live with the next deploy.

## Phase 1: Before the next deploy (Critical / High)

- [x] 301 `/projects/chainpeek/*` → `/projects/` in `netlify.toml`
- [x] 301 `/services/ui-ux-design/*` → `/services/web-redesign/` in `netlify.toml`
- [x] Fixed-path favicons: `public/favicon.ico`, `favicon-96.png`, `apple-touch-icon.png` (dark badge so the icon shows on white)
- [ ] Commit and deploy (the share image, About page, favicon and everything below)
- [ ] After deploy, request reindexing of `/` and `/about/` in Search Console; test both redirects on the live site

## Phase 2: Week 1–2 (High-impact)

- [x] Trailing slash on every internal link (Nav, Footer, project and service lists)
- [x] Homepage contact typo fixed
- [x] `/services/ui-ux-design/` → `/services/web-redesign/`: new title, description and redesign-focused copy; project service tags updated
- [x] Keyword phrase in the homepage H1 (`sr-only` prefix)
- [x] Fonts self-hosted through Astro's `fonts` config: Google Fonts and Fontshare (Satoshi kept, since the footer and service pages use it)
- [x] Person and Organization nodes on the service and project page graphs

## Phase 3: Month 1–2 (Content and authority)

- [ ] Replace stock case-study photos with real screenshots of the delivered sites (**needs your screenshots**)
- [ ] Grow each case study to 500+ words: problem, decisions, result, client quote (**needs your input**)
- [x] Intro paragraphs for `/services/` and `/projects/` (review the wording)
- [ ] Add a "What you get / timeline / starting at" block to each service page (**needs your timelines and prices**)
- [x] Longer titles: "… Services in Costa Rica", and "Project: category" for case studies
- [x] FAQPage JSON-LD on `/faq/` (questions now live in `src/data/faq.ts`)
- [x] `public/llms.txt`
- [x] `Person.image` → `guillermo.jpg` (36 KB, was a 413 KB PNG)
- [x] About hero portrait no longer fades in from invisible, so it paints immediately

## Phase 4: Ongoing (Monitoring)

- [ ] Search Console: submit `sitemap-index.xml`; watch the ChainPeek → Kalta and ui-ux-design → web-redesign redirects
- [ ] PageSpeed Insights on `/` and `/about/` after deploy; field Core Web Vitals once there's traffic
- [ ] Rich Results Test on `/about/`, `/faq/`, one service page and one case study
- [ ] Content-Security-Policy header in `netlify.toml` (test Calendly and the form after adding it)
- [ ] Optional: Spanish versions of the key pages with hreflang
- [ ] Re-audit after Phase 3
