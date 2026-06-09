"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { EASE } from "@/lib/constants";

type HeroProps = {
  ready?: boolean;
};

export function Hero({ ready = false }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready || !sectionRef.current) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const targets = sectionRef.current?.querySelectorAll("[data-hero-reveal]");
      if (!targets?.length) return;

      gsap.from(targets, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: EASE.expo,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="flex min-h-dvh items-center justify-center px-6 pt-16 md:px-12 md:pt-[72px]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p
          data-hero-reveal
          className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold"
        >
          Makassar · South Sulawesi · Est. January 2026
        </p>
        <h1
          data-hero-reveal
          className="mt-6 font-display text-4xl font-bold tracking-tight text-ivory md:text-5xl lg:text-6xl"
        >
          Connecting Sulawesi&apos;s finest resources to the global market.
        </h1>
        <p
          data-hero-reveal
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-sage"
        >
          We export premium agricultural commodities directly from South
          Sulawesi to international buyers.
        </p>
      </div>
    </section>
  );
}
