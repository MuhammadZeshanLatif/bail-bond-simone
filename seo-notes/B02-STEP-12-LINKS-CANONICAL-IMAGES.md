# Step 12 — Site, links, canonical, cannibalization, and images

## Existing internal links

Use only these verified project routes as contextual links:

| Source/target | Anchor and placement | Reason |
|---|---|---|
| New article → `/blog/how-much-does-a-bail-bond-cost-in-delaware` | “Delaware bail-bond cost guide” in the bail-vs-premium section | Explains general cost without duplicating DV intent. |
| New article → `/blog/bail-bond-process-step-by-step` | “bail-bond process” in the verification/payment section | Supports generic process questions. |
| New article → `/blog/how-do-you-find-out-how-much-someones-bail-is` | “how to find the current bail amount” in the verification checklist | Supports amount-verification intent. |
| New article → `/faq` | “bail-bond FAQs” near the closing CTA | Provides existing general answers. |
| New article → `/contact` | “contact the Delaware bail-bond team” in the restrained CTA | Conversion path using a real route. |
| New article → `/` | Homepage featured-resource/latest-post card or footer resource block | Satisfies mandatory homepage link without forced body copy. |

Add a reciprocal link from `/blog` or the blog index card to the new article after the route is published. Do not invent a service-page URL.

## Canonical and cannibalization

- Recommended canonical: self-reference at `https://delawarebailbond.com/blog/how-much-is-bail-for-domestic-violence-delaware`, after confirming the site’s host and trailing-slash convention.
- Existing blog routes checked in `src/App.jsx` do not target domestic-violence bail directly.
- Consolidate all domestic-violence amount/abuse/assault variants under this one informational URL.
- Keep the commercial `domestic violence bail bonds` intent separate as a future service page; do not publish it as a second cost guide.
- Generic cost, process, refund, and bail-type keywords remain owned by existing articles.
- No cross-canonical is recommended; use merge/re-target instead if a duplicate is later discovered.

## Image plan

| Asset | Purpose and placement | Filename/format/dimensions | Alt text and loading |
|---|---|---|---|
| New hero illustration | Above the article title or first answer; calm, non-sensational courthouse/bail-document visual | `domestic-violence-bail-delaware-hero.webp`, 1600×900, compressed WebP | `Delaware bail documents and courthouse exterior`; eager/priority hero load |
| Cost comparison graphic | Beside or below the bail-vs-premium table | `domestic-violence-bail-cost-comparison.webp`, 1200×800 | `Comparison of court bail amount and bail bond premium`; lazy-load |
| Verification checklist graphic | Below Delaware verification checklist | `delaware-domestic-violence-bail-checklist.webp`, 1200×800 | `Checklist for confirming a Delaware domestic violence bail amount`; lazy-load |
| OG image | Social preview | `domestic-violence-bail-delaware-og.webp`, 1200×630 | Same subject, no keyword-stuffed text; not displayed as body image |

No supplied DV-specific image exists in `public/images`; generate or supply these assets before publication. Do not publish placeholders. Avoid victim imagery, arrest photos, weapons, or sensational visuals.
