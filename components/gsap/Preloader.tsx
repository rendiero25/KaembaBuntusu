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

const BRAND_TEXT = "KAEMBA BUNTUSU";

function shouldSkipPreloader(): boolean {
  if (typeof window === "undefined") return false;

  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if (prefersReduced) return true;

  return localStorage.getItem("kaemba-preloader-complete") === "1";
}

export function Preloader({ children, onComplete }: PreloaderProps) {
  const [ready, setReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const brandWrapRef = useRef<HTMLDivElement>(null);
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

      if (counterRef.current) {
        gsap.set(counterRef.current, { autoAlpha: 0 });
        counterRef.current.textContent = "";
      }

      if (brandRef.current && brandWrapRef.current) {
        split = SplitText.create(brandRef.current, { type: "chars" });
        gsap.set(brandWrapRef.current, {
          autoAlpha: 0,
          height: 0,
          overflow: "hidden",
        });
        gsap.set(split.chars, { y: 100, opacity: 0 });
      }

      const tl = gsap.timeline({
        onComplete: () => {
          localStorage.setItem("kaemba-preloader-complete", "1");
          unlockScroll();
          refreshScroll();
          setReady(true);
        },
      });

      if (counterRef.current) {
        tl.set(counterRef.current, { autoAlpha: 1 });
      }

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

      if (split && brandWrapRef.current) {
        tl.set(brandWrapRef.current, { height: "auto", autoAlpha: 1 });
        tl.to(
          split.chars,
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.04,
            ease: EASE.expo,
          },
          "+=0.12",
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
      <div className={cn(!ready && "invisible")} aria-hidden={!ready}>
        {children}
      </div>
    </>
  );
}
