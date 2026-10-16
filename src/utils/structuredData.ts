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
      homeLocation: {
        "@type": "Country",
        name: SITE_BASE,
      },
      worksFor: { "@id": entityIds.organization },
    },
    {
      "@type": "Organization",
      "@id": entityIds.organization,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
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
