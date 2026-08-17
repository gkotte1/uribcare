import type { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';
import { HOME_LANGUAGES, getDictionary, homeUrl } from '@/content/i18n';

const es = getDictionary('es');

/** Spanish home page at `/es`. Mirrors the English page's metadata contract. */
export const metadata: Metadata = {
  title: es.meta.title,
  description: es.meta.description,
  alternates: {
    canonical: homeUrl('es'),
    languages: HOME_LANGUAGES,
  },
  openGraph: {
    title: es.meta.title,
    description: es.meta.description,
    url: homeUrl('es'),
    locale: 'es_US',
    type: 'website',
  },
};

export default function HomeEs() {
  return <LandingPage locale="es" />;
}
