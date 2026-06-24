# GitHub Secrets – Hostinger Deploy (FTPS)

**Jahan add karenge:** Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Deploy ab **FTPS** use karta hai (SSH password GitHub Actions se often `Permission denied` deta hai).

---

## Required secrets (FTP)

| GitHub Secret | Value | Notes |
|---------------|-------|-------|
| `FTP_HOST` | `82.25.87.23` | hPanel → **Files** → **FTP Accounts** → hostname/IP |
| `FTP_USERNAME` | `u932362804` | FTP username |
| `FTP_PASSWORD` | apna FTP password | **hPanel FTP password** (SSH password alag ho sakta hai) |
| `FTP_REMOTE_PATH` | `domains/away2freedom302.com/public_html/` | Trailing `/` rakho. Temp domain ka path mat use karo. |

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

- [ ] `FTP_HOST` = `82.25.87.23`
- [ ] `FTP_USERNAME` = `u932362804`
- [ ] `FTP_PASSWORD` = hPanel FTP password
- [ ] `FTP_REMOTE_PATH` = `domains/away2freedom302.com/public_html/`

Push to `master` → Actions → **Deploy via FTPS** green hona chahiye.
