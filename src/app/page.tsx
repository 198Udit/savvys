/**
 * src/app/page.tsx
 *
 * Next.js 16 — async Server Component.
 * Data is fetched server-side via Server Actions before hydration.
 * Client components (Navbar, HeroSection, StackingShowcase) handle
 * all GSAP + interactivity after hydration.
 */

import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import StackingShowcase from '@/components/StackingShowcase';
import FeaturedProducts from '@/components/FeaturedProducts';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: "Savvy's 2.0 — Luxury Redefined",
  description: 'A curated edit of minimalist luxury. SS 2025.',
};

export default async function HomePage() {
  /**
   * Uncomment once MongoDB is connected:
   *
   * import { getProducts } from '@/app/actions/products';
   * const products = await getProducts();
   *
   * Then pass `products` down to <FeaturedProducts products={products} />
   */

  return (
    <>
      <Navbar />

      <main>
        {/* ① Cinematic hero — GSAP text reveal on mount */}
        <HeroSection />

        {/* ② Editorial divider */}
        <div className="px-6 md:px-12 lg:px-24">
          <div className="rule" />
        </div>

        {/* ③ GSAP Stacking Cards — the centrepiece */}
        <StackingShowcase />

        {/* ④ Editorial divider */}
        <div className="px-6 md:px-12 lg:px-24">
          <div className="rule" />
        </div>

        {/* ⑤ Featured product grid */}
        <FeaturedProducts />
      </main>

      <Footer />
    </>
  );
}
