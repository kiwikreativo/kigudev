# Kigudev SEO Action Plan

## Critical: fix immediately

1. **Stop indexing the component demo.** Remove `src/pages/example-components.astro` from the production routes or add `/example-components` to `NOINDEX_ROUTES`. Rebuild and verify it is absent from the sitemap. If retained internally, eliminate its `/about` links.
2. **Make the contact form functional.** Submit to a real, spam-protected endpoint; add success/error states, consent/privacy wording as applicable, and analytics for successful leads. Keep Calendly as a fallback.

## High: complete within one week

1. **Define the truthful market position.** Decide whether the offer is English-only across both markets or genuinely localized `en-US` + `es-CR`. Document the Costa Rica base, US remote service scope, working languages, supported time zones, currencies, and contact channels.
2. **Add an About/entity page.** Publish the real owner identity, biography, experience, location/service areas, verified profiles, and direct contact details.
3. **Rewrite the homepage search proposition.** Align title, H1, hero role, description, and CTA around the actual service and both markets.
4. **Expand case studies.** Populate challenge, approach, solution, outcomes, and galleries for all five projects using real visuals and substantiated results.
5. **Add sitewide entity schema.** Implement linked Person/Organization, WebSite, and WebPage nodes with stable IDs and truthful `areaServed`; reference the entity from Service and CreativeWork nodes.
6. **Unify URLs.** Ensure canonicals, sitemap entries, JSON-LD URLs, and breadcrumb item URLs use the same trailing-slash form.

## Medium: complete within one month

1. Build crawlable `/services/` and `/projects/` hub pages.
2. Expand each service page with audience, problems, process, deliverables, timeline, engagement model, outcomes, related proof, and localized FAQs.
3. If bilingual delivery is real, create equivalent `/us/` and `/cr/` page sets before adding reciprocal `en-US`, `es-CR`, and `x-default` hreflang.
4. Add BreadcrumbList markup and visible breadcrumbs tied to real hub URLs.
5. Replace stock case-study images with product screenshots and create unique social images for services and markets.
6. Improve internal links among services, projects, FAQs, About, and market pages with descriptive anchors.
7. Reduce CWV risk: subset icons, trim shared CSS, defer nonessential GSAP/Unicorn Studio work, and assign high fetch priority only to the real LCP image.
8. Configure and verify HTTPS/canonical-host redirects plus CSP, HSTS, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy at Cloudflare.

## Low / ongoing

1. Publish first-hand resources around buyer questions in each market, not generic SEO articles.
2. Earn relevant Costa Rican and US mentions through real clients, partnerships, professional profiles, and industry directories; avoid fabricated citations or addresses.
3. Add accurate sitemap `lastmod` data from a reliable content source.
4. Consider IndexNow for changed URLs and `llms.txt` as optional discovery aids after the core content/entity work is complete.
5. Monitor Search Console by country, query, page, and device. Track qualified leads separately for the US and Costa Rica.

## 90-day rollout

| Phase | Weeks | Deliverables | Success check |
|---|---:|---|---|
| Foundation | 1–2 | Demo route removed/noindexed, working lead form, canonical consistency, entity facts agreed | Clean sitemap; zero broken internal links; test lead received |
| Market and proof | 2–5 | Homepage/About rewrite, service-area statements, 5 expanded case studies, real imagery | Every key page shows owner, offer, proof, and truthful market relevance |
| Architecture | 4–8 | Service/project hubs, market or locale pages, internal links, schema graph, breadcrumbs | Pages crawlable within three clicks; schema validates; no orphan pages |
| Performance and measurement | 7–10 | Asset reductions, CWV tests, GSC/GA4 segmentation, conversion events | Mobile CWV targets met or documented; leads attributable by market |
| Authority growth | 9–12+ | Market-specific resources, verified profiles, partnerships and mentions | Growth in non-brand impressions and qualified leads by target country |

## KPIs

- Valid indexable URLs versus submitted sitemap URLs
- Broken internal links and redirect chains
- Non-brand impressions/clicks split by United States and Costa Rica
- Rankings for service + market-intent queries
- Qualified form submissions and scheduled calls by market
- Lead conversion rate per landing page
- Core Web Vitals pass rate and mobile Lighthouse diagnostics
- Number of case studies with first-hand evidence and measurable/verified outcomes
- Referring domains and verified brand mentions from each target market

## Guardrails

- Do not create a fictitious US office, address, phone number, review profile, or local schema.
- Do not create Spanish URLs unless the Spanish content and delivery experience will be maintained.
- Do not mass-produce near-duplicate city/state pages.
- Do not invent performance results, client testimonials, dates, or credentials.
