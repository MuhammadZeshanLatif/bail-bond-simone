import { useCallback, useEffect, useState } from 'react';
import { MAGAZINE_TOC_ENTRIES } from '../../../blog/magazine-toc-entries';

function groupEntries(entries) {
  const groups = [];
  let current = null;
  for (const entry of entries) {
    if (!entry.sub) {
      current = { main: entry, subs: [] };
      groups.push(current);
    } else if (current) {
      current.subs.push(entry);
    }
  }
  return groups;
}

function findParentGroupId(entries, activeId) {
  let lastParentId = null;
  for (const e of entries) {
    if (!e.sub) lastParentId = e.id;
    else if (e.id === activeId) return lastParentId;
  }
  return null;
}

function TocAccordion({ entries, activeId, onLinkClick }) {
  const groups = groupEntries(entries);
  const [openGroups, setOpenGroups] = useState(() => {
    const initial = new Set();
    groups.forEach(({ main, subs }) => {
      if (subs.length > 0) initial.add(main.id);
    });
    return initial;
  });

  useEffect(() => {
    const parentId = findParentGroupId(entries, activeId);
    if (parentId) {
      setOpenGroups((prev) => {
        if (prev.has(parentId)) return prev;
        const next = new Set(prev);
        next.add(parentId);
        return next;
      });
    }
  }, [activeId, entries]);

  const toggle = (id) =>
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <ul className="bm-toc-list">
      {groups.map(({ main, subs }) => {
        const hasSubs = subs.length > 0;
        const isOpen = openGroups.has(main.id);
        const isActive = activeId === main.id;
        const subIsActive = subs.some((s) => s.id === activeId);

        return (
          <li key={main.id}>
            <div className={hasSubs ? 'bm-toc-group-head' : undefined}>
              <a
                href={`#${main.id}`}
                className={isActive || (!isActive && subIsActive && !isOpen) ? 'bm-toc-link--active' : undefined}
                onClick={onLinkClick}
              >
                {main.prefix && <span className="bm-toc-prefix">{main.prefix}</span>}
                {main.label}
              </a>
              {hasSubs && (
                <button
                  type="button"
                  className="bm-toc-group-toggle"
                  aria-label={isOpen ? 'Collapse' : 'Expand'}
                  aria-expanded={isOpen}
                  onClick={() => toggle(main.id)}
                >
                  <i
                    className={`fas fa-chevron-down bm-toc-group-chevron${isOpen ? ' bm-toc-group-chevron--open' : ''}`}
                    aria-hidden
                  />
                </button>
              )}
            </div>
            {hasSubs && isOpen && (
              <ul className="bm-toc-sublist">
                {subs.map((sub) => (
                  <li key={sub.id} className="bm-toc-subitem">
                    <a
                      href={`#${sub.id}`}
                      className={activeId === sub.id ? 'bm-toc-link--active' : undefined}
                      onClick={onLinkClick}
                    >
                      <span className="bm-toc-prefix">{sub.prefix}</span>
                      {sub.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function MagazineToc({ navigate, onContactClick }) {
  const entries = MAGAZINE_TOC_ENTRIES;
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(entries[0]?.id ?? 'section-1');

  const onScrollSpy = useCallback(() => {
    const ids = entries.map((e) => e.id);
    const headerOffset = 130;
    let current = ids[0];
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= headerOffset) current = id;
    }
    if (current) setActiveId(current);
  }, [entries]);

  useEffect(() => {
    onScrollSpy();
    window.addEventListener('scroll', onScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', onScrollSpy);
  }, [onScrollSpy]);

  const handleLinkClick = (e) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href?.startsWith('#')) {
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setOpen(false);
  };

  return (
    <>
      <button type="button" className="bm-toc-toggle" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        Table of contents
        <i className={`fas fa-chevron-down${open ? ' bm-toc-group-chevron--open' : ''}`} aria-hidden />
      </button>

      <div className={`bm-toc ${open ? 'bm-toc--open' : ''}`}>
        <p className="bm-toc-title">Table of Contents</p>
        <TocAccordion entries={entries} activeId={activeId} onLinkClick={handleLinkClick} />
        <div className="bm-notsure-cta">
          <h4>Need Bail Bond Help Now?</h4>
          <p>Speak with a local agent for fast, clear guidance after an arrest.</p>
          <a
            href="#/contact"
            className="bm-notsure-btn"
            onClick={(e) => {
              e.preventDefault();
              if (onContactClick) onContactClick(e);
              else navigate('/contact');
            }}
          >
            Start the Process →
          </a>
        </div>
      </div>
    </>
  );
}
