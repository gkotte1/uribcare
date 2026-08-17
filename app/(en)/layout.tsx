import type { Metadata, Viewport } from 'next';
import { fontVars } from '../fonts';
import { SITE_URL } from '@/content/i18n';
import '../globals.css';

/**
 * English root layout — renders `<html lang="en">` for every route in the
 * `(en)` group. The Spanish group has its own root layout with `lang="es"`;
 * two root layouts are the only way to vary the `<html>` element per route.
 *
 * Canonical and hreflang are deliberately NOT set here: this layout wraps
 * /autism-care, /services/*, /ecosystem/* and /register too, and a canonical
 * at this level would wrongly point all of them at the home page. Each page
 * declares its own.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Uribcare — Connecting Care, Simplifying Healthcare',
  description:
    'Uribcare is a connected healthcare ecosystem linking patients with doctors, therapists, counselors, nurses, pharmacies and labs — online and in person. Autism care is where we go deepest.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#12857A',
};

export default function EnRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars}>
      <body>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
