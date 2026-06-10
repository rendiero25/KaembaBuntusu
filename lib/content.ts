export const COMPANY_VALUES = [
  {
    title: "Direct sourcing",
    copy: "Every kilogram we export is traced to vetted farmer networks in South Sulawesi. No brokers, no opaque intermediaries.",
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
    "Kaemba Buntusu Indonesia was founded in Makassar in January 2026 with one conviction: Sulawesi's agricultural wealth deserves a direct, trusted pathway to international markets.",
  paragraphs: [
    "South Sulawesi has supplied the world with coconut, copra, cloves, and pepper for generations. The region's coastal groves, highland spice farms, and pepper fields sit within reach of one of Eastern Indonesia's most strategic export ports.",
    "Yet the path from farm gate to international buyer is often long and opaque. Middlemen add cost without adding trust. Documentation gets fragmented across agents. Quality varies batch to batch.",
    "We built Kaemba to close that gap. By sourcing directly from farmers, grading in-house, and preparing export paperwork under one roof, we give international buyers a supplier they can verify, not just believe.",
    "Our team operates from Buntusu, Tamalanrea, Makassar City. From here we coordinate procurement across South Sulawesi, quality control at our packing facility, and shipment through Soekarno-Hatta International Port.",
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
  headline: "From farm gate to your warehouse",
  copy: "Every shipment follows the same path. No shortcuts, no undocumented handoffs. Below is the full operational sequence we run for every export order.",
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
      "We purchase directly from our vetted farmer network across South Sulawesi.",
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
    "We export four core agricultural commodities from South Sulawesi. Each product passes through the same quality and documentation pipeline before a single kilogram leaves Indonesia.",
  qualityHeadline: "One standard across every commodity",
  qualityCopy:
    "Whether you are sourcing a full container of coconut or a 100kg lot of cloves, the same grading discipline, moisture controls, and export documentation process applies.",
  sourcingRegions: [
    {
      commodity: "Coconut & Copra",
      region: "Coastal South Sulawesi",
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
    "Founded in Makassar, we connect Sulawesi farmers directly to international buyers with export-grade quality and in-house documentation.",
  process:
    "Six defined stages from farm-gate procurement through container dispatch. Every lot tested, every document prepared in-house.",
  legality:
    "Fully registered Indonesian export business. NIB, SIUP, and legal entity standing active. Export certificates available per shipment.",
  contact:
    "Tell us what you need. We respond within 24 hours with availability, pricing, and sample options where relevant.",
} as const;
