export type ContactPayload = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
};

/**
 * Sends a contact row to your Google Sheet via Apps Script web app.
 * Set VITE_GOOGLE_SHEETS_URL in .env.local to your deployed web app URL.
 */
export async function submitToGoogleSheet(payload: ContactPayload) {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined;
  if (!url) {
    throw new Error("Google Sheet is not connected yet. Add VITE_GOOGLE_SHEETS_URL in .env.local");
  }

  // Apps Script + browser CORS: text/plain + no-cors is the reliable pattern
  await fetch(url, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
  });

  // Opaque response — treat as sent if fetch didn’t throw
  return { ok: true as const };
}

export function isGoogleSheetConfigured() {
  return Boolean(import.meta.env.VITE_GOOGLE_SHEETS_URL);
}
