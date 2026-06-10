import type { Metadata } from "next";
import { NotFoundContent } from "@/components/pages/NotFoundContent";
import { SiteShell } from "@/components/ui/SiteShell";

export const metadata: Metadata = {
  title: "Page Not Found | CV. Kaemba Buntusu Indonesia",
  description: "The page you requested could not be found.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <SiteShell>
      <NotFoundContent />
    </SiteShell>
  );
}
