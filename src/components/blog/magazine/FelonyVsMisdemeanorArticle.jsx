import { FELONY_VS_MISDEMEANOR_FAQS } from '../../../blog/felony-vs-misdemeanor-bonds-delaware-blog';
import { FaqAccordion, QuickAnswerBox } from './MagazineArticleParts';

export function FelonyVsMisdemeanorArticle({ navigate, onContactClick }) {
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
          When a loved one is arrested, the words &quot;felony&quot; and &quot;misdemeanor&quot; get used constantly — by police, by court paperwork, by whoever answers the phone at the detention center. Families often assume those words tell them exactly what kind of bond they need and how much it will cost. That assumption can slow things down or lead to the wrong questions being asked at the worst possible time.
        </p>
        <QuickAnswerBox>
          <p>
            <strong>Quick answer:</strong> In Delaware, felony and misdemeanor charges use the same four bail types — own recognizance, unsecured, secured, and cash-only — so the charge class alone doesn&apos;t determine which bond process applies. What changes is what the court considers when setting bail, and the legal consequences if release conditions are violated. The written court order, not the charge label, tells a family what to do next.
          </p>
        </QuickAnswerBox>
        <p>
          Delaware Courts identifies these four bail types as the release options in every case. The safest first step is to read the written order, confirm the exact bail type and amount, and ask the court or a licensed agent what the felony or misdemeanor classification means for that specific case before assuming anything.
        </p>
      </section>

      <section id="section-difference">
        <h2>The Main Difference Between Felony and Misdemeanor Bonds in Delaware</h2>
        <p>
          The most common misunderstanding is that &quot;felony bond&quot; and &quot;misdemeanor bond&quot; are two separate products with two separate processes. They aren&apos;t. Delaware Courts identifies four bail types — own recognizance, unsecured, secured, and cash-only — and any of them can apply to a felony or a misdemeanor case. What actually differs is the court&apos;s evaluation. Under Delaware law, the court weighs factors such as the nature and circumstances of the offense and the defendant&apos;s financial resources when deciding what bail to set, and a felony charge often brings more serious circumstances into that evaluation than a misdemeanor does.
        </p>
        <p>
          That&apos;s why two people can both be told they have &quot;secured bail,&quot; yet face very different amounts and conditions — the bail type is the same, but the court&apos;s reasoning behind the number is not.
        </p>
      </section>

      <section id="section-felony">
        <h2>What Is a Felony Charge in Delaware?</h2>
        <p>
          A felony is Delaware&apos;s more serious category of criminal charge, generally carrying the possibility of a longer prison sentence than a misdemeanor. For a family focused on bail, the practical point is narrower: a felony charge is one of the factors a court will weigh more heavily under the &quot;nature and circumstances of the offense&quot; standard used to set bail. Learn more on our <a href="/services/felony" onClick={(event) => handleNav(event, '/services/felony')}>felony bonds in Delaware</a> page.
        </p>
      </section>

      <section id="section-misdemeanor">
        <h2>What Is a Misdemeanor Charge in Delaware?</h2>
        <p>
          A misdemeanor is a less serious criminal charge than a felony, but it is still a real charge with real consequences — potential fines, potential jail time, and a court date that cannot be ignored. A lower charge class does not automatically mean a lower bond amount or an easier process; it means the court&apos;s evaluation of the offense&apos;s seriousness is different, which can lead to a different outcome. See our <a href="/services/misdemeanor" onClick={(event) => handleNav(event, '/services/misdemeanor')}>misdemeanor bail bonds in Delaware</a> page for charge-specific guidance.
        </p>
      </section>

      <section id="section-classes">
        <h2>Felony and Misdemeanor Classes in Delaware</h2>
        <p>
          Delaware groups both felonies and misdemeanors into classes, which affect sentencing if there&apos;s a conviction. This class structure exists in the Delaware Code, but it does not by itself set a bail amount — bail is still determined case by case under the factors a court is required to weigh. Families should not assume a specific class automatically maps to a specific bail amount; the safest approach is confirming both the charge class and the bail type directly from the court order.
        </p>
      </section>

      <section id="section-bail-types">
        <h2>Which Bail Types Apply to Felony and Misdemeanor Cases?</h2>
        <p>Both felony and misdemeanor cases in Delaware can involve any of the same four bail types:</p>
        <ul>
          <li><strong>Own recognizance (OR):</strong> The defendant is released after signing a written promise to appear, without paying money upfront.</li>
          <li><strong>Unsecured bail:</strong> The defendant signs a bond acknowledging financial liability if they fail to appear, again without upfront payment.</li>
          <li><strong>Secured bail:</strong> The defendant or someone acting for them pays the designated amount or posts approved security.</li>
          <li><strong>Cash-only bail:</strong> The full designated amount must be paid to the court before release — no substitute is accepted.</li>
        </ul>
        <h3>Example: Same Bail Type, Different Case</h3>
        <p>
          Two defendants — one facing a felony charge, one facing a misdemeanor — could both receive secured bail. The bail type on paper looks identical. What&apos;s different is the amount and any added conditions the court attaches, which depend on the specific case, not a fixed felony-versus-misdemeanor formula. This is exactly why reading the actual court order matters more than guessing based on the charge label. For more on how secured bail specifically works, see our guide to <a href="/blog/secured-bail-vs-cash-only-bail-delaware" onClick={(event) => handleNav(event, '/blog/secured-bail-vs-cash-only-bail-delaware')}>secured vs. cash-only bail in Delaware</a>.
        </p>
      </section>

      <section id="section-hearing">
        <h2>How Bail Is Set: The Hearing Process for Both Charge Types</h2>
        <p>
          Delaware courts don&apos;t use a fixed price list. A judicial officer looks at the case and sets bail intended to reasonably assure the defendant returns to court and that the community stays safe. Factors considered include:
        </p>
        <ul>
          <li>The nature and circumstances of the offense charged</li>
          <li>The defendant&apos;s financial resources</li>
          <li>The defendant&apos;s history and community ties, as weighed by the court</li>
          <li>Whether release conditions can reasonably assure appearance and safety</li>
        </ul>
        <p>
          This process happens for both felony and misdemeanor charges; what varies is how those factors weigh out in a given case. A felony charge doesn&apos;t guarantee a higher bail number by itself, but the seriousness that often comes with a felony charge tends to factor more heavily into the court&apos;s decision.
        </p>
        <p>
          Families sometimes ask which specific Delaware court will hear a given case. That depends on the charge and the case&apos;s procedural stage, and it&apos;s a detail worth confirming directly with the court or a licensed agent rather than assuming — court assignment isn&apos;t something to guess at from a charge label alone.
        </p>
      </section>

      <section id="section-compare">
        <h2>Felony vs. Misdemeanor Bonds at a Glance</h2>
        <div className="bm-table-wrap">
          <table className="blog-data-table">
            <thead><tr><th>Question</th><th>Felony Charge</th><th>Misdemeanor Charge</th></tr></thead>
            <tbody>
              <tr><td>Which bail types can apply?</td><td>Same four types: OR, unsecured, secured, cash-only.</td><td>Same four types: OR, unsecured, secured, cash-only.</td></tr>
              <tr><td>What does the court weigh more heavily?</td><td>Often more serious offense circumstances under Delaware&apos;s bail-setting standard.</td><td>Still evaluated under the same standard, typically with less severe circumstances.</td></tr>
              <tr><td>Is a bail bondsman able to help?</td><td>Yes, when the court&apos;s order permits a surety bond.</td><td>Yes, when the court&apos;s order permits a surety bond.</td></tr>
              <tr><td>What happens if release conditions are violated?</td><td>Violation is itself a class E felony under Delaware law.</td><td>Violation is itself a class A misdemeanor under Delaware law.</td></tr>
              <tr><td>Does the process end at release?</td><td>No — court dates and release conditions still apply.</td><td>No — court dates and release conditions still apply.</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="section-agent">
        <h2>When Can a Bail Bondsman Help With a Felony or Misdemeanor Bond?</h2>
        <p>
          A licensed Delaware bail agent can post a surety bond for secured bail whenever the court&apos;s order allows it — the charge being a felony or a misdemeanor doesn&apos;t change that basic ability. What changes is the review. For a felony case, an agent typically looks more closely at the charge details, any co-signer&apos;s financial situation, and whether collateral will be requested, simply because felony cases more often involve larger amounts or added conditions. For a misdemeanor case, the review still happens, but it may move faster if the amount and conditions are more straightforward.
        </p>
        <h3>Questions to Ask an Agent</h3>
        <ul>
          <li>Does the written order allow a surety bond for this charge?</li>
          <li>What is different about the review process because this is a felony (or misdemeanor) charge?</li>
          <li>What premium, collateral, or co-signer terms apply, in writing?</li>
          <li>Who should be contacted if a court date or condition changes?</li>
        </ul>
      </section>

      <section id="section-violations">
        <h2>What Happens If Release Conditions Are Violated?</h2>
        <p>This is one place where the charge class creates a documented legal difference.</p>
        <QuickAnswerBox>
          <p>
            <strong>Under 11 Del. C. §2113:</strong> Violating release conditions in connection with a <strong>felony</strong> charge is itself a <strong>class E felony</strong>. Violating release conditions in connection with a <strong>misdemeanor</strong> charge is itself a <strong>class A misdemeanor</strong>.
          </p>
        </QuickAnswerBox>
        <p>
          In both cases, the court may also issue a warrant, and anyone who signed the bond can face financial responsibility for a missed court date. This is exactly why every release condition — not just the bail amount — deserves to be read and understood before a defendant leaves the facility.
        </p>
      </section>

      <section id="section-mistakes">
        <h2>Common Mistakes Families Make With Felony and Misdemeanor Bonds</h2>
        <ul>
          <li><strong>Assuming the charge label sets the bond type:</strong> Felony and misdemeanor cases use the same four bail types; the charge doesn&apos;t dictate which one applies.</li>
          <li><strong>Assuming a felony always costs more:</strong> It&apos;s often true, but it isn&apos;t guaranteed — the court&apos;s evaluation of the specific case controls, not the label.</li>
          <li><strong>Skipping the written order:</strong> Verbal descriptions of &quot;felony bail&quot; or &quot;misdemeanor bail&quot; from a phone call are not a substitute for reading the actual court paperwork.</li>
          <li><strong>Not asking how the review differs:</strong> A bail agent may need more information for a felony case; asking upfront avoids delays.</li>
          <li><strong>Forgetting that release isn&apos;t the end:</strong> Court dates and conditions apply regardless of charge class, and violating them carries real legal consequences under Delaware law.</li>
        </ul>
        <p>
          For more practical guidance, see our article on <a href="/blog/how-to-bond-someone-out-of-jail-delaware" onClick={(event) => handleNav(event, '/blog/how-to-bond-someone-out-of-jail-delaware')}>how to bond someone out of jail in Delaware</a>.
        </p>
      </section>

      <section id="section-checklist">
        <h2>Checklist Before You Contact a Bail Bondsman</h2>
        <ol>
          <li><strong>Identify the exact charge:</strong> Felony or misdemeanor, and if possible, the specific offense.</li>
          <li><strong>Locate the bail type:</strong> Look for &quot;own recognizance,&quot; &quot;unsecured,&quot; &quot;secured,&quot; or &quot;cash only&quot; on the paperwork.</li>
          <li><strong>Confirm the exact amount:</strong> Don&apos;t rely only on what was said over the phone.</li>
          <li><strong>Ask what the review will involve:</strong> Felony cases may need more documentation from a co-signer.</li>
          <li><strong>Understand the release conditions:</strong> Know what&apos;s required after release, not just the dollar amount.</li>
          <li><strong>Keep every document:</strong> Save the order, receipts, and court dates in one place.</li>
        </ol>
        <p>
          If you&apos;re still trying to locate the bail amount or order, use our guide on <a href="/blog/how-much-does-a-bail-bond-cost-in-delaware" onClick={(event) => handleNav(event, '/blog/how-much-does-a-bail-bond-cost-in-delaware')}>Delaware bail bond costs</a>.
        </p>
      </section>

      <section id="section-faq"><h2>Felony and Misdemeanor Bond FAQs</h2><FaqAccordion faqs={FELONY_VS_MISDEMEANOR_FAQS} /></section>

      <section id="section-final">
        <h2>Confirm the Charge and Bond Type First</h2>
        <p>
          Bail bonds don&apos;t come in a &quot;felony version&quot; and a &quot;misdemeanor version&quot; — Delaware uses the same four bail types either way, and the court&apos;s written order is what actually controls what a family needs to do. The charge class matters for how the court weighs the case and for what happens if release conditions are violated, but it shouldn&apos;t be treated as a shortcut for guessing the bond type, the amount, or the process. A Way to Freedom Bail Bonds can help a family read the order, understand what review a felony or misdemeanor case may involve, and gather what&apos;s needed before contacting the court — but for legal advice about the charge itself, speak with a licensed Delaware attorney.
        </p>
        <p><a href="/contact" onClick={handleCta}>Contact A Way to Freedom Bail Bonds</a> for clear, confidential 24/7 guidance.</p>
        <p><strong>Legal disclaimer:</strong> This article is for general information only and is not legal advice.</p>
      </section>
    </>
  );
}
