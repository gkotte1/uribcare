// Playwright visual/responsive QA for the Uribcare homepage.
// Usage: node qa.mjs <label>   e.g. node qa.mjs before
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const LABEL = process.argv[2] || 'run';
const URL = process.env.QA_URL || 'http://localhost:3000';
const OUT = path.join(process.cwd(), 'shots', LABEL);
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: 'desktop-xl', width: 1728, height: 1000 },
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'laptop', width: 1280, height: 800 },
  { name: 'tablet', width: 834, height: 1112 },
  { name: 'mobile', width: 390, height: 844 },
  { name: 'mobile-360', width: 360, height: 780 },
  { name: 'mobile-sm', width: 320, height: 720 },
];

const report = [];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text());
  });
  page.on('pageerror', (e) => pageErrors.push(String(e)));
  page.on('requestfailed', (r) => failedRequests.push(`${r.url()} :: ${r.failure()?.errorText}`));

  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  // let reveal-on-scroll + fonts settle: scroll through the whole page
  await page.evaluate(async () => {
    await new Promise((res) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.8;
        window.scrollTo(0, y);
        if (y < document.body.scrollHeight) setTimeout(step, 90);
        else { window.scrollTo(0, 0); setTimeout(res, 500); }
      };
      step();
    });
  });
  await page.waitForTimeout(900);

  // lazy images only start loading once they've been near the viewport; give
  // every one of them a chance to finish decoding before we judge the page.
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll('img')];
    imgs.forEach((i) => i.setAttribute('loading', 'eager'));
    await Promise.all(
      imgs.map((i) =>
        i.complete && i.naturalWidth > 0
          ? Promise.resolve()
          : new Promise((res) => {
              i.addEventListener('load', res, { once: true });
              i.addEventListener('error', res, { once: true });
              setTimeout(res, 8000);
            })
      )
    );
  });
  await page.waitForTimeout(400);

  const diag = await page.evaluate(() => {
    const out = { overflow: [], broken: [], tiny: [], clipped: [], contrastNote: [] };
    const docW = document.documentElement.clientWidth;
    out.scrollW = document.documentElement.scrollWidth;
    out.clientW = docW;
    out.horizontalOverflow = document.documentElement.scrollWidth > docW + 1;
    out.bodyScrollH = document.body.scrollHeight;

    // elements poking past the viewport
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const st = getComputedStyle(el);
      if (st.position === 'fixed') return;
      if (r.right > docW + 1.5 || r.left < -1.5) {
        out.overflow.push({
          sel: el.tagName.toLowerCase() + (el.className && typeof el.className === 'string' ? '.' + el.className.trim().split(/\s+/).slice(0, 3).join('.') : ''),
          left: Math.round(r.left), right: Math.round(r.right),
        });
      }
    });
    // broken images
    document.querySelectorAll('img').forEach((img) => {
      if (!img.complete || img.naturalWidth === 0) out.broken.push(img.getAttribute('src'));
    });
    // text smaller than 12px
    document.querySelectorAll('p,li,span,a,h1,h2,h3,h4,h5,summary,label,div').forEach((el) => {
      if (!el.textContent?.trim()) return;
      if (el.children.length > 0) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 12) out.tiny.push({ t: el.textContent.trim().slice(0, 40), fs });
    });
    // clipped text (scrollHeight noticeably beyond clientHeight on a fixed-height box)
    document.querySelectorAll('h1,h2,h3,h4,p,li,summary,a,button').forEach((el) => {
      // .sr-only is deliberately clipped to 1px for assistive tech
      if (el.closest('.sr-only, .skip-link')) return;
      const st = getComputedStyle(el);
      if (st.overflow === 'hidden' && el.scrollHeight > el.clientHeight + 4 && el.clientHeight > 0) {
        out.clipped.push({ t: (el.textContent || '').trim().slice(0, 40), sh: el.scrollHeight, ch: el.clientHeight });
      }
    });
    out.sections = [...document.querySelectorAll('section[id], main > section')].map((s) => ({
      id: s.id || '(none)',
      h: Math.round(s.getBoundingClientRect().height),
    }));
    out.hiddenReveals = document.querySelectorAll('.reveal:not(.in)').length;
    return out;
  });

  // tap-target check for mobile widths
  let smallTargets = [];
  if (vp.width <= 480) {
    smallTargets = await page.evaluate(() =>
      [...document.querySelectorAll('a,button,summary,input,select')]
        .map((el) => {
          const r = el.getBoundingClientRect();
          return { t: (el.textContent || el.getAttribute('aria-label') || el.tagName).trim().slice(0, 30), w: Math.round(r.width), h: Math.round(r.height) };
        })
        .filter((x) => x.h > 0 && x.h < 32)
    );
  }

  await page.screenshot({ path: path.join(OUT, `${vp.name}-full.png`), fullPage: true });
  await page.screenshot({ path: path.join(OUT, `${vp.name}-fold.png`) });

  report.push({ viewport: vp.name, size: `${vp.width}x${vp.height}`, ...diag, smallTargets, consoleErrors, pageErrors, failedRequests });
  await ctx.close();
}

await browser.close();

fs.writeFileSync(path.join(OUT, 'report.json'), JSON.stringify(report, null, 2));

// concise console summary
for (const r of report) {
  console.log(`\n=== ${r.viewport} (${r.size}) ===`);
  console.log(`  page height: ${r.bodyScrollH}px | scrollW ${r.scrollW} vs clientW ${r.clientW}`);
  console.log(`  horizontal overflow: ${r.horizontalOverflow ? 'YES ***' : 'no'}`);
  if (r.overflow.length) console.log(`  overflowing els (${r.overflow.length}): ${JSON.stringify(r.overflow.slice(0, 6))}`);
  if (r.broken.length) console.log(`  BROKEN IMAGES: ${JSON.stringify(r.broken)}`);
  if (r.tiny.length) console.log(`  tiny text (<12px) x${r.tiny.length}: ${JSON.stringify(r.tiny.slice(0, 4))}`);
  if (r.clipped.length) console.log(`  clipped text x${r.clipped.length}: ${JSON.stringify(r.clipped.slice(0, 4))}`);
  if (r.smallTargets?.length) console.log(`  small tap targets x${r.smallTargets.length}: ${JSON.stringify(r.smallTargets.slice(0, 5))}`);
  if (r.hiddenReveals) console.log(`  un-revealed .reveal elements: ${r.hiddenReveals}`);
  if (r.consoleErrors.length) console.log(`  CONSOLE ERRORS: ${JSON.stringify(r.consoleErrors.slice(0, 5))}`);
  if (r.pageErrors.length) console.log(`  PAGE ERRORS: ${JSON.stringify(r.pageErrors.slice(0, 5))}`);
  if (r.failedRequests.length) console.log(`  FAILED REQUESTS: ${JSON.stringify(r.failedRequests.slice(0, 5))}`);
  console.log(`  sections: ${r.sections.map((s) => `${s.id}:${s.h}`).join('  ')}`);
}
console.log(`\nScreenshots -> ${OUT}`);
