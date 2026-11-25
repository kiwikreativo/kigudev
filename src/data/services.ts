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
  audience: string;
  process: string[];
  faqs: Array<{ question: string; answer: string }>;
  seoDescription: string;
  image: ImageMetadata;
  imageAlt: string;
  photographer: string;
  photoUrl: string;
}

export const services: Service[] = [
  {
    slug: "web-redesign",
    number: "01",
    title: "Web Redesign",
    titleLines: ["WEB", "REDESIGN"],
    homepageCopy:
      "Outdated websites redesigned into modern, responsive experiences built around real users and business goals.",
    homepageDetail: "Site review · user flows · new design",
    paragraphs: [
      "A redesign starts with the site you already have, not a blank canvas. Before anything changes, I look at who visits it, what they're trying to do, and where the current pages make them guess, scroll past or leave.",
      "That review shows what to keep and what to rebuild. Content that works stays; confusing navigation, dated layouts and pages that break on phones get replaced. I map the paths visitors should take, then design a consistent set of colors, type, spacing and components so every page feels like the same business.",
      "The goal is a site that fits the business it represents today. A logistics company and an event studio need different things, and the new design should reflect that rather than following a generic template.",
    ],
    included: [
      "Review of the current site and competitors",
      "New structure and user flow mapping",
      "Responsive redesign, from wireframes to final screens",
    ],
    audience:
      "For businesses whose website looks outdated, doesn't work well on phones, or no longer explains what they do.",
    process: [
      "Review the current site, its content, and what visitors need from it.",
      "Decide what to keep, rewrite or remove, and map the new page structure.",
      "Design and refine responsive screens, components, and interaction states.",
      "Rebuild the site, or hand off implementation-ready designs to your team.",
    ],
    faqs: [
      { question: "Do I need to start from scratch?", answer: "No. A redesign keeps the content, pages and search visibility that already work, and replaces what holds the site back." },
      { question: "Can the redesign be delivered without development?", answer: "Yes. The engagement can end with approved responsive designs and a reusable design system, or continue into building the new site." },
      { question: "What is needed to begin?", answer: "Access to the current site, your business goals, your main audience, and any brand material you want to keep." },
    ],
    seoDescription:
      "Website redesign for businesses with outdated or hard-to-use sites: a review of what works, a clearer structure, and a modern responsive design.",
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
    audience:
      "For businesses that need a responsive marketing site, landing page, e-commerce experience, or front-end implementation of an approved design.",
    process: [
      "Confirm scope, content, integrations, and the pages required for launch.",
      "Translate approved layouts into accessible, reusable components.",
      "Optimize responsive behavior, images, loading, and interaction details.",
      "Test the finished site and provide a clear launch or handoff path.",
    ],
    faqs: [
      { question: "Can an existing design be developed?", answer: "Yes. Development can begin from an approved design, or design and development can be handled together as one engagement." },
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
    audience:
      "For teams with an existing website that works on desktop but has layout, navigation, readability, performance, or accessibility problems on smaller screens.",
    process: [
      "Review the current site at representative mobile and tablet widths.",
      "Prioritize layout failures, difficult controls, content density, and loading issues.",
      "Rework the highest-impact components and responsive rules.",
      "Verify the updated experience across devices, keyboard input, and reduced-motion settings.",
    ],
    faqs: [
      { question: "Does the whole website need to be redesigned?", answer: "Not necessarily. The work can focus on the specific templates and interactions causing the greatest mobile friction." },
      { question: "Is accessibility included?", answer: "Accessibility checks for contrast, focus, keyboard use, touch targets, semantic structure, and screen-reader context are included in the improvement pass." },
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
    audience:
      "For businesses with a technically sound service to offer but unclear search positioning, weak crawl paths, incomplete metadata, or content that does not answer buyer questions.",
    process: [
      "Audit crawlability, indexability, metadata, page structure, links, and performance risks.",
      "Align priority pages with real search intent and a coherent site architecture.",
      "Implement technical, on-page, schema, image, and internal-link improvements.",
      "Measure deployed results and maintain an action plan for content and authority growth.",
    ],
    faqs: [
      { question: "Does SEO guarantee a ranking position?", answer: "No. SEO improves technical accessibility, relevance, and evidence, but rankings also depend on competition, authority, demand, and ongoing search-engine changes." },
      { question: "Is SEO a one-time project?", answer: "A technical foundation can be corrected in one engagement, but content, competitors, links, and search behavior should be reviewed over time." },
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
