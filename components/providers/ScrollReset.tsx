"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLenis, refreshScroll } from "@/lib/lenis";

export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    // Do not kill all ScrollTriggers here — useGSAP runs in useLayoutEffect
    // before this effect, so a global kill leaves reveal targets stuck at opacity: 0.
    // Each animated component cleans up its own triggers on unmount.
    refreshScroll();
  }, [pathname]);

  return null;
}
