// Focused QA for the Care Principles section: alignment, equal heights,
// hover, responsive behaviour and content fidelity.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'shots', 'principles');
fs.mkdirSync(OUT, { recursive: true });
const URL = 'http://localhost:3000';
const pass = [], fail = [];
const check = (n, ok, extra = '') => (ok ? pass : fail).push(`${n}${extra ? ' — ' + extra : ''}`);

// the exact copy supplied, to prove nothing was reworded
const EXPECTED = [
  ['01', 'Integrity & Accountability', 'Building Trust Through Excellence',
    'We uphold the highest standards of honesty, transparency, and professional care in every patient interaction.'],
  ['02', 'Advanced Techniques & Innovation', 'Delivering Modern, Evidence-Based Care',
    'We utilize the latest therapeutic techniques, technologies, and treatment strategies to achieve optimal outcomes.'],
  ['03', 'Compassionate Care', 'Serving with Empathy & Respect',
    'We build lasting relationships through genuine care, personalized attention, and unwavering support.'],
];

const browser = await chromium.launch();

for (const vp of [
  { name: 'desktop', width: 1440, height: 900, cols: 3 },
  { name: 'laptop', width: 1280, height: 800, cols: 3 },
  { name: 'tablet', width: 834, height: 1112, cols: 2 },
  { name: 'tablet-sm', width: 768, height: 1024, cols: 2 },
  { name: 'mobile', width: 390, height: 844, cols: 1 },
  { name: 'mobile-sm', width: 320, height: 720, cols: 1 },
]) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('#principles').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);

  const d = await page.evaluate(() => {
    const sec = document.getElementById('principles');
    const cards = [...sec.querySelectorAll('.cp-card')];
    const docW = document.documentElement.clientWidth;
    const boxes = cards.map((c) => {
      const r = c.getBoundingClientRect();
      return { x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width), h: Math.round(r.height) };
    });
    // how many cards share the topmost row
    const topY = Math.min(...boxes.map((b) => b.y));
    const cols = boxes.filter((b) => Math.abs(b.y - topY) < 4).length;

    const text = cards.map((c) => [
      c.querySelector('.cp-num')?.textContent.trim(),
      c.querySelector('h3')?.textContent.trim(),
      c.querySelector('.cp-sub')?.textContent.trim(),
      c.querySelector('.cp-body')?.textContent.trim(),
    ]);

    // any element inside the section poking outside the viewport?
    const overflow = [...sec.querySelectorAll('*')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && r.right > docW + 1.5;
    }).length;

    // clipped text: a box hiding overflow with content taller than it
    const clipped = [...sec.querySelectorAll('h3, p, span')].filter((el) => {
      const st = getComputedStyle(el);
      return st.overflow === 'hidden' && el.scrollHeight > el.clientHeight + 4 && el.clientHeight > 0;
    }).length;

    // icons rendered with real geometry
    const icons = [...sec.querySelectorAll('.cp-ico svg')].map((s) => {
      const r = s.getBoundingClientRect();
      return Math.round(r.width) > 0 && Math.round(r.height) > 0;
    });

    // dividers on a shared baseline (only meaningful when side by side)
    const divY = cards.map((c) => Math.round(c.querySelector('.cp-body').getBoundingClientRect().top - c.getBoundingClientRect().top));

    const sub = cards.map((c) => Math.round(c.querySelector('.cp-sub').getBoundingClientRect().height));
    const gap = boxes.length > 1 && cols > 1 ? Math.round(boxes[1].x - (boxes[0].x + boxes[0].w)) : null;
    return { boxes, cols, text, overflow, clipped, icons, divY, sub, gap,
             secTop: Math.round(sec.getBoundingClientRect().top + window.scrollY),
             hHidden: getComputedStyle(sec.querySelector('h2')).position };
  });

  const tag = `[${vp.name}]`;
  check(`${tag} column count`, d.cols === vp.cols, `expected ${vp.cols}, got ${d.cols}`);
  check(`${tag} no overflow past viewport`, d.overflow === 0, `${d.overflow} elements`);
  check(`${tag} no clipped text`, d.clipped === 0, `${d.clipped} elements`);
  check(`${tag} all 3 icons render`, d.icons.length === 3 && d.icons.every(Boolean), JSON.stringify(d.icons));
  check(`${tag} content matches source exactly`,
    JSON.stringify(d.text) === JSON.stringify(EXPECTED),
    JSON.stringify(d.text) === JSON.stringify(EXPECTED) ? '' : JSON.stringify(d.text));

  // equal heights only apply to cards sharing a row
  if (vp.cols === 3) {
    const hs = d.boxes.map((b) => b.h);
    check(`${tag} equal card heights`, Math.max(...hs) - Math.min(...hs) <= 1, hs.join(' / '));
    const xs = d.boxes.map((b) => b.y);
    check(`${tag} cards top-aligned`, Math.max(...xs) - Math.min(...xs) <= 1, xs.join(' / '));
    const ws = d.boxes.map((b) => b.w);
    check(`${tag} equal card widths`, Math.max(...ws) - Math.min(...ws) <= 1, ws.join(' / '));
    check(`${tag} dividers share a baseline`, Math.max(...d.divY) - Math.min(...d.divY) <= 1, d.divY.join(' / '));
  }

  await page.locator('#principles').screenshot({ path: path.join(OUT, `${vp.name}.png`) });
  check(`${tag} no console errors`, errs.length === 0, errs.slice(0, 2).join(' | '));
  await ctx.close();
}

/* ---------- hover + spacing + reduced motion ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('#principles').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const card = page.locator('.cp-card').first();
  const before = await card.boundingBox();
  const borderBefore = await card.evaluate((el) => getComputedStyle(el).borderTopColor);
  await card.hover();
  await page.waitForTimeout(650);
  const after = await card.boundingBox();
  const borderAfter = await card.evaluate((el) => getComputedStyle(el).borderTopColor);
  const iconScaled = await page.evaluate(() => {
    const t = getComputedStyle(document.querySelector('.cp-card .cp-ico')).transform;
    return t !== 'none' && t !== 'matrix(1, 0, 0, 1, 0, 0)';
  });
  const accent = await page.evaluate(() => {
    const t = getComputedStyle(document.querySelector('.cp-card'), '::before').transform;
    return t;
  });
  check('[hover] card lifts', before.y - after.y >= 3, `moved ${(before.y - after.y).toFixed(1)}px`);
  check('[hover] border changes', borderBefore !== borderAfter, `${borderBefore} -> ${borderAfter}`);
  check('[hover] icon transforms', iconScaled, accent);
  await page.screenshot({ path: path.join(OUT, 'hover.png'), clip: { ...(await page.locator('#principles').boundingBox()) } });

  // spacing between the autism band and this section
  const gap = await page.evaluate(() => {
    const a = document.getElementById('autism').getBoundingClientRect();
    const p = document.getElementById('principles').getBoundingClientRect();
    const firstCard = document.querySelector('.cp-card').getBoundingClientRect();
    const featureBottom = document.querySelector('.feature-band').getBoundingClientRect().bottom;
    return { sectionGap: Math.round(p.top - a.bottom), visualGap: Math.round(firstCard.top - featureBottom) };
  });
  check('[spacing] visual gap below autism band is generous', gap.visualGap >= 90 && gap.visualGap <= 260, JSON.stringify(gap));

  // heading is hidden visually but present for AT
  const h = await page.evaluate(() => {
    const el = document.querySelector('#cp-heading');
    const r = el.getBoundingClientRect();
    return { txt: el.textContent.trim(), w: Math.round(r.width), h: Math.round(r.height), tag: el.tagName };
  });
  check('[a11y] section h2 present but visually hidden', h.tag === 'H2' && h.txt === 'Care Principles' && h.w <= 2, JSON.stringify(h));

  const order = await page.evaluate(() =>
    [...document.querySelectorAll('main h1, main h2, main h3')].map((e) => +e.tagName[1])
  );
  let ok = true;
  for (let i = 1; i < order.length; i++) if (order[i] - order[i - 1] > 1) ok = false;
  check('[a11y] heading levels never skip', ok, order.join(','));

  await ctx.close();
}

{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.locator('#principles').scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const card = page.locator('.cp-card').first();
  const b1 = await card.boundingBox();
  await card.hover();
  await page.waitForTimeout(500);
  const b2 = await card.boundingBox();
  check('[reduced-motion] card does not translate on hover', Math.abs(b1.y - b2.y) < 1, `${b1.y} -> ${b2.y}`);
  const vis = await page.evaluate(() =>
    [...document.querySelectorAll('#principles .reveal')].filter((e) => getComputedStyle(e).opacity !== '1').length
  );
  check('[reduced-motion] all cards visible', vis === 0, `${vis} transparent`);
  await ctx.close();
}

await browser.close();

console.log(`\nPASS (${pass.length})`);
pass.forEach((p) => console.log('  ✓ ' + p));
console.log(`\nFAIL (${fail.length})`);
fail.forEach((f) => console.log('  ✗ ' + f));
process.exitCode = fail.length ? 1 : 0;
