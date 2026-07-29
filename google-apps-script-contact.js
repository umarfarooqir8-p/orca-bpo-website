/**
 * Paste into Google Apps Script → Save → Deploy → Web app
 * Execute as: Me | Who has access: Anyone
 *
 * Sheet columns: Timestamp | Name | Email | Company | Phone | Message
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    var data = {};

    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    }

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.email || "",
      data.company || "",
      data.phone || "",
      data.message || "",
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/** Open the web app URL in a browser to confirm it’s live */
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "ORCA BPO contact → Google Sheet is live" })
  ).setMimeType(ContentService.MimeType.JSON);
}
