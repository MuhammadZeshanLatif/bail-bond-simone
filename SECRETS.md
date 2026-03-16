# GitHub Secrets – Screenshot (FTP Access) ke hisaab se

**Jahan add karenge:** Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

---

## Panel se match karke

Screenshot mein **FTP Access** aur **Create a new FTP account** wale section se ye values use karni hain:

| GitHub Secret   | Panel mein kaunsa field              | Value (screenshot se)        |
|-----------------|--------------------------------------|------------------------------|
| `FTP_SERVER`    | **FTP IP (hostname)**                | `82.25.87.23`                |
| `FTP_USERNAME`  | **FTP username**                     | `u932362804` (main) ya `SimoneHerris` (naya account) |
| `FTP_PASSWORD`  | **FTP password** (Change FTP password / naye account ka password) | Jo password aapne set kiya hai — GitHub Secret mein wahi paste karen |

---

## Detail

1. **FTP_SERVER**  
   Panel pe “FTP IP (hostname)” jahan `ftp://82.25.87.23` dikh raha hai — sirf host part: **82.25.87.23** (http/ftp prefix mat dalna).

2. **FTP_USERNAME**  
   - Main FTP: **u932362804** (FTP Access section).  
   - Agar naya account use karna ho: **SimoneHerris** (Create a new FTP account).

3. **FTP_PASSWORD**  
   - Main account ke liye: “Change FTP password” se jo password set hai woh.  
   - Naya account (SimoneHerris) use kar rahe ho to us account ka password (panel mein jo dikh raha hai).

**Note:** Panel pe **FTP port** 21 hai aur **Folder to upload files** `public_html` — workflow already `server-dir: /public_html/` use kar raha hai, to alag se kuch add karne ki zaroorat nahi.

---

## Checklist

- [ ] `FTP_SERVER` = `82.25.87.23`
- [ ] `FTP_USERNAME` = `u932362804` ya `SimoneHerris`
- [ ] `FTP_PASSWORD` = apna FTP password (secret mein paste, repo mein kabhi commit mat karna)

In teeno add karne ke baad **Deploy to FTP** workflow chal sakta hai.
