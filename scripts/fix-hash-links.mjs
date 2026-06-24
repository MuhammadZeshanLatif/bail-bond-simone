import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'src');

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (/\.(jsx|js)$/.test(entry.name)) {
      const original = fs.readFileSync(fullPath, 'utf8');
      const updated = original
        .replaceAll('href="#/', 'href="/')
        .replaceAll("button_href: '#/contact'", "button_href: '/contact'");
      if (updated !== original) {
        fs.writeFileSync(fullPath, updated);
        console.log('updated', path.relative(root, fullPath));
      }
    }
  }
}

walk(root);
