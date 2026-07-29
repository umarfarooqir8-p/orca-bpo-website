import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

const STORAGE_KEY = "orca_visitor_id";

declare global {
  interface Window {
    __orcaVisitorId?: string;
  }
}

/** Stable ID per browser — never collapses everyone into "anonymous". */
function getVisitorId(): string {
  if (typeof window === "undefined") return "";

  if (window.__orcaVisitorId) return window.__orcaVisitorId;

  const makeId = () =>
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `v_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  try {
    let id = localStorage.getItem(STORAGE_KEY);
    if (!id) {
      id = makeId();
      localStorage.setItem(STORAGE_KEY, id);
    }
    window.__orcaVisitorId = id;
    return id;
  } catch {
    // Private mode / blocked storage → try session, then memory
    try {
      let id = sessionStorage.getItem(STORAGE_KEY);
      if (!id) {
        id = makeId();
        sessionStorage.setItem(STORAGE_KEY, id);
      }
      window.__orcaVisitorId = id;
      return id;
    } catch {
      const id = makeId();
      window.__orcaVisitorId = id;
      return id;
    }
  }
}

/** Silently records each page view for the /stats dashboard. */
export function VisitorTracker() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const last = useRef("");

  useEffect(() => {
    if (!pathname || pathname === "/stats") return;
    if (pathname === last.current) return;
    last.current = pathname;

    const visitorId = getVisitorId();
    if (!visitorId) return;

    void fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, visitorId }),
      keepalive: true,
    }).catch(() => {
      // Stats are best-effort
    });
  }, [pathname]);

  return null;
}
