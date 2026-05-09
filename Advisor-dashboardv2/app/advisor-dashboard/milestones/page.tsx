"use client";

/**
 * /advisor-dashboard/milestones — Project milestones (advisor view).
 *
 * Mirrors the client-side milestone page but from Sarah Chen's perspective:
 *   • Activity log entries are Sarah's updates to the client
 *   • "Discuss with client" panel shows Alex Johnson (not the advisor)
 *   • Everything else (deliverables, sessions, criteria) is shared/mutual
 */

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft, CheckCircle2, Circle, Clock, ChevronDown, ChevronUp,
  Calendar, MessageSquare, Video, AlertCircle, ExternalLink,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface Session {
  title   : string;
  date    : string;
  duration: string;
  notes   : string;
}

interface ActivityEntry {
  date: string;
  text: string;
}

interface Deliverable {
  label: string;
  done : boolean;
}

interface Milestone {
  id              : string;
  title           : string;
  due             : string;
  status          : "in_progress" | "upcoming" | "done";
  bonus          ?: string;
  overview       ?: string;
  acceptanceCriteria?: string[];
  deliverables   ?: Deliverable[];
  sessions       ?: Session[];
  activity       ?: ActivityEntry[];
}

/* ─── Mock data ──────────────────────────────────────────────────────────── */

const CLIENT = {
  name    : "Alex Johnson",
  initials: "AJ",
  company : "GrowthTech",
  color   : "bg-indigo-600",
};

const MILESTONES: Milestone[] = [
  {
    id    : "m1",
    title : "Series B financial model",
    due   : "Due May 30, 2025",
    status: "in_progress",
    bonus : null,
    overview: "A comprehensive 5-year financial model built for Series B fundraising. Includes a three-statement model (P&L, balance sheet, cash flow), scenario analysis (base / bull / bear), unit economics breakdown, and a 24-month cash runway forecast. The model will be formatted for investor distribution and linked to a supporting narrative document.",
    acceptanceCriteria: [
      "Five-year P&L, balance sheet, and cash flow projections complete",
      "Three scenarios modelled (base, upside, downside)",
      "Unit economics (CAC, LTV, payback period) clearly presented",
      "Model reviewed and signed off by CEO",
      "Investor-ready formatting with no formula errors",
    ],
    deliverables: [
      { label: "Three-statement financial model (Excel)", done: true  },
      { label: "Scenario analysis tab",                  done: true  },
      { label: "Unit economics dashboard",               done: false },
      { label: "CEO review & sign-off",                  done: false },
      { label: "Investor-formatted PDF export",          done: false },
    ],
    sessions: [
      { title: "Financial model kickoff",  date: "Apr 28, 2025", duration: "60 min", notes: "Aligned on model structure, data sources, and key assumptions" },
      { title: "Model review – P&L pass 1", date: "May 6, 2025",  duration: "45 min", notes: "Reviewed first pass of P&L; CEO requested adjustment to churn assumptions" },
      { title: "Model review – scenarios",  date: "May 13, 2025", duration: "60 min", notes: "Finalised base/bull/bear scenarios; unit economics next" },
    ],
    activity: [
      { date: "May 13", text: "Scenario analysis complete. Starting unit economics tab this week." },
      { date: "May 6",  text: "P&L first pass shared for CEO review via shared Google Sheet." },
      { date: "Apr 28", text: "Kickoff complete. Data access confirmed. Skeleton model created." },
    ],
  },
  {
    id    : "m2",
    title : "Monthly board reporting template",
    due   : "Due May 15, 2025",
    status: "done",
    overview: "A repeatable board reporting package delivered monthly, covering financial performance, KPI dashboard, and variance commentary. Designed for a 10-minute board read.",
    acceptanceCriteria: [
      "Monthly P&L vs. budget variance clearly shown",
      "Top 5 KPIs tracked with trend lines",
      "Executive narrative section included",
      "Format approved by CEO and Board Chair",
      "Template documented for future use by finance team",
    ],
    deliverables: [
      { label: "Board deck template (Google Slides)", done: true },
      { label: "KPI tracker (Google Sheets)",         done: true },
      { label: "Variance commentary guide",           done: true },
      { label: "April board package (first run)",     done: true },
      { label: "Handoff documentation",               done: true },
    ],
    sessions: [
      { title: "Board template kickoff",   date: "Apr 20, 2025", duration: "45 min", notes: "Agreed on format, KPI set, and narrative structure with CEO" },
      { title: "Template review & sign-off", date: "May 10, 2025", duration: "30 min", notes: "CEO and Board Chair approved final template" },
    ],
    activity: [
      { date: "May 15", text: "Milestone complete. Board package delivered and signed off." },
      { date: "May 10", text: "Final template approved in review session. Handoff docs uploaded." },
      { date: "Apr 30", text: "First draft of template shared with CEO for review." },
    ],
  },
  {
    id    : "m3",
    title : "Investor data room ready",
    due   : "Due July 1, 2025",
    status: "upcoming",
    bonus : "$5,000 on completion",
    deliverables: [
      { label: "Data room folder structure created",   done: false },
      { label: "Historical financials uploaded",       done: false },
      { label: "Cap table and legal docs organised",   done: false },
      { label: "Customer and revenue cohort analysis", done: false },
      { label: "Team bios and org chart",              done: false },
      { label: "Data room access tested with advisor", done: false },
    ],
  },
  {
    id    : "m4",
    title : "Series B close support",
    due   : "Due September 30, 2025",
    status: "upcoming",
    bonus : "$10,000 on completion",
    deliverables: [
      { label: "Investor Q&A support (ongoing)",       done: false },
      { label: "Term sheet financial analysis",        done: false },
      { label: "Cap table modelling post-raise",       done: false },
      { label: "Board presentation for close",         done: false },
      { label: "Post-close financial model update",    done: false },
    ],
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

const STATUS_ORDER: Milestone["status"][] = ["in_progress", "upcoming", "done"];

function statusLabel(s: Milestone["status"]) {
  return s === "in_progress" ? "In progress" : s === "done" ? "Done" : "Upcoming";
}

function StatusChip({ status }: { status: Milestone["status"] }) {
  const styles = {
    in_progress: "bg-blue-50  text-blue-600  border-blue-200",
    done       : "bg-green-50 text-green-600 border-green-200",
    upcoming   : "bg-gray-50  text-gray-400  border-gray-200",
  }[status];

  const Icon = status === "done" ? CheckCircle2 : status === "in_progress" ? Clock : Circle;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold border ${styles}`}>
      <Icon className="w-3.5 h-3.5" />
      {statusLabel(status)}
    </span>
  );
}

function SectionDot({ status }: { status: Milestone["status"] }) {
  if (status === "in_progress") return <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />;
  if (status === "done")        return <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />;
  return <Clock className="w-4 h-4 text-gray-400 shrink-0" />;
}

function sectionHeading(status: Milestone["status"]) {
  if (status === "in_progress") return "In progress";
  if (status === "done")        return "Completed";
  return "Upcoming";
}

/* ─── Milestone card ─────────────────────────────────────────────────────── */

function MilestoneCard({ m, defaultOpen }: { m: Milestone; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen ?? false);

  const doneDelivs  = m.deliverables?.filter(d => d.done).length ?? 0;
  const totalDelivs = m.deliverables?.length ?? 0;
  const pct         = totalDelivs > 0 ? (doneDelivs / totalDelivs) * 100 : 0;
  const barColor    = m.status === "done" ? "bg-green-500" : m.status === "in_progress" ? "bg-blue-500" : "bg-gray-300";

  return (
    <div className={`bg-white border rounded-xl overflow-hidden ${
      m.status === "in_progress" ? "border-blue-200 shadow-sm" :
      m.status === "done"        ? "border-green-200" :
                                   "border-gray-200"
    }`}>
      {/* Header row — always visible */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <SectionDot status={m.status} />
          <div className="min-w-0">
            <div className={`text-[14.5px] font-semibold leading-snug ${m.status === "upcoming" ? "text-gray-500" : "text-gray-900"}`}>
              {m.title}
            </div>
            <div className="flex items-center gap-3 mt-0.5 flex-wrap">
              <span className="text-[12px] text-gray-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" />{m.due}
              </span>
              {m.bonus && (
                <span className="text-[12px] text-green-600 font-medium flex items-center gap-1">
                  $ {m.bonus}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <StatusChip status={m.status} />
          {open
            ? <ChevronUp   className="w-4 h-4 text-gray-400" />
            : <ChevronDown className="w-4 h-4 text-gray-400" />}
        </div>
      </button>

      {/* Progress bar — always visible */}
      {totalDelivs > 0 && (
        <div className="px-5 pb-3 flex items-center justify-between gap-4 -mt-1">
          <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${barColor} transition-all`} style={{ width: `${pct}%` }} />
          </div>
          <span className="text-[11.5px] text-gray-400 shrink-0">{doneDelivs}/{totalDelivs} deliverables</span>
        </div>
      )}

      {/* Expanded body */}
      {open && (
        <div className="border-t border-gray-100">

          {/* Overview */}
          {m.overview && (
            <div className="px-5 py-4 border-b border-gray-50">
              <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-2">Overview</div>
              <p className="text-[13.5px] text-gray-700 leading-relaxed">{m.overview}</p>
            </div>
          )}

          {/* Acceptance criteria + Deliverables */}
          {(m.acceptanceCriteria || m.deliverables) && (
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-b border-gray-50">

              {/* Acceptance criteria */}
              {m.acceptanceCriteria && (
                <div className="px-5 py-4">
                  <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-3">Acceptance criteria</div>
                  <ul className="flex flex-col gap-2.5">
                    {m.acceptanceCriteria.map((c) => (
                      <li key={c} className="flex items-start gap-2">
                        <Circle className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                        <span className="text-[13px] text-gray-600 leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Deliverables */}
              {m.deliverables && (
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400">Deliverables</div>
                    <span className="text-[11.5px] text-gray-400">{doneDelivs}/{totalDelivs} done</span>
                  </div>
                  {/* Mini progress */}
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                  </div>
                  <ul className="flex flex-col gap-2">
                    {m.deliverables.map((d) => (
                      <li key={d.label} className="flex items-center gap-2">
                        {d.done
                          ? <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0" />
                          : <div className="w-4 h-4 rounded border border-gray-300 shrink-0" />
                        }
                        <span className={`text-[13px] leading-snug ${d.done ? "text-gray-900 line-through decoration-gray-300" : "text-gray-600"}`}>
                          {d.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Related sessions */}
          {m.sessions && m.sessions.length > 0 && (
            <div className="px-5 py-4 border-b border-gray-50">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400">
                  Related sessions ({m.sessions.length})
                </div>
                <Link href="/advisor-dashboard/meetings" className="text-[12px] text-blue-600 hover:underline font-medium flex items-center gap-1">
                  All meetings <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <div className="flex flex-col gap-1.5">
                {m.sessions.map((s) => (
                  <div key={s.title} className="flex items-start gap-3 border border-gray-100 rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors">
                    <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <Video className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[13px] font-semibold text-gray-900 truncate">{s.title}</span>
                        <span className="text-[11.5px] text-gray-400 shrink-0">{s.duration}</span>
                      </div>
                      <div className="text-[11.5px] text-gray-400 mt-0.5">{s.date}</div>
                      <div className="text-[12.5px] text-gray-500 mt-0.5 leading-snug">{s.notes}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity + Discuss with client */}
          {m.activity && (
            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100 border-b border-gray-50">

              {/* Activity log */}
              <div className="px-5 py-4">
                <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-3">Activity</div>
                <ul className="flex flex-col gap-3">
                  {m.activity.map((a, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <div className="flex flex-col items-center shrink-0 mt-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {i < m.activity!.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" style={{ minHeight: 16 }} />}
                      </div>
                      <div>
                        <span className="text-[11.5px] text-gray-400 font-medium">{a.date} · Sarah Chen</span>
                        <p className="text-[13px] text-gray-700 mt-0.5 leading-snug">{a.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Discuss with client */}
              <div className="px-5 py-4">
                <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-3">Discuss with client</div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-full ${CLIENT.color} flex items-center justify-center text-white font-bold text-[13px] shrink-0`}>
                    {CLIENT.initials}
                  </div>
                  <div>
                    <div className="text-[14px] font-semibold text-gray-900">{CLIENT.name}</div>
                    <div className="text-[12px] text-gray-400">{CLIENT.company} · Open message thread</div>
                  </div>
                  <Link
                    href="/advisor-dashboard/messages"
                    className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12.5px] font-semibold border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors shrink-0"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />Message
                  </Link>
                </div>
                <p className="text-[12.5px] text-gray-500 leading-snug">
                  Attach deliverables, raise questions, or flag blockers directly in your message thread.
                  {CLIENT.name.split(" ")[0]} typically responds within one business day.
                </p>
              </div>
            </div>
          )}

          {/* SOW footer notice */}
          <div className="px-5 py-3 bg-amber-50 border-t border-amber-100 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-[12px] text-amber-800 leading-snug">
              Full milestone definitions, acceptance criteria, and any amendments are in the{" "}
              <span className="font-semibold">Statement of Work (SOW) PDF</span>. The SOW is the
              governing document in case of any discrepancy.{" "}
              <Link href="/advisor-dashboard/contracts/1" className="text-blue-600 hover:underline font-medium">
                View contract →
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────────────────── */

export default function MilestonesPage() {
  const total    = MILESTONES.length;
  const done     = MILESTONES.filter(m => m.status === "done").length;
  const inProg   = MILESTONES.filter(m => m.status === "in_progress").length;
  const upcoming = MILESTONES.filter(m => m.status === "upcoming").length;
  const pct      = total > 0 ? (done / total) * 100 : 0;

  const grouped = STATUS_ORDER
    .map(s => ({ status: s, items: MILESTONES.filter(m => m.status === s) }))
    .filter(g => g.items.length > 0);

  return (
    <div>

      {/* Page header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-[24px] font-semibold tracking-tight">Project milestones</h1>
          <p className="text-sm text-gray-500 mt-1">Track deliverables and progress across all your active engagements.</p>
        </div>
        <Link
          href="/advisor-dashboard/contracts"
          className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors mt-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          View contracts
        </Link>
      </div>

      {/* Overall progress bar */}
      <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <div className="text-[13.5px] font-semibold text-gray-900">Overall progress</div>
            <div className="text-[12px] text-gray-400 mt-0.5">{done} of {total} milestones complete</div>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-gray-500">
            {inProg > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />{inProg} in progress
              </span>
            )}
            {upcoming > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />{upcoming} upcoming
              </span>
            )}
            {done > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />{done} done
              </span>
            )}
          </div>
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Milestone sections */}
      <div className="flex flex-col gap-8">
        {grouped.map(({ status, items }) => (
          <div key={status}>
            {/* Section heading */}
            <div className="flex items-center gap-2 mb-3">
              <SectionDot status={status} />
              <h2 className="text-[14px] font-semibold text-gray-700">{sectionHeading(status)}</h2>
            </div>

            <div className="flex flex-col gap-3">
              {items.map((m) => (
                <MilestoneCard
                  key={m.id}
                  m={m}
                  defaultOpen={status === "in_progress"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
