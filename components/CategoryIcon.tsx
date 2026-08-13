/**
 * The line icons used for the service and ecosystem categories. Shared by the
 * homepage ecosystem cards, the navbar dropdowns and the detail pages so the
 * same mark is used everywhere a category appears.
 */

export type IconName =
  | 'doctors'
  | 'therapists'
  | 'nurses'
  | 'pharmacies'
  | 'labs'
  | 'record'
  | 'physical'
  | 'occupational'
  | 'speech';

const PATHS: Record<IconName, React.ReactNode> = {
  doctors: <path d="M12 21c-4.5-3-8-6.2-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4.8-3.5 8-8 11z" />,
  therapists: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
      <path d="M11 7h4a2 2 0 0 1 2 2v4" />
    </>
  ),
  nurses: (
    <>
      <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M17 7l2 2 3-3" />
    </>
  ),
  pharmacies: (
    <>
      <path d="M10.5 3.5l10 10a3.5 3.5 0 0 1-5 5l-10-10a3.5 3.5 0 0 1 5-5z" />
      <path d="M8 6l7 7" />
    </>
  ),
  labs: (
    <>
      <path d="M9 3v6l-4.5 8A2 2 0 0 0 6.3 20h11.4a2 2 0 0 0 1.8-3L15 9V3" />
      <path d="M8 3h8" />
      <path d="M7.5 14h9" />
    </>
  ),
  record: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
    </>
  ),
  physical: (
    <>
      <circle cx="13" cy="4.6" r="2.1" />
      <path d="M8.5 21l1.7-6.2L8 13V9.4l4-1.6 3 2.2 2.6 1" />
      <path d="M13.4 14.8L15.6 21" />
    </>
  ),
  occupational: (
    <>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
      <path d="M11 7h4a2 2 0 0 1 2 2v4" />
    </>
  ),
  speech: <path d="M21 12a8 8 0 0 1-11.4 7.2L4 20l1.1-4.4A8 8 0 1 1 21 12z" />,
};

export default function CategoryIcon({ name, size = 24 }: { name: IconName; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}
