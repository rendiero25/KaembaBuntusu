"use client";

import Link from "next/link";
import { PageMotion } from "@/components/gsap/PageMotion";
import { PageHero } from "@/components/ui/PageHero";
import {
  getProductSampleLink,
  PRODUCTS,
} from "@/lib/constants";
import { PRODUCTS_OVERVIEW } from "@/lib/content";
import { PRODUCTS_IMAGES } from "@/lib/pageImages";
import { ProductImage } from "@/components/ui/ProductImage";

export function ProductsIndexContent() {
  return (
    <PageMotion>
      <PageHero
        label="What we export"
        title="Export-grade commodities, sourced directly from Sulawesi's soil."
        description={PRODUCTS_OVERVIEW.intro}
        image={PRODUCTS_IMAGES.hero}
      />

      <div className="page-section-after-hero mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {PRODUCTS.map((product) => (
            <article
              key={product.slug}
              data-reveal
              className="home-interactive-card group relative flex flex-col rounded-sm"
            >
              <Link
                href={`/products/${product.slug}`}
                className="absolute inset-0 z-[1] rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                aria-label={`View ${product.name} — full specifications`}
              />

              <ProductImage
                slug={product.slug}
                className="relative z-0 h-48 w-full rounded-t-sm"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div className="relative z-0 flex flex-1 flex-col p-6 md:p-8">
                <p className="text-label text-gold">{product.number}</p>
                <h2 className="mt-3 font-heading text-2xl font-semibold text-ivory transition-colors group-hover:text-gold md:text-3xl">
                  {product.name}
                </h2>
                <p className="mt-2 font-heading text-body-responsive text-ivory">
                  {product.tagline}
                </p>
                <p className="mt-4 flex-1 text-body-responsive leading-relaxed text-ivory">
                  {product.description}
                </p>

                <dl className="mt-6 space-y-2 border-t border-border pt-6">
                  {product.specs.slice(0, 3).map((spec) => (
                    <div
                      key={spec.label}
                      className="flex justify-between gap-4"
                    >
                      <dt className="text-label-sm text-sage md:text-label">
                        {spec.label}
                      </dt>
                      <dd className="text-right font-mono text-body-responsive text-ivory">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="relative z-[2] mt-6 flex flex-wrap gap-3">
                  <span
                    className="inline-flex h-10 items-center justify-center rounded-sm bg-gold px-4 text-base font-semibold text-on-gold transition-transform group-hover:bg-gold/90 group-active:scale-[0.98]"
                    aria-hidden="true"
                  >
                    Full specs
                  </span>
                  <a
                    href={getProductSampleLink(product.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-10 items-center justify-center rounded-sm border border-border px-4 text-base font-semibold text-ivory transition-colors hover:border-gold/40 hover:text-gold active:scale-[0.98]"
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
            className="mt-4 max-w-2xl text-body leading-relaxed text-sage"
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
                <h3 className="font-heading text-2xl font-semibold text-ivory">
                  {region.commodity}
                </h3>
                <p className="mt-2 text-label text-gold">
                  {region.region}
                </p>
                <p className="mt-3 text-body-responsive leading-relaxed text-sage">
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
