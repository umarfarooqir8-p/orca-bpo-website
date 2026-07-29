import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";

const VISITOR_KEY = "orca_visitor_id";

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "anonymous";
  }
}

/** Records a page view on every route change (local analytics). */
export function useTrackVisit() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const visitorId = getVisitorId();
    void fetch("/api/visit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: pathname, visitorId }),
      keepalive: true,
    }).catch(() => {
      // Ignore — analytics must never break the site
    });
  }, [pathname]);
}
