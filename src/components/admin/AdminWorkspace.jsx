import React, { useEffect, useRef, useState } from 'react';
import './AdminWorkspace.css';

const Icon = ({ d }) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {d.map((path) => <path key={path} d={path} />)}
  </svg>
);

const ICONS = {
  dashboard: ['M3 3h7v9H3z', 'M14 3h7v5h-7z', 'M14 12h7v9h-7z', 'M3 16h7v5H3z'],
  blog: ['M12 20h9', 'M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z'],
  contacts: ['M22 12h-6l-2 3h-4l-2-3H2', 'M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z'],
  site: ['M7 17 17 7', 'M7 7h10v10'],
  collapse: ['M15 18l-6-6 6-6'],
  expand: ['M9 18l6-6-6-6'],
  logout: ['M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4', 'M16 17l5-5-5-5', 'M21 12H9'],
  menu: ['M3 12h18', 'M3 6h18', 'M3 18h18'],
  close: ['M18 6 6 18', 'M6 6l12 12'],
};

export const ADMIN_SECTIONS = [
  { id: 'dashboard', label: 'Dashboard', description: 'A quick view of your content and enquiries.', icon: 'dashboard', group: 'Workspace' },
  { id: 'blog', label: 'Blog Posts', description: 'Write, schedule, edit and publish blog posts.', icon: 'blog', group: 'Content' },
  { id: 'contacts', label: 'Contact Submissions', description: 'Review enquiries from the website contact form.', icon: 'contacts', group: 'Business' },
];

const COLLAPSE_KEY = 'a2f-admin-sidebar-collapsed';

export default function AdminWorkspace({ activeSection, onSectionChange, email, onSignOut, children }) {
  const [collapsed, setCollapsed] = useState(() => {
    try { return localStorage.getItem(COLLAPSE_KEY) === 'true'; } catch { return false; }
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const headingRef = useRef(null);
  const section = ADMIN_SECTIONS.find((item) => item.id === activeSection) || ADMIN_SECTIONS[0];

  useEffect(() => {
    try { localStorage.setItem(COLLAPSE_KEY, String(collapsed)); } catch { /* optional preference */ }
  }, [collapsed]);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
    headingRef.current?.focus({ preventScroll: true });
  }, [activeSection]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <div className={`aw-layout${collapsed ? ' aw-collapsed' : ''}${mobileOpen ? ' aw-mobile-open' : ''}`}>
      {mobileOpen && <button type="button" className="aw-backdrop" tabIndex={-1} aria-label="Close navigation" onClick={() => setMobileOpen(false)} />}
      <aside id="admin-navigation" className="aw-sidebar" aria-label="Admin navigation">
        <a className="aw-brand" href="/" aria-label="A Way to Freedom Bail Bonds home">
          <span className="aw-brand-mark">A2F</span>
          <span className="aw-nav-label"><strong>A Way to Freedom</strong><small>ADMIN WORKSPACE</small></span>
        </a>
        <button type="button" className="aw-mobile-close aw-icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><Icon d={ICONS.close} /></button>
        <nav className="aw-navigation" aria-label="Workspace sections">
          {ADMIN_SECTIONS.map((item, index) => (
            <div key={item.id}>
              {(index === 0 || ADMIN_SECTIONS[index - 1].group !== item.group) && <span className="aw-nav-group">{item.group}</span>}
              <button
                type="button"
                className={`aw-nav-item${activeSection === item.id ? ' is-active' : ''}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
                title={item.label}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon d={ICONS[item.icon]} /><span className="aw-nav-label">{item.label}</span>
                {activeSection === item.id && <span className="aw-active-dot" />}
              </button>
            </div>
          ))}
        </nav>
        <div className="aw-sidebar-bottom">
          <a href="/" target="_blank" rel="noreferrer" className="aw-nav-item" title="View website"><Icon d={ICONS.site} /><span className="aw-nav-label">View website</span></a>
          <button type="button" className="aw-nav-item aw-collapse-button" onClick={() => setCollapsed((value) => !value)} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            <Icon d={collapsed ? ICONS.expand : ICONS.collapse} /><span className="aw-nav-label">Collapse menu</span>
          </button>
          <div className="aw-account">
            <span className="aw-avatar" aria-hidden="true">{email?.charAt(0).toUpperCase() || 'A'}</span>
            <div className="aw-nav-label"><strong>Administrator</strong><span title={email}>{email}</span></div>
          </div>
          <button type="button" className="aw-nav-item aw-signout" onClick={onSignOut} title="Sign out">
            <Icon d={ICONS.logout} /><span className="aw-nav-label">Sign out</span>
          </button>
        </div>
      </aside>
      <div className="aw-main">
        <header className="aw-topbar">
          <button type="button" className="aw-mobile-menu aw-icon-button" onClick={() => setMobileOpen(true)} aria-label="Open menu" aria-expanded={mobileOpen} aria-controls="admin-navigation"><Icon d={ICONS.menu} /></button>
          <span>Workspace › <strong>{section.label}</strong></span>
          <a href="/" target="_blank" rel="noreferrer" className="aw-site-link">View website ↗</a>
        </header>
        <div className="aw-content">
          <header className="aw-page-heading">
            <span className="aw-eyebrow">YOUR CONTROL CENTRE</span>
            <h1 ref={headingRef} tabIndex={-1}>{section.label}</h1>
            <p>{section.description}</p>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}
