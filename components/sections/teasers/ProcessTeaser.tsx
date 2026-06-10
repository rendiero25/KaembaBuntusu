"use client";

import { useSectionReveal } from "@/components/gsap/useSectionReveal";
import { HomeSection } from "@/components/ui/HomeSection";
import { ReadMoreLink } from "@/components/ui/ReadMoreLink";
import { HOME_TEASERS } from "@/lib/content";
import { PROCESS_STEPS } from "@/lib/constants";

const HIGHLIGHT_STEPS = PROCESS_STEPS.slice(0, 3);

export function ProcessTeaser() {
  const sectionRef = useSectionReveal();

  return (
    <HomeSection
      ref={sectionRef}
      id="process"
      showDivider={false}
      density="compact"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div data-section-item>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] text-ivory">
            One path. No shortcuts.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-sage">
            {HOME_TEASERS.process}
          </p>
        </div>

        <ol className="relative mt-8 grid gap-6 md:grid-cols-3">
          <div
            className="pointer-events-none absolute top-8 right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block"
            aria-hidden
          />
          {HIGHLIGHT_STEPS.map((step) => (
            <li
              key={step.number}
              data-section-item
              className="home-interactive-card relative rounded-sm p-6 md:p-7"
            >
              <span
                className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-sm border border-gold/30 bg-gold/10 font-mono text-[11px] text-gold"
                aria-hidden
              >
                {step.number}
              </span>
              <h3 className="font-heading text-lg font-semibold text-ivory md:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-sage">
                {step.copy}
              </p>
            </li>
          ))}
        </ol>

        <div data-section-item>
          <ReadMoreLink href="/process" className="mt-10">
            Full export process
          </ReadMoreLink>
        </div>
      </div>
    </HomeSection>
  );
}
