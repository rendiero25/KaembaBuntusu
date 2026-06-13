export const COMPANY_VALUES = [
  {
    title: "Direct sourcing",
    copy: "Every kilogram we export is traced to vetted farmer networks in Sulawesi. No brokers, no opaque intermediaries.",
  },
  {
    title: "Export discipline",
    copy: "Grading, moisture checks, and documentation follow international buyer specifications before product leaves our facility.",
  },
  {
    title: "Transparent partnership",
    copy: "We share specs, certificates, and shipment updates proactively. Qualified buyers receive full legal documentation on request.",
  },
] as const;

export const ABOUT_EXTENDED = {
  intro:
    "Kaemba Buntusu Indonesia started in Makassar in January 2026 to give international buyers one accountable supplier for Sulawesi coconut, copra, cloves, and pepper.",
  paragraphs: [
    "Sulawesi supplies these crops through coastal groves, highland spice farms, and pepper fields within trucking distance of Soekarno-Hatta International Port.",
    "Most export chains still pass through layers of brokers. That adds cost, blurs traceability, and makes batch quality harder to verify.",
    "We shorten the chain. We buy from named farmer groups, grade at our facility, and handle export paperwork under one roof.",
    "Our team works from Buntusu, Tamalanrea, Makassar City, coordinating procurement across Sulawesi, QC at packing, and shipment through Makassar port.",
  ],
  vision:
    "To become a leading export house from Eastern Indonesia, recognized globally for transparency, product quality, and community-driven sourcing.",
  mission:
    "Connect Sulawesi's finest agricultural commodities to international buyers through direct sourcing, rigorous quality standards, and complete export documentation.",
} as const;

export const MARKET_REACH = {
  headline: "Where our commodities ship",
  copy: "Makassar's port position gives us direct access to major shipping lanes across Asia, the Middle East, and Europe.",
  regions: [
    {
      name: "East & Southeast Asia",
      markets: "China, Japan, South Korea, Singapore, Malaysia",
    },
    {
      name: "South Asia & Middle East",
      markets: "India, UAE, Saudi Arabia, Turkey",
    },
    {
      name: "Europe & Oceania",
      markets: "Netherlands, Germany, United Kingdom, Australia",
    },
  ],
} as const;

export const PROCESS_EXTENDED_INTRO = {
  headline: "Four commodities. One export path from Sulawesi.",
  copy: "Coconut, copra, cloves, and pepper each move through the same six steps — procured direct from farmers, graded to your spec, tested for moisture and purity, documented in-house, and dispatched from Makassar port.",
} as const;

export type ProcessStepDetail = {
  number: string;
  title: string;
  summary: string;
  details: readonly string[];
};

export const PROCESS_STEP_DETAILS: ProcessStepDetail[] = [
  {
    number: "01",
    title: "Direct Procurement",
    summary:
      "We purchase directly from our vetted farmer network across Sulawesi.",
    details: [
      "Farmer groups are assessed for consistency, volume capacity, and harvest practices.",
      "Purchase terms are agreed before harvest or at farm-gate collection.",
      "Lot numbers are assigned at procurement for end-to-end traceability.",
    ],
  },
  {
    number: "02",
    title: "Sorting & Grading",
    summary:
      "Each batch is sorted and graded against export benchmarks before packing.",
    details: [
      "Visual inspection for size, colour, and foreign matter.",
      "Commodity-specific grading rules applied per buyer specification.",
      "Rejected lots are segregated and never mixed with export-grade stock.",
    ],
  },
  {
    number: "03",
    title: "Quality Control",
    summary:
      "Laboratory and field checks confirm moisture, oil yield, and contamination levels.",
    details: [
      "Moisture content tested per international standards.",
      "Copra oil yield and FFA levels verified where applicable.",
      "Clove essential oil content and pepper bulk density checked per lot.",
    ],
  },
  {
    number: "04",
    title: "Documentation",
    summary:
      "All export documents are prepared in-house before shipment.",
    details: [
      "Certificate of Origin (COO / SKA) coordinated with local chamber.",
      "Phytosanitary Certificate arranged through Barantan.",
      "Commercial Invoice, Packing List, and Bill of Lading prepared and cross-checked.",
    ],
  },
  {
    number: "05",
    title: "Packaging & Loading",
    summary:
      "Product is packed to buyer specification under direct supervision.",
    details: [
      "Packaging format confirmed per order: bulk, PP sacks, cartons, or net bags.",
      "Containers inspected for cleanliness before loading.",
      "Loading supervised to prevent damage and ensure weight accuracy.",
    ],
  },
  {
    number: "06",
    title: "Shipment Dispatch",
    summary:
      "Container sealed, documents submitted, and tracking shared with the buyer.",
    details: [
      "Bill of Lading and shipping documents transmitted to buyer or agent.",
      "Port departure and transit updates provided on request.",
      "Post-delivery support for any documentation queries.",
    ],
  },
];

export const QA_COMMITMENTS = [
  {
    title: "Lot-level testing",
    copy: "Every export lot passes moisture and visual checks. Copra, cloves, and pepper receive additional parameter testing aligned with buyer specs.",
  },
  {
    title: "No commingling",
    copy: "Export-grade stock is never mixed with sub-grade or rejected material. Segregation is maintained from farm gate through container loading.",
  },
  {
    title: "Buyer-spec alignment",
    copy: "Grading rules, packaging format, and MOQ are confirmed in writing before procurement begins. What we quote is what we ship.",
  },
] as const;

export const LEGALITY_EXTENDED = {
  intro:
    "For an international buyer, a supplier's legal standing is not a box to tick. It is the foundation of every shipment, every payment, and every long-term supply agreement.",
  buyerVerification:
    "Qualified buyers may request copies of our business registration, trade license, and sample export documentation before placing their first order. We respond to verification requests within 2 business days.",
  perShipmentDocs: [
    "Phytosanitary Certificate (issued per shipment by Barantan)",
    "Certificate of Origin / SKA (issued per shipment via Kadin or Disperindag)",
    "Commercial Invoice and Packing List (prepared in-house)",
    "Bill of Lading (coordinated with freight forwarder)",
  ],
} as const;

export const PRODUCTS_OVERVIEW = {
  intro:
    "Four commodities from Sulawesi: coconut, copra, cloves, and pepper. Each lot is graded to buyer spec and cleared for export before dispatch from Makassar.",
  qualityHeadline: "Same QC standard on every commodity",
  qualityCopy:
    "A 20ft container of coconut and a 100kg pepper order run through the same moisture checks, grading rules, and document set. The volume changes. The standard does not.",
  sourcingRegions: [
    {
      commodity: "Coconut & Copra",
      region: "Coastal Sulawesi",
      note: "Vetted groves and sun-drying cooperatives within reach of Makassar.",
    },
    {
      commodity: "Cloves",
      region: "Highland spice belt",
      note: "Hand-picked lots with farm-level traceability and high essential oil content.",
    },
    {
      commodity: "Pepper",
      region: "Growing regions across Sulawesi",
      note: "Black and white pepper sorted and cleaned to international specifications.",
    },
  ],
} as const;

export const CONTACT_FAQ = [
  {
    question: "What is your typical response time?",
    answer:
      "We respond to formal inquiries within 24 hours on business days. WhatsApp messages are typically answered within the hour during office hours (Mon-Sat, 08:00-17:00 WIB).",
  },
  {
    question: "Can I request product samples before ordering?",
    answer:
      "Yes. Samples are available for qualified buyers on cloves and pepper (from 100kg MOQ products) and by arrangement for coconut and copra container orders. Contact us with your company details and product interest.",
  },
  {
    question: "What documents do you provide per shipment?",
    answer:
      "Standard export set includes Commercial Invoice, Packing List, Certificate of Origin, Phytosanitary Certificate, and Bill of Lading. Additional certificates can be arranged per buyer market requirements.",
  },
  {
    question: "What are your minimum order quantities?",
    answer:
      "Coconut and copra: 1 x 20ft container (FCL). Cloves and pepper: from 100kg. Larger or recurring orders can be discussed for preferential terms.",
  },
  {
    question: "Do you work with freight forwarders?",
    answer:
      "Yes. We coordinate with buyer-nominated forwarders or can recommend partners familiar with Makassar port operations. All loading is supervised in-house.",
  },
] as const;

export const HOME_TEASERS = {
  about:
    "Based in Makassar, we buy from vetted farmer groups, grade in-house, and prepare export documents before anything leaves Sulawesi.",
  process:
    "Six fixed stages: procurement, grading, QC, documentation, packing, and port dispatch. Every lot is tested and traceable.",
  legality:
    "Active NIB and SIUP registration. Legal entity filed with Kemenkumham. Phytosanitary and COO issued per shipment.",
  contact:
    "Share your product, volume, and destination port. We reply within 24 hours with stock, pricing, and sample options.",
} as const;
