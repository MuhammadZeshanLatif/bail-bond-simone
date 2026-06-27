# GitHub Secrets – Hostinger Deploy

**Jahan add karenge:** Repo → **Settings** → **Secrets and variables** → **Actions**

---

## Required secrets

| GitHub Secret | Value | Notes |
|---------------|-------|-------|
| `SSH_HOST` | `82.25.87.23` | Hostinger server IP |
| `SSH_USERNAME` | `u932362804` | Same as FTP username |
| `SSH_PASSWORD` | hPanel password | **FTP password** (hPanel → Files → FTP Accounts) |

> Deploy ab **FTPS (port 21)** use karta hai. GitHub Actions se SSH (port 65002) often **i/o timeout** deta hai — Hostinger external SSH block karta hai.

---

## Errors & fixes

| Error | Meaning | Fix |
|-------|---------|-----|
| `i/o timeout` (SSH) | GitHub server tak SSH nahi pohonch raha | Normal on Hostinger — ab FTPS use hota hai |
| `Login authentication failed` (FTP) | Galat password | hPanel se FTP password reset karo, `SSH_PASSWORD` secret update |
| Build green, deploy red | Sirf upload fail | Actions → artifact `static-site-dist` download karke manual upload |

---

## Manual deploy (backup)

1. GitHub → **Actions** → latest run → **Artifacts** → `static-site-dist` download
2. Extract karo
3. Hostinger File Manager / FileZilla se `public_html` mein upload karo

---

## Checklist

- [ ] `SSH_HOST`, `SSH_USERNAME`, `SSH_PASSWORD` set (FTP password use karo)
- [ ] Push to `master` → **Deploy via FTPS** green hona chahiye
