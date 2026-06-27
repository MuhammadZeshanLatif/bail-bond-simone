import { getRoutesFromSitemap } from './get-routes-from-sitemap.mjs';

/** All public routes from sitemap.xml (single source of truth). */
export const STATIC_ROUTES = getRoutesFromSitemap();

export const SITE_URL = 'https://delawarebailbond.com';
