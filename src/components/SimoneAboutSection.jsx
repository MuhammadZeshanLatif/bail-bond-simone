import React from 'react';

const SimoneAboutSection = () => {
  return (
    <section id="about" className="about-section section-padding simone-page-about">
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
              <h2 className="section-title">
                About <span className="gold-text">Simone Harris</span>
              </h2>
              <p className="section-subtitle">Your Trusted Bail Bond Agent Serving Wilmington, New Castle County & Kent County, Delaware</p>
              <h3>More Than Just a Bail Bonds Agent – A Professional Who Cares</h3>
              <p>
                Simone Harris proudly serves Wilmington, New Castle County, and Kent County, Delaware as a compassionate and dependable bail bond agent. She understands that when someone needs bail services, families are often facing one of the most stressful moments of their lives.
              </p>
              <p>
                As a mother and community member, Simone approaches every case with empathy, professionalism, and urgency. She knows that behind every case is a family waiting for their loved one to come home, which is why she treats every client with dignity, respect, and confidentiality.
              </p>
              <p>
                Whether you&apos;re facing a misdemeanor or felony charge, Simone Harris is available 24/7 to help guide you through the bail process quickly and professionally.
              </p>
              <p>
                Serving clients throughout Wilmington, Newark, New Castle County, and Kent County, Delaware.
              </p>
              <ul className="about-features">
                <li>
                  <i className="fas fa-check-circle"></i> Licensed &amp; Experienced Bail Bond Agent
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Serving Newark, Delaware &amp; Surrounding Areas
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Compassionate, Mother-Like Care
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Fast &amp; Confidential Service
                </li>
                <li>
                  <i className="fas fa-check-circle"></i> Flexible Payment Options
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimoneAboutSection;

