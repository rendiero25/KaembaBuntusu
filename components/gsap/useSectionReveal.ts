"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMotionReady } from "@/components/providers/MotionReadyContext";
import { DURATION } from "@/lib/constants";
import { ensureScrollAnimation, refreshScroll } from "@/lib/lenis";
import { getPrefersReducedMotion } from "@/lib/motion";
import { animateRevealBatch, scheduleViewportReveal } from "@/lib/revealTimeline";

type UseSectionRevealOptions = {
  itemSelector?: string;
  triggerStart?: string;
  stagger?: number;
};

export function useSectionReveal<T extends HTMLElement = HTMLElement>(
  options: UseSectionRevealOptions = {},
) {
  const {
    itemSelector = "[data-section-item]",
    triggerStart = "top 78%",
    stagger = 0.08,
  } = options;

  const motionReady = useMotionReady();
  const sectionRef = useRef<T>(null);

  useGSAP(
    () => {
      if (!motionReady || getPrefersReducedMotion()) return;

      ensureScrollAnimation();

      const section = sectionRef.current;
      if (!section) return;

      const items = gsap.utils.toArray<HTMLElement>(itemSelector, section);
      if (!items.length) return;

      gsap.set(items, { y: 40, opacity: 0, force3D: true });

      ScrollTrigger.batch(items, {
        start: triggerStart,
        once: true,
        interval: 0.08,
        batchMax: 4,
        onEnter: (batch) => {
          animateRevealBatch(batch, {
            y: 0,
            duration: DURATION.base,
            stagger,
          });
        },
      });

      refreshScroll();

      const thresholdMatch = triggerStart.match(/top\s+(\d+)%/);
      const revealRatio = thresholdMatch
        ? Number(thresholdMatch[1]) / 100
        : 0.78;

      return scheduleViewportReveal(items, revealRatio);
    },
    { dependencies: [motionReady], scope: sectionRef, revertOnUpdate: true },
  );

  return sectionRef;
}
