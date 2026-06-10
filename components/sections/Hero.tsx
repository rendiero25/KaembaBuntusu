"use client";



import Image from "next/image";

import Link from "next/link";

import { useEffect, useRef } from "react";

import { ChevronDown } from "lucide-react";

import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

import { EASE, HERO_IMAGE, WA_LINK } from "@/lib/constants";

import { cn } from "@/lib/utils";



const TRUST_BADGES = [

  "EXPORT GRADE A",

  "FULLY LICENSED",

  "MAKASSAR PORT",

  "DIRECT SOURCING",

] as const;



type HeroProps = {

  ready?: boolean;

};



export function Hero({ ready = false }: HeroProps) {

  const sectionRef = useRef<HTMLElement>(null);

  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  const headlineRef = useRef<HTMLHeadingElement>(null);

  const subRef = useRef<HTMLParagraphElement>(null);

  const ctaRef = useRef<HTMLDivElement>(null);

  const badgesRef = useRef<HTMLDivElement>(null);

  const scrollIndicatorRef = useRef<HTMLDivElement>(null);



  useEffect(() => {

    if (!ready || !sectionRef.current) return;



    const prefersReduced = window.matchMedia(

      "(prefers-reduced-motion: reduce)",

    ).matches;



    let split: SplitText | null = null;



    const ctx = gsap.context(() => {

      const eyebrow = eyebrowRef.current;

      const headline = headlineRef.current;

      const sub = subRef.current;

      const cta = ctaRef.current;

      const badges = badgesRef.current;

      const indicator = scrollIndicatorRef.current;



      if (!eyebrow || !headline || !sub || !cta || !badges) return;



      if (prefersReduced) {

        gsap.set([eyebrow, sub, cta, badges], { opacity: 1, y: 0, scale: 1 });

        gsap.set(headline, { opacity: 1 });

        return;

      }



      split = SplitText.create(headline, { type: "lines,words" });



      gsap.set(eyebrow, { y: 24, opacity: 0 });

      gsap.set(split.words, { y: 80, opacity: 0 });

      gsap.set(sub, { y: 40, opacity: 0 });

      gsap.set(cta.children, { y: 32, opacity: 0 });

      gsap.set(badges.children, { scale: 0.7, opacity: 0 });



      const tl = gsap.timeline({ delay: 0.1 });



      tl.fromTo(

        eyebrow,

        { y: 24, opacity: 0 },

        { y: 0, opacity: 1, duration: 0.6, ease: EASE.out },

      )

        .fromTo(

          split.words,

          { y: 80, opacity: 0 },

          {

            y: 0,

            opacity: 1,

            duration: 0.9,

            stagger: 0.04,

            ease: EASE.expo,

          },

          "-=0.15",

        )

        .fromTo(

          sub,

          { y: 40, opacity: 0 },

          { y: 0, opacity: 1, duration: 0.8, ease: EASE.out },

          "-=0.35",

        )

        .fromTo(

          cta.children,

          { y: 32, opacity: 0 },

          {

            y: 0,

            opacity: 1,

            duration: 0.6,

            stagger: 0.1,

            ease: EASE.out,

          },

          "-=0.45",

        )

        .fromTo(

          badges.children,

          { scale: 0.7, opacity: 0 },

          {

            scale: 1,

            opacity: 1,

            duration: 0.5,

            stagger: 0.08,

            ease: EASE.out,

          },

          "-=0.2",

        );



      if (indicator) {

        gsap.to(indicator, {

          y: 8,

          duration: 1.2,

          ease: "power1.inOut",

          yoyo: true,

          repeat: -1,

        });



        ScrollTrigger.create({

          start: 64,

          onEnter: () => {

            gsap.to(indicator, { opacity: 0, duration: 0.35, ease: EASE.out });

          },

          onLeaveBack: () => {

            gsap.to(indicator, {

              opacity: 1,

              duration: 0.35,

              ease: EASE.out,

            });

          },

        });

      }

    }, sectionRef);



    return () => {

      split?.revert();

      ctx.revert();

    };

  }, [ready]);



  return (

    <section

      ref={sectionRef}

      id="hero"

      className="relative min-h-[100dvh] overflow-hidden"

      aria-label="Hero"

    >

      <div className="absolute inset-0">

        <Image

          src={HERO_IMAGE}

          alt="Coconut groves and agricultural landscape in South Sulawesi, Indonesia"

          fill

          priority

          sizes="100vw"

          className="object-cover object-center"

        />

      </div>



      <div

        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--color-hero-vignette)_72%)]"

        aria-hidden="true"

      />

      <div

        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/50 via-bg/20 to-bg/95"

        aria-hidden="true"

      />

      <div

        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-bg/30"

        aria-hidden="true"

      />



      <div className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center px-6 pt-20 pb-24 text-center md:px-12 md:pt-24">

        <p

          ref={eyebrowRef}

          className="font-mono text-[14px] uppercase text-gold"

        >

          Makassar · South Sulawesi · Est. January 2026

        </p>



        <h1

          ref={headlineRef}

          className={cn(

            "mt-6 max-w-5xl font-display font-bold text-ivory",

            "text-[clamp(2rem,5.5vw,5.25rem)] leading-[1.08]",

          )}

        >

          Connecting Sulawesi&apos;s

          <br />

          finest resources to

          <br />

          the global market.

        </h1>



        <p

          ref={subRef}

          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ivory md:text-lg"

        >

          We export premium agricultural commodities — Coconut, Copra, Cloves,

          and Pepper — directly from South Sulawesi to international buyers. No

          middlemen. Clean documentation. Consistent quality.

        </p>



        <div

          ref={ctaRef}

          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"

        >

          <Link

            href="/products"

            className={cn(

              "inline-flex h-11 min-w-[10.5rem] items-center justify-center rounded-sm px-6",

              "bg-gold font-body text-sm font-medium text-on-gold transition-transform active:scale-[0.98]",

              "hover:bg-gold/90",

            )}

          >

            Explore Products

          </Link>

          <a

            href={WA_LINK}

            target="_blank"

            rel="noopener noreferrer"

            className={cn(

              "inline-flex h-11 min-w-[10.5rem] items-center justify-center rounded-sm border border-border px-6",

              "font-body text-sm font-medium text-ivory transition-colors active:scale-[0.98]",

              "hover:border-gold/40 hover:text-gold",

            )}

          >

            WhatsApp Us

          </a>

        </div>



        <div

          ref={badgesRef}

          className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase text-ivory"

        >

          {TRUST_BADGES.map((badge, index) => (

            <span key={badge} className="inline-flex items-center gap-3">

              {index > 0 && (

                <span className="text-gold" aria-hidden="true">

                  ✦

                </span>

              )}

              {badge}

            </span>

          ))}

        </div>

      </div>



      <div

        ref={scrollIndicatorRef}

        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-sage"

        aria-hidden="true"

      >

        <ChevronDown className="size-6" strokeWidth={1.5} />

      </div>

    </section>

  );

}


