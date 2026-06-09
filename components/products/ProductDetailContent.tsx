import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getProductSampleLink,
  PRODUCT_GRADIENTS,
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
          "font-mono text-[11px] uppercase tracking-[0.08em] text-sage",
          highlight && "text-gold",
        )}
      >
        {label}
      </p>
      <p
        className={cn(
          "font-heading text-lg font-semibold tracking-tight text-ivory md:text-xl",
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
    <article>
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 md:px-12 md:pt-28">
        <Link
          href="/#products"
          className={cn(
            "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-sage",
            "transition-colors hover:text-gold",
          )}
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} aria-hidden />
          All products
        </Link>
      </div>

      <header className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
              {product.number} · Export commodity
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-[-0.02em] text-ivory">
              {product.name}
            </h1>
            <p className="mt-4 max-w-xl font-heading text-lg text-sage md:text-xl">
              {product.tagline}
            </p>
            <p className="mt-6 inline-flex rounded-sm border border-gold/30 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
              {product.grade}
            </p>
          </div>

          <div
            className={cn(
              "relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border",
              PRODUCT_GRADIENTS[product.slug],
            )}
            role="img"
            aria-label={`${product.name} product visual placeholder`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(200,151,62,0.14),transparent_55%)]" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/80 to-transparent" />
          </div>
        </div>
      </header>

      <section
        className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28"
        aria-labelledby="specs-heading"
      >
        <h2
          id="specs-heading"
          className="font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl"
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

      <section className="border-y border-border bg-surface">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl">
              Product overview
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/80 md:text-lg">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl">
              Origin & sourcing
            </h2>
            <p className="mt-6 text-base leading-relaxed text-ivory/80 md:text-lg">
              {product.originStory}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <div className="rounded-sm border border-border bg-surface p-8 md:p-12">
          <h2 className="font-display text-3xl font-bold tracking-tight text-ivory md:text-4xl">
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
                "bg-gold font-body text-sm font-medium text-bg transition-transform active:scale-[0.98]",
                "hover:bg-gold/90",
              )}
            >
              Request Sample
            </a>
            <Link
              href="/#contact"
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
    </article>
  );
}
