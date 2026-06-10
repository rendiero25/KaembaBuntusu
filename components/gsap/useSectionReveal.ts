"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { DURATION } from "@/lib/constants";
import { getPrefersReducedMotion } from "@/lib/motion";
import { animateRevealBatch } from "@/lib/revealTimeline";

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

  const sectionRef = useRef<T>(null);

  useGSAP(
    () => {
      if (getPrefersReducedMotion()) return;

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

      ScrollTrigger.refresh();

      const revealThreshold = window.innerHeight * 0.78;
      items.forEach((item) => {
        const { top, bottom } = item.getBoundingClientRect();
        if (top < revealThreshold && bottom > 0) {
          gsap.set(item, { y: 0, opacity: 1 });
        }
      });
    },
    { scope: sectionRef },
  );

  return sectionRef;
}
