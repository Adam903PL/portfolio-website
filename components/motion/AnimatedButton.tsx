'use client';

import { motion } from 'framer-motion';
import { buttonHover, tapScale, DURATION, EASE_SHARP } from '@/lib/motion';

interface AnimatedButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

export function AnimatedButton({
  onClick,
  children,
  className,
  disabled,
  type = 'button',
  style,
}: AnimatedButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={style}
      whileHover={
        !disabled
          ? {
              scale: 1.03,
              transition: { duration: DURATION.fast, ease: EASE_SHARP },
            }
          : {}
      }
      whileTap={!disabled ? tapScale : {}}
    >
      {children}
    </motion.button>
  );
}
