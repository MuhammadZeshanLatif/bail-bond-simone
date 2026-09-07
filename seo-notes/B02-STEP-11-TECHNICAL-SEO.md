# Step 11 Technical SEO Plan — Domestic Violence Bail Article

## Platform

The project is a React/Vite site with a prerendering step (`vite build` followed by `scripts/prerender.mjs`). The article must be added as a crawlable prerendered route, not only client-side content.

## Recommended metadata

- Meta title: `How Much Is Bail for Domestic Violence in Delaware?`
- Meta description: Write a 151–159 character description that answers the cost question, distinguishes bail from premium, and mentions Delaware verification.
- Slug: `/blog/how-much-is-bail-for-domestic-violence-delaware`
- Canonical: `https://delawarebailbond.com/blog/how-much-is-bail-for-domestic-violence-delaware` (self-referencing; confirm the live host/trailing-slash convention before deployment).
- Open Graph and Twitter: use the same title/description, canonical URL, and a real 1200×630 image; never publish a placeholder.

## Route and rendering

- Add the article to the existing blog route/data pattern in `src/App.jsx`.
- Ensure the route is included in prerender input and emits complete HTML with one H1, visible article text, canonical, and JSON-LD.
- Preserve existing header, footer, breadcrumb, cards, typography, spacing, and responsive table/FAQ patterns.

## Structured data

- `BlogPosting` or `Article`: visible headline, description, date only when verified, canonical URL, and real image only.
- `FAQPage`: include only the six visible FAQs from the article.
- `BreadcrumbList`: Home → Blog → article, using real URLs.
- Do not invent author credentials, ratings, reviews, organization profiles, dates, or logo URLs.

## Crawl/index and UX checks

- Add the canonical route to sitemap generation and verify it returns HTTP 200.
- Confirm robots.txt does not block the route, CSS, JS, or image assets.
- Add breadcrumb navigation and contextual internal links to existing cost, process, bail-amount, FAQ, Contact, and homepage resources after real URLs are confirmed.
- Make tables horizontally scrollable or stacked on mobile; keep FAQ controls keyboard-accessible with correct button/ARIA behavior.
- Use semantic `article`, heading hierarchy, lists, and table headers; maintain visible focus states and sufficient contrast.
- Preload/priority-load only the hero image; lazy-load below-fold images; compress to modern formats where supported.
- Check LCP, CLS, and INP after prerendering; avoid layout shifts from images or accordions.

## Deployment verification

Run the existing build and static verification scripts, then inspect the rendered route for title, description, canonical, OG/Twitter tags, schema validity, sitemap inclusion, mobile layout, and indexability.
