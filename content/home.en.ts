/**
 * Every user-facing string on the home page, in English. `home.es.ts` mirrors
 * this shape and is type-checked against it, so a missing Spanish string is a
 * build error rather than English leaking onto /es.
 */
export const homeEn = {
  hero: {
    eyebrow: 'One connected care ecosystem',
    titleBefore: 'One platform for the ',
    titleAccent: 'whole',
    titleAfter: ' healthcare journey.',
    lead: 'Uribcare connects patients with the doctors, therapists, counselors, nurses, pharmacies and labs they need, coordinated in one place, online or in person. Autism care is where we go deepest.',
    ctaPrimary: 'Start a free trial',
    ctaSecondary: 'See how it works',
    trust: ['HIPAA-ready & secure', 'Online & in-person care', 'Every provider, one record'],
    badge: 'Care coordinated in real time',
  },
  strip: {
    label: 'Who Uribcare connects',
    head: 'One connected journey across every part of care',
    chips: ['Doctors', 'Therapists', 'Counselors', 'Nurses', 'Pharmacies', 'Diagnostic labs', 'Home & in-person care'],
  },
  problem: {
    eyebrow: 'The problem',
    heading: 'Care is scattered. Families carry the burden of holding it together.',
    lead: 'A patient sees a doctor here, a therapist there, picks up medication somewhere else, and books a lab test on the phone. Nobody shares the full picture, so families repeat their story, chase appointments, and fall through the gaps. For ongoing needs like autism care, that friction never stops.',
    compare: [
      { title: 'Healthcare today', text: 'Disconnected apps, phone tag, lost records, and no one coordinating the next step.' },
      { title: 'The patient does the work', text: 'Repeating history to every provider, tracking their own referrals and follow-ups.' },
      { title: 'The Uribcare way', text: 'One platform where every provider collaborates around a single, connected care journey.' },
    ],
  },
  ecosystem: {
    eyebrow: 'The ecosystem',
    heading: 'Every part of care, connected on one platform',
    lead: 'Uribcare brings the whole team together, so discovery, scheduling, consults, therapy, diagnostics, medication and follow-up all live in one continuous journey.',
    plaque: 'URIBCARE ECOSYSTEM',
    items: [
      { title: 'Doctors & specialists', body: 'Find the right physician, consult online or in person, and keep every diagnosis and note in one shared record.' },
      { title: 'Therapists & counselors', body: 'Behavioral, occupational, speech and mental-health support: matched, scheduled and tracked over time.' },
      { title: 'Nurses & home care', body: 'Coordinated in-home visits and ongoing support that stay linked to the patient’s wider care team.' },
      { title: 'Pharmacies', body: 'Prescriptions flow straight from consult to pharmacy, with refills and reminders built in.' },
      { title: 'Diagnostic labs', body: 'Order tests, book collection, and see results land in the record automatically for every provider.' },
      { title: 'One connected record', body: 'Everyone works from the same source of truth, so nothing is repeated and nothing gets lost.' },
    ],
  },
  services: {
    eyebrow: 'Our services',
    heading: 'Specialized therapy for children and adults',
    lead: 'Founded by clinicians with over two decades of experience, we deliver personalized, evidence-based therapy that improves mobility, communication and everyday independence, the care that anchors the wider Uribcare journey.',
    cta: 'Book an assessment',
    items: [
      {
        alt: 'Physical therapist guiding a patient through a stability-ball exercise',
        tag: 'Physical Therapy',
        title: 'Physical Therapy',
        body: 'Restore mobility, reduce pain, build strength, and regain independence through personalized, goal-driven programs for every age.',
      },
      {
        alt: 'Occupational therapists supporting an adult with mobility rehabilitation',
        tag: 'Occupational Therapy',
        title: 'Occupational Therapy',
        body: 'Develop the skills for daily living, learning and working, so patients participate confidently in the activities that matter to them.',
      },
      {
        alt: 'Speech therapist working with a young child on articulation',
        tag: 'Speech Therapy',
        title: 'Speech Therapy',
        body: 'Improve communication, language, speech clarity, cognitive skills and swallowing, for children and adults alike.',
      },
    ],
  },
  journey: {
    eyebrow: 'The patient journey',
    heading: 'Discover, consult, treat, and follow up without ever leaving the platform',
    lead: 'One continuous path instead of a dozen disconnected steps.',
    steps: [
      { label: 'Discover', title: 'Find the right care', body: 'Search verified doctors, therapists, counselors and labs, filtered by need, location and availability.' },
      { label: 'Schedule', title: 'Book in a few taps', body: 'Online or in-person appointments with real-time availability and automatic reminders.' },
      { label: 'Consult', title: 'Meet your provider', body: 'Secure video or in-clinic visits, with notes and next steps captured in the shared record.' },
      { label: 'Therapy', title: 'Ongoing support', body: 'Recurring therapy and counseling sessions, progress tracked and visible to the whole care team.' },
      { label: 'Diagnostics', title: 'Tests & results', body: 'Order lab work, schedule collection, and get results routed back to every provider automatically.' },
      { label: 'Medication', title: 'Prescriptions & refills', body: 'Fulfil medication through connected pharmacies with reminders and easy refills.' },
      { label: 'Follow-up', title: 'Continuous care', body: 'Coordinated follow-ups keep the plan moving: no gaps, no chasing, no starting over.' },
    ],
  },
  autism: {
    eyebrow: 'Where we go deepest',
    heading: 'Autism care that finally works as one team',
    body: 'Autism care means many providers moving together over years: behavioral therapists, speech and occupational therapists, counselors, physicians and families. Uribcare keeps them coordinated around one child, one plan, one connected journey.',
    points: [
      'Matched to the right specialists for each child’s needs',
      'Shared progress so every provider sees the full history',
      'Therapy, counseling and follow-ups in one calendar',
      'Support for families that continues between visits',
    ],
    photoAlt: 'A therapist supporting a young child during a one-on-one session',
    quote: '“You should never have to be the one holding your child’s care together. That’s our job.”',
  },
  principles: {
    srHeading: 'Care Principles',
    items: [
      { num: '01', title: 'Integrity & Accountability', sub: 'Building Trust Through Excellence', body: 'We uphold the highest standards of honesty, transparency, and professional care in every patient interaction.' },
      { num: '02', title: 'Advanced Techniques & Innovation', sub: 'Delivering Modern, Evidence-Based Care', body: 'We utilize the latest therapeutic techniques, technologies, and treatment strategies to achieve optimal outcomes.' },
      { num: '03', title: 'Compassionate Care', sub: 'Serving with Empathy & Respect', body: 'We build lasting relationships through genuine care, personalized attention, and unwavering support.' },
    ],
  },
  audience: {
    eyebrow: 'Built for both sides of care',
    heading: 'One platform for patients and providers alike',
    patients: {
      tag: 'For patients & families',
      title: 'Care that comes together for you',
      points: [
        'Find and book the right provider in minutes',
        'One record you never have to re-explain',
        'Consult online or in person, your choice',
        'Affordable, coordinated, continuous care',
      ],
    },
    providers: {
      tag: 'For providers & clinics',
      title: 'Collaborate without the friction',
      points: [
        'Reach patients who need your services',
        'Shared records for real continuity of care',
        'Referrals and results that flow automatically',
        'Less admin, more time with patients',
      ],
    },
  },
  trust: {
    eyebrow: 'Security & compliance',
    heading: 'Healthcare-grade trust, built in from day one',
    lead: 'Compliance is the foundation of everything we build, so patients and providers can collaborate with confidence.',
    cards: [
      { title: 'HIPAA-ready', body: 'Built to meet healthcare privacy and data-protection standards.' },
      { title: 'Encrypted end-to-end', body: 'Data protected in transit and at rest, every step of the way.' },
      { title: 'Consent & control', body: 'Patients decide who sees their record and when.' },
      { title: 'Full audit trail', body: 'Every access and action is logged for accountability.' },
    ],
    stats: [
      { n: '172+', l: 'Families & partners helped' },
      { n: '98%', l: 'Would recommend our care' },
      { n: '305+', l: 'Sessions & workshops delivered' },
      { n: '20+ yrs', l: 'Clinical expertise behind us' },
    ],
  },
  faq: {
    eyebrow: 'Questions, answered',
    heading: 'What families and providers ask us',
    items: [
      {
        q: 'What exactly is Uribcare?',
        a: 'Uribcare is a connected healthcare ecosystem. It brings patients, doctors, therapists, counselors, nurses, pharmacies and diagnostic labs onto one platform, so discovery, scheduling, consults, therapy, tests, medication and follow-up all happen in one coordinated journey. Autism care is our primary focus, with a growing range of services beyond it.',
      },
      {
        q: 'Is my health data safe?',
        a: 'Yes. Uribcare is built to HIPAA-ready standards, with encryption in transit and at rest, patient-controlled consent, and full audit logging. You decide which providers can access your record.',
      },
      {
        q: 'Can I get care online and in person?',
        a: 'Both. You can consult providers by secure video or book in-person visits, whatever fits your needs, and everything stays in the same connected record.',
      },
      {
        q: 'How does Uribcare help with autism care specifically?',
        a: 'Autism care involves many providers coordinating over a long time. Uribcare matches families to the right specialists, keeps therapy, counseling and follow-ups in one place, and gives every provider shared visibility into progress, so families don’t have to hold it all together alone.',
      },
      {
        q: 'I’m a provider. How do I join?',
        a: 'Providers and clinics can join to reach new patients, collaborate through shared records, and cut admin time. Start a free trial or book a demo below and our team will get you set up.',
      },
    ],
  },
  contact: {
    eyebrow: 'Start today',
    heading: 'Start your free trial',
    body: 'Tell us a little about your needs and we’ll set you up with a connected care journey, usually within a day. No credit card, no commitment.',
    reassure: ['Free to start, no card required', 'Get set up in about a day', 'HIPAA-ready & secure by design'],
  },
  mbar: { trial: 'Start free trial', call: 'Call Uribcare' },
};

export type HomeContent = typeof homeEn;
