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

export const Z_INDEX = {
  base: 0,
  nav: 40,
  menu: 50,
  floatingWa: 45,
  preloader: 100,
} as const;

export const HERO_IMAGE = "/images/hero.jpg";

export const HERO_WORLD_IMAGE = "/images/world.webp";

export const HERO_WORLD_IMAGE_DARK = "/images/world2.webp";

export const WA_NUMBER =
  process.env.NEXT_PUBLIC_WA_NUMBER ?? "6282292250444";

export const WA_DISPLAY = "+62 822 9225 0444";

export const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
  "Hello, I'm interested in your products.",
)}`;

export const LINKEDIN_URL =
  "https://www.linkedin.com/in/kaemba-buntusu-365248416";

export const INSTAGRAM_URL =
  "https://www.instagram.com/cvkaembabuntusu?igsh=NWlkeHJyMjhiN2Fw";

export function getProductSampleLink(productName: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
    `Hello, I'm interested in a sample of ${productName}.`,
  )}`;
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaembaexport.com";

export const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
  { label: "Process", href: "/process" },
  { label: "Legality", href: "/legality" },
  { label: "Contact", href: "/contact" },
] as const;

export const TICKER_ITEMS = [
  "COCONUT",
  "COPRA",
  "CLOVES",
  "PEPPER",
  "CACAO BEAN",
  "MAKASSAR PORT",
  "SULAWESI",
  "EXPORT GRADE A",
  "DIRECT FROM FARM",
  "FULLY LICENSED",
  "INTERNATIONAL SHIPPING",
] as const;

export const TICKER_LOOP_DURATION = 40;

export const ABOUT_STATS = [
  { value: 5, suffix: "", label: "Core", sublabel: "Commodities" },
  { value: 1, suffix: "", label: "Strategic", sublabel: "Hub" },
  { value: 100, suffix: "%", label: "Direct", sublabel: "Sourcing" },
] as const;

export const ABOUT_BODY_PARAGRAPHS = [
  "Founded in Makassar in January 2026, Kaemba Buntusu Indonesia was built on a single conviction: the agricultural wealth of Sulawesi deserves a direct, trusted pathway to international markets.",
  "Sulawesi has been feeding the world for centuries through its coconut groves, clove-covered hillsides, and peppercorn fields. Yet too often, the value chain between farmer and global buyer is long, opaque, and inefficient.",
  "We exist to change that.",
  "By building direct relationships with vetted local farmers, maintaining strict quality standards at every step, and handling the full export documentation process in-house, we ensure that what reaches your warehouse is exactly what we promised. No middlemen. No surprises. Just clean product, clean paperwork, and a supplier that picks up the phone.",
] as const;

export type ProductSlug =
  | "coconut"
  | "copra"
  | "cloves"
  | "pepper"
  | "cacao-bean";

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
  originStory: string;
  metaDescription: string;
};

export const PRODUCT_GRADIENTS: Record<ProductSlug, string> = {
  coconut:
    "bg-[linear-gradient(135deg,#1a2e1f_0%,#0d1b0f_45%,#243828_100%)]",
  copra: "bg-[linear-gradient(135deg,#2a2418_0%,#0d1b0f_45%,#3d3020_100%)]",
  cloves: "bg-[linear-gradient(135deg,#2a1818_0%,#0d1b0f_45%,#3d2520_100%)]",
  pepper: "bg-[linear-gradient(135deg,#1f2a1a_0%,#0d1b0f_45%,#2e3520_100%)]",
  "cacao-bean":
    "bg-[linear-gradient(135deg,#2a1f18_0%,#0d1b0f_45%,#3d2a20_100%)]",
};

export const PRODUCT_IMAGES: Record<
  ProductSlug,
  { src: string; alt: string; width: number; height: number }
> = {
  coconut: {
    src: "/images/products/coconut4.jpeg",
    alt: "Coconut lot prepared for international shipment",
    width: 1200,
    height: 900,
  },
  copra: {
    src: "/images/products/copra1.jpeg",
    alt: "Sun-dried copra from Sulawesi, ready for international export",
    width: 1200,
    height: 900,
  },
  cloves: {
    src: "/images/products/cloves.jpg",
    alt: "Premium hand-picked cloves from Sulawesi highlands",
    width: 1200,
    height: 800,
  },
  pepper: {
    src: "/images/products/pepper.jpg",
    alt: "Sorted black and white peppercorns for export",
    width: 1200,
    height: 800,
  },
  "cacao-bean": {
    src: "/images/products/cacao-bean.jpg",
    alt: "Export-grade fermented cacao beans from Sulawesi",
    width: 1200,
    height: 900,
  },
};

export const PRODUCT_CAROUSEL: Partial<
  Record<ProductSlug, readonly ProductCarouselImage[]>
> = {
  coconut: [
    {
      src: "/images/products/coconut4.jpeg",
      alt: "Coconut lot prepared for international shipment",
    },
    {
      src: "/images/products/coconut1.jpeg",
      alt: "Coconut harvest at a Sulawesi coastal grove",
    },
    {
      src: "/images/products/coconut2.jpeg",
      alt: "Fresh coconuts sorted at farm-gate collection",
    },
    {
      src: "/images/products/coconut3.jpeg",
      alt: "Sorted export-grade coconuts before packing",
    },
    {
      src: "/images/products/coconut5.jpeg",
      alt: "Export-grade coconuts graded for international buyers",
    },
    {
      src: "/images/products/coconut6.jpeg",
      alt: "Coconut batch inspected at farm-gate collection point",
    },
    {
      src: "/images/products/coconut7.jpeg",
      alt: "Fresh coconuts from Sulawesi coastal farms",
    },
    {
      src: "/images/products/coconut8.jpeg",
      alt: "Coconut shipment prepared for export from Makassar",
    },
  ],
  copra: [
    {
      src: "/images/products/copra1.jpeg",
      alt: "Sun-dried copra from Sulawesi, ready for international export",
    },
    {
      src: "/images/products/copra2.jpeg",
      alt: "Sun-dried copra sorted and prepared for export packing",
    },
  ],
  "cacao-bean": [
    {
      src: "/images/products/cacao-bean.jpg",
      alt: "Export-grade fermented cacao beans from Sulawesi",
    },
    {
      src: "/images/products/cocoabean1.jpeg",
      alt: "Fermented cacao beans drying at a Sulawesi farm",
    },
    {
      src: "/images/products/cocoabean2.jpeg",
      alt: "Sorted cacao beans prepared for export shipment",
    },
  ],
};

export type ProductCarouselImage = {
  src: string;
  alt: string;
};

export function getProductCarouselImages(
  slug: ProductSlug,
): readonly ProductCarouselImage[] {
  const carousel = PRODUCT_CAROUSEL[slug];
  if (carousel && carousel.length > 0) {
    return carousel;
  }

  const main = PRODUCT_IMAGES[slug];
  return [{ src: main.src, alt: main.alt }];
}

export const PRODUCT_SLUGS: ProductSlug[] = [
  "coconut",
  "copra",
  "cloves",
  "pepper",
  "cacao-bean",
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function isProductSlug(slug: string): slug is ProductSlug {
  return PRODUCT_SLUGS.includes(slug as ProductSlug);
}

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
    originStory:
      "Sulawesi's coastal belt has farmed coconuts for generations. Our supply comes from vetted groves around Makassar, where harvest timing and sorting follow export buyer specifications from the first cut.",
    metaDescription:
      "Export-grade coconut from Sulawesi. Sorted by size and moisture, packed to international food safety standards. MOQ: 1 x 20ft container.",
  },
  {
    slug: "copra",
    number: "02",
    name: "Copra",
    tagline: "High oil yield. Low moisture. No compromise.",
    description:
      "Sun-dried copra from Sulawesi with consistent oil yield and controlled moisture. Suitable for industrial oil processing and food-grade extraction.",
    specs: [
      { label: "Moisture", value: "≤6%" },
      { label: "Oil yield", value: "65–68%" },
      { label: "FFA", value: "Max 3%" },
      { label: "Packaging", value: "50kg woven PP sacks" },
      { label: "MOQ", value: "1 FCL", highlight: true },
    ],
    grade: "Export Grade A",
    originStory:
      "Copra production in Sulawesi relies on sun-drying traditions refined over decades. We work with farmers who control moisture at the source, reducing variability before copra reaches our grading facility in Makassar.",
    metaDescription:
      "Sun-dried copra from Sulawesi with 65-68% oil yield and controlled moisture. Suitable for industrial oil processing and food-grade extraction.",
  },
  {
    slug: "cloves",
    number: "03",
    name: "Cloves",
    tagline: "Sulawesi's signature spice. Pure, aromatic, traceable.",
    description:
      "Hand-picked cloves from Sulawesi's highland farms. Known globally for their high essential oil content and deep, complex aroma. Sourced with farm-level traceability.",
    specs: [
      { label: "Moisture", value: "10–14%" },
      { label: "Essential oil", value: "≥15%" },
      { label: "Foreign matter", value: "Max 1%" },
      { label: "Origin", value: "Sulawesi, Indonesia" },
      { label: "Packaging", value: "PP woven bags / cartons" },
      { label: "MOQ", value: "100kg", highlight: true },
    ],
    grade: "Export Grade A",
    originStory:
      "The highland slopes of Sulawesi produce cloves prized for essential oil content. We trace each lot to farm clusters in the region's spice belt, where hand-picking preserves bud integrity through drying and storage.",
    metaDescription:
      "Hand-picked Sulawesi cloves with high essential oil content and farm-level traceability. Export Grade A, MOQ from 100kg.",
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
    originStory:
      "Black and white pepper from Sulawesi's growing regions is sorted to separate grades at source. Our supply chain connects directly with farmer groups who clean and dry pepper to export specifications before consolidated shipment through Makassar.",
    metaDescription:
      "Black and white pepper sorted to international specifications. Consistent pungency, minimal impurities, ready for industrial or retail repackaging.",
  },
  {
    slug: "cacao-bean",
    number: "05",
    name: "Cacao Bean",
    tagline: "Fermented, dried, and graded for chocolate makers worldwide.",
    description:
      "Selected cacao beans from Sulawesi's growing regions. Fermented and sun-dried to develop flavour, sorted by size and moisture, and packed to international food safety standards for chocolate and cocoa processing.",
    specs: [
      { label: "Moisture", value: "≤7%" },
      { label: "Fermentation", value: "Well fermented" },
      { label: "Bean count", value: "Per buyer specification" },
      { label: "Packaging", value: "Jute bags / PP sacks" },
      { label: "MOQ", value: "100kg", highlight: true },
    ],
    grade: "Export Grade A",
    originStory:
      "Sulawesi's cacao belt supplies beans prized for depth and fermentation character. We source from vetted farmer groups who control drying and sorting at farm level, then consolidate through our Makassar grading facility before export dispatch.",
    metaDescription:
      "Export-grade fermented cacao beans from Sulawesi. Sorted by size and moisture, packed for chocolate makers and cocoa processors. MOQ from 100kg.",
  },
];

export type WhyUsIcon = "farm" | "document" | "port";

export type WhyUsReason = {
  number: string;
  title: string;
  copy: string;
  icon: WhyUsIcon;
};

export const WHY_US_REASONS: WhyUsReason[] = [
  {
    number: "01",
    title: "No middlemen. Just farmers.",
    copy: "We source directly from vetted farmer networks across Sulawesi. This means better pricing, genuine traceability, and a supply chain you can actually verify, not just trust.",
    icon: "farm",
  },
  {
    number: "02",
    title: "Every document, every shipment.",
    copy: "Certificate of Origin. Phytosanitary Certificate. Commercial Invoice. Packing List. Bill of Lading. We handle compliance paperwork in-house so you never have to chase documentation.",
    icon: "document",
  },
  {
    number: "03",
    title: "Eastern Indonesia's premier port city.",
    copy: "Makassar's Soekarno-Hatta International Port gives us direct access to major shipping routes across Asia, the Middle East, and Europe. Shorter transit, lower freight, fewer connections.",
    icon: "port",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  copy: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Direct Procurement",
    copy: "We purchase directly from our vetted farmer network, ensuring price fairness and product consistency from the very first step.",
  },
  {
    number: "02",
    title: "Sorting & Grading",
    copy: "Each batch is sorted, graded, and inspected against our quality benchmarks before entering the packing facility.",
  },
  {
    number: "03",
    title: "Quality Control",
    copy: "Moisture content, oil yield, visual inspection, and contamination checks. Every lot is tested before it gets a green light.",
  },
  {
    number: "04",
    title: "Documentation",
    copy: "We prepare all required export documents: COO, Phytosanitary Certificate, Commercial Invoice, Packing List, and coordinate B/L.",
  },
  {
    number: "05",
    title: "Packaging & Loading",
    copy: "Product is packed to buyer specification and loaded under direct supervision into inspected, clean containers.",
  },
  {
    number: "06",
    title: "Shipment Dispatch",
    copy: "Container sealed, documents submitted. We provide tracking updates from port of origin through to destination port.",
  },
];

export type ComplianceStatus = "active" | "registered" | "per-shipment";

export type ComplianceBadge = {
  title: string;
  subtitle: string;
  status: ComplianceStatus;
  statusLabel: string;
  description: string;
};

export const COMPLIANCE_BADGES: ComplianceBadge[] = [
  {
    title: "NIB",
    subtitle: "Nomor Induk Berusaha",
    status: "active",
    statusLabel: "Active",
    description: "Indonesia's unified business registration number",
  },
  {
    title: "SIUP",
    subtitle: "Surat Izin Usaha Perdagangan",
    status: "active",
    statusLabel: "Active",
    description: "Trade business license",
  },
  {
    title: "SK Kemenkumham",
    subtitle: "Legal entity registration",
    status: "registered",
    statusLabel: "Registered",
    description:
      "Legal entity registration from the Ministry of Law and Human Rights",
  },
  {
    title: "Phytosanitary Certificate",
    subtitle: "Export compliance",
    status: "per-shipment",
    statusLabel: "Available per shipment",
    description: "Issued by Indonesia's agricultural authority (Barantan)",
  },
  {
    title: "Certificate of Origin (COO / SKA)",
    subtitle: "Export documentation",
    status: "per-shipment",
    statusLabel: "Available per shipment",
    description: "Issued by local Chamber of Commerce (Kadin / Disperindag)",
  },
  {
    title: "Verified Business Bank Account",
    subtitle: "Financial traceability",
    status: "active",
    statusLabel: "Active",
    description:
      "Indonesian registered business account. All transactions traceable.",
  },
];

export const COMPLIANCE_DISCLAIMER =
  "Complete legal documentation available upon request for qualified buyers. We believe full transparency is the price of a real business partnership.";

export const COMPANY_ADDRESS = {
  line1: "Buntusu, Tamalanrea",
  line2: "Makassar City, Sulawesi",
  line3: "Indonesia",
} as const;

export const INQUIRY_PRODUCT_OPTIONS = [
  { value: "coconut" as const, label: "Coconut" },
  { value: "copra" as const, label: "Copra" },
  { value: "cloves" as const, label: "Cloves" },
  { value: "pepper" as const, label: "Pepper" },
  { value: "cacao-bean" as const, label: "Cacao Bean" },
] as const;

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
