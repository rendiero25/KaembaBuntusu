"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {
  getProductSampleLink,
  PRODUCT_GRADIENTS,
  PRODUCTS,
  type Product,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  className?: string;
  variant?: "desktop" | "mobile";
};

function ProductCard({
  product,
  className,
  variant = "desktop",
}: ProductCardProps) {
  return (
    <article
      {...(variant === "desktop"
        ? { "data-product-card": "" }
        : { "data-mobile-product-card": "" })}
      className={cn(
        "flex w-[min(88vw,520px)] shrink-0 flex-col border border-border bg-surface",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-44 w-full rounded-sm sm:h-52",
          PRODUCT_GRADIENTS[product.slug],
        )}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,151,62,0.12),transparent_55%)]" />
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
          {product.number}
        </p>

        <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-ivory md:text-3xl">
          <Link
            href={`/products/${product.slug}`}
            className="transition-colors hover:text-gold"
          >
            {product.name}
          </Link>
        </h3>

        <p className="mt-2 font-heading text-sm text-sage md:text-base">
          {product.tagline}
        </p>

        <p className="mt-4 text-sm leading-relaxed text-ivory/80 md:text-base">
          {product.description}
        </p>

        <dl className="mt-6 space-y-3">
          {product.specs.map((spec) => (
            <div
              key={`${product.slug}-${spec.label}`}
              className={cn(
                "flex items-baseline justify-between gap-4 border-b border-border pb-3 last:border-b-0 last:pb-0",
                spec.highlight && "border-gold/30",
              )}
            >
              <dt
                className={cn(
                  "font-mono text-[11px] uppercase tracking-[0.08em] text-sage",
                  spec.highlight && "text-gold",
                )}
              >
                {spec.label}
              </dt>
              <dd
                className={cn(
                  "text-right font-mono text-xs text-ivory md:text-sm",
                  spec.highlight && "text-gold",
                )}
              >
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
            {product.grade}
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/products/${product.slug}`}
              className={cn(
                "inline-flex h-10 shrink-0 items-center justify-center rounded-sm px-4",
                "font-body text-sm font-medium text-sage transition-colors",
                "hover:text-gold active:scale-[0.98]",
              )}
            >
              Full specs
            </Link>
            <a
              href={getProductSampleLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-10 shrink-0 items-center justify-center rounded-sm border border-border px-4",
                "font-body text-sm font-medium text-ivory transition-colors",
                "hover:border-gold/40 hover:text-gold active:scale-[0.98]",
              )}
            >
              Request Sample
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Products() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const progressFill = progressFillRef.current;
    if (!section || !pin || !track || !progressFill) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const mobileCards = gsap.utils.toArray<HTMLElement>(
        "[data-mobile-product-card]",
        section,
      );

      if (!prefersReduced) {
        mobileCards.forEach((card) => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        });
      }

      mm.add("(min-width: 1024px)", () => {
        if (prefersReduced) return;

        const cards = gsap.utils.toArray<HTMLElement>(
          "[data-product-card]",
          track,
        );

        const getScrollDistance = () =>
          Math.max(track.scrollWidth - pin.offsetWidth, 0);

        const tween = gsap.to(track, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              gsap.set(progressFill, {
                scaleX: self.progress,
              });
            },
          },
        });

        cards.forEach((card) => {
          gsap.from(card, {
            y: 40,
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tween,
              start: "left 90%",
              end: "left 60%",
              scrub: true,
            },
          });
        });
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="products"
      className="py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
          What we export
        </p>
        <h2 className="mt-4 max-w-4xl font-display text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ivory">
          Export-grade commodities,
          <br />
          sourced directly from
          <br />
          Sulawesi&apos;s soil.
        </h2>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-sage md:text-lg">
          Every product we export passes through our quality check before a
          single kilogram leaves the warehouse.
        </p>
      </div>

      <div ref={pinRef} className="relative mt-16 hidden lg:block">
        <div
          ref={trackRef}
          className="flex w-max gap-8 pl-6 will-change-transform md:pl-12 md:gap-10"
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} variant="desktop" />
          ))}
          <div
            className="w-[max(2rem,calc(100vw-33rem))] shrink-0"
            aria-hidden
          />
        </div>

        <div className="mx-auto mt-10 max-w-7xl px-6 md:px-12">
          <div className="h-px bg-border">
            <div
              ref={progressFillRef}
              className="h-full w-full origin-left scale-x-0 bg-gold"
            />
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-8 px-6 md:px-12 lg:hidden">
        {PRODUCTS.map((product) => (
          <ProductCard
            key={`mobile-${product.slug}`}
            product={product}
            variant="mobile"
            className="w-full shrink"
          />
        ))}
      </div>
    </section>
  );
}
