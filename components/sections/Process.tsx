"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { EASE, PROCESS_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const STEP_COUNT = PROCESS_STEPS.length;
const PATH_HEIGHT = 520;
const STEP_GAP = PATH_HEIGHT / STEP_COUNT;

function buildTimelinePath(): string {
  const segments: string[] = ["M 16 0"];
  for (let i = 0; i < STEP_COUNT; i += 1) {
    const y = Math.round((i + 0.5) * STEP_GAP);
    segments.push(`L 16 ${y}`);
    if (i < STEP_COUNT - 1) {
      const nextY = Math.round((i + 1.5) * STEP_GAP);
      segments.push(`L 16 ${nextY}`);
    }
  }
  return segments.join(" ");
}

const TIMELINE_PATH = buildTimelinePath();

function ProcessStepContent({
  step,
  align,
}: {
  step: (typeof PROCESS_STEPS)[number];
  align: "left" | "right";
}) {
  return (
    <div
      data-process-step
      className={cn(align === "right" && "lg:text-right")}
    >
      <h3 className="font-heading text-2xl font-semibold text-ivory md:text-xl">
        {step.title}
      </h3>
      <p className="mt-2 text-body-responsive leading-relaxed text-sage">
        {step.copy}
      </p>
    </div>
  );
}

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    const path = pathRef.current;
    if (!section || !timeline || !path) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      mm.add("(min-width: 1024px)", () => {
        const stepEls = gsap.utils.toArray<HTMLElement>(
          "[data-process-step]",
          timeline,
        );
        const nodeEls = gsap.utils.toArray<HTMLElement>(
          "[data-process-node]",
          timeline,
        );

        if (prefersReduced) {
          gsap.set(stepEls, { opacity: 1, y: 0 });
          gsap.set(path, { drawSVG: "100%" });
          return;
        }

        gsap.set(stepEls, { opacity: 0, y: 30 });
        gsap.set(path, { drawSVG: "0%" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: timeline,
            start: "top 75%",
            end: "bottom 25%",
            scrub: true,
          },
        });

        const segmentDuration = 1 / STEP_COUNT;

        PROCESS_STEPS.forEach((_, index) => {
          const drawStart = (index / STEP_COUNT) * 100;
          const drawEnd = ((index + 1) / STEP_COUNT) * 100;
          const stepEl = stepEls[index];
          const nodeEl = nodeEls[index];
          if (!stepEl || !nodeEl) return;

          tl.fromTo(
            path,
            { drawSVG: `${drawStart}%` },
            { drawSVG: `${drawEnd}%`, duration: segmentDuration, ease: "none" },
            index === 0 ? 0 : ">",
          );

          tl.to(
            stepEl,
            {
              opacity: 1,
              y: 0,
              duration: segmentDuration * 0.6,
              ease: EASE.out,
            },
            "<40%",
          );

          tl.fromTo(
            nodeEl,
            { scale: 1 },
            {
              scale: 1.1,
              duration: segmentDuration * 0.3,
              ease: EASE.out,
              yoyo: true,
              repeat: 1,
            },
            "<",
          );
        });
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="border-t border-border py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-label text-gold">
          How we work
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.05] text-ivory">
          Every shipment follows
          <br />
          one uncompromising path.
        </h2>
        <p className="mt-6 max-w-2xl text-body leading-relaxed text-sage">
          From farm gate to your warehouse door. Here is exactly how we
          operate.
        </p>

        <div className="mt-16 lg:hidden">
          <ol className="relative space-y-10 border-l border-border pl-8">
            {PROCESS_STEPS.map((step) => (
              <li key={step.number} className="relative">
                <span
                  className="absolute -left-[2.125rem] top-0 flex h-7 w-7 items-center justify-center rounded-sm border border-gold text-label-sm text-gold"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <ProcessStepContent step={step} align="left" />
              </li>
            ))}
          </ol>
        </div>

        <div
          ref={timelineRef}
          className="relative mx-auto mt-16 hidden max-w-4xl lg:block"
        >
          <svg
            viewBox={`0 0 32 ${PATH_HEIGHT}`}
            className="pointer-events-none absolute bottom-0 left-1/2 top-0 w-8 -translate-x-1/2"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d={TIMELINE_PATH}
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="1"
            />
            <path
              ref={pathRef}
              d={TIMELINE_PATH}
              fill="none"
              stroke="var(--color-gold)"
              strokeWidth="1.5"
            />
          </svg>

          <ol className="relative space-y-0">
            {PROCESS_STEPS.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <li
                  key={step.number}
                  className={cn(
                    "relative grid min-h-[5.5rem] grid-cols-[1fr_3rem_1fr] items-center gap-6",
                    index < STEP_COUNT - 1 && "pb-14",
                  )}
                >
                  <div
                    className={cn(
                      "col-start-1",
                      !isLeft && "pointer-events-none select-none opacity-0",
                    )}
                  >
                    {isLeft && (
                      <ProcessStepContent step={step} align="right" />
                    )}
                  </div>

                  <div className="col-start-2 flex justify-center">
                    <span
                      data-process-node
                      className="relative z-10 flex h-12 w-12 items-center justify-center rounded-sm border border-gold bg-bg text-label text-gold"
                    >
                      {step.number}
                    </span>
                  </div>

                  <div
                    className={cn(
                      "col-start-3",
                      isLeft && "pointer-events-none select-none opacity-0",
                    )}
                  >
                    {!isLeft && (
                      <ProcessStepContent step={step} align="left" />
                    )}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
