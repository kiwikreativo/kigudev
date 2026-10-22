import type { leadOptions } from "./leadValidation.ts";

export const scoreLead = (lead: { budget: string; timeline: string; decision: string; service: string }) => {
  const score = ({
    budget: { "Under $500": 5, "$500–$1,500": 15, "$1,500–$3,000": 25, "Over $3,000": 30, "Not sure yet": 10 },
    timeline: { "As soon as possible": 25, "Within a month": 20, "Within three months": 10, "Just exploring": 0 },
    decision: { "I am the decision-maker": 20, "We make decisions as a team": 15, "I need approval from someone else": 5 },
    service: { "Website Development": 25, "Website Redesign": 25, "SEO & Search Visibility": 20, "Local SEO & Geographic SEO": 20, "Mobile Enhacement": 20, "UI/UX Design": 20, "Other / Not Sure Yet": 5 } satisfies Record<(typeof leadOptions.service)[number] | "SEO & Search Visibility" | "UI/UX Design", number>,
  } as const);
  const total = score.budget[lead.budget as keyof typeof score.budget] + score.timeline[lead.timeline as keyof typeof score.timeline] + score.decision[lead.decision as keyof typeof score.decision] + score.service[lead.service as keyof typeof score.service];
  return { score: total, priority: total >= 70 ? "high" : total >= 40 ? "medium" : "low" } as const;
};
