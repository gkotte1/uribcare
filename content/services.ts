import { SERVICE_NAV, summary } from './nav';
import type { Detail } from './types';

const shared = (slug: string) => summary(SERVICE_NAV, slug);

/**
 * The three services already shown in the home page "Our services" section.
 * Name, card copy and photography are the same ones used there.
 */
export const SERVICES: Detail[] = [
  {
    kind: 'service',
    ...shared('physical-therapy'),
    eyebrow: 'Our services',
    title: 'Physical Therapy',
    subtitle:
      'Restore mobility, reduce pain, build strength, and regain independence through personalized, goal-driven programs for every age.',
    metaDescription:
      'Uribcare physical therapy: personalized, goal-driven programs that restore mobility, reduce pain and rebuild strength for children and adults.',
    image: {
      src: '/images/card-physical.jpg',
      alt: 'Physical therapist guiding a patient through a stability-ball exercise',
      caption: 'Every program starts with a full movement assessment and a goal the patient actually cares about.',
    },
    overview: {
      heading: 'Movement is the foundation everything else is built on',
      paragraphs: [
        'Physical therapy at Uribcare is about function, not just exercises. Whether a toddler is late to walk, an adult is recovering from surgery, or an older patient is losing confidence on stairs, the work starts with the same question: what does this person want to be able to do again?',
        'Our physical therapists are clinicians with more than two decades of hands-on experience. They assess strength, balance, coordination, range of motion and pain, then build a program that progresses week by week — with the family or caregiver taught exactly how to continue it at home.',
        'Because physical therapy sits inside the wider Uribcare platform, progress notes, mobility goals and home programs stay visible to the referring physician and to any therapist working alongside them. Nobody has to re-explain the history at every visit.',
      ],
      highlights: [
        'Pediatric through adult and geriatric care',
        'In-clinic, at home, or guided remotely',
        'Progress shared with the whole care team',
      ],
    },
    provides: {
      eyebrow: 'What the service provides',
      heading: 'A complete physical therapy program, not a set of appointments',
      intro:
        'Each plan is assembled from the same core building blocks, then weighted to the diagnosis, age and goals of the individual patient.',
      cards: [
        {
          title: 'Full movement assessment',
          text: 'Strength, gait, balance, joint range, posture and pain are measured at baseline so progress can be shown rather than guessed at.',
        },
        {
          title: 'Gross motor development',
          text: 'For children: rolling, crawling, standing, walking, running, jumping and the coordination milestones that follow them.',
        },
        {
          title: 'Pain and injury rehabilitation',
          text: 'Manual therapy, graded loading and activity modification to bring pain down and function back up after injury or surgery.',
        },
        {
          title: 'Strength and conditioning',
          text: 'Targeted programs that rebuild muscle, endurance and joint stability at a pace the body can absorb.',
        },
        {
          title: 'Balance and fall prevention',
          text: 'Vestibular and stability work for patients who have lost confidence moving around their own home.',
        },
        {
          title: 'Home exercise programs',
          text: 'A written, demonstrated plan for caregivers, so the gains made in session hold between visits.',
        },
      ],
    },
    audience: {
      eyebrow: 'Who it is for',
      heading: 'Physical therapy fits more people than most families expect',
      groups: [
        {
          tone: 'cool',
          tag: 'Children & families',
          title: 'Growing bodies and developmental delay',
          points: [
            'Children missing gross motor milestones or late to walk',
            'Autistic children working on coordination, posture and motor planning',
            'Low muscle tone, hypermobility and balance difficulties',
            'Neurological conditions such as cerebral palsy',
            'Parents who want a home program they can actually follow',
          ],
        },
        {
          tone: 'warm',
          tag: 'Adults & older adults',
          title: 'Recovery, pain and independence',
          points: [
            'Post-surgical and post-injury rehabilitation',
            'Chronic back, neck, shoulder and knee pain',
            'Reduced mobility, stiffness or loss of walking confidence',
            'Neurological recovery after a stroke or diagnosis',
            'Anyone whose daily activity has quietly narrowed over time',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Benefits',
      heading: 'What changes when the program is built around the person',
      intro: 'Measurable function, not vague improvement — reviewed at every reassessment.',
      cards: [
        { title: 'Move with less pain', text: 'Graded, tolerable loading that reduces pain instead of provoking it.' },
        { title: 'Independence restored', text: 'Stairs, cars, playgrounds and workplaces become reachable again.' },
        { title: 'Fewer setbacks', text: 'Progression is paced and monitored, so gains hold instead of relapsing.' },
        { title: 'Confidence to keep going', text: 'Patients and caregivers understand exactly what to do between sessions.' },
      ],
    },
    support: {
      eyebrow: 'How Uribcare supports this service',
      heading: 'Physical therapy that stays connected to the rest of care',
      text: 'A physical therapist working in isolation only ever sees part of the picture. On Uribcare, the plan, the notes and the progress travel with the patient across every other provider involved in their care.',
      points: [
        'Referrals from physicians arrive with the diagnosis and history already attached',
        'Session notes and mobility goals are visible to the whole care team',
        'Therapy, counseling and follow-up appointments sit in one calendar',
        'Results from labs and imaging land in the same record the therapist works from',
        'Sessions run in clinic, at home, or over secure video when travel is hard',
      ],
      quote: 'You should never have to be the one holding your child’s care together. That’s our job.',
      quoteWho: 'The Uribcare care team',
    },
    process: {
      eyebrow: 'The care process',
      heading: 'How a physical therapy journey runs',
      intro: 'Five steps, each one visible to the patient and to every provider on the team.',
      steps: [
        { label: 'Step 1', title: 'Assessment', text: 'A full evaluation of movement, strength, pain and function, with baseline measures recorded in the shared record.' },
        { label: 'Step 2', title: 'Goal setting', text: 'The patient and family agree the goals that matter — a specific milestone, a return to work, a walk without pain.' },
        { label: 'Step 3', title: 'Active therapy', text: 'Regular sessions in clinic, at home or online, with hands-on treatment and progressive exercise.' },
        { label: 'Step 4', title: 'Home program', text: 'A demonstrated, written program for caregivers so the work continues between sessions.' },
        { label: 'Step 5', title: 'Reassessment', text: 'Measures are repeated, the plan is adjusted, and progress is shared with the referring provider.' },
      ],
    },
    cta: {
      heading: 'Book a physical therapy assessment',
      text: 'Tell us what movement has become difficult and we will match you with the right therapist — online or in person, usually within a day.',
      primary: { label: 'Book an assessment', href: '/#contact' },
      secondary: { label: 'Register as a patient', href: '/register' },
      note: 'HIPAA-ready · Online & in-person care · No credit card required to start',
    },
  },
  {
    kind: 'service',
    ...shared('occupational-therapy'),
    eyebrow: 'Our services',
    title: 'Occupational Therapy',
    subtitle:
      'Develop the skills for daily living, learning and working — so patients participate confidently in the activities that matter to them.',
    metaDescription:
      'Uribcare occupational therapy: sensory, fine motor and daily living skills support that helps children and adults take part in everyday life.',
    image: {
      src: '/images/card-occupational.jpg',
      alt: 'Occupational therapists supporting an adult with mobility rehabilitation',
      caption: 'Therapy is built around the real tasks of a real day — dressing, writing, eating, working.',
    },
    overview: {
      heading: 'The skills that make an ordinary day possible',
      paragraphs: [
        'Occupational therapy is the least understood and most practical of the therapies. It is about occupation in the widest sense: getting dressed, holding a pencil, tolerating a noisy classroom, preparing a meal, managing a workplace routine.',
        'Our occupational therapists look at the whole picture — sensory processing, fine motor control, attention, planning and the environment the person actually lives in. Then they change what can be changed: the skill, the task, or the setting around it.',
        'For autistic children this is often the service that unlocks everything else. Sensory regulation and motor planning sit underneath learning, communication and behavior, so progress here tends to show up in every other part of the child’s week.',
      ],
      highlights: [
        'Sensory processing and regulation',
        'Fine motor, handwriting and self-care skills',
        'School, home and workplace adaptation',
      ],
    },
    provides: {
      eyebrow: 'What the service provides',
      heading: 'Practical, task-led therapy',
      intro: 'Assessment first, then targeted work on the specific skills standing between the patient and the activity they want to do.',
      cards: [
        {
          title: 'Sensory profile and regulation',
          text: 'Identifying sensory triggers and building a plan — sensory diet, environmental changes, calming strategies — that works at home and at school.',
        },
        {
          title: 'Fine motor and handwriting',
          text: 'Grip, hand strength, in-hand manipulation, scissor skills and legible, comfortable writing.',
        },
        {
          title: 'Daily living skills',
          text: 'Dressing, feeding, toileting, grooming and the sequencing that makes each of them independent.',
        },
        {
          title: 'Feeding and mealtime support',
          text: 'Working with restricted diets, textures and mealtime distress alongside speech therapy where swallowing is involved.',
        },
        {
          title: 'Attention and executive skills',
          text: 'Planning, sequencing, transitions and task completion — the skills school and work quietly assume.',
        },
        {
          title: 'Environment and equipment advice',
          text: 'Classroom seating, workplace setup, adaptive tools and the small changes that remove a daily obstacle.',
        },
      ],
    },
    audience: {
      eyebrow: 'Who it is for',
      heading: 'Who occupational therapy helps',
      groups: [
        {
          tone: 'cool',
          tag: 'Children & families',
          title: 'Learning, sensory and self-care',
          points: [
            'Autistic children working on sensory regulation and daily routines',
            'Sensory processing difficulties at home or in the classroom',
            'Handwriting, scissor and fine motor difficulties',
            'Trouble with dressing, feeding or toileting independence',
            'Developmental delay affecting play and participation',
          ],
        },
        {
          tone: 'warm',
          tag: 'Adults & workplaces',
          title: 'Function, recovery and adaptation',
          points: [
            'Adults relearning daily tasks after injury, surgery or a stroke',
            'Hand therapy and fine motor rehabilitation',
            'Fatigue, pain or condition management across a working day',
            'Adapting a home or workstation to fit current ability',
            'Autistic adults building routines that fit how they process the world',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Benefits',
      heading: 'What families notice first',
      intro: 'The wins in occupational therapy are concrete: a task that used to end in tears now gets done.',
      cards: [
        { title: 'Calmer days', text: 'Fewer sensory overloads and smoother transitions between activities.' },
        { title: 'Real independence', text: 'Self-care tasks completed without an adult standing over them.' },
        { title: 'School participation', text: 'Writing, sitting and attending become possible for a full school day.' },
        { title: 'Strategies that transfer', text: 'What works in session is taught to parents, teachers and employers.' },
      ],
    },
    support: {
      eyebrow: 'How Uribcare supports this service',
      heading: 'One plan shared with everyone who works with the patient',
      text: 'Occupational therapy only holds if the strategies leave the therapy room. Uribcare keeps the plan, the sensory profile and the progress visible to the rest of the team so everyone reinforces the same approach.',
      points: [
        'Sensory strategies and home programs shared with the family and care team',
        'Coordinated directly with speech therapy and behavioral support',
        'Physician referrals arrive with the developmental history attached',
        'Sessions delivered in clinic, at home, or over secure video',
        'Progress tracked over years, not lost between providers',
      ],
      quote: 'Change the skill, change the task, or change the room. Usually it is some of all three.',
      quoteWho: 'The Uribcare occupational therapy team',
    },
    process: {
      eyebrow: 'The care process',
      heading: 'How an occupational therapy journey runs',
      intro: 'From first evaluation to strategies that outlive the therapy block.',
      steps: [
        { label: 'Step 1', title: 'Evaluation', text: 'Standardised assessment plus observation of the patient doing the tasks that are actually difficult.' },
        { label: 'Step 2', title: 'Sensory and skills profile', text: 'A clear picture of processing patterns, motor skills and the environments involved.' },
        { label: 'Step 3', title: 'Targeted sessions', text: 'Regular therapy focused on a small number of agreed, meaningful goals.' },
        { label: 'Step 4', title: 'Carryover', text: 'Parents, teachers and caregivers are taught the strategies and the reasoning behind them.' },
        { label: 'Step 5', title: 'Review and adapt', text: 'Goals are re-measured and the plan moves on as skills and settings change.' },
      ],
    },
    cta: {
      heading: 'Book an occupational therapy assessment',
      text: 'Tell us which parts of the day are hardest and we will match you with the right occupational therapist.',
      primary: { label: 'Book an assessment', href: '/#contact' },
      secondary: { label: 'Register as a patient', href: '/register' },
      note: 'HIPAA-ready · Online & in-person care · No credit card required to start',
    },
  },
  {
    kind: 'service',
    ...shared('speech-therapy'),
    eyebrow: 'Our services',
    title: 'Speech Therapy',
    subtitle:
      'Improve communication, language, speech clarity, cognitive skills and swallowing — for children and adults alike.',
    metaDescription:
      'Uribcare speech therapy: assessment and treatment for speech clarity, language, social communication, AAC and swallowing, for children and adults.',
    image: {
      src: '/images/card-speech.jpg',
      alt: 'Speech therapist working with a young child on articulation',
      caption: 'Communication counts however it happens — spoken, signed, or through a device.',
    },
    overview: {
      heading: 'Being understood changes everything else',
      paragraphs: [
        'Speech therapy covers far more than pronunciation. It is the work of understanding and being understood: vocabulary and grammar, speech clarity, social communication, fluency, voice, and the safety of eating and drinking.',
        'Our speech-language pathologists assess what a person can already do, what they are trying to do, and what is getting in the way. Some patients are working toward clearer speech; others are working toward reliable communication by any means — including sign, symbols or a speech-generating device.',
        'For autistic children and adults, we take communication on its own terms. The goal is not to make someone sound typical; it is to give them a way to be understood in the situations that matter to them.',
      ],
      highlights: [
        'Speech, language and social communication',
        'AAC and non-speaking communication',
        'Feeding and swallowing support',
      ],
    },
    provides: {
      eyebrow: 'What the service provides',
      heading: 'The full range of speech and language care',
      intro: 'Every plan starts from a detailed assessment and targets the areas that will open up the most communication soonest.',
      cards: [
        {
          title: 'Speech clarity and articulation',
          text: 'Sound production, phonological patterns and intelligibility work for listeners inside and outside the family.',
        },
        {
          title: 'Language development',
          text: 'Understanding and using vocabulary, grammar and sentence structure — receptive and expressive language together.',
        },
        {
          title: 'Social communication',
          text: 'Conversation, turn-taking, repair strategies and navigating the social situations the person actually faces.',
        },
        {
          title: 'AAC and assistive communication',
          text: 'Assessment, setup and training for sign, symbol boards and speech-generating devices, including family coaching.',
        },
        {
          title: 'Fluency and voice',
          text: 'Stuttering and voice difficulties, with strategies for school, workplace and everyday conversation.',
        },
        {
          title: 'Feeding and swallowing',
          text: 'Safe eating and drinking, texture tolerance and mealtime plans, coordinated with occupational therapy.',
        },
      ],
    },
    audience: {
      eyebrow: 'Who it is for',
      heading: 'Who speech therapy helps',
      groups: [
        {
          tone: 'cool',
          tag: 'Children & families',
          title: 'Early words to school-age communication',
          points: [
            'Late talkers and children with delayed language',
            'Autistic children, including non-speaking and minimally speaking children',
            'Unclear speech that strangers struggle to understand',
            'Stuttering and fluency difficulties',
            'Feeding, texture and swallowing difficulties',
          ],
        },
        {
          tone: 'warm',
          tag: 'Adults',
          title: 'Recovery and everyday communication',
          points: [
            'Communication recovery after a stroke or neurological event',
            'Voice difficulties and vocal strain',
            'Adult stuttering and confidence in speaking situations',
            'Swallowing difficulties affecting eating and drinking safely',
            'Autistic adults building communication strategies that fit their life',
          ],
        },
      ],
    },
    benefits: {
      eyebrow: 'Benefits',
      heading: 'What progress looks like',
      intro: 'Progress is measured in being understood — at home, at school, at work, by people outside the family.',
      cards: [
        { title: 'Understood by more people', text: 'Clarity and language that carry beyond the people who know the patient best.' },
        { title: 'Less frustration', text: 'A reliable way to communicate reduces distress for the patient and the household.' },
        { title: 'Safer mealtimes', text: 'Swallowing plans that lower risk and take the fear out of eating.' },
        { title: 'Communication that fits', text: 'Speech, sign or device — whichever gives this person the most reach.' },
      ],
    },
    support: {
      eyebrow: 'How Uribcare supports this service',
      heading: 'Speech therapy joined up with the rest of the team',
      text: 'Communication goals touch school, home, behavior and medical care. Uribcare keeps every one of those parties working from the same plan and the same progress record.',
      points: [
        'Goals and progress shared with physicians, therapists and counselors',
        'Coordinated with occupational therapy for feeding and sensory work',
        'Referrals from pediatricians and neurologists arrive with the history attached',
        'Sessions delivered in clinic, at home, or over secure video',
        'Years of progress kept in one record rather than scattered across providers',
      ],
      quote: 'The goal is not speech for its own sake. It is being understood, by whatever route works.',
      quoteWho: 'The Uribcare speech therapy team',
    },
    process: {
      eyebrow: 'The care process',
      heading: 'How a speech therapy journey runs',
      intro: 'Assessment, targeted therapy, and strategies the family can use every day.',
      steps: [
        { label: 'Step 1', title: 'Assessment', text: 'Formal and observational assessment of speech, language, communication and, where relevant, swallowing.' },
        { label: 'Step 2', title: 'Communication plan', text: 'Agreed goals and the communication route — spoken, signed, symbol or device — that will get there fastest.' },
        { label: 'Step 3', title: 'Therapy sessions', text: 'Regular sessions built around motivating, functional activities rather than drills alone.' },
        { label: 'Step 4', title: 'Family coaching', text: 'Parents and caregivers are taught the strategies so communication grows between sessions.' },
        { label: 'Step 5', title: 'Review', text: 'Goals are re-measured, the plan is updated, and progress is shared with the wider care team.' },
      ],
    },
    cta: {
      heading: 'Book a speech therapy assessment',
      text: 'Tell us what communication is difficult right now and we will match you with the right speech-language pathologist.',
      primary: { label: 'Book an assessment', href: '/#contact' },
      secondary: { label: 'Register as a patient', href: '/register' },
      note: 'HIPAA-ready · Online & in-person care · No credit card required to start',
    },
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
