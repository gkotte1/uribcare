import type { Metadata } from 'next';
import DetailPage from '@/components/DetailPage';
import { AUTISM_CARE } from '@/content/autism';
import { SERVICE_NAV } from '@/content/nav';

export const metadata: Metadata = {
  title: 'Autism care — Uribcare',
  description: AUTISM_CARE.metaDescription,
};

export default function AutismCarePage() {
  const siblings = SERVICE_NAV.map((service) => ({
    name: service.name,
    href: service.href,
    icon: service.icon,
  }));

  return (
    <DetailPage
      detail={AUTISM_CARE}
      siblings={siblings}
      siblingsLabel="The therapies most often involved in autism care"
      featuredJourney
    />
  );
}
