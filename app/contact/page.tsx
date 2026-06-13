import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/ContactPageContent";
import { SiteShell } from "@/components/ui/SiteShell";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact CV. Kaemba Buntusu Indonesia for coconut, copra, cloves, and pepper export inquiries. Response within 24 hours. Based in Makassar, Sulawesi.",
  openGraph: {
    title: "Contact | CV. Kaemba Buntusu Indonesia",
    description:
      "Send an export inquiry or message us on WhatsApp. Monday to Saturday, 08:00-17:00 WIB.",
    images: [OG_IMAGE],
  },
};

export default function ContactPage() {
  return (
    <SiteShell>
      <ContactPageContent />
    </SiteShell>
  );
}
