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
        "page-hero relative flex min-h-[min(72vh,44rem)] w-full items-end overflow-hidden",
        className,
      )}
    >
      <div className="page-hero__media absolute inset-0" aria-hidden="true">
        <ContentImage
          image={image}
          className="h-full w-full"
          imageClassName="page-hero__image"
          sizes="100vw"
          priority={priorityImage}
        />
      </div>

      <div className="page-hero__overlay pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 w-full px-6 pt-28 pb-16 md:px-12 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-7xl">
          {label ? (
            <p data-reveal className="text-label text-gold">
              {label}
            </p>
          ) : null}
          <h1
            data-reveal
            className={cn(
              "max-w-4xl font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] text-ivory",
              label && "mt-4",
            )}
          >
            {title}
          </h1>
          {description ? (
            <p
              data-reveal
              className="mt-6 max-w-3xl text-body leading-relaxed text-ivory/80"
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </header>
  );
}
