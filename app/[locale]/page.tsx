/* eslint-disable @next/next/no-img-element */
import Nav from '@/components/Nav';
import CareConstellation from '@/components/CareConstellation';
import LeadForm from '@/components/LeadForm';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';
import EcosystemConnectors from '@/components/EcosystemConnectors';
import {
  Check, Arrow, Shield, Clock, Lines, Heart, Puzzle, Chat,
  Nurse, Pill, Flask, Lock, Mail, Phone, Home as HomeIcon,
  Innovation, HeartCare,
  Stethoscope, Counseling, HomeHealth, Pharmacy, Record,
} from '@/components/Icons';
import { getHome } from '@/content/home';
import { isLocale } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';

/** Icons and photography are positional, matching the content arrays. */
const SERVICE_IMAGES = ['/images/card-physical.jpg', '/images/card-occupational.jpg', '/images/card-speech.jpg'];
const ECO_ICONS = [Stethoscope, Counseling, HomeHealth, Pharmacy, Flask, Record];
const PRINCIPLE_ICONS = [Shield, Innovation, HeartCare];

export default function Home({ params }: { params: { locale: string } }) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const h = getHome(locale);
  return (
    <>
      {/* ================= NAV ================= */}
      <Nav />

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">{h.hero.eyebrow}</span>
              <h1>
                {h.hero.titleBefore}<span className="accent">{h.hero.titleAccent}</span>{h.hero.titleAfter}
              </h1>
              <p className="lead">
{h.hero.lead}
              </p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary btn-lg">
                  {h.hero.ctaPrimary}
                </a>
                <a href="#journey" className="btn btn-ghost btn-lg">
                  {h.hero.ctaSecondary}
                </a>
              </div>
              <div className="hero-trust">
                <span className="tp">
                  <Shield /> {h.hero.trust[0]}
                </span>
                <span className="tp">
                  <Clock /> {h.hero.trust[1]}
                </span>
                <span className="tp">
                  <Lines /> {h.hero.trust[2]}
                </span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-canvas-card">
                <CareConstellation />
                <span className="hero-badge">
                  <span className="pulse-dot" /> {h.hero.badge}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROVIDER STRIP ================= */}
        <section className="strip" aria-label={h.strip.label}>
          <div className="wrap">
            <p className="strip-head">{h.strip.head}</p>
            <div className="provider-row">
              <span className="pchip"><Heart /> {h.strip.chips[0]}</span>
              <span className="pchip"><Puzzle /> {h.strip.chips[1]}</span>
              <span className="pchip"><Chat /> {h.strip.chips[2]}</span>
              <span className="pchip"><Nurse /> {h.strip.chips[3]}</span>
              <span className="pchip"><Pill /> {h.strip.chips[4]}</span>
              <span className="pchip"><Flask /> {h.strip.chips[5]}</span>
              <span className="pchip"><HomeIcon /> {h.strip.chips[6]}</span>
            </div>
          </div>
        </section>

        {/* ================= PROBLEM / SOLUTION ================= */}
        <section className="band" id="problem">
          <div className="wrap split">
            <div className="problem-copy reveal">
              <span className="eyebrow">{h.problem.eyebrow}</span>
              <h2>{h.problem.heading}</h2>
              <p className="lead">
{h.problem.lead}
              </p>
            </div>

            <div className="compare reveal">
              <div className="cmp bad">
                <span className="mk" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <div>
                  <strong>{h.problem.compare[0].title}</strong>
                  <span className="d">{h.problem.compare[0].text}</span>
                </div>
              </div>
              <div className="cmp bad">
                <span className="mk" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <div>
                  <strong>{h.problem.compare[1].title}</strong>
                  <span className="d">{h.problem.compare[1].text}</span>
                </div>
              </div>
              <div className="cmp good">
                <span className="mk" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <div>
                  <strong>{h.problem.compare[2].title}</strong>
                  <span className="d">{h.problem.compare[2].text}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ECOSYSTEM ================= */}
        <section className="band band-alt" id="ecosystem">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{h.ecosystem.eyebrow}</span>
              <h2>{h.ecosystem.heading}</h2>
              <p className="lead">
{h.ecosystem.lead}
              </p>
            </div>

            {/* Hub-and-spoke composition: the six services sit either side of the
                central panel, with measured connector curves drawn between them. */}
            <div className="es">
              <div className="es-col">
                {h.ecosystem.items.slice(0, 3).map(({ title, body }, i) => {
                  const Icon = ECO_ICONS[i];
                  return (
                  <article className="es-card reveal" data-eco-node key={title} style={{ '--i': i } as React.CSSProperties}>
                    <span className="es-ico"><Icon size={22} /></span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </article>
                );
              })}
              </div>

              <div className="es-hub reveal" data-eco-hub style={{ '--i': 3 } as React.CSSProperties}>
                <div className="es-plaque">
                  <p className="es-wordmark">{h.ecosystem.plaque}</p>
                </div>
              </div>

              <div className="es-col">
                {h.ecosystem.items.slice(3).map(({ title, body }, i) => {
                  const Icon = ECO_ICONS[i + 3];
                  return (
                  <article className="es-card reveal" data-eco-node key={title} style={{ '--i': i + 4 } as React.CSSProperties}>
                    <span className="es-ico"><Icon size={22} /></span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
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
              <span className="eyebrow">{h.services.eyebrow}</span>
              <h2>{h.services.heading}</h2>
              <p className="lead">
{h.services.lead}
              </p>
            </div>

            <div className="svc-grid stagger">
              {h.services.items.map((s, i) => (
                <article className="svc-card reveal" key={s.title} style={{ '--i': i } as React.CSSProperties}>
                  <div className="svc-media">
                    <img src={SERVICE_IMAGES[i]} alt={s.alt} width={1200} height={900} loading="lazy" decoding="async" />
                    <span className="svc-tag">{s.tag}</span>
                  </div>
                  <div className="svc-body">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <a className="arrow-link" href="#contact">
                      {h.services.cta} <Arrow />
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
              <span className="eyebrow">{h.journey.eyebrow}</span>
              <h2>{h.journey.heading}</h2>
              <p className="lead">{h.journey.lead}</p>
            </div>

            <ol className="journey">
              {h.journey.steps.map((step, i) => (
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
                  <span className="eyebrow">{h.autism.eyebrow}</span>
                  <h2>{h.autism.heading}</h2>
                  <p>
{h.autism.body}
                  </p>
                  <div className="fb-list">
                    <div className="fi"><Check size={20} /><span>{h.autism.points[0]}</span></div>
                    <div className="fi"><Check size={20} /><span>{h.autism.points[1]}</span></div>
                    <div className="fi"><Check size={20} /><span>{h.autism.points[2]}</span></div>
                    <div className="fi"><Check size={20} /><span>{h.autism.points[3]}</span></div>
                  </div>
                </div>
                <figure className="fb-photo">
                  <img
                    src="/images/hero-physio-child.jpg"
                    alt={h.autism.photoAlt}
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    {h.autism.quote}
                  </figcaption>
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
            {h.principles.srHeading}
          </h2>
          <div className="wrap">
            <div className="cp-grid stagger">
              {h.principles.items.map(({ num, title, sub, body }, i) => {
                const Icon = PRINCIPLE_ICONS[i];
                return (
                <article className="cp-card reveal" key={num} style={{ '--i': i } as React.CSSProperties}>
                  <div className="cp-figure">
                    <span className="cp-num" aria-hidden="true">{num}</span>
                    <span className="cp-ico">
                      <Icon size={27} />
                    </span>
                  </div>
                  <div className="cp-text">
                    <h3>{title}</h3>
                    <p className="cp-sub">{sub}</p>
                    <p className="cp-body">{body}</p>
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
              <span className="eyebrow">{h.audience.eyebrow}</span>
              <h2>{h.audience.heading}</h2>
            </div>

            <div className="aud-grid">
              <div className="aud-card cool reveal">
                <span className="aud-tag">{h.audience.patients.tag}</span>
                <h3>{h.audience.patients.title}</h3>
                <ul>
                  <li><Check size={19} /> {h.audience.patients.points[0]}</li>
                  <li><Check size={19} /> {h.audience.patients.points[1]}</li>
                  <li><Check size={19} /> {h.audience.patients.points[2]}</li>
                  <li><Check size={19} /> {h.audience.patients.points[3]}</li>
                </ul>
              </div>
              <div className="aud-card warm reveal">
                <span className="aud-tag">{h.audience.providers.tag}</span>
                <h3>{h.audience.providers.title}</h3>
                <ul>
                  <li><Check size={19} /> {h.audience.providers.points[0]}</li>
                  <li><Check size={19} /> {h.audience.providers.points[1]}</li>
                  <li><Check size={19} /> {h.audience.providers.points[2]}</li>
                  <li><Check size={19} /> {h.audience.providers.points[3]}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST / COMPLIANCE ================= */}
        <section className="band" id="trust">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{h.trust.eyebrow}</span>
              <h2>{h.trust.heading}</h2>
              <p className="lead">
{h.trust.lead}
              </p>
            </div>

            <div className="trust-grid reveal">
              <div className="trust-card">
                <div className="ti"><Shield size={22} /></div>
                <h4>{h.trust.cards[0].title}</h4>
                <p>{h.trust.cards[0].body}</p>
              </div>
              <div className="trust-card">
                <div className="ti"><Lock size={22} /></div>
                <h4>{h.trust.cards[1].title}</h4>
                <p>{h.trust.cards[1].body}</p>
              </div>
              <div className="trust-card">
                <div className="ti"><Clock size={22} /></div>
                <h4>{h.trust.cards[2].title}</h4>
                <p>{h.trust.cards[2].body}</p>
              </div>
              <div className="trust-card">
                <div className="ti"><Lines size={22} /></div>
                <h4>{h.trust.cards[3].title}</h4>
                <p>{h.trust.cards[3].body}</p>
              </div>
            </div>

            <div className="stats reveal">
              <div className="stat">
                <div className="n">{h.trust.stats[0].n}</div>
                <div className="l">{h.trust.stats[0].l}</div>
              </div>
              <div className="stat">
                <div className="n">{h.trust.stats[1].n}</div>
                <div className="l">{h.trust.stats[1].l}</div>
              </div>
              <div className="stat">
                <div className="n">{h.trust.stats[2].n}</div>
                <div className="l">{h.trust.stats[2].l}</div>
              </div>
              <div className="stat">
                <div className="n">{h.trust.stats[3].n}</div>
                <div className="l">{h.trust.stats[3].l}</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="band band-alt" id="faq">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">{h.faq.eyebrow}</span>
              <h2>{h.faq.heading}</h2>
            </div>

            <div className="faq">
              {h.faq.items.map((item, i) => (
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
                <span className="eyebrow">{h.contact.eyebrow}</span>
                <h2>{h.contact.heading}</h2>
                <p>
{h.contact.body}
                </p>
                <div className="reassure">
                  <div className="r"><Check size={19} /> {h.contact.reassure[0]}</div>
                  <div className="r"><Check size={19} /> {h.contact.reassure[1]}</div>
                  <div className="r"><Check size={19} /> {h.contact.reassure[2]}</div>
                </div>
                <div className="contact-meta">
                  <a href="mailto:contact@uribcare.com"><Mail /> contact@uribcare.com</a>
                  <a href="tel:+17709105581"><Phone /> +1 (770) 910-5581</a>
                </div>
              </div>

              <LeadForm />
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <SiteFooter locale={locale} />

      {/* sticky mobile CTA */}
      <div className="mbar">
        <a href="#contact" className="btn btn-primary">
          {h.mbar.trial}
        </a>
        <a href="tel:+17709105581" className="btn btn-ghost" aria-label={h.mbar.call}>
          <Phone size={18} />
        </a>
      </div>

      {/* reveal-on-scroll observer */}
      <Reveal />
    </>
  );
}
