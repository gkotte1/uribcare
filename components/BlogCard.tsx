/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { Arrow } from '@/components/Icons';
import type { BlogContent, BlogPost } from '@/content/blog';
import { localeHref } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

type CardLabels = BlogContent['card'];

/**
 * The article page renders the same artwork and meta row from its own record,
 * so both helpers take the minimum shape they need rather than a whole post.
 */
type HasImage = { image?: { src: string; alt: string } };
type HasMeta = { readingTime: string; date?: { iso: string; label: string } };

export type BlogCardProps = {
  post: BlogPost;
  labels: CardLabels;
  locale: Locale;
};

/**
 * An article's artwork, or the branded placeholder panel while none has been
 * supplied. The placeholder is decorative and carries no information the
 * category, title and excerpt do not already state, so it is hidden from
 * assistive technology rather than given invented alt text.
 */
export function ArticleMedia({ post }: { post: HasImage }) {
  if (!post.image) return <span className="blog-ph" aria-hidden="true" />;
  return <img src={post.image.src} alt={post.image.alt} loading="lazy" decoding="async" />;
}

/** Date and reading time. The date is omitted until an article is published. */
export function ArticleMeta({ post }: { post: HasMeta }) {
  return (
    <ul className="blog-meta">
      {post.date ? (
        <li>
          <time dateTime={post.date.iso}>{post.date.label}</time>
        </li>
      ) : null}
      <li>{post.readingTime}</li>
    </ul>
  );
}

/**
 * The read affordance. An article with no page yet renders as static text with
 * a "coming soon" badge rather than a link into a 404, so the state is carried
 * by words and not by colour alone.
 */
/** The article's path, or undefined while it is unpublished. */
export const postHref = (post: BlogPost) => (post.published ? `/blog/${post.slug}` : undefined);

export function ReadLink({ post, labels, locale }: BlogCardProps) {
  const href = postHref(post);
  if (!href) {
    return (
      <p className="blog-pending">
        {labels.read}
        <span className="blog-soon">{labels.comingSoon}</span>
      </p>
    );
  }
  return (
    <Link className="arrow-link" href={localeHref(locale, href)} aria-label={`${labels.read}: ${post.title}`}>
      {labels.read} <Arrow size={16} className="ar" />
    </Link>
  );
}

/**
 * One article in the listing grid. Built on the existing `.svc-card` shell the
 * home page services already use, so a blog card inherits the same border,
 * elevation, hover lift and responsive behaviour for free.
 */
export default function BlogCard({ post, labels, locale }: BlogCardProps) {
  const href = postHref(post);
  return (
    <article className="svc-card blog-card">
      <div className="svc-media">
        <ArticleMedia post={post} />
        <span className="svc-tag">{post.category}</span>
      </div>
      <div className="svc-body">
        <h3>{href ? <Link href={localeHref(locale, href)}>{post.title}</Link> : post.title}</h3>
        <p>{post.excerpt}</p>
        <ArticleMeta post={post} />
        <ReadLink post={post} labels={labels} locale={locale} />
      </div>
    </article>
  );
}
