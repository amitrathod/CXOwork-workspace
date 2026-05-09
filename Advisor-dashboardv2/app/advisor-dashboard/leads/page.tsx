"use client";

/**
 * /advisor-dashboard/leads → "Proposals & Offers"
 *
 * Clients who've had an intro call send a formal offer. Sarah (advisor) can:
 *  • Send a counter-proposal (custom rate / hours / note)
 *  • Accept the offer as-is
 *  • Decline the offer
 *
 * On acceptance → a Draft contract is created and appears in Contracts
 * with a "New" badge.
 */

import { useState } from "react";
import { useProposals } from "@/lib/proposal-context";
import type { ClientOffer } from "@/lib/proposal-context";
import {
  CheckCircle2, XCircle, Clock, Zap,
  Send, FileText, Sparkles,
} from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */

type Filter = "all" | "pending" | "accepted" | "declined";

/* ─── Status chip ────────────────────────────────────────────────────────── */

function StatusChip({ status }: { status: ClientOffer["status"] }) {
  const MAP: Record<ClientOffer["status"], { label: string; cls: string; Icon: React.ElementType }> = {
    offer_received : { label: "Offer received",  cls: "bg-amber-50 text-amber-700 border-amber-200",  Icon: Zap          },
    proposal_sent  : { label: "Proposal sent",   cls: "bg-blue-50  text-blue-700  border-blue-200",   Icon: Send         },
    accepted       : { label: "Accepted",         cls: "bg-green-50 text-green-700 border-green-200", Icon: CheckCircle2 },
    declined       : { label: "Declined",         cls: "bg-gray-100 text-gray-500  border-gray-200",  Icon: XCircle      },
  };
  const { label, cls, Icon } = MAP[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold border ${cls}`}>
      <Icon className="w-3 h-3" />{label}
    </span>
  );
}

/* ─── Send-proposal modal ────────────────────────────────────────────────── */

function ProposalModal({
  offer,
  onClose,
  onSend,
}: {
  offer: ClientOffer;
  onClose: () => void;
  onSend: (rate: string, hours: number, note: string) => void;
}) {
  const [rate,  setRate ] = useState(offer.advisorRate  ?? offer.clientRate);
  const [hours, setHours] = useState(offer.advisorHours ?? offer.clientHours);
  const [note,  setNote ] = useState(offer.advisorNote  ?? "");
  const [error, setError] = useState("");

  function handleSend() {
    if (!rate.trim())  { setError("Please enter a rate."); return; }
    if (hours <= 0)    { setError("Hours must be greater than 0."); return; }
    onSend(rate.trim(), hours, note.trim());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden">

        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full ${offer.avatarColor} flex items-center justify-center text-white font-bold text-[13px] shrink-0`}>
              {offer.clientInitials}
            </div>
            <div>
              <p className="text-[15px] font-bold text-gray-900">Send your proposal</p>
              <p className="text-[12.5px] text-gray-500">{offer.clientName} · {offer.company}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">

          {/* Client's offer summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mb-2">Client offered</p>
            <div className="flex items-center gap-4 text-[13px] text-gray-700">
              <span className="font-semibold text-gray-900">{offer.clientRate}</span>
              <span className="text-gray-400">·</span>
              <span>{offer.clientHours} hrs/wk</span>
              <span className="text-gray-400">·</span>
              <span>{offer.clientBudget} total</span>
            </div>
          </div>

          {/* Your rate */}
          <div>
            <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
              Your rate
            </label>
            <input
              type="text"
              value={rate}
              onChange={e => setRate(e.target.value)}
              placeholder="e.g. $400/hr"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Hours / week */}
          <div>
            <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
              Hours per week
            </label>
            <input
              type="number"
              min={1}
              value={hours}
              onChange={e => setHours(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-[12.5px] font-semibold text-gray-700 mb-1.5">
              Note to client <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              rows={3}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Briefly explain your rate or any adjustments…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-[14px] text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
            />
          </div>

          {error && <p className="text-[12.5px] text-red-500">{error}</p>}
        </div>

        {/* Footer */}
        <div className="px-6 pb-5 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-[13.5px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex-1 px-4 py-2.5 rounded-lg bg-blue-600 text-white text-[13.5px] font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            Send proposal
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Offer card ─────────────────────────────────────────────────────────── */

function OfferCard({
  offer,
  onSendProposal,
  onAccept,
  onDecline,
}: {
  offer         : ClientOffer;
  onSendProposal: (o: ClientOffer) => void;
  onAccept      : (id: string) => void;
  onDecline     : (id: string) => void;
}) {
  const isPending  = offer.status === "offer_received";
  const isSent     = offer.status === "proposal_sent";
  const isAccepted = offer.status === "accepted";
  const isDeclined = offer.status === "declined";

  return (
    <div className={`bg-white border rounded-xl p-5 transition-all ${
      isPending  ? "border-amber-200 shadow-sm" :
      isSent     ? "border-blue-200 shadow-sm"  :
      isAccepted ? "border-green-200"           :
      "border-gray-200 opacity-70"
    }`}>
      <div className="flex items-start gap-4">

        {/* Avatar */}
        <div className={`w-11 h-11 rounded-full ${offer.avatarColor} flex items-center justify-center text-white font-bold text-[14px] shrink-0`}>
          {offer.clientInitials}
        </div>

        {/* Main body */}
        <div className="flex-1 min-w-0">

          {/* Title row */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15.5px] font-bold text-gray-900 leading-snug">{offer.clientName}</span>
                <StatusChip status={offer.status} />
              </div>
              <p className="text-[12.5px] text-gray-500 mt-0.5">
                {offer.company} · {offer.industry} · {offer.role}
              </p>
            </div>
            <span className="text-[11.5px] text-gray-400 shrink-0 mt-0.5">{offer.receivedAt}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {offer.tags.map(tag => (
              <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                {tag}
              </span>
            ))}
          </div>

          {/* Terms grid */}
          <div className="grid grid-cols-3 gap-3 mt-3">
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <p className="text-[10.5px] text-gray-400 font-medium uppercase tracking-wide">Client rate</p>
              <p className="text-[13.5px] font-bold text-gray-900 mt-0.5">{offer.clientRate}</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <p className="text-[10.5px] text-gray-400 font-medium uppercase tracking-wide">Hours/wk</p>
              <p className="text-[13.5px] font-bold text-gray-900 mt-0.5">{offer.clientHours} hrs</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <p className="text-[10.5px] text-gray-400 font-medium uppercase tracking-wide">Total budget</p>
              <p className="text-[13.5px] font-bold text-gray-900 mt-0.5">{offer.clientBudget}</p>
            </div>
          </div>

          {/* Client message */}
          <div className="mt-3 px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[13px] text-gray-600 leading-relaxed italic">
            &ldquo;{offer.clientMessage}&rdquo;
          </div>

          {/* Proposal sent — show counter-terms */}
          {(isSent || isAccepted) && offer.advisorRate && (
            <div className="mt-3 px-3.5 py-3 bg-blue-50 border border-blue-100 rounded-xl">
              <p className="text-[11px] font-semibold text-blue-500 uppercase tracking-wide mb-1.5">
                {isAccepted ? "Agreed terms" : "Your counter-proposal"}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
                <span className="font-bold text-blue-900">{offer.advisorRate}</span>
                <span className="text-blue-700">· {offer.advisorHours} hrs/wk</span>
              </div>
              {offer.advisorNote && (
                <p className="text-[12.5px] text-blue-700 mt-1.5 italic leading-snug">
                  &ldquo;{offer.advisorNote}&rdquo;
                </p>
              )}
            </div>
          )}

          {/* Accepted — draft contract notice */}
          {isAccepted && (
            <div className="mt-3 flex items-center gap-2.5 px-3.5 py-3 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
              <div>
                <p className="text-[13px] font-semibold text-green-800">Contract drafted</p>
                <p className="text-[12px] text-green-600 mt-0.5">
                  A draft contract has been created — check{" "}
                  <span className="font-semibold">Manage work → Contracts</span>{" "}
                  to review and sign.
                </p>
              </div>
            </div>
          )}

          {/* Declined state */}
          {isDeclined && (
            <div className="mt-3 flex items-center gap-2 text-[12.5px] text-gray-400 font-medium">
              <XCircle className="w-4 h-4 shrink-0" />
              You declined this offer
            </div>
          )}

          {/* Action buttons */}
          {(isPending || isSent) && (
            <div className="flex items-center gap-2.5 mt-4 pt-3.5 border-t border-gray-100 flex-wrap">

              {isPending && (
                <>
                  <button
                    type="button"
                    onClick={() => onSendProposal(offer)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-[13.5px] font-semibold hover:bg-blue-700 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send proposal
                  </button>
                  <button
                    type="button"
                    onClick={() => onAccept(offer.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-green-200 bg-green-50 text-green-700 text-[13.5px] font-semibold hover:bg-green-100 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Accept as offered
                  </button>
                  <button
                    type="button"
                    onClick={() => onDecline(offer.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 text-[13.5px] font-medium hover:bg-gray-50 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Decline
                  </button>
                </>
              )}

              {isSent && (
                <>
                  <button
                    type="button"
                    onClick={() => onSendProposal(offer)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-[13.5px] font-semibold hover:bg-blue-100 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Revise proposal
                  </button>
                  <button
                    type="button"
                    onClick={() => onAccept(offer.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-600 text-white text-[13.5px] font-semibold hover:bg-green-700 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Accept &amp; create contract
                  </button>
                  <button
                    type="button"
                    onClick={() => onDecline(offer.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-500 text-[13.5px] font-medium hover:bg-gray-50 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Decline
                  </button>
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function ProposalsPage() {
  const { offers, sendProposal, acceptOffer, declineOffer } = useProposals();
  const [filter,     setFilter    ] = useState<Filter>("all");
  const [modalOffer, setModalOffer] = useState<ClientOffer | null>(null);

  const pending  = offers.filter(o => o.status === "offer_received" || o.status === "proposal_sent");
  const accepted = offers.filter(o => o.status === "accepted");
  const declined = offers.filter(o => o.status === "declined");

  const filtered = offers.filter(o => {
    if (filter === "pending")  return o.status === "offer_received" || o.status === "proposal_sent";
    if (filter === "accepted") return o.status === "accepted";
    if (filter === "declined") return o.status === "declined";
    return true;
  });

  const TABS: { key: Filter; label: string; count?: number }[] = [
    { key: "all",      label: "All",      count: offers.length   },
    { key: "pending",  label: "Pending",  count: pending.length  },
    { key: "accepted", label: "Accepted", count: accepted.length },
    { key: "declined", label: "Declined", count: declined.length },
  ];

  function handleSend(rate: string, hours: number, note: string) {
    if (!modalOffer) return;
    sendProposal(modalOffer.id, rate, hours, note);
    setModalOffer(null);
  }

  return (
    <div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold tracking-tight">Proposals &amp; Offers</h1>
        <p className="text-sm text-gray-500 mt-1">
          Offers from clients you&apos;ve met — respond with your terms or accept to create a contract.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Pending",      value: String(pending.length),  sub: "awaiting your response", Icon: Clock,        color: "text-amber-500" },
          { label: "Accepted",     value: String(accepted.length), sub: "contracts drafted",       Icon: CheckCircle2, color: "text-green-500" },
          { label: "Total offers", value: String(offers.length),   sub: "received overall",        Icon: FileText,     color: "text-blue-500"  },
        ].map(({ label, value, sub, Icon, color }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl px-4 py-3.5">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              <span className="text-[11.5px] text-gray-400 font-medium">{label}</span>
            </div>
            <div className="text-[26px] font-bold text-gray-900 leading-tight">{value}</div>
            <div className="text-[12px] text-gray-400">{sub}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 mb-5 flex-wrap">
        {TABS.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-full text-[13.5px] font-medium border transition-colors inline-flex items-center gap-1.5 ${
              filter === key
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {label}
            {count !== undefined && count > 0 && (
              <span className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full leading-none ${
                filter === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
              }`}>
                {count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Offer cards */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-12 text-center">
          <Sparkles className="w-8 h-8 text-gray-200 mx-auto mb-3" />
          <p className="text-[14px] text-gray-400">No offers here yet.</p>
          <p className="text-[12.5px] text-gray-300 mt-1">
            When clients send you an offer after your intro call, it&apos;ll appear here.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map(offer => (
            <OfferCard
              key={offer.id}
              offer={offer}
              onSendProposal={o => setModalOffer(o)}
              onAccept={id => acceptOffer(id)}
              onDecline={id => declineOffer(id)}
            />
          ))}
        </div>
      )}

      {/* Proposal modal */}
      {modalOffer && (
        <ProposalModal
          offer={modalOffer}
          onClose={() => setModalOffer(null)}
          onSend={handleSend}
        />
      )}

    </div>
  );
}
