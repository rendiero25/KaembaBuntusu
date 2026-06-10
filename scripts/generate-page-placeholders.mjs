/**
 * One-off script: branded gradient JPEG placeholders for About & Process pages.
 * Run: node scripts/generate-page-placeholders.mjs
 * Requires: pnpm add -D sharp
 */
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(fileURLToPath(new URL(".", import.meta.url)), "..");

const PLACEHOLDERS = [
  {
    file: "public/images/about/hero.jpg",
    width: 1600,
    height: 1200,
    svg: gradientSvg(1600, 1200, {
      stops: [
        { offset: "0%", color: "#1a2e1f" },
        { offset: "55%", color: "#0d1b0f" },
        { offset: "100%", color: "#050d07" },
      ],
      accent: { x: 1200, y: 900, r: 500, color: "rgba(200,151,62,0.22)" },
    }),
  },
  {
    file: "public/images/about/origin.jpg",
    width: 1600,
    height: 1200,
    svg: gradientSvg(1600, 1200, {
      stops: [
        { offset: "0%", color: "#243828" },
        { offset: "50%", color: "#0d1b0f" },
        { offset: "100%", color: "#1a2e1f" },
      ],
      accent: { x: 400, y: 600, r: 450, color: "rgba(96,118,98,0.25)" },
    }),
  },
  {
    file: "public/images/about/makassar-hub.jpg",
    width: 1600,
    height: 900,
    svg: gradientSvg(1600, 900, {
      stops: [
        { offset: "0%", color: "#0d1b0f" },
        { offset: "60%", color: "#152318" },
        { offset: "100%", color: "#1a2830" },
      ],
      accent: { x: 1100, y: 450, r: 400, color: "rgba(200,151,62,0.18)" },
    }),
  },
  {
    file: "public/images/process/hero.jpg",
    width: 1600,
    height: 1200,
    svg: gradientSvg(1600, 1200, {
      stops: [
        { offset: "0%", color: "#050d07" },
        { offset: "45%", color: "#0d1b0f" },
        { offset: "100%", color: "#121f14" },
      ],
      band: { y: 540, height: 4, color: "rgba(200,151,62,0.55)" },
    }),
  },
  {
    file: "public/images/process/overview.jpg",
    width: 1600,
    height: 686,
    svg: gradientSvg(1600, 686, {
      stops: [
        { offset: "0%", color: "#0d1b0f" },
        { offset: "100%", color: "#1a2e1f" },
      ],
      band: { y: 320, height: 2, color: "rgba(200,151,62,0.4)" },
    }),
  },
  {
    file: "public/images/process/procurement.jpg",
    width: 1200,
    height: 900,
    svg: gradientSvg(1200, 900, {
      stops: [
        { offset: "0%", color: "#2a2418" },
        { offset: "50%", color: "#0d1b0f" },
        { offset: "100%", color: "#243828" },
      ],
      accent: { x: 300, y: 500, r: 350, color: "rgba(200,151,62,0.15)" },
    }),
  },
  {
    file: "public/images/process/quality-control.jpg",
    width: 1200,
    height: 900,
    svg: gradientSvg(1200, 900, {
      stops: [
        { offset: "0%", color: "#121f14" },
        { offset: "50%", color: "#1a2e1f" },
        { offset: "100%", color: "#0d1b0f" },
      ],
      accent: { x: 600, y: 450, r: 280, color: "rgba(237,232,223,0.06)" },
    }),
  },
];

function gradientSvg(width, height, { stops, accent, band }) {
  const stopMarkup = stops
    .map((s) => `<stop offset="${s.offset}" stop-color="${s.color}"/>`)
    .join("");
  const accentMarkup = accent
    ? `<circle cx="${accent.x}" cy="${accent.y}" r="${accent.r}" fill="${accent.color}"/>`
    : "";
  const bandMarkup = band
    ? `<rect x="0" y="${band.y}" width="${width}" height="${band.height}" fill="${band.color}"/>`
    : "";

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">${stopMarkup}</linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    ${accentMarkup}
    ${bandMarkup}
  </svg>`;
}

for (const item of PLACEHOLDERS) {
  const outPath = join(root, item.file);
  await mkdir(dirname(outPath), { recursive: true });
  await sharp(Buffer.from(item.svg)).jpeg({ quality: 85 }).toFile(outPath);
  console.log(`Wrote ${item.file}`);
}
