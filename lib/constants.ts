export const EASE = {
  out: "power2.out",
  inOut: "power3.inOut",
  expo: "expo.out",
  back: "back.out(1.2)",
} as const;

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
  xslow: 1.4,
} as const;

export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "6282292250444";

export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hello, I'm interested in your products.",
)}`;

export const NAV_LINKS = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Process", href: "#process" },
  { label: "Legality", href: "#legality" },
  { label: "Contact", href: "#contact" },
] as const;

export type ProductSlug = "coconut" | "copra" | "cloves" | "pepper";

export type ProductSpec = {
  label: string;
  value: string;
  highlight?: boolean;
};

export type Product = {
  slug: ProductSlug;
  number: string;
  name: string;
  tagline: string;
  description: string;
  specs: ProductSpec[];
  grade: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "coconut",
    number: "01",
    name: "Coconut",
    tagline: "Fresh from the grove, packed for the world.",
    description:
      "Selected coconuts from Sulawesi's coastal farms. Harvested at peak maturity, sorted by size and moisture content, and packed to international food safety standards.",
    specs: [
      { label: "Size", value: "Medium / Large (per buyer spec)" },
      { label: "Moisture", value: "≤8%" },
      { label: "Packaging", value: "Per buyer specification" },
      { label: "Packing", value: "Bulk / Net bags" },
      { label: "MOQ", value: "1 × 20ft container", highlight: true },
    ],
    grade: "Export Grade A",
  },
  {
    slug: "copra",
    number: "02",
    name: "Copra",
    tagline: "High oil yield. Low moisture. No compromise.",
    description:
      "Sun-dried copra from South Sulawesi with consistent oil yield and controlled moisture. Suitable for industrial oil processing and food-grade extraction.",
    specs: [
      { label: "Moisture", value: "≤6%" },
      { label: "Oil yield", value: "65–68%" },
      { label: "FFA", value: "Max 3%" },
      { label: "Packaging", value: "50kg woven PP sacks" },
      { label: "MOQ", value: "1 FCL", highlight: true },
    ],
    grade: "Export Grade A",
  },
  {
    slug: "cloves",
    number: "03",
    name: "Cloves",
    tagline: "Sulawesi's signature spice. Pure, aromatic, traceable.",
    description:
      "Hand-picked cloves from South Sulawesi's highland farms. Known globally for their high essential oil content and deep, complex aroma. Sourced with farm-level traceability.",
    specs: [
      { label: "Moisture", value: "10–14%" },
      { label: "Essential oil", value: "≥15%" },
      { label: "Foreign matter", value: "Max 1%" },
      { label: "Origin", value: "South Sulawesi, Indonesia" },
      { label: "Packaging", value: "PP woven bags / cartons" },
      { label: "MOQ", value: "100kg", highlight: true },
    ],
    grade: "Export Grade A",
  },
  {
    slug: "pepper",
    number: "04",
    name: "Pepper",
    tagline: "Two variants. One uncompromising standard.",
    description:
      "Black and white pepper, sorted and cleaned to international specifications. Consistent pungency, minimal impurities, ready for industrial or retail repackaging.",
    specs: [
      { label: "Black bulk density", value: "≥550g/L" },
      { label: "Black moisture", value: "≤12%" },
      { label: "White impurity", value: "<1%" },
      { label: "Packaging", value: "Bulk / 50kg PP sacks" },
      { label: "MOQ", value: "100kg", highlight: true },
    ],
    grade: "Export Grade A",
  },
];

export const BUYER_COUNTRIES = [
  "China",
  "Japan",
  "South Korea",
  "India",
  "UAE",
  "Netherlands",
  "USA",
  "Other",
] as const;
