"use client";

import { GsapInit } from "@/components/providers/GsapInit";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

type SiteProvidersProps = {
  children: React.ReactNode;
};

export function SiteProviders({ children }: SiteProvidersProps) {
  return (
    <ThemeProvider>
      <GsapInit />
      {children}
    </ThemeProvider>
  );
}
