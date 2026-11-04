// Render these options in the form and validate the same values on the server.
export const leadOptions = {
  service: ["Website Development", "Website Redesign", "Local SEO & Geographic SEO", "Mobile Enhacement", "Other / Not Sure Yet"] as const,
  budget: ["Under $500", "$500–$1,500", "$1,500–$3,000", "Over $3,000", "Not sure yet"],
  timeline: ["As soon as possible", "Within a month", "Within three months", "Just exploring"],
  decision: ["I am the decision-maker", "We make decisions as a team", "I need approval from someone else"],
};
export const leadLimits = { name: 120, email: 254, company: 160, websiteUrl: 500, description: 3000, service: 80, budget: 40, timeline: 40, decision: 60 };
export const communicationLanguages = [{ value: "en", label: "English" }, { value: "es", label: "Español" }] as const;
export type Lead = Record<keyof typeof leadLimits, string> & { language: "en" | "es"; preferredLanguage: "en" | "es" };
export const validateLead = (data: Record<string, unknown>) => {
  const fields = new Set<string>();
  const lead = {} as Lead;
  for (const [key, max] of Object.entries(leadLimits)) {
    const value = data[key];
    lead[key as keyof typeof leadLimits] = typeof value === "string" ? value.trim() : "";
    if ((value !== undefined && typeof value !== "string") || (typeof value === "string" && value.length > max)) fields.add(key);
  }
  lead.language = data.language === "es" ? "es" : "en";
  if (data.language !== undefined && data.language !== "en" && data.language !== "es") fields.add("language");
  const preferredLanguage = data.preferredLanguage === undefined ? lead.language : data.preferredLanguage;
  if (!communicationLanguages.some(({ value }) => value === preferredLanguage)) fields.add("preferredLanguage");
  lead.preferredLanguage = preferredLanguage === "es" ? "es" : "en";
  if (!lead.name) fields.add("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) fields.add("email");
  if (lead.description.length < 20) fields.add("description");
  if (data.privacyConsent !== "accepted") fields.add("privacyConsent");
  for (const key of Object.keys(leadOptions) as Array<keyof typeof leadOptions>) {
    // Accept older open browser tabs after deploying the renamed services.
    const legacy = key === "service" && ["SEO & Search Visibility", "UI/UX Design"].includes(lead.service);
    if (!legacy && !leadOptions[key].some((option) => option === lead[key])) fields.add(key);
  }
  if (lead.websiteUrl) {
    try {
      if (!["http:", "https:"].includes(new URL(lead.websiteUrl).protocol)) fields.add("websiteUrl");
    } catch { fields.add("websiteUrl"); }
  }
  return { lead, fields: [...fields] };
};
