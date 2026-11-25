<p align="center">
  <img src="public/og-image.jpg" alt="Kiguidev: Guillermo Obando, web designer and front-end developer" width="720">
</p>

# Kiguidev

The portfolio and client site of **Guillermo Obando**, a web designer and
front-end developer in Alajuela, Costa Rica, working with local businesses and
remote clients in the US.

Live at **[kiguidev.me](https://kiguidev.me)**.

## What's inside

| Route | Source | Content |
| --- | --- | --- |
| `/` | `src/pages/index.astro` | Hero, selected work, services, process, contact form |
| `/about/` | `src/pages/about.astro` | Story, working principles, mission, process |
| `/projects/` and `/projects/[slug]/` | `src/data/projects.ts` | Case studies |
| `/services/` and `/services/[slug]/` | `src/data/services.ts` | Service pages |
| `/faq/`, `/privacy-policy/`, `404` | `src/pages/` | Supporting pages |
| `/robots.txt`, `/sitemap-index.xml` | `src/pages/robots.txt.ts`, `@astrojs/sitemap` | Generated at build |

The contact form is a multi-step lead qualification flow. It submits to a
Netlify function that validates the inquiry, scores it, and sends an admin
notification and a client confirmation email through Resend. High-priority
leads are offered a Calendly link to book a call.

## Stack

- **[Astro](https://astro.build)** with plain CSS and custom properties, built
  on the [Lumos for Astro](https://lumosframework.com) component framework
- **GSAP + ScrollTrigger** for motion (respects `prefers-reduced-motion`)
- **Phosphor Icons**
- **`astro:assets` + sharp** for responsive WebP images
- **Netlify** for hosting and the `submit-lead` function
- **Resend** for transactional email, **Calendly** for scheduling

## SEO

- Canonical, Open Graph and Twitter tags on every page
  (`src/components/Utility/BaseHead.astro`), with `public/og-image.jpg` as the
  default share image
- JSON-LD entity graph: Person, Organization/ProfessionalService, WebSite,
  plus per-page ProfilePage, Service, CreativeWork and BreadcrumbList
  (`src/utils/structuredData.ts`)
- Sitemap, robots.txt and noindex rules (`src/utils/seo.ts`)
- Security headers, immutable caching for `/_astro/*` and a 301 from the
  `.netlify.app` domain in `netlify.toml`

## Getting started

Requires **Node 22.12** or newer and **pnpm**.

```sh
pnpm install
cp .env.example .env   # then fill in the values
pnpm dev               # or: astro dev --background
```

The site runs at <http://localhost:4321>. To test the contact form locally,
run it through `netlify dev` so the function is served too.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key used by the lead function |
| `LEAD_FROM_EMAIL` | Sender address for lead emails |
| `LEAD_NOTIFICATION_EMAIL` | Inbox that receives new-lead notifications |
| `ADMIN_NOTIFICATION_TEMPLATE` | Resend template for the admin notification |
| `CLIENT_CONFIRMATION_TEMPLATE` | Resend template for the client confirmation |
| `CALENDLY_URL` | Booking link shown to high-priority leads |
| `RESEND_DEBUG_ERRORS` | Optional. `true` returns detailed errors outside Netlify Dev; keep `false` in production |

Set the same variables in the Netlify site settings for production.

## Scripts

| Script | What it does |
| --- | --- |
| `pnpm dev` | Starts the dev server |
| `pnpm build` | Builds the site to `dist/` |
| `pnpm preview` | Serves the built site |
| `pnpm check` | Type-checks every `.astro` and `.ts` file |
| `pnpm test` | Runs the lead function tests in `tests/` |
| `pnpm test:lead-load` | Load-tests lead submissions (`scripts/load-leads.ts`) |
| `pnpm test:lead-browser` | Submits the form in a real browser (`scripts/test-lead-browser.mjs`) |
| `pnpm format` | Formats the project with Prettier |

## Project structure

```text
src/
  components/
    Portfolio/   page sections and page content (Home, About, Project, Service...)
    Global/      Nav, Footer
    Utility/     BaseHead (meta, social tags, theme)
    ...          Lumos primitives: Typography, Wrapper, Media, Form, Interactive
  data/          projects, services, process steps
  utils/         structured data, SEO rules, lead validation and scoring
  styles/        tokens, patterns and utilities (CSS layers)
  assets/        images and fonts, optimized at build
netlify/functions/  submit-lead.ts
tests/              lead function tests
scripts/            lead load and browser tests
docs/               lead qualification, color palette, SEO notes
```

## Working on it

- **[LUMOS.md](LUMOS.md)**: how pages, components and styles are built here.
  Read it before adding anything.
- **[Design.md](Design.md)**: design rules for redesign work.
- **[docs/](docs/)**: lead qualification and reliability notes, color palette,
  SEO audit notes.
- **`.claude/skills/`**: Lumos task skills (Figma or Webflow import, upgrades,
  prop audits).

## Credits and license

Built on [Lumos for Astro](https://lumosframework.com) by Timothy Ricks, used
under the [MIT License](LICENSE). Site content, case studies and images are
© Guillermo Obando and are not covered by that license.
