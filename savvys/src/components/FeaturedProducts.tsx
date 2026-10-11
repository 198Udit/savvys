'use client';

import { useEffect, useRef } from 'react';
import { gsap, registerGSAP } from '@/lib/gsap';
import type { Product } from '@/types';

/* ─── Mock product data (replace with MongoDB Server Action) ──────── */
const MOCK_PRODUCTS: Product[] = [
  { _id: '1', name: 'Selvedge Trouser', price: 340, category: 'Elevated', description: 'Japanese selvedge denim', image: '', badge: 'New' },
  { _id: '2', name: 'Supima Tee', price: 95, category: 'Essentials', description: 'Clean white, impeccable cut', image: '' },
  { _id: '3', name: 'Overshirt', price: 275, category: 'Statement', description: 'Heavyweight Belgian linen', image: '', badge: 'Limited' },
  { _id: '4', name: 'Derby Boot', price: 580, category: 'Heritage', description: 'Goodyear welted, tan calf', image: '' },
  { _id: '5', name: 'Coach Jacket', price: 420, category: 'Archive', description: 'Deadstock nylon, 1990s cut', image: '', badge: '2 left' },
  { _id: '6', name: 'Knit Polo', price: 195, category: 'Essentials', description: 'Merino, ribbed collar', image: '' },
];

export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('.product-card');

      items.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
            delay: (i % 3) * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="collection"
      className="px-6 md:px-12 lg:px-24 py-24 md:py-36"
      aria-label="Featured Products"
    >
      {/* Header */}
      <div className="flex items-baseline justify-between mb-16">
        <div>
          <p className="label-mono text-zinc-400 mb-3">The Edit</p>
          <h2
            className="font-display font-light italic leading-none tracking-tighter"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            Current Season
          </h2>
        </div>
        <a
          href="#"
          className="hidden md:block label-mono text-zinc-400 hover:text-ink transition-colors duration-200"
        >
          View All →
        </a>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, {
      scale: 1.04,
      duration: 0.6,
      ease: 'expo.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.5,
      ease: 'expo.out',
    });
  };

  return (
    <article
      className="product-card group cursor-pointer"
      style={{ opacity: 0 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-zinc-100 mb-4" style={{ aspectRatio: '3/4' }}>
        <div
          ref={imgRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Placeholder — replace with next/image */}
          <div className="font-display text-[6rem] font-light italic text-zinc-200 select-none">
            {product.name.charAt(0)}
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-300" />
        </div>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 label-mono text-xs px-2.5 py-1 bg-ink text-paper">
            {product.badge}
          </div>
        )}

        {/* Quick add — appears on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-expo-out">
          <button className="w-full label-mono text-xs py-4 bg-ink text-paper hover:bg-zinc-800 transition-colors duration-200">
            Quick Add
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-sm text-ink mb-0.5">{product.name}</p>
          <p className="label-mono text-xs text-zinc-400">{product.category}</p>
        </div>
        <p className="font-light text-sm text-ink">${product.price}</p>
      </div>
    </article>
  );
}
