/**
 * Option lists for the registration forms. Kept in one place so the same list
 * can back a single select today and a multi-select later without touching the
 * form components.
 */

export const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say'];

export const YES_NO = ['Yes', 'No'];

export const AGE_GROUPS = ['Children', 'Adolescents', 'Adults'];

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
  'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
];

/* ---------------- Patient ---------------- */

export const PATIENT_TYPES = [
  'Autism / Autism Spectrum Disorder',
  'General Healthcare',
  'Developmental Support',
  'Other',
];

export const PATIENT_PROBLEMS = [
  'Autism / ASD',
  'Speech & Language Difficulties',
  'Communication Difficulties',
  'Developmental Delay',
  'Behavioral Concerns',
  'Sensory Processing Difficulties',
  'Learning Difficulties',
  'Motor / Physical Development',
  'Social Interaction Difficulties',
  'Feeding Difficulties',
  'Hearing / Communication Concerns',
  'Other',
];

export const THERAPY_SUPPORT = [
  'Speech Therapy',
  'Occupational Therapy',
  'Physical Therapy',
  'Counseling',
  'Behavioral Support',
  'Autism Support',
  'Other',
];

export const RELATIONSHIPS = ['Mother', 'Father', 'Legal guardian', 'Grandparent', 'Sibling', 'Other'];

/* ---------------- Therapist ---------------- */

export const THERAPY_TYPES = ['Speech Therapy', 'Occupational Therapy', 'Physical Therapy'] as const;

export type TherapyType = (typeof THERAPY_TYPES)[number];

/**
 * Area of practice options, keyed by therapy type. The therapist form reads this
 * map so the problem dropdown only ever shows the options for the therapy type
 * that is currently selected.
 */
export const THERAPIST_AREAS: Record<TherapyType, string[]> = {
  'Speech Therapy': [
    'Speech Delay',
    'Language Delay',
    'Articulation Difficulties',
    'Communication Difficulties',
    'Social Communication',
    'Autism / ASD',
    'Stuttering',
    'Voice Disorders',
    'Feeding / Swallowing',
    'Pediatric Speech & Language',
    'Other',
  ],
  'Occupational Therapy': [
    'Autism / ASD',
    'Sensory Processing',
    'Fine Motor Skills',
    'Gross Motor Skills',
    'Developmental Delay',
    'Daily Living Skills',
    'Pediatric Occupational Therapy',
    'Handwriting Difficulties',
    'Coordination Difficulties',
    'Other',
  ],
  'Physical Therapy': [
    'Mobility Difficulties',
    'Motor Development',
    'Balance Problems',
    'Coordination Difficulties',
    'Strength / Muscle Development',
    'Pediatric Physical Therapy',
    'Neurological Conditions',
    'Injury Rehabilitation',
    'Developmental Delay',
    'Other',
  ],
};

export const isTherapyType = (v: string): v is TherapyType =>
  (THERAPY_TYPES as readonly string[]).includes(v);

export const THERAPIST_LICENSE_TYPES = [
  'SLP (Speech-Language Pathologist)',
  'OT (Occupational Therapist)',
  'OTA (Occupational Therapy Assistant)',
  'PT (Physical Therapist)',
  'PTA (Physical Therapist Assistant)',
  'BCBA (Board Certified Behavior Analyst)',
  'Other',
];

/* ---------------- Doctor ---------------- */

export const DOCTOR_TITLES = ['MD', 'DO', 'MBBS', 'DPM', 'Nurse Practitioner (NP)', 'Physician Assistant (PA-C)', 'Other'];

export const DOCTOR_SPECIALTIES = [
  'General Physician / Family Medicine',
  'Pediatrician',
  'Developmental Pediatrician',
  'Psychiatrist',
  'Child Psychiatrist',
  'Neurologist',
  'Child Neurologist',
  'Other',
];

/* ---------------- Counselor ---------------- */

export const COUNSELOR_TITLES = [
  'Licensed Professional Counselor (LPC)',
  'Licensed Clinical Social Worker (LCSW)',
  'Licensed Marriage & Family Therapist (LMFT)',
  'Licensed Mental Health Counselor (LMHC)',
  'Psychologist (PhD / PsyD)',
  'Board Certified Behavior Analyst (BCBA)',
  'Other',
];

export const COUNSELING_SPECIALTIES = [
  'Autism Counseling',
  'Child Counseling',
  'Family Counseling',
  'Behavioral Counseling',
  'Mental Health Counseling',
  'Developmental Counseling',
  'Other',
];

/* ---------------- Pharmacy ---------------- */

export const PHARMACY_SERVICES = [
  'Prescription Fulfillment',
  'Medication Delivery',
  'Mail Order',
  'Specialty Medication',
  'Other',
];

/* ---------------- Laboratory ---------------- */

export const LAB_SERVICES = ['Blood Tests', 'Urine Tests', 'Diagnostic Testing', 'Genetic Testing', 'Other'];

export const LAB_AVAILABILITY = ['Walk-in', 'Appointment Required', 'Home Sample Collection'];

export const CLIA_CERTIFICATE_TYPES = [
  'Certificate of Waiver',
  'Certificate for Provider-Performed Microscopy (PPM)',
  'Certificate of Registration',
  'Certificate of Compliance',
  'Certificate of Accreditation',
];
