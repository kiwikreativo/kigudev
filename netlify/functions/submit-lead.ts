import { scoreLead } from "../../src/utils/leadScoring.ts";

const values = {
  service: ["Website Development", "Website Redesign", "SEO & Search Visibility", "UI/UX Design", "Other / Not Sure Yet"],
  budget: ["Under $500", "$500–$1,500", "$1,500–$3,000", "Over $3,000", "Not sure yet"],
  timeline: ["As soon as possible", "Within a month", "Within three months", "Just exploring"],
  decision: ["I am the decision-maker", "We make decisions as a team", "I need approval from someone else"],
};
const response = (statusCode: number, body: object) => new Response(JSON.stringify(body), { status: statusCode, headers: { "content-type": "application/json", "cache-control": "no-store" } });
const escapeTemplateHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
const logFailure = (operation: string, status: number | string, body?: string, privateValues: string[] = []) => {
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
  console.error("Resend request failed", { operation, status, code, ...(debug && message ? { message } : {}) });
};

export default async (request: Request) => {
  if (request.method !== "POST") return response(405, { error: "Method not allowed" });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 12_000) return response(413, { error: "Submission too large" });
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return response(400, { error: "Invalid request" }); }
  if (!data || typeof data !== "object" || Array.isArray(data)) return response(400, { error: "Invalid request" });
  if (JSON.stringify(data).length > 12_000) return response(413, { error: "Submission too large" });
  if (typeof data.website === "string" && data.website) return response(200, { ok: true });
  const string = (key: string, max = 3000) => typeof data[key] === "string" ? (data[key] as string).trim().slice(0, max) : "";
  const lead = { name: string("name", 120), email: string("email", 254), company: string("company", 160), websiteUrl: string("websiteUrl", 500), description: string("description"), service: string("service", 80), budget: string("budget", 40), timeline: string("timeline", 40), decision: string("decision", 60), language: data.language === "es" ? "es" : "en" };
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || lead.description.length < 20 || data.privacyConsent !== "accepted" || !Object.entries(values).every(([key, options]) => options.includes(lead[key as keyof typeof lead] as never)) || (lead.websiteUrl && !/^https?:\/\//i.test(lead.websiteUrl))) return response(400, { error: "Please check your information and try again." });

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const adminTemplate = process.env.ADMIN_NOTIFICATION_TEMPLATE || process.env.RESEND_ADMIN_TEMPLATE_ID;
  const clientTemplate = lead.language === "es"
    ? process.env.CLIENT_CONFIRMATION_TEMPLATE_ES || process.env.RESEND_CLIENT_TEMPLATE_ES_ID
    : process.env.CLIENT_CONFIRMATION_TEMPLATE || process.env.RESEND_CLIENT_TEMPLATE_EN_ID;
  if (!apiKey || !from || !to || !adminTemplate) return response(503, { error: "Lead email delivery is not configured. Contact the site owner." });

  const { score, priority } = scoreLead(lead as typeof lead & { service: string; budget: string; timeline: string; decision: string });
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
    LANGUAGE: lead.language === "es" ? "Spanish" : "English",
    DESCRIPTION: escapeTemplateHtml(lead.description),
    PRIORITY: priority,
    SCORE: String(score),
    SUBMITTED: submitted,
  };
  const resend = (payload: object) => fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "User-Agent": "kiguidev-lead-form/1.0" },
    body: JSON.stringify({ from, ...payload }),
  });

  let internal: Response;
  try {
    internal = await resend({ to: [to], reply_to: lead.email, template: { id: adminTemplate, variables: adminVariables } });
  } catch {
    logFailure("admin_notification", "network_error");
    return response(502, { error: "We could not deliver your inquiry. Please try again or email leads@kiguidev.me." });
  }
  if (!internal.ok) {
    const errorBody = await internal.text();
    logFailure("admin_notification", internal.status, errorBody, [lead.name, lead.email, lead.company, lead.websiteUrl, lead.description]);
    return response(502, { error: "We could not deliver your inquiry. Please try again or email leads@kiguidev.me." });
  }

  if (!clientTemplate) {
    logFailure("client_confirmation", "missing_template");
    return response(200, { ok: true, priority, confirmationSent: false });
  }
  try {
    const confirmation = await resend({ to: [lead.email], reply_to: to, template: { id: clientTemplate, variables: { NAME: escapeTemplateHtml(lead.name) } } });
    if (!confirmation.ok) {
      const errorBody = await confirmation.text();
      logFailure("client_confirmation", confirmation.status, errorBody, [lead.name, lead.email, lead.company, lead.websiteUrl, lead.description]);
    }
    return response(200, { ok: true, priority, confirmationSent: confirmation.ok });
  } catch {
    logFailure("client_confirmation", "network_error");
    return response(200, { ok: true, priority, confirmationSent: false });
  }
};
