import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_ROUTES } from './static-routes.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');

function routeToFile(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  return path.join(distDir, ...route.replace(/^\//, '').split('/'), 'index.html');
}

function verify() {
  if (!fs.existsSync(distDir)) {
    console.error('ERROR: dist/ folder missing. Run: npm run build');
    process.exit(1);
  }

  const errors = [];
  const manifest = [];

  for (const route of STATIC_ROUTES) {
    const file = routeToFile(route);
    const rel = path.relative(root, file);

    if (!fs.existsSync(file)) {
      errors.push(`Missing static page: ${route} → ${rel}`);
      continue;
    }

    const html = fs.readFileSync(file, 'utf8');
    const size = fs.statSync(file).size;

    if (size < 5000) {
      errors.push(`Page too small (likely not prerendered): ${route} (${size} bytes)`);
    }

    if (/<div id="root"><\/div>/.test(html) || /<div id="root">\s*<\/div>/.test(html)) {
      errors.push(`Empty React shell (not prerendered): ${route}`);
    }

    if (!html.includes('<main')) {
      errors.push(`No <main> content: ${route}`);
    }

    if (!html.includes('rel="canonical"')) {
      errors.push(`Missing canonical tag: ${route}`);
    }

    manifest.push({ route, file: rel, bytes: size });
  }

  const htaccess = path.join(distDir, '.htaccess');
  if (!fs.existsSync(htaccess)) {
    errors.push('Missing dist/.htaccess — Apache will not serve nested static pages');
  }

  const manifestPath = path.join(distDir, 'prerender-manifest.json');
  fs.writeFileSync(
    manifestPath,
    JSON.stringify({ generatedAt: new Date().toISOString(), pages: manifest }, null, 2)
  );

  console.log(`Static build OK: ${manifest.length} prerendered pages`);
  manifest.forEach(({ route, file, bytes }) => {
    console.log(`  ✓ ${route} → ${file} (${bytes} bytes)`);
  });

  if (errors.length) {
    console.error('\nStatic build verification FAILED:');
    errors.forEach((e) => console.error(`  ✗ ${e}`));
    process.exit(1);
  }
}

verify();
