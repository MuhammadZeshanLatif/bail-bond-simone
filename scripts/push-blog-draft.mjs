// Push a finished article into the admin blog (/admin/blog) as a DRAFT.
// It never publishes or schedules: that stays a manual step in the admin dashboard.
//
//   npm run blog:draft -- seo-notes/drafts/article.md [--dry-run]
//
// Put ONE of these in .env.local (git-ignored, never commit it):
//   SUPABASE_SERVICE_ROLE_KEY=...      (Supabase → Project Settings → API keys; no login needed)
// or the admin login, so the same database rules apply as in the dashboard:
//   BLOG_EDITOR_EMAIL=you@example.com
//   BLOG_EDITOR_PASSWORD=...
//
// article.md starts with a front-matter block, then the Markdown body:
//   ---
//   title: What Is a Cash Surety Bond? How Cash or Surety Bail Works in Delaware
//   slug: what-is-a-cash-surety-bond
//   category: Bond Types
//   excerpt: One or two sentences shown on the blog card.
//   seoTitle: Optional, defaults to the title (aim for 60 characters or less)
//   seoDescription: Optional, defaults to the excerpt (aim for 120-160 characters)
//   socialDescription: Optional, for social shares
//   primaryKeyword: what is a cash surety bond
//   secondaryKeywords: cash surety bond, cash or surety bond
//   tags: Cash Surety Bond, Secured Bail
//   author: Simone Harris
//   heroImage: ../../public/images/blog/slug/hero.webp
//   heroAlt: Describe what the hero image shows
//   ---
// Local images (heroImage and ![alt](./file.webp) in the body) are uploaded to the
// bail-bond-blog-images bucket and replaced with their public URL. Site paths (/images/...)
// and https:// URLs are kept as they are.
import fs from 'node:fs/promises';
import path from 'node:path';
import { createClient } from '@supabase/supabase-js';

const TABLE = 'bail_bond_blog_posts';
const BUCKET = 'bail-bond-blog-images';
const CATEGORIES = ['Bail Guides', 'Bail Costs', 'Bail Process', 'Bond Types', 'Charges & Bail', 'Immigration Bonds', 'Delaware Courts'];
const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg' };

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const file = args.find((a) => !a.startsWith('--'));
if (!file) throw new Error('Usage: npm run blog:draft -- path/to/article.md [--dry-run]');

async function loadEnv() {
  const env = {};
  for (const name of ['.env', '.env.local']) {
    const text = await fs.readFile(name, 'utf8').catch(() => '');
    for (const line of text.split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m) env[m[1]] = m[2].replace(/^(['"])(.*)\1$/, '$2');
    }
  }
  return { ...env, ...process.env };
}

function parseArticle(text) {
  const m = text.match(/^﻿?---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) throw new Error('The file must start with a --- front-matter block.');
  const meta = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z]+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim();
  }
  // A leading "# Title" line duplicates the page H1, so drop it.
  return { meta, body: m[2].replace(/^\s*#\s+.+\n/, '').trim() };
}

const list = (value) => (value || '').split(',').map((item) => item.trim()).filter(Boolean);
const isLocal = (ref) => !/^(https?:\/\/|\/)/.test(ref);

const env = await loadEnv();
const baseDir = path.dirname(path.resolve(file));
const { meta, body } = parseArticle(await fs.readFile(file, 'utf8'));

const problems = [];
if (!meta.title) problems.push('title is missing');
if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(meta.slug || '')) problems.push('slug must be lowercase words separated by hyphens');
if (!CATEGORIES.includes(meta.category)) problems.push(`category must be one of: ${CATEGORIES.join(', ')}`);
if (!meta.excerpt) problems.push('excerpt is missing');
if (body.length < 100) problems.push('article body is shorter than 100 characters');
if (meta.heroImage && !meta.heroAlt) problems.push('heroAlt is required when heroImage is set');
if (!meta.primaryKeyword) problems.push('primaryKeyword is missing');
for (const key of ['secondaryKeywords', 'tags']) {
  if (/\d,\d{3}/.test(meta[key] || '')) problems.push(`${key} has a number with a thousands comma (e.g. $100,000); lists are split on commas, so write $100k or $100000`);
}
const seoTitle = meta.seoTitle || meta.title || '';
if (seoTitle.length > 60) problems.push(`SEO title is ${seoTitle.length} characters; keep it at 60 or less (add a shorter seoTitle)`);
const seoDescription = meta.seoDescription || meta.excerpt || '';
if (seoDescription.length < 120 || seoDescription.length > 160) problems.push(`SEO description is ${seoDescription.length} characters; keep it between 120 and 160`);
if (meta.socialDescription && meta.socialDescription.length > 200) problems.push(`socialDescription is ${meta.socialDescription.length} characters; keep it under 200`);

// Slugs of articles built into the site code cannot be reused.
for (const name of await fs.readdir('src/blog')) {
  const source = await fs.readFile(path.join('src/blog', name), 'utf8');
  if (source.includes(`'${meta.slug}'`) || source.includes(`"${meta.slug}"`)) {
    problems.push(`slug "${meta.slug}" belongs to an article built into the site code (src/blog/${name})`);
    break;
  }
}

const bodyImages = [...body.matchAll(/!\[[^\]]*\]\(([^)\s]+)\)/g)].map((x) => x[1]);
const localImages = [...new Set(bodyImages.filter(isLocal))];
for (const ref of [...bodyImages, meta.heroImage].filter(Boolean)) {
  const onDisk = isLocal(ref) ? path.resolve(baseDir, ref) : ref.startsWith('/') ? path.resolve('public', `.${ref}`) : null;
  if (onDisk) await fs.access(onDisk).catch(() => problems.push(`image not found: ${ref}`));
  if (isLocal(ref) && !MIME[path.extname(ref).toLowerCase()]) problems.push(`image must be .webp, .png or .jpg: ${ref}`);
}
if (problems.length) throw new Error('Article not pushed:\n- ' + problems.join('\n- '));

console.log(`"${meta.title}" → /blog/${meta.slug} (${meta.category}), ${body.split(/\s+/).length} words, ${localImages.length} body image(s) to upload${meta.heroImage ? ' + hero' : ''}`);
if (dryRun) { console.log('Dry run: checks passed, nothing uploaded.'); process.exit(0); }

if (!env.VITE_SUPABASE_URL || !env.VITE_SUPABASE_ANON_KEY) throw new Error('VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set in .env');
// Either a server key (SUPABASE_SERVICE_ROLE_KEY, no login needed) or the admin login.
const serviceKey = env.SUPABASE_SERVICE_ROLE_KEY;
if (!serviceKey && (!env.BLOG_EDITOR_EMAIL || !env.BLOG_EDITOR_PASSWORD)) {
  throw new Error('Add SUPABASE_SERVICE_ROLE_KEY, or BLOG_EDITOR_EMAIL and BLOG_EDITOR_PASSWORD (your /admin login), to .env.local');
}
const supabase = createClient(env.VITE_SUPABASE_URL, serviceKey || env.VITE_SUPABASE_ANON_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
if (!serviceKey) {
  const { error: authError } = await supabase.auth.signInWithPassword({ email: env.BLOG_EDITOR_EMAIL, password: env.BLOG_EDITOR_PASSWORD });
  if (authError) throw new Error('Sign-in failed: ' + authError.message + '. Check the login, or add SUPABASE_SERVICE_ROLE_KEY to .env.local instead.');
}

try {
  const { data: existing, error: readError } = await supabase.from(TABLE).select('id,status,published_at').eq('slug', meta.slug).maybeSingle();
  if (readError) throw new Error('Could not read the blog table: ' + readError.message);
  if (existing && existing.status === 'published') {
    const when = Date.parse(existing.published_at) > Date.now() ? 'scheduled' : 'published';
    throw new Error(`/blog/${meta.slug} is already ${when}. Edit it in /admin/blog instead of overwriting it from a file.`);
  }

  async function uploadImage(ref) {
    const ext = path.extname(ref).toLowerCase();
    const data = await fs.readFile(path.resolve(baseDir, ref));
    const name = path.basename(ref, ext).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const key = `articles/${meta.slug}/${name}-${Date.now().toString(36)}${ext === '.jpeg' ? '.jpg' : ext}`;
    const { error } = await supabase.storage.from(BUCKET).upload(key, data, { contentType: MIME[ext], cacheControl: '31536000', upsert: false });
    if (error) throw new Error(`Upload failed for ${ref}: ${error.message}`);
    return supabase.storage.from(BUCKET).getPublicUrl(key).data.publicUrl;
  }

  let content = body;
  for (const ref of localImages) {
    const url = await uploadImage(ref);
    content = content.split(`](${ref})`).join(`](${url})`);
    console.log(`  uploaded ${ref}`);
  }
  // Without a heroImage in the file, keep the hero an existing draft already has in the admin.
  const hero = meta.heroImage
    ? { image: isLocal(meta.heroImage) ? await uploadImage(meta.heroImage) : meta.heroImage, image_alt: meta.heroAlt }
    : existing ? {} : { image: '', image_alt: '' };

  const payload = {
    ...(existing ? { id: existing.id } : {}),
    slug: meta.slug,
    title: meta.title,
    excerpt: meta.excerpt,
    content,
    category: meta.category,
    author: meta.author || 'Simone Harris',
    ...hero,
    seo_title: meta.seoTitle || null,
    seo_description: meta.seoDescription || null,
    social_description: meta.socialDescription || null,
    primary_keyword: meta.primaryKeyword || null,
    secondary_keywords: list(meta.secondaryKeywords),
    tags: list(meta.tags),
    status: 'draft',
    published_at: null,
  };
  const { error: saveError } = await supabase.from(TABLE).upsert(payload).select('id').single();
  if (saveError) throw new Error('Draft could not be saved: ' + saveError.message);
  console.log(`${existing ? 'Updated' : 'Created'} draft. Open /admin/blog → Draft to review, publish or schedule it.`);
} finally {
  if (!serviceKey) await supabase.auth.signOut();
}
