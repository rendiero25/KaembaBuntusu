"use client";

import { useCallback, useState } from "react";
import { Preloader } from "@/components/gsap/Preloader";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Legality } from "@/components/sections/Legality";
import { Process } from "@/components/sections/Process";
import { Products } from "@/components/sections/Products";
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
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-sm focus:border focus:border-gold focus:bg-surface focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <NavBar />
      <main className="flex flex-1 flex-col">
        <Hero ready={heroReady} />
        <Ticker />
        <About />
        <Products />
        <WhyUs />
        <Process />
        <Legality />
        <Contact />
      </main>
      <Footer />
      <FloatingWA />
    </Preloader>
  );
}
