'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const label = labelRef.current;
    if (!dot || !label) return;

    document.documentElement.classList.add('has-custom-cursor');

    const onMove = (e: PointerEvent) => {
      const x = `${e.clientX}px`;
      const y = `${e.clientY}px`;
      dot.style.setProperty('--cx', x);
      dot.style.setProperty('--cy', y);
      label.style.setProperty('--cx', x);
      label.style.setProperty('--cy', y);
      dot.style.opacity = '1';
    };

    const onOver = (e: PointerEvent) => {
      const target = e.target as Element | null;
      const interactive = target?.closest('a, button, [role="button"]');
      if (interactive) {
        dot.setAttribute('data-variant', 'hover');
      } else {
        dot.removeAttribute('data-variant');
      }

      const labelled = target?.closest('[data-cursor-label]');
      const text = labelled?.getAttribute('data-cursor-label') ?? '';
      label.textContent = text;
      label.setAttribute('data-show', text ? 'true' : 'false');
    };

    const onLeave = () => {
      dot.style.opacity = '0';
      label.setAttribute('data-show', 'false');
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="custom-cursor"
        style={{ opacity: 0 }}
      />
      <div ref={labelRef} aria-hidden className="custom-cursor-label" />
    </>
  );
}
