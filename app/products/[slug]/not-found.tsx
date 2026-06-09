import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto flex min-h-[60dvh] max-w-7xl flex-col items-center justify-center px-6 py-24 text-center md:px-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
        Product not found
      </p>
      <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ivory md:text-5xl">
        This commodity is not listed.
      </h1>
      <p className="mt-4 max-w-md text-base text-sage">
        The product page you requested does not exist. Browse our export catalog
        or contact us directly.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Link
          href="/#products"
          className="inline-flex h-11 items-center justify-center rounded-sm bg-gold px-6 text-sm font-medium text-bg transition-transform hover:bg-gold/90 active:scale-[0.98]"
        >
          View Products
        </Link>
        <Link
          href="/#contact"
          className="inline-flex h-11 items-center justify-center rounded-sm border border-border px-6 text-sm font-medium text-ivory transition-colors hover:border-gold/40 hover:text-gold active:scale-[0.98]"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
