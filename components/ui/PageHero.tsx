import { ContentImage } from "@/components/ui/ContentImage";
import type { PageImage } from "@/lib/pageImages";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  label?: string;
  title: string;
  description?: string;
  image: PageImage;
  className?: string;
  priorityImage?: boolean;
};

export function PageHero({
  label,
  title,
  description,
  image,
  className,
  priorityImage = true,
}: PageHeroProps) {
  return (
    <header
      className={cn(
        "home-tone-gold border-b border-border bg-surface/40 px-6 pt-24 pb-12 md:px-12 md:pt-28 md:pb-16",
        className,
      )}
    >
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
        <div>
          {label ? (
            <p
              data-reveal
              className="font-mono text-[11px] uppercase text-gold"
            >
              {label}
            </p>
          ) : null}
          <h1
            data-reveal
            className={cn(
              "font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold leading-[1.05] text-ivory",
              label && "mt-4",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p
              data-reveal
              className="mt-6 max-w-3xl text-base leading-relaxed text-sage md:text-lg"
            >
              {description}
            </p>
          ) : null}
        </div>

        <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-border">
          <ContentImage
            image={image}
            className="h-full w-full"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority={priorityImage}
          />
        </div>
      </div>
    </header>
  );
}
