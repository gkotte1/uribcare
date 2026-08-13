// Functional QA: nav drawer, theme toggle, anchors, form validation, FAQ,
// keyboard focus and reduced-motion — the things a screenshot cannot prove.
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.join(process.cwd(), 'shots', 'interact');
fs.mkdirSync(OUT, { recursive: true });
const URL = 'http://localhost:3000';
const pass = [], fail = [];
const check = (name, ok, extra = '') => (ok ? pass : fail).push(`${name}${extra ? ' — ' + extra : ''}`);

const browser = await chromium.launch();

/* ---------- 1. mobile drawer ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(URL, { waitUntil: 'networkidle' });

  const burger = page.locator('.nav-burger');
  check('burger visible on mobile', await burger.isVisible());

  await burger.click();
  await page.waitForTimeout(400);
  check('drawer opens', await page.locator('.nav-drawer.open').isVisible());
  check('drawer aria-expanded', (await burger.getAttribute('aria-expanded')) === 'true');
  const drawerLinks = await page.locator('.nav-drawer a.dl').count();
  check('drawer has all 5 nav links', drawerLinks === 5, `found ${drawerLinks}`);
  await page.screenshot({ path: path.join(OUT, 'mobile-drawer-open.png') });

  // scrim closes it
  await page.locator('.nav-scrim').click({ position: { x: 200, y: 700 } });
  await page.waitForTimeout(350);
  check('scrim closes drawer', !(await page.locator('.nav-drawer.open').isVisible()));

  // escape closes it
  await burger.click();
  await page.waitForTimeout(300);
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  check('Escape closes drawer', !(await page.locator('.nav-drawer.open').isVisible()));

  // drawer link navigates and closes
  await burger.click();
  await page.waitForTimeout(300);
  await page.locator('.nav-drawer a.dl', { hasText: 'How it works' }).click();
  await page.waitForTimeout(900);
  check('drawer link closes drawer', !(await page.locator('.nav-drawer.open').isVisible()));
  check('drawer link scrolled to #journey', page.url().includes('#journey'), page.url());

  check('no page errors (mobile)', errs.length === 0, errs.join(' | '));
  await ctx.close();
}

/* ---------- 2. theme toggle ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });

  await page.locator('#themeBtn').click();
  await page.waitForTimeout(500);
  const t1 = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  check('theme toggles to dark', t1 === 'dark', `got ${t1}`);
  await page.screenshot({ path: path.join(OUT, 'dark-fold.png') });
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(OUT, 'dark-mid.png') });

  // contrast sample in dark mode
  const contrast = await page.evaluate(() => {
    const lum = (c) => {
      const [r, g, b] = c.match(/\d+(\.\d+)?/g).slice(0, 3).map(Number).map((v) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    const ratio = (a, b) => {
      const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
      return (x + 0.05) / (y + 0.05);
    };
    const bg = getComputedStyle(document.body).backgroundColor;
    const out = {};
    const sample = (sel, label) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const st = getComputedStyle(el);
      let bgEl = st.backgroundColor;
      let p = el;
      while (bgEl === 'rgba(0, 0, 0, 0)' && p.parentElement) { p = p.parentElement; bgEl = getComputedStyle(p).backgroundColor; }
      out[label] = +ratio(st.color, bgEl === 'rgba(0, 0, 0, 0)' ? bg : bgEl).toFixed(2);
    };
    sample('.lead', 'lead');
    sample('.es-card p', 'card body');
    sample('.es-wordmark', 'ecosystem wordmark');
    sample('.jbody p', 'journey body');
    sample('.hero-trust .tp', 'hero trust');
    sample('.ft a', 'footer link');
    sample('.stat .l', 'stat label');
    return out;
  });
  check('dark-mode body text contrast >= 4.5', Object.values(contrast).every((v) => v >= 4.5), JSON.stringify(contrast));

  await page.locator('#themeBtn').click();
  await page.waitForTimeout(400);
  const t2 = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
  check('theme toggles back to light', t2 === 'light', `got ${t2}`);
  await ctx.close();
}

/* ---------- 3. anchors, FAQ, form, focus ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  await page.goto(URL, { waitUntil: 'networkidle' });

  // every in-page anchor resolves to a real element
  const badAnchors = await page.evaluate(() =>
    [...document.querySelectorAll('a[href^="#"], a[href^="/#"]')]
      .map((a) => a.getAttribute('href').replace(/^\//, ''))
      .filter((h) => h.length > 1)
      .filter((h) => !document.querySelector(h))
  );
  check('all in-page anchors resolve', badAnchors.length === 0, badAnchors.join(', '));

  // nav anchor scrolls
  await page.locator('.nav-links a', { hasText: 'Ecosystem' }).click();
  await page.waitForTimeout(1000);
  const y = await page.evaluate(() => {
    const el = document.getElementById('ecosystem');
    return el.getBoundingClientRect().top;
  });
  check('nav anchor scrolls section into view', y > -50 && y < 200, `top=${Math.round(y)}`);

  // section is not hidden behind the sticky header
  check('scroll-padding clears sticky nav', y >= 0, `top=${Math.round(y)}`);

  // FAQ toggles
  const faq2 = page.locator('details.q').nth(1);
  check('faq starts closed', !(await faq2.evaluate((d) => d.open)));
  await faq2.locator('summary').click();
  await page.waitForTimeout(350);
  check('faq opens on click', await faq2.evaluate((d) => d.open));

  // form validation blocks empty submit and focuses first error
  await page.locator('a[href="#contact"]').first().click();
  await page.waitForTimeout(900);
  await page.locator('#leadForm button[type="submit"]').click();
  await page.waitForTimeout(400);
  const errCount = await page.locator('#leadForm .field.err').count();
  check('empty submit flags required fields', errCount === 3, `${errCount} errors`);
  const focused = await page.evaluate(() => document.activeElement?.id);
  check('first invalid field receives focus', focused === 'in-name', `focused=${focused}`);
  check('success panel still hidden', !(await page.locator('#leadSuccess').isVisible()));
  await page.screenshot({ path: path.join(OUT, 'form-errors.png') });

  // filling a field clears its error
  await page.fill('#in-name', 'Test Person');
  await page.waitForTimeout(200);
  check('typing clears the name error', (await page.locator('#f-name.err').count()) === 0);

  // keyboard focus visibility — reload so tabbing starts from the document top
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.evaluate(() => { document.activeElement?.blur?.(); window.scrollTo(0, 0); });
  await page.keyboard.press('Tab');
  const first = await page.evaluate(() => {
    const el = document.activeElement;
    return { txt: el?.textContent?.trim().slice(0, 30), outline: getComputedStyle(el).outlineWidth };
  });
  check('first Tab hits skip link', /Skip to content/i.test(first.txt || ''), JSON.stringify(first));
  check('focus ring is visible', parseFloat(first.outline) > 0, first.outline);

  check('no page errors (desktop)', errs.length === 0, errs.join(' | '));
  await ctx.close();
}

/* ---------- 4. reduced motion ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1400);
  const hidden = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.reveal')];
    return els.filter((e) => getComputedStyle(e).opacity !== '1').length;
  });
  check('reduced motion: all content visible', hidden === 0, `${hidden} still transparent`);
  await ctx.close();
}

/* ---------- 5. /register still works ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e)));
  const resp = await page.goto(URL + '/register', { waitUntil: 'networkidle' });
  check('/register returns 200', resp.status() === 200, `status ${resp.status()}`);
  check('/register renders tabs', (await page.locator('.reg-tab').count()) > 0);
  const ovf = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  check('/register has no horizontal overflow', !ovf);
  await page.screenshot({ path: path.join(OUT, 'register.png'), fullPage: false });
  check('no page errors (/register)', errs.length === 0, errs.join(' | '));
  await ctx.close();
}

await browser.close();

console.log(`\nPASS (${pass.length})`);
pass.forEach((p) => console.log('  ✓ ' + p));
console.log(`\nFAIL (${fail.length})`);
fail.forEach((f) => console.log('  ✗ ' + f));
process.exitCode = fail.length ? 1 : 0;
