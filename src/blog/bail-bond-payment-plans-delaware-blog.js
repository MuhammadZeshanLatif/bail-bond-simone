const PAYMENT_PLANS_URL = 'https://delawarebailbond.com/blog/how-do-bail-bond-payment-plans-work';
const PAYMENT_PLANS_IMAGE_DIR = '/images/blog/how-do-bail-bond-payment-plans-work';

export const PAYMENT_PLANS_FAQS = [
  {
    question: 'Do bail bondsmen take payments?',
    answer: 'Many do. In Delaware, a surety bail agent must receive at least 5% of a bond over $1,000 before posting it. The rest of the filed premium can be paid on a schedule written into the signed contract. Whether a plan is offered depends on the agency and the case.',
  },
  {
    question: 'Can you make monthly payments on a bond?',
    answer: 'Yes, if the agency agrees and the schedule is written into the contract. Monthly is common, but weekly and bi-weekly schedules exist too. The payments cover the premium you owe the agency, not the court\'s bail amount.',
  },
  {
    question: 'How much does a $1,000 bail bond cost?',
    answer: 'At A Way to Freedom Bail Bonds\' 10% rate, the premium on a $1,000 bond is $100. Delaware\'s 5% minimum-before-posting rule is written for surety bonds above $1,000, so ask the agent what is due before a $1,000 bond is posted.',
  },
  {
    question: 'How much does a $30,000 bond cost?',
    answer: 'At a 10% premium, a $30,000 surety bond costs $3,000. At least $1,500 (5% of the bond) must be paid before posting in Delaware. The remaining $1,500 can be paid under a written payment plan if the agency approves one.',
  },
  {
    question: 'Do bail bond payment plans charge interest?',
    answer: 'Delaware law says a surety bail agent cannot charge an administrative fee, service charge, or similar fee unless it has been filed with and approved by the Department of Insurance. Ask the agent to show you every charge in the written contract before you sign.',
  },
  {
    question: 'Do bail bonds that do payment plans check credit?',
    answer: 'Some agencies do and some don\'t. Many look more closely at the co-signer\'s job, income, and ties to Delaware than at a credit score. Ask what the agency reviews before you share documents, and never sign a blank form.',
  },
  {
    question: 'Is the premium refunded if the charges are dropped?',
    answer: 'No. At A Way to Freedom Bail Bonds, the premium is non-refundable once bail is posted, whatever happens in the case. If you are on a payment plan, the unpaid balance is still owed when the case ends early. Collateral is different and is returned under the agreement.',
  },
];

export const PAYMENT_PLANS_POST = {
  slug: 'how-do-bail-bond-payment-plans-work',
  title: 'How Do Bail Bond Payment Plans Work? A Delaware Guide to Down Payments, Terms, and Eligibility',
  metaTitle: 'Bail Bonds Payment Plans: How They Work in Delaware',
  metaDescription: 'Bail bonds payment plans let you pay the premium over time. See Delaware\'s 5% upfront rule, cost examples, co-signer duties, and what to ask before signing.',
  ogDescription: 'How bail bond payment plans work in Delaware: what is due before posting, monthly balances, co-signer duties, missed payments, and questions to ask.',
  subtitle: 'What you pay before posting, how the balance works, and what to check before you sign.',
  excerpt: 'Bail bonds payment plans spread the premium over time. Learn Delaware\'s 5% upfront rule, see $1,000 to $30,000 examples, and know what to ask before signing.',
  keywords: 'bail bonds payment plans, bail bond payment plans, payment plan bail bonds, bail bonds payment plan, bail bonds that do payment plans, how do bail bond payment plans work',
  heroImage: `${PAYMENT_PLANS_IMAGE_DIR}/how-do-bail-bond-payment-plans-work-delaware.webp`,
  thumbnail: `${PAYMENT_PLANS_IMAGE_DIR}/how-do-bail-bond-payment-plans-work-delaware.webp`,
  ogImage: `${PAYMENT_PLANS_IMAGE_DIR}/how-do-bail-bond-payment-plans-work-delaware.webp`,
  heroAlt: 'How bail bond payment plans work in Delaware guide by Simone Harris',
  heroWidth: 1536,
  heroHeight: 1024,
  categoryLabel: 'Bail Costs',
  readMin: 10,
  benefits: [],
  tags: ['Payment Plans', 'Bail Costs', 'Co-Signers', 'Delaware Bail Help'],
  articleKey: 'bail-bond-payment-plans',
  publishedAt: '2026-10-15',
  updatedAt: '2026-10-15',
  faqs: PAYMENT_PLANS_FAQS,
  tocEntries: [
    { id: 'payment-plans-section-1', label: 'Do Bail Bonds Offer Payment Plans?' },
    { id: 'payment-plans-section-2', label: 'What a Payment Plan Covers' },
    { id: 'payment-plans-section-3', label: 'How Payment Plans Work, Step by Step' },
    { id: 'payment-plans-section-4', label: 'Payment Plan Examples' },
    { id: 'payment-plans-section-5', label: 'Who Qualifies for a Payment Plan?' },
    { id: 'payment-plans-section-6', label: 'What to Bring' },
    { id: 'payment-plans-section-7', label: 'If You Miss a Payment' },
    { id: 'payment-plans-section-8', label: 'If the Case Ends Early' },
    { id: 'payment-plans-section-9', label: 'Payment Plan vs Other Options' },
    { id: 'payment-plans-section-10', label: 'Questions to Ask Before You Sign' },
    { id: 'payment-plans-section-11', label: 'Payment Plan FAQs' },
    { id: 'payment-plans-section-12', label: 'Get Help in Delaware' },
  ],
  customSchema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        url: PAYMENT_PLANS_URL,
        mainEntityOfPage: { '@type': 'WebPage', '@id': PAYMENT_PLANS_URL },
        headline: 'How Do Bail Bond Payment Plans Work? A Delaware Guide to Down Payments, Terms, and Eligibility',
        description: 'Bail bonds payment plans let you pay the premium over time. See Delaware\'s 5% upfront rule, cost examples, co-signer duties, and what to ask before signing.',
        image: `https://delawarebailbond.com${PAYMENT_PLANS_IMAGE_DIR}/how-do-bail-bond-payment-plans-work-delaware.webp`,
        inLanguage: 'en-US',
        datePublished: '2026-10-15',
        dateModified: '2026-10-15',
        author: { '@type': 'Person', name: 'Simone Harris' },
        publisher: { '@type': 'Organization', name: 'A Way to Freedom Bail Bonds', url: 'https://delawarebailbond.com/' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://delawarebailbond.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://delawarebailbond.com/blog' },
          { '@type': 'ListItem', position: 3, name: 'How Do Bail Bond Payment Plans Work?', item: PAYMENT_PLANS_URL },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: PAYMENT_PLANS_FAQS.map(({ question, answer }) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  },
};

// Block styles: '' paragraph, Heading1 = H2 section, Heading2 = H3, ListNumber / ListBullet = list items.
// type 'table' with one row renders as the quick-answer box; type 'image' renders a figure.
export const PAYMENT_PLANS_BLOCKS = [
  { type: 'p', style: '', text: 'Bail bonds payment plans let a family pay a bail agent\'s premium over weeks or months instead of all at once. In Delaware, the plan can\'t start at zero. For a surety bond over $1,000, state law requires the agent to receive at least 5% of the bond amount, and sign a written contract with you, before the bond is posted.' },
  { type: 'p', style: '', text: 'That rule is the part most national guides leave out. They talk about "low down payments" and "flexible terms" without saying what the law in your state actually allows. This guide uses Delaware\'s rules and A Way to Freedom Bail Bonds\' own rates to show what you pay before posting, how the balance works, what a co-signer signs up for, and which questions keep a plan from turning into a problem later.' },
  { type: 'table', rows: [['Quick Answer', 'Yes, many Delaware bail agents offer payment plans, but only for the premium. A Way to Freedom Bail Bonds charges a 10% total premium and must collect at least 5% of the bond before posting. On a $10,000 bond, that means $500 before release and a $500 balance paid on the written schedule.']] },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-1', text: 'Do Bail Bonds Offer Payment Plans?' },
  { type: 'p', style: '', text: 'Most bail agencies offer some kind of installment arrangement, because very few families have thousands of dollars ready at 2 a.m. on a weeknight. What changes from state to state is how much has to be paid before the bond goes to the court.' },
  { type: 'p', style: '', text: 'Delaware sets that floor in 18 Del. C. § 4347. For a surety bail bond above $1,000, the total filed premium must be between 5% and 10% of the bond, and the agent can\'t post the bond without first receiving at least 5%. So a payment plan in Delaware covers whatever is left between the 5% paid upfront and the agency\'s full filed rate.' },
  { type: 'p', style: '', text: 'A payment plan is something the agency agrees to, not something you\'re owed. An agent can decline a plan, ask for a co-signer, or ask for collateral before agreeing to one.' },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-2', text: 'What a Payment Plan Covers: Bail Amount vs Premium vs Down Payment' },
  { type: 'p', style: '', text: 'Three different numbers get mixed up in almost every phone call about bail. Keep them apart and the rest of the plan is easy to follow.' },
  { type: 'table', rows: [
    ['Term', 'What it is', 'Who it goes to', '$10,000 bond example'],
    ['Bail amount', 'The amount the court sets as a condition of release', 'The court (the agency posts the bond for it)', '$10,000'],
    ['Premium', 'The agency\'s charge for posting the bond, at its filed rate', 'The bail agency', '$1,000 at 10%'],
    ['Amount due before posting', 'The part of the premium Delaware requires before the bond is posted', 'The bail agency', '$500 (5%)'],
    ['Payment plan balance', 'The rest of the premium, paid on the written schedule', 'The bail agency', '$500'],
  ] },
  { type: 'p', style: '', text: 'Collateral is a separate item. Delaware law defines it as money or property pledged as security for the bond, and § 4348 requires it to be reasonable for the size of the bond and receipted in writing. Collateral is not part of the premium, and paying collateral doesn\'t reduce what you owe on the plan.' },
  { type: 'p', style: 'Heading2', text: 'Delaware\'s premium rule and the minimum due before posting' },
  { type: 'p', style: '', text: 'Under § 4347(b), the premium can\'t be higher or lower than the rate the agency filed with the Delaware Department of Insurance. That\'s why an offer to "beat" another agency\'s price is a red flag in Delaware: a licensed agent isn\'t allowed to charge less than its filed rate. A Way to Freedom Bail Bonds charges 10%, and the 5% collected before posting counts toward that 10%.' },
  { type: 'p', style: '', text: 'The same section requires a written contract signed by the parties before posting. The payment schedule belongs in that contract. If the due dates or amounts aren\'t written down, you don\'t really have a plan yet.' },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-3', text: 'How Bail Bond Payment Plans Work, Step by Step' },
  { type: 'p', style: '', text: 'The order below is how a typical Delaware surety bond with a payment plan comes together. The paperwork can be done in person or remotely, but none of the steps can be skipped.' },
  { type: 'p', style: 'Heading2', text: 'Step 1: Confirm the bail amount and bond type' },
  { type: 'p', style: '', text: 'You need the exact bail amount, the type of bail (secured, unsecured, or cash only), the charge, and where the person is being held. A surety bond can only be used when the court allows secured bail. If you don\'t have these details yet, start with how do you find out how much someone\'s bail is.' },
  { type: 'p', style: 'Heading2', text: 'Step 2: Tell the agent what you can pay now and later' },
  { type: 'p', style: '', text: 'Be honest about the money available tonight and what you can pay each week or month. The agent will compare that with the bond amount and the 5% minimum. Promising a schedule you can\'t keep only moves the problem a few weeks down the road.' },
  { type: 'p', style: 'Heading2', text: 'Step 3: Sign the indemnity agreement and the written schedule' },
  { type: 'p', style: '', text: 'The co-signer (indemnitor) signs an agreement promising that the defendant will go to court and that the premium will be paid. The payment schedule should list each due date, each amount, how payments are made, and what happens if one is late. Read it all before you sign, and keep a copy.' },
  { type: 'p', style: 'Heading2', text: 'Step 4: Pay the amount due before posting' },
  { type: 'p', style: '', text: 'For a surety bond over $1,000, at least 5% has to be received before the agent can post the bond. Get a receipt with the amount and date. It should say the payment counts toward the premium. Delaware requires bail agents to keep premium receipts in each client file, so asking for one is routine.' },
  { type: 'p', style: 'Heading2', text: 'Step 5: Pay the balance on schedule' },
  { type: 'p', style: '', text: 'After release, the remaining premium is paid on the dates in the contract. Keep every receipt until the balance reaches zero and the bond is discharged. For the full release process from arrest to bond, see the bail bond process step by step.' },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-4', text: 'Payment Plan Examples: $1,000, $10,000, and $30,000 Bail' },
  { type: 'p', style: '', text: 'These figures use A Way to Freedom Bail Bonds\' 10% premium and Delaware\'s 5% minimum before posting. They show the math only. The real schedule depends on the agency\'s approval and the signed agreement.' },
  { type: 'table', rows: [
    ['Bond amount', 'Total premium (10%)', 'Minimum before posting (5%)', 'Balance on the plan'],
    ['$1,000', '$100', 'Ask the agent (5% rule covers bonds over $1,000)', 'Depends on the upfront payment'],
    ['$5,000', '$500', '$250', '$250'],
    ['$10,000', '$1,000', '$500', '$500'],
    ['$30,000', '$3,000', '$1,500', '$1,500'],
  ] },
  { type: 'image', file: 'bail-bond-payment-plan-example-delaware.webp', alt: 'Delaware bail bond payment plan example on a $10,000 bond showing 5% before posting and the balance', caption: 'Illustration only, not a price quote. On a $10,000 bond: $500 before posting, $500 on the written schedule.' },
  { type: 'p', style: '', text: 'On a $30,000 bond, $1,500 before posting and $1,500 over, say, six monthly payments works out to $250 a month. That\'s an example of the arithmetic, not a promised term. For a wider look at bail costs, read how much a bail bond costs in Delaware or the surety bond cost guide.' },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-5', text: 'Who Qualifies for a Bail Bond Payment Plan?' },
  { type: 'p', style: '', text: 'There\'s no statewide approval checklist. Each agency decides based on the risk it\'s taking on. In practice, agents usually look at the co-signer\'s job and income, how long they\'ve lived in the area, the size of the bond, the charge, and whether the defendant has missed court before.' },
  { type: 'p', style: 'Heading2', text: 'What a co-signer agrees to' },
  { type: 'p', style: '', text: 'A co-signer is the person most agencies rely on when they agree to a plan. By signing, you usually promise two things: that the premium balance will be paid and that the defendant will appear in court. Under § 4347(d), the agreement can give the agent a right of action against an indemnitor who breaches it, up to the bond amount plus verified, reasonable expenses. Don\'t co-sign for someone you don\'t trust to show up.' },
  { type: 'p', style: 'Heading2', text: 'When collateral may be requested' },
  { type: 'p', style: '', text: 'For larger bonds, or when the co-signer\'s income is thin, an agent may ask for collateral such as a vehicle title or real estate. Delaware requires collateral to be reasonable in relation to the bond and requires a written receipt. Ask how and when it will be returned before you hand anything over.' },
  { type: 'p', style: 'Heading2', text: 'Cases where a plan may not be offered' },
  { type: 'p', style: '', text: 'If the court sets cash-only bail, a surety bond can\'t be used. Delaware does license property bail agents to post cash bail, but § 4347(f) sets that charge at 20% to 30% of the cash bail, with at least 20% before posting. A very high bond or a record of missed court dates can also lead an agency to ask for full payment or collateral. The differences between bail types are covered in secured bail vs cash-only bail in Delaware.' },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-6', text: 'What to Bring When You Set Up a Plan' },
  { type: 'p', style: '', text: 'Having these ready can save an hour of back-and-forth when the bond is ready to post:' },
  { type: 'p', style: 'ListBullet', text: 'The defendant\'s full legal name, date of birth, and booking or case number' },
  { type: 'p', style: 'ListBullet', text: 'The bail amount, bond type, and court or facility' },
  { type: 'p', style: 'ListBullet', text: 'The co-signer\'s photo ID and current address' },
  { type: 'p', style: 'ListBullet', text: 'Proof of income, such as recent pay stubs or a bank statement' },
  { type: 'p', style: 'ListBullet', text: 'Employer name and phone number' },
  { type: 'p', style: 'ListBullet', text: 'The payment for the amount due before posting' },
  { type: 'p', style: 'ListBullet', text: 'Collateral documents, only if the agent has asked for them' },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-7', text: 'What Happens If You Miss a Payment?' },
  { type: 'p', style: '', text: 'The contract decides. Common terms include a late notice, a demand for the full remaining balance, and collection action against the co-signer. Some contracts also let the agency take steps on the bond itself after a serious breach, so ask that question directly before you sign.' },
  { type: 'p', style: '', text: 'If you know a payment will be late, call the agent before the due date. Agencies have more room to adjust a schedule they hear about early than one they find out about after it\'s missed.' },
  { type: 'p', style: 'Heading2', text: 'A missed payment vs a missed court date' },
  { type: 'p', style: '', text: 'These are two different problems, and the second one is far more serious.' },
  { type: 'table', rows: [
    ['', 'Missed payment', 'Missed court date'],
    ['Who it affects first', 'The payer and the co-signer', 'The defendant, then the co-signer'],
    ['What controls it', 'The payment terms in the contract', 'The court\'s order and the bond conditions'],
    ['Typical result', 'Late notice, balance demand, collection', 'Possible warrant and bond forfeiture'],
    ['First move', 'Call the agent before the due date', 'Call the agent and a defense attorney immediately'],
  ] },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-8', text: 'What Happens If the Case Ends Before the Plan Is Paid Off?' },
  { type: 'p', style: '', text: 'The balance is still owed. The premium pays for posting the bond, and that service is complete once the defendant is released. At A Way to Freedom Bail Bonds, the premium is non-refundable once bail is posted, whether the charges are dropped, reduced, or go to trial.' },
  { type: 'p', style: '', text: 'Collateral works differently. Once the bond is discharged and the contract terms are met, collateral is returned under the agreement. For more on what money comes back and what doesn\'t, see do you get bail money back.' },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-9', text: 'Payment Plan vs Other Ways to Cover Bail' },
  { type: 'p', style: '', text: 'A payment plan isn\'t the only route. Here\'s how it compares with the options families usually weigh:' },
  { type: 'table', rows: [
    ['Option', 'Upfront cost', 'Money back?', 'Main risk'],
    ['Bail bond payment plan', 'At least 5% of the bond (over $1,000)', 'Premium is not refunded', 'Co-signer owes the balance and the bond if terms are broken'],
    ['Paying the full bail to the court', '100% of the bail amount', 'Usually, after the case if conditions are met', 'Large amount tied up for months'],
    ['Unsecured bail', 'Nothing upfront', 'Nothing paid', 'Owed in full if the defendant fails to appear'],
    ['Credit card or personal loan for the premium', 'Depends on the lender', 'Premium is not refunded', 'Interest from the card or lender on top of the premium'],
  ] },
  { type: 'p', style: '', text: 'If the court set unsecured bail, you may not need a bail agent at all; what is unsecured bail in Delaware explains how that works.' },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-10', text: 'Questions to Ask Before You Sign' },
  { type: 'p', style: '', text: 'Use these questions on the phone or in the office. A licensed Delaware agent should answer every one of them without hesitation:' },
  { type: 'p', style: 'ListNumber', text: 'What is your filed premium rate, and what is the total premium in dollars?' },
  { type: 'p', style: 'ListNumber', text: 'How much do I need to pay before the bond is posted?' },
  { type: 'p', style: 'ListNumber', text: 'What is the balance, and what are the exact due dates and amounts?' },
  { type: 'p', style: 'ListNumber', text: 'Are there any other charges, and are they filed and approved?' },
  { type: 'p', style: 'ListNumber', text: 'Is collateral required, and how is it returned?' },
  { type: 'p', style: 'ListNumber', text: 'What happens if a payment is late or missed?' },
  { type: 'p', style: 'ListNumber', text: 'What am I responsible for as the co-signer if the defendant misses court?' },
  { type: 'p', style: 'ListNumber', text: 'Will I get a copy of the signed contract and a receipt for every payment?' },
  { type: 'image', file: 'bail-bond-payment-plan-questions-checklist.webp', alt: 'Checklist of questions to ask before signing a Delaware bail bond payment plan', caption: 'Bring this list to the call. Get every answer in the written contract.' },
  { type: 'p', style: '', text: 'Be careful with any offer that sounds cheaper than the filed rate, or "no money down" on a large surety bond. In Delaware, a surety agent can\'t post a bond over $1,000 without first receiving at least 5%, and can\'t charge less than its filed rate.' },

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-11', text: 'Bail Bond Payment Plan FAQs' },
  ...PAYMENT_PLANS_FAQS.flatMap(({ question, answer }) => [
    { type: 'p', style: 'Heading2', text: question },
    { type: 'p', style: '', text: answer },
  ]),

  { type: 'p', style: 'Heading1', id: 'payment-plans-section-12', text: 'Get Help Setting Up a Payment Plan in Delaware' },
  { type: 'p', style: '', text: 'A bail bond payment plan works best when every number is written down before anyone signs: the bond amount, the 10% premium, the 5% due before posting, the balance, and each due date. If someone you love was just arrested in Delaware, you can review our bail bond payment options or contact A Way to Freedom Bail Bonds any time, day or night, to talk through what\'s due now. This article is general information about Delaware bail and isn\'t legal advice; questions about the charges themselves belong with a defense attorney.' },
];
