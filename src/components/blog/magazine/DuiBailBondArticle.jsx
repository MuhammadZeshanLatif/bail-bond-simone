import { DUI_BAIL_BOND_FAQS } from '../../../blog/dui-bail-bond-delaware-blog';
import { FaqAccordion, QuickAnswerBox } from './MagazineArticleParts';

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
        <p className="bm-author-line"><strong>By Simone Harris</strong><br />Licensed Bail Bond Agent</p>
        <p>
          An arrest for driving under the influence (DUI) is stressful and confusing, especially when you are trying to
          figure out how much money it will take to get your loved one home. The bail amount is only part of the story.
          What you actually pay out of pocket depends on the bail type the court allows, whether a licensed agent can
          post a bond, and the filed premium rate.
        </p>
        <QuickAnswerBox>
          <p>
            <strong>Quick answer:</strong> For a first DUI offense in Delaware, bail is commonly set between{' '}
            <strong>$500 and $5,000</strong>. If you use a licensed bail bond company, you pay a premium — in Delaware,
            a filed rate generally between <strong>5% and 10%</strong> of the bail amount for bonds over $1,000 —
            instead of the full amount. For example, on a $2,000 bail, the premium would typically be{' '}
            <strong>$100 to $200</strong>.
          </p>
        </QuickAnswerBox>
        <p>
          This guide explains how DUI bail is set in Delaware, what amounts are typical, what you will actually pay, and
          the urgent deadlines you cannot afford to miss.
        </p>
      </section>

      <section id="section-how-set">
        <h2>How Is DUI Bail Set in Delaware?</h2>
        <p>
          After a DUI arrest in New Castle County, the defendant is usually brought before a magistrate at{' '}
          <strong>Justice of the Peace (JP) Court 11</strong> in Newark, or through the statewide virtual criminal
          hearing system. JP Court 11 operates 24 hours a day, so initial appearances, arraignments, and bail-setting
          hearings happen around the clock — even on weekends and holidays.
        </p>
        <p>
          When the judicial officer sets bail, Delaware law directs them to weigh several factors:
        </p>
        <ul>
          <li>The risk that the defendant will not appear in court</li>
          <li>The type of charge and how serious it is</li>
          <li>The defendant&apos;s criminal history, including any prior DUI or DUS convictions</li>
          <li>How long the defendant has lived in Delaware and their ties to the community</li>
          <li>The safety of the community</li>
          <li>Whether the arrest involved an accident, injury, or a child passenger</li>
        </ul>
        <p>
          A first-time DUI with no accident, a moderate blood alcohol content (BAC), and strong community ties is much
          more likely to result in a moderate bail amount — or even release on personal recognizance. A repeat offense,
          a very high BAC, or a crash involving injury can push bail much higher.
        </p>
      </section>

      <section id="section-amounts">
        <h2>Typical DUI Bail Amounts in Delaware</h2>
        <p>
          DUI bail is set on a case-by-case basis, so there is no fixed price list. Still, most first-offense DUI cases
          fall within a fairly predictable range.
        </p>
        <div className="bm-table-wrap">
          <table className="blog-data-table">
            <thead><tr><th>Situation</th><th>Typical bail range</th></tr></thead>
            <tbody>
              <tr><td>First offense, no accident, moderate BAC</td><td>$500 – $2,500</td></tr>
              <tr><td>First offense with aggravating factors (high BAC, child in car)</td><td>$2,500 – $5,000+</td></tr>
              <tr><td>Second or third offense</td><td>$2,000 – $7,500+</td></tr>
              <tr><td>DUI with serious injury or felony-level charges</td><td>$10,000 – $50,000+</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Three things matter more than the average: the <strong>exact bail amount on the written order</strong>, the{' '}
          <strong>bail type the court allows</strong>, and <strong>who is permitted to post it</strong>. Do not rely on
          what someone heard by phone. If you are trying to confirm the amount, read our guide on{' '}
          <a href="/blog/how-do-you-find-out-how-much-someones-bail-is" onClick={(event) => handleNav(event, '/blog/how-do-you-find-out-how-much-someones-bail-is')}>
            how to find out how much someone&apos;s bail is
          </a>.
        </p>
      </section>

      <section id="section-bail-vs-premium">
        <h2>What You Actually Pay: Bail vs Bond Premium</h2>
        <p>
          The bail amount and the out-of-pocket cost are not the same thing. Understanding the difference can save your
          family thousands of dollars in confusion.
        </p>
        <ul>
          <li><strong>Cash bail:</strong> The full amount is paid to the court and refunded at the end of the case if every appearance is met. On a $3,000 bail, you need $3,000 in cash up front.</li>
          <li><strong>Surety bond:</strong> A licensed bail bond company posts the full bail for a non-refundable premium. In Delaware, that premium is a filed rate generally between <strong>5% and 10%</strong> of the bail amount for bonds over $1,000. On a $3,000 bail, the premium would typically be <strong>$150 to $300</strong> — not $3,000.</li>
        </ul>
        <p>
          The premium is a service fee and is not refunded, even if the case is dismissed. Any collateral you post is
          returned when the bond is exonerated and the case closes.
        </p>
      </section>

      <section id="section-cost-rules">
        <h2>Delaware DUI Bail Bond Cost: The Rules</h2>
        <p>
          Delaware law is specific about what a bail bond company may charge. For a surety bail bond, the premium must
          match the rate filed with and approved by the state. For surety bonds over $1,000, Delaware law sets the total
          filed premium between <strong>5% and 10%</strong>, and at least <strong>5%</strong> must be collected before
          the bond is posted.
        </p>
        <p>
          Delaware law does not allow unapproved administrative, service, company, or agent fees on top of the filed
          premium. If an agent quotes a price that seems inconsistent with the filed rate, ask for it in writing and
          confirm the terms before signing. A licensed agent must provide a written contract.
        </p>
        <p>
          For the complete breakdown of premiums, payment plans, collateral, and refunds, read our{' '}
          <a href="/blog/how-much-does-a-bail-bond-cost-in-delaware" onClick={(event) => handleNav(event, '/blog/how-much-does-a-bail-bond-cost-in-delaware')}>
            Delaware bail bond cost guide
          </a>.
        </p>
      </section>

      <section id="section-cant-afford">
        <h2>What If You Can&apos;t Afford the Premium?</h2>
        <p>
          If the full premium is more than your family can pay in one payment, ask about payment arrangements. Payment
          plans may be available depending on the bond, the applicant, and the written agreement. A payment plan is not
          the same as a discount on the filed premium — the rate is still set by law — but it can spread the cost over a
          manageable schedule.
        </p>
        <p>
          If the bail itself feels unreasonably high, a DUI defense attorney can ask the court to review the amount.
          That is separate from the bail bond process: an attorney advises on the legal case, while a licensed bail
          agent handles the release process. Many families work with both.
        </p>
      </section>

      <section id="section-dmv">
        <h2>Urgent: The 15-Day DMV License Deadline</h2>
        <p>
          A DUI arrest in Delaware triggers two separate processes at the same time: the criminal court case and an
          administrative hearing with the Delaware Division of Motor Vehicles (DMV).
        </p>
        <blockquote className="bm-pullquote">
          <strong>You have only 15 days from the date of the arrest</strong> to request an administrative hearing with
          the DMV. If you miss this deadline, the driver&apos;s license is automatically suspended.
        </blockquote>
        <p>
          Getting out of jail quickly matters here — a released defendant can meet that deadline, consult with an
          attorney, and protect their driving privileges. For the full walkthrough of a DUI arrest in the Wilmington
          area, see our guide to{' '}
          <a href="/blog/traffic-bail-bonds-wilmington-delaware" onClick={(event) => handleNav(event, '/blog/traffic-bail-bonds-wilmington-delaware')}>
            traffic arrest bail bonds in Wilmington
          </a>.
        </p>
      </section>

      <section id="section-after-release">
        <h2>What Happens After Release</h2>
        <p>
          Posting bail gets the defendant out of custody — it does not end the case. After release, the defendant must
          follow every condition in the bond order and attend all future hearings. In DUI cases, conditions can include:
        </p>
        <ul>
          <li>Attending every scheduled court date</li>
          <li>No driving without a valid license</li>
          <li>Installing an ignition interlock device</li>
          <li>Abstaining from alcohol or drugs</li>
          <li>Completing alcohol education or treatment programs</li>
        </ul>
        <p>
          Missing court can lead to a bench warrant and financial responsibility for whoever signed the bond. Put every
          hearing date on a calendar, save the paperwork, and contact the court or agent immediately if there is a
          genuine scheduling problem. For step-by-step guidance, read our article on{' '}
          <a href="/blog/how-to-bond-someone-out-of-jail-delaware" onClick={(event) => handleNav(event, '/blog/how-to-bond-someone-out-of-jail-delaware')}>
            how to bond someone out of jail in Delaware
          </a>.
        </p>
      </section>

      <section id="section-faq"><h2>DUI Bail FAQs</h2><FaqAccordion faqs={DUI_BAIL_BOND_FAQS} /></section>

      <section id="section-final">
        <h2>Act Fast, Get the Facts Right</h2>
        <p>
          The most important step after a DUI arrest is acting quickly and getting the facts right. Confirm the exact
          bail amount and type on the written order, protect the 15-day DMV deadline, and decide whether cash bail or a
          surety bond fits your family&apos;s finances.
        </p>
        <p><a href="/contact" onClick={handleCta}>Contact A Way to Freedom Bail Bonds</a> for clear, confidential 24/7 guidance from a licensed Delaware agent.</p>
        <p><strong>Legal disclaimer:</strong> This article is for general information only and is not legal advice. Consult a licensed Delaware attorney for advice about your case.</p>
      </section>
    </>
  );
}
