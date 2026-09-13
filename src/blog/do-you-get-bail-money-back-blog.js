export const BAIL_MONEY_BACK_POST = {
  slug: 'do-you-get-bail-money-back',
  title: 'Do You Get Bail Money Back? Delaware Refunds Explained',
  subtitle: 'Cash bail, premiums, collateral, forfeiture, and refund questions in plain English.',
  metaTitle: 'Do You Get Bail Money Back? Delaware Refund Guide',
  metaDescription:
    'Do you get bail money back in Delaware? Learn how cash bail, bail bond premiums, collateral, forfeiture, and court refunds work.',
  keywords:
    'do you get bail money back, bail money do you get it back, do you get your bail money back, do you get bond money back, is bail money returned, where does bail money go, how to get bail money back',
  heroImage: '/images/blog/do-you-get-bail-money-back/do-you-get-bail-money-back-title.webp',
  thumbnail: '/images/blog/do-you-get-bail-money-back/do-you-get-bail-money-back-delaware-hero.webp',
  ogImage: '/images/blog/do-you-get-bail-money-back/do-you-get-bail-money-back-delaware-og.webp',
  flowImage: '/images/blog/do-you-get-bail-money-back/where-bail-money-goes-delaware.webp',
  heroAlt: 'Do You Get Bail Money Back Delaware refund guide by Simone Harris',
  heroCaption: 'Educational guide; not legal advice or a guarantee of any refund.',
  heroWidth: 1600,
  heroHeight: 1200,
  categoryLabel: 'Bail Costs',
  readMin: 10,
  benefits: [],
  tags: ['Bail Refunds', 'Cash Bail', 'Collateral', 'Delaware Bail Help'],
  faqs: [
    {
      question: 'Do You Get Bail Money Back When Charges Are Dropped?',
      answer:
        'Cash posted with a court may become eligible for return after the case reaches the required disposition, but dismissal alone should not be treated as a promise of an immediate or full refund. The court record, bail status, posting party, applicable orders, and authorized handling of funds still matter.',
    },
    {
      question: 'Do You Get Bond Money Back After the Case Ends?',
      answer:
        'Bond money can mean different things. Cash personally posted with the court follows court procedures. A bail-agent premium is separate from court-held cash. Collateral is subject to the bond agreement and applicable Delaware requirements.',
    },
    {
      question: 'What Happens If I Lost the Bail Receipt?',
      answer:
        'A missing receipt does not necessarily mean the money is lost. Contact the appropriate Delaware court and ask what documentation it requires when the original receipt is unavailable.',
    },
    {
      question: 'What Should I Do If My Bail Refund Has Not Arrived?',
      answer:
        'Confirm the case and bail status, appropriate court, posting-party information, mailing details, and whether any court order or applicable financial obligation affects the funds. For collateral or bail-bond contract issues, contact the relevant bail agent.',
    },
    {
      question: 'How Long Does a Bail Refund Take in Delaware?',
      answer:
        'Do not rely on a fixed timeline quoted for another state. Processing can depend on case status, the court handling the matter, verification of the posting party, and other circumstances.',
    },
  ],
  tocEntries: [
    { id: 'bail-refund-section-1', prefix: '1.', label: 'Quick Answer' },
    { id: 'bail-refund-section-2', prefix: '2.', label: 'What Did You Pay?' },
    { id: 'bail-refund-section-3', prefix: '3.', label: 'Guilty or Not Guilty' },
    { id: 'bail-refund-section-4', prefix: '4.', label: 'Where the Money Goes' },
    { id: 'bail-refund-section-5', prefix: '5.', label: 'Who Gets It Back?' },
    { id: 'bail-refund-section-6', prefix: '6.', label: 'Refund Delays' },
    { id: 'bail-refund-section-7', prefix: '7.', label: 'Delaware Checklist' },
    { id: 'bail-refund-section-8', prefix: '8.', label: 'Collateral' },
    { id: 'bail-refund-section-9', prefix: '9.', label: 'Examples' },
    { id: 'bail-refund-section-10', prefix: '10.', label: 'FAQs' },
    { id: 'bail-refund-section-11', prefix: '11.', label: 'Need Help?' },
  ],
  articleKey: 'bail-money-back',
  publishedAt: '2026-09-14',
  updatedAt: '2026-09-14',
  customSchema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': 'https://delawarebailbond.com/blog/do-you-get-bail-money-back#blogposting',
        url: 'https://delawarebailbond.com/blog/do-you-get-bail-money-back',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://delawarebailbond.com/blog/do-you-get-bail-money-back',
        },
        headline: 'Do You Get Bail Money Back? Delaware Refunds Explained',
        description:
          'Do you get bail money back in Delaware? Learn how cash bail, bail bond premiums, collateral, forfeiture, and court refunds work.',
        inLanguage: 'en-US',
        image: 'https://delawarebailbond.com/images/blog/do-you-get-bail-money-back/do-you-get-bail-money-back-delaware-og.webp',
        datePublished: '2026-09-14',
        dateModified: '2026-09-14',
        publisher: {
          '@type': 'Organization',
          name: 'A Way to Freedom Bail Bonds',
          url: 'https://delawarebailbond.com/',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://delawarebailbond.com/blog/do-you-get-bail-money-back#faq',
        mainEntity: [],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://delawarebailbond.com/blog/do-you-get-bail-money-back#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://delawarebailbond.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://delawarebailbond.com/blog',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Do You Get Bail Money Back? Delaware Refunds Explained',
            item: 'https://delawarebailbond.com/blog/do-you-get-bail-money-back',
          },
        ],
      },
    ],
  },
};

BAIL_MONEY_BACK_POST.customSchema['@graph'][1].mainEntity = BAIL_MONEY_BACK_POST.faqs.map((faq) => ({
  '@type': 'Question',
  name: faq.question,
  acceptedAnswer: {
    '@type': 'Answer',
    text: faq.answer,
  },
}));
