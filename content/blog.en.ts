/**
 * Every user-facing string on the blog listing page, in English. `blog.es.ts`
 * mirrors this shape and is type-checked against it, so a missing Spanish
 * string is a build error rather than English leaking onto /es/blog.
 *
 * Articles live in `posts`, newest first. Publishing one means adding a single
 * entry here and its Spanish twin; the featured slot and the card grid both
 * read from this array, so neither needs touching again.
 */

export type BlogPost = {
  /** Identical across locales, so an article keeps one path in both trees. */
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  readingTime: string;

  /**
   * Publication date. Absent until the article actually goes live, so the card
   * shows no date rather than an invented one. `iso` feeds <time datetime>,
   * `label` is what the reader sees.
   */
  date?: { iso: string; label: string };

  /**
   * True once the article page exists. The link is derived from `slug`, so the
   * card and the route can never point at different paths. While it is false
   * the card renders a non-interactive "coming soon" state rather than linking
   * into a 404.
   */
  published?: boolean;

  /**
   * Drop the artwork into `public/images` and point `src` at it. Until then
   * both layouts fall back to the branded placeholder panel, so no article is
   * ever illustrated with a stand-in photograph.
   */
  image?: { src: string; alt: string };
};

export const blogEn = {
  meta: {
    title: 'Uribcare Blog | Insights on Connected Care',
    description:
      'Explore Uribcare insights on connected healthcare, autism care, care coordination, and better experiences for patients, families, and care teams.',
  },
  hero: {
    eyebrow: 'URiBCARE Insights',
    heading: 'Perspectives on connected care.',
    lead: 'Thoughtful insights on healthcare coordination, autism care, and the people and systems that make better care possible.',
  },
  featured: {
    label: 'Featured',
    /** Names the featured region for screen readers; not shown visually. */
    srHeading: 'Featured article',
  },
  latest: {
    heading: 'Latest from Uribcare',
  },
  card: {
    read: 'Read article',
    comingSoon: 'Coming soon',
  },
  cta: {
    heading: 'Care works better when everyone stays connected.',
    body: 'Explore how Uribcare brings patients, families, and care teams together.',
    action: 'Explore Uribcare',
  },
  posts: [
    {
      slug: 'coordinated-autism-care-why-it-matters',
      category: 'Autism Care',
      title: 'Why Coordinated Care Matters Most for Ongoing Conditions Like Autism',
      excerpt:
        'Autism care often involves multiple providers working with one child over years. Here’s why coordination between them matters, and what connected care can look like in practice.',
      readingTime: '6 min read',
      published: true,
    },
  ] as BlogPost[],
};

export type BlogContent = typeof blogEn;
