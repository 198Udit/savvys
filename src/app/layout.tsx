import type { Metadata, Viewport } from 'next';
import { Cormorant, Outfit, DM_Mono } from 'next/font/google';
import './globals.css';

/* ─── Fonts ──────────────────────────────────────────────────────────── */
const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
});

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
});

/* ─── Metadata ───────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: { default: "Savvy's 2.0 — Luxury Redefined", template: "%s — Savvy's" },
  description: 'A curated collection of minimalist luxury. Crafted for those who know.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: "Savvy's 2.0",
  },
};

// Next.js 16: viewport is a separate named export
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fafafa',
};

/* ─── Layout ─────────────────────────────────────────────────────────── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${outfit.variable} ${dmMono.variable}`}
    >
      {/* grain class adds the animated noise texture via ::after pseudo */}
      <body className="grain bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
