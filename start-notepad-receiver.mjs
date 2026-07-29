/**
 * Starts Notepad server + public tunnel, then publishes the URL to GitHub
 * so the live Lovable form can reach this PC (Notepad only — no Google Sheets).
 */
import { spawn } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import localtunnel from "localtunnel";

const ROOT = dirname(fileURLToPath(import.meta.url));
const PORT = 8787;

function startServer() {
  const child = spawn(process.execPath, ["notepad-server.mjs"], {
    cwd: ROOT,
    stdio: "inherit",
    windowsHide: false,
  });
  child.on("exit", (code) => {
    console.error("Notepad server exited", code);
    process.exit(code || 1);
  });
  return child;
}

async function publishUrl(url) {
  const file = join(ROOT, "notepad-public-url.txt");
  writeFileSync(file, url.trim() + "\n", "utf8");
  console.log("Public Notepad URL:", url);

  // Best-effort push so live site picks it up
  const run = (cmd, args) =>
    new Promise((resolve) => {
      const p = spawn(cmd, args, { cwd: ROOT, stdio: "inherit", shell: true });
      p.on("exit", () => resolve());
    });

  await run("git", ["add", "notepad-public-url.txt"]);
  await run("git", ["commit", "-m", "Update Notepad public URL"]);
  await run("git", ["push", "lovable", "main"]);
  await run("git", ["push", "origin", "main"]);
  console.log("URL published to GitHub. Live form can reach Notepad now.");
}

async function main() {
  console.log("Starting ORCA Notepad receiver (Google Sheets disconnected)…");
  startServer();
  await new Promise((r) => setTimeout(r, 1500));

  const tunnel = await localtunnel({ port: PORT });
  console.log("Tunnel open:", tunnel.url);
  await publishUrl(tunnel.url);

  tunnel.on("close", () => {
    console.error("Tunnel closed — restart start-notepad-receiver to reconnect.");
  });

  console.log("\nKeep this window open. Form messages → Notepad.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
