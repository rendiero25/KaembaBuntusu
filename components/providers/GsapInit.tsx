"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { destroyLenis, initLenis } from "@/lib/lenis";

export function GsapInit() {
  useEffect(() => {
    const lenis = initLenis();

    const refreshScrollTriggers = () => {
      ScrollTrigger.refresh();
    };

    if (document.fonts?.ready) {
      void document.fonts.ready.then(refreshScrollTriggers);
    }

    window.addEventListener("load", refreshScrollTriggers);

    return () => {
      window.removeEventListener("load", refreshScrollTriggers);
      destroyLenis(lenis);
    };
  }, []);

  return null;
}
