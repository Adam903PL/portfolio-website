import { useReducedMotion, type Variants } from 'framer-motion';

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASE_SHARP = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  fast: 0.18,
  medium: 0.32,
  slow: 0.5,
  slower: 0.7,
} as const;

export const VIEWPORT = { once: true, margin: '-80px' } as const;

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

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.medium, ease: EASE_EDITORIAL },
  },
};

export const wordReveal: Variants = {
  hidden: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: DURATION.slow, ease: EASE_EDITORIAL },
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

type MotionSafeVariants = {
  fadeSlideUp: Variants;
  staggerContainer: Variants;
  staggerItem: Variants;
  wordReveal: Variants;
};

export function useMotionSafe(): MotionSafeVariants {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const instantFade: Variants = {
      hidden: { opacity: 0 },
      visible: () => ({ opacity: 1, transition: { duration: 0 } }),
    };
    return {
      fadeSlideUp: instantFade,
      staggerContainer: {
        hidden: {},
        visible: {
          transition: { staggerChildren: 0, delayChildren: 0 },
        },
      },
      staggerItem: instantFade,
      wordReveal: instantFade,
    };
  }

  return {
    fadeSlideUp,
    staggerContainer,
    staggerItem,
    wordReveal,
  };
}
