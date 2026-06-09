"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { NAV_LINKS, Z_INDEX } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function NavBar() {
  const navRef = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          setSolid(self.scroll() > 48);
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        ref={navRef}
        style={{ zIndex: Z_INDEX.nav }}
        className={cn(
          "fixed inset-x-0 top-0 transition-[background-color,border-color,backdrop-filter] duration-300",
          solid
            ? "border-b border-border bg-bg/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[72px] md:px-12">
          <Link
            href="/"
            className="font-display text-lg font-bold tracking-tight text-ivory transition-colors hover:text-gold md:text-xl"
            onClick={closeMenu}
          >
            KAEMBA
          </Link>

          <nav
            className="hidden items-center gap-8 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-ivory/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm border border-border text-ivory transition-colors hover:border-gold/40 hover:text-gold lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
        style={{ zIndex: Z_INDEX.menu }}
        className={cn(
          "fixed inset-0 flex flex-col bg-bg transition-opacity duration-300 lg:hidden",
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <div className="flex h-16 items-center justify-end px-6 md:h-[72px]">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm border border-border text-ivory"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <X className="size-5" />
          </button>
        </div>

        <nav
          className="flex flex-1 flex-col items-center justify-center gap-8"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-3xl font-bold tracking-tight text-ivory transition-colors hover:text-gold"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
