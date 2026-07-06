import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let cachedClient = null;

export function getSupabase() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase URL or anon key. Check .env (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY).');
  }
  if (!cachedClient) {
    cachedClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'bailbond-admin-auth',
      },
    });
  }
  return cachedClient;
}

export function isSupabaseConfigured() {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

const TABLE = 'bail_bond_contacts';

function normalizeStatus(value) {
  return String(value || '').toLowerCase().replace(/\s+/g, '_');
}

// ------------------------------------------------------------
// PUBLIC — website contact form
// ------------------------------------------------------------
export async function submitContact(payload) {
  if (!isSupabaseConfigured()) {
    return { ok: false, error: 'Supabase is not configured.' };
  }
  if (!payload.name) {
    return { ok: false, error: 'Name is required.' };
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from(TABLE).insert({
      name: payload.name,
      phone: payload.phone || null,
      email: payload.email || null,
      subject: payload.subject || null,
      inmate_name: payload.inmateName || null,
      date_of_birth: payload.dateOfBirth || null,
      message: payload.message || null,
      status: 'new',
      source: 'website',
    });

    if (error) {
      console.error('bail_bond_contacts insert:', error.message);
      return { ok: false, error: 'Could not save your submission.' };
    }
    return { ok: true };
  } catch (err) {
    console.error(err);
    return { ok: false, error: 'Network error.' };
  }
}

// ------------------------------------------------------------
// ADMIN — auth
// ------------------------------------------------------------
export async function adminSignIn(email, password) {
  const supabase = getSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, error: 'Incorrect email or password.' };
  }
  return { ok: true };
}

export async function adminSignOut() {
  const supabase = getSupabase();
  await supabase.auth.signOut();
}

export async function getAdminSession() {
  const supabase = getSupabase();
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ------------------------------------------------------------
// ADMIN — data + CRUD
// ------------------------------------------------------------
export async function fetchContacts() {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) throw new Error('Could not load submissions.');
  return data || [];
}

export async function adminAddContact(fields) {
  const supabase = getSupabase();
  const { error } = await supabase.from(TABLE).insert({
    name: fields.name,
    phone: fields.phone || null,
    email: fields.email || null,
    subject: fields.subject || null,
    inmate_name: fields.inmateName || null,
    date_of_birth: fields.dateOfBirth || null,
    message: fields.message || null,
    status: normalizeStatus(fields.status || 'new'),
    source: 'admin_manual',
  });
  if (error) throw new Error('Could not add submission.');
}

export async function adminUpdateContact(id, fields) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from(TABLE)
    .update({
      name: fields.name,
      phone: fields.phone || null,
      email: fields.email || null,
      subject: fields.subject || null,
      inmate_name: fields.inmateName || null,
      date_of_birth: fields.dateOfBirth || null,
      message: fields.message || null,
      status: normalizeStatus(fields.status || 'new'),
    })
    .eq('id', id);
  if (error) throw new Error('Could not update submission.');
}

export async function adminUpdateStatus(id, status) {
  const supabase = getSupabase();
  const { error } = await supabase
    .from(TABLE)
    .update({ status: normalizeStatus(status) })
    .eq('id', id);
  if (error) throw new Error('Could not update status.');
}

export async function adminDeleteContact(id) {
  const supabase = getSupabase();
  const { error } = await supabase.from(TABLE).delete().eq('id', id);
  if (error) throw new Error('Could not delete submission.');
}
