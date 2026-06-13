"use client";

import { GsapInit } from "@/components/providers/GsapInit";
import { ScrollReset } from "@/components/providers/ScrollReset";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

type SiteProvidersProps = {
  children: React.ReactNode;
};

export function SiteProviders({ children }: SiteProvidersProps) {
  return (
    <ThemeProvider>
      <GsapInit />
      <ScrollReset />
      {children}
    </ThemeProvider>
  );
}
