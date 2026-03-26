import React from 'react';

const SimoneAboutSection = () => {
  return (
    <>
      {/* ── What Are Bail Bonds in DE? ── */}
      <section className="about-section section-padding simone-page-about">
        <div className="container">
          <div className="text-center mb-4">
            <div className="section-ornament">✦ &nbsp; BAIL BONDS EXPLAINED &nbsp; ✦</div>
            <h2 className="section-title">
              What Are Bail Bonds in <span className="gold-text">DE?</span>
            </h2>
            <div className="section-gold-line"></div>
            <p className="section-subtitle">
              A bail bond helps a defendant get released from jail without paying the full bail amount upfront.
            </p>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <p style={{ color: 'var(--gray-text-simone)', fontSize: '1.08rem', lineHeight: '1.9' }}>
                A bail bond company posts the bond and helps families, co-signers, and defendants move forward with the release process. A Way to Freedom explains the steps clearly, helps with paperwork, and provides local support when fast action matters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Meet Simone Harris ── */}
      <section id="about" className="about-section section-padding simone-page-about" style={{ paddingTop: '0' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-4 mb-lg-0">
              <div className="about-image">
                <img
                  src="/images/simoneimg.webp"
                  alt="Simone Harris Bail Bond Agent Wilmington Newark Delaware - Professional Service"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="about-content ps-lg-5">
                <div className="section-ornament text-start" style={{ textAlign: 'left' }}>✦ &nbsp; MEET THE AGENT &nbsp; ✦</div>
                <h2 className="section-title" style={{ textAlign: 'left' }}>
                  Meet Simone Harris, Owner of <span className="gold-text">A Way to Freedom</span>
                </h2>
                <div className="section-gold-line" style={{ margin: '0.6rem 0 1.5rem 0' }}></div>
                <p>
                  Simone Harris is the owner of A Way to Freedom. She serves Wilmington, New Castle County, and nearby Delaware communities with trusted local emergency bail bond help.
                </p>
                <p>
                  As a mother and community member, she understands how stressful an arrest can be for families. She handles each case with compassion, urgency, and confidentiality, helping people take the next step with clear answers and respectful support.
                </p>
                <p style={{ color: 'var(--primary-gold)', fontStyle: 'italic', fontWeight: '500' }}>
                  More Than Just a Bail Bond Agent — A Professional Who Cares.
                </p>
                <ul className="about-features">
                  <li><i className="fas fa-check-circle"></i> Licensed &amp; Experienced Bail Bond Agent</li>
                  <li><i className="fas fa-check-circle"></i> Serving Newark, Delaware &amp; Surrounding Areas</li>
                  <li><i className="fas fa-check-circle"></i> Compassionate, Mother-Like Care</li>
                  <li><i className="fas fa-check-circle"></i> Fast &amp; Confidential Service</li>
                  <li><i className="fas fa-check-circle"></i> Flexible Payment Options</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SimoneAboutSection;
