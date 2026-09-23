import type { ImageMetadata } from "astro";
import mobileEnhancementImage from "@/assets/services/mobile-enhancement.jpg";
import seoImage from "@/assets/services/seo.jpg";
import uiUxDesignImage from "@/assets/services/ui-ux-design.jpg";
import webDevelopmentImage from "@/assets/services/web-development.jpg";

export interface Service {
  slug: string;
  number: string;
  title: string;
  titleLines: string[];
  homepageCopy: string;
  homepageDetail: string;
  paragraphs: string[];
  included: string[];
  seoDescription: string;
  image: ImageMetadata;
  imageAlt: string;
  photographer: string;
  photoUrl: string;
}

export const services: Service[] = [
  {
    slug: "ui-ux-design",
    number: "01",
    title: "UI/UX Design",
    titleLines: ["UI/UX", "Design"],
    homepageCopy:
      "Clear and thoughtful interfaces designed around real users and business goals.",
    homepageDetail: "Research · user flows · design systems",
    paragraphs: [
      "Good design starts with research, not a blank canvas. Before any screen gets drawn, I look at who's using the product, what they're trying to do, and where they get stuck.",
      "That research turns into user flows: the actual paths someone takes to complete a task, mapped out so nothing forces them to guess or backtrack. From there I build a design system — colors, type, spacing, components — so the interface stays consistent as the product grows, instead of every new page reinventing its own rules.",
      "The goal is an interface that fits the business it's built for. A SaaS dashboard and a furniture storefront need different things, and the design decisions should reflect that rather than following a generic template.",
    ],
    included: [
      "User and competitor research",
      "User flow mapping",
      "Wireframes and high-fidelity mockups",
      "A reusable design system for future pages",
    ],
    seoDescription:
      "UI/UX design focused on research, user flows, wireframes, high-fidelity interfaces, and reusable design systems built around real business needs.",
    image: uiUxDesignImage,
    imageAlt:
      "Notebook, smartphone, and interface planning materials arranged on a design desk",
    photographer: "picjumbo.com",
    photoUrl:
      "https://www.pexels.com/photo/notebook-beside-the-iphone-on-table-196644/",
  },
  {
    slug: "web-development",
    number: "02",
    title: "Web Development",
    titleLines: ["Web", "Development"],
    homepageCopy:
      "Responsive, polished websites built to turn approved designs into reliable digital experiences.",
    homepageDetail: "Business sites · landing pages · e-commerce",
    paragraphs: [
      "This is where the approved design becomes a working site. I build business sites, landing pages, and e-commerce stores that hold up under real traffic, not just in a demo.",
      "Every site is responsive by default and built for speed, since a slow page loses visitors before they see anything. I work with modern frameworks and clean, maintainable code, so updates later don't mean rebuilding from scratch.",
      "E-commerce projects get extra attention on checkout flow and product pages, since that's where most sales are won or lost.",
    ],
    included: [
      "Responsive, cross-browser builds",
      "Performance and load-time optimization",
      "CMS or e-commerce integration where needed",
      "Clean handoff with documentation",
    ],
    seoDescription:
      "Responsive web development for business websites, landing pages, and e-commerce stores with a focus on performance and maintainable code.",
    image: webDevelopmentImage,
    imageAlt:
      "Modern development workspace with source code displayed on a laptop",
    photographer: "Daniil Komov",
    photoUrl:
      "https://www.pexels.com/photo/modern-workspace-with-laptop-and-code-display-34804001/",
  },
  {
    slug: "mobile-enhancement",
    number: "03",
    title: "Mobile Enhancement",
    titleLines: ["Mobile", "Enhancement"],
    homepageCopy:
      "Improving layouts and interactions so websites remain clear, usable, and comfortable on smaller screens.",
    homepageDetail: "Responsive redesign · usability · accessibility",
    paragraphs: [
      "A lot of sites are designed for desktop first, and mobile becomes an afterthought — a shrunk-down version of the same layout that's hard to tap and slow to load. This service fixes that.",
      "I go through the existing site on real devices, find where layouts break or interactions feel clumsy, and rework them for smaller screens. That includes touch targets, font sizes, image loading, and navigation that doesn't require pinching and zooming.",
      "Accessibility is part of the same pass: contrast, tap area size, and screen reader support, so the site works for more people, not fewer.",
    ],
    included: [
      "Mobile usability audit",
      "Responsive redesign of problem areas",
      "Accessibility fixes (contrast, tap targets, screen readers)",
      "Cross-device testing",
    ],
    seoDescription:
      "Improve existing websites for mobile with responsive redesign, usability fixes, accessibility improvements, and cross-device testing.",
    image: mobileEnhancementImage,
    imageAlt:
      "Smartphone displaying a mobile interface on a clean dark surface",
    photographer: "Mostafa Ft.shots",
    photoUrl:
      "https://www.pexels.com/photo/smartphone-on-dark-surface-with-app-screen-36136699/",
  },
  {
    slug: "seo",
    number: "04",
    title: "SEO",
    titleLines: ["SEO"],
    homepageCopy:
      "Building a stronger technical and content foundation so search engines and users can better understand the site.",
    homepageDetail: "Structure · performance · discoverability",
    paragraphs: [
      "Search visibility starts with the site's technical foundation. Before touching content, I check how search engines actually crawl and read the site — page structure, load speed, broken links, mobile-friendliness, and whether pages are indexed at all.",
      "Once that foundation is solid, the focus shifts to discoverability: keyword research, metadata, and content structure that matches what people are actually searching for. Performance work continues here too, since page speed is both a ranking factor and a reason visitors stay or leave.",
      "This isn't a one-time fix. Search engines change their criteria, so the setup includes monitoring to catch drops before they become a problem.",
    ],
    included: [
      "Technical SEO audit",
      "Site structure and metadata optimization",
      "Keyword and content strategy",
      "Ongoing performance monitoring",
    ],
    seoDescription:
      "Technical SEO, site structure, metadata, keyword strategy, performance optimization, and monitoring to improve search visibility.",
    image: seoImage,
    imageAlt: "Analytics charts displayed on a laptop in a focused workspace",
    photographer: "Negative Space",
    photoUrl: "https://www.pexels.com/photo/blue-and-green-pie-chart-97080/",
  },
];

export const serviceBySlug = new Map(
  services.map((service) => [service.slug, service]),
);
