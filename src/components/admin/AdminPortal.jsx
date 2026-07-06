import React, { useCallback, useEffect, useState } from 'react';
import {
  adminAddContact,
  adminDeleteContact,
  adminSignIn,
  adminSignOut,
  adminUpdateContact,
  adminUpdateStatus,
  fetchContacts,
  getAdminSession,
} from '../../lib/supabase';
import './AdminPortal.css';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'resolved', label: 'Resolved' },
  { value: 'archived', label: 'Archived' },
];

function formatDate(value) {
  if (!value) return '—';
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatStatusLabel(status) {
  return String(status || '')
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function getInitials(name) {
  return String(name || 'U')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
}

export default function AdminPortal() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const [formMode, setFormMode] = useState({ kind: 'closed' }); // 'closed' | 'add' | {kind:'edit', record}
  const [detail, setDetail] = useState(null);
  const [savedMessage, setSavedMessage] = useState('');

  const loadData = useCallback(async () => {
    setLoadingData(true);
    setError('');
    try {
      setContacts(await fetchContacts());
    } catch {
      setError('Could not load submissions.');
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    getAdminSession()
      .then((session) => {
        if (session) {
          setAuthenticated(true);
          loadData();
        }
      })
      .finally(() => setCheckingSession(false));
  }, [loadData]);

  async function login(event) {
    event.preventDefault();
    setError('');
    const result = await adminSignIn(email, password);
    if (!result.ok) {
      setError(result.error || 'Incorrect email or password.');
      return;
    }
    setAuthenticated(true);
    await loadData();
  }

  async function logout() {
    await adminSignOut();
    setAuthenticated(false);
    setEmail('');
    setPassword('');
    setContacts([]);
  }

  async function saveEntry(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = Object.fromEntries(new FormData(form).entries());
    try {
      if (formMode.kind === 'add') {
        await adminAddContact(fields);
        setSavedMessage('Submission added successfully.');
      } else if (formMode.kind === 'edit') {
        await adminUpdateContact(formMode.record.id, fields);
        setSavedMessage('Submission updated successfully.');
      }
      await loadData();
      window.setTimeout(() => {
        setFormMode({ kind: 'closed' });
        setSavedMessage('');
      }, 800);
    } catch {
      setSavedMessage('Could not save. Please try again.');
    }
  }

  async function changeStatus(id, status) {
    try {
      await adminUpdateStatus(id, status);
      setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, status } : c)));
    } catch {
      setError('Could not update status.');
    }
  }

  async function deleteRecord(id, name) {
    if (!window.confirm(`Delete submission from ${name || 'this contact'}? This cannot be undone.`)) return;
    try {
      await adminDeleteContact(id);
      if (detail?.id === id) setDetail(null);
      await loadData();
    } catch {
      setError('Could not delete submission.');
    }
  }

  const total = contacts.length;
  const newCount = contacts.filter((c) => c.status === 'new').length;
  const resolvedCount = contacts.filter((c) => c.status === 'resolved').length;

  const filtered = contacts.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      const hay = `${c.name || ''} ${c.email || ''} ${c.phone || ''} ${c.inmate_name || ''} ${c.subject || ''} ${c.message || ''}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  if (checkingSession) {
    return (
      <div className="bbadmin-boot">
        <span className="bbadmin-boot__spinner" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <main className="bbadmin-login">
        <div className="bbadmin-login__glow bbadmin-login__glow--one" />
        <div className="bbadmin-login__glow bbadmin-login__glow--two" />
        <form className="bbadmin-login__card" onSubmit={login}>
          <div className="bbadmin-login__brand">
            <span className="bbadmin-login__mark">A2F</span>
            <span>
              A WAY TO FREEDOM <strong>BAIL BONDS</strong>
            </span>
          </div>
          <span className="bbadmin-login__eyebrow">SECURE ADMIN PORTAL</span>
          <h1>Welcome back</h1>
          <p>Sign in with your Supabase admin account.</p>

          <label htmlFor="bbadmin-email">Admin email</label>
          <input
            id="bbadmin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@yourdomain.com"
            autoComplete="username"
            required
          />
          <label htmlFor="bbadmin-password">Password</label>
          <input
            id="bbadmin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
          {error && <span className="bbadmin-login__error">{error}</span>}
          <button type="submit">
            LOGIN TO DASHBOARD <span aria-hidden>→</span>
          </button>
          <small>Authorized personnel only</small>
        </form>
      </main>
    );
  }

  return (
    <main className="bbadmin-shell">
      <header className="bbadmin-topbar">
        <div className="bbadmin-brand">
          <span className="bbadmin-brand__mark">A2F</span>
          <div>
            <strong>Bail Bonds <span>Admin</span></strong>
            <small>CONTACT SUBMISSIONS</small>
          </div>
        </div>
        <div className="bbadmin-topbar__actions">
          <button type="button" className="bbadmin-btn-ghost" onClick={loadData}>
            ↻ Refresh
          </button>
          <button type="button" className="bbadmin-btn-primary" onClick={() => setFormMode({ kind: 'add' })}>
            + Add Entry
          </button>
          <button type="button" className="bbadmin-btn-logout" onClick={logout}>
            Log out
          </button>
        </div>
      </header>

      <div className="bbadmin-content">
        {error && <p className="bbadmin-banner-error">{error}</p>}

        <section className="bbadmin-stats" aria-label="Overview">
          <div className="bbadmin-stat">
            <span className="bbadmin-stat__icon">📥</span>
            <div>
              <span>Total Submissions</span>
              <strong>{total}</strong>
            </div>
          </div>
          <div className="bbadmin-stat bbadmin-stat--gold">
            <span className="bbadmin-stat__icon">🆕</span>
            <div>
              <span>New / Unread</span>
              <strong>{newCount}</strong>
            </div>
          </div>
          <div className="bbadmin-stat bbadmin-stat--green">
            <span className="bbadmin-stat__icon">✅</span>
            <div>
              <span>Resolved</span>
              <strong>{resolvedCount}</strong>
            </div>
          </div>
        </section>

        <div className="bbadmin-toolbar">
          <input
            className="bbadmin-search"
            type="search"
            placeholder="Search name, email, phone, inmate…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="bbadmin-filter">
            <button
              type="button"
              className={statusFilter === 'all' ? 'active' : ''}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.value}
                type="button"
                className={statusFilter === s.value ? 'active' : ''}
                onClick={() => setStatusFilter(s.value)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <article className="bbadmin-card">
          <header className="bbadmin-card__head">
            <h2>Contact Form Submissions</h2>
            <p>{filtered.length} record{filtered.length === 1 ? '' : 's'}</p>
          </header>

          {loadingData && <p className="bbadmin-loading">Loading submissions…</p>}

          <div className="bbadmin-table-scroll">
            <div className="bbadmin-table">
              <div className="bbadmin-table__head">
                <span>Name</span>
                <span>Contact</span>
                <span>Inmate</span>
                <span>Subject</span>
                <span>Message</span>
                <span>Received</span>
                <span>Status</span>
                <span>Actions</span>
              </div>
              {!loadingData && filtered.length === 0 ? (
                <p className="bbadmin-empty">No submissions found.</p>
              ) : (
                filtered.map((c, index) => (
                  <div className="bbadmin-table__row" key={c.id}>
                    <span className={`bbadmin-person bbadmin-person--${(index % 4) + 1}`}>
                      <b>{getInitials(c.name)}</b>
                      <span className="bbadmin-person__name">{c.name || '—'}</span>
                    </span>
                    <span className="bbadmin-stacked">
                      <a href={c.phone ? `tel:${c.phone}` : undefined}>{c.phone || '—'}</a>
                      <small>{c.email || '—'}</small>
                    </span>
                    <span>{c.inmate_name || '—'}</span>
                    <span>{c.subject || '—'}</span>
                    <span className="bbadmin-message-cell">{c.message || '—'}</span>
                    <span>{formatDate(c.created_at)}</span>
                    <span>
                      <select
                        className={`bbadmin-status-select bbadmin-status--${c.status}`}
                        value={c.status}
                        onChange={(e) => changeStatus(c.id, e.target.value)}
                        aria-label="Change status"
                      >
                        {STATUS_OPTIONS.map((s) => (
                          <option key={s.value} value={s.value}>
                            {s.label}
                          </option>
                        ))}
                      </select>
                    </span>
                    <span className="bbadmin-row-actions">
                      <button type="button" onClick={() => setDetail(c)}>Detail</button>
                      <button type="button" onClick={() => setFormMode({ kind: 'edit', record: c })}>Edit</button>
                      <button type="button" className="danger" onClick={() => deleteRecord(c.id, c.name)}>Delete</button>
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </article>
      </div>

      {formMode.kind !== 'closed' && (
        <EntryModal
          mode={formMode}
          savedMessage={savedMessage}
          onClose={() => {
            setFormMode({ kind: 'closed' });
            setSavedMessage('');
          }}
          onSubmit={saveEntry}
        />
      )}

      {detail && <DetailModal contact={detail} onClose={() => setDetail(null)} />}
    </main>
  );
}

function Field({ label, children, full = false }) {
  return (
    <label className={full ? 'bbadmin-modal__field--full' : undefined}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function EntryModal({ mode, savedMessage, onClose, onSubmit }) {
  const isEdit = mode.kind === 'edit';
  const r = isEdit ? mode.record : null;

  return (
    <div className="bbadmin-modal" role="dialog" aria-modal="true">
      <button className="bbadmin-modal__backdrop" type="button" aria-label="Close form" onClick={onClose} />
      <form className="bbadmin-modal__panel" onSubmit={onSubmit} key={r?.id || 'new'}>
        <header>
          <div>
            <small>{isEdit ? 'UPDATE RECORD' : 'NEW RECORD'}</small>
            <h2>{isEdit ? 'Edit Submission' : 'Add Submission'}</h2>
          </div>
          <button type="button" aria-label="Close form" onClick={onClose}>×</button>
        </header>

        <div className="bbadmin-modal__grid">
          <Field label="Full Name">
            <input name="name" placeholder="Enter full name" defaultValue={r?.name || ''} required />
          </Field>
          <Field label="Phone">
            <input name="phone" type="tel" placeholder="(702) 447-8550" defaultValue={r?.phone || ''} />
          </Field>
          <Field label="Email">
            <input name="email" type="email" placeholder="name@example.com" defaultValue={r?.email || ''} />
          </Field>
          <Field label="Subject">
            <input name="subject" placeholder="Reason for contact" defaultValue={r?.subject || ''} />
          </Field>
          <Field label="Inmate Name">
            <input name="inmateName" placeholder="Defendant / inmate name" defaultValue={r?.inmate_name || ''} />
          </Field>
          <Field label="Date of Birth">
            <input name="dateOfBirth" placeholder="MM/DD/YYYY" defaultValue={r?.date_of_birth || ''} />
          </Field>
          <Field label="Status">
            <select name="status" defaultValue={r?.status || 'new'}>
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Message" full>
            <textarea name="message" rows={4} placeholder="Message / details" defaultValue={r?.message || ''} />
          </Field>
        </div>

        {savedMessage && <p className="bbadmin-modal__success">{savedMessage}</p>}

        <footer>
          <button type="button" onClick={onClose}>Cancel</button>
          <button type="submit">{isEdit ? 'Save Changes' : 'Add Submission'}</button>
        </footer>
      </form>
    </div>
  );
}

function DetailModal({ contact, onClose }) {
  const rows = [
    ['Full Name', contact.name],
    ['Phone', contact.phone],
    ['Email', contact.email],
    ['Subject', contact.subject],
    ['Inmate Name', contact.inmate_name],
    ['Date of Birth', contact.date_of_birth],
    ['Status', formatStatusLabel(contact.status)],
    ['Source', formatStatusLabel(contact.source)],
    ['Received On', formatDate(contact.created_at)],
  ];

  return (
    <div className="bbadmin-modal" role="dialog" aria-modal="true">
      <button className="bbadmin-modal__backdrop" type="button" aria-label="Close details" onClick={onClose} />
      <div className="bbadmin-modal__panel">
        <header>
          <div>
            <small>CONTACT SUBMISSION</small>
            <h2>{contact.name || 'Unnamed'}</h2>
          </div>
          <button type="button" aria-label="Close details" onClick={onClose}>×</button>
        </header>

        <div className="bbadmin-detail-grid">
          {rows.map(([label, value]) => (
            <div className="bbadmin-detail-item" key={label}>
              <span>{label}</span>
              <strong>{value || '—'}</strong>
            </div>
          ))}
          <div className="bbadmin-detail-item bbadmin-detail-item--full">
            <span>Message</span>
            <div className="bbadmin-detail-scroll">
              <p>{contact.message || '—'}</p>
            </div>
          </div>
        </div>

        <footer>
          <button type="button" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
}
