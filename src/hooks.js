import { useEffect, useRef, useState } from 'react';

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Scrolls to the top, smoothly unless the user asked the OS for reduced motion. */
export const scrollToTop = () => window.scrollTo({ top: 0, behavior: reducedMotion() ? 'auto' : 'smooth' });

/** Animates a number towards `target` (ease-out), starting from the last shown value. */
export function useCountUp(target, duration = 600) {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    if (reducedMotion() || from.current === target) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const origin = from.current;
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const v = Math.round(origin + (target - origin) * eased);
      setValue(v);
      from.current = v;
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Safety net: rAF is paused in hidden/background tabs — always land on the final value.
    const done = setTimeout(() => {
      cancelAnimationFrame(raf);
      from.current = target;
      setValue(target);
    }, duration + 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
    };
  }, [target, duration]);

  return value;
}

/** True once the page has scrolled past `offset` px. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);
  return scrolled;
}
