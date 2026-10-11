'use client';

import Link from 'next/link';

const MARQUEE_ITEMS = [
  'Free shipping over $250',
  'Curated since 2024',
  'Sustainably sourced',
  'Lifetime repair program',
  'Carbon neutral shipping',
];

export default function Footer() {
  const marqueeText = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS].join(' · ');

  return (
    <footer id="about" className="bg-ink text-paper">
      {/* Marquee strip */}
      <div className="border-b border-zinc-800 overflow-hidden py-3">
        <div
          className="flex whitespace-nowrap label-mono text-zinc-400 text-xs"
          style={{ animation: 'marquee 28s linear infinite' }}
          aria-hidden="true"
        >
          <span className="mr-8">{marqueeText}</span>
          <span className="mr-8">{marqueeText}</span>
        </div>
      </div>

      {/* Main footer content */}
      <div className="px-6 md:px-12 lg:px-24 py-20 grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-baseline gap-2 mb-6">
            <span className="font-display text-3xl italic font-light text-paper">
              Savvy&apos;s
            </span>
            <span className="label-mono text-zinc-500">2.0</span>
          </div>
          <p className="text-zinc-400 font-light text-sm leading-relaxed max-w-xs">
            We believe luxury is the absence of excess. Every piece in our
            collection earns its place.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <p className="label-mono text-zinc-500 mb-6">Navigate</p>
          <ul className="flex flex-col gap-3">
            {['Collection', 'Showcase', 'Journal', 'About', 'Contact'].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-zinc-400 hover:text-paper transition-colors duration-200 text-sm font-light"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <p className="label-mono text-zinc-500 mb-6">Stay Informed</p>
          <p className="text-zinc-400 text-sm font-light mb-6 leading-relaxed">
            Seasonal drops, archival finds, and essays on the art of less.
          </p>
          <div className="flex border border-zinc-700 focus-within:border-zinc-400 transition-colors duration-200">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-transparent px-4 py-3 text-sm text-paper placeholder-zinc-600 outline-none"
            />
            <button className="label-mono text-xs px-5 py-3 bg-paper text-ink hover:bg-zinc-200 transition-colors duration-200">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-zinc-800 px-6 md:px-12 lg:px-24 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="label-mono text-zinc-600 text-xs">
          © {new Date().getFullYear()} Savvy&apos;s 2.0. All rights reserved.
        </p>
        <div className="flex items-center gap-8">
          {['Privacy', 'Terms', 'Cookies'].map((item) => (
            <Link
              key={item}
              href="#"
              className="label-mono text-zinc-600 hover:text-zinc-400 text-xs transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
}
