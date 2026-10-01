# Design Patterns to Implement

## Scope

- Applies to every design or redesign task unless I say otherwise.
- Change only what the task requires. Prefer minimal diffs over rewrites.
- If a rule here conflicts with my current request, my current request wins.

## Before Implementing

- Read the existing component, page, or layout first.
- Check whether the component can be built as a `.astro` file if not use the native component technology.
  - Confirm it will actually work. Do not say yes and then generate a non-functional `.astro` component.
  - If it needs client-side interactivity (state, event handlers, animations driven by JS), say so and choose one of these:
    - A `<script>` tag inside the `.astro` file for small interactions.
    - A framework island with the right `client:*` directive when state is complex.
- Replace the design and structure only. Leave the content exactly as it is unless I tell you to change it (text, images, links, data, alt text, SEO metadata).
- Replace every icon library with Phosphor Icons. Always use Phosphor Icons.
  - Remove the old icon imports and dependencies once nothing uses them.
  - Keep one consistent weight (regular, bold, duotone, etc.) per project unless I ask otherwise.

## During Implementation

### Code

- Avoid generic function and variable names (`handleClick`, `data`, `toggle`, `init`). Use names that describe what the code does (`openMobileMenu`, `animateHeroOnScroll`).
- Keep components small and single-purpose.
- Use semantic HTML (`header`, `nav`, `main`, `section`, `footer`, `button`) before reaching for `div`.
- Keep styles scoped to the component. Use shared design tokens (colors, spacing, radii, fonts) instead of hardcoded values.
- Preserve the actual structure of the page.

### Design

- Mobile first. The result must work from 320px up to large desktop screens.
- Keep visual hierarchy clear: one primary action per view, consistent spacing scale, consistent typography scale.
- Support light and dark mode if the project already does. Do not break it if it exists.
- Meet WCAG AA color contrast.

### Animations

- Animate `transform` and `opacity` where possible. Avoid animating layout properties (`width`, `height`, `top`, `left`).
- Respect `prefers-reduced-motion`. Provide a reduced or disabled version of every animation.
- Keep durations short and consistent (roughly 150–400 ms for UI, longer only for deliberate effects).
- Do not remove existing animations unless I ask. Reimplement them in the new design.

### Accessibility

- Every interactive element must be reachable and usable by keyboard, with a visible focus state.
- Icon-only buttons need an `aria-label`. Decorative icons get `aria-hidden="true"`.
- Keep or improve existing `alt` text, headings order, and landmarks.

### Performance

- Do not add heavy dependencies for something CSS or plain JS can do.
- Keep images optimized and sized (use Astro's `<Image />` when the project already uses it).
- Ship as little client-side JavaScript as possible.

## After Implementation

Do not call the work complete until every item below is checked.

- [ ] The component is fully working, including all animations and interactions.
- [ ] The original content and information were preserved.
- [ ] Every icon comes from Phosphor Icons, and unused icon libraries are removed.
- [ ] The build passes with no errors or new warnings (`npm run build`).
- [ ] The layout works at mobile, tablet, and desktop widths.
- [ ] Keyboard navigation, focus states, and reduced-motion behavior work.
- [ ] No leftover unused code, imports, or styles.
- [ ] No content overlaps, clips, or breaks inside words at any supported viewport; verify the longest real title, label, metadata value, credit, and control set in every repeated card or slide.
- [ ] Repeated cards and slides use consistent spacing between related CTAs, credits, and controls: they never touch, overlap, or drift apart across real content variations, and every real item is checked.
- [ ] Check the top, right, bottom, and left spacing around every content group at mobile, tablet, and desktop widths; content must stay inside its container, never overlap or touch adjacent elements, and related items must use consistent, intentional gaps without excessive empty space.

## Response Format

- Give a short summary of what changed and which files were touched.
- If something could not be preserved or could not be built as `.astro`, say so clearly instead of hiding it.
- Give commands as copy-pasteable blocks and explain briefly what each one does.
