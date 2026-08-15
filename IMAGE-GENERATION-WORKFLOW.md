# Reusable ChatGPT Image Edit Prompt — Blog Hero/Thumbnail Workflow

## Workflow (via browser Playwright automation)
1. Copy source image into `.playwright-mcp/` (Playwright can only access workspace roots).
2. Open ChatGPT (logged in), click "+" → "Upload from computer" or drag-drop onto composer.
3. Type the prompt below, filling the placeholders.
4. Wait for generation, click the generated image → fullscreen → adjust aspect ratio if needed → Save (downloads to `.playwright-mcp/`).
5. Verify dimensions (System.Drawing: expect ratio 1.777 for 16:9, 1.0 for square).
6. Copy into `public/images/blog/`, rename per slug, update metadata (IMAGE/THUMBNAIL/HERO_ALT), rebuild, verify.

## Prompt template
```
Edit this image. Keep the exact same design, colors, layout, background, icons and
overall style. ONLY change the text: the main title should say "[BLOG TITLE]"
and the category label should say "[CATEGORY]". Keep any subtitle exactly the same.
Do not change anything else — no new elements, no added decorations. Output the image
in a wide landscape 16:9 aspect ratio (hero banner style). Make all text perfectly
spelled and cleanly rendered.
```

## Rules learned
- Do NOT change anything but the text (ChatGPT tends to re-draw decorations/people).
- Request 16:9 explicitly; otherwise output defaults to the source image's ratio.
- Ask user to visually verify the image — the model cannot read image content.
- Thumbnail: generate separately via ChatGPT (same prompt, square 1:1) OR crop/resize the hero with System.Drawing.

## Alt tag pattern
`{SEO description fragment} — a guide from A Way to Freedom Bail Bonds` (match HERO_ALT in blog metadata).
