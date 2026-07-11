'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { linkHover, DURATION, EASE_SHARP } from '@/lib/motion';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export function AnimatedLink({
  href,
  children,
  className,
  target,
  rel,
}: AnimatedLinkProps) {
  const isExternal = href.startsWith('http');

  const content = (
    <motion.span
      whileHover={{
        x: 3,
        transition: { duration: DURATION.fast, ease: EASE_SHARP },
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}
