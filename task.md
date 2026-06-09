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

- [x] Create `components/sections/Hero.tsx` (`'use client'`)
- [x] Layout: full viewport height, content centered, globe fills background
- [x] Eyebrow badge (DM Mono, gold): `MAKASSAR · SOUTH SULAWESI · EST. JANUARY 2026`
- [x] Headline (Clash Display): 3-line copy — SplitText lines reveal
- [x] Subheadline (Plus Jakarta Sans, sage): reveal after headline
- [x] Two CTAs: "Explore Products" (gold button) + "WhatsApp Us" (ghost button)
- [x] Trust badges row (DM Mono, uppercase): 4 badges with star separator
- [x] Background vignette: radial gradient overlay so text is readable over globe
- [x] Lazy-load Globe: `next/dynamic` with `ssr: false` + loading skeleton
- [x] Scroll indicator: animated arrow pointing down (auto-hides on scroll)
- [x] GSAP sequence: eyebrow → headline → sub → CTAs → badges (staggered)

---

## Phase 05 — Three.js Globe

- [x] Create `components/three/Globe.tsx` (`'use client'`)
- [x] Setup: scene, camera (FOV 50, z: 2.5), WebGLRenderer (alpha: true, antialias)
- [x] Earth sphere: `SphereGeometry(1, 64, 64)` with dark earth texture
- [x] Sulawesi highlight: point light or glowing dot at approx. Makassar coords (-5.14°S, 119.43°E)
- [x] Trade route particle lines: Sulawesi → Japan, China, India, UAE, Netherlands, South Korea
- [x] Particles: `BufferGeometry` dots for trade routes, gold color, fade in/out along path
- [x] Atmosphere glow: outer sphere with additive blending shader
- [x] Auto-rotate: `0.0003` rad/frame
- [x] Mouse interaction: subtle camera shift on mousemove (desktop only)
- [x] Pause auto-rotate on interaction, resume after 2s idle
- [x] Mobile: skip trade lines, reduce particle count 60%, simpler shader
- [x] Cleanup: dispose geometry, material, textures, renderer, remove listeners
- [x] Performance: `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`

---

## Phase 06 — Ticker / Marquee

- [x] Create `components/sections/Ticker.tsx` (`'use client'`)
- [x] Infinite horizontal scroll: duplicate content for seamless loop
- [x] Speed: ~40s full loop
- [x] Reverse direction on hover (GSAP `timeScale(-1)`)
- [x] Font: DM Mono, uppercase, ivory 30% opacity. Gold for `·` separators
- [x] Content: `COCONUT · COPRA · CLOVES · PEPPER · MAKASSAR PORT · SOUTH SULAWESI · EXPORT GRADE A · DIRECT FROM FARM · FULLY LICENSED · INTERNATIONAL SHIPPING ·`

---

## Phase 07 — About Section

- [x] Create `components/sections/About.tsx` (`'use client'`)
- [x] Two-column layout: left (pinned headline + stats) / right (scrollable copy)
- [x] ScrollTrigger pin: left column stays fixed while right scrolls
- [x] Section label (DM Mono, gold): `ABOUT THE COMPANY`
- [x] Headline: "We are the bridge." (Clash Display, large)
- [x] Sub-headline (Space Grotesk, sage): connecting line
- [x] Body copy: 4 paragraphs as per CLAUDE.md — clip-path reveal on scroll
- [x] Vision card: surface background, gold left border, italic quote
- [x] Stats row: 3 numbers with DM Mono labels (count-up animation on enter)
- [x] Mobile: stack layout, no pin

---

## Phase 08 — Products Section

- [x] Create `components/sections/Products.tsx` (`'use client'`)
- [x] Section header: label + headline + sub-headline
- [x] Horizontal scroll container: GSAP pin + scrub
- [x] Product card × 4: number, name, tagline, description, specs table, grade badge
- [x] Card entry animation: y:40→0 as each card enters the viewport during scroll
- [x] Progress bar at bottom (tracks horizontal scroll position)
- [x] Spec rows: DM Mono font, sage labels, ivory values, thin dividers
- [x] "MOQ" row: always highlighted with gold
- [x] Product image area: placeholder gradient if no real photo. DO NOT use stock photos.
- [x] Mobile: switch to vertical card stack, disable horizontal scroll
- [x] CTA per card: "Request Sample" → opens WA with pre-filled product name

---

## Phase 09 — Why Choose Us Section

- [x] Create `components/sections/WhyUs.tsx` (`'use client'`)
- [x] Section label + headline
- [x] 3 cards: number (DM Mono, gold), title (Space Grotesk), copy (Plus Jakarta Sans)
- [x] Icon per card: SVG inline (farm/leaf, document/checklist, port/anchor)
- [x] ScrollTrigger: cards stagger y:80→0, opacity 0→1, 0.15s apart
- [x] Hover: subtle card lift (`y: -4px`), gold border reveal

---

## Phase 10 — Process Section

- [x] Create `components/sections/Process.tsx` (`'use client'`)
- [x] Section label + headline + sub-headline
- [x] SVG timeline path: vertical or diagonal connecting all 6 steps
- [x] DrawSVG animation: stroke 0%→100% tied to ScrollTrigger scrub
- [x] Step nodes: numbered circles (DM Mono, gold outline) that pulse on draw
- [x] Step content: title (Space Grotesk) + copy (Plus Jakarta Sans)
- [x] Step labels fade in sequentially as the SVG path reaches each node
- [x] Mobile: simplified vertical list, no SVG animation (performance)

---

## Phase 11 — Legality & Compliance Section

- [x] Create `components/sections/Legality.tsx` (`'use client'`)
- [x] Section label + headline + sub-headline
- [x] Badge grid: 6 cards in 2×3 or 3×2 layout
- [x] Each badge: checkmark icon (SVG, draw animation), title, status tag, description
- [x] Status tag: "Active" (green), "Available per shipment" (gold)
- [x] ScrollTrigger: badge scale 0.85→1, stagger 0.07s
- [x] Hover: checkmark redraws, card border glows gold
- [x] Disclaimer text below grid (DM Mono, sage, small)

---

## Phase 12 — Contact Section

- [x] Create `components/sections/Contact.tsx` (`'use client'`)
- [x] Create `components/forms/InquiryForm.tsx` (`'use client'`)
- [x] Two-column layout: left (copy + contact details) / right (form)
- [x] Section label + headline
- [x] Left: intro copy, WA link (opens wa.me), address block
- [x] Form fields: Name, Company, Country (select), Product (multi-select), Message
- [x] Zod validation schema (shared client + server)
- [x] Server Action in `lib/actions.ts` using Resend
- [x] Form states: default, loading, success, error
- [x] Success: replace form with confirmation message
- [x] Error: show inline error, keep form data
- [x] ScrollTrigger: left col x:-60→0, right col x:60→0 simultaneously
- [ ] Google Maps embed (optional, add as iframe or static map image)

---

## Phase 13 — Product Detail Pages

- [x] Create `app/products/[slug]/page.tsx`
- [x] Static params: `coconut`, `copra`, `cloves`, `pepper`
- [x] Product data from `lib/constants.ts` (no database needed)
- [x] Sections: hero (product name + tagline), specs table, description, origin story, CTA
- [x] Metadata: unique title + description per product page
- [x] Back navigation to homepage products section

---

## Phase 14 — Performance & Accessibility

- [x] Run Lighthouse on main page: target 90+ Performance, 100 Accessibility
- [x] All images: `next/image`, WebP, explicit dimensions, `alt` tags
- [x] Fonts: verify no FOUT (preload critical fonts)
- [x] Three.js Globe: test on mid-range Android device (Samsung A series)
- [x] `<meta charset="UTF-8">` and `lang="en"` on `<html>`
- [x] All interactive elements keyboard-accessible
- [x] Color contrast: all text passes WCAG AA against background
- [x] `prefers-reduced-motion`: verify all animations skipped cleanly
- [x] Verify `ScrollTrigger.refresh()` called after fonts load
- [x] Check no hydration errors in browser console
- [x] Remove all `console.log` statements

---

## Phase 15 — SEO & Metadata

- [x] Root metadata in `app/layout.tsx` (title, description, keywords, OG)
- [x] OG image created: 1200×630px, `/public/og-image.jpg`
- [x] Product pages: unique metadata per slug
- [x] `robots.txt` (allow all)
- [x] `sitemap.xml` (via `app/sitemap.ts`)
- [x] Structured data: `Organization` JSON-LD in layout
- [ ] Verify OG tags with og:debugger before going live (manual, post-deploy)

---

## Phase 16 — Final QA & Launch

- [ ] Test on Chrome, Firefox, Safari (desktop) (manual)
- [ ] Test on iOS Safari (iPhone 13+) (manual)
- [ ] Test on Android Chrome (mid-range device) (manual)
- [ ] Test contact form end-to-end: fill → submit → receive email (manual)
- [x] Test WA links: all open correct number with pre-filled message (`pnpm qa:smoke`)
- [ ] Verify all sections render correctly at 1280px, 1440px, 1920px (manual)
- [ ] Verify mobile layout at 375px, 390px, 430px (manual)
- [ ] Verify preloader → hero animation sequence (manual)
- [ ] Verify horizontal scroll on Products works on trackpad and touch (manual)
- [x] Check 404 page is custom-branded (`app/not-found.tsx`)
- [ ] Set up Vercel custom domain (manual, client/Vercel dashboard)
- [ ] DNS: A record + CNAME pointing to Vercel (manual)
- [x] Enable Vercel Analytics (`@vercel/analytics` + Speed Insights in layout)
- [ ] Final Lighthouse audit on production URL (manual, post-deploy)
- [x] Smoke test all navigation links (`pnpm qa:smoke` + build)
- [ ] Hand off access credentials to client (manual)

---

## Post-Launch (Optional / Future)

- [ ] Blog / news section (if client wants content marketing)
- [ ] Bilingual toggle (EN/ID) if requested by client
- [ ] Admin panel for contact form submissions (if Resend email isn't enough)
- [ ] WhatsApp Business API integration (auto-reply on inquiry)
- [ ] Product page gallery (once client has real product photos)
- [ ] Video background option for hero (if client provides export/farm footage)
