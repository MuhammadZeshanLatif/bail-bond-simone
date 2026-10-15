# Admin Dashboard — Setup

Contact-form submissions ka admin dashboard. Route: **`/admin`** (e.g. `https://delawarebailbond.com/admin`).

Same Supabase project as `water-now` (`iyaoylugxjhmblnlkjky`) — koi naya project nahi. Sirf ek dedicated table (`bail_bond_contacts`) is site ke liye.

---

## 1. Database table banao (ek baar)

Supabase Dashboard → **SQL Editor → New query** → poori file paste karke **Run**:

```
supabase/schema.sql
```

Ye `bail_bond_contacts` table + RLS policies + stats view banata hai. Water-now ki tables ko touch nahi karta.

## 2. Admin login user (ek baar)

Login **Supabase Auth** se hota hai. Do options:

- **Existing user use karo** — water-now wala admin (`away2freedom302@gmail.com`) same project me hai, wahi `/admin` par login karega.
- **Naya user banao** — Supabase Dashboard → **Authentication → Users → Add user** → email + password do (email confirm on rakhna). Wahi credentials `/admin` par kaam karenge.

## 3. Environment variables

`.env` (already set, public keys — browser-safe):

```
VITE_SUPABASE_URL=https://iyaoylugxjhmblnlkjky.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_DLwvuu3uikUAMKNRJK57KA_6QmQ4JVX
```

GitHub Actions / CI se build hota hai to yeh do vars build environment me bhi honi chahiye (agar `.env` commit nahi karte). `.env` me sirf **public** key hai — koi secret nahi, isliye commit karna safe hai.

---

## Kya kya milta hai

- **`/admin`** — standalone login screen (gold/dark theme, public navbar/footer nahi).
- Login ke baad: stats (Total / New / Resolved), search + status filter.
- Har submission: **Detail**, **Edit** (save), **Delete**, aur inline **status** change (New → In Progress → Resolved → Archived).
- **+ Add Entry** — manually submission add karo.

## Form flow

Website ka contact form ab **do jagah** jata hai:
1. **Supabase** `bail_bond_contacts` table → admin dashboard me dikhta hai.
2. **Google Apps Script** → email notification (pehle jaisa, unchanged).

Fields: Name, Phone, Email, Subject, Inmate Name, Date of Birth, Message + Status.

## Security note

- Public site sirf **INSERT** kar sakta hai (anon key + RLS).
- Read / Edit / Delete sirf **logged-in** admin (Supabase Auth) kar sakta hai.
- `/admin` `robots.txt` me disallow hai (search engines index nahi karenge).

---

## Blog Posts (admin CMS)

Admin ab sidebar workspace hai: **Dashboard**, **Blog Posts** (`/admin/blog`), **Contact Submissions** (`/admin/contacts`).

### Ek baar setup

Supabase SQL Editor me `supabase/blog-schema.sql` poori file run karo. Ye `bail_bond_blog_posts` table, RLS policies aur `bail-bond-blog-images` image bucket banata hai.

### Kaise kaam karta hai

- **Save draft**: sirf dashboard me dikhta hai; website/sitemap par nahi.
- **Publish now**: publish date = abhi ka waqt (article 5 din pehle likha ho to bhi aaj ki date aati hai).
- **Schedule**: future date/time chuno; us waqt post khud live ho jati hai (blog, post page aur sitemap me). Koi cron nahi chahiye.
- **Update article**: published post edit karne se date nahi badalti. **Republish now** date ko aaj kar deta hai. **Unpublish** wapas draft bana deta hai.
- Content Markdown ya HTML me. "Frequently Asked Questions" heading ke neeche `###` sawal automatically FAQ schema bante hain.
- Images upload par WebP me convert hokar Supabase Storage me jati hain.

### Website par

- `/blog` list me database ki live posts sabse upar aati hain.
- `/blog/<slug>` pehle prerendered static page dhoondta hai; na mile to `blog-router.php` Supabase se post la kar poora HTML (title, meta, canonical, OG, JSON-LD, article) server par render karta hai.
- `/sitemap.xml` → `sitemap.php`: static `sitemap.xml` + saari live database posts.
- Built-in (code wale) blogs ke slugs admin me dobara use nahi ho sakte.

### Code se draft daalna (browser ke baghair)

```
npm run blog:draft -- seo-notes/drafts/<blog>.md
```

- File ke upar front-matter (title, slug, category, excerpt, seoTitle, seoDescription, primaryKeyword, secondaryKeywords, tags, author, heroImage, heroAlt), phir Markdown body. Example: `seo-notes/drafts/what-is-a-cash-surety-bond.md`.
- Hero aur body ki local images Supabase bucket me upload hoti hain.
- Post hamesha **Draft** banti hai; publish/schedule `/admin/blog` se. Pehle se published/scheduled post overwrite nahi hoti.
- `.env.local` (git-ignored) me `SUPABASE_SERVICE_ROLE_KEY` chahiye, ya admin `BLOG_EDITOR_EMAIL` + `BLOG_EDITOR_PASSWORD`.
- `--dry-run` sirf checks chalata hai, kuch upload nahi karta.
