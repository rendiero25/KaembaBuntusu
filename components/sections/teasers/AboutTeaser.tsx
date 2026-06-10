"use client";

import { useSectionReveal } from "@/components/gsap/useSectionReveal";
import { HomeSection } from "@/components/ui/HomeSection";
import { ReadMoreLink } from "@/components/ui/ReadMoreLink";
import { HOME_TEASERS } from "@/lib/content";
import { ABOUT_STATS } from "@/lib/constants";

export function AboutTeaser() {
  const sectionRef = useSectionReveal();

  return (
    <HomeSection ref={sectionRef} id="about" density="compact">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div data-section-item>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] text-ivory">
              We are the bridge.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-sage md:text-lg">
              {HOME_TEASERS.about}
            </p>
            <ReadMoreLink href="/about" className="mt-8">
              About the company
            </ReadMoreLink>
          </div>

          <div
            data-section-item
            className="home-interactive-card rounded-sm border-t-2 border-t-gold p-6 md:p-8"
          >
            <p className="font-mono text-[11px] uppercase text-gold">
              At a glance
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {ABOUT_STATS.map((stat) => (
                <div key={stat.sublabel} className="group/stat">
                  <span className="block font-mono text-3xl tabular-nums text-ivory transition-colors group-hover/stat:text-gold md:text-4xl">
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span className="mt-1 block font-mono text-[10px] uppercase text-sage">
                    {stat.sublabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </HomeSection>
  );
}
