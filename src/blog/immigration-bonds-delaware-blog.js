export const IMMIGRATION_BONDS_POST = {
  slug: 'immigration-bonds-delaware',
  title: 'What Is an Immigration Bond? Hearings, Payment, and Release Explained',
  subtitle: '',
  metaTitle: 'Immigration Bonds: Hearings, Payment & Release Help',
  metaDescription:
    'Learn what immigration bonds mean, how bond hearings and payment may work, and what Delaware families should confirm before arranging help.',
  keywords:
    'immigration bonds, immigration bail bond, what is a bond hearing, how to pay immigration bond',
  heroImage: '/images/blog/immigration-bonds-delaware-hero.webp',
  thumbnail: '/images/blog/immigration-bonds-delaware-hero.webp',
  ogImage: '/images/blog/immigration-bonds-delaware-hero.webp',
  heroAlt:
    'Legal guide graphic for immigration bonds in Delaware with Simone Harris, courthouse background, bond document, and scales of justice.',
  heroCaption: 'Illustration; not legal advice or a real immigration case document.',
  heroWidth: 1600,
  heroHeight: 900,
  categoryLabel: 'Bail Process',
  readMin: 10,
  benefits: [],
  tags: ['Immigration Bonds', 'Bond Hearings', 'Delaware Families'],
  faqs: [
    {
      question: 'What is an immigration bond?',
      answer:
        'An immigration bond is a financial guarantee tied to federal immigration detention. If bond is allowed and posted, the detained person may be released while the immigration case continues, but they still must follow the government\'s conditions and appear when required.',
    },
    {
      question: 'Is an immigration bond the same as bail in Delaware?',
      answer:
        'No. Delaware criminal bail belongs to the state criminal court process. Immigration bonds belong to the federal immigration detention and immigration court process. A person may have both issues, but the paperwork, offices, payment rules, and legal advice needs are different.',
    },
    {
      question: 'What is a bond hearing in immigration court?',
      answer:
        'It is a separate proceeding where a detained person asks an immigration judge to set or reconsider bond. EOIR says bond proceedings are separate from removal proceedings. The judge considers eligibility, appearance risk, safety concerns, and other case-specific issues.',
    },
    {
      question: 'Who can post an immigration bond?',
      answer:
        'That depends on the bond type and current ICE instructions. The person posting should verify eligibility, identity-document requirements, payment method, and receipt paperwork directly through ICE/ERO instructions or with help from counsel before paying.',
    },
    {
      question: 'How do you pay an immigration bond?',
      answer:
        'Confirm current ICE/ERO instructions first. ICE states that bonds may be posted at ERO bond acceptance offices during specified weekday hours, and online tools may also be involved. Verify the amount, location or online process, required ID, and receipt before sending money.',
    },
    {
      question: 'Can an immigration bond be lowered?',
      answer:
        'In some cases, a detained person may request review by an immigration judge. EOIR calls this a bond proceeding or bond redetermination context. Whether that is available, and whether it is wise, is a legal question for an immigration attorney.',
    },
    {
      question: 'Do you get immigration bond money back?',
      answer:
        'A cash bond may be returned to the obligor after the bond is cancelled and conditions are satisfied, but the process depends on ICE/DHS instructions and the case status. A surety-bond premium or service fee is different and may not be refundable.',
    },
  ],
  tocEntries: [
    { id: 'immigration-section-1', prefix: '1.', label: 'Quick answer: what an immigration bond does' },
    { id: 'immigration-section-2', prefix: '2.', label: 'Immigration bond vs. Delaware criminal bail' },
    { id: 'immigration-section-3', prefix: '3.', label: 'Who sets an immigration bond amount?' },
    { id: 'immigration-section-4', prefix: '4.', label: 'What is a bond hearing in immigration court?' },
    { id: 'immigration-section-5', prefix: '5.', label: 'What does it mean to post a bond?' },
    { id: 'immigration-section-6', prefix: '6.', label: 'How to pay an immigration bond' },
    { id: 'immigration-section-7', prefix: '7.', label: 'Cash immigration bond vs. surety help' },
    { id: 'immigration-section-8', prefix: '8.', label: 'What happens after release?' },
    { id: 'immigration-section-9', prefix: '9.', label: 'Can you get an immigration bond refund?' },
    { id: 'immigration-section-10', prefix: '10.', label: 'What Delaware families should confirm' },
    { id: 'immigration-section-11', prefix: '11.', label: 'Immigration bond FAQs' },
    { id: 'immigration-section-12', prefix: '12.', label: 'Get calm help with the next bond question' },
  ],
  articleKey: 'immigration-bonds',
  publishedAt: '2026-09-09',
  updatedAt: '2026-09-09',
  hideUnverifiedAuthor: true,
  customSchema: {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': 'https://delawarebailbond.com/blog/immigration-bonds-delaware#blogposting',
        url: 'https://delawarebailbond.com/blog/immigration-bonds-delaware',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://delawarebailbond.com/blog/immigration-bonds-delaware',
        },
        headline: 'What Is an Immigration Bond? Hearings, Payment, and Release Explained',
        description:
          'Learn what immigration bonds mean, how bond hearings and payment may work, and what Delaware families should confirm before arranging help.',
        inLanguage: 'en-US',
        image: 'https://delawarebailbond.com/images/blog/immigration-bonds-delaware-hero.webp',
        datePublished: '2026-09-09',
        dateModified: '2026-09-09',
        publisher: {
          '@type': 'Organization',
          name: 'A Way to Freedom Bail Bonds',
          url: 'https://delawarebailbond.com/',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://delawarebailbond.com/blog/immigration-bonds-delaware#faq',
        mainEntity: [],
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://delawarebailbond.com/blog/immigration-bonds-delaware#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://delawarebailbond.com/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://delawarebailbond.com/blog' },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'What Is an Immigration Bond? Hearings, Payment, and Release Explained',
            item: 'https://delawarebailbond.com/blog/immigration-bonds-delaware',
          },
        ],
      },
    ],
  },
};

IMMIGRATION_BONDS_POST.customSchema['@graph'][1].mainEntity = IMMIGRATION_BONDS_POST.faqs.map((faq) => ({
  '@type': 'Question',
  name: faq.question,
  acceptedAnswer: {
    '@type': 'Answer',
    text: faq.answer,
  },
}));
