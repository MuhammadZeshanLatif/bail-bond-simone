import { BAIL_VS_BOND_FAQS } from '../../../blog/bail-vs-bond-delaware-blog';
import { FaqAccordion, QuickAnswerBox } from './MagazineArticleParts';

export function BailVsBondArticle({ navigate, onContactClick }) {
  const handleNav = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  const handleCta = (event) => {
    event.preventDefault();
    if (onContactClick) onContactClick(event);
    else navigate('/contact');
  };

  return (
    <>
      <section id="section-intro">
        <p className="bm-author-line"><strong>By Simone Harris</strong><br />Licensed Bail Bond Agent</p>
        <p>
          When a loved one is arrested in Delaware, family members often hear the words <strong>bail</strong> and{' '}
          <strong>bond</strong> used as if they mean the same thing. The two terms are related, but they are not
          interchangeable — and confusing them can lead a family to arrange the wrong payment, wait longer for a
          release, or expect money back that was never refundable.
        </p>
        <QuickAnswerBox>
          <p>
            <strong>Quick answer:</strong> Bail is the amount of money or security the court sets to allow a defendant
            to be released before trial. A bond is the financial guarantee that satisfies that requirement. Cash bail
            is paid in full to the court. A surety bond is posted by a licensed bail bond company in exchange for a
            non-refundable premium — in Delaware, a filed rate generally between 5% and 10% of the bail amount for
            bonds over $1,000.
          </p>
        </QuickAnswerBox>
        <p>
          The right choice depends on the bail amount, the court&apos;s order, and your family&apos;s financial
          situation. This guide explains both options clearly so you can decide what to do next with confidence.
        </p>
      </section>

      <section id="section-what-is-bail">
        <h2>What Is Bail?</h2>
        <p>
          Bail is the amount of money or security set by the court that allows a defendant to be released from
          custody while their case is pending. It is not a fine or a punishment. It is a financial arrangement
          designed to give the defendant an incentive to return for every required court appearance.
        </p>
        <p>
          In Delaware, judges consider several factors when setting bail, including the seriousness of the charge,
          the defendant&apos;s criminal history, their ties to the community, and the risk that they might not return
          to court. The amount is set during the bail hearing or arraignment, and it can be reviewed or changed by the
          court later in the case.
        </p>
        <p>
          The bail amount itself is only one piece of the puzzle. Just as important is the{' '}
          <strong>type of bail</strong> the court orders — cash bail, surety bond, unsecured bond, or own recognizance.
          Each type has different requirements and a different effect on your family&apos;s finances. If you are trying
          to figure out how much was set, read our guide on{' '}
          <a href="/blog/how-do-you-find-out-how-much-someones-bail-is" onClick={(event) => handleNav(event, '/blog/how-do-you-find-out-how-much-someones-bail-is')}>
            how to find out how much someone&apos;s bail is
          </a>.
        </p>
      </section>

      <section id="section-what-is-bond">
        <h2>What Is a Bond?</h2>
        <p>
          A bond is a written, legally binding promise that the full bail amount will be paid if the defendant fails
          to appear in court. When a family uses a bail bond company, the company agrees to post the full bail amount
          with the court on the defendant&apos;s behalf. In exchange, the family pays the company a premium — a
          non-refundable service fee based on the bail amount.
        </p>
        <p>
          There are several types of bonds in Delaware, and the one the court allows depends on the order:
        </p>
        <ul>
          <li><strong>Cash bond:</strong> The full bail amount is paid to the court in cash.</li>
          <li><strong>Surety bond:</strong> A licensed bail bond company posts the bail for a premium.</li>
          <li><strong>Unsecured bond:</strong> A signed promise to appear, without paying money up front.</li>
          <li><strong>Own recognizance (O.R.):</strong> Release on a personal promise to return to court.</li>
        </ul>
        <p>
          If the order permits a surety bond, a licensed Delaware bail agent can help. The agent reviews the case,
          the amount, and any co-signer or collateral requirements before posting the bond. Learn more about how this
          works in our guide to{' '}
          <a href="/blog/how-to-bond-someone-out-of-jail-delaware" onClick={(event) => handleNav(event, '/blog/how-to-bond-someone-out-of-jail-delaware')}>
            bonding someone out of jail in Delaware
          </a>.
        </p>
      </section>

      <section id="section-key-differences">
        <h2>Bail vs Bond: The 5 Key Differences</h2>
        <p>
          Here is the clearest way to separate the two terms — and the two very different ways to get someone out
          of custody.
        </p>
        <div className="bm-table-wrap">
          <table className="blog-data-table">
            <thead><tr><th>Question</th><th>Bail</th><th>Bond</th></tr></thead>
            <tbody>
              <tr><td>What is it?</td><td>The amount set by the court for release.</td><td>The financial guarantee that satisfies the bail requirement.</td></tr>
              <tr><td>Who sets the amount?</td><td>The court, based on the case.</td><td>The bail bond company posts it; the court sets the underlying amount.</td></tr>
              <tr><td>How much do you pay?</td><td>The full bail amount, if paid in cash.</td><td>The premium — generally 5% to 10% in Delaware.</td></tr>
              <tr><td>Do you get money back?</td><td>Cash bail is refunded when the case ends and all appearances are met.</td><td>The premium is not refundable; collateral may be returned.</td></tr>
              <tr><td>Who is responsible?</td><td>The defendant or whoever posts the cash.</td><td>The co-signer shares responsibility for the full amount.</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Put simply: <strong>bail is the amount</strong>, and <strong>a bond is how that amount gets covered</strong>.
          If the court allows a surety bond, a company covers the full amount for a premium so your family does not
          have to pay the entire bail figure out of pocket.
        </p>
      </section>

      <section id="section-cash-vs-surety">
        <h2>Cash Bail vs Surety Bond</h2>
        <p>
          These are the two options families most often compare. Each has a different cost structure and a different
          refund outcome.
        </p>
        <h3>Cash Bail</h3>
        <p>
          With cash bail, the full amount set by the court is paid directly to the court. The money is held until the
          case ends. If the defendant attends every required hearing, the cash is refunded — usually minus any court
          fees or fines ordered as part of the case.
        </p>
        <p>
          The trade-off is that your family must come up with the entire amount up front. For a $10,000 bail, that
          means $10,000 in cash today, tied up until the case concludes.
        </p>
        <h3>Surety Bond</h3>
        <p>
          With a surety bond, a licensed bail bond company posts the full bail amount with the court. The family pays
          the company a premium instead of the full bail figure. Under Delaware law, for surety bonds over $1,000, the
          filed premium must be between 5% and 10% of the bail amount, and at least 5% must be collected before the
          bond is posted.
        </p>
        <p>
          For the same $10,000 bail, a surety bond would generally cost a premium of $500 to $1,000 — a far smaller
          upfront commitment than the full $10,000. The trade-off is that the premium is not refundable, and whoever
          signs as co-signer may be responsible for the full amount if the defendant fails to appear.
        </p>
      </section>

      <section id="section-cost">
        <h2>How Much Does a Bail Bond Cost in Delaware?</h2>
        <p>
          Delaware law is specific about what a bail bond company may charge. For a surety bail bond, the premium must
          match the rate filed with and approved by the state. For surety bonds over $1,000, that filed premium is
          generally between 5% and 10% of the bail amount, and at least 5% must be collected before the bond is posted.
        </p>
        <p>
          Delaware law does not allow unapproved administrative, service, company, or agent fees on top of the filed
          premium. Always ask the agent to explain every charge in writing, and confirm the premium and any collateral
          requirement before you sign. A licensed agent must provide a written contract.
        </p>
        <p>
          Need the full picture on costs, payment plans, and collateral? Read our complete{' '}
          <a href="/blog/how-much-does-a-bail-bond-cost-in-delaware" onClick={(event) => handleNav(event, '/blog/how-much-does-a-bail-bond-cost-in-delaware')}>
            Delaware bail bond cost guide
          </a>.
        </p>
      </section>

      <section id="section-missed-court">
        <h2>What Happens If the Defendant Misses Court?</h2>
        <p>
          Missing a court date is serious under any bail arrangement. The court can issue a bench warrant for the
          defendant&apos;s arrest, and the bail — whether cash paid to the court or a surety bond — can be forfeited.
        </p>
        <p>
          With cash bail, a missed appearance can mean the court keeps the full amount. With a surety bond, the company
          can be required to pay the court the full bail amount, and it can then turn to the co-signer to recover that
          money. Collateral posted for the bond may also be kept.
        </p>
        <p>
          That is why the co-signer&apos;s role matters so much. Before anyone signs, they should understand that they
          are guaranteeing the defendant&apos;s appearance — not just paying a fee. Keep every court date in a calendar
          and contact the court or agent immediately if there is a genuine scheduling problem.
        </p>
      </section>

      <section id="section-refund">
        <h2>Can You Get Your Money Back?</h2>
        <p>
          The refund rules are different for each option, and knowing them before you pay can prevent a painful
          surprise later.
        </p>
        <ul>
          <li><strong>Cash bail:</strong> Refundable at the end of the case, provided the defendant attends every required hearing. Court costs or fines may be deducted.</li>
          <li><strong>Surety bond premium:</strong> Not refundable. It is a service fee paid to the bond company, even if the case is dismissed.</li>
          <li><strong>Collateral:</strong> Returned when the bond is exonerated and the case is closed, as long as all conditions are met.</li>
        </ul>
        <p>
          Ask for the refund and collateral terms <strong>in writing</strong> before signing any agreement. Verbal
          promises are not a substitute for the terms on the contract. If the court ordered an unsecured bond instead,
          read our guide to{' '}
          <a href="/blog/what-is-unsecured-bail-delaware" onClick={(event) => handleNav(event, '/blog/what-is-unsecured-bail-delaware')}>
            unsecured bail in Delaware
          </a> to see how that type works.
        </p>
      </section>

      <section id="section-which-option">
        <h2>Which Option Should You Choose?</h2>
        <p>
          There is no single right answer — the best choice depends on the amount, the court&apos;s order, and what
          your family can manage.
        </p>
        <ul>
          <li><strong>Choose cash bail if</strong> your family can pay the full amount up front and wants the money back when the case ends.</li>
          <li><strong>Choose a surety bond if</strong> the court allows it and you want to avoid tying up the full amount for months.</li>
          <li><strong>Ask about payment plans</strong> if the premium is still more than the family can pay at once.</li>
        </ul>
        <p>
          A licensed Delaware bail agent can review the order, explain the options that apply to the case, and help
          you weigh the trade-offs before any money changes hands.
        </p>
      </section>

      <section id="section-faq"><h2>Bail vs Bond FAQs</h2><FaqAccordion faqs={BAIL_VS_BOND_FAQS} /></section>

      <section id="section-final">
        <h2>Get Clear Guidance Before You Pay</h2>
        <p>
          The difference between bail and bond can be worth thousands of dollars to your family. Understanding which
          option the court allowed — and what it actually costs — is the most important step you can take after an
          arrest.
        </p>
        <p><a href="/contact" onClick={handleCta}>Contact A Way to Freedom Bail Bonds</a> for clear, confidential 24/7 guidance from a licensed Delaware agent.</p>
        <p><strong>Legal disclaimer:</strong> This article is for general information only and is not legal advice. Consult a licensed Delaware attorney for advice about your case.</p>
      </section>
    </>
  );
}
