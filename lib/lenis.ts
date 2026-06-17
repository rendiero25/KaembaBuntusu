import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type LenisInstance = Lenis;

const NAV_SCROLL_OFFSET = 72;

let lenisInstance: Lenis | null = null;
let rafCallback: ((time: number) => void) | null = null;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function refreshScroll(): void {
  lenisInstance?.resize();
  ScrollTrigger.refresh();
}

/** Ensure Lenis + ScrollTrigger bridge exist before creating triggers. */
export function ensureScrollAnimation(): Lenis | null {
  return initLenis();
}

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReduced) return null;

  const lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.9,
    anchors: {
      offset: -NAV_SCROLL_OFFSET,
    },
    prevent: (node) =>
      node instanceof Element &&
      Boolean(
        node.closest(
          "[data-lenis-prevent], [data-lenis-prevent-wheel], [data-lenis-prevent-touch]",
        ),
      ),
  });

  // Lenis 1.3 + GSAP: no scrollerProxy — update ScrollTrigger on Lenis scroll.
  lenis.on("scroll", ScrollTrigger.update);

  rafCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  document.documentElement.classList.add("lenis", "lenis-smooth");

  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return lenis;
}

export function destroyLenis(lenis: Lenis | null): void {
  if (!lenis || lenis !== lenisInstance) return;

  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
    rafCallback = null;
  }

  lenis.destroy();
  lenisInstance = null;
  document.documentElement.classList.remove("lenis", "lenis-smooth");
}

export function lockScroll(): void {
  lenisInstance?.stop();
}

export function unlockScroll(): void {
  lenisInstance?.start();
}
