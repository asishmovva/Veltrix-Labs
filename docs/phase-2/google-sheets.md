# Google Sheets Lead Capture Setup

This setup stores lead submissions and tracked events in Google Sheets using a free Google Apps Script Web App.

## 1) Create the spreadsheet

1. Create a new Google Sheet.
2. Rename the first tab to `Leads`.
3. Add a second tab named `Events` (optional; script will also auto-create it if missing).

## 2) Open Apps Script

1. In the Sheet, click `Extensions` -> `Apps Script`.
2. Replace the default code with the script below.

## 3) Apps Script code

```javascript
const LEADS_HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Company",
  "Service",
  "Budget",
  "Timeline",
  "Message",
  "Page URL",
  "User Agent",
  "IP",
];

const EVENTS_HEADERS = [
  "Timestamp",
  "Event",
  "Label",
  "Location",
  "Path",
  "Meta",
  "User Agent",
  "IP",
];

function getSheetByNameOrCreate(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function ensureHeaders(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  }
}

function jsonResponse(payload, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || "{}");
    const expectedToken = PropertiesService.getScriptProperties().getProperty("SHEETS_TOKEN");

    if (!expectedToken || body.token !== expectedToken) {
      return jsonResponse({ ok: false, error: "Unauthorized" }, 401);
    }

    const type = body.type || "lead";

    if (type === "event") {
      const eventsSheet = getSheetByNameOrCreate("Events");
      ensureHeaders(eventsSheet, EVENTS_HEADERS);

      eventsSheet.appendRow([
        body.timestamp || "",
        body.event || "",
        body.label || "",
        body.location || "",
        body.path || "",
        body.meta ? JSON.stringify(body.meta) : "",
        body.userAgent || "",
        body.ip || "",
      ]);

      return jsonResponse({ ok: true });
    }

    const leadsSheet = getSheetByNameOrCreate("Leads");
    ensureHeaders(leadsSheet, LEADS_HEADERS);

    leadsSheet.appendRow([
      body.timestamp || "",
      body.name || "",
      body.email || "",
      body.company || "",
      body.serviceInterest || "",
      body.budgetRange || "",
      body.timeline || "",
      body.message || "",
      body.pageUrl || "",
      body.userAgent || "",
      body.ip || "",
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) }, 500);
  }
}
```

## 4) Set the token in Script Properties

1. In Apps Script, open `Project Settings`.
2. Under `Script Properties`, add:
   - Key: `SHEETS_TOKEN`
   - Value: a long random secret string

Use the same value in Vercel as `GOOGLE_SHEETS_TOKEN`.

## 5) Deploy as Web App

1. Click `Deploy` -> `New deployment`.
2. Type: `Web app`.
3. Execute as: `Me`.
4. Who has access: `Anyone`.
5. Deploy and copy the Web App URL.

Use this URL in Vercel as `GOOGLE_SHEETS_WEBAPP_URL`.

## 6) Configure Vercel env vars

Add these in Project Settings -> Environment Variables:

- `RESEND_API_KEY`
- `LEADS_TO_EMAIL`
- `LEADS_FROM_EMAIL`
- `GOOGLE_SHEETS_WEBAPP_URL`
- `GOOGLE_SHEETS_TOKEN`

Then redeploy.

## 7) Verify end-to-end

1. Submit `/contact` form with valid data.
2. Confirm:
   - email received via Resend
   - row added to `Leads` tab
3. Trigger a CTA click and lead submit; confirm rows added to `Events` tab.
