"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { InquiryForm } from "@/components/forms/InquiryForm";
import {
  COMPANY_ADDRESS,
  EASE,
  WA_DISPLAY,
  WA_LINK,
} from "@/lib/constants";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const left = leftRef.current;
    const right = rightRef.current;
    if (!section || !left || !right) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.set([left, right], { opacity: 0 });
      gsap.set(left, { x: -60 });
      gsap.set(right, { x: 60 });

      gsap.to([left, right], {
        x: 0,
        opacity: 1,
        duration: 0.85,
        ease: EASE.out,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="border-t border-border py-24 md:py-32 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div ref={leftRef}>
            <p className="font-mono text-[11px] uppercase text-gold">
              Get in touch
            </p>
            <h2 className="mt-4 font-display text-[clamp(2rem,4.5vw,4rem)] font-bold leading-[1.05] text-ivory">
              Ready to source
              <br />
              from Sulawesi?
            </h2>

            <div className="mt-8 space-y-4 text-sm leading-relaxed text-sage md:text-base">
              <p>
                Whether you&apos;re requesting a product sample, placing your
                first container order, or exploring a long-term supply
                arrangement, we want to hear from you.
              </p>
              <p>
                Tell us what you need. We&apos;ll respond within 24 hours with
                availability, current pricing, and a sample offer where
                relevant.
              </p>
              <p className="text-sage">
                We&apos;re available Monday to Saturday, 08:00 - 17:00 WIB
                (UTC+8).
              </p>
            </div>

            <dl className="mt-10 space-y-6 border-t border-border pt-8">
              <div>
                <dt className="font-mono text-[11px] uppercase text-sage">
                  WhatsApp
                </dt>
                <dd className="mt-2">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-lg text-ivory transition-colors hover:text-gold"
                  >
                    {WA_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[11px] uppercase text-sage">
                  Address
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-sage md:text-base">
                  {COMPANY_ADDRESS.line1}
                  <br />
                  {COMPANY_ADDRESS.line2}
                  <br />
                  {COMPANY_ADDRESS.line3}
                </dd>
              </div>
            </dl>
          </div>

          <div ref={rightRef}>
            <InquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}
