import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sitemapPath = path.join(root, 'public', 'sitemap.xml');

export function getRoutesFromSitemap() {
  const xml = fs.readFileSync(sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map((m) => {
    const pathname = new URL(m[1]).pathname;
    return pathname === '' ? '/' : pathname;
  });

  const unique = [...new Set(urls)].sort((a, b) => a.localeCompare(b));
  return unique;
}
