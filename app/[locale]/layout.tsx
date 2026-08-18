import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { notFound } from 'next/navigation';
import { LOCALES, SITE_URL, alternatesFor, isLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import '../globals.css';

/**
 * Self-hosted variable fonts (public/fonts). Self-hosting keeps the build free
 * of any network dependency and avoids a third-party request at runtime.
 */
const sans = localFont({
  src: [{ path: '../../public/fonts/inter-latin.woff2', weight: '100 900', style: 'normal' }],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
});

const serif = localFont({
  src: [
    { path: '../../public/fonts/source-serif-4.woff2', weight: '200 900', style: 'normal' },
    { path: '../../public/fonts/source-serif-4-italic.woff2', weight: '200 900', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-serif',
  fallback: ['Iowan Old Style', 'Palatino Linotype', 'Georgia', 'serif'],
});

type Params = { params: { locale: string } };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

const META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: 'Uribcare | Connecting Care, Simplifying Healthcare',
    description:
      'Uribcare is a connected healthcare ecosystem linking patients with doctors, therapists, counselors, nurses, pharmacies and labs, online and in person. Autism care is where we go deepest.',
  },
  es: {
    title: 'Uribcare | Atención conectada, salud más simple',
    description:
      'Uribcare es un ecosistema de salud conectado que vincula a los pacientes con médicos, terapeutas, consejeros, enfermeras, farmacias y laboratorios, en línea y de forma presencial. La atención del autismo es nuestra especialidad más profunda.',
  },
};

/**
 * The social preview card. The URL is absolute and pinned to the production
 * origin, so crawlers resolve it correctly whatever host rendered the page.
 * The file itself is the supplied artwork in `public/images`, used unmodified.
 */
const OG_IMAGE = {
  url: 'https://uribcare.fh.bio/images/og-uribcare.png',
  width: 1536,
  height: 1024,
  alt: 'URIBCARE',
};

const OG_LOCALE: Record<Locale, string> = { en: 'en_US', es: 'es_ES' };

/**
 * Open Graph and Twitter cards are declared once, here, so every route inherits
 * them. Deliberately no `title`, `description` or `url` in the `openGraph`
 * block: leaving those out lets Next fall back to each page's own resolved
 * title and description instead of pinning the home page's copy onto every
 * child route.
 */
export function generateMetadata({ params }: Params): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  return {
    ...META[locale],
    metadataBase: new URL(SITE_URL),
    alternates: alternatesFor('/'),
    openGraph: {
      type: 'website',
      siteName: 'Uribcare',
      locale: OG_LOCALE[locale],
      alternateLocale: LOCALES.filter((l) => l !== locale).map((l) => OG_LOCALE[l]),
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      images: [OG_IMAGE],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#12857A',
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) notFound();
  const locale: Locale = params.locale;

  return (
    <html lang={locale} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#top">
          {locale === 'es' ? 'Ir al contenido' : 'Skip to content'}
        </a>
        {children}
      </body>
    </html>
  );
}
