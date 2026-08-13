import type { IconName } from '@/components/CategoryIcon';

/**
 * Source of truth for the category name, slug, card copy and icon.
 *
 * The navbar dropdowns import only this module so they stay small, while the
 * full detail-page entries in `services.ts` / `ecosystem.ts` spread the same
 * values in via `summary()` — so a name or slug is only ever written once.
 */
export type NavItem = {
  slug: string;
  name: string;
  shortDescription: string;
  icon: IconName;
  href: string;
};

const item = (base: string) => (slug: string, name: string, shortDescription: string, icon: IconName): NavItem => ({
  slug,
  name,
  shortDescription,
  icon,
  href: `/${base}/${slug}`,
});

const service = item('services');
const ecosystem = item('ecosystem');

export const SERVICE_NAV: NavItem[] = [
  service(
    'physical-therapy',
    'Physical Therapy',
    'Restore mobility, reduce pain, build strength, and regain independence through personalized, goal-driven programs for every age.',
    'physical'
  ),
  service(
    'occupational-therapy',
    'Occupational Therapy',
    'Develop the skills for daily living, learning and working — so patients participate confidently in the activities that matter to them.',
    'occupational'
  ),
  service(
    'speech-therapy',
    'Speech Therapy',
    'Improve communication, language, speech clarity, cognitive skills and swallowing — for children and adults alike.',
    'speech'
  ),
];

export const ECOSYSTEM_NAV: NavItem[] = [
  ecosystem(
    'doctors-specialists',
    'Doctors & specialists',
    'Find the right physician, consult online or in person, and keep every diagnosis and note in one shared record.',
    'doctors'
  ),
  ecosystem(
    'therapists-counselors',
    'Therapists & counselors',
    'Behavioral, occupational, speech and mental-health support — matched, scheduled and tracked over time.',
    'therapists'
  ),
  ecosystem(
    'nurses-home-care',
    'Nurses & home care',
    'Coordinated in-home visits and ongoing support that stay linked to the patient’s wider care team.',
    'nurses'
  ),
  ecosystem(
    'pharmacies',
    'Pharmacies',
    'Prescriptions flow straight from consult to pharmacy — with refills and reminders built in.',
    'pharmacies'
  ),
  ecosystem(
    'diagnostic-labs',
    'Diagnostic labs',
    'Order tests, book collection, and see results land in the record automatically for every provider.',
    'labs'
  ),
  ecosystem(
    'connected-record',
    'One connected record',
    'Everyone works from the same source of truth, so nothing is repeated and nothing gets lost.',
    'record'
  ),
];

/** The catalog fields a detail entry shares with its nav item. Throws at build time on an unknown slug. */
export function summary(list: NavItem[], slug: string) {
  const found = list.find((entry) => entry.slug === slug);
  if (!found) throw new Error(`Unknown catalog slug: ${slug}`);
  return { slug: found.slug, name: found.name, shortDescription: found.shortDescription, icon: found.icon };
}
