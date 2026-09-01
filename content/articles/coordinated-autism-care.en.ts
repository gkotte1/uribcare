import type { Article } from './types';

/**
 * "Why Coordinated Care Matters Most for Ongoing Conditions Like Autism".
 *
 * The prose is the supplied copy, unabridged and unedited. The only additions
 * are the inline links, which mark up phrases already present in the text.
 * Links use the markdown subset documented in `types.ts` and are validated
 * against `INTERNAL_ROUTES` during the build.
 */
export const coordinatedAutismCareEn: Article = {
  slug: 'coordinated-autism-care-why-it-matters',
  category: 'Autism Care',
  eyebrow: 'URiBCARE Insights',
  title: 'Why Coordinated Care Matters Most for Ongoing Conditions Like Autism',
  description:
    'Autism care often involves multiple providers working with one child over years. Here’s why coordination between them matters, and what connected care can look like in practice.',
  readingTime: '6 min read',

  image: {
    src: '/images/blog-coordinated-autism-care.png',
    alt: 'Coordinated autism care team supporting a child with connected healthcare services.',
    width: 1536,
    height: 1024,
  },

  sections: [
    {
      id: 'introduction',
      heading: 'Introduction: autism care as a long-term, multi-provider journey',
      blocks: [
        {
          kind: 'p',
          text: 'For most families, autism care isn’t a single appointment or a short course of treatment. It’s a long-running relationship with several providers at once — often a speech therapist, an occupational therapist, a behavioral therapist, a counselor, and a developmental pediatrician, seen on a regular basis, sometimes for years.',
        },
        {
          kind: 'p',
          text: 'Each of these providers brings essential, specialized expertise. But each of them also typically sees only one part of the child’s overall picture. A speech therapist may not automatically know what a behavioral therapist observed last week. A pediatrician may not have the latest occupational therapy progress notes on hand during a consult. Individually, none of this is a failure of care — it’s simply how most healthcare systems are structured: provider by provider, record by record.',
        },
        {
          kind: 'p',
          text: 'The effect of that structure, though, tends to land on the family. Someone has to remember the developmental history and repeat it at every new intake. Someone has to carry reports between clinics. Someone has to notice when a follow-up is due and chase it down. For families already managing therapy schedules, school coordination, and daily life, that additional administrative load is significant — and it rarely shows up in any conversation about “the cost of care,” even though it is a real and ongoing cost of time and attention.',
        },
      ],
    },
    {
      id: 'coordination-gap',
      heading: 'What a coordination gap actually looks like',
      blocks: [
        {
          kind: 'p',
          text: 'In practice, a lack of coordination shows up in small but cumulative ways: an assessment that has to be repeated because the results weren’t shared, a therapy goal that one provider is unaware another provider is also working toward, a prescription that isn’t visible to the therapist tracking related symptoms, or a follow-up that simply doesn’t happen because no single person owned it.',
        },
        {
          kind: 'p',
          text: 'None of these gaps are dramatic on their own. But over months and years — which is the typical timeline for autism care — they add up to duplicated work, slower progress tracking, and a family that is, in effect, doing the coordination job themselves, without training or compensation for it.',
        },
      ],
    },
    {
      id: 'autism-care-team',
      heading: 'Who typically makes up an autism care team',
      blocks: [
        {
          kind: 'p',
          text: 'While every child’s needs are different and should be determined by their clinical team, autism care commonly draws on a combination of:',
        },
        {
          kind: 'ul',
          items: [
            'Behavioral therapy — structured, goal-led behavioral support',
            '[Speech therapy](/services/speech-therapy) — communication, language, and where needed, alternative communication approaches',
            '[Occupational therapy](/services/occupational-therapy) — sensory regulation, fine motor skills, and daily living routines',
            '[Physical therapy](/services/physical-therapy) — gross motor development, coordination, and strength',
            '[Counseling](/ecosystem/therapists-counselors) — support for the child and often the wider family',
            '[Pediatric and specialist care](/ecosystem/doctors-specialists) — developmental pediatricians, and where needed, child neurologists or psychiatrists',
          ],
        },
        {
          kind: 'p',
          text: 'The specific mix, and how much of each a child needs, is a clinical decision made with their care team — not something a platform or article should prescribe. What matters here is simply that most children involve several of these providers simultaneously, over an extended period.',
        },
      ],
    },
    {
      id: 'coordinated-care-plan',
      heading: 'What a coordinated care plan actually includes',
      blocks: [
        {
          kind: 'p',
          text: 'A genuinely coordinated approach to autism care generally includes a few consistent elements:',
        },
        {
          kind: 'ol',
          items: [
            'A shared history. Assessment results and developmental history that don’t need to be re-explained at every new intake.',
            'Aligned goals. Therapy goals across disciplines — speech, occupational, behavioral — that work toward the same outcomes rather than existing in isolation.',
            'Visible progress. Session-by-session progress that’s recorded and visible to the whole team, not held only in one provider’s private notes.',
            'One schedule. Appointments across every provider in a single calendar, rather than several separate booking systems.',
            'Continuity. A plan that survives a change of provider, clinic, or school year, instead of starting over each time.',
          ],
        },
      ],
    },
    {
      id: 'family-role',
      heading: 'The family’s role: support instead of logistics',
      blocks: [
        {
          kind: 'p',
          text: 'One of the more overlooked effects of poor coordination is what it does to the family’s role. Instead of focusing on supporting the strategies used in therapy — which is genuinely valuable, evidence-supported work parents and caregivers can do at home — families often end up spending disproportionate time on logistics: tracking appointments, requesting records, and re-explaining history.',
        },
        {
          kind: 'p',
          text: 'When coordination is handled well, families can shift more of their energy toward what actually helps their child day to day: reinforcing therapy strategies at home, staying informed on progress, and maintaining a direct line to the care team when questions come up between visits — rather than acting as the connective tissue between providers who aren’t otherwise talking to each other.',
        },
      ],
    },
    {
      id: 'coordinated-approach',
      heading: 'What to look for in a coordinated approach',
      blocks: [
        {
          kind: 'p',
          text: 'If you’re evaluating care options for your family, it’s worth asking a few direct questions: Do the providers involved share information with each other, or does that responsibility fall on you? Is there one place to see the full history and current plan, or several? Are appointments and follow-ups tracked centrally, or do you need to keep your own system to avoid things falling through the cracks? The answers often say as much about the quality of the care experience as the credentials of any single provider.',
        },
      ],
    },
    {
      id: 'how-uribcare-approaches-this',
      heading: 'How Uribcare approaches this',
      blocks: [
        {
          kind: 'p',
          text: 'This is the problem [Uribcare](/) was built around, and [autism care](/autism-care) is the area where we’ve focused most deeply. On the Uribcare platform, assessments, therapy goals, session progress, prescriptions, and test results are kept in one record that every provider on a child’s care team can read from, and appointments across every provider sit in a single shared calendar. Families can see upcoming appointments, follow recorded progress, message the care team between visits, and control who has access to the record — while the coordination work of connecting providers happens on the platform, rather than falling to the family to manage manually.',
        },
        {
          kind: 'p',
          text: 'The clinical judgment always sits with the care team. What Uribcare aims to remove is the administrative burden of holding that team together.',
        },
      ],
    },
    {
      id: 'closing-thoughts',
      heading: 'Closing thoughts',
      blocks: [
        {
          kind: 'p',
          text: 'Autism care is, by nature, a long-term, multi-provider undertaking. That’s not a flaw in the system — it reflects genuinely how comprehensive, effective autism support tends to work. But the coordination between those providers doesn’t have to be left to families to manage on their own. When care is structured so that the team works from one shared plan, families are freed up to focus on what matters most: supporting their child.',
        },
      ],
    },
  ],

  cta: {
    heading: 'Learn how Uribcare coordinates autism care across your child’s whole team.',
    href: '/autism-care',
    action: 'Book a consultation',
    actionHref: '/#contact',
  },

  meta: {
    title: 'Coordinated Autism Care: Why It Matters and How It Works | Uribcare',
    description:
      'Autism care often means five or more providers working with one child over years. Here’s why coordination between them matters — and what it looks like in practice.',
  },
};
