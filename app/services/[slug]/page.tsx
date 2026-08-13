import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DetailPage from '@/components/DetailPage';
import { SERVICES, getService } from '@/content/services';

type Params = { params: { slug: string } };

/** Pre-renders one static page per service at build time. */
export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

/**
 * The catalog is static, so any other slug is served the prerendered 404 page
 * rather than being rendered on demand just to call `notFound()`.
 */
export const dynamicParams = false;

export function generateMetadata({ params }: Params): Metadata {
  const service = getService(params.slug);
  if (!service) return { title: 'Service not found — Uribcare' };
  return {
    title: `${service.name} — Uribcare`,
    description: service.metaDescription,
  };
}

export default function ServiceDetailPage({ params }: Params) {
  const service = getService(params.slug);
  if (!service) notFound();

  const siblings = SERVICES.filter((s) => s.slug !== service.slug).map((s) => ({
    name: s.name,
    href: `/services/${s.slug}`,
    icon: s.icon,
  }));

  return (
    <DetailPage
      detail={service}
      siblings={siblings}
      siblingsLabel="Explore our other services"
      parent={{ label: 'Services', href: '/#services' }}
    />
  );
}
