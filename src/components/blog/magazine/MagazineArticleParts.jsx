export function ArticleFigure({ src, alt, caption }) {
  return (
    <figure className="bm-article-figure">
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function FaqAccordion({ faqs }) {
  return (
    <div className="bm-faq-accordion">
      {faqs.map((faq, index) => (
        <details key={faq.question} className="bm-faq-item" open={index === 0}>
          <summary className="bm-faq-summary">
            <h3>{faq.question}</h3>
          </summary>
          <div className="bm-faq-answer">
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

export function QuickAnswerBox({ children }) {
  return <div className="bm-quick-answer">{children}</div>;
}
