"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { TICKER_ITEMS, TICKER_LOOP_DURATION } from "@/lib/constants";

function TickerStrip() {
  return (
    <div className="flex shrink-0 items-center gap-8 px-8 md:gap-10 md:px-10">
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="inline-flex items-center gap-8 md:gap-10">
          <span className="text-gold" aria-hidden="true">
            ·
          </span>
          <span className="whitespace-nowrap text-label uppercase text-ivory">
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

  useGSAP(
    () => {
      const track = trackRef.current;
      const loop = loopRef.current;
      if (!track || !loop) return;

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

      startTween();

      const handleResize = () => startTween();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        tween?.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="ticker"
      aria-label="Commodity highlights"
      className="ticker-band overflow-hidden border-y border-border py-5 md:py-6"
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
