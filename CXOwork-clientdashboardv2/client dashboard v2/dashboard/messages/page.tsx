"use client";

/**
 * /dashboard/messages — Real-time chat with advisors.
 *
 * Two-pane layout: left rail lists threads; right pane is the active
 * chat with composer at the bottom. ?thread=<id> in the URL pre-selects
 * a conversation (used by Find Advisor's "Message advisor" button).
 */

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useClient } from "@/lib/client-context";
import {
  fetchAdvisor,
  sendAdminMessage,
  sendThreadMessage,
  subscribeAdminChat,
  subscribeThreads,
  subscribeThreadMessages,
} from "@/lib/firestore-client-dashboard";
import { isOffPlatformContactError } from "@/lib/message-guard";

// Sentinel id for the static CXOAdmin entry. Real thread ids start
// with "t_" so picking a string that can never collide is safe.
const ADMIN_THREAD_ID = "__admin__";
import type { ClientChatMessage, ClientThread } from "@/types/client";
import { trackEvent } from "@/lib/analytics";

export default function MessagesPage() {
  return (
    <Suspense fallback={null}>
      <MessagesInner />
    </Suspense>
  );
}

function MessagesInner() {
  const { uid } = useClient();
  const params = useSearchParams();
  const initialThreadId = params.get("thread");

  const [threads, setThreads]   = useState<ClientThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(initialThreadId);
  const [messages, setMessages] = useState<ClientChatMessage[]>([]);
  const [draft, setDraft]       = useState("");
  const [sending, setSending]   = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [advisorMeta, setAdvisorMeta] = useState<Record<string, { name: string; photoUrl?: string }>>({});
  const bottomRef               = useRef<HTMLDivElement | null>(null);

  // Subscribe to all threads for this client
  useEffect(() => {
    if (!uid) return;
    const unsub = subscribeThreads(
      uid,
      (next) => {
        setThreads(next);
        if (!activeId && next[0]) setActiveId(next[0].id);
      },
      (e) => console.warn("[messages] threads error", e),
    );
    return unsub;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid]);

  // Hydrate advisor name + photo for each thread (fire-and-forget)
  useEffect(() => {
    threads.forEach(async (t) => {
      if (advisorMeta[t.advisorUid]) return;
      const a = await fetchAdvisor(t.advisorUid);
      if (!a) return;
      setAdvisorMeta((prev) => ({
        ...prev,
        [t.advisorUid]: {
          name    : [a.firstName, a.lastName].filter(Boolean).join(" ") || "Advisor",
          photoUrl: a.photoUrl,
        },
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads]);

  // Active conversation messages — branches on the sentinel admin id so
  // the same pane renders both peer threads and the admin chat.
  useEffect(() => {
    if (!activeId) return;
    setMessages([]);
    if (activeId === ADMIN_THREAD_ID) {
      if (!uid) return;
      return subscribeAdminChat(uid, setMessages, (e) => console.warn("[messages] admin msg error", e));
    }
    return subscribeThreadMessages(activeId, setMessages, (e) => console.warn("[messages] msg error", e));
  }, [activeId, uid]);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeId) || null,
    [threads, activeId],
  );

  // Derive the advisor uid for the active conversation. Two paths:
  //   1. The thread is already in our threads list (most common) →
  //      pull it off `activeThread.advisorUid`.
  //   2. We just navigated here from a freshly-created thread that
  //      Firestore hasn't surfaced in `subscribeThreads` yet (server
  //      timestamp pending). Parse the uid out of the thread id —
  //      thread ids are deterministic: "t_{sortedA}_{sortedB}", and
  //      the requesting user is always one of the two.
  // This is the fix for "Send Message takes me to /messages but no
  // chat shows up" — without it the chat pane would render empty
  // while the threads list catches up.
  const activeAdvisorUid = useMemo<string | null>(() => {
    if (!activeId || activeId === ADMIN_THREAD_ID) return null;
    if (activeThread) return activeThread.advisorUid;
    if (!uid) return null;
    if (!activeId.startsWith("t_")) return null;
    const parts = activeId.slice(2).split("_");
    if (parts.length !== 2) return null;
    return parts[0] === uid ? parts[1] : parts[0];
  }, [activeId, activeThread, uid]);

  // Hydrate advisor meta for whatever uid the active conversation
  // points at — covers the "freshly created thread" race where
  // subscribeThreads hasn't returned the new thread yet, so the
  // useEffect that hydrates from the threads list hasn't fired.
  useEffect(() => {
    if (!activeAdvisorUid) return;
    if (advisorMeta[activeAdvisorUid]) return;
    fetchAdvisor(activeAdvisorUid).then((a) => {
      if (!a) return;
      setAdvisorMeta((prev) => ({
        ...prev,
        [activeAdvisorUid]: {
          name    : [a.firstName, a.lastName].filter(Boolean).join(" ") || "Advisor",
          photoUrl: a.photoUrl,
        },
      }));
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAdvisorUid]);

  const activeMeta = activeAdvisorUid ? advisorMeta[activeAdvisorUid] : undefined;

  // Threads to render in the left rail. If the user just clicked Send
  // Message on a Matched CXO and we're waiting for Firestore to surface
  // the freshly-created thread (the orderBy on a pending serverTimestamp
  // briefly excludes it from the query result), inject a synthetic
  // entry so the new conversation shows up in the rail immediately.
  // The synthetic entry has the same id as the real thread, so when
  // subscribeThreads catches up, React's key check de-dupes for free.
  const displayedThreads = useMemo(() => {
    if (!activeId || activeId === ADMIN_THREAD_ID || !activeAdvisorUid || !uid) {
      return threads;
    }
    if (threads.some((t) => t.id === activeId)) return threads;
    const synthetic: ClientThread = {
      id           : activeId,
      participants : [uid, activeAdvisorUid],
      clientUid    : uid,
      advisorUid   : activeAdvisorUid,
      lastMessage  : "",
    };
    return [synthetic, ...threads];
  }, [threads, activeId, activeAdvisorUid, uid]);

  async function send() {
    if (!uid || !activeId || !draft.trim()) return;
    setSending(true);
    setSendError(null);
    try {
      if (activeId === ADMIN_THREAD_ID) {
        await sendAdminMessage(uid, draft);
        trackEvent("client_admin_message_sent", { message_length: draft.trim().length });
      } else {
        await sendThreadMessage(activeId, uid, draft);
        // Fire AFTER the network roundtrip — only count messages that
        // actually reached Firestore. Length helps spot empty-noise vs.
        // substantive outreach without sending the message body itself.
        trackEvent("client_message_sent", {
          thread_id     : activeId,
          message_length: draft.trim().length,
        });
      }
      setDraft("");
    } catch (err) {
      // Anti-disintermediation guard fired — show the specific reason
      // (email / phone / obfuscated) so the user understands what to
      // edit. Other errors get a generic fallback.
      if (isOffPlatformContactError(err)) {
        setSendError(err.message);
        trackEvent("client_message_blocked_off_platform_contact", {
          thread_id: activeId,
          reason   : err.reason,
        });
      } else {
        console.error("[messages] send failed:", err);
        setSendError("Couldn't send message. Try again.");
      }
    } finally { setSending(false); }
  }

  return (
    <div className="-mx-4 sm:-mx-8 -my-6 h-[calc(100vh-56px)] md:h-screen flex bg-white border-l border-gray-200">
      {/* Left rail — on mobile the rail and the chat occupy the full
          viewport one at a time. When a thread is selected, the rail
          collapses (hidden) and the chat takes over; the back button
          on the chat header brings the user back to the list. On md+
          both panes stay visible side-by-side. */}
      <aside className={[
        "w-full md:w-[280px] shrink-0 border-r border-gray-200 overflow-y-auto",
        activeId ? "hidden md:block" : "block",
      ].join(" ")}>
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-[15px] font-semibold">Messages</h2>
        </div>

        {/* CXOAdmin — pinned static entry, always visible. Lets any
            client reach the platform team even before any advisor
            matches exist. The id is the local sentinel; the
            collection is /clientAdminChats/{uid}/messages. */}
        <button
          type="button"
          onClick={() => setActiveId(ADMIN_THREAD_ID)}
          className={[
            "w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-50 transition-colors flex items-start gap-3",
            activeId === ADMIN_THREAD_ID ? "bg-blue-50" : "bg-amber-50/40",
          ].join(" ")}
        >
          <div className="w-9 h-9 rounded-full bg-gray-900 text-white grid place-items-center font-bold text-[11px] shrink-0">
            CX
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13.5px] font-semibold text-gray-900 truncate flex items-center gap-1.5">
              CXOAdmin
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-[1px] rounded-full bg-gray-900 text-white">Team</span>
            </div>
            <div className="text-[12px] text-gray-500 truncate mt-0.5">
              Reach the platform team anytime
            </div>
          </div>
        </button>

        {displayedThreads.length === 0 ? (
          <p className="text-[13px] text-gray-400 px-4 py-8 text-center">
            No advisor conversations yet.
          </p>
        ) : displayedThreads.map((t) => {
          const meta = advisorMeta[t.advisorUid];
          const name = meta?.name || `Advisor`;
          const initials = name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={[
                "w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-start gap-3",
                activeId === t.id ? "bg-blue-50" : "",
              ].join(" ")}
            >
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-[12.5px] shrink-0 overflow-hidden">
                {meta?.photoUrl ? <img src={meta.photoUrl} alt={name} className="w-full h-full object-cover" /> : initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-semibold text-gray-900 truncate">{name}</div>
                {t.lastMessage && <div className="text-[12px] text-gray-500 truncate mt-0.5">{t.lastMessage}</div>}
              </div>
            </button>
          );
        })}
      </aside>

      {/* Chat — mobile: takes the whole viewport when a thread is
          selected; md+: shares the row with the rail. */}
      <section className={[
        "flex-1 flex-col",
        activeId ? "flex" : "hidden md:flex",
      ].join(" ")}>
        {/* Render the chat pane for any non-null activeId. Don't gate on
            activeThread being in the threads list — a freshly-created
            thread takes a beat to surface from subscribeThreads while
            the server timestamp resolves, and we don't want to show the
            empty "Pick a conversation" state during that gap. */}
        {activeId ? (
          <>
            <div className="px-4 sm:px-5 py-3 border-b border-gray-200 flex items-center gap-3">
              {/* Back button — mobile only. Tapping returns the user
                  to the threads list by clearing activeId. We don't
                  rewrite the URL because the messages route doesn't
                  carry navigational state beyond ?thread=…. */}
              <button
                type="button"
                onClick={() => setActiveId(null)}
                aria-label="Back to conversations"
                className="md:hidden p-1 -ml-1 rounded-md text-gray-500 hover:bg-gray-100"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              {activeId === ADMIN_THREAD_ID ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white grid place-items-center font-bold text-[10.5px] shrink-0">
                    CX
                  </div>
                  <div className="min-w-0">
                    <div className="text-[14.5px] font-semibold">CXOAdmin</div>
                    <div className="text-[11.5px] text-gray-500 -mt-0.5 truncate">Platform team — typically replies within one business day</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-[12px] shrink-0 overflow-hidden">
                    {activeMeta?.photoUrl
                      ? <img src={activeMeta.photoUrl} alt={activeMeta.name} className="w-full h-full object-cover" />
                      : (activeMeta?.name || "A").split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-[14.5px] font-semibold truncate">{activeMeta?.name || "Advisor"}</div>
                </>
              )}
            </div>
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3 bg-[#fafafa]">
              {messages.length === 0 && (
                <p className="text-center text-[13px] text-gray-400 mt-8">Say hi to start the conversation.</p>
              )}
              {messages.map((m) => {
                const mine = m.senderRole === "client";
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={[
                      "max-w-[70%] px-3.5 py-2 rounded-2xl text-[13.5px] whitespace-pre-wrap",
                      mine ? "bg-blue-600 text-white rounded-br-md" : "bg-white border border-gray-200 text-gray-900 rounded-bl-md",
                    ].join(" ")}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
            <div className="border-t border-gray-200">
              {sendError && (
                <div className="px-4 sm:px-5 pt-3 -mb-1">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-[12.5px] text-amber-900">
                    {sendError}
                  </div>
                </div>
              )}
              <div className="px-4 sm:px-5 py-3 flex gap-2">
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => { setDraft(e.target.value); if (sendError) setSendError(null); }}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Type a message…"
                  disabled={sending}
                  style={{ background: "#fff", color: "#111827", colorScheme: "light", WebkitTextFillColor: "#111827" }}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  disabled={sending || !draft.trim()}
                  onClick={send}
                  className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                >
                  {sending ? "Sending…" : "Send"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 grid place-items-center text-[13.5px] text-gray-400 px-6 py-12 text-center">
            Pick a conversation on the left to start chatting.
          </div>
        )}
      </section>
    </div>
  );
}
