"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { destroyLenis, ensureScrollAnimation, initLenis, refreshScroll } from "@/lib/lenis";

export function GsapInit() {
  useEffect(() => {
    ensureScrollAnimation();
    const lenis = initLenis();

    const refreshScrollTriggers = () => {
      refreshScroll();
    };

    if (document.fonts?.ready) {
      void document.fonts.ready.then(refreshScrollTriggers);
    }

    window.addEventListener("load", refreshScrollTriggers);
    window.addEventListener("resize", refreshScrollTriggers);

    const resizeObserver =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            refreshScrollTriggers();
          })
        : null;

    resizeObserver?.observe(document.body);

    return () => {
      window.removeEventListener("load", refreshScrollTriggers);
      window.removeEventListener("resize", refreshScrollTriggers);
      resizeObserver?.disconnect();
      destroyLenis(lenis);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
