import {
  HARDCODED_BLOG_SLUG,
  HARDCODED_BLOG_TITLE,
  HARDCODED_BLOG_SUBTITLE,
  HARDCODED_BLOG_META_TITLE,
  HARDCODED_BLOG_META_DESCRIPTION,
  HARDCODED_BLOG_KEYWORDS,
  HARDCODED_BLOG_IMAGE,
  HARDCODED_BLOG_THUMBNAIL,
  HARDCODED_BLOG_FAQS,
} from './hardcoded-static-blog';
import { MAGAZINE_TOC_ENTRIES } from './magazine-toc-entries';
import {
  BAIL_BOND_COMPANY_SLUG,
  BAIL_BOND_COMPANY_TITLE,
  BAIL_BOND_COMPANY_SUBTITLE,
  BAIL_BOND_COMPANY_META_TITLE,
  BAIL_BOND_COMPANY_META_DESCRIPTION,
  BAIL_BOND_COMPANY_KEYWORDS,
  BAIL_BOND_COMPANY_IMAGE,
  BAIL_BOND_COMPANY_THUMBNAIL,
  BAIL_BOND_COMPANY_HERO_ALT,
  BAIL_BOND_COMPANY_CATEGORY,
  BAIL_BOND_COMPANY_READ_MIN,
  BAIL_BOND_COMPANY_BENEFITS,
  BAIL_BOND_COMPANY_TAGS,
  BAIL_BOND_COMPANY_FAQS,
} from './bail-bond-company-delaware-blog';
import { BAIL_BOND_COMPANY_TOC } from './magazine-toc-bail-bond-company';
import {
  RELEASED_ON_BAIL_SLUG,
  RELEASED_ON_BAIL_TITLE,
  RELEASED_ON_BAIL_SUBTITLE,
  RELEASED_ON_BAIL_META_TITLE,
  RELEASED_ON_BAIL_META_DESCRIPTION,
  RELEASED_ON_BAIL_KEYWORDS,
  RELEASED_ON_BAIL_IMAGE,
  RELEASED_ON_BAIL_THUMBNAIL,
  RELEASED_ON_BAIL_HERO_ALT,
  RELEASED_ON_BAIL_CATEGORY,
  RELEASED_ON_BAIL_READ_MIN,
  RELEASED_ON_BAIL_BENEFITS,
  RELEASED_ON_BAIL_TAGS,
  RELEASED_ON_BAIL_FAQS,
} from './released-on-bail-blog';
import { RELEASED_ON_BAIL_TOC } from './magazine-toc-released-on-bail';

export const MAGAZINE_POSTS = {
  [HARDCODED_BLOG_SLUG]: {
    slug: HARDCODED_BLOG_SLUG,
    title: HARDCODED_BLOG_TITLE,
    subtitle: HARDCODED_BLOG_SUBTITLE,
    metaTitle: HARDCODED_BLOG_META_TITLE,
    metaDescription: HARDCODED_BLOG_META_DESCRIPTION,
    keywords: HARDCODED_BLOG_KEYWORDS,
    heroImage: HARDCODED_BLOG_IMAGE,
    thumbnail: HARDCODED_BLOG_THUMBNAIL,
    heroAlt: 'How bail bonds work in Delaware family guide by Simone Harris',
    categoryLabel: 'Bail Process',
    readMin: 12,
    benefits: [
      { icon: 'fa-clock', label: '24/7 Available', sub: 'Delaware Agents' },
      { icon: 'fa-shield-alt', label: 'Licensed & Insured', sub: 'State Certified' },
      { icon: 'fa-gavel', label: 'Court Process', sub: 'Step-by-Step Guide' },
      { icon: 'fa-dollar-sign', label: 'Clear Pricing', sub: 'Bond Cost Explained' },
    ],
    tags: ['Delaware Bail Bonds', 'Bail Bond Agent', 'Bail Bond Cost', 'Secured Bond', 'Family Guide'],
    faqs: HARDCODED_BLOG_FAQS,
    tocEntries: MAGAZINE_TOC_ENTRIES,
    articleKey: 'how-bail-bonds-work',
    publishedAt: '2026-03-01',
    updatedAt: '2026-03-26',
  },
  [BAIL_BOND_COMPANY_SLUG]: {
    slug: BAIL_BOND_COMPANY_SLUG,
    title: BAIL_BOND_COMPANY_TITLE,
    subtitle: BAIL_BOND_COMPANY_SUBTITLE,
    metaTitle: BAIL_BOND_COMPANY_META_TITLE,
    metaDescription: BAIL_BOND_COMPANY_META_DESCRIPTION,
    keywords: BAIL_BOND_COMPANY_KEYWORDS,
    heroImage: BAIL_BOND_COMPANY_IMAGE,
    thumbnail: BAIL_BOND_COMPANY_THUMBNAIL,
    heroAlt: BAIL_BOND_COMPANY_HERO_ALT,
    categoryLabel: BAIL_BOND_COMPANY_CATEGORY,
    readMin: BAIL_BOND_COMPANY_READ_MIN,
    benefits: BAIL_BOND_COMPANY_BENEFITS,
    tags: BAIL_BOND_COMPANY_TAGS,
    faqs: BAIL_BOND_COMPANY_FAQS,
    tocEntries: BAIL_BOND_COMPANY_TOC,
    articleKey: 'bail-bond-company',
    publishedAt: '2026-06-08',
    updatedAt: '2026-06-08',
  },
  [RELEASED_ON_BAIL_SLUG]: {
    slug: RELEASED_ON_BAIL_SLUG,
    title: RELEASED_ON_BAIL_TITLE,
    subtitle: RELEASED_ON_BAIL_SUBTITLE,
    metaTitle: RELEASED_ON_BAIL_META_TITLE,
    metaDescription: RELEASED_ON_BAIL_META_DESCRIPTION,
    keywords: RELEASED_ON_BAIL_KEYWORDS,
    heroImage: RELEASED_ON_BAIL_IMAGE,
    thumbnail: RELEASED_ON_BAIL_THUMBNAIL,
    heroAlt: RELEASED_ON_BAIL_HERO_ALT,
    categoryLabel: RELEASED_ON_BAIL_CATEGORY,
    readMin: RELEASED_ON_BAIL_READ_MIN,
    benefits: RELEASED_ON_BAIL_BENEFITS,
    tags: RELEASED_ON_BAIL_TAGS,
    faqs: RELEASED_ON_BAIL_FAQS,
    tocEntries: RELEASED_ON_BAIL_TOC,
    articleKey: 'released-on-bail',
    publishedAt: '2026-05-31',
    updatedAt: '2026-05-31',
  },
};

export function getMagazinePost(slug) {
  return MAGAZINE_POSTS[slug] ?? null;
}

export function isMagazinePost(slug) {
  return Boolean(getMagazinePost(slug));
}
