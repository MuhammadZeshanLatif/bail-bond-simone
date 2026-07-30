import React, { useState, useEffect, useCallback, useRef } from 'react';
import SimoneAboutSection from './components/SimoneAboutSection';
import AdminPortal from './components/admin/AdminPortal';
import { submitContact } from './lib/supabase';
import { BlogMagazinePillar } from './components/blog/magazine/BlogMagazinePillar';
import {
  HARDCODED_BLOG_SLUG,
  HARDCODED_BLOG_TITLE,
  HARDCODED_BLOG_META_DESCRIPTION,
  HARDCODED_BLOG_IMAGE,
  HARDCODED_BLOG_THUMBNAIL,
} from './blog/hardcoded-static-blog';
import {
  BAIL_BOND_COMPANY_SLUG,
  BAIL_BOND_COMPANY_TITLE,
  BAIL_BOND_COMPANY_META_DESCRIPTION,
  BAIL_BOND_COMPANY_IMAGE,
  BAIL_BOND_COMPANY_THUMBNAIL,
} from './blog/bail-bond-company-delaware-blog';
import {
  RELEASED_ON_BAIL_SLUG,
  RELEASED_ON_BAIL_TITLE,
  RELEASED_ON_BAIL_META_DESCRIPTION,
  RELEASED_ON_BAIL_IMAGE,
  RELEASED_ON_BAIL_THUMBNAIL,
} from './blog/released-on-bail-blog';
import {
  CASH_BOND_MEANING_SLUG,
  CASH_BOND_MEANING_TITLE,
  CASH_BOND_MEANING_META_DESCRIPTION,
  CASH_BOND_MEANING_IMAGE,
  CASH_BOND_MEANING_THUMBNAIL,
} from './blog/cash-bond-meaning-blog';
import {
  WHAT_IS_CASH_BOND_SLUG,
  WHAT_IS_CASH_BOND_TITLE,
  WHAT_IS_CASH_BOND_META_DESCRIPTION,
  WHAT_IS_CASH_BOND_IMAGE,
  WHAT_IS_CASH_BOND_THUMBNAIL,
} from './blog/what-is-cash-bond-blog';
import {
  BAIL_BOND_PROCESS_SLUG,
  BAIL_BOND_PROCESS_TITLE,
  BAIL_BOND_PROCESS_META_DESCRIPTION,
  BAIL_BOND_PROCESS_IMAGE,
  BAIL_BOND_PROCESS_THUMBNAIL,
} from './blog/bail-bond-process-step-by-step-blog';
import {
  RELEASED_ON_BOND_MEANING_SLUG,
  RELEASED_ON_BOND_MEANING_TITLE,
  RELEASED_ON_BOND_MEANING_META_DESCRIPTION,
  RELEASED_ON_BOND_MEANING_IMAGE,
  RELEASED_ON_BOND_MEANING_THUMBNAIL,
} from './blog/released-on-bond-meaning-delaware-blog';
import {
  FAST_RELIABLE_SLUG,
  FAST_RELIABLE_TITLE,
  FAST_RELIABLE_META_DESCRIPTION,
  FAST_RELIABLE_IMAGE,
  FAST_RELIABLE_THUMBNAIL,
} from './blog/fast-reliable-bail-bonds-delaware-blog';
import {
  COMMON_MISTAKES_SLUG,
  COMMON_MISTAKES_TITLE,
  COMMON_MISTAKES_META_DESCRIPTION,
  COMMON_MISTAKES_IMAGE,
  COMMON_MISTAKES_THUMBNAIL,
} from './blog/common-mistakes-posting-bail-delaware-blog';
import {
  HOW_TO_BOND_SLUG,
  HOW_TO_BOND_TITLE,
  HOW_TO_BOND_META_DESCRIPTION,
  HOW_TO_BOND_IMAGE,
  HOW_TO_BOND_THUMBNAIL,
} from './blog/how-to-bond-someone-out-of-jail-delaware-blog';
import {
  FIND_BAIL_AMOUNT_SLUG,
  FIND_BAIL_AMOUNT_TITLE,
  FIND_BAIL_AMOUNT_META_DESCRIPTION,
  FIND_BAIL_AMOUNT_IMAGE,
  FIND_BAIL_AMOUNT_THUMBNAIL,
} from './blog/find-bail-amount-delaware-blog';
import {
  UNSECURED_BAIL_SLUG,
  UNSECURED_BAIL_TITLE,
  UNSECURED_BAIL_META_DESCRIPTION,
  UNSECURED_BAIL_IMAGE,
  UNSECURED_BAIL_THUMBNAIL,
} from './blog/unsecured-bail-delaware-blog';
import {
  BAIL_BOND_COST_SLUG,
  BAIL_BOND_COST_TITLE,
  BAIL_BOND_COST_META_DESCRIPTION,
  BAIL_BOND_COST_IMAGE,
  BAIL_BOND_COST_THUMBNAIL,
} from './blog/bail-bond-cost-delaware-blog';
import { getMagazinePost } from './blog/magazine-registry';
import { buildLegacyMagazinePost } from './blog/legacy-blog-utils';

const SITE_URL = 'https://delawarebailbond.com';

const normalizePath = (rawPath) => {
  if (!rawPath || rawPath === '/') return '/home';
  const pathOnly = rawPath.split('?')[0].split('#')[0];
  return pathOnly.startsWith('/') ? pathOnly : `/${pathOnly}`;
};

const getCanonicalPath = (pathname = window.location.pathname) => {
  const path = normalizePath(pathname);
  if (path === '/home') return '/';
  return path;
};

const getCanonicalUrl = () => `${SITE_URL}${getCanonicalPath()}`;

const toAbsoluteUrl = (url) => {
  if (!url) return `${SITE_URL}/og-image.jpg`;
  if (url.startsWith('http')) return url;
  return `${SITE_URL}${url.startsWith('/') ? url : `/${url}`}`;
};

const pathToUrl = (path) => {
  const normalized = normalizePath(path);
  return normalized === '/home' ? '/' : normalized;
};

// ============================================
// CUSTOM ROUTER HOOK
// WordPress-style: each link loads pre-built static HTML from the server.
// ============================================
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(() => normalizePath(window.location.pathname));

  const navigate = useCallback((path) => {
    const url = pathToUrl(path);
    const current = window.location.pathname.replace(/\/$/, '') || '/';
    const target = url.replace(/\/$/, '') || '/';
    if (current === target) {
      window.scrollTo(0, 0);
      return;
    }
    window.location.assign(url);
  }, []);

  useEffect(() => {
    if (window.location.hash.startsWith('#/')) {
      window.location.replace(pathToUrl(window.location.hash.slice(1)));
      return;
    }

    setCurrentPath(normalizePath(window.location.pathname));
  }, []);

  return { currentPath, navigate };
};

// ============================================
// SEO META UPDATE HOOK
// ============================================
const useSEO = (title, description, keywords = '', ogTitle = '', ogDescription = '', ogImage = '') => {
useEffect(() => {
    document.title = title || 'A Way to Freedom Bail Bonds';
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || '');
    }

    // Update keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && keywords) {
      metaKeywords.setAttribute('content', keywords);
    }

    // Update OG title
    let ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) {
      ogTitleEl.setAttribute('content', ogTitle || title || '');
    }

    // Update OG description  
    let ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) {
      ogDescEl.setAttribute('content', ogDescription || description || '');
    }

    let twitterTitleEl = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitleEl) {
      twitterTitleEl.setAttribute('content', ogTitle || title || '');
    }

    let twitterDescEl = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescEl) {
      twitterDescEl.setAttribute('content', ogDescription || description || '');
    }

    // Update OG image
    if (ogImage) {
      let ogImageEl = document.querySelector('meta[property="og:image"]');
      if (ogImageEl) {
        ogImageEl.setAttribute('content', ogImage);
      }
      let twitterImageEl = document.querySelector('meta[name="twitter:image"]');
      if (twitterImageEl) {
        twitterImageEl.setAttribute('content', ogImage);
      }
    }

    // Update meta title tag if present
    let metaTitle = document.querySelector('meta[name="title"]');
    if (metaTitle) {
      metaTitle.setAttribute('content', title || '');
    }

    const canonicalUrl = getCanonicalUrl();

    // Update OG URL
    let ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) {
      ogUrlEl.setAttribute('content', canonicalUrl);
    }

    // Update Twitter URL
    let twitterUrlEl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrlEl) {
      twitterUrlEl.setAttribute('content', canonicalUrl);
    }

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', canonicalUrl);
    }
  }, [title, description, keywords, ogTitle, ogDescription, ogImage]);
};

// ============================================
// JSON-LD SCHEMA INJECTOR
// ============================================
const injectSchema = (schema) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    
    // Remove old schema scripts
    const oldScripts = document.querySelectorAll('script[type="application/ld+json"][data-dynamic]');
    oldScripts.forEach(s => s.remove());
    
    script.setAttribute('data-dynamic', 'true');
    document.head.appendChild(script);
    
    return () => {
      script.remove();
    };
  }, [schema]);
};

// ============================================
// BREADCRUMB SCHEMA BUILDER
// items: [{ name, path }] in order from Home to current page.
// ============================================
const buildBreadcrumb = (items) => ({
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
  })),
});

// ============================================
// NAVBAR COMPONENT
// ============================================
const Navbar = ({ currentPath, navigate }) => {
  const [showServices, setShowServices] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => currentPath === path || 
    (path === '/home' && (currentPath === '/' || currentPath === ''));

  const handleNavClick = (e, path) => {
    e.preventDefault();
    navigate(path);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowServices(false);
      }
    };

    if (showServices) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [showServices]);

  return (
    <header className="site-header">
      <div className="navbar-topbar d-none d-lg-flex">
        <div className="container">
          <div className="topbar-left">
            <i className="fas fa-shield-halved"></i>
            <span>Licensed & Bonded - Available 24/7</span>
          </div>
          <div className="topbar-right">
            <i className="fas fa-phone-alt"></i>
            <a href="tel:+17024478550">(702) 447-8550</a>
            <span className="topbar-divider">|</span>
            <a href="tel:+13026001886">(302) 600-1886</a>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-custom">
        <div className="container">
          <a href="/" onClick={(e) => handleNavClick(e, '/home')} className="navbar-brand-custom text-decoration-none">
            <img
              src="/brand/a-way-to-freedom-logo.svg"
              alt="A Way to Freedom Bail Bonds"
              className="brand-logo-img"
              width="310"
              height="75"
            />
          </a>

          <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{background: 'var(--dark-bg-tertiary)', border: '1px solid var(--border-color)'}}>
            <i className="fas fa-bars text-light"></i>
          </button>

          <div className="collapse navbar-collapse navbar-nav-wrap" id="navbarNav">
            <ul className="navbar-nav mx-auto align-items-center">
              <li className="nav-item">
                <a href="/" onClick={(e) => handleNavClick(e, '/home')} className={`nav-link-custom nav-link ${isActive('/home') ? 'active' : ''}`}>Home</a>
              </li>
              <li className="nav-item dropdown" ref={dropdownRef}>
                <a href="#" className={`nav-link-custom nav-link ${currentPath.startsWith('/services') ? 'active' : ''} ${showServices ? 'dropdown-open' : ''}`}
                  onClick={(e) => { e.preventDefault(); setShowServices(!showServices); }} role="button">
                  Services <i className={`fas fa-chevron-down dropdown-icon ${showServices ? 'rotate' : ''}`}></i>
                </a>
                {showServices && (
                  <div className="dropdown-menu-custom position-absolute show">
                    <a href="/services/felony" onClick={(e) => {handleNavClick(e, '/services/felony'); setShowServices(false);}} className="dropdown-item-custom d-block">Felony & Misdemeanor Bonds</a>
                    <a href="/services/misdemeanor" onClick={(e) => {handleNavClick(e, '/services/misdemeanor'); setShowServices(false);}} className="dropdown-item-custom d-block">Misdemeanor Bonds</a>
                    <a href="/services/secured" onClick={(e) => {handleNavClick(e, '/services/secured'); setShowServices(false);}} className="dropdown-item-custom d-block">Secured Bonds</a>
                    <a href="/services/surety" onClick={(e) => {handleNavClick(e, '/services/surety'); setShowServices(false);}} className="dropdown-item-custom d-block">Surety Bail</a>
                    <a href="/services/fast-release" onClick={(e) => {handleNavClick(e, '/services/fast-release'); setShowServices(false);}} className="dropdown-item-custom d-block">Fast Release Processing</a>
                    <a href="/services/payment" onClick={(e) => {handleNavClick(e, '/services/payment'); setShowServices(false);}} className="dropdown-item-custom d-block">Flexible Payment Arrangements</a>
                    <a href="/services/e-paperwork" onClick={(e) => {handleNavClick(e, '/services/e-paperwork'); setShowServices(false);}} className="dropdown-item-custom d-block">Electronic Paperwork</a>
                  </div>
                )}
              </li>
              <li className="nav-item">
                <a href="/about" onClick={(e) => handleNavClick(e, '/about')} className={`nav-link-custom nav-link ${isActive('/about') ? 'active' : ''}`}>About</a>
              </li>
              <li className="nav-item">
                <a href="/how-it-works" onClick={(e) => handleNavClick(e, '/how-it-works')} className={`nav-link-custom nav-link ${isActive('/how-it-works') ? 'active' : ''}`}>How It Works</a>
              </li>
              <li className="nav-item">
                <a href="/faq" onClick={(e) => handleNavClick(e, '/faq')} className={`nav-link-custom nav-link ${isActive('/faq') ? 'active' : ''}`}>FAQ</a>
              </li>
              <li className="nav-item">
                <a href="/blog" onClick={(e) => handleNavClick(e, '/blog')} className={`nav-link-custom nav-link ${currentPath.startsWith('/blog') ? 'active' : ''}`}>Blog</a>
              </li>
              <li className="nav-item">
                <a href="/contact" onClick={(e) => handleNavClick(e, '/contact')} className={`nav-link-custom nav-link ${isActive('/contact') ? 'active' : ''}`}>Contact</a>
              </li>
            </ul>
            <a href="tel:+17024478550" className="btn-call-header d-none d-lg-inline-flex">
              <i className="fas fa-phone-alt me-2"></i>Call Now
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

// ============================================
// FOOTER COMPONENT
// ============================================
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-service-area">
            <i className="fas fa-map-marker-alt me-2"></i>
            <span>Serving </span>
            <a href="/new-castle-county-bail-bonds" className="text-decoration-none" style={{ color: 'inherit' }}>New Castle County bail bonds</a>
            <span> &amp; </span>
            <a href="/service-areas" className="text-decoration-none" style={{ color: 'inherit' }}>Kent County, Delaware</a>
          </div>
          <p className="footer-tagline">
            Licensed Bail Bond Services • Confidential & Professional Assistance • Available 24/7
          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/people/A-Way-to-Freedom-Bail-Bonds/100094085200363/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="mailto:away2freedom302@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
          <div className="footer-bottom">
            <p className="mb-0">© {new Date().getFullYear()} A Way to Freedom Bail Bonds. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================
// FLOATING BUTTONS COMPONENT
// ============================================
const FloatingButtons = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Detect when mobile menu is open/closed
    const navbarCollapse = document.getElementById('navbarNav');
    if (!navbarCollapse) return;

    const checkMenuState = () => {
      // Check if collapse is shown (Bootstrap adds 'show' class when open)
      const isOpen = navbarCollapse.classList.contains('show');
      setIsMenuOpen(isOpen);
    };

    // Use MutationObserver to watch for class changes
    const observer = new MutationObserver(checkMenuState);
    observer.observe(navbarCollapse, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Also check on mount and periodically (fallback)
    checkMenuState();
    const interval = setInterval(checkMenuState, 100);

    // Listen for click events on navbar toggler
    const toggler = document.querySelector('.navbar-toggler');
    if (toggler) {
      toggler.addEventListener('click', () => {
        setTimeout(checkMenuState, 100);
      });
    }

    return () => {
      observer.disconnect();
      clearInterval(interval);
      if (toggler) {
        toggler.removeEventListener('click', checkMenuState);
      }
    };
  }, []);

  return (
    <div className={`floating-buttons ${isMenuOpen ? 'menu-open' : ''}`}>
      <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20help%20with%20bail%20bond%20services.%20Please%20let%20me%20know%20how%20you%20can%20assist%20me." target="_blank" rel="noopener noreferrer" className="floating-btn floating-whatsapp" aria-label="Chat on WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
      <a href="tel:+17024478550" className="floating-btn floating-call" aria-label="Call Now">
        <i className="fas fa-phone-alt"></i>
      </a>
    </div>
  );
};

// ============================================
// SOCIAL SIDEBAR COMPONENT
// ============================================
const SocialSidebar = () => {
  return (
    <div className="social-sidebar d-none d-md-flex">
      <a href="https://www.facebook.com/people/A-Way-to-Freedom-Bail-Bonds/100094085200363/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="mailto:away2freedom302@gmail.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Email">
        <i className="fas fa-envelope"></i>
      </a>
    </div>
  );
};

// ============================================
// HOME PAGE
// ============================================
const SimoneHomePage = () => {
  useSEO(
    'Delaware Bail Bonds | 24/7 Wilmington & Newark Bail Bond Help',
    'Need Delaware bail bonds fast? A Way to Freedom Bail Bonds provides 24/7 help from a local bail bondsman in Wilmington, Newark, New Castle County and Kent County.',
    'Delaware bail bonds, bail bondsman Delaware, bail bonds Delaware, 24/7 bail bonds Delaware, Wilmington DE bail bonds, Newark DE bail bonds, New Castle County bail bonds'
  );

  const homePageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": "A Way to Freedom Bail Bonds",
        "url": `${SITE_URL}/`
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "A Way to Freedom Bail Bonds",
        "url": `${SITE_URL}/`,
        "logo": `${SITE_URL}/brand/a-way-to-freedom-logo.png`,
        "image": `${SITE_URL}/og-image.jpg`,
        "founder": {
          "@type": "Person",
          "name": "Simone Harris"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/#webpage`,
        "name": "Delaware Bail Bonds | 24/7 Wilmington & Newark Bail Bond Help",
        "url": `${SITE_URL}/`,
        "description": "Licensed Delaware bail bond agency and local bail bondsman serving Wilmington, Newark, New Castle County and Kent County with 24/7 emergency help."
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        "name": "A Way to Freedom Bail Bond Service",
        "description": "Licensed Delaware bail bond agency and local bail bondsman serving Wilmington, Newark, New Castle County and Kent County with 24/7 emergency help.",
        "url": `${SITE_URL}/`,
        "image": `${SITE_URL}/og-image.jpg`,
        "logo": `${SITE_URL}/brand/a-way-to-freedom-logo.png`,
        "parentOrganization": { "@id": `${SITE_URL}/#organization` },
        "telephone": ["+1-702-447-8550", "+1-302-600-1886"],
        "openingHours": "Mo-Su 00:00-23:59",
        "priceRange": "Filed and approved bail bond premium",
        "areaServed": [
          "Wilmington DE",
          "New Castle County DE",
          "Kent County DE"
        ],
        "address": [
          {
            "@type": "PostalAddress",
            "streetAddress": "288 E Main St",
            "addressLocality": "Newark",
            "addressRegion": "DE",
            "postalCode": "19711"
          },
          {
            "@type": "PostalAddress",
            "streetAddress": "715 N. King Street",
            "addressLocality": "Wilmington",
            "addressRegion": "DE",
            "postalCode": "19801"
          }
        ],
        "founder": {
          "@type": "Person",
          "name": "Simone Harris"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a bail bond?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A bail bond helps someone get released from jail without paying the full bail amount upfront. A bail bond company posts the bond so the defendant can be released while the case moves through court."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between bail and a bail bond?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bail is the amount set for release. A bail bond is when a bail bond company helps post that amount, and the family or co-signer usually pays a fee instead of the full amount upfront."
            }
          },
          {
            "@type": "Question",
            "name": "Why do people use a bail bond instead of paying the full bail amount?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Many families use a bail bond because the full bail amount is too high to pay at one time. A bail bond helps start the release process when immediate cash is limited."
            }
          },
          {
            "@type": "Question",
            "name": "What information is needed to start a bail bond?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most cases start with the defendant's name, basic jail or court information, and the bond amount if it has already been set. If a co-signer is involved, their information may also be needed."
            }
          },
          {
            "@type": "Question",
            "name": "Can a family member or co-signer start the process?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. In many cases, a family member, partner, or co-signer is the person who calls first. They can help start the process and review the next steps."
            }
          },
          {
            "@type": "Question",
            "name": "Can I start a bail bond by phone?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Many people need help from home, work, or late at night. Starting by phone makes it easier to get answers fast and begin the process without delay."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I do not know the bond amount or bond type yet?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "That is common after a recent arrest. The first step is usually confirming the bond amount, bond type, and basic defendant details so the process can move forward clearly."
            }
          },
          {
            "@type": "Question",
            "name": "Do you get bail money back?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "If the full bail is paid directly to the court, it may be returned at the end of the case if all court requirements are met. If a bail bond company is used, the fee paid for the bond is not refunded."
            }
          },
          {
            "@type": "Question",
            "name": "Can collateral be required for a bail bond?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In some cases, yes. This can depend on the bond amount, the case, and the bond conditions. Larger or higher-risk bonds may involve added financial responsibility."
            }
          },
          {
            "@type": "Question",
            "name": "What should I think about before helping someone with a bail bond?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It is important to understand the bond amount, bond conditions, and the responsibility of being a co-signer. People should know the financial risk and what could happen if the defendant misses court."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if the defendant misses court?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Missing court can create serious problems for the defendant and for anyone who signed for the bond. That is why co-signers should understand their role before agreeing to help."
            }
          },
          {
            "@type": "Question",
            "name": "How do bail bond companies make money?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Bail bond companies usually earn money by charging a fee for posting the bond. That fee is separate from the full bail amount set by the court."
            }
          }
        ]
      }
    ]
  };

  injectSchema(homePageSchema);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('.navbar');
      const scrollTopBtn = document.getElementById('scrollTop');

      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      if (scrollTopBtn) {
        if (window.scrollY > 100) {
          scrollTopBtn.classList.add('visible');
        } else {
          scrollTopBtn.classList.remove('visible');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [isSubmittingHome, setIsSubmittingHome] = useState(false);
  const [submitStatusHome, setSubmitStatusHome] = useState({ type: '', message: '' });

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmittingHome(true);
    setSubmitStatusHome({ type: '', message: '' });

    const form = e.target;
    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      subject: form.subject.value || 'Contact Form Submission',
      inmateName: form.inmateName.value,
      dateOfBirth: form.dateOfBirth.value,
      message: form.message.value
    };

    // Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKQHCrTC01hRCpFSLnUnmZyBx6ypmOvHLDUGdJ3Uu97gJW3OH1aBBMPoqln1KCWa7H/exec';

    try {
      // Save to Supabase (admin dashboard) + email via Google Apps Script - run together
      await Promise.all([
        submitContact(formData),
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        }),
      ]);

      setSubmitStatusHome({
        type: 'success',
        message: 'Thank you! Your message has been submitted successfully. We will get back to you soon. For immediate assistance, call (702) 447-8550.'
      });

      form.reset();
      
      setTimeout(() => {
        setSubmitStatusHome({ type: '', message: '' });
      }, 5000);

    } catch (error) {
      setSubmitStatusHome({
        type: 'error',
        message: 'Sorry, there was an error submitting your message. Please try again or call us directly at (702) 447-8550.'
      });
    } finally {
      setIsSubmittingHome(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="simone-page">
      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 hero-content">
              <p className="hero-subtitle">A Way to Freedom Bail Bond Service</p>
              <h1 className="hero-title">24/7 Bail Bonds Help in Delaware</h1>
              <p className="hero-tagline">
                A Way to Freedom provides fast, trusted Delaware bail bonds help for families, friends, and co-signers after an arrest. If you need a local bail bondsman in Delaware, we help you understand the bond amount, paperwork, and next step from the first call.
              </p>
              <div className="hero-cta-wrap">
                <a href="tel:7024478550" className="btn hero-btn-primary">
                  <i className="fas fa-phone-alt me-2"></i>Call Now
                </a>
                <a href="#contact" onClick={scrollToContact} className="btn hero-btn-outline">
                  <i className="fas fa-file-signature me-2"></i>Start the Process
                </a>
                <a href="tel:7024478550" className="btn hero-btn-outline">
                  <i className="fas fa-headset me-2"></i>Speak With an Agent
                </a>
              </div>
              <div className="hero-badge-row">
                <span className="hero-badge-item"><i className="fas fa-phone-alt"></i>Free 24/7 Consultation</span>
                <span className="hero-badge-item"><i className="fas fa-certificate"></i>Licensed &amp; Trusted</span>
                <span className="hero-badge-item"><i className="fas fa-star"></i>25+ Years Experience</span>
                <span className="hero-badge-item"><i className="fas fa-bolt"></i>Fast Release Support</span>
                <span className="hero-badge-item"><i className="fas fa-credit-card"></i>Flexible Payments</span>
                <span className="hero-badge-item"><i className="fas fa-lock-open"></i>No Collateral Bonds</span>
                <span className="hero-badge-item"><i className="fas fa-map-marker-alt"></i>Local Agent</span>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="about-image heroimage">
                <img
                  src="/images/simoneimg2.webp"
                  alt="Simone Harris Bail Bond Agent Wilmington Newark Delaware - Professional Service"
                  loading="eager"
                  fetchpriority="high"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="stats-bar">
        <div className="container-fluid px-0">
          <div className="row g-0">
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">25+</div>
                <div className="stat-label">Years Experience</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Always Available</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Licensed &amp; Trusted</div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="stat-item">
                <div className="stat-number">Fast</div>
                <div className="stat-label">Release Process</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <SimoneAboutSection />

      {/* Why Choose Us */}
      <section className="why-choose-section section-padding">
        <div className="container">
          <div className="text-center mb-2">
            <div className="section-ornament">✦ &nbsp; WHY CHOOSE US &nbsp; ✦</div>
            <h2 className="section-title">
              Why Families in Delaware Choose <span className="gold-text">A Way to Freedom</span>
            </h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">
              Families do not call a bail bond company because they have time to compare. They call because they need help now. We keep the process clear, supportive, and easy to begin.
            </p>
          </div>
          <div className="why-feature-grid">
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-bolt"></i></div>
              <h5>Fast Local Help</h5>
            </div>
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-comments"></i></div>
              <h5>Clear Answers &amp; Simple Steps</h5>
            </div>
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-file-alt"></i></div>
              <h5>Bond &amp; Paperwork Support</h5>
            </div>
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-credit-card"></i></div>
              <h5>Flexible Payment Options</h5>
            </div>
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-mobile-alt"></i></div>
              <h5>Start by Phone or E-Paperwork</h5>
            </div>
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-clock"></i></div>
              <h5>Help After Hours</h5>
            </div>
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-user-shield"></i></div>
              <h5>Private &amp; Judgment-Free</h5>
            </div>
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-heart"></i></div>
              <h5>Calm, Caring Communication</h5>
            </div>
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-map-marker-alt"></i></div>
              <h5>Local Delaware Guidance</h5>
            </div>
            <div className="why-feature-card">
              <div className="why-feature-icon"><i className="fas fa-headset"></i></div>
              <h5>24/7 Urgent Support</h5>
            </div>
          </div>
          <div className="text-center mt-5">
            <a href="tel:7024478550" className="btn btn-gold btn-shimmer">
              <i className="fas fa-phone-alt me-2"></i>Call Now - We're Ready
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">✦ &nbsp; OUR SERVICES &nbsp; ✦</div>
            <h2 className="section-title">
              Main Bail Bond Services We Offer in <span className="gold-text">Delaware</span>
            </h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">A Way to Freedom helps families, co-signers, and defendants with fast bail bond support across Delaware.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3>Bail Bonds</h3>
                <p>We help people start the release process after bail has been set. Our team explains what the bond amount means, what paperwork is needed, and how the next step works.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-gavel"></i>
                </div>
                <h3>Criminal Bail Bonds</h3>
                <p>We help with bail bond needs tied to criminal charges in Delaware, including release conditions and court-related steps.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-balance-scale"></i>
                </div>
                <h3>Felony Bonds</h3>
                <p>Felony bonds are tied to more serious criminal charges and often involve higher bond amounts or stricter court conditions.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-file-signature"></i>
                </div>
                <h3>Misdemeanor Bonds</h3>
                <p>Misdemeanor bonds help people get released after less serious charges, with clear explanation of bond amount and co-signer role.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-rocket"></i>
                </div>
                <h3>Traffic Bonds</h3>
                <p>Traffic bonds may apply when someone is arrested for a traffic-related offense and bond is required for release.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-user-secret"></i>
                </div>
                <h3>Juvenile Bonds</h3>
                <p>Juvenile bond situations can feel confusing and emotional for parents and guardians, and we explain each step clearly.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-tags"></i>
                </div>
                <h3>Secured Bonds</h3>
                <p>Secured bonds require money, property, or approved security to support the bond amount and co-signer responsibility.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-moon"></i>
                </div>
                <h3>Surety Bail Bonds</h3>
                <p>Surety bail bonds help defendants secure release without paying the full bail amount directly to the court.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-money-bill-wave"></i>
                </div>
                <h3>Cash Bail</h3>
                <p>Cash bail may require the full cash amount ordered by the court before release can happen.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-balance-scale-right"></i>
                </div>
                <h3>Appeal Bonds</h3>
                <p>Appeal bonds may be needed when a case is under appeal and bond-related issues affect release or court obligations.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-landmark"></i>
                </div>
                <h3>Federal Bonds</h3>
                <p>Federal bond cases follow a different process than many state court matters, and we explain the conditions clearly.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-building-columns"></i>
                </div>
                <h3>State Bail Bonds</h3>
                <p>State bail bonds apply to cases handled in Delaware state courts with clear release and co-signer guidance.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-shuffle"></i>
                </div>
                <h3>Transfer Bonds</h3>
                <p>Transfer bonds involve cases where the defendant, hold, or bond process connects to another jurisdiction.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-globe"></i>
                </div>
                <h3>Out-of-State Transfer Bonds</h3>
                <p>Out-of-state transfer bond situations can involve added steps and delays because another state is involved.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="service-card">
                <div className="service-icon">
                  <i className="fas fa-user-clock"></i>
                </div>
                <h3>Violation of Probation Bonds</h3>
                <p>Violation of probation cases can move quickly, and we explain court-related risk and immediate next steps.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="/services" className="btn btn-gold">Learn More</a>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="how-it-works-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">✦ &nbsp; THE PROCESS &nbsp; ✦</div>
            <h2 className="section-title">
              How Our 24/7 Bail Bond <span className="gold-text">Process Works</span>
            </h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">We keep the bail process simple, clear, and easy to start.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-4 col-xl-2-4 mb-4">
              <div className="step-wrapper">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h3>Call Our Office</h3>
                  <p>You call and speak with a local bail bond agent. We listen, answer questions, and explain the next step.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2-4 mb-4">
              <div className="step-wrapper">
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h3>Share Case Details</h3>
                  <p>Provide the defendant's name, jail or court info, and the bond amount if available.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2-4 mb-4">
              <div className="step-wrapper step-last-in-row">
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h3>Complete Paperwork</h3>
                  <p>We help complete paperwork quickly. Electronic paperwork is available.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2-4 mb-4">
              <div className="step-wrapper">
                <div className="step-card">
                  <div className="step-number">4</div>
                  <h3>Review Payment Options</h3>
                  <p>We explain the bond process and available payment options in simple terms.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 col-xl-2-4 mb-4">
              <div className="step-wrapper step-last-in-row">
                <div className="step-card">
                  <div className="step-number">5</div>
                  <h3>We Start Release</h3>
                  <p>Once ready, we begin the bond posting process and help move the jail release forward.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-2">
            <a href="#contact" onClick={scrollToContact} className="btn btn-gold btn-shimmer">
              <i className="fas fa-file-signature me-2"></i>Start the Process Today
            </a>
          </div>
        </div>
      </section>

      {/* Flexible Payment Options */}
      <section className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Flexible Payment Options for Fast Bail Bonds</h2>
            <p className="section-subtitle">Families often need clear payment information right after an arrest. We explain payment options, bond-related costs, and what may be needed to get started.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="service-card">
                <div className="service-icon"><i className="fas fa-credit-card"></i></div>
                <h3>Flexible Payment Arrangements</h3>
                <p>We offer flexible payment arrangements for qualifying cases. Our team explains the available options clearly so families and co-signers understand the next step.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="service-card">
                <div className="service-icon"><i className="fas fa-calculator"></i></div>
                <h3>What May Affect the Bond Cost</h3>
                <p>The total cost can depend on the bond amount, bond type, court conditions, collateral, and co-signer details. We explain these factors clearly so there is less confusion.</p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="service-card">
                <div className="service-icon"><i className="fas fa-list-check"></i></div>
                <h3>What to Have Ready When You Call</h3>
                <p>It helps to have the defendant's name, any bond amount you were given, basic jail or court information, and co-signer details if available. That helps us guide you faster.</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="tel:7024478550" className="btn btn-gold">Speak With an Agent</a>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <section className="local-seo-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="local-seo-content text-center">
                <h2>Local Bail Bondsman for Delaware Families</h2>
                <p>
                  A Way to Freedom is built for families searching for Delaware bail bonds, bail bondsman Delaware help, and urgent release guidance in Wilmington, Newark, New Castle County, and nearby communities. This homepage is the main page for broad Delaware bail bond searches; charge-specific pages explain felony, misdemeanor, secured, and surety situations separately.
                </p>
                <div className="mt-4">
                  <span className="location-badge">
                    <i className="fas fa-map-marker-alt"></i>Wilmington, Delaware
                  </span>
                  <span className="location-badge">
                    <i className="fas fa-map-marker-alt"></i>Newark, Delaware
                  </span>
                  <span className="location-badge">
                    <i className="fas fa-map-marker-alt"></i>New Castle, Delaware
                  </span>
                  <span className="location-badge">
                    <i className="fas fa-city"></i>New Castle County, Delaware
                  </span>
                  <span className="location-badge">
                    <i className="fas fa-city"></i>Kent County, Delaware
                  </span>
                </div>
                <div className="mt-5">
                  <a href="/service-areas" className="btn btn-gold btn-lg">
                    <i className="fas fa-map me-2"></i>View Service Areas
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When People Usually Call Section */}
      <section id="testimonials" className="testimonials-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">✦ &nbsp; WHO CALLS US &nbsp; ✦</div>
            <h2 className="section-title">
              When People Usually Call <span className="gold-text">A Way to Freedom</span>
            </h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">Most people call during a stressful moment after an arrest - worried about detention, the bond amount, or how to start.</p>
          </div>
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">A recent arrest often leaves families unsure about the bond type, bond amount, and next step. We help explain the situation clearly and guide them toward release.</p>
                <div className="testimonial-author">
                  <div className="testimonial-icon-circle"><i className="fas fa-user-clock"></i></div>
                  <div className="author-info">
                    <h3>After a Recent Arrest</h3>
                    <p>Urgent support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">Many calls come from a family member trying to help someone in detention quickly. We explain what may be needed and how to get started right away.</p>
                <div className="testimonial-author">
                  <div className="testimonial-icon-circle"><i className="fas fa-people-arrows"></i></div>
                  <div className="author-info">
                    <h3>When a Family Member Needs Help Fast</h3>
                    <p>Family support</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">Some people need to begin the process from home, work, or late at night. We help them start by phone and explain the paperwork clearly.</p>
                <div className="testimonial-author">
                  <div className="testimonial-icon-circle"><i className="fas fa-phone"></i></div>
                  <div className="author-info">
                    <h3>When You Need to Start by Phone</h3>
                    <p>Phone-first help</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">Payment concerns are common after an arrest. We help families understand the next step and explain available options clearly.</p>
                <div className="testimonial-author">
                  <div className="testimonial-icon-circle"><i className="fas fa-credit-card"></i></div>
                  <div className="author-info">
                    <h3>When You Need Payment Flexibility</h3>
                    <p>Payment options</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="testimonial-text">Confusion is common in the first few hours after detention. We help people understand what information they have and what may be needed next.</p>
                <div className="testimonial-author">
                  <div className="testimonial-icon-circle"><i className="fas fa-question-circle"></i></div>
                  <div className="author-info">
                    <h3>When You're Not Sure What Bond Was Set</h3>
                    <p>Bond details support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-5">
            <a href="tel:7024478550" className="btn btn-gold btn-shimmer">
              <i className="fas fa-phone-alt me-2"></i>Talk to a Bail Bond Agent
            </a>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="emergency-banner">
        <div className="container">
          <h2>
            <i className="fas fa-exclamation-triangle me-3"></i>Talk to A Way to Freedom Now
          </h2>
          <p>If your loved one was just arrested, do not stay stuck in confusion. A Way to Freedom provides fast local bail bond help across Delaware with clear guidance and simple communication.</p>
          <a href="tel:7024478550" className="emergency-phone">
            <i className="fas fa-phone-alt me-2"></i>Call Now
          </a>
          <div className="mt-3">
            <a href="tel:7024478550" className="btn btn-light btn-lg">
              <i className="fas fa-bolt me-2"></i>Get Bail Help Now
            </a>
            <a href="#contact" onClick={scrollToContact} className="btn btn-light btn-lg ms-2">
              <i className="fas fa-file-signature me-2"></i>Start the Process Today
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="faq-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">✦ &nbsp; FAQs &nbsp; ✦</div>
            <h2 className="section-title">
              FAQ About A Way to Freedom Bail Bond <span className="gold-text">Service</span>
            </h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">Clear answers for families, co-signers, and defendants.</p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq1"
                    >
                      What is a bail bond?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      A bail bond helps someone get released from jail without paying the full bail amount upfront. A bail bond company posts the bond so the defendant can be released while the case moves through court.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq2"
                    >
                      What is the difference between bail and a bail bond?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Bail is the amount set for release. A bail bond is when a bail bond company helps post that amount, and the family or co-signer usually pays a fee instead of the full amount upfront.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq3"
                    >
                      Why do people use a bail bond instead of paying the full bail amount?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Many families use a bail bond because the full bail amount is too high to pay at one time. A bail bond helps start the release process when immediate cash is limited.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq4"
                    >
                      What information is needed to start a bail bond?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Most cases start with the defendant's name, basic jail or court information, and the bond amount if it has already been set. If a co-signer is involved, their information may also be needed.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq5"
                    >
                      Can a family member or co-signer start the process?
                    </button>
                  </h2>
                  <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes. In many cases, a family member, partner, or co-signer is the person who calls first. They can help start the process and review the next steps.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#faq6"
                    >
                      Can I start a bail bond by phone?
                    </button>
                  </h2>
                  <div id="faq6" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes. Many people need help from home, work, or late at night. Starting by phone makes it easier to get answers fast and begin the process without delay.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq7">
                      What happens if I do not know the bond amount or bond type yet?
                    </button>
                  </h2>
                  <div id="faq7" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      That is common after a recent arrest. The first step is usually confirming the bond amount, bond type, and basic defendant details so the process can move forward clearly.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq8">
                      Do you get bail money back?
                    </button>
                  </h2>
                  <div id="faq8" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      If the full bail is paid directly to the court, it may be returned at the end of the case if all court requirements are met. If a bail bond company is used, the fee paid for the bond is not refunded.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq9">
                      Can collateral be required for a bail bond?
                    </button>
                  </h2>
                  <div id="faq9" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      In some cases, yes. This can depend on the bond amount, the case, and the bond conditions. Larger or higher-risk bonds may involve added financial responsibility.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq10">
                      What should I think about before helping someone with a bail bond?
                    </button>
                  </h2>
                  <div id="faq10" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      It is important to understand the bond amount, bond conditions, and the responsibility of being a co-signer. People should know the financial risk and what could happen if the defendant misses court.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq11">
                      What happens if the defendant misses court?
                    </button>
                  </h2>
                  <div id="faq11" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Missing court can create serious problems for the defendant and for anyone who signed for the bond. That is why co-signers should understand their role before agreeing to help.
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq12">
                      How do bail bond companies make money?
                    </button>
                  </h2>
                  <div id="faq12" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Bail bond companies usually earn money by charging a fee for posting the bond. That fee is separate from the full bail amount set by the court.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">✦ &nbsp; CONTACT US &nbsp; ✦</div>
            <h2 className="section-title">
              Get In <span className="gold-text">Touch</span>
            </h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">Contact Simone Harris for Bail Bonds in Newark &amp; Wilmington, Delaware</p>
          </div>
          <div className="row">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="contact-info-card">
                <i className="fas fa-phone-alt"></i>
                <h5>Phone</h5>
                <p>
                  <a href="tel:7024478550">(702) 447-8550</a>
                </p>
                <p className="small text-muted">Available 24/7</p>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-phone"></i>
                <h5>Local Phone</h5>
                <p>
                  <a href="tel:3026001886">(302) 600-1886</a>
                </p>
                <p className="small text-muted">Wilmington, Delaware</p>
              </div>
              <div className="contact-info-card">
                <i className="fab fa-whatsapp"></i>
                <h5>WhatsApp</h5>
                <p>
                  <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20help%20with%20bail%20bond%20services.%20Please%20let%20me%20know%20how%20you%20can%20assist%20me." target="_blank" rel="noopener noreferrer">+1 (302) 981-9223</a>
                </p>
                <p className="small text-muted">Quick Response</p>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-envelope"></i>
                <h5>Email</h5>
                <p>
                  <a href="mailto:away2freedom302@gmail.com" target="_blank" rel="noopener noreferrer">away2freedom302@gmail.com</a>
                </p>
                <p className="small text-muted">Response within 24 hours</p>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt"></i>
                <h5>Address</h5>
                <p>288 E Main St, Newark, Delaware 19711</p>
                <p className="small text-muted">Serving Newark &amp; Surrounding Areas</p>
              </div>
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt"></i>
                <h5>Wilmington Address</h5>
                <p>715 N. King Street, Wilmington, Delaware 19801</p>
                <p className="small text-muted">Serving Wilmington &amp; Surrounding Areas</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="contact-form">
                <h3 className="mb-4 gold-text">Send Us a Message</h3>
                
                {submitStatusHome.message && (
                  <div className={`alert ${submitStatusHome.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'} mb-4`}>
                    <i className={`fas ${submitStatusHome.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                    {submitStatusHome.message}
                  </div>
                )}

                <form id="contactForm" onSubmit={handleContactSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                        placeholder="Your full name"
                        disabled={isSubmittingHome}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        required
                        placeholder="(702) 447-8550"
                        disabled={isSubmittingHome}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        disabled={isSubmittingHome}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        disabled={isSubmittingHome}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="inmateName">Inmate's Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inmateName"
                        name="inmateName"
                        required
                        placeholder="Inmate's full name"
                        disabled={isSubmittingHome}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="dateOfBirth">Date of Birth *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        required
                        disabled={isSubmittingHome}
                      />
                    </div>
                  </div>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Tell us about your situation..."
                    disabled={isSubmittingHome}
                  ></textarea>
                  <button type="submit" className="btn btn-gold w-100" disabled={isSubmittingHome}>
                    {isSubmittingHome ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3068.8!2d-75.549!3d39.745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6e8c8c8c8c8c9%3A0x0!2s715%20N%20King%20St%2C%20Wilmington%2C%20DE%2019801!5e0!3m2!1sen!2sus!4v1234567890"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="A Way to Freedom Bail Bonds Wilmington Delaware"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

const HomePage = ({ navigate }) => {
  useSEO(
    'Delaware Bail Bonds | 24/7 Wilmington & Newark Bail Bond Help',
    'Fast, confidential 24/7 Delaware bail bond services in Wilmington, Newark, New Castle County and Kent County. Call now for immediate help.',
    'Delaware bail bonds, bail bondsman Delaware, bail bonds Delaware, 24/7 bail bonds Delaware, Wilmington DE bail bonds, Newark DE bail bonds'
  );

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="hero-content">
                <p style={{color: 'var(--primary-gold)', fontWeight: '600', marginBottom: '0.5rem'}}>A Way to Freedom Bail Bond Service</p>
                <h1 className="hero-title">24/7 Bail Bonds Help in Delaware</h1>
                <p className="hero-subtitle">
                  A Way to Freedom provides fast, trusted bail bond help for families, friends, and co-signers after an arrest. We help with felony bonds, misdemeanor bonds, secured bonds, and surety bail bonds. Our goal is to make the process clear, simple, and quick from the first call.
                </p>
                <div className="features-grid mt-3 mb-3">
                  <div className="feature-item"><i className="fas fa-phone-alt"></i><span>Free 24/7 Consultation</span></div>
                  <div className="feature-item"><i className="fas fa-shield-alt"></i><span>Licensed and Trusted</span></div>
                  <div className="feature-item"><i className="fas fa-star"></i><span>25 years of experience</span></div>
                  <div className="feature-item"><i className="fas fa-bolt"></i><span>Fast Release Support</span></div>
                  <div className="feature-item"><i className="fas fa-credit-card"></i><span>Flexible Payment Options</span></div>
                  <div className="feature-item"><i className="fas fa-lock-open"></i><span>No Collateral Bail Bonds</span></div>
                  <div className="feature-item"><i className="fas fa-map-marker-alt"></i><span>Local Bail Bond Agent</span></div>
                </div>
                <p>Trust badges provided by client</p>
                <div className="hero-buttons">
                  <a href="tel:+17024478550" className="btn-primary-gold">
                    <i className="fas fa-phone-alt"></i>
                    Call Now
                  </a>
                  <a href="/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline">
                    Start the Process
                  </a>
                  <a href="/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline">
                    Speak With an Agent
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Are Bail Bonds */}
      <section className="section-dark-alt">
        <div className="container">
          <div className="section-title">
            <div className="gold-divider"></div>
            <h2>What Are Bail Bonds in DE?</h2>
          </div>
          <p>A bail bond helps a defendant get released from jail without paying the full bail amount upfront. A bail bond company posts the bond and helps families, co-signers, and defendants move forward with the release process. A Way to Freedom explains the steps clearly, helps with paperwork, and provides local support when fast action matters.</p>
        </div>
      </section>

      {/* Meet Simone Harris */}
      <section className="section-dark">
        <div className="container">
          <div className="section-title">
            <div className="gold-divider"></div>
            <h2>Meet Simone Harris, Owner of A Way to Freedom</h2>
          </div>
          <p>Simone Harris is the owner of A Way to Freedom. She serves Wilmington, New Castle County, and nearby Delaware communities with trusted local emergency bail bond help. As a mother and community member, she understands how stressful an arrest can be for families. She handles each case with compassion, urgency, and confidentiality, helping people take the next step with clear answers and respectful support.</p>
          <p className="mt-3" style={{color: 'var(--primary-gold)', fontWeight: '600'}}>More Than Just a Bail Bond Agent. A Professional Who Cares.</p>
        </div>
      </section>

      {/* Main Bail Bond Services */}
      <section className="section-dark-alt">
        <div className="container">
          <div className="section-title">
            <div className="gold-divider"></div>
            <h2>Main Bail Bond Services We Offer in Delaware</h2>
          </div>
          <p>A Way to Freedom helps families, co-signers, and defendants with fast bail bond support across Delaware. We help people understand the bond process, paperwork, payment options, and release steps after an arrest. Our goal is to make a stressful situation easier to handle with clear guidance, quick communication, and local support.</p>
          <div className="quick-services-grid mt-4">
            <div className="service-card reveal">
              <h3>Bail Bonds</h3>
              <p>We help people start the release process after bail has been set. Our team explains what the bond amount means, what paperwork is needed, and how the next step works. This service is for families, co-signers, and defendants who need fast help after an arrest.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Criminal Bail Bonds</h3>
              <p>We help with bail bond needs tied to criminal charges in Delaware. This may include arrest situations involving state charges, court appearances, and release conditions. We explain the process in simple language so families understand what happens next.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Felony Bonds</h3>
              <p>Felony bonds are tied to more serious criminal charges and often involve higher bond amounts or stricter court conditions. We help families and co-signers understand the release process, financial responsibility, and paperwork needed to move forward.</p>
              <a href="/services/felony" onClick={(e) => {e.preventDefault(); navigate('/services/felony');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Misdemeanor Bonds</h3>
              <p>Misdemeanor bonds help people get released after less serious charges, but the stress for the family is still real. We explain the bond amount, release steps, and co-signer role clearly so people can act quickly and make informed decisions.</p>
              <a href="/services/misdemeanor" onClick={(e) => {e.preventDefault(); navigate('/services/misdemeanor');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Traffic Bonds</h3>
              <p>Traffic bonds may apply when someone is arrested for a traffic-related offense and bond is required for release. We help explain the bond process, court-related concerns, and the next step needed to move the release process forward.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Juvenile Bonds</h3>
              <p>Juvenile bond situations can feel confusing and emotional for parents and guardians. We help families understand what bond may apply, what paperwork may be needed, and how to take the next step as quickly and clearly as possible.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Secured Bonds</h3>
              <p>Secured bonds require money, property, or other approved security to support the bond amount. We explain how secured bond situations work, what financial responsibility may be involved, and what the co-signer should understand before signing.</p>
              <a href="/services/secured" onClick={(e) => {e.preventDefault(); navigate('/services/secured');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Surety Bail Bonds</h3>
              <p>Surety bail bonds help defendants secure release without paying the full bail amount directly to the court. We help with the bond application, indemnitor or co-signer review, paperwork, and the release process so families can move forward with less confusion.</p>
              <a href="/services/surety" onClick={(e) => {e.preventDefault(); navigate('/services/surety');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Cash Bail</h3>
              <p>Cash bail may require the full cash amount ordered by the court before release can happen. We explain how cash bail works, what it means in the case, and how families can understand their options during a stressful time.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Appeal Bonds</h3>
              <p>Appeal bonds may be needed when a case is under appeal and bond-related issues affect release or court obligations. These situations can be more complex, so we explain the process carefully and help clients understand what may be required.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Federal Bonds</h3>
              <p>Federal bond cases follow a different process than many state court matters. We help clients understand the bond conditions, paperwork, and release expectations in federal cases so there is less confusion and delay.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>State Bail Bonds</h3>
              <p>State bail bonds apply to cases handled in Delaware state courts. We help explain the bond amount, release conditions, co-signer obligations, and next steps so families know how to move forward with more confidence.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Transfer Bonds</h3>
              <p>Transfer bonds involve cases where the defendant, hold, or bond process connects to another jurisdiction. We help explain how the transfer situation may affect release, paperwork, and the overall bond process.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Out-of-State Transfer Bonds</h3>
              <p>Out-of-state transfer bond situations can involve added steps because another state is involved. We help families understand what information may be needed, what delays can happen, and how the bond process may move across jurisdictions.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Violation of Probation Bonds</h3>
              <p>Violation of probation cases can move quickly and create stress for both the defendant and the family. We help explain the bond situation, court-related risk, and the next step needed to begin the release process.</p>
              <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-dark">
        <div className="container">
          <div className="section-title">
            <div className="gold-divider"></div>
            <h2>How Our 24/7 Bail Bond Process Works</h2>
          </div>
          <p>We keep the bail process simple, clear, and easy to start. Our team explains the bond amount, paperwork, and release steps in plain language so families know what happens next.</p>
          <div className="steps-container mt-4">
            <div className="step-item reveal">
              <div className="step-number">1</div>
              <h3>Call Our Office</h3>
              <p>You call and speak with a local bail bond agent. We listen, answer your questions, and explain the next step based on the arrest and jail release situation.</p>
            </div>
            <div className="step-item reveal">
              <div className="step-number">2</div>
              <h3>Share the Basic Case Details</h3>
              <p>You provide the defendant's name, jail or court information, and the bond amount if you have it. We review the details and explain what is needed to move forward.</p>
            </div>
            <div className="step-item reveal">
              <div className="step-number">3</div>
              <h3>Review Bond and Payment Options</h3>
              <p>We explain the bond process and available payment options in simple terms. If a co-signer or indemnitor is needed, we explain that clearly.</p>
            </div>
            <div className="step-item reveal">
              <div className="step-number">4</div>
              <h3>Complete the Paperwork</h3>
              <p>We help you complete the paperwork as quickly as possible. Electronic paperwork is available, which makes it easier to get started without unnecessary delay.</p>
            </div>
            <div className="step-item reveal">
              <div className="step-number">5</div>
              <h3>We Start the Release Process</h3>
              <p>Once everything is ready, we begin the bond posting process and help move the jail release forward. We stay in contact and keep the process as clear as possible.</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-primary-gold">
              Start the Process
            </a>
          </div>
        </div>
      </section>

      {/* Flexible Payment Options */}
      <section className="section-dark-alt">
        <div className="container">
          <div className="section-title">
            <div className="gold-divider"></div>
            <h2>Flexible Payment Options for Fast Bail Bonds</h2>
          </div>
          <p>Families often need clear payment information right after an arrest. We explain payment options, bond-related costs, and what may be needed to get started.</p>
          <div className="quick-services-grid mt-4">
            <div className="service-card reveal">
              <h3>Flexible Payment Arrangements</h3>
              <p>We offer flexible payment arrangements for qualifying cases. Our team explains the available options clearly so families and co-signers understand the next step.</p>
            </div>
            <div className="service-card reveal">
              <h3>What May Affect the Bond Cost</h3>
              <p>The total cost can depend on the bond amount, bond type, court conditions, collateral, and co-signer details. We explain these factors clearly so there is less confusion.</p>
            </div>
            <div className="service-card reveal">
              <h3>What to Have Ready When You Call</h3>
              <p>It helps to have the defendant's name, any bond amount you were given, basic jail or court information, and co-signer details if available. That helps us guide you faster.</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-primary-gold">
              Speak With an Agent
            </a>
          </div>
        </div>
      </section>

      {/* Local Bail Bond Company */}
      <section className="section-dark">
        <div className="container">
          <div className="section-title">
            <div className="gold-divider"></div>
            <h2>Local Bail Bond Company Across Delaware</h2>
          </div>
          <p>A Way to Freedom provides local bail bond services across Delaware, with a strong focus on New Castle County and nearby communities. We help families who need fast support and clear answers after an arrest.</p>
          <ul className="mt-3" style={{color: 'var(--text-light-secondary)', paddingLeft: '1.5rem'}}>
            <li>Wilmington, Delaware</li>
            <li>Newark, Delaware</li>
            <li>New Castle, Delaware</li>
            <li>New Castle County, Delaware</li>
            <li>Kent County, Delaware</li>
          </ul>
          <div className="text-center mt-4">
            <a href="/service-areas" onClick={(e) => {e.preventDefault(); navigate('/service-areas');}} className="btn-primary-gold">
              View Service Areas
            </a>
          </div>
        </div>
      </section>

      {/* When People Call */}
      <section className="section-dark-alt">
        <div className="container">
          <div className="section-title">
            <div className="gold-divider"></div>
            <h2>When People Usually Call A Way to Freedom</h2>
          </div>
          <p>Most people call during a stressful moment after an arrest. They may be worried about detention, the bond amount, or how to start the release process. We help families, co-signers, and defendants get clear answers when urgent help matters.</p>
          <div className="quick-services-grid mt-4">
            <div className="service-card reveal">
              <h3>After a Recent Arrest</h3>
              <p>A recent arrest often leaves families unsure about the bond type, bond amount, and next step. We help explain the situation clearly and guide them toward release.</p>
            </div>
            <div className="service-card reveal">
              <h3>When a Family Member Needs Help Fast</h3>
              <p>Many calls come from a family member trying to help someone in detention quickly. We explain what may be needed and how to get started.</p>
            </div>
            <div className="service-card reveal">
              <h3>When You Need to Start by Phone</h3>
              <p>Some people need to begin the process from home, work, or late at night. We help them start by phone and explain the paperwork clearly.</p>
            </div>
            <div className="service-card reveal">
              <h3>When You Need Payment Flexibility</h3>
              <p>Payment concerns are common after an arrest. We help families understand the next step and explain available options clearly.</p>
            </div>
            <div className="service-card reveal">
              <h3>When You Are Not Sure What Bond Was Set</h3>
              <p>Confusion is common in the first few hours after detention. We help people understand what information they have and what may be needed next.</p>
            </div>
          </div>
          <div className="text-center mt-4">
            <a href="tel:+17024478550" className="btn-primary-gold">
              <i className="fas fa-phone-alt me-2"></i>Talk to a Bail Bond Agent
            </a>
          </div>
        </div>
      </section>

      {/* Why Families Choose */}
      <section className="section-dark">
        <div className="container">
          <div className="section-title">
            <div className="gold-divider"></div>
            <h2>Why Families in Delaware Choose A Way to Freedom</h2>
          </div>
          <h3 className="mb-3">Why Families Call Us First</h3>
          <p>Families do not call a bail bond company because they have time to compare complex legal terms. They call because they need help now. A Way to Freedom keeps the process clear, supportive, and easy to begin.</p>
          <ul className="benefits-list mt-3">
            <li>Fast local help from the first call</li>
            <li>Clear answers and simple next steps</li>
            <li>Support with bond questions, paperwork, and release details</li>
            <li>Flexible payment help for families and co-signers</li>
            <li>Easy start by phone or electronic paperwork</li>
            <li>Help from home, work, or after hours</li>
            <li>Respectful, private, and judgment-free support</li>
            <li>Calm communication during a stressful time</li>
            <li>Local Delaware bail bond guidance</li>
            <li>24/7 help when urgent support is needed</li>
          </ul>
          <div className="text-center mt-4">
            <a href="tel:+17024478550" className="btn-primary-gold">
              <i className="fas fa-phone-alt me-2"></i>Call Now
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-dark-alt">
        <div className="container">
          <div className="section-title">
            <div className="gold-divider"></div>
            <h2>FAQ About A Way to Freedom Bail Bond Service</h2>
          </div>
          <div className="accordion" id="homeFaqAccordion">
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq1">
                  What is a bail bond?
                </button>
              </h3>
              <div id="hfaq1" className="accordion-collapse collapse show" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">A bail bond helps someone get released from jail without paying the full bail amount upfront. A bail bond company posts the bond so the defendant can be released while the case moves through court.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq2">
                  What is the difference between bail and a bail bond?
                </button>
              </h3>
              <div id="hfaq2" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">Bail is the amount set for release. A bail bond is when a bail bond company helps post that amount, and the family or co-signer usually pays a fee instead of the full amount upfront.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq3">
                  Why do people use a bail bond instead of paying the full bail amount?
                </button>
              </h3>
              <div id="hfaq3" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">Many families use a bail bond because the full bail amount is too high to pay at one time. A bail bond helps start the release process when immediate cash is limited.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq4">
                  What information is needed to start a bail bond?
                </button>
              </h3>
              <div id="hfaq4" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">Most cases start with the defendant's name, basic jail or court information, and the bond amount if it has already been set. If a co-signer is involved, their information may also be needed.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq5">
                  Can a family member or co-signer start the process?
                </button>
              </h3>
              <div id="hfaq5" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">Yes. In many cases, a family member, partner, or co-signer is the person who calls first. They can help start the process and review the next steps.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq6">
                  Can I start a bail bond by phone?
                </button>
              </h3>
              <div id="hfaq6" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">Yes. Many people need help from home, work, or late at night. Starting by phone makes it easier to get answers fast and begin the process without delay.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq7">
                  What happens if I do not know the bond amount or bond type yet?
                </button>
              </h3>
              <div id="hfaq7" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">That is common after a recent arrest. The first step is usually confirming the bond amount, bond type, and basic defendant details so the process can move forward clearly.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq8">
                  Do you get bail money back?
                </button>
              </h3>
              <div id="hfaq8" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">If the full bail is paid directly to the court, it may be returned at the end of the case if all court requirements are met. If a bail bond company is used, the fee paid for the bond is not refunded.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq9">
                  Can collateral be required for a bail bond?
                </button>
              </h3>
              <div id="hfaq9" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">In some cases, yes. This can depend on the bond amount, the case, and the bond conditions. Larger or higher-risk bonds may involve added financial responsibility.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq10">
                  What should I think about before helping someone with a bail bond?
                </button>
              </h3>
              <div id="hfaq10" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">It is important to understand the bond amount, bond conditions, and the responsibility of being a co-signer. People should know the financial risk and what could happen if the defendant misses court.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq11">
                  What happens if the defendant misses court?
                </button>
              </h3>
              <div id="hfaq11" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">Missing court can create serious problems for the defendant and for anyone who signed for the bond. That is why co-signers should understand their role before agreeing to help.</div>
              </div>
            </div>
            <div className="accordion-item">
              <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#hfaq12">
                  How do bail bond companies make money?
                </button>
              </h3>
              <div id="hfaq12" className="accordion-collapse collapse" data-bs-parent="#homeFaqAccordion">
                <div className="accordion-body">Bail bond companies usually earn money by charging a fee for posting the bond. That fee is separate from the full bail amount set by the court.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container">
          <h2>Talk to A Way to Freedom Now</h2>
          <p style={{color: 'var(--text-light-secondary)', marginBottom: '1.5rem'}}>
            If your loved one was just arrested, do not stay stuck in confusion. A Way to Freedom provides fast local bail bond help across Delaware with clear guidance, simple communication, and support when families need it most. Call now to start the bail bond process.
          </p>
          <div className="hero-buttons">
            <a href="tel:+17024478550" className="btn-primary-gold">
              <i className="fas fa-phone-alt me-2"></i>Call Now
            </a>
            <a href="tel:+17024478550" className="btn-secondary-outline">
              Get Bail Help Now
            </a>
            <a href="/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline">
              Start the Process Today
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// SERVICES HUB PAGE
// ============================================
const ServicesPage = ({ navigate }) => {
  useSEO(
    'Bail Bond Services | New Castle & Kent County Delaware',
    'Professional bail bond services designed to help families and defendants navigate the legal process quickly, respectfully, and efficiently in Delaware.',
    'bail bond services, felony bonds, misdemeanor bonds, surety bail, Delaware bail services, New Castle County bail, Kent County bail'
  );

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
      ]),
    ],
  });

  const services = [
    { path: '/services/felony', icon: 'fa-gavel', title: 'Felony Bonds', desc: 'Focused guidance for felony bond situations in Delaware, including bond type, co-signer questions and paperwork.' },
    { path: '/services/misdemeanor', icon: 'fa-balance-scale', title: 'Misdemeanor Bail Bonds', desc: 'Clear misdemeanor bail bond help for families who need to confirm bond amount, release type and next steps.' },
    { path: '/services/secured', icon: 'fa-lock', title: 'Secured Bail', desc: 'Plain-English help understanding secured bail, security requirements and family responsibility.' },
    { path: '/services/surety', icon: 'fa-handshake', title: 'Surety Bail Bonds', desc: 'Surety bond guidance for families comparing court payment, premium questions and written bond terms.' },
    { path: '/services/fast-release', icon: 'fa-bolt', title: 'Fast Bail Release Help', desc: 'Fast-response guidance focused on accurate information, paperwork and release-process timing.' },
    { path: '/services/payment', icon: 'fa-credit-card', title: 'Bail Bond Payment Plans', desc: 'Payment arrangement help with written terms, receipts and co-signer responsibility explained clearly.' },
    { path: '/services/e-paperwork', icon: 'fa-laptop', title: 'Online Bail Bond Paperwork', desc: 'Electronic paperwork help for families who need to start the bail bond process remotely.' },
  ];

  return (
    <div className="page-container">
      <section className="services-hero">
        <div className="container">
          <div className="gold-divider"></div>
          <h1>Delaware Bail Bond Services</h1>
          <p style={{color: 'var(--text-light-secondary)', maxWidth: '700px', margin: '0 auto'}}>
            We provide professional bail bond services designed to help families and defendants 
            navigate the legal process quickly, respectfully, and efficiently. Serving Newark, Delaware 
            and all of New Castle County & Kent County.
          </p>
        </div>
      </section>

      <section className="section-dark">
        <div className="container">
          <div className="services-grid-modern">
            {services.map((service, index) => (
              <a 
                key={index}
                href={`#${service.path}`} 
                onClick={(e) => {e.preventDefault(); navigate(service.path);}}
                className="service-box-card reveal"
              >
                <div className="service-box-icon">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
                <span className="service-box-link">
                  Learn More <i className="fas fa-arrow-right"></i>
                </span>
              </a>
            ))}
          </div>

          <div className="text-center mt-5" style={{color: 'var(--text-light-secondary)'}}>
            <p style={{fontSize: '1.1rem'}}>
              Delaware bail bond services with separate help for secured bail, felony bonds, misdemeanor bonds, 
              surety bail, fast release, payment arrangements and online paperwork.
            </p>
            <p className="mt-3 text-gold">
              <i className="fas fa-map-marker-alt me-2"></i>
              Newark, Delaware • New Castle County • Kent County
            </p>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Need Bail Bond Assistance?</h2>
          <p style={{color: 'var(--text-light-secondary)', marginBottom: '1.5rem'}}>We're here to help you navigate this difficult time</p>
          <a href="tel:+17024478550" className="btn-primary-gold">
            <i className="fas fa-phone-alt me-2"></i>Call (702) 447-8550
          </a>
        </div>
      </section>
    </div>
  );
};

// ============================================
// INDIVIDUAL SERVICE PAGES
// ============================================
const ServiceDetailPage = ({ serviceKey, navigate }) => {
  const servicesData = {
    felony: {
      title: 'Felony Bonds',
      focusKeyword: 'felony bonds Delaware',
      relatedKeywords: 'felony bail bonds Delaware, felony bond help Delaware, felony bail release Delaware',
      metaTitle: 'Felony Bonds Delaware | 24/7 Bail Bond Help',
      metaDescription: 'Need felony bonds in Delaware? Get 24/7 bail bond guidance for New Castle County and Kent County with clear next steps before signing.',
      hero: 'Felony Bonds in Delaware',
      summary: 'Felony bond situations can feel serious and confusing for families. A Way to Freedom Bail Bonds helps people in Delaware understand the bond amount, bond type, paperwork, co-signer questions, and next steps after an arrest.',
      intro: [
        'A felony charge can create urgent questions about release, court dates, bond type, and family responsibility. The goal of this page is to help families understand what to ask before moving forward with a felony bail bond in Delaware.',
        'This service page is focused on felony bonds in Delaware, especially New Castle County and Kent County. For misdemeanor-specific help, use the misdemeanor page so each service has a clear keyword focus and no cannibalization.'
      ],
      sections: [
        { heading: 'What to know about felony bonds in Delaware', body: 'A felony bond may involve a higher bond amount, stricter release conditions, or more detailed co-signer questions. The court order controls what type of bail applies, so families should confirm whether bail is secured, unsecured, cash-only, or another release type before assuming a commercial bond can be used.' },
        { heading: 'When this felony bonds page is the right page', body: 'Use this page when the main concern is a felony charge, felony bond amount, felony release conditions, or felony co-signer responsibility in Delaware. Broad searches for Delaware bail bonds should go to the homepage, while misdemeanor cases should use the misdemeanor bonds page.' },
        { heading: 'Local felony bond help in New Castle County and Kent County', body: 'Families often call after an arrest in Wilmington, Newark, New Castle County, or Kent County. A local conversation can help identify which court or holding location is involved, what details still need to be confirmed, and whether the court order allows a bail bond company to help.' },
        { heading: 'Information to have before calling', list: ['Defendant full legal name and date of birth', 'Arrest location or court information', 'Bond amount if known', 'Bond type if known', 'Charge or case details if available', 'Potential co-signer contact information'] },
        { heading: 'Questions families should ask', list: ['What type of bail did the court set?', 'What amount must be paid before release?', 'Is collateral required?', 'What does the co-signer agree to do?', 'What happens if the defendant misses court?', 'Will written receipts and documents be provided?'] }
      ],
      faqs: [
        { question: 'Do felony bonds work differently from misdemeanor bonds?', answer: 'They can. Felony cases may involve different bond amounts, release conditions, or co-signer review. The exact requirements depend on the court order and case details.' },
        { question: 'Can a felony bond be started by phone?', answer: 'Many conversations can begin by phone. Helpful details include the defendant name, date of birth, location, bond amount, and bond type if known.' },
        { question: 'Do you guarantee release time?', answer: 'No. Timing depends on the court, jail, paperwork, bond type, and case details. A bail bond agent can help explain the next steps but should not promise a guaranteed release time.' }
      ],
      relatedLinks: [
        { path: '/services/misdemeanor', label: 'misdemeanor bonds Delaware' },
        { path: '/services/secured', label: 'secured bail bond help' },
        { path: '/new-castle-county-bail-bonds', label: 'New Castle County bail bonds' },
        { path: '/blog/how-to-bond-someone-out-of-jail-delaware', label: 'how to bond someone out of jail in Delaware' }
      ]
    },
    misdemeanor: {
      title: 'Misdemeanor Bail Bonds',
      focusKeyword: 'misdemeanor bonds Delaware',
      relatedKeywords: 'misdemeanor bail bonds Delaware, misdemeanor bond help Delaware, misdemeanor release help',
      metaTitle: 'Misdemeanor Bonds Delaware | 24/7 Bail Bond Help',
      metaDescription: 'Need misdemeanor bonds in Delaware? Get calm 24/7 guidance after an arrest without confusing this page with broad Delaware bail bonds searches.',
      hero: 'Misdemeanor Bail Bonds in Delaware',
      summary: 'Misdemeanor cases may feel less serious than felony cases, but families still need clear answers about bond amount, release conditions, paperwork, and court dates.',
      intro: [
        'A misdemeanor arrest can still disrupt work, family, and daily life. If someone needs help after a misdemeanor arrest in Delaware, the first step is to confirm the bond amount and bond type before signing anything.',
        'This page focuses on misdemeanor bonds in Delaware. Broad Delaware bail bonds questions belong on the homepage, while felony bond questions should be handled on the felony bonds page so each service page has a unique search intent.'
      ],
      sections: [
        { heading: 'What to know about misdemeanor bail bonds', body: 'Misdemeanor bail bond situations may involve lower bond amounts than some felony cases, but every case is different. The court may also set conditions that the defendant must follow after release.' },
        { heading: 'Why this page is focused only on misdemeanor bonds', body: 'Semrush data showed that misdemeanor terms should not be mixed with broad Delaware bail bonds terms. This page is written for families dealing with misdemeanor bonds in Delaware, while the homepage handles broad Delaware bail bonds searches and the felony page handles felony bond situations.' },
        { heading: 'Common misdemeanor situations families ask about', body: 'Families may call after a DUI-related arrest, traffic-related arrest, disorderly conduct allegation, probation issue, or another lower-level charge. The charge name alone does not decide the bond process; the written court order and bond type control the next step.' },
        { heading: 'Information to prepare', list: ['Defendant full name', 'Date of birth', 'Arrest or court location', 'Bond amount if available', 'Bond type if available', 'A reliable phone number for follow-up'] },
        { heading: 'Common misdemeanor-related questions', list: ['Has bail already been set?', 'Is the release secured, unsecured, cash-only, or recognizance?', 'Does the defendant have court conditions?', 'Is a co-signer needed?', 'What paperwork needs to be completed?'] }
      ],
      faqs: [
        { question: 'Are misdemeanor bail bonds available 24/7 in Delaware?', answer: 'You can call for guidance 24/7. Actual release timing depends on the court order, jail process, paperwork, and bond type.' },
        { question: 'Is a co-signer always needed for a misdemeanor bond?', answer: 'Not always. Co-signer needs can depend on the bond amount, bond type, and case details.' },
        { question: 'Can I call if I do not know the bond amount?', answer: 'Yes. You can call with the details you have and ask what information should be checked next.' }
      ],
      relatedLinks: [
        { path: '/services/felony', label: 'felony bonds Delaware' },
        { path: '/services/secured', label: 'secured bail Delaware' },
        { path: '/blog/how-do-you-find-out-how-much-someones-bail-is', label: 'how to find out the bail amount' },
        { path: '/newark-de-bail-bonds', label: 'Newark DE bail bonds' }
      ]
    },
    secured: {
      title: 'Secured Bail',
      focusKeyword: 'secured bail Delaware',
      relatedKeywords: 'secured bond Delaware, bail secured bond, secured bail bond help Delaware',
      metaTitle: 'Secured Bail Delaware | Bail Bond Help 24/7',
      metaDescription: 'Learn how secured bail works in Delaware and call for 24/7 bail bond guidance in New Castle County, Kent County, Wilmington and Newark.',
      hero: 'Secured Bail Help in Delaware',
      summary: 'Secured bail means money, property, or another form of security may be required before release. Families should confirm the court order and understand financial responsibility before moving forward.',
      intro: [
        'Secured bail can be confusing because it may involve cash, property, a bail bond, or someone posting security on the defendant\'s behalf. The exact next step depends on what the Delaware court ordered.',
        'This page focuses on secured bail in Delaware. It should not compete with felony, misdemeanor, payment plan, or county location pages.'
      ],
      sections: [
        { heading: 'What secured bail usually means', body: 'Delaware Courts explain that secured bail requires the defendant to pay the court a designated amount of money or post security in the amount of bail before release. That security may be posted by the defendant or someone else, including a relative or bail bondsman.' },
        { heading: 'When secured bail is different from other bond pages', body: 'This page is about the bond type, not the criminal charge. If the issue is a felony charge, use the felony bonds page. If the issue is a misdemeanor charge, use the misdemeanor bonds page. If the court order says unsecured or cash-only, those release types work differently from secured bail.' },
        { heading: 'Local secured bail questions in Delaware', body: 'In New Castle County, Wilmington, Newark, and nearby Delaware communities, families often hear the words secured, cash-only, or unsecured and do not know which one applies. The safest first step is to read the written bond order and confirm the exact wording before arranging payment or signing.' },
        { heading: 'What families should confirm first', list: ['Exact bail amount', 'Whether the order says secured bail or cash-only', 'Who can post security', 'Whether collateral or a co-signer may be required', 'What written agreement will be signed'] },
        { heading: 'Questions before using secured bail help', list: ['What is due now?', 'What is refundable and what is not?', 'What happens if court is missed?', 'What documents and receipts will be provided?', 'Who is financially responsible?'] }
      ],
      faqs: [
        { question: 'Can a bail bondsman help with secured bail in Delaware?', answer: 'In some secured bail situations, a bail bond agent may be able to help. Cash-only, unsecured, and own-recognizance release work differently, so confirm the exact bond type first. If the order says unsecured, read our unsecured bail guide before assuming money is due upfront.' },
        { question: 'Is secured bail the same as cash-only bail?', answer: 'No. Secured bail and cash-only bail are different release types. Families should read the court order carefully before assuming a standard bail bond can be used.' },
        { question: 'What should I ask before posting secured bail?', answer: 'Ask about the full bail amount, security required, premium or payment arrangement, collateral, co-signer responsibility, receipts, and missed-court consequences.' }
      ],
      relatedLinks: [
        { path: '/services/surety', label: 'surety bail bonds Delaware' },
        { path: '/blog/how-to-bond-someone-out-of-jail-delaware', label: 'Delaware jail bond guide' },
        { path: '/blog/what-is-unsecured-bail-delaware', label: 'what unsecured bail means in Delaware' },
        { path: '/new-castle-county-bail-bonds', label: 'New Castle County bail bonds' },
        { path: '/services/payment', label: 'bail bond payment arrangements' }
      ]
    },
    surety: {
      title: 'Surety Bail Bonds',
      focusKeyword: 'surety bail bonds Delaware',
      relatedKeywords: 'surety bond help Delaware, Delaware surety bail, surety bond release help',
      metaTitle: 'Surety Bail Bonds Delaware | 24/7 Bond Help',
      metaDescription: 'Need surety bail bonds in Delaware? Learn what a surety bond means and call for 24/7 guidance in Wilmington, Newark and nearby areas.',
      hero: 'Surety Bail Bonds in Delaware',
      summary: 'A surety bail bond involves a bail bond company acting as surety to help guarantee the defendant\'s court appearance according to the bond agreement.',
      intro: [
        'Surety bail bonds can help families when paying the full bail amount directly to the court is not realistic. The agreement still creates serious responsibilities for the defendant and any co-signer.',
        'This page focuses on surety bail bonds in Delaware, separate from secured bail explanations, payment plan questions, and local county pages.'
      ],
      sections: [
        { heading: 'What a surety bail bond means', body: 'A surety bail bond is a written guarantee connected to the defendant appearing for future court proceedings. The family or co-signer should understand the terms before signing any agreement.' },
        { heading: 'When surety bail is the correct topic', body: 'This page is for families comparing surety bail bonds with secured bail, cash bail, or unsecured bail. It should not compete with the homepage for broad Delaware bail bonds searches or with the payment page for payment-plan questions.' },
        { heading: 'What a co-signer should understand', body: 'A surety bond may involve a premium, written agreement, contact requirements, and financial responsibility if the defendant misses court. Co-signers should ask for clear paperwork, receipts, and plain-English explanation before signing.' },
        { heading: 'What may be reviewed', list: ['Defendant information', 'Bond amount and bond type', 'Co-signer information', 'Employment or residence details', 'Payment and responsibility terms'] },
        { heading: 'What to ask before signing', list: ['Who is responsible if court is missed?', 'What amount is paid as premium?', 'Are there collateral requirements?', 'What written contract and receipts will be provided?', 'How should court date changes be reported?'] }
      ],
      faqs: [
        { question: 'Is a surety bail bond refundable?', answer: 'The premium paid to a bail bond company is generally a service fee and is not the same as paying the full bail directly to the court.' },
        { question: 'Does a surety bond guarantee release?', answer: 'No one should guarantee release timing. The court order, jail process, paperwork, and case details can all affect timing.' },
        { question: 'Can I start a surety bail bond by phone?', answer: 'Many initial steps can begin by phone using the defendant name, date of birth, bond amount, and basic case details if available.' }
      ],
      relatedLinks: [
        { path: '/services/secured', label: 'secured bail in Delaware' },
        { path: '/services/payment', label: 'bail bond payment plans Delaware' },
        { path: '/blog/what-is-unsecured-bail-delaware', label: 'unsecured bail in Delaware' },
        { path: '/blog/what-is-cash-bond', label: 'what is a cash bond' },
        { path: '/contact', label: 'contact A Way to Freedom' }
      ]
    },
    'fast-release': {
      title: 'Fast Bail Release Help',
      focusKeyword: 'fast bail release Delaware',
      relatedKeywords: 'fast release help Delaware, quick bail release help, 24/7 release process guidance',
      metaTitle: 'Fast Bail Release Delaware | 24/7 Guidance',
      metaDescription: 'Need fast bail release help in Delaware? Call for 24/7 guidance on bond amount, paperwork and next steps in New Castle County and Kent County.',
      hero: 'Fast Bail Release Help in Delaware',
      summary: 'Fast bail release help means moving quickly with correct information, not making promises that no one can control. The court, jail, bond type, paperwork, and payment details all affect timing.',
      intro: [
        'When someone is arrested, families naturally want release to happen as quickly as possible. The fastest path usually starts with accurate information and clear paperwork.',
        'This page focuses on fast bail release help in Delaware without competing with the broader fast reliable bail bonds blog or city location pages.'
      ],
      sections: [
        { heading: 'What can make the process move faster', list: ['Correct defendant name and date of birth', 'Known jail or court location', 'Bond amount and bond type', 'Ready co-signer information if needed', 'Fast response to document requests'] },
        { heading: 'Fast release help is about speed plus accuracy', body: 'The fastest useful help is not just calling quickly. It means gathering the right defendant details, confirming the bond type, avoiding wrong assumptions about payment, and completing paperwork correctly the first time.' },
        { heading: 'Where fast release questions fit in the site', body: 'Use this page when the family’s main concern is timing and next steps. Use the felony, misdemeanor, secured, surety, or payment pages when the family already knows the exact charge type or bond type.' },
        { heading: 'What can slow release down', list: ['Unknown bond amount', 'Cash-only or unclear court order', 'Missing identification or paperwork', 'Payment or collateral questions', 'Court or jail processing delays'] },
        { heading: 'What fast help should not promise', body: 'A bail bond company can respond quickly, explain steps, and prepare paperwork, but should not guarantee an exact release time. Honest timing depends on the court and jail process.' }
      ],
      faqs: [
        { question: 'Can bail release happen the same day?', answer: 'It may happen in some cases, but it should not be guaranteed. Timing depends on the court order, jail process, paperwork, and bond type.' },
        { question: 'What should I have ready for fast bail help?', answer: 'Have the defendant name, date of birth, location, bond amount if known, and co-signer contact information if available.' },
        { question: 'Can I call at night?', answer: 'Yes. A family member can call for 24/7 guidance and ask what information is needed next.' }
      ],
      relatedLinks: [
        { path: '/wilmington-de-bail-bonds', label: 'Wilmington DE bail bonds' },
        { path: '/blog/how-do-you-find-out-how-much-someones-bail-is', label: 'find the bail amount' },
        { path: '/blog/fast-reliable-bail-bonds-delaware', label: 'fast and reliable bail bonds guide' },
        { path: '/services/e-paperwork', label: 'electronic paperwork help' }
      ]
    },
    payment: {
      title: 'Bail Bond Payment Plans',
      focusKeyword: 'bail bond payment plans Delaware',
      relatedKeywords: 'bail bond cost Delaware, bail bond payment arrangements, Delaware bail bond premium',
      metaTitle: 'Bail Bond Payment Plans Delaware | 24/7 Help',
      metaDescription: 'Need bail bond payment plans in Delaware? Ask about payment arrangements, written terms and co-signer responsibilities before signing.',
      hero: 'Bail Bond Payment Plans in Delaware',
      summary: 'Payment questions are common after an arrest. Families should ask what is due now, what is a non-refundable premium, what terms are written, and what responsibilities a co-signer accepts.',
      intro: [
        'A bail bond payment plan can help families discuss options when paying everything at once is difficult, but the terms need to be clear in writing before anyone signs.',
        'This page focuses on bail bond payment plans in Delaware. It is separate from bond-type pages like secured bail and surety bail bonds.'
      ],
      sections: [
        { heading: 'What to ask about payment arrangements', list: ['What amount is due now?', 'What is the total premium or charge?', 'Are payments written in a contract?', 'Are receipts provided?', 'What happens if a payment is missed?', 'Is collateral involved?'] },
        { heading: 'Why this page targets payment questions', body: 'Families searching about bail bond payment plans usually need clear financial information, not a general Delaware bail bonds page. This page keeps payment intent separate from felony, misdemeanor, secured bail, and surety bail pages.' },
        { heading: 'Delaware premium caution', body: 'Delaware law requires surety bail bond premiums or charges to follow rates filed with and approved by the Department. For surety bail bonds above $1,000, the total filed premium must be at least 5% and not more than 10%, and at least 5% must be collected before posting.' },
        { heading: 'Payment details families should write down', body: 'Before signing, write down the amount due now, the total premium, any remaining balance, due dates, collateral terms if any, and who is responsible if the defendant misses court or payment obligations are not met.' },
        { heading: 'Why written terms matter', body: 'A written agreement helps families understand the premium, payment schedule, co-signer responsibilities, and what happens if court or payment obligations are not met.' }
      ],
      faqs: [
        { question: 'Are bail bond payment plans available in Delaware?', answer: 'Payment arrangement questions can be discussed case by case. Families should ask what is due now, what terms are written, and what responsibilities apply.' },
        { question: 'Is the bail bond premium refundable?', answer: 'A bail bond premium is generally a service fee and is different from paying full cash bail directly to the court.' },
        { question: 'Should I ask for receipts?', answer: 'Yes. Ask for written paperwork and receipts so payment responsibilities are clear.' }
      ],
      relatedLinks: [
        { path: '/services/surety', label: 'surety bail bonds Delaware' },
        { path: '/services/secured', label: 'secured bail help' },
        { path: '/blog/how-much-does-a-bail-bond-cost-in-delaware', label: 'how much does a bail bond cost in Delaware' },
        { path: '/blog/bail-bond-process-step-by-step', label: 'Delaware bail bond process steps' },
        { path: '/blog/how-do-you-find-out-how-much-someones-bail-is', label: 'how to find out the bail amount' }
      ]
    },
    'e-paperwork': {
      title: 'Online Bail Bond Paperwork',
      focusKeyword: 'online bail bond paperwork Delaware',
      relatedKeywords: 'electronic bail paperwork Delaware, remote bail bond paperwork, online bond documents',
      metaTitle: 'Online Bail Bond Paperwork Delaware | 24/7 Help',
      metaDescription: 'Need online bail bond paperwork help in Delaware? Learn what details may be needed and call for 24/7 guidance before signing documents.',
      hero: 'Online Bail Bond Paperwork in Delaware',
      summary: 'Electronic paperwork can make the first steps easier for families who cannot visit in person, but documents should still be reviewed carefully before signing.',
      intro: [
        'Some bail bond steps may begin electronically, especially when family members are at work, out of town, or trying to help quickly after an arrest. The process still requires accurate information and clear written terms.',
        'This page focuses on online bail bond paperwork in Delaware, separate from fast release, payment plan, and bond-type pages.'
      ],
      sections: [
        { heading: 'What electronic paperwork may help with', list: ['Collecting defendant and co-signer details', 'Reviewing contact and address information', 'Sending documents for review', 'Helping family members start from a distance', 'Reducing unnecessary travel when possible'] },
        { heading: 'When online paperwork is useful', body: 'Online bail bond paperwork can help when a family member is at work, out of town, or trying to start after hours. It supports the process, but it does not replace confirming the bond amount, bond type, and written agreement details.' },
        { heading: 'Keep digital paperwork separate from payment questions', body: 'This page explains remote document handling. If the main concern is cost, premium, or payment schedule, the payment plan page is the better resource.' },
        { heading: 'What you should review before signing', list: ['Defendant information', 'Bond amount and bond type', 'Premium or payment terms', 'Co-signer responsibility', 'Collateral terms if any', 'Receipts and copies of signed documents'] },
        { heading: 'Digital convenience with careful review', body: 'Convenience should not replace understanding. Ask questions before signing electronically and keep copies of documents and receipts.' }
      ],
      faqs: [
        { question: 'Can bail bond paperwork be started online in Delaware?', answer: 'Some initial paperwork or information gathering may be handled electronically. The exact process depends on the case, bond type, and required documents.' },
        { question: 'Is electronic paperwork safe?', answer: 'Families should use secure communication, avoid sharing unnecessary personal data publicly, and keep copies of signed documents.' },
        { question: 'Can an out-of-town family member help?', answer: 'Often, a family member can start by phone or electronically with the details they have and ask what documents are needed next.' }
      ],
      relatedLinks: [
        { path: '/services/fast-release', label: 'fast bail release help' },
        { path: '/services/payment', label: 'payment arrangement questions' },
        { path: '/blog/how-to-bond-someone-out-of-jail-delaware', label: 'how to bond someone out of jail in Delaware' },
        { path: '/contact', label: 'contact A Way to Freedom' }
      ]
    }
  };

  const service = servicesData[serviceKey];
  const localServiceLinks = [
    { path: '/wilmington-de-bail-bonds', label: 'Wilmington DE bail bonds' },
    { path: '/newark-de-bail-bonds', label: 'Newark DE bail bonds' },
    { path: '/new-castle-county-bail-bonds', label: 'New Castle County bail bonds' },
  ];

  if (!service) {
    return <div className="page-container"><div className="container py-5"><h2>Service not found</h2></div></div>;
  }

  useSEO(
    service.metaTitle,
    service.metaDescription,
    `${service.focusKeyword}, ${service.relatedKeywords}, ${service.title.toLowerCase()}`
  );
  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${SITE_URL}/services/${serviceKey}#service`,
        "name": service.title,
        "description": service.summary,
        "serviceType": service.title,
        "url": `${SITE_URL}/services/${serviceKey}`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${SITE_URL}/services/${serviceKey}`,
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "New Castle County, Delaware" },
          { "@type": "AdministrativeArea", "name": "Kent County, Delaware" },
        ],
        "provider": {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#localbusiness`,
          "name": "A Way to Freedom Bail Bonds",
          "telephone": ["+1-702-447-8550", "+1-302-600-1886"],
        },
      },
      {
        "@type": "FAQPage",
        "mainEntity": service.faqs.map((faq) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      },
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: service.title, path: `/services/${serviceKey}` },
      ]),
    ],
  });

  return (
    <div className="page-container">
      <section className="service-detail-hero">
        <div className="container">
          <a href="/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="back-link">
            <i className="fas fa-arrow-left"></i> Back to All Services
          </a>
          <div className="gold-divider" style={{margin: '1rem 0'}}></div>
          <h1>{service.hero}</h1>
        </div>
      </section>

      <section className="service-detail-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <p className="lead">{service.summary}</p>

              <div className="detail-section">
                {service.intro.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {service.sections.map((section, i) => (
                <div className="detail-section" key={i}>
                  <h3>{section.heading}</h3>
                  {section.body && <p>{section.body}</p>}
                  {section.list && (
                    <ul className="benefits-list">
                      {section.list.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <div className="detail-section">
                <h3>Helpful Related Resources</h3>
                <ul className="requirements-list">
                  {service.relatedLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.path} onClick={(e) => { e.preventDefault(); navigate(link.path); }}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h3>Local Bail Bond Service Areas</h3>
                <p>
                  If your search is location-specific, choose the page that matches where the arrest, jail process, or court hearing is happening.
                </p>
                <ul className="requirements-list">
                  {localServiceLinks.map((link, i) => (
                    <li key={i}>
                      <a href={link.path} onClick={(e) => { e.preventDefault(); navigate(link.path); }}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h3>{service.title} FAQs</h3>
                {service.faqs.map((faq, i) => (
                  <div key={i} style={{marginBottom: '1.25rem'}}>
                    <h4 style={{color: 'var(--primary-gold)', fontSize: '1.1rem'}}>{faq.question}</h4>
                    <p>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4">
              <div className="sidebar-widget">
                <h4><i className="fas fa-clock me-2"></i>24/7 Guidance</h4>
                <p style={{color: 'var(--text-light-secondary)', fontSize: '0.9rem'}}>
                  You can call any time to ask what information is needed next for this service.
                </p>
              </div>

              <div className="sidebar-widget">
                <h4><i className="fas fa-shield-alt me-2"></i>Careful Paperwork</h4>
                <p style={{color: 'var(--text-light-secondary)', fontSize: '0.9rem'}}>
                  We help families understand paperwork, payment questions, and co-signer responsibility before moving forward.
                </p>
              </div>

              <div className="sidebar-widget" style={{background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.15) 0%, rgba(201, 169, 98, 0.05) 100%)', border: '1px solid var(--primary-gold)'}}>
                <h4>Ready to Get Started?</h4>
                <a href="tel:+17024478550" className="btn-primary-gold w-100 mb-2">
                  <i className="fas fa-phone-alt me-2"></i>Call Now
                </a>
                <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20help%20with%20bail%20bond%20services.%20Please%20let%20me%20know%20how%20you%20can%20assist%20me." target="_blank" rel="noopener noreferrer" className="btn-secondary-outline w-100">
                  <i className="fab fa-whatsapp me-2"></i>WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Need Help With {service.title}?</h2>
          <p style={{color: 'var(--text-light-secondary)', marginBottom: '1.5rem'}}>
            Call A Way to Freedom Bail Bonds for 24/7 help in Delaware, including Wilmington, Newark, New Castle County and nearby areas.
          </p>
          <a href="tel:+17024478550" className="btn-primary-gold me-2 mb-2">
            <i className="fas fa-phone-alt me-2"></i>(702) 447-8550
          </a>
          <a href="/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline mb-2">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

// ============================================
// ABOUT PAGE
// ============================================
const AboutPage = ({ navigate }) => {
  useSEO(
    'About Us | A Way to Freedom Bail Bonds | Simone Harris',
    'Learn about A Way to Freedom Bail Bonds and Simone Harris - a compassionate bail bonds agent serving Delaware with care and professionalism.',
    'Simone Harris bail bonds, Delaware bail bond agent, Newark Delaware bail help, Wilmington bail bond support'
  );

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
      ]),
    ],
  });

  return (
    <div className="simone-page">
      {/* Hero Section - Same as Home Page */}
      <section id="about" className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 hero-content">
              <h1 className="hero-subtitle">ABOUT SIMONE HARRIS</h1>
              <h1 className="hero-title">
                Your Trusted Bail Bond Agent in <span className="gold-text">Wilmington & Newark, Delaware</span>
              </h1>
              <p className="hero-tagline">
                &quot;Not Just Another Bail Bonds Agent - A Mother Who Cares&quot;
              </p>
              <div className="hero-cta">
                <a href="tel:7024478550" className="btn btn-gold me-3 mb-3">
                  <i className="fas fa-phone-alt me-2"></i>Call Now (702) 447-8550
                </a>
                <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20help%20with%20bail%20bond%20services.%20Please%20let%20me%20know%20how%20you%20can%20assist%20me." target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold mb-3">
                  <i className="fab fa-whatsapp me-2"></i>WhatsApp Us
                </a>
              </div>
              <div className="mt-4">
                <span className="location-badge">
                  <i className="fas fa-map-marker-alt"></i>Serving Wilmington & Newark, Delaware
                </span>
                <span className="location-badge">
                  <i className="fas fa-clock"></i>24/7 Available
                </span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-image heroimage">
                <img
                  src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=500&h=600&fit=crop"
                  alt="Simone Harris Bail Bond Agent Wilmington Newark Delaware - Professional Service"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <SimoneAboutSection />

      {/* Our Story Section */}
      <section className="section-dark-alt">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div className="text-center mb-5">
                <div className="gold-divider"></div>
                <h2 className="section-title">Our Story</h2>
              </div>
              <div className="about-story-content">
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light-secondary)', marginBottom: '1.5rem' }}>
                  A Way to Freedom Bail Bonds was built on the belief that people deserve understanding, respect, and clear communication during some of the most difficult moments of their lives. We focus on providing professional guidance, fast response, and reliable support throughout the bail process.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light-secondary)', marginBottom: '1.5rem' }}>
                  Founded by Simone Harris, our agency stands apart because we understand the emotional toll that arrests can take on families. As a mother and community member, Simone brings a unique combination of professionalism, experience, and genuine compassion to every case she handles.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light-secondary)', marginBottom: '1.5rem' }}>
                  At A Way to Freedom Bail Bonds, we believe that everyone deserves fair treatment and a chance to navigate the legal system with dignity and respect. Our mission is to help families move through the bail process with clarity, confidence, and support.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light-secondary)', marginBottom: '1.5rem' }}>
                  When you work with A Way to Freedom Bail Bonds, you're not just another case - you're treated with the care, urgency, and professionalism you deserve.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light-secondary)', marginBottom: '2rem' }}>
                  We proudly serve clients throughout Wilmington, Newark, New Castle County, and Kent County, Delaware, and we are available 24 hours a day, 7 days a week to help families in their time of need.
                </p>

                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <a href="tel:+17024478550" className="btn-primary-gold">
                    <i className="fas fa-phone-alt me-2"></i>Call Us Now
                  </a>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate('/contact');
                    }}
                    className="btn-secondary-outline"
                  >
                    Get in Touch
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// HOW IT WORKS PAGE
// ============================================
const HowItWorksPage = ({ navigate }) => {
  useSEO(
    'How Bail Bonds Work in Delaware | Step-by-Step Guide',
    'Learn how the bail bond process works in Delaware. Complete guide covering arrest procedures, bond types, and what to expect.',
    'how bail bonds work, Delaware bail process, bail bond steps, bail hearing, defendant rights Delaware'
  );

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'How It Works', path: '/how-it-works' },
      ]),
    ],
  });

  return (
    <div className="page-container">
      <section className="services-hero">
        <div className="container">
          <div className="gold-divider"></div>
          <h1>How the Bail Bond Process Works</h1>
          <p style={{color: 'var(--text-light-secondary)', maxWidth: '700px', margin: '0 auto'}}>
            Understanding the bail process in Delaware can help reduce stress during difficult times
          </p>
        </div>
      </section>

      <section className="how-it-works-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h2>What Happens After an Arrest in Wilmington & Newark, Delaware</h2>
              <p>
                When someone is arrested in Delaware, they are taken to a local detention facility 
                where they will be booked. This process includes fingerprinting, photographing, and 
                recording personal information. After booking, a bail hearing will be scheduled where 
                a judge determines the bail amount based on various factors including the severity of 
                the alleged crime, criminal history, and flight risk.
              </p>
              <p>
                In Wilmington, Newark, Delaware and throughout New Castle County & Kent County, bail hearings 
                typically occur within 24-48 hours of arrest. The judge may set cash bail, property 
                bail, or a bail bond as an option for release.
              </p>

              <h2>How Bail Bonds Work</h2>
              <p>
                A bail bond is a financial guarantee to the court that the defendant will appear 
                for all scheduled court dates. When you can't afford the full bail amount, a bail 
                bond agent provides the bond on your behalf for the filed and approved premium or charge.
              </p>
              <p>
                Here's how it works: You pay the bail bondsman a non-refundable premium, and the 
                bondsman posts the full bail amount to the court. If the defendant appears at all 
                court dates, the bond is discharged at the end of the case, and no further payment 
                is required.
              </p>

              <h3>The Role of the Indemnitor</h3>
              <p>
                The indemnitor (the person who signs the bail bond paperwork) is responsible for 
                ensuring the defendant appears in court. If the defendant fails to appear, the 
                indemnitor may be held responsible for the full bail amount.
              </p>

              <h3>Defendant Responsibilities</h3>
              <ul>
                <li>Appear at all scheduled court dates</li>
                <li>Notify the bail bondsman of any address changes</li>
                <li>Report any changes in employment</li>
                <li>Stay in contact with the bail bondsman</li>
                <li>Follow any other conditions set by the court</li>
              </ul>

              <h2>What to Expect After Release</h2>
              <p>
                Once released through a bail bond, the defendant must follow all court-ordered 
                conditions. These may include checking in with a probation officer, maintaining 
                employment, avoiding certain people or places, and appearing at all court hearings.
              </p>
              <p>
                Failure to comply with these conditions can result in the bail being revoked and 
                the defendant being returned to custody. Our team at A Way to Freedom Bail Bonds 
                will explain all requirements and support you throughout the process.
              </p>

              <div className="blog-disclaimer">
                <strong>Disclaimer:</strong> This information is for educational purposes only and 
                does not constitute legal advice. For specific legal questions, please consult 
                with a licensed attorney in Delaware.
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar-widget">
                <h4>Need Help Now?</h4>
                <p style={{color: 'var(--text-light-secondary)', fontSize: '0.9rem'}}>
                  We're available 24/7 to answer your questions about the bail process
                </p>
                <a href="tel:+17024478550" className="btn-primary-gold w-100 mb-2">
                  <i className="fas fa-phone-alt me-2"></i>Call (702) 447-8550
                </a>
                <a href="/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline w-100">
                  Contact Us
                </a>
              </div>

              <div className="sidebar-widget mt-4">
                <h4>Related Services</h4>
                <ul className="category-list">
                  <li><a href="/services/felony" onClick={(e) => {e.preventDefault(); navigate('/services/felony');}}>Felony & Misdemeanor Bonds</a></li>
                  <li><a href="/services/misdemeanor" onClick={(e) => {e.preventDefault(); navigate('/services/misdemeanor');}}>Misdemeanor Bonds</a></li>
                  <li><a href="/services/fast-release" onClick={(e) => {e.preventDefault(); navigate('/services/fast-release');}}>Fast Release Processing</a></li>
                  <li><a href="/services/payment" onClick={(e) => {e.preventDefault(); navigate('/services/payment');}}>Payment Plans</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Questions About Bail? We're Here to Help</h2>
          <p style={{color: 'var(--text-light-secondary)', marginBottom: '1.5rem'}}>Call us anytime for confidential assistance</p>
          <a href="tel:+17024478550" className="btn-primary-gold">
            <i className="fas fa-phone-alt me-2"></i>(702) 447-8550
          </a>
        </div>
      </section>
    </div>
  );
};

// ============================================
// FAQ PAGE
// ============================================
const FAQPage = ({ navigate }) => {
  useSEO(
    'FAQ | Frequently Asked Questions About Bail Bonds in Delaware',
    'Common questions about bail bonds in Delaware. Learn about costs, payment plans, timing, confidentiality, and more.',
    'bail bond FAQ, Delaware bail questions, bail bond costs, payment plans bail'
  );

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does a bail bond cost in Delaware?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Delaware, surety bail bond premiums must match the rate filed with and approved by the Department. For surety bail bonds over $1,000, the total filed premium must be at least 5% and not more than 10%."
        }
      },
      {
        "@type": "Question",
        "name": "How long does it take to get someone out of jail?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The time varies depending on the jail facility and the complexity of the case. Once paperwork is completed, release can take anywhere from a few hours to 24-48 hours. We work to process bonds as quickly as possible."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer payment plans?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we offer flexible payment arrangements to help make bail bonds more affordable. We understand that unexpected situations can create financial challenges, and we work with clients to find a payment solution that fits their budget."
        }
      },
      {
        "@type": "Question",
        "name": "Is the bail bond process confidential?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. All information shared with our agency is kept completely confidential. We understand the sensitive nature of these situations and maintain strict privacy standards."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if the defendant misses a court date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "If a defendant fails to appear in court, the bail bond may be forfeited, and a warrant may be issued for the defendant's arrest. The indemnitor (the person who signed for the bond) may be responsible for the full bail amount. We work with clients to ensure they understand their responsibilities."
        }
      },
      {
        "@type": "Question",
        "name": "What information do I need to get started?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You'll need the defendant's full name, date of birth, the location of the arrest, the booking number (if available), and the bail amount. We'll guide you through the rest of the process."
        }
      },
      {
        "@type": "Question",
        "name": "What are the defendant's responsibilities after release?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The defendant must appear at all scheduled court dates, notify us of any address or employment changes, and comply with any other conditions set by the court. Failure to do so can result in the bail being revoked."
        }
      },
      {
        "@type": "Question",
        "name": "Which counties in Delaware do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We serve New Castle County and Kent County, including Newark, Wilmington, Dover, and surrounding areas. We do not serve Sussex County."
        }
      }
    ]
  };

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "FAQPage", "mainEntity": faqSchema.mainEntity },
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'FAQ', path: '/faq' },
      ]),
    ],
  });

  const faqs = [
    {
      question: "How much does a bail bond cost in Delaware?",
      answer: "In Delaware, surety bail bond premiums must match the rate filed with and approved by the Department. For surety bail bonds over $1,000, the total filed premium must be at least 5% and not more than 10%."
    },
    {
      question: "How long does it take to get someone out of jail?",
      answer: "The time varies depending on the jail facility and the complexity of the case. Once paperwork is completed, release can take anywhere from a few hours to 24-48 hours. We work to process bonds as quickly as possible."
    },
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment arrangements to help make bail bonds more affordable. We understand that unexpected situations can create financial challenges, and we work with clients to find a payment solution that fits their budget."
    },
    {
      question: "Is the bail bond process confidential?",
      answer: "Absolutely. All information shared with our agency is kept completely confidential. We understand the sensitive nature of these situations and maintain strict privacy standards."
    },
    {
      question: "What happens if the defendant misses a court date?",
      answer: "If a defendant fails to appear in court, the bail bond may be forfeited, and a warrant may be issued for the defendant's arrest. The indemnitor (the person who signed for the bond) may be responsible for the full bail amount. We work with clients to ensure they understand their responsibilities."
    },
    {
      question: "What information do I need to get started?",
      answer: "You'll need the defendant's full name, date of birth, the location of the arrest, the booking number (if available), and the bail amount. We'll guide you through the rest of the process."
    },
    {
      question: "What are the defendant's responsibilities after release?",
      answer: "The defendant must appear at all scheduled court dates, notify us of any address or employment changes, and comply with any other conditions set by the court. Failure to do so can result in the bail being revoked."
    },
    {
      question: "Which counties in Delaware do you serve?",
      answer: "We serve New Castle County and Kent County, including Newark, Wilmington, Dover, and surrounding areas. We do not serve Sussex County."
    }
  ];

  return (
    <div className="page-container">
      <section className="faq-hero">
        <div className="container">
          <div className="gold-divider"></div>
          <h1>Frequently Asked Questions</h1>
          <p style={{color: 'var(--text-light-secondary)', maxWidth: '600px', margin: '0 auto'}}>
            Get answers to common questions about bail bonds in Delaware
          </p>
        </div>
      </section>

      <section className="faq-content">
        <div className="container">
          <div className="accordion-custom">
            {faqs.map((faq, index) => (
              <div className="accordion-item" key={index}>
                <h2 className="accordion-header">
                  <button 
                    className="accordion-button" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#faq-${index}`}
                  >
                    {faq.question}
                  </button>
                </h2>
                <div id={`faq-${index}`} className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div className="accordion-body">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Still Have Questions?</h2>
          <p style={{color: 'var(--text-light-secondary)', marginBottom: '1.5rem'}}>We're here to help clarify any concerns</p>
          <a href="tel:+17024478550" className="btn-primary-gold">
            <i className="fas fa-phone-alt me-2"></i>Call (702) 447-8550
          </a>
        </div>
      </section>
    </div>
  );
};

// ============================================
// BLOG DATA
// ============================================
const blogPosts = [
  {
    slug: BAIL_BOND_COST_SLUG,
    title: BAIL_BOND_COST_TITLE,
    excerpt: BAIL_BOND_COST_META_DESCRIPTION,
    category: 'Payment Options',
    readTime: '12 min read',
    date: '2026-07-30',
    image: BAIL_BOND_COST_THUMBNAIL,
    heroImage: BAIL_BOND_COST_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: UNSECURED_BAIL_SLUG,
    title: UNSECURED_BAIL_TITLE,
    excerpt: UNSECURED_BAIL_META_DESCRIPTION,
    category: 'Bail Types',
    readTime: '15 min read',
    date: '2026-07-29',
    image: UNSECURED_BAIL_THUMBNAIL,
    heroImage: UNSECURED_BAIL_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: FIND_BAIL_AMOUNT_SLUG,
    title: FIND_BAIL_AMOUNT_TITLE,
    excerpt: FIND_BAIL_AMOUNT_META_DESCRIPTION,
    category: 'Bail Process',
    readTime: '13 min read',
    date: '2026-07-23',
    image: FIND_BAIL_AMOUNT_THUMBNAIL,
    heroImage: FIND_BAIL_AMOUNT_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: HOW_TO_BOND_SLUG,
    title: HOW_TO_BOND_TITLE,
    excerpt: HOW_TO_BOND_META_DESCRIPTION,
    category: 'Bail Process',
    readTime: '14 min read',
    date: '2026-07-20',
    image: HOW_TO_BOND_THUMBNAIL,
    heroImage: HOW_TO_BOND_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: COMMON_MISTAKES_SLUG,
    title: COMMON_MISTAKES_TITLE,
    excerpt: COMMON_MISTAKES_META_DESCRIPTION,
    category: 'Bail Bonds',
    readTime: '9 min read',
    date: '2026-07-14',
    image: COMMON_MISTAKES_THUMBNAIL,
    heroImage: COMMON_MISTAKES_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: FAST_RELIABLE_SLUG,
    title: FAST_RELIABLE_TITLE,
    excerpt: FAST_RELIABLE_META_DESCRIPTION,
    category: 'Bail Process',
    readTime: '10 min read',
    date: '2026-07-09',
    image: FAST_RELIABLE_THUMBNAIL,
    heroImage: FAST_RELIABLE_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: RELEASED_ON_BOND_MEANING_SLUG,
    title: RELEASED_ON_BOND_MEANING_TITLE,
    excerpt: RELEASED_ON_BOND_MEANING_META_DESCRIPTION,
    category: 'Bail Bonds',
    readTime: '18 min read',
    date: '2026-06-30',
    image: RELEASED_ON_BOND_MEANING_THUMBNAIL,
    heroImage: RELEASED_ON_BOND_MEANING_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: BAIL_BOND_PROCESS_SLUG,
    title: BAIL_BOND_PROCESS_TITLE,
    excerpt: BAIL_BOND_PROCESS_META_DESCRIPTION,
    category: 'Bail Process',
    readTime: '14 min read',
    date: '2026-06-03',
    image: BAIL_BOND_PROCESS_THUMBNAIL,
    heroImage: BAIL_BOND_PROCESS_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: WHAT_IS_CASH_BOND_SLUG,
    title: WHAT_IS_CASH_BOND_TITLE,
    excerpt: WHAT_IS_CASH_BOND_META_DESCRIPTION,
    category: 'Bail Types',
    readTime: '11 min read',
    date: '2026-06-02',
    image: WHAT_IS_CASH_BOND_THUMBNAIL,
    heroImage: WHAT_IS_CASH_BOND_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: CASH_BOND_MEANING_SLUG,
    title: CASH_BOND_MEANING_TITLE,
    excerpt: CASH_BOND_MEANING_META_DESCRIPTION,
    category: 'Cash Bond Meaning',
    readTime: '10 min read',
    date: '2026-06-01',
    image: CASH_BOND_MEANING_THUMBNAIL,
    heroImage: CASH_BOND_MEANING_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: RELEASED_ON_BAIL_SLUG,
    title: RELEASED_ON_BAIL_TITLE,
    excerpt: RELEASED_ON_BAIL_META_DESCRIPTION,
    category: 'Bail Process',
    readTime: '10 min read',
    date: '2026-05-31',
    image: RELEASED_ON_BAIL_THUMBNAIL,
    heroImage: RELEASED_ON_BAIL_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: BAIL_BOND_COMPANY_SLUG,
    title: BAIL_BOND_COMPANY_TITLE,
    excerpt: BAIL_BOND_COMPANY_META_DESCRIPTION,
    category: 'Bail Process',
    readTime: '14 min read',
    date: '2026-06-08',
    image: BAIL_BOND_COMPANY_THUMBNAIL,
    heroImage: BAIL_BOND_COMPANY_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: HARDCODED_BLOG_SLUG,
    title: HARDCODED_BLOG_TITLE,
    excerpt: HARDCODED_BLOG_META_DESCRIPTION,
    category: 'Bail Process',
    readTime: '12 min read',
    date: '2026-03-01',
    image: HARDCODED_BLOG_THUMBNAIL,
    heroImage: HARDCODED_BLOG_IMAGE,
    isMagazine: true,
    content: '',
  },
  {
    slug: 'felony-vs-misdemeanor-bonds-delaware',
    title: 'Felony vs Misdemeanor Bonds: What You Need to Know in Delaware',
    excerpt: 'Learn the key differences between felony and misdemeanor bail bonds in Delaware, including costs, requirements, and what to expect.',
    category: 'Bail Types',
    readTime: '6 min read',
    date: '2026-03-06',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    content: `
Felony vs Misdemeanor Bonds in Delaware

Understanding the difference between felony and misdemeanor bonds is crucial when navigating the bail process in Delaware. Each type has different requirements, costs, and implications.

What Are Misdemeanor Bonds?

Misdemeanor bonds are for less serious offenses in Delaware. These typically include:

- DUI/DWI charges
- Simple assault
- Theft under a certain dollar amount
- Disorderly conduct
- Traffic violations

Characteristics of Misdemeanor Bonds:
- Lower bail amounts (typically $500 - $10,000)
- Faster processing time
- Less stringent requirements
- Lower premium costs in many cases, depending on the approved premium and bond amount

What Are Felony Bonds?

Felony bonds are for more serious criminal charges. In Delaware, felonies are classified from Class A (most serious) to Class E (least serious).

Common Felony Charges:
- Aggravated assault
- Drug trafficking
- Burglary
- Robbery
- Homicide

Characteristics of Felony Bonds:
- Higher bail amounts (often $10,000 - $500,000+)
- More thorough background checks
- May require collateral
- Longer processing time
- Higher premium costs in many cases because the bail amount may be higher

Key Differences

1. Bail AmountMisdemeanor bonds generally have lower bail amounts, making them more affordable for families. Felony bonds can be significantly higher, sometimes requiring collateral.

2. Processing TimeMisdemeanor bonds can often be processed within hours. Felony bonds may take longer due to additional verification and documentation requirements.

3. Collateral RequirementsFelony bonds are more likely to require collateral, especially for higher bail amounts. This could include property, vehicles, or other assets.

4. Court Appearance RequirementsBoth require the defendant to appear at all court dates, but felony cases typically have more court appearances and stricter monitoring.

What to Expect

When working with A Way to Freedom Bail Bonds for either type of bond:

- Professional Assessment: We'll evaluate the case and explain all options
- Transparent Pricing: No hidden fees, clear premium structure
- Fast Processing: We work quickly to secure release
- 24/7 Availability: Available whenever you need us

Getting Help in Newark, Delaware

Whether facing misdemeanor or felony charges, Muhammad Zeeshan at A Way to Freedom Bail Bonds is here to help. We understand the stress families face and provide compassionate, professional service.

Contact us 24/7 at (702) 447-8550 for immediate assistance.

---

Disclaimer: This information is for educational purposes only and does not constitute legal advice.*
    `
  },
  {
    slug: 'what-to-expect-when-someone-is-arrested',
    title: 'What to Expect When Someone You Love Is Arrested in Delaware',
    excerpt: 'A compassionate guide for families dealing with an arrest, including what happens next and how to get help quickly.',
    category: 'Family Guide',
    readTime: '7 min read',
    date: '2026-03-07',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop',
    content: `
What to Expect When Someone You Love Is Arrested

When someone you care about is arrested, it can feel overwhelming and confusing. This guide will help you understand what happens and what steps to take.

Immediate Steps After an Arrest

1. Stay CalmWhile it's natural to feel panicked, staying calm will help you make better decisions. Take a deep breath and focus on getting help.

2. Gather InformationTry to find out:
- Where the person was taken (which jail or detention center)
- What charges they're facing
- When they might have a bail hearing
- Their booking number (if available)

3. Contact a Bail BondsmanThe sooner you contact a licensed bail bondsman, the faster you can secure release. At A Way to Freedom Bail Bonds, we're available 24/7.

The Arrest Process in Delaware

Booking
After arrest, the person will be:
- Fingerprinted
- Photographed
- Searched
- Asked basic questions (they have the right to remain silent)
- Placed in a holding cell

Bail Hearing
A judge will set bail based on:
- Severity of charges
- Criminal history
- Flight risk
- Community ties
- Employment status

Setting Bail
The judge may:
- Set a cash bail amount
- Release on personal recognizance (no bail)
- Deny bail (for serious offenses)

What You'll Need

When contacting a bail bondsman, have ready:
- Full name of the arrested person
- Date of birth
- Social Security number (if available)
- Location of arrest
- Charges filed
- Bail amount (if known)
- Your relationship to the person

The Emotional Impact

It's Normal to Feel:- Scared
- Angry
- Confused
- Overwhelmed
- Helpless

Remember:- This is temporary
- Help is available
- You're not alone
- Professional assistance can make a difference

How A Way to Freedom Can Help

Muhammad Zeeshan understands what families go through during this difficult time. He brings compassion and understanding to every case.

We Provide:- 24/7 availability
- Fast processing
- Clear communication
- Flexible payment options
- Confidential service

After Release

Once released on bail:
- The person must appear at all court dates
- They should follow any conditions set by the court
- They may need to check in with the bail bondsman
- Legal representation should be secured

Getting Help Now

If someone you love has been arrested in Newark, Delaware or surrounding areas, don't wait. Contact A Way to Freedom Bail Bonds immediately at (702) 447-8550.

We're here to help 24/7 with compassion and professionalism.

---

Disclaimer: This information is for educational purposes only and does not constitute legal advice.*
    `
  },
  {
    slug: 'understanding-bail-amounts-delaware',
    title: 'Understanding Bail Amounts: How Judges Set Bail in Delaware',
    excerpt: 'Learn how judges determine bail amounts in Delaware and what factors influence the decision.',
    category: 'Legal Information',
    readTime: '5 min read',
    date: '2026-03-08',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    content: `
Understanding Bail Amounts in Delaware

Bail amounts can vary widely, from a few hundred dollars to hundreds of thousands. Understanding how judges determine bail can help you prepare for the process.

Factors Judges Consider

1. Severity of ChargesMore serious charges typically result in higher bail amounts:
- Misdemeanors: $500 - $10,000
- Class E Felonies: $5,000 - $25,000
- Class D Felonies: $10,000 - $50,000
- Class C Felonies: $25,000 - $100,000
- Class B Felonies: $50,000 - $250,000
- Class A Felonies: $100,000 - $500,000+

2. Criminal History- First-time offenders: Lower bail
- Repeat offenders: Higher bail
- Prior failures to appear: Much higher bail or denial

3. Flight RiskJudges consider:
- Ties to the community
- Employment status
- Family responsibilities
- Financial resources
- History of travel

4. Public SafetyFor violent crimes, judges may set higher bail or deny bail entirely to protect the community.

5. Financial ResourcesThe judge may consider the defendant's ability to pay when setting bail.

Common Bail Amounts by Charge Type

Traffic Violations:
- DUI: $1,500 - $5,000
- Reckless driving: $500 - $2,000

Misdemeanors:
- Simple assault: $1,000 - $5,000
- Theft: $500 - $3,000
- Drug possession: $1,000 - $10,000

Felonies:
- Aggravated assault: $25,000 - $100,000
- Drug trafficking: $50,000 - $250,000
- Burglary: $10,000 - $50,000

Bail Reduction Options

Motion to Reduce Bail
A defense attorney can file a motion asking the judge to reduce bail based on:
- Financial hardship
- Strong community ties
- Low flight risk
- Employment status

Bail Review Hearing
In some cases, you can request a bail review hearing to present evidence for lower bail.

Why Use a Bail Bond?

When bail is set at $10,000 or higher, most families can't pay the full amount. A bail bond allows you to:

- Pay the approved premium instead of the full bail amount when a commercial bond is available
- Get immediate release
- Keep your assets
- Work with a professional

Getting Help

If bail has been set and you need assistance, contact A Way to Freedom Bail Bonds. We'll:

- Explain your options
- Process the bond quickly
- Work with flexible payment plans
- Provide 24/7 support

Call us at (702) 447-8550 for immediate help in Newark, Delaware and surrounding areas.

---

Disclaimer: This information is for educational purposes only and does not constitute legal advice.*
    `
  },
  {
    slug: 'choosing-right-bail-bondsman',
    title: 'How to Choose the Right Bail Bondsman in Delaware',
    excerpt: 'Important factors to consider when selecting a bail bondsman, including licensing, availability, and reputation.',
    category: 'Tips & Advice',
    readTime: '5 min read',
    date: '2026-03-10',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop',
    content: `
How to Choose the Right Bail Bondsman

Selecting the right bail bondsman is crucial during a stressful time. Here's what to look for when choosing a bail bond agency in Delaware.

Essential Qualifications

1. Licensed and Insured- Must be licensed by the state of Delaware
- Should carry proper insurance
- Ask to see credentials

2. Experience- Years in business
- Knowledge of Delaware courts
- Understanding of local procedures

3. Reputation- Check online reviews
- Ask for references
- Look for complaints with Better Business Bureau

Important Questions to Ask

Availability:
- Are you available 24/7?
- How quickly can you process a bond?
- What's your response time?

Fees:
- What's your premium rate?
- Are there any hidden fees?
- What payment options do you offer?

Process:
- How long does the process take?
- What paperwork is required?
- Do you offer electronic paperwork?

Support:
- Will you explain everything clearly?
- Can I reach you after hours?
- What happens if there's an issue?

Red Flags to Avoid

Warning Signs:- Unlicensed operators
- Pressure tactics
- Unusually low rates (too good to be true)
- Requests for payment in cash only
- Lack of transparency
- Poor communication
- No physical office or address

Why Choose A Way to Freedom Bail Bonds

Licensed & Experienced:- Fully licensed in Delaware
- Years of experience serving Newark and surrounding areas
- Knowledge of all Delaware courts

24/7 Availability:- Always available when you need us
- Fast response times
- Quick processing

Transparent & Honest:- Clear pricing with no hidden fees
- Upfront about all costs
- Honest communication

Compassionate Service:- Understanding of your situation
- Treats clients with respect
- Professional yet caring approach

Flexible Options:- Payment plans available
- Electronic paperwork
- Multiple payment methods

What to Expect

Initial Contact:- Friendly, professional service
- Clear explanation of process
- Answers to all your questions

During Process:- Regular communication
- Updates on progress
- Support throughout

After Release:- Clear instructions
- Available for questions
- Ongoing support

Making Your Decision

When choosing a bail bondsman, consider:

1. Trust: Do you feel comfortable with them?
2. Communication: Do they explain things clearly?
3. Availability: Can you reach them when needed?
4. Experience: Do they know Delaware courts?
5. Reputation: What do others say about them?

Contact A Way to Freedom

If you're looking for a trusted, licensed bail bondsman in Newark, Delaware, contact Muhammad Zeeshan at A Way to Freedom Bail Bonds.

We Offer:- Licensed, professional service
- 24/7 availability
- Fast processing
- Compassionate care
- Flexible payment options

Call us now at (702) 447-8550 for immediate assistance.

---

Disclaimer: This information is for educational purposes only and does not constitute legal advice.*
    `
  },
  {
    slug: 'defendant-rights-bail-process',
    title: 'Know Your Rights: Defendant Rights During the Bail Process',
    excerpt: 'Understanding your rights and the rights of your loved one during the bail and arrest process in Delaware.',
    category: 'Legal Information',
    readTime: '6 min read',
    date: '2026-03-11',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop',
    content: `
Know Your Rights: Defendant Rights During the Bail Process

Understanding your rights during the bail process is essential. This guide covers the fundamental rights of defendants and their families in Delaware.

Rights During Arrest

Right to Remain Silent- You don't have to answer questions
- Anything you say can be used against you
- You can request a lawyer before speaking

Right to an Attorney- You have the right to legal representation
- If you can't afford one, the court will appoint one
- You can request a lawyer at any time

Right to Make a Phone Call- You're allowed to make phone calls
- Use this to contact family or a bail bondsman
- You can call A Way to Freedom Bail Bonds at (702) 447-8550

Right to Know Charges- You must be informed of the charges against you
- You have the right to see the arrest warrant (if applicable)

Rights During Bail Hearing

Right to Bail- Most defendants have the right to bail
- Exceptions include serious violent crimes
- Bail cannot be excessive

Right to Bail Review- You can request a bail reduction
- Present evidence for lower bail
- Have an attorney represent you

Right to Reasonable Bail- Bail must be reasonable for the charges
- Based on ability to pay (in some cases)
- Not used as punishment

Rights After Release on Bail

Right to Presumption of Innocence- You're innocent until proven guilty
- Bail doesn't imply guilt
- You can continue your life while awaiting trial

Right to Prepare Defense- Work with your attorney
- Gather evidence
- Prepare your case

Right to Fair Treatment- No harassment from bail bondsman
- Professional treatment
- Respect for your rights

Responsibilities After Release

Must Appear in Court:- Attend all scheduled court dates
- Be on time
- Follow court orders

Follow Bail Conditions:- Any restrictions set by the court
- Check-in requirements
- Travel restrictions

Stay in Contact:- Keep bail bondsman informed
- Update contact information
- Respond to communications

Family Member Rights

Right to Information:- Know where your loved one is
- Understand the charges
- Know the bail amount

Right to Help:- Contact a bail bondsman
- Seek legal advice
- Get support

Right to Privacy:- Confidential handling of information
- Professional discretion
- Respect for your situation

What to Do If Rights Are Violated

Document Everything:- Write down what happened
- Keep records
- Note dates and times

Contact an Attorney:- Legal representation can help
- They understand your rights
- Can take appropriate action

File a Complaint:- With the court
- With licensing board
- With law enforcement (if applicable)

How A Way to Freedom Protects Your Rights

Professional Service:- Respects all rights
- Follows legal procedures
- Maintains confidentiality

Clear Communication:- Explains all processes
- Answers questions
- Keeps you informed

Ethical Practices:- No harassment
- Fair treatment
- Honest dealings

Getting Help

If you believe your rights have been violated or need help understanding your rights, contact:

- Bail Bondsman: A Way to Freedom Bail Bonds at (702) 447-8550
- Legal Aid: Delaware Legal Aid Society
- Public Defender: Assigned by the court if eligible

Remember

- Know your rights
- Exercise them appropriately
- Seek help when needed
- Don't be afraid to ask questions

At A Way to Freedom Bail Bonds, we respect your rights and work to ensure you're treated fairly throughout the bail process.

---

Disclaimer: This information is for educational purposes only and does not constitute legal advice. Consult with a licensed attorney for specific legal questions.*
    `
  }
];

const legacyBlogRedirects = {
  'payment-options-bail-bonds': BAIL_BOND_COST_SLUG,
};

// ============================================
// BLOG INDEX PAGE
// ============================================
const BlogPage = ({ navigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useSEO(
    'Blog | Bail Bond Resources in Delaware',
    'Helpful articles and guides about bail bonds, the legal process, and what to expect in Delaware courts.',
    'bail bond blog, Delaware legal resources, bail process guide, Newark Delaware legal help'
  );

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ]),
    ],
  });

  // Get all unique categories with counts
  const categories = blogPosts.reduce((acc, post) => {
    const cat = post.category;
    if (!acc[cat]) {
      acc[cat] = 0;
    }
    acc[cat]++;
    return acc;
  }, {});

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  // Reveal animation on scroll
  useEffect(() => {
    // Make all reveal elements visible immediately on blog page
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element) => {
      element.classList.add('visible');
    });

    // Also set up IntersectionObserver for any elements that come into view
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, [filteredPosts]);

  return (
    <div className="page-container">
      <section className="blog-hero">
        <div className="container">
          <div className="gold-divider"></div>
          <h1>Bail Bond Resources & Blog</h1>
          <p style={{color: 'var(--text-light-secondary)', maxWidth: '600px', margin: '0 auto'}}>
            Helpful information and guides for families navigating the bail process in Delaware
          </p>
        </div>
      </section>

      <section className="section-dark-alt">
        <div className="container">
          <div className="blog-layout">
            <div className="blog-main">
              <div className="blog-grid">
                {currentPosts.map((post) => (
                  <article key={post.slug} className="blog-card reveal">
                    <img 
                      src={post.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop'} 
                      alt={`${post.title} - Delaware bail guide`}
                      className="blog-card-image"
                    />
                    <div className="blog-card-content">
                      <span className="blog-card-category">{post.category}</span>
                      <h4>
                        <a 
                          href={`#/blog/${post.slug}`}
                          onClick={(e) => {e.preventDefault(); navigate(`/blog/${post.slug}`);}}
                        >
                          {post.title}
                        </a>
                      </h4>
                      <p className="blog-card-excerpt">{post.excerpt}</p>
                      <div className="blog-card-meta">
                        <span><i className="far fa-clock me-1"></i>{post.readTime}</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination-wrapper">
                  <div className="pagination">
                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <i className="fas fa-chevron-left"></i> Previous
                    </button>
                    
                    <div className="pagination-numbers">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      className="pagination-btn"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Next <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <p className="pagination-info">
                    Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, filteredPosts.length)} of {filteredPosts.length} posts
                  </p>
                </div>
              )}
            </div>

            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h4>Search</h4>
                <input 
                  type="text" 
                  className="search-input" 
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="sidebar-widget">
                <h4>Categories</h4>
                <ul className="category-list">
                  <li>
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory('');
                        setCurrentPage(1);
                      }}
                      className={selectedCategory === '' ? 'active' : ''}
                    >
                      All Categories <span>({blogPosts.length})</span>
                    </a>
                  </li>
                  {Object.entries(categories).map(([category, count]) => (
                    <li key={category}>
                      <a 
                        href="#" 
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedCategory(category);
                          setCurrentPage(1);
                        }}
                        className={selectedCategory === category ? 'active' : ''}
                      >
                        {category} <span>({count})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="sidebar-widget">
                <h4>Recent Posts</h4>
                <div className="recent-posts-list">
                  {blogPosts.slice(0, 5).map((post) => (
                    <div key={post.slug} className="recent-post-item">
                      <a 
                        href={`#/blog/${post.slug}`}
                        onClick={(e) => {e.preventDefault(); navigate(`/blog/${post.slug}`);}}
                        className="recent-post-link"
                      >
                        <div className="recent-post-image">
                          <img 
                            src={post.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=150&h=100&fit=crop'} 
                            alt={post.title}
                            loading="lazy"
                          />
                        </div>
                        <div className="recent-post-content">
                          <h5 className="recent-post-title">{post.title}</h5>
                          <p className="recent-post-excerpt">{post.excerpt.substring(0, 80)}...</p>
                          <span className="recent-post-date">
                            <i className="far fa-calendar me-1"></i>{post.date}
                          </span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sidebar-widget cta-widget">
                <h4>Need Bail Help Now?</h4>
                <p>We're available 24/7 to assist you with bail bond services in Delaware.</p>
                <a href="tel:+17024478550" className="btn-primary-gold w-100 mb-2">
                  <i className="fas fa-phone-alt me-2"></i>Call Now
                </a>
                <a href="/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline w-100">
                  Start Bail Process
                </a>
                <p className="mt-3 mb-0" style={{fontSize: '0.8rem'}}>
                  <i className="fas fa-map-marker-alt me-1"></i>
                  Newark, Delaware • New Castle County • Kent County
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// BLOG POST PAGE
// ============================================
const BlogPostPage = ({ slug, navigate }) => {
  const redirectedSlug = legacyBlogRedirects[slug];
  const canonicalSlug = redirectedSlug || slug;
  const post = blogPosts.find(p => p.slug === canonicalSlug);
  const magazine = getMagazinePost(canonicalSlug) || (post?.content ? buildLegacyMagazinePost(post) : null);

  useEffect(() => {
    if (redirectedSlug) {
      navigate(`/blog/${redirectedSlug}`);
    }
  }, [redirectedSlug, navigate]);

  useSEO(
    magazine ? magazine.metaTitle : post ? `${post.title} | A Way to Freedom Bail Bonds` : 'Blog Post Not Found',
    magazine ? magazine.metaDescription : post ? post.excerpt : 'The requested blog post could not be found.',
    magazine ? magazine.keywords : 'bail bonds, Delaware bail, Newark Delaware',
    magazine ? magazine.metaTitle : '',
    magazine ? magazine.metaDescription : '',
    magazine ? toAbsoluteUrl(magazine.ogImage || magazine.heroImage) : ''
  );

  if (magazine) {
    if (magazine.customSchema) {
      injectSchema(magazine.customSchema);
    } else {
      const schemaGraph = [
        {
          "@type": "BlogPosting",
          "headline": magazine.title,
          "description": magazine.metaDescription,
          "image": toAbsoluteUrl(magazine.ogImage || magazine.heroImage),
          "author": {
            "@type": "Person",
            "name": "Simone Harris",
            "url": `${SITE_URL}/about`
          },
          "publisher": {
            "@type": "Organization",
            "@id": `${SITE_URL}/#organization`,
            "name": "A Way to Freedom Bail Bonds",
            "logo": {
              "@type": "ImageObject",
              "url": `${SITE_URL}/brand/a-way-to-freedom-logo.png`
            }
          },
          "datePublished": magazine.publishedAt,
          "dateModified": magazine.updatedAt,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${SITE_URL}/blog/${magazine.slug}`,
          },
        },
        buildBreadcrumb([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: magazine.title, path: `/blog/${magazine.slug}` },
        ]),
      ];
      if (magazine.faqs.length > 0) {
        schemaGraph.push({
          "@type": "FAQPage",
          "mainEntity": magazine.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer },
          })),
        });
      }
      injectSchema({ "@context": "https://schema.org", "@graph": schemaGraph });
    }

    return (
      <BlogMagazinePillar
        navigate={navigate}
        magazine={magazine}
        relatedPosts={blogPosts.filter((p) => p.slug !== canonicalSlug).slice(0, 3)}
        onContactClick={(e) => {
          e.preventDefault();
          navigate('/contact');
        }}
      />
    );
  }

  if (!post) {
    return (
      <div className="page-container">
        <div className="container py-5 text-center">
          <h1>Post Not Found</h1>
          <p style={{color: 'var(--text-light-secondary)'}}>The blog post you're looking for doesn't exist.</p>
          <a href="/blog" onClick={(e) => {e.preventDefault(); navigate('/blog');}} className="btn-primary-gold">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return null;
};

// ============================================
// CONTACT PAGE
// ============================================
const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  useSEO(
    'Contact Us | A Way to Freedom Bail Bonds Delaware',
    'Contact A Way to Freedom Bail Bonds for 24/7 bail bond services in New Castle County & Kent County, Delaware.',
    'contact bail bond agent Delaware, New Castle County bail help, Kent County bail help, Newark Delaware bail help'
  );

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact' },
      ]),
    ],
  });

  // Reveal animation on scroll
  useEffect(() => {
    // Make all reveal elements visible immediately on contact page
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((element) => {
      element.classList.add('visible');
    });

    // Also set up IntersectionObserver for any elements that come into view
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    const form = e.target;
    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      subject: form.subject.value || 'Contact Form Submission',
      inmateName: form.inmateName.value,
      dateOfBirth: form.dateOfBirth.value,
      message: form.message.value
    };

    // Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKQHCrTC01hRCpFSLnUnmZyBx6ypmOvHLDUGdJ3Uu97gJW3OH1aBBMPoqln1KCWa7H/exec';

    try {
      // Save to Supabase (admin dashboard) + email via Google Apps Script - run together
      await Promise.all([
        submitContact(formData),
        fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        }),
      ]);

      // no-cors mode mein response nahi milta, isliye always success assume karte hain
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! Your message has been submitted successfully. We will get back to you soon. For immediate assistance, call (702) 447-8550.'
      });

      form.reset();
      
      // Success message 5 seconds baad hide ho jayega
      setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error submitting your message. Please try again or call us directly at (702) 447-8550.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="simone-page">
      {/* Hero Section - Same as Home Page */}
      <section id="contact" className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 hero-content">
              <h1 className="hero-subtitle">CONTACT US</h1>
              <h1 className="hero-title">
                Get in Touch with <span className="gold-text">Simone Harris</span>
              </h1>
              <p className="hero-tagline">
                Available 24/7 for Your Bail Bond Needs in Newark, Delaware
              </p>
              <div className="hero-cta">
                <a href="tel:7024478550" className="btn btn-gold me-3 mb-3">
                  <i className="fas fa-phone-alt me-2"></i>Call Now (702) 447-8550
                </a>
                <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20help%20with%20bail%20bond%20services.%20Please%20let%20me%20know%20how%20you%20can%20assist%20me." target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold mb-3">
                  <i className="fab fa-whatsapp me-2"></i>WhatsApp Us
                </a>
              </div>
              <div className="mt-4">
                <span className="location-badge">
                  <i className="fas fa-map-marker-alt"></i>Serving Newark, Delaware
                </span>
                <span className="location-badge">
                  <i className="fas fa-clock"></i>24/7 Available
                </span>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-image heroimage">
                <img
                  src="/images/simoneimg.webp"
                  alt="Contact Simone Harris Bail Bond Agent"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get in Touch Section - Same as Home Page */}
      <section className="section-dark section-padding">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">
              Get In <span className="gold-text">Touch</span>
            </h2>
            <p className="section-subtitle">Contact Simone Harris for Bail Bonds in Newark &amp; Wilmington, Delaware</p>
          </div>
          <div className="row">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="contact-info-card reveal">
                <i className="fas fa-phone-alt"></i>
                <h5>Phone</h5>
                <p>
                  <a href="tel:7024478550">(702) 447-8550</a>
                </p>
                <p className="small text-muted">Available 24/7</p>
              </div>
              <div className="contact-info-card reveal">
                <i className="fas fa-phone"></i>
                <h5>Local Phone</h5>
                <p>
                  <a href="tel:3026001886">(302) 600-1886</a>
                </p>
                <p className="small text-muted">Wilmington, Delaware</p>
              </div>
              <div className="contact-info-card reveal">
                <i className="fab fa-whatsapp"></i>
                <h5>WhatsApp</h5>
                <p>
                  <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20help%20with%20bail%20bond%20services.%20Please%20let%20me%20know%20how%20you%20can%20assist%20me." target="_blank" rel="noopener noreferrer">+1 (302) 981-9223</a>
                </p>
                <p className="small text-muted">Quick Response</p>
              </div>
              <div className="contact-info-card reveal">
                <i className="fas fa-envelope"></i>
                <h5>Email</h5>
                <p>
                  <a href="mailto:away2freedom302@gmail.com" target="_blank" rel="noopener noreferrer">away2freedom302@gmail.com</a>
                </p>
                <p className="small text-muted">Response within 24 hours</p>
              </div>
              <div className="contact-info-card reveal">
                <i className="fas fa-map-marker-alt"></i>
                <h5>Address</h5>
                <p>288 E Main St, Newark, Delaware 19711</p>
                <p className="small text-muted">Serving Newark &amp; Surrounding Areas</p>
              </div>
              <div className="contact-info-card reveal">
                <i className="fas fa-map-marker-alt"></i>
                <h5>Wilmington Address</h5>
                <p>715 N. King Street, Wilmington, Delaware 19801</p>
                <p className="small text-muted">Serving Wilmington &amp; Surrounding Areas</p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="contact-form reveal">
                <h3 className="mb-4 gold-text">Send Us a Message</h3>
                
                {submitStatus.message && (
                  <div className={`alert ${submitStatus.type === 'success' ? 'alert-success-custom' : 'alert-error-custom'} mb-4`}>
                    <i className={`fas ${submitStatus.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} me-2`}></i>
                    {submitStatus.message}
                  </div>
                )}

                <form id="contactForm" onSubmit={handleContactSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        required
                        placeholder="Your full name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        required
                        placeholder="(702) 447-8550"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="your@email.com"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        name="subject"
                        placeholder="How can we help?"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="inmateName">Inmate's Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="inmateName"
                        name="inmateName"
                        required
                        placeholder="Inmate's full name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="dateOfBirth">Date of Birth *</label>
                      <input
                        type="date"
                        className="form-control"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <label htmlFor="message">Message *</label>
                  <textarea
                    className="form-control"
                    id="message"
                    name="message"
                    rows="5"
                    required
                    placeholder="Tell us about your situation..."
                    disabled={isSubmitting}
                  ></textarea>
                  <button type="submit" className="btn btn-gold w-100" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container">
          <div className="contact-map">
            <h3 className="text-center mb-4">Our Location</h3>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d49025.54501957603!2d-75.79746253363873!3d39.6792402421731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c703f5a239e8b3%3A0x935e8c5f9298124c!2sNewark%2C%20DE!5e0!3m2!1sen!2sus!4v1645564758792!5m2!1sen!2sus" 
              width="100%" 
              height="400" 
              style={{border: 0, borderRadius: '12px'}} 
              allowFullScreen="" 
              loading="lazy"
              title="Newark Delaware Map"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};



// ============================================
// NEW CASTLE COUNTY BAIL BONDS PAGE
// ============================================
const NewCastleCountyBailBondsPage = ({ navigate }) => {
  useSEO(
    'New Castle County Bail Bonds | Wilmington & Newark 24/7 Help',
    'Need bail bonds in New Castle County, Delaware? Get 24/7 help for Wilmington, Newark, New Castle, Bear and Middletown with clear next steps.',
    'New Castle County bail bonds, bail bonds in New Castle County Delaware, Wilmington DE bail bonds, Newark DE bail bonds, New Castle DE bail bonds, Bear DE bail bonds, Middletown DE bail bonds, bail bonds near Wilmington DE',
    'New Castle County Bail Bonds | Wilmington & Newark Help',
    '24/7 bail bond help for New Castle County families in Wilmington, Newark, New Castle, Bear and Middletown.',
    '/images/new-castle-county-bail-bonds/new-castle-county-bail-bonds-og.webp'
  );

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/new-castle-county-bail-bonds/#webpage`,
        "url": `${SITE_URL}/new-castle-county-bail-bonds`,
        "name": "New Castle County Bail Bonds | Wilmington & Newark 24/7 Help",
        "description": "Need bail bonds in New Castle County, Delaware? Get 24/7 help for Wilmington, Newark, New Castle, Bear and Middletown with clear next steps.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/images/new-castle-county-bail-bonds/new-castle-county-bail-bonds-og.webp`
        },
        "about": [
          { "@type": "Thing", "name": "New Castle County bail bonds" },
          { "@type": "Thing", "name": "bail bonds in New Castle County Delaware" },
          { "@type": "Thing", "name": "Wilmington DE bail bonds" },
          { "@type": "Thing", "name": "Newark DE bail bonds" }
        ],
        "mentions": [
          { "@type": "Place", "name": "Wilmington, Delaware" },
          { "@type": "Place", "name": "Newark, Delaware" },
          { "@type": "Place", "name": "New Castle County, Delaware" }
        ]
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/new-castle-county-bail-bonds/#service`,
        "name": "New Castle County Bail Bonds",
        "serviceType": "Bail bond services",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${SITE_URL}/new-castle-county-bail-bonds/#webpage`
        },
        "provider": {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#localbusiness`,
          "name": "A Way to Freedom Bail Bonds",
          "telephone": ["+1-702-447-8550", "+1-302-600-1886"]
        },
        "areaServed": [
          { "@type": "AdministrativeArea", "name": "New Castle County, Delaware" },
          { "@type": "City", "name": "Wilmington, Delaware" },
          { "@type": "City", "name": "Newark, Delaware" },
          { "@type": "City", "name": "New Castle, Delaware" },
          { "@type": "City", "name": "Middletown, Delaware" },
          { "@type": "City", "name": "Bear, Delaware" },
          { "@type": "City", "name": "Claymont, Delaware" },
          { "@type": "City", "name": "Hockessin, Delaware" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/new-castle-county-bail-bonds/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you provide bail bonds in New Castle County, Delaware?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. A Way to Freedom Bail Bonds provides 24/7 bail bond help in New Castle County, Delaware, including Wilmington, Newark, New Castle, Bear, Middletown and nearby communities." }
          },
          {
            "@type": "Question",
            "name": "Is Wilmington part of New Castle County?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. Wilmington, Delaware is in New Castle County. Newark, New Castle, Middletown, Bear, Claymont and Hockessin are also New Castle County communities." }
          },
          {
            "@type": "Question",
            "name": "What bail types can be set in Delaware?",
            "acceptedAnswer": { "@type": "Answer", "text": "Delaware courts may use own recognizance, unsecured bail, secured bail, or cash-only bail. A bail bond company may help with some secured bail situations, while other release types work differently." }
          },
          {
            "@type": "Question",
            "name": "Can I start by phone if I do not know the bail amount yet?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. You can call even if you do not know the bail amount yet. Helpful details include the defendant's name, date of birth, location, and any court or case information you have." }
          },
          {
            "@type": "Question",
            "name": "Do you serve outside Delaware?",
            "acceptedAnswer": { "@type": "Answer", "text": "This page is for New Castle County, Delaware bail bond help. A Way to Freedom Bail Bonds positions its bail bond service for Delaware communities, especially New Castle County and Kent County." }
          }
        ]
      },
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/service-areas' },
        { name: 'New Castle County Bail Bonds', path: '/new-castle-county-bail-bonds' },
      ]),
    ],
  });

  const handleNav = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  const communities = [
    { name: 'Wilmington', path: '/wilmington-de-bail-bonds', note: 'King Street court area and downtown Wilmington bail bond help.' },
    { name: 'Newark', path: '/newark-de-bail-bonds', note: 'Main Street Newark and nearby New Castle County support.' },
    { name: 'New Castle', note: 'Local guidance for New Castle, Delaware families after an arrest.' },
    { name: 'Bear', note: 'Bail bond help for Bear and nearby Route 40 communities.' },
    { name: 'Middletown', note: 'Support for Middletown and southern New Castle County.' },
    { name: 'Claymont', note: 'Local help for Claymont and northern New Castle County.' },
    { name: 'Glasgow', note: 'Bail bond guidance for Glasgow and surrounding neighborhoods.' },
    { name: 'Hockessin', note: 'Confidential bail bond help for Hockessin and Pike Creek.' },
  ];

  const faqs = [
    {
      question: 'Do you provide bail bonds in New Castle County, Delaware?',
      answer: 'Yes. A Way to Freedom Bail Bonds provides 24/7 bail bond help in New Castle County, Delaware, including Wilmington, Newark, New Castle, Bear, Middletown and nearby communities.',
    },
    {
      question: 'Is Wilmington part of New Castle County?',
      answer: 'Yes. Wilmington, Delaware is in New Castle County. Newark, New Castle, Middletown, Bear, Claymont and Hockessin are also New Castle County communities.',
    },
    {
      question: 'What bail types can be set in Delaware-',
      answer: 'Delaware courts may use own recognizance, unsecured bail, secured bail, or cash-only bail. A bail bond company may help with some secured bail situations, while other release types work differently.',
    },
    {
      question: 'Can I start by phone if I do not know the bail amount yet-',
      answer: 'Yes. You can call even if you do not know the bail amount yet. Helpful details include the defendant\'s name, date of birth, location, and any court or case information you have.',
    },
    {
      question: 'Do you serve outside Delaware-',
      answer: 'This page is for New Castle County, Delaware bail bond help. A Way to Freedom Bail Bonds positions its bail bond service for Delaware communities, especially New Castle County and Kent County.',
    },
  ];

  return (
    <div className="page-container simone-page">
      <section className="service-detail-hero">
        <div className="container">
          <a href="/service-areas" onClick={(e) => handleNav(e, '/service-areas')} className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Service Areas
          </a>
          <div className="row align-items-center g-5 mt-2">
            <div className="col-lg-6">
              <div className="gold-divider" style={{ margin: '1rem 0' }}></div>
              <p className="hero-subtitle">New Castle County, Delaware Bail Bond Help</p>
              <h1>Bail Bonds in New Castle County, Delaware</h1>
              <p className="lead" style={{ color: 'var(--text-light-secondary)' }}>
                When someone you care about is arrested in New Castle County, Delaware, the next few hours can feel overwhelming. A Way to Freedom Bail Bonds helps families slow the process down, ask the right questions, and move forward with clear local guidance.
              </p>
              <p style={{ color: 'var(--text-light-secondary)' }}>
                This page is for New Castle County, Delaware bail bond help only, including Wilmington, Newark, New Castle, Bear, Middletown, Claymont, Glasgow, Hockessin and nearby communities. For broad statewide searches, our homepage is the main Delaware bail bonds page.
              </p>
              <div className="hero-cta-wrap mt-4">
                <a href="tel:+17024478550" className="btn btn-primary-gold">
                  <i className="fas fa-phone-alt me-2"></i>Call 24/7: (702) 447-8550
                </a>
                <a href="tel:+13026001886" className="btn btn-outline-gold">
                  <i className="fas fa-phone me-2"></i>Wilmington: (302) 600-1886
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="/images/new-castle-county-bail-bonds/new-castle-county-bail-bonds-hero.webp"
                alt="New Castle County bail bonds 24/7 Delaware support by A Way to Freedom Bail Bonds"
                className="img-fluid rounded-4 shadow-lg"
                width="1672"
                height="941"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="local-seo-content">
                <h2 className="section-title text-center">What should you do first after an arrest in New Castle County?</h2>
                <div className="section-gold-line"></div>
                <p>If someone is arrested in New Castle County, first gather their full legal name, date of birth, arrest location, and any court or jail information you have. Then confirm whether bail has been set and what type of bail was ordered. If you do not know the amount yet, call for guidance before signing anything.</p>
                <blockquote>Example: “My brother was arrested in Wilmington and I only know his full name and date of birth.” That is enough to begin asking what court or jail details are needed next. You do not need every answer before making the first call.</blockquote>
                <div className="row g-4 align-items-center mt-3">
                  <div className="col-lg-6">
                    <h3>Information to have before you call</h3>
                    <ul>
                      <li>The defendant-s full legal name</li>
                      <li>Date of birth</li>
                      <li>Arrest location, court, or jail information if known</li>
                      <li>Bond amount if it has already been set</li>
                      <li>Bond type if the court has explained it</li>
                      <li>Case number or charge information if available</li>
                      <li>Your relationship to the defendant</li>
                      <li>Whether someone may be willing to co-sign</li>
                    </ul>
                    <p>If you are still trying to find the amount, read our guide on <a href="/blog/how-do-you-find-out-how-much-someones-bail-is" onClick={(e) => handleNav(e, '/blog/how-do-you-find-out-how-much-someones-bail-is')}>how to find out how much someone-s bail is</a>.</p>
                  </div>
                  <div className="col-lg-6">
                    <img
                      src="/images/new-castle-county-bail-bonds/new-castle-county-bail-bonds-consultation.webp"
                      alt="Family member preparing information before calling a New Castle County bail bond agent"
                      className="img-fluid rounded-4 shadow-lg"
                      width="1536"
                      height="1024"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">COUNTY SERVICE AREA</div>
            <h2 className="section-title">What areas of <span className="gold-text">New Castle County</span> does A Way to Freedom serve?</h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">Wilmington and Newark are both part of New Castle County, and city-specific help is available through dedicated pages.</p>
          </div>
          <blockquote className="mb-4">This page is for New Castle County, Delaware bail bond help only. Wilmington and Newark are both part of New Castle County, Delaware.</blockquote>
          <div className="row g-4">
            {communities.map((community) => (
              <div className="col-md-6 col-lg-3" key={community.name}>
                <div className="service-card h-100">
                  <div className="service-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <h3>
                    {community.path ? (
                      <a href={community.path} onClick={(e) => handleNav(e, community.path)}>{community.name}, DE</a>
                    ) : (
                      `${community.name}, DE`
                    )}
                  </h3>
                  <p>{community.note}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="section-subtitle mt-4">These communities are grouped here so families can quickly confirm local Delaware service without searching across several pages.</p>
        </div>
      </section>

      <section className="section-dark section-padding">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <h2 className="section-title">What bail types are used in Delaware-</h2>
              <p>Delaware courts may use several bail types, including own recognizance, unsecured bail, secured bail, and cash-only bail. A bail bond company may help with some secured bail situations, while unsecured, own-recognizance, or cash-only orders work differently. The next step depends on the exact court order. If the paperwork says unsecured, read <a href="/blog/what-is-unsecured-bail-delaware" onClick={(e) => handleNav(e, '/blog/what-is-unsecured-bail-delaware')}>what unsecured bail means in Delaware</a>.</p>
              <p>The Delaware Courts explain that bail is a written guarantee that a defendant will attend future court proceedings. They list several types of bail and explain that secured bail may involve cash or property posted by the defendant or someone else, including a relative or bail bondsman. <a href="https://courts.delaware.gov/help/bail/" target="_blank" rel="noopener noreferrer">Delaware Courts Bail & Bail Bonds</a></p>
              <blockquote>This page provides general process information, not legal advice. For legal advice about a case, speak with an attorney.</blockquote>
            </div>
            <div className="col-lg-5">
              <div className="contact-info-card">
                <i className="fas fa-balance-scale"></i>
                <h3>Delaware bail type clarity</h3>
                <p>Not every release type works the same way. Confirm the exact court order before assuming a commercial bail bond can be used.</p>
              </div>
            </div>
          </div>
          <div className="table-responsive mt-4">
            <table className="blog-data-table">
              <thead>
                <tr>
                  <th>Delaware bail type</th>
                  <th>What it usually means</th>
                  <th>What families should know</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Own Recognizance</td>
                  <td>The defendant signs a promise to appear.</td>
                  <td>Money is usually not paid upfront, but court conditions still matter.</td>
                </tr>
                <tr>
                  <td>Unsecured Bail</td>
                  <td>The defendant signs a bond and may owe money if they fail to appear.</td>
                  <td>It may not require cash upfront, but it is still a serious court obligation.</td>
                </tr>
                <tr>
                  <td>Secured Bail</td>
                  <td>Money, property, or another form of security must be posted.</td>
                  <td>In some secured bail situations, a bail bond agent may be able to help.</td>
                </tr>
                <tr>
                  <td>Cash Only Bail</td>
                  <td>The court requires cash according to the court order.</td>
                  <td>A standard commercial bail bond may not work the same way for cash-only bail.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row g-4 mt-3">
            <div className="col-md-6 col-lg-3"><div className="service-card h-100"><h3>Own recognizance bail</h3><p>Own recognizance release usually means the defendant signs a promise to appear in court without paying money upfront.</p></div></div>
            <div className="col-md-6 col-lg-3"><div className="service-card h-100"><h3>Unsecured bail</h3><p>Unsecured bail usually means the defendant signs a bond and may owe money if they do not appear in court.</p></div></div>
            <div className="col-md-6 col-lg-3"><div className="service-card h-100"><h3>Secured bail</h3><p>Secured bail means money, property, or another form of security must be posted. Learn more about <a href="/services/secured" onClick={(e) => handleNav(e, '/services/secured')}>secured bail bond help</a>.</p></div></div>
            <div className="col-md-6 col-lg-3"><div className="service-card h-100"><h3>Cash-only bail</h3><p>Cash-only bail means the court requires cash according to the court order, so confirm the exact wording first.</p></div></div>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <h2 className="section-title">What should you ask before signing a bail bond agreement-</h2>
              <p>Before signing a bail bond agreement, ask about the full bail amount, bond type, premium or payment arrangement, collateral, receipts, co-signer responsibilities, and what happens if the defendant misses court. Do not sign until you understand your financial responsibility and the defendant-s release conditions.</p>
              <h3>Questions to ask before signing</h3>
              <ul>
                <li>What is the full bail amount-</li>
                <li>What type of bail did the court set-</li>
                <li>What amount must be paid now-</li>
                <li>Are there payment arrangements or collateral requirements-</li>
                <li>Will I receive written paperwork and receipts-</li>
                <li>What does a co-signer agree to do-</li>
                <li>What happens if the defendant misses court-</li>
                <li>Who should I call if the court date changes-</li>
              </ul>
            </div>
            <div className="col-lg-6">
              <h2 className="section-title">Why local New Castle County bail bond help matters</h2>
              <p>A local bail bond agent can help you understand the practical steps in the area where the arrest or court process is happening. For New Castle County families, that may involve Wilmington, Newark, New Castle, Bear, Middletown or nearby communities.</p>
              <p>A Way to Freedom Bail Bonds focuses this page on Delaware service. The goal is not to pressure you. The goal is to help you understand what the court ordered, what the bond process may require, and what information is needed to move forward.</p>
              <p>For a broader process guide, read <a href="/blog/how-to-bond-someone-out-of-jail-delaware" onClick={(e) => handleNav(e, '/blog/how-to-bond-someone-out-of-jail-delaware')}>how to bond someone out of jail in Delaware</a>.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9 text-center">
              <h2 className="section-title">Can you start the bail bond process by phone-</h2>
              <p>Yes. Many New Castle County bail bond situations can begin by phone. A family member can call with the defendant-s name, date of birth, location, bond amount if known, and basic case details. If information is missing, the call can still help identify what to check next.</p>
              <p>Starting by phone can be especially helpful at night, during work hours, or when family members are not near the court or jail. If a bond can be posted, the agent can explain what documents, payment information, or co-signer details may be needed.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">COMMON QUESTIONS</div>
            <h2 className="section-title">New Castle County Bail Bond FAQs</h2>
            <div className="section-gold-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {faqs.map((faq) => (
                <div className="faq-item mb-3" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Call A Way to Freedom Bail Bonds for New Castle County help</h2>
          <blockquote>A good bail bond conversation should make the situation clearer, not more confusing. Ask questions before signing, and do not rely on promises that sound too good to verify.</blockquote>
          <p style={{ color: 'var(--text-light-secondary)', marginBottom: '1.5rem' }}>
            If someone you love has been arrested in New Castle County, Delaware, gather the details you have, call for confidential guidance, and ask clear questions before signing.
          </p>
          <a href="tel:+17024478550" className="btn-primary-gold me-2 mb-2">
            <i className="fas fa-phone-alt me-2"></i>(702) 447-8550
          </a>
          <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="btn-secondary-outline mb-2">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

// ============================================
// NEWARK DE BAIL BONDS PAGE
// ============================================
const NewarkBailBondsPage = ({ navigate }) => {
  useSEO(
    'Newark DE Bail Bonds | 24/7 Newark Delaware Bail Help',
    'Need Newark DE bail bonds? A Way to Freedom Bail Bonds provides 24/7 local bail bond help in Newark, Delaware and New Castle County with clear, confidential guidance.',
    'Newark DE bail bonds, Newark Delaware bail bonds, bail bondsman Newark DE, bail bond agent Newark Delaware, 24/7 bail bonds Newark, New Castle County bail bond help',
    'Newark DE Bail Bonds | A Way to Freedom Bail Bonds',
    '24/7 Newark, Delaware bail bond help from A Way to Freedom Bail Bonds. Local support for Newark and New Castle County families.'
  );

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/newark-de-bail-bonds/#webpage`,
        "url": `${SITE_URL}/newark-de-bail-bonds`,
        "name": "Newark DE Bail Bonds | 24/7 Newark Delaware Bail Help",
        "description": "Local Newark, Delaware bail bond help from A Way to Freedom Bail Bonds, serving families in Newark and New Castle County 24/7.",
        "about": [
          { "@type": "Thing", "name": "Newark DE bail bonds" },
          { "@type": "Thing", "name": "New Castle County bail bonds" },
          { "@type": "Thing", "name": "bail bond agent Newark Delaware" }
        ]
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/newark-de-bail-bonds/#service`,
        "name": "Newark DE Bail Bonds",
        "serviceType": "Bail bond services",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${SITE_URL}/newark-de-bail-bonds/#webpage`
        },
        "provider": {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#localbusiness`,
          "name": "A Way to Freedom Bail Bonds",
          "telephone": ["+1-702-447-8550", "+1-302-600-1886"]
        },
        "areaServed": [
          { "@type": "City", "name": "Newark, Delaware" },
          { "@type": "AdministrativeArea", "name": "New Castle County, Delaware" }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/newark-de-bail-bonds/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you provide bail bonds in Newark, Delaware?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. A Way to Freedom Bail Bonds provides 24/7 bail bond help in Newark, Delaware and throughout New Castle County."
            }
          },
          {
            "@type": "Question",
            "name": "Is this page for Newark, Delaware or Newark, Ohio?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This page is for Newark, Delaware bail bond help. A Way to Freedom Bail Bonds serves Newark, Wilmington, New Castle County, and Kent County in Delaware."
            }
          },
          {
            "@type": "Question",
            "name": "Can I start the bail bond process by phone in Newark, DE?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Many Newark, DE bail bond situations can begin by phone. Helpful details include the defendant's name, date of birth, court or jail location, and bond amount if known."
            }
          }
        ]
      },
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/service-areas' },
        { name: 'Newark DE Bail Bonds', path: '/newark-de-bail-bonds' },
      ]),
    ],
  });

  const handleNav = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div className="page-container simone-page">
      <section className="service-detail-hero">
        <div className="container">
          <a href="/service-areas" onClick={(e) => handleNav(e, '/service-areas')} className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Service Areas
          </a>
          <div className="gold-divider" style={{ margin: '1rem 0' }}></div>
          <p className="hero-subtitle">Newark, Delaware Bail Bond Help</p>
          <h1>Newark DE Bail Bonds Available 24/7</h1>
          <p className="lead" style={{ color: 'var(--text-light-secondary)', maxWidth: '820px' }}>
            If someone has been arrested in Newark, Delaware, the next few steps can feel confusing. A Way to Freedom Bail Bonds helps families confirm the bond amount, understand the bond type, prepare paperwork, and move forward with fast, confidential local guidance.
          </p>
          <div className="hero-cta-wrap mt-4">
            <a href="tel:+17024478550" className="btn btn-primary-gold">
              <i className="fas fa-phone-alt me-2"></i>Call Newark: (702) 447-8550
            </a>
            <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20help%20with%20a%20Newark%20DE%20bail%20bond." target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold">
              <i className="fab fa-whatsapp me-2"></i>WhatsApp Us
            </a>
          </div>
          <div className="mt-4">
            <span className="location-badge"><i className="fas fa-map-marker-alt"></i>288 E Main St, Newark</span>
            <span className="location-badge"><i className="fas fa-clock"></i>24/7 Support</span>
            <span className="location-badge"><i className="fas fa-shield-alt"></i>Private Guidance</span>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="local-seo-content">
                <div className="section-ornament text-center">? &nbsp; NEWARK DELAWARE BAIL HELP &nbsp; ?</div>
                <h2 className="section-title text-center">Local Bail Bonds in <span className="gold-text">Newark, DE</span></h2>
                <div className="section-gold-line"></div>
                <p>
                  Searches for Newark bail bonds can bring up results from other states, especially Newark, Ohio or Newark, New Jersey. This page is specifically for <strong>Newark, Delaware bail bonds</strong> and New Castle County families who need help after an arrest.
                </p>
                <p>
                  A local bail bond agent can help you organize the practical details: where the person is being held, whether bail has been set, what type of bail was ordered, whether a co-signer is needed, and what paperwork can be started by phone or electronically.
                </p>
                <div className="row g-4 mt-3">
                  <div className="col-md-4">
                    <div className="service-card h-100">
                      <div className="service-icon"><i className="fas fa-search"></i></div>
                      <h3>Confirm the Case</h3>
                      <p>Start with the defendant's full name, date of birth, arrest location, and any court or case information you have.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service-card h-100">
                      <div className="service-icon"><i className="fas fa-balance-scale"></i></div>
                      <h3>Understand Bail Type</h3>
                      <p>Delaware courts may use own recognizance, unsecured bail, secured bail, or cash-only bail.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service-card h-100">
                      <div className="service-icon"><i className="fas fa-file-signature"></i></div>
                      <h3>Start Paperwork</h3>
                      <p>When a bond can be posted, we help explain documents, co-signer responsibility, and next steps after release.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-padding">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <h2 className="section-title">What Families Should Ask Before Posting Bail</h2>
              <p>
                Before you sign for a bail bond, ask about the full bail amount, the bond type, the premium or payment arrangement, collateral requirements, receipts, and what happens if the defendant misses court. Good bail help should make the process clearer, not pressure you when you are already stressed.
              </p>
              <p>
                If you do not know the bail amount yet, read our guide on{' '}
                <a href="/blog/how-do-you-find-out-how-much-someones-bail-is" onClick={(e) => handleNav(e, '/blog/how-do-you-find-out-how-much-someones-bail-is')}>how to find out how much someone's bail is</a>. If this is your first time helping someone after an arrest, our{' '}
                <a href="/blog/how-to-bond-someone-out-of-jail-delaware" onClick={(e) => handleNav(e, '/blog/how-to-bond-someone-out-of-jail-delaware')}>Delaware jail bond guide</a>{' '}
                walks through the bigger process. If the paperwork says unsecured, read{' '}
                <a href="/blog/what-is-unsecured-bail-delaware" onClick={(e) => handleNav(e, '/blog/what-is-unsecured-bail-delaware')}>what unsecured bail means in Delaware</a>{' '}
                before arranging money or property.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Newark Office</h3>
                <p>288 E Main St<br />Newark, DE 19711</p>
                <p><a href="tel:+17024478550">(702) 447-8550</a></p>
                <p className="small text-muted mb-0">Serving Newark, Wilmington, New Castle County, and Kent County with 24/7 confidential bail bond help. Learn more about <a href="/new-castle-county-bail-bonds" onClick={(e) => handleNav(e, '/new-castle-county-bail-bonds')}>New Castle County bail bonds</a>.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">COMMON QUESTIONS</div>
            <h2 className="section-title">Newark DE Bail Bond FAQs</h2>
            <div className="section-gold-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="faq-item mb-3">
                <h3>Do you provide bail bonds in Newark, Delaware?</h3>
                <p>Yes. A Way to Freedom Bail Bonds provides 24/7 bail bond help in Newark, Delaware and throughout New Castle County.</p>
              </div>
              <div className="faq-item mb-3">
                <h3>Is this for Newark, Delaware or Newark, Ohio?</h3>
                <p>This page is for Newark, Delaware. Because Google may show other Newark locations, we clearly target Newark DE and New Castle County.</p>
              </div>
              <div className="faq-item mb-3">
                <h3>Can I start by phone?</h3>
                <p>Yes. Many Newark DE bail bond situations can begin by phone. If you do not have all details yet, call and ask what information to check next.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Need Newark DE Bail Bond Help?</h2>
          <p style={{ color: 'var(--text-light-secondary)', marginBottom: '1.5rem' }}>
            Call now for fast, confidential bail bond guidance in Newark, Delaware and New Castle County.
          </p>
          <a href="tel:+17024478550" className="btn-primary-gold me-2 mb-2">
            <i className="fas fa-phone-alt me-2"></i>(702) 447-8550
          </a>
          <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="btn-secondary-outline mb-2">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

// ============================================
// 404 PAGE
// ============================================
// ============================================
// SERVICE AREAS PAGE  (targets "bail bonds near me" + city/county queries)
// ============================================
const ServiceAreasPage = ({ navigate }) => {
  useSEO(
    'Bail Bonds Near Me in Delaware | Wilmington, Newark & Dover',
    'Looking for a bail bondsman near you? A Way to Freedom provides 24/7 local bail bonds across New Castle County and Kent County, Delaware, including Newark, Wilmington, Middletown and Dover.',
    'bail bonds near me, bail bondsman near me, bail bonds near you, Newark DE bail bonds, Wilmington bail bonds, New Castle County bail bonds, Kent County bail bonds, Dover bail bonds, local bail bonds Delaware'
  );

  const newCastleCities = [
    { name: 'Wilmington', path: '/wilmington-de-bail-bonds', blurb: 'Fast local bail bond help in Wilmington, including the King Street courts and downtown area.' },
    { name: 'Newark', path: '/newark-de-bail-bonds', blurb: 'Local bail bond agent near Main Street Newark, ready to start the release process quickly.' },
    { name: 'New Castle', path: '/new-castle-county-bail-bonds', blurb: 'Bail bonds near you in New Castle and nearby communities, available day or night.' },
    { name: 'Bear', blurb: 'Local bail bond support for families in Bear and the surrounding New Castle County area.' },
    { name: 'Middletown', blurb: 'Bail bonds for Middletown and the growing southern New Castle County region.' },
    { name: 'Glasgow', blurb: 'Local bail bond help for Glasgow and nearby Route 40 communities.' },
    { name: 'Claymont', blurb: 'Bail bond assistance for Claymont and the northern New Castle County area.' },
    { name: 'Hockessin', blurb: 'Local, confidential bail bond support for Hockessin and Pike Creek.' },
  ];

  const kentCities = [
    { name: 'Dover', blurb: 'Bail bonds near you in Dover, Delaware\'s capital, with clear local guidance.' },
    { name: 'Smyrna', blurb: 'Local bail bond help for Smyrna and the New Castle / Kent County line.' },
    { name: 'Camden', blurb: 'Bail bond support for Camden and the greater Dover area.' },
    { name: 'Milford', blurb: 'Local bail bonds for the Kent County side of Milford and nearby towns.' },
  ];

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        "name": "A Way to Freedom Bail Bonds",
        "url": `${SITE_URL}/`,
        "telephone": ["+1-702-447-8550", "+1-302-600-1886"],
        "areaServed": [
          ...newCastleCities.map((c) => ({ "@type": "City", "name": `${c.name}, DE` })),
          ...kentCities.map((c) => ({ "@type": "City", "name": `${c.name}, DE` })),
          { "@type": "AdministrativeArea", "name": "New Castle County, Delaware" },
          { "@type": "AdministrativeArea", "name": "Kent County, Delaware" },
        ],
      },
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/service-areas' },
      ]),
    ],
  });

  return (
    <div className="page-container simone-page">
      <section className="service-detail-hero">
        <div className="container">
          <a href="/" onClick={(e) => { e.preventDefault(); navigate('/home'); }} className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Home
          </a>
          <div className="gold-divider" style={{ margin: '1rem 0' }}></div>
          <h1>Bail Bonds Near You in Delaware</h1>
          <p className="lead" style={{ color: 'var(--text-light-secondary)', maxWidth: '760px' }}>
            Searching for a "bail bondsman near me"? A Way to Freedom is a local Delaware bail bond agency
            serving New Castle County and Kent County. For county-wide help, visit our{' '}
            <a href="/new-castle-county-bail-bonds" onClick={(e) => handleNav(e, '/new-castle-county-bail-bonds')}>New Castle County bail bonds page</a>. Wherever you are after an arrest, we provide fast,
            confidential 24/7 help by phone - so you can start the release process without driving across the state.
          </p>
          <div className="hero-cta-wrap mt-3">
            <a href="tel:+17024478550" className="btn btn-primary-gold">
              <i className="fas fa-phone-alt me-2"></i>Call (702) 447-8550
            </a>
            <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20a%20local%20bail%20bond%20agent%20near%20me." target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold">
              <i className="fab fa-whatsapp me-2"></i>WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">✦ &nbsp; NEW CASTLE COUNTY &nbsp; ✦</div>
            <h2 className="section-title">Bail Bonds in <span className="gold-text">New Castle County</span></h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">Local bail bond help across the Wilmington and Newark area and nearby communities.</p>
          </div>
          <div className="row g-4">
            {newCastleCities.map((c) => (
              <div className="col-md-6 col-lg-3" key={c.name}>
                <div className="service-card">
                  <div className="service-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <h3>{c.path ? (<a href={c.path} onClick={(e) => handleNav(e, c.path)}>{c.name}, DE</a>) : `${c.name}, DE`}</h3>
                  <p>{c.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">✦ &nbsp; KENT COUNTY &nbsp; ✦</div>
            <h2 className="section-title">Bail Bonds in <span className="gold-text">Kent County</span></h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">Serving Dover and the surrounding Kent County area with clear, local guidance.</p>
          </div>
          <div className="row g-4 justify-content-center">
            {kentCities.map((c) => (
              <div className="col-md-6 col-lg-3" key={c.name}>
                <div className="service-card">
                  <div className="service-icon"><i className="fas fa-map-marker-alt"></i></div>
                  <h3>{c.name}, DE</h3>
                  <p>{c.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="local-seo-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="local-seo-content text-center">
                <h2>Why a Local Bail Bond Agent Matters</h2>
                <p>
                  When you search for "bail bonds near me," you want someone who knows the local courts and jails.
                  A Way to Freedom works with families across New Castle County and Kent County, Delaware, and can
                  begin the process over the phone - so distance is never a reason to wait.
                </p>
                <div className="mt-4">
                  <span className="location-badge"><i className="fas fa-map-marker-alt"></i>Newark Office</span>
                  <span className="location-badge"><i className="fas fa-map-marker-alt"></i>Wilmington Office</span>
                  <span className="location-badge"><i className="fas fa-clock"></i>Available 24/7</span>
                </div>
                <div className="row mt-5 text-start">
                  <div className="col-md-6 mb-3">
                    <div className="contact-info-card">
                      <i className="fas fa-map-marker-alt"></i>
                      <h5>Newark, Delaware</h5>
                      <p>288 E Main St, Newark, DE 19711</p>
                      <p className="small text-muted"><a href="tel:+17024478550">(702) 447-8550</a></p>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="contact-info-card">
                      <i className="fas fa-map-marker-alt"></i>
                      <h5>Wilmington, Delaware</h5>
                      <p>715 N. King Street, Wilmington, DE 19801</p>
                      <p className="small text-muted"><a href="tel:+13026001886">(302) 600-1886</a></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Need a Bail Bondsman Near You?</h2>
          <p style={{ color: 'var(--text-light-secondary)', marginBottom: '1.5rem' }}>
            Call now for fast, local, confidential bail bond help anywhere in New Castle County or Kent County, Delaware.
          </p>
          <a href="tel:+17024478550" className="btn-primary-gold me-2 mb-2">
            <i className="fas fa-phone-alt me-2"></i>(702) 447-8550
          </a>
          <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} className="btn-secondary-outline mb-2">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};


// ============================================
// WILMINGTON DE BAIL BONDS PAGE
// ============================================
const WilmingtonBailBondsPage = ({ navigate }) => {
  useSEO(
    'Wilmington DE Bail Bonds | 24/7 Bail Bond Help',
    'Need Wilmington DE bail bonds fast? A Way to Freedom Bail Bonds provides 24/7 local bail bond help near the King Street courts and New Castle County.',
    'Wilmington DE bail bonds, bail bonds Wilmington, bail bondsman Wilmington DE, traffic bonds Wilmington, 24/7 bail bonds Wilmington, bail bond agent Wilmington, bail bonds near Wilmington DE',
    'Wilmington DE Bail Bonds | A Way to Freedom Bail Bonds',
    '24/7 Wilmington bail bond help from A Way to Freedom Bail Bonds. Call for fast, confidential guidance in New Castle County.',
    '/images/wilmington-de-bail-bonds/wilmington-de-bail-bonds-og.webp'
  );

  injectSchema({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/wilmington-de-bail-bonds/#webpage`,
        "url": `${SITE_URL}/wilmington-de-bail-bonds`,
        "name": "Wilmington DE Bail Bonds | 24/7 Bail Bond Help",
        "description": "Local Wilmington DE bail bond help from A Way to Freedom Bail Bonds, serving families near the King Street courts and throughout New Castle County.",
        "primaryImageOfPage": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/images/wilmington-de-bail-bonds/wilmington-de-bail-bonds-og.webp`
        }
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/wilmington-de-bail-bonds/#service`,
        "name": "Wilmington DE Bail Bonds",
        "serviceType": "Bail bond services",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${SITE_URL}/wilmington-de-bail-bonds/#webpage`
        },
        "provider": {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#localbusiness`,
          "name": "A Way to Freedom Bail Bonds",
          "telephone": ["+1-702-447-8550", "+1-302-600-1886"]
        },
        "areaServed": [
          { "@type": "City", "name": "Wilmington, Delaware" },
          { "@type": "AdministrativeArea", "name": "New Castle County, Delaware" }
        ],
        "availableChannel": {
          "@type": "ServiceChannel",
          "servicePhone": "+1-302-600-1886",
          "availableLanguage": "English"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/wilmington-de-bail-bonds/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Do you provide bail bonds in Wilmington, DE?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. A Way to Freedom Bail Bonds provides 24/7 bail bond help for Wilmington, Delaware and New Castle County, including families who need fast guidance after an arrest."
            }
          },
          {
            "@type": "Question",
            "name": "What information should I have before calling about a Wilmington bail bond?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Helpful information includes the defendant's full name, date of birth, court or jail location, bond amount if known, and the type of bail set by the court."
            }
          },
          {
            "@type": "Question",
            "name": "Can a bail bond agent help with secured bail in Delaware?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In some secured bail situations, a licensed bail bond agent may help post the security required for release. Cash-only, unsecured, and own-recognizance release work differently, so families should confirm the bond type first."
            }
          }
        ]
      },
      buildBreadcrumb([
        { name: 'Home', path: '/' },
        { name: 'Service Areas', path: '/service-areas' },
        { name: 'Wilmington DE Bail Bonds', path: '/wilmington-de-bail-bonds' },
      ]),
    ],
  });

  const handleNav = (event, path) => {
    event.preventDefault();
    navigate(path);
  };

  return (
    <div className="page-container simone-page">
      <section className="service-detail-hero">
        <div className="container">
          <a href="/service-areas" onClick={(e) => handleNav(e, '/service-areas')} className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Service Areas
          </a>
          <div className="row align-items-center g-5 mt-2">
            <div className="col-lg-6">
              <div className="gold-divider" style={{ margin: '1rem 0' }}></div>
              <p className="hero-subtitle">Wilmington, Delaware Bail Bond Help</p>
              <h1>Wilmington DE Bail Bonds Available 24/7</h1>
              <p className="lead" style={{ color: 'var(--text-light-secondary)' }}>
                When someone is arrested in Wilmington, every call matters. A Way to Freedom Bail Bonds helps families understand the bond amount, bond type, paperwork, and next steps so they can move quickly with calm, local guidance.
              </p>
              <div className="hero-cta-wrap mt-4">
                <a href="tel:+13026001886" className="btn btn-primary-gold">
                  <i className="fas fa-phone-alt me-2"></i>Call Wilmington: (302) 600-1886
                </a>
                <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20help%20with%20a%20Wilmington%20DE%20bail%20bond." target="_blank" rel="noopener noreferrer" className="btn btn-outline-gold">
                  <i className="fab fa-whatsapp me-2"></i>WhatsApp Us
                </a>
              </div>
              <div className="mt-4">
                <span className="location-badge"><i className="fas fa-map-marker-alt"></i>715 N. King Street</span>
                <span className="location-badge"><i className="fas fa-clock"></i>24/7 Help</span>
                <span className="location-badge"><i className="fas fa-shield-alt"></i>Confidential</span>
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="/images/wilmington-de-bail-bonds/wilmington-de-bail-bonds-hero.webp"
                alt="Wilmington DE bail bonds 24/7 local support by A Way to Freedom Bail Bonds"
                className="img-fluid rounded-4 shadow-lg"
                loading="eager"
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="local-seo-content">
                <div className="section-ornament text-center">? &nbsp; WILMINGTON BAIL BOND GUIDE &nbsp; ?</div>
                <h2 className="section-title text-center">Fast Local Bail Bond Help in <span className="gold-text">Wilmington, DE</span></h2>
                <div className="section-gold-line"></div>
                <p>
                  Wilmington is one of Delaware's most important legal hubs. Families may be dealing with the King Street court area, local detention details, or a recent arrest in New Castle County. A local bail bond agent can help you slow the panic down and focus on the information that actually moves the release process forward.
                </p>
                <p>
                  The first step is usually confirming the defendant's name, date of birth, location, bail amount, and bail type. Delaware courts may use own recognizance, unsecured bail, secured bail, or cash-only bail. A commercial bail bond may help in some secured bail situations, while other release types work differently. If you see the word unsecured, read our guide to <a href="/blog/what-is-unsecured-bail-delaware" onClick={(e) => handleNav(e, '/blog/what-is-unsecured-bail-delaware')}>what unsecured bail means in Delaware</a>.
                </p>
                <div className="row g-4 mt-3">
                  <div className="col-md-4">
                    <div className="service-card h-100">
                      <div className="service-icon"><i className="fas fa-phone-alt"></i></div>
                      <h3>Call First</h3>
                      <p>Share the defendant's full name, birth date, arrest location, and bond amount if you have it.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service-card h-100">
                      <div className="service-icon"><i className="fas fa-file-signature"></i></div>
                      <h3>Confirm Bond Type</h3>
                      <p>Secured, unsecured, cash-only, and own-recognizance releases each have different requirements.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service-card h-100">
                      <div className="service-icon"><i className="fas fa-route"></i></div>
                      <h3>Move Clearly</h3>
                      <p>Get guidance on paperwork, co-signer responsibilities, timing, and what happens after release.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-dark section-padding">
        <div className="container">
          <div className="row g-4 align-items-start">
            <div className="col-lg-7">
              <h2 className="section-title">What to Know Before Posting Bail in Wilmington</h2>
              <p>
                Before signing anything, ask what the total bond amount is, what fee or payment arrangement applies, whether collateral is required, and what the defendant must do after release. A co-signer should understand court appearance obligations, contact requirements, and the risk if the defendant misses court.
              </p>
              <p>
                If you are still trying to find the bail amount, start with the available court, jail, or case details and call for help organizing the next step. You can also read our guide on{' '}
                <a href="/blog/how-do-you-find-out-how-much-someones-bail-is" onClick={(e) => handleNav(e, '/blog/how-do-you-find-out-how-much-someones-bail-is')}>how to find out how much someone's bail is</a>{' '}
                or our step-by-step article on{' '}
                <a href="/blog/how-to-bond-someone-out-of-jail-delaware" onClick={(e) => handleNav(e, '/blog/how-to-bond-someone-out-of-jail-delaware')}>how to bond someone out of jail in Delaware</a>.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="contact-info-card">
                <i className="fas fa-map-marker-alt"></i>
                <h3>Wilmington Office</h3>
                <p>715 N. King Street<br />Wilmington, DE 19801</p>
                <p><a href="tel:+13026001886">(302) 600-1886</a></p>
                <p className="small text-muted mb-0">Serving Wilmington and New Castle County with confidential 24/7 bail bond help.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section section-padding">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">COMMON QUESTIONS</div>
            <h2 className="section-title">Wilmington Bail Bond FAQs</h2>
            <div className="section-gold-line"></div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-9">
              <div className="faq-item mb-3">
                <h3>Do you provide bail bonds in Wilmington, DE?</h3>
                <p>Yes. A Way to Freedom Bail Bonds provides 24/7 bail bond help for Wilmington and New Castle County families who need clear guidance after an arrest.</p>
              </div>
              <div className="faq-item mb-3">
                <h3>What information should I have before calling?</h3>
                <p>Try to gather the defendant's full name, date of birth, location, bond amount if known, and any court or case details. If you do not have everything yet, call anyway and ask what to check next.</p>
              </div>
              <div className="faq-item mb-3">
                <h3>Can a bail bond agent help with secured bail?</h3>
                <p>In some secured bail situations, yes. Cash-only, unsecured, and own-recognizance release work differently, so the first step is confirming the exact bond type set by the court. If the paperwork says unsecured, read our unsecured bail guide before arranging money.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Need Wilmington DE Bail Bond Help Now?</h2>
          <p style={{ color: 'var(--text-light-secondary)', marginBottom: '1.5rem' }}>
            Call A Way to Freedom Bail Bonds for fast, confidential help in Wilmington and New Castle County.
          </p>
          <a href="tel:+13026001886" className="btn-primary-gold me-2 mb-2">
            <i className="fas fa-phone-alt me-2"></i>(302) 600-1886
          </a>
          <a href="/contact" onClick={(e) => handleNav(e, '/contact')} className="btn-secondary-outline mb-2">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

const NotFoundPage = ({ navigate }) => {
  useSEO(
    'Page Not Found | A Way to Freedom Bail Bonds',
    'The page you are looking for could not be found. A Way to Freedom Bail Bonds - 24/7 bail bond services in Wilmington, Newark, New Castle County, and Kent County, Delaware.'
  );

  return (
    <div className="page-container simone-page">
      <section className="section-dark not-found-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="not-found-icon">
                <i className="fas fa-link-slash"></i>
              </div>
              <h1 className="not-found-code">404</h1>
              <h2 className="section-title mb-3">Page Not Found</h2>
              <p className="not-found-text">
                The page you&apos;re looking for doesn&apos;t exist or has been moved. We&apos;re here to help - get back on track or reach out for 24/7 bail bond assistance in Delaware.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                <a href="/" onClick={(e) => { e.preventDefault(); navigate('/home'); }} className="btn btn-primary-gold">
                  <i className="fas fa-home me-2"></i>Back to Home
                </a>
                <a href="/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} className="btn btn-outline-gold">
                  <i className="fas fa-phone-alt me-2"></i>Contact Us
                </a>
              </div>
              <p className="mt-4 mb-0 text-muted small">
                Serving Wilmington, Newark, New Castle County, and Kent County, Delaware.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
function App() {
  const { currentPath, navigate } = useRouter();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  // Render the appropriate page based on the current path
  const renderPage = () => {
    // Home
    if (currentPath === '/' || currentPath === '' || currentPath === '/home') {
      return <SimoneHomePage />;
    }

    // Services hub
    if (currentPath === '/services') {
      return <ServicesPage navigate={navigate} />;
    }

    // Individual service pages
    if (currentPath.startsWith('/services/')) {
      const serviceKey = currentPath.replace('/services/', '');
      return <ServiceDetailPage serviceKey={serviceKey} navigate={navigate} />;
    }

    // Service areas (local "near me" landing page)
    if (currentPath === '/service-areas') {
      return <ServiceAreasPage navigate={navigate} />;
    }

    if (currentPath === '/new-castle-county-bail-bonds') {
      return <NewCastleCountyBailBondsPage navigate={navigate} />;
    }

    if (currentPath === '/wilmington-de-bail-bonds') {
      return <WilmingtonBailBondsPage navigate={navigate} />;
    }

    if (currentPath === '/newark-de-bail-bonds') {
      return <NewarkBailBondsPage navigate={navigate} />;
    }

    // About
    if (currentPath === '/about') {
      return <AboutPage navigate={navigate} />;
    }

    // How It Works
    if (currentPath === '/how-it-works') {
      return <HowItWorksPage navigate={navigate} />;
    }

    // FAQ
    if (currentPath === '/faq') {
      return <FAQPage navigate={navigate} />;
    }

    // Blog
    if (currentPath === '/blog') {
      return <BlogPage navigate={navigate} />;
    }

    // Blog post
    if (currentPath.startsWith('/blog/')) {
      let slug = currentPath.replace('/blog/', '');
      if (slug === 'how-bail-bonds-work-delaware') {
        slug = HARDCODED_BLOG_SLUG;
      }
      return <BlogPostPage slug={slug} navigate={navigate} />;
    }

    // Contact
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // 404
    return <NotFoundPage navigate={navigate} />;
  };

  // Standalone admin dashboard - no public navbar/footer/chrome
  if (currentPath === '/admin' || currentPath.startsWith('/admin/')) {
    return <AdminPortal />;
  }

  return (
    <>
      <Navbar currentPath={currentPath} navigate={navigate} />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <FloatingButtons />
      <SocialSidebar />
    </>
  );
}

export default App;
