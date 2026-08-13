/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import CategoryIcon from '@/components/CategoryIcon';
import Nav from '@/components/Nav';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import {
  Arrow,
  Chat,
  Clock,
  Counseling,
  HeartCare,
  HomeHealth,
  Innovation,
  Puzzle,
  Stethoscope,
} from '@/components/Icons';
import type { Card, CardIcon, Detail } from '@/content/types';

/** Showcase card icons, drawn from the shared icon set. */
const CARD_ICONS: Record<CardIcon, (p: { size?: number }) => JSX.Element> = {
  behavioral: Puzzle,
  speech: Chat,
  occupational: HomeHealth,
  physical: Innovation,
  counseling: Counseling,
  pediatric: Stethoscope,
  family: HeartCare,
  progress: Clock,
};

const Check = ({ size = 19 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l4 4L19 6" />
  </svg>
);

export type Sibling = { name: string; href: string; icon: Detail['icon'] };

/**
 * Renders a service, ecosystem or standalone detail page from a single `Detail`
 * record, reusing the section styles the home page already uses (`.band`,
 * `.eco-card`, `.aud-card`, `.trust-card`, `.feature-band`, `.journey`,
 * `.cta-final`).
 *
 * `parent` is omitted for top-level pages, which get a Home / name breadcrumb.
 *
 * `featuredJourney` makes the numbered journey the centrepiece: it moves
 * directly under the overview and adopts the home page "patient journey"
 * layout — `.journey-layout` with a sticky `.journey-head` beside the steps.
 * Pages that leave it off keep the heading-above-steps arrangement.
 */
export default function DetailPage({
  detail,
  siblings,
  siblingsLabel,
  parent,
  featuredJourney = false,
}: {
  detail: Detail;
  siblings: Sibling[];
  siblingsLabel: string;
  parent?: { label: string; href: string };
  featuredJourney?: boolean;
}) {
  const { overview, provides, audience, benefits, support, process, cta, image } = detail;

  // Elevated card showcase: one featured card, the rest at normal weight, each
  // card a link where it has somewhere to go so touch devices get the same
  // affordance hover gives a mouse.
  const showcaseCard = (card: Card) => {
    const Icon = card.icon ? CARD_ICONS[card.icon] : null;
    const className = `care-card reveal${card.featured ? ' is-featured' : ''}`;
    const inner = (
      <>
        {Icon ? (
          <span className="care-ico" aria-hidden="true">
            <Icon size={card.featured ? 26 : 23} />
          </span>
        ) : null}
        <h3>{card.title}</h3>
        <p>{card.text}</p>
        {card.href ? (
          <span className="arrow-link care-more">
            Learn more <Arrow size={16} className="ar" />
          </span>
        ) : null}
      </>
    );
    return card.href ? (
      <Link className={className} href={card.href} key={card.title}>
        {inner}
      </Link>
    ) : (
      <div className={className} key={card.title}>
        {inner}
      </div>
    );
  };

  // One list of steps, shared by both journey arrangements.
  const journeySteps = process.steps.map((step, i) => (
    <li className="jrow reveal" key={step.title} style={{ '--i': i } as React.CSSProperties}>
      <div className="jnum" aria-hidden="true">
        {i + 1}
      </div>
      <div className="jbody">
        <span className="jstep-label">{step.label}</span>
        <h4>{step.title}</h4>
        <p>{step.text}</p>
      </div>
    </li>
  ));

  const processSection = featuredJourney ? (
    // Same structure as the home page patient journey: sticky heading column on
    // the left from 1000px up, steps scrolling past it on the right.
    <section className="band">
      <div className="wrap journey-layout">
        <div className="journey-head reveal">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2>{process.heading}</h2>
          <p className="lead">{process.intro}</p>
        </div>
        <ol className="journey">{journeySteps}</ol>
      </div>
    </section>
  ) : (
    <section className="band" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="band-head reveal">
          <span className="eyebrow">{process.eyebrow}</span>
          <h2>{process.heading}</h2>
          <p className="lead">{process.intro}</p>
        </div>
        <ol className="journey">{journeySteps}</ol>
      </div>
    </section>
  );

  return (
    <>
      <Nav />

      <main id="top" className="detail-main">
        {/* ================= HERO ================= */}
        <section className="band detail-hero">
          <div className="wrap">
            <nav className="detail-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span aria-hidden="true">/</span>
              {parent ? (
                <>
                  <Link href={parent.href}>{parent.label}</Link>
                  <span aria-hidden="true">/</span>
                </>
              ) : null}
              <span aria-current="page">{detail.name}</span>
            </nav>

            <div className="band-head center reveal">
              <span className="eyebrow">{detail.eyebrow}</span>
              <h1>{detail.title}</h1>
              <p className="lead">{detail.subtitle}</p>
            </div>

            <div className="provider-row detail-highlights reveal">
              {overview.highlights.map((h) => (
                <span className="pchip" key={h}>
                  <CategoryIcon name={detail.icon} size={17} /> {h}
                </span>
              ))}
            </div>

            <div className="hero-cta detail-cta reveal">
              <a href={cta.primary.href} className="btn btn-primary btn-lg">
                {cta.primary.label}
              </a>
              <a href={cta.secondary.href} className="btn btn-ghost btn-lg">
                {cta.secondary.label}
              </a>
            </div>
          </div>
        </section>

        {/* ================= OVERVIEW ================= */}
        <section className="band" style={{ paddingTop: 0 }}>
          <div className="wrap">
            {image ? (
              <div className="split">
                <div className="reveal">
                  <span className="eyebrow">Overview</span>
                  <h2 className="detail-h2">{overview.heading}</h2>
                  {overview.paragraphs.map((p, i) => (
                    <p className="lead detail-para" key={i}>
                      {p}
                    </p>
                  ))}
                </div>
                <figure className="fb-photo detail-figure reveal">
                  <img src={image.src} alt={image.alt} />
                  <figcaption>{image.caption}</figcaption>
                </figure>
              </div>
            ) : (
              <div className="split">
                <div className="reveal">
                  <span className="eyebrow">Overview</span>
                  <h2 className="detail-h2">{overview.heading}</h2>
                  {overview.paragraphs.map((p, i) => (
                    <p className="lead detail-para" key={i}>
                      {p}
                    </p>
                  ))}
                </div>
                <div className="compare reveal">
                  {overview.highlights.map((h) => (
                    <div className="cmp good" key={h}>
                      <span className="mk">
                        <Check size={14} />
                      </span>
                      <div>
                        <strong>{h}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {featuredJourney ? processSection : null}

        {/* ================= WHAT IT PROVIDES ================= */}
        <section className="band" style={{ background: 'var(--paper-2)', borderBlock: '1px solid var(--line)' }}>
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{provides.eyebrow}</span>
              <h2>{provides.heading}</h2>
              <p className="lead">{provides.intro}</p>
            </div>
            {provides.showcase ? (
              <div className="care-grid">{provides.cards.map(showcaseCard)}</div>
            ) : (
              <div className="eco-grid">
                {provides.cards.map((card) => (
                  <div className="eco-card reveal" key={card.title}>
                    <div className="eco-ico">
                      <Check size={24} />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ================= WHO IT IS FOR ================= */}
        <section className="band">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{audience.eyebrow}</span>
              <h2>{audience.heading}</h2>
            </div>
            <div className="aud-grid">
              {audience.groups.map((group) => (
                <div className={`aud-card ${group.tone} reveal`} key={group.tag}>
                  <span className="aud-tag">{group.tag}</span>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.points.map((point) => (
                      <li key={point}>
                        <Check /> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= BENEFITS ================= */}
        <section className="band" style={{ background: 'var(--paper-2)', borderBlock: '1px solid var(--line)' }}>
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{benefits.eyebrow}</span>
              <h2>{benefits.heading}</h2>
              <p className="lead">{benefits.intro}</p>
            </div>
            <div className="trust-grid">
              {benefits.cards.map((card) => (
                <div className="trust-card reveal" key={card.title}>
                  <div className="ti">
                    <Check size={22} />
                  </div>
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= HOW URIBCARE SUPPORTS ================= */}
        <section className="band">
          <div className="wrap">
            <div className="feature-band reveal">
              <div className="fb-inner">
                <div>
                  <span className="eyebrow">{support.eyebrow}</span>
                  <h2>{support.heading}</h2>
                  <p>{support.text}</p>
                  <div className="fb-list">
                    {support.points.map((point) => (
                      <div className="fi" key={point}>
                        <Check size={20} />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="fb-card">
                  <p className="fb-quote">“{support.quote}”</p>
                  <p className="who">{support.quoteWho}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROCESS ================= */}
        {featuredJourney ? null : processSection}

        {/* ================= RELATED ================= */}
        {siblings.length ? (
          <section className="strip" aria-label={siblingsLabel}>
            <div className="wrap">
              <p className="strip-head">{siblingsLabel}</p>
              <div className="provider-row">
                {siblings.map((sibling) => (
                  <Link className="pchip pchip-link" href={sibling.href} key={sibling.href}>
                    <CategoryIcon name={sibling.icon} size={17} /> {sibling.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* ================= CTA ================= */}
        <section className="band">
          <div className="wrap">
            <div className="cta-final reveal">
              <span className="cta-glow a" aria-hidden="true"></span>
              <span className="cta-glow b" aria-hidden="true"></span>
              <h2>{cta.heading}</h2>
              <p>{cta.text}</p>
              <div className="hero-cta">
                <a href={cta.primary.href} className="btn btn-warm btn-lg">
                  {cta.primary.label}
                </a>
                <a href={cta.secondary.href} className="btn btn-ghost btn-lg">
                  {cta.secondary.label}
                </a>
              </div>
              <p className="cta-note">{cta.note}</p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter base="/" />
      <Reveal />
    </>
  );
}
