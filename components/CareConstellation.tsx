'use client';

import { useEffect, useRef } from 'react';

export default function CareConstellation() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const root = document.documentElement;

    let W: number, H: number, DPR: number, cx: number, cy: number, R: number;
    const nodes = [
      { label: 'Doctor', a: -Math.PI / 2 },
      { label: 'Therapist', a: -Math.PI / 2 + (2 * Math.PI) / 6 },
      { label: 'Counselor', a: -Math.PI / 2 + 2 * ((2 * Math.PI) / 6) },
      { label: 'Pharmacy', a: -Math.PI / 2 + 3 * ((2 * Math.PI) / 6) },
      { label: 'Lab', a: -Math.PI / 2 + 4 * ((2 * Math.PI) / 6) },
      { label: 'Nurse', a: -Math.PI / 2 + 5 * ((2 * Math.PI) / 6) },
    ];
    const cssVar = (n: string) => getComputedStyle(root).getPropertyValue(n).trim();

    function size() {
      const r = canvas!.getBoundingClientRect();
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.width = Math.round(r.width * DPR);
      H = canvas!.height = Math.round(r.height * DPR);
      cx = W / 2;
      cy = H / 2;
      R = Math.min(W, H) * 0.33;
    }
    size();
    window.addEventListener('resize', size);

    const reduceM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let t = 0;
    let rafId = 0;

    function draw() {
      t += 0.006;
      ctx!.clearRect(0, 0, W, H);
      const pine = cssVar('--pine') || '#12857A';
      const apricot = cssVar('--apricot') || '#F08A5D';
      const line = cssVar('--line-2') || '#CBD9D4';
      const card = cssVar('--card') || '#fff';

      const pts = nodes.map((n, i) => {
        const wob = reduceM ? 0 : Math.sin(t + i) * (R * 0.03);
        const rad = R + wob;
        return { x: cx + Math.cos(n.a) * rad, y: cy + Math.sin(n.a) * rad, label: n.label };
      });

      // links center -> node
      pts.forEach((p, i) => {
        const grad = ctx!.createLinearGradient(cx, cy, p.x, p.y);
        grad.addColorStop(0, pine);
        grad.addColorStop(1, hexA(pine, 0.15));
        ctx!.strokeStyle = grad;
        ctx!.lineWidth = 1.4 * DPR;
        ctx!.beginPath();
        ctx!.moveTo(cx, cy);
        ctx!.lineTo(p.x, p.y);
        ctx!.stroke();

        // travelling pulse
        if (!reduceM) {
          const prog = (t * 0.6 + i * 0.16) % 1;
          const px = cx + (p.x - cx) * prog;
          const py = cy + (p.y - cy) * prog;
          ctx!.fillStyle = hexA(apricot, 0.9);
          ctx!.beginPath();
          ctx!.arc(px, py, 2.6 * DPR, 0, Math.PI * 2);
          ctx!.fill();
        }
      });

      // faint outer ring
      ctx!.strokeStyle = hexA(line, 0.6);
      ctx!.lineWidth = 1 * DPR;
      ctx!.beginPath();
      ctx!.arc(cx, cy, R, 0, Math.PI * 2);
      ctx!.stroke();

      // provider nodes
      pts.forEach((p) => {
        ctx!.fillStyle = card;
        ctx!.strokeStyle = pine;
        ctx!.lineWidth = 1.8 * DPR;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 8.5 * DPR, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.stroke();
        ctx!.fillStyle = pine;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 3.2 * DPR, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.fillStyle = cssVar('--ink-soft') || '#3B534F';
        ctx!.font = `${11 * DPR}px -apple-system, Segoe UI, sans-serif`;
        ctx!.textAlign = 'center';
        ctx!.textBaseline = 'middle';
        const off = (p.y < cy ? -1 : 1) * 20 * DPR;
        ctx!.fillText(p.label, p.x, p.y + off);
      });

      // center: patient
      const glow = ctx!.createRadialGradient(cx, cy, 2, cx, cy, 34 * DPR);
      glow.addColorStop(0, hexA(apricot, 0.35));
      glow.addColorStop(1, hexA(apricot, 0));
      ctx!.fillStyle = glow;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 34 * DPR, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.fillStyle = apricot;
      ctx!.beginPath();
      ctx!.arc(cx, cy, 13 * DPR, 0, Math.PI * 2);
      ctx!.fill();
      ctx!.fillStyle = '#fff';
      ctx!.font = `${10.5 * DPR}px -apple-system, Segoe UI, sans-serif`;
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillText('Patient', cx, cy);

      if (!reduceM) rafId = requestAnimationFrame(draw);
    }

    function hexA(hex: string, a: number) {
      hex = hex.replace('#', '');
      if (hex.length === 3)
        hex = hex
          .split('')
          .map((c) => c + c)
          .join('');
      const r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
      if (isNaN(r)) return `rgba(18,133,122,${a})`;
      return `rgba(${r},${g},${b},${a})`;
    }

    draw();
    // redraw on theme change
    const mo = new MutationObserver(() => {
      if (reduceM) draw();
    });
    mo.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      window.removeEventListener('resize', size);
      mo.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas id="careCanvas" aria-hidden="true" ref={canvasRef} />;
}
