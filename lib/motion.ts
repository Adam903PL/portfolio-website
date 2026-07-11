import { Variants } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

export const EASE_EDITORIAL = [0.22, 1, 0.36, 1] as const;
export const EASE_SHARP = [0.4, 0, 0.2, 1] as const;
export const EASE_IN_OUT = [0.4, 0.0, 0.2, 1] as const;

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

export const hoverLiftSmall = {
  y: -2,
  transition: { duration: DURATION.fast, ease: EASE_SHARP },
} as const;

export const tapScale = {
  scale: 0.98,
  transition: { duration: DURATION.fast, ease: EASE_SHARP },
} as const;

export const linkHover = {
  x: 2,
  color: 'var(--color-accent)',
  transition: { duration: DURATION.fast, ease: EASE_SHARP },
} as const;

export const buttonHover = {
  scale: 1.02,
  transition: { duration: DURATION.fast, ease: EASE_SHARP },
} as const;

export const textGlow = {
  textShadow: '0 0 8px rgba(245, 52, 12, 0.4)',
  transition: { duration: DURATION.fast, ease: EASE_SHARP },
} as const;

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (custom = 0) => ({
    opacity: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASE_EDITORIAL,
      delay: custom,
    },
  }),
};

export const fadeInScale: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (custom = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.medium,
      ease: EASE_EDITORIAL,
      delay: custom,
    },
  }),
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASE_EDITORIAL,
      delay: custom,
    },
  }),
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: (custom = 0) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.medium,
      ease: EASE_EDITORIAL,
      delay: custom,
    },
  }),
};

export function useMotionSafe(): {
  fadeSlideUp: Variants;
  fadeSlideDown: Variants;
  fadeIn: Variants;
  fadeInScale: Variants;
  slideInLeft: Variants;
  slideInRight: Variants;
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
      fadeIn: noMotion,
      fadeInScale: noMotion,
      slideInLeft: noMotion,
      slideInRight: noMotion,
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
    fadeIn,
    fadeInScale,
    slideInLeft,
    slideInRight,
    staggerContainer,
  };
}
