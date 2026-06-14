import { BAIL_BOND_COMPANY_IMAGES, BAIL_BOND_COMPANY_FAQS } from '../../../blog/bail-bond-company-delaware-blog';
import { ArticleFigure, FaqAccordion, QuickAnswerBox } from './MagazineArticleParts';

export function BailBondCompanyArticle({ navigate, onContactClick }) {
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
          Getting a call that someone you love is in jail is one of the worst feelings in the world. Your heart drops.
          Your mind races. And suddenly, you are Googling &ldquo;bail bond company&rdquo; at 2 a.m. with zero idea where to start.
          You are not alone. Thousands of Delaware families face this same situation every year.
        </p>
        <p>
          The good news? The bail bond process in Delaware is more straightforward than it looks. A licensed bail bond
          company can often get your loved one out within a few hours. You just need to know who to call, what to expect,
          and exactly how much it is going to cost, with no surprises.
        </p>
        <p>
          This guide covers everything: how bail bonds work in Delaware, the types of bonds available, what the legal fee
          is, and how to choose a bondsman you can trust. Whether you are in Wilmington, Dover, Newark, or anywhere across
          New Castle, Kent, or Sussex County, we have got you covered.
        </p>
      </section>

      <ArticleFigure
        src={BAIL_BOND_COMPANY_IMAGES.guide}
        alt="Delaware bail bond company helping a family understand the bail process"
        caption="A licensed Delaware bail bond company can explain costs, paperwork, and next steps after an arrest."
      />

      <section id="section-what-is-company">
        <h2>What Is a Bail Bond Company?</h2>
        <p>
          A bail bond company is a licensed business that pays a defendant&apos;s bail on their behalf. In exchange, the
          family or co-signer pays the company a set fee. The company then guarantees to the court that the defendant
          will appear at all scheduled hearings.
        </p>
        <p>
          Think of it as a financial bridge. The court needs assurance. The family does not have $25,000 in cash. The bail
          bond company steps in as the guarantor.
        </p>
        <QuickAnswerBox>
          <p><strong>Quick Answer:</strong> A bail bond company helps secure a defendant&apos;s release from jail by posting bail with the court for a non-refundable fee, typically 10% of the total bail amount set by the judge.</p>
        </QuickAnswerBox>
        <blockquote className="bm-pullquote">
          A bail bond company helps people secure release from jail before their trial. When bail is set by a court, a
          licensed bail bond agent pays the full amount on the defendant&apos;s behalf for a non-refundable fee, usually 10%
          of the bail total. The defendant must appear at all court dates.
        </blockquote>
      </section>

      <section id="section-after-arrest">
        <h2>What Happens After Someone Is Arrested in Delaware?</h2>
        <p>The process moves fast once an arrest happens. Here is the typical sequence in Delaware:</p>
        <ol className="bm-numbered-list">
          <li><strong>Arrest and Booking</strong> - The defendant is booked at the county jail. In Delaware, major facilities include Howard R. Young Correctional Institution (Wilmington), Sussex Correctional Institution (Georgetown), and James T. Vaughn Correctional Center (Smyrna).</li>
          <li><strong>Bail Hearing</strong> - A judge reviews the charges and sets a bail amount. The court considers the severity of the charges, criminal history, and flight risk under Delaware Code Title 11, Chapter 21.</li>
          <li><strong>Bail Is Posted</strong> - Once the amount is set, bail can be posted by cash, property, or through a licensed bail bond company.</li>
          <li><strong>Release</strong> - After paperwork is processed, the defendant is released, typically within 2 to 8 hours of bail being posted.</li>
          <li><strong>Court Appearances</strong> - The defendant must attend every scheduled court date. Miss one, and the bond can be forfeited.</li>
        </ol>
      </section>

      <section id="section-bail-set">
        <h2>How Bail Is Set in Delaware Courts</h2>
        <p>Delaware courts do not set bail randomly. Judges use a structured process guided by state law.</p>
        <p>
          The court looks at three main factors: the seriousness of the charges, the defendant&apos;s past criminal record,
          and whether the defendant is a flight risk. For minor charges, the defendant may even be released on their own
          recognizance (OR), meaning no bail payment at all.
        </p>
        <p>
          For more serious charges, including felonies, violent crimes, or repeat offenses, bail amounts can reach tens of
          thousands of dollars. The average bail amount in Delaware is approximately $25,000, according to data from licensed
          Delaware bondsmen.
        </p>
      </section>

      <section id="section-bond-types">
        <h2>Types of Bail Bonds Available in Delaware</h2>
        <p>Not all bail bonds are the same. Here is a clear breakdown:</p>
        <div className="bm-table-wrap">
          <table className="blog-data-table">
            <thead>
              <tr>
                <th>Bond Type</th>
                <th>How It Works</th>
                <th>Who Uses It</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Cash Bond</td><td>Full bail amount paid directly to court in cash</td><td>Those with immediate funds</td></tr>
              <tr><td>Surety Bond</td><td>Bondsman pays bail; you pay 10% fee</td><td>Most common type</td></tr>
              <tr><td>Property Bond</td><td>Real estate used as collateral for bail</td><td>Larger bail amounts</td></tr>
              <tr><td>Signature Bond</td><td>Released on signature; no money required</td><td>Low-risk defendants</td></tr>
              <tr><td>Federal Bond</td><td>For federal charges; higher complexity</td><td>Federal court defendants</td></tr>
              <tr><td>Appeal Bond</td><td>Posted after conviction, pending appeal</td><td>Post-conviction cases</td></tr>
              <tr><td>VOP Bond</td><td>For probation violation charges</td><td>Those on probation</td></tr>
              <tr><td>Transfer Bond</td><td>Bail posted from another state</td><td>Out-of-state arrests</td></tr>
              <tr><td>Juvenile Bond</td><td>Issued for minors charged with crimes</td><td>Defendants under 18</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The most common type is the surety bond. A licensed bail bond company posts the full bail amount. You pay 10% of
          that amount as a non-refundable premium.
        </p>
      </section>

      <section id="section-cost">
        <h2>How Much Does a Bail Bond Cost in Delaware?</h2>
        <p>Here is the straightforward answer: 10% of the total bail amount, period.</p>
        <p>
          The Delaware Department of Insurance sets this rate. It is state law and not negotiable. Every licensed bail bond
          company must charge exactly this amount. Not more. Not less.
        </p>
        <p><strong>Example:</strong> If the judge sets bail at $25,000, your cost for a bail bond is $2,500. You do not pay the remaining $22,500 unless the defendant skips court and disappears.</p>
        <h3>Why the 10% Fee Is Non-Negotiable</h3>
        <p>
          Some bondsmen may try to offer you a &ldquo;deal&rdquo; at 5% or 7%. Be very careful. Any bail agent charging less
          than the state-mandated rate is operating illegally under Delaware law. The Delaware Department of Insurance is
          very clear on this point.
        </p>
        <blockquote className="bm-pullquote">
          <strong>Bondsman Tip:</strong> Call the Delaware Department of Insurance (302-674-7300) to verify any bondsman&apos;s license before signing paperwork.
        </blockquote>
      </section>

      <section id="section-payment-plans">
        <h2>What About Payment Plans?</h2>
        <p>
          Many reputable bail bond companies in Delaware offer flexible payment plans. If you cannot pay the full 10%
          upfront, ask about financing options. Most companies work with families during stressful times. Some also offer
          no collateral or signature-only bonds for lower-risk defendants.
        </p>
      </section>

      <section id="section-process">
        <h2>The Bail Bond Process: Step by Step</h2>
        <p>Here is exactly how it works when you contact a bail bond company in Delaware:</p>
        <div className="bm-steps">
          <div className="bm-step-card">
            <div className="bm-step-icon-wrap"><i className="fas fa-phone-alt bm-icon-gold" aria-hidden /><span className="bm-step-badge">Step 1</span></div>
            <div className="bm-step-content">
              <p className="bm-step-title">Call the bondsman</p>
              <p className="bm-step-desc">Provide the defendant&apos;s full name, which jail they are in, the charges, and the bail amount. If you do not know the bail amount yet, the bondsman can often look it up.</p>
            </div>
          </div>
          <div className="bm-step-card">
            <div className="bm-step-icon-wrap"><i className="fas fa-file-signature bm-icon-gold" aria-hidden /><span className="bm-step-badge">Step 2</span></div>
            <div className="bm-step-content">
              <p className="bm-step-title">Complete the paperwork</p>
              <p className="bm-step-desc">Fill out a bail bond application, a bail indemnity agreement, and a receipt. This can often be done by email or fax with no in-person visit required.</p>
            </div>
          </div>
          <div className="bm-step-card">
            <div className="bm-step-icon-wrap"><i className="fas fa-dollar-sign bm-icon-gold" aria-hidden /><span className="bm-step-badge">Step 3</span></div>
            <div className="bm-step-content">
              <p className="bm-step-title">Arrange payment</p>
              <p className="bm-step-desc">Pay the 10% premium. Discuss collateral or payment plans if needed.</p>
            </div>
          </div>
          <div className="bm-step-card">
            <div className="bm-step-icon-wrap"><i className="fas fa-gavel bm-icon-gold" aria-hidden /><span className="bm-step-badge">Step 4</span></div>
            <div className="bm-step-content">
              <p className="bm-step-title">Bond is posted</p>
              <p className="bm-step-desc">The bail agent contacts the jail and posts the bond. Processing time at the jail typically takes 2 to 8 hours.</p>
            </div>
          </div>
          <div className="bm-step-card">
            <div className="bm-step-icon-wrap"><i className="fas fa-door-open bm-icon-gold" aria-hidden /><span className="bm-step-badge">Step 5</span></div>
            <div className="bm-step-content">
              <p className="bm-step-title">Defendant is released</p>
              <p className="bm-step-desc">Your loved one walks out. Their obligation: show up to every court date.</p>
            </div>
          </div>
          <div className="bm-step-card">
            <div className="bm-step-icon-wrap"><i className="fas fa-check-circle bm-icon-gold" aria-hidden /><span className="bm-step-badge">Step 6</span></div>
            <div className="bm-step-content">
              <p className="bm-step-title">Bond closes</p>
              <p className="bm-step-desc">Once the case is resolved by trial, plea deal, or dismissal, the bond is closed. Collateral, if any, is returned.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="section-collateral">
        <h2>What Can Be Used as Collateral for a Bail Bond in Delaware?</h2>
        <p>
          Collateral is something of value offered to the bail bond company to reduce their financial risk. It is only
          required in some cases, usually for larger or higher-risk bonds.
        </p>
        <p>In Delaware, common forms of accepted collateral include:</p>
        <ul>
          <li>Real estate (Delaware property only, typically)</li>
          <li>Vehicles (title must be clear)</li>
          <li>Jewelry and valuables</li>
          <li>Bank accounts or CDs</li>
        </ul>
        <p>
          Once the defendant&apos;s case is resolved and all obligations are met, the collateral is returned. If the defendant
          skips court, the bond company may seize the collateral to cover the forfeited bail amount.
        </p>
        <p>
          Signature (no collateral) bonds are available for lower-risk cases. These require only your signature and the
          premium payment with no property needed.
        </p>
      </section>

      <section id="section-skips-court">
        <h2>What Happens If the Defendant Skips Court?</h2>
        <p>This is the question families are afraid to ask, but it matters.</p>
        <p>
          If a defendant misses a court date, the judge will typically issue a bench warrant for their arrest. The bail bond
          company has a set period to locate and return the defendant to court.
        </p>
        <p>
          If the defendant cannot be found and the bond is forfeited, the bail bond company must pay the full bail amount to
          the court. They will then seek repayment from the co-signer or indemnitor, which may include seizing any collateral
          provided.
        </p>
        <p>
          Bottom line: make sure your loved one understands the importance of every court date. It protects everyone: them,
          you, and the bondsman.
        </p>
      </section>

      <section id="section-counties">
        <h2>Bail Bond Companies Serving All Delaware Counties</h2>
        <p>Delaware has three counties, each with its own court system and detention facilities. A reputable bail bond company serves all three.</p>
        <div className="bm-table-wrap">
          <table className="blog-data-table">
            <thead>
              <tr>
                <th>County</th>
                <th>Main City</th>
                <th>Key Facility</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>New Castle</td><td>Wilmington</td><td>Howard R. Young Correctional Institution</td></tr>
              <tr><td>Kent</td><td>Dover</td><td>James T. Vaughn Correctional Center (Smyrna)</td></tr>
              <tr><td>Sussex</td><td>Georgetown</td><td>Sussex Correctional Institution</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          When choosing a bail bond company in Delaware, confirm they are licensed to operate in your county and are familiar
          with local court procedures. Response time can vary. Companies near the courthouse often process bonds faster.
        </p>
      </section>

      <section id="section-choose">
        <h2>What to Look for in a Bail Bond Company in Delaware</h2>
        <p>Choosing the right company under pressure is hard. Here is a fast checklist:</p>
        <ul className="bm-checklist">
          <li>Delaware Department of Insurance license number displayed</li>
          <li>Available 24 hours, 7 days a week, including weekends and holidays</li>
          <li>Transparent 10% fee with no hidden charges</li>
          <li>Payment plan options for qualified clients</li>
          <li>Experience with your specific type of charge (criminal, federal, VOP, etc.)</li>
          <li>Serves your specific county and jail</li>
          <li>Positive verified reviews on Google or BBB</li>
          <li>Clear and direct communication that answers your questions without rush</li>
        </ul>
        <h3>Red Flags to Watch For</h3>
        <ul className="bm-red-flags">
          <li>Offering a bail bond rate below 10%</li>
          <li>Requesting upfront cash with no paperwork</li>
          <li>Cannot provide a license number immediately</li>
          <li>Pressure tactics or aggressive sales language</li>
          <li>No physical address in Delaware</li>
        </ul>
        <blockquote className="bm-pullquote">
          The biggest mistake families make is waiting too long to call. The sooner you contact a bondsman, the sooner your loved one gets out. Time in jail is time lost from work, family, and preparing a legal defense.
        </blockquote>
        <blockquote className="bm-pullquote">
          Always ask for a written receipt. A legitimate bail bond company will always give you one. If they resist, walk away.
        </blockquote>
      </section>

      <section id="section-cash-vs-bond">
        <h2>Choosing Between a Bail Bond Company and Paying Cash Bail</h2>
        <p>Many families ask: should we just pay the full cash bail directly?</p>
        <div className="bm-table-wrap">
          <table className="blog-data-table">
            <thead>
              <tr>
                <th>Factor</th>
                <th>Cash Bail</th>
                <th>Bail Bond</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Upfront cost</td><td>100% of bail amount</td><td>10% of bail amount</td></tr>
              <tr><td>Refundable?</td><td>Yes (after case ends)</td><td>No. Fee is kept by bondsman</td></tr>
              <tr><td>Speed</td><td>Fast (if you have the money)</td><td>Fast (2 to 8 hours typical)</td></tr>
              <tr><td>Risk if defendant skips</td><td>You lose full amount</td><td>Bondsman loses full amount</td></tr>
              <tr><td>Best for</td><td>Those with large cash reserves</td><td>Most families (affordable)</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          For most Delaware families, a bail bond is the practical choice. Coming up with $25,000 in cash at midnight simply
          is not realistic for the majority of people.
        </p>
      </section>

      <section id="section-faq">
        <h2>FAQs About Bail Bond Companies in Delaware</h2>
        <FaqAccordion faqs={BAIL_BOND_COMPANY_FAQS} />
      </section>

      <section id="section-final">
        <h2>Final Thoughts</h2>
        <p>
          Having been through urgent situations where every minute behind bars feels like a weight on the whole family, I
          understand what it means when someone says we need to get them out now. The bail bond process in Delaware does not
          have to be confusing or scary. The law is clear, the fees are set, and a good bail bond company makes the whole
          thing manageable, even at 3 in the morning.
        </p>
        <p>
          The single most important action you can take right now is to call a licensed Delaware bail bond company. Verify
          their license, confirm the 10% rate, ask about payment plans, and let them handle the court communication. Your
          energy is better spent supporting your loved one, finding a good defense attorney, and making sure those court
          dates never get missed.
        </p>
        <p>
          The right bondsman is not just a financial service. They are a guide through one of the hardest moments your family
          will ever face.
        </p>
        <div className="bm-inline-cta bm-inline-cta--magazine">
          <div className="bm-inline-cta-icon" aria-hidden>
            <i className="far fa-calendar-alt bm-icon-gold" style={{ fontSize: '22px' }} />
          </div>
          <h3 className="bm-inline-cta-title">Need Help Right Now?</h3>
          <p className="bm-inline-cta-desc">Call A Way to Freedom Bail Bonds. Available 24/7 for families across Delaware.</p>
          <a href="#/contact" className="bm-btn bm-btn--primary bm-btn--full bm-inline-cta-btn" onClick={handleCta}>
            Start the Process
          </a>
        </div>
      </section>
    </>
  );
}
