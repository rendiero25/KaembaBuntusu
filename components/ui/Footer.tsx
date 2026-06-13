"use client";

import Link from "next/link";
import { useScrollReveal } from "@/components/gsap/useScrollReveal";
import {
  INSTAGRAM_URL,
  LINKEDIN_URL,
  NAV_LINKS,
  WA_DISPLAY,
  WA_LINK,
} from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useScrollReveal<HTMLElement>({
    selector: "[data-footer-reveal]",
    start: "top 92%",
    y: 28,
    stagger: 0.08,
  });

  return (
    <footer ref={footerRef} className="site-footer">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          <div data-footer-reveal>
            <p className="site-footer__heading font-display text-xl font-bold">
              CV. Kaemba Buntusu Indonesia
            </p>
            <p className="site-footer__body mt-3 max-w-xs text-lg font-semibold leading-relaxed">
              Sulawesi agricultural exports with direct sourcing and in-house
              export documentation.
            </p>
            <p className="site-footer__body mt-4 text-label">
              Makassar · Sulawesi · Indonesia
            </p>
          </div>

          <nav data-footer-reveal aria-label="Footer">
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="site-footer__link text-label"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div data-footer-reveal className="space-y-6">
            <div>
              <p className="site-footer__label text-label">WhatsApp</p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__link mt-2 inline-block text-lg font-semibold"
              >
                {WA_DISPLAY}
              </a>
            </div>
            <div>
              <p className="site-footer__label text-label">LinkedIn</p>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__link mt-2 inline-block text-lg font-semibold"
              >
                CV. Kaemba Buntusu
              </a>
            </div>
            <div>
              <p className="site-footer__label text-label">Instagram</p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="site-footer__link mt-2 inline-block text-lg font-semibold"
              >
                @cvkaembabuntusu
              </a>
            </div>
          </div>
        </div>

        <div
          data-footer-reveal
          className="site-footer__divider mt-12 flex flex-col gap-3 border-t pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p className="site-footer__muted text-label-xs">
            © {year} CV. Kaemba Buntusu Indonesia · All rights reserved
          </p>
          <p className="site-footer__muted text-label-xs">
            Built on Sulawesi. Trusted worldwide.
          </p>
          <p className="site-footer__muted text-label-xs">
            Developed by{" "}
            <a
              href="https://rendiero.site"
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__gold font-semibold"
            >
              Rendiero
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
