import type { Locale } from '@/lib/i18n';
import * as EN from './options';
import * as ES from './options.es';

/**
 * Localised option lists for the registration dropdowns. Keys and ordering are
 * identical in both languages, so the dependent-dropdown logic and the stored
 * values keep working unchanged.
 */
export const optionsFor = (locale: Locale) =>
  locale === 'es'
    ? {
        genders: ES.GENDERS_ES,
        yesNo: ES.YES_NO_ES,
        ageGroups: ES.AGE_GROUPS_ES,
        states: EN.US_STATES,
        patientTypes: ES.PATIENT_TYPES_ES,
        patientProblems: ES.PATIENT_PROBLEMS_ES,
        therapySupport: ES.THERAPY_SUPPORT_ES,
        relationships: ES.RELATIONSHIPS_ES,
        therapyTypes: ES.THERAPY_TYPES_ES,
        therapistAreas: ES.THERAPIST_AREAS_ES,
        therapistLicenseTypes: ES.THERAPIST_LICENSE_TYPES_ES,
        doctorTitles: ES.DOCTOR_TITLES_ES,
        doctorSpecialties: ES.DOCTOR_SPECIALTIES_ES,
        counselorTitles: ES.COUNSELOR_TITLES_ES,
        counselingSpecialties: ES.COUNSELING_SPECIALTIES_ES,
        pharmacyServices: ES.PHARMACY_SERVICES_ES,
        labServices: ES.LAB_SERVICES_ES,
        labAvailability: ES.LAB_AVAILABILITY_ES,
        cliaTypes: ES.CLIA_CERTIFICATE_TYPES_ES,
      }
    : {
        genders: EN.GENDERS,
        yesNo: EN.YES_NO,
        ageGroups: EN.AGE_GROUPS,
        states: EN.US_STATES,
        patientTypes: EN.PATIENT_TYPES,
        patientProblems: EN.PATIENT_PROBLEMS,
        therapySupport: EN.THERAPY_SUPPORT,
        relationships: EN.RELATIONSHIPS,
        therapyTypes: [...EN.THERAPY_TYPES],
        therapistAreas: EN.THERAPIST_AREAS,
        therapistLicenseTypes: EN.THERAPIST_LICENSE_TYPES,
        doctorTitles: EN.DOCTOR_TITLES,
        doctorSpecialties: EN.DOCTOR_SPECIALTIES,
        counselorTitles: EN.COUNSELOR_TITLES,
        counselingSpecialties: EN.COUNSELING_SPECIALTIES,
        pharmacyServices: EN.PHARMACY_SERVICES,
        labServices: EN.LAB_SERVICES,
        labAvailability: EN.LAB_AVAILABILITY,
        cliaTypes: EN.CLIA_CERTIFICATE_TYPES,
      };
