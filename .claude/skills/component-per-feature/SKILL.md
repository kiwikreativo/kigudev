---
name: component-per-feature
description: Put every new feature, section, or UI block in its own Astro component and import it where it's needed, never inline in a page or a parent component. Use whenever adding a feature, section, card, form, or widget to a page, or when a page or parent component starts holding markup, CSS, or scripts that belong to one feature.
---

# One feature, one component

Every new feature lives in its own `.astro` file and is imported wherever it's
used. A page, or a parent like `HomePortfolio.astro`, only composes components.
It doesn't hold a feature's markup, data, CSS or scripts.

## Where it goes

- A homepage section goes in `src/components/Home/<Name>.astro` and is imported in
  `src/components/Portfolio/HomePortfolio.astro` in reading order.
- A section for any other page goes in a folder named for that page,
  `src/components/<Page>/`, for example `src/components/About/`.
- Anything used on more than one page goes in the shared folder that fits:
  `Item/`, `Media/`, `Interactive/`, `Typography/` or `Wrapper/`.
- Name files in PascalCase after what they show: `Testimonials.astro`,
  `Pricing.astro`, not `section3.astro`.

## What moves into the component

Everything that belongs only to that feature goes in its file:

- **Data:** the array or object the feature renders, defined in its frontmatter,
  or imported from `src/data/` when other pages use it too.
- **Imports:** images, `Image`, `Heading`, constants such as `SCHEDULE_URL`.
- **Markup:** the whole `<section>`, including its `id` and `aria-labelledby`.
- **CSS:** in the component's own `<style is:global>` under `@layer components`,
  with class names prefixed by the feature (`.editorial-testimonial_card`).
  See LUMOS.md "New style checklist".
- **Script:** its own `<script>`. For homepage motion, use `onHomeMotion`,
  `reveal` and `staggerCards` from `src/utils/homeMotion.ts` rather than writing
  your own GSAP context and listeners.

Only rules several features share stay in the parent: the `.editorial-home_wrap`
tokens, `.editorial-kicker`, `.editorial-button`, `.editorial-serif`, the shared
section heading, and container widths. Use those classes; don't copy them.

## Steps

1. Read the page or parent you're adding to, and reuse the existing shared
   classes and components (LUMOS.md: compose from components first).
2. Create the component file with its data, markup, CSS and script.
3. Import it and place it in the parent: `<Testimonials />`.
4. If the feature replaces inline code, delete the inline version and any
   component that is now unused. Grep first to confirm nothing imports it.
5. Verify:
   - `npm run build`, `npx astro check` and `npm test` pass.
   - The page looks right at 375px and 1440px in light and dark, with no
     sideways scroll.
   - When moving existing code, screenshot before and after. Switching from
     scoped to `is:global` styles can change which rule wins when two rules
     compete (see the gotcha below).

## Gotchas

- **Scoped to global:** a scoped selector gains one `[data-astro-cid]` per
  compound, so `.a + .a` used to beat `.a:nth-child(2n)`. Once global, the
  two tie and the later rule wins. Compare screenshots before and after any move.
- **Overriding a shared rule:** a rule in a child that overrides one in the parent
  (for example `max-width` on the shared section `h2`) needs higher
  specificity, such as `.editorial-testimonials_header.editorial-section_header h2`,
  because the order of the files in the CSS bundle isn't guaranteed.
- **Prettier and inline links:** Prettier can drop the space before an inline
  `<a>`. Write `at{" "}<a ...>` and check the built text.
