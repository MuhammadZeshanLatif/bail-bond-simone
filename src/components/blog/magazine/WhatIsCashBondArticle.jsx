import { WHAT_IS_CASH_BOND_FAQS } from '../../../blog/what-is-cash-bond-blog';
import { FaqAccordion, QuickAnswerBox } from './MagazineArticleParts';

export function WhatIsCashBondArticle({ navigate, onContactClick }) {
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
          Hearing the term &quot;cash bond&quot; for the first time can be confusing, especially if someone you know has been arrested or you&apos;re trying to understand a news story. Many people aren&apos;t sure what a cash bond is, who has to pay it, or whether they&apos;ll get that money back. These questions are common because legal terms often sound more complicated than they really are.
        </p>
        <p>
          A cash bond is one of the ways a person can be released from jail while waiting for their court date. Understanding how it works, who can pay it, and what happens afterward can help you make informed decisions and avoid costly mistakes. This guide explains everything in simple language, without confusing legal jargon.
        </p>
      </section>

      <section id="section-quick-answer">
        <h2>What Is a Cash Bond? (Quick Answer)</h2>
        <QuickAnswerBox>
          <p>
            A cash bond is the full amount of bail paid directly to the court to secure a person&apos;s release from jail. If the defendant follows all court requirements and appears at every scheduled hearing, the money is generally returned after the case is finished.
          </p>
        </QuickAnswerBox>
      </section>

      <section id="section-how-it-works">
        <h2>How Does a Cash Bond Work?</h2>
        <p>The cash bond process is usually straightforward and follows these steps:</p>
        <ol className="bm-numbered-list">
          <li>A person is arrested and taken into custody.</li>
          <li>A judge decides whether bail will be granted and sets the amount.</li>
          <li>The full cash bond amount is paid directly to the court.</li>
          <li>The defendant is released from jail.</li>
          <li>The defendant must attend every required court appearance.</li>
          <li>After the case ends, the court determines whether the bond should be refunded.</li>
        </ol>
        <p>
          The purpose of a cash bond is to encourage the defendant to appear in court while allowing them to remain out of jail during the legal process.
        </p>
      </section>

      <section id="section-who-pays">
        <h2>Who Can Pay a Cash Bond?</h2>
        <p>In most situations, the cash bond can be paid by:</p>
        <ul>
          <li>The defendant</li>
          <li>A family member</li>
          <li>A friend</li>
          <li>Another responsible adult</li>
          <li>A licensed bail agent in Delaware</li>
        </ul>
        <p>The court may require identification and may only accept certain payment methods depending on local court rules.</p>
      </section>

      <section id="section-delaware-agent">
        <h2>Cash Bond Through a Licensed Bail Agent in Delaware</h2>
        <p>
          In the State of Delaware, a cash bond can also be paid by a licensed bail agent at a fee of typically 30 percent.
        </p>
        <p>
          For a cash bail, the fee is 20% to 30% of the total cash bail amount, depending on the circumstances of the case.
          This fee is non-refundable and is the cost for the bail bond agent company to post the cash bail on the defendant&apos;s
          behalf in the State of Delaware.
        </p>
        <p>
          This option can help families who cannot pay the full cash bail amount directly to the court upfront.
        </p>
      </section>

      <section id="section-refund">
        <h2>Do You Get Your Cash Bond Money Back?</h2>
        <p>In many cases, yes.</p>
        <p>
          If the defendant appears for every court hearing and follows all court-ordered conditions, the cash bond is generally refunded once the case has been completed.
        </p>
        <p>
          However, the refund may not be issued immediately. Depending on the court, it may take several weeks or even months to process the payment after the case is closed.
        </p>
        <p>If the defendant violates the court&apos;s conditions or fails to appear, part or all of the cash bond may be forfeited.</p>
      </section>

      <section id="section-miss-court">
        <h2>What Happens If You Miss Court?</h2>
        <p>Missing a scheduled court appearance can have serious consequences.</p>
        <p>The court may:</p>
        <ul>
          <li>Issue a warrant for the defendant&apos;s arrest.</li>
          <li>Keep some or all of the cash bond.</li>
          <li>Set additional conditions for future release.</li>
          <li>Increase the bail amount if another release is granted.</li>
        </ul>
        <p>Attending every court date is one of the most important responsibilities after being released on a cash bond.</p>
      </section>

      <section id="section-vs-bail">
        <h2>Cash Bond vs. Bail vs. Bail Bond</h2>
        <p>These legal terms are often confused, but they have different meanings.</p>
        <p><strong>Cash Bond</strong></p>
        <p>
          A cash bond means the entire bail amount is paid directly to the court, or a licensed bail agent in Delaware can
          post cash bail on the defendant&apos;s behalf for a non-refundable fee of typically 20% to 30% of the total cash
          bail amount.
        </p>
        <p><strong>Bail</strong></p>
        <p>Bail is the amount of money or security set by a judge to allow temporary release from jail.</p>
        <p><strong>Bail Bond</strong></p>
        <p>A bail bond is provided by a bail bond company, which pays the bail on the defendant&apos;s behalf in exchange for a non-refundable fee.</p>
        <p>Knowing the difference helps you understand which option may apply in a particular case.</p>
      </section>

      <section id="section-types">
        <h2>Types of Bonds in the United States</h2>
        <p>Courts may use different types of bonds depending on the circumstances of the case.</p>
        <h3>Cash Bond</h3>
        <p>The full bail amount is paid directly to the court.</p>
        <h3>Surety Bond</h3>
        <p>A licensed bail bond company guarantees the bail amount after charging a fee.</p>
        <h3>Property Bond</h3>
        <p>Real estate or other valuable property is used as collateral instead of cash.</p>
        <h3>Release on Recognizance (ROR)</h3>
        <p>The defendant is released without paying money after promising to return for all court appearances.</p>
      </section>

      <section id="section-example">
        <h2>Real-Life Example of a Cash Bond</h2>
        <p>Imagine Sarah&apos;s brother is arrested for a non-violent offense. The judge sets a cash bond of $7,500.</p>
        <p>
          Sarah pays the full amount directly to the court. Her brother is released the same day and attends every required court hearing over the next several months.
        </p>
        <p>
          When the case is finished, the court returns the cash bond according to its procedures because all court requirements were met.
        </p>
        <p>If he had failed to appear in court, Sarah could have lost some or all of the money she paid.</p>
      </section>

      <section id="section-faq">
        <h2>Frequently Asked Questions About Cash Bonds</h2>
        <FaqAccordion faqs={WHAT_IS_CASH_BOND_FAQS} />
      </section>

      <section id="section-final">
        <h2>Final Thoughts</h2>
        <p>
          A cash bond gives eligible defendants the opportunity to remain out of jail while their case moves through the court system, but it also comes with important responsibilities. Understanding how a cash bond works, when it is refunded, and what can cause it to be forfeited can help you make informed decisions and avoid unnecessary financial loss during an already stressful situation.
        </p>
        <div className="bm-inline-cta bm-inline-cta--magazine">
          <div className="bm-inline-cta-icon" aria-hidden>
            <i className="far fa-calendar-alt bm-icon-gold" style={{ fontSize: '22px' }} />
          </div>
          <h3 className="bm-inline-cta-title">Need Help Right Now?</h3>
          <p className="bm-inline-cta-desc">
            Call A Way to Freedom Bail Bonds. Available 24/7 for families in New Castle and Kent County, Delaware.
          </p>
          <a href="/contact" className="bm-btn bm-btn--primary bm-btn--full bm-inline-cta-btn" onClick={handleCta}>
            Start the Process
          </a>
        </div>
        <p className="bm-disclaimer">
          <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice.
          For specific legal questions about your case, please consult with a licensed attorney.
        </p>
      </section>
    </>
  );
}
