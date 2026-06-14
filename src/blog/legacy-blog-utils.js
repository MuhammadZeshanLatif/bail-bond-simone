import { buildTocFromSections, parseLegacyContent } from './parse-legacy-blog-content';

const DEFAULT_BENEFITS = [
  { icon: 'fa-clock', label: '24/7 Available', sub: 'Delaware Agents' },
  { icon: 'fa-shield-alt', label: 'Licensed & Insured', sub: 'State Certified' },
  { icon: 'fa-gavel', label: 'Local Guidance', sub: 'Delaware Courts' },
  { icon: 'fa-dollar-sign', label: 'Clear Pricing', sub: 'Bond Cost Explained' },
];

export function buildLegacyMagazinePost(post) {
  const sections = parseLegacyContent(post.content || '');
  const readMin = parseInt(String(post.readTime).replace(/\D/g, ''), 10) || 8;
  const heroImage = post.heroImage || post.image;
  const category = post.category || 'Bail Process';

  return {
    slug: post.slug,
    title: post.title,
    subtitle: post.excerpt,
    metaTitle: `${post.title} | A Way to Freedom Bail Bonds`,
    metaDescription: post.excerpt,
    keywords: `bail bonds, ${category}, Delaware bail bonds, Newark Delaware, Wilmington DE`,
    heroImage,
    thumbnail: post.image || heroImage,
    heroAlt: `${post.title} - Delaware bail bond services by A Way to Freedom`,
    categoryLabel: category,
    readMin,
    benefits: DEFAULT_BENEFITS,
    tags: [category, 'Delaware Bail Bonds', 'Bail Bond Help', 'Newark Delaware', 'Family Guide'].filter(
      (v, i, a) => a.indexOf(v) === i
    ).slice(0, 5),
    faqs: [],
    tocEntries: buildTocFromSections(sections),
    articleKey: 'legacy',
    legacyContent: post.content,
    publishedAt: post.date,
    updatedAt: post.date,
  };
}
