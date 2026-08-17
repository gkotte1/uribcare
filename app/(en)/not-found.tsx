import type { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Page not found — Uribcare',
};

export default function NotFound() {
  return (
    <>
      <Nav />

      <main id="top">
        <section className="band notfound">
          <div className="wrap">
            <div className="band-head center">
              <span className="eyebrow">404</span>
              <h1>We couldn&apos;t find that page</h1>
              <p className="lead">
                The link may be out of date, or the page may have moved. Everything below will take you back to a
                working part of Uribcare.
              </p>
            </div>
            <div className="hero-cta notfound-cta">
              <Link href="/" className="btn btn-primary btn-lg">
                Back to home
              </Link>
              <Link href="/register" className="btn btn-ghost btn-lg">
                Registration
              </Link>
            </div>
            <div className="provider-row notfound-links">
              <Link className="pchip pchip-link" href="/#services">
                Our services
              </Link>
              <Link className="pchip pchip-link" href="/#ecosystem">
                The ecosystem
              </Link>
              <Link className="pchip pchip-link" href="/#journey">
                How it works
              </Link>
              <Link className="pchip pchip-link" href="/#contact">
                Book a demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter base="/" />
    </>
  );
}
