# GitHub Secrets – Hostinger Deploy (FTPS)

**Jahan add karenge:** Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Deploy ab **FTPS** use karta hai (SSH password GitHub Actions se often `Permission denied` deta hai).

---

## Required secret (sirf 1)

| GitHub Secret | Value | Notes |
|---------------|-------|-------|
| `FTP_PASSWORD` | apna FTP password | hPanel → **Files** → **FTP Accounts** → password |

Host, username, aur deploy path workflow file mein set hain (`82.25.87.23`, `u932362804`, `domains/away2freedom302.com/public_html/`).

---

## Optional (agar alag FTP account ho)

| GitHub Secret | Notes |
|---------------|-------|
| `FTP_HOST` | Override server IP |
| `FTP_USERNAME` | Override username |
| `FTP_REMOTE_PATH` | Override remote folder |

---

## hPanel se FTP password kaise lein

1. **hPanel** → **Files** → **FTP Accounts**
2. Apna account dekho (`u932362804`)
3. Password reset karo agar yaad nahi
4. Wahi password `FTP_PASSWORD` secret mein daalo

> **Important:** `FTP_PASSWORD` aur `SSH_PASSWORD` same nahi hote. Purane SSH secrets se deploy nahi chalega — ye 4 FTP secrets add karo.

---

## Common errors

| Error | Fix |
|-------|-----|
| `Login authentication failed` | `FTP_PASSWORD` reset karo hPanel se, phir GitHub secret update |
| `Permission denied` (SSH/rsync) | Purana workflow tha — ab FTPS use hota hai |
| Site temp URL par khule | `FTP_REMOTE_PATH` = **away2freedom302.com** ka `public_html` |
| `Connection timed out` | `FTP_HOST` = `82.25.87.23`, port `21`, protocol `ftps` |

---

## Checklist

- [ ] `FTP_PASSWORD` secret add kiya (hPanel FTP password)
- [ ] Workflow push kiya `master` branch par

Push to `master` → Actions → **Deploy via FTPS** green hona chahiye.
