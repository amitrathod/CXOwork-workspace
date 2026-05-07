"use client";

/**
 * /dashboard/engagements — "Matched CXO" page.
 *
 * Lists advisor profiles the admin has matched to this client (via the
 * /matches collection). Each row is a full-width tile with an inline
 * "Send Message" button — clicking the button opens (or creates) a 1:1
 * thread on /dashboard/messages. Clicking elsewhere on the tile opens
 * a profile modal with the full bio + admin note.
 *
 * Important: the messaging flow uses `match.advisorUid` directly rather
 * than depending on the advisor profile being readable. That makes the
 * Send Message button work even when the matched advisor's profile
 * doc isn't readable to the client (e.g. profileStatus !== 'active').
 */

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useClient } from "@/lib/client-context";
import {
  ensureThread,
  fetchAdvisor,
  subscribeClientMatches,
} from "@/lib/firestore-client-dashboard";
import { trackEvent } from "@/lib/analytics";
import type { AdvisorListing, ClientMatch } from "@/types/client";

interface HydratedMatch {
  match  : ClientMatch;
  advisor: AdvisorListing | null;
}

export default function MatchedCXOPage() {
  const router = useRouter();
  const { uid, client } = useClient();
  const [matches, setMatches]       = useState<ClientMatch[]>([]);
  const [advisors, setAdvisors]     = useState<Record<string, AdvisorListing | null>>({});
  const [loading, setLoading]       = useState(true);
  const [active, setActive]         = useState<HydratedMatch | null>(null);
  const [sendingFor, setSendingFor] = useState<string | null>(null);
  const [errorFor, setErrorFor]     = useState<string | null>(null);

  const isLocked = client?.profileStatus === "under_review";

  // Subscribe to /matches where clientUid == uid. Live-updating so an
  // admin curating new matches in the panel surfaces here without a
  // page refresh.
  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    const unsub = subscribeClientMatches(
      uid,
      (next) => { setMatches(next); setLoading(false); },
      (e)   => { console.warn("[matched-cxo] subscribe error", e); setLoading(false); },
    );
    return unsub;
  }, [uid]);

  // For each match, hydrate the advisor profile on demand. Fire-and-
  // forget per uid — failures are silent (the tile falls back to
  // whatever fields the match doc carries) and don't block messaging.
  useEffect(() => {
    matches.forEach(async (m) => {
      if (advisors[m.advisorUid] !== undefined) return; // already loaded (or null-cached)
      const a = await fetchAdvisor(m.advisorUid).catch(() => null);
      setAdvisors((prev) => ({ ...prev, [m.advisorUid]: a }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  const visible: HydratedMatch[] = useMemo(() => {
    return matches
      .filter((m) => m.status !== "archived")
      .map((m) => ({ match: m, advisor: advisors[m.advisorUid] ?? null }));
  }, [matches, advisors]);

  // Open or create a thread between this client and the matched
  // advisor, then route to the messages tab. Wrapped in try/catch so
  // any rule / network failure surfaces inline instead of vanishing
  // into the console.
  async function startConversation(row: HydratedMatch) {
    if (!uid) return;
    const advisorUid = row.match.advisorUid;
    setSendingFor(row.match.id);
    setErrorFor(null);
    trackEvent("client_matched_cxo_message_started", { advisor_uid: advisorUid });
    try {
      const threadId = await ensureThread(uid, advisorUid);
      router.push(`/dashboard/messages?thread=${encodeURIComponent(threadId)}`);
    } catch (err) {
      console.error("[matched-cxo] ensureThread failed:", err);
      setErrorFor(row.match.id);
      setSendingFor(null);
    }
  }

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[24px] font-semibold tracking-tight">Matched CXO</h1>
        <p className="text-sm text-gray-500 mt-1">
          Executives our team has hand-picked for your needs. Reach out to start a conversation.
        </p>
      </div>

      {isLocked && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 text-[13px] text-amber-900">
          Your profile is still under review. Once an admin approves your account, we&apos;ll start matching you with executives — they&apos;ll appear here automatically.
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
          {isLocked
            ? "Matches will appear here once your account is approved."
            : "No matches yet. Our team is reviewing your needs and will surface executives here as they're identified."}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((row) => (
            <MatchRow
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
        <MatchProfileModal
          row={active}
          onClose={() => setActive(null)}
          onSend={() => { startConversation(active); setActive(null); }}
          locked={isLocked}
        />
      )}
    </div>
  );
}

/* ── Full-width row ───────────────────────────────────────────────────── */

function MatchRow({
  row, locked, sending, error, onView, onSend,
}: {
  row    : HydratedMatch;
  locked : boolean;
  sending: boolean;
  error  : boolean;
  onView : () => void;
  onSend : () => void;
}) {
  const a    = row.advisor;
  const name = a ? ([a.firstName, a.lastName].filter(Boolean).join(" ") || "Advisor") : "Loading…";
  const initials = a
    ? ((a.firstName?.[0] || "") + (a.lastName?.[0] || "")).toUpperCase() || "?"
    : "…";
  const tags = (a?.selectedRoles?.length ? a.selectedRoles : a?.roles || []).slice(0, 3);
  const cityOrLocation = a?.city || a?.location;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-500 hover:shadow-sm transition-all">
      <div className="flex items-start gap-4">
        {/* Avatar — clicking opens the modal */}
        <button
          type="button"
          onClick={onView}
          className="shrink-0"
          aria-label={`View ${name}'s profile`}
        >
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-lg overflow-hidden">
            {a?.photoUrl ? <img src={a.photoUrl} alt={name} className="w-full h-full object-cover" /> : initials}
          </div>
        </button>

        {/* Body — clickable to open the modal */}
        <button
          type="button"
          onClick={onView}
          className="min-w-0 flex-1 text-left"
        >
          <div className="text-[15px] font-semibold text-gray-900 truncate">{name}</div>
          {a?.headline && (
            <div className="text-[13px] text-gray-600 line-clamp-2 mt-0.5">{a.headline}</div>
          )}

          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {tags.map((t) => (
              <span key={t} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">{t}</span>
            ))}
            {cityOrLocation && (
              <span className="text-[12px] text-gray-500 ml-1">{cityOrLocation}</span>
            )}
            {a?.hourlyRate && (
              <span className="text-[12px] font-semibold text-gray-700 ml-1">${a.hourlyRate}/hr</span>
            )}
          </div>

          {row.match.note && (
            <div className="mt-2 text-[12.5px] text-gray-600 italic line-clamp-2">
              &ldquo;{row.match.note}&rdquo;
            </div>
          )}
        </button>

        {/* Action — Send Message. Distinct click handler so it doesn't
            also trigger the profile modal. Stays enabled even when the
            advisor profile failed to hydrate, since messaging only
            needs the uid (which lives on the match doc). */}
        <div className="shrink-0 flex flex-col items-end gap-1">
          <button
            type="button"
            onClick={onSend}
            disabled={locked || sending}
            title={locked ? "Available once your profile is approved" : ""}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {sending ? "Opening…" : "Send Message"}
          </button>
          {error && (
            <span className="text-[11px] text-red-600">Couldn&apos;t open chat. Try again.</span>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Profile modal — kept for the "View profile" path. ───────────────── */

function MatchProfileModal({
  row, onClose, onSend, locked,
}: {
  row    : HydratedMatch;
  onClose: () => void;
  onSend : () => void;
  locked : boolean;
}) {
  const a = row.advisor;
  const name     = a ? ([a.firstName, a.lastName].filter(Boolean).join(" ") || "Advisor") : "Loading…";
  const initials = a
    ? ((a.firstName?.[0] || "") + (a.lastName?.[0] || "")).toUpperCase() || "?"
    : "…";
  const industries = a?.selectedIndustries?.length ? a.selectedIndustries : (a?.industry ? [a.industry] : []);
  const skills     = a?.skills?.length ? a.skills : (a?.coreSkills || []);

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
          <h3 className="text-[16px] font-bold m-0">Matched CXO</h3>
          <button type="button" onClick={onClose} aria-label="Close" className="p-1 rounded-md text-gray-500 hover:bg-gray-100">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-xl shrink-0 overflow-hidden">
              {a?.photoUrl ? <img src={a.photoUrl} alt={name} className="w-full h-full object-cover" /> : initials}
            </div>
            <div className="min-w-0">
              <div className="text-[18px] font-bold text-gray-900">{name}</div>
              {a?.headline && <p className="text-[13.5px] text-gray-600 m-0">{a.headline}</p>}
              <div className="text-[12.5px] text-gray-500 mt-1">{a?.city || a?.location || ""}</div>
            </div>
          </div>

          {row.match.note && (
            <Section title="Why this match">
              <p className="text-[13.5px] leading-[1.6] text-gray-900 whitespace-pre-wrap">{row.match.note}</p>
            </Section>
          )}

          {(a?.about || a?.bio) && (
            <Section title="About">
              <p className="text-[13.5px] leading-[1.6] text-gray-900 whitespace-pre-wrap">{a?.about || a?.bio}</p>
            </Section>
          )}

          {industries.length > 0 && (
            <Section title="Industries">
              <Chips items={industries} />
            </Section>
          )}

          {(a?.engagementTypes && a.engagementTypes.length > 0) && (
            <Section title="Engagement types">
              <Chips items={a.engagementTypes} />
            </Section>
          )}

          {skills.length > 0 && (
            <Section title="Core skills">
              <Chips items={skills} gray />
            </Section>
          )}
        </div>
        <div className="flex justify-end gap-2.5 px-5 py-3.5 border-t border-gray-200">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg text-[13.5px] font-semibold border border-gray-300 bg-white hover:bg-gray-50">Close</button>
          <button
            type="button"
            onClick={onSend}
            disabled={locked}
            title={locked ? "Available once your profile is approved" : ""}
            className="px-5 py-2 rounded-lg text-[13.5px] font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
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
      <h4 className="text-[11.5px] font-bold uppercase tracking-wider text-gray-600 mb-2">{title}</h4>
      {children}
    </div>
  );
}
function Chips({ items, gray }: { items: string[]; gray?: boolean }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <span key={i} className={["inline-block px-2.5 py-0.5 rounded-full text-[12px] font-medium border", gray ? "bg-gray-100 border-gray-200 text-gray-700" : "bg-blue-50 border-blue-200 text-blue-700"].join(" ")}>{i}</span>
      ))}
    </div>
  );
}
