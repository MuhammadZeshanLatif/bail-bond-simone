import { BAIL_BOND_COST_FAQS, BAIL_BOND_COST_IMAGES } from '../../../blog/bail-bond-cost-delaware-blog';
import { ArticleFigure, FaqAccordion, QuickAnswerBox } from './MagazineArticleParts';

export function BailBondCostDelawareArticle({ navigate, onContactClick }) {
  const handleNav = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  const handleCta = (e) => {
    e.preventDefault();
    if (onContactClick) onContactClick(e);
    else navigate('/contact');
  };

  return (
    <>
      <section id="section-intro">
        <p className="bm-author-line">
          <strong>By Simone Harris</strong>
          <br />
          Licensed Bail Bond Agent
        </p>
        <p>
          When someone you love is in jail, the money question comes fast: how much is this going to cost, what has to be
          paid today, and what happens if the person misses court? Those are fair questions. Families should never feel
          pressured to sign a bail bond agreement before they understand the numbers.
        </p>
        <QuickAnswerBox>
          <p>
            <strong>Quick answer:</strong> In Delaware, the court sets the bail amount. If a surety bail bond is used, the
            premium must match the rate filed with and approved by the Department. For surety bail bonds over $1,000,
            Delaware law says the total filed premium must be at least 5% and not more than 10%. The agent must collect at
            least 5% before posting the bond and provide a written contract.
          </p>
        </QuickAnswerBox>
        <p>
          This guide explains bail bond cost in Delaware in plain English: bail amount vs. bond premium, payment
          arrangements, collateral, refunds, and what to ask before you agree to anything. If you need help right now, call{' '}
          <a href="/contact" onClick={handleCta}>A Way to Freedom Bail Bonds</a> and ask for the cost terms in writing
          before moving forward.
        </p>
      </section>

      <ArticleFigure
        src={BAIL_BOND_COST_IMAGES.checklist}
        alt="Delaware bail bond paperwork and cost checklist"
        caption="The safest first step is to separate the court's bail amount from the bail bond company's premium and written payment terms."
      />

      <section id="section-bail-vs-cost">
        <h2>Bail Amount vs. Bail Bond Cost: They Are Not the Same</h2>
        <p>
          The bail amount is the amount set by the court. The bail bond cost is the premium or approved charge paid to a
          bail bond company if a commercial bond is available and the family chooses to use one.
        </p>
        <div className="bm-table-wrap">
          <table className="blog-data-table">
            <thead>
              <tr>
                <th>Term</th>
                <th>What it means</th>
                <th>Family question to ask</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Court bail amount</td>
                <td>The amount or security set by the court order.</td>
                <td>What exact bail type did the court set?</td>
              </tr>
              <tr>
                <td>Bail bond premium</td>
                <td>The approved charge for a commercial surety bail bond.</td>
                <td>What filed premium applies to this bond?</td>
              </tr>
              <tr>
                <td>Amount due before posting</td>
                <td>The amount that must be collected before the bond is posted.</td>
                <td>What is due today before release can start?</td>
              </tr>
              <tr>
                <td>Collateral</td>
                <td>Extra security that may be requested in some cases.</td>
                <td>Is collateral required, and when is it released?</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          If you do not know the bail amount yet, start with our guide on{' '}
          <a href="/blog/how-do-you-find-out-how-much-someones-bail-is" onClick={(e) => handleNav(e, '/blog/how-do-you-find-out-how-much-someones-bail-is')}>
            how to find out how much someone&apos;s bail is
          </a>
          . The cost conversation gets easier once you know the amount and bond type.
        </p>
      </section>

      <section id="section-premium">
        <h2>What Delaware Law Says About Surety Bail Bond Premiums</h2>
        <p>
          Delaware law does not let a bail agent simply make up a price. The premium rate or charge must match the rate
          filed with and approved by the Department. For a surety bail bond over $1,000, the total filed premium must be
          between 5% and 10% of the surety bail bond amount.
        </p>
        <p>
          Delaware law also says a bail agent may not post a surety bail bond without first collecting at least 5% of the
          bond amount and entering into a written contract signed by the parties. That written contract should contain the
          terms and conditions of the bond.
        </p>
        <blockquote className="bm-pullquote">
          Good cost advice is boring on purpose: ask for the filed premium, the amount due before posting, every payment
          term, and a receipt. If the answer feels vague, slow down.
        </blockquote>
        <p>
          For bond-type context, see our pages on{' '}
          <a href="/services/surety" onClick={(e) => handleNav(e, '/services/surety')}>surety bail bonds Delaware</a>{' '}
          and <a href="/services/secured" onClick={(e) => handleNav(e, '/services/secured')}>secured bail Delaware</a>.
        </p>
      </section>

      <section id="section-examples">
        <h2>Simple Bail Bond Cost Examples</h2>
        <p>
          These examples are only to explain the math. The actual amount depends on the court order, bond type, filed
          premium, written agreement, and case details.
        </p>
        <div className="bm-table-wrap">
          <table className="blog-data-table">
            <thead>
              <tr>
                <th>Court bail amount</th>
                <th>5% example</th>
                <th>10% example</th>
                <th>What to confirm</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>$2,000</td><td>$100</td><td>$200</td><td>Filed rate and amount due before posting</td></tr>
              <tr><td>$5,000</td><td>$250</td><td>$500</td><td>Premium, payment terms, and receipts</td></tr>
              <tr><td>$10,000</td><td>$500</td><td>$1,000</td><td>Co-signer and collateral responsibility</td></tr>
              <tr><td>$25,000</td><td>$1,250</td><td>$2,500</td><td>Full written agreement before signing</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Do not treat a payment plan as a discount. A payment plan may spread out approved charges, but it should still
          be written clearly so the co-signer knows what is due and when.
        </p>
      </section>

      <section id="section-payment-plans">
        <h2>Can You Get a Payment Plan for a Bail Bond in Delaware?</h2>
        <p>
          Payment arrangements may be available depending on the bond, the applicant, and the written agreement. Families
          often ask about a smaller initial payment, scheduled payments, or what documentation is needed. The answer can
          vary because every bond creates risk for the bail bond company and responsibility for the co-signer.
        </p>
        <p>Before agreeing to a payment plan, ask:</p>
        <ul>
          <li>What amount is due before the bond is posted?</li>
          <li>What is the total premium or approved charge?</li>
          <li>What dates are payments due?</li>
          <li>What happens if a payment is missed?</li>
          <li>Will I receive a written agreement and receipts?</li>
        </ul>
        <p>
          If payment is the main issue, review our service page for{' '}
          <a href="/services/payment" onClick={(e) => handleNav(e, '/services/payment')}>bail bond payment plans Delaware</a>.
        </p>
      </section>

      <ArticleFigure
        src={BAIL_BOND_COST_IMAGES.bailTypes}
        alt="Delaware bail types guide for cash, secured, unsecured, and surety bail"
        caption="Cost depends heavily on the bail type. Unsecured, secured, cash-only, and surety bail do not all work the same way."
      />

      <section id="section-collateral">
        <h2>Will You Need Collateral?</h2>
        <p>
          Collateral is extra security that may be requested in some cases. It can depend on the bond amount, case details,
          defendant history, co-signer strength, and the agency&apos;s underwriting rules. Not every bond requires collateral,
          but families should ask about it clearly before signing.
        </p>
        <p>Ask these questions in writing:</p>
        <ul>
          <li>Is collateral required for this bond?</li>
          <li>What exact property or asset is being listed?</li>
          <li>When can collateral be released?</li>
          <li>What could cause collateral to be used or kept?</li>
          <li>Who is financially responsible if the defendant misses court?</li>
        </ul>
      </section>

      <section id="section-refunds">
        <h2>Is Bail Bond Money Refundable?</h2>
        <p>
          This is where many families get confused. Money posted directly with the court and money paid to a commercial
          bail bond company are not the same thing. A bail bond premium is generally a service fee. Cash posted directly
          with the court may follow court refund rules if the defendant meets all court requirements.
        </p>
        <p>
          If you are comparing cash bail and a commercial bond, read{' '}
          <a href="/blog/what-is-cash-bond" onClick={(e) => handleNav(e, '/blog/what-is-cash-bond')}>what is a cash bond</a>{' '}
          before deciding. The lowest upfront option is not always the same as the lowest total risk.
        </p>
      </section>

      <section id="section-questions">
        <h2>Questions to Ask Before You Pay</h2>
        <p>Before you sign a bond agreement or send money, ask the bail agent to explain:</p>
        <ul>
          <li>The defendant&apos;s full bail amount and bond type</li>
          <li>The filed premium or approved charge</li>
          <li>The amount due before the bond is posted</li>
          <li>Whether any payment arrangement is available</li>
          <li>Whether collateral is required</li>
          <li>What documents you will sign</li>
          <li>What receipts you will receive</li>
          <li>What the co-signer is responsible for if court is missed</li>
        </ul>
        <p>
          If you feel rushed, pause and ask for the explanation again. A good bail bond process should make the money
          clearer, not more confusing.
        </p>
      </section>

      <section id="section-local">
        <h2>Local Cost Help in Wilmington, Newark, and New Castle County</h2>
        <p>
          A Way to Freedom Bail Bonds helps Delaware families understand bail costs, payment questions, and paperwork in
          the areas we serve. If your question is location-specific, these pages may help:
        </p>
        <ul>
          <li><a href="/wilmington-de-bail-bonds" onClick={(e) => handleNav(e, '/wilmington-de-bail-bonds')}>Wilmington DE bail bonds</a></li>
          <li><a href="/newark-de-bail-bonds" onClick={(e) => handleNav(e, '/newark-de-bail-bonds')}>Newark DE bail bonds</a></li>
          <li><a href="/new-castle-county-bail-bonds" onClick={(e) => handleNav(e, '/new-castle-county-bail-bonds')}>New Castle County bail bonds</a></li>
        </ul>
      </section>

      <section id="section-faq">
        <h2>Bail Bond Cost FAQs</h2>
        <FaqAccordion faqs={BAIL_BOND_COST_FAQS} />
      </section>

      <section id="section-final">
        <h2>Final Step: Get the Cost Terms in Writing</h2>
        <p>
          The fastest way to avoid confusion is simple: confirm the bail amount, confirm the bond type, ask what is due
          before posting, and get the payment terms in writing. If you do not know the amount yet, call anyway and ask
          what information should be checked next.
        </p>
        <p>
          For calm help now, call A Way to Freedom Bail Bonds or use the{' '}
          <a href="/contact" onClick={handleCta}>contact page</a>. We will help you understand what the court ordered,
          what the paperwork means, and what questions to ask before moving forward.
        </p>
        <p>
          <strong>Legal disclaimer:</strong> This article is for general information only and is not legal advice. For
          questions about charges, court strategy, or legal rights, speak with a Delaware-licensed attorney.
        </p>
      </section>
    </>
  );
}
