# task.md — CV. Kaemba Buntusu Indonesia
# Build Checklist

> Status legend: [ ] = todo · [x] = done · [-] = skipped/N/A · [~] = in progress

---

## Pre-Build Checklist (Confirm Before Writing Any Code)

- [ ] Domain confirmed (kaembaexport.com or kaemba.co.id)
- [ ] Logo file delivered by client (SVG preferred, PNG fallback)
- [ ] Product photos delivered: Coconut, Copra, Cloves, Pepper
- [ ] Legal document scans ready: NIB, SIUP, SK Kemenkumham
- [ ] WA number confirmed: +62 822 9225 0444
- [ ] Business email confirmed (for contact form recipient)
- [ ] Website language confirmed: English only or bilingual (EN/ID)?
- [ ] GSAP Club license key available (needed for SplitText, DrawSVG)
- [ ] Vercel account access confirmed
- [ ] Resend account created, domain DNS verified

---

## Phase 01 — Project Setup

- [x] Init Next.js 15 project: `pnpm create next-app@latest kaemba-web --typescript --tailwind --app --src-dir no`
- [x] Configure TypeScript strict mode in `tsconfig.json`
- [x] Install core dependencies:
  ```bash
  pnpm add gsap @studio-freight/lenis three @types/three
  pnpm add resend zod react-hook-form @hookform/resolvers
  pnpm add -D @types/node
  ```
- [x] Configure Tailwind CSS v4 (`@import "tailwindcss"` in globals.css)
- [x] Add CSS custom properties (color tokens) to `globals.css`
- [x] Self-host fonts via `next/font/local` in `app/layout.tsx`:
  - Clash Display (700)
  - Space Grotesk (400, 600)
  - Plus Jakarta Sans (400, 500)
  - DM Mono (400)
- [x] Set up font CSS variables: `--font-display`, `--font-heading`, `--font-body`, `--font-mono`
- [x] Create `.env.local` from `.env.example`
- [x] Create `lib/gsap.ts` (plugin registration barrel)
- [x] Create `lib/lenis.ts` (Lenis init + ScrollTrigger bridge)
- [x] Create `lib/constants.ts` (EASE, DURATION, product data, nav links, WA link)
- [x] Create `lib/actions.ts` (Server Action placeholder)
- [x] Init shadcn/ui: `pnpm dlx shadcn@latest init` (minimal, forms only)
- [x] Add shadcn components: `form`, `input`, `textarea`, `select`, `button`
- [x] Set up Git repo: `main` (prod) + `dev` (preview) branches
- [ ] Connect Vercel project: `main` → production, `dev` → preview URL
- [ ] Verify first deploy (empty page) works on Vercel

---

## Phase 02 — Global Layout & Navigation

- [x] `app/layout.tsx`: font variables, metadata (title, description, OG), body class
- [x] `app/globals.css`: Tailwind import, CSS custom properties, base resets
- [x] Create `components/ui/NavBar.tsx`:
  - Logo left, nav links center/right
  - Transparent over hero, solid bg on scroll (ScrollTrigger)
  - Mobile: hamburger → fullscreen menu
  - Links: Products, About, Process, Legality, Contact
- [x] Create `components/ui/Footer.tsx`:
  - Company name + tagline
  - Nav links
  - Contact info (WA number)
  - Copyright bar
- [x] Create `components/ui/FloatingWA.tsx`:
  - Fixed bottom-right
  - WA icon + "Chat with us" label
  - GSAP pulse animation (infinite, 2s)
  - Opens `https://wa.me/{NEXT_PUBLIC_WA_NUMBER}` in new tab
- [x] Apply layout to `app/page.tsx` (all sections imported, Preloader wrapped)

---

## Phase 03 — Preloader

- [x] Create `components/gsap/Preloader.tsx`
- [x] Counter animation: `000` → `100` (DM Mono, gold, centered)
- [x] Brand name reveal: `K · A · E · M · B · A` (SplitText char stagger, y: 100→0)
- [x] Curtain exit animation: full-screen div wipes off top, `expo.inOut`
- [x] Gate with `useState` — hide all page content until preloader exits
- [x] Reduced motion: skip animation, show content immediately
- [x] Fire `onComplete` callback to trigger hero animation start
- [x] Test: preloader shows on every hard refresh, not on client nav

---

## Phase 04 — Hero Section

- [ ] Create `components/sections/Hero.tsx` (`'use client'`)
- [ ] Layout: full viewport height, content centered, globe fills background
- [ ] Eyebrow badge (DM Mono, gold): `MAKASSAR · SOUTH SULAWESI · EST. JANUARY 2026`
- [ ] Headline (Clash Display): 3-line copy — SplitText lines reveal
- [ ] Subheadline (Plus Jakarta Sans, sage): reveal after headline
- [ ] Two CTAs: "Explore Products" (gold button) + "WhatsApp Us" (ghost button)
- [ ] Trust badges row (DM Mono, uppercase): 4 badges with star separator
- [ ] Background vignette: radial gradient overlay so text is readable over globe
- [ ] Lazy-load Globe: `next/dynamic` with `ssr: false` + loading skeleton
- [ ] Scroll indicator: animated arrow pointing down (auto-hides on scroll)
- [ ] GSAP sequence: eyebrow → headline → sub → CTAs → badges (staggered)

---

## Phase 05 — Three.js Globe

- [ ] Create `components/three/Globe.tsx` (`'use client'`)
- [ ] Setup: scene, camera (FOV 50, z: 2.5), WebGLRenderer (alpha: true, antialias)
- [ ] Earth sphere: `SphereGeometry(1, 64, 64)` with dark earth texture
- [ ] Sulawesi highlight: point light or glowing dot at approx. Makassar coords (-5.14°S, 119.43°E)
- [ ] Trade route particle lines: Sulawesi → Japan, China, India, UAE, Netherlands, South Korea
- [ ] Particles: `BufferGeometry` dots for trade routes, gold color, fade in/out along path
- [ ] Atmosphere glow: outer sphere with additive blending shader
- [ ] Auto-rotate: `0.0003` rad/frame
- [ ] Mouse interaction: subtle camera shift on mousemove (desktop only)
- [ ] Pause auto-rotate on interaction, resume after 2s idle
- [ ] Mobile: skip trade lines, reduce particle count 60%, simpler shader
- [ ] Cleanup: dispose geometry, material, textures, renderer, remove listeners
- [ ] Performance: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`

---

## Phase 06 — Ticker / Marquee

- [ ] Create `components/sections/Ticker.tsx` (`'use client'`)
- [ ] Infinite horizontal scroll: duplicate content for seamless loop
- [ ] Speed: ~40s full loop
- [ ] Reverse direction on hover (GSAP `timeScale(-1)`)
- [ ] Font: DM Mono, uppercase, ivory 30% opacity. Gold for `·` separators
- [ ] Content: `COCONUT · COPRA · CLOVES · PEPPER · MAKASSAR PORT · SOUTH SULAWESI · EXPORT GRADE A · DIRECT FROM FARM · FULLY LICENSED · INTERNATIONAL SHIPPING ·`

---

## Phase 07 — About Section

- [ ] Create `components/sections/About.tsx` (`'use client'`)
- [ ] Two-column layout: left (pinned headline + stats) / right (scrollable copy)
- [ ] ScrollTrigger pin: left column stays fixed while right scrolls
- [ ] Section label (DM Mono, gold): `ABOUT THE COMPANY`
- [ ] Headline: "We are the bridge." (Clash Display, large)
- [ ] Sub-headline (Space Grotesk, sage): connecting line
- [ ] Body copy: 4 paragraphs as per CLAUDE.md — clip-path reveal on scroll
- [ ] Vision card: surface background, gold left border, italic quote
- [ ] Stats row: 3 numbers with DM Mono labels (count-up animation on enter)
- [ ] Mobile: stack layout, no pin

---

## Phase 08 — Products Section

- [ ] Create `components/sections/Products.tsx` (`'use client'`)
- [ ] Section header: label + headline + sub-headline
- [ ] Horizontal scroll container: GSAP pin + scrub
- [ ] Product card × 4: number, name, tagline, description, specs table, grade badge
- [ ] Card entry animation: y:40→0 as each card enters the viewport during scroll
- [ ] Progress bar at bottom (tracks horizontal scroll position)
- [ ] Spec rows: DM Mono font, sage labels, ivory values, thin dividers
- [ ] "MOQ" row: always highlighted with gold
- [ ] Product image area: placeholder gradient if no real photo. DO NOT use stock photos.
- [ ] Mobile: switch to vertical card stack, disable horizontal scroll
- [ ] CTA per card: "Request Sample" → opens WA with pre-filled product name

---

## Phase 09 — Why Choose Us Section

- [ ] Create `components/sections/WhyUs.tsx` (`'use client'`)
- [ ] Section label + headline
- [ ] 3 cards: number (DM Mono, gold), title (Space Grotesk), copy (Plus Jakarta Sans)
- [ ] Icon per card: SVG inline (farm/leaf, document/checklist, port/anchor)
- [ ] ScrollTrigger: cards stagger y:80→0, opacity 0→1, 0.15s apart
- [ ] Hover: subtle card lift (`y: -4px`), gold border reveal

---

## Phase 10 — Process Section

- [ ] Create `components/sections/Process.tsx` (`'use client'`)
- [ ] Section label + headline + sub-headline
- [ ] SVG timeline path: vertical or diagonal connecting all 6 steps
- [ ] DrawSVG animation: stroke 0%→100% tied to ScrollTrigger scrub
- [ ] Step nodes: numbered circles (DM Mono, gold outline) that pulse on draw
- [ ] Step content: title (Space Grotesk) + copy (Plus Jakarta Sans)
- [ ] Step labels fade in sequentially as the SVG path reaches each node
- [ ] Mobile: simplified vertical list, no SVG animation (performance)

---

## Phase 11 — Legality & Compliance Section

- [ ] Create `components/sections/Legality.tsx` (`'use client'`)
- [ ] Section label + headline + sub-headline
- [ ] Badge grid: 6 cards in 2×3 or 3×2 layout
- [ ] Each badge: checkmark icon (SVG, draw animation), title, status tag, description
- [ ] Status tag: "Active" (green), "Available per shipment" (gold)
- [ ] ScrollTrigger: badge scale 0.85→1, stagger 0.07s
- [ ] Hover: checkmark redraws, card border glows gold
- [ ] Disclaimer text below grid (DM Mono, sage, small)

---

## Phase 12 — Contact Section

- [ ] Create `components/sections/Contact.tsx` (`'use client'`)
- [ ] Create `components/forms/InquiryForm.tsx` (`'use client'`)
- [ ] Two-column layout: left (copy + contact details) / right (form)
- [ ] Section label + headline
- [ ] Left: intro copy, WA link (opens wa.me), address block
- [ ] Form fields: Name, Company, Country (select), Product (multi-select), Message
- [ ] Zod validation schema (shared client + server)
- [ ] Server Action in `lib/actions.ts` using Resend
- [ ] Form states: default, loading, success, error
- [ ] Success: replace form with confirmation message
- [ ] Error: show inline error, keep form data
- [ ] ScrollTrigger: left col x:-60→0, right col x:60→0 simultaneously
- [ ] Google Maps embed (optional, add as iframe or static map image)

---

## Phase 13 — Product Detail Pages

- [ ] Create `app/products/[slug]/page.tsx`
- [ ] Static params: `coconut`, `copra`, `cloves`, `pepper`
- [ ] Product data from `lib/constants.ts` (no database needed)
- [ ] Sections: hero (product name + tagline), specs table, description, origin story, CTA
- [ ] Metadata: unique title + description per product page
- [ ] Back navigation to homepage products section

---

## Phase 14 — Performance & Accessibility

- [ ] Run Lighthouse on main page: target 90+ Performance, 100 Accessibility
- [ ] All images: `next/image`, WebP, explicit dimensions, `alt` tags
- [ ] Fonts: verify no FOUT (preload critical fonts)
- [ ] Three.js Globe: test on mid-range Android device (Samsung A series)
- [ ] `<meta charset="UTF-8">` and `lang="en"` on `<html>`
- [ ] All interactive elements keyboard-accessible
- [ ] Color contrast: all text passes WCAG AA against background
- [ ] `prefers-reduced-motion`: verify all animations skipped cleanly
- [ ] Verify `ScrollTrigger.refresh()` called after fonts load
- [ ] Check no hydration errors in browser console
- [ ] Remove all `console.log` statements

---

## Phase 15 — SEO & Metadata

- [ ] Root metadata in `app/layout.tsx` (title, description, keywords, OG)
- [ ] OG image created: 1200×630px, `/public/og-image.jpg`
- [ ] Product pages: unique metadata per slug
- [ ] `robots.txt` (allow all)
- [ ] `sitemap.xml` (via `app/sitemap.ts`)
- [ ] Structured data: `Organization` JSON-LD in layout
- [ ] Verify OG tags with og:debugger before going live

---

## Phase 16 — Final QA & Launch

- [ ] Test on Chrome, Firefox, Safari (desktop)
- [ ] Test on iOS Safari (iPhone 13+)
- [ ] Test on Android Chrome (mid-range device)
- [ ] Test contact form end-to-end: fill → submit → receive email
- [ ] Test WA links: all open correct number with pre-filled message
- [ ] Verify all sections render correctly at 1280px, 1440px, 1920px
- [ ] Verify mobile layout at 375px, 390px, 430px
- [ ] Verify preloader → hero animation sequence
- [ ] Verify horizontal scroll on Products works on trackpad and touch
- [ ] Check 404 page is custom-branded
- [ ] Set up Vercel custom domain
- [ ] DNS: A record + CNAME pointing to Vercel
- [ ] Enable Vercel Analytics
- [ ] Final Lighthouse audit on production URL
- [ ] Smoke test all navigation links
- [ ] Hand off access credentials to client

---

## Post-Launch (Optional / Future)

- [ ] Blog / news section (if client wants content marketing)
- [ ] Bilingual toggle (EN/ID) if requested by client
- [ ] Admin panel for contact form submissions (if Resend email isn't enough)
- [ ] WhatsApp Business API integration (auto-reply on inquiry)
- [ ] Product page gallery (once client has real product photos)
- [ ] Video background option for hero (if client provides export/farm footage)
