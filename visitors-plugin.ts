import type { Plugin } from "vite";
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

type VisitBody = {
  path?: string;
  visitorId?: string;
};

type Stats = {
  totalPageViews: number;
  /** Always derived from Object.keys(visitors) when returning — kept for compatibility */
  uniqueVisitors: number;
  visitors: Record<string, { firstSeen: string; lastSeen: string; views: number }>;
  pages: Record<string, number>;
  recent: Array<{ at: string; path: string; visitorId: string }>;
};

const STATS_FILE = () => join(process.cwd(), "visitor-stats.json");

/** Serialize disk writes so concurrent visits don't overwrite each other */
let writeChain: Promise<void> = Promise.resolve();

function emptyStats(): Stats {
  return {
    totalPageViews: 0,
    uniqueVisitors: 0,
    visitors: {},
    pages: {},
    recent: [],
  };
}

async function loadStats(): Promise<Stats> {
  const file = STATS_FILE();
  if (!existsSync(file)) return emptyStats();
  try {
    const parsed = JSON.parse(await readFile(file, "utf8")) as Partial<Stats>;
    return {
      ...emptyStats(),
      ...parsed,
      visitors: parsed.visitors || {},
      pages: parsed.pages || {},
      recent: parsed.recent || [],
    };
  } catch {
    return emptyStats();
  }
}

async function saveStats(stats: Stats) {
  stats.uniqueVisitors = Object.keys(stats.visitors).length;
  await writeFile(STATS_FILE(), JSON.stringify(stats, null, 2), "utf8");
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function json(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

/** Fallback ID from IP + browser so missing localStorage still separates people */
function deviceFallbackId(req: IncomingMessage): string {
  const ip =
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.socket.remoteAddress ||
    "unknown";
  const ua = req.headers["user-agent"] || "unknown";
  const hash = createHash("sha256").update(`${ip}|${ua}`).digest("hex").slice(0, 16);
  return `device_${hash}`;
}

function normalizeVisitorId(raw: string | undefined, req: IncomingMessage): string {
  const id = (raw || "").trim();
  // Old bug: everyone without localStorage became the same "anonymous"
  if (!id || id === "anonymous") return deviceFallbackId(req);
  return id.slice(0, 80);
}

/** Dev-only visitor counter: POST /api/visit · GET /api/stats */
export function visitorsPlugin(): Plugin {
  return {
    name: "visitors-counter",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";

        if (url === "/api/stats" && req.method === "GET") {
          void (async () => {
            try {
              const stats = await loadStats();
              const uniqueVisitors = Object.keys(stats.visitors).length;
              json(res, 200, {
                ok: true,
                totalPageViews: stats.totalPageViews,
                uniqueVisitors,
                pages: stats.pages,
                recent: stats.recent.slice(0, 50),
              });
            } catch (err) {
              console.error("[visitors]", err);
              json(res, 500, { ok: false, error: "Failed to load stats" });
            }
          })();
          return;
        }

        if (url === "/api/visit" && req.method === "POST") {
          void (async () => {
            try {
              const raw = await readBody(req);
              const body = (raw ? JSON.parse(raw) : {}) as VisitBody;
              const path = (body.path || "/").slice(0, 200);
              const visitorId = normalizeVisitorId(body.visitorId, req);
              const at = new Date().toISOString();

              // Queue writes to avoid race conditions
              writeChain = writeChain.then(async () => {
                const stats = await loadStats();

                // Dedupe React Strict Mode double-fires (same visitor + path within 2s)
                const last = stats.recent[0];
                const dup =
                  last &&
                  last.visitorId === visitorId &&
                  last.path === path &&
                  Date.now() - new Date(last.at).getTime() < 2000;

                if (!dup) {
                  stats.totalPageViews += 1;
                  stats.pages[path] = (stats.pages[path] || 0) + 1;

                  const existing = stats.visitors[visitorId];
                  if (!existing) {
                    stats.visitors[visitorId] = { firstSeen: at, lastSeen: at, views: 1 };
                  } else {
                    existing.lastSeen = at;
                    existing.views += 1;
                  }

                  stats.recent.unshift({ at, path, visitorId });
                  if (stats.recent.length > 200) stats.recent.length = 200;
                }

                await saveStats(stats);

                json(res, 200, {
                  ok: true,
                  totalPageViews: stats.totalPageViews,
                  uniqueVisitors: Object.keys(stats.visitors).length,
                });
              });

              await writeChain;
            } catch (err) {
              console.error("[visitors]", err);
              json(res, 500, { ok: false, error: "Failed to record visit" });
            }
          })();
          return;
        }

        return next();
      });
    },
  };
}
