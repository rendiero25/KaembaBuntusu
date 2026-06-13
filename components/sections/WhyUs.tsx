"use client";

import { useSectionReveal } from "@/components/gsap/useSectionReveal";
import { HomeSection } from "@/components/ui/HomeSection";
import { WHY_US_REASONS, type WhyUsIcon } from "@/lib/constants";
import { cn } from "@/lib/utils";

const ICON_STROKE: Record<string, string> = {
  gold: "stroke-gold",
  sage: "stroke-sage",
  red: "stroke-red",
};

function ReasonIcon({
  icon,
  strokeColor = "gold",
}: {
  icon: WhyUsIcon;
  strokeColor?: "gold" | "sage" | "red";
}) {
  const shared = cn(
    "fill-none stroke-[1.5]",
    ICON_STROKE[strokeColor] ?? "stroke-gold",
  );

  if (icon === "farm") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <path className={shared} d="M6 22c4-8 8-10 12-10s8 2 12 10" />
        <path className={shared} d="M16 12V6M12 8l4-4 4 4" />
        <path className={shared} d="M8 24h16" />
      </svg>
    );
  }

  if (icon === "document") {
    return (
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
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
    <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
      <circle className={shared} cx="16" cy="11" r="4" />
      <path className={shared} d="M10 26c0-4 2.5-7 6-7s6 3 6 7" />
      <path className={shared} d="M6 26h20M8 20l4-3M24 20l-4-3" />
    </svg>
  );
}

type CardAccent = {
  top: string;
  icon: string;
  stroke: "gold" | "sage" | "red";
};

const DEFAULT_CARD_ACCENT: CardAccent = {
  top: "border-t-2 border-t-gold",
  icon: "border-gold/25 bg-gold/8 text-gold",
  stroke: "gold",
};

const CARD_ACCENTS: CardAccent[] = [
  DEFAULT_CARD_ACCENT,
  {
    top: "border-t-2 border-t-sage",
    icon: "border-sage/30 bg-sage/8 text-sage",
    stroke: "sage",
  },
  {
    top: "border-t-2 border-t-red",
    icon: "border-red/25 bg-red/8 text-red",
    stroke: "red",
  },
];

export function WhyUs() {
  const sectionRef = useSectionReveal();

  return (
    <HomeSection
      ref={sectionRef}
      id="why-us"
      showDivider={false}
      density="compact"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div data-section-item>
          <p className="text-label text-gold">
            Why Kaemba
          </p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.05] text-ivory">
            Three reasons buyers
            <br />
            keep coming back.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3 md:gap-8">
          {WHY_US_REASONS.map((reason, index) => {
            const accent = CARD_ACCENTS[index] ?? DEFAULT_CARD_ACCENT;
            return (
              <article
                key={reason.number}
                data-section-item
                className={cn(
                  "home-interactive-card flex flex-col rounded-sm p-6 md:p-8",
                  accent.top,
                  index === 1 && "md:-translate-y-3",
                )}
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div
                    className={cn(
                      "rounded-sm border p-2 transition-colors",
                      accent.icon,
                    )}
                  >
                    <ReasonIcon icon={reason.icon} strokeColor={accent.stroke} />
                  </div>
                  <span className="text-label text-gold">
                    {reason.number}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-semibold text-ivory md:text-2xl">
                  {reason.title}
                </h3>

                <p className="mt-4 flex-1 text-body leading-relaxed text-sage">
                  {reason.copy}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </HomeSection>
  );
}
