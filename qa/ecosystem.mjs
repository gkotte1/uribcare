// Focused QA for the redesigned ecosystem section: hub-and-spoke composition,
// connector geometry, icons, content fidelity and responsive behaviour.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'shots', 'ecosystem');
fs.mkdirSync(OUT, { recursive: true });
const URL = 'http://localhost:3000';
const pass = [], fail = [];
const check = (n, ok, extra = '') => (ok ? pass : fail).push(`${n}${extra ? ' — ' + extra : ''}`);

// exact copy that must survive the redesign
const EXPECTED = [
  ['Doctors & specialists', 'Find the right physician, consult online or in person, and keep every diagnosis and note in one shared record.'],
  ['Therapists & counselors', 'Behavioral, occupational, speech and mental-health support — matched, scheduled and tracked over time.'],
  ['Nurses & home care', 'Coordinated in-home visits and ongoing support that stay linked to the patient’s wider care team.'],
  ['Pharmacies', 'Prescriptions flow straight from consult to pharmacy — with refills and reminders built in.'],
  ['Diagnostic labs', 'Order tests, book collection, and see results land in the record automatically for every provider.'],
  ['One connected record', 'Everyone works from the same source of truth, so nothing is repeated and nothing gets lost.'],
];

const browser = await chromium.launch();

for (const vp of [
  { name: 'desktop-xl', width: 1728, height: 1000, wide: true },
  { name: 'desktop', width: 1440, height: 900, wide: true },
  { name: 'laptop', width: 1280, height: 800, wide: true },
  { name: 'tablet', width: 834, height: 1112, wide: false, cols: 2 },
  { name: 'tablet-sm', width: 768, height: 1024, wide: false, cols: 2 },
  { name: 'mobile', width: 390, height: 844, wide: false, cols: 1 },
  { name: 'mobile-sm', width: 320, height: 720, wide: false, cols: 1 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('#ecosystem').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1400);

  const d = await page.evaluate(() => {
    const sec = document.getElementById('ecosystem');
    const wrap = sec.querySelector('.es');
    const hub = sec.querySelector('[data-eco-hub]');
    const cards = [...sec.querySelectorAll('[data-eco-node]')];
    const wr = wrap.getBoundingClientRect();
    const hr = hub.getBoundingClientRect();
    const docW = document.documentElement.clientWidth;

    const boxes = cards.map((c) => {
      const r = c.getBoundingClientRect();
      return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
    });
    const topY = Math.min(...boxes.map((b) => b.y));
    const cols = boxes.filter((b) => Math.abs(b.y - topY) < 4).length;

    const text = cards.map((c) => [c.querySelector('h3').textContent.trim(), c.querySelector('p').textContent.trim()]);

    const overflow = [...sec.querySelectorAll('*')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > docW + 1.5 || r.left < -1.5);
    }).length;

    const clipped = [...sec.querySelectorAll('h2,h3,p')].filter((el) => {
      if (el.closest('.sr-only')) return false;
      const st = getComputedStyle(el);
      return st.overflow === 'hidden' && el.scrollHeight > el.clientHeight + 4 && el.clientHeight > 0;
    }).length;

    const icons = [...sec.querySelectorAll('.es-ico svg')].map((s) => {
      const r = s.getBoundingClientRect();
      return r.width > 0 && r.height > 0;
    });

    // overlap test across every pair of cards + the hub
    const rects = [...boxes, { x: Math.round(hr.left), y: Math.round(hr.top), w: Math.round(hr.width), h: Math.round(hr.height) }];
    let overlaps = 0;
    for (let i = 0; i < rects.length; i++)
      for (let j = i + 1; j < rects.length; j++) {
        const a = rects[i], b = rects[j];
        if (a.x < b.x + b.w - 1 && a.x + a.w > b.x + 1 && a.y < b.y + b.h - 1 && a.y + a.h > b.y + 1) overlaps++;
      }

    const svg = sec.querySelector('.es-links');
    const paths = [...sec.querySelectorAll('.es-line')];
    const dots = [...sec.querySelectorAll('.es-node-dot')];

    // do the drawn endpoints actually touch the hub and the cards?
    let endpointsOk = true;
    if (paths.length) {
      const sr = svg.getBoundingClientRect();
      paths.forEach((p) => {
        const len = p.getTotalLength();
        const s = p.getPointAtLength(0);
        const e = p.getPointAtLength(len);
        const sAbs = { x: s.x + sr.left, y: s.y + sr.top };
        const eAbs = { x: e.x + sr.left, y: e.y + sr.top };
        const nearHub = Math.min(Math.abs(sAbs.x - hr.left), Math.abs(sAbs.x - hr.right)) < 3
          && sAbs.y > hr.top - 3 && sAbs.y < hr.bottom + 3;
        // endpoints deliberately stop ~9px short of the card edge
        const nearCard = cards.some((c) => {
          const r = c.getBoundingClientRect();
          return Math.min(Math.abs(eAbs.x - r.left), Math.abs(eAbs.x - r.right)) < 13
            && eAbs.y > r.top - 3 && eAbs.y < r.bottom + 3;
        });
        if (!nearHub || !nearCard) endpointsOk = false;
      });
    }

    const wordmark = sec.querySelector('.es-wordmark');
    const plaque = sec.querySelector('.es-plaque');

    return {
      cols, boxes, text, overflow, clipped, icons, overlaps, endpointsOk,
      lines: paths.length, dots: dots.length,
      hubW: Math.round(hr.width), hubCenterX: Math.round(hr.left + hr.width / 2 - wr.left),
      wrapW: Math.round(wr.width),
      wordmarkText: wordmark.textContent.trim(),
      wordmarkColor: getComputedStyle(wordmark).color,
      plaqueBg: getComputedStyle(plaque).backgroundColor,
      hubBg: getComputedStyle(hub).backgroundColor,
      cardBg: getComputedStyle(cards[0]).backgroundColor,
      heading: sec.querySelector('.band-head h2').textContent.trim(),
      eyebrow: sec.querySelector('.band-head .eyebrow').textContent.trim(),
      lead: sec.querySelector('.band-head .lead').textContent.trim(),
      secBg: getComputedStyle(sec).backgroundColor,
    };
  });

  const t = `[${vp.name}]`;
  check(`${t} no overflow`, d.overflow === 0, `${d.overflow} elements`);
  check(`${t} no clipped text`, d.clipped === 0, `${d.clipped} elements`);
  check(`${t} no overlapping panels`, d.overlaps === 0, `${d.overlaps} pairs`);
  check(`${t} all 6 icons render`, d.icons.length === 6 && d.icons.every(Boolean), JSON.stringify(d.icons));
  check(`${t} content unchanged`, JSON.stringify(d.text) === JSON.stringify(EXPECTED),
    JSON.stringify(d.text) === JSON.stringify(EXPECTED) ? '' : JSON.stringify(d.text));
  check(`${t} wordmark reads URIBCARE ECOSYSTEM`, d.wordmarkText === 'URIBCARE ECOSYSTEM', d.wordmarkText);
  check(`${t} wordmark is white`, d.wordmarkColor === 'rgb(255, 255, 255)', d.wordmarkColor);
  check(`${t} hub shell is white`, d.hubBg === 'rgb(255, 255, 255)', d.hubBg);
  check(`${t} cards are white`, d.cardBg === 'rgb(255, 255, 255)', d.cardBg);

  if (vp.wide) {
    check(`${t} 3 cards per side`, d.cols === 2, `${d.cols} on the top row`);
    check(`${t} 6 connector lines drawn`, d.lines === 6, `${d.lines}`);
    check(`${t} 6 connection points`, d.dots === 6, `${d.dots}`);
    check(`${t} connectors attach to hub and cards`, d.endpointsOk);
    check(`${t} hub is horizontally centred`, Math.abs(d.hubCenterX - d.wrapW / 2) <= 2,
      `centre ${d.hubCenterX} vs ${Math.round(d.wrapW / 2)}`);
  } else {
    check(`${t} stacked into ${vp.cols} column(s)`, d.cols === vp.cols, `${d.cols}`);
    check(`${t} curves suppressed when stacked`, d.lines === 0, `${d.lines} lines`);
  }

  await page.locator('#ecosystem').screenshot({ path: path.join(OUT, `${vp.name}.png`) });
  check(`${t} no console errors`, errs.length === 0, errs.slice(0, 2).join(' | '));
  await ctx.close();
}

/* ---------- untouched surroundings + contrast + motion ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('#ecosystem').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  const s = await page.evaluate(() => {
    const sec = document.getElementById('ecosystem');
    return {
      eyebrow: sec.querySelector('.eyebrow').textContent.trim(),
      h2: sec.querySelector('h2').textContent.trim(),
      lead: sec.querySelector('.lead').textContent.trim(),
      classes: sec.className,
      bg: getComputedStyle(sec).backgroundColor,
      order: [...document.querySelectorAll('main > section')].map((x) => x.id || '(none)'),
    };
  });
  check('[section] eyebrow unchanged', s.eyebrow === 'The ecosystem', s.eyebrow);
  check('[section] heading unchanged', s.h2 === 'Every part of care, connected on one platform', s.h2);
  check('[section] lead unchanged',
    s.lead.startsWith('Uribcare brings the whole team together') && s.lead.endsWith('one continuous journey.'), s.lead.slice(0, 50));
  check('[section] styling classes unchanged', s.classes === 'band band-alt', s.classes);
  check('[section] position unchanged',
    s.order.join(',') === '(none),(none),problem,ecosystem,services,journey,autism,principles,audience,trust,faq,contact', s.order.join(','));

  // white wordmark against the plaque behind it
  const contrast = await page.evaluate(() => {
    const lum = (c) => {
      const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
    const w = document.querySelector('.es-wordmark');
    const p = document.querySelector('.es-plaque');
    const body = document.querySelector('.es-card p');
    const bodyBg = getComputedStyle(body.closest('.es-card')).backgroundColor;
    return {
      wordmark: +ratio(getComputedStyle(w).color, getComputedStyle(p).backgroundColor).toFixed(2),
      cardBody: +ratio(getComputedStyle(body).color, bodyBg).toFixed(2),
    };
  });
  check('[a11y] wordmark contrast >= 4.5', contrast.wordmark >= 4.5, JSON.stringify(contrast));
  check('[a11y] card body contrast >= 4.5', contrast.cardBody >= 4.5, JSON.stringify(contrast));

  // hover
  const card = page.locator('.es-card').first();
  const b1 = await card.boundingBox();
  await card.hover();
  await page.waitForTimeout(600);
  const b2 = await card.boundingBox();
  check('[hover] card lifts', b1.y - b2.y >= 2, `${(b1.y - b2.y).toFixed(1)}px`);

  await page.locator('#ecosystem').screenshot({ path: path.join(OUT, 'hover.png') });
  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('#ecosystem').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const anim = await page.evaluate(() => {
    const line = document.querySelector('.es-line');
    const dot = document.querySelector('.es-node-dot');
    return { line: getComputedStyle(line).animationName, dot: getComputedStyle(dot).animationName };
  });
  check('[reduced-motion] connector flow disabled', anim.line === 'none', anim.line);
  check('[reduced-motion] dot pulse disabled', anim.dot === 'none', anim.dot);
  const vis = await page.evaluate(() =>
    [...document.querySelectorAll('#ecosystem .reveal')].filter((e) => getComputedStyle(e).opacity !== '1').length);
  check('[reduced-motion] all cards visible', vis === 0, `${vis}`);
  await ctx.close();
}

await browser.close();
console.log(`\nPASS (${pass.length})`);
pass.forEach((p) => console.log('  ✓ ' + p));
console.log(`\nFAIL (${fail.length})`);
fail.forEach((f) => console.log('  ✗ ' + f));
process.exitCode = fail.length ? 1 : 0;
