# Hostinger Deployment Guide

## 📦 Kya Upload Karna Hai

Hostinger par sirf **`dist` folder ki contents** upload karni hai.

## 🚀 Step-by-Step Instructions

### Step 1: Build Project

Pehle project ko build karein:

```bash
npm run build
```

Yeh command `dist` folder create karegi jisme sab kuch ready hoga.

### Step 2: Dist Folder Ki Contents

`dist` folder mein yeh files hongi:
```
dist/
├── index.html          ✅ Upload karein
├── assets/             ✅ Upload karein (puri folder)
│   ├── index-*.js
│   └── index-*.css
├── images/             ✅ Upload karein (agar hai)
├── robots.txt          ✅ Upload karein
├── sitemap.xml         ✅ Upload karein
└── favicon.svg         ✅ Upload karein (agar hai)
```

### Step 3: Hostinger File Manager

1. **Hostinger Control Panel** mein login karein
2. **File Manager** open karein
3. `public_html` folder mein jayein (ya apna domain folder)
4. **Purani files delete karein** (agar koi hain)

### Step 4: Upload Files

**Option 1: File Manager se Upload**
1. File Manager mein **Upload** button par click karein
2. `dist` folder ki **sabhi files aur folders** select karein
3. Upload karein
4. Files ko `public_html` ke root mein upload karein (subfolder mein nahi)

**Option 2: FTP se Upload (Recommended)**
1. FTP client use karein (FileZilla, WinSCP, etc.)
2. Hostinger se FTP credentials lein:
   - FTP Host: `ftp.yourdomain.com` ya IP address
   - Username: Apna Hostinger username
   - Password: Apna Hostinger password
3. `dist` folder ki contents ko `public_html` mein upload karein

### Step 5: .htaccess File Create Karein

SPA routing ke liye `.htaccess` file chahiye:

1. `public_html` folder mein `.htaccess` file create karein
2. Neeche diya hua code paste karein:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable Gzip Compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>

# Browser Caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

3. File save karein

### Step 6: Verify

1. Apne domain par website open karein
2. Check karein ke sab kuch sahi se load ho raha hai
3. Different pages par navigate karein (Home, About, Services, etc.)
4. Agar 404 error aaye to `.htaccess` file check karein

## 📁 Final Structure on Hostinger

```
public_html/
├── index.html          ✅
├── .htaccess          ✅ (create karein)
├── assets/            ✅
│   ├── index-*.js
│   └── index-*.css
├── images/            ✅ (agar hai)
├── robots.txt         ✅
├── sitemap.xml        ✅
└── favicon.svg        ✅ (agar hai)
```

## ⚠️ Important Notes

1. **Node.js files upload mat karein:**
   - ❌ `node_modules` - Upload mat karein
   - ❌ `src` folder - Upload mat karein
   - ❌ `package.json` - Upload mat karein
   - ✅ Sirf `dist` folder ki contents upload karein

2. **File Permissions:**
   - Files: 644
   - Folders: 755
   - `.htaccess`: 644

3. **Domain Configuration:**
   - Agar aapne domain change kiya hai, to `index.html` mein OG image URLs update karein
   - `index.html` mein `https://example.com/` ko apne actual domain se replace karein

4. **SSL Certificate:**
   - Hostinger automatically SSL provide karta hai
   - HTTPS enable karein (recommended)

## 🔧 Troubleshooting

**Problem: 404 Error on Routes**
- Solution: `.htaccess` file check karein aur mod_rewrite enable karein

**Problem: CSS/JS Files Load Nahi Ho Rahe**
- Solution: File paths check karein, `assets` folder sahi jagah hai ya nahi

**Problem: Images Load Nahi Ho Rahe**
- Solution: `images` folder `public_html` ke root mein honi chahiye

**Problem: Slow Loading**
- Solution: Gzip compression enable karein (`.htaccess` mein already hai)

## 📞 Support

Agar koi problem aaye to:
1. Hostinger support se contact karein
2. Browser console mein errors check karein
3. File permissions verify karein

## ✅ Quick Checklist

- [ ] `npm run build` run kiya
- [ ] `dist` folder ki contents upload ki
- [ ] `.htaccess` file create ki
- [ ] Domain URLs update kiye (agar needed)
- [ ] Website test ki
- [ ] All pages working check kiye

---

**Note:** Hostinger par React app deploy karne ke liye sirf static files chahiye. Build process Hostinger par nahi chalega, isliye pehle locally build karein phir upload karein.
