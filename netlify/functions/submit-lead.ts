import { scoreLead } from "../../src/utils/leadScoring.ts";
import { validateLead } from "../../src/utils/leadValidation.ts";
const escapeTemplateHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
const logFailure = (operation: string, status: number | string, body?: string, privateValues: string[] = [], requestId?: string) => {
  let code = "unknown";
  let message: string | undefined;
  try {
    const error = JSON.parse(body || "");
    const candidate = error.name || error.code;
    if (typeof candidate === "string" && /^[a-z0-9_-]{1,80}$/i.test(candidate)) code = candidate;
    if (typeof error.message === "string") {
      let detail = error.message.replace(/[\r\n\t]+/g, " ").slice(0, 500);
      for (const value of privateValues.filter((value) => value.length > 2).sort((a, b) => b.length - a.length)) detail = detail.replaceAll(value, "[redacted]");
      message = detail.replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email]").replace(/https?:\/\/\S+/gi, "[url]");
    }
  } catch { /* Keep diagnostics limited to a safe error code. */ }
  const debug = process.env.CONTEXT === "dev" || process.env.RESEND_DEBUG_ERRORS === "true";
  console.error("Resend request failed", { requestId, operation, status, code, ...(debug && message ? { message } : {}) });
};

export default async (request: Request) => {
  const requestId = crypto.randomUUID();
  const started = performance.now();
  const debug = process.env.CONTEXT === "dev" || process.env.RESEND_DEBUG_ERRORS === "true";
  let stage = "request";
  let payloadBytes = 0;
  const trace = (details: object) => {
    if (debug) console.info("Lead request", { requestId, stage, durationMs: Math.round(performance.now() - started), ...details });
  };
  const response = (statusCode: number, body: object, headers: Record<string, string> = {}) => {
    trace({ status: statusCode, method: request.method, contentType: request.headers.get("content-type")?.split(";")[0] === "application/json" ? "application/json" : "other", payloadBytes });
    const codes: Record<number, string> = { 400: "validation_error", 405: "method_not_allowed", 413: "payload_too_large", 500: "internal_error", 502: "upstream_error", 503: "configuration_error" };
    return new Response(JSON.stringify({ ...(codes[statusCode] ? { code: codes[statusCode] } : {}), ...body, requestId }), {
      status: statusCode, headers: { "content-type": "application/json", "cache-control": "no-store", "x-request-id": requestId, ...headers },
    });
  };
  try {
  if (request.method !== "POST") return response(405, { error: "Method not allowed" });
  const length = Number(request.headers.get("content-length") || 0);
  // Allow a full 3,000-character description, including UTF-8 and JSON escaping.
  const maxBytes = 32_000;
  if (length > maxBytes) return response(413, { error: "Submission too large" });
  stage = "parse";
  const chunks: Uint8Array[] = [];
  const reader = request.body?.getReader();
  if (reader) {
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        payloadBytes += value.byteLength;
        if (payloadBytes > maxBytes) {
          await reader.cancel();
          return response(413, { error: "Submission too large" });
        }
        chunks.push(value);
      }
    } finally { reader.releaseLock(); }
  }
  const bytes = new Uint8Array(payloadBytes);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  let data: Record<string, unknown>;
  try { data = JSON.parse(new TextDecoder().decode(bytes)); } catch { return response(400, { error: "Invalid request" }); }
  if (!data || typeof data !== "object" || Array.isArray(data)) return response(400, { error: "Invalid request" });
  if (typeof data.website === "string" && data.website) return response(200, { ok: true, confirmationSent: false });
  stage = "validation";
  const { lead, fields } = validateLead(data);
  if (fields.length) {
    trace({ invalidFields: fields });
    return response(400, { error: "Please check your information and try again.", fields });
  }

  stage = "configuration";
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const adminTemplate = process.env.ADMIN_NOTIFICATION_TEMPLATE || process.env.RESEND_ADMIN_TEMPLATE_ID;
  const clientTemplate = process.env.CLIENT_CONFIRMATION_TEMPLATE || process.env.RESEND_CLIENT_TEMPLATE_EN_ID;
  if (!apiKey || !from || !to || !adminTemplate) return response(503, { error: "Lead email delivery is not configured. Contact the site owner." });

  stage = "scoring";
  const { score, priority } = scoreLead(lead);
  const submitted = new Intl.DateTimeFormat("en-US", { dateStyle: "medium", timeStyle: "long", timeZone: "UTC" }).format(new Date());
  const adminVariables = {
    NAME: escapeTemplateHtml(lead.name),
    EMAIL: escapeTemplateHtml(lead.email),
    COMPANY: escapeTemplateHtml(lead.company || "Not provided"),
    WEBSITE: escapeTemplateHtml(lead.websiteUrl || "Not provided"),
    SERVICE: lead.service,
    BUDGET: lead.budget,
    TIMELINE: lead.timeline,
    DECISION: escapeTemplateHtml(lead.decision),
    LANGUAGE: lead.preferredLanguage === "es" ? "Spanish" : "English",
    DESCRIPTION: escapeTemplateHtml(lead.description),
    PRIORITY: priority,
    SCORE: String(score),
    SUBMITTED: submitted,
  };
  const resend = (payload: object) => fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "User-Agent": "kiguidev-lead-form/1.0" },
    body: JSON.stringify({ from, ...payload }),
    signal: AbortSignal.timeout(10_000),
  });

  stage = "admin_notification";
  let upstreamStarted = performance.now();
  trace({ event: "start" });
  let internal: Response;
  try {
    internal = await resend({ to: [to], reply_to: lead.email, template: { id: adminTemplate, variables: adminVariables } });
  } catch {
    logFailure("admin_notification", "network_error", undefined, [], requestId);
    return response(502, { error: "We could not deliver your inquiry. Please try again or email leads@kiguidev.me." });
  }
  if (!internal.ok) {
    const errorBody = await internal.text();
    logFailure("admin_notification", internal.status, errorBody, [apiKey, lead.name, lead.email, lead.company, lead.websiteUrl, lead.description], requestId);
    const retryAfter = internal.headers.get("retry-after");
    const headers: Record<string, string> = retryAfter && /^\d{1,6}$/.test(retryAfter) ? { "retry-after": retryAfter } : {};
    return response(502, { error: "We could not deliver your inquiry. Please try again or email leads@kiguidev.me.", code: internal.status === 429 ? "rate_limited" : "upstream_error" }, headers);
  }

  trace({ upstreamStatus: internal.status, upstreamDurationMs: Math.round(performance.now() - upstreamStarted) });
  stage = "client_confirmation";
  if (!clientTemplate) {
    logFailure("client_confirmation", "missing_template", undefined, [], requestId);
    return response(200, { ok: true, priority, confirmationSent: false });
  }
  try {
    upstreamStarted = performance.now();
    trace({ event: "start" });
    const confirmation = await resend({ to: [lead.email], reply_to: to, template: { id: clientTemplate, variables: { NAME: escapeTemplateHtml(lead.name) } } });
    if (!confirmation.ok) {
      const errorBody = await confirmation.text();
      logFailure("client_confirmation", confirmation.status, errorBody, [apiKey, lead.name, lead.email, lead.company, lead.websiteUrl, lead.description], requestId);
    }
    trace({ upstreamStatus: confirmation.status, upstreamDurationMs: Math.round(performance.now() - upstreamStarted) });
    return response(200, { ok: true, priority, confirmationSent: confirmation.ok });
  } catch {
    logFailure("client_confirmation", "network_error", undefined, [], requestId);
    return response(200, { ok: true, priority, confirmationSent: false });
  }
  } catch {
    console.error("Lead request failed", { requestId, stage });
    return response(stage === "admin_notification" ? 502 : 500, { error: "Your inquiry could not be processed. Please try again or contact us by email." });
  }
};
