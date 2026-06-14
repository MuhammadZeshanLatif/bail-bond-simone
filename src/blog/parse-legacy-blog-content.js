function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function preprocessLegacyContent(raw) {
  let text = raw.trim().replace(/\r\n/g, '\n');
  text = text.replace(/\n---[\s\S]*$/m, '');
  text = text.replace(/(\d+\.\s+[A-Za-z][^\n]{0,60}?)([A-Z][a-z])/g, '$1\n\n$2');
  text = text.replace(/:\s*-\s/g, ':\n- ');
  text = text.replace(/:-/g, ':\n- ');
  return text;
}

function isHeadingLine(line) {
  if (!line || line.startsWith('- ')) return false;
  if (line.length > 95) return false;
  if (/^\d+\.\s+[A-Za-z]/.test(line) && line.length < 70) return true;
  if (line.endsWith(':') && line.split(/\s+/).length <= 8) return true;
  if (/^[A-Z]/.test(line) && !line.endsWith('.') && line.split(/\s+/).length <= 12) return true;
  if (/^[A-Z][^.!?]*$/.test(line) && line.split(/\s+/).length <= 10) return true;
  return false;
}

export function parseLegacyContent(raw) {
  const text = preprocessLegacyContent(raw);
  const lines = text.split('\n');
  const sections = [];
  let current = { id: 'section-intro', title: null, nodes: [] };
  let listItems = [];

  const flushList = () => {
    if (listItems.length) {
      current.nodes.push({ type: 'ul', items: [...listItems] });
      listItems = [];
    }
  };

  const flushSection = () => {
    flushList();
    if (current.title || current.nodes.length) sections.push(current);
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      continue;
    }
    if (trimmed.startsWith('- ')) {
      listItems.push(trimmed.slice(2));
      continue;
    }
    if (isHeadingLine(trimmed)) {
      flushSection();
      const title = trimmed.replace(/:$/, '');
      current = { id: slugify(title) || `section-${sections.length + 1}`, title, nodes: [] };
      continue;
    }
    flushList();
    current.nodes.push({ type: 'p', text: trimmed });
  }
  flushSection();

  return sections.filter((s) => s.title || s.nodes.length);
}

export function buildTocFromSections(sections) {
  const withTitles = sections.filter((s) => s.title);
  if (withTitles.length === 0) {
    return [{ id: 'section-intro', prefix: '1.', label: 'Introduction' }];
  }
  const toc = [];
  if (sections.some((s) => !s.title && s.nodes.length)) {
    toc.push({ id: 'section-intro', prefix: '1.', label: 'Introduction' });
  }
  withTitles.forEach((s, i) => {
    toc.push({
      id: s.id,
      prefix: `${toc.length + 1}.`,
      label: s.title,
    });
  });
  return toc;
}
