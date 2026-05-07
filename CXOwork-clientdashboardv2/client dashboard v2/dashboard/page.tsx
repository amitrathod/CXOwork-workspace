"use client";

/**
 * /dashboard — root client-dashboard route.
 *
 * Default landing decision:
 *   - profileStatus === 'under_review' → /dashboard/profile (locked
 *     account; nothing else is reachable yet, so jump straight to the
 *     screen they can actually use)
 *   - otherwise → /dashboard/advisors (Find Advisor — the iframe's
 *     default landing)
 *
 * The DashboardShell layout has already done auth + persona gating by
 * the time this renders. The LockedNavGuard inside the shell will
 * catch any direct /dashboard/<x> URL hits for locked users too, so
 * even a stale bookmark to /dashboard/advisors lands on /profile.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useClient } from "@/lib/client-context";

export default function ClientDashboardRoot() {
  const router = useRouter();
  const { client, loading } = useClient();

  useEffect(() => {
    if (loading) return;        // wait for client doc to hydrate
    const locked = client?.profileStatus === "under_review";
    router.replace(locked ? "/dashboard/profile" : "/dashboard/advisors");
  }, [router, client, loading]);

  return (
    <div className="grid place-items-center py-20">
      <div className="w-9 h-9 rounded-full border-[3px] border-gray-200 border-t-blue-600 animate-spin" />
    </div>
  );
}
