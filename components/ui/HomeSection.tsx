import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type HomeSectionTone = "default" | "gold" | "forest" | "sage" | "warm";

type HomeSectionDensity = "default" | "compact";

type HomeSectionProps = {
  id?: string;
  tone?: HomeSectionTone;
  showDivider?: boolean;
  density?: HomeSectionDensity;
  className?: string;
  children: React.ReactNode;
};

const densityClass: Record<HomeSectionDensity, string> = {
  default: "py-24 md:py-32",
  compact: "py-10 md:py-14",
};

const toneClass: Record<HomeSectionTone, string> = {
  default: "",
  gold: "home-tone-gold",
  forest: "home-tone-forest",
  sage: "home-tone-sage",
  warm: "home-tone-warm",
};

export const HomeSection = forwardRef<HTMLElement, HomeSectionProps>(
  function HomeSection(
    {
      id,
      tone = "default",
      showDivider = true,
      density = "default",
      className,
      children,
    },
    ref,
  ) {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative overflow-hidden",
          densityClass[density],
          showDivider && "border-t border-border",
          toneClass[tone],
          className,
        )}
      >
        {tone !== "default" && (
          <div
            className="home-tone-orbs pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="home-tone-orb home-tone-orb-a" />
            <div className="home-tone-orb home-tone-orb-b" />
          </div>
        )}
        <div className="relative z-[1]">{children}</div>
      </section>
    );
  },
);
