import type { Metadata } from 'next';
import LandingPage from '@/components/LandingPage';
import { HOME_LANGUAGES, getDictionary, homeUrl } from '@/content/i18n';

const en = getDictionary('en');

/**
 * English home page at `/`. Canonical and hreflang live here rather than in the
 * group layout, which also wraps /autism-care, /services/*, /ecosystem/* and
 * /register — a canonical at that level would point all of them here.
 */
export const metadata: Metadata = {
  title: en.meta.title,
  description: en.meta.description,
  alternates: {
    canonical: homeUrl('en'),
    languages: HOME_LANGUAGES,
  },
  openGraph: {
    title: en.meta.title,
    description: en.meta.description,
    url: homeUrl('en'),
    locale: 'en_US',
    type: 'website',
  },
};

export default function Home() {
  return <LandingPage locale="en" />;
}
