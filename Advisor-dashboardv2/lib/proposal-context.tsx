"use client";

/**
 * ProposalContext — manages inbound client offers and the advisor's
 * counter-proposals. When both sides agree, a draft contract is created
 * and surfaces in the contracts list with a "New" badge.
 *
 * Flow:
 *   offer_received → advisor sends proposal (proposal_sent)
 *                 → client accepts → accepted → draft contract created
 *   offer_received → advisor accepts as-is  → accepted → draft contract
 *   offer_received → advisor declines       → declined
 */

import {
  createContext, useCallback, useContext, useState, ReactNode,
} from "react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

export type OfferStatus =
  | "offer_received"   // client sent an offer, awaiting advisor response
  | "proposal_sent"    // advisor countered with their rate/terms
  | "accepted"         // agreed — draft contract created
  | "declined";        // advisor passed

export interface ClientOffer {
  id              : string;
  clientName      : string;
  clientInitials  : string;
  avatarColor     : string;
  company         : string;
  industry        : string;
  role            : string;
  clientRate      : string;      // rate client proposed
  clientHours     : number;
  clientBudget    : string;      // total estimated budget
  clientMessage   : string;
  receivedAt      : string;
  tags            : string[];
  status          : OfferStatus;
  advisorRate    ?: string;      // advisor's counter-rate
  advisorHours   ?: number;
  advisorNote    ?: string;
  contractId     ?: string;      // set once accepted
}

export interface DraftContract {
  id          : string;
  title       : string;
  clientName  : string;
  clientInit  : string;
  avatarColor : string;
  company     : string;
  role        : string;
  value       : string;
  rate        : string;
  period      : string;
  isNew       : boolean;        // shows "New" badge until dismissed
}

/* ─── Seed offers ────────────────────────────────────────────────────────── */

const SEED_OFFERS: ClientOffer[] = [
  {
    id            : "offer-1",
    clientName    : "Olivia Thompson",
    clientInitials: "OT",
    avatarColor   : "bg-violet-600",
    company       : "NexaCloud",
    industry      : "Fintech",
    role          : "Fractional CFO",
    clientRate    : "$300/hr",
    clientHours   : 15,
    clientBudget  : "$108,000",
    clientMessage : "Hi Sarah! We had a great intro call and the team is excited. We'd love to move forward. We've outlined initial terms below — happy to discuss if you'd like to adjust anything. Looking forward to working together!",
    receivedAt    : "Today, 9:14 AM",
    tags          : ["Series A", "Fintech", "15 hrs/wk"],
    status        : "offer_received",
  },
  {
    id            : "offer-2",
    clientName    : "James Wilson",
    clientInitials: "JW",
    avatarColor   : "bg-orange-500",
    company       : "StartupLab",
    industry      : "SaaS",
    role          : "Strategic Finance Advisor",
    clientRate    : "$350/hr",
    clientHours   : 8,
    clientBudget  : "$67,200",
    clientMessage : "Sarah — loved our conversation. We want to get you on board before our Series B kicks off in Q3. Please review the terms and let us know if you'd like to adjust the rate or scope.",
    receivedAt    : "Yesterday, 4:30 PM",
    tags          : ["Series B prep", "SaaS", "8 hrs/wk"],
    status        : "proposal_sent",
    advisorRate   : "$400/hr",
    advisorHours  : 8,
    advisorNote   : "Happy to proceed at $400/hr given the Series B timeline and complexity. Everything else looks great.",
  },
];

/* ─── Context ────────────────────────────────────────────────────────────── */

interface ProposalContextValue {
  offers          : ClientOffer[];
  draftContracts  : DraftContract[];
  newContractCount: number;
  sendProposal    : (offerId: string, rate: string, hours: number, note: string) => void;
  acceptOffer     : (offerId: string) => void;
  declineOffer    : (offerId: string) => void;
  dismissNew      : (contractId: string) => void;
}

const ProposalContext = createContext<ProposalContextValue>({
  offers          : [],
  draftContracts  : [],
  newContractCount: 0,
  sendProposal    : () => {},
  acceptOffer     : () => {},
  declineOffer    : () => {},
  dismissNew      : () => {},
});

export function ProposalProvider({ children }: { children: ReactNode }) {
  const [offers,         setOffers]         = useState<ClientOffer[]>(SEED_OFFERS);
  const [draftContracts, setDraftContracts] = useState<DraftContract[]>([]);

  function createDraftContract(offer: ClientOffer, agreedRate: string): DraftContract {
    const hrs    = offer.advisorHours ?? offer.clientHours;
    const weekly = `$${(parseInt(agreedRate.replace(/\D/g, "")) * hrs).toLocaleString()}`;
    return {
      id         : `draft-${offer.id}`,
      title      : `${offer.role} Engagement`,
      clientName : offer.clientName,
      clientInit : offer.clientInitials,
      avatarColor: offer.avatarColor,
      company    : offer.company,
      role       : offer.role,
      value      : offer.clientBudget,
      rate       : agreedRate,
      period     : "TBD – pending signatures",
      isNew      : true,
    };
  }

  const sendProposal = useCallback((offerId: string, rate: string, hours: number, note: string) => {
    setOffers(prev => prev.map(o =>
      o.id === offerId
        ? { ...o, status: "proposal_sent", advisorRate: rate, advisorHours: hours, advisorNote: note }
        : o,
    ));
  }, []);

  const acceptOffer = useCallback((offerId: string) => {
    setOffers(prev => {
      const offer = prev.find(o => o.id === offerId);
      if (!offer) return prev;
      const agreedRate = offer.advisorRate ?? offer.clientRate;
      const draft      = createDraftContract(offer, agreedRate);
      setDraftContracts(dc => [...dc, draft]);
      return prev.map(o => o.id === offerId ? { ...o, status: "accepted", contractId: draft.id } : o);
    });
  }, []);

  const declineOffer = useCallback((offerId: string) => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status: "declined" } : o));
  }, []);

  const dismissNew = useCallback((contractId: string) => {
    setDraftContracts(prev => prev.map(c => c.id === contractId ? { ...c, isNew: false } : c));
  }, []);

  const newContractCount = draftContracts.filter(c => c.isNew).length;

  return (
    <ProposalContext.Provider value={{
      offers, draftContracts, newContractCount,
      sendProposal, acceptOffer, declineOffer, dismissNew,
    }}>
      {children}
    </ProposalContext.Provider>
  );
}

export function useProposals() {
  return useContext(ProposalContext);
}
