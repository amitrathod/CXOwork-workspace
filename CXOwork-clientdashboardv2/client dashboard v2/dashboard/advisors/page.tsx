"use client";

/**
 * /dashboard/advisors — "Find CXO" page (currently locked).
 *
 * The open-directory browse experience is paused while we focus on the
 * curated "Matched CXO" flow. The page is left in place (rather than
 * deleted) so:
 *   • the route stays valid for any stale links / deep bookmarks,
 *   • the previous implementation lives in git history if we want it
 *     back later,
 *   • the sidebar can still surface it as a feature-locked nav item.
 *
 * The full advisor-list + filter + modal implementation that used to
 * live here is preserved in the migration history; restoring it is a
 * matter of reverting this file and removing the feature-lock flag in
 * components/client-dashboard/Sidebar.tsx.
 */

import { ComingSoon } from "@/components/client-dashboard/ComingSoon";

export default function SearchCXOPage() {
  return (
    <ComingSoon
      title="Search CXO"
      subtitle="Browse the full network of fractional executives."
      body="We're rolling this out shortly. In the meantime, our team is hand-picking executives for you — head over to Matched CXO to see who we've matched to your needs."
    />
  );
}
