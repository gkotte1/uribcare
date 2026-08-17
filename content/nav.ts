import type { IconName } from '@/components/CategoryIcon';
import type { Locale } from '@/lib/i18n';

/**
 * Source of truth for each category's slug, name, card copy and icon, in every
 * language. Slugs are deliberately identical across locales so a page keeps the
 * same path in both trees and the language switch never changes the route.
 *
 * The navbar dropdowns import only this module so they stay small, while the
 * full detail-page entries in `services.*.ts` / `ecosystem.*.ts` spread the same
 * values in via `summary()`, so a name or slug is only ever written once.
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

export const SERVICE_NAV: Record<Locale, NavItem[]> = {
  en: [
    service(
      'physical-therapy',
      'Physical Therapy',
      'Restore mobility, reduce pain, build strength, and regain independence through personalized, goal-driven programs for every age.',
      'physical'
    ),
    service(
      'occupational-therapy',
      'Occupational Therapy',
      'Develop the skills for daily living, learning and working, so patients participate confidently in the activities that matter to them.',
      'occupational'
    ),
    service(
      'speech-therapy',
      'Speech Therapy',
      'Improve communication, language, speech clarity, cognitive skills and swallowing, for children and adults alike.',
      'speech'
    ),
  ],
  es: [
    service(
      'physical-therapy',
      'Fisioterapia',
      'Recupere la movilidad, reduzca el dolor, gane fuerza y vuelva a ser independiente con programas personalizados y orientados a objetivos, para todas las edades.',
      'physical'
    ),
    service(
      'occupational-therapy',
      'Terapia ocupacional',
      'Desarrolle las habilidades para la vida diaria, el aprendizaje y el trabajo, para que cada paciente participe con confianza en las actividades que le importan.',
      'occupational'
    ),
    service(
      'speech-therapy',
      'Terapia del habla',
      'Mejore la comunicación, el lenguaje, la claridad del habla, las habilidades cognitivas y la deglución, tanto en niños como en adultos.',
      'speech'
    ),
  ],
};

export const ECOSYSTEM_NAV: Record<Locale, NavItem[]> = {
  en: [
    ecosystem(
      'doctors-specialists',
      'Doctors & specialists',
      'Find the right physician, consult online or in person, and keep every diagnosis and note in one shared record.',
      'doctors'
    ),
    ecosystem(
      'therapists-counselors',
      'Therapists & counselors',
      'Behavioral, occupational, speech and mental-health support: matched, scheduled and tracked over time.',
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
      'Prescriptions flow straight from consult to pharmacy, with refills and reminders built in.',
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
  ],
  es: [
    ecosystem(
      'doctors-specialists',
      'Médicos y especialistas',
      'Encuentre al médico indicado, consulte en línea o de forma presencial y mantenga cada diagnóstico y nota en un mismo expediente compartido.',
      'doctors'
    ),
    ecosystem(
      'therapists-counselors',
      'Terapeutas y consejeros',
      'Apoyo conductual, ocupacional, del habla y de salud mental: asignado, agendado y con seguimiento a lo largo del tiempo.',
      'therapists'
    ),
    ecosystem(
      'nurses-home-care',
      'Enfermería y atención domiciliaria',
      'Visitas a domicilio coordinadas y apoyo continuo que siempre permanecen conectados con el resto del equipo de atención.',
      'nurses'
    ),
    ecosystem(
      'pharmacies',
      'Farmacias',
      'Las recetas pasan directamente de la consulta a la farmacia, con resurtidos y recordatorios incluidos.',
      'pharmacies'
    ),
    ecosystem(
      'diagnostic-labs',
      'Laboratorios de diagnóstico',
      'Solicite estudios, agende la toma de muestras y reciba los resultados en el expediente de forma automática para cada profesional.',
      'labs'
    ),
    ecosystem(
      'connected-record',
      'Un expediente conectado',
      'Todos trabajan desde la misma fuente de información, así nada se repite y nada se pierde.',
      'record'
    ),
  ],
};

/** The catalog fields a detail entry shares with its nav item. Throws at build time on an unknown slug. */
export function summary(list: NavItem[], slug: string) {
  const found = list.find((entry) => entry.slug === slug);
  if (!found) throw new Error(`Unknown catalog slug: ${slug}`);
  return { slug: found.slug, name: found.name, shortDescription: found.shortDescription, icon: found.icon };
}
