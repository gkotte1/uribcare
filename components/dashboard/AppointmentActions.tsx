'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { cancelAppointment, rescheduleAppointment, type ActionResult } from '@/app/actions/appointments';
import type { AppointmentMode } from '@/lib/database.types';
import type { Locale } from '@/lib/i18n';

type Props = {
  id: string;
  mode: AppointmentMode;
  starts_at: string;
  locale: Locale;
};

const INITIAL: ActionResult = { ok: false };

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/** Split an ISO timestamp into the <input type="date"> and type="time" values. */
function dateParts(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
  };
}

function RescheduleSubmit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-sm" disabled={pending} aria-busy={pending}>
      {pending ? 'Saving...' : 'Confirm new time'}
    </button>
  );
}

function CancelSubmit() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-ghost btn-sm" disabled={pending} aria-busy={pending}>
      {pending ? 'Cancelling...' : 'Cancel'}
    </button>
  );
}

export default function AppointmentActions({ id, starts_at }: Props) {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(rescheduleAppointment, INITIAL);
  const { date, time } = dateParts(starts_at);

  return (
    <div className="appt-actions">
      <div className="appt-actions-row">
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          Reschedule
        </button>
        <form action={() => cancelAppointment(id)}>
          <CancelSubmit />
        </form>
      </div>

      {open ? (
        <form action={formAction} className="appt-reschedule">
          <input type="hidden" name="id" value={id} />
          <div className="appt-reschedule-row">
            <div className="field">
              <label htmlFor={`date-${id}`}>New date</label>
              <input id={`date-${id}`} type="date" name="date" defaultValue={date} required />
            </div>
            <div className="field">
              <label htmlFor={`time-${id}`}>New time</label>
              <input id={`time-${id}`} type="time" name="time" defaultValue={time} required />
            </div>
          </div>
          {state.error ? <p className="appt-msg err" role="alert">{state.error}</p> : null}
          {state.ok && state.message ? <p className="appt-msg ok" role="status">{state.message}</p> : null}
          <RescheduleSubmit />
        </form>
      ) : null}
    </div>
  );
}
