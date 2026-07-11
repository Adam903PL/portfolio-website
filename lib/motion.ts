import { Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASE_SHARP = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  fast: 0.18,
  medium: 0.32,
  slow: 0.5,
  slower: 0.7,
} as const;

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASE_EDITORIAL,
      delay: custom,
    },
  }),
};

export const fadeSlideDown: Variants = {
  hidden: { opacity: 0, y: -16 },
  visible: (custom = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASE_EDITORIAL,
      delay: custom,
    },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const hoverLift = {
  y: -3,
  transition: { duration: DURATION.fast, ease: EASE_SHARP },
} as const;

export const tapScale = {
  scale: 0.98,
  transition: { duration: DURATION.fast, ease: EASE_SHARP },
} as const;

export function useMotionSafe(): {
  fadeSlideUp: Variants;
  fadeSlideDown: Variants;
  staggerContainer: Variants;
} {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const noMotion = {
      hidden: { opacity: 0 },
      visible: () => ({
        opacity: 1,
        transition: { duration: 0 },
      }),
    };
    return {
      fadeSlideUp: noMotion,
      fadeSlideDown: noMotion,
      staggerContainer: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0,
            delayChildren: 0,
          },
        },
      },
    };
  }

  return {
    fadeSlideUp,
    fadeSlideDown,
    staggerContainer,
  };
}
