import React from 'react';

// Renders a database blog post's pre-rendered HTML (see lib/blogMarkdown.js) and keeps
// internal links inside the single-page app.
export function DatabaseArticle({ html, navigate }) {
  const handleClick = (event) => {
    const link = event.target.closest('a');
    const href = link?.getAttribute('href');
    if (!href || link.target === '_blank' || !href.startsWith('/') || href.startsWith('//')) return;
    event.preventDefault();
    navigate(href);
  };

  return <div className="bm-db-article" onClick={handleClick} dangerouslySetInnerHTML={{ __html: html }} />;
}
