"use client";

import { useEffect } from "react";
import { ensureScrollAnimation, initLenis, refreshScroll } from "@/lib/lenis";

export function GsapInit() {
  useEffect(() => {
    ensureScrollAnimation();
    initLenis();

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
      // Lenis is a singleton for the app lifetime — do not destroy here.
      // destroyLenis() breaks ScrollTriggers in React Strict Mode remounts.
    };
  }, []);

  return null;
}
