'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { PROVIDER_KINDS } from '@/lib/providers-meta';
import { KIND_LABEL } from '@/components/directory/ProviderCard';
import type { ProviderKind } from '@/lib/database.types';
import type { Locale } from '@/lib/i18n';

export type FilterValues = {
  q?: string;
  kind?: ProviderKind | '';
  state?: string;
  insurance?: string;
  acceptingNew?: boolean;
};

/**
 * Client filter form. On submit it builds a querystring and pushes it onto the
 * current path (`basePath`, which already carries the locale prefix), so the
 * server page re-runs the search. When `lockKind` is set (the category pages)
 * the kind selector is hidden and that kind is always applied.
 */
export default function SearchFilters({
  locale,
  states,
  basePath,
  initial = {},
  lockKind,
  variant = 'panel',
}: {
  locale: Locale;
  states: string[];
  basePath: string;
  initial?: FilterValues;
  lockKind?: ProviderKind;
  variant?: 'panel' | 'row';
}) {
  const router = useRouter();
  const [q, setQ] = useState(initial.q ?? '');
  const [kind, setKind] = useState<string>(initial.kind ?? '');
  const [state, setState] = useState(initial.state ?? '');
  const [insurance, setInsurance] = useState(initial.insurance ?? '');
  const [acceptingNew, setAcceptingNew] = useState(Boolean(initial.acceptingNew));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (!lockKind && kind) params.set('kind', kind);
    if (state) params.set('state', state);
    if (insurance.trim()) params.set('insurance', insurance.trim());
    if (acceptingNew) params.set('acceptingNew', '1');
    const qs = params.toString();
    router.push(qs ? `${basePath}?${qs}` : basePath);
  };

  const reset = () => {
    setQ('');
    setKind('');
    setState('');
    setInsurance('');
    setAcceptingNew(false);
    router.push(basePath);
  };

  return (
    <form
      className={`filters${variant === 'row' ? ' row' : ''}`}
      onSubmit={submit}
      data-locale={locale}
      aria-label="Filter providers"
    >
      {variant === 'panel' ? <h2>Refine</h2> : null}

      <div className={variant === 'row' ? 'filters-grid' : undefined}>
        <div className="field">
          <label htmlFor="f-q">Search</label>
          <input
            id="f-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, specialty or city"
          />
        </div>

        {!lockKind ? (
          <div className="field">
            <label htmlFor="f-kind">Category</label>
            <select id="f-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="">All categories</option>
              {PROVIDER_KINDS.map(({ kind: k }) => (
                <option key={k} value={k}>
                  {KIND_LABEL[k]}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="field">
          <label htmlFor="f-state">State</label>
          <select id="f-state" value={state} onChange={(e) => setState(e.target.value)}>
            <option value="">Any state</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="f-ins">Insurance</label>
          <input
            id="f-ins"
            type="text"
            value={insurance}
            onChange={(e) => setInsurance(e.target.value)}
            placeholder="e.g. Aetna"
          />
        </div>

        <label className="filters-check" htmlFor="f-new">
          <input
            id="f-new"
            type="checkbox"
            checked={acceptingNew}
            onChange={(e) => setAcceptingNew(e.target.checked)}
          />
          Accepting new patients
        </label>
      </div>

      <div className="filters-actions">
        <button type="submit" className="btn btn-primary">
          Apply filters
        </button>
        <button type="button" className="btn btn-ghost" onClick={reset}>
          Reset
        </button>
      </div>
    </form>
  );
}
