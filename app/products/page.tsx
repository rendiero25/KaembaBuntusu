import type { Metadata } from "next";
import { ProductsIndexContent } from "@/components/pages/ProductsIndexContent";
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Export-grade coconut, copra, cloves, and pepper from South Sulawesi. Direct sourcing, international specifications, and complete export documentation.",
  openGraph: {
    title: "Products | CV. Kaemba Buntusu Indonesia",
    description:
      "Four core agricultural commodities exported from Makassar to international buyers.",
    images: [OG_IMAGE],
  },
};

export default function ProductsPage() {
  return <ProductsIndexContent />;
}
