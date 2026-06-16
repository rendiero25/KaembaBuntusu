"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { useMotionReady } from "@/components/providers/MotionReadyContext";
import { DURATION } from "@/lib/constants";
import { ensureScrollAnimation, refreshScroll } from "@/lib/lenis";
import { getPrefersReducedMotion } from "@/lib/motion";
import { animateRevealBatch, scheduleViewportReveal } from "@/lib/revealTimeline";

type UseScrollRevealOptions = {
  selector?: string;
  start?: string;
  stagger?: number;
  y?: number;
  once?: boolean;
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {},
) {
  const {
    selector = "[data-reveal]",
    start = "top 85%",
    stagger = 0.07,
    y = 36,
    once = true,
  } = options;

  const motionReady = useMotionReady();
  const scopeRef = useRef<T>(null);

  useGSAP(
    () => {
      if (!motionReady || getPrefersReducedMotion()) return;

      ensureScrollAnimation();

      const scope = scopeRef.current;
      if (!scope) return;

      const targets = gsap.utils.toArray<HTMLElement>(selector, scope);
      if (!targets.length) return;

      gsap.set(targets, { y, opacity: 0, force3D: true });

      ScrollTrigger.batch(targets, {
        start,
        once,
        interval: 0.1,
        batchMax: 6,
        onEnter: (batch) => {
          animateRevealBatch(batch, {
            y: 0,
            duration: DURATION.base,
            stagger: gsap.utils.clamp(0.04, 0.12, stagger),
          });
        },
      });

      refreshScroll();

      const thresholdMatch = start.match(/top\s+(\d+)%/);
      const revealRatio = thresholdMatch
        ? Number(thresholdMatch[1]) / 100
        : 0.85;

      return scheduleViewportReveal(targets, revealRatio);
    },
    { dependencies: [motionReady], scope: scopeRef, revertOnUpdate: true },
  );

  return scopeRef;
}
