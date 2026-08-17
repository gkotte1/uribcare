/* eslint-disable @next/next/no-img-element */
import Nav from '@/components/Nav';
import CareConstellation from '@/components/CareConstellation';
import LeadForm from '@/components/LeadForm';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import EcosystemConnectors from '@/components/EcosystemConnectors';
import LanguagePersistence from '@/components/LanguagePersistence';
import { anchorBase, getDictionary, type Locale } from '@/content/i18n';
import {
  Check, Arrow, Shield, Clock, Lines, Heart, Puzzle, Chat,
  Nurse, Pill, Flask, Lock, Mail, Phone, Home as HomeIcon,
  Innovation, HeartCare,
  Stethoscope, Counseling, HomeHealth, Pharmacy, Record,
} from '@/components/Icons';

/** Icons are structural, not translated — indexed to match the dictionary order. */
const STRIP_ICONS = [Heart, Puzzle, Chat, Nurse, Pill, Flask, HomeIcon];
const ECO_ICONS = [Stethoscope, Counseling, HomeHealth, Pharmacy, Flask, Record];
const SERVICE_IMAGES = ['/images/card-physical.jpg', '/images/card-occupational.jpg', '/images/card-speech.jpg'];
const PRINCIPLE_ICONS = [Shield, Innovation, HeartCare];
const TRUST_ICONS = [Shield, Lock, Clock, Lines];

const Cross = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const Tick = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12l4 4L19 6" />
  </svg>
);

/**
 * The Uribcare landing page, rendered from a locale dictionary.
 *
 * Both `/` (English) and `/es` (Spanish) render this same component, so the
 * layout, design system and behaviour can never drift between languages — only
 * the strings do. `locale` drives the anchor prefix so in-page links stay inside
 * the visitor's language.
 */
export default function LandingPage({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const base = anchorBase(locale);

  return (
    <>
      <Nav locale={locale} />
      <LanguagePersistence locale={locale} />

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">{t.hero.eyebrow}</span>
              <h1>
                {t.hero.titleBefore}
                <span className="accent">{t.hero.titleAccent}</span>
                {t.hero.titleAfter}
              </h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="hero-cta">
                <a href={`${base}#contact`} className="btn btn-primary btn-lg">
                  {t.hero.ctaPrimary}
                </a>
                <a href={`${base}#journey`} className="btn btn-ghost btn-lg">
                  {t.hero.ctaSecondary}
                </a>
              </div>
              <div className="hero-trust">
                <span className="tp"><Shield /> {t.hero.trustHipaa}</span>
                <span className="tp"><Clock /> {t.hero.trustOnline}</span>
                <span className="tp"><Lines /> {t.hero.trustRecord}</span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-canvas-card">
                <CareConstellation labels={t.hero.constellation} />
                <span className="hero-badge">
                  <span className="pulse-dot" /> {t.hero.badge}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROVIDER STRIP ================= */}
        <section className="strip" aria-label={t.strip.aria}>
          <div className="wrap">
            <p className="strip-head">{t.strip.head}</p>
            <div className="provider-row">
              {t.strip.chips.map((chip, i) => {
                const Icon = STRIP_ICONS[i];
                return (
                  <span className="pchip" key={chip}>
                    <Icon /> {chip}
                  </span>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= PROBLEM / SOLUTION ================= */}
        <section className="band" id="problem">
          <div className="wrap split">
            <div className="problem-copy reveal">
              <span className="eyebrow">{t.problem.eyebrow}</span>
              <h2>{t.problem.title}</h2>
              <p className="lead">{t.problem.lead}</p>
            </div>

            <div className="compare reveal">
              {t.problem.items.map((item, i) => {
                const good = i === t.problem.items.length - 1;
                return (
                  <div className={`cmp ${good ? 'good' : 'bad'}`} key={item.title}>
                    <span className="mk" aria-hidden="true">{good ? <Tick /> : <Cross />}</span>
                    <div>
                      <strong>{item.title}</strong>
                      <span className="d">{item.body}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= ECOSYSTEM ================= */}
        <section className="band band-alt" id="ecosystem">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{t.ecosystem.eyebrow}</span>
              <h2>{t.ecosystem.title}</h2>
              <p className="lead">{t.ecosystem.lead}</p>
            </div>

            {/* Hub-and-spoke composition: the six services sit either side of the
                central panel, with measured connector curves drawn between them. */}
            <div className="es">
              <div className="es-col">
                {t.ecosystem.cards.slice(0, 3).map((card, i) => {
                  const Icon = ECO_ICONS[i];
                  return (
                    <article className="es-card reveal" data-eco-node key={card.title} style={{ '--i': i } as React.CSSProperties}>
                      <span className="es-ico"><Icon size={22} /></span>
                      <div>
                        <h3>{card.title}</h3>
                        <p>{card.body}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="es-hub reveal" data-eco-hub style={{ '--i': 3 } as React.CSSProperties}>
                <div className="es-plaque">
                  <p className="es-wordmark">{t.ecosystem.wordmark}</p>
                </div>
              </div>

              <div className="es-col">
                {t.ecosystem.cards.slice(3).map((card, i) => {
                  const Icon = ECO_ICONS[i + 3];
                  return (
                    <article className="es-card reveal" data-eco-node key={card.title} style={{ '--i': i + 4 } as React.CSSProperties}>
                      <span className="es-ico"><Icon size={22} /></span>
                      <div>
                        <h3>{card.title}</h3>
                        <p>{card.body}</p>
                      </div>
                    </article>
                  );
                })}
              </div>

              <EcosystemConnectors />
            </div>
          </div>
        </section>

        {/* ================= SERVICES (real photos) ================= */}
        <section className="band" id="services">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{t.services.eyebrow}</span>
              <h2>{t.services.title}</h2>
              <p className="lead">{t.services.lead}</p>
            </div>

            <div className="svc-grid stagger">
              {t.services.cards.map((s, i) => (
                <article className="svc-card reveal" key={s.title} style={{ '--i': i } as React.CSSProperties}>
                  <div className="svc-media">
                    <img src={SERVICE_IMAGES[i]} alt={s.alt} width={1200} height={900} loading="lazy" decoding="async" />
                    <span className="svc-tag">{s.tag}</span>
                  </div>
                  <div className="svc-body">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <a className="arrow-link" href={`${base}#contact`}>
                      {t.services.cta} <Arrow />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= JOURNEY ================= */}
        <section className="band band-alt" id="journey">
          <div className="wrap journey-layout">
            <div className="journey-head reveal">
              <span className="eyebrow">{t.journey.eyebrow}</span>
              <h2>{t.journey.title}</h2>
              <p className="lead">{t.journey.lead}</p>
            </div>

            <ol className="journey">
              {t.journey.steps.map((step, i) => (
                <li className="jrow reveal" key={step.label} style={{ '--i': i } as React.CSSProperties}>
                  <div className="jnum" aria-hidden="true">{i + 1}</div>
                  <div className="jbody">
                    <span className="jstep-label">{step.label}</span>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ================= AUTISM BAND ================= */}
        <section className="band" id="autism">
          <div className="wrap">
            <div className="feature-band reveal">
              <div className="fb-inner">
                <div>
                  <span className="eyebrow">{t.autism.eyebrow}</span>
                  <h2>{t.autism.title}</h2>
                  <p>{t.autism.body}</p>
                  <div className="fb-list">
                    {t.autism.list.map((line) => (
                      <div className="fi" key={line}><Check size={20} /><span>{line}</span></div>
                    ))}
                  </div>
                </div>
                <figure className="fb-photo">
                  <img
                    src="/images/hero-physio-child.jpg"
                    alt={t.autism.photoAlt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{t.autism.quote}</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CARE PRINCIPLES ================= */}
        <section className="band cp-band" id="principles" aria-labelledby="cp-heading">
          {/* Visually hidden: the cards carry the message, but the section still
              needs a heading so the document outline stays intact. */}
          <h2 id="cp-heading" className="sr-only">
            {t.principles.heading}
          </h2>
          <div className="wrap">
            <div className="cp-grid stagger">
              {t.principles.cards.map((card, i) => {
                const Icon = PRINCIPLE_ICONS[i];
                return (
                  <article className="cp-card reveal" key={card.num} style={{ '--i': i } as React.CSSProperties}>
                    <div className="cp-figure">
                      <span className="cp-num" aria-hidden="true">{card.num}</span>
                      <span className="cp-ico">
                        <Icon size={27} />
                      </span>
                    </div>
                    <div className="cp-text">
                      <h3>{card.title}</h3>
                      <p className="cp-sub">{card.sub}</p>
                      <p className="cp-body">{card.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= AUDIENCE ================= */}
        <section className="band band-alt" id="audience">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{t.audience.eyebrow}</span>
              <h2>{t.audience.title}</h2>
            </div>

            <div className="aud-grid">
              <div className="aud-card cool reveal">
                <span className="aud-tag">{t.audience.patients.tag}</span>
                <h3>{t.audience.patients.title}</h3>
                <ul>
                  {t.audience.patients.items.map((item) => (
                    <li key={item}><Check size={19} /> {item}</li>
                  ))}
                </ul>
              </div>
              <div className="aud-card warm reveal">
                <span className="aud-tag">{t.audience.providers.tag}</span>
                <h3>{t.audience.providers.title}</h3>
                <ul>
                  {t.audience.providers.items.map((item) => (
                    <li key={item}><Check size={19} /> {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST / COMPLIANCE ================= */}
        <section className="band" id="trust">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{t.trust.eyebrow}</span>
              <h2>{t.trust.title}</h2>
              <p className="lead">{t.trust.lead}</p>
            </div>

            <div className="trust-grid reveal">
              {t.trust.cards.map((card, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <div className="trust-card" key={card.title}>
                    <div className="ti"><Icon size={22} /></div>
                    <h4>{card.title}</h4>
                    <p>{card.body}</p>
                  </div>
                );
              })}
            </div>

            <div className="stats reveal">
              {t.trust.stats.map((stat) => (
                <div className="stat" key={stat.l}>
                  <div className="n">{stat.n}</div>
                  <div className="l">{stat.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="band band-alt" id="faq">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{t.faq.eyebrow}</span>
              <h2>{t.faq.title}</h2>
            </div>

            <div className="faq">
              {t.faq.items.map((item, i) => (
                <details className="q reveal" key={item.q} open={i === 0} style={{ '--i': i } as React.CSSProperties}>
                  <summary>
                    {item.q}
                    <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </summary>
                  <div className="a">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CONTACT / LEAD FORM ================= */}
        <section className="band" id="contact">
          <div className="wrap">
            <div className="contact-shell reveal">
              <div className="contact-side">
                <span className="eyebrow">{t.contact.eyebrow}</span>
                <h2>{t.contact.title}</h2>
                <p>{t.contact.body}</p>
                <div className="reassure">
                  {t.contact.reassure.map((line) => (
                    <div className="r" key={line}><Check size={19} /> {line}</div>
                  ))}
                </div>
                <div className="contact-meta">
                  <a href="mailto:contact@uribcare.com"><Mail /> contact@uribcare.com</a>
                  <a href="tel:+17709105581"><Phone /> +1 (770) 910-5581</a>
                </div>
              </div>

              <LeadForm locale={locale} />
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <SiteFooter locale={locale} />

      {/* sticky mobile CTA */}
      <div className="mbar">
        <a href={`${base}#contact`} className="btn btn-primary">
          {t.mbar.cta}
        </a>
        <a href="tel:+17709105581" className="btn btn-ghost" aria-label={t.mbar.callAria}>
          <Phone size={18} />
        </a>
      </div>

      {/* reveal-on-scroll observer */}
      <Reveal />
    </>
  );
}
