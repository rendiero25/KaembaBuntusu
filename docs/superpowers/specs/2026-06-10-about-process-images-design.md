# About & Process Page Images — Design Spec

**Date:** 2026-06-10  
**Status:** Approved (pending implementation)  
**Scope:** `/about`, `/process` — placeholder images, swap-ready for client photos

---

## Context

Both pages are currently text-only. The site already uses real photos for hero and products. Client photos for operations are not available yet (Option B). We prepare semantic image slots and branded gradient placeholders; client replaces files later without layout changes.

**Constraints:**
- No Unsplash / stock photography
- `next/image` with explicit dimensions
- `rounded-sm` max, CSS variables for color
- GSAP `data-reveal` on image wrappers
- Match existing B2B editorial tone (Outfit, gold/ivory/forest)

---

## Hero Images (About & Process)

### Recommended pattern: **Split PageHero**

Extend `PageHeader` → `PageHero` with optional `image` prop. Layout mirrors product detail header:

```
┌─────────────────────────────────────────────────┐
│  pt-24 (clear fixed nav)                        │
│  ┌──────────────────┬──────────────────────┐  │
│  │ LABEL (gold mono)│                      │  │
│  │ H1 display       │   hero.jpg           │  │
│  │ description      │   aspect-[4/3]       │  │
│  │                  │   rounded-sm border  │  │
│  └──────────────────┴──────────────────────┘  │
│  home-tone-gold band, border-b                  │
└─────────────────────────────────────────────────┘
```

Mobile: image stacks **below** title block (image first optional — **below** copy for SEO/read order).

### About hero — `public/images/about/hero.jpg`

| Field | Value |
|---|---|
| **Narrative** | Bridge between Sulawesi's land and the global market |
| **Ideal client photo** | Wide shot: coastal coconut groves, highland farms, or Makassar horizon — feels "origin + ambition" |
| **Placeholder** | Warm forest gradient, subtle gold wash lower-right (suggest horizon/light) |
| **Alt** | `South Sulawesi agricultural landscape — export origin of Kaemba Buntusu Indonesia` |
| **Dimensions** | 1600 × 1200 (4:3) |

### Process hero — `public/images/process/hero.jpg`

| Field | Value |
|---|---|
| **Narrative** | One uncompromising path from farm to port |
| **Ideal client photo** | Warehouse interior, sorting line, or containers at Makassar port — operational credibility |
| **Placeholder** | Deep canopy gradient with horizontal gold accent band (suggests pipeline/path, not literal) |
| **Alt** | `Export operations facility — quality control and shipment preparation in Makassar` |
| **Dimensions** | 1600 × 1200 (4:3) |

### Hero alternatives considered (not chosen)

| Option | Why rejected |
|---|---|
| Full-bleed background (homepage-style) | Competes with homepage hero; heavier LCP on inner pages |
| Thin `21:9` strip only | Weak impact for primary page identity |
| No hero image | User requested hero treatment |

---

## Body Images (Approach B)

### About page — 2 body images

| File | Placement | Narrative | Client photo ideal |
|---|---|---|---|
| `origin.jpg` | Intro section — grid beside first paragraphs | Direct sourcing from Sulawesi farms | Farmer network, harvest, grove |
| `makassar-hub.jpg` | Market reach section — above or beside region cards | Strategic port hub | Soekarno-Hatta port, cargo, vessels |

### Process page — 3 body images

| File | Placement | Narrative | Client photo ideal |
|---|---|---|---|
| `overview.jpg` | Full-width band after hero, before step list | End-to-end operational path | Facility exterior or loading yard |
| `procurement.jpg` | Step 01 — grid right column | Farm-gate procurement | Farmers / collection point |
| `quality-control.jpg` | Step 03 — grid right column | QC & testing | Lab inspection, moisture check |

Steps 02, 04, 05, 06 remain text-only for rhythm.

---

## File structure

```
public/images/about/
  hero.jpg
  origin.jpg
  makassar-hub.jpg

public/images/process/
  hero.jpg
  overview.jpg
  procurement.jpg
  quality-control.jpg
```

**Swap protocol:** Client replaces JPG in place. Update `alt` in constants only if subject changes. No component edits required.

---

## Data layer

Add to `lib/constants.ts` (or `lib/pageImages.ts`):

```ts
type PageImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const ABOUT_IMAGES = {
  hero: PageImage,
  origin: PageImage,
  makassarHub: PageImage,
} as const;

export const PROCESS_IMAGES = {
  hero: PageImage,
  overview: PageImage,
  procurement: PageImage,
  qualityControl: PageImage,
} as const;
```

---

## Components

### `ContentImage.tsx`

- Props: `image: PageImage`, `className`, `priority?`, `sizes?`
- Implementation: same as `ProductImage` — `fill` inside `relative` container, `object-cover`, no gradient overlay
- Parent supplies height via `className` (`aspect-[4/3]`, `h-48 md:h-64`, etc.)

### `PageHero.tsx`

- Props: `label`, `title`, `description`, `image: PageImage`, `priority?`
- Replaces `PageHeader` on About and Process pages only
- Keeps `home-tone-gold`, nav clearance `pt-24 md:pt-28`
- `data-reveal` on text blocks and image wrapper

---

## Placeholder generation

Create 7 branded JPEG placeholders (not CSS-only) so:
- `next/image` optimization path matches production
- Client sees realistic crop/aspect before swap
- No broken image flash

Visual recipe per placeholder:
- Base: `#0D1B0F` → `#050D07` diagonal gradient
- Accent: `rgba(200, 151, 62, 0.15)` wash or band
- No text, no stock icons, no fake people
- Export ~1600px wide, JPEG quality 85

---

## Animation

- Hero image: `data-reveal` fade/slide with page motion (no opacity:0 on image if it causes load issues — use wrapper reveal only)
- Body images: `data-reveal` stagger with existing `PageMotion`
- `prefers-reduced-motion`: show immediately

---

## Out of scope (phase 2)

- Homepage About/Process teaser images
- OG image per page (still uses global `og-image.jpg`)
- Video or 360° content

---

## Success criteria

1. About and Process pages have visible hero images above the fold on desktop
2. All 7 slots use swap-ready paths under `public/images/`
3. Placeholders match brand palette; no stock photography
4. Layout responsive: single column mobile, split desktop
5. TypeScript strict, `next/image` throughout
6. Client can replace any JPG without code changes

---

## Implementation order

1. Constants + `ContentImage` + `PageHero`
2. Generate 7 placeholder JPEGs
3. Wire `AboutPageContent` (hero + 2 body)
4. Wire `ProcessPageContent` (hero + overview band + 2 step images)
5. Visual QA light/dark mode + mobile
6. `tsc --noEmit`
