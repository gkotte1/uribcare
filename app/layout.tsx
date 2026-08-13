import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

/**
 * Self-hosted variable fonts (public/fonts). Self-hosting keeps the build free
 * of any network dependency and avoids a third-party request at runtime.
 */
const sans = localFont({
  src: [{ path: '../public/fonts/inter-latin.woff2', weight: '100 900', style: 'normal' }],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
});

const serif = localFont({
  src: [
    { path: '../public/fonts/source-serif-4.woff2', weight: '200 900', style: 'normal' },
    { path: '../public/fonts/source-serif-4-italic.woff2', weight: '200 900', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-serif',
  fallback: ['Iowan Old Style', 'Palatino Linotype', 'Georgia', 'serif'],
});

export const metadata: Metadata = {
  title: 'Uribcare — Connecting Care, Simplifying Healthcare',
  description:
    'Uribcare is a connected healthcare ecosystem linking patients with doctors, therapists, counselors, nurses, pharmacies and labs — online and in person. Autism care is where we go deepest.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#12857A',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
