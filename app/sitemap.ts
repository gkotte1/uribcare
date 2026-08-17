import type { MetadataRoute } from 'next';
import { ECOSYSTEM_NAV, SERVICE_NAV } from '@/content/nav';
import { HOME_LANGUAGES, SITE_URL, homeUrl } from '@/content/i18n';

/** Prerendered at build time rather than served per request. */
export const dynamic = 'force-static';

/**
 * Serves /sitemap.xml.
 *
 * Service and ecosystem URLs are derived from the same catalog the navbar and
 * the `generateStaticParams` of their detail routes read, so the sitemap cannot
 * drift from the pages that actually exist and no slug is ever guessed.
 *
 * Paths carry no trailing slash because the app runs with Next's default
 * `trailingSlash: false` — the slashed forms answer 308, and a sitemap should
 * only list URLs that return 200. The bare origin is the one exception, since
 * `https://host` and `https://host/` are the same request.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    // Home pages, cross-declared so crawlers see the language pair here too.
    {
      url: homeUrl('en'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: HOME_LANGUAGES },
    },
    {
      url: homeUrl('es'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
      alternates: { languages: HOME_LANGUAGES },
    },

    // Dedicated care page
    {
      url: `${SITE_URL}/autism-care`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },

    // Service detail pages
    ...SERVICE_NAV.map((service) => ({
      url: `${SITE_URL}${service.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    // Ecosystem detail pages
    ...ECOSYSTEM_NAV.map((entry) => ({
      url: `${SITE_URL}${entry.href}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    // Registration
    {
      url: `${SITE_URL}/register`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.6,
    },
  ];
}
