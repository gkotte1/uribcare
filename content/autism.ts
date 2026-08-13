import type { Detail } from './types';

/**
 * The dedicated autism care page. It reuses the same `Detail` shape as the
 * service and ecosystem pages so it renders through `DetailPage` and inherits
 * the existing section styles rather than introducing a second layout.
 */
export const AUTISM_CARE: Detail = {
  kind: 'page',
  slug: 'autism-care',
  name: 'Autism care',
  shortDescription:
    'Coordinated autism care that keeps therapists, physicians, counselors and families working from one shared plan.',
  icon: 'therapists',
  eyebrow: 'Where we go deepest',
  title: 'Connected autism care, built around every child.',
  subtitle:
    'Uribcare brings the doctors, therapists, counselors, nurses, diagnostic labs and pharmacies involved in autism care onto one platform — so the whole team works from the same plan, and families stop being the ones holding it together.',
  metaDescription:
    'Coordinated autism care on Uribcare: assessment, diagnosis, a personalized plan, therapy, progress tracking and family support — with every provider working from one shared record.',
  image: {
    src: '/images/hero-physio-child.jpg',
    alt: 'A therapist supporting a young child through a one-to-one session at a low table',
    caption: 'Care that follows the child — across every provider, over years rather than appointments.',
  },
  overview: {
    heading: 'Autism care is a team sport played over years',
    paragraphs: [
      'A child on the autism spectrum may work with a speech therapist, an occupational therapist, a behavioral therapist, a counselor and a developmental pediatrician — every week, for a very long time. Each of them holds one piece of the picture.',
      'When those pieces never meet, the family becomes the messenger: repeating the history at every intake, carrying reports between clinics, and chasing the next appointment. That coordination work is relentless, and it falls hardest on the people with the least capacity to absorb it.',
      'Uribcare exists to carry that load instead. Assessments, therapy goals, session progress, prescriptions and test results live in one record the whole team reads from, and appointments across every provider sit in a single calendar.',
    ],
    highlights: [
      'One care team, one shared plan',
      'Therapy, diagnostics and follow-up in one calendar',
      'Support for families between visits',
    ],
  },
  process: {
    eyebrow: 'The autism care journey',
    heading: 'From first concern to long-term support',
    intro:
      'Every family arrives at a different point in this journey. Uribcare picks it up wherever you are, and keeps every step visible to the providers who need it.',
    steps: [
      {
        label: 'Step 1',
        title: 'Assessment',
        text: 'A first conversation about your concerns, developmental history and priorities, matched to a clinician with the right experience — online or in person.',
      },
      {
        label: 'Step 2',
        title: 'Diagnosis & evaluation',
        text: 'Formal evaluation by qualified clinicians, with speech, occupational and developmental assessments coordinated rather than booked separately by the family.',
      },
      {
        label: 'Step 3',
        title: 'Personalized care plan',
        text: 'The care team agrees goals with the family and records them in one plan, so every provider is working toward the same outcomes.',
      },
      {
        label: 'Step 4',
        title: 'Therapy',
        text: 'Recurring speech, occupational, physical, behavioral and counseling sessions, scheduled as a series and delivered where they work best for the family.',
      },
      {
        label: 'Step 5',
        title: 'Progress tracking',
        text: 'Progress against each goal is recorded session by session, so change is visible over months instead of remembered appointment by appointment.',
      },
      {
        label: 'Step 6',
        title: 'Family support',
        text: 'Caregivers are taught the strategies behind the therapy and given a direct line to the care team between visits.',
      },
      {
        label: 'Step 7',
        title: 'Ongoing follow-up',
        text: 'Reviews are scheduled rather than left to chance, and the plan is adjusted as the child grows and needs change.',
      },
    ],
  },
  provides: {
    eyebrow: 'Services for autism care',
    heading: 'The areas of care we help coordinate',
    intro:
      'Which of these a child needs — and in what mix — is a clinical decision made with your care team. Uribcare connects you to the providers and keeps their work joined up.',
    showcase: true,
    cards: [
      {
        title: 'Behavioral therapy',
        text: 'Structured, goal-led behavioral support delivered by qualified practitioners, with targets recorded in the shared plan.',
        icon: 'behavioral',
        href: '/ecosystem/therapists-counselors',
        featured: true,
      },
      {
        title: 'Speech therapy',
        text: 'Speech clarity, language, social communication and, where needed, AAC and non-speaking communication routes.',
        icon: 'speech',
        href: '/services/speech-therapy',
      },
      {
        title: 'Occupational therapy',
        text: 'Sensory regulation, fine motor skills, daily living routines and the classroom or home adjustments that make them workable.',
        icon: 'occupational',
        href: '/services/occupational-therapy',
      },
      {
        title: 'Physical therapy',
        text: 'Gross motor development, coordination, balance and strength, with home programmes caregivers can carry on.',
        icon: 'physical',
        href: '/services/physical-therapy',
      },
      {
        title: 'Counseling',
        text: 'Individual, child and family counseling — support for the whole household, not only the child.',
        icon: 'counseling',
        href: '/ecosystem/therapists-counselors',
      },
      {
        title: 'Pediatric & specialist care',
        text: 'Developmental pediatricians, child neurologists and psychiatrists, consulted online or in person with the full history to hand.',
        icon: 'pediatric',
        href: '/ecosystem/doctors-specialists',
      },
      {
        title: 'Family support',
        text: 'Coaching for parents and caregivers so the strategies used in session continue through an ordinary week.',
        icon: 'family',
      },
      {
        title: 'Follow-up & progress tracking',
        text: 'Scheduled reviews and recorded outcomes, so plans are adjusted on evidence rather than on recall.',
        icon: 'progress',
        href: '/ecosystem/connected-record',
      },
    ],
  },
  audience: {
    eyebrow: 'Coordinated care',
    heading: 'One child, one plan, one team',
    groups: [
      {
        tone: 'cool',
        tag: 'How providers work together',
        title: 'Everyone sees the same picture',
        points: [
          'Assessments and reports are shared instead of re-requested',
          'Speech, occupational and behavioral goals are aligned, not competing',
          'Referrals travel with the developmental history attached',
          'Prescriptions and lab results land in the same record',
          'A change made by one provider is visible to the rest of the team',
        ],
      },
      {
        tone: 'warm',
        tag: 'What that changes for the child',
        title: 'Fewer gaps, less repetition',
        points: [
          'No starting from scratch with every new provider',
          'Therapy time spent on therapy, not on re-explaining history',
          'Consistent strategies across home, clinic and school',
          'Continuity when a provider or setting changes',
          'A single record that grows with the child over years',
        ],
      },
    ],
  },
  benefits: {
    eyebrow: 'Why coordination matters',
    heading: 'What families notice when care is joined up',
    intro: 'The gains are practical: less administration, fewer gaps, and more of the week spent on care itself.',
    cards: [
      { title: 'One calendar', text: 'Every therapy session, consult and review in a single schedule with reminders.' },
      { title: 'One history', text: 'Told once, available to everyone you have given access to.' },
      { title: 'Visible progress', text: 'Goals and outcomes tracked over months, not held in memory.' },
      { title: 'Continuity', text: 'The plan survives a change of provider, clinic or school year.' },
    ],
  },
  support: {
    eyebrow: 'Family & caregiver support',
    heading: 'Families are part of the care team, not the couriers between it',
    text: 'Most of a child’s week happens outside the therapy room. Uribcare gives caregivers the visibility and the direct contact they need to carry the plan through it — and takes the coordination work off their plate.',
    points: [
      'See upcoming appointments across every provider in one place',
      'Follow therapy goals and recorded progress as they are updated',
      'Message the care team between visits instead of chasing by phone',
      'Learn the strategies behind each therapy so they continue at home',
      'Control who can access the record, and withdraw that access at any time',
      'Keep referrals, prescriptions and results together in one history',
    ],
    quote: 'You should never have to be the one holding your child’s care together. That’s our job.',
    quoteWho: 'The Uribcare care team',
  },
  cta: {
    heading: 'Start your family’s care journey',
    text: 'Tell us where you are — first concerns, recently diagnosed, or already working with a team that needs joining up. We will match you with the right providers, usually within a day.',
    primary: { label: 'Book a consultation', href: '/#contact' },
    secondary: { label: 'Register as a patient', href: '/register' },
    note: 'HIPAA-ready · Online & in-person care · No credit card required to start',
  },
};
