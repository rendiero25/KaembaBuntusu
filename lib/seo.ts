import {
  COMPANY_ADDRESS,
  PRODUCTS,
  SITE_URL,
  WA_DISPLAY,
} from "@/lib/constants";

export const SITE_NAME = "CV. Kaemba Buntusu Indonesia";

export const SITE_TITLE =
  "CV. Kaemba Buntusu Indonesia | Agricultural Commodity Exporter";

export const SITE_DESCRIPTION =
  "Premium agricultural commodity exports from Sulawesi, Indonesia. Coconut, Copra, Cloves, Pepper, Cacao Bean. Fully licensed, export-grade, direct sourcing.";

export const SITE_KEYWORDS = [
  "indonesian commodity exporter",
  "copra exporter",
  "cloves exporter",
  "coconut exporter",
  "pepper exporter",
  "cacao exporter",
  "makassar export",
  "sulawesi agriculture",
] as const;

export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "CV. Kaemba Buntusu Indonesia - Agricultural commodity exporter from Sulawesi",
} as const;

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/og-image.jpg`,
    description: SITE_DESCRIPTION,
    foundingDate: "2026-01",
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_ADDRESS.line1,
      addressLocality: COMPANY_ADDRESS.line2,
      addressRegion: "Sulawesi",
      addressCountry: "ID",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: WA_DISPLAY.replace(/\s/g, ""),
      contactType: "sales",
      areaServed: "Worldwide",
      availableLanguage: ["English", "Indonesian"],
    },
    sameAs: [],
    knowsAbout: PRODUCTS.map((product) => product.name),
  };
}

export function getProductJsonLd(slug: string) {
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    category: "Agricultural commodity",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    additionalProperty: product.specs.map((spec) => ({
      "@type": "PropertyValue",
      name: spec.label,
      value: spec.value,
    })),
  };
}
