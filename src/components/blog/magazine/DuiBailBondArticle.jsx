import { DUI_BAIL_BOND_FAQS } from '../../../blog/dui-bail-bond-delaware-blog';
import { ArticleFigure, FaqAccordion, QuickAnswerBox } from './MagazineArticleParts';

const DELAWARE_BAIL_URL = 'https://www.courts.delaware.gov/help/bail/';
const DELAWARE_CODE_URL = 'https://www.delcode.delaware.gov/title11/c021/index.html';
const PREMIUM_LAW_URL = 'https://delcode.delaware.gov/title18/c043/sc02/';
const DMV_FAQ_URL = 'https://dmv.de.gov/DriverServices/faqs/index.shtml?dc=dr_faq_di';

export function DuiBailBondArticle({ navigate, onContactClick }) {
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
        <p className="bm-author-line"><strong>By Simone Harris</strong><br />Licensed Delaware Bail Bond Agent</p>
        <p>
          When someone is arrested for driving under the influence, families often ask one urgent question: how much
          is bail for a DUI in Delaware? There is no single statewide amount. A judicial officer decides the amount,
          bail type, and release conditions after considering the person and the facts of the case.
        </p>
        <p>
          The safest way to plan is to confirm the written bail order before arranging money. This guide explains what
          affects DUI bail, how cash bail differs from a surety bond premium, what information to gather, and which
          separate DMV deadline may require prompt attention.
        </p>
        <QuickAnswerBox>
          <p>
            <strong>Quick answer:</strong> Delaware does not use a fixed DUI bail schedule that can predict every case.
            The court considers appearance risk, charge severity, criminal history, community ties, public safety, and
            the circumstances of the arrest. If surety bail is allowed, the family may pay a licensed bond company&apos;s
            filed premium instead of depositing the full bail amount with the court.
          </p>
        </QuickAnswerBox>
      </section>

      <section id="section-factors">
        <h2>How Does a Delaware Court Determine DUI Bail?</h2>
        <p>
          The court makes an individualized decision. Delaware&apos;s bail law directs the judicial officer to consider
          whether the person is likely to appear, the nature of the charge, prior record, community ties, and public
          safety. The alleged facts can also matter, including an accident, injury, a child passenger, or other charges.
        </p>
        <ul>
          <li>The nature and circumstances of the alleged offense</li>
          <li>The likelihood that the defendant will attend future hearings</li>
          <li>Prior criminal history and previous failures to appear</li>
          <li>Family, employment, residence, and other Delaware community ties</li>
          <li>Potential danger to another person or the community</li>
          <li>Other active cases, warrants, holds, or release conditions</li>
        </ul>
        <p>
          These factors explain why two people facing a DUI charge may receive different decisions. The{' '}
          <a href={DELAWARE_CODE_URL} target="_blank" rel="noopener noreferrer">Delaware Code&apos;s bail provisions</a>{' '}
          and the <a href={DELAWARE_BAIL_URL} target="_blank" rel="noopener noreferrer">Delaware Courts bail guide</a>{' '}
          provide the official framework.
        </p>
      </section>

      <ArticleFigure
        src="/images/blog/delaware-dui-bail-decision-flow.webp"
        alt="Steps for confirming DUI bail and bond costs in Delaware"
        caption="The written Delaware court order controls the bail amount, type, and release conditions at every stage."
      />

      <section id="section-average">
        <h2>Is There an Average Bail for a DUI in Delaware?</h2>
        <p>
          A statewide average is not a reliable estimate for an individual arrest. Delaware&apos;s public guidance explains
          bail types and decision factors, but it does not publish a standard dollar range for every DUI. Online figures
          from another case or state may create a false expectation.
        </p>
        <p>
          Focus on three details: the exact amount on the order, the bail type, and any conditions or holds. If the
          amount is still unknown, use our guide to{' '}
          <a href="/blog/how-do-you-find-out-how-much-someones-bail-is" onClick={(event) => handleNav(event, '/blog/how-do-you-find-out-how-much-someones-bail-is')}>
            find out someone&apos;s exact bail amount
          </a>.
        </p>
      </section>

      <section id="section-types">
        <h2>Which Bail Types May Apply After a DUI Arrest?</h2>
        <p>
          Delaware Courts identifies Own Recognizance, unsecured, secured, and cash-only bail. The label on the order
          changes what must happen before release, so do not assume every stated amount must be paid in cash.
        </p>
        <ul>
          <li><strong>Own Recognizance:</strong> release based on a written promise to appear, subject to the order.</li>
          <li><strong>Unsecured bail:</strong> no security is deposited upfront, but the stated amount may become due after a violation.</li>
          <li><strong>Secured bail:</strong> approved security is required; a surety bond may be an option if the order permits it.</li>
          <li><strong>Cash-only bail:</strong> the amount must be posted in the form required by the court; a commercial surety bond does not replace it.</li>
        </ul>
      </section>

      <section id="section-cost">
        <h2>What Is the Difference Between DUI Bail and Bond Cost?</h2>
        <p>
          Bail is the amount and conditions set by the court. A bail bond premium is the charge for a licensed surety
          company to post an eligible bond. They are not interchangeable numbers, and the bond option depends on the
          type of bail ordered.
        </p>
        <div className="bm-table-wrap">
          <table className="blog-data-table">
            <thead><tr><th>Term</th><th>What it means</th><th>What to verify</th></tr></thead>
            <tbody>
              <tr><td>Bail amount</td><td>The amount set in the court order</td><td>Amount, type, conditions, and other holds</td></tr>
              <tr><td>Cash deposit</td><td>Money posted as directed by the court</td><td>Accepted payer, payment method, receipt, and return rules</td></tr>
              <tr><td>Surety premium</td><td>The bond company&apos;s filed charge for posting an eligible bond</td><td>Filed rate, written agreement, payment terms, and collateral</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          For surety bonds over $1,000, Delaware law provides for a filed premium between 5% and 10% of the bond amount.
          As a calculation example only, a $5,000 eligible surety bond would produce a $250 to $500 premium. That example
          does not predict DUI bail or confirm that a surety bond is allowed in a specific case. Read the{' '}
          <a href={PREMIUM_LAW_URL} target="_blank" rel="noopener noreferrer">Delaware bail bond premium law</a>{' '}
          and our guide to{' '}
          <a href="/blog/how-much-does-a-bail-bond-cost-in-delaware" onClick={(event) => handleNav(event, '/blog/how-much-does-a-bail-bond-cost-in-delaware')}>
            how much a bail bond costs in Delaware
          </a>{' '}for more detail.
        </p>
      </section>

      <section id="section-confirm">
        <h2>How Can a Family Confirm the Exact DUI Bail Amount?</h2>
        <p>
          Start with the written order or an official source connected to the case. A court clerk, detention facility,
          attorney, or licensed bail agent may help confirm the information. Gather the following details before calling:
        </p>
        <ol>
          <li>The defendant&apos;s full legal name and date of birth</li>
          <li>The detention facility or arresting agency</li>
          <li>The booking, case, or complaint number, if available</li>
          <li>The exact bail amount and bond type shown on the order</li>
          <li>Any separate holds, warrants, or release conditions</li>
          <li>The next court date and the court handling the case</li>
        </ol>
        <p>
          Ask for the complete written price and agreement before sending money or signing for collateral. If you need
          help reviewing the release information, you can{' '}
          <a href="/contact" onClick={handleCta}>contact a Delaware bail bond agent</a>.
        </p>
      </section>

      <ArticleFigure
        src="/images/blog/delaware-dui-bail-call-checklist.webp"
        alt="Information families need when calling about a Delaware DUI bail bond"
        caption="Having the defendant and case details ready helps the court, facility, attorney, or licensed bail agent verify the correct order."
      />

      <section id="section-agent-attorney">
        <h2>Should You Call a Bail Agent or a DUI Attorney?</h2>
        <p>
          A licensed bail agent handles an eligible bond and explains the related agreement. A Delaware attorney advises
          on the criminal charge, defenses, hearings, bail-review requests, and DMV consequences. A bail agent cannot
          provide legal advice, and an attorney&apos;s role does not replace the facility&apos;s release process.
        </p>
      </section>

      <section id="section-release">
        <h2>How Long Does Release Take After Bail Is Posted?</h2>
        <p>
          No one can guarantee an exact release time. After a payment or bond is accepted, the facility may need to
          verify documents, update records, check for other holds, return property, and complete its normal discharge
          process. Staffing, time of day, and case complexity can affect the timeline.
        </p>
      </section>

      <section id="section-afford">
        <h2>What If the Family Cannot Afford the Full Amount?</h2>
        <p>
          First confirm the bail type; Own Recognizance or unsecured bail may not require an upfront cash deposit. If
          secured bail permits a surety bond, ask the licensed company for its filed premium, payment terms, collateral
          requirements, and complete written agreement. Payment arrangements are not guaranteed and do not change the
          court order. An attorney may advise whether requesting a bail review is appropriate.
        </p>
      </section>

      <section id="section-dmv">
        <h2>What Delaware DMV Deadline Follows a DUI Arrest?</h2>
        <p>
          The criminal case and the administrative license process are separate. Delaware DMV guidance says a driver
          generally has 15 days after the relevant notice is issued to request an administrative hearing. Read the
          notice immediately because posting bail does not preserve that deadline or resolve the license issue.
        </p>
        <p>
          Review the <a href={DMV_FAQ_URL} target="_blank" rel="noopener noreferrer">Delaware DMV DUI FAQ</a> and speak
          with a qualified Delaware attorney about the specific notice and case.
        </p>
      </section>

      <section id="section-after-release">
        <h2>What Should the Defendant Do After Release?</h2>
        <ul>
          <li>Read and follow every condition in the release order.</li>
          <li>Save the bail, bond, and facility paperwork.</li>
          <li>Record every court date and arrive early.</li>
          <li>Address the DMV notice within the stated deadline.</li>
          <li>Do not drive unless legally authorized to do so.</li>
          <li>Keep the attorney and bond company informed of permitted contact changes.</li>
        </ul>
        <p>
          Posting bail permits release while the case continues; it is not a finding of guilt or innocence. Missing court
          or violating conditions can lead to a warrant, forfeiture proceedings, or other consequences.
        </p>
      </section>

      <section id="section-faq"><h2>Delaware DUI Bail FAQs</h2><FaqAccordion faqs={DUI_BAIL_BOND_FAQS} /></section>

      <section id="section-final">
        <h2>Get the Written Bail Details Before You Pay</h2>
        <p>
          Delaware DUI bail depends on an individualized court decision, so confirm the written amount, bail type,
          conditions, and other holds before arranging payment. A licensed bail agent can explain an eligible surety
          bond, while a Delaware attorney can advise on the criminal and DMV matters. For clear 24/7 help with the
          release process, <a href="/contact" onClick={handleCta}>contact A Way to Freedom Bail Bonds</a>.
        </p>
        <p><strong>Legal disclaimer:</strong> This article provides general information, not legal advice. Laws, procedures, and case circumstances can change. Consult a licensed Delaware attorney about a specific case.</p>
      </section>
    </>
  );
}
