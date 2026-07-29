import type { Plugin } from "vite";
import { appendFile, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { spawn } from "node:child_process";

type ContactBody = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  message?: string;
};

type FormSettings = {
  /** When false, contact form rejects submissions */
  active: boolean;
};

const SETTINGS_FILE = () => join(process.cwd(), "form-settings.json");
const NOTES_FILE = () => join(process.cwd(), "contact-submissions.txt");

function readBody(req: import("node:http").IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function json(res: import("node:http").ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

async function getSettings(): Promise<FormSettings> {
  try {
    if (!existsSync(SETTINGS_FILE())) return { active: true };
    const raw = await readFile(SETTINGS_FILE(), "utf8");
    const parsed = JSON.parse(raw) as FormSettings;
    return { active: Boolean(parsed.active) };
  } catch {
    return { active: true };
  }
}

async function setSettings(next: FormSettings): Promise<FormSettings> {
  await writeFile(SETTINGS_FILE(), JSON.stringify(next, null, 2), "utf8");
  return next;
}

function formatNote(data: Required<Pick<ContactBody, "name" | "email" | "message">> & ContactBody): string {
  const when = new Date().toLocaleString("en-PK", {
    dateStyle: "full",
    timeStyle: "medium",
  });
  return [
    "======================================",
    `NEW CONTACT — ${when}`,
    "======================================",
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
    `Company:  ${data.company || "-"}`,
    `Phone:    ${data.phone || "-"}`,
    "",
    "Message:",
    data.message,
    "",
    "",
  ].join("\n");
}

function openNotepad(filePath: string) {
  if (process.platform !== "win32") return;
  spawn("cmd", ["/c", "start", "", "notepad.exe", filePath], {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  }).unref();
}

function sheetsUrl() {
  return process.env.VITE_GOOGLE_SHEETS_URL || process.env.GOOGLE_SHEETS_URL || "";
}

/** Server-side POST to Apps Script (avoids browser CORS / Failed to fetch). */
async function forwardToGoogleSheet(payload: Record<string, string>) {
  const url = sheetsUrl().trim();
  if (!url) return { sent: false as const };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify(payload),
    redirect: "follow",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Google Sheet returned ${res.status}${text ? `: ${text.slice(0, 200)}` : ""}`);
  }

  return { sent: true as const };
}

/**
 * GET  /api/form-status → { ok, active }
 * POST /api/form-status → { active: boolean }
 * POST /api/contact     → Notepad + Google Sheet (if form active)
 */
export function contactNotepadPlugin(): Plugin {
  return {
    name: "contact-notepad",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";

        if (url === "/api/form-status") {
          try {
            if (req.method === "GET") {
              const settings = await getSettings();
              json(res, 200, { ok: true, active: settings.active });
              return;
            }
            if (req.method === "POST") {
              const raw = await readBody(req);
              const body = JSON.parse(raw || "{}") as { active?: boolean };
              if (typeof body.active !== "boolean") {
                json(res, 400, { ok: false, error: "active must be true or false" });
                return;
              }
              const settings = await setSettings({ active: body.active });
              json(res, 200, { ok: true, active: settings.active });
              return;
            }
          } catch (err) {
            console.error("[form-status]", err);
            json(res, 500, { ok: false, error: "Failed to update form status" });
            return;
          }
          return next();
        }

        if (url !== "/api/contact" || req.method !== "POST") return next();

        try {
          const settings = await getSettings();
          if (!settings.active) {
            json(res, 403, {
              ok: false,
              error: "Contact form is turned off. Activate it from the Stats page.",
            });
            return;
          }

          const raw = await readBody(req);
          const data = JSON.parse(raw) as ContactBody;
          if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
            json(res, 400, { ok: false, error: "Missing required fields" });
            return;
          }

          const email = data.email.trim().toLowerCase();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            json(res, 400, { ok: false, error: "Please enter a valid email address" });
            return;
          }

          const payload = {
            name: data.name.trim(),
            email,
            company: data.company?.trim() || "",
            phone: data.phone?.trim() || "",
            message: data.message.trim(),
          };

          const filePath = NOTES_FILE();
          await appendFile(filePath, formatNote(payload), "utf8");
          openNotepad(filePath);

          let sheetOk = false;
          try {
            const sheet = await forwardToGoogleSheet(payload);
            sheetOk = sheet.sent;
          } catch (err) {
            console.error("[contact-notepad] Google Sheet forward failed:", err);
          }

          json(res, 200, { ok: true, sheet: sheetOk });
        } catch (err) {
          console.error("[contact-notepad]", err);
          json(res, 500, { ok: false, error: "Failed to save" });
        }
      });
    },
  };
}
