import { parseArgs } from "node:util";
import submitLead from "../netlify/functions/submit-lead.ts";

// This tool cannot target a URL. Every provider request is intercepted in-process.
const { values } = parseArgs({ options: {
  concurrency: { type: "string", default: "50" }, count: { type: "string", default: "100" },
  rate: { type: "string", default: "0" }, delay: { type: "string", default: "10" },
  "upstream-status": { type: "string", default: "200" },
} });
const concurrency = Number(values.concurrency), count = Number(values.count), rate = Number(values.rate), delay = Number(values.delay), upstream = Number(values["upstream-status"]);
if (![concurrency, count, rate, delay, upstream].every(Number.isInteger) || concurrency < 1 || concurrency > 1000 || count < 1 || count > 5000 || rate < 0 || rate > 1000 || delay < 0 || delay > 1000 || ![200, 400, 422, 429, 500].includes(upstream)) throw new Error("Use concurrency 1–1000, count 1–5000, rate 0–1000/s (0=unpaced), delay 0–1000ms, upstream-status 200/400/422/429/500.");
Object.assign(process.env, { RESEND_API_KEY: "mock-only", LEAD_FROM_EMAIL: "sender@example.test", LEAD_NOTIFICATION_EMAIL: "owner@example.test", ADMIN_NOTIFICATION_TEMPLATE: "mock-admin", CLIENT_CONFIRMATION_TEMPLATE: "mock-client", CONTEXT: "test", RESEND_DEBUG_ERRORS: "false" });
let calls = 0, cursor = 0, loggedFailures = 0;
globalThis.fetch = async (input) => {
  if (String(input) !== "https://api.resend.com/emails") throw new Error("Unexpected network target blocked");
  calls++;
  await new Promise((resolve) => setTimeout(resolve, delay));
  return new Response(JSON.stringify(upstream === 200 ? { id: "mock-email" } : { name: upstream === 429 ? "rate_limit_exceeded" : "mock_failure" }), { status: upstream, headers: { "retry-after": "1" } });
};
console.error = () => { loggedFailures++; };
const statuses: Record<string, number> = {}, categories: Record<string, number> = {}, latencies: number[] = [];
const start = performance.now();
await Promise.all(Array.from({ length: Math.min(concurrency, count) }, async () => {
  while (true) {
    const index = cursor++;
    if (index >= count) return;
    if (rate) await new Promise((resolve) => setTimeout(resolve, Math.max(0, start + index * 1000 / rate - performance.now())));
    const body = { name: `Synthetic ${index}`, email: `load-${index}@example.test`, description: "Synthetic project for local mocked capacity testing only.", service: "Mobile Enhacement", budget: "Over $3,000", timeline: "Within a month", decision: "I am the decision-maker", language: "en", privacyConsent: "accepted" };
    const began = performance.now();
    const result = await submitLead(new Request("https://example.test/.netlify/functions/submit-lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }));
    latencies.push(performance.now() - began);
    statuses[result.status] = (statuses[result.status] || 0) + 1;
    const code = (await result.json()).code || "ok";
    categories[code] = (categories[code] || 0) + 1;
  }
}));
latencies.sort((a, b) => a - b);
const success = statuses[200] || 0;
console.log(JSON.stringify({ mode: "in-process mocked provider; not production capacity", concurrency, count, rate, providerDelayMs: delay, upstreamStatus: upstream, successes: success, failures: count - success, errorRate: (count - success) / count, statuses, categories, providerCalls: calls, actualEmails: 0, loggedFailures, elapsedMs: Math.round(performance.now() - start), averageMs: +(latencies.reduce((sum, value) => sum + value, 0) / count).toFixed(2), p95Ms: +latencies[Math.ceil(count * .95) - 1].toFixed(2), p99Ms: +latencies[Math.ceil(count * .99) - 1].toFixed(2) }, null, 2));
