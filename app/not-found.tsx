import type { Metadata } from "next";
import Link from "next/link";
import { FloatingWA } from "@/components/ui/FloatingWA";
import { Footer } from "@/components/ui/Footer";
import { NavBar } from "@/components/ui/NavBar";

export const metadata: Metadata = {
  title: "Page Not Found | CV. Kaemba Buntusu Indonesia",
  description: "The page you requested could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-sm focus:border focus:border-gold focus:bg-surface focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <NavBar />
      <main
        id="main-content"
        className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center md:px-12"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-gold">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ivory md:text-6xl">
          Page not found.
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-sage">
          The URL you entered does not match any page on this site. Return to the
          homepage or contact us if you need export information.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-sm bg-gold px-6 text-sm font-medium text-bg transition-transform hover:bg-gold/90 active:scale-[0.98]"
          >
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center justify-center rounded-sm border border-border px-6 text-sm font-medium text-ivory transition-colors hover:border-gold/40 hover:text-gold active:scale-[0.98]"
          >
            Contact Us
          </Link>
        </div>
      </main>
      <Footer />
      <FloatingWA />
    </>
  );
}
