export const DUI_BAIL_BOND_SLUG = 'dui-bail-bond-cost-delaware';

export const DUI_BAIL_BOND_TITLE =
  'How Much Is Bail for a DUI in Delaware? Family Cost Guide';

export const DUI_BAIL_BOND_SUBTITLE =
  'Learn how much bail for a DUI is in Delaware, typical first-offense amounts, the 5%–10% surety premium, payment plans, the 15-day DMV deadline, and what happens after release.';

export const DUI_BAIL_BOND_META_TITLE =
  'How Much Is Bail for a DUI in Delaware? | Family Guide';

export const DUI_BAIL_BOND_META_DESCRIPTION =
  'How much is bail for a DUI in Delaware? Learn typical DUI bail amounts, the 5-10% bond premium, payment plans, the 15-day DMV deadline, and what to do after an arrest.';

export const DUI_BAIL_BOND_KEYWORDS =
  'how much is bail for a dui, dui bail bond cost, bail for dui, dui bail amount, how much is bail for drunk driving, drunk driving bail amount, dui bail bonds Delaware, DUI bail Delaware';

export const DUI_BAIL_BOND_IMAGE = '/images/blog/dui-bail-bond-hero.webp';

export const DUI_BAIL_BOND_THUMBNAIL = '/images/blog/dui-bail-bond-thumbnail.webp';

export const DUI_BAIL_BOND_HERO_ALT =
  'How much is bail for a DUI in Delaware — a family cost guide from A Way to Freedom Bail Bonds';

export const DUI_BAIL_BOND_CATEGORY = 'Bail Types';

export const DUI_BAIL_BOND_READ_MIN = 11;

export const DUI_BAIL_BOND_BENEFITS = [
  { icon: 'fa-dollar-sign', label: 'Cost Explained', sub: 'Amounts + Premium' },
  { icon: 'fa-clock', label: '24/7 Arraignment', sub: 'JP Court 11' },
  { icon: 'fa-file-signature', label: '15-Day DMV Alert', sub: 'Don\'t Miss It' },
  { icon: 'fa-phone-alt', label: 'Get Help Fast', sub: 'DE Licensed Agent' },
];

export const DUI_BAIL_BOND_TAGS = [
  'DUI Bail',
  'DUI Bail Bond Cost',
  'Delaware DUI',
  'Bail Bond Premium',
  'Family Guide',
  'JP Court 11',
];

export const DUI_BAIL_BOND_FAQS = [
  {
    question: 'How much is bail for a DUI in Delaware?',
    answer:
      'For a first offense, bail is commonly set between $500 and $5,000. Repeat offenses, high blood alcohol content, accidents, or injuries can raise the amount significantly. The exact figure depends on the facts of the case and the judicial officer\'s decision.',
  },
  {
    question: 'How much does a DUI bail bond cost?',
    answer:
      'If a licensed agent posts a surety bond, you pay a premium equal to the filed rate — generally 5% to 10% of the bail amount for bonds over $1,000. On a $2,000 bail, the premium is typically $100 to $200.',
  },
  {
    question: 'Is a DUI bail bond premium refundable?',
    answer:
      'No. The premium is a service fee paid to the bond company and is not refunded, even if the case is dismissed. Collateral posted for the bond is returned when the bond is exonerated and the case closes.',
  },
  {
    question: 'How long do you stay in jail after a DUI in Delaware?',
    answer:
      'After bail is posted, the facility still has its own processing steps. In many cases, release happens within a few hours, but timing depends on the jail, the paperwork, and the circumstances of the case.',
  },
  {
    question: 'Can you be released without bail after a DUI?',
    answer:
      'Yes. For a first-time offense with no aggravating factors, a judicial officer may release the defendant on personal recognizance or an unsecured bond, which requires a signed promise to appear rather than money up front.',
  },
  {
    question: 'Do I need a lawyer for a DUI in Delaware?',
    answer:
      'A bail bond agent helps with the release process; a licensed DUI defense attorney advises on the criminal case and can request a bail review or DMV hearing. Most families benefit from having both.',
  },
];

export const DUI_BAIL_BOND_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': 'https://delawarebailbond.com/blog/dui-bail-bond-cost-delaware/#blogposting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://delawarebailbond.com/blog/dui-bail-bond-cost-delaware',
      },
      headline: 'How Much Is Bail for a DUI in Delaware? Family Cost Guide',
      description:
        'How much is bail for a DUI in Delaware? Learn typical DUI bail amounts, the 5-10% bond premium, payment plans, the 15-day DMV deadline, and what to do after an arrest.',
      image:
        'https://delawarebailbond.com/images/blog/dui-bail-bond-hero.webp',
      author: {
        '@type': 'Organization',
        name: 'A Way to Freedom Bail Bonds LLC',
      },
      publisher: {
        '@type': 'Organization',
        name: 'A Way to Freedom Bail Bonds LLC',
        url: 'https://delawarebailbond.com',
      },
      datePublished: '2026-08-15',
      dateModified: '2026-08-15',
      about: ['DUI bail', 'DUI bail bond cost', 'Delaware DUI', 'Bail bond premium'],
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://delawarebailbond.com/blog/dui-bail-bond-cost-delaware/#faq',
      mainEntity: DUI_BAIL_BOND_FAQS.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://delawarebailbond.com/blog/dui-bail-bond-cost-delaware/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://delawarebailbond.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://delawarebailbond.com/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'How Much Is Bail for a DUI in Delaware? Family Cost Guide',
          item: 'https://delawarebailbond.com/blog/dui-bail-bond-cost-delaware',
        },
      ],
    },
  ],
};
