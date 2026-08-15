export const BAIL_VS_BOND_SLUG = 'bail-vs-bond-delaware';

export const BAIL_VS_BOND_TITLE =
  'Bail vs Bond in Delaware: What\'s the Difference?';

export const BAIL_VS_BOND_SUBTITLE =
  'Learn the difference between bail and bond in Delaware, including cash bail, surety bonds, the 5%–10% filed premium, refunds, and what happens if the defendant misses court.';

export const BAIL_VS_BOND_META_TITLE =
  'Bail vs Bond in Delaware: What\'s the Difference? | Family Guide';

export const BAIL_VS_BOND_META_DESCRIPTION =
  'What\'s the difference between bail and bond in Delaware? Learn how bail is set, how surety bonds work, what the premium is, and which option fits your family.';

export const BAIL_VS_BOND_KEYWORDS =
  'bail vs bond, bond vs bail, difference between bail and bond, difference between bond and bail, jail bond vs bail, is bail and bond the same, bail vs bond Delaware, cash bail vs surety bond, Delaware bail bond';

export const BAIL_VS_BOND_IMAGE = '/images/blog/delaware-bail-vs-bond-hero.webp';

export const BAIL_VS_BOND_THUMBNAIL = '/images/blog/delaware-bail-vs-bond-thumbnail.webp';

export const BAIL_VS_BOND_HERO_ALT =
  'Bail vs bond in Delaware — a simple family guide comparing cash bail and surety bonds, from A Way to Freedom Bail Bonds';

export const BAIL_VS_BOND_CATEGORY = 'Bail Types';

export const BAIL_VS_BOND_READ_MIN = 12;

export const BAIL_VS_BOND_BENEFITS = [
  { icon: 'fa-scale-balanced', label: 'Know the Difference', sub: 'Bail vs Bond' },
  { icon: 'fa-dollar-sign', label: 'Clear Pricing', sub: '5%–10% Premium' },
  { icon: 'fa-file-circle-check', label: 'Refunds Explained', sub: 'What Comes Back' },
  { icon: 'fa-phone-alt', label: 'Get Help 24/7', sub: 'DE Licensed Agent' },
];

export const BAIL_VS_BOND_TAGS = [
  'Bail vs Bond',
  'Difference Between Bail and Bond',
  'Cash Bail',
  'Surety Bond',
  'Delaware Bail Bonds',
  'Family Guide',
];

export const BAIL_VS_BOND_FAQS = [
  {
    question: 'What is the difference between bail and bond?',
    answer:
      'Bail is the money or security set by the court that allows a defendant to be released before trial. A bond is a promise or financial guarantee, often posted by a bail bond company, that ensures the defendant appears in court. When a surety bond is used, the defendant or co-signer pays a non-refundable premium rather than the full bail amount.',
  },
  {
    question: 'Is bail the same as bond?',
    answer:
      'No. Bail is the amount set by the court, while a bond is the agreement that satisfies that requirement. Cash bail is paid in full to the court. A surety bond is posted by a licensed bail bond company in exchange for a premium, which in Delaware is a filed rate generally between 5% and 10% of the bail amount for bonds over $1,000.',
  },
  {
    question: 'Which is cheaper in Delaware: cash bail or a bail bond?',
    answer:
      'It depends on the amount and the case. Cash bail requires the full bail amount up front, which is refundable at the end of the case if all appearances are met. A surety bond requires only the premium — typically 5% to 10% — but the premium is not refundable. For a $10,000 bail, cash bail costs $10,000 up front, while a bond premium would generally be $500 to $1,000.',
  },
  {
    question: 'Is a bail bond premium refundable in Delaware?',
    answer:
      'No. The premium paid to a bail bond company is a service fee and is generally not refunded, even if the case is dismissed. Any collateral that was posted is returned when the bond is exonerated and the case is resolved. Ask for the refund and collateral terms in writing before signing.',
  },
  {
    question: 'What happens if the defendant misses court?',
    answer:
      'The court can issue a bench warrant and the bond can be forfeited. Whoever signed as co-signer may become financially responsible for the full bail amount, and collateral may be kept. A licensed bail agent can help explain the co-signer\'s responsibilities before anyone signs.',
  },
  {
    question: 'Can a bail bond company help with any bail type in Delaware?',
    answer:
      'A licensed Delaware bail agent can help when the court\'s order permits a surety bond. If the order says cash-only bail, the defendant or family may need to pay the full amount to the court, though an agent may sometimes be able to post the full cash amount on the family\'s behalf for a premium, subject to approval.',
  },
];

export const BAIL_VS_BOND_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BlogPosting',
      '@id': 'https://delawarebailbond.com/blog/bail-vs-bond-delaware/#blogposting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://delawarebailbond.com/blog/bail-vs-bond-delaware',
      },
      headline: 'Bail vs Bond in Delaware: What\'s the Difference?',
      description:
        'What\'s the difference between bail and bond in Delaware? Learn how bail is set, how surety bonds work, what the premium is, and which option fits your family.',
      image:
        'https://delawarebailbond.com/images/blog/delaware-bail-vs-bond-hero.webp',
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
      about: ['Bail vs bond', 'Cash bail', 'Surety bond', 'Delaware bail bonds'],
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://delawarebailbond.com/blog/bail-vs-bond-delaware/#faq',
      mainEntity: BAIL_VS_BOND_FAQS.map((faq) => ({
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
      '@id': 'https://delawarebailbond.com/blog/bail-vs-bond-delaware/#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://delawarebailbond.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://delawarebailbond.com/blog' },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Bail vs Bond in Delaware: What\'s the Difference?',
          item: 'https://delawarebailbond.com/blog/bail-vs-bond-delaware',
        },
      ],
    },
  ],
};
