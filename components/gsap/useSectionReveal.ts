"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useMotionReady } from "@/components/providers/MotionReadyContext";
import { ensureScrollAnimation, refreshScroll } from "@/lib/lenis";
import { getPrefersReducedMotion } from "@/lib/motion";
import {
  createScrollRevealTriggers,
  scheduleViewportReveal,
} from "@/lib/revealTimeline";

type UseSectionRevealOptions = {
  itemSelector?: string;
  triggerStart?: string;
};

export function useSectionReveal<T extends HTMLElement = HTMLElement>(
  options: UseSectionRevealOptions = {},
) {
  const { itemSelector = "[data-section-item]", triggerStart = "top 85%" } =
    options;

  const motionReady = useMotionReady();
  const sectionRef = useRef<T>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const items = gsap.utils.toArray<HTMLElement>(itemSelector, section);
      if (!items.length) return;

      if (getPrefersReducedMotion()) {
        gsap.set(items, { clearProps: "opacity,transform" });
        return;
      }

      if (!motionReady) {
        gsap.set(items, { y: 40, opacity: 0, force3D: true });
        return;
      }

      ensureScrollAnimation();

      createScrollRevealTriggers(items, {
        start: triggerStart,
        y: 40,
        once: true,
      });

      refreshScroll();

      const thresholdMatch = triggerStart.match(/top\s+(\d+)%/);
      const revealRatio = thresholdMatch
        ? Number(thresholdMatch[1]) / 100
        : 0.85;

      return scheduleViewportReveal(items, revealRatio);
    },
    { dependencies: [motionReady], scope: sectionRef, revertOnUpdate: true },
  );

  return sectionRef;
}
