import { HARDCODED_BLOG_SLUG, HARDCODED_BLOG_IMAGE } from './hardcoded-static-blog';

export const PILLAR_MAGAZINE_SLUG = HARDCODED_BLOG_SLUG;

export const PILLAR_DEFAULT_HERO = HARDCODED_BLOG_IMAGE;

export const PILLAR_CATEGORY_LABEL = 'Bail Process';

export function usesStaticMagazineArticle(slug) {
  return slug === PILLAR_MAGAZINE_SLUG;
}
