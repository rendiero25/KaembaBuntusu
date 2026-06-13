"use client";

import { PageMotion } from "@/components/gsap/PageMotion";
import { ContentImage } from "@/components/ui/ContentImage";
import { PageHero } from "@/components/ui/PageHero";
import {
  ABOUT_EXTENDED,
  COMPANY_VALUES,
  MARKET_REACH,
} from "@/lib/content";
import { ABOUT_STATS } from "@/lib/constants";
import { ABOUT_IMAGES } from "@/lib/pageImages";

export function AboutPageContent() {
  return (
    <PageMotion>
      <PageHero
        label="About the company"
        title="We are the bridge."
        description="Between Sulawesi's extraordinary land and the world's growing demand for export-grade agricultural commodities."
        image={ABOUT_IMAGES.hero}
      />

      <div className="page-section-after-hero mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24">
        <p
          data-reveal
          className="max-w-3xl text-xl font-semibold leading-relaxed text-ivory md:text-2xl"
        >
          {ABOUT_EXTENDED.intro}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
          <div className="grid gap-8">
            {ABOUT_EXTENDED.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 40)}
                data-reveal
                className="text-body leading-relaxed text-sage"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden rounded-sm border border-border lg:sticky lg:top-28">
            <ContentImage
              image={ABOUT_IMAGES.origin}
              className="h-full w-full"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
          </div>
        </div>

        <div
          data-reveal
          className="mt-16 grid gap-6 border-t border-border pt-16 md:grid-cols-2"
        >
          <blockquote className="border-l-2 border-gold bg-surface px-6 py-8 md:px-8">
            <p className="text-label text-gold">
              Our vision
            </p>
            <p className="mt-4 text-body italic leading-relaxed text-ivory">
              &ldquo;{ABOUT_EXTENDED.vision}&rdquo;
            </p>
          </blockquote>
          <div className="border border-border bg-surface px-6 py-8 md:px-8">
            <p className="text-label text-gold">
              Our mission
            </p>
            <p className="mt-4 text-body leading-relaxed text-sage">
              {ABOUT_EXTENDED.mission}
            </p>
          </div>
        </div>

        <div
          data-reveal
          className="mt-16 grid grid-cols-3 gap-6 border-y border-border py-12"
        >
          {ABOUT_STATS.map((stat) => (
            <div key={stat.sublabel}>
              <span className="block font-mono text-4xl tabular-nums text-ivory md:text-5xl">
                {stat.value}
                {stat.suffix}
              </span>
              <span className="mt-2 block text-label text-sage">
                {stat.label}
              </span>
              <span className="mt-0.5 block text-label text-sage">
                {stat.sublabel}
              </span>
            </div>
          ))}
        </div>

        <section className="mt-16" aria-labelledby="values-heading">
          <h2
            id="values-heading"
            data-reveal
            className="font-display text-3xl font-bold text-ivory md:text-4xl"
          >
            What we stand for
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {COMPANY_VALUES.map((value) => (
              <div
                key={value.title}
                data-reveal
                className="border border-border bg-surface p-6 md:p-8"
              >
                <h3 className="font-heading text-2xl font-semibold text-ivory">
                  {value.title}
                </h3>
                <p className="mt-4 text-body-responsive leading-relaxed text-sage">
                  {value.copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20" aria-labelledby="markets-heading">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2
                id="markets-heading"
                data-reveal
                className="font-display text-3xl font-bold text-ivory md:text-4xl"
              >
                {MARKET_REACH.headline}
              </h2>
              <p
                data-reveal
                className="mt-4 max-w-2xl text-body leading-relaxed text-sage"
              >
                {MARKET_REACH.copy}
              </p>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-sm border border-border">
              <ContentImage
                image={ABOUT_IMAGES.makassarHub}
                className="h-full w-full"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {MARKET_REACH.regions.map((region) => (
              <div
                key={region.name}
                data-reveal
                className="border border-border bg-surface p-6"
              >
                <h3 className="font-heading text-2xl font-semibold text-ivory">
                  {region.name}
                </h3>
                <p className="mt-3 text-label-sm text-sage md:text-label">
                  {region.markets}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageMotion>
  );
}
