import type { Metadata, Viewport } from 'next';
import { fontVars } from '../fonts';
import { SITE_URL, getDictionary } from '@/content/i18n';
import '../globals.css';

const es = getDictionary('es');

/**
 * Spanish root layout — renders `<html lang="es">`. Mirrors the `(en)` layout
 * so both language trees share the same stylesheet, fonts and body chrome; only
 * the `lang` attribute and the default metadata differ.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: es.meta.title,
  description: es.meta.description,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#12857A',
};

export default function EsRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={fontVars}>
      <body>
        <a className="skip-link" href="#top">
          {es.skipLink}
        </a>
        {children}
      </body>
    </html>
  );
}
