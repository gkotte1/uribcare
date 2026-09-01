import type { BlogContent } from './blog.en';

/**
 * Spanish copy for the blog listing page. Typed as `BlogContent`, so any key
 * missing here is a build error rather than an English string leaking onto
 * /es/blog. URiBCARE is a brand name and stays untranslated, and article slugs
 * are shared with English so the language switch never changes the route.
 */
export const blogEs: BlogContent = {
  meta: {
    title: 'Blog de Uribcare | Ideas sobre la atención conectada',
    description:
      'Descubra las ideas de Uribcare sobre la atención conectada, el autismo, la coordinación del cuidado y mejores experiencias para pacientes, familias y equipos de atención.',
  },
  hero: {
    eyebrow: 'URiBCARE Ideas',
    heading: 'Perspectivas sobre la atención conectada.',
    lead: 'Reflexiones sobre la coordinación de la atención, el cuidado del autismo y las personas y los sistemas que hacen posible una mejor atención.',
  },
  featured: {
    label: 'Destacado',
    srHeading: 'Artículo destacado',
  },
  latest: {
    heading: 'Lo más reciente de Uribcare',
  },
  card: {
    read: 'Leer el artículo',
    comingSoon: 'Próximamente',
  },
  cta: {
    heading: 'La atención funciona mejor cuando todos siguen conectados.',
    body: 'Descubra cómo Uribcare reúne a pacientes, familias y equipos de atención.',
    action: 'Explorar Uribcare',
  },
  posts: [
    {
      slug: 'coordinated-autism-care-why-it-matters',
      category: 'Autismo',
      title: 'Por qué la atención coordinada importa más en condiciones continuas como el autismo',
      excerpt:
        'El cuidado del autismo suele involucrar a varios profesionales que acompañan a un mismo niño durante años. Le explicamos por qué la coordinación entre ellos importa, y cómo se ve la atención conectada en la práctica.',
      readingTime: '6 min de lectura',
      published: true,
    },
  ],
};
