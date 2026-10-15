// Markdown → HTML for database blog posts.
// Keep in step with public/blog-router.php (render_body): that is the HTML crawlers see first.

export const HTML_CONTENT_MARKER = '<!--a2f-html-->';
export const SITE_ORIGIN = 'https://delawarebailbond.com';

export const isHtmlContent = (value = '') => value.trimStart().startsWith(HTML_CONTENT_MARKER);
export const stripHtmlMarker = (value = '') => value.replace(HTML_CONTENT_MARKER, '').replace(/^\n/, '');

const escapeHtml = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

export const headingId = (text) => String(text).toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'section';

function safeHref(url) {
  if (url.startsWith('//')) return '';
  if (url.startsWith('/') || url.startsWith('#')) return url;
  return /^(https?:|mailto:|tel:)/i.test(url) ? url : '';
}

// Links, bold and italic on already-escaped text.
function inline(text) {
  let out = '';
  let cursor = 0;
  const linkPattern = /\[([^\]]+)\]\(([^)\s]+)\)/g;
  let match;
  while ((match = linkPattern.exec(text))) {
    out += emphasis(escapeHtml(text.slice(cursor, match.index)));
    const href = safeHref(match[2]);
    const label = emphasis(escapeHtml(match[1]));
    if (href) {
      const external = /^https?:/i.test(href) && !href.startsWith(SITE_ORIGIN);
      out += `<a href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
    } else {
      out += label;
    }
    cursor = match.index + match[0].length;
  }
  return out + emphasis(escapeHtml(text.slice(cursor)));
}

const emphasis = (html) => html
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, '$1<em>$2</em>');

const isTable = (lines) => lines.length >= 2
  && lines.every((line) => /^\|.*\|$/.test(line.trim()))
  && /^(\|\s*:?-{3,}:?\s*)+\|$/.test(lines[1].trim());

const cells = (line) => line.trim().slice(1, -1).split('|').map((cell) => cell.trim());

/**
 * @returns {{ html: string, toc: {id: string, label: string}[], faqs: {question: string, answer: string}[] }}
 */
export function renderArticle(content = '') {
  if (isHtmlContent(content)) {
    const html = stripHtmlMarker(content).replace(/<script\b[\s\S]*?<\/script>/gi, '');
    const toc = [...html.matchAll(/<h2[^>]*?(?:id="([^"]+)")?[^>]*>([\s\S]*?)<\/h2>/gi)]
      .map(([, id, label]) => ({ id: id || headingId(label), label: label.replace(/<[^>]+>/g, '').trim() }));
    return { html, toc, faqs: [] };
  }

  const source = content.replace(/\r\n/g, '\n').replace(/^(#{2,3}\s+[^\n]+)\n(?!\n)/gm, '$1\n\n');
  const blocks = source.split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  const toc = [];
  const faqs = [];
  const usedIds = new Set();
  const uniqueId = (text) => {
    let id = headingId(text);
    for (let n = 2; usedIds.has(id); n++) id = `${headingId(text)}-${n}`;
    usedIds.add(id);
    return id;
  };
  let inFaq = false;
  let html = '';

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const heading = block.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const text = heading[2].trim();
      if (level === 2) inFaq = /frequently asked questions|\bfaqs?\b/i.test(text);
      const next = blocks[i + 1];
      if (inFaq && level === 3 && next && !/^#{2,3}\s/.test(next)) {
        faqs.push({ question: text, answer: next.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*?/g, '') });
        html += `<h3>${inline(text)}</h3><p>${inline(next).replace(/\n/g, '<br>')}</p>`;
        i++;
        continue;
      }
      const id = uniqueId(text);
      if (level === 2) toc.push({ id, label: text });
      html += `<h${level} id="${id}">${inline(text)}</h${level}>`;
      continue;
    }

    const image = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
    if (image) {
      const src = safeHref(image[2]);
      if (src) html += `<figure class="bm-article-figure"><img src="${escapeHtml(src)}" alt="${escapeHtml(image[1])}" loading="lazy" decoding="async">${image[1] ? `<figcaption>${escapeHtml(image[1])}</figcaption>` : ''}</figure>`;
      continue;
    }

    const lines = block.split('\n');
    if (isTable(lines)) {
      const [head, , ...rows] = lines;
      html += '<div class="bm-table-wrap"><table class="blog-data-table"><thead><tr>'
        + cells(head).map((cell) => `<th scope="col">${inline(cell)}</th>`).join('')
        + '</tr></thead><tbody>'
        + rows.map((row) => `<tr>${cells(row).map((cell) => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')
        + '</tbody></table></div>';
      continue;
    }
    if (lines.every((line) => /^[-*]\s+/.test(line))) {
      html += `<ul>${lines.map((line) => `<li>${inline(line.replace(/^[-*]\s+/, ''))}</li>`).join('')}</ul>`;
      continue;
    }
    if (lines.every((line) => /^\d+[.)]\s+/.test(line))) {
      html += `<ol>${lines.map((line) => `<li>${inline(line.replace(/^\d+[.)]\s+/, ''))}</li>`).join('')}</ol>`;
      continue;
    }
    if (lines.every((line) => line.startsWith('>'))) {
      html += `<div class="bm-quick-answer">${inline(lines.map((line) => line.replace(/^>\s?/, '')).join(' '))}</div>`;
      continue;
    }
    html += `<p>${lines.map(inline).join('<br>')}</p>`;
  }

  return { html, toc, faqs };
}

export function readMinutes(content = '') {
  const words = stripHtmlMarker(content).replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}
