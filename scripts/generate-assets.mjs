// One-time asset generator: builds og-image.jpg + favicon PNGs from the brand
// handcuffs SVG using the already-installed Puppeteer (Chrome). Run: node scripts/generate-assets.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, '..', 'public');
const svg = fs.readFileSync(path.join(publicDir, 'favicon.svg'), 'utf8');

const launchOptions = {
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
};

async function render(page, html, { width, height }) {
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });
  // Give web fonts a chance to load, but never block for long.
  await page.evaluate(() => Promise.race([
    document.fonts.ready,
    new Promise((r) => setTimeout(r, 2500)),
  ]));
}

const faviconHtml = (size) => `<!doctype html><html><head><meta charset="utf-8">
<style>html,body{margin:0;padding:0;background:transparent}
.wrap{width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center}
svg{width:${size}px;height:${size}px}</style></head>
<body><div class="wrap">${svg}</div></body></html>`;

const ogHtml = `<!doctype html><html><head><meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');
  html,body{margin:0;padding:0}
  .og{width:1200px;height:630px;box-sizing:border-box;position:relative;overflow:hidden;
    background:radial-gradient(circle at 78% 28%, #2a2410 0%, #111 45%, #0a0a0a 100%);
    font-family:'Inter',Arial,sans-serif;color:#f5f5f5;
    display:flex;flex-direction:column;justify-content:center;padding:0 90px;}
  .bar{position:absolute;left:0;top:0;height:100%;width:14px;background:linear-gradient(180deg,#D4AF37,#B8941F);}
  .badge{display:inline-flex;align-items:center;gap:10px;font-size:22px;font-weight:600;letter-spacing:2px;
    color:#D4AF37;text-transform:uppercase;margin-bottom:26px;}
  h1{font-family:'Playfair Display',serif;font-weight:700;font-size:74px;line-height:1.05;margin:0 0 22px;}
  .gold{color:#D4AF37;}
  .tag{font-size:30px;color:#cfcfcf;font-weight:400;margin:0 0 40px;max-width:820px;}
  .row{display:flex;align-items:center;gap:34px;font-size:27px;font-weight:600;}
  .row .item{display:flex;align-items:center;gap:12px;color:#fff;}
  .dot{width:9px;height:9px;border-radius:50%;background:#D4AF37;}
  .logo{position:absolute;right:80px;top:90px;width:170px;height:170px;}
  .logo svg{width:170px;height:170px;}
</style></head>
<body>
  <div class="og">
    <div class="bar"></div>
    <div class="logo">${svg}</div>
    <div class="badge">★ Licensed &amp; Bonded — Available 24/7</div>
    <h1>A Way to Freedom<br><span class="gold">Bail Bonds</span></h1>
    <div class="tag">Fast, confidential 24/7 bail bond help across New Castle &amp; Kent County, Delaware.</div>
    <div class="row">
      <div class="item"><span class="dot"></span>(702) 447-8550</div>
      <div class="item"><span class="dot"></span>Newark &amp; Wilmington, DE</div>
    </div>
  </div>
</body></html>`;

const browser = await puppeteer.launch(launchOptions);
try {
  const page = await browser.newPage();

  // Favicons (transparent)
  const favSizes = [
    { size: 16, file: 'favicon-16x16.png' },
    { size: 32, file: 'favicon-32x32.png' },
    { size: 180, file: 'apple-touch-icon.png' },
  ];
  for (const { size, file } of favSizes) {
    await render(page, faviconHtml(size), { width: size, height: size });
    const el = await page.$('.wrap');
    await el.screenshot({ path: path.join(publicDir, file), omitBackground: true });
    console.log(`  ✓ ${file} (${size}x${size})`);
  }

  // OG image (jpeg)
  await render(page, ogHtml, { width: 1200, height: 630 });
  const og = await page.$('.og');
  await og.screenshot({ path: path.join(publicDir, 'og-image.jpg'), type: 'jpeg', quality: 90 });
  console.log('  ✓ og-image.jpg (1200x630)');
} finally {
  await browser.close();
}
console.log('Asset generation complete.');
