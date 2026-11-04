import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Runs a homepage section's GSAP setup on load and after each navigation, reverting it before swaps.
export const onHomeMotion = (setup: () => void) => {
  let context: gsap.Context | undefined;
  const run = () => {
    context?.revert();
    context = undefined;
    const root = document.querySelector<HTMLElement>(".editorial-home_wrap");
    if (!root || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    context = gsap.context(setup, root);
  };
  run();
  document.addEventListener("astro:page-load", run);
  document.addEventListener("astro:before-swap", () => context?.revert());
};

export const reveal = (selector: string) =>
  gsap.fromTo(
    selector,
    { y: 24 },
    {
      y: 0,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: { trigger: selector, start: "top 82%", once: true },
    },
  );

export const staggerCards = (cards: string, trigger: string) =>
  gsap.fromTo(
    cards,
    { y: 48 },
    {
      y: 0,
      duration: 0.85,
      stagger: 0.09,
      ease: "power3.out",
      scrollTrigger: { trigger, start: "top 78%", once: true },
    },
  );
