/**
 * Notepad-only contact receiver for the live Lovable site.
 * POST /api/contact  → saves + opens Notepad
 * GET  /api/health   → { ok: true }
 */
import { createServer } from "node:http";
import { appendFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const ROOT = dirname(fileURLToPath(import.meta.url));
const NOTES_FILE = join(ROOT, "contact-submissions.txt");
const PORT = Number(process.env.NOTEPAD_PORT || 8787);

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function json(res, status, body) {
  cors(res);
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function formatNote(data) {
  const when = new Date().toLocaleString("en-PK", { dateStyle: "full", timeStyle: "medium" });
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

function openNotepad(filePath) {
  if (process.platform !== "win32") return;
  spawn("cmd", ["/c", "start", "", "notepad.exe", filePath], {
    detached: true,
    stdio: "ignore",
    windowsHide: true,
  }).unref();
}

const server = createServer(async (req, res) => {
  const url = (req.url || "").split("?")[0];

  if (req.method === "OPTIONS") {
    cors(res);
    res.statusCode = 204;
    res.end();
    return;
  }

  if (url === "/api/health" && req.method === "GET") {
    json(res, 200, { ok: true, notepad: true });
    return;
  }

  if (url === "/api/contact" && req.method === "POST") {
    try {
      const raw = await readBody(req);
      const data = JSON.parse(raw || "{}");
      if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
        json(res, 400, { ok: false, error: "Missing required fields" });
        return;
      }
      const payload = {
        name: String(data.name).trim(),
        email: String(data.email).trim(),
        company: String(data.company || "").trim(),
        phone: String(data.phone || "").trim(),
        message: String(data.message).trim(),
      };
      await appendFile(NOTES_FILE, formatNote(payload), "utf8");
      openNotepad(NOTES_FILE);
      json(res, 200, { ok: true });
    } catch (err) {
      console.error(err);
      json(res, 500, { ok: false, error: "Failed to save" });
    }
    return;
  }

  json(res, 404, { ok: false, error: "Not found" });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`ORCA Notepad receiver → http://localhost:${PORT}`);
  console.log("Waiting for live-site form messages… Keep this open.");
});
