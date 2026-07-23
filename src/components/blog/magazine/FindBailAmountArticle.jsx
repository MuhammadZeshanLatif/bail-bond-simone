import { FIND_BAIL_AMOUNT_FAQS } from '../../../blog/find-bail-amount-delaware-blog';
import { ArticleFigure, FaqAccordion, QuickAnswerBox } from './MagazineArticleParts';

export function FindBailAmountArticle({ navigate, onContactClick }) {
  const handleCta = (e, targetPath = '/contact') => {
    e.preventDefault();
    if (onContactClick && targetPath === '/contact') onContactClick(e);
    else navigate(targetPath);
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
          When someone is arrested, one of the first questions family and friends ask is simple: how do you find out how much someone&apos;s bail is? In Delaware, the fastest path is to gather the person&apos;s full legal name, date of birth, and where they were arrested or are being held, then check with the court, holding facility, attorney, or a licensed Delaware bail bond agent.
        </p>
        <p>
          The hard part is that bail information is not always available immediately. Bail may need to be set at an initial appearance or arraignment first, and the amount can depend on the charge, court, release conditions, and the type of bail ordered. This guide explains what to check, what to ask, and how Delaware bail types work so you can take the next step with less confusion.
        </p>
        <QuickAnswerBox>
          <p>
            <strong>Quick answer:</strong> To find out how much someone&apos;s bail is in Delaware, start with the person&apos;s full legal name, date of birth, and arrest location. Then contact the jail or holding facility, the court handling the case, the person&apos;s attorney, or a licensed Delaware bail bond agent. Ask whether bail has been set, the bail amount, and the bail type.
          </p>
        </QuickAnswerBox>
      </section>

      <section id="section-info">
        <h2>What Information Do You Need Before You Call?</h2>
        <p>Before calling a court, facility, attorney, or bail bond company, collect as much basic information as possible. This helps the person on the other end look up the correct case and avoid confusion with similar names.</p>
        <p>Try to gather:</p>
        <ul>
          <li>The person&apos;s full legal name</li>
          <li>Date of birth</li>
          <li>Approximate age</li>
          <li>Arrest date or time</li>
          <li>City or county where the arrest happened</li>
          <li>Arresting agency, if known</li>
          <li>Jail or holding facility, if known</li>
          <li>Case number, complaint number, or court number, if available</li>
          <li>The charge or general type of charge, if known</li>
          <li>Whether the person has already seen a judge</li>
        </ul>
        <p>Do not panic if you do not have every detail. A full legal name and date of birth are usually the best starting point. If you only know a nickname, the search may take longer.</p>
        <ArticleFigure
          src="/images/how-do-you-find-out-how-much-someones-bail-is/delaware-bail-amount-call-checklist.webp"
          alt="Delaware bail amount call checklist with full name date of birth and jail location"
          caption="Having the correct name, date of birth, and location can make it easier to ask whether bail has been set."
        />
      </section>

      <section id="section-where-check">
        <h2>Where Can You Check Bail Amounts in Delaware?</h2>
        <p>There is no single answer that works for every case. The right place to check depends on where the person is being held and whether the court has already set bail.</p>

        <h3>Call the Holding Facility or Jail</h3>
        <p>If you know where the person is being held, call the facility and ask whether bail has been set. Be polite and specific.</p>
        <ul>
          <li>Is this person currently in custody?</li>
          <li>Has bail been set yet?</li>
          <li>What is the bail amount?</li>
          <li>What type of bail was ordered?</li>
          <li>Are there any release conditions?</li>
          <li>Is this a cash-only bond, secured bond, unsecured bond, or own recognizance release?</li>
          <li>Which court is handling the case?</li>
        </ul>
        <p>The facility may not always be able to give every detail over the phone. They may direct you to the court, attorney, or official records.</p>

        <h3>Contact the Court Handling the Case</h3>
        <p>If you know the court, contact the clerk&apos;s office or check the court&apos;s available public information. Delaware cases may involve different courts depending on the charge and stage of the case.</p>
        <ul>
          <li>Justice of the Peace Court</li>
          <li>Court of Common Pleas</li>
          <li>Superior Court</li>
          <li>Family Court, where relevant</li>
        </ul>
        <p>The court may be able to confirm whether bail was set and whether paperwork has been issued. For some matters, information may not be available right away.</p>

        <h3>Ask About the Bond/Order to Appear</h3>
        <p>Delaware Courts explain that after certain court events, a person may receive a Bond/Order to Appear. This document can include important information such as the type of bail and the bail amount, if bail was ordered.</p>
        <p>If your loved one has paperwork, ask them or their attorney whether the Bond/Order to Appear lists bail amount, bail type, court date, release conditions, and the location for the next court appearance.</p>

        <h3>Speak With the Person&apos;s Attorney</h3>
        <p>If the person already has an attorney, the attorney may know whether bail has been set and what conditions apply. An attorney can also explain legal options, which a bail bond company cannot do.</p>

        <h3>Call a Licensed Delaware Bail Bond Agent</h3>
        <p>A licensed Delaware bail bond agent may be able to help you understand what information to gather, what the bail type means, and whether a commercial bail bond may be an option.</p>
        <p>A bail bond agent cannot change the bail amount, promise a release time, or give legal advice. But once bail is set, an agent can often explain the next practical steps.</p>
        <div className="bm-inline-cta bm-inline-cta--magazine">
          <div className="bm-inline-cta-icon" aria-hidden><i className="far fa-calendar-alt bm-icon-gold" style={{ fontSize: '22px' }} /></div>
          <h3 className="bm-inline-cta-title">Need help understanding a Delaware bond?</h3>
          <p className="bm-inline-cta-desc">If bail has been set and you need help understanding options, A Way to Freedom Bail Bonds can help you ask the right questions and move through the process calmly.</p>
          <a href="/contact" className="bm-btn bm-btn--primary bm-btn--full bm-inline-cta-btn" onClick={(e) => handleCta(e, '/contact')}>Contact A Way to Freedom</a>
        </div>
      </section>

      <section id="section-bail-set">
        <h2>Has Bail Been Set Yet?</h2>
        <p>Sometimes the reason you cannot find the amount is simple: bail has not been set yet.</p>
        <p>After an arrest, the person may need to appear before a judicial officer. Depending on the case and timing, bail may be addressed during an initial appearance or arraignment. Until that happens, the facility may not have an amount to give you.</p>
        <p>If bail has not been set yet, ask when the initial appearance is, which court will handle it, whether paperwork will show the bond amount and type, and who should be contacted after the hearing.</p>
      </section>

      <section id="section-cost-difference">
        <h2>Bail Amount vs. Bond Type vs. Out-of-Pocket Cost</h2>
        <p>Many people hear a bail amount and assume that is the exact amount they must pay immediately. That is not always true.</p>
        <h3>Bail Amount</h3>
        <p>This is the amount set by the court. For example, bail may be set at $5,000, $10,000, or another amount depending on the case.</p>
        <h3>Bond Type</h3>
        <p>This tells you what kind of release the court ordered. A secured bond, unsecured bond, cash-only bond, or own recognizance release can each work differently.</p>
        <h3>Out-of-Pocket Cost</h3>
        <p>This is what a family may need to pay upfront, if anything. The cost depends on the bail type, whether a commercial bail bond is available, collateral requirements, and the terms of the bond.</p>
        <p>This is why asking only “how much is bail?” is not enough. You also need to ask, “What type of bail is it?”</p>
      </section>

      <section id="section-bail-types">
        <h2>Delaware Bail Types Explained</h2>
        <p>Delaware Courts describe several bail types. The exact wording and requirements can depend on the court order, so always verify the details in the specific case.</p>
        <ArticleFigure
          src="/images/how-do-you-find-out-how-much-someones-bail-is/delaware-secured-unsecured-bail-types.webp"
          alt="Delaware secured and unsecured bail types explained"
          caption="The bail amount is only one part of the answer. The bail type tells you what may be required before release."
        />
        <div className="bm-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Bail Type</th>
                <th>What It Usually Means</th>
                <th>Money Needed Upfront?</th>
                <th>Can an Agent Usually Help?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Own recognizance / OR</td>
                <td>The person may be released based on a promise to appear.</td>
                <td>Usually no.</td>
                <td>Usually not needed.</td>
              </tr>
              <tr>
                <td>Unsecured bail</td>
                <td>The person may not pay upfront but may owe money if they fail to appear or violate terms.</td>
                <td>Usually no upfront full bail amount.</td>
                <td>Usually not needed for payment, but an agent can explain.</td>
              </tr>
              <tr>
                <td>Secured bail</td>
                <td>Money or approved security must be posted before release.</td>
                <td>Yes, usually some form of security is required.</td>
                <td>Often, depending on court order and case details.</td>
              </tr>
              <tr>
                <td>Cash-only bail</td>
                <td>The court may require cash rather than a surety bond.</td>
                <td>Yes.</td>
                <td>A normal bail bond may not be available.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="section-secured">
        <h2>What Does Secured Bail Mean in Delaware?</h2>
        <p>Secured bail generally means the court requires money or approved security before the person can be released. If someone has secured bail, a commercial bail bond may be an option, depending on the order and the facts of the case.</p>
        <p>Example: If secured bail is set at $10,000, that does not automatically mean the family must hand the court $10,000 in every situation. A licensed bail bond agent may be able to explain whether a bond can be posted, what paperwork is needed, and whether collateral or a co-signer is required.</p>
        <p>Learn more about <a href="/services/secured" onClick={(e) => handleCta(e, '/services/secured')}>secured bonds in Delaware</a>.</p>
      </section>

      <section id="section-unsecured">
        <h2>What Is Unsecured Bail?</h2>
        <p>Unsecured bail usually means the person does not have to pay the full bail amount upfront to be released. However, the amount still matters. If the person misses court or violates release conditions, they may owe the unsecured amount or face other consequences.</p>
        <p>Example: If unsecured bail is set at $2,500, the person may be released without paying $2,500 immediately. But the court is still using that amount as a financial condition tied to future compliance.</p>
        <p>Unsecured bail is not the same as “nothing matters.” The person must still follow court instructions and appear at required hearings.</p>
      </section>

      <section id="section-cash-only">
        <h2>What Is Cash-Only Bail?</h2>
        <p>Cash-only bail means the court may require cash rather than allowing a surety bond. This can be frustrating for families because a standard commercial bail bond may not solve a cash-only order.</p>
        <p>If you hear “cash only,” ask whether the full amount is required in cash, where payment must be made, what forms of payment are accepted, and whether any court process exists to request a change. For legal options about changing bail, speak with an attorney.</p>
      </section>

      <section id="section-hard-to-find">
        <h2>Why Can&apos;t I Find the Bail Amount Yet?</h2>
        <p>There are several common reasons bail information may be hard to find.</p>
        <h3>The Person Has Not Seen a Judge Yet</h3>
        <p>If there has not been an initial appearance or arraignment, bail may not exist yet.</p>
        <h3>You Are Calling the Wrong Facility</h3>
        <p>People can be moved after booking. If one facility does not have the person, ask whether they can tell you where the person was transferred.</p>
        <h3>The Name Does Not Match</h3>
        <p>Public records and facility records usually use legal names. Nicknames, misspellings, married names, or incomplete names can slow down the search.</p>
        <h3>The Case Is Restricted</h3>
        <p>Juvenile matters, sealed records, or sensitive cases may not be publicly available.</p>
        <h3>The Court Ordered a Bail Type You Did Not Expect</h3>
        <p>A family may hear an amount but not realize it is unsecured, cash-only, or tied to specific conditions. Always ask for the bail type.</p>
      </section>

      <section id="section-agent-help">
        <h2>Can a Bail Bond Agent Tell You the Bail Amount?</h2>
        <p>A bail bond agent may be able to help you identify what information is needed and explain the meaning of the bail type once it is known. In many situations, families call a bail bond agent because they do not know which court or facility to contact first.</p>
        <p>A licensed Delaware bail bond agent can often help with understanding secured bail, explaining bond paperwork, discussing payment options, explaining co-signer responsibilities, and helping you prepare information before posting a bond.</p>
        <p>A bail bond agent cannot set bail, lower bail, guarantee release, give legal advice, change court conditions, or promise how long the jail will take to process release.</p>
        <p>If felony or misdemeanor charges are involved, these pages may help: <a href="/services/felony" onClick={(e) => handleCta(e, '/services/felony')}>felony bail bond help</a> and <a href="/services/misdemeanor" onClick={(e) => handleCta(e, '/services/misdemeanor')}>misdemeanor bail bond services</a>.</p>
      </section>

      <section id="section-questions">
        <h2>What to Ask When You Call About Bail</h2>
        <p>Use this checklist when calling the jail, court, attorney, or bail bond company.</p>
        <ol>
          <li>Is the person currently in custody?</li>
          <li>Has bail been set?</li>
          <li>What is the bail amount?</li>
          <li>What type of bail is it?</li>
          <li>Is it secured, unsecured, cash only, or own recognizance?</li>
          <li>Are there release conditions?</li>
          <li>Where does payment or paperwork need to be completed?</li>
          <li>What forms of payment are accepted?</li>
          <li>Is a co-signer needed?</li>
          <li>Is collateral required?</li>
          <li>What court date is scheduled?</li>
          <li>What happens after the bond is posted?</li>
        </ol>
        <p>Writing the answers down can prevent mistakes, especially if several family members are making calls.</p>
      </section>

      <section id="section-cost">
        <h2>How Much Does a Bail Bond Cost?</h2>
        <p>The bail amount and the bail bond cost are not always the same. If a commercial bail bond is available, the family usually pays a bond premium or fee rather than the full bail amount. The exact cost and requirements can depend on Delaware rules, the bail amount, the bond type, and the bail bond company&apos;s underwriting requirements.</p>
        <p>There may also be collateral or co-signer responsibilities. Before signing anything, ask the bail bond agent to explain the total amount due upfront, whether payments are available, whether collateral is required, what the co-signer is responsible for, and whether any fees are refundable or non-refundable.</p>
      </section>

      <section id="section-cosigner">
        <h2>Co-Signer Responsibilities</h2>
        <p>A co-signer is the person who signs bail bond paperwork and agrees to certain responsibilities. This can be a serious commitment.</p>
        <p>A co-signer may be responsible for making sure the defendant appears in court, keeping the bail bond company informed, helping provide updated contact information, paying agreed fees, and covering financial obligations if the defendant fails to appear, depending on the agreement.</p>
      </section>

      <section id="section-delaware-state">
        <h2>Delaware State vs. Delaware County Bail Bonds</h2>
        <p>This is a common search confusion. “Delaware bail bonds” can mean bail bonds in the State of Delaware. But “Delaware County bail bonds” often refers to Delaware County, Ohio or another county named Delaware.</p>
        <p>A Way to Freedom Bail Bonds focuses on Delaware bail bond help. If you are searching for someone arrested in Wilmington, Dover, Newark, Georgetown, New Castle County, Kent County, or Sussex County, make sure you are using Delaware state information, not a page for Delaware County, Ohio.</p>
      </section>

      <section id="section-resources">
        <h2>Helpful Internal Resources</h2>
        <p>If you are still learning how bail works, these related resources may help:</p>
        <ul>
          <li><a href="/blog/bail-bond-process-step-by-step" onClick={(e) => handleCta(e, '/blog/bail-bond-process-step-by-step')}>Delaware bail bond process guide</a></li>
          <li><a href="/faq" onClick={(e) => handleCta(e, '/faq')}>Bail bonds FAQ</a></li>
          <li><a href="/contact" onClick={(e) => handleCta(e, '/contact')}>Contact A Way to Freedom Bail Bonds</a></li>
        </ul>
      </section>

      <section id="section-sources">
        <h2>Official Sources</h2>
        <p>For official Delaware court information, review these resources:</p>
        <ul>
          <li><a href="https://courts.delaware.gov/help/bail/" target="_blank" rel="noopener noreferrer">Delaware Courts — Bail & Bail Bonds</a></li>
          <li><a href="https://courts.delaware.gov/help/proceedings/jp_infodefendants.aspx" target="_blank" rel="noopener noreferrer">Delaware Courts — Information for Defendants in the Justice of the Peace Courts</a></li>
          <li><a href="https://delcode.delaware.gov/title11/c021/sc01/index.html" target="_blank" rel="noopener noreferrer">Delaware Code Title 11, Chapter 21</a></li>
        </ul>
      </section>

      <section id="section-faq">
        <h2>FAQ About Finding Out How Much Someone&apos;s Bail Is</h2>
        <FaqAccordion faqs={FIND_BAIL_AMOUNT_FAQS} />
      </section>

      <section id="section-final">
        <h2>Final Thoughts</h2>
        <p>The fastest way to find out how much someone&apos;s bail is in Delaware is to gather the person&apos;s legal name, date of birth, and arrest location, then confirm whether bail has been set and what type of bail was ordered. If the bail is secured and you need help understanding the next step, A Way to Freedom Bail Bonds can explain practical bond options while an attorney handles legal advice.</p>
      </section>
    </>
  );
}
