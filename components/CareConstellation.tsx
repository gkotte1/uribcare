'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated "care constellation": the patient at the centre, six provider types
 * around them, with data pulsing along every link. Purely decorative — the
 * canvas is aria-hidden and the labels duplicate copy already in the page.
 */
export type ConstellationLabels = {
  patient: string;
  doctor: string;
  therapist: string;
  counselor: string;
  pharmacy: string;
  lab: string;
  nurse: string;
};

const EN_LABELS: ConstellationLabels = {
  patient: 'Patient',
  doctor: 'Doctor',
  therapist: 'Therapist',
  counselor: 'Counselor',
  pharmacy: 'Pharmacy',
  lab: 'Lab',
  nurse: 'Nurse',
};

export default function CareConstellation({
  labels = EN_LABELS,
}: {
  labels?: ConstellationLabels;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const root = document.documentElement;
    const TAU = Math.PI * 2;

    let W = 0, H = 0, DPR = 1, cx = 0, cy = 0, R = 0, S = 1;

    const nodes = [
      { label: labels.doctor, a: -Math.PI / 2 },
      { label: labels.therapist, a: -Math.PI / 2 + TAU / 6 },
      { label: labels.counselor, a: -Math.PI / 2 + 2 * (TAU / 6) },
      { label: labels.pharmacy, a: -Math.PI / 2 + 3 * (TAU / 6) },
      { label: labels.lab, a: -Math.PI / 2 + 4 * (TAU / 6) },
      { label: labels.nurse, a: -Math.PI / 2 + 5 * (TAU / 6) },
    ];

    const cssVar = (n: string) => getComputedStyle(root).getPropertyValue(n).trim();

    function rgba(color: string, a: number) {
      const hex = color.replace('#', '');
      const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex;
      const r = parseInt(full.slice(0, 2), 16);
      const g = parseInt(full.slice(2, 4), 16);
      const b = parseInt(full.slice(4, 6), 16);
      if (Number.isNaN(r)) return `rgba(18,133,122,${a})`;
      return `rgba(${r},${g},${b},${a})`;
    }

    function size() {
      const r = canvas!.getBoundingClientRect();
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.width = Math.round(r.width * DPR);
      H = canvas!.height = Math.round(r.height * DPR);
      cx = W / 2;
      cy = H / 2;
      R = Math.min(W, H) * 0.325;
      // scale strokes/text against a 420px reference so it reads well at any size
      S = (Math.min(r.width, r.height) / 420) * DPR;
    }

    const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceM = reduceMQ.matches;
    let t = 0;
    let rafId = 0;

    function draw() {
      t += 0.0055;
      ctx!.clearRect(0, 0, W, H);

      const pine = cssVar('--pine') || '#12857A';
      const apricot = cssVar('--apricot') || '#EE8354';
      const line = cssVar('--line-2') || '#C8D9D3';
      const card = cssVar('--card') || '#ffffff';
      const inkSoft = cssVar('--ink-soft') || '#37514C';

      const pts = nodes.map((n, i) => {
        const wob = reduceM ? 0 : Math.sin(t * 1.15 + i * 1.1) * (R * 0.028);
        const rad = R + wob;
        return { x: cx + Math.cos(n.a) * rad, y: cy + Math.sin(n.a) * rad, label: n.label, a: n.a };
      });

      // --- orbit rings ---
      ctx!.save();
      ctx!.strokeStyle = rgba(line, 0.55);
      ctx!.lineWidth = 1 * DPR;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, TAU);
      ctx!.stroke();

      ctx!.strokeStyle = rgba(line, 0.3);
      ctx!.setLineDash([3 * DPR, 6 * DPR]);
      ctx!.beginPath();
      ctx!.arc(cx, cy, R * 0.62, 0, TAU);
      ctx!.stroke();
      ctx!.restore();

      // --- perimeter links (providers collaborating with each other) ---
      ctx!.strokeStyle = rgba(pine, 0.13);
      ctx!.lineWidth = 1 * DPR;
      ctx!.beginPath();
      pts.forEach((p, i) => (i === 0 ? ctx!.moveTo(p.x, p.y) : ctx!.lineTo(p.x, p.y)));
      ctx!.closePath();
      ctx!.stroke();

      // --- spokes: patient <-> provider ---
      pts.forEach((p, i) => {
        const grad = ctx!.createLinearGradient(cx, cy, p.x, p.y);
        grad.addColorStop(0, rgba(pine, 0.5));
        grad.addColorStop(1, rgba(pine, 0.14));
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.3 * DPR;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(p.x, p.y);
        ctx!.stroke();

        if (reduceM) return;

        // travelling data pulse with a short comet tail
        const prog = (t * 0.55 + i * 0.166) % 1;
        const eased = prog < 0.5 ? 2 * prog * prog : 1 - Math.pow(-2 * prog + 2, 2) / 2;
        for (let k = 0; k < 4; k++) {
          const q = Math.max(0, eased - k * 0.035);
          const px = cx + (p.x - cx) * q;
          const py = cy + (p.y - cy) * q;
          const fade = (1 - k / 4) * (1 - Math.abs(prog - 0.5) * 0.7);
          ctx!.fillStyle = rgba(apricot, 0.85 * fade);
          ctx!.beginPath();
          ctx!.arc(px, py, (2.7 - k * 0.5) * S, 0, TAU);
          ctx!.fill();
        }
      });

      // --- provider nodes ---
      pts.forEach((p) => {
        // soft halo
        const halo = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, 20 * S);
        halo.addColorStop(0, rgba(pine, 0.18));
        halo.addColorStop(1, rgba(pine, 0));
        ctx!.fillStyle = halo;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 20 * S, 0, TAU);
        ctx!.fill();

        ctx!.fillStyle = card;
        ctx!.strokeStyle = pine;
        ctx!.lineWidth = 1.8 * S;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 8.5 * S, 0, TAU);
        ctx!.fill();
        ctx!.stroke();

        ctx!.fillStyle = pine;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 3.1 * S, 0, TAU);
        ctx!.fill();

        // label
        ctx!.fillStyle = inkSoft;
        ctx!.font = `600 ${11 * S}px ${cssVar('--font-sans') || 'Inter'}, -apple-system, Segoe UI, sans-serif`;
        ctx!.textAlign = 'center';
        ctx!.textBaseline = 'middle';
        const off = (p.y < cy - 2 ? -1 : 1) * 21 * S;
        ctx!.fillText(p.label, p.x, p.y + off);
      });

      // --- centre: the patient ---
      const breathe = reduceM ? 1 : 1 + Math.sin(t * 2.4) * 0.045;
      const glowR = 40 * S * breathe;
      const glow = ctx!.createRadialGradient(cx, cy, 2, cx, cy, glowR);
      glow.addColorStop(0, rgba(apricot, 0.38));
      glow.addColorStop(0.55, rgba(apricot, 0.12));
      glow.addColorStop(1, rgba(apricot, 0));
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(cx, cy, glowR, 0, TAU);
      ctx!.fill();

      // ring around the patient node
      ctx!.strokeStyle = rgba(apricot, 0.35);
      ctx!.lineWidth = 1.2 * S;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 20 * S * breathe, 0, TAU);
      ctx!.stroke();

      ctx!.fillStyle = apricot;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 13.5 * S, 0, TAU);
      ctx!.fill();

      // sits clear of the node and its ring, in body ink so it reads on both themes
      ctx!.fillStyle = cssVar('--ink') || '#08211D';
      ctx!.font = `650 ${11.5 * S}px ${cssVar('--font-sans') || 'Inter'}, -apple-system, Segoe UI, sans-serif`;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillText(labels.patient, cx, cy + 38 * S);

      if (!reduceM) rafId = requestAnimationFrame(draw);
    }

    const onResize = () => {
      size();
      if (reduceM) draw();
    };

    size();
    draw();

    window.addEventListener('resize', onResize, { passive: true });

    // redraw on theme change so the palette follows light/dark
    const mo = new MutationObserver(() => {
      if (reduceM) draw();
    });
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    // respond if the motion preference changes mid-session
    const onMotion = () => {
      reduceM = reduceMQ.matches;
      cancelAnimationFrame(rafId);
      draw();
    };
    reduceMQ.addEventListener('change', onMotion);

    return () => {
      window.removeEventListener('resize', onResize);
      reduceMQ.removeEventListener('change', onMotion);
      mo.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [labels]);

  return <canvas id="careCanvas" aria-hidden="true" ref={canvasRef} />;
}
