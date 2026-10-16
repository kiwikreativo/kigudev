import type { ImageMetadata } from "astro";
import chainpeekImage from "@/assets/projects/chainpeek.webp";
import decorazonjossImage from "@/assets/projects/decorazonjoss.webp";
import egheeImage from "@/assets/projects/eghee.webp";
import meguisImage from "@/assets/projects/meguis.webp";
import stackChefImage from "@/assets/projects/stack-chef.webp";

export interface ProjectGalleryItem {
  image: ImageMetadata;
  alt: string;
  caption?: string;
}

export interface ProjectService {
  title: string;
  slug: "ui-ux-design" | "web-development" | "mobile-enhancement" | "seo";
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
  technologies?: string[];
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
    role: "Web Design, Development, and SEO",
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
      { title: "UI/UX Design", slug: "ui-ux-design" },
      { title: "Web Development", slug: "web-development" },
    ],
    technologies: ["Astro"],
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
      { title: "UI/UX Design", slug: "ui-ux-design" },
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
      { title: "UI/UX Design", slug: "ui-ux-design" },
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
    services: [{ title: "UI/UX Design", slug: "ui-ux-design" }],
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
  {
    slug: "chainpeek",
    number: "05",
    title: "ChainPeek",
    titleLines: ["Chain", "Peek"],
    category: "Web3 wallet dApp",
    shortDescription:
      "A Web3 dApp for connecting a MetaMask wallet, checking balances, and sending funds through a lightweight wallet interface.",
    role: "Web Design & Development",
    focus: "Wallet flows",
    duration: "5 weeks",
    image: chainpeekImage,
    imageAlt:
      "Cryptocurrency interface on a phone used as contextual imagery for ChainPeek",
    imageKind: "contextual",
    photoCredit: "Leeloo The First",
    photoUrl:
      "https://www.pexels.com/photo/white-smartphone-on-gray-laptop-8358145/",
    services: [
      { title: "UI/UX Design", slug: "ui-ux-design" },
      { title: "Web Development", slug: "web-development" },
    ],
    projectUrl: "https://chaiinpeek.netlify.app/",
    technologies: ["MetaMask"],
    challenge: [
      "ChainPeek needed to make essential wallet actions understandable within a compact Web3 interface, where unclear connection states or transaction steps can quickly reduce user confidence.",
    ],
    approach: [
      "The experience was organized around a short sequence: connect a MetaMask wallet, confirm account information, review balances, and prepare a transfer. Each state was treated as part of one continuous task rather than a collection of disconnected controls.",
    ],
    solution: [
      "I designed and developed a lightweight wallet interface with focused actions, readable account information, and responsive layouts that preserve the transaction flow on smaller screens.",
    ],
    outcome: [
      "The resulting dApp provides a clearer path through common wallet actions and demonstrates how a restrained interface can reduce friction in a technically unfamiliar workflow.",
    ],
    seoDescription:
      "Explore the ChainPeek case study: a lightweight Web3 wallet interface for connecting MetaMask, checking balances, and sending funds.",
  },
];

export const projectBySlug = new Map(
  projects.map((project) => [project.slug, project]),
);
