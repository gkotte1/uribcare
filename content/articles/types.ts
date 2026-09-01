/**
 * The shape of a long-form article. Content lives in per-locale data files and
 * is rendered by `components/ArticleBody`, so adding or replacing an article is
 * a data change, never a layout change.
 */

/**
 * Every internal destination an article is allowed to link to. `RichText`
 * validates each link against this list and throws during the build on anything
 * else, so an article can never ship a link to a route that does not exist.
 */
export const INTERNAL_ROUTES = [
  '/',
  '/autism-care',
  '/blog',
  '/ecosystem/doctors-specialists',
  '/ecosystem/therapists-counselors',
  '/services/occupational-therapy',
  '/services/physical-therapy',
  '/services/speech-therapy',
] as const;

export type InternalRoute = (typeof INTERNAL_ROUTES)[number];

export const isInternalRoute = (value: string): value is InternalRoute =>
  (INTERNAL_ROUTES as readonly string[]).includes(value);

/**
 * Prose carries inline links in a deliberately small markdown subset:
 * `[label](/autism-care)`. Nothing else is parsed, so pasted copy renders as
 * written and cannot introduce markup.
 */
export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  | { kind: 'quote'; text: string };

export type Section = {
  /** Anchor target, also used by the contents list at the top of the article. */
  id: string;
  heading: string;
  /** Empty until the final copy is inserted; the page shows a pending slot. */
  blocks: Block[];
};

export type Article = {
  slug: string;
  category: string;
  eyebrow: string;
  title: string;
  description: string;
  readingTime: string;

  /** Set when the article is published; absent means no date is displayed. */
  date?: { iso: string; label: string };

  /**
   * Article artwork. `width`/`height` are the file's intrinsic pixel size: they
   * let the browser reserve the right box before the image loads, and let the
   * figure keep the image's own aspect ratio so nothing is ever cropped.
   */
  image?: { src: string; alt: string; width: number; height: number };

  sections: Section[];

  cta: {
    heading: string;
    /** Rendered as a link so the heading itself leads somewhere useful. */
    href: InternalRoute;
    action: string;
    actionHref: string;
  };

  meta: { title: string; description: string };
};
