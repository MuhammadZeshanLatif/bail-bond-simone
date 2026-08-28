export const DUI_BAIL_BOND_SLUG = 'dui-bail-bond-cost-delaware';

export const DUI_BAIL_BOND_TITLE =
  'How Much Is Bail for a DUI in Delaware? Bail and Bond Costs Explained';

export const DUI_BAIL_BOND_SUBTITLE =
  'Learn how Delaware courts set DUI bail, what a surety bond may cost, which factors affect the amount, and how to confirm the exact bail before paying.';

export const DUI_BAIL_BOND_META_TITLE =
  'How Much Is Bail for a DUI in Delaware? Costs Explained';

export const DUI_BAIL_BOND_META_DESCRIPTION =
  'Learn how Delaware courts set DUI bail, what a bail bond may cost, which factors affect the amount, and how families can confirm the exact bail.';

export const DUI_BAIL_BOND_KEYWORDS =
  'how much is bail for a dui, how much is bond for a dui, average bail for dui, dui bail bond cost, dui bail bonds Delaware, DUI bail Delaware';

export const DUI_BAIL_BOND_IMAGE = '/images/blog/dui-bail-bond-hero.webp';
export const DUI_BAIL_BOND_THUMBNAIL = '/images/blog/dui-bail-bond-thumbnail.webp';
export const DUI_BAIL_BOND_HERO_ALT = 'Delaware DUI bail and bail bond cost guide';
export const DUI_BAIL_BOND_CATEGORY = 'Bail Types';
export const DUI_BAIL_BOND_READ_MIN = 12;

export const DUI_BAIL_BOND_BENEFITS = [
  { icon: 'fa-scale-balanced', label: 'Bail Explained', sub: 'Court Factors' },
  { icon: 'fa-dollar-sign', label: 'Cost Example', sub: 'Premium Math' },
  { icon: 'fa-list-check', label: 'Call Checklist', sub: 'Confirm the Order' },
  { icon: 'fa-phone-alt', label: '24/7 Help', sub: 'Licensed DE Agent' },
];

export const DUI_BAIL_BOND_TAGS = [
  'DUI Bail', 'DUI Bail Bond Cost', 'Delaware DUI', 'Bail Bond Premium', 'Family Guide',
];

export const DUI_BAIL_BOND_FAQS = [
  {
    question: 'How much is bail for a DUI in Delaware?',
    answer: 'Delaware does not publish one standard DUI bail amount. A judicial officer sets bail after reviewing the charge, court-appearance risk, criminal history, community ties, public safety, and the facts of the arrest. The written bail order is the reliable source for the exact amount and bond type.',
  },
  {
    question: 'What is the average bail for a DUI?',
    answer: 'A statewide Delaware average is not a dependable way to predict an individual case. Two DUI arrests can produce different bail decisions because the court considers the defendant and the circumstances. Confirm the amount with the court, detention facility, written order, attorney, or licensed bail agent.',
  },
  {
    question: 'How much does a DUI bail bond cost in Delaware?',
    answer: 'For a surety bail bond over $1,000, Delaware law provides for a filed premium of 5% to 10% of the bond amount. The exact charge must follow the bail bond company’s filed rate and written agreement. Ask for the full written cost before signing.',
  },
  {
    question: 'What would the premium be on a $5,000 DUI bail?',
    answer: 'Using Delaware’s statutory 5% to 10% range only as an illustration, the premium on a $5,000 surety bond would be $250 to $500. This example does not predict the bail amount, confirm that a surety bond is allowed, or include any collateral terms in a specific agreement.',
  },
  {
    question: 'Can someone be released without paying cash after a DUI arrest?',
    answer: 'Possibly. Delaware recognizes Own Recognizance and unsecured bail as well as secured and cash-only bail. The judicial officer decides which type applies. Read the written order before assuming that cash, collateral, or a commercial surety bond is required.',
  },
  {
    question: 'How long does release take after DUI bail is posted?',
    answer: 'There is no guaranteed release time. The facility must verify the bond, complete paperwork, check for other holds, and finish its release process. Ask the facility or bail agent about current conditions, but treat any time estimate as an estimate rather than a promise.',
  },
  {
    question: 'Is a DUI bail bond premium refundable?',
    answer: 'A surety premium is generally the charge for the bond service rather than a deposit with the court. Refund and collateral treatment depend on the written agreement and applicable law. Review those terms before signing and ask when any collateral may be released.',
  },
  {
    question: 'Does posting DUI bail handle the Delaware DMV case?',
    answer: 'No. Posting bail addresses release from custody; it does not resolve the criminal charge or the separate DMV process. Delaware DMV says a driver generally has 15 days after the relevant notice is issued to request an administrative hearing, so review the notice promptly and seek legal advice.',
  },
];

const canonicalUrl = 'https://delawarebailbond.com/blog/dui-bail-bond-cost-delaware';

export const DUI_BAIL_BOND_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': `${canonicalUrl}#blogposting`,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
      headline: DUI_BAIL_BOND_TITLE,
      description: DUI_BAIL_BOND_META_DESCRIPTION,
      image: 'https://delawarebailbond.com/images/blog/dui-bail-bond-hero.webp',
      author: { '@type': 'Person', name: 'Simone Harris' },
      publisher: { '@type': 'Organization', name: 'A Way to Freedom Bail Bonds LLC', url: 'https://delawarebailbond.com' },
      datePublished: '2026-08-28',
      dateModified: '2026-08-28',
      about: ['DUI bail', 'DUI bail bond cost', 'Delaware DUI', 'Bail bond premium'],
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: DUI_BAIL_BOND_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://delawarebailbond.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://delawarebailbond.com/blog' },
        { '@type': 'ListItem', position: 3, name: DUI_BAIL_BOND_TITLE, item: canonicalUrl },
      ],
    },
  ],
};
