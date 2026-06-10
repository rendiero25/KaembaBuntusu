import Link from "next/link";
import { NAV_LINKS, WA_DISPLAY, WA_LINK } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div>
            <p className="font-display text-xl font-bold text-ivory">
              CV. Kaemba Buntusu Indonesia
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Connecting Sulawesi&apos;s finest resources to the global market.
            </p>
            <p className="mt-4 font-mono text-[11px] uppercase">
              Makassar · South Sulawesi · Indonesia
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-medium text-[11px] uppercase text-ivory transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] uppercase">
              WhatsApp
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-ivory transition-colors hover:text-gold"
            >
              {WA_DISPLAY}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="font-bold text-[11px] uppercase text-footer-muted">
            © {year} CV. Kaemba Buntusu Indonesia · All rights reserved
          </p>
          <p className="font-bold text-[11px] uppercase text-footer-muted">
            Built on Sulawesi. Trusted worldwide.
          </p>
          <p className="font-bold text-[11px] text-footer-muted">
            Developed by{" "}
            <a
              href="https://rendiero.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors hover:text-ivory"
            >
              Rendiero
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
