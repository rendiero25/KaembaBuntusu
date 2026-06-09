"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EASE, WHY_US_REASONS, type WhyUsIcon } from "@/lib/constants";
import { cn } from "@/lib/utils";

function ReasonIcon({ icon }: { icon: WhyUsIcon }) {
  const shared = "stroke-gold fill-none stroke-[1.5]";

  if (icon === "farm") {
    return (
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          className={shared}
          d="M6 22c4-8 8-10 12-10s8 2 12 10"
        />
        <path
          className={shared}
          d="M16 12V6M12 8l4-4 4 4"
        />
        <path
          className={shared}
          d="M8 24h16"
        />
      </svg>
    );
  }

  if (icon === "document") {
    return (
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8"
        aria-hidden="true"
      >
        <path
          className={shared}
          d="M9 4h10l6 6v18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"
        />
        <path className={shared} d="M19 4v6h6" />
        <path className={shared} d="M11 16h10M11 20h10M11 24h6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8"
      aria-hidden="true"
    >
      <circle className={shared} cx="16" cy="11" r="4" />
      <path className={shared} d="M10 26c0-4 2.5-7 6-7s6 3 6 7" />
      <path className={shared} d="M6 26h20M8 20l4-3M24 20l-4-3" />
    </svg>
  );
}

export function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const cardEls = gsap.utils.toArray<HTMLElement>(
        "[data-why-card]",
        cards,
      );

      if (!prefersReduced) {
        gsap.set(cardEls, { y: 80, opacity: 0 });

        gsap.to(cardEls, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: EASE.out,
          stagger: 0.15,
          scrollTrigger: {
            trigger: cards,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-us"
      className="border-t border-border py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
          Why Kaemba
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ivory">
          Three reasons buyers
          <br />
          keep coming back.
        </h2>

        <div
          ref={cardsRef}
          className="mt-16 grid gap-6 md:grid-cols-3 md:gap-8"
        >
          {WHY_US_REASONS.map((reason) => (
            <article
              key={reason.number}
              data-why-card
              className={cn(
                "group flex flex-col border border-border bg-surface p-6 md:p-8",
                "transition-[transform,border-color,box-shadow] duration-300 ease-out",
                "hover:-translate-y-1 hover:border-gold/50",
                "hover:shadow-[0_0_0_1px_rgba(200,151,62,0.2)]",
                "active:scale-[0.99]",
              )}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <ReasonIcon icon={reason.icon} />
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
                  {reason.number}
                </span>
              </div>

              <h3 className="font-heading text-xl font-semibold tracking-tight text-ivory md:text-2xl">
                {reason.title}
              </h3>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory/80 md:text-base">
                {reason.copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
