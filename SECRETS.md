# GitHub Secrets – Hostinger SSH Deploy

**Jahan add karenge:** Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

---

## Required secrets

| GitHub Secret | Value | Notes |
|---------------|-------|-------|
| `SSH_HOST` | `82.25.87.23` | hPanel → **Advanced → SSH Access** → IP/hostname |
| `SSH_PORT` | `65002` | **Hostinger shared hosting = 65002** (22 nahi!) |
| `SSH_USERNAME` | `u932362804` | SSH username (FTP jaisa) |
| `SSH_PASSWORD` | apna SSH password | hPanel mein SSH enable karke set karo |
| `SSH_REMOTE_PATH` | `/home/u932362804/domains/away2freedom302.com/public_html/` | Deploy folder (trailing `/` rakho) |

## Optional (recommended)

| GitHub Secret | Notes |
|---------------|-------|
| `SSH_PRIVATE_KEY` | SSH key auth — password ki jagah ya sath use ho sakti hai |

---

## Hostinger mein SSH enable karo (zaroori)

1. **hPanel** → **Advanced** → **SSH Access**
2. SSH **Enable** karo
3. Password set karo (ya SSH key add karo)
4. Port note karo — usually **65002**

Agar SSH disabled ho to GitHub Actions se **Connection timed out** aata hai.

---

## Common errors

| Error | Fix |
|-------|-----|
| `Connection timed out` | Port `65002` use karo, SSH hPanel se enable karo |
| `Permission denied` | `SSH_USERNAME` / `SSH_PASSWORD` check karo |
| Site temp URL par khule | `SSH_REMOTE_PATH` = **away2freedom302.com** ka `public_html`, gray-partridge ka nahi |

---

## Checklist

- [ ] SSH enabled in Hostinger hPanel
- [ ] `SSH_HOST` = `82.25.87.23`
- [ ] `SSH_PORT` = `65002`
- [ ] `SSH_USERNAME` = `u932362804`
- [ ] `SSH_PASSWORD` = SSH password
- [ ] `SSH_REMOTE_PATH` = `/home/u932362804/domains/away2freedom302.com/public_html/`

Push to `master` → Actions mein **Test SSH connection** green hona chahiye, phir **Deploy via SSH (SCP)**.
