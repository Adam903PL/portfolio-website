import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function setupScrollTriggerReducedMotion(callback: () => void) {
  if (typeof window === 'undefined') return;

  ScrollTrigger.matchMedia({
    '(prefers-reduced-motion: no-preference)': () => {
      callback();
    },
    '(prefers-reduced-motion: reduce)': () => {
      // No-op; animations skip, end state is set immediately
    },
  });
}

export { ScrollTrigger };
