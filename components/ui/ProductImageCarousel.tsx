"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { ProductCarouselImage } from "@/lib/constants";
import { cn } from "@/lib/utils";

type ProductImageCarouselProps = {
  images: readonly ProductCarouselImage[];
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const CAROUSEL_IMAGE_WIDTH = 1200;
const CAROUSEL_IMAGE_HEIGHT = 900;

export function ProductImageCarousel({
  images,
  className,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
}: ProductImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiple = images.length > 1;
  const activeImage = images[activeIndex];

  const goTo = useCallback(
    (index: number) => {
      if (images.length === 0) return;
      const nextIndex = (index + images.length) % images.length;
      setActiveIndex(nextIndex);
    },
    [images.length],
  );

  const goPrev = useCallback(() => {
    goTo(activeIndex - 1);
  }, [activeIndex, goTo]);

  const goNext = useCallback(() => {
    goTo(activeIndex + 1);
  }, [activeIndex, goTo]);

  if (!activeImage) {
    return null;
  }

  return (
    <div
      className={cn(
        "group relative aspect-[4/3] overflow-hidden rounded-sm border border-border bg-surface",
        className,
      )}
    >
      {images.map((image, index) => (
        <div
          key={image.src}
          className={cn(
            "absolute inset-0 overflow-hidden transition-opacity duration-500 ease-out",
            index === activeIndex
              ? "z-[1] opacity-100"
              : "pointer-events-none z-0 opacity-0",
          )}
          aria-hidden={index !== activeIndex}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={CAROUSEL_IMAGE_WIDTH}
            height={CAROUSEL_IMAGE_HEIGHT}
            sizes={sizes}
            priority={priority && index === 0}
            unoptimized
            className="h-full w-full object-cover object-center"
          />
        </div>
      ))}

      {hasMultiple ? (
        <>
          <button
            type="button"
            onClick={goPrev}
            className="absolute top-1/2 left-3 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-bg/80 text-ivory opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:border-gold/40 hover:text-gold focus-visible:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={goNext}
            className="absolute top-1/2 right-3 z-10 inline-flex size-10 -translate-y-1/2 items-center justify-center rounded-sm border border-border bg-bg/80 text-ivory opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:border-gold/40 hover:text-gold focus-visible:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="size-5" aria-hidden />
          </button>

          <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-between gap-4 px-4 pb-4">
            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Product photos"
            >
              {images.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Show image ${index + 1} of ${images.length}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    "h-1.5 rounded-sm transition-all",
                    index === activeIndex
                      ? "w-6 bg-gold"
                      : "w-1.5 bg-ivory/35 hover:bg-ivory/60",
                  )}
                />
              ))}
            </div>
            <p className="font-mono text-label text-ivory/70" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
