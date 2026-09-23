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
    technologies: ["MetaMask"],
    seoDescription:
      "Explore the ChainPeek case study: a lightweight Web3 wallet interface for connecting MetaMask, checking balances, and sending funds.",
  },
];

export const projectBySlug = new Map(
  projects.map((project) => [project.slug, project]),
);
