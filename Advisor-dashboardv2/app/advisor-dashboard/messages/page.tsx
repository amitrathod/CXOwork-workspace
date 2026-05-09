"use client";

/**
 * /advisor-dashboard/messages
 *
 * Three-pane layout:
 *   Left rail  — "Match requests" section (pending + actioned) + existing threads
 *   Right pane — match request card (Accept/Deny + client post-accept view)
 *                OR regular chat thread
 *
 * Match state is shared from MatchContext so actions taken here are
 * instantly reflected in the TopNav bell, and vice-versa.
 */

import { useEffect, useRef, useState } from "react";
import { useAdvisor } from "@/lib/advisor-context";
import { useMatches } from "@/lib/match-context";
import type { MatchRequest } from "@/lib/match-context";
import {
  fetchMatchedClient,
  sendAdminMessage, sendThreadMessage,
  subscribeAdminThread, subscribeClientThreads, subscribeThreadMessages,
} from "@/lib/firestore-advisor";
import { isOffPlatformContactError } from "@/lib/message-guard";
import type { ChatMessage, ClientThread } from "@/types/advisor";
import {
  CheckCircle2, XCircle, Clock, Zap,
  Star, DollarSign, Building2, MessageSquare,
} from "lucide-react";

type ActivePane =
  | { kind: "match";  matchId: string }
  | { kind: "admin" }
  | { kind: "client"; threadId: string; label: string; sub?: string };

/* ─── Match request card ─────────────────────────────────────────────────── */

function MatchRequestPane({ match, onAccept, onDeny }: {
  match   : MatchRequest;
  onAccept: () => void;
  onDeny  : () => void;
}) {
  const isPending  = match.status === "pending";
  const isAccepted = match.status === "accepted";
  const isDenied   = match.status === "denied";


  return (
    <div className="flex-1 overflow-y-auto bg-[#fafafa]">
      <div className="max-w-xl mx-auto px-5 py-8 flex flex-col gap-4">

        {/* ── Advisor sees: match request card ── */}
        <div className={`bg-white border rounded-2xl overflow-hidden shadow-sm ${
          isPending  ? "border-amber-200" :
          isAccepted ? "border-green-200" :
                       "border-gray-200"
        }`}>

          {/* Status bar */}
          <div className={`px-5 py-2.5 flex items-center gap-2 text-[12.5px] font-semibold ${
            isPending  ? "bg-amber-50 text-amber-700 border-b border-amber-100" :
            isAccepted ? "bg-green-50 text-green-700 border-b border-green-100" :
                         "bg-gray-50 text-gray-500 border-b border-gray-100"
          }`}>
            {isPending  && <><Zap className="w-3.5 h-3.5" /> New match request — awaiting your response</>}
            {isAccepted && <><CheckCircle2 className="w-3.5 h-3.5" /> You accepted this match</>}
            {isDenied   && <><XCircle className="w-3.5 h-3.5" /> You passed on this match</>}
          </div>

          <div className="px-5 py-5">
            {/* Client identity */}
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full ${match.avatarColor} flex items-center justify-center text-white font-bold text-[15px] shrink-0`}>
                {match.clientInitials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[17px] font-bold text-gray-900 leading-snug">{match.clientName}</div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[13px] text-gray-500">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  {match.company} · {match.industry}
                </div>
              </div>
            </div>

            {/* Engagement terms */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {[
                { icon: <Star       className="w-3.5 h-3.5" />, label: "Role",         value: match.role         },
                { icon: <DollarSign className="w-3.5 h-3.5" />, label: "Rate",         value: match.rate         },
                { icon: <Clock      className="w-3.5 h-3.5" />, label: "Commitment",   value: `${match.hoursPerWeek} hrs/wk` },
              ].map(({ icon, label, value }) => (
                <div key={label} className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                  <div className="flex items-center gap-1 text-[10.5px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">
                    {icon}{label}
                  </div>
                  <div className="text-[13px] font-semibold text-gray-900">{value}</div>
                </div>
              ))}
            </div>

            {/* Intro message */}
            <div className="mt-4 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3">
              <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">Their message</div>
              <p className="text-[13.5px] text-gray-700 leading-relaxed">&ldquo;{match.intro}&rdquo;</p>
            </div>

            {/* Received */}
            <p className="text-[11.5px] text-gray-400 mt-3">{match.receivedAt}</p>

            {/* Action buttons — pending only */}
            {isPending && (
              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={onAccept}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-[14px] font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Accept match
                </button>
                <button
                  type="button"
                  onClick={onDeny}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-[14px] font-semibold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Pass
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── Post-accept confirmation — advisor facing ── */}
        {isAccepted && (
          <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-6">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-[15px] font-semibold text-green-900">
                  We&apos;ve presented your profile to {match.clientName}
                </p>
                <p className="text-[13.5px] text-green-800 mt-1.5 leading-relaxed">
                  {match.company} has been notified of your interest. Keep an eye on your
                  messages — {match.clientName} will reach out directly and will schedule
                  an intro call when ready.
                </p>
                <p className="text-[12px] text-green-700 mt-3 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                  Replies will appear in your Messages thread with {match.clientName}.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Denied state message */}
        {isDenied && (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl px-5 py-6 text-center">
            <XCircle className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-[14px] font-semibold text-gray-500">You passed on this match</p>
            <p className="text-[13px] text-gray-400 mt-1">
              {match.clientName} won&apos;t be notified. CXOwork will find them another advisor.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main page ─────────────────────────────────────────────────────────── */

export default function MessagesPage() {
  const { uid }                        = useAdvisor();
  const { matches, accept, deny }      = useMatches();

  const [threads, setThreads]          = useState<ClientThread[]>([]);
  const [clientMeta, setClientMeta]    = useState<Record<string, { name: string }>>({});
  const [active, setActive]            = useState<ActivePane | null>(null);
  const [chatMessages, setChatMessages]= useState<ChatMessage[]>([]);
  const [draft, setDraft]              = useState("");
  const [sending, setSending]          = useState(false);
  const [sendError, setSendError]      = useState<string | null>(null);
  const bottomRef                      = useRef<HTMLDivElement | null>(null);

  /* Default to first pending match if any, else admin */
  useEffect(() => {
    if (active) return;
    const firstPending = matches.find(m => m.status === "pending");
    if (firstPending) setActive({ kind: "match", matchId: firstPending.id });
    else setActive({ kind: "admin" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Client threads */
  useEffect(() => {
    if (!uid) return;
    return subscribeClientThreads(uid, setThreads, (e) => console.warn("[messages] threads error", e));
  }, [uid]);

  /* Hydrate client names */
  useEffect(() => {
    threads.forEach(async (t) => {
      if (clientMeta[t.clientUid]) return;
      const c = await fetchMatchedClient(t.clientUid).catch(() => null);
      if (!c) return;
      const name = [c.firstName, c.lastName].filter(Boolean).join(" ").trim() || c.companyName || c.email || "";
      if (!name) return;
      setClientMeta(prev => ({ ...prev, [t.clientUid]: { name } }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads]);

  /* Chat messages for admin / client threads */
  useEffect(() => {
    if (!uid || !active || active.kind === "match") return;
    setChatMessages([]);
    if (active.kind === "admin") {
      return subscribeAdminThread(uid, setChatMessages, (e) => console.warn("[messages] admin error", e));
    } else if (active.kind === "client") {
      return subscribeThreadMessages(active.threadId, setChatMessages, (e) => console.warn("[messages] thread error", e));
    }
  }, [uid, active]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  async function send() {
    if (!uid || !active || active.kind === "match" || !draft.trim()) return;
    setSending(true);
    setSendError(null);
    try {
      if (active.kind === "admin") await sendAdminMessage(uid, draft);
      else if (active.kind === "client") await sendThreadMessage(active.threadId, uid, draft);
      setDraft("");
    } catch (err) {
      setSendError(isOffPlatformContactError(err) ? (err as Error).message : "Couldn't send message. Try again.");
    } finally { setSending(false); }
  }

  const pendingMatches  = matches.filter(m => m.status === "pending");
  const actionedMatches = matches.filter(m => m.status !== "pending");

  const activeMatch = active?.kind === "match"
    ? matches.find(m => m.id === active.matchId) ?? null
    : null;

  const chatLabel = active?.kind === "match"
    ? null
    : active?.kind === "admin"
      ? "CXOwork Support"
      : active?.kind === "client"
        ? active.label
        : null;

  const chatSub = active?.kind === "admin"
    ? "Admin team · We typically reply within a business day."
    : active?.kind === "client"
      ? active.sub
      : undefined;

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-8 h-[calc(100vh-60px)] flex bg-white border border-gray-200 rounded-xl overflow-hidden">

      {/* ── Left rail ── */}
      <aside className="w-[260px] shrink-0 border-r border-gray-200 overflow-y-auto flex flex-col">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-[15px] font-semibold">Messages</h2>
        </div>

        {/* Match requests section */}
        {matches.length > 0 && (
          <div>
            <div className="px-4 pt-3 pb-1.5">
              <span className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400">
                Match requests
              </span>
              {pendingMatches.length > 0 && (
                <span className="ml-1.5 inline-flex items-center justify-center min-w-[16px] h-4 px-1 bg-red-500 text-white text-[9px] font-bold rounded-full">
                  {pendingMatches.length}
                </span>
              )}
            </div>

            {matches.map((m) => {
              const isActive = active?.kind === "match" && active.matchId === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActive({ kind: "match", matchId: m.id })}
                  className={[
                    "w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors",
                    isActive ? "bg-blue-50" : "",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${m.avatarColor} flex items-center justify-center text-white font-bold text-[11px] shrink-0`}>
                      {m.clientInitials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[13px] font-semibold text-gray-900 truncate">{m.clientName}</span>
                        {m.status === "pending" && (
                          <span className="shrink-0 w-2 h-2 bg-amber-400 rounded-full" />
                        )}
                        {m.status === "accepted" && (
                          <CheckCircle2 className="w-3 h-3 text-green-500 shrink-0" />
                        )}
                        {m.status === "denied" && (
                          <XCircle className="w-3 h-3 text-gray-300 shrink-0" />
                        )}
                      </div>
                      <div className="text-[11.5px] text-gray-400 truncate">
                        {m.status === "pending"  ? "Awaiting your response" :
                         m.status === "accepted" ? "Accepted · can schedule call" :
                                                   "You passed"}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}

            {/* Divider */}
            <div className="px-4 pt-3 pb-1.5 border-t border-gray-100">
              <span className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400">Conversations</span>
            </div>
          </div>
        )}

        {/* Admin + client threads */}
        {[
          { id: "admin", kind: "admin" as const, label: "CXOwork Support", sub: "Admin team" },
          ...threads.map(t => ({
            id    : t.id,
            kind  : "client" as const,
            label : clientMeta[t.clientUid]?.name || t.clientName || `Client ${t.clientUid.slice(0, 6)}`,
            sub   : t.lastMessage,
            threadId: t.id,
          })),
        ].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() =>
              c.kind === "admin"
                ? setActive({ kind: "admin" })
                : setActive({ kind: "client", threadId: c.threadId!, label: c.label, sub: c.sub })
            }
            className={[
              "w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors",
              active?.kind === c.kind && (c.kind === "admin" || (active?.kind === "client" && active.threadId === c.threadId))
                ? "bg-blue-50"
                : "",
            ].join(" ")}
          >
            <div className="text-[13.5px] font-semibold text-gray-900 truncate">{c.label}</div>
            {c.sub && <div className="text-[12px] text-gray-500 truncate mt-0.5">{c.sub}</div>}
          </button>
        ))}
      </aside>

      {/* ── Right pane ── */}
      <section className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="px-5 py-3 border-b border-gray-200 shrink-0">
          {activeMatch ? (
            <div className="flex items-center gap-2.5">
              <div className={`w-7 h-7 rounded-full ${activeMatch.avatarColor} flex items-center justify-center text-white font-bold text-[11px] shrink-0`}>
                {activeMatch.clientInitials}
              </div>
              <div>
                <div className="text-[14.5px] font-semibold">{activeMatch.clientName}</div>
                <div className="text-[12px] text-gray-500">{activeMatch.company} · Match request</div>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-[14.5px] font-semibold">{chatLabel || "—"}</div>
              {chatSub && <div className="text-[12px] text-gray-500">{chatSub}</div>}
            </div>
          )}
        </div>

        {/* Body */}
        {activeMatch ? (
          <MatchRequestPane
            match={activeMatch}
            onAccept={() => accept(activeMatch.id)}
            onDeny={()   => deny(activeMatch.id)}
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-[#fafafa]">
              {chatMessages.length === 0 && (
                <p className="text-center text-[13px] text-gray-400 mt-8">No messages yet — say hi!</p>
              )}
              {chatMessages.map((m) => {
                const mine = m.senderRole === "advisor";
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={[
                      "max-w-[70%] px-3.5 py-2 rounded-2xl text-[13.5px] whitespace-pre-wrap",
                      mine
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-white border border-gray-200 text-gray-900 rounded-bl-md",
                    ].join(" ")}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-gray-200 shrink-0">
              {sendError && (
                <div className="px-5 pt-3 -mb-1">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12.5px] text-amber-900">
                    {sendError}
                  </div>
                </div>
              )}
              <div className="px-5 py-3 flex gap-2">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => { setDraft(e.target.value); if (sendError) setSendError(null); }}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Type a message…"
                  disabled={!active || sending}
                  style={{ background: "#ffffff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827" }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  disabled={!active || sending || !draft.trim()}
                  onClick={send}
                  className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-gray-900 hover:bg-black disabled:opacity-50"
                >
                  {sending ? "Sending…" : "Send"}
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
