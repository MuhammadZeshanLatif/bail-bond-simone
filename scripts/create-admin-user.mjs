/**
 * One-time admin user setup for the /admin dashboard.
 *
 * Creates (or, if it already exists, updates the password of) a Supabase Auth
 * user so it can log into the admin dashboard.
 *
 * Uses the Supabase SECRET / service_role key — run LOCALLY only, never ship it.
 *
 * Usage (PowerShell):
 *   $env:SUPABASE_URL="https://iyaoylugxjhmblnlkjky.supabase.co"
 *   $env:SUPABASE_SECRET_KEY="sb_secret_..."
 *   $env:ADMIN_EMAIL="away2freedom302@gmail.com"
 *   $env:ADMIN_PASSWORD="away2freedom302"
 *   node scripts/create-admin-user.mjs
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!url || !secret || !email || !password) {
  console.error('Missing env: SUPABASE_URL, SUPABASE_SECRET_KEY, ADMIN_EMAIL, ADMIN_PASSWORD');
  process.exit(1);
}

const supabase = createClient(url, secret, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findUserByEmail(targetEmail) {
  let page = 1;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 });
    if (error) throw error;
    const found = data.users.find((u) => (u.email || '').toLowerCase() === targetEmail.toLowerCase());
    if (found) return found;
    if (data.users.length < 200) return null;
    page += 1;
  }
}

async function main() {
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (!error) {
    console.log(`✓ Created admin user: ${email} (id: ${data.user.id})`);
    return;
  }

  // Already exists → update its password instead
  console.log(`User exists (${error.message}). Updating password…`);
  const existing = await findUserByEmail(email);
  if (!existing) {
    console.error('Could not locate the existing user to update.');
    process.exit(1);
  }
  const upd = await supabase.auth.admin.updateUserById(existing.id, {
    password,
    email_confirm: true,
  });
  if (upd.error) {
    console.error('Update failed:', upd.error.message);
    process.exit(1);
  }
  console.log(`✓ Updated password for existing admin user: ${email} (id: ${existing.id})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
