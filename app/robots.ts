import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/content/i18n';

/** Prerendered at build time rather than served per request. */
export const dynamic = 'force-static';

/**
 * Serves /robots.txt.
 *
 * Every public route is crawlable — including `/` and `/es` — and nothing is
 * disallowed, because the site has no private, API or admin routes to shield.
 * `/_next/` is deliberately NOT blocked: crawlers need the JS and CSS under it
 * to render the pages, and blocking it degrades indexing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
