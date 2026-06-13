export type PageImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const ABOUT_IMAGES = {
  hero: {
    src: "/images/about/hero.jpg",
    alt: "Sulawesi agricultural landscape — export origin of Kaemba Buntusu Indonesia",
    width: 1600,
    height: 1200,
  },
  origin: {
    src: "/images/about/origin.jpg",
    alt: "Direct sourcing from Sulawesi farmer networks and agricultural land",
    width: 1600,
    height: 1200,
  },
  makassarHub: {
    src: "/images/about/makassar-hub.jpg",
    alt: "Makassar strategic export hub — gateway from Eastern Indonesia to global markets",
    width: 1600,
    height: 900,
  },
} as const satisfies Record<string, PageImage>;

export const PROCESS_IMAGES = {
  hero: {
    src: "/images/process-image-hero.png",
    alt: "Export operations — grading, quality control, and shipment preparation in Makassar",
    width: 1920,
    height: 1080,
  },
  overview: {
    src: "/images/process/overview.jpg",
    alt: "End-to-end export path from farm-gate procurement through port dispatch",
    width: 1600,
    height: 686,
  },
  procurement: {
    src: "/images/process/procurement.jpg",
    alt: "Direct procurement from vetted farmer networks across Sulawesi",
    width: 1200,
    height: 900,
  },
  qualityControl: {
    src: "/images/process/quality-control.jpg",
    alt: "Quality control — moisture, grading, and contamination checks before export",
    width: 1200,
    height: 900,
  },
} as const satisfies Record<string, PageImage>;

export const PRODUCTS_IMAGES = {
  hero: {
    src: "/images/product-image-hero.jpg",
    alt: "Export-grade coconut, copra, cloves, and pepper from Sulawesi",
    width: 1920,
    height: 1080,
  },
} as const satisfies Record<string, PageImage>;
