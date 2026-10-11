'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { gsap, registerGSAP } from '@/lib/gsap';
import type { NavLink } from '@/types';

const NAV_LINKS: NavLink[] = [
  { label: 'Collection', href: '#collection' },
  { label: 'Showcase', href: '#showcase' },
  { label: 'About', href: '#about' },
  { label: 'Journal', href: '/journal' },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* ── Entrance animation ─────────────────────────────────────────── */
  useEffect(() => {
    registerGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Nav bar slides down
      tl.fromTo(
        navRef.current,
        { yPercent: -100, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, ease: 'expo.out' }
      );

      // Logo fades in
      tl.fromTo(
        logoRef.current,
        { opacity: 0, x: -16 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'expo.out' },
        '-=0.5'
      );

      // Desktop links stagger in
      if (linksRef.current) {
        tl.fromTo(
          linksRef.current.children,
          { opacity: 0, y: -8 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'expo.out' },
          '-=0.4'
        );
      }
    });

    return () => ctx.revert();
  }, []);

  /* ── Scroll shadow ──────────────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── Mobile menu animation ──────────────────────────────────────── */
  useEffect(() => {
    if (!mobileMenuRef.current || !overlayRef.current) return;

    if (menuOpen) {
      document.body.style.overflow = 'hidden';

      gsap.set(mobileMenuRef.current, { display: 'flex' });
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo(
        mobileMenuRef.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.55, ease: 'expo.out' }
      );
      // Stagger menu items
      gsap.fromTo(
        mobileMenuRef.current.querySelectorAll('.mobile-link'),
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: 'expo.out', delay: 0.15 }
      );
    } else {
      document.body.style.overflow = '';

      gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 });
      gsap.to(mobileMenuRef.current, {
        xPercent: 100,
        duration: 0.4,
        ease: 'expo.in',
        onComplete: () => {
          if (mobileMenuRef.current) gsap.set(mobileMenuRef.current, { display: 'none' });
        },
      });
    }
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen(v => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* ── Main Nav ─────────────────────────────────────────────── */}
      <nav
        ref={navRef}
        className={[
          'fixed top-0 left-0 right-0 z-50 px-6 md:px-12',
          'flex items-center justify-between h-[72px]',
          'transition-all duration-500',
          scrolled
            ? 'bg-paper/95 backdrop-blur-md border-b border-zinc-200'
            : 'bg-transparent',
        ].join(' ')}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div ref={logoRef}>
          <Link
            href="/"
            className="flex items-baseline gap-1.5 group"
            onClick={closeMenu}
          >
            <span className="font-display text-2xl italic font-light tracking-tighter text-ink">
              Savvy&apos;s
            </span>
            <span className="label-mono text-zinc-400 group-hover:text-gold transition-colors duration-300">
              2.0
            </span>
          </Link>
        </div>

        {/* Desktop links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href as any} //"added here as any"
              className={[
                'label-mono text-zinc-500 hover:text-ink',
                'relative after:absolute after:bottom-[-3px] after:left-0',
                'after:h-px after:w-0 after:bg-ink',
                'after:transition-all after:duration-300 after:ease-expo-out',
                'hover:after:w-full transition-colors duration-200',
              ].join(' ')}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="#collection"
            className={[
              'label-mono px-5 py-2.5 border border-ink text-ink text-xs',
              'hover:bg-ink hover:text-paper transition-all duration-300',
              'relative overflow-hidden group',
            ].join(' ')}
          >
            Shop Now
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] z-[60] relative"
        >
          <span
            className={[
              'block w-6 h-px bg-ink transition-all duration-400',
              menuOpen ? 'rotate-45 translate-y-[6px]' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-4 h-px bg-ink transition-all duration-300',
              menuOpen ? 'opacity-0 w-0' : '',
            ].join(' ')}
          />
          <span
            className={[
              'block w-6 h-px bg-ink transition-all duration-400',
              menuOpen ? '-rotate-45 -translate-y-[6px]' : '',
            ].join(' ')}
          />
        </button>
      </nav>

      {/* ── Mobile Overlay ───────────────────────────────────────── */}
      <div
        ref={overlayRef}
        onClick={closeMenu}
        className="fixed inset-0 z-[55] bg-ink/20 backdrop-blur-sm md:hidden"
        style={{ opacity: 0, display: menuOpen ? 'block' : 'none' }}
        aria-hidden="true"
      />

      {/* ── Mobile Menu Panel ────────────────────────────────────── */}
      <div
        ref={mobileMenuRef}
        className={[
          'fixed top-0 right-0 bottom-0 z-[58]',
          'w-[82vw] max-w-sm bg-paper',
          'flex-col justify-between p-10 pt-24',
          'border-l border-zinc-200 md:hidden',
        ].join(' ')}
        style={{ display: 'none' }}
        aria-label="Mobile navigation"
      >
        {/* Mobile nav links */}
        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href as any}   //added here "as any"
              onClick={closeMenu}
              className="mobile-link flex items-baseline gap-4 py-4 border-b border-zinc-100 group"
            >
              <span className="label-mono text-zinc-300 w-6 text-right">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-4xl italic font-light text-ink group-hover:text-zinc-500 transition-colors duration-200">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Mobile footer */}
        <div className="mobile-link flex flex-col gap-6">
          <Link
            href="#collection"
            onClick={closeMenu}
            className="label-mono px-6 py-4 bg-ink text-paper text-center text-xs tracking-wider hover:bg-zinc-800 transition-colors duration-200"
          >
            Shop the Collection
          </Link>
          <p className="label-mono text-zinc-300 text-center">
            Luxury Redefined — Since 2024
          </p>
        </div>
      </div>
    </>
  );
}
