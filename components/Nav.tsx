/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#journey', label: 'How it works' },
  { href: '#autism', label: 'Autism care' },
  { href: '#trust', label: 'Security' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();

  // On the home page the section links stay as in-page anchors; anywhere else
  // they need to point back at the home page first.
  const base = pathname === '/' ? '' : '/';
  const isHome = pathname === '/';

  // nav scrolled state + reading progress
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // highlight the section currently in view (home page only)
  useEffect(() => {
    if (!isHome) return;
    const ids = LINKS.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  // close the drawer on Escape, and lock body scroll while it is open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1080) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const cur =
      root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
        <div
          className="scroll-progress"
          style={{ width: '100%', transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
          aria-hidden="true"
        />
        <div className="wrap nav-inner">
          <a className="brand" href={`${base}#top`} aria-label="URIBCARE home" onClick={close}>
            <img className="brand-logo" src="/images/logo.png" alt="URIBCARE" width={164} height={55} />
          </a>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={`${base}${l.href}`}
                aria-current={isHome && active === l.href.slice(1) ? 'true' : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-cta">
            <button className="icon-btn theme-toggle" id="themeBtn" aria-label="Toggle light and dark theme" onClick={toggleTheme}>
              <svg className="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
              </svg>
              <svg className="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
              </svg>
            </button>

            <a href={`${base}#contact`} className="btn btn-quiet nav-hide-md">
              Book a demo
            </a>
            <Link href="/register" className="btn btn-ghost nav-hide-sm">
              Registration
            </Link>
            <a href={`${base}#contact`} className="btn btn-primary">
              Start free trial
            </a>

            <button
              className="icon-btn nav-burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="nav-drawer"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="burger-box" aria-hidden="true">
                <i /><i /><i />
              </span>
            </button>
          </div>
        </div>
      </header>

      {open && <div className="nav-scrim" onClick={close} aria-hidden="true" />}

      <div className={`nav-drawer${open ? ' open' : ''}`} id="nav-drawer" hidden={!open}>
        <nav aria-label="Mobile">
          {LINKS.map((l) => (
            <a key={l.href} className="dl" href={`${base}${l.href}`} onClick={close}>
              {l.label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
          ))}
        </nav>
        <div className="drawer-actions">
          <Link href="/register" className="btn btn-ghost" onClick={close}>
            Registration
          </Link>
          <a href={`${base}#contact`} className="btn btn-ghost" onClick={close}>
            Book a demo
          </a>
          <a href={`${base}#contact`} className="btn btn-primary" onClick={close}>
            Start free trial
          </a>
        </div>
      </div>
    </>
  );
}
