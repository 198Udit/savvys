"use client";

import { useEffect, useRef } from "react";
import { gsap, registerGSAP, EASES } from "@/lib/gsap";


export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.6 });

      // Eyebrow line expands
      tl.fromTo(
        lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: EASES.expo },
      ).fromTo(
        eyebrowRef.current,
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.5, ease: EASES.smooth },
        "-=0.4",
      );

      // Headline — each line slides up from clip
      const lines = headlineRef.current?.querySelectorAll(".line-inner");
      if (lines?.length) {
        tl.fromTo(
          lines,
          { yPercent: 105 },
          { yPercent: 0, duration: 1, stagger: 0.12, ease: EASES.expo },
          "-=0.3",
        );
      }

      // Sub copy fades up
      tl.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: EASES.smooth },
        "-=0.5",
      );

      // CTA
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6, ease: EASES.smooth },
        "-=0.4",
      );

      // Scroll hint
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.2",
      );

      // Ambient scroll hint loop //Udit made the changes here by adding the "!" in end
      const scrollHint = gsap.to(scrollHintRef.current?.querySelector(".scroll-dot")!, {
        y: 14,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 pb-12 overflow-hidden"
      aria-label="Hero"
    >
      {/* Background geometric accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-1/3 h-full border-l border-zinc-100 pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 w-1/2 h-px bg-zinc-100 pointer-events-none"
      />

      {/* Large background number */}
      <div
        aria-hidden="true"
        className="absolute bottom-12 right-6 md:right-12 font-display text-[20vw] font-light text-zinc-100 leading-none pointer-events-none select-none"
      >
        II
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl">
        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8 md:mb-12">
          <div
            ref={lineRef}
            className="h-px w-12 bg-ink origin-left"
            style={{ transform: "scaleX(0)" }}
          />
          <div
            ref={eyebrowRef}
            className="label-mono text-zinc-400"
            style={{ opacity: 0 }}
          >
            New Season — SS 2025
          </div>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="font-display font-light italic leading-none tracking-tighter mb-8 md:mb-12"
          style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
        >
          <span className="clip-text block">
            <span className="line-inner">Luxury</span>
          </span>
          <span className="clip-text block">
            <span className="line-inner text-zinc-300">without</span>
          </span>
          <span className="clip-text block">
            <span className="line-inner">compromise.</span>
          </span>
        </h1>

        {/* Sub copy + CTA row */}
        <div className="flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
          <p
            ref={subRef}
            className="text-zinc-500 font-light text-lg leading-relaxed max-w-sm"
            style={{ opacity: 0 }}
          >
            A curated edit for the discerning few. Each piece selected for its
            craft, silence, and staying power.
          </p>

          <div
            ref={ctaRef}
            className="flex items-center gap-6"
            style={{ opacity: 0 }}
          >
            <a
              href="#showcase"
              className={[
                "label-mono px-7 py-4 bg-ink text-paper text-xs tracking-wider",
                "hover:bg-zinc-800 transition-colors duration-300",
                "relative overflow-hidden group",
              ].join(" ")}
            >
              Explore Collection
            </a>
            <a
              href="#about"
              className="label-mono text-zinc-400 hover:text-ink transition-colors duration-200 flex items-center gap-2"
            >
              Our Story
              <span aria-hidden="true" className="text-base leading-none">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        ref={scrollHintRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
        aria-hidden="true"
      >
        <div className="w-5 h-8 border border-zinc-300 rounded-full flex justify-center pt-1.5">
          <div className="scroll-dot w-1 h-1 rounded-full bg-zinc-400" />
        </div>
        <span className="label-mono text-zinc-300">scroll</span>
      </div>
    </section>
  );
}