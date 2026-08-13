'use client';

import { useRef, useState } from 'react';
import CounselorForm from './CounselorForm';
import DoctorForm from './DoctorForm';
import LaboratoryForm from './LaboratoryForm';
import PatientForm from './PatientForm';
import PharmacyForm from './PharmacyForm';
import TherapistForm from './TherapistForm';

const TABS = [
  { id: 'patient', label: 'Patient Registration', Form: PatientForm },
  { id: 'doctor', label: 'Doctor Registration', Form: DoctorForm },
  { id: 'therapist', label: 'Therapist Registration', Form: TherapistForm },
  { id: 'counselor', label: 'Counselor Registration', Form: CounselorForm },
  { id: 'pharmacy', label: 'Pharmacy Registration', Form: PharmacyForm },
  { id: 'laboratory', label: 'Laboratory Registration', Form: LaboratoryForm },
];

export default function RegistrationTabs() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);

  const focusTab = (index: number) => {
    const next = (index + TABS.length) % TABS.length;
    setActive(next);
    tabsRef.current?.querySelectorAll<HTMLButtonElement>('.reg-tab')[next]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') focusTab(active + 1);
    else if (e.key === 'ArrowLeft') focusTab(active - 1);
    else if (e.key === 'Home') focusTab(0);
    else if (e.key === 'End') focusTab(TABS.length - 1);
    else return;
    e.preventDefault();
  };

  const { id, Form } = TABS[active];

  return (
    <div className="reg-shell">
      <div className="reg-tabs" role="tablist" aria-label="Registration type" ref={tabsRef} onKeyDown={onKeyDown}>
        {TABS.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            className="reg-tab"
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={index === active}
            aria-controls={`panel-${tab.id}`}
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="reg-panel" role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} tabIndex={-1}>
        {/* Keyed so switching tabs mounts a fresh form rather than reusing state. */}
        <Form key={id} />
      </div>
    </div>
  );
}
