# Kiguidev SEO Audit

**Date:** 2026-11-25
**Site:** <https://kiguidev.me>
**Audited build:** local production build of the current working tree (`astro build` + `astro preview`), which includes changes not yet deployed. Live-only checks (redirects, headers, indexed URLs) were run against kiguidev.me.
**Pages crawled:** 15 of 15 sitemap URLs, plus 24 unique internal links.

## Status, 2026-11-25 (after fixes)

Most findings below are now fixed in the working tree. They go live with the next deploy. [ACTION-PLAN.md](ACTION-PLAN.md) has the checklist. The re-run on the new build:
- no broken links, and every internal link ends in `/`;
- FAQPage is on `/faq/`, and Person + Organization are on every service and project page;
- the favicon, `llms.txt` and the share image all return 200;
- there are no third-party font requests.

Lab LCP on the new build: `/` 0.98 s, `/about/` 1.75 s, `/projects/kalta/` 0.69 s, `/services/web-redesign/` 0.68 s.

`/services/ui-ux-design/` is now `/services/web-redesign/`, with a 301 from the old URL. The "Related work" recommendation was dropped at the owner's request.

## Executive summary

### SEO Health Score: 75 / 100

**Business type:** freelance web designer and front-end developer, a hybrid service business: Alajuela, Costa Rica, plus remote US clients.

The technical base is solid. Every page returns 200, has a self-referencing canonical, exactly one H1, a unique title and description, and structured data. The crawl found no broken internal links. Lab Core Web Vitals are good on every page tested. The biggest risks are a case-study URL that disappears on the next deploy, the favicon Google can't pick up, and the thin hub pages and case studies.

### Top 5 issues

1. **High:** `/projects/chainpeek/` is live and indexed, but the current code replaced it with `/projects/kalta/`. It returns 404 after the next deploy, and there is no redirect.
2. **High:** the favicon is served only from a hashed `/_astro/favicon.*.webp` URL, and `/favicon.ico` returns 404. Google shows a generic globe in search results.
3. **High:** case studies are 207–277 words and illustrated with stock photos (Pexels "contextual imagery"), not screenshots of the delivered work. This is weak first-hand evidence.
4. **Medium:** internal links leave off the trailing slash (`/faq`, `/services/seo`, `/projects/kalta`) while canonicals include it. Every internal click and crawler hop goes through a 301.
5. **Medium:** fonts load through a render-blocking CSS `@import` chain to Google Fonts and Fontshare.

### Top 5 quick wins

1. Add a 301 from `/projects/chainpeek/` in `netlify.toml`.
2. Add `public/favicon.ico` plus a 48×48 PNG or SVG favicon at fixed paths.
3. Add the trailing slash to links in Nav, Footer and the project/service lists.
4. Self-host the fonts (Google Fonts and Fontshare) through Astro's `fonts` config.
5. Fix the homepage typo ("Non of the available hours fits you…") and the "WEB REDESIGN" title on `/services/ui-ux-design/`.

## Scorecard

| Category | Weight | Score |
| --- | ---: | ---: |
| Technical SEO | 22% | 82 |
| Content quality | 23% | 68 |
| On-page SEO | 20% | 74 |
| Schema / structured data | 10% | 72 |
| Performance (lab) | 10% | 85 |
| AI search readiness | 10% | 65 |
| Images | 5% | 78 |
| **Weighted total** | | **75** |

## Page inventory

| URL | Words | Title chars | Description chars | Schema |
| --- | ---: | ---: | ---: | --- |
| `/` | 491 | 59 | 143 | Person, Organization/ProfessionalService, WebSite, WebPage |
| `/about/` | 638 | 61 | 126 | ProfilePage, Person, BreadcrumbList |
| `/faq/` | 287 | 37 | 128 | none |
| `/privacy-policy/` | 665 | 25 | 123 | none |
| `/projects/` | 128 | 46 | 118 | CollectionPage, BreadcrumbList |
| `/projects/decorazonjoss/` | 226 | 37 | 137 | CreativeWork, WebPage, BreadcrumbList |
| `/projects/eghee/` | 207 | 29 | 121 | same |
| `/projects/kalta/` (new) | 277 | 29 | 140 | same |
| `/projects/meguis-import-export/` | 217 | 44 | 129 | same |
| `/projects/stack-chef/` | 213 | 34 | 117 | same |
| `/services/` | 96 | 46 | 147 | CollectionPage, BreadcrumbList |
| `/services/mobile-enhancement/` | 310 | 38 | 133 | Service, WebPage, BreadcrumbList |
| `/services/seo/` | 327 | 23 | 129 | same |
| `/services/ui-ux-design/` | 334 | 32 | 145 | same |
| `/services/web-development/` | 302 | 35 | 137 | same |

## Technical SEO: 82

**Working:**

- HTTPS with HSTS; http→https, www→apex and `kigudev.netlify.app`→`kiguidev.me` 301s
- robots.txt allows all crawlers and lists `sitemap-index.xml`; the sitemap holds all 15 pages, all 200
- Self-referencing canonicals; `index, follow` with `max-image-preview:large`
- Security headers: nosniff, X-Frame-Options, Referrer-Policy, Permissions-Policy; immutable caching on `/_astro/*`
- Static HTML; all content is in the initial response

### [High] `/projects/chainpeek/` will 404 after deploy

The live site serves `/projects/chainpeek/` (200) and it is in the live sitemap. The uncommitted `src/data/projects.ts` swaps ChainPeek for Kalta, so the next deploy removes the page and any rankings or links it has.

**Fix:** add a `[[redirects]]` rule in `netlify.toml` from `/projects/chainpeek/*` to `/projects/` (or to the closest case study) with status 301. Alternatively, keep ChainPeek as a project.

### [High] Favicon not eligible for search results

`<link rel="icon">` points to `/_astro/favicon.Cc9N2v91.webp`, a hash that changes when the file changes, and `/favicon.ico` returns 404.

**Fix:** put `favicon.ico`, `favicon.svg` (or a 48×48/96×96 PNG) and `apple-touch-icon.png` in `public/`, link them by fixed paths in `BaseHead.astro`, then request reindexing of `/` in Search Console.

### [Medium] Internal links skip the trailing slash

Nav, Footer and list links use `/faq`, `/privacy-policy`, `/services/seo`, `/projects/kalta`, and so on. Live, each one 301s to the slash version (checked: `/faq` → `/faq/`, `/services/seo` → `/services/seo/`). This wastes a hop per click and per crawl, and dilutes internal link signals.

**Fix:** write every internal `href` with a trailing slash, for example `/projects/${slug}/` in the list components. Sitemap and canonical already use slashes.

### [Low] No Content-Security-Policy header

**Fix:** add a CSP in `netlify.toml` that allows the font hosts, Calendly and the form function.

## Content quality: 68

**Working:**

- Named practitioner with a real About page: first-hand story, workspace photo, principles, 1 year of experience, LinkedIn
- Five case studies of real clients and products; four service pages of 300+ words
- Privacy policy and FAQ present

### [High] Case studies are short and use stock imagery

The five case studies run 207–277 words. Their images are Pexels stock photos credited as "contextual imagery" (for example, a container ship for Meguis), not screenshots of the delivered sites. Google's guidance on reviews and experience rewards evidence that the work happened.

**Fix:** replace the hero images with real screenshots (desktop and mobile). Grow each case study to 500+ words: problem, constraints, decisions, result, and a client quote or measurable outcome where the client approves.

### [Medium] Thin hub pages

`/services/` has 96 words and `/projects/` has 128. These hubs collect internal links but say little for queries like "web design services Costa Rica."

**Fix:** add an intro of 150–250 words to each hub: who it's for, how engagements work, typical timelines. Add a one-line outcome per listed project or service.

### [Low] Homepage contact typo

"Non of the available hours fits you for a call? or there's no space in my schedule?"

**Fix:** "None of the available times work for you? Send me a message instead."

## On-page SEO: 74

**Working:**

- Unique titles and descriptions everywhere; no duplicates; all descriptions 117–147 chars
- One H1 per page; logical H2/H3 outlines
- About page links to services, projects and the Meguis case study

### [Medium] Homepage H1 has no keyword

The H1 is "Useful digital experiences." while the title targets "Web Designer & Front-End Developer in Costa Rica".

**Fix:** keep the visual headline and add the keyword phrase inside the H1, either as a visible eyebrow or as an `sr-only` prefix like the About page uses.

### [Medium] `/services/ui-ux-design/` is labelled "WEB REDESIGN"

The title "WEB REDESIGN Services | Kiguidev" and the H1 contradict the slug and the description, which are about UI/UX design.

**Fix:** pick one topic and align slug, title, H1 and description, in sentence case.

### [Low] Short or generic titles

"SEO Services | Kiguidev" (23 chars), "Privacy Policy | Kiguidev" (25), "Eghee — Case Study | Kiguidev" (29).

**Fix:** add qualifiers, for example "Technical SEO Services in Costa Rica | Kiguidev" or "Eghee: Product Landing Page Case Study | Kiguidev".


## Schema / structured data: 72

**Working:**

- Connected `@graph` on the homepage: Person, Organization+ProfessionalService, WebSite, WebPage
- About page now carries ProfilePage + Person (fixed locally)
- Service, CreativeWork, CollectionPage and BreadcrumbList on the inner pages; all JSON-LD parses

### [Medium] Inner pages reference entities defined only on the homepage

Service `provider` and CreativeWork `creator`/`publisher` point to `#person` and `#organization` by `@id`, but those nodes are only output on `/`. Google evaluates each page on its own, so these references don't resolve on service or project pages.

**Fix:** include the Person and Organization nodes from `siteEntityGraph` in the service and project page graphs, the same way `/about/` now does.

### [Low] No FAQPage markup on `/faq/`

FAQ rich results are limited to authoritative sites, but the markup helps AI answer engines.

**Fix:** generate FAQPage JSON-LD from the same data as the visible questions.

### [Low] Person image is a 413 KB PNG

`https://kiguidev.me/guillermo.png`, referenced as `Person.image`.

**Fix:** use the WebP portrait or a compressed JPEG (about 40 KB).

## Performance (lab): 85

Measured with Playwright on the production build: mobile viewport, slow-4G-like network (150 ms RTT, 1.6 Mbps), 4× CPU throttle. These are **lab numbers, not field data**. PageSpeed Insights' shared quota was exhausted, and no CrUX data is available yet.

| Page | LCP | LCP element | CLS | FCP | Transfer | Requests |
| --- | ---: | --- | ---: | ---: | ---: | ---: |
| `/` | 1.57 s | Hero H1 | 0.001 | 1.57 s | 348 KB | 11 |
| `/about/` | 1.61 s | Hero portrait | 0.054 | 1.13 s | 350 KB | 10 |
| `/projects/kalta/` | 1.12 s | Subtitle H2 | 0.007 | 1.12 s | 267 KB | 9 |
| `/services/seo/` | 0.96 s | Hero image | 0.011 | 0.96 s | 186 KB | 7 |

All pages are well inside the "good" thresholds (LCP ≤ 2.5 s, CLS ≤ 0.1).

### [Medium] Render-blocking third-party fonts

`global.css` `@import`s Fontshare (Satoshi) and Google Fonts (Barlow Condensed, Fraunces, Geist, JetBrains Mono). These sit inside the 112 KB main stylesheet, so the browser fetches the CSS, then the two font CSS files, then the font files, all on other origins. (Correction: Satoshi *is* used, for the footer wordmark and service-page labels.)

**Fix:** move all five families to Astro's built-in `fonts` config, which `astro.config.mjs` already uses for Inter, so they're self-hosted.

### [Low] Hero portrait fades in from opacity 0

On `/about/`, the LCP image waits for GSAP before it becomes visible.

**Fix:** animate it with transform only, or start from opacity 0.01.

## AI search readiness: 65

**Working:**

- robots.txt doesn't block AI crawlers
- Clear entity facts: name, role, location, languages, markets
- The About facts list (`<dl>`) is easy to extract

### [Low] No llms.txt

**Fix:** optional. Add a short `public/llms.txt` listing services, case studies and contact.

### [Medium] Few quotable, factual passages

Service pages describe the offer but give no concrete numbers: timelines, starting price ranges, deliverables. Those are what AI answers and searchers ask for.

**Fix:** add a short "What you get / how long it takes / starting at" block to each service page.

### [Low] Bilingual claim without a Spanish version

The site says you work in Spanish, but every page is English (`lang="en"`), and there are no Spanish pages or hreflang tags.

**Fix:** optional, if Costa Rican Spanish searches matter. Add `/es/` versions of the home, about and services pages with hreflang.

## Images: 78

**Working:**

- WebP via `astro:assets` with `srcset`/`sizes` and width/height on every content image
- Lazy loading below the fold; eager + `fetchpriority` on hero images
- Empty `alt` used only for decorative logos next to text

### [Medium] Stock photos stand in for project work

See the case-study finding under Content quality.

### [Low] Large originals still emitted

The default (non-srcset) WebP files for `meguis` and `eghee` are about 234 KB each.

**Fix:** lower the quality setting or cap the largest width at 960 px.

### [Low] Case-study `og:image` is WebP

Most networks accept WebP, but some messaging apps don't preview it.

**Fix:** optional. Use a JPEG share image per case study.

## Fixed locally, not yet deployed

These items from earlier audits are done in the working tree and go live with the next deploy:
- `public/og-image.jpg` (the 1200×630 share image); this ends the 404 on every page
- About page:
  - Person node in its own graph
  - `dateModified`
  - internal links to services, projects and the Meguis case study
  - keyword title
  - visible LinkedIn link
- GitHub removed from `Person.sameAs`

## Not covered

- **Field data:** no Search Console, CrUX or GA4 credentials, and PageSpeed Insights was over quota.
- **Backlinks and SERP positions:** no Moz, Bing or DataForSEO access.
- **Full Lighthouse run:** the local Lighthouse run was blocked by the tool's permission settings; the lab metrics above come from Playwright instead.
- **Google Business Profile:** not checked.
