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

/** Steps in the patient journey — rendered as one connected timeline. */
const JOURNEY = [
  { label: 'Discover', title: 'Find the right care', body: 'Search verified doctors, therapists, counselors and labs — filtered by need, location and availability.' },
  { label: 'Schedule', title: 'Book in a few taps', body: 'Online or in-person appointments with real-time availability and automatic reminders.' },
  { label: 'Consult', title: 'Meet your provider', body: 'Secure video or in-clinic visits, with notes and next steps captured in the shared record.' },
  { label: 'Therapy', title: 'Ongoing support', body: 'Recurring therapy and counseling sessions, progress tracked and visible to the whole care team.' },
  { label: 'Diagnostics', title: 'Tests & results', body: 'Order lab work, schedule collection, and get results routed back to every provider automatically.' },
  { label: 'Medication', title: 'Prescriptions & refills', body: 'Fulfil medication through connected pharmacies with reminders and easy refills.' },
  { label: 'Follow-up', title: 'Continuous care', body: 'Coordinated follow-ups keep the plan moving — no gaps, no chasing, no starting over.' },
];

const SERVICES = [
  {
    img: '/images/card-physical.jpg',
    alt: 'Physical therapist guiding a patient through a stability-ball exercise',
    tag: 'Physical Therapy',
    title: 'Physical Therapy',
    body: 'Restore mobility, reduce pain, build strength, and regain independence through personalized, goal-driven programs for every age.',
  },
  {
    img: '/images/card-occupational.jpg',
    alt: 'Occupational therapists supporting an adult with mobility rehabilitation',
    tag: 'Occupational Therapy',
    title: 'Occupational Therapy',
    body: 'Develop the skills for daily living, learning and working — so patients participate confidently in the activities that matter to them.',
  },
  {
    img: '/images/card-speech.jpg',
    alt: 'Speech therapist working with a young child on articulation',
    tag: 'Speech Therapy',
    title: 'Speech Therapy',
    body: 'Improve communication, language, speech clarity, cognitive skills and swallowing — for children and adults alike.',
  },
];

/** The six ecosystem services arranged around the central panel. */
const ECOSYSTEM = [
  {
    Icon: Stethoscope,
    title: 'Doctors & specialists',
    body: 'Find the right physician, consult online or in person, and keep every diagnosis and note in one shared record.',
  },
  {
    Icon: Counseling,
    title: 'Therapists & counselors',
    body: 'Behavioral, occupational, speech and mental-health support — matched, scheduled and tracked over time.',
  },
  {
    Icon: HomeHealth,
    title: 'Nurses & home care',
    body: 'Coordinated in-home visits and ongoing support that stay linked to the patient’s wider care team.',
  },
  {
    Icon: Pharmacy,
    title: 'Pharmacies',
    body: 'Prescriptions flow straight from consult to pharmacy — with refills and reminders built in.',
  },
  {
    Icon: Flask,
    title: 'Diagnostic labs',
    body: 'Order tests, book collection, and see results land in the record automatically for every provider.',
  },
  {
    Icon: Record,
    title: 'One connected record',
    body: 'Everyone works from the same source of truth, so nothing is repeated and nothing gets lost.',
  },
];

/** The three care principles, numbered 01–03. */
const PRINCIPLES = [
  {
    num: '01',
    Icon: Shield,
    title: 'Integrity & Accountability',
    sub: 'Building Trust Through Excellence',
    body: 'We uphold the highest standards of honesty, transparency, and professional care in every patient interaction.',
  },
  {
    num: '02',
    Icon: Innovation,
    title: 'Advanced Techniques & Innovation',
    sub: 'Delivering Modern, Evidence-Based Care',
    body: 'We utilize the latest therapeutic techniques, technologies, and treatment strategies to achieve optimal outcomes.',
  },
  {
    num: '03',
    Icon: HeartCare,
    title: 'Compassionate Care',
    sub: 'Serving with Empathy & Respect',
    body: 'We build lasting relationships through genuine care, personalized attention, and unwavering support.',
  },
];

const FAQS = [
  {
    q: 'What exactly is Uribcare?',
    a: 'Uribcare is a connected healthcare ecosystem. It brings patients, doctors, therapists, counselors, nurses, pharmacies and diagnostic labs onto one platform — so discovery, scheduling, consults, therapy, tests, medication and follow-up all happen in one coordinated journey. Autism care is our primary focus, with a growing range of services beyond it.',
  },
  {
    q: 'Is my health data safe?',
    a: 'Yes. Uribcare is built to HIPAA-ready standards, with encryption in transit and at rest, patient-controlled consent, and full audit logging. You decide which providers can access your record.',
  },
  {
    q: 'Can I get care online and in person?',
    a: 'Both. You can consult providers by secure video or book in-person visits — whatever fits your needs — and everything stays in the same connected record.',
  },
  {
    q: 'How does Uribcare help with autism care specifically?',
    a: 'Autism care involves many providers coordinating over a long time. Uribcare matches families to the right specialists, keeps therapy, counseling and follow-ups in one place, and gives every provider shared visibility into progress — so families don’t have to hold it all together alone.',
  },
  {
    q: 'I’m a provider. How do I join?',
    a: 'Providers and clinics can join to reach new patients, collaborate through shared records, and cut admin time. Start a free trial or book a demo below and our team will get you set up.',
  },
];

export default function Home() {
  return (
    <>
      {/* ================= NAV ================= */}
      <Nav />

      <main id="top">
        {/* ================= HERO ================= */}
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">One connected care ecosystem</span>
              <h1>
                One platform for the <span className="accent">whole</span> healthcare journey.
              </h1>
              <p className="lead">
                Uribcare connects patients with the doctors, therapists, counselors, nurses, pharmacies and labs they
                need — coordinated in one place, online or in person. Autism care is where we go deepest.
              </p>
              <div className="hero-cta">
                <a href="#contact" className="btn btn-primary btn-lg">
                  Start a free trial
                </a>
                <a href="#journey" className="btn btn-ghost btn-lg">
                  See how it works
                </a>
              </div>
              <div className="hero-trust">
                <span className="tp">
                  <Shield /> HIPAA-ready &amp; secure
                </span>
                <span className="tp">
                  <Clock /> Online &amp; in-person care
                </span>
                <span className="tp">
                  <Lines /> Every provider, one record
                </span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-canvas-card">
                <CareConstellation />
                <span className="hero-badge">
                  <span className="pulse-dot" /> Care coordinated in real time
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROVIDER STRIP ================= */}
        <section className="strip" aria-label="Who Uribcare connects">
          <div className="wrap">
            <p className="strip-head">One connected journey across every part of care</p>
            <div className="provider-row">
              <span className="pchip"><Heart /> Doctors</span>
              <span className="pchip"><Puzzle /> Therapists</span>
              <span className="pchip"><Chat /> Counselors</span>
              <span className="pchip"><Nurse /> Nurses</span>
              <span className="pchip"><Pill /> Pharmacies</span>
              <span className="pchip"><Flask /> Diagnostic labs</span>
              <span className="pchip"><HomeIcon /> Home &amp; in-person care</span>
            </div>
          </div>
        </section>

        {/* ================= PROBLEM / SOLUTION ================= */}
        <section className="band" id="problem">
          <div className="wrap split">
            <div className="problem-copy reveal">
              <span className="eyebrow">The problem</span>
              <h2>Care is scattered. Families carry the burden of holding it together.</h2>
              <p className="lead">
                A patient sees a doctor here, a therapist there, picks up medication somewhere else, and books a lab test
                on the phone. Nobody shares the full picture — so families repeat their story, chase appointments, and
                fall through the gaps. For ongoing needs like autism care, that friction never stops.
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
                  <strong>Healthcare today</strong>
                  <span className="d">Disconnected apps, phone tag, lost records, and no one coordinating the next step.</span>
                </div>
              </div>
              <div className="cmp bad">
                <span className="mk" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <div>
                  <strong>The patient does the work</strong>
                  <span className="d">Repeating history to every provider, tracking their own referrals and follow-ups.</span>
                </div>
              </div>
              <div className="cmp good">
                <span className="mk" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12l4 4L19 6" />
                  </svg>
                </span>
                <div>
                  <strong>The Uribcare way</strong>
                  <span className="d">One platform where every provider collaborates around a single, connected care journey.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ECOSYSTEM ================= */}
        <section className="band band-alt" id="ecosystem">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">The ecosystem</span>
              <h2>Every part of care, connected on one platform</h2>
              <p className="lead">
                Uribcare brings the whole team together — so discovery, scheduling, consults, therapy, diagnostics,
                medication and follow-up all live in one continuous journey.
              </p>
            </div>

            {/* Hub-and-spoke composition: the six services sit either side of the
                central panel, with measured connector curves drawn between them. */}
            <div className="es">
              <div className="es-col">
                {ECOSYSTEM.slice(0, 3).map(({ Icon, title, body }, i) => (
                  <article className="es-card reveal" data-eco-node key={title} style={{ '--i': i } as React.CSSProperties}>
                    <span className="es-ico"><Icon size={22} /></span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="es-hub reveal" data-eco-hub style={{ '--i': 3 } as React.CSSProperties}>
                <div className="es-plaque">
                  <p className="es-wordmark">URIBCARE ECOSYSTEM</p>
                </div>
              </div>

              <div className="es-col">
                {ECOSYSTEM.slice(3).map(({ Icon, title, body }, i) => (
                  <article className="es-card reveal" data-eco-node key={title} style={{ '--i': i + 4 } as React.CSSProperties}>
                    <span className="es-ico"><Icon size={22} /></span>
                    <div>
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </article>
                ))}
              </div>

              <EcosystemConnectors />
            </div>
          </div>
        </section>

        {/* ================= SERVICES (real photos) ================= */}
        <section className="band" id="services">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">Our services</span>
              <h2>Specialized therapy for children and adults</h2>
              <p className="lead">
                Founded by clinicians with over two decades of experience, we deliver personalized, evidence-based
                therapy that improves mobility, communication and everyday independence — the care that anchors the wider
                Uribcare journey.
              </p>
            </div>

            <div className="svc-grid stagger">
              {SERVICES.map((s, i) => (
                <article className="svc-card reveal" key={s.title} style={{ '--i': i } as React.CSSProperties}>
                  <div className="svc-media">
                    <img src={s.img} alt={s.alt} width={1200} height={900} loading="lazy" decoding="async" />
                    <span className="svc-tag">{s.tag}</span>
                  </div>
                  <div className="svc-body">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                    <a className="arrow-link" href="#contact">
                      Book an assessment <Arrow />
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
              <span className="eyebrow">The patient journey</span>
              <h2>Discover, consult, treat, and follow up — without ever leaving the platform</h2>
              <p className="lead">One continuous path instead of a dozen disconnected steps.</p>
            </div>

            <ol className="journey">
              {JOURNEY.map((step, i) => (
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
                  <span className="eyebrow">Where we go deepest</span>
                  <h2>Autism care that finally works as one team</h2>
                  <p>
                    Autism care means many providers moving together over years — behavioral therapists, speech and
                    occupational therapists, counselors, physicians and families. Uribcare keeps them coordinated around
                    one child, one plan, one connected journey.
                  </p>
                  <div className="fb-list">
                    <div className="fi"><Check size={20} /><span>Matched to the right specialists for each child&apos;s needs</span></div>
                    <div className="fi"><Check size={20} /><span>Shared progress so every provider sees the full history</span></div>
                    <div className="fi"><Check size={20} /><span>Therapy, counseling and follow-ups in one calendar</span></div>
                    <div className="fi"><Check size={20} /><span>Support for families that continues between visits</span></div>
                  </div>
                </div>
                <figure className="fb-photo">
                  <img
                    src="/images/hero-physio-child.jpg"
                    alt="A therapist supporting a young child during a one-on-one session"
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>
                    “You should never have to be the one holding your child&apos;s care together. That&apos;s our job.”
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
            Care Principles
          </h2>
          <div className="wrap">
            <div className="cp-grid stagger">
              {PRINCIPLES.map(({ num, Icon, title, sub, body }, i) => (
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
              ))}
            </div>
          </div>
        </section>

        {/* ================= AUDIENCE ================= */}
        <section className="band band-alt" id="audience">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">Built for both sides of care</span>
              <h2>One platform for patients and providers alike</h2>
            </div>

            <div className="aud-grid">
              <div className="aud-card cool reveal">
                <span className="aud-tag">For patients &amp; families</span>
                <h3>Care that comes together for you</h3>
                <ul>
                  <li><Check size={19} /> Find and book the right provider in minutes</li>
                  <li><Check size={19} /> One record you never have to re-explain</li>
                  <li><Check size={19} /> Consult online or in person — your choice</li>
                  <li><Check size={19} /> Affordable, coordinated, continuous care</li>
                </ul>
              </div>
              <div className="aud-card warm reveal">
                <span className="aud-tag">For providers &amp; clinics</span>
                <h3>Collaborate without the friction</h3>
                <ul>
                  <li><Check size={19} /> Reach patients who need your services</li>
                  <li><Check size={19} /> Shared records for real continuity of care</li>
                  <li><Check size={19} /> Referrals and results that flow automatically</li>
                  <li><Check size={19} /> Less admin, more time with patients</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST / COMPLIANCE ================= */}
        <section className="band" id="trust">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">Security &amp; compliance</span>
              <h2>Healthcare-grade trust, built in from day one</h2>
              <p className="lead">
                Compliance is the foundation of everything we build — so patients and providers can collaborate with
                confidence.
              </p>
            </div>

            <div className="trust-grid reveal">
              <div className="trust-card">
                <div className="ti"><Shield size={22} /></div>
                <h4>HIPAA-ready</h4>
                <p>Built to meet healthcare privacy and data-protection standards.</p>
              </div>
              <div className="trust-card">
                <div className="ti"><Lock size={22} /></div>
                <h4>Encrypted end-to-end</h4>
                <p>Data protected in transit and at rest, every step of the way.</p>
              </div>
              <div className="trust-card">
                <div className="ti"><Clock size={22} /></div>
                <h4>Consent &amp; control</h4>
                <p>Patients decide who sees their record and when.</p>
              </div>
              <div className="trust-card">
                <div className="ti"><Lines size={22} /></div>
                <h4>Full audit trail</h4>
                <p>Every access and action is logged for accountability.</p>
              </div>
            </div>

            <div className="stats reveal">
              <div className="stat">
                <div className="n">172+</div>
                <div className="l">Families &amp; partners helped</div>
              </div>
              <div className="stat">
                <div className="n">98%</div>
                <div className="l">Would recommend our care</div>
              </div>
              <div className="stat">
                <div className="n">305+</div>
                <div className="l">Sessions &amp; workshops delivered</div>
              </div>
              <div className="stat">
                <div className="n">20+ yrs</div>
                <div className="l">Clinical expertise behind us</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="band band-alt" id="faq">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">Questions, answered</span>
              <h2>What families and providers ask us</h2>
            </div>

            <div className="faq">
              {FAQS.map((item, i) => (
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
                <span className="eyebrow">Start today</span>
                <h2>Start your free trial</h2>
                <p>
                  Tell us a little about your needs and we&apos;ll set you up with a connected care journey — usually
                  within a day. No credit card, no commitment.
                </p>
                <div className="reassure">
                  <div className="r"><Check size={19} /> Free to start — no card required</div>
                  <div className="r"><Check size={19} /> Get set up in about a day</div>
                  <div className="r"><Check size={19} /> HIPAA-ready &amp; secure by design</div>
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
      <SiteFooter />

      {/* sticky mobile CTA */}
      <div className="mbar">
        <a href="#contact" className="btn btn-primary">
          Start free trial
        </a>
        <a href="tel:+17709105581" className="btn btn-ghost" aria-label="Call Uribcare">
          <Phone size={18} />
        </a>
      </div>

      {/* reveal-on-scroll observer */}
      <Reveal />
    </>
  );
}
