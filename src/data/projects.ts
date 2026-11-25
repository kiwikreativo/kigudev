import type { ImageMetadata } from "astro";
import chainpeekImage from "@/assets/projects/chainpeek.webp";
import decorazonjossImage from "@/assets/projects/decorazonjoss.webp";
import egheeImage from "@/assets/projects/eghee.webp";
import kaltaImage from "@/assets/projects/kalta.webp";
import meguisImage from "@/assets/projects/meguis.webp";
import stackChefImage from "@/assets/projects/stack-chef.webp";

export interface ProjectGalleryItem {
  image: ImageMetadata;
  alt: string;
  caption?: string;
}

export interface ProjectService {
  title: string;
  slug: "web-redesign" | "web-development" | "mobile-enhancement" | "seo";
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  titleLines: string[];
  category: string;
  shortDescription: string;
  role: string;
  focus: string;
  duration: string;
  image: ImageMetadata;
  imageAlt: string;
  imageKind: "contextual" | "project";
  photoCredit: string;
  photoUrl: string;
  services: ProjectService[];
  challenge?: string[];
  approach?: string[];
  solution?: string[];
  outcome?: string[];
  gallery?: ProjectGalleryItem[];
  projectUrl?: string;
  repositoryUrl?: string;
  seoDescription: string;
}

export const projects: Project[] = [
  {
    slug: "decorazonjoss",
    number: "01",
    title: "DeCorazonJoss",
    titleLines: ["DeCorazon", "Joss"],
    category: "Event decoration website",
    shortDescription:
      "Business website for Decorazon Joss, an event decoration company, built with Astro.",
    role: "Web Design and Development",
    focus: "Brand presence & inquiries",
    duration: "4 weeks",
    image: decorazonjossImage,
    imageAlt:
      "Elegant event reception used as contextual imagery for DeCorazonJoss",
    imageKind: "contextual",
    photoCredit: "Jonathan Borba",
    photoUrl:
      "https://www.pexels.com/photo/elegant-indoor-wedding-reception-setup-35985211/",
    services: [
      { title: "Web Redesign", slug: "web-redesign" },
      { title: "Web Development", slug: "web-development" },
    ],
    projectUrl: "https://decorazonjoss.netlify.app/",
    challenge: [
      "DeCorazonJoss needed a focused business website that could communicate the character of its event-decoration work while making it easy for prospective clients to understand the service and start an inquiry.",
    ],
    approach: [
      "The project centered the visual atmosphere of decorated events, then organized supporting content around the questions a potential client needs answered before making contact. Responsive behavior was considered from the start so the presentation remained clear on smaller screens.",
    ],
    solution: [
      "I designed and developed an Astro website with a concise service narrative, image-led presentation, clear calls to action, and a lightweight technical foundation suited to a small service business.",
    ],
    outcome: [
      "The finished experience gives DeCorazonJoss a dedicated digital presence that presents the brand consistently and provides a direct path from initial interest to an inquiry.",
    ],
    seoDescription:
      "Explore the DeCorazonJoss case study: an Astro business website for an event decoration company, focused on brand presence and inquiries.",
  },
  {
    slug: "meguis-import-export",
    number: "02",
    title: "Meguis Import&Export",
    titleLines: ["Meguis", "Import&Export"],
    category: "Corporate logistics website",
    shortDescription:
      "A responsive corporate website for Meguis Logistics, showcasing customs and logistics consulting services.",
    role: "Web Design, Development, and SEO",
    focus: "Services & lead generation",
    duration: "5 weeks",
    image: meguisImage,
    imageAlt:
      "Container ship at a terminal used as contextual imagery for Meguis Import and Export",
    imageKind: "contextual",
    photoCredit: "Wolfgang Weiser",
    photoUrl:
      "https://www.pexels.com/photo/container-ship-at-terminal-burchardkai-in-hamburg-21234960/",
    services: [
      { title: "Web Redesign", slug: "web-redesign" },
      { title: "Web Development", slug: "web-development" },
    ],
    projectUrl: "https://meguis.net/",
    challenge: [
      "Meguis Import&Export needed to present customs and logistics consulting in a way that felt established, understandable, and useful to businesses evaluating a potential service partner.",
    ],
    approach: [
      "The information was structured around service clarity and lead generation. The design uses a corporate visual hierarchy while keeping the language and navigation approachable for visitors who may not already understand every logistics term.",
    ],
    solution: [
      "I created a responsive corporate website that introduces the company, organizes its consulting offer, and guides visitors toward direct contact without adding unnecessary interaction or visual noise.",
    ],
    outcome: [
      "Meguis now has a focused website that supports sales conversations, gives prospects a clearer overview of the business, and works consistently across desktop and mobile devices.",
    ],
    seoDescription:
      "Explore the Meguis Import&Export case study: a responsive corporate website presenting customs and logistics consulting services.",
  },
  {
    slug: "stack-chef",
    number: "03",
    title: "Stack Chef",
    titleLines: ["Stack", "Chef"],
    category: "AI developer tool",
    shortDescription:
      "An AI-powered application that scaffolds and generates development boilerplates to accelerate project creation.",
    role: "Web Design, Development",
    focus: "Scaffolding workflows",
    duration: "6 weeks",
    image: stackChefImage,
    imageAlt:
      "Developer viewing source code used as contextual imagery for Stack Chef",
    imageKind: "contextual",
    photoCredit: "Ron Lach",
    photoUrl:
      "https://www.pexels.com/photo/person-facing-a-big-screen-with-numbers-9783346/",
    services: [
      { title: "Web Redesign", slug: "web-redesign" },
      { title: "Web Development", slug: "web-development" },
    ],
    projectUrl: "https://stackcheff.netlify.app/",
    challenge: [
      "Stack Chef needed to turn an open-ended request for development boilerplate into a guided workflow that helps developers reach a useful starting point without configuring every file manually.",
    ],
    approach: [
      "The interface was planned around the choices that meaningfully change a generated project. Supporting details were grouped so the main scaffolding path remained visible and the user could understand what would be produced before starting generation.",
    ],
    solution: [
      "I designed and developed an AI-assisted application that gathers project requirements, organizes generation options, and presents the resulting workflow in a focused developer-oriented interface.",
    ],
    outcome: [
      "The project demonstrates a faster, more understandable way to move from an idea to a structured codebase while keeping configuration decisions visible to the developer.",
    ],
    seoDescription:
      "Explore the Stack Chef case study: an AI-powered application for scaffolding and generating development boilerplates.",
  },
  {
    slug: "kalta",
    number: "06",
    title: "Kalta",
    titleLines: ["Kalta"],
    category: "Marketing agency website",
    shortDescription:
      "A bilingual website for Kalta, a Costa Rica agency combining digital content, paid advertising, and AI automation.",
    role: "Web Design, Development, and SEO",
    focus: "Services & lead generation",
    duration: "5 weeks",
    image: kaltaImage,
    imageAlt:
      "Team reviewing marketing charts on a laptop used as contextual imagery for Kalta",
    imageKind: "contextual",
    photoCredit: "fauxels",
    photoUrl: "https://www.pexels.com/photo/photo-of-person-using-laptop-3183174/",
    services: [
      { title: "Web Redesign", slug: "web-redesign" },
      { title: "Web Development", slug: "web-development" },
      { title: "SEO", slug: "seo" },
    ],
    projectUrl: "https://kaltaagency.com",
    challenge: [
      "Kalta offers three distinct services, digital content, paid advertising, and AI automation, and needed a website, local & Geographic SEO and custom email with domain that presented them as one connected way of working instead of three unrelated offers.",
    ],
    approach: [
      "The site was structured around a single idea: communication and operations should move forward together. Each service line got its own concise card, a short process section explains how the team works, and an automation diagram in the hero shows how tools like CRM, Slack, Gmail, and Google Sheets connect through n8n.",
    ],
    solution: [
      "I designed and developed a bilingual Spanish and English website with a dark, focused visual system, service cards that lead to quote requests, a four-step process overview, and a contact form that asks visitors which service they need before they write.",
    ],
    outcome: [
      "Kalta now has a clear digital presence, a custom enterprise email, and positioning with local and Geographic SEO that explains its integrated offer in a few scrolls and turns interest into qualified conversations through a single, structured contact path.",
    ],
    seoDescription:
      "Explore the Kalta case study: a bilingual marketing agency website presenting digital content, paid advertising, and AI automation services.",
  },
  {
    slug: "eghee",
    number: "04",
    title: "Eghee",
    titleLines: ["Eghee"],
    category: "Product landing page",
    shortDescription:
      "A modern landing page designed to showcase premium ghee and egg bread products while encouraging customer engagement.",
    role: "Landing page design & development",
    focus: "Product storytelling",
    duration: "3 weeks",
    image: egheeImage,
    imageAlt: "Bread and butter used as contextual product imagery for Eghee",
    imageKind: "contextual",
    photoCredit: "eat kubba",
    photoUrl:
      "https://www.pexels.com/photo/bread-slices-on-brown-wooden-chopping-board-11842180/",
    services: [{ title: "Web Redesign", slug: "web-redesign" }],
    projectUrl: "https://egghee.netlify.app/",
    challenge: [
      "Eghee needed a landing page that could introduce premium ghee and egg bread products through a clear story rather than presenting visitors with an undifferentiated product list.",
    ],
    approach: [
      "The page structure gives product imagery and concise messaging distinct roles, using visual pacing to introduce the offer, reinforce its character, and lead naturally toward customer engagement.",
    ],
    solution: [
      "I designed and developed a responsive product landing page with an image-led hierarchy, focused product copy, and clear calls to action that remain easy to use on mobile devices.",
    ],
    outcome: [
      "The final page gives Eghee a coherent product presentation and a reusable digital destination for introducing the brand to prospective customers.",
    ],
    seoDescription:
      "Explore the Eghee case study: a modern product landing page focused on premium ghee, egg bread, and product storytelling.",
  },
  
];

export const projectBySlug = new Map(
  projects.map((project) => [project.slug, project]),
);
