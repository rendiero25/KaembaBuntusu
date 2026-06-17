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

type UseScrollRevealOptions = {
  selector?: string;
  start?: string;
  y?: number;
  once?: boolean;
};

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {},
) {
  const {
    selector = "[data-reveal]",
    start = "top 85%",
    y = 36,
    once = true,
  } = options;

  const motionReady = useMotionReady();
  const scopeRef = useRef<T>(null);

  useGSAP(
    () => {
      const scope = scopeRef.current;
      if (!scope) return;

      const targets = gsap.utils.toArray<HTMLElement>(selector, scope);
      if (!targets.length) return;

      if (getPrefersReducedMotion()) {
        gsap.set(targets, { clearProps: "opacity,transform" });
        return;
      }

      if (!motionReady) {
        gsap.set(targets, { y, opacity: 0, force3D: true });
        return;
      }

      ensureScrollAnimation();

      createScrollRevealTriggers(targets, { start, y, once });

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
