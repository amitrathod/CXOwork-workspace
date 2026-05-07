"use client";

/**
 * /advisor-dashboard/clients — "Prospective Clients" page.
 *
 * Lists clients the admin has matched to this advisor.
 * Company is the primary identity; founder name is secondary.
 * Follows the card style of the client-side "Matched CXO" view.
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, MessageSquare, Eye } from "lucide-react";
import { useAdvisor } from "@/lib/advisor-context";
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

export default function MatchedClientsPage() {
  const router = useRouter();
  const { uid, advisor } = useAdvisor();

  const [matches, setMatches]       = useState<AdvisorMatch[]>([]);
  const [clients, setClients]       = useState<Record<string, MatchedClientProfile | null>>({});
  const [loading, setLoading]       = useState(true);
  const [active, setActive]         = useState<HydratedMatch | null>(null);
  const [sendingFor, setSendingFor] = useState<string | null>(null);
  const [errorFor, setErrorFor]     = useState<string | null>(null);

  const isLocked = advisor?.profileStatus === "under_review";

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    const unsub = subscribeAdvisorMatches(
      uid,
      (next) => { setMatches(next); setLoading(false); },
      (e)    => { console.warn("[clients] subscribe error", e); setLoading(false); },
    );
    return unsub;
  }, [uid]);

  useEffect(() => {
    matches.forEach(async (m) => {
      if (clients[m.clientUid] !== undefined) return;
      const c = await fetchMatchedClient(m.clientUid).catch(() => null);
      setClients((prev) => ({ ...prev, [m.clientUid]: c }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  const visible: HydratedMatch[] = useMemo(() => {
    return matches
      .filter((m) => m.status !== "archived")
      .map((m) => ({ match: m, client: clients[m.clientUid] ?? null }));
  }, [matches, clients]);

  async function startConversation(row: HydratedMatch) {
    if (!uid) return;
    const clientUid = row.match.clientUid;
    setSendingFor(row.match.id);
    setErrorFor(null);
    try {
      await ensureThread(uid, clientUid);
      router.push("/advisor-dashboard/messages");
    } catch (err) {
      console.error("[clients] ensureThread failed:", err);
      setErrorFor(row.match.id);
      setSendingFor(null);
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-[24px] font-semibold tracking-tight">Prospective Clients</h1>
        <p className="text-sm text-gray-500 mt-1">
          Companies our team has matched you with. Reach out to start a conversation.
        </p>
      </div>

      {isLocked && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-[13px] text-amber-900">
          Your profile is still under review. Once an admin approves your account, you&apos;ll be able to message matched clients here.
        </div>
      )}

      <div className="text-[12.5px] text-gray-500 mb-3">
        {loading
          ? "Loading…"
          : `${visible.length} match${visible.length === 1 ? "" : "es"}`}
      </div>

      {loading ? (
        <div className="py-16 grid place-items-center">
          <div className="w-6 h-6 rounded-full border-[3px] border-gray-200 border-t-blue-600 animate-spin" />
        </div>
      ) : visible.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-[13.5px] text-gray-500">
          No matches yet. Our team will surface clients here as we identify good fits for your background.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {visible.map((row) => (
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

/* ── Card ─────────────────────────────────────────────────────────────── */

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

  // Company is the primary identity
  const companyName = c?.companyName || "Company";
  const founderName = c
    ? [c.firstName, c.lastName].filter(Boolean).join(" ") || null
    : null;

  const website = c?.companyWebsite
    ? (c.companyWebsite.startsWith("http") ? c.companyWebsite : `https://${c.companyWebsite}`)
    : null;
  const websiteLabel = c?.companyWebsite?.replace(/^https?:\/\//, "").replace(/\/$/, "") || null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all">
      <div className="flex items-start gap-4">

        {/* Generic company icon — matches nav icon container style */}
        <div className="shrink-0 w-14 h-14 rounded-xl bg-gray-100 border border-gray-200 grid place-items-center">
          <Building2 className="w-7 h-7 text-gray-400" />
        </div>

        {/* Body */}
        <div className="min-w-0 flex-1">

          {/* Company name + founder */}
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-[17px] font-bold text-gray-900 leading-snug">
              {companyName}
            </span>
            {founderName && (
              <span className="text-[13px] text-gray-500 font-normal">{founderName}</span>
            )}
          </div>

          {/* Website — prominent */}
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

          {/* Tags */}
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

          {/* What they're looking for */}
          {c?.lookingFor && (
            <p className="mt-2.5 text-[13px] text-gray-600 leading-[1.55] line-clamp-2">
              {c.lookingFor}
            </p>
          )}

          {/* Action buttons */}
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

/* ── Profile modal ───────────────────────────────────────────────────── */

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
          {/* Company header */}
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
            <Section title="What they&apos;re looking for">
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
