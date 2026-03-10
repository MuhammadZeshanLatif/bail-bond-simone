# Email Notification Setup Instructions

## Overview
Jab bhi koi contact form submit karega, aapko automatically ek formatted email milega with all the form data.

## Important: Google Sheets Column Headers
Pehle Google Sheets mein column headers update karein:
1. Google Sheets kholen: https://docs.google.com/spreadsheets/d/1JQKfFcMW_9JT8cYRpfX14-BoXt9QMKVKIz1PGU8590A/edit
2. Row 1 mein yeh headers add/update karein (left to right):
   - **A**: Timestamp
   - **B**: Name
   - **C**: Phone
   - **D**: Email
   - **E**: Subject
   - **F**: Inmate Name
   - **G**: Date of Birth
   - **H**: Message
   - **I**: Status

## Setup Steps

### Step 1: Google Apps Script Code Update
1. Google Sheets mein jayein: https://docs.google.com/spreadsheets/d/1JQKfFcMW_9JT8cYRpfX14-BoXt9QMKVKIz1PGU8590A/edit
2. **Extensions** → **Apps Script** par click karein
3. Purana code delete karein
4. `google-apps-script-complete.js` file ka complete code copy karein aur paste karein
5. Code save karein (Ctrl+S)

### Step 2: Email Address Update (Optional)
Agar aap email addresses change karna chahte hain:
- Code mein line 117-120 par `recipientEmails` array ko update karein
- Default emails: 
  - `away2freedom302@gmail.com`
  - `zeeshanmuhammad42201@gmail.com`
- Dono emails ko automatically bhejta hai

### Step 3: Deploy as Web App
1. **Deploy** → **New deployment** par click karein
2. **Select type**: "Web app" choose karein
3. **Description**: "Contact Form with Email" (optional)
4. **Execute as**: "Me" select karein
5. **Who has access**: "Anyone" select karein (important!)
6. **Deploy** button par click karein
7. **Authorize access** karein (pehli baar)
8. **Copy the Web App URL** - yeh URL React code mein use hogi

### Step 4: Update React Code (if needed)
Agar Web App URL change hui hai, to `src/App.jsx` mein update karein:
- Line 3304 par `GOOGLE_SCRIPT_URL` ko new URL se replace karein

## Email Features

### Email Content
Email mein yeh information hogi:
- ✅ **Timestamp** - Form submit ka exact time
- ✅ **Name** - User ka naam
- ✅ **Phone** - Clickable phone number
- ✅ **Email** - Clickable email address
- ✅ **Subject** - Form ka subject
- ✅ **Inmate's Name** - Inmate ka naam
- ✅ **Date of Birth** - Inmate ki date of birth (formatted)
- ✅ **Message** - User ka complete message

### Email Design
- 🎨 Professional HTML email template
- 🎨 Gold and black color scheme (brand colors)
- 🎨 Mobile-friendly responsive design
- 🎨 Easy to read format

### Email Subject
Email subject format: `New Contact Form Submission - [Subject]`

Example: `New Contact Form Submission - Need Bail Bond Help`

## Testing

### Test Email
1. Website par contact form fill karein
2. Form submit karein
3. Dono email addresses par email check karein:
   - `away2freedom302@gmail.com`
   - `zeeshanmuhammad42201@gmail.com`
4. Email inbox mein formatted email dikhni chahiye

### Troubleshooting
Agar email nahi aa rahi:
1. **Spam folder** check karein
2. **Google Apps Script** mein **Execution** tab check karein for errors
3. **Logger** mein check karein: `View` → `Logs`
4. Email address sahi hai ya nahi verify karein

## Notes
- Email automatically dono email addresses par bhejta hai jab form submit hota hai
- Email error hone par bhi data Google Sheets mein save ho jata hai
- Email HTML format mein hoti hai with plain text fallback
- Email recipients ko code mein line 117-120 par change kar sakte hain

## Support
Agar koi issue ho to:
1. Google Apps Script execution logs check karein
2. Email address verify karein
3. Web App deployment verify karein
