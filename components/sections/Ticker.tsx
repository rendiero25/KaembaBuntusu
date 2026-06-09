"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { TICKER_ITEMS, TICKER_LOOP_DURATION } from "@/lib/constants";

function TickerStrip() {
  return (
    <div className="flex shrink-0 items-center gap-6 px-6 md:gap-8 md:px-8">
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="inline-flex items-center gap-6 md:gap-8">
          <span className="text-gold" aria-hidden="true">
            ·
          </span>
          <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-ivory/30">
            {item}
          </span>
        </span>
      ))}
      <span className="text-gold" aria-hidden="true">
        ·
      </span>
    </div>
  );
}

export function Ticker() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const loop = loopRef.current;
    if (!section || !track || !loop) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let tween: gsap.core.Tween | null = null;

    const startTween = () => {
      tween?.kill();
      gsap.set(track, { x: 0 });
      tween = gsap.to(track, {
        x: -loop.offsetWidth,
        duration: TICKER_LOOP_DURATION,
        ease: "none",
        repeat: -1,
      });
    };

    const handleEnter = () => {
      tween?.timeScale(-1);
    };

    const handleLeave = () => {
      tween?.timeScale(1);
    };

    const handleResize = () => {
      startTween();
    };

    const ctx = gsap.context(() => {
      startTween();
    }, sectionRef);

    section.addEventListener("mouseenter", handleEnter);
    section.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      section.removeEventListener("mouseenter", handleEnter);
      section.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", handleResize);
      tween?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="ticker"
      aria-label="Commodity highlights"
      className="overflow-hidden border-y border-border py-4 md:py-5"
    >
      <div className="relative">
        <div ref={trackRef} className="flex w-max will-change-transform">
          <div ref={loopRef}>
            <TickerStrip />
          </div>
          <div aria-hidden="true">
            <TickerStrip />
          </div>
        </div>
      </div>

      <p className="sr-only">{TICKER_ITEMS.join(", ")}</p>
    </section>
  );
}
