/**
 * Shared icon set. One consistent stroke language across the whole site:
 * 24px grid, round caps and joins, currentColor. Keeping them in one file
 * stops the same paths being copy-pasted into every section.
 */
type IconProps = {
  size?: number;
  /** Stroke weight override — defaults suit the size it is used at. */
  weight?: number;
  className?: string;
};

function Svg({
  size = 17,
  weight = 2,
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={weight}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const Check = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 2.5}>
    <path d="M5 12l4 4L19 6" />
  </Svg>
);

export const Arrow = (p: IconProps) => (
  <Svg {...p} size={p.size ?? 16} weight={p.weight ?? 2.2} className={`ar ${p.className ?? ''}`}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </Svg>
);

export const Shield = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 2}>
    <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);

export const Clock = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);

export const Lines = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 2}>
    <path d="M4 7h16M4 12h16M4 17h10" />
  </Svg>
);

export const Heart = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <path d="M12 21c-4.5-3-8-6.2-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4.8-3.5 8-8 11z" />
  </Svg>
);

export const Puzzle = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <rect x="3" y="3" width="8" height="8" rx="2" />
    <rect x="13" y="13" width="8" height="8" rx="2" />
    <path d="M11 7h4a2 2 0 0 1 2 2v4" />
  </Svg>
);

export const Chat = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <path d="M21 12a8 8 0 0 1-11.4 7.2L4 20l1.1-4.4A8 8 0 1 1 21 12z" />
  </Svg>
);

export const Nurse = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    <path d="M17 7l2 2 3-3" />
  </Svg>
);

export const Pill = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <path d="M10.5 3.5l10 10a3.5 3.5 0 0 1-5 5l-10-10a3.5 3.5 0 0 1 5-5z" />
    <path d="M8 6l7 7" />
  </Svg>
);

export const Flask = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <path d="M9 3v6l-4.5 8A2 2 0 0 0 6.3 20h11.4a2 2 0 0 0 1.8-3L15 9V3" />
    <path d="M8 3h8" />
    <path d="M7.5 14h9" />
  </Svg>
);

export const Home = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
  </Svg>
);

export const Globe = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
  </Svg>
);

/** Vitals trace with a spark — modern, evidence-based technique. */
export const Innovation = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <path d="M3 13.4h3.3l2.1-5.6 3.3 11.2 2.3-7 1.7 3.6H21" />
    <path d="M17.4 3.2l.72 1.86 1.86.72-1.86.72-.72 1.86-.72-1.86-1.86-.72 1.86-.72z" />
  </Svg>
);

/** Heart cradled by an open hand — human-centred care. */
export const HeartCare = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.9}>
    <path d="M12 12.9c-2.4-1.7-4.3-3.4-4.3-5.6a2.35 2.35 0 0 1 4.3-1.15A2.35 2.35 0 0 1 16.3 7.3c0 2.2-1.9 3.9-4.3 5.6z" />
    <path d="M3.6 13.2v3.1A4.2 4.2 0 0 0 7.8 20.5h5.4a4.2 4.2 0 0 0 2.7-1l3.9-3.3" />
    <path d="M3.6 13.2a1.75 1.75 0 0 1 3.5 0" />
  </Svg>
);

/* ---------- ecosystem set ---------- */

/** Stethoscope — doctors & specialists. */
export const Stethoscope = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.8}>
    <path d="M5.5 3.5v5.2a4.3 4.3 0 0 0 8.6 0V3.5" />
    <path d="M4.1 3.5h2.8M12.7 3.5h2.8" />
    <path d="M9.8 13v1.9a4.6 4.6 0 0 0 9.2 0v-1.4" />
    <circle cx="18.6" cy="10.4" r="2.2" />
  </Svg>
);

/** Two speech bubbles in dialogue — therapists & counselors. */
export const Counseling = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.8}>
    <path d="M14.6 4.2H5.4A2.4 2.4 0 0 0 3 6.6v5a2.4 2.4 0 0 0 2.4 2.4H6v2.8l3.3-2.8h5.3a2.4 2.4 0 0 0 2.4-2.4v-5a2.4 2.4 0 0 0-2.4-2.4z" />
    <path d="M18.4 8.6h.2A2.4 2.4 0 0 1 21 11v4.4a2.4 2.4 0 0 1-2.4 2.4H18v2.4l-2.9-2.4h-2.4" />
  </Svg>
);

/** Home with a care cross — nurses & home care. */
export const HomeHealth = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.8}>
    <path d="M3.2 10.6 12 3.6l8.8 7" />
    <path d="M5.4 9.6v9.1a1.7 1.7 0 0 0 1.7 1.7h9.8a1.7 1.7 0 0 0 1.7-1.7V9.6" />
    <path d="M12 11.6v4.8M9.6 14h4.8" />
  </Svg>
);

/** Mortar and pestle — pharmacies. */
export const Pharmacy = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.8}>
    <path d="M4 10.2h16v1.2a8 8 0 0 1-8 8 8 8 0 0 1-8-8z" />
    <path d="M12 19.4v1.2M8.4 20.6h7.2" />
    <path d="M13.4 10.2 18.8 4a2 2 0 0 1 2.9 2.7l-3 3.5" />
  </Svg>
);

/** Document with a vitals trace — one connected record. */
export const Record = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 1.8}>
    <path d="M13.4 3.2H6.8a1.9 1.9 0 0 0-1.9 1.9v13.8a1.9 1.9 0 0 0 1.9 1.9h10.4a1.9 1.9 0 0 0 1.9-1.9V8.8z" />
    <path d="M13.4 3.2v5.6h5.7" />
    <path d="M7.9 15.4h1.9l1.2-2.6 1.8 5 1.3-3.2.9 1.9h2.2" />
  </Svg>
);

export const Lock = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 2}>
    <rect x="4" y="10" width="16" height="10" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </Svg>
);

export const Mail = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 2}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
);

export const Phone = (p: IconProps) => (
  <Svg {...p} weight={p.weight ?? 2}>
    <path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Svg>
);
