'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, registerGSAP } from '@/lib/gsap';
import type { StackCard } from '@/types';

/* ─── Card data ─────────────────────────────────────────────────────── */
const CARDS: StackCard[] = [
  {
    id: 1,
    label: '01 / Essentials',
    headline: 'The Foundation',
    sub: 'Pieces built to outlast trends. Supima cotton, impeccable construction, zero excess.',
    bg: '#0a0a0a',
    text: '#fafafa',
    accent: '#c9a96e',
    tag: 'Timeless',
  },
  {
    id: 2,
    label: '02 / Elevated',
    headline: 'Raw & Refined',
    sub: 'Japanese selvedge denim. Vegetable-tanned leather. Materials that only get better with age.',
    bg: '#fafafa',
    text: '#0a0a0a',
    accent: '#71717a',
    tag: 'Craftsmanship',
  },
  {
    id: 3,
    label: '03 / Statement',
    headline: 'The Loud Silence',
    sub: 'Garments that speak without speaking. Drama through proportion, not decoration.',
    bg: '#18181b',
    text: '#e4e4e7',
    accent: '#c9a96e',
    tag: 'Avant-garde',
  },
  {
    id: 4,
    label: '04 / Archive',
    headline: 'Provenance',
    sub: 'Authenticated vintage. Deadstock fabric. Pieces with a story that continues with you.',
    bg: '#f4f4f5',
    text: '#0a0a0a',
    accent: '#52525b',
    tag: 'Heritage',
  },
];

const CARD_OFFSET = 28; // px gap between stacked cards
const SCALE_FACTOR = 0.04; // each card behind shrinks by this amount

export default function StackingShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const cardsWrapRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      /* ── Section header reveal ──────────────────────────────── */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      /* ── Stacking card scroll effect ────────────────────────── */
      const cards = gsap.utils.toArray<HTMLElement>('.stack-card');

      // How much scroll distance each card transition takes
      const SCROLL_PER_CARD = window.innerHeight * 0.9;

      // Pin the sticky container for the entire scroll journey
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${SCROLL_PER_CARD * (cards.length - 1)}`,
        pin: stickyRef.current,
        pinSpacing: true,
        anticipatePin: 1,
      });

      // Each card after the first starts scaled/offset and stacks into place
      cards.forEach((card, i) => {
        if (i === 0) return; // first card is already in resting position

        const prevCards = cards.slice(0, i);

        // Card enters: slides up from below
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: () => `top+=${SCROLL_PER_CARD * (i - 1)} top`,
          end: () => `top+=${SCROLL_PER_CARD * i} top`,
          scrub: 1.2,
          onUpdate: (self) => {
            const p = self.progress;

            // Current card slides in
            gsap.set(card, {
              y: (1 - p) * 60 + '%',
              opacity: p < 0.05 ? p * 20 : 1,
            });

            // Push previous cards up and scale them down
            prevCards.forEach((prevCard, j) => {
              const depth = i - j; // how many cards deep
              const targetY = -(depth * CARD_OFFSET) * p;
              const targetScale = 1 - SCALE_FACTOR * depth * p;

              gsap.set(prevCard, {
                y: targetY,
                scale: targetScale,
              });
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="showcase"
      className="relative bg-paper"
      aria-label="Stacking Showcase"
    >
      {/* Sticky container — GSAP will pin this */}
      <div
        ref={stickyRef}
        className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 overflow-hidden"
      >
        {/* Section header */}
        <div
          ref={headerRef}
          className="flex items-baseline justify-between mb-12 md:mb-16"
          style={{ opacity: 0 }}
        >
          <div>
            <p className="label-mono text-zinc-400 mb-3">The Showcase</p>
            <h2
              className="font-display font-light italic leading-none tracking-tighter"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              By Category
            </h2>
          </div>
          <p className="hidden md:block label-mono text-zinc-300 text-right max-w-[200px]">
            Scroll to explore the full collection
          </p>
        </div>

        {/* Cards stack */}
        <div
          ref={cardsWrapRef}
          className="relative"
          style={{ height: 'clamp(420px, 60vh, 600px)' }}
        >
          {CARDS.map((card) => (
            <StackCardItem key={card.id} card={card} />
          ))}
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-10" aria-hidden="true">
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="w-1 h-1 rounded-full bg-zinc-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Individual card ───────────────────────────────────────────────── */
function StackCardItem({ card }: { card: StackCard }) {
  return (
    <div
      className="stack-card absolute inset-0 w-full h-full flex"
      style={{
        backgroundColor: card.bg,
        color: card.text,
        willChange: 'transform',
        transformOrigin: 'top center',
      }}
    >
      {/* Left panel — content */}
      <div className="flex flex-col justify-between p-8 md:p-12 w-full md:w-1/2">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <span
            className="label-mono text-xs"
            style={{ color: card.accent }}
          >
            {card.label}
          </span>
          <span
            className="label-mono text-xs px-3 py-1.5 border"
            style={{ borderColor: card.accent, color: card.accent }}
          >
            {card.tag}
          </span>
        </div>

        {/* Headline */}
        <div>
          <h3
            className="font-display font-light italic leading-none tracking-tighter mb-4"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 6rem)' }}
          >
            {card.headline}
          </h3>
          <p
            className="font-light leading-relaxed max-w-sm text-sm md:text-base"
            style={{ color: card.text, opacity: 0.65 }}
          >
            {card.sub}
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center gap-6">
          <button
            className="label-mono text-xs px-5 py-3 border transition-all duration-300"
            style={{
              borderColor: card.text,
              color: card.text,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = card.text;
              el.style.color = card.bg;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.backgroundColor = 'transparent';
              el.style.color = card.text;
            }}
          >
            Browse Category
          </button>
          <span
            className="label-mono text-xs"
            style={{ color: card.accent }}
          >
            {String(card.id * 14 + 6)} items
          </span>
        </div>
      </div>

      {/* Right panel — decorative */}
      <div
        className="hidden md:flex flex-col items-end justify-between p-12 w-1/2 relative overflow-hidden"
        aria-hidden="true"
      >
        {/* Giant card number */}
        <div
          className="absolute bottom-0 right-0 font-display font-light italic leading-none select-none"
          style={{
            fontSize: 'clamp(8rem, 18vw, 18rem)',
            opacity: 0.06,
            color: card.text,
            lineHeight: 1,
          }}
        >
          {String(card.id).padStart(2, '0')}
        </div>

        {/* Grid accent lines */}
        <div className="absolute inset-0 grid grid-cols-3 gap-0 opacity-[0.04]">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="border-r"
              style={{ borderColor: card.text }}
            />
          ))}
        </div>

        {/* Centered mark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-32 h-32 rounded-full border"
            style={{ borderColor: card.accent, opacity: 0.2 }}
          />
          <div
            className="absolute w-16 h-16 rounded-full border"
            style={{ borderColor: card.accent, opacity: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
