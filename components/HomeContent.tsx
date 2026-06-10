"use client";

import { useCallback, useState } from "react";
import { Preloader } from "@/components/gsap/Preloader";
import { AboutTeaser } from "@/components/sections/teasers/AboutTeaser";
import { ContactTeaser } from "@/components/sections/teasers/ContactTeaser";
import { LegalityTeaser } from "@/components/sections/teasers/LegalityTeaser";
import { ProcessTeaser } from "@/components/sections/teasers/ProcessTeaser";
import { ProductsTeaser } from "@/components/sections/teasers/ProductsTeaser";
import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { WhyUs } from "@/components/sections/WhyUs";
import { FloatingWA } from "@/components/ui/FloatingWA";
import { Footer } from "@/components/ui/Footer";
import { NavBar } from "@/components/ui/NavBar";

export function HomeContent() {
  const [heroReady, setHeroReady] = useState(false);
  const handlePreloaderComplete = useCallback(() => {
    setHeroReady(true);
  }, []);

  return (
    <Preloader onComplete={handlePreloaderComplete}>
      <NavBar />
      <main className="flex flex-1 flex-col">
        <Hero ready={heroReady} />
        <Ticker />
        <ProductsTeaser />
        <AboutTeaser />
        <WhyUs />
        <ProcessTeaser />
        <LegalityTeaser />
        <ContactTeaser />
      </main>
      <Footer />
      <FloatingWA />
    </Preloader>
  );
}
