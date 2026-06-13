"use client";

import Link from "next/link";
import { PageMotion } from "@/components/gsap/PageMotion";

type NotFoundContentProps = {
  code?: string;
  title?: string;
  description?: string;
  primaryHref?: string;
  primaryLabel?: string;
};

export function NotFoundContent({
  code = "404",
  title = "Page not found.",
  description = "The URL you entered does not match any page on this site. Return to the homepage or contact us if you need export information.",
  primaryHref = "/",
  primaryLabel = "Back to Home",
}: NotFoundContentProps) {
  return (
    <PageMotion className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center md:px-12">
      <p
        data-reveal
        className="text-label text-gold"
      >
        {code}
      </p>
      <h1
        data-reveal
        className="mt-4 font-display text-4xl font-bold text-ivory md:text-6xl"
      >
        {title}
      </h1>
      <p
        data-reveal
        className="mt-4 max-w-md text-body leading-relaxed text-sage"
      >
        {description}
      </p>
      <div
        data-reveal
        className="mt-8 flex flex-col gap-4 sm:flex-row"
      >
        <Link
          href={primaryHref}
          className="inline-flex h-11 items-center justify-center rounded-sm bg-gold px-6 text-base font-semibold text-on-gold transition-transform hover:bg-gold/90 active:scale-[0.98]"
        >
          {primaryLabel}
        </Link>
        <Link
          href="/contact"
          className="inline-flex h-11 items-center justify-center rounded-sm border border-border px-6 text-base font-semibold text-ivory transition-colors hover:border-gold/40 hover:text-gold active:scale-[0.98]"
        >
          Contact Us
        </Link>
      </div>
    </PageMotion>
  );
}
