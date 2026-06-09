import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type LenisInstance = Lenis;

let rafCallback: ((time: number) => void) | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === "undefined") return null;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (prefersReduced || isCoarsePointer) return null;

  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  rafCallback = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(rafCallback);
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyLenis(lenis: Lenis | null): void {
  if (!lenis) return;

  if (rafCallback) {
    gsap.ticker.remove(rafCallback);
    rafCallback = null;
  }

  lenis.destroy();
}
