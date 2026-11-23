// Capture the video's scenes with headless Chrome's screencast.
// Usage: CHROME_PATH=<headless-shell> node capture.mjs <outdir>
//   Reads scenes/hook.html (5s), scenes/terminal.html (10s) and
//   game/index.html?seed=1337&t=25&autoplay=1 (until game over + 2.5s),
//   saving JPEG frames at ~12fps into <outdir>/<scene>-NNNN.jpg.
// Requires: puppeteer-core (npm i puppeteer-core) + a headless Chrome.
import { createRequire } from 'node:module';
const require = createRequire('/tmp/node_modules/puppeteer-core/package.json');
const puppeteer = require('puppeteer-core');
import fs from 'node:fs';
import path from 'node:path';

const CHROME = process.env.CHROME_PATH;
const OUT = process.argv[2] || '/tmp/frames';
const ROOT = new URL('.', import.meta.url).pathname;
fs.mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--window-size=1920,1080', '--hide-scrollbars'],
  defaultViewport: { width: 1920, height: 1080 },
});

async function captureScene(name, url, seconds, untilFn, vw, vh) {
  const page = await browser.newPage();
  await page.setViewport({ width: vw || 1920, height: vh || 1080 });
  const dir = path.join(OUT, name);
  fs.mkdirSync(dir, { recursive: true });
  const cdp = await page.createCDPSession();
  let n = 0;
  await page.goto(url, { waitUntil: 'load', timeout: 30000 });
  // Fixed-rate screenshots: the screencast only emits frames when the
  // page repaints, which leaves static scenes (the terminal) nearly
  // frozen, so drive the frame rate ourselves at 10 fps.
  const t0 = Date.now();
  while (true) {
    const el = (Date.now() - t0) / 1000;
    if (untilFn) {
      const done = await page.evaluate(untilFn).catch(() => false);
      if (done && el > 2) break;
    }
    if (el >= seconds) break;
    const shot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 72 }).catch(() => null);
    if (shot && shot.data) {
      fs.writeFileSync(path.join(dir, String(n++).padStart(4, '0') + '.jpg'), Buffer.from(shot.data, 'base64'));
    }
    const wait = 100 - ((Date.now() - t0) % 100);
    await new Promise(r => setTimeout(r, Math.max(0, wait)));
  }
  await page.close();
  console.log(name + ': ' + n + ' frames in ' + ((Date.now() - t0) / 1000).toFixed(1) + 's');
}

const base = 'file://' + ROOT;
await captureScene('hook', base + 'scenes/hook.html', 5);
await captureScene('terminal', base + 'scenes/terminal.html', 10);
await captureScene('game', base + 'game/index.html?seed=1337&t=25&autoplay=1', 33, () => {
  const g = window.__game;
  if (!g) return false;
  if (g.state === 'over') {
    window.__overAt = window.__overAt || performance.now();
    return performance.now() - window.__overAt > 2500;
  }
  return false;
}, 1280, 720);
await browser.close();
console.log('capture done');
