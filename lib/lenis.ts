import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type LenisInstance = Lenis;

const NAV_SCROLL_OFFSET = 72;

let lenisInstance: Lenis | null = null;
let rafCallback: ((time: number) => void) | null = null;
let scrollerElement: HTMLElement | null = null;
let refreshHandler: (() => void) | null = null;

function getScrollerElement(): HTMLElement {
  return document.documentElement;
}

function setupScrollerProxy(lenis: Lenis): void {
  const scroller = getScrollerElement();
  scrollerElement = scroller;

  ScrollTrigger.scrollerProxy(scroller, {
    scrollTop(value) {
      if (arguments.length && typeof value === "number") {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType:
      document.body.style.transform !== "" ? "transform" : "fixed",
  });

  ScrollTrigger.defaults({ scroller });

  lenis.on("scroll", ScrollTrigger.update);

  refreshHandler = () => {
    lenis.resize();
  };
  ScrollTrigger.addEventListener("refresh", refreshHandler);
}

function teardownScrollerProxy(): void {
  if (refreshHandler) {
    ScrollTrigger.removeEventListener("refresh", refreshHandler);
    refreshHandler = null;
  }

  if (scrollerElement) {
    ScrollTrigger.scrollerProxy(scrollerElement, {});
    scrollerElement = null;
  }
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function refreshScroll(): void {
  lenisInstance?.resize();
  ScrollTrigger.refresh();
}

/** Ensure Lenis + ScrollTrigger scroller proxy exist before creating triggers. */
export function ensureScrollAnimation(): Lenis | null {
  return initLenis();
}

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;
  if (lenisInstance) return lenisInstance;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (prefersReduced || isCoarsePointer) return null;

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

  setupScrollerProxy(lenis);

  rafCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  lenisInstance = lenis;
  document.documentElement.classList.add("lenis");

  return lenis;
}

export function destroyLenis(lenis: Lenis | null): void {
  if (!lenis || lenis !== lenisInstance) return;

  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
    rafCallback = null;
  }

  teardownScrollerProxy();
  lenis.destroy();
  lenisInstance = null;
  document.documentElement.classList.remove("lenis");
}

export function lockScroll(): void {
  lenisInstance?.stop();
}

export function unlockScroll(): void {
  lenisInstance?.start();
}
