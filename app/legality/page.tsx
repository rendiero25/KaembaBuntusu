import type { Metadata } from "next";
import { LegalityPageContent } from "@/components/pages/LegalityPageContent";
import { SiteShell } from "@/components/ui/SiteShell";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Legal Standing",
  description:
    "Fully licensed Indonesian export business. NIB, SIUP, legal entity registration, and per-shipment export certificates for international commodity buyers.",
  openGraph: {
    title: "Legal Standing | CV. Kaemba Buntusu Indonesia",
    description:
      "Export compliance, business registration, and documentation available for qualified buyers.",
    images: [OG_IMAGE],
  },
};

export default function LegalityPage() {
  return (
    <SiteShell>
      <LegalityPageContent />
    </SiteShell>
  );
}
