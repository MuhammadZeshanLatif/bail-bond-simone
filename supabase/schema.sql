-- ============================================================
-- Delaware Bail Bond — Supabase Database Schema
-- Run this ENTIRE file in: Supabase Dashboard → SQL Editor → New query
--
-- Same Supabase project as water-now (iyaoylugxjhmblnlkjky).
-- This creates ONE new, dedicated table for the bail-bond contact form.
-- It does NOT touch water-now's tables.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- BAIL BOND CONTACT SUBMISSIONS
-- (Website contact form + admin manual entry)
-- ------------------------------------------------------------
create table if not exists public.bail_bond_contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  subject text,
  inmate_name text,
  date_of_birth text,
  message text,
  status text not null default 'new'
    check (status in ('new', 'in_progress', 'resolved', 'archived')),
  source text not null default 'website'
    check (source in ('website', 'admin_manual')),
  created_at timestamptz not null default now()
);

create index if not exists bail_bond_contacts_created_at_idx
  on public.bail_bond_contacts (created_at desc);
create index if not exists bail_bond_contacts_status_idx
  on public.bail_bond_contacts (status);

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY (RLS)
-- Public website: INSERT only (anon)
-- Admin dashboard: any logged-in Supabase Auth user gets full access
-- ------------------------------------------------------------
alter table public.bail_bond_contacts enable row level security;

drop policy if exists "anon_insert_bail_bond_contacts" on public.bail_bond_contacts;
create policy "anon_insert_bail_bond_contacts"
  on public.bail_bond_contacts for insert
  to anon, authenticated
  with check (true);

drop policy if exists "admin_all_bail_bond_contacts" on public.bail_bond_contacts;
create policy "admin_all_bail_bond_contacts"
  on public.bail_bond_contacts for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- OPTIONAL: dashboard stats (total + last 7 days)
-- ------------------------------------------------------------
create or replace view public.bail_bond_stats as
select
  (select count(*) from public.bail_bond_contacts) as contacts_total,
  (select count(*) from public.bail_bond_contacts where status = 'new') as contacts_new,
  (select count(*) from public.bail_bond_contacts
     where created_at >= now() - interval '7 days') as contacts_last_7_days;

grant select on public.bail_bond_stats to authenticated;
