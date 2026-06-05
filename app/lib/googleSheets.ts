import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SHEET_ID = process.env.GOOGLE_SHEET_ID!;

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: SCOPES,
  });
}

export interface FormSubmission {
  timestamp: string;
  formType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  newsletter?: boolean;
}

const HEADERS = [
  "Timestamp",
  "Form Type",
  "First Name",
  "Last Name",
  "Email",
  "Phone",
  "Company",
  "Message",
  "Newsletter",
];

export async function appendFormSubmission(data: FormSubmission) {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  // Ensure header row exists
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A1:I1",
  });

  if (!existing.data.values?.length) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: { values: [HEADERS] },
    });
  }

  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: "Sheet1!A:I",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          data.timestamp,
          data.formType,
          data.firstName,
          data.lastName,
          data.email,
          data.phone ?? "",
          data.company ?? "",
          data.message ?? "",
          data.newsletter ? "Yes" : "No",
        ],
      ],
    },
  });
}
