"use client";

/**
 * /advisor-dashboard/clients — "Your Matches" page.
 *
 * Two layers of data:
 *  1. Match requests from useMatches() — pending/accepted/denied invites from
 *     Olivia Thompson, James Wilson, etc. Pending ones show Accept / Pass.
 *  2. Established Firestore matches — active engagements like Alex Johnson /
 *     GrowthTech that already have contracts.
 *
 * Pending requests sit at the top; the rest follow below.
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, MessageSquare, Eye, CheckCircle2, XCircle, Zap, Star } from "lucide-react";
import { useAdvisor } from "@/lib/advisor-context";
import { useMatches } from "@/lib/match-context";
import type { MatchRequest } from "@/lib/match-context";
import {
  ensureThread,
  fetchMatchedClient,
  subscribeAdvisorMatches,
} from "@/lib/firestore-advisor";
import type { AdvisorMatch, MatchedClientProfile } from "@/types/advisor";

interface HydratedMatch {
  match : AdvisorMatch;
  client: MatchedClientProfile | null;
}

/* ─── Match-request card (pending / actioned) ────────────────────────────── */

function MatchRequestCard({
  m,
  onAccept,
  onPass,
  onViewInMessages,
}: {
  m               : MatchRequest;
  onAccept        : () => void;
  onPass          : () => void;
  onViewInMessages: () => void;
}) {
  const isPending  = m.status === "pending";
  const isAccepted = m.status === "accepted";
  const isDenied   = m.status === "denied";

  return (
    <div className={`bg-white border rounded-xl p-5 transition-all ${
      isPending  ? "border-amber-200 shadow-sm"  :
      isAccepted ? "border-green-200"            :
      "border-gray-200 opacity-60"
    }`}>
      <div className="flex items-start gap-4">

        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full ${m.avatarColor} flex items-center justify-center text-white font-bold text-[14px] shrink-0`}>
          {m.clientInitials}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">

          {/* Name + status */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[16px] font-bold text-gray-900 leading-snug">{m.clientName}</span>
                {isPending && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                    <Zap className="w-2.5 h-2.5" />New match
                  </span>
                )}
                {isAccepted && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-green-100 text-green-700 border border-green-200">
                    <CheckCircle2 className="w-2.5 h-2.5" />Match accepted
                  </span>
                )}
                {isDenied && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-gray-100 text-gray-500 border border-gray-200">
                    <XCircle className="w-2.5 h-2.5" />Passed
                  </span>
                )}
              </div>
              <p className="text-[12.5px] text-gray-500 mt-0.5">
                {m.company} · {m.industry}
              </p>
            </div>
            <span className="text-[11.5px] text-gray-400 shrink-0 mt-0.5">{m.receivedAt}</span>
          </div>

          {/* Terms grid */}
          <div className="grid grid-cols-3 gap-2.5 mt-3">
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <p className="text-[10.5px] text-gray-400 font-medium uppercase tracking-wide">Role</p>
              <p className="text-[13px] font-bold text-gray-900 mt-0.5 leading-snug">{m.role}</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <p className="text-[10.5px] text-gray-400 font-medium uppercase tracking-wide">Rate</p>
              <p className="text-[13px] font-bold text-gray-900 mt-0.5">{m.rate}</p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2">
              <p className="text-[10.5px] text-gray-400 font-medium uppercase tracking-wide">Commitment</p>
              <p className="text-[13px] font-bold text-gray-900 mt-0.5">{m.hoursPerWeek} hrs/wk</p>
            </div>
          </div>

          {/* Intro message */}
          <div className="mt-3 px-3.5 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[13px] text-gray-600 leading-relaxed italic">
            &ldquo;{m.intro}&rdquo;
          </div>

          {/* Post-accept message */}
          {isAccepted && (
            <div className="mt-3 flex items-start gap-2.5 px-3.5 py-3 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[13px] font-semibold text-green-800">Profile shared with {m.clientName}</p>
                <p className="text-[12px] text-green-700 mt-0.5">
                  We&apos;ve presented your profile. {m.clientName} will reach out and schedule an intro call when ready.
                </p>
              </div>
            </div>
          )}

          {/* Action buttons — pending only */}
          {isPending && (
            <div className="flex items-center gap-2.5 mt-4 pt-3.5 border-t border-gray-100 flex-wrap">
              <button
                type="button"
                onClick={onAccept}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-blue-600 text-white text-[13.5px] font-semibold hover:bg-blue-700 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Accept match
              </button>
              <button
                type="button"
                onClick={onPass}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-[13.5px] font-medium hover:bg-gray-50 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Pass
              </button>
              <button
                type="button"
                onClick={onViewInMessages}
                className="ml-auto text-[12.5px] text-blue-600 hover:underline font-medium"
              >
                View thread in Messages →
              </button>
            </div>
          )}

          {/* Accepted — quick link to Messages */}
          {isAccepted && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={onViewInMessages}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-medium border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                View in Messages
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ─── Firestore-backed client card ───────────────────────────────────────── */

function ClientCard({
  row, locked, sending, error, onView, onSend,
}: {
  row    : HydratedMatch;
  locked : boolean;
  sending: boolean;
  error  : boolean;
  onView : () => void;
  onSend : () => void;
}) {
  const c = row.client;

  const companyName = c?.companyName || "Company";
  const founderName = c
    ? [c.firstName, c.lastName].filter(Boolean).join(" ") || null
    : null;

  const website = c?.companyWebsite
    ? (c.companyWebsite.startsWith("http") ? c.companyWebsite : `https://${c.companyWebsite}`)
    : null;
  const websiteLabel = c?.companyWebsite?.replace(/^https?:\/\//, "").replace(/\/$/, "") || null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all">
      <div className="flex items-start gap-4">

        <div className="shrink-0 w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 grid place-items-center">
          <Building2 className="w-6 h-6 text-gray-400" />
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[16px] font-bold text-gray-900 leading-snug">{companyName}</span>
            {founderName && (
              <span className="text-[13px] text-gray-500 font-normal">{founderName}</span>
            )}
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-green-100 text-green-700 border border-green-200">
              <Star className="w-2.5 h-2.5" />Active client
            </span>
          </div>

          {website && websiteLabel && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-0.5 text-[13px] text-blue-600 hover:underline font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              {websiteLabel}
            </a>
          )}

          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            {c?.prefRole && (
              <span className="text-[11.5px] font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Looking for {c.prefRole}
              </span>
            )}
            {c?.companyIndustry && (
              <span className="text-[11.5px] font-medium px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                {c.companyIndustry}
              </span>
            )}
          </div>

          {c?.lookingFor && (
            <p className="mt-2.5 text-[13px] text-gray-600 leading-[1.55] line-clamp-2">
              {c.lookingFor}
            </p>
          )}

          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              onClick={onView}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-medium border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 shrink-0" />
              View project details
            </button>

            <button
              type="button"
              onClick={onSend}
              disabled={locked || sending}
              title={locked ? "Available once your profile is approved" : ""}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              {sending ? "Opening…" : "Send message"}
            </button>

            {error && (
              <span className="text-[11.5px] text-red-600 ml-1">Couldn&apos;t open chat. Try again.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Profile modal (Firestore) ──────────────────────────────────────────── */

function ClientProfileModal({
  row, onClose, onSend, locked,
}: {
  row    : HydratedMatch;
  onClose: () => void;
  onSend : () => void;
  locked : boolean;
}) {
  const c = row.client;

  const companyName = c?.companyName || "Company";
  const founderName = c
    ? [c.firstName, c.lastName].filter(Boolean).join(" ") || null
    : null;

  const website = c?.companyWebsite
    ? (c.companyWebsite.startsWith("http") ? c.companyWebsite : `https://${c.companyWebsite}`)
    : null;

  useEffect(() => {
    function onEsc(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [onClose]);

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 9000, background: "rgba(15,23,42,0.40)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "5vh 16px", overflowY: "auto" }}
    >
      <div style={{ background: "#fff", borderRadius: 14, boxShadow: "0 20px 60px rgba(0,0,0,0.25)", display: "flex", flexDirection: "column", width: "100%", maxWidth: 720, maxHeight: "90vh", colorScheme: "light" }}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-[16px] font-bold m-0">Project Details</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-16 h-16 rounded-xl bg-gray-100 border border-gray-200 grid place-items-center shrink-0">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
            <div className="min-w-0">
              <div className="text-[20px] font-bold text-gray-900 leading-snug">{companyName}</div>
              {founderName && (
                <p className="text-[13.5px] text-gray-500 mt-0.5 m-0">{founderName}</p>
              )}
              {c?.email && (
                <div className="text-[12.5px] text-gray-400 mt-0.5">{c.email}</div>
              )}
              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-1 text-[13px] text-blue-600 hover:underline font-medium"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                  {c?.companyWebsite?.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              )}
            </div>
          </div>

          {c?.lookingFor && (
            <Section title="What they're looking for">
              <p className="text-[13.5px] leading-[1.6] text-gray-900 whitespace-pre-wrap m-0">{c.lookingFor}</p>
            </Section>
          )}

          {(c?.prefRole || c?.companyIndustry) && (
            <Section title="Engagement">
              <div className="flex flex-wrap gap-1.5">
                {c.prefRole && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[12px] font-medium border bg-blue-50 border-blue-200 text-blue-700">
                    Looking for {c.prefRole}
                  </span>
                )}
                {c.companyIndustry && (
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[12px] font-medium border bg-gray-100 border-gray-200 text-gray-700">
                    {c.companyIndustry}
                  </span>
                )}
              </div>
            </Section>
          )}
        </div>

        <div className="flex justify-end gap-2.5 px-5 py-3.5 border-t border-gray-200">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-[13.5px] font-semibold border border-gray-300 bg-white hover:bg-gray-50">
            Close
          </button>
          <button
            type="button"
            onClick={onSend}
            disabled={locked}
            title={locked ? "Available once your profile is approved" : ""}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-[13.5px] font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MessageSquare className="w-4 h-4 shrink-0" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <h4 className="text-[11.5px] font-bold uppercase tracking-wider text-gray-500 mb-2">{title}</h4>
      {children}
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function MatchedClientsPage() {
  const router = useRouter();
  const { uid, advisor } = useAdvisor();
  const { matches: contextMatches, accept, deny } = useMatches();

  const [firestoreMatches, setFirestoreMatches] = useState<AdvisorMatch[]>([]);
  const [clients,          setClients         ] = useState<Record<string, MatchedClientProfile | null>>({});
  const [loading,          setLoading         ] = useState(true);
  const [active,           setActive          ] = useState<HydratedMatch | null>(null);
  const [sendingFor,       setSendingFor      ] = useState<string | null>(null);
  const [errorFor,         setErrorFor        ] = useState<string | null>(null);

  const isLocked = advisor?.profileStatus === "under_review";

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    const unsub = subscribeAdvisorMatches(
      uid,
      (next) => { setFirestoreMatches(next); setLoading(false); },
      (e)    => { console.warn("[clients] subscribe error", e); setLoading(false); },
    );
    return unsub;
  }, [uid]);

  useEffect(() => {
    firestoreMatches.forEach(async (m) => {
      if (clients[m.clientUid] !== undefined) return;
      const c = await fetchMatchedClient(m.clientUid).catch(() => null);
      setClients((prev) => ({ ...prev, [m.clientUid]: c }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firestoreMatches]);

  const established: HydratedMatch[] = useMemo(() => {
    return firestoreMatches
      .filter((m) => m.status !== "archived")
      .map((m) => ({ match: m, client: clients[m.clientUid] ?? null }));
  }, [firestoreMatches, clients]);

  // Show pending + accepted from context; hide denied ones
  const visibleContextMatches = contextMatches.filter(m => m.status !== "denied");
  const pendingCount = contextMatches.filter(m => m.status === "pending").length;

  const totalCount = visibleContextMatches.length + established.length;

  async function startConversation(row: HydratedMatch) {
    if (!uid) return;
    setSendingFor(row.match.id);
    setErrorFor(null);
    try {
      await ensureThread(uid, row.match.clientUid);
      router.push("/advisor-dashboard/messages");
    } catch (err) {
      console.error("[clients] ensureThread failed:", err);
      setErrorFor(row.match.id);
      setSendingFor(null);
    }
  }

  function goToMessages() {
    router.push("/advisor-dashboard/messages");
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[24px] font-semibold tracking-tight">Your Matches</h1>
        <p className="text-sm text-gray-500 mt-1">
          Companies our team has matched you with. Accept to share your profile, or pass.
        </p>
      </div>

      {isLocked && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-[13px] text-amber-900">
          Your profile is still under review. Once approved, you&apos;ll be able to accept matches and message clients here.
        </div>
      )}

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total matches",    value: String(totalCount),   sub: "from CXOwork team"       },
          { label: "Awaiting response",value: String(pendingCount), sub: "need your decision"      },
          { label: "Active clients",   value: String(established.length), sub: "with contracts"   },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl px-4 py-3.5">
            <div className="text-[11.5px] text-gray-400 font-medium mb-0.5">{label}</div>
            <div className="text-[26px] font-bold text-gray-900 leading-tight">{value}</div>
            <div className="text-[12px] text-gray-400">{sub}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="py-16 grid place-items-center">
          <div className="w-6 h-6 rounded-full border-[3px] border-gray-200 border-t-blue-600 animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">

          {/* ── Match requests from context ── */}
          {visibleContextMatches.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[12px] font-semibold uppercase tracking-widest text-gray-400">
                  Match requests · {visibleContextMatches.length}
                </span>
                {pendingCount > 0 && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                    <Zap className="w-2.5 h-2.5" />{pendingCount} awaiting response
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-4">
                {visibleContextMatches.map((m) => (
                  <MatchRequestCard
                    key={m.id}
                    m={m}
                    onAccept={() => accept(m.id)}
                    onPass={() => deny(m.id)}
                    onViewInMessages={goToMessages}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Established Firestore clients ── */}
          {established.length > 0 && (
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
                Active clients · {established.length}
              </div>
              <div className="flex flex-col gap-4">
                {established.map((row) => (
                  <ClientCard
                    key={row.match.id}
                    row={row}
                    locked={isLocked}
                    sending={sendingFor === row.match.id}
                    error={errorFor === row.match.id}
                    onView={() => setActive(row)}
                    onSend={() => startConversation(row)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {visibleContextMatches.length === 0 && established.length === 0 && (
            <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-[13.5px] text-gray-500">
              No matches yet. Our team will surface clients here as we identify good fits for your background.
            </div>
          )}

        </div>
      )}

      {active && (
        <ClientProfileModal
          row={active}
          onClose={() => setActive(null)}
          onSend={() => { startConversation(active); setActive(null); }}
          locked={isLocked}
        />
      )}
    </div>
  );
}
