import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';
import { getRoutesFromSitemap } from './get-routes-from-sitemap.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distDir = path.join(root, 'dist');
const PREVIEW_PORT = 4173;
const PREVIEW_URL = `http://127.0.0.1:${PREVIEW_PORT}`;

const STATIC_ROUTES = getRoutesFromSitemap();

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
  '.json': 'application/json',
};

function resolveFile(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const safePath = path.normalize(decoded).replace(/^(\.\.[/\\])+/, '');
  const relative = safePath.startsWith('/') ? safePath.slice(1) : safePath;

  const candidates = [];
  if (!relative || relative === '/') {
    candidates.push('index.html');
  } else {
    candidates.push(path.join(relative, 'index.html'));
    candidates.push(relative);
  }
  candidates.push('index.html');

  for (const candidate of candidates) {
    const full = path.join(distDir, candidate);
    if (fs.existsSync(full) && fs.statSync(full).isFile()) return full;
  }
  return path.join(distDir, 'index.html');
}

function startStaticServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      try {
        const filePath = resolveFile(req.url || '/');
        const ext = path.extname(filePath).toLowerCase();
        const body = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
        res.end(body);
      } catch {
        res.writeHead(500);
        res.end('Server error');
      }
    });
    server.listen(PREVIEW_PORT, '127.0.0.1', () => resolve(server));
  });
}

function routeToOutputFile(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  const segments = route.replace(/^\//, '').split('/');
  return path.join(distDir, ...segments, 'index.html');
}

async function launchBrowser() {
  const launchOptions = {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  };

  try {
    return await puppeteer.launch({
      ...launchOptions,
      executablePath: puppeteer.executablePath(),
    });
  } catch {
    return await puppeteer.launch({
      ...launchOptions,
      channel: 'chrome',
    });
  }
}

async function prerenderRoute(page, route) {
  const url = `${PREVIEW_URL}${route === '/' ? '/' : route}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 120000 });
  await page.waitForSelector('main', { timeout: 20000 });
  await page.waitForFunction(
    () => document.querySelector('main')?.innerHTML.trim().length > 100,
    { timeout: 20000 }
  );
  await new Promise((r) => setTimeout(r, 500));

  let html = await page.content();
  html = html.replace(/href="\.\//g, 'href="/');
  html = html.replace(/src="\.\//g, 'src="/');

  const outFile = routeToOutputFile(route);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`  ✓ ${route} → ${path.relative(root, outFile)}`);
}

async function main() {
  if (!fs.existsSync(distDir)) {
    console.error('dist/ not found. Run vite build first.');
    process.exit(1);
  }

  console.log(`Prerendering ${STATIC_ROUTES.length} routes from sitemap...`);
  const server = await startStaticServer();

  try {
    const browser = await launchBrowser();
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 900 });

    for (const route of STATIC_ROUTES) {
      await prerenderRoute(page, route);
    }

    await browser.close();
    console.log('Prerender complete.');
  } finally {
    server.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
