"use client";

/**
 * /advisor-dashboard/messages — Admin chat + client thread switcher.
 *
 * Two-pane layout: left rail lists conversations (Admin support thread
 * always pinned at top, then client threads ordered by most-recent
 * activity); right pane is the active chat with composer at the
 * bottom. Real-time via Firestore onSnapshot.
 */

import { useEffect, useRef, useState } from "react";
import { useAdvisor } from "@/lib/advisor-context";
import {
  fetchMatchedClient,
  sendAdminMessage, sendThreadMessage,
  subscribeAdminThread, subscribeClientThreads, subscribeThreadMessages,
} from "@/lib/firestore-advisor";
import { isOffPlatformContactError } from "@/lib/message-guard";
import type { ChatMessage, ClientThread } from "@/types/advisor";

type Convo = { id: string; kind: "admin" | "client"; label: string; sub?: string; threadId?: string };

export default function MessagesPage() {
  const { uid } = useAdvisor();
  const [threads, setThreads]   = useState<ClientThread[]>([]);
  const [clientMeta, setClientMeta] = useState<Record<string, { name: string }>>({});
  const [active, setActive]     = useState<Convo | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft]       = useState("");
  const [sending, setSending]   = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const bottomRef               = useRef<HTMLDivElement | null>(null);

  /* Default to the admin convo on mount */
  useEffect(() => {
    if (!active) setActive({ id: "admin", kind: "admin", label: "CXOwork Support", sub: "We typically reply within a business day." });
  }, [active]);

  /* Client threads */
  useEffect(() => {
    if (!uid) return;
    const unsub = subscribeClientThreads(
      uid,
      (next) => setThreads(next),
      (e)   => console.warn("[messages] threads error", e),
    );
    return unsub;
  }, [uid]);

  /* Hydrate client name + company for each thread. The thread doc only
     stores uids; the rail label needs a real human name. Fire-and-
     forget per uid, results land in `clientMeta`. Skips uids already
     loaded so re-renders don't re-fetch. */
  useEffect(() => {
    threads.forEach(async (t) => {
      if (clientMeta[t.clientUid]) return;
      const c = await fetchMatchedClient(t.clientUid).catch(() => null);
      if (!c) return;
      const name = [c.firstName, c.lastName].filter(Boolean).join(" ").trim()
                || c.companyName
                || c.email
                || "";
      if (!name) return;
      setClientMeta((prev) => ({ ...prev, [t.clientUid]: { name } }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threads]);

  /* Active conversation messages */
  useEffect(() => {
    if (!uid || !active) return;
    setMessages([]);
    if (active.kind === "admin") {
      return subscribeAdminThread(uid, setMessages, (e) => console.warn("[messages] admin error", e));
    } else if (active.threadId) {
      return subscribeThreadMessages(active.threadId, setMessages, (e) => console.warn("[messages] thread error", e));
    }
  }, [uid, active]);

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    if (!uid || !active || !draft.trim()) return;
    setSending(true);
    setSendError(null);
    try {
      if (active.kind === "admin") await sendAdminMessage(uid, draft);
      else if (active.threadId)    await sendThreadMessage(active.threadId, uid, draft);
      setDraft("");
    } catch (err) {
      // Anti-disintermediation guard fired — show the specific reason
      // (email / phone / obfuscated). Other errors get a generic
      // fallback so we never silently drop a send.
      if (isOffPlatformContactError(err)) {
        setSendError(err.message);
      } else {
        console.error("[messages] send failed:", err);
        setSendError("Couldn't send message. Try again.");
      }
    } finally { setSending(false); }
  }

  /* Build the convo list — admin always pinned top. Label resolution
     order: hydrated client name (preferred) → name on the thread doc
     itself (legacy) → fallback "Client {short-uid}" so the rail
     never renders a blank row while the fetch is in flight. */
  const list: Convo[] = [
    { id: "admin", kind: "admin", label: "CXOwork Support", sub: "Admin team" },
    ...threads.map<Convo>((t) => ({
      id: t.id, kind: "client",
      label   : clientMeta[t.clientUid]?.name || t.clientName || `Client ${t.clientUid.slice(0, 6)}`,
      sub     : t.lastMessage,
      threadId: t.id,
    })),
  ];

  return (
    <div className="-mx-4 sm:-mx-6 lg:-mx-8 -my-6 sm:-my-8 h-[calc(100vh-60px)] flex bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Left rail */}
      <aside className="w-[260px] shrink-0 border-r border-gray-200 overflow-y-auto">
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-[15px] font-semibold">Messages</h2>
        </div>
        {list.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c)}
            className={[
              "w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors",
              active?.id === c.id ? "bg-blue-50" : "",
            ].join(" ")}
          >
            <div className="text-[13.5px] font-semibold text-gray-900 truncate">{c.label}</div>
            {c.sub && <div className="text-[12px] text-gray-500 truncate mt-0.5">{c.sub}</div>}
          </button>
        ))}
      </aside>

      {/* Chat — header label re-derives from the live convo list every
          render, so as soon as `clientMeta` fills in for the active
          thread, the header swaps "Client abcdef" for the real name
          without requiring the user to reclick. */}
      <section className="flex-1 flex flex-col">
        {(() => {
          const activeConvo = list.find((c) => c.id === active?.id) || active;
          return (
            <div className="px-5 py-3 border-b border-gray-200">
              <div className="text-[14.5px] font-semibold">{activeConvo?.label || "—"}</div>
              {activeConvo?.sub && <div className="text-[12px] text-gray-500">{activeConvo.sub}</div>}
            </div>
          );
        })()}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-[#fafafa]">
          {messages.length === 0 && (
            <p className="text-center text-[13px] text-gray-400 mt-8">No messages yet — say hi!</p>
          )}
          {messages.map((m) => {
            const mine = m.senderRole === "advisor";
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
      </section>
    </div>
  );
}
