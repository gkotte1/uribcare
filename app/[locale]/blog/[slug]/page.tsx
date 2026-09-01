/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ArticleSection from '@/components/ArticleBody';
import { ArticleMeta } from '@/components/BlogCard';
import CategoryIcon from '@/components/CategoryIcon';
import type { IconName } from '@/components/CategoryIcon';
import Nav from '@/components/Nav';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import { Arrow } from '@/components/Icons';
import { ARTICLE_SLUGS, getArticle } from '@/content/articles';
import { ECOSYSTEM_NAV, SERVICE_NAV } from '@/content/nav';
import { getDictionary } from '@/content/dictionary';
import { LOCALES, alternatesFor, isLocale, localeHref } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

type Params = { params: { locale: string; slug: string } };

/** One static page per article, per locale. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => ARTICLE_SLUGS.map((slug) => ({ locale, slug })));
}

/** The catalog is static, so any other slug gets the prerendered 404. */
export const dynamicParams = false;

export function generateMetadata({ params }: Params): Metadata {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const article = getArticle(locale, params.slug);
  if (!article) return { title: 'Article not found | Uribcare' };
  const images = article.image
    ? [{ url: article.image.src, width: article.image.width, height: article.image.height, alt: article.image.alt }]
    : undefined;

  return {
    title: article.meta.title,
    description: article.meta.description,
    alternates: alternatesFor(`/blog/${article.slug}`),
    // Overrides the site-wide card so the article shares its own artwork. Both
    // blocks are set together: declaring only one would leave the other
    // inheriting the default image.
    openGraph: { type: 'article', siteName: 'Uribcare', title: article.meta.title, description: article.meta.description, images },
    twitter: { card: 'summary_large_image', title: article.meta.title, description: article.meta.description, images },
  };
}

export default function ArticlePage({ params }: Params) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const article = getArticle(locale, params.slug);
  if (!article) notFound();
  const t = getDictionary(locale);
  const path = (to: string) => localeHref(locale, to);

  const ecosystem = ECOSYSTEM_NAV[locale];
  const services = SERVICE_NAV[locale];
  const pick = <T extends { slug: string }>(list: T[], slug: string) => list.find((x) => x.slug === slug);

  // Related reading, drawn from the existing catalogs so every label stays
  // localized and no URL is invented here.
  const related = [
    { name: t.nav.autismCare, href: '/autism-care', icon: 'therapists' as IconName },
    pick(ecosystem, 'doctors-specialists'),
    pick(ecosystem, 'therapists-counselors'),
    pick(services, 'speech-therapy'),
    pick(services, 'occupational-therapy'),
    pick(services, 'physical-therapy'),
  ].filter(Boolean) as { name: string; href: string; icon: IconName }[];

  return (
    <>
      <Nav />

      <main id="top" className="article-main">
        <article>
          <header className="band article-hero">
            <div className="wrap">
              <nav className="detail-crumbs article-col" aria-label="Breadcrumb">
                <Link href={path('/')}>{t.detail.home}</Link>
                <span aria-hidden="true">/</span>
                <Link href={path('/blog')}>{t.nav.blog}</Link>
                <span aria-hidden="true">/</span>
                <Link href={path('/autism-care')} aria-current="page">
                  {article.category}
                </Link>
              </nav>

              <div className="article-col article-head reveal">
                <p className="article-flags">
                  <span className="article-cat">{article.category}</span>
                  <span className="article-pub">{article.eyebrow}</span>
                </p>
                <h1>{article.title}</h1>
                <p className="lead">{article.description}</p>
                <ArticleMeta post={article} />
              </div>

              {/* Sized by the figure's own ratio rather than the file's, so the
                  hero stays a controlled band instead of a full-height block.
                  The ratio is the tightest one that still clears the artwork's
                  own top and bottom content, measured from the file. */}
              <figure className={`article-figure reveal${article.image ? '' : ' is-placeholder'}`}>
                {article.image ? (
                  <img
                    src={article.image.src}
                    alt={article.image.alt}
                    width={article.image.width}
                    height={article.image.height}
                    decoding="async"
                  />
                ) : (
                  <span className="blog-ph" aria-hidden="true" />
                )}
              </figure>
            </div>
          </header>

          <div className="band band-tight article-body-band">
            <div className="wrap">
              <div className="article-col">
                <nav className="article-toc" aria-labelledby="article-toc-h">
                  <h2 id="article-toc-h">{t.article.onThisPage}</h2>
                  <ol>
                    {article.sections.map((section) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`}>{section.heading}</a>
                      </li>
                    ))}
                  </ol>
                </nav>

                <div className="article-prose">
                  {article.sections.map((section) => (
                    <ArticleSection key={section.id} section={section} locale={locale} />
                  ))}
                </div>

                <aside className="article-related" aria-labelledby="article-related-h">
                  <h2 id="article-related-h">{t.article.related}</h2>
                  <div className="provider-row">
                    {related.map((item) => (
                      <Link className="pchip pchip-link" href={path(item.href)} key={item.href}>
                        <CategoryIcon name={item.icon} size={17} /> {item.name}
                      </Link>
                    ))}
                  </div>
                </aside>

                <p className="article-back">
                  <Link className="arrow-link" href={path('/blog')}>
                    <span aria-hidden="true">&#8592;</span> {t.article.backToBlog}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </article>

        <section className="band band-tight">
          <div className="wrap">
            <div className="blog-cta reveal">
              <span className="cta-glow a" aria-hidden="true" />
              <span className="cta-glow b" aria-hidden="true" />
              <h2>
                <Link href={path(article.cta.href)}>
                  {article.cta.heading}
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </h2>
              <p className="blog-cta-actions">
                <Link className="btn btn-primary btn-lg" href={path(article.cta.actionHref)}>
                  {article.cta.action} <Arrow size={16} className="ar" />
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
