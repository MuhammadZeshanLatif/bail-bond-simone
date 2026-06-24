import { useMemo } from 'react';
import { parseLegacyContent } from '../../../blog/parse-legacy-blog-content';

function SectionBody({ nodes }) {
  const elements = [];
  let listBuffer = [];

  const flushList = (key) => {
    if (listBuffer.length) {
      elements.push(
        <ul key={key}>
          {listBuffer.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
      listBuffer = [];
    }
  };

  nodes.forEach((node, index) => {
    if (node.type === 'ul') {
      flushList(`list-${index}`);
      elements.push(
        <ul key={`ul-${index}`}>
          {node.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
      return;
    }
    flushList(`list-${index}`);
    elements.push(<p key={`p-${index}`}>{node.text}</p>);
  });
  flushList('list-end');

  return elements;
}

export function LegacyMagazineArticle({ content, navigate, onContactClick }) {
  const sections = useMemo(() => parseLegacyContent(content || ''), [content]);

  const handleCta = (e) => {
    e.preventDefault();
    if (onContactClick) onContactClick(e);
    else navigate('/contact');
  };

  return (
    <>
      {sections.map((section) => (
        <section id={section.id} key={section.id}>
          {section.title && <h2>{section.title}</h2>}
          <SectionBody nodes={section.nodes} />
        </section>
      ))}

      <div className="bm-inline-cta bm-inline-cta--magazine">
        <div className="bm-inline-cta-icon" aria-hidden>
          <i className="far fa-calendar-alt bm-icon-gold" style={{ fontSize: '22px' }} />
        </div>
        <h3 className="bm-inline-cta-title">Need Help Right Now?</h3>
        <p className="bm-inline-cta-desc">Call A Way to Freedom Bail Bonds. Available 24/7 for families across Delaware.</p>
        <a href="/contact" className="bm-btn bm-btn--primary bm-btn--full bm-inline-cta-btn" onClick={handleCta}>
          Start the Process
        </a>
      </div>

      <p className="bm-disclaimer">
        <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice.
        For specific legal questions about your case, please consult with a licensed attorney in Delaware.
      </p>
    </>
  );
}
