import { HARDCODED_BLOG_IMAGES } from '../../../blog/hardcoded-static-blog';

function ArticleFigure({ src, alt, caption }) {
  return (
    <figure className="bm-article-figure">
      <img src={src} alt={alt} loading="lazy" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

function FaqAccordion({ faqs }) {
  return (
    <div className="bm-faq-accordion">
      {faqs.map((faq, index) => (
        <details key={faq.question} className="bm-faq-item" open={index === 0}>
          <summary className="bm-faq-summary">
            <h3>{faq.question}</h3>
          </summary>
          <div className="bm-faq-answer">
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}

const faqs = [
  {
    question: 'What is the main purpose of bail?',
    answer:
      'The main purpose of bail is to allow pretrial release while helping ensure the defendant appears in court and follows release conditions.',
  },
  {
    question: 'Can a bail bond agent help with every bond?',
    answer:
      'No. A bail bond agent may help with some secured bonds, but not every bond type. If the court orders cash only, the family must follow that specific order.',
  },
  {
    question: 'Is the bail bond premium refundable?',
    answer:
      'Usually, the premium is a service fee and is not refundable. However, every agreement should be reviewed carefully before signing.',
  },
  {
    question: 'What happens if the defendant misses court?',
    answer:
      'Missing court can lead to a warrant, bond forfeiture, and financial problems for the co-signer. Contact the bail bond agent or attorney quickly if a court date is missed.',
  },
  {
    question: 'Who should families call first?',
    answer:
      'If legal advice is needed, call an attorney. If the family needs help understanding bond posting, contact a licensed bail bond agent.',
  },
];

export function BailBondGuideArticle({ navigate, onContactClick }) {
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
          When someone you love is arrested, everything can feel confusing fast. You may not know where they are,
          what bail means, how much money is needed, or who to call first. That stress gets worse when the court
          process uses words like &ldquo;secured bond,&rdquo; &ldquo;cash only,&rdquo; or &ldquo;own recognizance.&rdquo;
        </p>
        <p>
          This guide explains how bail bonds work in Delaware in clear, simple language. It is written for families
          who need calm answers, not legal confusion. You will learn what bail means, what types of bonds Delaware
          courts may use, what a bail bond agent does, and what families should do after release.
        </p>
        <p>
          This article is general information, not legal advice. Every case is different. Always follow the court
          order and speak with an attorney for legal guidance.
        </p>
      </section>

      <section id="section-what-is-bail">
        <h2>What Is Bail in Delaware?</h2>
        <p>
          Bail is a court-approved way for a defendant to be released from custody before the case is finished.
          The main purpose is not to punish the person. The goal is to help make sure the defendant returns to
          court and follows the conditions set by the judge.
        </p>
        <p>
          A bail bond is a written promise that the defendant will appear for future court dates. The court may
          also add conditions. For example, the person may be told not to contact an alleged victim, not to commit
          a new offense, or to follow other release rules.
        </p>
        <p>
          For official information, families can also review the Delaware Courts bail bond guide.
        </p>
      </section>

      <ArticleFigure
        src={HARDCODED_BLOG_IMAGES.process}
        alt="Delaware bail bond process explained step by step"
        caption="The Delaware bail bond process starts with arrest, bail setting, bond posting, and release conditions."
      />

      <section id="section-step-by-step">
        <h2>How Bail Bonds Work in Delaware Step by Step</h2>
        <p>Understanding the process makes the situation less stressful. Here is the basic flow.</p>

        <h3>Step 1: Arrest and Booking</h3>
        <p>
          After an arrest, the person is usually taken into custody. Law enforcement records basic information,
          checks charges, and starts the booking process. The family may not get full details right away, which is
          normal during the early stage.
        </p>
        <p>
          At this point, the most important thing is to confirm the person&apos;s full legal name, date of birth,
          location, and the charge if available.
        </p>

        <h3>Step 2: Bail Is Set by the Court</h3>
        <p>
          A judicial officer reviews the case and decides whether the defendant can be released and what conditions
          should apply. The court may look at several things, such as the charge, criminal history, risk of flight,
          ties to Delaware, and public safety concerns.
        </p>
        <p>
          This is why two people may have different bail amounts even if families think the cases sound similar.
          Bail depends on the facts of the case.
        </p>

        <h3>Step 3: The Family Reviews the Bond Type</h3>
        <p>
          Once bail is set, the next step is to understand the bond type. This matters because each bond works
          differently. Some require no money upfront. Others require cash, property, or help from a bail bond agent.
        </p>

        <h3>Step 4: A Bail Bond Agent May Help</h3>
        <p>
          If the bond allows a bail bond agent, the family can contact a licensed bail bond agent. The agent explains
          the cost, paperwork, payment options, and responsibilities.
        </p>
        <p>
          The person who signs for the bond is often called a co-signer or indemnitor. This person takes financial
          responsibility if the defendant fails to appear or breaks the bond agreement.
        </p>

        <h3>Step 5: Bond Is Posted</h3>
        <p>
          After paperwork and payment are completed, the bond is posted with the proper court or facility. The release
          does not always happen instantly. The jail or detention facility must receive the release order and complete
          its own process.
        </p>

        <h3>Step 6: The Defendant Must Follow the Rules</h3>
        <p>
          Release is not the end of the case. The defendant must appear in court and follow all conditions. Missing
          court can lead to a warrant, bond problems, and more stress for the family.
        </p>
      </section>

      <ArticleFigure
        src={HARDCODED_BLOG_IMAGES.bondTypes}
        alt="Types of bail bonds in Delaware including OR unsecured secured and cash only"
        caption="Delaware courts may use different bond types depending on the case and court order."
      />

      <section id="section-bond-types">
        <h2>Types of Bail Bonds in Delaware</h2>
        <p>
          Delaware courts may use different types of bonds. Families should understand the difference before signing
          anything.
        </p>
      </section>

      <section id="section-cost">
        <h2>How Much Does a Bail Bond Cost in Delaware?</h2>
        <p>
          The cost depends on the bail amount and the type of bond. In Delaware, surety bail bond premiums are
          controlled by law and approved rates. For surety bail bonds over $1,000, the filed premium must be within
          the legal range set by Delaware law.
        </p>
        <p>
          In simple words, families should not only ask, &ldquo;How much is bail?&rdquo; They should ask, &ldquo;What
          type of bond is it, and what amount is required to post it?&rdquo;
        </p>
        <p>
          Also, remember this important point: the bail bond premium is usually a service fee. It is not the same as
          paying the full bail amount to the court. Families should always ask what is refundable, what is not
          refundable, and whether collateral is needed.
        </p>
      </section>

      <section id="section-cosigner">
        <h2>What Does a Co-Signer Promise?</h2>
        <p>A co-signer is not just helping with paperwork. The co-signer is making a serious promise.</p>
        <p>When you sign a bail bond agreement, you may be promising that the defendant will:</p>
        <ul>
          <li>Go to every required court date</li>
          <li>Follow all court conditions</li>
          <li>Stay in contact when needed</li>
          <li>Avoid new legal trouble</li>
          <li>Follow the agreement with the bail bond agent</li>
        </ul>
        <p>
          If the defendant disappears, misses court, or breaks the agreement, the co-signer may face financial
          responsibility. That is why a trusted bail bond agent should explain the agreement before you sign.
        </p>
      </section>

      <section id="section-after-release">
        <h2>What Happens After Someone Is Released?</h2>
        <p>
          After release, the family should help the defendant stay organized. This is one of the most important parts
          of how bail bonds work in Delaware.
        </p>
        <p>
          Write down every court date. Save all paperwork. Keep phone numbers updated. Make sure the defendant
          understands every condition in the release order.
        </p>
        <p>
          A missed court date can create major problems. Even if it was an accident, the court may treat it seriously.
          So, reminders matter. Use a phone calendar, paper calendar, and family reminder system if needed.
        </p>
      </section>

      <section id="section-mistakes">
        <h2>Common Mistakes Families Should Avoid</h2>
        <p>
          Families often make quick decisions because they are scared. That is understandable. Still, some mistakes
          can make the process harder.
        </p>

        <h3>Mistake 1: Not Reading the Bond Conditions</h3>
        <p>
          Do not assume release means freedom with no rules. The court may add conditions. Read them carefully.
        </p>

        <h3>Mistake 2: Not Asking About Cash Only Bonds</h3>
        <p>
          A cash only bond is different from a secured bond. If the court requires cash only, a normal surety bond
          may not work.
        </p>

        <h3>Mistake 3: Signing Without Understanding Risk</h3>
        <p>
          Before you co-sign, ask what happens if the defendant misses court. Ask about fees, collateral, payment
          plans, and responsibilities.
        </p>

        <h3>Mistake 4: Losing Court Information</h3>
        <p>
          Keep every document in one safe place. Court dates, case numbers, receipts, and bond papers should be easy
          to find.
        </p>

        <h3>Mistake 5: Waiting Too Long to Ask for Help</h3>
        <p>If you are confused, ask early. A good bail bond agent can explain the process in plain English.</p>
      </section>

      <section id="section-when-posted">
        <h2>When Can Bond Be Posted in Delaware?</h2>
        <p>
          Bond posting depends on the court and case type. Some courts have regular business hours. For example,
          Family Court bond posting is usually handled during regular weekday business hours. Court of Common Pleas
          bond posting also has its own regular office hours.
        </p>
        <p>
          This means families should not assume every bond can be handled the same way at any hour. The correct
          location and timing depend on the court, the facility, and the type of case.
        </p>
      </section>

      <section id="section-family-court">
        <h2>What If the Person Is in Family Court?</h2>
        <p>
          Family Court cases can feel extra sensitive because they may involve juveniles, domestic issues, or
          family-related matters. If bond is set in Family Court, families should follow the specific Family Court
          instructions.
        </p>
        <p>
          For a juvenile, an adult may be able to post bond, but release rules can be different. The juvenile may
          only be released to a parent or guardian. Always confirm details with the court or a qualified
          professional.
        </p>
      </section>

      <section id="section-need-agent">
        <h2>Do You Need a Bail Bond Agent?</h2>
        <p>
          Not every case needs a bail bond agent. Some defendants are released on their own recognizance. Some have
          unsecured bonds. Some families may pay cash directly if allowed.
        </p>
        <p>
          However, a bail bond agent may help when the court sets a secured bond and the family cannot pay the full
          amount. The agent helps post the bond, explains the paperwork, and guides the family through the next steps.
        </p>
        <p>
          A reliable bail bond agent should be clear, calm, and transparent. They should explain the cost, the
          agreement, and your responsibilities before asking you to sign.
        </p>
      </section>

      <ArticleFigure
        src={HARDCODED_BLOG_IMAGES.checklist}
        alt="Family checklist for posting bail in Delaware"
        caption="Families should collect the defendant's name, location, bond type, court name, and next court date."
      />

      <section id="section-checklist">
        <h2>Family Checklist: What to Do First</h2>
        <p>When someone calls you after an arrest, stay calm and collect the right information.</p>
        <ul>
          <li>Full legal name of the defendant</li>
          <li>Date of birth</li>
          <li>Location of detention</li>
          <li>Charge, if known</li>
          <li>Bail amount, if already set</li>
          <li>Bond type</li>
          <li>Court name</li>
          <li>Next court date</li>
          <li>Any no-contact or release conditions</li>
        </ul>
        <p>This small checklist can save time and reduce confusion.</p>
      </section>

      <section id="section-faq">
        <h2>FAQs About How Bail Bonds Work in Delaware</h2>
        <FaqAccordion faqs={faqs} />
      </section>

      <section id="section-final">
        <h2>Final Thoughts</h2>
        <p>
          Learning how bail bonds work in Delaware can make a difficult moment feel more manageable. The key is to
          understand the bond type, read the conditions, ask clear questions, and make sure the defendant appears in
          court.
        </p>
        <p>
          In my experience helping Delaware families, the most important thing is calm guidance. Families do not need
          confusing legal talk during a crisis. They need clear steps, honest answers, and support they can trust.
        </p>
        <p>
          If your loved one has been arrested, start with the basics. Confirm the location, bond type, and court
          information. Then speak with a licensed bail bond agent or attorney so you can make the right next move.
        </p>
        <div className="bm-inline-cta bm-inline-cta--magazine">
          <div className="bm-inline-cta-icon" aria-hidden>
            <i className="far fa-calendar-alt bm-icon-gold" style={{ fontSize: '22px' }} />
          </div>
          <h3 className="bm-inline-cta-title">Need Help Right Now?</h3>
          <p className="bm-inline-cta-desc">
            Call A Way to Freedom Bail Bonds — available 24/7 for families across Delaware.
          </p>
          <a href="#/contact" className="bm-btn bm-btn--primary bm-btn--full bm-inline-cta-btn" onClick={handleCta}>
            Start the Process →
          </a>
        </div>
      </section>
    </>
  );
}
