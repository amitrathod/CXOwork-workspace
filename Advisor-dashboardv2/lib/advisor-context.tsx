"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import type { AdvisorProfile } from "@/types/advisor";
import { MOCK_ADVISOR } from "@/lib/mock-data";

interface AdvisorContextValue {
  uid    : string | null;
  advisor: AdvisorProfile | null;
  loading: boolean;
  refresh: () => void;
}

const AdvisorContext = createContext<AdvisorContextValue>({
  uid    : null,
  advisor: null,
  loading: false,
  refresh: () => {},
});

export function AdvisorProvider({ children }: { children: ReactNode }) {
  const [advisor, setAdvisor] = useState<AdvisorProfile>(MOCK_ADVISOR);

  const refresh = useCallback(() => {
    // In mock mode, re-read from the mock source
    setAdvisor({ ...MOCK_ADVISOR });
  }, []);

  return (
    <AdvisorContext.Provider value={{ uid: MOCK_ADVISOR.uid, advisor, loading: false, refresh }}>
      {children}
    </AdvisorContext.Provider>
  );
}

export function useAdvisor() {
  return useContext(AdvisorContext);
}
