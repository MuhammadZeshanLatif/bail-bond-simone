# GitHub Secrets – Screenshot (FTP Access) ke hisaab se

**Jahan add karenge:** Repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

---

## Panel se match karke

Screenshot mein **FTP Access** aur **Create a new FTP account** wale section se ye values use karni hain:

| GitHub Secret   | Panel mein kaunsa field              | Value (screenshot se)        |
|-----------------|--------------------------------------|------------------------------|
| `FTP_SERVER`    | **FTP IP (hostname)**                | `82.25.87.23`                |
| `FTP_USERNAME`  | **FTP username** (format neeche dekhen) | Main: `u932362804` — Naya account: `SimoneHerris@away2freedom302.com` |
| `FTP_PASSWORD`  | **FTP password** (Change FTP password / naye account ka password) | Jo password aapne set kiya hai — GitHub Secret mein wahi paste karen |

---

## Detail

1. **FTP_SERVER**  
   Panel pe “FTP IP (hostname)” jahan `ftp://82.25.87.23` dikh raha hai — sirf host part: **82.25.87.23** (http/ftp prefix mat dalna).

2. **FTP_USERNAME** (530 Login incorrect fix)  
   - **Main FTP account:** sirf **u932362804** (FTP Access section).  
   - **Naya/Additional FTP account** (e.g. SimoneHerris): cPanel mein format hona chahiye **username@domain.com** — GitHub secret mein **SimoneHerris@away2freedom302.com** likhen (sirf `SimoneHerris` mat).

3. **FTP_PASSWORD**  
   - Main account ke liye: “Change FTP password” se jo password set hai woh.  
   - Naya account (SimoneHerris) use kar rahe ho to us account ka password (panel mein jo dikh raha hai).

**Note:** Panel pe **FTP port** 21 hai aur **Folder to upload files** `public_html` — workflow already `server-dir: /public_html/` use kar raha hai.

---

## 530 Login incorrect — Kya karen

- **Naya FTP account (SimoneHerris) use kar rahe ho:** `FTP_USERNAME` secret ko **SimoneHerris@away2freedom302.com** banaen (domain ke sath). Sirf `SimoneHerris` se 530 aa sakta hai.
- **Main account (u932362804):** username sirf **u932362804** hona chahiye, `@domain` mat lagana.
- **Password:** GitHub Secret paste karte waqt **aage–peeche space** mat rehne den; password reset karke naya password set karke dubara try karen.

---

## Checklist

- [ ] `FTP_SERVER` = `82.25.87.23`
- [ ] `FTP_USERNAME` = `u932362804` ya `SimoneHerris`
- [ ] `FTP_PASSWORD` = apna FTP password (secret mein paste, repo mein kabhi commit mat karna)

In teeno add karne ke baad **Deploy to FTP** workflow chal sakta hai.
