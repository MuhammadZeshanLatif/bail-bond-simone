import { getSupabase, isSupabaseConfigured } from './supabase';
import { SITE_ORIGIN, readMinutes, renderArticle } from './blogMarkdown';

export const BLOG_TABLE = 'bail_bond_blog_posts';
export const BLOG_IMAGE_BUCKET = 'bail-bond-blog-images';
export const BLOG_CATEGORIES = ['Bail Guides', 'Bail Costs', 'Bail Process', 'Bond Types', 'Charges & Bail', 'Immigration Bonds', 'Delaware Courts'];
export const DEFAULT_AUTHOR = 'Simone Harris';

// A published row with a future published_at is a scheduled post.
export const postState = (post) => (post.status !== 'published' ? 'draft' : Date.parse(post.publishedAt) > Date.now() ? 'scheduled' : 'published');

export const emptyPost = () => ({
  id: '',
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: BLOG_CATEGORIES[0],
  author: DEFAULT_AUTHOR,
  image: '',
  imageAlt: '',
  ogImage: '',
  seoTitle: '',
  seoDescription: '',
  socialDescription: '',
  primaryKeyword: '',
  secondaryKeywords: [],
  tags: [],
  canonicalUrl: '',
  featured: false,
  status: 'draft',
  publishedAt: '',
  createdAt: '',
  updatedAt: '',
});

export function fromBlogRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || '',
    content: row.content || '',
    category: row.category || BLOG_CATEGORIES[0],
    author: row.author || DEFAULT_AUTHOR,
    image: row.image || '',
    imageAlt: row.image_alt || '',
    ogImage: row.og_image || '',
    seoTitle: row.seo_title || '',
    seoDescription: row.seo_description || '',
    socialDescription: row.social_description || '',
    primaryKeyword: row.primary_keyword || '',
    secondaryKeywords: row.secondary_keywords || [],
    tags: row.tags || [],
    canonicalUrl: row.canonical_url || '',
    featured: Boolean(row.featured),
    status: row.status,
    publishedAt: row.published_at || '',
    createdAt: row.created_at || '',
    updatedAt: row.updated_at || '',
  };
}

export function toBlogRow(post) {
  const clean = (list) => (list || []).map((item) => item.trim()).filter(Boolean);
  return {
    ...(post.id ? { id: post.id } : {}),
    slug: post.slug,
    title: post.title.trim(),
    excerpt: post.excerpt.trim(),
    content: post.content,
    category: post.category,
    author: post.author.trim() || DEFAULT_AUTHOR,
    image: post.image || '',
    image_alt: post.imageAlt || '',
    og_image: post.ogImage || null,
    seo_title: post.seoTitle?.trim() || null,
    seo_description: post.seoDescription?.trim() || null,
    social_description: post.socialDescription?.trim() || null,
    primary_keyword: post.primaryKeyword?.trim() || null,
    secondary_keywords: clean(post.secondaryKeywords),
    tags: clean(post.tags),
    canonical_url: post.canonicalUrl?.trim() || null,
    featured: post.featured,
    status: post.status,
    published_at: post.publishedAt || null,
  };
}

// Shape used by the public blog list and cards (same fields as the static blogPosts array in App.jsx).
export function toListPost(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: `${readMinutes(post.content)} min read`,
    date: (post.publishedAt || '').slice(0, 10),
    image: post.image || '/og-image.webp',
    heroImage: post.image,
    isMagazine: true,
    isDatabase: true,
    content: '',
  };
}

const absolute = (url) => (url && url.startsWith('/') ? `${SITE_ORIGIN}${url}` : url);

// Shape expected by BlogMagazinePillar (same fields as MAGAZINE_POSTS entries) plus BlogPosting/FAQ schema.
export function toMagazinePost(post) {
  const { html, toc, faqs } = renderArticle(post.content);
  const url = `${SITE_ORIGIN}/blog/${post.slug}`;
  const description = post.seoDescription || post.excerpt;
  const image = absolute(post.ogImage || post.image) || `${SITE_ORIGIN}/og-image.jpg`;
  const graph = [
    {
      '@type': 'BlogPosting',
      url,
      mainEntityOfPage: { '@type': 'WebPage', '@id': post.canonicalUrl || url },
      headline: post.title,
      description,
      image,
      inLanguage: 'en-US',
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      ...(post.primaryKeyword ? { keywords: [post.primaryKeyword, ...post.secondaryKeywords].filter(Boolean).join(', ') } : {}),
      author: { '@type': 'Person', name: post.author },
      publisher: { '@type': 'Organization', name: 'A Way to Freedom Bail Bonds', url: `${SITE_ORIGIN}/` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_ORIGIN}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];
  if (faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqs.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })),
    });
  }
  return {
    slug: post.slug,
    title: post.title,
    subtitle: '',
    author: post.author,
    metaTitle: post.seoTitle || post.title,
    metaDescription: description,
    ogDescription: post.socialDescription || description,
    keywords: [post.primaryKeyword, ...post.secondaryKeywords, ...post.tags].filter(Boolean).join(', '),
    canonicalUrl: post.canonicalUrl,
    heroImage: post.image,
    thumbnail: post.image,
    ogImage: post.ogImage || post.image,
    heroAlt: post.imageAlt || post.title,
    heroWidth: 1600,
    heroHeight: 900,
    categoryLabel: post.category,
    readMin: readMinutes(post.content),
    benefits: [],
    tags: post.tags,
    faqs,
    tocEntries: toc,
    articleKey: 'database',
    articleHtml: html,
    customSchema: { '@context': 'https://schema.org', '@graph': graph },
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt || post.publishedAt,
  };
}

// ------------------------------------------------------------
// PUBLIC — live posts only (published and due)
// ------------------------------------------------------------
export async function fetchLivePosts() {
  if (!isSupabaseConfigured()) return [];
  try {
    const { data, error } = await getSupabase()
      .from(BLOG_TABLE)
      .select('*')
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false })
      .limit(500);
    if (error) return [];
    return (data || []).map(fromBlogRow);
  } catch {
    return [];
  }
}

export async function fetchLivePostBySlug(slug) {
  if (!isSupabaseConfigured()) return null;
  try {
    const { data, error } = await getSupabase()
      .from(BLOG_TABLE)
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .lte('published_at', new Date().toISOString())
      .maybeSingle();
    if (error || !data) return null;
    return fromBlogRow(data);
  } catch {
    return null;
  }
}

// ------------------------------------------------------------
// ADMIN — all posts (RLS allows any signed-in admin)
// ------------------------------------------------------------
export async function adminFetchPosts() {
  const { data, error } = await getSupabase().from(BLOG_TABLE).select('*').order('updated_at', { ascending: false });
  if (error) {
    const missing = error.code === 'PGRST205' || error.code === '42P01';
    throw new Error(missing ? 'Blog table not found. Run supabase/blog-schema.sql in the Supabase SQL Editor once.' : 'Could not load blog posts.');
  }
  return (data || []).map(fromBlogRow);
}

export async function adminSavePost(post) {
  const { data, error } = await getSupabase().from(BLOG_TABLE).upsert(toBlogRow(post)).select().single();
  if (error) {
    if (error.code === '23505') throw new Error('Another post already uses this URL slug. Choose a different slug.');
    throw new Error(error.message || 'Could not save the post.');
  }
  return fromBlogRow(data);
}

export async function adminSetVisibility(id, status, publishedAt) {
  const { error } = await getSupabase().from(BLOG_TABLE).update({ status, published_at: publishedAt }).eq('id', id);
  if (error) throw new Error(error.message || 'Could not change the post status.');
}

export async function adminDeletePost(id) {
  const { error } = await getSupabase().from(BLOG_TABLE).delete().eq('id', id);
  if (error) throw new Error(error.message || 'Could not delete the post.');
}

// Resize to max 1600px wide, convert to WebP, upload to the public bucket and return its URL.
export async function uploadBlogImage(file) {
  if (!/^image\/(jpeg|png|webp)$/.test(file.type)) throw new Error('Use a JPG, PNG or WebP image.');
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/webp', 0.82));
  if (!blob) throw new Error('This browser could not convert the image to WebP.');
  const base = file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'blog-image';
  const path = `${new Date().toISOString().slice(0, 7)}/${base}-${Date.now().toString(36)}.webp`;
  const supabase = getSupabase();
  const { error } = await supabase.storage.from(BLOG_IMAGE_BUCKET).upload(path, blob, { contentType: 'image/webp', cacheControl: '31536000' });
  if (error) throw new Error(error.message?.includes('Bucket not found') ? 'Image bucket not found. Run supabase/blog-schema.sql once.' : 'Image upload failed.');
  return supabase.storage.from(BLOG_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}
