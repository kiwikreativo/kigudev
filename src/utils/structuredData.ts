import {
  SITE_AUTHOR,
  SITE_BASE,
  SITE_MARKETS,
  SITE_NAME,
  SITE_URL,
} from "@/consts.ts";

export const entityIds = {
  person: `${SITE_URL}/#person`,
  organization: `${SITE_URL}/#organization`,
  website: `${SITE_URL}/#website`,
};

export const areaServed = SITE_MARKETS.map((name) => ({
  "@type": "Country",
  name,
}));

export const siteEntityGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": entityIds.person,
      name: SITE_AUTHOR,
      url: `${SITE_URL}/about/`,
      jobTitle: "Web Designer and Front-End Developer",
      image: `${SITE_URL}/guillermo.jpg`,
      email: "guillermo.obando@kiguidev.me",
      knowsAbout:['Web Design', 'Front-End Development', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'CSS', 'Astro', 'Tailwind CSS', 'Node.js', 'Express.js', 'GraphQL', 'REST APIs', 'Responsive Design', 'UI/UX Design', 'Performance Optimization', 'Accessibility', 'SEO', 'Version Control (Git)', 'Agile Methodologies'],
      knowsLanguage: ["es", "en"],
      sameAs: [
        "https://www.linkedin.com/in/guillermo-obando/",
      ],
      homeLocation: {
        "@type": "Country",
        name: SITE_BASE,
      },
      worksFor: { "@id": entityIds.organization },
    },
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": entityIds.organization,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/logo.webp`,
      image: `${SITE_URL}/logo.webp`,
      email: "guillermo.obando@kiguidev.me",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Alajuela",
        addressCountry: "CR",
      },
      founder: { "@id": entityIds.person },
      areaServed,
    },
    {
      "@type": "WebSite",
      "@id": entityIds.website,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: "en-US",
      publisher: { "@id": entityIds.organization },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: "Web Designer and Front-End Developer in Costa Rica",
      isPartOf: { "@id": entityIds.website },
      about: { "@id": entityIds.person },
    },
  ],
};

export const entityNodes = siteEntityGraph["@graph"].filter(
  (node) => node["@id"] === entityIds.person || node["@id"] === entityIds.organization,
);

export const breadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});
