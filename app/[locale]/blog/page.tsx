import type { Metadata } from 'next';
import Link from 'next/link';
import BlogCard, { ArticleMedia, ArticleMeta, ReadLink, postHref } from '@/components/BlogCard';
import Nav from '@/components/Nav';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { Arrow } from '@/components/Icons';
import { getArticle } from '@/content/articles';
import { getBlog } from '@/content/blog';
import { alternatesFor, isLocale, localeHref } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

type Params = { params: { locale: string } };

export function generateMetadata({ params }: Params): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const blog = getBlog(locale);
  return {
    title: blog.meta.title,
    description: blog.meta.description,
    alternates: alternatesFor('/blog'),
  };
}

export default function BlogPage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const blog = getBlog(locale);

  // Artwork is defined once, on the article itself. The listing reads it from
  // there rather than repeating the path, so a card and its article can never
  // end up showing different images.
  const posts = blog.posts.map((post) => ({
    ...post,
    image: post.image ?? getArticle(locale, post.slug)?.image,
  }));

  // The featured slot is simply the newest article, which also opens the grid.
  const [featured] = posts;
  const featuredHref = featured ? postHref(featured) : undefined;

  return (
    <>
      <Nav />

      <main id="top" className="blog-main">
        <section className="band blog-hero">
          <div className="wrap">
            <div className="band-head blog-hero-head">
              <span className="eyebrow">{blog.hero.eyebrow}</span>
              <h1>{blog.hero.heading}</h1>
              <p className="lead">{blog.hero.lead}</p>
            </div>
          </div>
        </section>

        {featured ? (
          <section className="band band-tight blog-featured-band" aria-labelledby="blog-featured">
            <div className="wrap">
              <h2 className="sr-only" id="blog-featured">
                {blog.featured.srHeading}
              </h2>
              <article className="blog-featured reveal">
                {/* The artwork is a second route into the article. It is hidden
                    from assistive tech and skipped by the keyboard, because the
                    title link beside it already carries that destination. */}
                {featuredHref ? (
                  <Link
                    className="bf-media"
                    href={localeHref(locale, featuredHref)}
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <ArticleMedia post={featured} />
                  </Link>
                ) : (
                  <div className="bf-media">
                    <ArticleMedia post={featured} />
                  </div>
                )}
                <div className="bf-body">
                  <p className="bf-flags">
                    <span className="bf-badge">{blog.featured.label}</span>
                    <span className="bf-cat">{featured.category}</span>
                  </p>
                  <h3 className="bf-title">
                    {featuredHref ? (
                      <Link href={localeHref(locale, featuredHref)}>{featured.title}</Link>
                    ) : (
                      featured.title
                    )}
                  </h3>
                  <p className="bf-excerpt">{featured.excerpt}</p>
                  <ArticleMeta post={featured} />
                  <ReadLink post={featured} labels={blog.card} locale={locale} />
                </div>
              </article>
            </div>
          </section>
        ) : null}

        <section className="band band-alt" aria-labelledby="blog-latest">
          <div className="wrap">
            <div className="band-head">
              <h2 id="blog-latest">{blog.latest.heading}</h2>
            </div>
            <div className="blog-grid stagger">
              {posts.map((post, i) => (
                <div className="reveal" key={post.slug} style={{ ['--i' as string]: i }}>
                  <BlogCard post={post} labels={blog.card} locale={locale} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band-tight">
          <div className="wrap">
            <div className="blog-cta reveal">
              <span className="cta-glow a" aria-hidden="true" />
              <span className="cta-glow b" aria-hidden="true" />
              <h2>{blog.cta.heading}</h2>
              <p>{blog.cta.body}</p>
              <p className="blog-cta-actions">
                <Link className="btn btn-primary btn-lg" href={localeHref(locale, '/')}>
                  {blog.cta.action} <Arrow size={16} className="ar" />
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
      <Reveal />
    </>
  );
}
