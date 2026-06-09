"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ABOUT_BODY_PARAGRAPHS, ABOUT_STATS, EASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const VISION_QUOTE =
  "To become a leading export house from Eastern Indonesia, recognized globally for transparency, product quality, and community-driven sourcing.";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      const paragraphs = gsap.utils.toArray<HTMLElement>(
        "[data-about-paragraph]",
        right,
      );

      if (prefersReduced) {
        ABOUT_STATS.forEach((stat, index) => {
          const el = statValueRefs.current[index];
          if (el) el.textContent = `${stat.value}${stat.suffix}`;
        });
        return;
      }

      gsap.set(paragraphs, { clipPath: "inset(0 100% 0 0)", opacity: 0.4 });

      paragraphs.forEach((paragraph) => {
        gsap.to(paragraph, {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 0.9,
          ease: EASE.out,
          scrollTrigger: {
            trigger: paragraph,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        });
      });

      const visionCard = right.querySelector("[data-about-vision]");
      if (visionCard) {
        gsap.from(visionCard, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: {
            trigger: visionCard,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      ABOUT_STATS.forEach((stat, index) => {
        const el = statValueRefs.current[index];
        if (!el) return;

        el.textContent = `0${stat.suffix === "%" ? "" : stat.suffix}`;

        const counter = { value: 0 };
        gsap.to(counter, {
          value: stat.value,
          duration: 1.4,
          ease: EASE.out,
          scrollTrigger: {
            trigger: left,
            start: "top 70%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${stat.suffix}`;
          },
        });
      });
    }, sectionRef);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      if (prefersReduced || !left || !right) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top 72px",
        endTrigger: right,
        end: "bottom bottom",
        pin: left,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    });

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="px-6 py-24 md:px-12 md:py-32 lg:py-40"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 xl:gap-24">
        <div ref={leftRef} className="lg:min-h-[50vh] lg:pt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
            About the company
          </p>

          <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ivory">
            We are the bridge.
          </h2>

          <p className="mt-4 font-heading text-lg font-semibold leading-snug text-sage md:text-xl">
            Between Sulawesi&apos;s extraordinary land and the world&apos;s
            growing demand.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-border pt-8 md:gap-6">
            {ABOUT_STATS.map((stat, index) => (
              <div key={stat.sublabel} className="min-w-0">
                <span
                  ref={(node) => {
                    statValueRefs.current[index] = node;
                  }}
                  className="block font-mono text-3xl tabular-nums text-ivory md:text-4xl"
                >
                  0{stat.suffix}
                </span>
                <span className="mt-2 block font-mono text-[11px] uppercase tracking-[0.08em] text-sage">
                  {stat.label}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.08em] text-ivory/50">
                  {stat.sublabel}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div ref={rightRef} className="flex flex-col gap-6 lg:gap-8">
          {ABOUT_BODY_PARAGRAPHS.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              data-about-paragraph
              className={cn(
                "text-base leading-relaxed text-ivory/80 md:text-[17px]",
                paragraph === "We exist to change that." &&
                  "font-medium text-ivory",
              )}
            >
              {paragraph}
            </p>
          ))}

          <blockquote
            data-about-vision
            className="mt-4 border-l-2 border-gold bg-surface px-6 py-6 md:px-8 md:py-8"
          >
            <p className="font-body text-base italic leading-relaxed text-ivory/90 md:text-[17px]">
              &ldquo;{VISION_QUOTE}&rdquo;
            </p>
            <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.08em] text-sage">
              Our founding vision
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
