#!/usr/bin/env node

/**
 * Pre-launch smoke checks for navigation and WhatsApp links.
 * Run: node scripts/qa-smoke.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? "6282292250444";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kaembaexport.com";

const NAV_HREFS = [
  "/#products",
  "/#about",
  "/#process",
  "/#legality",
  "/#contact",
];

const PRODUCT_SLUGS = ["coconut", "copra", "cloves", "pepper", "cacao-bean"];

function read(path) {
  return readFileSync(join(root, path), "utf8");
}

function assert(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

const failures = [];

assert(existsSync(join(root, "public/og-image.jpg")), "public/og-image.jpg exists");

const constants = read("lib/constants.ts");
assert(
  constants.includes(`process.env.NEXT_PUBLIC_WA_NUMBER`),
  "WA number reads from NEXT_PUBLIC_WA_NUMBER",
);
assert(constants.includes("wa.me/${WA_NUMBER}"), "WA_LINK uses WA_NUMBER env variable");

for (const href of NAV_HREFS) {
  assert(constants.includes(`"${href}"`), `NAV_LINKS includes ${href}`);
}

for (const slug of PRODUCT_SLUGS) {
  assert(
    existsSync(join(root, `app/products/[slug]/page.tsx`)),
    "product page route exists",
  );
  assert(constants.includes(`slug: "${slug}"`), `PRODUCTS includes ${slug}`);
}

const layout = read("app/layout.tsx");
assert(layout.includes("getOrganizationJsonLd"), "Organization JSON-LD wired in layout");
assert(layout.includes("@vercel/analytics"), "Vercel Analytics installed");
assert(layout.includes("@vercel/speed-insights"), "Speed Insights installed");

assert(existsSync(join(root, "app/robots.ts")), "app/robots.ts exists");
assert(existsSync(join(root, "app/sitemap.ts")), "app/sitemap.ts exists");
assert(existsSync(join(root, "app/not-found.tsx")), "global not-found page exists");

const hero = read("components/sections/Hero.tsx");
assert(hero.includes("WA_LINK"), "Hero uses WA_LINK constant");

const products = read("components/sections/Products.tsx");
assert(products.includes("getProductSampleLink"), "Products sample links use helper");

if (failures.length > 0) {
  console.error("QA smoke checks failed:\n");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("QA smoke checks passed.");
console.log(`Site URL: ${SITE_URL}`);
console.log(`WhatsApp: ${WA_NUMBER}`);
console.log(`Routes: /, ${PRODUCT_SLUGS.map((s) => `/products/${s}`).join(", ")}`);
