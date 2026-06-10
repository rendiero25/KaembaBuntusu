import type { Metadata } from "next";
import { ProcessPageContent } from "@/components/pages/ProcessPageContent";
import { SiteShell } from "@/components/ui/SiteShell";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Export Process",
  description:
    "From farm-gate procurement to container dispatch: the six-stage export process CV. Kaemba Buntusu Indonesia runs for every shipment from South Sulawesi.",
  openGraph: {
    title: "Export Process | CV. Kaemba Buntusu Indonesia",
    description:
      "Six defined stages from procurement through quality control, documentation, and shipment dispatch.",
    images: [OG_IMAGE],
  },
};

export default function ProcessPage() {
  return (
    <SiteShell>
      <ProcessPageContent />
    </SiteShell>
  );
}
