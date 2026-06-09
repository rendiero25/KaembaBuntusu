# CLAUDE.md — CV. Kaemba Buntusu Indonesia

> Living document. Update this file whenever stack decisions, design choices, or conventions change.
> Last updated: June 2026

---

## What This Project Is

Company profile website for **CV. Kaemba Buntusu Indonesia** — an agricultural commodity export company based in Makassar, South Sulawesi. They export Coconut, Copra, Cloves, and Pepper to international buyers.

The site's job is simple: make a first-time international buyer trust them enough to send an inquiry. That means trust signals, compliance documentation, product specs, and a clear contact path — all wrapped in a visual identity that doesn't look like every other Indonesian SME export site.

**Single-page structure** (homepage carries all sections). Product detail pages are secondary.

---

## Tech Stack

```
Framework:     Next.js 15 (App Router, React 19)
Language:      TypeScript 5 (strict mode)
Styling:       Tailwind CSS v4 + CSS custom properties
UI:            shadcn/ui (forms only — no bloated component usage)
Animation:     GSAP 3 + ScrollTrigger, SplitText, DrawSVG, Flip
3D:            Three.js r160 (custom Earth globe, lazy-loaded)
Scroll:        Lenis 1.x (integrated with GSAP ScrollTrigger)
Email:         Resend (contact form via Server Action)
Analytics:     Vercel Analytics + Speed Insights
Deploy:        Vercel (Edge CDN, main → prod, dev → preview)
```

**Package manager:** pnpm  
**Node:** 20+

---

## Architecture Decisions

### Why App Router
Server Components for SEO-critical sections (hero copy, legality, product specs). Client Components only where animation or interaction is needed. Don't mix SSR/client unnecessarily.

### Why GSAP over Framer Motion
GSAP gives direct timeline control needed for the preloader sequence, horizontal product scroll, and SVG DrawSVG process animation. Framer Motion's declarative API fights these patterns.

### Three.js Globe — Lazy Loaded
The globe (`components/three/Globe.tsx`) must use `next/dynamic` with `ssr: false`. It's the single most expensive asset. Defer it until after the preloader resolves.

```tsx
const Globe = dynamic(() => import('@/components/three/Globe'), { ssr: false })
```

### Lenis + GSAP Integration
Always init Lenis first, then pass it to ScrollTrigger's scroller. This is the canonical pattern:

```ts
// lib/lenis.ts
const lenis = new Lenis()
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

Disable Lenis on mobile (`window.matchMedia('(pointer: coarse)').matches`).

### Resend Contact Form
Use Next.js Server Action, not a separate API route. Validate with Zod before sending. Rate-limit in middleware.

---

## File Structure

```
kaemba-web/
├── app/
│   ├── page.tsx                    # Homepage (all sections)
│   ├── layout.tsx                  # Root layout + fonts + metadata
│   ├── globals.css                 # Tailwind + CSS custom properties
│   ├── products/
│   │   └── [slug]/page.tsx         # Product detail pages
│   └── api/
│       └── contact/route.ts        # Fallback route (use Server Action instead)
├── components/
│   ├── three/
│   │   └── Globe.tsx               # Three.js Earth globe
│   ├── gsap/
│   │   ├── SplitTextReveal.tsx     # Reusable headline reveal
│   │   ├── ScrollReveal.tsx        # Fade/slide reveal on scroll
│   │   └── Preloader.tsx           # 000→100 counter + curtain
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Ticker.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── WhyUs.tsx
│   │   ├── Process.tsx
│   │   ├── Legality.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── FloatingWA.tsx          # Persistent WhatsApp button
│   │   ├── NavBar.tsx
│   │   └── Footer.tsx
│   └── forms/
│       └── InquiryForm.tsx         # shadcn/ui form + Resend Server Action
├── lib/
│   ├── gsap.ts                     # GSAP plugin registration
│   ├── lenis.ts                    # Lenis init + ScrollTrigger bridge
│   ├── constants.ts                # Product data, nav links
│   └── actions.ts                  # Server Actions (contact form)
├── public/
│   ├── fonts/                      # Self-hosted: Clash Display, Space Grotesk
│   ├── images/
│   │   ├── products/               # coconut.jpg, copra.jpg, cloves.jpg, pepper.jpg
│   │   └── og-image.jpg            # OG image 1200×630
│   └── textures/                   # Three.js Earth textures
├── CLAUDE.md                       # This file
├── .cursorrules
├── task.md
└── .env.example
```

---

## Design System

### Colors

```css
/* globals.css */
:root {
  --color-bg:           #050D07;  /* Forest night — primary background */
  --color-surface:      #0D1B0F;  /* Deep canopy — card surfaces */
  --color-gold:         #C8973E;  /* Spice gold — primary accent, CTAs */
  --color-ivory:        #EDE8DF;  /* Ivory harvest — headlines, primary text */
  --color-red:          #D4542E;  /* Makassar red — secondary accent, warnings */
  --color-sage:         #607662;  /* Muted sage — secondary text, labels */
  --color-border:       rgba(237, 232, 223, 0.08); /* Subtle dividers */
}
```

**Palette logic:**
- Never use pure white or pure black
- Gold is for CTAs, highlights, active states — use sparingly
- Makassar red is a punctuation mark, not a background
- Sage is for metadata, captions, supporting text — not for anything the user needs to read first

### Typography

```css
/* Font roles */
--font-display: 'Clash Display', sans-serif;    /* Headlines, hero, section titles */
--font-heading: 'Space Grotesk', sans-serif;    /* Card titles, sub-sections */
--font-body:    'Plus Jakarta Sans', sans-serif; /* Body copy, UI text */
--font-mono:    'DM Mono', monospace;            /* Specs, labels, data */
```

**Scale:**
```
Display XL:  Clash Display 700, clamp(64px, 8vw, 120px), letter-spacing -0.03em
Display L:   Clash Display 700, clamp(40px, 5vw, 72px),  letter-spacing -0.02em
Heading:     Space Grotesk 600, 24–40px, letter-spacing -0.01em
Body:        Plus Jakarta Sans 400, 15–18px, line-height 1.6
Label:       DM Mono 400, 11–13px, letter-spacing 0.08em, uppercase
Caption:     Plus Jakarta Sans 400, 13px, color: var(--color-sage)
```

**Font loading:** Self-host via `next/font/local` in `layout.tsx`. No Google Fonts CDN — eliminates render-blocking.

### Spacing

Base unit: 4px. Use Tailwind's spacing scale. Section padding: `py-24 md:py-32 lg:py-40`. No custom spacing unless Tailwind's scale doesn't cover it.

### Border Radius

Cards/surfaces: `rounded-sm` (4px). Buttons: `rounded-sm`. No pill buttons — they look consumer app, not export/B2B.

### Motion Tokens

```ts
// lib/constants.ts
export const EASE = {
  out:    'power2.out',
  inOut:  'power3.inOut',
  expo:   'expo.out',
  back:   'back.out(1.2)',
} as const

export const DURATION = {
  fast:   0.3,
  base:   0.6,
  slow:   0.9,
  xslow:  1.4,
} as const
```

---

## Site Content & Copywriting

All copy below is final (or near-final). Use this exactly unless the client requests edits.

---

### 00 · Preloader

```
Counter:     000 → 100 (DM Mono, gold, centered)
Sub-label:   "Loading" (DM Mono, sage, uppercase, 11px)
Brand reveal: K · A · E · M · B · A (char by char, stagger 0.06s, y: 100→0)
Exit:        Curtain wipe top-to-bottom, 0.8s expo.inOut
Duration:    ~2.2s total
```

---

### 01 · Hero

**Eyebrow (DM Mono, gold):**
```
MAKASSAR · SOUTH SULAWESI · EST. JANUARY 2026
```

**Headline (Clash Display, ivory, clamp 64–120px):**
```
Connecting Sulawesi's
finest resources to
the global market.
```

**Subheadline (Plus Jakarta Sans, sage, 18px):**
```
We export premium agricultural commodities — Coconut, Copra, Cloves,
and Pepper — directly from South Sulawesi to international buyers.
No middlemen. Clean documentation. Consistent quality.
```

**CTAs:**
```
Primary:   "Explore Products" (gold fill button)
Secondary: "WhatsApp Us" (ghost button, opens wa.me link)
```

**Trust badges (DM Mono, uppercase, 11px):**
```
✦ EXPORT GRADE A   ✦ FULLY LICENSED   ✦ MAKASSAR PORT   ✦ DIRECT SOURCING
```

**Background:** Three.js Earth globe — Sulawesi highlighted in gold, particle trade routes to Japan, China, South Korea, India, UAE, Netherlands.

---

### 02 · Ticker / Marquee

```
COCONUT  ·  COPRA  ·  CLOVES  ·  PEPPER  ·  MAKASSAR PORT  ·
SOUTH SULAWESI  ·  EXPORT GRADE A  ·  DIRECT FROM FARM  ·
FULLY LICENSED  ·  INTERNATIONAL SHIPPING  ·
```

Speed: 40s loop. Reverse on hover. Font: DM Mono, uppercase, ivory/30% opacity alternating with gold for dot separators.

---

### 03 · About

**Section label (DM Mono, gold, uppercase):**
```
ABOUT THE COMPANY
```

**Headline (Clash Display, ivory):**
```
We are the bridge.
```

**Sub-headline (Space Grotesk, sage):**
```
Between Sulawesi's extraordinary land and the world's growing demand.
```

**Body copy (Plus Jakarta Sans, ivory/80%, 17px):**
```
Founded in Makassar in January 2026, Kaemba Buntusu Indonesia was
built on a single conviction: the agricultural wealth of Sulawesi
deserves a direct, trusted pathway to international markets.

South Sulawesi has been feeding the world for centuries — through
its coconut groves, clove-covered hillsides, and peppercorn fields.
Yet too often, the value chain between farmer and global buyer is
long, opaque, and inefficient.

We exist to change that.

By building direct relationships with vetted local farmers, maintaining
strict quality standards at every step, and handling the full export
documentation process in-house, we ensure that what reaches your
warehouse is exactly what we promised.

No middlemen. No surprises. Just clean product, clean paperwork,
and a supplier that picks up the phone.
```

**Vision block (Surface card, border-left gold):**
```
"To become a leading export house from Eastern Indonesia —
recognized globally for transparency, product quality,
and community-driven sourcing."
— Our founding vision
```

**Stats row:**
```
4        1              100%
—        —              —
Core     Strategic      Direct
Commodities  Hub        Sourcing
```

**Layout:** Pinned left column (headline + stats), scrollable right column (body copy). ScrollTrigger pin.

---

### 04 · Products

**Section label (DM Mono, gold, uppercase):**
```
WHAT WE EXPORT
```

**Headline (Clash Display, ivory):**
```
Export-grade commodities,
sourced directly from
Sulawesi's soil.
```

**Sub-headline:**
```
Every product we export passes through our quality check
before a single kilogram leaves the warehouse.
```

---

**Product 01 — Coconut**

```
Number:      01
Name:        Coconut
Tagline:     Fresh from the grove, packed for the world.
Description: Selected coconuts from Sulawesi's coastal farms.
             Harvested at peak maturity, sorted by size and moisture
             content, and packed to international food safety standards.
Specs:
  Size:        Medium / Large (per buyer spec)
  Moisture:    ≤8%
  Packaging:   Per buyer specification
  Packing:     Bulk / Net bags
  MOQ:         1 × 20ft container
Grade:       Export Grade A
```

---

**Product 02 — Copra**

```
Number:      02
Name:        Copra
Tagline:     High oil yield. Low moisture. No compromise.
Description: Sun-dried copra from South Sulawesi with consistent oil
             yield and controlled moisture. Suitable for industrial
             oil processing and food-grade extraction.
Specs:
  Moisture:    ≤6%
  Oil yield:   65–68%
  FFA:         Max 3%
  Packaging:   50kg woven PP sacks
  MOQ:         1 FCL
Grade:       Export Grade A
```

---

**Product 03 — Cloves**

```
Number:      03
Name:        Cloves
Tagline:     Sulawesi's signature spice. Pure, aromatic, traceable.
Description: Hand-picked cloves from South Sulawesi's highland farms.
             Known globally for their high essential oil content and
             deep, complex aroma. Sourced with farm-level traceability.
Specs:
  Moisture:      10–14%
  Essential oil: ≥15%
  Foreign matter: Max 1%
  Origin:        South Sulawesi, Indonesia
  Packaging:     PP woven bags / cartons
  MOQ:           100kg
Grade:         Export Grade A
```

---

**Product 04 — Pepper**

```
Number:      04
Name:        Pepper
Tagline:     Two variants. One uncompromising standard.
Description: Black and white pepper, sorted and cleaned to
             international specifications. Consistent pungency,
             minimal impurities, ready for industrial or
             retail repackaging.
Variants:
  Black Pepper:
    Bulk density:   ≥550g/L
    Moisture:       ≤12%
    Foreign matter: ≤0.5%

  White Pepper:
    Impurity:          <1%
    Moisture:          ≤13%
    Black admixture:   ≤2%

Packaging:   Bulk / 50kg PP sacks
MOQ:         100kg
Grade:       Export Grade A
```

**Layout:** Horizontal scroll, GSAP pinned. 4 cards left-to-right. Progress indicator at bottom.

---

### 05 · Why Choose Us

**Section label (DM Mono, gold, uppercase):**
```
WHY KAEMBA
```

**Headline (Clash Display, ivory):**
```
Three reasons buyers
keep coming back.
```

---

**Reason 01**

```
Number:  01
Title:   No middlemen. Just farmers.
Copy:    We source directly from vetted farmer networks across South
         Sulawesi. This means better pricing, genuine traceability, and
         a supply chain you can actually verify — not just trust.
Icon:    Farm/leaf SVG
```

---

**Reason 02**

```
Number:  02
Title:   Every document, every shipment.
Copy:    Certificate of Origin. Phytosanitary Certificate. Commercial
         Invoice. Packing List. Bill of Lading. We handle compliance
         paperwork in-house so you never have to chase documentation.
Icon:    Document/checklist SVG
```

---

**Reason 03**

```
Number:  03
Title:   Eastern Indonesia's premier port city.
Copy:    Makassar's Soekarno-Hatta International Port gives us direct
         access to major shipping routes across Asia, the Middle East,
         and Europe. Shorter transit, lower freight, fewer connections.
Icon:    Port/anchor SVG
```

---

### 06 · Process

**Section label (DM Mono, gold, uppercase):**
```
HOW WE WORK
```

**Headline (Clash Display, ivory):**
```
Every shipment follows
one uncompromising path.
```

**Sub-headline:**
```
From farm gate to your warehouse door — here's exactly how we operate.
```

**Process steps (SVG DrawSVG timeline, sequential reveal):**

```
Step 01 — Direct Procurement
  "We purchase directly from our vetted farmer network, ensuring
  price fairness and product consistency from the very first step."

Step 02 — Sorting & Grading
  "Each batch is sorted, graded, and inspected against our quality
  benchmarks before entering the packing facility."

Step 03 — Quality Control
  "Moisture content, oil yield, visual inspection, and contamination
  checks — every lot is tested before it gets a green light."

Step 04 — Documentation
  "We prepare all required export documents: COO, Phytosanitary
  Certificate, Commercial Invoice, Packing List, and coordinate B/L."

Step 05 — Packaging & Loading
  "Product is packed to buyer specification and loaded under direct
  supervision into inspected, clean containers."

Step 06 — Shipment Dispatch
  "Container sealed, documents submitted. We provide tracking updates
  from port of origin through to destination port."
```

---

### 07 · Legality & Compliance

**Section label (DM Mono, gold, uppercase):**
```
LEGAL STANDING
```

**Headline (Clash Display, ivory):**
```
Fully licensed.
Export-ready.
```

**Sub-headline:**
```
For an international buyer, a supplier's legal standing
isn't a box to tick — it's the foundation of trust.
```

**Compliance badges (grid layout, green checkmark + gold border on hover):**

```
✓  NIB — Nomor Induk Berusaha
   Status: Active
   Indonesia's unified business registration number

✓  SIUP — Surat Izin Usaha Perdagangan
   Status: Active
   Trade business license

✓  SK Kemenkumham
   Status: Registered
   Legal entity registration — Ministry of Law & Human Rights

✓  Phytosanitary Certificate
   Status: Available per shipment
   Issued by Indonesia's agricultural authority (Barantan)

✓  Certificate of Origin (COO / SKA)
   Status: Available per shipment
   Issued by local Chamber of Commerce (Kadin / Disperindag)

✓  Verified Business Bank Account
   Status: Active
   Indonesian registered business account — all transactions traceable
```

**Disclaimer (DM Mono, sage, small):**
```
Complete legal documentation available upon request for qualified buyers.
We believe full transparency is the price of a real business partnership.
```

---

### 08 · Contact

**Section label (DM Mono, gold, uppercase):**
```
GET IN TOUCH
```

**Headline (Clash Display, ivory):**
```
Ready to source
from Sulawesi?
```

**Left column copy:**
```
Whether you're requesting a product sample, placing your first container
order, or exploring a long-term supply arrangement — we want to hear
from you.

Tell us what you need. We'll respond within 24 hours with availability,
current pricing, and a sample offer where relevant.

We're available Monday to Saturday, 08:00 – 17:00 WIB (UTC+8).
```

**Contact details:**
```
WhatsApp:  +62 822 9225 0444
Address:   Buntusu, Tamalanrea, Makassar City,
           South Sulawesi, Indonesia
```

**Inquiry form fields:**
```
Name*           → text input
Company         → text input
Country*        → select (common buyer countries first: China, Japan,
                  South Korea, India, UAE, Netherlands, USA, Other)
Product*        → multi-select: Coconut / Copra / Cloves / Pepper
Message*        → textarea, min 3 rows
Submit          → "Send Inquiry" (gold button)
```

**Form success state:**
```
"Thanks — we've received your inquiry.
We'll be in touch within 24 hours."
```

**Footer hint (below form):**
```
Prefer a faster response? Message us directly on WhatsApp.
We reply within the hour during business hours.
```

---

### Footer

```
Left:
  CV. Kaemba Buntusu Indonesia
  Connecting Sulawesi's finest resources to the global market.
  Makassar · South Sulawesi · Indonesia

Center nav:
  Products    About    Process    Legality    Contact

Right:
  WhatsApp: +62 822 9225 0444
  [WA icon] [Email icon (if available)]

Bottom bar:
  © 2026 CV. Kaemba Buntusu Indonesia  ·  All rights reserved
  Built on Sulawesi. Trusted worldwide.
```

---

## Animation Map

| Component | Trigger | Pattern | Plugin |
|---|---|---|---|
| Preloader | On mount | Counter++, SplitText chars y:100→0 stagger 0.06s, curtain wipe | GSAP |
| Hero headline | After preloader | SplitText lines y:80→0, opacity 0→1, stagger 0.04s | GSAP + SplitText |
| Hero badges | After headline | scale 0.7→1, opacity 0→1, stagger 0.08s | GSAP |
| Globe | Continuous | rotation on mousemove, auto-rotate idle | Three.js |
| Ticker | Continuous | x: 0 → -(50% width), infinite, reverse hover | GSAP |
| About — left | ScrollTrigger | Pin, clip-path left reveal | GSAP ST |
| About — stats | ScrollTrigger | Count-up numbers when in view | GSAP ST |
| Products | ScrollTrigger | Horizontal pin x: 0 → -(totalWidth), card y:40→0 on enter | GSAP ST |
| Why Us | ScrollTrigger | Cards stagger y:80→0, opacity 0→1, 0.15s apart | GSAP ST |
| Process SVG | ScrollTrigger | DrawSVG stroke 0→100%, step labels fade in sequence | GSAP DrawSVG |
| Legality badges | ScrollTrigger | scale 0.85→1, stagger 0.07s, checkmark SVG draw | GSAP ST |
| Contact | ScrollTrigger | Left col x:-60→0, right col x:60→0 simultaneously | GSAP ST |
| FloatingWA | Global | Pulse scale 1→1.06→1, infinite, 2s interval | GSAP |

**Reduced motion:** Wrap all GSAP inits with `if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)`. Skip preloader animation, show content immediately.

---

## GSAP Plugin Registration

```ts
// lib/gsap.ts
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import Flip from 'gsap/Flip'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, DrawSVGPlugin, Flip)
}

export { gsap, ScrollTrigger, SplitText, DrawSVGPlugin, Flip }
```

GSAP plugins (SplitText, DrawSVG) require Club GreenSock license. Store license in `.env.local`.

---

## Environment Variables

```bash
# .env.local

# Resend (contact form)
RESEND_API_KEY=re_...
CONTACT_EMAIL_TO=info@kaembaexport.com

# Site
NEXT_PUBLIC_SITE_URL=https://kaembaexport.com
NEXT_PUBLIC_WA_NUMBER=6282292250444

# Optional: analytics
NEXT_PUBLIC_GA_ID=G-...
```

---

## Key Commands

```bash
pnpm install          # Install deps
pnpm dev              # Dev server (localhost:3000)
pnpm build            # Production build
pnpm lint             # ESLint
pnpm type-check       # tsc --noEmit
```

---

## SEO Metadata

```ts
// app/layout.tsx — base metadata
export const metadata: Metadata = {
  title: 'CV. Kaemba Buntusu Indonesia — Agricultural Commodity Exporter',
  description: 'Premium agricultural commodity exports from South Sulawesi, Indonesia. Coconut, Copra, Cloves, Pepper. Fully licensed, export-grade, direct sourcing.',
  keywords: ['indonesian commodity exporter', 'copra exporter', 'cloves exporter', 'coconut exporter', 'pepper exporter', 'makassar export', 'south sulawesi agriculture'],
  openGraph: {
    title: 'CV. Kaemba Buntusu Indonesia',
    description: 'Agricultural commodity exports from South Sulawesi. Direct sourcing, export-grade quality.',
    images: ['/og-image.jpg'],  // 1200×630
    locale: 'en_US',
    type: 'website',
  },
}
```

---

## Notes & Gotchas

- **Three.js globe must be `ssr: false`** — contains `window`/`document` references
- **SplitText breaks on re-render** — only call `.split()` once, store the instance, revert on cleanup
- **GSAP ScrollTrigger + Lenis** — must call `ScrollTrigger.refresh()` after Lenis is initialized and fonts are loaded
- **Tailwind v4** — uses `@import "tailwindcss"` syntax, not `@tailwind base/components/utilities`
- **Product images** — if client hasn't provided real photos, use placeholder gradients. DO NOT use stock photos of random food.
- **Mobile** — disable horizontal scroll on products section, switch to vertical card stack at `md` breakpoint
- **WA link format** — `https://wa.me/6282292250444?text=Hello%2C%20I%27m%20interested%20in%20your%20products.`
