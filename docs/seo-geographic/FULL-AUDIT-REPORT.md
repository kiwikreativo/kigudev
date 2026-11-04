# Kiguidev geographic SEO audit

Date: October 22, 2026. Website: https://kiguidev.me/.

Confirmed audience: United States, Europe broadly with English first, and Costa Rica. Business model: independent practitioner based in Costa Rica, providing **remote services only**. Geographic SEO is the focus; AI search optimization is secondary.

## Executive findings

The strongest immediate finding is a deployment inconsistency. All **15 live public pages return 200 but declare a canonical on `https://kigudev.netlify.app`**. The live robots directive, sitemap URLs, social URLs and homepage entity identifiers also reference that older hostname. It still returns 200 without redirecting to the custom domain. By contrast, this checkout already sets `SITE_URL = "https://kiguidev.me"` and the updated Kiguidev spelling. Verify the deployed Netlify site/branch/build before adding more location content.

Next, make the remote offer explicit. Europe appears in neither the live main content of the 15 crawled pages nor the shared source market declarations. The active homepage is visually distinctive but its opening message does not identify a Costa Rica-based remote designer serving these markets. Existing service pages, projects and identity markup provide a usable foundation; they need consistent positioning and stronger evidence rather than a large collection of country pages.

Recommended order: **correct the deployed domain signals → clarify services and markets → improve client proof and measurement → strengthen Costa Rica relevance in English → expand only where country-level evidence supports it**.

## Scope and evidence

- Crawled 15 custom-domain equivalents of the URLs listed by the live sitemap, sequentially with a one-second delay between requests; respected the live allow-all robots policy.
- Checked the homepage, About, FAQ, privacy, service/project indexes, four service pages and five case studies.
- Inspected relevant Astro source, the existing build, metadata, structured data, options and analytics event wiring.
- Captured the live homepage at 1920×1080 and 375×812. No forms were submitted.
- Combined technical, content, schema, sitemap, performance, visual, AI-readiness and search-experience specialist reviews. Source-only observations were distinguished from the live checks below.
- No SEO cache was present. Google credential checks found no Search Console, GA4, PageSpeed or CrUX credentials. No paid SEO tools were used.

Artifacts: [live URL inventory](live-url-inventory.csv), [desktop capture](screenshots/homepage-desktop.png), [mobile capture](screenshots/homepage-mobile.png), and [procedure plan](ACTION-PLAN.md).

This is an external audit and source review, not proof of Google's selected canonical, indexation, search ranking, backlink quality, traffic, conversion rate or field Core Web Vitals.

## Provisional assessment

**Audited-component readiness: 53/100, directional editorial assessment.** This is not a Google score or a prediction of rankings. The complete weighted health score is withheld because the performance category has no measurement. The normalized result uses the skill's weights over the 90% of categories reviewed; scores are manual triage judgments, not validator output.

| Category | Manual score | Weight | Evidence boundary |
| --- | ---: | ---: | --- |
| Technical | 35 | 22% | Live canonical/sitemap host mismatch; healthy HTTP and crawl access |
| Content quality | 62 | 23% | Named practitioner and portfolio; limited client-verifiable outcomes |
| On-page relevance | 58 | 20% | Metadata and H1 present; market gaps and redesign/UI-UX mismatch |
| Structured data | 55 | 10% | Connected types present; live identity URLs use older host |
| Performance/CWV | Not measured | 10% | Source risks and screenshots do not establish CWV |
| AI search readiness | 53 | 10% | Readable HTML and schema; limited attributed proof |
| Images | 65 | 5% | Optimized formats/dimensions; contextual imagery and live alt omissions |

Formula: `(35×.22 + 62×.23 + 58×.20 + 55×.10 + 53×.10 + 65×.05) / .90 ≈ 53`.

## 1. Live technical findings

| Check | Observed result | Priority |
| --- | --- | --- |
| Main custom-domain pages | 15/15 return 200 | Healthy |
| Preferred canonical hostname | 15/15 point to `kigudev.netlify.app`, not `kiguidev.me` | **P0 / High** |
| robots.txt | 200; allows crawling; sitemap directive uses old hostname | **P0 / High** |
| Sitemap index and URL set | 200 and parseable; all 15 URL locations use old hostname | **P0 / High** |
| Legacy Netlify homepage | 200, no redirect to custom domain | **P0 / High** |
| HTTP and www variants | Both initially return 301; followed requests reach HTTPS apex | Healthy |
| Nonexistent path | Genuine 404 | Healthy |
| Descriptions / H1 | All 15 have descriptions and one H1 | Healthy foundation |
| Robots meta | None of the 15 declares noindex | Eligible for crawling; not proof of indexing |
| Live homepage OG and JSON-LD URLs | Older hostname; live title/brand still spells Kigudev | High consistency issue |
| Social image | `/og-image.jpg` returns 200 | Healthy asset access |
| HTTPS/security | Netlify serves HSTS, nosniff, frame/referrer/permissions headers | Healthy observed homepage response |
| hreflang | None | Appropriate for current English-only content |

Example verified live markup:

```html
<link rel="canonical" href="https://kigudev.netlify.app/">
```

The correct source value already exists in [consts.ts](../../src/consts.ts); [BaseHead](../../src/components/Utility/BaseHead.astro) derives canonicals from Astro's configured site, and [astro.config.mjs](../../astro.config.mjs) uses `SITE_URL`. This indicates the published output differs from this checkout. It does **not** establish whether the cause is an old commit, wrong deployment branch, wrong linked site or another build configuration.

Canonicals are a signal, not an absolute instruction. However, redirects, canonical tags, sitemap URLs and internal references should consistently support the preferred hostname. Verify Google-selected canonical in Search Console after the correction; do not assume the current tag proves the old hostname was selected. [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

The local build inventory has 15 non-404 pages, and every sitemap path receives an internal link. Existing sitemap generation is sufficient; adding `priority`, `changefreq` or invented `lastmod` dates is not a priority.

## 2. Geographic positioning

Confirmed source evidence:

- [consts.ts](../../src/consts.ts) declares only Costa Rica and United States in `SITE_MARKETS`.
- [HomePortfolio](../../src/components/Portfolio/HomePortfolio.astro) is the active homepage. Its H1 is “Useful digital experiences.” Its opening copy describes websites without naming the base or remote markets.
- [About content](../../src/components/Portfolio/ContentAboutPage.astro) and page descriptions mention Costa Rica/local businesses and US clients; Europe is absent.
- The live crawl found no “Europe” in the main content of any of the 15 pages.

Keep the visual brand headline if desired, but add a clear adjacent sentence. Proposed factual positioning:

> Independent web designer and front-end developer based in Costa Rica, working remotely with businesses in the United States, Europe, and Costa Rica.

This states availability; it does not claim existing customers or offices in every market. Explain remote delivery on services and About, using confirmed working languages, meeting availability, asynchronous communication, ownership/handoff and support arrangements. Do not invent working hours, currencies accepted or turnaround promises.

### Market procedure

| Market | Initial approach | Avoid |
| --- | --- | --- |
| United States | English service pages; clear independent remote delivery and actual overlap availability | Fake US offices, city lists or “near me” targeting without local presence |
| Europe, English first | Same strong English service pages plus a remote collaboration page; review performance by individual country | Treating Europe as one language, cloning every country page, inventing European local presence |
| Costa Rica | Clear Costa Rica base and remote offer; English content supported by real Costa Rican project evidence | Maps/local-office claims for an online-only practice |

The `.me` domain can remain. Google treats `.me` as generic for search purposes, so a domain migration to `.com`, `.us` or a European domain is not required for this plan. [Google regional and multilingual guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)

### Google Business Profile

The owner confirmed remote services only. A Google Business Profile is therefore excluded from the procedure. Google's eligibility rules require qualifying in-person customer contact; a virtual address is not a substitute. Organic visibility in Costa Rica remains possible through relevant pages and reputation. [Google eligibility policy](https://support.google.com/business/answer/13763036)

## 3. Content and commercial relevance

### High: redesign service promise is inconsistent

The live `/services/ui-ux-design/` is titled “WEB REDESIGN Services,” while [service data](../../src/data/services.ts) describes UI/UX research, flows, wireframes and a standalone design handoff. Align the actual redesign offer across H1, metadata, audience, inclusions, process and FAQs. Preserve the existing URL during this first correction; evaluate a future slug migration separately using Search Console and a path-preserving redirect plan.

### High: proof is weaker than the service presentation

Projects identify roles, challenges and outcomes, but much of the outcome language is qualitative. Several images explicitly identify themselves as contextual imagery rather than screenshots of delivered work. Improve two real business case studies first with:

- The client's problem and actual project scope, with permissioned client/industry/location detail.
- Original project screenshots, named responsibilities, constraints and launch context.
- Verified measurements with dates/methods where available; otherwise use specific qualitative evidence without invented percentages.
- An attributable, approved testimonial and link to the shipped work when allowed.

Testimonials exist in a source component but are not rendered in the active homepage. Reuse approved evidence near relevant services and the inquiry section. Do not publish a testimonial merely because it exists in a file without confirming authorization.

### Medium: buyer questions and contact clarity

The active contact copy starts “Non of the available hours fits you…” and prioritizes scheduling unavailability. Introduce the inquiry directly, explain what information is needed and describe the actual follow-up process. Preserve the existing form, validation, language preference and email behavior.

Approximate live main-content counts include homepage 310 words, About 134, service pages 302–334 and case studies 207–224. These counts are descriptive, not an SEO pass/fail rule. Google's requirements are not an 800-word service-page minimum. Fill missing buyer questions and proof rather than adding filler.

## 4. International structure and language

Current English `html lang`, schema language and social locale are coherent with English content; `en-US` does not exclude European readers. Missing hreflang is not a current technical error.

Owner scope update: retain the existing English URLs and keep the entire website in English for the United States, Europe and Costa Rica. No Spanish pages, language selector or hreflang implementation are planned. Keep Costa Rica visible as the actual base and support market relevance with factual project evidence and useful remote-service information.

The form's preferred communication language is separate from website localization; preserve its current behavior and English automated confirmations. English-only content may reach fewer Spanish-language searches in Costa Rica; use country-level inquiry and search data to evaluate that tradeoff.

## 5. Schema and entity clarity

Existing source provides Person, Organization, WebSite, WebPage, Service, breadcrumbs and portfolio CreativeWork markup. These are useful semantic foundations. The deployed identifiers use the old hostname and should be corrected with the canonical deployment.

The current area mapping creates `Country` for every string. **Do not simply add “Europe” to that array.** Model it as `Continent`, or list verified target countries as `Country`; retain Costa Rica as the real operating base. Update visible coverage alongside schema. Add verified identity links/logo and include reusable Person/Organization nodes where needed for standalone page completeness, especially the About ProfilePage.

Schema describes the business; it does not create local offices or guarantee rankings/rich results. Do not add fake addresses, ratings, LocalBusiness locations, or FAQ/HowTo markup as a geographic ranking tactic. [Schema.org areaServed](https://schema.org/areaServed), [Google ProfilePage guidance](https://developers.google.com/search/docs/appearance/structured-data/profile-page)

## 6. Performance, images and mobile

Observed live homepage: document width equals viewport width at both 1920px and 375px; screenshots show no horizontal overflow in those sampled initial views. The mobile hero clearly renders its headline, paragraph and work CTA, but no geographic supporting statement. This is not a complete responsive/accessibility audit of every route or form state.

Source optimization candidates, requiring measurement before changes:

- External CSS font imports for multiple families introduce additional requests; consolidate unused faces and consider the existing Astro local-font pipeline.
- First three project images load eagerly below the full-screen hero; verify their actual viewport position before lowering their priority.
- The full icon font and GSAP/ScrollTrigger should be reviewed against actual network and main-thread cost.
- Replace contextual project imagery with appropriate real work where rights allow. Check descriptive alt on meaningful images and explicit empty alt on decorative logos. Live parsing found 31 images without an alt attribute, largely repeated shell imagery; current source already contains explicit empty logo alt, another deployment distinction to verify.

No LCP/INP/CLS field results were measured. Obtain mobile and desktop measurements, then prioritize actual regressions. Good p75 targets are LCP ≤2.5 seconds, INP ≤200ms and CLS ≤0.1. A screenshot or a request made from this audit machine is not regional field-performance evidence. [Google Web Vitals guidance](https://web.dev/articles/vitals)

## 7. Measurement and authority

The existing form emits `kiguidev:analytics` CustomEvents, but the source review found no connected analytics consumer. `lead_form_opened` currently runs at initialization, so it does not reliably mean a person started the form. Define actual interaction before using that event as a funnel denominator.

Establish Search Console queries/pages/country/device baselines and accepted-inquiry measurement. Keep US and Costa Rica separate, and inspect European countries individually before aggregating a Europe view. A language selection does not establish a visitor's country. Keep names, emails and project descriptions out of analytics.

External backlinks, domain authority, indexation and conversions were not measured. Earn relevant mentions through approved client credits, collaborators, professional profiles and useful original work; avoid paid link schemes and directory submissions at scale. The report does not treat a lack of search-tool results as proof that the site is unindexed.

## 8. Competitive samples

These are public provider examples discovered through broad web queries, not measured top-five competitors in every country's Google results. Prices, experience and compliance claims below are not independently verified or recommended for adoption.

| Example | Visible strategy worth studying | Kiguidev application |
| --- | --- | --- |
| [Andrey Fallas](https://andreyfallas.com/) | Spanish Costa Rica positioning, project proof and direct service language | Make Costa Rica relevance and delivery evidence equally easy to understand |
| [El Wizard](https://elwizard.net/es/hire) | Explicit Costa Rica base, remote Americas/Europe service and working languages | State real availability and process without claiming foreign offices |
| [Rabe Studio](https://rabestudio.de/english-web-designer/) | English-speaking buyer segment within a particular European market | Use real audience needs before deciding country pages are necessary |
| [B63](https://b63.eu/en/services/website-design/) | Specific small-business offer and scope presentation | Explain what the service includes and how an inquiry becomes a scoped project |
| [Kadrownia](https://kadrownia.com/en/services.html) | Search snippet presents remote delivery and explicit scope/add-ons | Review clarity of packaging; snippet evidence only, full page not fetched |

Broad developer queries also return hiring/job intent. Research buyer phrases around website development, redesign, mobile usability and remote project delivery rather than assuming “developer in Europe” always means someone hiring your services.

## 9. AI search, secondary

Readable static HTML, real authorship, clear service explanations and verifiable project evidence support discoverability across search systems. No measured AI citation/mention data was collected. An absent `llms.txt` is not a Google indexing defect, and no special AI schema/file is required for Google's AI features. [Google AI guidance](https://developers.google.com/search/docs/appearance/ai-features)

## 10. Guardrails and remaining verification

- No application source, Netlify settings, DNS, analytics accounts or public content was changed by this audit. No emails/forms/outreach were sent.
- Do not create cloned country/city pages or fake overseas addresses. Region-name substitutions with little distinct value can become doorway pages. [Google spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- Do not promise first-page placement, fixed traffic growth or a new market's leads before a baseline exists.
- Confirm actual deployed site/branch, Google-selected canonical, Search Console ownership, demand, keyword volumes, backlink profile, field performance and country-level conversions during implementation.
- The skill's content-length thresholds are editorial prompts; they are not Google's numerical requirements. Hreflang fallback is recommended, not universally mandatory.

Follow [ACTION-PLAN.md](ACTION-PLAN.md) for the implementation sequence, owners, gates and 90-day review.

## Subsequent implementation status — October 22, 2026

The owner authorized the initial domain corrections. The old Netlify hostname now has a host-specific 301 rule in local `netlify.toml`. Existing source already generates canonical, robots and sitemap URLs using `https://kiguidev.me`; no replacement SEO generator is needed. The live findings above remain the historical audit baseline. Deploying the current build and verifying the public responses are still required before marking the live issue resolved. See [the updated procedure](ACTION-PLAN.md).
