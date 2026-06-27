# GitHub Secrets – Hostinger SSH Deploy

**Jahan add karenge:** Repo → **Settings** → **Secrets and variables** → **Actions**

---

## Required secrets (5)

| GitHub Secret | Example | Notes |
|---------------|---------|-------|
| `SSH_HOST` | `82.25.87.23` | Hostinger server IP |
| `SSH_PORT` | `65002` | Hostinger SSH port (hPanel → Advanced → SSH Access) |
| `SSH_USERNAME` | `u932362804` | SSH username |
| `SSH_PASSWORD` | your SSH password | **SSH password** — FTP password alag ho sakta hai |
| `SSH_REMOTE_PATH` | `/home/u932362804/domains/away2freedom302.com/public_html/` | Trailing `/` rakho |

---

## Errors & fixes

| Error | Meaning | Fix |
|-------|---------|-----|
| `i/o timeout` | GitHub runner server tak SSH nahi pohonch raha | hPanel mein SSH enabled karo; port `65002` confirm karo |
| `Permission denied` | Galat username/password | SSH password reset karo, secret update karo |
| Build green, deploy red | Sirf upload fail | Actions → artifact `static-site-dist` download karke manual upload |

---

## Manual deploy (backup)

1. GitHub → **Actions** → latest run → **Artifacts** → `static-site-dist` download
2. Extract karo
3. Hostinger File Manager se `public_html` mein upload karo

---

## Checklist

- [ ] All 5 SSH secrets set
- [ ] Push to `master` → **Test SSH connection** green hona chahiye
