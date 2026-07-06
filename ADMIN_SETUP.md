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
