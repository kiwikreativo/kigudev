# Kiguidev geographic SEO procedure

Audience: US clients, English-speaking buyers across Europe, and Costa Rican businesses. Delivery: remote only, based in Costa Rica. The goal is qualified organic inquiries, not geographic name repetition.

Schedule below is a proposed sequence starting when implementation is authorized. Engineer = site/deployment work; owner = factual business information, client permissions and account decisions; SEO/content = research and editorial work. Work may be done by one person, but these responsibilities remain distinct.

## Phase 1 — Correct the preferred domain and establish measurement

**Priority P0/High. Timing: days 1–3. Effort: roughly half to one engineering day plus account access.**

### 1. Verify the production deployment

1. Identify the Netlify site actually serving `kiguidev.me`, its deployed commit, production branch and build settings. Compare with the local checkout before changing anything. This audit found old-hostname canonical tags on all 15 live pages, although current source already has the correct custom domain.
2. Set/confirm `kiguidev.me` as the intended primary domain in that existing site. Keep the apex HTTPS origin and existing public paths. No speculative DNS migration is needed.
3. Build the reviewed current code. Inspect output for canonical, sitemap, robots, Open Graph and JSON-LD URLs; all first-party identity/page URLs must use `https://kiguidev.me`. Verify the Kiguidev brand spelling and existing form tests at the same time; do not deploy unrelated unreviewed work solely to change SEO tags.
4. Configure a permanent 301 or 308 from the old Netlify hostname to the corresponding custom-domain path, preserving query strings. Verify the current HTTP and www redirects still work. Choose the existing site's domain settings or a host-specific redirect rule after inspecting current behavior; do not install a wildcard rule that redirects the primary host to itself.
5. Deploy only after reviewing the build and preview. Recheck the actual public response; source changes alone do not complete this step.

**Acceptance gate:** all current 15 indexable pages return 200 with custom-domain self canonicals; robots references the custom-domain sitemap; sitemap index and 15 locations use the custom domain; legacy-host page paths redirect once to their correct destination; unknown URLs return 404; no old-hostname identity/OG URLs remain. Representative query-string URLs canonicalize to their clean page URL.

### 2. Establish a measurable baseline

1. Verify a Search Console Domain property through the owner-controlled DNS account. Submit `https://kiguidev.me/sitemap-index.xml`. Inspect homepage, primary development service and About; record both user-declared and Google-selected canonical. Google may take time to recrawl; immediate indexation is not an acceptance promise.
2. Export available recent query/page/country/device data; use 90 days where available and a 28-day comparison window. If the site has insufficient history, record that as the baseline.
3. Connect the existing form events to an owner-approved analytics setup. Define form start as actual first interaction, not initialization. Measure starts, step progress, validation/submission failures and accepted inquiries separately from confirmation-email acceptance.
4. Record country/landing-page attribution only where the selected analytics supports it. Keep lead contact/details out of analytics. Maintain an owner-reviewed count of qualified inquiries and proposals separately; do not infer country from the language dropdown.

**Acceptance gate:** account ownership is verified; the deployed canonical is checked in URL Inspection; a baseline export exists; a mocked inquiry records one accepted-submission event and contains no personal information. No ranking-growth target is set before this baseline.

## Phase 2 — Make existing pages match the remote offer

**Priority High. Timing: weeks 1–3. Effort: 1–2 engineering days and 3–5 content days, plus owner input.**

### 3. Align positioning and service intent

- Add the truthful Costa Rica / remote US / Europe statement beside the existing homepage brand headline. Keep the visual design. Use one clear sentence rather than country lists in every heading.
- Update About, homepage description, services introduction and relevant service descriptions consistently. Suggested homepage title for review: “Remote Web Designer & Developer | Kiguidev”. Preserve Costa Rica relevance in visible introduction/About and supporting metadata; no title must carry all three regions.
- Treat `/services/ui-ux-design/` as the currently advertised redesign offer: align its content and metadata around website redesign, including UX work as part of that scope. Preserve the existing URL for this phase. A cleaner `/services/website-redesign/` URL is a separate migration decision after index/query data is available.
- Expand the four service pages to answer scope, deliverables, prerequisites, remote process, handoff/support and common buyer concerns. Confirm operational claims with the owner. Do not add copy merely to reach a word count.
- Explain “Mobile Enhancement” using buyer terms such as mobile website usability and responsive improvements. Preserve existing inquiry option values and validation.
- Rewrite the contact introduction to explain the inquiry and actual next steps clearly. Preserve the existing form, preferred-language behavior and English-only automated confirmation policy.

### 4. Make entity data reflect visible coverage

- Keep Costa Rica as the actual base and use stable custom-domain Person/Organization IDs.
- Replace the countries-only market mapper with explicit typed areas: Country Costa Rica, Country United States, Continent Europe. Reuse these in service markup after visible coverage has been updated.
- Add only verified professional profile links, real logo and factual business descriptions. Include the Person node on About instead of relying on a remote ID definition alone when validating ProfilePage requirements.

**Acceptance gate:** live homepage, About, services and structured data agree about base, remote delivery and markets; all existing paths remain valid; service names match their promises; the validator reports no syntax/type defects. No foreign office, fabricated review or Google Business Profile is created.

### 5. Publish one useful remote collaboration page

Create `/working-remotely/` in English. Use it across all markets rather than launching three duplicated regional pages. Cover confirmed communication languages, actual scheduling/UTC availability, asynchronous updates, scoping, approvals, source/design ownership, handoff and support. State payment/contract practices only after owner confirmation. Link to the relevant services, two real case studies and `/#contact`; link back from About and service pages.

**Acceptance gate:** the page provides useful operational information beyond country names, has a self canonical/title/description and internal links, and enters the sitemap automatically. No guaranteed response times or timezone overlap are invented.

## Phase 3 — Add proof and strengthen Costa Rica relevance in English

**Priority High. Timing: weeks 3–6. Effort: 3–6 content days, implementation and client permissions.**

### 6. Improve two real business case studies first

- Prioritize DeCorazonJoss and Meguis Import&Export if the owner confirms they are real client engagements that can be publicly documented.
- Use actual project screenshots, specific personal responsibilities, launch context, challenges and shipped solutions. Identify geography only where factual and permitted.
- Add original measured before/after evidence if available, with date and method; otherwise use concrete qualitative outcomes without invented percentages.
- Add approved testimonials and live/source links where allowed. Reuse one relevant approved proof item near the homepage inquiry section and each related service.

**Acceptance gate:** owner/client permission is recorded; each case study supports its claims with original evidence; no stock/context image is presented as a screenshot of delivered work; service links and an inquiry CTA are present.

### 7. Retain Costa Rica relevance on the English website

- Keep all website content, navigation and metadata in English. Use the existing URLs for the United States, Europe and Costa Rica; no Spanish pages or language alternates are planned.
- Describe the actual Costa Rica base and remote delivery on About and the proposed collaboration page. Include verified Costa Rican projects and client evidence where permission allows.
- Research English-language demand from Costa Rican businesses and international businesses operating there before choosing additional topics. English-only content may reach fewer Spanish-language searches; measure qualified inquiries by country.
- Preserve the form's communication-language preference and English automated confirmations; these do not change the website language.

**Acceptance gate:** English content clearly explains the Costa Rica base, remote services and international availability; claims are factual and supported. No invented offices or duplicated regional pages are added.

## Phase 4 — Build demand and authority, then refine by country

**Priority Medium. Timing: weeks 6–12, then monthly. Effort: roughly one focused content day per week plus a recurring measurement review.**

### 8. Publish a small buyer-focused resource sequence

Validate actual query intent by country first. The following are topic hypotheses, not measured search-volume recommendations:

| Release | Proposed resource | Suggested path | Primary internal destination |
| --- | --- | --- | --- |
| Week 6 | Hiring a remote web developer from Costa Rica | `/insights/hire-remote-web-developer-costa-rica/` | Remote collaboration + development |
| Week 8 | Small-business website redesign checklist | `/insights/website-redesign-checklist/` | Existing redesign service |
| Week 10 | Mobile website usability checklist | `/insights/mobile-website-usability-checklist/` | Mobile enhancement service |
| Week 12 | How to prepare a useful website project brief | `/insights/website-project-brief/` | Inquiry form + development |

Use first-hand examples and direct answers. Link each resource to its related service and relevant case study. Keep author identity and meaningful update dates visible. Research buyer queries separately from developer job/hiring-board queries. A narrow Astro/front-end implementation topic can be added only if the query and portfolio support that specialization.

### 9. Earn relevant references

Ask approved existing clients for genuine attribution/testimonials and optional project credits; maintain truthful professional profiles and contribute original work relevant to the services. Target quality relationships in the US, Europe and Costa Rica. Do not buy links, invent offices or submit to hundreds of directories. Outreach itself requires owner authorization; this plan sends no messages.

### 10. Measure performance before optimizing it

Measure homepage, a service and a case study on mobile/desktop, with US/European/Costa Rica test locations where tooling is available. Obtain CrUX field data when the site has sufficient coverage. Review external font requests, icon font cost, hero animation and below-fold eager images against the observed waterfall and main-thread work. Apply targeted changes, then compare like-for-like cold/warm measurements. Treat LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at p75 as quality targets, not guaranteed ranking improvements.

### 11. Review at day 30, 60 and 90

| Metric | Baseline now | Review action |
| --- | --- | --- |
| Public canonical consistency | 0/15 custom-domain self canonicals in audit | Target 15/15 after Phase 1; review Google-selected canonical after recrawl |
| Organic clicks/impressions/CTR | Unavailable | Compare equal 28-day windows by page/query/country/device |
| European demand | Unavailable | Inspect individual countries before aggregating Europe |
| Accepted / qualified organic inquiries | Unavailable | Track acceptance and owner-reviewed qualification separately |
| Form completion/errors | No analytics consumer found | Establish actual-interaction funnel and identify failure points |
| Core Web Vitals | Unmeasured | Establish field/lab baseline; prioritize demonstrated bottlenecks |
| Useful client proof | Two case studies selected for review | Publish two verified upgrades before increasing page count |

At day 90, choose further countries and topics only from actual inquiry fit, qualified leads, search impressions and operational ability. Create a country page only if it has a distinct offer, useful local buyer information and real supporting evidence. If that evidence is absent, improve the existing services and resources.

## Approval boundary and constraints

The original audit was read-only. The owner subsequently authorized the domain corrections and confirmed an English-only website serving the United States, Europe and Costa Rica. The legacy Netlify hostname redirect is now configured locally. Canonicals, robots and sitemap generation already use the correct custom domain in source. Production deployment and public-response verification remain required; see the implementation status below.

No Google Business Profile, foreign offices, mass location pages, paid SEO infrastructure or automatic outreach is included. A ranking/traffic forecast requires baseline and keyword data that were unavailable during this audit.

## Domain correction implementation — October 22, 2026

- Keep `SITE_URL = "https://kiguidev.me"` as the shared source for Astro, canonical tags, social/entity URLs and sitemap generation. Robots uses Astro's configured site for its sitemap directive.
- Enable the host-specific permanent redirect in `netlify.toml`: `https://kigudev.netlify.app/*` → `https://kiguidev.me/:splat`. Existing primary-domain and preview URLs do not match this rule. Netlify forwards query strings by default.
- Publish the reviewed current production build from this repository to the existing Netlify site. Confirm its linked repository, production branch, build command (`npm run build`) and publish directory (`dist`) if the public output remains stale.
- After deployment, recheck the Phase 1 acceptance gate and submit the custom-domain sitemap in Search Console. The local change alone does not update the public site.
- Local build inspection passed: 15 indexable pages have matching custom-domain canonical and Open Graph URLs; sitemap coverage matches all 15 pages and excludes the noindex 404; robots advertises the correct sitemap; all HTML pages retain `lang="en"`; no legacy hostname remains in generated HTML. `npm run build` completed successfully. Netlify redirect execution and Google-selected canonicals remain unverified.
