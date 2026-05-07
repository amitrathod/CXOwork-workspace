"use client";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MOCK_THREADS, MOCK_MESSAGES, MOCK_ADMIN_MESSAGES, MOCK_ADVISORS, type MockMessage, type MockThread } from "@/lib/mock-data";

const ADMIN_ID = "__admin__";

export default function MessagesPage() {
  return <Suspense fallback={null}><MessagesInner /></Suspense>;
}

function MessagesInner() {
  const params = useSearchParams();
  const initialThread = params.get("thread");
  const [activeId, setActiveId] = useState<string | null>(initialThread || MOCK_THREADS[0]?.id || null);
  const [threadMessages, setThreadMessages] = useState<Record<string, MockMessage[]>>({ ...MOCK_MESSAGES });
  const [adminMessages, setAdminMessages] = useState<MockMessage[]>(MOCK_ADMIN_MESSAGES);
  const [draft, setDraft] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [threadMessages, adminMessages, activeId]);

  const messages: MockMessage[] = useMemo(() => {
    if (!activeId) return [];
    if (activeId === ADMIN_ID) return adminMessages;
    return threadMessages[activeId] || [];
  }, [activeId, threadMessages, adminMessages]);

  function send() {
    if (!draft.trim() || !activeId) return;
    const msg: MockMessage = { id: `msg-${Date.now()}`, text: draft.trim(), senderRole: "client", createdAt: new Date() };
    if (activeId === ADMIN_ID) {
      setAdminMessages(prev => [...prev, msg]);
    } else {
      setThreadMessages(prev => ({ ...prev, [activeId]: [...(prev[activeId] || []), msg] }));
    }
    setDraft("");
  }

  const displayedThreads: MockThread[] = useMemo(() => {
    if (!activeId || activeId === ADMIN_ID) return MOCK_THREADS;
    if (MOCK_THREADS.some(t => t.id === activeId)) return MOCK_THREADS;
    const advisorUid = activeId.replace("t_mock_", "");
    return [{ id: activeId, participants: ["mock-user-123", advisorUid], clientUid: "mock-user-123", advisorUid, lastMessage: "" }, ...MOCK_THREADS];
  }, [activeId]);

  return (
    <div className="-mx-4 sm:-mx-8 -my-6 sm:-my-8 h-[calc(100vh-60px)] flex bg-white border-l border-gray-200">
      {/* Left rail */}
      <aside className={["w-full md:w-[280px] shrink-0 border-r border-gray-200 overflow-y-auto", activeId ? "hidden md:block" : "block"].join(" ")}>
        <div className="px-4 py-3 border-b border-gray-200">
          <h2 className="text-[15px] font-semibold">Messages</h2>
        </div>
        {/* Admin thread */}
        <button type="button" onClick={() => setActiveId(ADMIN_ID)}
          className={["w-full text-left px-4 py-3 border-b border-gray-200 hover:bg-gray-50 flex items-start gap-3", activeId === ADMIN_ID ? "bg-blue-50" : "bg-amber-50/40"].join(" ")}>
          <div className="w-9 h-9 rounded-full bg-gray-900 text-white grid place-items-center font-bold text-[11px] shrink-0">CX</div>
          <div className="flex-1 min-w-0">
            <div className="text-[13.5px] font-semibold text-gray-900 flex items-center gap-1.5">
              CXOAdmin <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-[1px] rounded-full bg-gray-900 text-white">Team</span>
            </div>
            <div className="text-[12px] text-gray-500 truncate mt-0.5">Reach the platform team anytime</div>
          </div>
        </button>
        {/* Advisor threads */}
        {displayedThreads.map(t => {
          const adv = MOCK_ADVISORS[t.advisorUid];
          const name = adv ? [adv.firstName, adv.lastName].join(" ") : "Advisor";
          const initials = name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
          const lastMsg = (threadMessages[t.id] || []).slice(-1)[0]?.text || t.lastMessage || "";
          return (
            <button key={t.id} type="button" onClick={() => setActiveId(t.id)}
              className={["w-full text-left px-4 py-3 border-b border-gray-100 hover:bg-gray-50 flex items-start gap-3", activeId === t.id ? "bg-blue-50" : ""].join(" ")}>
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-[12.5px] shrink-0">{initials}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[13.5px] font-semibold text-gray-900 truncate">{name}</div>
                {lastMsg && <div className="text-[12px] text-gray-500 truncate mt-0.5">{lastMsg}</div>}
              </div>
            </button>
          );
        })}
      </aside>

      {/* Chat pane */}
      <section className={["flex-1 flex-col", activeId ? "flex" : "hidden md:flex"].join(" ")}>
        {activeId ? (
          <>
            <div className="px-4 sm:px-5 py-3 border-b border-gray-200 flex items-center gap-3">
              <button type="button" onClick={() => setActiveId(null)} className="md:hidden p-1 -ml-1 rounded-md text-gray-500 hover:bg-gray-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {activeId === ADMIN_ID ? (
                <>
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white grid place-items-center font-bold text-[10.5px] shrink-0">CX</div>
                  <div className="min-w-0">
                    <div className="text-[14.5px] font-semibold">CXOAdmin</div>
                    <div className="text-[11.5px] text-gray-500">Platform team — typically replies within one business day</div>
                  </div>
                </>
              ) : (() => {
                const advisorUid = activeId.replace("t_mock_", "");
                const adv = MOCK_ADVISORS[advisorUid];
                const name = adv ? [adv.firstName, adv.lastName].join(" ") : "Advisor";
                const initials = name.split(" ").map(p => p[0]).join("").slice(0, 2).toUpperCase();
                return (
                  <>
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-[12px] shrink-0">{initials}</div>
                    <div className="text-[14.5px] font-semibold">{name}</div>
                  </>
                );
              })()}
            </div>
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3 bg-[#fafafa]">
              {messages.length === 0 && <p className="text-center text-[13px] text-gray-500 mt-8">Say hi to start the conversation.</p>}
              {messages.map(m => {
                const mine = m.senderRole === "client";
                return (
                  <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                    <div className={["max-w-[70%] px-3.5 py-2 rounded-2xl text-[13.5px] whitespace-pre-wrap", mine ? "bg-blue-600 text-white rounded-br-md" : "bg-white border border-gray-200 text-gray-900 rounded-bl-md"].join(" ")}>
                      {m.text}
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
            <div className="border-t border-gray-200 px-4 sm:px-5 py-3 flex gap-2">
              <input type="text" value={draft} onChange={e => setDraft(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Type a message…"
                style={{ background: "#fff", color: "#111827", colorScheme: "light" }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-[14px] focus:outline-none focus:border-blue-500" />
              <button type="button" disabled={!draft.trim()} onClick={send}
                className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50">Send</button>
            </div>
          </>
        ) : (
          <div className="flex-1 grid place-items-center text-[13.5px] text-gray-500 px-6 py-12 text-center">Pick a conversation on the left to start chatting.</div>
        )}
      </section>
    </div>
  );
}
