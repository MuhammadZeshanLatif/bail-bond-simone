/**
 * Google Apps Script Code for Contact Form with Status Column
 * 
 * Instructions:
 * 1. Google Sheets mein jayein
 * 2. Extensions → Apps Script par click karein
 * 3. Purana code delete karein
 * 4. Yeh complete code paste karein
 * 5. Deploy → New deployment → Web app
 * 6. URL copy karein aur React code mein use karein
 * 
 * Status Column Features:
 * - Automatically adds "New" status with Red color
 * - Dropdown with options: New, Pending, Done, Not Done
 * - Colors: New (Red), Pending (Grey), Done (Green), Not Done (Yellow)
 */

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the specific spreadsheet by ID
    // Sheet ID: 1JQKfFcMW_9JT8cYRpfX14-BoXt9QMKVKIz1PGU8590A
    const spreadsheetId = '1JQKfFcMW_9JT8cYRpfX14-BoXt9QMKVKIz1PGU8590A';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getActiveSheet();
    
    // Get current timestamp and format it
    const now = new Date();
    
    // Format: 21 January 2026 1:34PM
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    // Format time: 1:34PM
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    
    const timestamp = `${day} ${month} ${year} ${hours}:${minutesStr}${ampm}`;
    
    // Add the data to the sheet
    // Column order: Timestamp, Name, Phone, Email, Subject, Inmate Name, Date of Birth, Message, Status
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.subject || '',
      data.inmateName || '',
      data.dateOfBirth || '',
      data.message || '',
      'New' // Default status
    ]);
    
    // Apply dropdown and formatting to the Status column (Column I - 9th column)
    const lastRow = sheet.getLastRow();
    const statusRange = sheet.getRange(lastRow, 9); // Column I is Status
    
    // Create data validation for dropdown
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['New', 'Pending', 'Done', 'Not Done'], true)
      .build();
    statusRange.setDataValidation(rule);
    
    // Apply color formatting - New = Red (default)
    statusRange.setBackground('#ff4444').setFontColor('#ffffff');
    
    // Send email notification
    try {
      sendEmailNotification(data, timestamp);
    } catch (emailError) {
      // Email error ko log karein but main process ko fail nahi karein
      Logger.log('Email sending error: ' + emailError.toString());
    }
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'success',
        'message': 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'status': 'error',
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function - Browser mein URL open karne se "Contact Form API is running!" dikhega
function doGet(e) {
  return ContentService
    .createTextOutput('Contact Form API is running!')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Email Notification Function
 * 
 * Yeh function formatted email bhejta hai jab bhi form submit hota hai.
 * Email mein sabhi form data nicely formatted format mein hota hai.
 */
function sendEmailNotification(data, timestamp) {
  // Email recipients - Do email addresses par email bhejega
  const recipientEmails = [
    'away2freedom302@gmail.com',
    'zeeshanmuhammad42201@gmail.com'
  ];
  
  // Email subject
  const subject = 'New Contact Form Submission - ' + (data.subject || 'No Subject');
  
  // HTML Email Template
  const htmlBody = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f4f4f4;
        }
        .email-container {
          background-color: #ffffff;
          border-radius: 8px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          color: #d4af37;
          padding: 20px;
          border-radius: 8px 8px 0 0;
          margin: -30px -30px 30px -30px;
          text-align: center;
        }
        .header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: bold;
        }
        .info-section {
          background-color: #f9f9f9;
          border-left: 4px solid #d4af37;
          padding: 20px;
          margin: 20px 0;
          border-radius: 4px;
        }
        .info-row {
          display: flex;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e0e0e0;
        }
        .info-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
          padding-bottom: 0;
        }
        .info-label {
          font-weight: bold;
          color: #1a1a1a;
          width: 120px;
          flex-shrink: 0;
        }
        .info-value {
          color: #333;
          flex-grow: 1;
        }
        .message-box {
          background-color: #fff9e6;
          border: 1px solid #d4af37;
          border-radius: 4px;
          padding: 15px;
          margin-top: 20px;
        }
        .message-box .label {
          font-weight: bold;
          color: #1a1a1a;
          margin-bottom: 10px;
          display: block;
        }
        .message-box .content {
          color: #333;
          white-space: pre-wrap;
          line-height: 1.8;
        }
        .footer {
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #e0e0e0;
          text-align: center;
          color: #666;
          font-size: 12px;
        }
        .timestamp {
          background-color: #e8e8e8;
          padding: 10px;
          border-radius: 4px;
          text-align: center;
          margin-bottom: 20px;
          font-size: 14px;
          color: #555;
        }
        .icon {
          color: #d4af37;
          margin-right: 8px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>🔔 New Contact Form Submission</h1>
        </div>
        
        <div class="timestamp">
          <strong>📅 Submitted:</strong> ${timestamp}
        </div>
        
        <div class="info-section">
          <div class="info-row">
            <span class="info-label">👤 Name:</span>
            <span class="info-value">${data.name || 'Not provided'}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">📞 Phone:</span>
            <span class="info-value">
              ${data.phone ? '<a href="tel:' + data.phone.replace(/[^0-9]/g, '') + '">' + data.phone + '</a>' : 'Not provided'}
            </span>
          </div>
          
          <div class="info-row">
            <span class="info-label">📧 Email:</span>
            <span class="info-value">
              ${data.email ? '<a href="mailto:' + data.email + '">' + data.email + '</a>' : 'Not provided'}
            </span>
          </div>
          
          <div class="info-row">
            <span class="info-label">📋 Subject:</span>
            <span class="info-value">${data.subject || 'No subject'}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">👨‍⚖️ Inmate's Name:</span>
            <span class="info-value">${data.inmateName || 'Not provided'}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">📅 Date of Birth:</span>
            <span class="info-value">${data.dateOfBirth ? (() => {
              try {
                const date = new Date(data.dateOfBirth);
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                                'July', 'August', 'September', 'October', 'November', 'December'];
                const day = date.getDate();
                const month = months[date.getMonth()];
                const year = date.getFullYear();
                return `${day} ${month} ${year}`;
              } catch (e) {
                return data.dateOfBirth;
              }
            })() : 'Not provided'}</span>
          </div>
        </div>
        
        <div class="message-box">
          <span class="label">💬 Message:</span>
          <div class="content">${data.message || 'No message provided'}</div>
        </div>
        
        <div class="footer">
          <p>This email was automatically generated from your website contact form.</p>
          <p><strong>A Way to Freedom Bail Bonds</strong><br>
          Newark, Delaware</p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Date formatting function
  function formatDate(dateString) {
    if (!dateString) return 'Not provided';
    try {
      const date = new Date(dateString);
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];
      const day = date.getDate();
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    } catch (e) {
      return dateString; // Return original if parsing fails
    }
  }
  
  // Plain text version (for email clients that don't support HTML)
  const plainTextBody = `
New Contact Form Submission
===========================

Submitted: ${timestamp}

Name: ${data.name || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Email: ${data.email || 'Not provided'}
Subject: ${data.subject || 'No subject'}
Inmate's Name: ${data.inmateName || 'Not provided'}
Date of Birth: ${data.dateOfBirth ? formatDate(data.dateOfBirth) : 'Not provided'}

Message:
${data.message || 'No message provided'}

---
This email was automatically generated from your website contact form.
A Way to Freedom Bail Bonds - Newark, Delaware
  `;
  
  // Send email to both recipients
  // MailApp.sendEmail can accept comma-separated string or array
  MailApp.sendEmail({
    to: recipientEmails.join(','), // Both emails comma-separated
    subject: subject,
    htmlBody: htmlBody,
    body: plainTextBody
  });
  
  Logger.log('Email sent successfully to: ' + recipientEmails.join(', '));
}

/**
 * Optional: Conditional Formatting Setup Function
 * 
 * Yeh function ek baar run karein to Status column ke liye
 * conditional formatting setup ho jayega.
 * 
 * Instructions:
 * 1. Yeh function code mein already hai (neeche)
 * 2. Run → setupStatusFormatting select karein
 * 3. Run button par click karein
 * 4. Authorize karein (pehli baar)
 * 5. Done! Ab status change par color automatically update hoga
 */
function setupStatusFormatting() {
  // Get the specific spreadsheet by ID
  const spreadsheetId = '1JQKfFcMW_9JT8cYRpfX14-BoXt9QMKVKIz1PGU8590A';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getActiveSheet();
  
  // Get Status column (Column I - 9th column)
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log('No data rows found. Please add some data first.');
    return;
  }
  
  const statusColumn = sheet.getRange(2, 9, lastRow - 1, 1); // Column I, starting from row 2
  
  // Apply dropdown validation to all Status cells
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['New', 'Pending', 'Done', 'Not Done'], true)
    .build();
  statusColumn.setDataValidation(rule);
  
  // Setup conditional formatting rules
  const rules = [];
  
  // Rule 1: New = Red
  let newRule = SpreadsheetApp.newConditionalFormatRule()
    .setRanges([statusColumn])
    .whenTextEqualTo('New')
    .setBackground('#ff4444')
    .setFontColor('#ffffff')
    .build();
  rules.push(newRule);
  
  // Rule 2: Pending = Grey
  newRule = SpreadsheetApp.newConditionalFormatRule()
    .setRanges([statusColumn])
    .whenTextEqualTo('Pending')
    .setBackground('#808080')
    .setFontColor('#ffffff')
    .build();
  rules.push(newRule);
  
  // Rule 3: Done = Green
  newRule = SpreadsheetApp.newConditionalFormatRule()
    .setRanges([statusColumn])
    .whenTextEqualTo('Done')
    .setBackground('#00cc00')
    .setFontColor('#ffffff')
    .build();
  rules.push(newRule);
  
  // Rule 4: Not Done = Yellow
  newRule = SpreadsheetApp.newConditionalFormatRule()
    .setRanges([statusColumn])
    .whenTextEqualTo('Not Done')
    .setBackground('#ffcc00')
    .setFontColor('#000000')
    .build();
  rules.push(newRule);
  
  // Apply all rules
  const existingRules = sheet.getConditionalFormatRules();
  
  // Remove existing rules for Status column (Column 9)
  const filteredRules = existingRules.filter(rule => {
    const ranges = rule.getRanges();
    return !ranges.some(range => range.getColumn() === 9);
  });
  
  // Add new rules
  const allRules = [...filteredRules, ...rules];
  sheet.setConditionalFormatRules(allRules);
  
  Logger.log('Status formatting setup complete!');
  Logger.log('Total rows with formatting: ' + (lastRow - 1));
}
