"use client";

import { PageMotion } from "@/components/gsap/PageMotion";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { CONTACT_FAQ } from "@/lib/content";
import {
  COMPANY_ADDRESS,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  WA_DISPLAY,
  WA_LINK,
} from "@/lib/constants";

export function ContactPageContent() {
  return (
    <PageMotion>
      <PageHeader
        label="Get in touch"
        title="Ready to source from Sulawesi?"
        description="Whether you are requesting a sample, placing your first container order, or exploring a long-term supply arrangement, we want to hear from you."
      />

      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <div className="space-y-4 text-body leading-relaxed text-sage">
              <p>
                Tell us what you need. We respond within 24 hours with
                availability, current pricing, and a sample offer where relevant.
              </p>
              <p className="text-sage">
                Available Monday to Saturday, 08:00 - 17:00 WIB (UTC+8).
              </p>
            </div>

            <dl className="mt-10 space-y-8 border-t border-border pt-10">
              <div>
                <dt className="text-label text-sage">
                  WhatsApp
                </dt>
                <dd className="mt-2">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-heading text-xl text-ivory transition-colors hover:text-gold"
                  >
                    {WA_DISPLAY}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-label text-sage">Address</dt>
                <dd className="mt-2 text-lg font-semibold leading-relaxed text-sage">
                  {COMPANY_ADDRESS.line1}
                  <br />
                  {COMPANY_ADDRESS.line2}
                  <br />
                  {COMPANY_ADDRESS.line3}
                </dd>
              </div>
              <div>
                <dt className="text-label text-sage">LinkedIn</dt>
                <dd className="mt-2">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-ivory transition-colors hover:text-gold"
                  >
                    CV. Kaemba Buntusu
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-label text-sage">Instagram</dt>
                <dd className="mt-2">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-ivory transition-colors hover:text-gold"
                  >
                    @cvkaembabuntusu
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div data-reveal>
            <InquiryForm />
          </div>
        </div>

        <section className="mt-20 border-t border-border pt-16" aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            data-reveal
            className="font-display text-3xl font-bold text-ivory md:text-4xl"
          >
            Common questions
          </h2>
          <dl className="mt-10 space-y-8">
            {CONTACT_FAQ.map((item) => (
              <div key={item.question} data-reveal>
                <dt className="font-heading text-2xl font-semibold text-ivory">
                  {item.question}
                </dt>
                <dd className="mt-2 max-w-3xl text-body leading-relaxed text-sage">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </PageMotion>
  );
}
