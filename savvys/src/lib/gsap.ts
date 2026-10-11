/**
 * src/lib/gsap.ts
 *
 * GSAP engine wrapper — SSR-safe.
 *
 * Rules:
 * 1. Import GSAP only on the CLIENT (typeof window !== 'undefined').
 * 2. Register plugins exactly once via a module-level flag.
 * 3. Re-export gsap + ScrollTrigger so consumers import from here,
 *    not directly from 'gsap', to ensure the singleton registration.
 *
 * Usage:
 *   import { gsap, ScrollTrigger } from '@/lib/gsap';
 *   gsap.registerPlugin(ScrollTrigger);   // safe to call again; GSAP dedupes
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

/**
 * Call this once at the top of any client component that uses ScrollTrigger.
 * Safe to call multiple times — registration is idempotent.
 */
export function registerGSAP(): void {
  if (typeof window === 'undefined') return; // SSR guard
  if (registered) return;
  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export { gsap, ScrollTrigger };

/**
 * Default GSAP eases used across Savvy's motion system.
 */
export const EASES = {
  expo: 'expo.out',
  expoIn: 'expo.in',
  circ: 'circ.out',
  back: 'back.out(1.4)',
  smooth: 'power3.out',
  linear: 'none',
} as const;

/**
 * Stagger presets for grouped element animations.
 */
export const STAGGER = {
  fast: { amount: 0.3, ease: 'power2.out' },
  slow: { amount: 0.6, ease: 'power2.out' },
  cascade: { amount: 0.8, from: 'start', ease: 'power3.out' },
} as const;
