/* eslint-disable @next/next/no-img-element */
import Nav from '@/components/Nav';
import CareConstellation from '@/components/CareConstellation';
import LeadForm from '@/components/LeadForm';
import Reveal from '@/components/Reveal';
import SiteFooter from '@/components/SiteFooter';

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
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>{' '}
                  HIPAA-ready & secure
                </span>
                <span className="tp">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                  </svg>{' '}
                  Online & in-person care
                </span>
                <span className="tp">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16M4 12h16M4 17h10" />
                  </svg>{' '}
                  Every provider, one record
                </span>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-canvas-card">
                <CareConstellation />
                <span className="hero-badge">
                  <span className="pulse-dot"></span> Care coordinated in real time
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
              <span className="pchip">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21c-4.5-3-8-6.2-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4.8-3.5 8-8 11z" />
                </svg>{' '}
                Doctors
              </span>
              <span className="pchip">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="8" height="8" rx="2" />
                  <rect x="13" y="13" width="8" height="8" rx="2" />
                  <path d="M11 7h4a2 2 0 0 1 2 2v4" />
                </svg>{' '}
                Therapists
              </span>
              <span className="pchip">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a8 8 0 0 1-11.4 7.2L4 20l1.1-4.4A8 8 0 1 1 21 12z" />
                </svg>{' '}
                Counselors
              </span>
              <span className="pchip">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  <path d="M17 7l2 2 3-3" />
                </svg>{' '}
                Nurses
              </span>
              <span className="pchip">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.5 3.5l10 10a3.5 3.5 0 0 1-5 5l-10-10a3.5 3.5 0 0 1 5-5z" />
                  <path d="M8 6l7 7" />
                </svg>{' '}
                Pharmacies
              </span>
              <span className="pchip">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 3v6l-4.5 8A2 2 0 0 0 6.3 20h11.4a2 2 0 0 0 1.8-3L15 9V3" />
                  <path d="M8 3h8" />
                  <path d="M7.5 14h9" />
                </svg>{' '}
                Diagnostic labs
              </span>
              <span className="pchip">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11l9-7 9 7" />
                  <path d="M5 10v10h14V10" />
                </svg>{' '}
                Home & in-person care
              </span>
            </div>
          </div>
        </section>

        {/* ================= PROBLEM / SOLUTION ================= */}
        <section className="band" id="problem">
          <div className="wrap split">
            <div className="reveal">
              <span className="eyebrow">The problem</span>
              <h2 style={{ fontSize: 'clamp(1.9rem,3.8vw,2.9rem)', marginTop: '.9rem' }}>
                Care is scattered. Families carry the burden of holding it together.
              </h2>
              <p className="lead" style={{ marginTop: '1.1rem' }}>
                A patient sees a doctor here, a therapist there, picks up medication somewhere else, and books a lab test
                on the phone. Nobody shares the full picture — so families repeat their story, chase appointments, and
                fall through the gaps. For ongoing needs like autism care, that friction never stops.
              </p>
            </div>
            <div className="compare reveal">
              <div className="cmp bad">
                <span className="mk">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <div>
                  <strong>Healthcare today</strong>
                  <span className="d">Disconnected apps, phone tag, lost records, and no one coordinating the next step.</span>
                </div>
              </div>
              <div className="cmp bad">
                <span className="mk">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <div>
                  <strong>The patient does the work</strong>
                  <span className="d">Repeating history to every provider, tracking their own referrals and follow-ups.</span>
                </div>
              </div>
              <div className="cmp good">
                <span className="mk">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
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
        <section className="band" id="ecosystem" style={{ background: 'var(--paper-2)', borderBlock: '1px solid var(--line)' }}>
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">The ecosystem</span>
              <h2>Every part of care, connected on one platform</h2>
              <p className="lead">
                Uribcare brings the whole team together — so discovery, scheduling, consults, therapy, diagnostics,
                medication and follow-up all live in one continuous journey.
              </p>
            </div>
            <div className="eco-grid">
              <div className="eco-card reveal">
                <div className="eco-ico">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 21c-4.5-3-8-6.2-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4.8-3.5 8-8 11z" />
                  </svg>
                </div>
                <h3>Doctors & specialists</h3>
                <p>Find the right physician, consult online or in person, and keep every diagnosis and note in one shared record.</p>
              </div>
              <div className="eco-card reveal">
                <div className="eco-ico">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="8" height="8" rx="2" />
                    <rect x="13" y="13" width="8" height="8" rx="2" />
                    <path d="M11 7h4a2 2 0 0 1 2 2v4" />
                  </svg>
                </div>
                <h3>Therapists & counselors</h3>
                <p>Behavioral, occupational, speech and mental-health support — matched, scheduled and tracked over time.</p>
              </div>
              <div className="eco-card reveal">
                <div className="eco-ico">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                    <path d="M17 7l2 2 3-3" />
                  </svg>
                </div>
                <h3>Nurses & home care</h3>
                <p>Coordinated in-home visits and ongoing support that stay linked to the patient&apos;s wider care team.</p>
              </div>
              <div className="eco-card reveal">
                <div className="eco-ico">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.5 3.5l10 10a3.5 3.5 0 0 1-5 5l-10-10a3.5 3.5 0 0 1 5-5z" />
                    <path d="M8 6l7 7" />
                  </svg>
                </div>
                <h3>Pharmacies</h3>
                <p>Prescriptions flow straight from consult to pharmacy — with refills and reminders built in.</p>
              </div>
              <div className="eco-card reveal">
                <div className="eco-ico">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3v6l-4.5 8A2 2 0 0 0 6.3 20h11.4a2 2 0 0 0 1.8-3L15 9V3" />
                    <path d="M8 3h8" />
                    <path d="M7.5 14h9" />
                  </svg>
                </div>
                <h3>Diagnostic labs</h3>
                <p>Order tests, book collection, and see results land in the record automatically for every provider.</p>
              </div>
              <div className="eco-card reveal">
                <div className="eco-ico">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
                  </svg>
                </div>
                <h3>One connected record</h3>
                <p>Everyone works from the same source of truth, so nothing is repeated and nothing gets lost.</p>
              </div>
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
            <div className="svc-grid">
              <article className="svc-card reveal">
                <div className="svc-media">
                  <img src="/images/card-physical.jpg" alt="Physical therapist guiding a patient through a stability-ball exercise" />
                  <span className="svc-tag">Physical Therapy</span>
                </div>
                <div className="svc-body">
                  <h3>Physical Therapy</h3>
                  <p>Restore mobility, reduce pain, build strength, and regain independence through personalized, goal-driven programs for every age.</p>
                  <a className="svc-link" href="#contact">Book an assessment →</a>
                </div>
              </article>
              <article className="svc-card reveal">
                <div className="svc-media">
                  <img src="/images/card-occupational.jpg" alt="Occupational therapists supporting an adult with mobility rehabilitation" />
                  <span className="svc-tag">Occupational Therapy</span>
                </div>
                <div className="svc-body">
                  <h3>Occupational Therapy</h3>
                  <p>Develop the skills for daily living, learning and working — so patients participate confidently in the activities that matter to them.</p>
                  <a className="svc-link" href="#contact">Book an assessment →</a>
                </div>
              </article>
              <article className="svc-card reveal">
                <div className="svc-media">
                  <img src="/images/card-speech.jpg" alt="Speech therapist working with a young child on articulation" />
                  <span className="svc-tag">Speech Therapy</span>
                </div>
                <div className="svc-body">
                  <h3>Speech Therapy</h3>
                  <p>Improve communication, language, speech clarity, cognitive skills and swallowing — for children and adults alike.</p>
                  <a className="svc-link" href="#contact">Book an assessment →</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* ================= JOURNEY ================= */}
        <section className="band" id="journey">
          <div className="wrap">
            <div className="band-head reveal">
              <span className="eyebrow">The patient journey</span>
              <h2>Discover, consult, treat, and follow up — without ever leaving the platform</h2>
              <p className="lead">One continuous path instead of a dozen disconnected steps.</p>
            </div>
            <div className="journey">
              <div className="jrow reveal">
                <div className="jnum">1</div>
                <div className="jbody">
                  <span className="jstep-label">Discover</span>
                  <h4>Find the right care</h4>
                  <p>Search verified doctors, therapists, counselors and labs — filtered by need, location and availability.</p>
                </div>
              </div>
              <div className="jrow reveal">
                <div className="jnum">2</div>
                <div className="jbody">
                  <span className="jstep-label">Schedule</span>
                  <h4>Book in a few taps</h4>
                  <p>Online or in-person appointments with real-time availability and automatic reminders.</p>
                </div>
              </div>
              <div className="jrow reveal">
                <div className="jnum">3</div>
                <div className="jbody">
                  <span className="jstep-label">Consult</span>
                  <h4>Meet your provider</h4>
                  <p>Secure video or in-clinic visits, with notes and next steps captured in the shared record.</p>
                </div>
              </div>
              <div className="jrow reveal">
                <div className="jnum">4</div>
                <div className="jbody">
                  <span className="jstep-label">Therapy</span>
                  <h4>Ongoing support</h4>
                  <p>Recurring therapy and counseling sessions, progress tracked and visible to the whole care team.</p>
                </div>
              </div>
              <div className="jrow reveal">
                <div className="jnum">5</div>
                <div className="jbody">
                  <span className="jstep-label">Diagnostics</span>
                  <h4>Tests & results</h4>
                  <p>Order lab work, schedule collection, and get results routed back to every provider automatically.</p>
                </div>
              </div>
              <div className="jrow reveal">
                <div className="jnum">6</div>
                <div className="jbody">
                  <span className="jstep-label">Medication</span>
                  <h4>Prescriptions & refills</h4>
                  <p>Fulfil medication through connected pharmacies with reminders and easy refills.</p>
                </div>
              </div>
              <div className="jrow reveal">
                <div className="jnum">7</div>
                <div className="jbody">
                  <span className="jstep-label">Follow-up</span>
                  <h4>Continuous care</h4>
                  <p>Coordinated follow-ups keep the plan moving — no gaps, no chasing, no starting over.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= AUTISM BAND ================= */}
        <section className="band" id="autism" style={{ paddingTop: 0 }}>
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
                    <div className="fi">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l4 4L19 6" />
                      </svg>
                      <span>Matched to the right specialists for each child&apos;s needs</span>
                    </div>
                    <div className="fi">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l4 4L19 6" />
                      </svg>
                      <span>Shared progress so every provider sees the full history</span>
                    </div>
                    <div className="fi">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l4 4L19 6" />
                      </svg>
                      <span>Therapy, counseling and follow-ups in one calendar</span>
                    </div>
                    <div className="fi">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l4 4L19 6" />
                      </svg>
                      <span>Support for families that continues between visits</span>
                    </div>
                  </div>
                </div>
                <figure className="fb-photo">
                  <img src="/images/hero-physio-child.jpg" alt="A therapist supporting a young child during a one-on-one session" />
                  <figcaption>
                    “You should never have to be the one holding your child&apos;s care together. That&apos;s our job.”
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ================= AUDIENCE ================= */}
        <section className="band" id="audience" style={{ background: 'var(--paper-2)', borderBlock: '1px solid var(--line)' }}>
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">Built for both sides of care</span>
              <h2>One platform for patients and providers alike</h2>
            </div>
            <div className="aud-grid">
              <div className="aud-card cool reveal">
                <span className="aud-tag">For patients & families</span>
                <h3>Care that comes together for you</h3>
                <ul>
                  <li>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    Find and book the right provider in minutes
                  </li>
                  <li>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    One record you never have to re-explain
                  </li>
                  <li>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    Consult online or in person — your choice
                  </li>
                  <li>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    Affordable, coordinated, continuous care
                  </li>
                </ul>
              </div>
              <div className="aud-card warm reveal">
                <span className="aud-tag">For providers & clinics</span>
                <h3>Collaborate without the friction</h3>
                <ul>
                  <li>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    Reach patients who need your services
                  </li>
                  <li>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    Shared records for real continuity of care
                  </li>
                  <li>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    Referrals and results that flow automatically
                  </li>
                  <li>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    Less admin, more time with patients
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST / COMPLIANCE ================= */}
        <section className="band" id="trust">
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">Security & compliance</span>
              <h2>Healthcare-grade trust, built in from day one</h2>
              <p className="lead">
                Compliance is the foundation of everything we build — so patients and providers can collaborate with
                confidence.
              </p>
            </div>
            <div className="trust-grid">
              <div className="trust-card reveal">
                <div className="ti">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h4>HIPAA-ready</h4>
                <p>Built to meet healthcare privacy and data-protection standards.</p>
              </div>
              <div className="trust-card reveal">
                <div className="ti">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                </div>
                <h4>Encrypted end-to-end</h4>
                <p>Data protected in transit and at rest, every step of the way.</p>
              </div>
              <div className="trust-card reveal">
                <div className="ti">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v4l2.5 1.5" />
                  </svg>
                </div>
                <h4>Consent & control</h4>
                <p>Patients decide who sees their record and when.</p>
              </div>
              <div className="trust-card reveal">
                <div className="ti">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 7h16M4 12h16M4 17h10" />
                    <circle cx="19" cy="17" r="2.4" />
                  </svg>
                </div>
                <h4>Full audit trail</h4>
                <p>Every access and action is logged for accountability.</p>
              </div>
            </div>

            <div className="stats reveal" style={{ marginTop: 'clamp(2.6rem,5vw,3.6rem)' }}>
              <div className="stat">
                <div className="n">172+</div>
                <div className="l">Families & partners helped</div>
              </div>
              <div className="stat">
                <div className="n">98%</div>
                <div className="l">Would recommend our care</div>
              </div>
              <div className="stat">
                <div className="n">305+</div>
                <div className="l">Sessions & workshops delivered</div>
              </div>
              <div className="stat">
                <div className="n">20+ yrs</div>
                <div className="l">Clinical expertise behind us</div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ ================= */}
        <section className="band" id="faq" style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line)' }}>
          <div className="wrap">
            <div className="band-head center reveal">
              <span className="eyebrow">Questions, answered</span>
              <h2>What families and providers ask us</h2>
            </div>
            <div className="faq">
              <details className="q reveal" open>
                <summary>
                  What exactly is Uribcare?
                  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <div className="a">
                  Uribcare is a connected healthcare ecosystem. It brings patients, doctors, therapists, counselors,
                  nurses, pharmacies and diagnostic labs onto one platform — so discovery, scheduling, consults,
                  therapy, tests, medication and follow-up all happen in one coordinated journey. Autism care is our
                  primary focus, with a growing range of services beyond it.
                </div>
              </details>
              <details className="q reveal">
                <summary>
                  Is my health data safe?
                  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <div className="a">
                  Yes. Uribcare is built to HIPAA-ready standards, with encryption in transit and at rest,
                  patient-controlled consent, and full audit logging. You decide which providers can access your record.
                </div>
              </details>
              <details className="q reveal">
                <summary>
                  Can I get care online and in person?
                  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <div className="a">
                  Both. You can consult providers by secure video or book in-person visits — whatever fits your needs —
                  and everything stays in the same connected record.
                </div>
              </details>
              <details className="q reveal">
                <summary>
                  How does Uribcare help with autism care specifically?
                  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <div className="a">
                  Autism care involves many providers coordinating over a long time. Uribcare matches families to the
                  right specialists, keeps therapy, counseling and follow-ups in one place, and gives every provider
                  shared visibility into progress — so families don&apos;t have to hold it all together alone.
                </div>
              </details>
              <details className="q reveal">
                <summary>
                  I&apos;m a provider. How do I join?
                  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </summary>
                <div className="a">
                  Providers and clinics can join to reach new patients, collaborate through shared records, and cut
                  admin time. Start a free trial or book a demo below and our team will get you set up.
                </div>
              </details>
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
                  <div className="r">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    Free to start — no card required
                  </div>
                  <div className="r">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    Get set up in about a day
                  </div>
                  <div className="r">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12l4 4L19 6" />
                    </svg>{' '}
                    HIPAA-ready & secure by design
                  </div>
                </div>
                <div className="contact-meta">
                  <a href="mailto:contact@uribcare.com">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>{' '}
                    contact@uribcare.com
                  </a>
                  <a href="tel:+17709105581">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
                    </svg>{' '}
                    +1 (770) 910-5581
                  </a>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
          </svg>
        </a>
      </div>

      {/* reveal-on-scroll observer */}
      <Reveal />
    </>
  );
}
