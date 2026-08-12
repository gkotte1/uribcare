'use client';

import { useEffect } from 'react';

/**
 * Mounts once near the end of the page and mirrors the source reveal-on-scroll
 * script: it observes every element already carrying the `.reveal` class and
 * adds `.in` when it enters the viewport. Falls back to adding `.in` immediately
 * when reduced motion is preferred or IntersectionObserver is unavailable.
 */
export default function Reveal() {
  useEffect(() => {
    const revealAll = () =>
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
      );
      document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
      // Safety net: if the observer never fires (sandboxed iframe quirks), reveal everything anyway.
      const t1 = setTimeout(revealAll, 1600);
      const onLoad = () => setTimeout(revealAll, 400);
      window.addEventListener('load', onLoad);
      return () => {
        io.disconnect();
        clearTimeout(t1);
        window.removeEventListener('load', onLoad);
      };
    } else {
      revealAll();
    }
  }, []);

  return null;
}
