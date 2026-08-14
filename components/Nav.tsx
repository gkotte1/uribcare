/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import CategoryIcon from '@/components/CategoryIcon';
import { ECOSYSTEM_NAV, SERVICE_NAV } from '@/content/nav';
import type { NavItem } from '@/content/nav';

type MenuId = 'services' | 'ecosystem';

/** Category lists behind the Services and Ecosystem nav items. */
const MENUS: Record<MenuId, { items: NavItem[]; allLabel: string }> = {
  services: { items: SERVICE_NAV, allLabel: 'View the services section' },
  ecosystem: { items: ECOSYSTEM_NAV, allLabel: 'View the ecosystem section' },
};

/** `route: true` marks a link to its own page rather than a home page section. */
const LINKS: { href: string; label: string; menu?: MenuId; route?: boolean }[] = [
  { href: '#services', label: 'Services', menu: 'services' },
  { href: '#ecosystem', label: 'Ecosystem', menu: 'ecosystem' },
  { href: '#journey', label: 'How it works' },
  { href: '/autism-care', label: 'Autism care', route: true },
  { href: '#trust', label: 'Security' },
];

const Caret = () => (
  <svg className="nav-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId | null>(null);
  const [active, setActive] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
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
    const ids = LINKS.filter((l) => !l.route).map((l) => l.href.slice(1));
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

  // close an open dropdown on Escape or on a click outside the navbar
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [openMenu]);

  // never leave a menu or the drawer hanging open across a route change
  useEffect(() => {
    setOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  const close = useCallback(() => {
    setOpen(false);
    setOpenMenu(null);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    const cur =
      root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    root.setAttribute('data-theme', cur === 'dark' ? 'light' : 'dark');
  };

  const categoryLinks = (items: NavItem[]) =>
    items.map((item) => (
      <Link className="nav-menu-item" href={item.href} key={item.slug} onClick={close}>
        <span className="nav-menu-ico">
          <CategoryIcon name={item.icon} size={20} />
        </span>
        <span>
          <strong>{item.name}</strong>
          <span className="nav-menu-desc">{item.shortDescription}</span>
        </span>
      </Link>
    ));

  return (
    <>
      <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav" ref={headerRef}>
        <div
          className="scroll-progress"
          style={{ width: '100%', transform: `scaleX(${progress})`, opacity: scrolled ? 1 : 0 }}
          aria-hidden="true"
        />
        <div className="wrap nav-inner">
          <a className="brand" href={`${base}#top`} aria-label="URIBCARE home" onClick={close}>
            <img className="brand-logo" src="/images/logo.png" alt="URIBCARE" width={200} height={67} decoding="sync" />
          </a>

          <nav className="nav-links" aria-label="Primary">
            {LINKS.map((l) => {
              const isActive = l.route ? pathname === l.href : isHome && active === l.href.slice(1);

              if (l.route) {
                return (
                  <Link key={l.href} href={l.href} aria-current={isActive ? 'true' : undefined} onClick={close}>
                    {l.label}
                  </Link>
                );
              }

              if (!l.menu) {
                return (
                  <a key={l.href} href={`${base}${l.href}`} aria-current={isActive ? 'true' : undefined}>
                    {l.label}
                  </a>
                );
              }

              const menu = MENUS[l.menu];
              const expanded = openMenu === l.menu;
              return (
                <div
                  className="nav-item"
                  key={l.href}
                  onMouseEnter={() => setOpenMenu(l.menu as MenuId)}
                  onMouseLeave={() => setOpenMenu((cur) => (cur === l.menu ? null : cur))}
                >
                  <button
                    type="button"
                    className="nav-trigger"
                    aria-expanded={expanded}
                    aria-controls={`nav-menu-${l.menu}`}
                    data-active={isActive ? 'true' : undefined}
                    onClick={() => {
                      setOpenMenu((cur) => (cur === l.menu ? null : (l.menu as MenuId)));
                      setOpen(false);
                    }}
                  >
                    {l.label}
                    <Caret />
                  </button>
                  {expanded && (
                    <div className={`nav-menu${menu.items.length > 4 ? ' wide' : ''}`} id={`nav-menu-${l.menu}`}>
                      <div className="nav-menu-inner">
                        <div className="nav-menu-grid">{categoryLinks(menu.items)}</div>
                        <a className="nav-menu-all" href={`${base}${l.href}`} onClick={close}>
                          {menu.allLabel}
                          <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="nav-cta">
            <a href={`${base}#contact`} className="btn btn-quiet nav-hide-md">
              Book a demo
            </a>
            <Link href="/register" className="btn btn-ghost nav-hide-sm">
              Registration
            </Link>
            <a href={`${base}#contact`} className="btn btn-primary">
              Start free trial
            </a>

            {/* last control on the right, after the CTAs */}
            <button className="icon-btn theme-toggle" id="themeBtn" aria-label="Toggle light and dark theme" onClick={toggleTheme}>
              <svg className="sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4" />
              </svg>
              <svg className="moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
              </svg>
            </button>

            <button
              className="icon-btn nav-burger"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="nav-drawer"
              onClick={() => {
                setOpen((v) => !v);
                setOpenMenu(null);
              }}
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
          {LINKS.map((l) =>
            l.route ? (
              <Link
                key={l.href}
                className="dl"
                href={l.href}
                aria-current={pathname === l.href ? 'true' : undefined}
                onClick={close}
              >
                {l.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </Link>
            ) : l.menu ? (
              // the section link, followed by its individual detail pages
              <div className="drawer-group" key={l.href}>
                <a className="dl" href={`${base}${l.href}`} onClick={close}>
                  {l.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </a>
                <div className="drawer-sub">{categoryLinks(MENUS[l.menu].items)}</div>
              </div>
            ) : (
              <a key={l.href} className="dl" href={`${base}${l.href}`} onClick={close}>
                {l.label}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </a>
            )
          )}
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
