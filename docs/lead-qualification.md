# Kiguidev lead qualification

## Feature and architecture

The homepage contact section now presents a six-step project inquiry, retaining the existing direct email and Calendly links. Browser code only collects answers and sends JSON to `/.netlify/functions/submit-lead`; `netlify/functions/submit-lead.ts` validates the request, calculates the internal score, and sends both emails through the Resend HTTP API. No database or client score is used. Astro remains static; Netlify serves the function from `netlify/functions`.

## User journey and questions

1. Service: Website Development, Website Redesign, SEO & Search Visibility, UI/UX Design, or Other / Not Sure Yet.
2. Project description: 20–3,000 characters.
3. Budget: Under $500, $500–$1,500, $1,500–$3,000, Over $3,000, or Not sure yet.
4. Timeline: As soon as possible, Within a month, Within three months, or Just exploring.
5. Decision: decision-maker, team, or approval required.
6. Name, email, optional company and website, and required consent linked to `/privacy-policy`.

Back/Continue preserve browser form values. Native validity checks, focus, disabled-submit state, status announcements, and a honeypot are used. The post-submit Calendly link appears for high-priority submissions only. Calendly owns availability, calendar sync, and Google Meet creation. Confirmation copy is English or Spanish based on the submitted `language` field; the current form sends English.

## Scoring

Budget: 5 / 15 / 25 / 30 / 10 points in the order listed above. Timeline: 25 / 20 / 10 / 0. Decision: 20 / 15 / 5. Service: 25 / 25 / 20 / 20 / 5. `src/utils/leadScoring.ts` adds the values. Scores 70–100 are high, 40–69 medium, and 0–39 low. This is an internal triage heuristic, not a measure of prospect value. The visitor never sees the score.

## Email and delivery limits

The function sends an internal notification to `LEAD_NOTIFICATION_EMAIL` with Reply-To set to the prospect, then sends a confirmation to the prospect with Reply-To set to the owner. A failed internal email returns an error so the browser does not claim receipt. If internal delivery succeeds and confirmation fails, the endpoint still reports successful receipt and sets `confirmationSent: false`; the visitor success screen avoids encouraging a duplicate. User text variables are HTML-escaped once before sending to Resend templates, so use them as raw HTML interpolation in the published templates (as in Resend's `{{{VARIABLE}}}` examples), not through a second escaping layer. During local development (`CONTEXT=dev`) the function logs a sanitized Resend validation message; set `RESEND_DEBUG_ERRORS=true` to opt into the same detail elsewhere. Production logs omit the provider message. The API key is only read at function runtime.

Email-only storage means there is no durable retry queue, submission history, or reliable deduplication. The honeypot is a basic spam measure; robust bot verification and cross-instance rate limiting require a provider-side control or persistent service and are not implemented. Email provider delivery and deliverability remain subject to Resend configuration and account limits.

## Environment variables

The function uses the existing `ADMIN_NOTIFICATION_TEMPLATE` and `CLIENT_CONFIRMATION_TEMPLATE` names; `RESEND_ADMIN_TEMPLATE_ID` and `RESEND_CLIENT_TEMPLATE_EN_ID` are accepted as aliases. Spanish confirmation uses `CLIENT_CONFIRMATION_TEMPLATE_ES` (or `RESEND_CLIENT_TEMPLATE_ES_ID`). Set these to the published Resend template IDs or aliases; never use example placeholders. Copy `.env.example` to local `.env` and fill in `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, sender, admin template, and English and Spanish confirmation templates. `.env` is ignored and is not deployed. In Netlify, set these variables with scope available to Functions. Production builds do not need a key. Missing admin configuration prevents processing; if the internal email is accepted but a language template is missing or fails, the inquiry still succeeds and the failure is logged without personal information.

## Local testing

Run `npx netlify dev` from the repository with `.env` present (Netlify CLI loads local environment variables). Restart Netlify Dev after changing `.env`; use its reported local URL rather than assuming a port. With valid credentials it can send real email; submit the form using controlled test recipients only when intentionally testing delivery. Do not expose the local server publicly. Automated checks should mock `fetch` to `api.resend.com`; no real email is sent by build/check commands. In Resend, copy each published template's ID or alias into the matching environment variable. For admin template failures, check its published status, required variable keys, sender verification, Resend API key, rate limits, and Netlify Function scope. Client template failures are logged as `client_confirmation` with status and a safe error code; internal delivery remains successful. Calendly links do not create bookings until a visitor completes Calendly's own flow.

## DNS, domain, and redirects

Netlify DNS is authoritative because the domain nameservers point to Netlify. Do not edit DNS at GoDaddy. In Netlify, verify the domain is attached to the existing site and marked primary; check Netlify DNS delegation/nameservers, apex and `www` hostnames, and certificate status. Confirm HTTPS works for both hosts and that the chosen canonical host redirects the other with a permanent redirect. The source canonical, social URLs, structured data, and sitemap now use `https://kiguidev.me`. The current `netlify.toml` intentionally does not invent redirect or DNS rules; configure host routing in the existing Netlify site after verifying its domain association. The previous Netlify subdomain is retained as a historical deployment reference only.

## Analytics

The form emits a provider-neutral `kiguidev:analytics` browser event for open, step completion, validation failure, submission, failure, and Calendly click. No analytics provider exists in this repository, so events are not sent to an external analytics system. Event payloads contain no personal information or score.

## Deploy and acceptance checklist

Deploy a Netlify Deploy Preview after configuring the four function environment variables. Confirm the function is included, static pages/assets and existing routes load, canonical URLs use the production domain, and no environment file is deployed. In the preview, manually submit a controlled inquiry and verify the internal notification and visitor confirmation, then confirm only a high-score result offers Calendly. Test keyboard step navigation, invalid fields, mobile layout, honeypot behavior, and direct email fallback. Verify DNS delegation, domain association, apex/`www`, HTTPS, and canonical redirects in Netlify. No real delivery, DNS state, redirect behavior, or booking has been verified from this code change.
