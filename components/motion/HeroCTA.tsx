'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { hoverLiftSmall, DURATION, EASE_SHARP } from '@/lib/motion';

type CTAVariant = 'primary' | 'secondary' | 'tertiary';

interface HeroCTAProps {
  href: string;
  variant: CTAVariant;
  children: React.ReactNode;
  external?: boolean;
}

const getBaseStyles = (variant: CTAVariant) => {
  const base =
    'rounded-[2px] px-[26px] py-[15px] font-mono text-[13px] uppercase tracking-[0.04em] no-underline inline-block';

  switch (variant) {
    case 'primary':
      return `${base} bg-accent text-[color:var(--color-accent-ink)]`;
    case 'secondary':
      return `${base} border text-ink`;
    case 'tertiary':
      return `${base} px-[6px] text-ink-40`;
  }
};

const getHoverStyles = (variant: CTAVariant) => {
  switch (variant) {
    case 'primary':
    case 'secondary':
      return 'hover:border-ink';
    case 'tertiary':
      return 'hover:text-ink-60';
  }
};

const getBorderStyle = (variant: CTAVariant) => {
  if (variant === 'secondary') {
    return { borderColor: 'rgba(26,23,18,0.3)' };
  }
  return undefined;
};

export function HeroCTA({ href, variant, children, external }: HeroCTAProps) {
  const baseStyles = getBaseStyles(variant);
  const hoverStyles = getHoverStyles(variant);
  const borderStyle = getBorderStyle(variant);

  const content = (
    <motion.span
      whileHover={hoverLiftSmall}
      whileTap={{
        y: 0,
        transition: { duration: DURATION.fast, ease: EASE_SHARP },
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles} ${hoverStyles} transition-colors duration-200`}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${baseStyles} ${hoverStyles} transition-colors duration-200`}
      style={borderStyle}
    >
      {content}
    </Link>
  );
}
