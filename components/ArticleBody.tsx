import Link from 'next/link';
import type { ReactNode } from 'react';
import { isInternalRoute } from '@/content/articles/types';
import type { Block, Section } from '@/content/articles/types';
import { localeHref } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

/**
 * Prose with inline internal links, written as `[label](/autism-care)`. Nothing
 * else is parsed, so supplied copy renders exactly as written and cannot
 * introduce markup. A link to a route outside `INTERNAL_ROUTES` throws during
 * the build rather than shipping a dead link.
 */
export function RichText({ text, locale }: { text: string; locale: Locale }) {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    const [whole, label, href] = match;
    if (match.index > last) out.push(text.slice(last, match.index));
    if (!isInternalRoute(href)) {
      throw new Error(
        `Article link points at an unknown route: "${href}". Add it to INTERNAL_ROUTES or correct the link.`
      );
    }
    out.push(
      <Link key={`${match.index}-${href}`} href={localeHref(locale, href)}>
        {label}
      </Link>
    );
    last = match.index + whole.length;
  }
  if (last < text.length) out.push(text.slice(last));

  return <>{out}</>;
}

function BlockView({ block, locale }: { block: Block; locale: Locale }) {
  switch (block.kind) {
    case 'p':
      return (
        <p>
          <RichText text={block.text} locale={locale} />
        </p>
      );
    case 'ul':
      return (
        <ul className="article-list">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} locale={locale} />
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="article-list article-list-num">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} locale={locale} />
            </li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <blockquote className="article-quote">
          <RichText text={block.text} locale={locale} />
        </blockquote>
      );
  }
}

/**
 * One article section: a heading and its blocks. `id` is the anchor the
 * contents list at the top of the article links to.
 */
export default function ArticleSection({ section, locale }: { section: Section; locale: Locale }) {
  return (
    <section className="article-sec" id={section.id}>
      <h2>{section.heading}</h2>
      {section.blocks.map((block, i) => (
        <BlockView key={i} block={block} locale={locale} />
      ))}
    </section>
  );
}
