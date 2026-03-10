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
    // Column order: Timestamp, Name, Phone, Email, Subject, Message, Status
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.phone || '',
      data.email || '',
      data.subject || '',
      data.message || '',
      'New' // Default status
    ]);
    
    // Apply dropdown and formatting to the Status column (Column G)
    const lastRow = sheet.getLastRow();
    const statusRange = sheet.getRange(lastRow, 7); // Column G is Status
    
    // Create data validation for dropdown
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['New', 'Pending', 'Done', 'Not Done'], true)
      .build();
    statusRange.setDataValidation(rule);
    
    // Apply color formatting - New = Red (default)
    statusRange.setBackground('#ff4444').setFontColor('#ffffff');
    
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
  
  // Get Status column (Column G)
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    Logger.log('No data rows found. Please add some data first.');
    return;
  }
  
  const statusColumn = sheet.getRange(2, 7, lastRow - 1, 1); // Column G, starting from row 2
  
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
  
  // Remove existing rules for Status column (Column 7)
  const filteredRules = existingRules.filter(rule => {
    const ranges = rule.getRanges();
    return !ranges.some(range => range.getColumn() === 7);
  });
  
  // Add new rules
  const allRules = [...filteredRules, ...rules];
  sheet.setConditionalFormatRules(allRules);
  
  Logger.log('Status formatting setup complete!');
  Logger.log('Total rows with formatting: ' + (lastRow - 1));
}
