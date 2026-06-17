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

    const frameIds: number[] = [];
    const timeouts: number[] = [];

    const refresh = () => refreshScroll();

    refresh();
    frameIds.push(
      requestAnimationFrame(() => {
        refresh();
        frameIds.push(requestAnimationFrame(refresh));
      }),
    );
    timeouts.push(window.setTimeout(refresh, 100));
    timeouts.push(window.setTimeout(refresh, 350));

    return () => {
      frameIds.forEach((id) => cancelAnimationFrame(id));
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [pathname]);

  return null;
}
