import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DetailPage from '@/components/DetailPage';
import { ECOSYSTEM, getEcosystem } from '@/content/ecosystem';

type Params = { params: { slug: string } };

/** Pre-renders one static page per ecosystem category at build time. */
export function generateStaticParams() {
  return ECOSYSTEM.map((entry) => ({ slug: entry.slug }));
}

/**
 * The catalog is static, so any other slug is served the prerendered 404 page
 * rather than being rendered on demand just to call `notFound()`.
 */
export const dynamicParams = false;

export function generateMetadata({ params }: Params): Metadata {
  const entry = getEcosystem(params.slug);
  if (!entry) return { title: 'Page not found — Uribcare' };
  return {
    title: `${entry.name} — Uribcare`,
    description: entry.metaDescription,
  };
}

export default function EcosystemDetailPage({ params }: Params) {
  const entry = getEcosystem(params.slug);
  if (!entry) notFound();

  const siblings = ECOSYSTEM.filter((e) => e.slug !== entry.slug).map((e) => ({
    name: e.name,
    href: `/ecosystem/${e.slug}`,
    icon: e.icon,
  }));

  return (
    <DetailPage
      detail={entry}
      siblings={siblings}
      siblingsLabel="Explore the rest of the ecosystem"
      parent={{ label: 'Ecosystem', href: '/#ecosystem' }}
    />
  );
}
