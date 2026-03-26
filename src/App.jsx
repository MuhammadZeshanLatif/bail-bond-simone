import React, { useState, useEffect, useCallback, useRef } from 'react';
import SimoneAboutSection from './components/SimoneAboutSection';

// ============================================
// CUSTOM ROUTER HOOK
// ============================================
const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    // Support hash fallback
    if (window.location.hash) {
      return window.location.hash.slice(1) || '/home';
    }
    return window.location.pathname || '/home';
  });

  const navigate = useCallback((path) => {
    // Support hash fallback mode
    if (window.location.hash) {
      window.location.hash = path;
    } else {
      window.history.pushState(null, '', path);
    }
    setCurrentPath(path);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.hash) {
        setCurrentPath(window.location.hash.slice(1) || '/home');
      } else {
        setCurrentPath(window.location.pathname);
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
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

    // Update OG URL
    let ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl) {
      ogUrlEl.setAttribute('content', window.location.href);
    }

    // Update Twitter URL
    let twitterUrlEl = document.querySelector('meta[name="twitter:url"]');
    if (twitterUrlEl) {
      twitterUrlEl.setAttribute('content', window.location.href);
    }

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', window.location.href);
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
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <a href="#/home" onClick={(e) => handleNavClick(e, '/home')} className="navbar-brand-custom text-decoration-none">
          <div className="brand-icon">
            <i className="fas fa-scale-balanced"></i>
          </div>
          <div>
            <div className="brand-text">A Way to Freedom</div>
            <div className="brand-tagline">Bail Bonds</div>
          </div>
        </a>

        <div className="d-flex align-items-center gap-3">
          <div className="header-phone d-none d-lg-flex align-items-center">
            <i className="fas fa-phone-alt me-2"></i>
            <a href="tel:+17024478550" className="text-decoration-none" style={{color: 'inherit'}}>(702) 447-8550</a>
          </div>
          <a href="tel:+17024478550" className="btn-call-header d-none d-lg-inline-flex">
            <i className="fas fa-phone-alt me-2"></i>Call Now
          </a>
        </div>

        <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{background: 'var(--dark-bg-tertiary)', border: '1px solid var(--border-color)'}}>
          <i className="fas fa-bars text-light"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <a href="#/home" onClick={(e) => handleNavClick(e, '/home')} className={`nav-link-custom nav-link ${isActive('/home') ? 'active' : ''}`}>
                Home
              </a>
            </li>
            <li className="nav-item dropdown" ref={dropdownRef}>
              <a 
                href="#" 
                className={`nav-link-custom nav-link dropdown-toggle ${currentPath.startsWith('/services') ? 'active' : ''} ${showServices ? 'dropdown-open' : ''}`}
                onClick={(e) => { e.preventDefault(); setShowServices(!showServices); }}
                role="button"
              >
                Services
                <i className={`fas fa-chevron-down dropdown-icon ${showServices ? 'rotate' : ''}`}></i>
              </a>
              {showServices && (
                <div className="dropdown-menu-custom position-absolute show">
                  <a href="#/services/felony" onClick={(e) => {handleNavClick(e, '/services/felony'); setShowServices(false);}} className="dropdown-item-custom d-block">Felony & Misdemeanor Bonds</a>
                  <a href="#/services/misdemeanor" onClick={(e) => {handleNavClick(e, '/services/misdemeanor'); setShowServices(false);}} className="dropdown-item-custom d-block">Misdemeanor Bonds</a>
                  <a href="#/services/secured" onClick={(e) => {handleNavClick(e, '/services/secured'); setShowServices(false);}} className="dropdown-item-custom d-block">Secured Bonds</a>
                  <a href="#/services/surety" onClick={(e) => {handleNavClick(e, '/services/surety'); setShowServices(false);}} className="dropdown-item-custom d-block">Surety Bail</a>
                  <a href="#/services/fast-release" onClick={(e) => {handleNavClick(e, '/services/fast-release'); setShowServices(false);}} className="dropdown-item-custom d-block">Fast Release Processing</a>
                  <a href="#/services/payment" onClick={(e) => {handleNavClick(e, '/services/payment'); setShowServices(false);}} className="dropdown-item-custom d-block">Flexible Payment Arrangements</a>
                  <a href="#/services/e-paperwork" onClick={(e) => {handleNavClick(e, '/services/e-paperwork'); setShowServices(false);}} className="dropdown-item-custom d-block">Electronic Paperwork</a>
                </div>
              )}
            </li>
            <li className="nav-item">
              <a href="#/about" onClick={(e) => handleNavClick(e, '/about')} className={`nav-link-custom nav-link ${isActive('/about') ? 'active' : ''}`}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="#/how-it-works" onClick={(e) => handleNavClick(e, '/how-it-works')} className={`nav-link-custom nav-link ${isActive('/how-it-works') ? 'active' : ''}`}>
                How It Works
              </a>
            </li>
            <li className="nav-item">
              <a href="#/faq" onClick={(e) => handleNavClick(e, '/faq')} className={`nav-link-custom nav-link ${isActive('/faq') ? 'active' : ''}`}>
                FAQ
              </a>
            </li>
            <li className="nav-item">
              <a href="#/blog" onClick={(e) => handleNavClick(e, '/blog')} className={`nav-link-custom nav-link ${currentPath.startsWith('/blog') ? 'active' : ''}`}>
                Blog
              </a>
            </li>
            <li className="nav-item">
              <a href="#/contact" onClick={(e) => handleNavClick(e, '/contact')} className={`nav-link-custom nav-link ${isActive('/contact') ? 'active' : ''}`}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
            Serving New Castle County & Kent County, Delaware
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
    'Simone Harris - Bail Bond Agent in Newark, Delaware | 24/7 Fast Release',
    'Simone Harris - Not Just Another Bail Bonds Agent, A Mother Who Cares. Professional bail bond services in Newark, Delaware. 24/7 availability, fast release, confidential process. Call (702) 447-8550',
    'bail bonds Newark Delaware, bail bond agent, bail bondsman, 24/7 bail bonds, fast bail release, Simone Harris bail bonds, Delaware bail bonds, affordable bail bonds, felony bonds, misdemeanor bonds'
  );

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
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

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
                A Way to Freedom provides fast, trusted bail bond help for families, friends, and co-signers after an arrest. We help with felony bonds, misdemeanor bonds, secured bonds, and surety bail bonds. Our goal is to make the process clear, simple, and quick from the first call.
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
                  loading="lazy"
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
              <i className="fas fa-phone-alt me-2"></i>Call Now — We're Ready
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
            <a href="#/services" className="btn btn-gold">Learn More</a>
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
                <h2>Local Bail Bond Company Across Delaware</h2>
                <p>
                  A Way to Freedom provides local bail bond services across Delaware, with a strong focus on New Castle County and nearby communities.
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
                  <a href="#/service-areas" className="btn btn-gold btn-lg">
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
            <p className="section-subtitle">Most people call during a stressful moment after an arrest — worried about detention, the bond amount, or how to start.</p>
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
            <p className="section-subtitle">Contact Simone Harris for Bail Bonds in Newark, Delaware</p>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3098.7654321!2d-75.7519!3d39.6837!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6f4c0a0b0c0d0%3A0x1234567890abcdef!2s288%20E%20Main%20St%2C%20Newark%2C%20DE%2019711!5e0!3m2!1sen!2sus!4v1234567890"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Simone Harris Bail Bonds Location Newark Delaware"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

const HomePage = ({ navigate }) => {
  useSEO(
    'A Way to Freedom Bail Bonds | 24/7 Bail Bonds in Delaware | Newark, DE',
    '24/7 Professional bail bond services in Delaware. Fast, confidential assistance serving New Castle County & Kent County. Call now for immediate help.',
    'bail bonds, bail bondsman, Delaware bail bonds, Newark Delaware bail, New Castle County bail, Kent County bail, 24/7 bail services'
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
                  <a href="#/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline">
                    Start the Process
                  </a>
                  <a href="#/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline">
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
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Criminal Bail Bonds</h3>
              <p>We help with bail bond needs tied to criminal charges in Delaware. This may include arrest situations involving state charges, court appearances, and release conditions. We explain the process in simple language so families understand what happens next.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Felony Bonds</h3>
              <p>Felony bonds are tied to more serious criminal charges and often involve higher bond amounts or stricter court conditions. We help families and co-signers understand the release process, financial responsibility, and paperwork needed to move forward.</p>
              <a href="#/services/felony" onClick={(e) => {e.preventDefault(); navigate('/services/felony');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Misdemeanor Bonds</h3>
              <p>Misdemeanor bonds help people get released after less serious charges, but the stress for the family is still real. We explain the bond amount, release steps, and co-signer role clearly so people can act quickly and make informed decisions.</p>
              <a href="#/services/misdemeanor" onClick={(e) => {e.preventDefault(); navigate('/services/misdemeanor');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Traffic Bonds</h3>
              <p>Traffic bonds may apply when someone is arrested for a traffic-related offense and bond is required for release. We help explain the bond process, court-related concerns, and the next step needed to move the release process forward.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Juvenile Bonds</h3>
              <p>Juvenile bond situations can feel confusing and emotional for parents and guardians. We help families understand what bond may apply, what paperwork may be needed, and how to take the next step as quickly and clearly as possible.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Secured Bonds</h3>
              <p>Secured bonds require money, property, or other approved security to support the bond amount. We explain how secured bond situations work, what financial responsibility may be involved, and what the co-signer should understand before signing.</p>
              <a href="#/services/secured" onClick={(e) => {e.preventDefault(); navigate('/services/secured');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Surety Bail Bonds</h3>
              <p>Surety bail bonds help defendants secure release without paying the full bail amount directly to the court. We help with the bond application, indemnitor or co-signer review, paperwork, and the release process so families can move forward with less confusion.</p>
              <a href="#/services/surety" onClick={(e) => {e.preventDefault(); navigate('/services/surety');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Cash Bail</h3>
              <p>Cash bail may require the full cash amount ordered by the court before release can happen. We explain how cash bail works, what it means in the case, and how families can understand their options during a stressful time.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Appeal Bonds</h3>
              <p>Appeal bonds may be needed when a case is under appeal and bond-related issues affect release or court obligations. These situations can be more complex, so we explain the process carefully and help clients understand what may be required.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Federal Bonds</h3>
              <p>Federal bond cases follow a different process than many state court matters. We help clients understand the bond conditions, paperwork, and release expectations in federal cases so there is less confusion and delay.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>State Bail Bonds</h3>
              <p>State bail bonds apply to cases handled in Delaware state courts. We help explain the bond amount, release conditions, co-signer obligations, and next steps so families know how to move forward with more confidence.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Transfer Bonds</h3>
              <p>Transfer bonds involve cases where the defendant, hold, or bond process connects to another jurisdiction. We help explain how the transfer situation may affect release, paperwork, and the overall bond process.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Out-of-State Transfer Bonds</h3>
              <p>Out-of-state transfer bond situations can involve added steps because another state is involved. We help families understand what information may be needed, what delays can happen, and how the bond process may move across jurisdictions.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
            </div>
            <div className="service-card reveal">
              <h3>Violation of Probation Bonds</h3>
              <p>Violation of probation cases can move quickly and create stress for both the defendant and the family. We help explain the bond situation, court-related risk, and the next step needed to begin the release process.</p>
              <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="btn-secondary-outline mt-2">Learn More</a>
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
            <a href="#/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-primary-gold">
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
            <a href="#/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-primary-gold">
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
            <a href="#/service-areas" onClick={(e) => {e.preventDefault(); navigate('/service-areas');}} className="btn-primary-gold">
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
            <a href="#/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline">
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

  const services = [
    { path: '/services/felony', icon: 'fa-gavel', title: 'Felony & Misdemeanor Bonds', desc: 'Expert handling of felony and misdemeanor bail bonds in Delaware courts' },
    { path: '/services/misdemeanor', icon: 'fa-balance-scale', title: 'Misdemeanor Bonds', desc: 'Professional misdemeanor bail bond services' },
    { path: '/services/secured', icon: 'fa-lock', title: 'Secured Bonds', desc: 'Secured bail bonds with flexible collateral options' },
    { path: '/services/surety', icon: 'fa-handshake', title: 'Surety Bail', desc: 'Surety bail bond solutions for all situations' },
    { path: '/services/fast-release', icon: 'fa-bolt', title: 'Fast Release Processing', desc: 'Expedited bail bond processing for quicker release' },
    { path: '/services/payment', icon: 'fa-credit-card', title: 'Flexible Payment Arrangements', desc: 'Customized payment plans to fit your budget' },
    { path: '/services/e-paperwork', icon: 'fa-laptop', title: 'Electronic Paperwork', desc: 'Digital documentation for faster, easier processing' },
  ];

  return (
    <div className="page-container">
      <section className="services-hero">
        <div className="container">
          <div className="gold-divider"></div>
          <h1>Bail Bond Services — New Castle & Kent County</h1>
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
              Complete Bail Bond Services — secured bail, felony bonds, misdemeanor bonds, 
              surety bail, fast release, confidential process, no hidden fees, 24/7 service
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
      title: 'Felony & Misdemeanor Bonds',
      description: 'Professional felony and misdemeanor bail bond services in Delaware. When facing serious or minor charges, you need an experienced bail bondsman who understands the complexity of all case types.',
      hero: 'Felony & Misdemeanor Bail Bonds in Delaware',
      benefits: [
        'Expert handling of all felony and misdemeanor classifications',
        'Experience with Delaware court procedures',
        '24/7 availability for urgent situations',
        'Confidential and professional service',
        'Understanding of felony and misdemeanor sentencing implications'
      ],
      who: [
        'Defendants charged with Class A, B, C, D, or E felonies',
        'Individuals facing misdemeanor charges',
        'Those needing bond amounts posted for any charge type',
        'Families seeking quick release for loved ones'
      ],
      needs: [
        'Valid photo identification',
        'Social Security number',
        'Employment information',
        'Financial information for collateral',
        'Basic case information from arrest'
      ]
    },
    misdemeanor: {
      title: 'Misdemeanor Bonds',
      description: 'Fast and reliable misdemeanor bail bond services throughout Delaware. We handle all misdemeanor classifications with professionalism and care.',
      hero: 'Misdemeanor Bail Bonds in Delaware',
      benefits: [
        'Quick release for misdemeanor charges',
        'Lower bond amounts typically required',
        'Simple paperwork process',
        'Flexible payment options',
        'Expert guidance through the process'
      ],
      who: [
        'Defendants charged with misdemeanors',
        'Individuals facing DUI/DWI charges',
        'Those with traffic-related offenses',
        'Anyone needing quick release'
      ],
      needs: [
        'Photo identification',
        'Basic personal information',
        'Contact information',
        'Case details from arrest'
      ]
    },
    secured: {
      title: 'Secured Bonds',
      description: 'Secured bail bonds using collateral to secure the bond. We offer flexible options for those who need to provide assets as security.',
      hero: 'Secured Bail Bonds in Delaware',
      benefits: [
        'Accept various forms of collateral',
        'Property, vehicles, and assets accepted',
        'Flexible repayment options',
        'Lower upfront costs possible',
        'Professional asset management'
      ],
      who: [
        'Those without sufficient cash for bond',
        'Individuals with property or assets',
        'Defendants needing larger bonds',
        'Anyone seeking flexible terms'
      ],
      needs: [
        'Proof of ownership for collateral',
        'Property documents or titles',
        'Vehicle registration',
        'Financial documentation'
      ]
    },
    surety: {
      title: 'Surety Bail',
      description: 'Surety bail bonds with professional backing. We work as the surety to guarantee the defendant\'s appearance in court.',
      hero: 'Surety Bail Bonds in Delaware',
      benefits: [
        'Professional surety guarantee',
        'No collateral required in many cases',
        'Quick processing and release',
        'Flexible terms and conditions',
        'Experienced bail bond agents'
      ],
      who: [
        'Defendants with good credit history',
        'Those with stable employment',
        'Individuals with prior court appearances',
        'Anyone needing surety bond services'
      ],
      needs: [
        'Credit check authorization',
        'Employment verification',
        'Personal references',
        'Signed indemnity agreement'
      ]
    },
    'fast-release': {
      title: 'Fast Release Processing',
      description: 'Expedited bail bond processing to get your loved one out of jail as quickly as possible. Our priority is speed and efficiency.',
      hero: 'Fast Release Processing in Delaware',
      benefits: [
        'Same-day release processing',
        '24/7 emergency service',
        'Direct contact with jail facilities',
        'Electronic filing for faster processing',
        'Experienced in Delaware procedures'
      ],
      who: [
        'Anyone needing quick jail release',
        'Families waiting for loved ones',
        'Those with time-sensitive situations',
        'Individuals in distant facilities'
      ],
      needs: [
        'Jail location and inmate number',
        'Bond amount information',
        'Contact information',
        'Basic paperwork completion'
      ]
    },
    payment: {
      title: 'Flexible Payment Arrangements',
      description: 'Customized payment plans designed to make bail bonds affordable. We work with you to find a payment solution that fits your budget.',
      hero: 'Flexible Payment Plans in Delaware',
      benefits: [
        'Customized payment schedules',
        'Low upfront payments',
        'No hidden fees',
        'Flexible financing options',
        'Online payment available'
      ],
      who: [
        'Anyone needing affordable options',
        'Families facing financial constraints',
        'Those without full bond amount',
        'Individuals seeking payment flexibility'
      ],
      needs: [
        'Income verification',
        'Bank account information',
        'Proof of residence',
        'Signed payment agreement'
      ]
    },
    'e-paperwork': {
      title: 'Electronic Paperwork',
      description: 'Digital documentation and electronic filing for faster, more convenient bail bond processing. Complete paperwork from anywhere.',
      hero: 'Electronic Paperwork Services in Delaware',
      benefits: [
        'Complete paperwork from home',
        'Faster processing times',
        'Secure digital signatures',
        'Email and text notifications',
        'Eco-friendly process'
      ],
      who: [
        'Those unable to visit in person',
        'Out-of-state family members',
        'Individuals with busy schedules',
        'Anyone preferring digital options'
      ],
      needs: [
        'Email address for documentation',
        'Smartphone or computer access',
        'Valid ID for digital verification',
        'Digital signature capability'
      ]
    }
  };

  const service = servicesData[serviceKey];

  if (!service) {
    return <div className="page-container"><div className="container py-5"><h2>Service not found</h2></div></div>;
  }

  useSEO(
    `${service.title} | A Way to Freedom Bail Bonds Delaware`,
    service.description + ' Serving Wilmington, Newark, Delaware and surrounding areas.',
    `${service.title.toLowerCase()}, Delaware bail bonds, ${serviceKey} bail bonds, New Castle County bail, Kent County bail`
  );

  return (
    <div className="page-container">
      <section className="service-detail-hero">
        <div className="container">
          <a href="#/services" onClick={(e) => {e.preventDefault(); navigate('/services');}} className="back-link">
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
              <p className="lead">{service.description}</p>

              <div className="detail-section">
                <h3>Benefits of Our {service.title}</h3>
                <ul className="benefits-list">
                  {service.benefits.map((benefit, i) => (
                    <li key={i}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h3>Who This Service Is For</h3>
                <ul className="requirements-list">
                  {service.who.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="detail-section">
                <h3>What You\'ll Need</h3>
                <ul className="requirements-list">
                  {service.needs.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sidebar-widget">
                <h4><i className="fas fa-clock me-2"></i>24/7 Availability</h4>
                <p style={{color: 'var(--text-light-secondary)', fontSize: '0.9rem'}}>
                  We're available around the clock to help you with your bail bond needs.
                </p>
              </div>

              <div className="sidebar-widget">
                <h4><i className="fas fa-shield-alt me-2"></i>Licensed & Confidential</h4>
                <p style={{color: 'var(--text-light-secondary)', fontSize: '0.9rem'}}>
                  Fully licensed bail bond services with complete confidentiality guaranteed.
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
          <h2>Need {service.title}? We Can Help!</h2>
          <p style={{color: 'var(--text-light-secondary)', marginBottom: '1.5rem'}}>
            Contact us now for fast, professional assistance in Wilmington & Newark, Delaware
          </p>
          <a href="tel:+17024478550" className="btn-primary-gold me-2 mb-2">
            <i className="fas fa-phone-alt me-2"></i>(702) 447-8550
          </a>
          <a href="#/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline mb-2">
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
    'about bail bonds, Simone Harris bail bonds, Delaware bail bonds agent, Newark Delaware bail help'
  );

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
                &quot;Not Just Another Bail Bonds Agent – A Mother Who Cares&quot;
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
                  When you work with A Way to Freedom Bail Bonds, you're not just another case — you're treated with the care, urgency, and professionalism you deserve.
                </p>
                <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-light-secondary)', marginBottom: '2rem' }}>
                  We proudly serve clients throughout Wilmington, Newark, New Castle County, and Kent County, Delaware, and we are available 24 hours a day, 7 days a week to help families in their time of need.
                </p>

                <div className="d-flex gap-3 justify-content-center flex-wrap">
                  <a href="tel:+17024478550" className="btn-primary-gold">
                    <i className="fas fa-phone-alt me-2"></i>Call Us Now
                  </a>
                  <a
                    href="#/contact"
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
                bond agent provides the bond on your behalf for a fee (typically 10-15% of the bail amount).
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
                <a href="#/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline w-100">
                  Contact Us
                </a>
              </div>

              <div className="sidebar-widget mt-4">
                <h4>Related Services</h4>
                <ul className="category-list">
                  <li><a href="#/services/felony" onClick={(e) => {e.preventDefault(); navigate('/services/felony');}}>Felony & Misdemeanor Bonds</a></li>
                  <li><a href="#/services/misdemeanor" onClick={(e) => {e.preventDefault(); navigate('/services/misdemeanor');}}>Misdemeanor Bonds</a></li>
                  <li><a href="#/services/fast-release" onClick={(e) => {e.preventDefault(); navigate('/services/fast-release');}}>Fast Release Processing</a></li>
                  <li><a href="#/services/payment" onClick={(e) => {e.preventDefault(); navigate('/services/payment');}}>Payment Plans</a></li>
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
          "text": "In Delaware, bail bond premiums are typically 10-15% of the total bail amount. This fee is non-refundable and covers the cost of the bail bondsman guaranteeing the full bond amount to the court."
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
        "name": "Do you serve all of Delaware?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we serve all of New Castle County and Kent County, Delaware, including Newark, Wilmington, Dover, and surrounding areas."
        }
      }
    ]
  };

  injectSchema(faqSchema);

  const faqs = [
    {
      question: "How much does a bail bond cost in Delaware?",
      answer: "In Delaware, bail bond premiums are typically 10-15% of the total bail amount. This fee is non-refundable and covers the cost of the bail bondsman guaranteeing the full bond amount to the court."
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
      question: "Do you serve all of Delaware?",
      answer: "Yes, we serve all of New Castle County and Kent County, Delaware, including Newark, Wilmington, Dover, and surrounding areas."
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
    slug: 'how-bail-bonds-work-delaware',
    title: 'How Bail Bonds Work in Delaware (Step-by-Step for Families)',
    excerpt: 'Understanding the bail bond process in Delaware can help families navigate this stressful time with confidence. Learn the step-by-step process.',
    category: 'Bail Process',
    readTime: '8 min read',
    date: '2026-03-05',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=300&fit=crop',
    content: `
Understanding the Bail Bond Process in Delaware

When a loved one is arrested in Newark, Delaware or anywhere in New Castle County or Kent County, the stress can be overwhelming. Understanding how bail bonds work can help you make informed decisions during this difficult time.

What Is a Bail Bond?

A bail bond is a financial guarantee posted to the court that ensures the defendant will appear for all scheduled court dates. When someone is arrested, a judge sets a bail amount based on various factors including the severity of the alleged crime, criminal history, and flight risk.

In Delaware, bail amounts can range from a few hundred dollars to hundreds of thousands of dollars depending on the charges. For many families, paying the full bail amount is not possible, which is where a bail bond comes in.

How the Bail Bond Process Works

Step 1: Contact a Bail Bondsman
The first step is to contact a licensed bail bond agency like A Way to Freedom Bail Bonds. We'll gather basic information about the defendant and the case.

Step 2: Pay the Premium
Bail bond premiums in Delaware are typically 10-15% of the total bail amount. This fee is non-refundable and is the cost of the bail bondsman guaranteeing the full bail amount to the court.

Step 3: Complete Paperwork
You'll need to sign a bail bond agreement and provide necessary documentation. At A Way to Freedom, we offer electronic paperwork to make this process faster and more convenient.

Step 4: Release from Custody
Once the paperwork is complete and the premium is paid, we post the bail bond with the court. The defendant is then released from custody, typically within a few hours to 24-48 hours depending on the facility.

Important Considerations

- Non-Refundable Premium: The premium you pay for a bail bond is never refunded, even if the charges are dropped.
- Collateral: Depending on the bail amount, collateral may be required to secure the bond.
- Defendant Responsibilities: The defendant must appear at all court dates or the bail may be forfeited.

Getting Help in Newark, Delaware

If you're facing a bail situation in Newark, Delaware or any surrounding area, contact A Way to Freedom Bail Bonds. We're available 24/7 to help you through this process with compassion and professionalism.

Serving New Castle County & Kent County, Delaware.

Disclaimer: This information is for educational purposes only and does not constitute legal advice. For specific legal questions, please consult with a licensed attorney in Delaware.
    `
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
- Lower premium costs (usually 10% of bail amount)

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
- Higher premium costs (typically 10-15% of bail amount)

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

- Pay only 10-15% of the bail amount
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
    slug: 'payment-options-bail-bonds',
    title: 'Payment Options for Bail Bonds: Making Bail Affordable',
    excerpt: 'Learn about flexible payment plans and options available for bail bonds in Delaware.',
    category: 'Payment Options',
    readTime: '6 min read',
    date: '2026-03-09',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop',
    content: `
Payment Options for Bail Bonds

Paying for a bail bond doesn't have to be overwhelming. At A Way to Freedom Bail Bonds, we offer flexible payment options to make bail affordable for families.

Standard Payment Structure

Bail Bond PremiumThe premium is typically 10-15% of the total bail amount. This is a non-refundable fee paid to the bail bondsman for guaranteeing the full bail amount.

Example:- Bail amount: $10,000
- Premium (10%): $1,000
- You pay: $1,000 (not the full $10,000)

Payment Options Available

1. Full PaymentPay the entire premium upfront for immediate processing. This is the fastest option.

2. Payment PlansWe offer flexible payment plans that work with your budget:
- Down payment required (typically 20-30% of premium)
- Monthly installments
- Flexible terms
- No hidden fees

3. Collateral OptionsFor larger bail amounts, we may accept:
- Property (real estate)
- Vehicles
- Valuable assets
- Bank accounts
- Co-signers

What You'll Need

For Payment:- Valid ID
- Proof of income
- Bank statements (for payment plans)
- Employment information

For Collateral:- Property deeds
- Vehicle titles
- Asset documentation
- Co-signer information

Understanding the Costs

Premium Fee:- This is the service fee (10-15% of bail)
- Non-refundable
- Covers the bond guarantee

Additional Costs:- Court fees (if applicable)
- Processing fees (minimal)
- No hidden charges

What's NOT Included:- Legal fees
- Court costs
- Attorney fees

Tips for Affording Bail

1. Act QuicklyThe faster you act, the more options you have. Contact us immediately after bail is set.

2. Be HonestTell us about your financial situation. We'll work with you to find a solution.

3. Consider Co-SignersA co-signer can help secure the bond and may provide additional payment options.

4. Ask About DiscountsSome situations may qualify for reduced premiums. Always ask.

Why Choose A Way to Freedom

Transparent Pricing:- No hidden fees
- Clear payment terms
- Upfront cost breakdown

Flexible Options:- Payment plans available
- Multiple payment methods
- Understanding of financial constraints

Compassionate Service:- We understand financial stress
- Work with families, not against them
- Available 24/7 to discuss options

Getting Started

If you need help with bail bond payments, contact Muhammad Zeeshan at A Way to Freedom Bail Bonds. We'll:

- Assess your situation
- Explain all payment options
- Create a plan that works for you
- Process your bond quickly

Call us 24/7 at (702) 447-8550. We're here to help make bail affordable.

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
                      alt={`${post.title} - Newark Delaware bail bonds`}
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
                <a href="#/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline w-100">
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
  const post = blogPosts.find(p => p.slug === slug);

  useSEO(
    post ? `${post.title} | A Way to Freedom Bail Bonds` : 'Blog Post Not Found',
    post ? post.excerpt : 'The requested blog post could not be found.',
    'bail bonds, Delaware bail, Newark Delaware'
  );

  if (!post) {
    return (
      <div className="page-container">
        <div className="container py-5 text-center">
          <h1>Post Not Found</h1>
          <p style={{color: 'var(--text-light-secondary)'}}>The blog post you're looking for doesn't exist.</p>
          <a href="#/blog" onClick={(e) => {e.preventDefault(); navigate('/blog');}} className="btn-primary-gold">
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  // Parse content for TOC - Get all headings (## only, ### removed)
  const allHeadings = post.content.match(/^##\s+(.+)$/gm) || [];
  const tocItems = allHeadings.map(h => {
    const level = h.match(/^#+/)[0].length;
    const text = h.replace(/^#+\s+/, '');
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return { text, id, level };
  });

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image || "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop",
    "author": {
      "@type": "Person",
      "name": "Muhammad Zeeshan",
      "jobTitle": "Licensed Bail Bond Agent",
      "worksFor": {
        "@type": "Organization",
        "name": "A Way to Freedom Bail Bonds"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "A Way to Freedom Bail Bonds",
      "logo": {
        "@type": "ImageObject",
        "url": "https://example.com/logo.png"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Newark",
        "addressRegion": "DE",
        "addressCountry": "US"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-702-447-8550",
        "contactType": "Customer Service",
        "areaServed": "US",
        "availableLanguage": "English"
      }
    },
    "datePublished": post.date,
    "dateModified": post.date,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://awaytofreedombailbonds.com/blog/${post.slug}`
    },
    "articleSection": post.category,
    "keywords": `bail bonds, ${post.category}, Delaware bail, Newark Delaware, ${post.title}`,
    "wordCount": post.content.split(/\s+/).length,
    "timeRequired": post.readTime
  };

  injectSchema(blogPostSchema);

  // Render content with anchor IDs
  const renderContent = () => {
    return post.content.split('\n').map((line, i) => {
      // All markdown headings removed - render as regular paragraphs
      if (line.startsWith('- ')) {
        return <li key={i}>{line.replace('- ', '')}</li>;
      }
      if (line.trim() === '---') {
        return <hr key={i} style={{borderColor: 'var(--border-color)', margin: '2rem 0'}} />;
      }
      if (line.trim() === '') return null;
      return <p key={i}>{line}</p>;
    });
  };

  return (
    <div className="page-container">
      <section className="blog-post-hero">
        <div className="container">
          <a href="#/blog" onClick={(e) => {e.preventDefault(); navigate('/blog');}} className="back-link">
            <i className="fas fa-arrow-left"></i> Back to Blog
          </a>
          <div className="blog-post-meta">
            <span className="blog-post-category">{post.category}</span>
            <span><i className="far fa-clock me-1"></i>{post.readTime}</span>
            <span><i className="far fa-calendar me-1"></i>{post.date}</span>
            <span><i className="far fa-user me-1"></i>Muhammad Zeeshan</span>
          </div>
          <h1 style={{fontSize: '2.5rem', marginBottom: '1.5rem'}}>{post.title}</h1>
        </div>
      </section>

      <section className="section-dark-alt">
        <div className="container">
          <div className="blog-post-layout">
            <article className="blog-post-content">
              <img 
                src={post.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=450&fit=crop'}
                alt={`${post.title} - Professional bail bond services in Newark Delaware`}
                className="blog-post-image"
              />

              {tocItems.length > 0 && (
                <div className="toc-box">
                  <h4><i className="fas fa-list me-2"></i>Table of Contents</h4>
                  <ul className="toc-list">
                    {tocItems.map((item, i) => (
                      <li key={i} className={`toc-item toc-level-${item.level}`}>
                        <a href={`#${item.id}`} onClick={(e) => {
                          e.preventDefault();
                          const element = document.getElementById(item.id);
                          if (element) {
                            element.scrollIntoView({behavior: 'smooth', block: 'start'});
                            window.history.pushState(null, '', `#${item.id}`);
                          }
                        }}>
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {renderContent()}

              <div className="blog-disclaimer">
                <strong>Disclaimer:</strong> This information is for educational purposes only 
                and does not constitute legal advice. For specific legal questions about your case, 
                please consult with a licensed attorney in Delaware.
              </div>
            </article>

            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h4>Categories</h4>
                <ul className="category-list">
                  <li><a href="#">Bail Process</a></li>
                  <li><a href="#">Delaware Bail Bonds</a></li>
                  <li><a href="#">Payment Options</a></li>
                  <li><a href="#">Court & Responsibilities</a></li>
                </ul>
              </div>

              <div className="sidebar-widget cta-widget">
                <h4>Need Help Now?</h4>
                <p>Available 24/7 for bail bond assistance in Delaware.</p>
                <a href="tel:+17024478550" className="btn-primary-gold w-100 mb-2">
                  <i className="fas fa-phone-alt me-2"></i>Call (702) 447-8550
                </a>
                <a href="#/contact" onClick={(e) => {e.preventDefault(); navigate('/contact');}} className="btn-secondary-outline w-100">
                  Contact Us
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="related-posts section-dark">
        <div className="container">
          <h3 className="text-center mb-4">Related Posts</h3>
          <div className="row">
            {blogPosts.filter(p => p.slug !== slug).slice(0, 2).map((relatedPost) => (
              <div className="col-md-6" key={relatedPost.slug}>
                <article className="blog-card">
                  <div className="blog-card-content">
                    <span className="blog-card-category">{relatedPost.category}</span>
                    <h4>
                      <a 
                        href={`#/blog/${relatedPost.slug}`}
                        onClick={(e) => {e.preventDefault(); navigate(`/blog/${relatedPost.slug}`);}}
                      >
                        {relatedPost.title}
                      </a>
                    </h4>
                    <p className="blog-card-excerpt">{relatedPost.excerpt}</p>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-band">
        <div className="container">
          <h2>Need Bail Assistance?</h2>
          <p style={{color: 'var(--text-light-secondary)', marginBottom: '1.5rem'}}>We're here to help 24/7</p>
          <a href="tel:+17024478550" className="btn-primary-gold me-2 mb-2">
            <i className="fas fa-phone-alt me-2"></i>Call (702) 447-8550
          </a>
          <a href="https://wa.me/13029819223?text=Hi%20Simone%2C%20I%20need%20help%20with%20bail%20bond%20services.%20Please%20let%20me%20know%20how%20you%20can%20assist%20me." target="_blank" rel="noopener noreferrer" className="btn-secondary-outline btn-whatsapp mb-2">
            <i className="fab fa-whatsapp me-2"></i>WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
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
    'contact bail bonds, Delaware bail bonds contact, Newark Delaware bail help'
  );

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
      // Google Apps Script ke liye no-cors mode use karte hain
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

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
            <p className="section-subtitle">Contact Simone Harris for Bail Bonds in Newark, Delaware</p>
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
// 404 PAGE
// ============================================
const NotFoundPage = ({ navigate }) => {
  useSEO(
    'Page Not Found | A Way to Freedom Bail Bonds',
    'The page you are looking for could not be found. A Way to Freedom Bail Bonds — 24/7 bail bond services in Wilmington, Newark, New Castle County, and Kent County, Delaware.'
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
                The page you&apos;re looking for doesn&apos;t exist or has been moved. We&apos;re here to help — get back on track or reach out for 24/7 bail bond assistance in Delaware.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
                <a href="#/home" onClick={(e) => { e.preventDefault(); navigate('/home'); }} className="btn btn-primary-gold">
                  <i className="fas fa-home me-2"></i>Back to Home
                </a>
                <a href="#/contact" onClick={(e) => { e.preventDefault(); navigate('/contact'); }} className="btn btn-outline-gold">
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
      const slug = currentPath.replace('/blog/', '');
      return <BlogPostPage slug={slug} navigate={navigate} />;
    }

    // Contact
    if (currentPath === '/contact') {
      return <ContactPage />;
    }

    // 404
    return <NotFoundPage navigate={navigate} />;
  };

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
