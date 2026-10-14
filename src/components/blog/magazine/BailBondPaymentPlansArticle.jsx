import { Fragment } from 'react';
import { PAYMENT_PLANS_BLOCKS } from '../../../blog/bail-bond-payment-plans-delaware-blog';
import { ArticleFigure, QuickAnswerBox } from './MagazineArticleParts';

const IMAGE_DIR = '/images/blog/how-do-bail-bond-payment-plans-work/';
const DELAWARE_CODE_URL = 'https://delcode.delaware.gov/title18/c043/sc02/index.html';

// Each anchor is linked once, at its first appearance in the article.
const links = [
  ['18 Del. C. § 4347', DELAWARE_CODE_URL],
  ['how do you find out how much someone\'s bail is', '/blog/how-do-you-find-out-how-much-someones-bail-is'],
  ['bail bond process step by step', '/blog/bail-bond-process-step-by-step'],
  ['how much a bail bond costs in Delaware', '/blog/how-much-does-a-bail-bond-cost-in-delaware'],
  ['surety bond cost guide', '/blog/how-much-is-a-surety-bond'],
  ['secured bail vs cash-only bail in Delaware', '/blog/secured-bail-vs-cash-only-bail-delaware'],
  ['do you get bail money back', '/blog/do-you-get-bail-money-back'],
  ['what is unsecured bail in Delaware', '/blog/what-is-unsecured-bail-delaware'],
  ['bail bond payment options', '/services/payment'],
  ['contact A Way to Freedom Bail Bonds', '/contact'],
];

export function BailBondPaymentPlansArticle({ navigate }) {
  const used = new Set();
  const linked = (text) => {
    const match = links.find(([anchor]) => !used.has(anchor) && text.includes(anchor));
    if (!match) return text;
    const [anchor, href] = match;
    used.add(anchor);
    const index = text.indexOf(anchor);
    const external = !href.startsWith('/');
    return <>{linked(text.slice(0, index))}<a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} onClick={external ? undefined : (event) => { event.preventDefault(); navigate(href); }}>{anchor}</a>{linked(text.slice(index + anchor.length))}</>;
  };

  const render = (block, index) => {
    if (block.type === 'image') return <ArticleFigure key={index} src={IMAGE_DIR + block.file} alt={block.alt} caption={block.caption} />;
    if (block.type === 'table') {
      if (block.rows.length === 1) return <QuickAnswerBox key={index}>{block.rows[0].map((text, i) => <Fragment key={i}>{i === 0 ? <strong>{text}: </strong> : linked(text)}</Fragment>)}</QuickAnswerBox>;
      return <div className="bm-table-wrap" key={index}><table className="blog-data-table"><thead><tr>{block.rows[0].map((text, i) => <th scope="col" key={i}>{text}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row, i) => <tr key={i}>{row.map((text, j) => j === 0 ? <th scope="row" key={j}>{text}</th> : <td key={j}>{text}</td>)}</tr>)}</tbody></table></div>;
    }
    if (block.style === 'Heading2') return <h3 key={index}>{block.text}</h3>;
    return <p key={index}>{linked(block.text)}</p>;
  };

  const sections = [];
  let section = { blocks: [] };
  for (const block of PAYMENT_PLANS_BLOCKS) {
    if (block.style === 'Heading1') { sections.push(section); section = { title: block.text, id: block.id, blocks: [] }; }
    else section.blocks.push(block);
  }
  sections.push(section);

  const isListItem = (block) => block?.style === 'ListNumber' || block?.style === 'ListBullet';
  return <>{sections.map((section, index) => <section id={section.id} key={index}>{section.title && <h2>{section.title}</h2>}{section.blocks.map((block, i) => {
    if (isListItem(block)) {
      if (section.blocks[i - 1]?.style === block.style) return null;
      const items = [];
      for (let j = i; section.blocks[j]?.style === block.style; j++) items.push(section.blocks[j]);
      const List = block.style === 'ListNumber' ? 'ol' : 'ul';
      return <List key={i}>{items.map(item => <li key={item.text}>{linked(item.text)}</li>)}</List>;
    }
    return render(block, i);
  })}</section>)}</>;
}
