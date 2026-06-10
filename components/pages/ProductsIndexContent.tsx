"use client";

import Link from "next/link";
import { PageMotion } from "@/components/gsap/PageMotion";
import {
  getProductSampleLink,
  PRODUCTS,
} from "@/lib/constants";
import { PRODUCTS_OVERVIEW } from "@/lib/content";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProductImage } from "@/components/ui/ProductImage";
import { cn } from "@/lib/utils";

export function ProductsIndexContent() {
  return (
    <PageMotion>
      <PageHeader
        label="What we export"
        title="Export-grade commodities, sourced directly from Sulawesi's soil."
        description={PRODUCTS_OVERVIEW.intro}
      />

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-8 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <article
              key={product.slug}
              data-reveal
              className="home-interactive-card group flex flex-col rounded-sm"
            >
              <ProductImage
                slug={product.slug}
                className="h-48 w-full rounded-t-sm"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="flex flex-1 flex-col p-6 md:p-8">
                <p className="font-mono text-[11px] uppercase text-gold">
                  {product.number}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-semibold text-ivory md:text-3xl">
                  <Link
                    href={`/products/${product.slug}`}
                    className="transition-colors hover:text-gold"
                  >
                    {product.name}
                  </Link>
                </h2>
                <p className="mt-2 font-heading text-sm text-ivory md:text-base">
                  {product.tagline}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ivory md:text-base">
                  {product.description}
                </p>

                <dl className="mt-6 space-y-2 border-t border-border pt-6">
                  {product.specs.slice(0, 3).map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-4"
                    >
                      <dt className="font-mono text-xs uppercase text-sage md:text-sm">
                        {spec.label}
                      </dt>
                      <dd className="text-right font-mono text-sm text-ivory md:text-base">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/products/${product.slug}`}
                    className="inline-flex h-10 items-center justify-center rounded-sm bg-gold px-4 text-sm font-medium text-on-gold transition-transform hover:bg-gold/90 active:scale-[0.98]"
                  >
                    Full specs
                  </Link>
                  <a
                    href={getProductSampleLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-sm border border-border px-4 text-sm font-medium text-ivory transition-colors hover:border-gold/40 hover:text-gold active:scale-[0.98]"
                  >
                    Request Sample
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section
          className="mt-20 border-t border-border pt-16"
          aria-labelledby="quality-heading"
        >
          <h2
            id="quality-heading"
            data-reveal
            className="font-display text-3xl font-bold text-ivory md:text-4xl"
          >
            {PRODUCTS_OVERVIEW.qualityHeadline}
          </h2>
          <p
            data-reveal
            className="mt-4 max-w-2xl text-base leading-relaxed text-sage md:text-lg"
          >
            {PRODUCTS_OVERVIEW.qualityCopy}
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {PRODUCTS_OVERVIEW.sourcingRegions.map((region) => (
              <div
                key={region.commodity}
                data-reveal
                className="home-interactive-card rounded-sm p-6"
              >
                <h3 className="font-heading text-lg font-semibold text-ivory">
                  {region.commodity}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase text-gold">
                  {region.region}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-sage">
                  {region.note}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageMotion>
  );
}
