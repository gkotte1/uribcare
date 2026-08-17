/**
 * English landing-page dictionary — the source of truth for the shape of every
 * translation. `Dict` is inferred from this object, so a missing or misspelled
 * key in another locale is a compile error rather than a runtime blank.
 *
 * Strings here are the approved English copy, verbatim.
 */
export const en = {
  meta: {
    title: 'Uribcare — Connecting Care, Simplifying Healthcare',
    description:
      'Uribcare is a connected healthcare ecosystem linking patients with doctors, therapists, counselors, nurses, pharmacies and labs — online and in person. Autism care is where we go deepest.',
  },

  skipLink: 'Skip to content',

  nav: {
    ariaPrimary: 'Primary',
    ariaMobile: 'Mobile',
    brandHome: 'URIBCARE home',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    themeToggle: 'Toggle light and dark theme',
    links: {
      services: 'Services',
      ecosystem: 'Ecosystem',
      journey: 'How it works',
      autismCare: 'Autism care',
      security: 'Security',
    },
    allServices: 'View the services section',
    allEcosystem: 'View the ecosystem section',
    bookDemo: 'Book a demo',
    registration: 'Registration',
    startTrial: 'Start free trial',
    language: {
      label: 'Language',
      en: 'English',
      es: 'Español',
    },
  },

  /** Category copy behind the navbar dropdowns. Slugs/hrefs come from content/nav.ts. */
  serviceNav: {
    'physical-therapy': {
      name: 'Physical Therapy',
      shortDescription:
        'Restore mobility, reduce pain, build strength, and regain independence through personalized, goal-driven programs for every age.',
    },
    'occupational-therapy': {
      name: 'Occupational Therapy',
      shortDescription:
        'Develop the skills for daily living, learning and working — so patients participate confidently in the activities that matter to them.',
    },
    'speech-therapy': {
      name: 'Speech Therapy',
      shortDescription:
        'Improve communication, language, speech clarity, cognitive skills and swallowing — for children and adults alike.',
    },
  },

  ecosystemNav: {
    'doctors-specialists': {
      name: 'Doctors & specialists',
      shortDescription:
        'Find the right physician, consult online or in person, and keep every diagnosis and note in one shared record.',
    },
    'therapists-counselors': {
      name: 'Therapists & counselors',
      shortDescription:
        'Behavioral, occupational, speech and mental-health support — matched, scheduled and tracked over time.',
    },
    'nurses-home-care': {
      name: 'Nurses & home care',
      shortDescription:
        'Coordinated in-home visits and ongoing support that stay linked to the patient’s wider care team.',
    },
    pharmacies: {
      name: 'Pharmacies',
      shortDescription:
        'Prescriptions flow straight from consult to pharmacy — with refills and reminders built in.',
    },
    'diagnostic-labs': {
      name: 'Diagnostic labs',
      shortDescription:
        'Order tests, book collection, and see results land in the record automatically for every provider.',
    },
    'connected-record': {
      name: 'One connected record',
      shortDescription:
        'Everyone works from the same source of truth, so nothing is repeated and nothing gets lost.',
    },
  },

  hero: {
    eyebrow: 'One connected care ecosystem',
    titleBefore: 'One platform for the ',
    titleAccent: 'whole',
    titleAfter: ' healthcare journey.',
    lead:
      'Uribcare connects patients with the doctors, therapists, counselors, nurses, pharmacies and labs they need — coordinated in one place, online or in person. Autism care is where we go deepest.',
    ctaPrimary: 'Start a free trial',
    ctaSecondary: 'See how it works',
    trustHipaa: 'HIPAA-ready & secure',
    trustOnline: 'Online & in-person care',
    trustRecord: 'Every provider, one record',
    badge: 'Care coordinated in real time',
    /** Node labels painted onto the hero constellation canvas. Keep them short —
     *  they are drawn beside each node and cannot wrap. */
    constellation: {
      patient: 'Patient',
      doctor: 'Doctor',
      therapist: 'Therapist',
      counselor: 'Counselor',
      pharmacy: 'Pharmacy',
      lab: 'Lab',
      nurse: 'Nurse',
    },
  },

  strip: {
    aria: 'Who Uribcare connects',
    head: 'One connected journey across every part of care',
    chips: [
      'Doctors',
      'Therapists',
      'Counselors',
      'Nurses',
      'Pharmacies',
      'Diagnostic labs',
      'Home & in-person care',
    ],
  },

  problem: {
    eyebrow: 'The problem',
    title: 'Care is scattered. Families carry the burden of holding it together.',
    lead:
      'A patient sees a doctor here, a therapist there, picks up medication somewhere else, and books a lab test on the phone. Nobody shares the full picture — so families repeat their story, chase appointments, and fall through the gaps. For ongoing needs like autism care, that friction never stops.',
    items: [
      {
        title: 'Healthcare today',
        body: 'Disconnected apps, phone tag, lost records, and no one coordinating the next step.',
      },
      {
        title: 'The patient does the work',
        body: 'Repeating history to every provider, tracking their own referrals and follow-ups.',
      },
      {
        title: 'The Uribcare way',
        body: 'One platform where every provider collaborates around a single, connected care journey.',
      },
    ],
  },

  ecosystem: {
    eyebrow: 'The ecosystem',
    title: 'Every part of care, connected on one platform',
    lead:
      'Uribcare brings the whole team together — so discovery, scheduling, consults, therapy, diagnostics, medication and follow-up all live in one continuous journey.',
    wordmark: 'URIBCARE ECOSYSTEM',
    cards: [
      {
        title: 'Doctors & specialists',
        body: 'Find the right physician, consult online or in person, and keep every diagnosis and note in one shared record.',
      },
      {
        title: 'Therapists & counselors',
        body: 'Behavioral, occupational, speech and mental-health support — matched, scheduled and tracked over time.',
      },
      {
        title: 'Nurses & home care',
        body: 'Coordinated in-home visits and ongoing support that stay linked to the patient’s wider care team.',
      },
      {
        title: 'Pharmacies',
        body: 'Prescriptions flow straight from consult to pharmacy — with refills and reminders built in.',
      },
      {
        title: 'Diagnostic labs',
        body: 'Order tests, book collection, and see results land in the record automatically for every provider.',
      },
      {
        title: 'One connected record',
        body: 'Everyone works from the same source of truth, so nothing is repeated and nothing gets lost.',
      },
    ],
  },

  services: {
    eyebrow: 'Our services',
    title: 'Specialized therapy for children and adults',
    lead:
      'Founded by clinicians with over two decades of experience, we deliver personalized, evidence-based therapy that improves mobility, communication and everyday independence — the care that anchors the wider Uribcare journey.',
    cta: 'Book an assessment',
    cards: [
      {
        tag: 'Physical Therapy',
        title: 'Physical Therapy',
        body: 'Restore mobility, reduce pain, build strength, and regain independence through personalized, goal-driven programs for every age.',
        alt: 'Physical therapist guiding a patient through a stability-ball exercise',
      },
      {
        tag: 'Occupational Therapy',
        title: 'Occupational Therapy',
        body: 'Develop the skills for daily living, learning and working — so patients participate confidently in the activities that matter to them.',
        alt: 'Occupational therapists supporting an adult with mobility rehabilitation',
      },
      {
        tag: 'Speech Therapy',
        title: 'Speech Therapy',
        body: 'Improve communication, language, speech clarity, cognitive skills and swallowing — for children and adults alike.',
        alt: 'Speech therapist working with a young child on articulation',
      },
    ],
  },

  journey: {
    eyebrow: 'The patient journey',
    title: 'Discover, consult, treat, and follow up — without ever leaving the platform',
    lead: 'One continuous path instead of a dozen disconnected steps.',
    steps: [
      {
        label: 'Discover',
        title: 'Find the right care',
        body: 'Search verified doctors, therapists, counselors and labs — filtered by need, location and availability.',
      },
      {
        label: 'Schedule',
        title: 'Book in a few taps',
        body: 'Online or in-person appointments with real-time availability and automatic reminders.',
      },
      {
        label: 'Consult',
        title: 'Meet your provider',
        body: 'Secure video or in-clinic visits, with notes and next steps captured in the shared record.',
      },
      {
        label: 'Therapy',
        title: 'Ongoing support',
        body: 'Recurring therapy and counseling sessions, progress tracked and visible to the whole care team.',
      },
      {
        label: 'Diagnostics',
        title: 'Tests & results',
        body: 'Order lab work, schedule collection, and get results routed back to every provider automatically.',
      },
      {
        label: 'Medication',
        title: 'Prescriptions & refills',
        body: 'Fulfil medication through connected pharmacies with reminders and easy refills.',
      },
      {
        label: 'Follow-up',
        title: 'Continuous care',
        body: 'Coordinated follow-ups keep the plan moving — no gaps, no chasing, no starting over.',
      },
    ],
  },

  autism: {
    eyebrow: 'Where we go deepest',
    title: 'Autism care that finally works as one team',
    body:
      'Autism care means many providers moving together over years — behavioral therapists, speech and occupational therapists, counselors, physicians and families. Uribcare keeps them coordinated around one child, one plan, one connected journey.',
    list: [
      'Matched to the right specialists for each child’s needs',
      'Shared progress so every provider sees the full history',
      'Therapy, counseling and follow-ups in one calendar',
      'Support for families that continues between visits',
    ],
    quote:
      '“You should never have to be the one holding your child’s care together. That’s our job.”',
    photoAlt: 'A therapist supporting a young child during a one-on-one session',
  },

  principles: {
    heading: 'Care Principles',
    cards: [
      {
        num: '01',
        title: 'Integrity & Accountability',
        sub: 'Building Trust Through Excellence',
        body: 'We uphold the highest standards of honesty, transparency, and professional care in every patient interaction.',
      },
      {
        num: '02',
        title: 'Advanced Techniques & Innovation',
        sub: 'Delivering Modern, Evidence-Based Care',
        body: 'We utilize the latest therapeutic techniques, technologies, and treatment strategies to achieve optimal outcomes.',
      },
      {
        num: '03',
        title: 'Compassionate Care',
        sub: 'Serving with Empathy & Respect',
        body: 'We build lasting relationships through genuine care, personalized attention, and unwavering support.',
      },
    ],
  },

  audience: {
    eyebrow: 'Built for both sides of care',
    title: 'One platform for patients and providers alike',
    patients: {
      tag: 'For patients & families',
      title: 'Care that comes together for you',
      items: [
        'Find and book the right provider in minutes',
        'One record you never have to re-explain',
        'Consult online or in person — your choice',
        'Affordable, coordinated, continuous care',
      ],
    },
    providers: {
      tag: 'For providers & clinics',
      title: 'Collaborate without the friction',
      items: [
        'Reach patients who need your services',
        'Shared records for real continuity of care',
        'Referrals and results that flow automatically',
        'Less admin, more time with patients',
      ],
    },
  },

  trust: {
    eyebrow: 'Security & compliance',
    title: 'Healthcare-grade trust, built in from day one',
    lead:
      'Compliance is the foundation of everything we build — so patients and providers can collaborate with confidence.',
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
    title: 'What families and providers ask us',
    items: [
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
    ],
  },

  contact: {
    eyebrow: 'Start today',
    title: 'Start your free trial',
    body:
      'Tell us a little about your needs and we’ll set you up with a connected care journey — usually within a day. No credit card, no commitment.',
    reassure: [
      'Free to start — no card required',
      'Get set up in about a day',
      'HIPAA-ready & secure by design',
    ],
  },

  form: {
    heading: 'Request access',
    sub: 'We’ll reply personally — usually within a day or two.',
    required: 'required',
    nameLabel: 'Full name',
    namePlaceholder: 'Your name',
    nameError: 'Please enter your name.',
    emailLabel: 'Email',
    emailPlaceholder: 'you@email.com',
    emailError: 'Please enter a valid email.',
    phoneLabel: 'Phone',
    phonePlaceholder: 'Optional',
    roleLabel: 'I am a…',
    rolePlaceholder: 'Select one',
    roleError: 'Please choose an option.',
    roleOptions: [
      'Patient or family member',
      'Parent seeking autism care',
      'Doctor or specialist',
      'Therapist or counselor',
      'Clinic, pharmacy or lab',
      'Other',
    ],
    messageLabel: 'What do you need help with?',
    messagePlaceholder: 'Optional — tell us about the care you’re looking for.',
    submit: 'Request my free trial',
    note: 'By submitting, you agree to be contacted by Uribcare about your request.',
    successTitle: 'Thank you — we’ve got it.',
    successBefore: 'Your email app should open with your request ready to send. If it didn’t, email us directly at ',
    successAfter: '.',
    /** Body of the mailto hand-off. Always carries the language the form was submitted in. */
    mail: {
      subject: 'Free trial request — ',
      intro: 'New free-trial request from the Uribcare site:',
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      role: 'I am a',
      language: 'Language',
      needs: 'What they need:',
      empty: '—',
    },
  },

  footer: {
    tagline:
      'Connecting care, simplifying healthcare. One platform, multiple healthcare services, one connected journey for every patient.',
    platformTitle: 'Platform',
    platformLinks: {
      ecosystem: 'Ecosystem',
      journey: 'How it works',
      audience: 'For providers',
      trust: 'Security',
    },
    careTitle: 'Care',
    careLinks: {
      autism: 'Autism care',
      therapy: 'Therapy & counseling',
      diagnostics: 'Diagnostics',
      faq: 'FAQ',
    },
    contactTitle: 'Get in touch',
    rights: 'URiBCare LLC. All rights reserved.',
    badge: 'HIPAA-ready · Online & in-person care',
  },

  mbar: {
    cta: 'Start free trial',
    callAria: 'Call Uribcare',
  },
};

/** The shape every locale must satisfy. */
export type Dict = typeof en;
