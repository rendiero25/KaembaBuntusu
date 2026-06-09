"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  COMPLIANCE_BADGES,
  COMPLIANCE_DISCLAIMER,
  EASE,
  type ComplianceStatus,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

const CHECK_PATH = "M 5 13 L 10 18 L 19 7";

function statusTagClass(status: ComplianceStatus): string {
  switch (status) {
    case "active":
    case "registered":
      return "border-[#7a9e7e]/30 bg-[#7a9e7e]/10 text-[#7a9e7e]";
    case "per-shipment":
      return "border-gold/30 bg-gold/10 text-gold";
  }
}

export function Legality() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const cleanups: (() => void)[] = [];

    const ctx = gsap.context(() => {
      const badges = gsap.utils.toArray<HTMLElement>(
        "[data-legality-badge]",
        grid,
      );

      if (prefersReduced) {
        badges.forEach((badge) => {
          const path = badge.querySelector<SVGPathElement>("[data-check-path]");
          if (path) gsap.set(path, { drawSVG: "100%" });
        });
        return;
      }

      gsap.set(badges, { scale: 0.85, opacity: 0 });

      gsap.to(badges, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: EASE.out,
        stagger: 0.07,
        scrollTrigger: {
          trigger: grid,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      badges.forEach((badge) => {
        const path = badge.querySelector<SVGPathElement>("[data-check-path]");
        if (!path) return;

        gsap.set(path, { drawSVG: "0%" });

        gsap.to(path, {
          drawSVG: "100%",
          duration: 0.55,
          ease: EASE.out,
          scrollTrigger: {
            trigger: badge,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });

        const redrawCheck = () => {
          gsap.fromTo(
            path,
            { drawSVG: "0%" },
            { drawSVG: "100%", duration: 0.35, ease: EASE.out },
          );
        };

        badge.addEventListener("mouseenter", redrawCheck);
        cleanups.push(() =>
          badge.removeEventListener("mouseenter", redrawCheck),
        );
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="legality"
      className="border-t border-border py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
          Legal standing
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ivory">
          Fully licensed.
          <br />
          Export-ready.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-sage md:text-lg">
          For an international buyer, a supplier&apos;s legal standing is not a
          box to tick. It is the foundation of trust.
        </p>

        <div
          ref={gridRef}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {COMPLIANCE_BADGES.map((badge) => (
            <article
              key={badge.title}
              data-legality-badge
              className={cn(
                "flex flex-col border border-border bg-surface p-6",
                "transition-[border-color,box-shadow] duration-300",
                "hover:border-gold/50 hover:shadow-[0_0_0_1px_rgba(200,151,62,0.18)]",
              )}
            >
              <div className="mb-5 flex items-start justify-between gap-4">
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    data-check-path
                    d={CHECK_PATH}
                    fill="none"
                    stroke="#7a9e7e"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span
                  className={cn(
                    "rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]",
                    statusTagClass(badge.status),
                  )}
                >
                  {badge.statusLabel}
                </span>
              </div>

              <h3 className="font-heading text-lg font-semibold tracking-tight text-ivory">
                {badge.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.06em] text-sage">
                {badge.subtitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory/75">
                {badge.description}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-3xl font-mono text-xs leading-relaxed text-sage">
          {COMPLIANCE_DISCLAIMER}
        </p>
      </div>
    </section>
  );
}
