'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Education', href: '/education' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/'
      ? pathname === '/'
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className="side-pad sticky top-0 z-40 border-b"
      style={{
        background: 'rgba(237,231,218,0.82)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderColor: 'var(--color-line-soft)',
      }}
    >
      <div className="flex items-center justify-between py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3.5 no-underline">
          <span className="flex size-[34px] items-center justify-center rounded-[2px] bg-ink font-mono text-[15px] font-bold text-cream">
            AP
          </span>
          <span className="font-mono text-[12px] leading-tight tracking-[0.02em] text-ink">
            Adam&nbsp;Pukaluk
            <br />
            <span className="text-ink-40">full-stack&nbsp;dev</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-[34px] font-mono text-[13px] uppercase tracking-[0.04em] min-[901px]:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="no-underline transition-colors"
              style={
                isActive(link.href)
                  ? {
                      color: 'var(--color-accent)',
                      borderBottom: '1px solid var(--color-accent)',
                      paddingBottom: 2,
                    }
                  : { color: 'var(--color-ink)' }
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: status + contact */}
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 font-mono text-[12px] text-live-ink min-[901px]:flex">
            <span className="inline-block size-2 animate-[blink_1.8s_ease-in-out_infinite] rounded-full bg-live" />
            Open to work
          </div>
          <Link
            href="/contact"
            className="hidden rounded-[2px] bg-ink px-[18px] py-[11px] font-mono text-[12px] uppercase tracking-[0.04em] text-cream no-underline min-[901px]:inline-block"
          >
            Contact&nbsp;→
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="flex size-9 items-center justify-center text-ink min-[901px]:hidden"
          >
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 7h16M4 12h16M4 17h16'}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 min-[901px]:hidden ${
          open ? 'max-h-80' : 'max-h-0'
        }`}
      >
        <nav
          className="flex flex-col gap-1 border-t py-3 font-mono text-[13px] uppercase tracking-[0.04em]"
          style={{ borderColor: 'var(--color-line-soft)' }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 no-underline"
              style={{
                color: isActive(link.href)
                  ? 'var(--color-accent)'
                  : 'var(--color-ink)',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block rounded-[2px] bg-ink px-[18px] py-[11px] text-center text-cream no-underline"
          >
            Contact&nbsp;→
          </Link>
        </nav>
      </div>
    </header>
  );
}
