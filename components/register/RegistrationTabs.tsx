'use client';

import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { getDictionary } from '@/content/dictionary';
import { localeFromPath } from '@/lib/i18n';
import CounselorForm from './CounselorForm';
import DoctorForm from './DoctorForm';
import LaboratoryForm from './LaboratoryForm';
import PatientForm from './PatientForm';
import PharmacyForm from './PharmacyForm';
import TherapistForm from './TherapistForm';

/** Tab labels come from the dictionary; `id` keys both the label and the panel. */
const TABS = [
  { id: 'patient', Form: PatientForm },
  { id: 'doctor', Form: DoctorForm },
  { id: 'therapist', Form: TherapistForm },
  { id: 'counselor', Form: CounselorForm },
  { id: 'pharmacy', Form: PharmacyForm },
  { id: 'laboratory', Form: LaboratoryForm },
] as const;

export default function RegistrationTabs() {
  const locale = localeFromPath(usePathname() || '/');
  const t = getDictionary(locale).register;
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
      {/* The capsule is a plain frame; the inner track is what scrolls, so the
          scrollbar is drawn inside the capsule's padding rather than across its
          rounded bottom edge. */}
      <div className="reg-tabs">
        <div
          className="reg-tabs-track"
          role="tablist"
          aria-label={t.tablistLabel}
          ref={tabsRef}
          onKeyDown={onKeyDown}
        >
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
              {t.tabs[tab.id]}
            </button>
          ))}
        </div>
      </div>

      <div className="reg-panel" role="tabpanel" id={`panel-${id}`} aria-labelledby={`tab-${id}`} tabIndex={-1}>
        {/* Keyed so switching tabs mounts a fresh form rather than reusing state. */}
        <Form key={id} />
      </div>
    </div>
  );
}
