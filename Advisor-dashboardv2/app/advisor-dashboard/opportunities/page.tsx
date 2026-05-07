"use client";

import { useAdvisor } from "@/lib/advisor-context";
import { ComingSoon } from "@/components/advisor-dashboard/ComingSoon";

export default function OpportunitiesPage() {
  const { advisor } = useAdvisor();
  const isActive = advisor?.profileStatus === "active";
  return (
    <ComingSoon
      title="Opportunities"
      subtitle="Curated client matches we&apos;ve picked for you."
      body={
        isActive
          ? "We&apos;re lining up your first matches. You&apos;ll see them here as soon as we have a fit."
          : "Opportunities unlock once your profile is approved. Finish your profile to move to the front of the review queue."
      }
    />
  );
}
