// Captures the seam between the autism band and the Care Principles section
// so the transition can be judged in context rather than in isolation.
import { chromium } from 'playwright';
import fs from 'node:fs';

fs.mkdirSync('shots', { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

await page.evaluate(async () => {
  await new Promise((res) => {
    let y = 0;
    const step = () => {
      y += 700;
      window.scrollTo(0, y);
      if (y < document.body.scrollHeight) setTimeout(step, 60);
      else { window.scrollTo(0, 0); setTimeout(res, 400); }
    };
    step();
  });
  const imgs = [...document.querySelectorAll('img')];
  imgs.forEach((i) => i.setAttribute('loading', 'eager'));
  await Promise.all(imgs.map((i) => (i.complete && i.naturalWidth
    ? null
    : new Promise((r) => { i.onload = r; i.onerror = r; setTimeout(r, 6000); }))));
});
await page.waitForTimeout(900);

// Frame the seam: the tail of the dark band through to the end of the cards.
const bandBottom = await page.evaluate(() => {
  const r = document.querySelector('.feature-band').getBoundingClientRect();
  return r.bottom + window.scrollY;
});
await page.evaluate((y) => window.scrollTo(0, y), bandBottom - 190);
await page.waitForTimeout(700);
await page.screenshot({ path: 'shots/transition.png' });
await browser.close();
console.log('wrote shots/transition.png');
