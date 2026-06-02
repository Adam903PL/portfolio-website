'use client';

import React, { useState } from 'react';

const AnimatedNavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      className="rounded-[8px] text-sm text-gray-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
    >
      {children}
    </a>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const headerShapeClass = isOpen ? 'rounded-[18px]' : 'rounded-full';

  const navLinksData = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Education', href: '/education' },
  ];

  const logoElement = (
    <div className="relative flex size-8 items-center justify-center">
      <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <path
          d="M4 9 Q12 12, 20 9"
          fill="none"
          stroke="url(#waveGrad1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-[wave_1.2s_ease-in-out_infinite]"
        />
        <path
          d="M4 15 Q12 12, 20 15"
          fill="none"
          stroke="url(#waveGrad2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          className="animate-[wave_1.2s_ease-in-out_infinite]"
          style={{ animationDelay: '0.3s' }}
        />
      </svg>
    </div>
  );

  const contactButtonElement = (
    <a
      href="/contact"
      className="group relative inline-flex h-10 w-full items-center justify-center rounded-full px-4 text-sm font-semibold text-black sm:w-auto"
    >
      <span className="pointer-events-none absolute inset-0 -m-2 hidden rounded-full bg-white opacity-30 blur-lg transition-[opacity,filter,margin] duration-300 ease-out group-hover:-m-3 group-hover:opacity-50 group-hover:blur-xl sm:block" />
      <span className="relative z-10 inline-flex h-10 w-full items-center justify-center rounded-full bg-gradient-to-br from-white to-gray-300 px-4 text-black shadow-lg transition-[background-color,transform] duration-200 group-hover:-translate-y-0.5 sm:w-auto">
        Contact Me
      </span>
    </a>
  );

  return (
    <header
      className={`fixed left-1/2 top-6 z-20 flex w-[calc(100%-2rem)] -translate-x-1/2 flex-col items-center border border-[#333] bg-[#1f1f1f57] px-5 py-3 backdrop-blur-sm transition-[border-radius] duration-200 ease-in-out sm:w-auto sm:px-6 ${headerShapeClass}`}
    >
      <div className="flex w-full items-center justify-between gap-x-5 sm:gap-x-6">
        <div className="flex items-center">{logoElement}</div>

        <nav className="hidden items-center gap-5 text-sm sm:flex lg:gap-6">
          {navLinksData.map((link) => (
            <AnimatedNavLink key={link.href} href={link.href}>
              {link.label}
            </AnimatedNavLink>
          ))}
        </nav>

        <div className="hidden items-center sm:flex">
          {contactButtonElement}
        </div>

        <button
          className="flex size-8 items-center justify-center text-gray-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 sm:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
        >
          {isOpen ? (
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="size-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      <div
        className={`flex w-full flex-col items-center overflow-hidden transition-[max-height,opacity,padding-top] duration-300 ease-in-out sm:hidden ${
          isOpen
            ? 'max-h-[480px] opacity-100 pt-4'
            : 'max-h-0 opacity-0 pt-0 pointer-events-none'
        }`}
      >
        <nav className="flex w-full flex-col items-center gap-4 text-base">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="w-full rounded-[10px] py-1 text-center text-gray-300 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="mt-4 flex w-full flex-col items-center">
          {contactButtonElement}
        </div>
      </div>
    </header>
  );
}
