import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DetailPage from '@/components/DetailPage';
import { SERVICE_SLUGS, SERVICES, getService } from '@/content/services';
import { getDictionary } from '@/content/dictionary';
import { LOCALES, alternatesFor, isLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

type Params = { params: { locale: string; slug: string } };

/** One static page per service, per locale. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => SERVICE_SLUGS.map((slug) => ({ locale, slug })));
}

/**
 * The catalog is static, so any other slug is served the prerendered 404 page
 * rather than being rendered on demand just to call `notFound()`.
 */
export const dynamicParams = false;

export function generateMetadata({ params }: Params): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const service = getService(locale, params.slug);
  if (!service) return { title: 'Service not found | Uribcare' };
  return {
    title: `${service.name} | Uribcare`,
    description: service.metaDescription,
    alternates: alternatesFor(`/services/${service.slug}`),
  };
}

export default function ServiceDetailPage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const service = getService(locale, params.slug);
  if (!service) notFound();
  const t = getDictionary(locale);

  const siblings = SERVICES[locale].filter((s) => s.slug !== service.slug).map((s) => ({
    name: s.name,
    href: `/services/${s.slug}`,
    icon: s.icon,
  }));

  return (
    <DetailPage
      locale={locale}
      detail={service}
      siblings={siblings}
      siblingsLabel={t.detail.otherServices}
      parent={{ label: t.detail.services, href: '/#services' }}
    />
  );
}
