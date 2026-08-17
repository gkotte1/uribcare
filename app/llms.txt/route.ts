import { AUTISM_CARE } from '@/content/autism';
import { ECOSYSTEM_NAV, SERVICE_NAV } from '@/content/nav';
import { SITE_URL, getDictionary, homeUrl } from '@/content/i18n';

/** Prerendered at build time rather than served per request. */
export const dynamic = 'force-static';

/**
 * Serves /llms.txt.
 *
 * Built from the same content modules the pages render, so every line is copy
 * that already exists on the site and every URL is a route that actually
 * exists. Nothing here is authored for this file — no new claims, figures,
 * services or descriptions.
 */
const en = getDictionary('en');
const es = getDictionary('es');

const list = (items: { name: string; shortDescription: string; href: string }[]) =>
  items.map((i) => `- [${i.name}](${SITE_URL}${i.href}): ${i.shortDescription}`).join('\n');

const body = `# Uribcare (URiBCare LLC)

> ${en.meta.description}

${en.footer.tagline}

## Main pages

- [Uribcare — English home page](${homeUrl('en')}): ${en.meta.description}
- [Uribcare — Spanish home page / Página principal en español](${homeUrl('es')}): ${es.meta.description}

The site is bilingual: English at the root path and Spanish under /es — see the
two Main pages entries above for their full URLs. Both home pages cover the same
sections: the care ecosystem, services, the patient journey, autism care, care
principles, audiences, security and compliance, FAQs, and a contact form.

## Services

Specialized therapy for children and adults.

${list(SERVICE_NAV)}

## Ecosystem

Every part of care, connected on one platform.

${list(ECOSYSTEM_NAV)}

## Autism care

- [${AUTISM_CARE.name}](${SITE_URL}/autism-care): ${AUTISM_CARE.shortDescription}

## Registration

- [Register](${SITE_URL}/register): Register with URiBCARE as a patient, doctor, therapist, counselor, pharmacy or laboratory and join one connected care ecosystem.

## Security and compliance

${en.trust.cards.map((c) => `- ${c.title}: ${c.body}`).join('\n')}

## Contact

- Email: contact@uribcare.com
- Phone: +1 (770) 910-5581
- Phone: +1 (201) 686-3935
- Website: ${SITE_URL}/

## Notes for machine readers

- Sitemap: ${SITE_URL}/sitemap.xml
- Robots: ${SITE_URL}/robots.txt
- The detail pages under /services/ and /ecosystem/, plus /autism-care and
  /register, are currently published in English only.
`;

export function GET() {
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
