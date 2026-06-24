# GitHub Secrets – Hostinger SSH Deploy

**Jahan add karenge:** Repo → **Settings** → **Secrets and variables** → **Actions**

---

## Required secrets (aapke paas ye 5 hain)

| GitHub Secret | Example | Notes |
|---------------|---------|-------|
| `SSH_HOST` | `82.25.87.23` | hPanel → SSH Access → IP |
| `SSH_PORT` | `65002` | Hostinger shared = **65002** (22 nahi) |
| `SSH_USERNAME` | `u932362804` | SSH username |
| `SSH_PASSWORD` | apna password | hPanel SSH password |
| `SSH_REMOTE_PATH` | `/home/u932362804/domains/away2freedom302.com/public_html/` | Trailing `/` rakho |

---

## Deploy kaise hota hai

1. `npm run build` — static pages generate
2. `deploy.tar.gz` banta hai
3. SSH se server par upload
4. `SSH_REMOTE_PATH` mein extract

---

## Common errors

| Error | Fix |
|-------|-----|
| `Permission denied` | `SSH_PASSWORD` hPanel SSH password se match karo (FTP password alag ho sakta hai) |
| `Connection timed out` | `SSH_PORT` = `65002`, SSH hPanel se enable karo |
| Site galat domain par | `SSH_REMOTE_PATH` = **away2freedom302.com** ka `public_html` |

---

## Checklist

- [ ] SSH enabled in Hostinger hPanel
- [ ] 5 secrets set (screenshot jaisa)
- [ ] Push to `master` → Actions green
