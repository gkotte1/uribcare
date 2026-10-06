'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { bookAppointment } from '@/app/actions/appointments';

type BookState = { ok: boolean; error?: string; message?: string };
const INITIAL: BookState = { ok: false };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-primary btn-lg" disabled={pending}>
      {pending ? 'Requesting...' : 'Request appointment'}
    </button>
  );
}

/**
 * Appointment request form. Posts to the `bookAppointment` server action via
 * useFormState; the provider id travels as a hidden input.
 */
export default function BookingForm({ providerId }: { providerId: string }) {
  const [state, formAction] = useFormState(bookAppointment, INITIAL);

  return (
    <form action={formAction} className="booking-form" id="book">
      <input type="hidden" name="provider_id" value={providerId} />

      {state.error ? (
        <p className="booking-msg err" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok && state.message ? (
        <p className="booking-msg ok" role="status">
          {state.message}
        </p>
      ) : null}

      <div className="booking-row">
        <div className="field">
          <label htmlFor="b-date">Date</label>
          <input id="b-date" type="date" name="date" required />
        </div>
        <div className="field">
          <label htmlFor="b-time">Time</label>
          <input id="b-time" type="time" name="time" required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="b-mode">Visit type</label>
        <select id="b-mode" name="mode" defaultValue="in_person">
          <option value="in_person">In person</option>
          <option value="video">Video</option>
          <option value="phone">Phone</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="b-reason">Reason for visit (optional)</label>
        <textarea
          id="b-reason"
          name="reason"
          rows={3}
          placeholder="Briefly describe what you need help with"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
