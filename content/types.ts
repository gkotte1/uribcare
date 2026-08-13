import type { IconName } from '@/components/CategoryIcon';

export type Card = { title: string; text: string };

export type AudienceGroup = {
  tag: string;
  title: string;
  points: string[];
  /** Matches the existing `.aud-card cool` / `.aud-card warm` treatments. */
  tone: 'cool' | 'warm';
};

export type Step = { label: string; title: string; text: string };

export type Cta = {
  heading: string;
  text: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  note: string;
};

/**
 * One detail page. Services and ecosystem entries share the shape so a single
 * dynamic route and a single renderer can drive both — only the copy differs.
 */
export type Detail = {
  kind: 'service' | 'ecosystem';
  slug: string;
  /** Category name, kept identical to the wording used on the home page. */
  name: string;
  /** The card copy already shown on the home page; also used in the navbar dropdown. */
  shortDescription: string;
  icon: IconName;
  eyebrow: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  /** Optional so a page can be published before its photography exists. */
  image?: { src: string; alt: string; caption: string };
  overview: { heading: string; paragraphs: string[]; highlights: string[] };
  provides: { eyebrow: string; heading: string; intro: string; cards: Card[] };
  audience: { eyebrow: string; heading: string; groups: AudienceGroup[] };
  benefits: { eyebrow: string; heading: string; intro: string; cards: Card[] };
  support: { eyebrow: string; heading: string; text: string; points: string[]; quote: string; quoteWho: string };
  process: { eyebrow: string; heading: string; intro: string; steps: Step[] };
  cta: Cta;
};
