'use client';

import { motion } from 'framer-motion';
import { DURATION, EASE_SHARP } from '@/lib/motion';
import React from 'react';

interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function AnimatedInput({ label, ...props }: AnimatedInputProps) {
  return (
    <motion.div>
      {label && (
        <label
          htmlFor={props.id}
          className="mb-2 block font-mono text-[11px] uppercase tracking-[0.04em] text-cream-50"
        >
          {label}
        </label>
      )}
      <motion.input
        {...props}
        whileFocus={{
          scale: 1.01,
          transition: { duration: DURATION.fast, ease: EASE_SHARP },
        }}
      />
    </motion.div>
  );
}

interface AnimatedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export function AnimatedTextarea({ label, ...props }: AnimatedTextareaProps) {
  return (
    <motion.div>
      {label && (
        <label
          htmlFor={props.id}
          className="mb-2 block font-mono text-[11px] uppercase tracking-[0.04em] text-cream-50"
        >
          {label}
        </label>
      )}
      <motion.textarea
        {...props}
        whileFocus={{
          scale: 1.01,
          transition: { duration: DURATION.fast, ease: EASE_SHARP },
        }}
      />
    </motion.div>
  );
}
