"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Video, Calendar, Clock, Users, DollarSign, Sparkles,
  ChevronRight, ArrowRight, Play, Plus, Check, X,
  Square, CheckSquare, Edit3, Save, ExternalLink,
  Target, FileText, Mic, ArrowUpRight, MessageSquare,
  CircleDot, AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TodoItem  { id: string; text: string; done: boolean; addedBy: string }
interface Outcome   { id: string; text: string }
interface Session {
  id: string;
  title: string;
  date: string;          // display string
  dateISO: string;       // for sorting
  startTime: string;
  duration: number;      // minutes
  status: "upcoming" | "completed";
  engagementType: "fractional" | "hourly";
  advisorName: string;
  advisorInitials: string;
  advisorColor: string;
  advisorThreadId: string;
  participants: string[];
  milestoneId: string | null;
  milestoneLabel: string | null;
  recordingUrl: string | null;
  agenda: string[];
  aiSummary: string | null;
  manualNotes: string;
  todos: TodoItem[];
  outcomes: Outcome[];
  hourlyRate: number | null;
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const SESSIONS_DATA: Session[] = [
  {
    id: "s5",
    title: "Model review – scenarios",
    date: "May 13, 2025",
    dateISO: "2025-05-13",
    startTime: "10:00 AM",
    duration: 60,
    status: "completed",
    engagementType: "fractional",
    advisorName: "Sarah Chen",
    advisorInitials: "SC",
    advisorColor: "bg-purple-500",
    advisorThreadId: "t_mock_sarah",
    participants: ["Sarah Chen (CFO)", "Amit Joshi (CEO)"],
    milestoneId: "o1",
    milestoneLabel: "Series B financial model",
    recordingUrl: "#",
    agenda: ["Review base / bull / bear scenario tabs", "Stress-test churn and growth assumptions", "Align on unit economics approach", "Next steps for CEO sign-off"],
    aiSummary: `Sarah walked through the three financial scenarios (base, upside, downside) built on top of the completed P&L model. The base case assumes 3% monthly churn and 15% MoM revenue growth; the upside case models successful enterprise upsell at 20% growth; the downside stress-tests a 6% churn environment.\n\nKey discussion: the CEO challenged the 15% growth assumption in the base case as optimistic given current pipeline visibility. Sarah proposed anchoring base case to 12% MoM and reserving 15% for the upside scenario. This was agreed.\n\nUnit economics work will begin this week. Sarah will model CAC by channel (paid, outbound, inbound) and payback period using the last 3 months of actuals. The dashboard will be complete before the next review session.\n\nThe financial model is on track for the May 30 milestone delivery.`,
    manualNotes: "Good session. Agreed to moderate base case growth assumptions. Need to send Sarah Q1 actuals broken down by channel for CAC modelling.",
    todos: [
      { id: "t1", text: "Send Q1 actuals by channel to Sarah by May 15", done: true, addedBy: "Amit Joshi" },
      { id: "t2", text: "Sarah to complete unit economics tab by May 20", done: false, addedBy: "Sarah Chen" },
      { id: "t3", text: "CEO to review and approve base case assumptions by May 22", done: false, addedBy: "Amit Joshi" },
    ],
    outcomes: [
      { id: "oc1", text: "Base case growth revised from 15% to 12% MoM" },
      { id: "oc2", text: "Upside scenario retains 15% MoM growth assumption" },
      { id: "oc3", text: "Unit economics: CAC to be modelled by channel using Q1 actuals" },
    ],
    hourlyRate: null,
  },
  {
    id: "s4",
    title: "Model review – P&L pass 1",
    date: "May 6, 2025",
    dateISO: "2025-05-06",
    startTime: "11:00 AM",
    duration: 45,
    status: "completed",
    engagementType: "fractional",
    advisorName: "Sarah Chen",
    advisorInitials: "SC",
    advisorColor: "bg-purple-500",
    advisorThreadId: "t_mock_sarah",
    participants: ["Sarah Chen (CFO)", "Amit Joshi (CEO)", "Riya Patel (Head of Finance)"],
    milestoneId: "o1",
    milestoneLabel: "Series B financial model",
    recordingUrl: "#",
    agenda: ["Review first-pass P&L projections", "Align on revenue recognition methodology", "Discuss churn assumption inputs"],
    aiSummary: `Sarah presented the first-pass P&L projections covering FY2025–FY2030. Revenue is built bottom-up from the current ARR base, with separate line items for new logo ARR, expansion ARR, and churn.\n\nThe CEO flagged that the churn assumption (3% monthly) felt higher than internal targets of 2.5%. Sarah explained that for investor models it is prudent to use actuals-based assumptions and that 3% reflects the trailing 6-month average. The team agreed to use 3% for the base case but to document the target of 2.5% in the model narrative.\n\nRiya (Head of Finance) flagged a discrepancy between the Stripe revenue data and the accounting system for Q4 2024. Sarah will reconcile this before the next session.`,
    manualNotes: "Riya to reconcile Stripe vs accounting data and share with Sarah by EOW.",
    todos: [
      { id: "t4", text: "Riya to reconcile Stripe vs accounting data by May 9", done: true, addedBy: "Riya Patel" },
      { id: "t5", text: "Sarah to incorporate reconciled data and rerun P&L", done: true, addedBy: "Sarah Chen" },
    ],
    outcomes: [
      { id: "oc4", text: "Churn assumption: 3% monthly (actuals-based) for base case" },
      { id: "oc5", text: "Revenue recognition: ARR accrual method, confirmed with Riya" },
    ],
    hourlyRate: null,
  },
  {
    id: "s3",
    title: "Financial model kickoff",
    date: "Apr 28, 2025",
    dateISO: "2025-04-28",
    startTime: "9:30 AM",
    duration: 60,
    status: "completed",
    engagementType: "fractional",
    advisorName: "Sarah Chen",
    advisorInitials: "SC",
    advisorColor: "bg-purple-500",
    advisorThreadId: "t_mock_sarah",
    participants: ["Sarah Chen (CFO)", "Amit Joshi (CEO)"],
    milestoneId: "o1",
    milestoneLabel: "Series B financial model",
    recordingUrl: "#",
    agenda: ["Align on model structure and output format", "Review data sources and access", "Agree on key assumptions and timeline"],
    aiSummary: `Kickoff session for the Series B financial model milestone. Sarah outlined the proposed model architecture: a three-tab structure covering the three-statement model, a scenario analysis tab, and a unit economics dashboard. The output will be formatted for investor distribution — clean, assumption-driven, with a supporting narrative.\n\nData access was confirmed: Sarah has been granted read access to the Stripe dashboard, QuickBooks, and the internal Google Sheet tracker. The CEO shared the pitch deck draft as context for the investor narrative.\n\nTimeline agreed: first-pass P&L by May 6, scenario analysis by May 13, unit economics by May 20, CEO sign-off by May 22, final delivery by May 30.`,
    manualNotes: "Good alignment. Sarah is clearly experienced with Series B fundraises — she had very specific questions about our cap table and down-round protection terms.",
    todos: [
      { id: "t6", text: "Grant Sarah access to Stripe, QuickBooks, and tracking sheet", done: true, addedBy: "Amit Joshi" },
      { id: "t7", text: "Share pitch deck draft with Sarah", done: true, addedBy: "Amit Joshi" },
      { id: "t8", text: "Sarah to deliver first-pass P&L by May 6", done: true, addedBy: "Sarah Chen" },
    ],
    outcomes: [
      { id: "oc6", text: "Model architecture: three-statement model + scenario analysis + unit economics" },
      { id: "oc7", text: "Final delivery date confirmed: May 30, 2025" },
      { id: "oc8", text: "Data access confirmed across all required systems" },
    ],
    hourlyRate: null,
  },
  {
    id: "s2",
    title: "Board template scoping",
    date: "Apr 24, 2025",
    dateISO: "2025-04-24",
    startTime: "2:00 PM",
    duration: 45,
    status: "completed",
    engagementType: "fractional",
    advisorName: "Sarah Chen",
    advisorInitials: "SC",
    advisorColor: "bg-purple-500",
    advisorThreadId: "t_mock_sarah",
    participants: ["Sarah Chen (CFO)", "Amit Joshi (CEO)", "Riya Patel (Head of Finance)"],
    milestoneId: "o2",
    milestoneLabel: "Monthly board reporting template",
    recordingUrl: "#",
    agenda: ["Review current board pack materials", "Agree on 12 core metrics to track", "Define template structure and format"],
    aiSummary: `Sarah reviewed the existing board pack (a manually assembled Google Slides deck). The current process takes 3–4 days each month due to manual data entry from multiple systems. The goal is to reduce this to under 4 hours.\n\nThe team agreed on 12 core metrics to include: ARR, MRR, net new ARR, churn ARR, NDR, cash runway, burn rate, headcount, pipeline, lead velocity rate, CAC, and LTV. Sarah will build a data input sheet that auto-populates a master slide template.\n\nFormat decision: PowerPoint (not Google Slides) to ensure compatibility with board members on Windows. Riya will provide the last 12 months of historical data for each metric to calibrate the template.`,
    manualNotes: "The board has been asking for better financial visibility for months. This template is overdue.",
    todos: [
      { id: "t9", text: "Riya to export last 12 months of data for 12 agreed metrics", done: true, addedBy: "Riya Patel" },
      { id: "t10", text: "Sarah to deliver draft template by May 8", done: true, addedBy: "Sarah Chen" },
    ],
    outcomes: [
      { id: "oc9", text: "12 core board metrics agreed and documented" },
      { id: "oc10", text: "Format: PowerPoint + Excel data input sheet" },
    ],
    hourlyRate: null,
  },
  {
    id: "s1",
    title: "Upcoming: Series B data room planning",
    date: "Jun 3, 2025",
    dateISO: "2025-06-03",
    startTime: "10:00 AM",
    duration: 60,
    status: "upcoming",
    engagementType: "fractional",
    advisorName: "Sarah Chen",
    advisorInitials: "SC",
    advisorColor: "bg-purple-500",
    advisorThreadId: "t_mock_sarah",
    participants: ["Sarah Chen (CFO)", "Amit Joshi (CEO)", "Legal Counsel (TBC)"],
    milestoneId: "o3",
    milestoneLabel: "Investor data room ready",
    recordingUrl: null,
    agenda: [
      "Define data room folder structure and taxonomy",
      "Review document gap analysis",
      "Assign document collection owners",
      "Timeline and deadlines for data room completion",
    ],
    aiSummary: null,
    manualNotes: "",
    todos: [],
    outcomes: [],
    hourlyRate: null,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDuration(mins: number) {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m > 0 ? `${h}h ${m}m` : `${h}h`;
}

function StatusPill({ status }: { status: string }) {
  if (status === "completed")
    return <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full"><Check className="w-3 h-3" /> Completed</span>;
  return <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full"><CircleDot className="w-3 h-3" /> Upcoming</span>;
}

// ─── Session list card ────────────────────────────────────────────────────────

function SessionRow({ session, onClick }: { session: Session; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="w-full bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-gray-300 transition text-left flex items-center gap-4">
      {/* Date block */}
      <div className="flex-shrink-0 w-14 text-center bg-gray-50 border border-gray-100 rounded-xl py-2.5 px-1">
        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
          {new Date(session.dateISO + "T12:00:00").toLocaleString("en-US", { month: "short" })}
        </p>
        <p className="text-2xl font-black text-gray-900 leading-none mt-0.5">
          {new Date(session.dateISO + "T12:00:00").getDate()}
        </p>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 flex-wrap">
          <div>
            <p className="font-semibold text-gray-900 text-[15px]">{session.title}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 flex-wrap">
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {session.startTime} · {formatDuration(session.duration)}</span>
              <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {session.participants.length} participants</span>
              {session.milestoneLabel && (
                <span className="flex items-center gap-1 text-blue-600"><Target className="w-3 h-3" /> {session.milestoneLabel}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <StatusPill status={session.status} />
            {session.recordingUrl && (
              <span className="flex items-center gap-1 text-xs text-gray-400 font-medium"><Video className="w-3 h-3" /> Rec</span>
            )}
          </div>
        </div>

        {/* Advisor */}
        <div className="flex items-center gap-2 mt-2">
          <div className={`w-5 h-5 rounded-full ${session.advisorColor} text-white grid place-items-center text-[9px] font-bold flex-shrink-0`}>
            {session.advisorInitials}
          </div>
          <p className="text-xs text-gray-500">{session.advisorName} · {session.engagementType === "hourly" ? `$${session.hourlyRate}/hr` : "Fractional"}</p>
        </div>
      </div>

      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </button>
  );
}

// ─── Session detail ───────────────────────────────────────────────────────────

function SessionDetail({ session: initialSession, onBack }: { session: Session; onBack: () => void }) {
  const [session, setSession] = useState(initialSession);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(session.manualNotes);
  const [newTodo, setNewTodo] = useState("");
  const [newOutcome, setNewOutcome] = useState("");
  const [aiExpanded, setAiExpanded] = useState(true);
  const todoInputRef = useRef<HTMLInputElement>(null);
  const outcomeInputRef = useRef<HTMLInputElement>(null);

  function saveNotes() {
    setSession(s => ({ ...s, manualNotes: notesDraft }));
    setEditingNotes(false);
  }

  function addTodo() {
    if (!newTodo.trim()) return;
    const item: TodoItem = { id: `t-${Date.now()}`, text: newTodo.trim(), done: false, addedBy: "You" };
    setSession(s => ({ ...s, todos: [...s.todos, item] }));
    setNewTodo("");
    todoInputRef.current?.focus();
  }

  function toggleTodo(id: string) {
    setSession(s => ({ ...s, todos: s.todos.map(t => t.id === id ? { ...t, done: !t.done } : t) }));
  }

  function deleteTodo(id: string) {
    setSession(s => ({ ...s, todos: s.todos.filter(t => t.id !== id) }));
  }

  function addOutcome() {
    if (!newOutcome.trim()) return;
    const item: Outcome = { id: `oc-${Date.now()}`, text: newOutcome.trim() };
    setSession(s => ({ ...s, outcomes: [...s.outcomes, item] }));
    setNewOutcome("");
    outcomeInputRef.current?.focus();
  }

  function deleteOutcome(id: string) {
    setSession(s => ({ ...s, outcomes: s.outcomes.filter(o => o.id !== id) }));
  }

  const doneTodos = session.todos.filter(t => t.done).length;
  const cost = session.hourlyRate ? Math.round((session.duration / 60) * session.hourlyRate) : null;

  return (
    <div className="max-w-3xl">
      {/* Back */}
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-5 transition">
        <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to sessions
      </button>

      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className={`w-11 h-11 rounded-full ${session.advisorColor} text-white grid place-items-center font-bold text-base flex-shrink-0`}>
          {session.advisorInitials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-display text-[1.35rem] font-bold tracking-tight text-gray-900">{session.title}</h1>
            <StatusPill status={session.status} />
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{session.advisorName} · {session.date} at {session.startTime}</p>
        </div>
      </div>

      {/* Metadata strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: Calendar, label: "Date", value: session.date },
          { icon: Clock, label: "Duration", value: formatDuration(session.duration) },
          { icon: Users, label: "Participants", value: `${session.participants.length} people` },
          cost
            ? { icon: DollarSign, label: "Session cost", value: `$${cost.toLocaleString()}` }
            : { icon: FileText, label: "Engagement", value: "Fractional" },
        ].map(m => {
          const Icon = m.icon;
          return (
            <div key={m.label} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-gray-400" />
                <p className="text-xs text-gray-400">{m.label}</p>
              </div>
              <p className="font-semibold text-gray-900 text-sm">{m.value}</p>
            </div>
          );
        })}
      </div>

      {/* Participants */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5" /> Participants
        </p>
        <div className="flex flex-wrap gap-2">
          {session.participants.map((p, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 text-sm text-gray-700 bg-gray-50 border border-gray-100 rounded-full px-3 py-1">
              <div className={`w-5 h-5 rounded-full ${i === 0 ? session.advisorColor : "bg-gray-400"} text-white grid place-items-center text-[9px] font-bold flex-shrink-0`}>
                {p[0]}
              </div>
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Agenda */}
      {session.agenda.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Agenda
          </p>
          <ol className="space-y-2">
            {session.agenda.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                <span className="w-5 h-5 rounded-full bg-blue-50 text-blue-600 text-[11px] font-bold grid place-items-center flex-shrink-0 mt-0.5">{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Recording + milestone cross-links */}
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        {/* Recording */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" /> Call recording
          </p>
          {session.recordingUrl ? (
            <a href={session.recordingUrl} target="_blank" rel="noreferrer"
              className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/40 transition group">
              <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">Watch recording</p>
                <p className="text-xs text-gray-500">{formatDuration(session.duration)} · Full session</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition" />
            </a>
          ) : (
            <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-400">
              <div className="w-9 h-9 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                <Video className="w-4 h-4 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">No recording yet</p>
                <p className="text-xs text-gray-400">Available after the session</p>
              </div>
            </div>
          )}
        </div>

        {/* Linked milestone */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> Linked milestone
          </p>
          {session.milestoneLabel ? (
            <Link href="/dashboard/milestones"
              className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/40 transition group">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{session.milestoneLabel}</p>
                <p className="text-xs text-gray-500">View on milestones page</p>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-blue-500 transition" />
            </Link>
          ) : (
            <p className="text-sm text-gray-400 italic">No milestone linked.</p>
          )}
        </div>
      </div>

      {/* Advisor message thread */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" /> Discuss with advisor
        </p>
        <Link href={`/dashboard/messages?thread=${session.advisorThreadId}`}
          className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/40 transition group">
          <div className={`w-9 h-9 rounded-full ${session.advisorColor} text-white grid place-items-center font-bold text-[12px] flex-shrink-0`}>
            {session.advisorInitials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">{session.advisorName}</p>
            <p className="text-xs text-gray-500">Open message thread for this engagement</p>
          </div>
          <div className="flex items-center gap-1 text-xs text-blue-600 font-medium group-hover:gap-1.5 transition-all">
            Message <ArrowUpRight className="w-3 h-3" />
          </div>
        </Link>
      </div>

      {/* AI Summary */}
      {session.aiSummary && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-4">
          <button
            onClick={() => setAiExpanded(e => !e)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-900">AI-generated summary</p>
                <p className="text-[11px] text-gray-400">Automatically generated from the session recording</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{aiExpanded ? "Collapse" : "Expand"}</span>
          </button>
          {aiExpanded && (
            <div className="border-t border-gray-100 px-5 py-4">
              <div className="flex items-start gap-2 mb-3 px-3 py-2 bg-blue-50 border border-blue-100 rounded-xl">
                <Sparkles className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700">This summary was generated by AI from the session transcript. Review it alongside the recording for full accuracy.</p>
              </div>
              <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{session.aiSummary}</div>
            </div>
          )}
        </div>
      )}

      {/* Upcoming session notice */}
      {session.status === "upcoming" && (
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 mb-4">
          <AlertCircle className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900">This session hasn't happened yet</p>
            <p className="text-sm text-blue-700 mt-0.5">The AI summary and recording will be available here after the session. You can add pre-session notes and agenda items below.</p>
          </div>
        </div>
      )}

      {/* Manual notes */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
            <Edit3 className="w-3.5 h-3.5" /> {session.status === "upcoming" ? "Pre-session notes" : "Your notes"}
          </p>
          {editingNotes ? (
            <div className="flex items-center gap-2">
              <button onClick={() => { setEditingNotes(false); setNotesDraft(session.manualNotes); }}
                className="text-xs text-gray-400 hover:text-gray-600 transition">Cancel</button>
              <button onClick={saveNotes}
                className="flex items-center gap-1 text-xs text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-1 rounded-lg font-medium transition">
                <Save className="w-3 h-3" /> Save
              </button>
            </div>
          ) : (
            <button onClick={() => setEditingNotes(true)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition font-medium">
              <Edit3 className="w-3 h-3" /> Edit
            </button>
          )}
        </div>
        {editingNotes ? (
          <textarea
            value={notesDraft}
            onChange={e => setNotesDraft(e.target.value)}
            rows={5}
            placeholder="Add your notes, observations, or context about this session…"
            className="w-full border border-gray-200 rounded-xl px-3.5 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y leading-relaxed"
            style={{ background: "#fff", color: "#111827", colorScheme: "light" }}
            autoFocus
          />
        ) : session.manualNotes ? (
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{session.manualNotes}</p>
        ) : (
          <button onClick={() => setEditingNotes(true)}
            className="w-full text-sm text-gray-400 text-center py-6 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:text-blue-500 transition">
            + Add notes
          </button>
        )}
      </div>

      {/* Action items / todos */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5">
            <CheckSquare className="w-3.5 h-3.5" /> Action items
            {session.todos.length > 0 && (
              <span className="ml-1 text-[10px] font-semibold bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">
                {doneTodos}/{session.todos.length}
              </span>
            )}
          </p>
        </div>

        {/* Todo list */}
        {session.todos.length > 0 && (
          <ul className="space-y-2 mb-3">
            {session.todos.map(todo => (
              <li key={todo.id} className="flex items-start gap-2.5 group">
                <button onClick={() => toggleTodo(todo.id)} className="flex-shrink-0 mt-0.5">
                  {todo.done
                    ? <CheckSquare className="w-4 h-4 text-blue-600" />
                    : <Square className="w-4 h-4 text-gray-300 hover:text-blue-400 transition" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${todo.done ? "line-through text-gray-400 decoration-gray-300" : "text-gray-800"}`}>
                    {todo.text}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{todo.addedBy}</p>
                </div>
                <button onClick={() => deleteTodo(todo.id)}
                  className="opacity-0 group-hover:opacity-100 transition p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <X className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Add todo input */}
        <div className="flex items-center gap-2">
          <input
            ref={todoInputRef}
            value={newTodo}
            onChange={e => setNewTodo(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addTodo(); }}
            placeholder="Add an action item…"
            className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            style={{ background: "#fff", color: "#111827", colorScheme: "light" }}
          />
          <button onClick={addTodo} disabled={!newTodo.trim()}
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-40">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>

      {/* Outcomes & decisions */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-1.5">
          <Mic className="w-3.5 h-3.5" /> Key outcomes & decisions
        </p>

        {session.outcomes.length > 0 && (
          <ul className="space-y-2 mb-3">
            {session.outcomes.map(oc => (
              <li key={oc.id} className="flex items-start gap-2.5 group">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-2" />
                <p className="flex-1 text-sm text-gray-800 leading-snug">{oc.text}</p>
                <button onClick={() => deleteOutcome(oc.id)}
                  className="opacity-0 group-hover:opacity-100 transition p-0.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600 flex-shrink-0">
                  <X className="w-3 h-3" />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center gap-2">
          <input
            ref={outcomeInputRef}
            value={newOutcome}
            onChange={e => setNewOutcome(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") addOutcome(); }}
            placeholder="Add a key decision or outcome…"
            className="flex-1 text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            style={{ background: "#fff", color: "#111827", colorScheme: "light" }}
          />
          <button onClick={addOutcome} disabled={!newOutcome.trim()}
            className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition disabled:opacity-40">
            <Plus className="w-3.5 h-3.5" /> Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SessionsPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [tab, setTab] = useState<"all" | "upcoming" | "past">("all");

  const session = SESSIONS_DATA.find(s => s.id === selected);
  if (session) return <SessionDetail session={session} onBack={() => setSelected(null)} />;

  const sorted = [...SESSIONS_DATA].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
  const filtered = tab === "upcoming"
    ? sorted.filter(s => s.status === "upcoming")
    : tab === "past"
    ? sorted.filter(s => s.status === "completed")
    : sorted;

  const totalHours = SESSIONS_DATA.filter(s => s.status === "completed").reduce((acc, s) => acc + s.duration, 0) / 60;
  const upcomingCount = SESSIONS_DATA.filter(s => s.status === "upcoming").length;
  const completedCount = SESSIONS_DATA.filter(s => s.status === "completed").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">Sessions</h1>
        <p className="text-gray-500 text-sm mt-1">All advisory sessions — scheduled, in progress, and past.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total sessions", value: completedCount, sub: "completed" },
          { label: "Hours logged", value: `${totalHours.toFixed(1)}h`, sub: "across all sessions" },
          { label: "Upcoming", value: upcomingCount, sub: "scheduled" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-400 mb-0.5">{s.label}</p>
            <p className="font-display font-bold text-gray-900 text-lg">{s.value}</p>
            <p className="text-[11px] text-gray-400">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {(["all", "upcoming", "past"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition ${
              tab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* Session list */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl py-16 text-center">
            <Video className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No sessions in this category</p>
          </div>
        ) : (
          filtered.map(s => <SessionRow key={s.id} session={s} onClick={() => setSelected(s.id)} />)
        )}
      </div>
    </div>
  );
}
