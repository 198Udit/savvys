# Savvy's 2.0 — Luxury E-commerce

> Minimalist. High-performance.

Built with **Next.js 16.2**, **React 19**, **GSAP + ScrollTrigger**, **Tailwind CSS**, and **MongoDB** via Next.js Server Actions.

---

## Tech Stack

| Layer       | Tech                                        |
|-------------|---------------------------------------------|
| Framework   | Next.js 16.2.4 (App Router, `src/` dir)     |
| React       | React 19                                    |
| Styling     | Tailwind CSS 3.4 + custom CSS properties    |
| Animation   | GSAP 3.12 + ScrollTrigger + @gsap/react     |
| Database    | MongoDB Atlas via Mongoose 8                |
| Data Layer  | Next.js Server Actions (no Express)         |
| Fonts       | Cormorant (display) + Outfit (body) via next/font |
| Deployment  | Vercel (zero config)                        |

---

## Quick Start

```bash
cp .env.local.example .env.local
# → Fill in your MONGODB_URI

npm install
npm run dev
```

Open: http://localhost:3000

---

## Architecture

```
src/
├── app/
│   ├── actions/
│   │   └── products.ts     # Server Actions → MongoDB (replaces Express)
│   ├── globals.css          # Design tokens, grain texture, clip animations
│   ├── layout.tsx           # next/font, viewport export, grain overlay
│   └── page.tsx             # Async Server Component — orchestrates all sections
├── components/
│   ├── Navbar.tsx           # Sticky nav + mobile hamburger (GSAP entrance)
│   ├── HeroSection.tsx      # Cinematic text reveal (clip + stagger)
│   ├── StackingShowcase.tsx # ⭐ GSAP ScrollTrigger stacking cards
│   ├── FeaturedProducts.tsx # Product grid with hover reveal
│   └── Footer.tsx           # Newsletter + marquee strip
├── lib/
│   ├── db.ts                # MongoDB singleton (SSR-safe, serverless-tuned)
│   └── gsap.ts              # GSAP engine wrapper + plugin registration
└── types/
    └── index.ts             # Shared TypeScript interfaces
```

---

## Key Decisions

### GSAP SSR Safety
All GSAP code lives in `'use client'` components. `src/lib/gsap.ts` exports a `registerGSAP()` helper that guards with `typeof window !== 'undefined'` — zero `window is not defined` errors at build time.

### MongoDB via Server Actions
No Express. `src/app/actions/products.ts` exports `getProducts()`, `createProduct()` etc. as Server Actions. Calling them from a Server Component is a direct function call; calling from a Client Component proxies through Next.js's built-in server boundary.

### Stacking Cards
`StackingShowcase.tsx` uses `ScrollTrigger.create` with `pin: true` to lock the sticky container for `cards.length - 1` scroll heights. Each card entrance is driven by `onUpdate` with `self.progress` — giving buttery scrubbed control over card position and scale.

### Next.js 16 Patterns Used
- `next.config.ts` (native TypeScript config)
- `turbopack: {}` (default bundler)
- `viewport` as separate export from `metadata`
- `next/font/google` for zero-layout-shift fonts
- ESLint 9 flat config (`eslint.config.mjs`)
- Async page components

---

## Deployment (Vercel)

1. Push to GitHub
2. Import in Vercel
3. Add `MONGODB_URI` environment variable
4. Deploy — zero config needed

---

## Connecting MongoDB

1. Create a free cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Add your connection string to `.env.local`
3. In `src/app/page.tsx`, uncomment the `getProducts()` call
4. Pass `products` to `<FeaturedProducts products={products} />`
