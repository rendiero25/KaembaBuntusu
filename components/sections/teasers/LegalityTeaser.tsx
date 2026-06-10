"use client";

import { Check } from "lucide-react";
import { useSectionReveal } from "@/components/gsap/useSectionReveal";
import { HomeSection } from "@/components/ui/HomeSection";
import { ReadMoreLink } from "@/components/ui/ReadMoreLink";
import { HOME_TEASERS } from "@/lib/content";
import { COMPLIANCE_BADGES } from "@/lib/constants";

const HIGHLIGHT_BADGES = COMPLIANCE_BADGES.slice(0, 3);

export function LegalityTeaser() {
  const sectionRef = useSectionReveal();

  return (
    <HomeSection
      ref={sectionRef}
      id="legality"
      showDivider={false}
      density="compact"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div data-section-item>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] text-ivory">
            Fully licensed. Export-ready.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-sage">
            {HOME_TEASERS.legality}
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {HIGHLIGHT_BADGES.map((badge) => (
            <div
              key={badge.title}
              data-section-item
              className="home-interactive-card group rounded-sm p-6 md:p-7"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-gold/45 bg-gold/15 text-gold transition-colors group-hover:border-gold group-hover:bg-gold/25">
                <Check className="size-5" strokeWidth={2.5} aria-hidden />
              </div>
              <h3 className="font-heading text-lg font-semibold text-ivory">
                {badge.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase text-sage">
                {badge.subtitle}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-sage">
                {badge.description}
              </p>
            </div>
          ))}
        </div>

        <div data-section-item>
          <ReadMoreLink href="/legality" className="mt-10">
            Legal standing and compliance
          </ReadMoreLink>
        </div>
      </div>
    </HomeSection>
  );
}
