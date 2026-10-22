import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import submitLead from "../netlify/functions/submit-lead.ts";
import { leadOptions } from "../src/utils/leadValidation.ts";
import { leadErrorMessage } from "../src/utils/leadErrors.ts";

const envKeys = ["RESEND_API_KEY", "LEAD_FROM_EMAIL", "LEAD_NOTIFICATION_EMAIL", "ADMIN_NOTIFICATION_TEMPLATE", "CLIENT_CONFIRMATION_TEMPLATE", "CLIENT_CONFIRMATION_TEMPLATE_ES", "RESEND_ADMIN_TEMPLATE_ID", "RESEND_CLIENT_TEMPLATE_EN_ID", "RESEND_CLIENT_TEMPLATE_ES_ID", "RESEND_DEBUG_ERRORS", "CONTEXT"];
const previousEnv = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
const oldFetch = globalThis.fetch;
const lead = (language = "en") => ({ name: "Avery Example", email: "avery@example.com", company: "Example Co", websiteUrl: "https://example.com", description: "We need a responsive site to explain our services and generate qualified inquiries.", service: "Website Development", budget: "Over $3,000", timeline: "As soon as possible", decision: "I am the decision-maker", language, privacyConsent: "accepted" });
const configure = () => {
  Object.assign(process.env, { RESEND_API_KEY: "test-key", LEAD_FROM_EMAIL: "leads@kiguidev.me", LEAD_NOTIFICATION_EMAIL: "owner@kiguidev.me", ADMIN_NOTIFICATION_TEMPLATE: "admin-template", CLIENT_CONFIRMATION_TEMPLATE: "client-en", CLIENT_CONFIRMATION_TEMPLATE_ES: "client-es", CONTEXT: "test", RESEND_DEBUG_ERRORS: "false" });
  for (const key of ["RESEND_ADMIN_TEMPLATE_ID", "RESEND_CLIENT_TEMPLATE_EN_ID", "RESEND_CLIENT_TEMPLATE_ES_ID"]) delete process.env[key];
};
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

test("legacy Spanish language uses English confirmation while keeping admin delivery first", async () => {
  configure();
  const templates: string[] = [];
  globalThis.fetch = async (_input, init) => { templates.push(JSON.parse(String(init?.body)).template.id); return new Response("{}", { status: 200 }); };
  const result = await invoke(lead("es"));
  assert.equal(result.status, 200);
  assert.deepEqual(templates, ["admin-template", "client-en"]);
});

test("preferred language controls admin LANGUAGE but confirmations always use English", async () => {
  configure();
  for (const [payload, language] of [
    [{ ...lead(), preferredLanguage: "en" }, "English"],
    [{ ...lead(), preferredLanguage: "es" }, "Spanish"],
    [{ ...lead("es"), preferredLanguage: "en" }, "English"],
    [lead("es"), "Spanish"],
    [{ ...lead(), language: undefined }, "English"],
  ] as const) {
    const calls: Array<Record<string, any>> = [];
    globalThis.fetch = async (_input, init) => { calls.push(JSON.parse(String(init?.body))); return new Response("{}"); };
    const result = await invoke(payload);
    assert.equal(result.status, 200);
    assert.equal((await result.json()).confirmationSent, true);
    assert.equal(calls[0].template.variables.LANGUAGE, language);
    assert.equal(calls[0].template.variables.SCORE, "100");
    assert.equal(calls[1].template.id, "client-en");
  }
});

test("invalid explicit language preferences fail safely before email delivery", async () => {
  configure();
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response("{}"); };
  for (const preferredLanguage of ["fr", "", "ES", " en ", null, 42, ["en"]]) {
    const result = await invoke({ ...lead(), preferredLanguage });
    assert.equal(result.status, 400);
    assert.deepEqual((await result.json()).fields, ["preferredLanguage"]);
  }
  assert.equal(calls, 0);
});

test("English confirmation alias works for Spanish preference without a Spanish template", async () => {
  configure();
  delete process.env.CLIENT_CONFIRMATION_TEMPLATE;
  delete process.env.CLIENT_CONFIRMATION_TEMPLATE_ES;
  process.env.RESEND_CLIENT_TEMPLATE_EN_ID = "english-alias";
  const templates: string[] = [];
  globalThis.fetch = async (_input, init) => { templates.push(JSON.parse(String(init?.body)).template.id); return new Response("{}"); };
  const result = await invoke({ ...lead(), preferredLanguage: "es" });
  assert.equal(result.status, 200);
  assert.equal((await result.json()).confirmationSent, true);
  assert.deepEqual(templates, ["admin-template", "english-alias"]);
});

test("accepts the current SEO and mobile options with finite template scores", async () => {
  configure();
  const scores: string[] = [];
  globalThis.fetch = async (_input, init) => {
    const variables = JSON.parse(String(init?.body)).template.variables;
    if ("SCORE" in variables) scores.push(variables.SCORE);
    return new Response("{}", { status: 200 });
  };
  for (const service of ["Local SEO & Geographic SEO", "Mobile Enhacement"]) {
    assert.equal((await invoke({ ...lead(), service })).status, 200, service);
  }
  assert.deepEqual(scores, ["95", "95"]);
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
  const honeypot = await invoke({ ...lead(), website: "spam" });
  assert.equal(honeypot.status, 200);
  assert.equal((await honeypot.json()).confirmationSent, false);
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

test("every rendered option and legacy service remains accepted", async () => {
  configure();
  globalThis.fetch = async () => new Response("{}", { status: 200 });
  for (const [field, options] of Object.entries(leadOptions)) {
    for (const value of options) assert.equal((await invoke({ ...lead(), [field]: value })).status, 200, `${field}: ${value}`);
  }
  for (const service of ["SEO & Search Visibility", "UI/UX Design"]) assert.equal((await invoke({ ...lead(), service })).status, 200);
});

test("missing fields, bad options, consent, language and URLs fail before delivery", async () => {
  configure();
  let calls = 0;
  globalThis.fetch = async () => { calls++; return new Response("{}"); };
  for (const field of ["name", "email", "description", "service", "budget", "timeline", "decision", "privacyConsent"]) {
    const payload: Record<string, unknown> = lead();
    delete payload[field];
    const result = await invoke(payload);
    assert.equal(result.status, 400, field);
    assert.ok((await result.json()).fields.includes(field));
  }
  for (const patch of [{ service: "invalid" }, { budget: "$500-$1,500" }, { privacyConsent: true }, { language: "fr" }, { websiteUrl: "https://" }, { websiteUrl: "javascript:alert(1)" }, { email: "invalid" }, { company: "x".repeat(161) }]) {
    assert.equal((await invoke({ ...lead(), ...patch })).status, 400);
  }
  assert.equal(calls, 0);
});

test("preserves all 3,000 description characters and rejects excess instead of truncating", async () => {
  configure();
  const descriptions: string[] = [];
  globalThis.fetch = async (_input, init) => {
    const variables = JSON.parse(String(init?.body)).template.variables;
    if (variables.DESCRIPTION) descriptions.push(variables.DESCRIPTION);
    return new Response("{}");
  };
  for (const description of ["x".repeat(3000), "界".repeat(3000)]) {
    assert.equal((await invoke({ ...lead(), description })).status, 200);
    assert.equal(descriptions.at(-1), description);
  }
  assert.equal((await invoke({ ...lead(), description: "x".repeat(3001) })).status, 400);
  assert.equal((await invoke({ ...lead(), description: "x".repeat(19) })).status, 400);
  assert.equal(descriptions.length, 2);
});

test("malformed JSON, wrong shapes and oversized bodies are classified safely", async () => {
  for (const body of ["{", "null", "[]", "true"]) {
    const result = await submitLead(new Request("https://example.test", { method: "POST", body }));
    assert.equal(result.status, 400);
    assert.equal((await result.json()).code, "validation_error");
  }
  const result = await submitLead(new Request("https://example.test", { method: "POST", body: "x".repeat(32001) }));
  assert.equal(result.status, 413);
});

test("upstream 400/422/429/500 stay 502 with safe categories and request IDs", async () => {
  configure();
  const originalError = console.error;
  console.error = () => {};
  try {
    for (const status of [400, 422, 429, 500]) {
      let calls = 0;
      globalThis.fetch = async () => { calls++; return new Response(JSON.stringify({ name: "validation_error", message: "private-provider-detail" }), { status, headers: { "retry-after": "2" } }); };
      const result = await invoke(lead());
      const body = await result.json();
      assert.equal(result.status, 502);
      assert.equal(body.code, status === 429 ? "rate_limited" : "upstream_error");
      assert.equal(body.requestId, result.headers.get("x-request-id"));
      assert.match(body.requestId, /^[a-f0-9-]{36}$/);
      assert.doesNotMatch(JSON.stringify(body), /private-provider-detail/);
      assert.equal(result.headers.get("retry-after"), "2");
      assert.equal(calls, 1);
    }
  } finally { console.error = originalError; }
});

test("an unresponsive email provider is aborted and reported as 502", async () => {
  configure();
  const keepAlive = setTimeout(() => {}, 11000);
  const originalError = console.error;
  console.error = () => {};
  globalThis.fetch = async (_input, init) => new Promise((_resolve, reject) => {
    init!.signal!.addEventListener("abort", () => reject(init!.signal!.reason), { once: true });
  });
  try {
    const started = performance.now();
    const result = await invoke(lead());
    assert.equal(result.status, 502);
    assert.ok(performance.now() - started < 11000);
  } finally { clearTimeout(keepAlive); console.error = originalError; }
});

test("concurrent duplicate requests stay independent and have distinct correlation IDs", async () => {
  configure();
  let calls = 0;
  globalThis.fetch = async () => { calls++; await new Promise((resolve) => setTimeout(resolve, 1)); return new Response("{}"); };
  const results = await Promise.all(Array.from({ length: 50 }, () => invoke(lead())));
  assert.ok(results.every((result) => result.status === 200));
  assert.equal(new Set(results.map((result) => result.headers.get("x-request-id"))).size, 50);
  // There is no cross-instance deduplication: a deliberate retry can resend email.
  assert.equal(calls, 100);
});

test("browser error categories do not describe validation failures as email errors", () => {
  assert.match(leadErrorMessage(400), /required fields/);
  assert.doesNotMatch(leadErrorMessage(400), /email/i);
  for (const [status, pattern] of [[405, /reload/], [413, /too large/], [429, /wait/], [500, /unexpected/], [502, /Email delivery/], [503, /not configured/]] as const) assert.match(leadErrorMessage(status), pattern);
  assert.match(leadErrorMessage(502, "rate_limited"), /wait/);
});

test("development validation diagnostics expose field names, never submitted values", async () => {
  configure();
  const originalInfo = console.info;
  const logs: unknown[][] = [];
  console.info = (...args) => { logs.push(args); };
  try {
    process.env.CONTEXT = "dev";
    const response = await invoke({ ...lead(), service: "private-invalid-service" });
    assert.equal(response.status, 400);
    const serialized = JSON.stringify(logs);
    assert.match(serialized, /invalidFields/);
    assert.doesNotMatch(serialized, /private-invalid-service|avery@example.com|responsive site|test-key/);
    logs.length = 0;
    process.env.CONTEXT = "production";
    process.env.RESEND_DEBUG_ERRORS = "false";
    await invoke({ ...lead(), service: "bad" });
    assert.equal(logs.length, 0);
  } finally { console.info = originalInfo; }
});

test("unexpected application errors return a safe 500 without exposing internals", async () => {
  const originalError = console.error;
  console.error = () => {};
  try {
    const request = new Request("https://example.test", { method: "POST", body: "{}" });
    Object.defineProperty(request, "body", { get() { throw new Error("private-internal-detail"); } });
    const result = await submitLead(request);
    const body = await result.json();
    assert.equal(result.status, 500);
    assert.equal(body.code, "internal_error");
    assert.doesNotMatch(JSON.stringify(body), /private-internal-detail/);
  } finally { console.error = originalError; }
});

test("confirmation network failure and missing English template preserve accepted inquiry", async () => {
  configure();
  const originalError = console.error;
  console.error = () => {};
  try {
    let calls = 0;
    globalThis.fetch = async () => {
      if (++calls === 1) return new Response("{}");
      throw new TypeError("network failure");
    };
    let result = await invoke(lead());
    assert.equal(result.status, 200);
    assert.equal((await result.json()).confirmationSent, false);
    delete process.env.CLIENT_CONFIRMATION_TEMPLATE;
    delete process.env.RESEND_CLIENT_TEMPLATE_EN_ID;
    calls = 0;
    result = await invoke(lead("es"));
    assert.equal(result.status, 200);
    assert.equal((await result.json()).confirmationSent, false);
    assert.equal(calls, 1);
  } finally { console.error = originalError; }
});
