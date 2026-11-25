// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { SITE_URL } from "./src/consts.ts";
import { isNoindexRoute } from "./src/utils/seo.ts";

export default defineConfig({
  site: SITE_URL,
  integrations: [
    sitemap({
      filter: (page) => !isNoindexRoute(new URL(page).pathname),
    }),
  ],
  fonts: [
    { name: "Barlow Condensed", cssVariable: "--font-barlow", provider: fontProviders.google(), weights: [600, 700, 800], styles: ["normal", "italic"], fallbacks: ["sans-serif"] },
    { name: "Fraunces", cssVariable: "--font-fraunces", provider: fontProviders.google(), weights: [400, 500, 600], styles: ["normal", "italic"], fallbacks: ["Georgia", "serif"] },
    { name: "Geist", cssVariable: "--font-geist", provider: fontProviders.google(), weights: [400, 500, 600], fallbacks: ["sans-serif"] },
    { name: "JetBrains Mono", cssVariable: "--font-jetbrains", provider: fontProviders.google(), weights: [500, 600], fallbacks: ["monospace"] },
    { name: "Satoshi", cssVariable: "--font-satoshi", provider: fontProviders.fontshare(), weights: [400, 500, 600, 700], fallbacks: ["sans-serif"] },
    {
      name: "Inter",
      cssVariable: "--font-inter",
      provider: fontProviders.local(),
      options: {
        variants: [
          {
            weight: 400,
            style: "normal",
            src: ["./src/assets/fonts/inter-regular.woff2"],
          },
        ],
      },
    },
  ],
  vite: { build: { cssTarget: "safari15.4" } },
});
