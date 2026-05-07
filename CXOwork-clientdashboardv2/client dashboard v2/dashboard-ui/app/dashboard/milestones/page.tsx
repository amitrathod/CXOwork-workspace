"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Target, CheckCircle2, Clock, Circle, CircleDot,
  CheckSquare, Square, FileText, Video, MessageSquare,
  Paperclip, ArrowUpRight, Info, ChevronDown, ChevronUp,
  ArrowRight, Calendar, DollarSign,
} from "lucide-react";

// ─── Shared milestone data ────────────────────────────────────────────────────
// (mirrors the contracts page mock — single source of truth in production)

const ENGAGEMENTS = [
  {
    id: "contract-1",
    title: "Fractional CFO Engagement",
    advisorName: "Sarah Chen",
    advisorInitials: "SC",
    advisorColor: "bg-purple-500",
    advisorThreadId: "t_mock_sarah",
    startDate: "April 22, 2025",
    endDate: "October 22, 2025",
    milestones: [
      {
        id: "o1",
        label: "Series B financial model",
        status: "in_progress",
        dueDate: "May 30, 2025",
        payment: null,
        description: "A comprehensive 5-year financial model built for Series B fundraising. Includes a three-statement model (P&L, balance sheet, cash flow), scenario analysis (base / bull / bear), unit economics breakdown, and a 24-month cash runway forecast. The model will be formatted for investor distribution and linked to a supporting narrative document.",
        acceptanceCriteria: [
          "Five-year P&L, balance sheet, and cash flow projections complete",
          "Three scenarios modelled (base, upside, downside)",
          "Unit economics (CAC, LTV, payback period) clearly presented",
          "Model reviewed and signed off by CEO",
          "Investor-ready formatting with no formula errors",
        ],
        deliverables: [
          { label: "Three-statement financial model (Excel)", done: true },
          { label: "Scenario analysis tab", done: true },
          { label: "Unit economics dashboard", done: false },
          { label: "CEO review & sign-off", done: false },
          { label: "Investor-formatted PDF export", done: false },
        ],
        relatedSessions: [
          { id: "s1", title: "Financial model kickoff", date: "Apr 28, 2025", duration: "60 min", notes: "Aligned on model structure, data sources, and key assumptions" },
          { id: "s2", title: "Model review – P&L pass 1", date: "May 6, 2025", duration: "45 min", notes: "Reviewed first pass of P&L; CEO requested adjustment to churn assumptions" },
          { id: "s3", title: "Model review – scenarios", date: "May 13, 2025", duration: "60 min", notes: "Finalised base/bull/bear scenarios; unit economics next" },
        ],
        activity: [
          { date: "May 13", actor: "Sarah Chen", note: "Scenario analysis complete. Starting unit economics tab this week." },
          { date: "May 6", actor: "Sarah Chen", note: "P&L first pass shared for CEO review via shared Google Sheet." },
          { date: "Apr 28", actor: "Sarah Chen", note: "Kickoff complete. Data access confirmed. Skeleton model created." },
        ],
      },
      {
        id: "o2",
        label: "Monthly board reporting template",
        status: "completed",
        dueDate: "May 15, 2025",
        payment: null,
        description: "A reusable board reporting template that consolidates key financial and operational metrics into a single, consistent slide deck. Designed to reduce monthly prep time from 3–4 days to under 4 hours. Includes a data input sheet, automated chart generation, and a narrative summary section.",
        acceptanceCriteria: [
          "Template covers financial, operational, and people metrics",
          "Data input sheet auto-populates charts and summaries",
          "CEO and head of finance have reviewed and approved",
          "First live board pack produced using the template",
          "Documented instructions provided for monthly use",
        ],
        deliverables: [
          { label: "Board pack slide template (PowerPoint)", done: true },
          { label: "Automated data input sheet (Excel)", done: true },
          { label: "Narrative summary section", done: true },
          { label: "CEO sign-off", done: true },
          { label: "Usage documentation & handoff", done: true },
        ],
        relatedSessions: [
          { id: "s4", title: "Board template scoping", date: "Apr 24, 2025", duration: "45 min", notes: "Reviewed existing board materials; agreed on 12 core metrics to track" },
          { id: "s5", title: "Template review & handoff", date: "May 14, 2025", duration: "60 min", notes: "Final walkthrough of template; CEO approved and signed off" },
        ],
        activity: [
          { date: "May 15", actor: "Sarah Chen", note: "Milestone complete. Template delivered and handed off. First live use scheduled for May board." },
          { date: "May 14", actor: "You", note: "CEO reviewed and approved the template. Looks great." },
          { date: "May 8", actor: "Sarah Chen", note: "Draft template shared for review. Automated charts working end-to-end." },
        ],
      },
      {
        id: "o3",
        label: "Investor data room ready",
        status: "upcoming",
        dueDate: "July 1, 2025",
        payment: 5000,
        description: "A fully organised and investor-ready virtual data room (VDR) covering all materials required for Series B due diligence. Includes legal documents, financial records, customer contracts, cap table, IP filings, and board minutes. Sarah will audit existing materials, identify gaps, and coordinate with legal and finance to fill them ahead of the fundraise.",
        acceptanceCriteria: [
          "Data room structure follows Series B investor expectations",
          "All required document categories populated",
          "Legal documents reviewed by outside counsel",
          "Sensitive items appropriately redacted or access-controlled",
          "CEO walkthrough completed and approved",
        ],
        deliverables: [
          { label: "Data room structure and folder taxonomy", done: false },
          { label: "Document gap analysis", done: false },
          { label: "Financial records uploaded and organised", done: false },
          { label: "Legal docs reviewed and uploaded", done: false },
          { label: "Cap table and equity summary", done: false },
          { label: "CEO sign-off and VDR access provisioned", done: false },
        ],
        relatedSessions: [],
        activity: [
          { date: "May 13", actor: "Sarah Chen", note: "Scheduled data room kickoff for June 3 once financial model is complete." },
        ],
      },
      {
        id: "o4",
        label: "Series B close support",
        status: "upcoming",
        dueDate: "September 30, 2025",
        payment: 10000,
        description: "Hands-on support through the final stages of the Series B fundraise. Sarah will be the primary finance point of contact for investor diligence questions, will manage Q&A responses, co-ordinate with legal on term sheet negotiation, and provide financial modelling support for any investor requests that arise during the close process.",
        acceptanceCriteria: [
          "All investor diligence questions answered within agreed SLA",
          "Term sheet reviewed from a financial/economic perspective",
          "Close financial model updated to reflect final deal terms",
          "Cap table updated post-close",
          "Post-close board pack prepared",
        ],
        deliverables: [
          { label: "Diligence Q&A tracker", done: false },
          { label: "Term sheet financial review", done: false },
          { label: "Final close financial model", done: false },
          { label: "Updated cap table", done: false },
          { label: "Post-close board reporting update", done: false },
        ],
        relatedSessions: [],
        activity: [],
      },
    ],
  },
];

// ─── Status helpers ───────────────────────────────────────────────────────────

function OutcomeStatusPill({ status }: { status: string }) {
  if (status === "completed")
    return <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2.5 py-1 rounded-full"><CheckCircle2 className="w-3.5 h-3.5" /> Done</span>;
  if (status === "in_progress")
    return <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full"><CircleDot className="w-3.5 h-3.5" /> In progress</span>;
  return <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2.5 py-1 rounded-full"><Circle className="w-3.5 h-3.5" /> Upcoming</span>;
}

// ─── Milestone card ───────────────────────────────────────────────────────────

type Milestone = typeof ENGAGEMENTS[0]["milestones"][0];

function MilestoneCard({ milestone, advisorName, advisorInitials, advisorColor, advisorThreadId }: {
  milestone: Milestone;
  advisorName: string;
  advisorInitials: string;
  advisorColor: string;
  advisorThreadId: string;
}) {
  const [expanded, setExpanded] = useState(milestone.status === "in_progress");

  const doneCount = milestone.deliverables.filter(d => d.done).length;
  const totalCount = milestone.deliverables.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const statusDot = {
    completed: "bg-green-500",
    in_progress: "bg-blue-500",
    upcoming: "bg-gray-300",
  }[milestone.status] ?? "bg-gray-300";

  return (
    <div className={`border border-gray-200 rounded-2xl overflow-hidden mb-4 ${milestone.status === "in_progress" ? "border-blue-200 shadow-sm" : "bg-white"}`}>
      {/* Card header */}
      <button
        onClick={() => setExpanded(e => !e)}
        className={`w-full flex items-start gap-4 px-6 py-4 hover:bg-gray-50/80 transition text-left ${milestone.status === "in_progress" ? "bg-blue-50/30" : "bg-white"}`}
      >
        <div className={`w-3 h-3 rounded-full mt-2 flex-shrink-0 ${statusDot}`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <p className="text-[15px] font-semibold text-gray-900">{milestone.label}</p>
              <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Due {milestone.dueDate}
                </p>
                {milestone.payment && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <DollarSign className="w-3 h-3" /> ${milestone.payment.toLocaleString()} on completion
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <OutcomeStatusPill status={milestone.status} />
              {expanded ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
            </div>
          </div>
          {/* Progress bar (collapsed) */}
          {!expanded && totalCount > 0 && (
            <div className="mt-2.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${milestone.status === "completed" ? "bg-green-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[11px] text-gray-400 font-medium">{doneCount}/{totalCount} deliverables</span>
            </div>
          )}
        </div>
      </button>

      {/* Expanded body */}
      {expanded && (
        <div className={`border-t ${milestone.status === "in_progress" ? "border-blue-100" : "border-gray-100"} px-6 pb-6 space-y-5 ${milestone.status === "in_progress" ? "bg-blue-50/20" : "bg-white"}`}>

          {/* Overview */}
          <div className="pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Overview</p>
            <p className="text-sm text-gray-700 leading-relaxed">{milestone.description}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {/* Acceptance criteria */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Acceptance criteria</p>
              <ul className="space-y-2">
                {milestone.acceptanceCriteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${milestone.status === "completed" ? "text-green-500" : "text-gray-300"}`} />
                    {c}
                  </li>
                ))}
              </ul>
            </div>

            {/* Deliverables */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Deliverables</p>
                <span className="text-[11px] text-gray-400">{doneCount}/{totalCount} done</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                <div className={`h-full rounded-full ${milestone.status === "completed" ? "bg-green-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} />
              </div>
              <ul className="space-y-1.5">
                {milestone.deliverables.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    {d.done
                      ? <CheckSquare className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      : <Square className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />}
                    <span className={d.done ? "text-gray-600 line-through decoration-gray-300" : "text-gray-700"}>{d.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related sessions */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                Related sessions ({milestone.relatedSessions.length})
              </p>
              <Link href="/dashboard/sessions" className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition">
                All sessions <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            {milestone.relatedSessions.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No sessions linked to this milestone yet.</p>
            ) : (
              <div className="space-y-2">
                {milestone.relatedSessions.map(session => (
                  <Link key={session.id} href="/dashboard/sessions"
                    className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/40 transition group">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100 transition">
                      <Video className="w-3.5 h-3.5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-gray-900">{session.title}</p>
                        <span className="text-[11px] text-gray-400 whitespace-nowrap">{session.duration}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{session.date}</p>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">{session.notes}</p>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-blue-400 flex-shrink-0 mt-0.5 transition" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Activity + messages */}
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Activity</p>
              {milestone.activity.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No activity yet.</p>
              ) : (
                <ol className="space-y-3 relative border-l border-gray-100 pl-4 ml-1">
                  {milestone.activity.map((a, i) => (
                    <li key={i} className="relative">
                      <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full border-2 border-white bg-gray-300" />
                      <p className="text-[11px] text-gray-400 mb-0.5">{a.date} · {a.actor}</p>
                      <p className="text-sm text-gray-700 leading-relaxed">{a.note}</p>
                    </li>
                  ))}
                </ol>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2.5">Discuss with advisor</p>
              <Link href={`/dashboard/messages?thread=${advisorThreadId}`}
                className="flex items-center gap-3 p-3.5 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:bg-blue-50/40 transition group">
                <div className={`w-9 h-9 rounded-full ${advisorColor} text-white grid place-items-center font-bold text-[12px] flex-shrink-0`}>
                  {advisorInitials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{advisorName}</p>
                  <p className="text-xs text-gray-500 mt-0.5">Open message thread</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-medium group-hover:gap-2.5 transition-all">
                  <MessageSquare className="w-4 h-4" /> Message <ArrowUpRight className="w-3 h-3" />
                </div>
              </Link>
              <div className="mt-2 flex items-start gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Paperclip className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-gray-500 leading-relaxed">
                  Attach deliverables, raise questions, or flag blockers directly in your message thread. {advisorName.split(" ")[0]} typically responds within one business day.
                </p>
              </div>
            </div>
          </div>

          {/* SOW note */}
          <div className="flex items-start gap-2.5 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">
              Full milestone definitions, acceptance criteria, and any amendments are in the <strong>Statement of Work (SOW) PDF</strong>. The SOW is the governing document in case of any discrepancy.{" "}
              <Link href="/dashboard/contracts" className="underline text-amber-700 hover:text-amber-900">View contract →</Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MilestonesPage() {
  const allMilestones = ENGAGEMENTS.flatMap(e =>
    e.milestones.map(m => ({ ...m, engagement: e }))
  );

  const inProgress  = allMilestones.filter(m => m.status === "in_progress");
  const upcoming    = allMilestones.filter(m => m.status === "upcoming");
  const completed   = allMilestones.filter(m => m.status === "completed");

  const totalDone   = completed.length;
  const totalCount  = allMilestones.length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">Project milestones</h1>
          <p className="text-gray-500 text-sm mt-1">Track deliverables and progress across all your active engagements.</p>
        </div>
        <Link href="/dashboard/contracts"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition font-medium flex-shrink-0">
          <ArrowRight className="w-4 h-4 rotate-180" /> View contracts
        </Link>
      </div>

      {/* Overview bar */}
      <div className="bg-white border border-gray-200 rounded-2xl px-6 py-5">
        <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Overall progress</p>
            <p className="text-xs text-gray-500 mt-0.5">{totalDone} of {totalCount} milestones complete</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> {inProgress.length} in progress</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-gray-300 inline-block" /> {upcoming.length} upcoming</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 inline-block" /> {completed.length} done</span>
          </div>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all" style={{ width: `${Math.round((totalDone / totalCount) * 100)}%` }} />
        </div>
      </div>

      {/* In progress */}
      {inProgress.length > 0 && (
        <div>
          <h2 className="font-display text-[15px] font-bold text-gray-900 mb-3 flex items-center gap-2">
            <CircleDot className="w-4 h-4 text-blue-500" /> In progress
          </h2>
          {inProgress.map(m => (
            <MilestoneCard
              key={m.id}
              milestone={m}
              advisorName={m.engagement.advisorName}
              advisorInitials={m.engagement.advisorInitials}
              advisorColor={m.engagement.advisorColor}
              advisorThreadId={m.engagement.advisorThreadId}
            />
          ))}
        </div>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <h2 className="font-display text-[15px] font-bold text-gray-900 mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" /> Upcoming
          </h2>
          {upcoming.map(m => (
            <MilestoneCard
              key={m.id}
              milestone={m}
              advisorName={m.engagement.advisorName}
              advisorInitials={m.engagement.advisorInitials}
              advisorColor={m.engagement.advisorColor}
              advisorThreadId={m.engagement.advisorThreadId}
            />
          ))}
        </div>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h2 className="font-display text-[15px] font-bold text-gray-900 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Completed
          </h2>
          {completed.map(m => (
            <MilestoneCard
              key={m.id}
              milestone={m}
              advisorName={m.engagement.advisorName}
              advisorInitials={m.engagement.advisorInitials}
              advisorColor={m.engagement.advisorColor}
              advisorThreadId={m.engagement.advisorThreadId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
