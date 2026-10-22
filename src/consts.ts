/** Site name. Appended to every page title and used as `og:site_name`. */
export const SITE_NAME = "Kiguidev";
/** Fallback meta description for pages that don't set their own. */
export const SITE_DESCRIPTION =
  "Kiguidev designs and builds thoughtful digital products with clarity, usability, and performance at their core.";
/** Canonical origin. Resolves canonical URLs, social images, and the sitemap. */
export const SITE_URL = "https://kiguidev.me";
/** BCP 47 locale tag used to format dates and numbers. */
export const SITE_LOCALE = "en-US";
/** Open Graph locale used by social previews. */
export const SITE_OG_LOCALE = "en_US";
/** Public practitioner identity used by metadata and structured data. */
export const SITE_AUTHOR = "Guillermo Obando";
/** Truthful operating base displayed in entity and service-area content. */
export const SITE_BASE = "Costa Rica";
/** Markets served remotely by Kiguidev. */
export const SITE_MARKETS = ["Costa Rica", "United States"] as const;
/** Canonical client scheduling destination used by every booking CTA. */
export const SCHEDULE_URL = import.meta.env.CALENDLY_URL || "https://calendly.com/guillermo-obandoc/45min";
/**
 * Routes kept out of search results. Each is excluded from the sitemap and
 * served with a `robots: noindex, nofollow` tag, so the two can't disagree.
 *
 * Surrounding slashes are optional: `"/thanks"`, `"thanks"` and `"/thanks/"`
 * all match the same route.
 */
export const NOINDEX_ROUTES: string[] = ["/404"];
