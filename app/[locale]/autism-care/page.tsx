import type { Metadata } from 'next';
import DetailPage from '@/components/DetailPage';
import { getAutismCare } from '@/content/autism';
import { SERVICE_NAV } from '@/content/nav';
import { getDictionary } from '@/content/dictionary';
import { alternatesFor, isLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

type Params = { params: { locale: string } };

export function generateMetadata({ params }: Params): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const detail = getAutismCare(locale);
  return {
    title: `${detail.name} | Uribcare`,
    description: detail.metaDescription,
    alternates: alternatesFor('/autism-care'),
  };
}

export default function AutismCarePage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const t = getDictionary(locale);

  const siblings = SERVICE_NAV[locale].map((service) => ({
    name: service.name,
    href: service.href,
    icon: service.icon,
  }));

  return (
    <DetailPage
      locale={locale}
      detail={getAutismCare(locale)}
      siblings={siblings}
      siblingsLabel={t.detail.autismTherapies}
      featuredJourney
    />
  );
}
