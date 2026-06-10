"use client";

import Link from "next/link";
import { useSectionReveal } from "@/components/gsap/useSectionReveal";
import { HomeSection } from "@/components/ui/HomeSection";
import { ReadMoreLink } from "@/components/ui/ReadMoreLink";
import { HOME_TEASERS } from "@/lib/content";
import { WA_LINK } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ContactTeaser() {
  const sectionRef = useSectionReveal();

  return (
    <HomeSection ref={sectionRef} id="contact" tone="gold">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div
          data-section-item
          className="home-interactive-card contact-cta-card relative overflow-hidden rounded-sm border-gold/25 p-8 md:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12"
        >
          <div
            className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gold/15 blur-3xl"
            aria-hidden
          />
          <div className="relative max-w-xl">
            <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold leading-[1.05] text-ivory">
              Ready to source from Sulawesi?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sage">
              {HOME_TEASERS.contact}
            </p>
          </div>

          <div className="relative mt-8 flex flex-col gap-4 sm:flex-row lg:mt-0 lg:shrink-0">
            <Link
              href="/contact"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-sm bg-gold px-6",
                "text-sm font-medium text-on-gold transition-transform hover:bg-gold/90 active:scale-[0.98]",
              )}
            >
              Send Inquiry
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-sm border border-border px-6",
                "text-sm font-medium text-ivory transition-colors hover:border-gold/40 hover:text-gold active:scale-[0.98]",
              )}
            >
              WhatsApp Us
            </a>
          </div>
        </div>

        <div data-section-item>
          <ReadMoreLink href="/contact" className="mt-8">
            Contact details and FAQ
          </ReadMoreLink>
        </div>
      </div>
    </HomeSection>
  );
}
