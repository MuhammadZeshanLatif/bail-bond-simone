-- ============================================================
-- Delaware Bail Bond — Blog CMS schema
-- Run this ENTIRE file once in: Supabase Dashboard → SQL Editor → New query
--
-- Same Supabase project as the contact form (iyaoylugxjhmblnlkjky).
-- Creates one dedicated table + one image bucket for this site only.
-- Safe to re-run.
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- BLOG POSTS
-- status = 'draft'      → editors only
-- status = 'published'  → public once published_at <= now()
--   (a published row with a future published_at is a scheduled post;
--    RLS, the site, the PHP renderer and the sitemap all hide it until then,
--    so no cron job is needed)
-- ------------------------------------------------------------
create table if not exists public.bail_bond_blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  category text not null default 'Bail Guides',
  author text not null default 'Simone Harris',
  image text not null default '',
  image_alt text not null default '',
  og_image text,
  seo_title text,
  seo_description text,
  social_description text,
  primary_keyword text,
  secondary_keywords text[] not null default '{}',
  tags text[] not null default '{}',
  canonical_url text,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint bail_bond_blog_published_has_date check (status = 'draft' or published_at is not null)
);

create index if not exists bail_bond_blog_posts_public_idx
  on public.bail_bond_blog_posts (status, published_at desc);

create or replace function public.bail_bond_blog_touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists bail_bond_blog_posts_touch on public.bail_bond_blog_posts;
create trigger bail_bond_blog_posts_touch
  before update on public.bail_bond_blog_posts
  for each row execute function public.bail_bond_blog_touch_updated_at();

-- ------------------------------------------------------------
-- ROW LEVEL SECURITY
-- Public (anon): read only posts that are published AND due.
-- Admin (any logged-in Supabase Auth user, same as the contact dashboard): full access.
-- ------------------------------------------------------------
alter table public.bail_bond_blog_posts enable row level security;

drop policy if exists "public_read_live_bail_bond_blog_posts" on public.bail_bond_blog_posts;
create policy "public_read_live_bail_bond_blog_posts"
  on public.bail_bond_blog_posts for select
  to anon
  using (status = 'published' and published_at <= now());

drop policy if exists "admin_all_bail_bond_blog_posts" on public.bail_bond_blog_posts;
create policy "admin_all_bail_bond_blog_posts"
  on public.bail_bond_blog_posts for all
  to authenticated
  using (true)
  with check (true);

-- ------------------------------------------------------------
-- IMAGE BUCKET (public read, admin upload)
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('bail-bond-blog-images', 'bail-bond-blog-images', true)
on conflict (id) do update set public = true;

drop policy if exists "public_read_bail_bond_blog_images" on storage.objects;
create policy "public_read_bail_bond_blog_images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'bail-bond-blog-images');

drop policy if exists "admin_write_bail_bond_blog_images" on storage.objects;
create policy "admin_write_bail_bond_blog_images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'bail-bond-blog-images');

drop policy if exists "admin_update_bail_bond_blog_images" on storage.objects;
create policy "admin_update_bail_bond_blog_images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'bail-bond-blog-images');

drop policy if exists "admin_delete_bail_bond_blog_images" on storage.objects;
create policy "admin_delete_bail_bond_blog_images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'bail-bond-blog-images');
