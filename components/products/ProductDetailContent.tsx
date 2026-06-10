"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageMotion } from "@/components/gsap/PageMotion";
import { ProductImage } from "@/components/ui/ProductImage";
import {
  getProductSampleLink,
  type Product,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

type ProductDetailContentProps = {
  product: Product;
};

function SpecCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-sm border border-border bg-surface p-5",
        highlight && "border-gold/30",
      )}
    >
      <p
        className={cn(
          "font-mono text-xs uppercase text-sage md:text-sm",
          highlight && "text-gold",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "font-heading text-xl font-semibold text-ivory md:text-2xl",
          highlight && "text-gold",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const highlightedSpecs = product.specs.filter((spec) => spec.highlight);
  const standardSpecs = product.specs.filter((spec) => !spec.highlight);

  return (
    <PageMotion>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 md:px-12 md:pt-28">
        <Link
          href="/products"
          className={cn(
            "inline-flex items-center gap-2 font-mono text-[11px] uppercase text-ivory",
            "transition-colors hover:text-gold",
          )}
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} aria-hidden />
          All products
        </Link>
      </div>

      <header data-reveal className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase text-gold">
              {product.number} · Export commodity
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] text-ivory">
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl font-heading text-lg text-sage md:text-xl">
              {product.tagline}
            </p>
            <p className="mt-6 inline-flex rounded-sm border border-gold/30 px-3 py-1.5 font-mono text-[11px] uppercase text-gold">
              {product.grade}
            </p>
          </div>

          <ProductImage
            slug={product.slug}
            className="aspect-[4/3] w-full rounded-sm border border-border"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
      </header>

      <section
        data-reveal
        className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28"
        aria-labelledby="specs-heading"
      >
        <h2
          id="specs-heading"
          className="font-display text-3xl font-bold text-ivory md:text-4xl"
        >
          Export specifications
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-sage">
          Key parameters verified before every shipment leaves our facility.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlightedSpecs.map((spec) => (
            <SpecCard
              key={spec.label}
              label={spec.label}
              value={spec.value}
              highlight
            />
          ))}
          {standardSpecs.map((spec) => (
            <SpecCard key={spec.label} label={spec.label} value={spec.value} />
          ))}
        </div>
      </section>

      <section data-reveal className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold text-ivory md:text-4xl">
              Product overview
            </h2>
            <p className="mt-6 text-base leading-relaxed text-sage md:text-lg">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold text-ivory md:text-4xl">
              Origin & sourcing
            </h2>
            <p className="mt-6 text-base leading-relaxed text-sage md:text-lg">
              {product.originStory}
            </p>
          </div>
        </div>
      </section>

      <section data-reveal className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="rounded-sm border border-border bg-surface p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold text-ivory md:text-4xl">
            Ready to source {product.name.toLowerCase()}?
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-sage">
            Request a sample or send a formal inquiry. We respond within 24 hours
            with availability, pricing, and documentation details.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href={getProductSampleLink(product.name)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-sm px-6",
                "bg-gold font-body text-sm font-medium text-on-gold transition-transform active:scale-[0.98]",
                "hover:bg-gold/90",
              )}
            >
              Request Sample
            </a>
            <Link
              href="/contact"
              className={cn(
                "inline-flex h-11 items-center justify-center rounded-sm border border-border px-6",
                "font-body text-sm font-medium text-ivory transition-colors active:scale-[0.98]",
                "hover:border-gold/40 hover:text-gold",
              )}
            >
              Send Inquiry
            </Link>
          </div>
        </div>
      </section>
    </PageMotion>
  );
}
