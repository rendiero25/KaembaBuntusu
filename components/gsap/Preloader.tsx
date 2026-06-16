"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { lockScroll, refreshScroll, unlockScroll } from "@/lib/lenis";
import { MotionReadyProvider } from "@/components/providers/MotionReadyContext";
import { EASE, Z_INDEX } from "@/lib/constants";

type PreloaderProps = {
  children: React.ReactNode;
  onComplete?: () => void;
};

const BRAND_TEXT = "KAEMBA BUNTUSU";
const PRELOADER_MAX_MS = 3500;

function shouldSkipPreloader(): boolean {
  if (typeof window === "undefined") return false;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) return true;

  return localStorage.getItem("kaemba-preloader-complete") === "1";
}

function markPreloaderComplete(): void {
  try {
    localStorage.setItem("kaemba-preloader-complete", "1");
  } catch {
    // sessionStorage may be unavailable in private mode
  }
}

export function Preloader({ children, onComplete }: PreloaderProps) {
  const [ready, setReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const brandWrapRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLHeadingElement>(null);
  const completedRef = useRef(false);
  const splitRef = useRef<SplitText | null>(null);

  const finishPreloader = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    markPreloaderComplete();
    unlockScroll();
    setReady(true);
  };

  useGSAP(
    () => {
      if (shouldSkipPreloader()) {
        finishPreloader();
        return;
      }

      lockScroll();

      const timeoutId = window.setTimeout(finishPreloader, PRELOADER_MAX_MS);

      if (counterRef.current) {
        gsap.set(counterRef.current, { autoAlpha: 0 });
        counterRef.current.textContent = "";
      }

      if (brandRef.current && brandWrapRef.current) {
        splitRef.current = SplitText.create(brandRef.current, { type: "chars" });
        gsap.set(brandWrapRef.current, {
          autoAlpha: 0,
          height: 0,
          overflow: "hidden",
        });
        gsap.set(splitRef.current.chars, { y: 100, opacity: 0 });
      }

      const counter = { value: 0 };
      const split = splitRef.current;

      const tl = gsap.timeline({
        onComplete: finishPreloader,
      });

      if (counterRef.current) {
        tl.set(counterRef.current, { autoAlpha: 1 });
      }

      tl.to(counter, {
        value: 100,
        duration: 0.75,
        ease: EASE.out,
        onUpdate: () => {
          if (!counterRef.current) return;
          counterRef.current.textContent = String(
            Math.round(counter.value),
          ).padStart(3, "0");
        },
      });

      if (split && brandWrapRef.current) {
        tl.set(brandWrapRef.current, { height: "auto", autoAlpha: 1 });
        tl.to(
          split.chars,
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.03,
            ease: EASE.expo,
          },
          "+=0.08",
        );
      }

      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.65,
          ease: "expo.inOut",
        },
        "+=0.1",
      );

      return () => {
        window.clearTimeout(timeoutId);
        if (!completedRef.current) {
          splitRef.current?.revert();
          splitRef.current = null;
          unlockScroll();
        }
      };
    },
    { scope: overlayRef },
  );

  useEffect(() => {
    if (!ready) return;
    onComplete?.();

    const frame = requestAnimationFrame(() => {
      refreshScroll();
    });

    return () => cancelAnimationFrame(frame);
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
              className="invisible font-mono text-5xl font-normal text-gold tabular-nums md:text-6xl"
              aria-hidden="true"
            />

            <div
              ref={brandWrapRef}
              className="invisible mt-6 overflow-hidden md:mt-8"
            >
              <h2
                ref={brandRef}
                className="text-center font-display text-2xl font-bold tracking-[0.1em] text-ivory md:text-4xl"
                aria-hidden="true"
              >
                {BRAND_TEXT}
              </h2>
            </div>
          </div>
        </div>
      )}
      <MotionReadyProvider ready={ready}>
        {children}
      </MotionReadyProvider>
    </>
  );
}
