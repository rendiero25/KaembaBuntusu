"use client";

import Link from "next/link";
import { useSectionReveal } from "@/components/gsap/useSectionReveal";
import { HomeSection } from "@/components/ui/HomeSection";
import { ProductImage } from "@/components/ui/ProductImage";
import { ReadMoreLink } from "@/components/ui/ReadMoreLink";
import { PRODUCTS } from "@/lib/constants";

export function ProductsTeaser() {
  const sectionRef = useSectionReveal();

  return (
    <HomeSection ref={sectionRef} id="products" tone="gold">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div data-section-item>
          <h2 className="max-w-3xl font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] text-ivory">
            Coconut, copra, cloves, and pepper from Sulawesi.
          </h2>
          <p className="mt-4 max-w-xl text-body leading-relaxed text-sage">
            Graded to buyer specification. Moisture and purity checked before
            dispatch from Makassar port.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PRODUCTS.map((product) => (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              data-section-item
              className="home-interactive-card group flex flex-col rounded-sm"
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-t-sm">
                <ProductImage
                  slug={product.slug}
                  className="h-full w-full"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                <span className="absolute bottom-3 left-4 z-[1] text-label text-gold">
                  {product.number}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                <h3 className="font-heading text-2xl font-semibold text-ivory transition-colors group-hover:text-gold md:text-xl">
                  {product.name}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-body-responsive leading-relaxed text-sage">
                  {product.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-label-sm text-gold/80 transition-colors group-hover:text-gold">
                  View specs
                  <span
                    className="inline-block transition-transform group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div data-section-item>
          <ReadMoreLink href="/products" className="mt-10">
            View all products
          </ReadMoreLink>
        </div>
      </div>
    </HomeSection>
  );
}
