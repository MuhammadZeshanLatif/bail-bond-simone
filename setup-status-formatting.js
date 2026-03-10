/**
 * Google Apps Script Helper Function
 * 
 * Yeh function ek baar run karein to Status column ke liye
 * conditional formatting setup ho jayega.
 * 
 * Instructions:
 * 1. Google Sheet mein Extensions → Apps Script
 * 2. Yeh code paste karein
 * 3. Run → setupStatusFormatting
 * 4. Authorize karein
 * 5. Done!
 */

function setupStatusFormatting() {
  // Get the specific spreadsheet by ID
  const spreadsheetId = '1JQKfFcMW_9JT8cYRpfX14-BoXt9QMKVKIz1PGU8590A';
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getActiveSheet();
  
  // Get Status column (Column G)
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return; // No data rows
  
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
  const allRules = [...existingRules, ...rules];
  sheet.setConditionalFormatRules(allRules);
  
  Logger.log('Status formatting setup complete!');
}
