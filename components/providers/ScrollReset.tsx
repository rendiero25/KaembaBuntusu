"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/lenis";

export function ScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
    ScrollTrigger.getAll().forEach((t) => t.kill());
    ScrollTrigger.refresh();
  }, [pathname]);

  return null;
}
