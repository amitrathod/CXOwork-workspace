"use client";

/**
 * MatchContext — shared state for inbound client match requests.
 *
 * Provided at DashboardShell level so TopNav (bell badge) and the
 * Messages page (match thread cards) both read from the same source.
 *
 * In production this would be backed by Firestore; here we use
 * seeded mock data so the full UI flow is explorable.
 */

import { createContext, useCallback, useContext, useState, ReactNode } from "react";

export type MatchStatus = "pending" | "accepted" | "denied";

export interface MatchRequest {
  id             : string;
  clientUid      : string;
  clientName     : string;
  clientInitials : string;
  avatarColor    : string;
  company        : string;
  industry       : string;
  role           : string;          // role they're looking for
  intro          : string;          // client's intro message
  receivedAt     : string;
  rate           : string;          // proposed rate or budget
  hoursPerWeek   : number;
  status         : MatchStatus;
}

/* ─── Seed data ─────────────────────────────────────────────────────────── */

const SEED_MATCHES: MatchRequest[] = [
  {
    id             : "mr-1",
    clientUid      : "client-otx",
    clientName     : "Olivia Thompson",
    clientInitials : "OT",
    avatarColor    : "bg-violet-600",
    company        : "NexaCloud",
    industry       : "Fintech",
    role           : "Fractional CFO",
    intro          : "Hi Alex! We're a Series A fintech building payments infrastructure and we need a fractional CFO to help us build out our finance function ahead of our Series B. Your SaaS background looks like a strong fit. Would love to connect.",
    receivedAt     : "Just now",
    rate           : "$350/hr",
    hoursPerWeek   : 15,
    status         : "pending",
  },
  {
    id             : "mr-2",
    clientUid      : "client-jws",
    clientName     : "James Wilson",
    clientInitials : "JW",
    avatarColor    : "bg-orange-500",
    company        : "StartupLab",
    industry       : "SaaS",
    role           : "Strategic Finance Advisor",
    intro          : "Hey Alex — we met briefly at SaaStr last year. We're kicking off our Series B process in Q3 and could really use your fundraising expertise. Interested in a quick intro call?",
    receivedAt     : "2 hours ago",
    rate           : "$400/hr",
    hoursPerWeek   : 8,
    status         : "pending",
  },
];

/* ─── Context ───────────────────────────────────────────────────────────── */

interface MatchContextValue {
  matches        : MatchRequest[];
  pendingCount   : number;
  accept         : (id: string) => void;
  deny           : (id: string) => void;
}

const MatchContext = createContext<MatchContextValue>({
  matches      : [],
  pendingCount : 0,
  accept       : () => {},
  deny         : () => {},
});

export function MatchProvider({ children }: { children: ReactNode }) {
  const [matches, setMatches] = useState<MatchRequest[]>(SEED_MATCHES);

  const accept = useCallback((id: string) => {
    setMatches((prev) => prev.map((m) => m.id === id ? { ...m, status: "accepted" } : m));
  }, []);

  const deny = useCallback((id: string) => {
    setMatches((prev) => prev.map((m) => m.id === id ? { ...m, status: "denied" } : m));
  }, []);

  const pendingCount = matches.filter((m) => m.status === "pending").length;

  return (
    <MatchContext.Provider value={{ matches, pendingCount, accept, deny }}>
      {children}
    </MatchContext.Provider>
  );
}

export function useMatches() {
  return useContext(MatchContext);
}
