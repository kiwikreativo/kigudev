import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import submitLead from "../netlify/functions/submit-lead.ts";

const envKeys = ["RESEND_API_KEY", "LEAD_FROM_EMAIL", "LEAD_NOTIFICATION_EMAIL", "ADMIN_NOTIFICATION_TEMPLATE", "CLIENT_CONFIRMATION_TEMPLATE", "CLIENT_CONFIRMATION_TEMPLATE_ES", "RESEND_DEBUG_ERRORS", "CONTEXT"];
const previousEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
const oldFetch = globalThis.fetch;
const lead = (language = "en") => ({ name: "Avery Example", email: "avery@example.com", company: "Example Co", websiteUrl: "https://example.com", description: "We need a responsive site to explain our services and generate qualified inquiries.", service: "Website Development", budget: "Over $3,000", timeline: "As soon as possible", decision: "I am the decision-maker", language, privacyConsent: "accepted" });
const configure = () => Object.assign(process.env, { RESEND_API_KEY: "test-key", LEAD_FROM_EMAIL: "leads@kiguidev.me", LEAD_NOTIFICATION_EMAIL: "owner@kiguidev.me", ADMIN_NOTIFICATION_TEMPLATE: "admin-template", CLIENT_CONFIRMATION_TEMPLATE: "client-en", CLIENT_CONFIRMATION_TEMPLATE_ES: "client-es" });
const invoke = (body: unknown, method = "POST") => submitLead(new Request("https://example.test/.netlify/functions/submit-lead", { method, headers: { "content-type": "application/json" }, body: method === "POST" ? JSON.stringify(body) : undefined }));

afterEach(() => {
  for (const key of envKeys) previousEnv[key] === undefined ? delete process.env[key] : process.env[key] = previousEnv[key]!;
  globalThis.fetch = oldFetch;
});

test("sends admin template first, then English confirmation with correct recipients and reply-to", async () => {
  configure();
  const calls: Array<{ url: string; body: Record<string, any>; headers: Headers }> = [];
  globalThis.fetch = async (input, init) => { calls.push({ url: String(input), body: JSON.parse(String(init?.body)), headers: new Headers(init?.headers) }); return new Response("{}", { status: 200 }); };
  const result = await invoke({ ...lead(), description: "We need a site. <img src=x onerror=alert(1)>" });
  assert.equal(result.status, 200);
  assert.equal(calls.length, 2);
  assert.deepEqual(calls.map((call) => call.body.template.id), ["admin-template", "client-en"]);
  assert.equal(calls[0].body.from, "leads@kiguidev.me");
  assert.deepEqual(calls[0].body.to, ["owner@kiguidev.me"]);
  assert.equal(calls[0].body.reply_to, "avery@example.com");
  assert.equal(calls[0].body.template.variables.SCORE, "100");
  assert.equal(calls[0].headers.get("user-agent"), "kiguidev-lead-form/1.0");
  assert.equal(calls[0].body.template.variables.EMAIL, "avery@example.com");
  assert.equal(calls[0].body.template.variables.COMPANY, "Example Co");
  assert.match(calls[0].body.template.variables.DESCRIPTION, /&lt;img/);
  assert.deepEqual(calls[1].body.to, ["avery@example.com"]);
  assert.equal(calls[1].body.reply_to, "owner@kiguidev.me");
  assert.deepEqual(calls[1].body.template.variables, { NAME: "Avery Example" });
  assert.equal("html" in calls[0].body, false);
});

test("uses the Spanish confirmation template while keeping admin delivery first", async () => {
  configure();
  const templates: string[] = [];
  globalThis.fetch = async (_input, init) => { templates.push(JSON.parse(String(init?.body)).template.id); return new Response("{}", { status: 200 }); };
  const result = await invoke(lead("es"));
  assert.equal(result.status, 200);
  assert.deepEqual(templates, ["admin-template", "client-es"]);
});

test("does not return success when the admin notification is rejected", async () => {
  configure();
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response(JSON.stringify({ name: "validation_error" }), { status: 422 }); };
  const result = await invoke(lead());
  assert.equal(result.status, 502);
  assert.equal(calls, 1);
});

test("logs sanitized Resend validation details locally but keeps production logs minimal", async () => {
  configure();
  const originalError = console.error;
  const logs: unknown[][] = [];
  console.error = (...args) => { logs.push(args); };
  const privateDescription = lead().description;
  globalThis.fetch = async () => new Response(JSON.stringify({ name: "validation_error", message: `Variable EMAIL invalid for avery@example.com: ${privateDescription}` }), { status: 422 });
  try {
    process.env.CONTEXT = "dev";
    const devResponse = await invoke(lead());
    assert.equal(devResponse.status, 502);
    const devDetails = logs.at(-1)?.[1] as Record<string, unknown>;
    assert.match(String(devDetails.message), /Variable EMAIL invalid/);
    assert.doesNotMatch(String(devDetails.message), /avery@example.com|We need a responsive site/);

    process.env.CONTEXT = "production";
    await invoke(lead());
    const productionDetails = logs.at(-1)?.[1] as Record<string, unknown>;
    assert.equal("message" in productionDetails, false);
  } finally {
    console.error = originalError;
  }
});

test("keeps inquiry success if client confirmation fails after admin acceptance", async () => {
  configure();
  let calls = 0;
  globalThis.fetch = async () => new Response("{}", { status: ++calls === 1 ? 200 : 429 });
  const result = await invoke(lead());
  assert.equal(result.status, 200);
  assert.equal(calls, 2);
  assert.equal((await result.json()).confirmationSent, false);
});

test("rejects missing config, invalid input, honeypot, and non-POST requests without sending", async () => {
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response("{}", { status: 200 }); };
  configure();
  delete process.env.ADMIN_NOTIFICATION_TEMPLATE;
  assert.equal((await invoke(lead())).status, 503);
  assert.equal((await invoke({ ...lead(), email: "invalid" })).status, 400);
  assert.equal((await invoke({ ...lead(), website: "spam" })).status, 200);
  assert.equal((await invoke(null, "GET")).status, 405);
  assert.equal(calls, 0);
});

test("reports missing sender, API key, or notification recipient as configuration errors", async () => {
  configure();
  globalThis.fetch = async () => new Response("{}", { status: 200 });
  for (const key of ["LEAD_FROM_EMAIL", "RESEND_API_KEY", "LEAD_NOTIFICATION_EMAIL"] as const) {
    const value = process.env[key];
    delete process.env[key];
    assert.equal((await invoke(lead())).status, 503, `${key} should be required`);
    process.env[key] = value;
  }
});
