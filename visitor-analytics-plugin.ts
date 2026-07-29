import type { Plugin } from "vite";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

type VisitBody = {
  path?: string;
  visitorId?: string;
  referrer?: string;
};

type StatsStore = {
  totalPageViews: number;
  uniqueVisitors: string[];
  byPath: Record<string, number>;
  recent: Array<{
    path: string;
    visitorId: string;
    at: string;
    referrer: string;
  }>;
};

const STATS_FILE = () => join(process.cwd(), "visitor-stats.json");

function emptyStats(): StatsStore {
  return {
    totalPageViews: 0,
    uniqueVisitors: [],
    byPath: {},
    recent: [],
  };
}

async function loadStats(): Promise<StatsStore> {
  const file = STATS_FILE();
  if (!existsSync(file)) return emptyStats();
  try {
    const raw = await readFile(file, "utf8");
    return { ...emptyStats(), ...JSON.parse(raw) } as StatsStore;
  } catch {
    return emptyStats();
  }
}

async function saveStats(stats: StatsStore) {
  await writeFile(STATS_FILE(), JSON.stringify(stats, null, 2), "utf8");
}

function readBody(req: import("node:http").IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (c) => chunks.push(Buffer.isBuffer(c) ? c : Buffer.from(c)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function json(res: import("node:http").ServerResponse, status: number, data: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

function publicStats(stats: StatsStore) {
  return {
    totalPageViews: stats.totalPageViews,
    uniqueVisitors: stats.uniqueVisitors.length,
    byPath: stats.byPath,
    recent: stats.recent.slice(0, 20),
  };
}

/** Dev-only visitor counter: POST /api/visit · GET /api/stats */
export function visitorAnalyticsPlugin(): Plugin {
  return {
    name: "visitor-analytics",
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0] ?? "";

        if (url === "/api/stats" && req.method === "GET") {
          try {
            const stats = await loadStats();
            json(res, 200, { ok: true, ...publicStats(stats) });
          } catch (err) {
            console.error("[visitor-analytics]", err);
            json(res, 500, { ok: false, error: "Failed to load stats" });
          }
          return;
        }

        if (url === "/api/visit" && req.method === "POST") {
          try {
            const raw = await readBody(req);
            const body = (raw ? JSON.parse(raw) : {}) as VisitBody;
            const path = (body.path || "/").slice(0, 200);
            const visitorId = (body.visitorId || "anonymous").slice(0, 80);
            const referrer = (body.referrer || "").slice(0, 300);

            const stats = await loadStats();
            stats.totalPageViews += 1;
            stats.byPath[path] = (stats.byPath[path] || 0) + 1;
            if (visitorId !== "anonymous" && !stats.uniqueVisitors.includes(visitorId)) {
              stats.uniqueVisitors.push(visitorId);
            }
            stats.recent.unshift({
              path,
              visitorId: visitorId.slice(0, 8),
              at: new Date().toISOString(),
              referrer,
            });
            stats.recent = stats.recent.slice(0, 100);
            await saveStats(stats);

            json(res, 200, { ok: true, ...publicStats(stats) });
          } catch (err) {
            console.error("[visitor-analytics]", err);
            json(res, 500, { ok: false, error: "Failed to record visit" });
          }
          return;
        }

        return next();
      });
    },
  };
}
