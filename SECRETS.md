# GitHub Secrets – Hostinger FTP Deploy

**Jahan add karenge:** Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

---

## Required secrets

| GitHub Secret   | Panel mein kaunsa field              | Value |
|-----------------|--------------------------------------|-------|
| `FTP_HOST`      | **FTP IP (hostname)**                | `82.25.87.23` |
| `FTP_USERNAME`  | **FTP username**                     | Main: `u932362804` — Naya account: `SimoneHerris@away2freedom302.com` |
| `FTP_PASSWORD`  | **FTP password**                     | Jo password aapne Hostinger panel mein set kiya hai |

---

## Detail

1. **FTP_HOST**  
   Panel pe “FTP IP (hostname)” — sirf host part: **82.25.87.23** (http/ftp prefix mat dalna).

2. **FTP_USERNAME**  
   - **Main FTP account:** sirf **u932362804**  
   - **Additional FTP account:** **SimoneHerris@away2freedom302.com** (domain ke sath)

3. **FTP_PASSWORD**  
   Us account ka password jo GitHub secret mein paste karna hai.

**Note:** Panel pe **FTP port** 21 hai aur **Folder to upload files** `public_html` — workflow `server-dir: ./` use karta hai (FTP account ka root = public_html).

---

## Checklist

- [ ] `FTP_HOST` = `82.25.87.23`
- [ ] `FTP_USERNAME` = `u932362804` ya `SimoneHerris@away2freedom302.com`
- [ ] `FTP_PASSWORD` = apna FTP password

In teeno add karne ke baad **Deploy to Hostinger** workflow chal sakta hai.
