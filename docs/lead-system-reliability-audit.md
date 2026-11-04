# Lead system reliability audit

Audit date: October 22, 2026. All email delivery in automated checks was mocked. No production traffic, real email, credentials, or template changes were used.

## 1. Executive Summary

The recurring HTTP 400 has a reproducible application validation cause: the form offered service values absent from server validation. The displayed email-service message misidentified that failure. Both new service labels now share their definitions with the backend. Validation, scoring, template dispatch order, and partial-success behavior have regression coverage.

The code handles normal inquiries in mocked unit and browser checks. High-volume readiness is not established: there is no shared rate limiter, durable storage, queue, or cross-request deduplication. Actual Netlify and Resend plans and remaining quotas are unavailable from this checkout.

## 2. HTTP 400 Root Cause

Before the correction, select options without explicit `value` attributes submitted their displayed text. `Local SEO & Geographic SEO` and the newly added `Mobile Enhacement` did not match the function's accepted values. The function returned 400 during validation, before configuration, scoring, or any Resend call. Meanwhile the browser called every non-503 status an email-service error.

Evidence: a new regression test submitting the SEO option failed with `400 !== 200` against the original function. Following the shared-option correction, both new services return 200 with finite scores under mocked delivery. Legacy `SEO & Search Visibility` and `UI/UX Design` remain accepted for older open tabs. Unicode dashes in budget values are preserved, not replaced with ASCII hyphens.

To reproduce the original defect: select either new service, complete all six steps with valid details and consent, and submit to the original function. Restarting that same mismatched implementation does not fix the mismatch. **The historical restart-dependent behavior is not independently confirmed.** Earlier explanations claiming a restart loaded different code were hypotheses, not measured evidence. Frontend watcher reload was tested successfully after this correction; the actual Netlify Dev function rebuild/proxy sequence remains unverified because Netlify CLI is not installed here.

The mismatch affects production too if an incompatible frontend/function pair is deployed. Shared options prevent future ordinary label edits from independently changing only one side. `.env` changes still require restarting Netlify Dev. No service worker registration was found in `src`.

## 3. Request Lifecycle

1. Astro renders options from `src/utils/leadValidation.ts`, with explicit values. The client uses native field checks and shared whole-submission validation before dispatching JSON. Invalid earlier fields are focused in their own step. An in-flight form flag blocks duplicate submit events; existing listener cleanup uses AbortController.
2. Netlify routes `/.netlify/functions/submit-lead` to the function. Each invocation creates an independent request ID. The body is read with a 32,000-byte cap, then parsed and checked for object shape. This byte cap allows the full 3,000-character description with UTF-8/JSON escaping; field character limits are enforced separately.
3. Honeypot submissions return a neutral success without sending. Shared validation checks required fields, exact options, consent, email, language, website URL and lengths. Excess field data is rejected rather than silently truncated; existing trimming is retained.
4. Runtime environment configuration is checked; unchanged score arithmetic and priority thresholds classify the lead. New SEO/mobile services each receive 20 service points, matching the existing SEO/UI enhancement weights. Sender, Reply-To and published template aliases are unchanged. `preferredLanguage` records English/Spanish for personal follow-up and populates admin `LANGUAGE`; legacy requests fall back to valid `language`, then English. All automated confirmations use `CLIENT_CONFIRMATION_TEMPLATE` or its English fallback alias; previously configured Spanish template variables are unused.
5. Admin notification is awaited first. Each provider request has a 10-second abort deadline. If the admin send fails, confirmation is not attempted. The function performs no automatic retries.
6. English client confirmation is awaited only after admin acceptance. A missing/failed confirmation returns 200 with `confirmationSent: false`, retaining receipt success so the visitor is not encouraged to duplicate an already accepted inquiry. The success view shows its inbox/spam reminder only for `confirmationSent === true`. Honeypot responses explicitly return false. Provider acceptance does not prove delivery to Zoho or the visitor inbox.
7. The client requires both a successful HTTP status and `ok: true`, then reveals the success view. Errors preserve entered values and restore controls. The character counter is initialized with the form and cleaned up with the same listener controller across navigation/reload.

Error responses retain `error` and add a safe `code`, `requestId`, and `X-Request-ID`. Existing success fields remain intact with an additive request ID. The browser never displays raw provider messages.

| Response | Category / behavior |
| --- | --- |
| 400 | Invalid JSON/object or field validation; returns field names, never values |
| 405 | Unsupported method; reload guidance |
| 413 | Body exceeds byte cap; field limits remain separate |
| 429 | Browser supports rate-limit responses from platform controls; application currently emits no local 429 |
| 500 | Unexpected application failure; safe generic message |
| 502 | Admin provider failure, including upstream 400/422/429/500 or timeout |
| 502 + `rate_limited` | Upstream 429; safe numeric Retry-After is forwarded, visitor is asked to wait |
| 503 | Missing admin delivery configuration |

Upstream 429 stays 502 to preserve existing endpoint status behavior. No retry loop or browser countdown is introduced. Provider rate limits and quota exhaustion both use this safe rate-limit category.

Development diagnostics (`CONTEXT=dev` or `RESEND_DEBUG_ERRORS=true`) record method, normalized content type, bytes, stage, invalid field names, status and elapsed function time. Provider stages include upstream status and timing on success; failure logs include request ID and safe provider code. Sanitized provider detail is available only with these diagnostics enabled. Production failure logs retain minimal operational metadata. Raw payloads, lead field values, authorization headers, environment variables and stack traces are not logged by the new diagnostics.

## 4. Concurrency and Scalability

Invocations share no mutable lead state. Two provider sends per successful lead remain sequential within each invocation, but different invocations call Resend concurrently. There is no global dispatch scheduler or protective server rate limit. Disabling a button and a honeypot do not protect against distributed scripts.

[Netlify's current function configuration documentation](https://docs.netlify.com/build/functions/configuration/) lists 60 seconds for synchronous execution, a 6 MB buffered request/response limit and 1024 MB default memory. This function's own payload limit is much smaller. The repo specifies no custom memory, region, timeout or rate-limit policy. These documented defaults do not verify this deployed project's actual account configuration, billing allowance, or concurrent invocation ceiling. No verified numeric Netlify concurrency ceiling is available here.

For provider capacity `R` API calls/second shared by the team, at most `R / 2` complete two-email inquiries/second can be sustained in an ideal paced workload. Other applications and retries reduce that budget. This is a rate estimate, not a concurrency guarantee.

| Simultaneous valid leads | Maximum send attempts if all succeed | Potential emails | Ideal dispatch seconds at 10 calls/s with pacing |
| ---: | ---: | ---: | ---: |
| 10 | 20 | 20 | 2 |
| 50 | 100 | 100 | 10 |
| 100 | 200 | 200 | 20 |
| 500 | 1,000 | 1,000 | 100 |
| 1,000 | 2,000 | 2,000 | 200 |

These are theoretical demand totals. The current function does not perform that pacing or keep a durable queue. In a real simultaneous burst many admin calls could be rejected with upstream 429 (client receives 502 + rate_limited), or admin sends could succeed while confirmations fail. Exact accepted/rejected counts and p95/p99 production latency cannot be predicted without account settings, timing, current quotas and platform measurements. No successful-production-capacity claim follows from the mock benchmark.

## 5. Resend Limitations

[Current usage-limit documentation](https://resend.com/docs/api-reference/rate-limit) states a default of 10 API requests/second per team, shared across keys, with rate-limit and Retry-After headers. The project's actual team rate is unverified. Direct `fetch` performs no provider SDK retries.

[Account quota documentation](https://resend.com/docs/knowledge-base/account-quotas-and-limits) lists Free transactional allowances of 100 emails/day and 3,000/month. Paid transactional plans have monthly quotas and no daily quota. The account's plan, remaining quota and all other email usage are unknown. With no other quota usage, two sends per lead would consume Free allowance at 50 leads/day or 1,500/month; those are conditional arithmetic ceilings, not this project's confirmed allowance.

Resend's [idempotency feature](https://resend.com/docs/dashboard/emails/idempotency-keys) retains keys for 24 hours. Adopting it safely requires a stable submission key and stable provider payload, including `SUBMITTED`, across retries. The existing per-request timestamp means simply adding a reused header can cause payload conflicts. Provider idempotency and cross-instance deduplication are recommendations, not implemented guarantees.

## 6. Load Test Results

Measured locally using Node's actual handler and Web Request/Response objects, with all fetches replaced by a 10ms synthetic provider. One batch per concurrency value, one request per worker. In-process timings include parsing, validation, scoring and both synthetic sends; they exclude real sockets, Netlify scheduling/proxy/cold starts, Resend rate limiting and inbox delivery. Actual emails and quota consumption: **zero**.

| Concurrent workers | Requests | Success | Failed | Error rate | Average ms | p95 ms | p99 ms | Provider calls |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 10 | 10 | 10 | 0 | 0% | 55.49 | 79.62 | 79.62 | 20 |
| 50 | 50 | 50 | 0 | 0% | 66.26 | 67.07 | 90.90 | 100 |
| 100 | 100 | 100 | 0 | 0% | 89.68 | 93.52 | 93.61 | 200 |
| 500 | 500 | 500 | 0 | 0% | 270.85 | 288.62 | 289.06 | 1,000 |
| 1,000 | 1,000 | 1,000 | 0 | 0% | 334.75 | 342.36 | 343.12 | 2,000 |

Successful scenario statuses were all 200; HTTP 429 and 5xx counts were zero. These synthetic provider successes deliberately do not simulate production limits.

Failure scenarios (50 workers, 100 requests, 10ms fake provider):

| Provider response | Successful inquiries | Client 502 | Average ms | p95 ms | p99 ms | Provider calls |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Always 429 | 0 | 100 | 27.14 | 46.49 | 47.60 | 100 |
| Always 500 | 0 | 100 | 24.38 | 41.43 | 42.37 | 100 |

The 429 scenario returned `rate_limited` for every failure. These scenarios verify failure propagation, not the provider's exact burst acceptance algorithm. A separate paced run (10 requests, 20 starts/s, 1ms synthetic delay) completed in 453ms with 10 successful inquiries and 20 fake provider calls.

Reusable commands:

```sh
npm test
npm run test:lead-load -- --concurrency 50 --count 100 --rate 10
npm run test:lead-load -- --concurrency 1000 --count 1000 --delay 10
npm run test:lead-load -- --concurrency 50 --count 100 --upstream-status 429
npm run test:lead-load -- --concurrency 50 --count 100 --upstream-status 500
```

The load script has no remote URL option, overrides the API key with a mock, intercepts every fetch, uses synthetic data and caps concurrency at 1,000 and count at 5,000. Rate is submission starts per second; zero means unpaced. These controls make production load testing impossible through this script.

Browser verification uses an existing Playwright installation (not a new site dependency), a local Astro server, actual form JavaScript, and the real handler via a route intercepted in the test process. All provider calls are mocked. Start Astro using `npx astro dev --background` and run `npm run test:lead-browser`. The default URL is localhost:4321; set `LEAD_TEST_URL` to the reported local server URL if Astro chooses a different port. Non-local/non-HTTP URLs are rejected. If Playwright is installed outside this project, set `PLAYWRIGHT_MODULE` to its module path and optionally `PLAYWRIGHT_EXECUTABLE` to the installed Chromium executable.

The browser script exercises both new services and both language preferences at 390px and 1440px widths, checks two immediate submit events produce one request, confirms an injected server validation failure displays validation guidance, checks reminder visibility for accepted/failed confirmations and failed inquiries, and submits after a watcher-triggered reload. It updates only the component's modification time to trigger that reload; file contents are preserved. It does not emulate Netlify Dev's actual proxy/function builder. Full Netlify rebuild/HMR reproduction remains pending.

## 7. Identified Risks

| Severity | Risk |
| --- | --- |
| High | Unpaced distributed bursts can exhaust Resend rate/quota allowance; no durable lead storage protects failed sends |
| High | Network timeouts can occur after provider acceptance; deliberate retries/new tabs can duplicate emails without stable idempotency |
| Medium | Confirmation can fail after admin success; receipt remains successful and failure is logged, but confirmation has no durable retry |
| Medium | Actual Netlify limits, provider quota and production delivery are unverified |
| Medium | Netlify Dev restart-dependent symptoms not reproduced end to end |
| Low | Legacy service labels accepted for compatibility; current UI uses shared options |

No confirmed critical finding was established by this audit.

## 8. Implemented Fixes

- Shared options and validation remove current service drift while retaining legacy request values. New mobile spelling is preserved exactly as supplied: `Mobile Enhacement`.
- Existing priority arithmetic and thresholds are retained; new service weights are finite. Existing published templates and configuration names are retained.
- Type checking requires a scoring weight for every current service, so adding an option cannot silently leave its score undefined.
- Whole-form validation, optional URL checks and matching input limits prevent incomplete earlier steps and invalid final fields from reaching email delivery.
- Accurate safe browser error categories distinguish validation, provider, configuration, size, rate and unexpected failures.
- Correlation IDs and opt-in diagnostic metadata support tracing without lead payload logging.
- Provider deadlines bound network waiting. Automatic retries are omitted because ambiguous failures can duplicate emails.
- In-flight guard prevents duplicate submit events within the live form. It intentionally makes no cross-tab or cross-instance deduplication claim.
- Bounded byte parsing preserves the full permitted description; oversized fields are rejected instead of silently shortened.
- Mocked regression, browser and local load tools cover the correction and failure paths.

## 9. Recommended Improvements

Immediate (low complexity, no new infrastructure): verify the deployed account plans/remaining quotas and monitor safe request IDs; review application failures alongside Resend acceptance/delivery logs. Keep production diagnostic detail disabled unless troubleshooting. Test actual inbox delivery only with explicit authorization.

Short-term (moderate complexity): check availability/cost of Netlify's managed per-client and overall rate controls on the actual plan before configuring thresholds. A starting policy should be chosen from expected inquiry traffic and the confirmed shared Resend allowance. No per-process Map should be the sole production limiter. Add stable submission identifiers and stable payload timestamps before provider idempotency or bounded Retry-After/backoff retries. A limiter slows abuse; it does not make successful receipt durable.

Long-term (high complexity, infrastructure and possible ongoing cost): if bursts must be accepted reliably, add durable lead storage and queued email processing with bounded provider dispatch, retry/backoff, dead-letter handling and delivery monitoring. This changes what an accepted submission means and requires a separate design and infrastructure decision. No queue, database, paid service or template change is part of this correction.

## 10. Production Readiness

The language/reminder update passed 22 automated regression tests, Astro checks across 78 files and a 16-page static build. Browser checks passed for both preferences, accepted/failed confirmation visibility, failed inquiries, duplicate prevention and frontend reload. During this update, the browser test initially failed the reminder check against an existing process on port 4321; it passed against the fresh managed Astro server on its reported port 4322. The older process was not investigated or stopped, so its discrepancy is not a confirmed Netlify reload root cause. No separate lint command is configured. `git diff --check` is the whitespace check. Browser/build commands may require permission escalation for local process/listener access.

Normal inquiry behavior is supported by mocked regression and browser tests; actual deployment and inbox delivery remain to be checked. This synchronous, email-only architecture does not guarantee delivery for high-volume bursts. A 1,000-user simultaneous submission event can create up to 2,000 send attempts; actual delivery counts depend on quotas, team rate windows and platform scheduling. The current load results must not be used to promise that production capacity.

For a recurring local failure, capture the browser's response status, safe code, X-Request-ID and validation field names, then find the matching terminal log. Record the edit made, dev-server URL/port and reload/build result. A 400 at `validation` is an application issue; a 502 at `admin_notification` is provider/network related. For the pending Netlify Dev reload check, use a separately configured mocked provider transport, submit before/after a frontend edit, then before/after a function edit, and inspect rebuild logs and request IDs. Do not perform this sequence using live Resend credentials.
