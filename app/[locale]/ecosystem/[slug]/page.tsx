import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DetailPage from '@/components/DetailPage';
import { ECOSYSTEM, ECOSYSTEM_SLUGS, getEcosystem } from '@/content/ecosystem';
import { getDictionary } from '@/content/dictionary';
import { LOCALES, alternatesFor, isLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

type Params = { params: { locale: string; slug: string } };

/** One static page per ecosystem category, per locale. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => ECOSYSTEM_SLUGS.map((slug) => ({ locale, slug })));
}

/**
 * The catalog is static, so any other slug is served the prerendered 404 page
 * rather than being rendered on demand just to call `notFound()`.
 */
export const dynamicParams = false;

export function generateMetadata({ params }: Params): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const entry = getEcosystem(locale, params.slug);
  if (!entry) return { title: 'Page not found | Uribcare' };
  return {
    title: `${entry.name} | Uribcare`,
    description: entry.metaDescription,
    alternates: alternatesFor(`/ecosystem/${entry.slug}`),
  };
}

export default function EcosystemDetailPage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const entry = getEcosystem(locale, params.slug);
  if (!entry) notFound();
  const t = getDictionary(locale);

  const siblings = ECOSYSTEM[locale].filter((e) => e.slug !== entry.slug).map((e) => ({
    name: e.name,
    href: `/ecosystem/${e.slug}`,
    icon: e.icon,
  }));

  return (
    <DetailPage
      locale={locale}
      detail={entry}
      siblings={siblings}
      siblingsLabel={t.detail.restOfEcosystem}
      parent={{ label: t.detail.ecosystem, href: '/#ecosystem' }}
    />
  );
}
