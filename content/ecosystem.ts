import { ECOSYSTEM_NAV, summary } from './nav';
import type { Detail } from './types';

const shared = (slug: string) => summary(ECOSYSTEM_NAV, slug);

/**
 * The six ecosystem categories from the home page "The ecosystem" section.
 * Name, card copy and icons are the same ones used on those cards.
 */
export const ECOSYSTEM: Detail[] = [
  {
    kind: 'ecosystem',
    ...shared('doctors-specialists'),
    eyebrow: 'The ecosystem',
    title: 'Doctors & specialists',
    subtitle:
      'Find the right physician, consult online or in person, and keep every diagnosis and note in one shared record.',
    metaDescription:
      'How doctors and specialists work inside the Uribcare ecosystem: verified profiles, online and in-person consults, and one shared patient record.',
    overview: {
      heading: 'The medical anchor of the care journey',
      paragraphs: [
        'Most care journeys begin with a physician and keep returning to one. The diagnosis, the referrals, the medication and the review appointments all run through the doctor — which is exactly why a physician working from an incomplete history is such an expensive problem.',
        'On Uribcare, physicians and specialists hold verified profiles, take online or in-person consultations, and write into the same record every other provider reads from. A developmental pediatrician can see what the speech therapist recorded last month without a phone call or a faxed summary.',
        'Every clinician who joins goes through credential review before their profile goes live. Licence, NPI and board certification details are submitted at registration and checked by our team — nobody is marked verified automatically.',
      ],
      highlights: ['Verified physician profiles', 'Online or in-person consults', 'Referrals with history attached'],
    },
    provides: {
      eyebrow: 'Role in the Uribcare ecosystem',
      heading: 'What physicians do on the platform',
      intro: 'Doctors and specialists are the diagnostic and prescribing centre of the network.',
      cards: [
        { title: 'Diagnosis and assessment', text: 'Clinical evaluation recorded once, in a record every other provider on the case can read.' },
        { title: 'Referrals that carry context', text: 'Sending a patient to therapy or diagnostics passes the history with it, instead of starting from a blank page.' },
        { title: 'Prescribing', text: 'Prescriptions route straight to a connected pharmacy with refills and reminders attached.' },
        { title: 'Test ordering', text: 'Lab work is ordered from the same screen, and results come back into the record automatically.' },
        { title: 'Review and follow-up', text: 'Scheduled follow-ups keep long-term plans moving rather than lapsing between visits.' },
        { title: 'Care team oversight', text: 'Visibility of therapy progress, so medical decisions reflect what is actually happening week to week.' },
      ],
    },
    audience: {
      eyebrow: 'How it connects with patients',
      heading: 'What each side gets',
      groups: [
        {
          tone: 'cool',
          tag: 'For patients & families',
          title: 'A physician who already has the picture',
          points: [
            'Search verified doctors by specialty, need and availability',
            'Book online or in-person appointments with real-time availability',
            'Never repeat the medical history at the start of every appointment',
            'Referrals, prescriptions and test results tracked in one place',
            'Follow-ups scheduled rather than left to the family to chase',
          ],
        },
        {
          tone: 'warm',
          tag: 'For doctors & clinics',
          title: 'Less admin, more clinical time',
          points: [
            'Reach patients actively looking for your specialty',
            'Full history and therapy notes available before the consult starts',
            'Referrals and results flow automatically instead of by phone',
            'One calendar across online and in-person appointments',
            'Complete audit trail on every access and action',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Key benefits',
      heading: 'Why routing medical care through one record matters',
      intro: 'The gains are mostly the elimination of repeated work and lost information.',
      cards: [
        { title: 'Faster decisions', text: 'The relevant history is already there when the consult starts.' },
        { title: 'Fewer duplicate tests', text: 'Results are visible to every provider, so the same test is not ordered twice.' },
        { title: 'Safer prescribing', text: 'Medication history and pharmacy fulfilment live in the same record.' },
        { title: 'Continuity over years', text: 'Long-term conditions keep their full history as providers change.' },
      ],
    },
    support: {
      eyebrow: 'How Uribcare coordinates this part of care',
      heading: 'The platform does the chasing, not the family',
      text: 'Uribcare sits underneath the physician relationship and handles the coordination work that otherwise falls on the patient — routing referrals, returning results, and keeping every provider on the same page.',
      points: [
        'Credential review before any physician profile goes live',
        'Consent-controlled record access, with patients deciding who sees what',
        'Referrals, prescriptions and lab orders routed automatically',
        'Encrypted in transit and at rest, with full audit logging',
        'Secure video and in-clinic appointments in one schedule',
      ],
      quote: 'Every provider works from the same source of truth, so nothing is repeated and nothing gets lost.',
      quoteWho: 'The Uribcare platform team',
    },
    process: {
      eyebrow: 'The workflow',
      heading: 'How a physician visit flows through the platform',
      intro: 'From search to follow-up, with each step recorded once.',
      steps: [
        { label: 'Step 1', title: 'Find the right physician', text: 'Search verified doctors and specialists filtered by need, location and availability.' },
        { label: 'Step 2', title: 'Book the consult', text: 'Real-time availability for secure video or in-clinic visits, with automatic reminders.' },
        { label: 'Step 3', title: 'Consult with full history', text: 'The physician opens the shared record — diagnoses, therapy notes and past results already in place.' },
        { label: 'Step 4', title: 'Act on the plan', text: 'Referrals, prescriptions and test orders are issued and routed to the connected provider.' },
        { label: 'Step 5', title: 'Follow up', text: 'Results return to the record, the care team is updated, and the next review is scheduled.' },
      ],
    },
    cta: {
      heading: 'Join Uribcare as a physician or find one',
      text: 'Doctors and specialists can register for credential review. Patients can start a free trial and search verified physicians today.',
      primary: { label: 'Register as a doctor', href: '/register' },
      secondary: { label: 'Book a demo', href: '/#contact' },
      note: 'Credentials are reviewed manually — profiles stay unverified until that review completes.',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('therapists-counselors'),
    eyebrow: 'The ecosystem',
    title: 'Therapists & counselors',
    subtitle:
      'Behavioral, occupational, speech and mental-health support — matched, scheduled and tracked over time.',
    metaDescription:
      'How therapists and counselors work inside the Uribcare ecosystem: matched to need, scheduled in one calendar, with progress shared across the care team.',
    overview: {
      heading: 'The providers a family sees most often',
      paragraphs: [
        'Therapy is the part of healthcare measured in years rather than appointments. A child in autism care may see a speech therapist, an occupational therapist, a behavioral therapist and a counselor — every week, for a very long time.',
        'That makes coordination the whole game. Uribcare matches families to the right specialists, keeps every recurring session in one calendar, and gives each therapist visibility of what the others are working on.',
        'Therapists register with their therapy type, areas of practice, licence details and autism experience, so matching is based on real specialisation rather than a general listing.',
      ],
      highlights: ['Matched by specialisation', 'Recurring sessions in one calendar', 'Shared progress across therapists'],
    },
    provides: {
      eyebrow: 'Role in the Uribcare ecosystem',
      heading: 'What therapists and counselors do on the platform',
      intro: 'The long-term, repeat-contact layer of the care journey.',
      cards: [
        { title: 'Specialist matching', text: 'Families are matched by therapy type and area of practice — speech, occupational, physical, behavioral or counseling.' },
        { title: 'Recurring scheduling', text: 'Weekly and fortnightly sessions booked as a series rather than one appointment at a time.' },
        { title: 'Progress tracking', text: 'Goals and outcomes recorded session by session and visible across the team.' },
        { title: 'Coordinated goals', text: 'Speech, occupational and behavioral goals aligned instead of pulling in different directions.' },
        { title: 'Family coaching', text: 'Strategies taught to parents and caregivers, recorded so every provider reinforces the same approach.' },
        { title: 'Counseling and mental health', text: 'Individual, child and family counseling held in the same coordinated plan.' },
      ],
    },
    audience: {
      eyebrow: 'How it connects with patients',
      heading: 'What each side gets',
      groups: [
        {
          tone: 'cool',
          tag: 'For patients & families',
          title: 'One team instead of four calendars',
          points: [
            'Matched to therapists who actually specialise in the need',
            'Every recurring session in a single calendar',
            'Progress visible without asking each therapist separately',
            'Strategies that agree with each other across disciplines',
            'Online or in-person sessions, whichever fits the week',
          ],
        },
        {
          tone: 'warm',
          tag: 'For therapists & counselors',
          title: 'Context before the first session',
          points: [
            'Referrals arrive with assessments and history attached',
            'See what other therapists on the case are working on',
            'Less scheduling admin and fewer no-shows',
            'Reach families searching for your specialisation',
            'Credentials verified once, visible to referring physicians',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Key benefits',
      heading: 'What coordination changes',
      intro: 'The difference between four providers and one team is mostly information.',
      cards: [
        { title: 'Aligned goals', text: 'Therapists reinforce each other instead of working from separate plans.' },
        { title: 'Visible progress', text: 'Families can see movement over months, not just remember individual sessions.' },
        { title: 'Less repetition', text: 'The history is told once and available to everyone who needs it.' },
        { title: 'Continuity through change', text: 'When a therapist changes, the record and goals stay with the patient.' },
      ],
    },
    support: {
      eyebrow: 'How Uribcare coordinates this part of care',
      heading: 'Built for care measured in years',
      text: 'Autism care means many providers moving together over a long period. Uribcare keeps them coordinated around one patient, one plan and one connected journey.',
      points: [
        'Matched to the right specialists for each patient’s needs',
        'Shared progress so every provider sees the full history',
        'Therapy, counseling and follow-ups in one calendar',
        'Licence and certification review before profiles go live',
        'Support for families that continues between visits',
      ],
      quote: 'You should never have to be the one holding your child’s care together. That’s our job.',
      quoteWho: 'The Uribcare care team',
    },
    process: {
      eyebrow: 'The workflow',
      heading: 'How therapy runs on the platform',
      intro: 'From match to review, with the whole team in step.',
      steps: [
        { label: 'Step 1', title: 'Match', text: 'The family is matched to therapists by therapy type, area of practice and availability.' },
        { label: 'Step 2', title: 'Assess', text: 'Each therapist assesses and records baseline goals in the shared record.' },
        { label: 'Step 3', title: 'Schedule the series', text: 'Recurring sessions are booked as a block and sit in one calendar with reminders.' },
        { label: 'Step 4', title: 'Deliver and record', text: 'Sessions run online or in person, with progress logged against the agreed goals.' },
        { label: 'Step 5', title: 'Review together', text: 'Goals are reviewed across disciplines and the plan is adjusted as a team.' },
      ],
    },
    cta: {
      heading: 'Join as a therapist or counselor',
      text: 'Register to be matched with families who need your specialisation, or start a free trial to find the right therapist.',
      primary: { label: 'Register as a provider', href: '/register' },
      secondary: { label: 'Book a demo', href: '/#contact' },
      note: 'Licence and certification details are reviewed before any profile goes live.',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('nurses-home-care'),
    eyebrow: 'The ecosystem',
    title: 'Nurses & home care',
    subtitle:
      'Coordinated in-home visits and ongoing support that stay linked to the patient’s wider care team.',
    metaDescription:
      'How nurses and home care work inside the Uribcare ecosystem: scheduled in-home visits recorded in the same shared record as every other provider.',
    overview: {
      heading: 'Care that comes to the patient',
      paragraphs: [
        'Not every patient can travel, and not every need fits a clinic slot. Home care covers the visits that happen where the patient actually lives — post-operative checks, ongoing nursing needs, medication support and the practical help that keeps someone stable at home.',
        'Home visits have historically been the most disconnected part of healthcare: the nurse sees the patient, writes a note, and the note goes nowhere. On Uribcare the visit is scheduled, recorded and visible to the physician and therapists working on the same case.',
        'For families managing long-term or complex needs, this is often what makes staying at home viable rather than exhausting.',
      ],
      highlights: ['Scheduled in-home visits', 'Notes in the shared record', 'Linked to the wider care team'],
    },
    provides: {
      eyebrow: 'Role in the Uribcare ecosystem',
      heading: 'What home care covers',
      intro: 'The in-person layer that reaches patients wherever they are.',
      cards: [
        { title: 'In-home nursing visits', text: 'Scheduled visits for ongoing clinical needs, recorded in the same record the physician reads.' },
        { title: 'Post-discharge support', text: 'Follow-up after surgery or hospital discharge, with escalation routes if something changes.' },
        { title: 'Medication support', text: 'Administration, adherence support and reminders, linked to the connected pharmacy.' },
        { title: 'Observation and vitals', text: 'Routine measurements logged into the record so trends are visible over time.' },
        { title: 'Family and caregiver training', text: 'Practical coaching so caregivers can manage confidently between visits.' },
        { title: 'Escalation to the care team', text: 'A direct line back to the treating physician when a visit turns up something concerning.' },
      ],
    },
    audience: {
      eyebrow: 'How it connects with patients',
      heading: 'What each side gets',
      groups: [
        {
          tone: 'cool',
          tag: 'For patients & families',
          title: 'Support at home that is actually connected',
          points: [
            'Visits scheduled around the household, not the clinic',
            'Care for patients who cannot easily travel',
            'Every visit recorded where the doctor can see it',
            'Caregivers taught what to watch for and what to do',
            'One point of coordination instead of several agencies',
          ],
        },
        {
          tone: 'warm',
          tag: 'For nurses & home care providers',
          title: 'Arrive knowing the case',
          points: [
            'Patient history and current plan available before the visit',
            'Visit notes captured once and shared with the whole team',
            'Clear escalation path to the treating physician',
            'Scheduling and reminders handled by the platform',
            'Reach patients in the areas you cover',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Key benefits',
      heading: 'Why connected home care matters',
      intro: 'Home visits stop being an information dead end.',
      cards: [
        { title: 'Fewer readmissions', text: 'Problems are caught at home and escalated before they become emergencies.' },
        { title: 'Access without travel', text: 'Care reaches patients for whom a clinic visit is the barrier.' },
        { title: 'Confident caregivers', text: 'Families know what to do between visits and who to contact.' },
        { title: 'Continuous record', text: 'Home observations sit alongside clinical and therapy notes.' },
      ],
    },
    support: {
      eyebrow: 'How Uribcare coordinates this part of care',
      heading: 'The visit is part of the plan, not separate from it',
      text: 'Uribcare schedules home visits inside the same calendar as consults and therapy, and routes what the nurse observes back to the providers who need it.',
      points: [
        'Home visits scheduled alongside consults and therapy sessions',
        'Visit notes written into the shared patient record',
        'Medication support linked to connected pharmacies',
        'Consent-controlled access, so families decide who sees what',
        'Full audit trail on every record access',
      ],
      quote: 'Care coordinated in real time — including the care that happens at the kitchen table.',
      quoteWho: 'The Uribcare care team',
    },
    process: {
      eyebrow: 'The workflow',
      heading: 'How a home care episode runs',
      intro: 'Requested, scheduled, delivered and fed back into the record.',
      steps: [
        { label: 'Step 1', title: 'Request or referral', text: 'A physician or family requests home support through the platform.' },
        { label: 'Step 2', title: 'Match and schedule', text: 'A nurse or home care provider covering that area is matched and visits are booked.' },
        { label: 'Step 3', title: 'Prepared visit', text: 'The provider arrives with the history, current plan and medication list already to hand.' },
        { label: 'Step 4', title: 'Record and escalate', text: 'Observations are logged; anything concerning is escalated to the treating physician.' },
        { label: 'Step 5', title: 'Ongoing support', text: 'Recurring visits continue with the whole care team seeing the same picture.' },
      ],
    },
    cta: {
      heading: 'Bring home care into the same plan',
      text: 'Nurses and home care providers can register to join the network. Families can start a free trial to arrange coordinated support at home.',
      primary: { label: 'Register as a provider', href: '/register' },
      secondary: { label: 'Book a demo', href: '/#contact' },
      note: 'HIPAA-ready · Online & in-person care',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('pharmacies'),
    eyebrow: 'The ecosystem',
    title: 'Pharmacies',
    subtitle: 'Prescriptions flow straight from consult to pharmacy — with refills and reminders built in.',
    metaDescription:
      'How pharmacies work inside the Uribcare ecosystem: prescriptions routed from consult to fulfilment, with refills, reminders and delivery options.',
    overview: {
      heading: 'The step where treatment plans usually leak',
      paragraphs: [
        'A prescription is only useful once it is filled, taken, and refilled on time. That handover — consult to pharmacy to patient to refill — is where a surprising amount of treatment quietly fails.',
        'Connected pharmacies receive prescriptions directly from the consult, so nothing depends on a paper slip being carried across town. Refills and reminders are scheduled, and the care team can see whether medication is actually being collected.',
        'Pharmacies register with their licence details, responsible pharmacist and the services they offer — fulfilment, delivery, mail order or specialty medication — so patients are matched to a pharmacy that can actually meet their need.',
      ],
      highlights: ['Prescriptions routed automatically', 'Refills and reminders built in', 'Delivery and specialty options'],
    },
    provides: {
      eyebrow: 'Role in the Uribcare ecosystem',
      heading: 'What connected pharmacies do',
      intro: 'The fulfilment layer that turns a plan into medication in the patient’s hand.',
      cards: [
        { title: 'Prescription fulfilment', text: 'Prescriptions arrive directly from the consult rather than being carried by the patient.' },
        { title: 'Refill management', text: 'Repeat medication scheduled ahead of time so treatment does not lapse between orders.' },
        { title: 'Reminders', text: 'Collection and dosing reminders that reach the patient or caregiver.' },
        { title: 'Delivery and mail order', text: 'Options for patients who cannot easily travel to collect medication.' },
        { title: 'Specialty medication', text: 'Pharmacies flagged for specialty dispensing are matched to the patients who need them.' },
        { title: 'Medication visibility', text: 'The care team can see what has been prescribed and dispensed in one place.' },
      ],
    },
    audience: {
      eyebrow: 'How it connects with patients',
      heading: 'What each side gets',
      groups: [
        {
          tone: 'cool',
          tag: 'For patients & families',
          title: 'Medication that keeps up with the plan',
          points: [
            'No paper prescription to carry or lose',
            'Refills scheduled before the current supply runs out',
            'Delivery for households where collection is hard',
            'Reminders for the patient or the caregiver managing them',
            'One medication history across every prescriber',
          ],
        },
        {
          tone: 'warm',
          tag: 'For pharmacies',
          title: 'Steady, connected demand',
          points: [
            'Prescriptions arrive digitally from connected physicians',
            'Reach patients searching for delivery or specialty dispensing',
            'Fewer clarification calls — the prescription arrives with context',
            'Register your services, hours and coverage once',
            'Licence details verified before the listing goes live',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Key benefits',
      heading: 'Why the pharmacy link matters',
      intro: 'Adherence improves when the logistics stop being the patient’s problem.',
      cards: [
        { title: 'Fewer missed doses', text: 'Refills and reminders keep long-term treatment running.' },
        { title: 'Faster fulfilment', text: 'The prescription is at the pharmacy before the patient is.' },
        { title: 'Safer medication history', text: 'Every prescriber sees the same list.' },
        { title: 'Access for hard cases', text: 'Delivery and specialty routes for patients who need them.' },
      ],
    },
    support: {
      eyebrow: 'How Uribcare coordinates this part of care',
      heading: 'From consult to collection without a gap',
      text: 'Uribcare carries the prescription across the handover and keeps the medication record visible to everyone treating the patient.',
      points: [
        'Prescriptions routed straight from the consult to the chosen pharmacy',
        'Refill schedules and reminders generated automatically',
        'Medication history visible to the whole care team',
        'Pharmacy licence and responsible pharmacist details reviewed at registration',
        'Encrypted end to end, with full audit logging',
      ],
      quote: 'Prescriptions flow straight from consult to pharmacy — with refills and reminders built in.',
      quoteWho: 'The Uribcare platform team',
    },
    process: {
      eyebrow: 'The workflow',
      heading: 'How a prescription flows',
      intro: 'Four steps from the consulting room to the next refill.',
      steps: [
        { label: 'Step 1', title: 'Prescribed', text: 'The physician issues the prescription inside the consult record.' },
        { label: 'Step 2', title: 'Routed', text: 'It is sent to the patient’s chosen connected pharmacy immediately.' },
        { label: 'Step 3', title: 'Fulfilled', text: 'The pharmacy dispenses for collection or delivery and marks it complete.' },
        { label: 'Step 4', title: 'Refilled', text: 'Refill reminders trigger ahead of time so treatment continues uninterrupted.' },
      ],
    },
    cta: {
      heading: 'Register your pharmacy',
      text: 'Join the network to receive prescriptions directly from connected physicians across the Uribcare ecosystem.',
      primary: { label: 'Register a pharmacy', href: '/register' },
      secondary: { label: 'Book a demo', href: '/#contact' },
      note: 'Pharmacy licence details are reviewed before the listing goes live.',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('diagnostic-labs'),
    eyebrow: 'The ecosystem',
    title: 'Diagnostic labs',
    subtitle:
      'Order tests, book collection, and see results land in the record automatically for every provider.',
    metaDescription:
      'How diagnostic labs work inside the Uribcare ecosystem: digital test orders, booked collection and results routed automatically into the shared record.',
    overview: {
      heading: 'Results that find their way back',
      paragraphs: [
        'Diagnostics are where care most often stalls. A test is ordered, the patient books it somewhere else, the result goes to one provider, and everyone else waits — or repeats the test because they cannot see it.',
        'Connected laboratories receive orders digitally, offer walk-in, appointment or home collection, and return results directly into the shared record. The ordering physician, the therapist and the family all see the same result at the same time.',
        'Laboratories register with their CLIA number, certificate type and accreditation, along with every collection location they operate, so patients can be matched to a site that is actually convenient.',
      ],
      highlights: ['Digital test ordering', 'Walk-in, appointment or home collection', 'Results returned automatically'],
    },
    provides: {
      eyebrow: 'Role in the Uribcare ecosystem',
      heading: 'What connected laboratories do',
      intro: 'The diagnostic layer that feeds evidence back into every other decision.',
      cards: [
        { title: 'Digital test orders', text: 'Orders arrive from the consult with the clinical context already attached.' },
        { title: 'Flexible collection', text: 'Walk-in, appointment-based or home sample collection depending on the patient.' },
        { title: 'Multiple locations', text: 'Labs register every collection site, so patients are matched to a convenient one.' },
        { title: 'Automatic result return', text: 'Results land in the shared record for every provider on the case at once.' },
        { title: 'Broad test coverage', text: 'Blood, urine, diagnostic and genetic testing across the connected network.' },
        { title: 'Verified credentials', text: 'CLIA number, certificate type and accreditation reviewed before going live.' },
      ],
    },
    audience: {
      eyebrow: 'How it connects with patients',
      heading: 'What each side gets',
      groups: [
        {
          tone: 'cool',
          tag: 'For patients & families',
          title: 'Testing without the phone calls',
          points: [
            'Book collection at a site that suits, or at home',
            'No chasing the clinic to find out whether results arrived',
            'Results visible to every provider treating you',
            'Fewer repeat tests because nobody could see the last one',
            'History of past results kept in one place',
          ],
        },
        {
          tone: 'warm',
          tag: 'For laboratories',
          title: 'Orders that arrive complete',
          points: [
            'Digital orders with clinical context, not handwritten slips',
            'Reach patients referred by connected physicians',
            'Register every location, service and availability once',
            'Results delivered automatically to the whole care team',
            'Accreditation and CLIA details verified at registration',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Key benefits',
      heading: 'What changes when results are shared',
      intro: 'Diagnostics stop being a bottleneck in the middle of the journey.',
      cards: [
        { title: 'Faster diagnosis', text: 'Results reach the physician the moment they are ready.' },
        { title: 'No duplicate testing', text: 'Everyone can see what has already been run.' },
        { title: 'Easier for patients', text: 'Collection booked where and how it suits, including at home.' },
        { title: 'Better decisions', text: 'Therapists and physicians work from the same evidence.' },
      ],
    },
    support: {
      eyebrow: 'How Uribcare coordinates this part of care',
      heading: 'Ordering, collection and results in one loop',
      text: 'Uribcare closes the diagnostic loop: the order goes out digitally, collection is scheduled, and the result comes back to everyone who needs it without a single phone call.',
      points: [
        'Test orders issued from the consult with context attached',
        'Collection booked by appointment, walk-in or at home',
        'Results routed automatically into the shared record',
        'CLIA, certificate and accreditation review at registration',
        'Consent-controlled access and full audit logging',
      ],
      quote: 'Order tests, book collection, and see results land in the record automatically for every provider.',
      quoteWho: 'The Uribcare platform team',
    },
    process: {
      eyebrow: 'The workflow',
      heading: 'How diagnostics flow',
      intro: 'Four steps, none of which rely on the patient carrying paper.',
      steps: [
        { label: 'Step 1', title: 'Ordered', text: 'The physician orders the test inside the consult record.' },
        { label: 'Step 2', title: 'Collection booked', text: 'The patient chooses walk-in, an appointment slot, or home collection.' },
        { label: 'Step 3', title: 'Processed', text: 'The connected laboratory runs the test and completes the order.' },
        { label: 'Step 4', title: 'Returned', text: 'Results land in the shared record and the care team is notified.' },
      ],
    },
    cta: {
      heading: 'Register your laboratory',
      text: 'Join the network to receive digital test orders and return results directly into the shared care record.',
      primary: { label: 'Register a laboratory', href: '/register' },
      secondary: { label: 'Book a demo', href: '/#contact' },
      note: 'CLIA and accreditation details are reviewed before the laboratory goes live.',
    },
  },
  {
    kind: 'ecosystem',
    ...shared('connected-record'),
    eyebrow: 'The ecosystem',
    title: 'One connected record',
    subtitle: 'Everyone works from the same source of truth, so nothing is repeated and nothing gets lost.',
    metaDescription:
      'The connected record at the centre of the Uribcare ecosystem: one patient history, consent-controlled, shared across every provider.',
    overview: {
      heading: 'The part that makes the rest of it work',
      paragraphs: [
        'Every other category in the ecosystem depends on this one. Doctors, therapists, nurses, pharmacies and laboratories only behave like a team if they are reading and writing the same record.',
        'The connected record holds the history once: diagnoses, therapy goals and progress, medication, test results, home visit notes and appointments. Providers see the parts relevant to their role, and the family stops being the courier between them.',
        'Control sits with the patient. Consent decides who can see what, access is logged, and data is encrypted in transit and at rest to HIPAA-ready standards.',
      ],
      highlights: ['One history, told once', 'Patient-controlled consent', 'Encrypted with full audit trail'],
    },
    provides: {
      eyebrow: 'Role in the Uribcare ecosystem',
      heading: 'What the connected record holds',
      intro: 'One continuous history rather than a folder per provider.',
      cards: [
        { title: 'Diagnoses and clinical notes', text: 'Physician assessments and decisions recorded once and readable by the team.' },
        { title: 'Therapy goals and progress', text: 'Session-by-session progress across speech, occupational, physical and behavioral therapy.' },
        { title: 'Medication history', text: 'What was prescribed, what was dispensed and what is due for refill.' },
        { title: 'Test results', text: 'Laboratory results returned automatically and kept alongside the clinical picture.' },
        { title: 'Appointments and follow-ups', text: 'Every consult, therapy session and home visit in one timeline.' },
        { title: 'Consent and access log', text: 'Who has access, what they viewed, and when — visible and revocable.' },
      ],
    },
    audience: {
      eyebrow: 'How it connects with patients',
      heading: 'What each side gets',
      groups: [
        {
          tone: 'cool',
          tag: 'For patients & families',
          title: 'Stop being the messenger',
          points: [
            'One record you never have to re-explain',
            'Decide which providers can access it, and revoke access at any time',
            'See appointments, results and progress in one timeline',
            'Nothing lost when a provider changes',
            'A full history for long-term conditions, kept over years',
          ],
        },
        {
          tone: 'warm',
          tag: 'For providers & clinics',
          title: 'Real continuity of care',
          points: [
            'Shared records for genuine continuity between providers',
            'Referrals and results that flow automatically',
            'Less admin, more time with patients',
            'Full audit trail on every access and action',
            'Consent handled by the platform rather than by paperwork',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Key benefits',
      heading: 'What one source of truth removes',
      intro: 'Mostly it removes repetition, delay and the gaps patients fall through.',
      cards: [
        { title: 'No repeated history', text: 'The story is told once, not at every appointment.' },
        { title: 'No lost information', text: 'Notes and results stay with the patient, not with a provider.' },
        { title: 'Fewer gaps', text: 'Follow-ups and referrals are tracked rather than assumed.' },
        { title: 'Trust by design', text: 'Consent, encryption and audit logging built in from day one.' },
      ],
    },
    support: {
      eyebrow: 'How Uribcare coordinates this part of care',
      heading: 'Healthcare-grade trust, built in from day one',
      text: 'Compliance is the foundation the record is built on, so patients and providers can collaborate with confidence.',
      points: [
        'HIPAA-ready, built to healthcare privacy and data-protection standards',
        'Encrypted in transit and at rest, every step of the way',
        'Patients decide who sees their record and when',
        'Every access and action logged for accountability',
        'One record spanning consults, therapy, pharmacy and diagnostics',
      ],
      quote: 'Everyone works from the same source of truth, so nothing is repeated and nothing gets lost.',
      quoteWho: 'The Uribcare platform team',
    },
    process: {
      eyebrow: 'The workflow',
      heading: 'How the record grows',
      intro: 'Each interaction adds to one continuous history.',
      steps: [
        { label: 'Step 1', title: 'Created', text: 'The record is created when the patient registers, owned and controlled by them.' },
        { label: 'Step 2', title: 'Consent granted', text: 'The patient grants access to the providers involved in their care.' },
        { label: 'Step 3', title: 'Written to', text: 'Consults, therapy sessions, prescriptions, results and home visits all write into it.' },
        { label: 'Step 4', title: 'Read from', text: 'Every provider works from the same current picture rather than a partial copy.' },
        { label: 'Step 5', title: 'Audited', text: 'Access is logged continuously and consent can be changed or withdrawn at any time.' },
      ],
    },
    cta: {
      heading: 'One record for the whole journey',
      text: 'Start a free trial to bring your care into one connected record, or register as a provider to join the network.',
      primary: { label: 'Start free trial', href: '/#contact' },
      secondary: { label: 'Register', href: '/register' },
      note: 'HIPAA-ready · Encrypted end-to-end · Full audit trail',
    },
  },
];

export const getEcosystem = (slug: string) => ECOSYSTEM.find((e) => e.slug === slug);
