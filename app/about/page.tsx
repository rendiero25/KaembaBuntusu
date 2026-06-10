import type { Metadata } from "next";
import { AboutPageContent } from "@/components/pages/AboutPageContent";
import { SiteShell } from "@/components/ui/SiteShell";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "CV. Kaemba Buntusu Indonesia connects Sulawesi farmers to international buyers through direct sourcing, export-grade quality, and in-house documentation from Makassar.",
  openGraph: {
    title: "About Us | CV. Kaemba Buntusu Indonesia",
    description:
      "Direct agricultural commodity export from South Sulawesi. Founded in Makassar, January 2026.",
    images: [OG_IMAGE],
  },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <AboutPageContent />
    </SiteShell>
  );
}
