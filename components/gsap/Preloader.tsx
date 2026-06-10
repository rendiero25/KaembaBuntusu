"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { lockScroll, refreshScroll, unlockScroll } from "@/lib/lenis";
import { EASE, Z_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

type PreloaderProps = {
  children: React.ReactNode;
  onComplete?: () => void;
};

function shouldSkipPreloader(): boolean {
  if (typeof window === "undefined") return false;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) return true;

  const nav = performance.getEntriesByType(
    "navigation",
  )[0] as PerformanceNavigationTiming | undefined;
  const isHardReload = nav?.type === "reload";
  const hasCompleted =
    sessionStorage.getItem("kaemba-preloader-complete") === "1";

  return !isHardReload && hasCompleted;
}

export function Preloader({ children, onComplete }: PreloaderProps) {
  const [ready, setReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (shouldSkipPreloader()) {
      const frame = requestAnimationFrame(() => setReady(true));
      return () => cancelAnimationFrame(frame);
    }

    lockScroll();

    let split: SplitText | null = null;

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      if (brandRef.current) {
        split = SplitText.create(brandRef.current, { type: "chars" });
        gsap.set(split.chars, { y: 100, opacity: 0 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("kaemba-preloader-complete", "1");
          unlockScroll();
          refreshScroll();
          setReady(true);
        },
      });

      tl.to(counter, {
        value: 100,
        duration: 1.1,
        ease: EASE.out,
        onUpdate: () => {
          if (!counterRef.current) return;
          counterRef.current.textContent = String(
            Math.round(counter.value),
          ).padStart(3, "0");
        },
      });

      if (split) {
        tl.to(
          split.chars,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.06,
            ease: EASE.expo,
          },
          "-=0.2",
        );
      }

      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "expo.inOut",
        },
        "+=0.15",
      );
    }, overlayRef);

    return () => {
      split?.revert();
      ctx.revert();
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    onComplete?.();
  }, [ready, onComplete]);

  return (
    <>
      {!ready && (
        <div
          ref={overlayRef}
          style={{ zIndex: Z_INDEX.preloader }}
          aria-live="polite"
          role="status"
          aria-label="Loading site"
          className="fixed inset-0 flex flex-col items-center justify-center bg-bg"
        >
          <div className="flex flex-col items-center">
            <span
              ref={counterRef}
              className="font-mono text-5xl font-normal text-gold tabular-nums md:text-6xl"
            >
              000
            </span>
            <span className="mt-3 font-mono text-[11px] uppercase text-sage">
              Loading
            </span>
          </div>

          <h2
            ref={brandRef}
            className="pointer-events-none absolute font-display text-4xl font-bold text-ivory md:text-6xl"
            aria-hidden="true"
          >
            K · A · E · M · B · A
          </h2>
        </div>
      )}
      <div className={cn(!ready && "invisible")} aria-hidden={!ready}>
        {children}
      </div>
    </>
  );
}
