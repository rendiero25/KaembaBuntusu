"use client";

import { PageMotion } from "@/components/gsap/PageMotion";
import { PageHeader } from "@/components/ui/PageHeader";
import { LEGALITY_EXTENDED } from "@/lib/content";
import {
  COMPLIANCE_BADGES,
  COMPLIANCE_DISCLAIMER,
  type ComplianceStatus,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

function statusTagClass(_status: ComplianceStatus): string {
  return "border-gold/30 bg-gold/10 text-gold";
}

export function LegalityPageContent() {
  return (
    <PageMotion>
      <PageHeader
        label="Legal standing"
        title="Fully licensed. Export-ready."
        description={LEGALITY_EXTENDED.intro}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COMPLIANCE_BADGES.map((badge) => (
            <article
              key={badge.title}
              data-reveal
              className="flex flex-col border border-border bg-surface p-6"
            >
              <div className="mb-4 flex items-start justify-between gap-4">
                <span className="font-heading text-lg font-semibold text-ivory">
                  {badge.title}
                </span>
                <span
                  className={cn(
                    "shrink-0 rounded-sm border px-2 py-0.5 font-mono text-[10px] uppercase",
                    statusTagClass(badge.status),
                  )}
                >
                  {badge.statusLabel}
                </span>
              </div>
              <p className="font-mono text-[11px] uppercase text-sage">
                {badge.subtitle}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-sage">
                {badge.description}
              </p>
            </article>
          ))}
        </div>

        <section
          className="mt-16 grid gap-10 border-t border-border pt-16 lg:grid-cols-2"
          aria-labelledby="verification-heading"
        >
          <div data-reveal>
            <h2
              id="verification-heading"
              className="font-display text-2xl font-bold text-ivory md:text-3xl"
            >
              Buyer verification
            </h2>
            <p className="mt-4 text-base leading-relaxed text-sage">
              {LEGALITY_EXTENDED.buyerVerification}
            </p>
          </div>
          <div data-reveal>
            <h2 className="font-display text-2xl font-bold text-ivory md:text-3xl">
              Per-shipment documentation
            </h2>
            <ul className="mt-4 space-y-3">
              {LEGALITY_EXTENDED.perShipmentDocs.map((doc) => (
                <li
                  key={doc}
                  className="flex gap-3 text-sm leading-relaxed text-sage md:text-base"
                >
                  <span className="mt-2 size-1.5 shrink-0 rounded-sm bg-gold" />
                  {doc}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <p
          data-reveal
          className="mt-12 max-w-3xl font-mono text-xs leading-relaxed text-sage"
        >
          {COMPLIANCE_DISCLAIMER}
        </p>
      </div>
    </PageMotion>
  );
}
