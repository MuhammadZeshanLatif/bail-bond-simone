import { HOW_TO_BOND_FAQS } from '../../../blog/how-to-bond-someone-out-of-jail-delaware-blog';
import { FaqAccordion } from './MagazineArticleParts';

export function HowToBondSomeoneOutArticle({ navigate, onContactClick }) {
  const handleCta = (e, targetPath = '/contact') => {
    e.preventDefault();
    if (onContactClick && targetPath === '/contact') {
      onContactClick(e);
    } else {
      navigate(targetPath);
    }
  };

  return (
    <>
      <section id="section-intro">
        <p>
          When someone you care about is arrested in Delaware, start by confirming where the person is being held, whether bail has been set, and what type of bail the court ordered. A commercial bail bond may be an option for certain secured bonds, but it is not required or available in every situation.
        </p>
        <p>
          The process can feel overwhelming, especially at night or when you are helping from another state. This guide explains what information to gather, how Delaware bail types work, what a bond may cost, what a co-signer agrees to, and which court or facility procedures may affect release.
        </p>

        <div className="bm-inline-cta" style={{ background: 'rgba(15, 23, 42, 0.04)', borderLeft: '4px solid #1e3a8a', padding: '1.25rem', borderRadius: '0 8px 8px 0', margin: '1.5rem 0' }}>
          <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Immediate steps after an arrest</strong>
          <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li>Confirm the person’s full legal name and date of birth.</li>
            <li>Find out where the person is being held.</li>
            <li>Ask whether bail has been set.</li>
            <li>Confirm the bail amount and bail type.</li>
            <li>Contact a Delaware-licensed bail agent when a commercial surety bond is permitted.</li>
          </ol>
        </div>

        <div className="bm-inline-cta bm-inline-cta--magazine" style={{ margin: '2rem 0' }}>
          <div className="bm-inline-cta-icon" aria-hidden>
            <i className="fas fa-headset bm-icon-gold" style={{ fontSize: '22px' }} />
          </div>
          <h3 className="bm-inline-cta-title">Need help understanding the next step?</h3>
          <p className="bm-inline-cta-desc">
            Contact A Way to Freedom to discuss the defendant’s location, bail amount, bail type, and available information.
          </p>
          <a href="/contact" className="bm-btn bm-btn--primary bm-btn--full bm-inline-cta-btn" onClick={(e) => handleCta(e, '/contact')}>
            Contact A Way to Freedom
          </a>
          <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.75rem', marginBottom: 0 }}>
            Do not promise a particular release time. Court and correctional-facility procedures remain outside the agency’s full control.
          </p>
        </div>

        <p className="bm-disclaimer">
          <strong>Important:</strong> This article provides general information and is not legal advice. Follow the court’s order and consult a Delaware attorney about questions involving a specific charge, case, release condition, or court procedure.
        </p>
      </section>

      <section id="section-first-steps">
        <h2>What Should You Do First After an Arrest in Delaware?</h2>
        <p>
          When someone is arrested in Delaware, first confirm their full legal name, date of birth, holding facility, booking or case number, bail amount, and bail type. Bail may not be ready immediately. After the court sets bail, a Delaware-licensed bail agent can explain whether a commercial bond may be used.
        </p>

        <h3>Find Out Where the Person Is Being Held</h3>
        <p>
          Begin with the defendant’s full legal name and date of birth. Ask the arresting agency or holding facility whether a booking or case number is available. Confirm that you have the correct person and facility, especially when the defendant has a common name or more than one pending case.
        </p>
        <p>
          Do not delay making an initial call solely because one detail is missing. You may be able to begin with the information you have.
        </p>
        <blockquote className="bm-quote">
          <p>&ldquo;My family member was arrested in Newark. I know their full name and date of birth, but I do not know the booking number or bail amount yet.&rdquo;</p>
        </blockquote>
        <p>
          The agency can explain what information it requires. It should not promise that it can access every custody, court, or correctional record.
        </p>

        <h3>Confirm Whether Bail Has Been Set</h3>
        <p>
          An arrest does not automatically mean that a commercial bond can be posted immediately. A judicial officer determines the bail amount, bail type, and any conditions. Delaware Courts says the decision may consider factors such as the alleged offense, flight risk, community safety, Delaware ties, and criminal history.{' '}
          <a href="https://courts.delaware.gov/help/bail/" target="_blank" rel="noopener noreferrer">
            Review Delaware Courts’ general bail information <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>
        <p>Ask these questions:</p>
        <ul>
          <li>Has bail been set?</li>
          <li>What is the total bail amount?</li>
          <li>Is the order own recognizance, unsecured, secured, or cash-only?</li>
          <li>Are there multiple cases or separate bond amounts?</li>
          <li>Are there court-ordered release conditions?</li>
          <li>Is another lawful hold affecting release?</li>
        </ul>

        <h3>Gather the Information a Bail Agent May Need</h3>
        <div className="bm-inline-cta" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '1.25rem', borderRadius: '8px', margin: '1.5rem 0' }}>
          <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Information to have ready</strong>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li>Defendant’s full legal name</li>
            <li>Date of birth</li>
            <li>Holding facility</li>
            <li>Booking or case number, when available</li>
            <li>Bail amount</li>
            <li>Bail type</li>
            <li>Charges, when known</li>
            <li>Your name, telephone number, and relationship to the defendant</li>
            <li>Identification or financial information requested under the agency’s verified procedures</li>
          </ul>
        </div>
        <p>
          Do not send identification, financial information, or sensitive personal details to an unverified person. Confirm the agency’s identity, license, official contact information, and secure document process first.
        </p>
      </section>

      <section id="section-how-to-bond">
        <h2>How Do You Bond Someone Out of Jail in Delaware?</h2>
        <p>
          To bond someone out in Delaware, verify the defendant’s custody information, confirm that bail has been set, identify the bail type, contact a Delaware-licensed agent when a surety bond is permitted, review the written financial terms, and allow the court and correctional facility to complete their release procedures.
        </p>

        <h3>Step 1: Verify the Defendant’s Custody Information</h3>
        <p>
          Confirm the defendant’s full name, date of birth, facility, and case. When possible, obtain the booking or case number. Accurate information helps the agency, court, and facility distinguish the defendant from people with similar names or additional pending cases.
        </p>

        <h3>Step 2: Check the Bail Amount and Bail Type</h3>
        <p>The bail type determines which release options may be available.</p>
        <ul>
          <li><strong>Own recognizance:</strong> The defendant signs a promise to appear without paying money before release.</li>
          <li><strong>Unsecured bail:</strong> No security is paid upfront, but the defendant may owe the stated amount after failing to appear.</li>
          <li><strong>Secured bail:</strong> Cash, property, or another permitted form of security must be provided.</li>
          <li><strong>Cash-only bail:</strong> The designated amount must be paid to the court according to its order.</li>
        </ul>
        <p>
          Delaware Courts identifies these four primary forms of bail. It explains that secured bail may involve cash or property posted by the defendant or someone acting on the defendant’s behalf, including a relative or bail bondsman. Cash-only bail requires the designated payment to be made to the court.{' '}
          <a href="https://courts.delaware.gov/help/bail/" target="_blank" rel="noopener noreferrer">
            Compare Delaware bail types <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>

        <h3>Step 3: Contact a Delaware-Licensed Bail Agent</h3>
        <p>When a commercial bond may be used, speak with an agent licensed in Delaware. Ask the agent to explain:</p>
        <ul>
          <li>Whether the court-ordered bail type is eligible</li>
          <li>What identification and documents are required</li>
          <li>The filed and approved premium</li>
          <li>The amount required before the bond is posted</li>
          <li>Whether a payment arrangement is available</li>
          <li>Whether collateral is required</li>
          <li>What the co-signer agrees to do</li>
          <li>Which remaining steps depend on the court or facility</li>
        </ul>
        <p>
          Delaware law regulates bail-agent licensing, registration, contracts, premiums, fees, collateral, records, and advertising. Verify a person’s status before sending money or signing documents.{' '}
          <a href="https://insurance.delaware.gov/services/licenseelookup/" target="_blank" rel="noopener noreferrer">
            Use the Delaware Department of Insurance license lookup <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>
        <p>
          <a href="/services" onClick={(e) => handleCta(e, '/services')}>
            View A Way to Freedom’s bail-bond services
          </a>.
        </p>

        <h3>Step 4: Review the Agreement, Premium, and Possible Collateral</h3>
        <p>
          Read the entire agreement before signing. Do not rely only on a verbal price, text message, or promise made during an urgent telephone call.
        </p>
        <p>The written agreement should clearly identify:</p>
        <ul>
          <li>The court-ordered bond amount</li>
          <li>The premium or approved charge</li>
          <li>The amount due before posting</li>
          <li>The payment schedule, when offered</li>
          <li>Any collateral terms</li>
          <li>The co-signer’s obligations</li>
          <li>Circumstances that may create documented expenses</li>
          <li>The conditions for returning collateral</li>
          <li>What may happen after a missed appearance or contractual breach</li>
        </ul>
        <p>
          For a surety bail bond above $1,000, Delaware law says the filed premium must be at least 5% and no more than 10%. The agent must charge the approved filed rate, collect at least 5% before posting, and enter into a written contract containing the bond’s terms. Unapproved administrative, service, company, or agent fees are unlawful.{' '}
          <a href="https://delcode.delaware.gov/title18/c043/sc02/index.html" target="_blank" rel="noopener noreferrer">
            Review Delaware Code, Title 18, Chapter 43 <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>

        <h3>Step 5: Allow the Facility to Complete the Release</h3>
        <p>
          Posting a bond and physically leaving the facility are separate stages. The court must process the bond or release order, and the correctional facility must receive and act on the required information.
        </p>
        <p>
          For Court of Common Pleas cases, the court explains that the defendant is released after the correctional facility receives the court’s release order. Procedures may differ by court, facility, case, or other lawful hold.{' '}
          <a href="https://courts.delaware.gov/help/bail/CCPbailbonds.aspx" target="_blank" rel="noopener noreferrer">
            Review the Court of Common Pleas bail Q&amp;A <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>

        <div className="bm-inline-cta bm-inline-cta--magazine" style={{ margin: '2rem 0' }}>
          <h3 className="bm-inline-cta-title">Ready to discuss the available information?</h3>
          <p className="bm-inline-cta-desc">
            Have the defendant’s full name, date of birth, facility, bail amount, and bail type ready when available.
          </p>
          <a href="/contact" className="bm-btn bm-btn--primary bm-btn--full bm-inline-cta-btn" onClick={(e) => handleCta(e, '/contact')}>
            Contact A Way to Freedom
          </a>
        </div>
      </section>

      <section id="section-bail-types">
        <h2>Which Types of Bail Are Used in Delaware?</h2>
        <p>
          Delaware uses four primary bail types: own recognizance, unsecured, secured, and cash-only. Recognizance and unsecured bail generally require no money before release. Secured bail requires approved security. Cash-only bail requires the designated amount to be paid to the court. The court order controls which option applies.
        </p>

        <div className="bm-table-wrap" style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
          <table className="blog-data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: '#fff' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Bail type</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Upfront security</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Who may post or sign</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>When might a bail agent help?</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Main responsibility</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem' }}><strong>Own recognizance</strong></td>
                <td style={{ padding: '0.75rem' }}>No</td>
                <td style={{ padding: '0.75rem' }}>The defendant signs</td>
                <td style={{ padding: '0.75rem' }}>Usually unnecessary</td>
                <td style={{ padding: '0.75rem' }}>Attend court and follow release conditions</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <td style={{ padding: '0.75rem' }}><strong>Unsecured</strong></td>
                <td style={{ padding: '0.75rem' }}>No upfront security</td>
                <td style={{ padding: '0.75rem' }}>The defendant signs</td>
                <td style={{ padding: '0.75rem' }}>Usually unnecessary</td>
                <td style={{ padding: '0.75rem' }}>Attend court or risk owing the designated amount</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem' }}><strong>Secured</strong></td>
                <td style={{ padding: '0.75rem' }}>Yes</td>
                <td style={{ padding: '0.75rem' }}>The defendant or another permitted person may provide security</td>
                <td style={{ padding: '0.75rem' }}>A licensed agent may be an option when the order permits</td>
                <td style={{ padding: '0.75rem' }}>Post approved security, attend court, and follow conditions</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <td style={{ padding: '0.75rem' }}><strong>Cash-only</strong></td>
                <td style={{ padding: '0.75rem' }}>Full designated cash amount</td>
                <td style={{ padding: '0.75rem' }}>Payment is made according to the court’s order</td>
                <td style={{ padding: '0.75rem' }}>Do not assume a surety bond can replace the requirement</td>
                <td style={{ padding: '0.75rem' }}>Pay the court and attend required proceedings</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3>Own Recognizance Bail</h3>
        <p>
          With own recognizance, sometimes called OR bail, the defendant does not pay money before release. The defendant signs a bond promising to attend future proceedings and must comply with any release conditions.
        </p>

        <h3>Unsecured Bail</h3>
        <p>
          With unsecured bail, the defendant signs a bond without providing security upfront. If the defendant fails to appear, the court may require payment of the designated amount.
        </p>

        <h3>Secured Bail</h3>
        <p>
          Secured bail requires cash, property, or another approved form of security. The defendant or another permitted person may provide the required security, and a licensed bail agent may be an option when the court order allows it.
        </p>
        <p>
          <a href="/services/secured" onClick={(e) => handleCta(e, '/services/secured')}>
            Learn about secured-bond assistance
          </a>.
        </p>

        <h3>Cash-Only Bail</h3>
        <p>
          Cash-only bail requires the designated amount to be paid to the court according to its order. Do not assume that a commercial surety bond can be substituted. Confirm the court’s accepted payment method and procedure before arranging funds.
        </p>
        <p>
          These definitions follow Delaware Courts’ public bail guidance.{' '}
          <a href="https://courts.delaware.gov/help/bail/" target="_blank" rel="noopener noreferrer">
            Read the official Delaware bail definitions <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>
      </section>

      <section id="section-cost">
        <h2>How Much Will a Delaware Bail Bond Cost?</h2>
        <p>
          Delaware bail agents cannot choose any advertised price. They must charge the premium rate filed with and approved by the Department of Insurance. For surety bonds above $1,000, the filed premium must be between 5% and 10%, and an agent cannot add unapproved administrative or service charges.
        </p>

        <div className="bm-inline-cta" style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '1.25rem', borderRadius: '8px', margin: '1.5rem 0' }}>
          <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Understand the cost terms</strong>
          <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li><strong>Bail amount:</strong> The amount set by the court.</li>
            <li><strong>Premium:</strong> The approved charge for issuing a commercial surety bond.</li>
            <li><strong>Initial payment:</strong> The amount required before posting under the written agreement.</li>
            <li><strong>Collateral:</strong> Money or property pledged as additional security.</li>
            <li><strong>Documented expenses:</strong> Certain verified costs that may arise from fraud, misrepresentation, or contractual breach when legally permitted.</li>
          </ul>
        </div>

        <h3>Bail Amount Versus Bail-Bond Premium</h3>
        <p>
          The bail amount is set by the court. The premium is the approved charge for providing the commercial bond. Paying a premium does not change the court’s bail amount or release conditions.
        </p>
        <p>
          For surety bail bonds above $1,000, Delaware law requires the agent to collect at least 5% of the bond amount before posting it and enter into a written contract. The actual total premium must match the rate filed with and approved by the Department.{' '}
          <a href="https://delcode.delaware.gov/title18/c043/sc02/index.html" target="_blank" rel="noopener noreferrer">
            Review Delaware’s premium and contract requirements <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>

        <h3>When Payment Arrangements May Be Available</h3>
        <p>
          A payment arrangement is not a discounted premium. Its availability and terms depend on the agency’s approved practices, the bond, and the written agreement. Do not assume that every applicant qualifies or that the same initial payment applies to every case.
        </p>

        <h3>When Collateral May Be Requested</h3>
        <p>
          Collateral is money or property pledged as additional security. Whether it is requested depends on the bond and written agreement. Ask what collateral is required, how it will be documented, how it will be held, and when it may be returned.
        </p>

        <h3>Questions to Ask Before Signing</h3>
        <div className="bm-inline-cta" style={{ background: '#fff', borderLeft: '4px solid #d97706', padding: '1.25rem', borderRadius: '0 8px 8px 0', margin: '1.5rem 0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <strong style={{ color: '#0f172a', display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem' }}>Ask for clear written answers</strong>
          <ol style={{ margin: 0, paddingLeft: '1.25rem' }}>
            <li>What is the filed and approved premium?</li>
            <li>How much must be paid before the bond is posted?</li>
            <li>Is a payment arrangement available, and what is the full schedule?</li>
            <li>Is collateral required?</li>
            <li>What receipt will document the collateral?</li>
            <li>When and how will collateral be returned?</li>
            <li>Could a breach create additional documented expenses?</li>
            <li>Will I receive receipts and a complete copy of the agreement?</li>
          </ol>
        </div>

        <p>
          Be cautious of &ldquo;cheapest bail bonds&rdquo; or &ldquo;discounted rate&rdquo; advertising. Delaware requires agents to use approved rates and prohibits unapproved administrative, service, company, or agent fees. Compare licensing, written terms, collateral conditions, receipts, and communication instead of relying on an unsupported lowest-price claim.
        </p>
        <p>
          <a href="/blog/common-mistakes-to-avoid-when-posting-bail-in-delaware" onClick={(e) => handleCta(e, '/blog/common-mistakes-to-avoid-when-posting-bail-in-delaware')}>
            Review common mistakes to avoid before posting bail
          </a>.
        </p>
      </section>

      <section id="section-release-time">
        <h2>How Long Does It Take to Be Released After Bail Is Posted?</h2>
        <p>
          Posting bail and leaving the facility are separate stages. After a bond is posted, the relevant court and correctional facility must process the release. An agency may prepare eligible paperwork promptly, but it cannot control court processing, release-order transmission, booking, staffing, other lawful holds, or facility procedures.
        </p>

        <div className="bm-table-wrap" style={{ overflowX: 'auto', margin: '1.5rem 0' }}>
          <table className="blog-data-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: '#fff' }}>
                <th style={{ padding: '0.75rem', textAlign: 'left', width: '50%' }}>The agency may influence</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', width: '50%' }}>The agency cannot control</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem' }}>Collecting complete information</td>
                <td style={{ padding: '0.75rem' }}>Whether bail has been set</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <td style={{ padding: '0.75rem' }}>Preparing accurate paperwork</td>
                <td style={{ padding: '0.75rem' }}>The amount or type of bail</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem' }}>Explaining signature requirements</td>
                <td style={{ padding: '0.75rem' }}>Court processing</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <td style={{ padding: '0.75rem' }}>Receiving required documents and payments</td>
                <td style={{ padding: '0.75rem' }}>Release-order transmission</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '0.75rem' }}>Submitting eligible documents promptly</td>
                <td style={{ padding: '0.75rem' }}>Facility processing and booking completion</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <td style={{ padding: '0.75rem' }}>Responding to document requests</td>
                <td style={{ padding: '0.75rem' }}>Other lawful holds or changed conditions</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          For Court of Common Pleas matters, the court says release occurs after the correctional facility receives the court’s order. Other Delaware courts or facilities may use different procedures.{' '}
          <a href="https://courts.delaware.gov/help/bail/CCPbailbonds.aspx" target="_blank" rel="noopener noreferrer">
            Review the Court of Common Pleas process <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>
        <p>
          A responsible agency should explain what it has completed without guaranteeing the exact moment the defendant will leave custody.
        </p>
      </section>

      <section id="section-cosigner">
        <h2>What Does a Bail-Bond Co-Signer Agree to Do?</h2>
        <p>
          A co-signer promises that the defendant will attend required court proceedings and follow release conditions. The co-signer may also accept payment, collateral, communication, and reimbursement obligations under the written agreement. Because financial duties vary by contract, review the actual terms before signing.
        </p>

        <h3>Help Ensure the Defendant Attends Court</h3>
        <p>
          Delaware Courts explains that a person signing a bond promises that the defendant will appear and comply with court-imposed conditions, such as a no-contact order when one applies.{' '}
          <a href="https://courts.delaware.gov/help/bail/CCPbailbonds.aspx" target="_blank" rel="noopener noreferrer">
            Review Delaware Court of Common Pleas bond obligations <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>

        <h3>Follow the Payment and Collateral Agreement</h3>
        <p>
          The co-signer may accept payment or collateral duties under the contract. Delaware law permits written agreements to address certain verified expenses arising from fraud, misrepresentation, or a breach. Read these provisions before signing.
        </p>

        <blockquote className="bm-quote">
          <strong style={{ display: 'block', marginBottom: '0.5rem', color: '#0f172a' }}>Co-signer scenario</strong>
          <p>
            A parent agrees to co-sign for an adult child. Before signing, the parent reviews the full payment schedule, collateral terms, missed-court consequences, communication requirements, documented-expense provisions, and conditions for returning collateral. The parent does not rely on verbal promises that are missing from the written agreement.
          </p>
        </blockquote>

        <h3>Report Important Changes When the Agreement Requires It</h3>
        <p>
          The agency’s agreement may require notice when the defendant changes an address, telephone number, employment, or another relevant circumstance. Follow the actual written terms instead of assuming every bail agency uses the same requirements.
        </p>
        <p>
          A bail agent cannot change the bail amount, bail type, or court-ordered conditions. For Court of Common Pleas cases, the court says a request for a change requires a Motion to Modify Bond and a scheduled hearing. Other courts may use different procedures.{' '}
          <a href="https://courts.delaware.gov/help/bail/CCPbailbonds.aspx" target="_blank" rel="noopener noreferrer">
            Read the court-specific modification guidance <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>
      </section>

      <section id="section-after-hours">
        <h2>Can You Get Bail-Bond Help at Night or on a Weekend?</h2>
        <p>
          You may contact an agency that provides after-hours telephone assistance, but agency availability does not guarantee immediate court or facility action. Have the defendant’s identifying information and bail details ready when possible so the agent can explain which steps may begin and which depend on another institution.
        </p>
        <p>
          <a href="/contact" onClick={(e) => handleCta(e, '/contact')}>
            View A Way to Freedom’s contact information
          </a>.
        </p>
      </section>

      <section id="section-delays">
        <h2>What Can Delay or Prevent Someone From Bonding Out?</h2>
        <p>
          A delay does not always mean that something went wrong with a commercial bond. The cause may involve the bail order, incomplete information, booking, another lawful hold, court processing, or correctional-facility procedures.
        </p>
        <ul>
          <li>Bail has not been set.</li>
          <li>The court order does not permit the proposed bond method.</li>
          <li>Cash-only bail must be paid according to the court’s order.</li>
          <li>Required information or signatures are incomplete.</li>
          <li>Booking remains in progress.</li>
          <li>Another lawful hold applies.</li>
          <li>Multiple cases require separate review.</li>
          <li>The court changes or reviews release conditions.</li>
          <li>The facility has not received or processed the release order.</li>
        </ul>
        <p>
          Confirm the actual reason with the relevant court, facility, attorney, or agency. Do not assume that every delay can be resolved by paying additional money.
        </p>
      </section>

      <section id="section-after-release">
        <h2>What Happens After the Defendant Is Released?</h2>
        <p>
          Release does not end the criminal case or the bond obligations. The defendant must attend required proceedings, follow every release condition, and comply with applicable terms in the bail agreement. Failure to appear may place the bail at risk of forfeiture.
        </p>
        <ul>
          <li>Keep the bond agreement.</li>
          <li>Save payment and collateral receipts.</li>
          <li>Keep court and release documents.</li>
          <li>Record every court date.</li>
          <li>Maintain current contact information.</li>
          <li>Follow all court-ordered conditions.</li>
        </ul>
        <p>
          Contact an attorney about the criminal case or court conditions. Contact the bail agency about the private agreement, payment schedule, collateral, or agency reporting requirements.
        </p>
        <p>
          <a href="/blog/released-on-bond-meaning-delaware" onClick={(e) => handleCta(e, '/blog/released-on-bond-meaning-delaware')}>
            Learn what released on bond means in Delaware
          </a>.
        </p>
      </section>

      <section id="section-choosing-agent">
        <h2>What Should You Check Before Choosing a Delaware Bail Agent?</h2>
        <p>
          Before paying or signing, verify the person’s Delaware license status, registered business identity, written pricing, payment terms, collateral conditions, contact information, business location, and receipt procedures. Avoid providers that guarantee release times or pressure you to send money without written terms.
        </p>
        <ul>
          <li>Active Delaware license status</li>
          <li>Registered business or approved trade name</li>
          <li>Court registration or approval where required</li>
          <li>Written explanation of the premium and all charges</li>
          <li>Clear payment and collateral terms</li>
          <li>A reachable, verified business number</li>
          <li>A verified Delaware place of business</li>
          <li>Receipts for payments and collateral</li>
          <li>Realistic language without release guarantees</li>
        </ul>
        <p>
          The Delaware Department of Insurance provides a public license-verification service.{' '}
          <a href="https://insurance.delaware.gov/services/licenseelookup/" target="_blank" rel="noopener noreferrer">
            Verify a Delaware licensee <i className="fas fa-external-link-alt" style={{ fontSize: '0.8em' }} />
          </a>.
        </p>
        <p>
          <a href="/about" onClick={(e) => handleCta(e, '/about')}>
            Learn about A Way to Freedom
          </a>.
        </p>
      </section>

      <section id="section-faq">
        <h2>Frequently Asked Questions About the Bail Bond Process</h2>
        <FaqAccordion faqs={HOW_TO_BOND_FAQS} />
      </section>

      <section id="section-next-steps">
        <h2>Need Help With the Next Step in Delaware?</h2>
        <p>
          When someone you care about is in custody, focus first on confirming the facility, bail amount, and bail type; then review every payment, signature, collateral condition, and co-signer obligation before proceeding. A Way to Freedom can discuss the available information and explain its verified agency procedures, but no bail agency can change the court’s order or guarantee a specific release time.
        </p>

        <div className="bm-inline-cta bm-inline-cta--magazine" style={{ margin: '2rem 0' }}>
          <div className="bm-inline-cta-icon" aria-hidden>
            <i className="far fa-paper-plane bm-icon-gold" style={{ fontSize: '22px' }} />
          </div>
          <h3 className="bm-inline-cta-title">Contact A Way to Freedom</h3>
          <p className="bm-inline-cta-desc">
            Have these details ready when available: full legal name, date of birth, holding facility, bail amount, and bail type.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="/contact" className="bm-btn bm-btn--primary bm-inline-cta-btn" onClick={(e) => handleCta(e, '/contact')}>
              Open the Contact Page
            </a>
            <a href="/service-areas" className="bm-btn bm-btn--outline bm-inline-cta-btn" onClick={(e) => handleCta(e, '/service-areas')}>
              Review Service Area
            </a>
          </div>
        </div>

        <p className="bm-disclaimer">
          <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice. For specific legal questions about your case, please consult with a licensed attorney.
        </p>
      </section>
    </>
  );
}
