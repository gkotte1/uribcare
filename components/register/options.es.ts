import type { TherapyType } from './options';

/**
 * Spanish option labels for the registration dropdowns.
 *
 * US state names are deliberately not translated: they are the legal
 * jurisdiction names that appear on a licence, so they stay in their official
 * form in both languages.
 */
export const GENDERS_ES = ['Femenino', 'Masculino', 'No binario', 'Prefiero no decirlo'];

export const YES_NO_ES = ['Sí', 'No'];

export const AGE_GROUPS_ES = ['Niños', 'Adolescentes', 'Adultos'];

export const PATIENT_TYPES_ES = [
  'Autismo o trastorno del espectro autista',
  'Atención general de salud',
  'Apoyo al desarrollo',
  'Otro',
];

export const PATIENT_PROBLEMS_ES = [
  'Autismo o TEA',
  'Dificultades del habla y el lenguaje',
  'Dificultades de comunicación',
  'Retraso del desarrollo',
  'Preocupaciones conductuales',
  'Dificultades de procesamiento sensorial',
  'Dificultades de aprendizaje',
  'Desarrollo motor o físico',
  'Dificultades de interacción social',
  'Dificultades de alimentación',
  'Audición o comunicación',
  'Otro',
];

export const THERAPY_SUPPORT_ES = [
  'Terapia del habla',
  'Terapia ocupacional',
  'Fisioterapia',
  'Consejería',
  'Apoyo conductual',
  'Apoyo para el autismo',
  'Otro',
];

export const RELATIONSHIPS_ES = ['Madre', 'Padre', 'Tutor legal', 'Abuelo o abuela', 'Hermano o hermana', 'Otro'];

export const THERAPY_TYPES_ES = ['Terapia del habla', 'Terapia ocupacional', 'Fisioterapia'];

/** Keyed by the English therapy type, so the dependent dropdown logic is unchanged. */
export const THERAPIST_AREAS_ES: Record<TherapyType, string[]> = {
  'Speech Therapy': [
    'Retraso del habla',
    'Retraso del lenguaje',
    'Dificultades de articulación',
    'Dificultades de comunicación',
    'Comunicación social',
    'Autismo o TEA',
    'Tartamudez',
    'Trastornos de la voz',
    'Alimentación y deglución',
    'Habla y lenguaje pediátricos',
    'Otro',
  ],
  'Occupational Therapy': [
    'Autismo o TEA',
    'Procesamiento sensorial',
    'Motricidad fina',
    'Motricidad gruesa',
    'Retraso del desarrollo',
    'Habilidades de la vida diaria',
    'Terapia ocupacional pediátrica',
    'Dificultades con la escritura',
    'Dificultades de coordinación',
    'Otro',
  ],
  'Physical Therapy': [
    'Dificultades de movilidad',
    'Desarrollo motor',
    'Problemas de equilibrio',
    'Dificultades de coordinación',
    'Fuerza y desarrollo muscular',
    'Fisioterapia pediátrica',
    'Condiciones neurológicas',
    'Rehabilitación de lesiones',
    'Retraso del desarrollo',
    'Otro',
  ],
};

export const THERAPIST_LICENSE_TYPES_ES = [
  'SLP (fonoaudiólogo)',
  'OT (terapeuta ocupacional)',
  'OTA (asistente de terapia ocupacional)',
  'PT (fisioterapeuta)',
  'PTA (asistente de fisioterapia)',
  'BCBA (analista de conducta certificado)',
  'Otro',
];

export const DOCTOR_TITLES_ES = [
  'MD',
  'DO',
  'MBBS',
  'DPM',
  'Enfermero o enfermera especialista (NP)',
  'Asistente médico (PA-C)',
  'Otro',
];

export const DOCTOR_SPECIALTIES_ES = [
  'Medicina general o familiar',
  'Pediatría',
  'Pediatría del desarrollo',
  'Psiquiatría',
  'Psiquiatría infantil',
  'Neurología',
  'Neurología infantil',
  'Otra',
];

export const COUNSELOR_TITLES_ES = [
  'Consejero profesional licenciado (LPC)',
  'Trabajador social clínico licenciado (LCSW)',
  'Terapeuta matrimonial y familiar licenciado (LMFT)',
  'Consejero de salud mental licenciado (LMHC)',
  'Psicólogo (PhD o PsyD)',
  'Analista de conducta certificado (BCBA)',
  'Otro',
];

export const COUNSELING_SPECIALTIES_ES = [
  'Consejería en autismo',
  'Consejería infantil',
  'Consejería familiar',
  'Consejería conductual',
  'Consejería en salud mental',
  'Consejería del desarrollo',
  'Otra',
];

export const PHARMACY_SERVICES_ES = [
  'Dispensación de recetas',
  'Entrega de medicamentos',
  'Pedido por correo',
  'Medicamentos especializados',
  'Otro',
];

export const LAB_SERVICES_ES = [
  'Análisis de sangre',
  'Análisis de orina',
  'Pruebas diagnósticas',
  'Pruebas genéticas',
  'Otro',
];

export const LAB_AVAILABILITY_ES = ['Sin cita', 'Con cita previa', 'Toma de muestras a domicilio'];

export const CLIA_CERTIFICATE_TYPES_ES = [
  'Certificado de exención (Waiver)',
  'Certificado para microscopía realizada por el profesional (PPM)',
  'Certificado de registro',
  'Certificado de cumplimiento',
  'Certificado de acreditación',
];
