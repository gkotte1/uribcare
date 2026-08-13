/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // On the home page the section links stay as in-page anchors; anywhere else
  // they need to point back at the home page first.
  const base = pathname === '/' ? '' : '/';

  // nav scrolled state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // theme toggle
  const toggleTheme = () => {
    const root = document.documentElement;
    const cur =
      root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="wrap nav-inner">
        <a className="brand" href={`${base}#top`} aria-label="URIBCARE home">
          <img className="brand-logo" src="/images/logo.png" alt="URIBCARE" width={164} height={55} />
        </a>
        <nav className="nav-links" aria-label="Primary">
          <a href={`${base}#services`}>Services</a>
          <a href={`${base}#ecosystem`}>Ecosystem</a>
          <a href={`${base}#journey`}>How it works</a>
          <a href={`${base}#autism`}>Autism care</a>
          <a href={`${base}#trust`}>Security</a>
        </nav>
        <div className="nav-cta">
          <button
            className="theme-toggle"
            id="themeBtn"
            aria-label="Toggle light and dark theme"
            onClick={toggleTheme}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="4.2" id="sun-c" />
              <g id="sun-r">
                <path d="M12 3v2" />
                <path d="M12 19v2" />
                <path d="M3 12h2" />
                <path d="M19 12h2" />
                <path d="M5.6 5.6l1.4 1.4" />
                <path d="M17 17l1.4 1.4" />
                <path d="M18.4 5.6L17 7" />
                <path d="M7 17l-1.4 1.4" />
              </g>
            </svg>
          </button>
          <a href={`${base}#contact`} className="btn btn-ghost">
            Book a demo
          </a>
          <Link href="/register" className="btn btn-ghost">
            Registration
          </Link>
          <a href={`${base}#contact`} className="btn btn-primary">
            Start free trial
          </a>
        </div>
      </div>
    </header>
  );
}
