"use client";

import { PageMotion } from "@/components/gsap/PageMotion";
import { PageHero } from "@/components/ui/PageHero";
import {
  PROCESS_EXTENDED_INTRO,
  PROCESS_STEP_DETAILS,
  QA_COMMITMENTS,
} from "@/lib/content";
import { PROCESS_IMAGES } from "@/lib/pageImages";

export function ProcessPageContent() {
  return (
    <PageMotion>
      <PageHero
        label="How we work"
        title={PROCESS_EXTENDED_INTRO.headline}
        description={PROCESS_EXTENDED_INTRO.copy}
        image={PROCESS_IMAGES.hero}
      />

      <div className="page-section-after-hero mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24">
        <ol className="space-y-12 md:space-y-16">
          {PROCESS_STEP_DETAILS.map((step) => (
            <li
              key={step.number}
              className="grid gap-6 border-b border-border pb-12 last:border-b-0 md:grid-cols-[5rem_1fr] md:gap-10"
            >
              <span
                data-reveal
                className="font-mono text-3xl text-gold md:text-4xl"
              >
                {step.number}
              </span>
              <div>
                <div data-reveal>
                  <h2 className="font-heading text-2xl font-semibold text-ivory md:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-body leading-relaxed text-sage">
                    {step.summary}
                  </p>
                </div>
                <ul className="mt-6 space-y-3" data-reveal>
                  {step.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex gap-3 text-body-responsive leading-relaxed text-sage"
                    >
                      <span className="mt-2 size-1.5 shrink-0 rounded-sm bg-gold" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        <section
          className="mt-20 border-t border-border pt-16"
          aria-labelledby="qa-heading"
        >
          <h2
            id="qa-heading"
            data-reveal
            className="font-display text-3xl font-bold text-ivory md:text-4xl"
          >
            Quality assurance commitments
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {QA_COMMITMENTS.map((item) => (
              <div
                key={item.title}
                data-reveal
                className="border border-border bg-surface p-6 md:p-8"
              >
                <h3 className="font-heading text-2xl font-semibold text-ivory md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-body-responsive leading-relaxed text-sage">
                  {item.copy}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageMotion>
  );
}
