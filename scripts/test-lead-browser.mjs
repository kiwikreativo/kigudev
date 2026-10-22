import assert from "node:assert/strict";
import { utimes } from "node:fs/promises";
import submitLead from "../netlify/functions/submit-lead.ts";

// Use an existing Playwright installation; no browser dependency ships with the site.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
const localUrl = new URL(process.env.LEAD_TEST_URL || "http://localhost:4321/");
if (localUrl.protocol !== "http:" || !["localhost", "127.0.0.1", "[::1]"].includes(localUrl.hostname)) throw new Error("Browser checks require a local HTTP dev server");
Object.assign(process.env, { RESEND_API_KEY: "mock-only", LEAD_FROM_EMAIL: "sender@example.test", LEAD_NOTIFICATION_EMAIL: "owner@example.test", ADMIN_NOTIFICATION_TEMPLATE: "mock-admin", CLIENT_CONFIRMATION_TEMPLATE: "mock-client", CONTEXT: "test", RESEND_DEBUG_ERRORS: "false" });
let providerCalls = 0, backendCalls = 0, forceInvalid = false, confirmationFailure = false, lastPayload;
globalThis.fetch = async (_input, init) => {
  providerCalls++;
  await new Promise((resolve) => setTimeout(resolve, 100));
  const template = JSON.parse(init.body).template.id;
  return new Response("{}", { status: confirmationFailure && template === "mock-client" ? 503 : 200 });
};
const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_EXECUTABLE || undefined, headless: true });
try {
  const page = await browser.newPage();
  await page.route("**/.netlify/functions/submit-lead", async (route) => {
    backendCalls++;
    const body = route.request().postDataJSON();
    lastPayload = { ...body };
    if (forceInvalid) body.service = "invalid";
    const result = await submitLead(new Request("https://example.test/.netlify/functions/submit-lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) }));
    await route.fulfill({ status: result.status, headers: Object.fromEntries(result.headers), body: await result.text() });
  });
  const complete = async (service, preferredLanguage = "en") => {
    await page.locator("#service").selectOption(service);
    await page.locator("[data-next]").click();
    await page.locator("#description").fill("Synthetic browser inquiry to verify form reliability.");
    assert.equal(await page.locator(".character-count").textContent(), "53");
    await page.locator("[data-next]").click();
    await page.locator("#budget").selectOption("Over $3,000");
    await page.locator("[data-next]").click();
    await page.locator("#timeline").selectOption("Within a month");
    await page.locator("[data-next]").click();
    await page.locator("#decision").selectOption("I am the decision-maker");
    await page.locator("[data-next]").click();
    await page.locator("#full-name").fill("Synthetic Browser");
    await page.locator("#email").fill("browser@example.test");
    assert.equal(await page.locator("#preferred-language").inputValue(), "en");
    await page.getByLabel("Preferred communication language").selectOption(preferredLanguage);
    await page.locator("#privacy-consent").check();
    assert.equal(await page.locator("[data-confirmation-reminder]").isVisible(), false);
  };
  for (const [width, service, preferredLanguage] of [[390, "Mobile Enhacement", "es"], [1440, "Local SEO & Geographic SEO", "en"]]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(localUrl.href);
    await complete(service, preferredLanguage);
    const before = backendCalls;
    await page.evaluate(() => {
      const form = document.querySelector("#contact-form");
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    await page.locator("[data-success]").waitFor({ state: "visible" });
    assert.equal(backendCalls - before, 1);
    assert.equal(lastPayload.preferredLanguage, preferredLanguage);
    assert.equal(lastPayload.language, "en");
    assert.equal(await page.locator("[data-success] strong").textContent(), "Your inquiry has been submitted successfully!");
    assert.equal(await page.locator("[data-confirmation-reminder]").isVisible(), true);
    console.log(JSON.stringify({ width, service, preferredLanguage, result: "success", reminderVisible: true, doubleSubmitRequests: backendCalls - before }));
  }
  await page.goto(localUrl.href);
  confirmationFailure = true;
  await complete("Mobile Enhacement", "es");
  await page.locator("[data-submit]").click();
  await page.locator("[data-success]").waitFor({ state: "visible" });
  assert.equal(await page.locator("[data-confirmation-reminder]").isVisible(), false);
  console.log("Accepted inquiry with failed confirmation hides the reminder");
  confirmationFailure = false;
  await page.goto(localUrl.href);
  forceInvalid = true;
  await complete("Website Development");
  await page.locator("[data-submit]").click();
  await page.waitForFunction(() => document.querySelector("[data-error]").textContent.includes("required fields"));
  assert.doesNotMatch(await page.locator("[data-error]").textContent(), /email service returned/i);
  assert.ok(await page.locator("[data-submit]").isEnabled());
  assert.equal(await page.locator("[data-success]").isVisible(), false);
  assert.equal(await page.locator("[data-confirmation-reminder]").isVisible(), false);
  console.log("HTTP 400 renders validation guidance and leaves retry enabled");
  forceInvalid = false;
  const reload = page.waitForEvent("load", { timeout: 15000 });
  const now = new Date();
  // Trigger Astro's watcher without changing the user's component contents.
  await utimes(new URL("../src/components/Portfolio/HomePortfolio.astro", import.meta.url), now, now);
  await reload;
  await complete("Mobile Enhacement");
  await page.locator("[data-submit]").click();
  await page.locator("[data-success]").waitFor({ state: "visible" });
  console.log(JSON.stringify({ frontendReload: "pass", providerCalls, backendCalls, actualEmails: 0 }));
} finally { await browser.close(); }
