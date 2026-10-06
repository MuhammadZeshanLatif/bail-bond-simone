import { Fragment } from 'react';
import { SURETY_BOND_COST_BLOCKS } from '../../../blog/surety-bond-cost-delaware-blog';
import { ArticleFigure, QuickAnswerBox } from './MagazineArticleParts';

const links = [
  ['Delaware Code, Title 18, § 4347', 'https://delcode.delaware.gov/title18/c043/#4347'],
  ['what a surety bond means in jail', '/blog/what-is-a-surety-bond-jail'],
  ['do you get bail money back', '/blog/do-you-get-bail-money-back'],
  ['payment options', '/services/payment'],
  ['secured bail vs. cash-only bail in Delaware', '/blog/secured-bail-vs-cash-only-bail-delaware'],
  ['how much a bail bond costs in Delaware', '/blog/how-much-does-a-bail-bond-cost-in-delaware'],
  ['surety bail bond services', '/services/surety'],
  ['contact A Way to Freedom Bail Bonds', '/contact'],
  ['What Is a Surety Bond in Jail?', '/blog/what-is-a-surety-bond-jail'],
  ['Surety Bail Bond Services', '/services/surety'],
  ['Payment Information', '/services/payment'],
  ['How Much Does a Bail Bond Cost in Delaware?', '/blog/how-much-does-a-bail-bond-cost-in-delaware'],
  ['Secured Bail vs. Cash-Only Bail in Delaware', '/blog/secured-bail-vs-cash-only-bail-delaware'],
  ['Do You Get Bail Money Back?', '/blog/do-you-get-bail-money-back'],
];
const images = {
  'Cost example infographic. Illustration only; always confirm the applicable rate and written terms.': ['delaware-surety-bond-cost-examples.webp', 'Delaware surety bail bond cost example showing general statutory percentages', 'The graphic shows the general statutory framework. A Way to Freedom charges 10% total, with at least 5% of the bond amount collected before posting.'],
  'Visual summary only. Specific premium, collateral, refund, and return terms should be confirmed in the written agreement and under applicable Delaware rules.': ['surety-bond-premium-vs-collateral-delaware.webp', 'Difference between a surety bail bond premium and collateral in Delaware', 'Premium and collateral are separate. The graphic shows general rates; A Way to Freedom charges a 10% total premium and collects at least 5% before posting. Confirm collateral return terms in writing.'],
  'Use this visual as a question checklist, not as a price quote or guarantee. Confirm the terms that apply to the specific bond.': ['delaware-surety-bond-before-you-pay-checklist.webp', 'Questions to check before paying for a Delaware surety bail bond', 'Confirm the 10% total premium, minimum 5% collected before posting, payment terms, collateral requirements, and written agreement.'],
};
export function SuretyBondCostArticle({ navigate }) {
  const linked = (text) => {
    const match = links.find(([anchor]) => text.includes(anchor));
    if (!match) return text;
    const [anchor, href] = match;
    const index = text.indexOf(anchor);
    return <>{text.slice(0, index)}<a href={href} onClick={href.startsWith('/') ? (event) => { event.preventDefault(); navigate(href); } : undefined}>{anchor}</a>{linked(text.slice(index + anchor.length))}</>;
  };
  const render = (block, index) => {
    if (block.type === 'table') {
      if (block.rows.length === 1) return <QuickAnswerBox key={index}>{block.rows[0].map((text, i) => <Fragment key={i}>{i === 0 && block.rows[0].length > 1 ? <strong>{text}: </strong> : linked(text)}</Fragment>)}</QuickAnswerBox>;
      return <div className="bm-table-wrap" key={index}><table className="blog-data-table"><thead><tr>{block.rows[0].map(text => <th scope="col" key={text}>{text}</th>)}</tr></thead><tbody>{block.rows.slice(1).map((row, i) => <tr key={i}>{row.map((text, j) => <td key={j}>{text}</td>)}</tr>)}</tbody></table></div>;
    }
    if (images[block.text]) {
      const [file, alt, caption] = images[block.text];
      return <ArticleFigure key={index} src={'/images/blog/how-much-is-a-surety-bond/' + file} alt={alt} caption={caption} />;
    }
    if (block.style === 'Heading2') return <h3 key={index}>{block.text}</h3>;
    return <p key={index}>{linked(block.text)}</p>;
  };
  const sections = [];
  let section = { blocks: [] };
  for (const block of SURETY_BOND_COST_BLOCKS) {
    if (block.style === 'Heading1') { sections.push(section); section = { title: block.text, id: block.id, blocks: [] }; }
    else section.blocks.push(block);
  }
  sections.push(section);
  return <>{sections.map((section, index) => <section id={section.id} key={index}>{section.title && <h2>{section.title}</h2>}{section.blocks.map((block, i) => {
    if (block.style === 'ListNumber') {
      if (section.blocks[i - 1]?.style === 'ListNumber') return null;
      const items = [];
      for (let j = i; section.blocks[j]?.style === 'ListNumber'; j++) items.push(section.blocks[j]);
      return <ol key={i}>{items.map(item => <li key={item.text}>{item.text}</li>)}</ol>;
    }
    return render(block, i);
  })}</section>)}</>;
}
