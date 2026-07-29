import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BarChart3, Eye, Users, ArrowLeft, RefreshCw, Power } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/stats")({
  head: () => ({
    meta: [
      { title: "Visitor Stats — ORCA BPO" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: StatsPage,
});

type StatsResponse = {
  ok: boolean;
  totalPageViews: number;
  uniqueVisitors: number;
  pages: Record<string, number>;
  recent: Array<{ at: string; path: string; visitorId: string }>;
  error?: string;
};

function StatsPage() {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formActive, setFormActive] = useState<boolean | null>(null);
  const [toggling, setToggling] = useState(false);
  /** Vite local APIs exist only on npm run dev — not on Lovable public site */
  const [localApi, setLocalApi] = useState<boolean | null>(null);

  async function loadFormStatus() {
    try {
      const res = await fetch("/api/form-status");
      const json = (await res.json()) as { ok?: boolean; active?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load form status");
      setLocalApi(true);
      setFormActive(Boolean(json.active));
    } catch {
      setLocalApi(false);
      setFormActive(null);
    }
  }

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stats");
      const json = (await res.json()) as StatsResponse;
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed to load");
      setLocalApi(true);
      setStats(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn’t load stats");
      setStats(null);
    } finally {
      setLoading(false);
    }
  }

  async function setFormOn(active: boolean) {
    if (!localApi) {
      toast.error("Activate/Deactivate only works on your laptop (localhost), not the public Lovable site.");
      return;
    }
    setToggling(true);
    try {
      const res = await fetch("/api/form-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      });
      const json = (await res.json()) as { ok?: boolean; active?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Couldn’t update form");
      setFormActive(Boolean(json.active));
      toast.success(active ? "Contact form activated" : "Contact form deactivated");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Couldn’t update form");
    } finally {
      setToggling(false);
    }
  }

  useEffect(() => {
    void load();
    void loadFormStatus();
  }, []);

  const pageRows = stats
    ? Object.entries(stats.pages).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <div className="min-h-screen bg-[#05070a] text-white">
      <SiteHeader />

      <section className="relative overflow-hidden border-b border-white/10 py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(37,99,235,0.2),transparent_55%)]" />
        <div className="relative mx-auto flex max-w-5xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#3b82f6]">Analytics</p>
            <h1 className="mt-2 flex items-center gap-3 font-display text-3xl font-bold sm:text-4xl">
              <BarChart3 className="h-8 w-8 text-[#3b82f6]" />
              Visitor stats
            </h1>
            <p className="mt-3 text-white/60">
              {localApi === false
                ? "Visitor counts and form on/off only work on your laptop. On this public site, contact messages go to Notepad when the receiver is running on your PC."
                : "Counts people who open your site while the local server is running."}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              className="border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white"
              onClick={() => void load()}
              disabled={loading || localApi === false}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button asChild className="bg-[#2563eb] text-white hover:bg-[#1d4ed8]">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" /> Home
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {localApi === false ? (
            <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              You’re on the <strong>public</strong> site. Activate / Deactivate and visitor stats need{" "}
              <code className="text-amber-50">localhost</code>. Contact messages go to{" "}
              <strong>Notepad</strong> when <strong>ORCA Notepad Receiver</strong> is running on your PC.
            </div>
          ) : (
            error && (
              <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}. Restart the dev server if you just added this feature.
              </div>
            )
          )}

          <div className="mb-8 rounded-3xl border border-white/10 bg-[#0c1118] p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-white/50">
                  <Power className="h-4 w-4 text-[#3b82f6]" /> Contact form
                </div>
                <h2 className="mt-2 font-display text-xl font-semibold">
                  {localApi === false
                    ? "Notepad only (public site)"
                    : formActive === null
                      ? "Status unknown"
                      : formActive
                        ? "Form is active"
                        : "Form is off"}
                </h2>
                <p className="mt-2 max-w-xl text-sm text-white/55">
                  {localApi === false
                    ? "Google Sheets is disconnected on the live site. Messages open in Notepad on your PC when the receiver is running."
                    : "When active, Contact page submissions open in Notepad. Turn it off anytime to stop new messages."}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  disabled={toggling || localApi === false || formActive === true}
                  className="bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40"
                  onClick={() => void setFormOn(true)}
                >
                  Activate form
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={toggling || localApi === false || formActive === false}
                  className="border-red-500/40 bg-transparent text-red-200 hover:bg-red-500/10 hover:text-red-100 disabled:opacity-40"
                  onClick={() => void setFormOn(false)}
                >
                  Deactivate form
                </Button>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#0c1118] p-8">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Users className="h-4 w-4 text-[#3b82f6]" /> Unique visitors
              </div>
              <div className="mt-3 font-display text-5xl font-bold text-[#3b82f6]">
                {loading && !stats ? "…" : (stats?.uniqueVisitors ?? 0)}
              </div>
              <p className="mt-2 text-xs text-white/40">
                Counts different browsers/devices. Same person on phone + laptop = 2.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#0c1118] p-8">
              <div className="flex items-center gap-2 text-sm text-white/50">
                <Eye className="h-4 w-4 text-[#3b82f6]" /> Total page views
              </div>
              <div className="mt-3 font-display text-5xl font-bold text-white">
                {loading && !stats ? "…" : (stats?.totalPageViews ?? 0)}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-[#0c1118] p-6">
              <h2 className="font-display text-lg font-semibold">Views by page</h2>
              <ul className="mt-4 space-y-3">
                {pageRows.length === 0 && (
                  <li className="text-sm text-white/45">No visits recorded yet. Open Home or Services first.</li>
                )}
                {pageRows.map(([path, count]) => (
                  <li key={path} className="flex items-center justify-between text-sm">
                    <span className="font-mono text-white/75">{path}</span>
                    <span className="font-semibold text-[#3b82f6]">{count}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#0c1118] p-6">
              <h2 className="font-display text-lg font-semibold">Recent activity</h2>
              <ul className="mt-4 max-h-80 space-y-3 overflow-y-auto">
                {(stats?.recent?.length ?? 0) === 0 && (
                  <li className="text-sm text-white/45">Nothing yet.</li>
                )}
                {stats?.recent?.map((r, i) => (
                  <li key={`${r.at}-${i}`} className="border-b border-white/5 pb-3 text-sm last:border-0">
                    <div className="flex justify-between gap-3">
                      <span className="font-mono text-white/80">{r.path}</span>
                      <span className="shrink-0 text-white/40">{new Date(r.at).toLocaleString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
