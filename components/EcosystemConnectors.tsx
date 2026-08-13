'use client';

import { useEffect, useRef, useState } from 'react';

type Link = { d: string; x: number; y: number };

/**
 * Draws the connector lines between the central ecosystem panel and the cards
 * around it. Geometry is measured from the real layout rather than hard-coded,
 * so the curves stay attached at any width. Purely decorative — the SVG is
 * hidden from assistive tech and only renders for the wide composition, since
 * the stacked layouts use a simple stem instead.
 */
export default function EcosystemConnectors() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const svg = svgRef.current;
    const container = svg?.parentElement;
    if (!svg || !container) return;

    const wide = window.matchMedia('(min-width: 1024px)');

    const compute = () => {
      const cr = container.getBoundingClientRect();
      setBox({ w: cr.width, h: cr.height });

      const hub = container.querySelector('[data-eco-hub]');
      if (!hub || !wide.matches) {
        setLinks([]);
        return;
      }

      const hr = hub.getBoundingClientRect();
      const nodes = [...container.querySelectorAll<HTMLElement>('[data-eco-node]')];

      // Fan the start points down the hub edge so the curves don't all pinch
      // through a single point.
      const perSide: Record<'l' | 'r', number> = { l: 0, r: 0 };
      const counts = nodes.reduce(
        (acc, n) => {
          const r = n.getBoundingClientRect();
          acc[r.left + r.width / 2 < hr.left + hr.width / 2 ? 'l' : 'r'] += 1;
          return acc;
        },
        { l: 0, r: 0 }
      );

      const next = nodes.map((node) => {
        const nr = node.getBoundingClientRect();
        const onLeft = nr.left + nr.width / 2 < hr.left + hr.width / 2;
        const side = onLeft ? 'l' : 'r';

        const total = counts[side];
        const idx = perSide[side]++;
        // spread across the middle 56% of the hub's height
        const t = total > 1 ? 0.22 + (idx / (total - 1)) * 0.56 : 0.5;

        const sx = (onLeft ? hr.left : hr.right) - cr.left;
        const sy = hr.top + hr.height * t - cr.top;
        // stop short of the card so the connection point sits in the gap
        // rather than half-hidden behind the card's edge
        const GAP = 9;
        const ex = (onLeft ? nr.right + GAP : nr.left - GAP) - cr.left;
        const ey = nr.top + nr.height / 2 - cr.top;

        // horizontal control points give a soft S-curve that leaves and
        // arrives level with each panel edge
        const bend = Math.abs(ex - sx) * 0.55;
        const c1x = onLeft ? sx - bend : sx + bend;
        const c2x = onLeft ? ex + bend : ex - bend;

        return { d: `M ${sx} ${sy} C ${c1x} ${sy}, ${c2x} ${ey}, ${ex} ${ey}`, x: ex, y: ey };
      });

      setLinks(next);
    };

    compute();

    const ro = new ResizeObserver(compute);
    ro.observe(container);
    container.querySelectorAll('[data-eco-node], [data-eco-hub]').forEach((el) => ro.observe(el));

    const onChange = () => compute();
    wide.addEventListener('change', onChange);
    window.addEventListener('resize', compute);

    return () => {
      ro.disconnect();
      wide.removeEventListener('change', onChange);
      window.removeEventListener('resize', compute);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className={`es-links${links.length ? ' is-ready' : ''}`}
      width={box.w || undefined}
      height={box.h || undefined}
      viewBox={box.w ? `0 0 ${box.w} ${box.h}` : undefined}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {links.map((l, i) => (
        <g key={i} style={{ '--d': `${i * 0.12}s` } as React.CSSProperties}>
          <path className="es-line" d={l.d} vectorEffect="non-scaling-stroke" />
          <circle className="es-node-dot" cx={l.x} cy={l.y} r={3.4} />
        </g>
      ))}
    </svg>
  );
}
