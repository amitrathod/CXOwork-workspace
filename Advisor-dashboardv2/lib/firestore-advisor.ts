/**
 * Mock replacement for the real Firestore advisor library.
 * Provides in-memory subscriptions that react to mutations in real-time.
 */

import type { AdvisorMatch, MatchedClientProfile, Lead, ChatMessage, ClientThread } from "@/types/advisor";
import {
  MOCK_MATCHES, MOCK_CLIENTS, MOCK_LEADS,
  MOCK_ADMIN_MESSAGES, MOCK_CLIENT_THREADS, MOCK_THREAD_MESSAGES,
} from "@/lib/mock-data";

// ── In-memory stores ──────────────────────────────────────────────────
let _leads: Lead[]                              = [...MOCK_LEADS];
let _adminMessages: ChatMessage[]               = [...MOCK_ADMIN_MESSAGES];
let _threadMessages: Record<string, ChatMessage[]> = {
  "thread-client-1": [...MOCK_THREAD_MESSAGES["thread-client-1"]],
  "thread-client-2": [...MOCK_THREAD_MESSAGES["thread-client-2"]],
};

// ── Callback registries for live updates ─────────────────────────────
const _adminCbs    = new Set<(msgs: ChatMessage[]) => void>();
const _leadCbs     = new Set<(leads: Lead[]) => void>();
const _threadCbs   = new Map<string, Set<(msgs: ChatMessage[]) => void>>();

// ── Subscriptions ─────────────────────────────────────────────────────

export function subscribeAdvisorMatches(
  _uid: string,
  onNext: (matches: AdvisorMatch[]) => void,
  _onError?: (e: unknown) => void,
): () => void {
  setTimeout(() => onNext(MOCK_MATCHES), 300);
  return () => {};
}

export function subscribeLeads(
  _uid: string,
  onNext: (leads: Lead[]) => void,
  _onError?: (e: unknown) => void,
): () => void {
  _leadCbs.add(onNext);
  setTimeout(() => onNext(_leads), 300);
  return () => { _leadCbs.delete(onNext); };
}

export function subscribeClientThreads(
  _uid: string,
  onNext: (threads: ClientThread[]) => void,
  _onError?: (e: unknown) => void,
): () => void {
  setTimeout(() => onNext(MOCK_CLIENT_THREADS), 300);
  return () => {};
}

export function subscribeAdminThread(
  _uid: string,
  onNext: (messages: ChatMessage[]) => void,
  _onError?: (e: unknown) => void,
): () => void {
  _adminCbs.add(onNext);
  setTimeout(() => onNext(_adminMessages), 300);
  return () => { _adminCbs.delete(onNext); };
}

export function subscribeThreadMessages(
  threadId: string,
  onNext: (messages: ChatMessage[]) => void,
  _onError?: (e: unknown) => void,
): () => void {
  if (!_threadCbs.has(threadId)) _threadCbs.set(threadId, new Set());
  _threadCbs.get(threadId)!.add(onNext);
  setTimeout(() => onNext(_threadMessages[threadId] || []), 300);
  return () => { _threadCbs.get(threadId)?.delete(onNext); };
}

// ── Fetches ───────────────────────────────────────────────────────────

export async function fetchMatchedClient(clientUid: string): Promise<MatchedClientProfile | null> {
  await delay(150);
  return MOCK_CLIENTS[clientUid] || null;
}

// ── Mutations ─────────────────────────────────────────────────────────

export async function ensureThread(_advisorUid: string, _clientUid: string): Promise<string> {
  await delay(300);
  return "thread-mock";
}

export async function sendAdminMessage(_uid: string, text: string): Promise<void> {
  await delay(200);
  const msg: ChatMessage = {
    id: `adm-${Date.now()}`, text,
    senderRole: "advisor", senderUid: _uid, createdAt: Date.now(),
  };
  _adminMessages = [..._adminMessages, msg];
  _adminCbs.forEach((cb) => cb(_adminMessages));
}

export async function sendThreadMessage(threadId: string, _uid: string, text: string): Promise<void> {
  await delay(200);
  const msg: ChatMessage = {
    id: `tmsg-${Date.now()}`, text,
    senderRole: "advisor", senderUid: _uid, createdAt: Date.now(),
  };
  _threadMessages = {
    ..._threadMessages,
    [threadId]: [...(_threadMessages[threadId] || []), msg],
  };
  _threadCbs.get(threadId)?.forEach((cb) => cb(_threadMessages[threadId]));
}

export async function addLead(
  _uid: string,
  payload: Omit<Lead, "id" | "createdAt">,
): Promise<void> {
  await delay(300);
  const lead = { ...payload, id: `lead-${Date.now()}`, createdAt: Date.now() } as Lead;
  _leads = [lead, ..._leads];
  _leadCbs.forEach((cb) => cb(_leads));
}

export async function updateLead(
  _uid: string,
  id: string,
  payload: Partial<Lead>,
): Promise<void> {
  await delay(300);
  _leads = _leads.map((l) => (l.id === id ? { ...l, ...payload } : l));
  _leadCbs.forEach((cb) => cb(_leads));
}

export async function deleteLead(_uid: string, id: string): Promise<void> {
  await delay(200);
  _leads = _leads.filter((l) => l.id !== id);
  _leadCbs.forEach((cb) => cb(_leads));
}

// ── Helpers ───────────────────────────────────────────────────────────
function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
