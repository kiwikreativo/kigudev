import { scoreLead } from "../../src/utils/leadScoring.ts";

const values = {
  service: ["Website Development", "Website Redesign", "SEO & Search Visibility", "UI/UX Design", "Other / Not Sure Yet"],
  budget: ["Under $500", "$500–$1,500", "$1,500–$3,000", "Over $3,000", "Not sure yet"],
  timeline: ["As soon as possible", "Within a month", "Within three months", "Just exploring"],
  decision: ["I am the decision-maker", "We make decisions as a team", "I need approval from someone else"],
};
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
const response = (statusCode: number, body: object) => new Response(JSON.stringify(body), { status: statusCode, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (request: Request) => {
  if (request.method !== "POST") return response(405, { error: "Method not allowed" });
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 12_000) return response(413, { error: "Submission too large" });
  let data: Record<string, unknown>;
  try { data = await request.json(); } catch { return response(400, { error: "Invalid request" }); }
  if (JSON.stringify(data).length > 12_000) return response(413, { error: "Submission too large" });
  if (typeof data.website === "string" && data.website) return response(200, { ok: true });
  const string = (key: string, max = 3000) => typeof data[key] === "string" ? (data[key] as string).trim().slice(0, max) : "";
  const lead = { name: string("name", 120), email: string("email", 254), company: string("company", 160), websiteUrl: string("websiteUrl", 500), description: string("description"), service: string("service", 80), budget: string("budget", 40), timeline: string("timeline", 40), decision: string("decision", 60), language: data.language === "es" ? "es" : "en" };
  if (!lead.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email) || lead.description.length < 20 || data.privacyConsent !== "accepted" || !Object.entries(values).every(([key, options]) => options.includes(lead[key as keyof typeof lead] as never)) || (lead.websiteUrl && !/^https?:\/\//i.test(lead.websiteUrl))) return response(400, { error: "Please check your information and try again." });
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL || "leads@kiguidev.me";
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!apiKey || !to) return response(503, { error: "Lead delivery is not configured." });
  const { score, priority } = scoreLead(lead as typeof lead & { service: string; budget: string; timeline: string; decision: string });
  const safe = Object.fromEntries(Object.entries(lead).map(([key, value]) => [key, escapeHtml(value)]));
  const resend = async (payload: object) => fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, ...payload }) });
  const internal = await resend({ to: [to], reply_to: lead.email, subject: `[${priority.toUpperCase()} Priority] New Kiguidev Project Inquiry`, html: `<h1>New project inquiry</h1><dl>${Object.entries(safe).map(([key, value]) => `<dt>${key}</dt><dd>${value.replace(/\n/g, "<br>")}</dd>`).join("")}</dl><p>Score: ${score} · Priority: ${priority} · Submitted: ${new Date().toISOString()} · Language: ${lead.language}</p>` });
  if (!internal.ok) return response(502, { error: "We could not deliver your inquiry. Please try again or email leads@kiguidev.me." });
  try { await resend({ to: [lead.email], subject: lead.language === "es" ? "Recibimos tu consulta — Kiguidev" : "We received your inquiry — Kiguidev", html: lead.language === "es" ? `<p>Gracias, ${safe.name}. Recibimos tu consulta y revisaremos los detalles para responderte por correo.</p>` : `<p>Thanks, ${safe.name}. We received your inquiry and will review the details before following up by email.</p>` }); } catch { /* Internal notification is already safely delivered. */ }
  return response(200, { ok: true, priority });
};

