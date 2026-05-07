"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText, CheckCircle2, ChevronRight, Download, ExternalLink,
  Calendar, Users, DollarSign, Target, Shield, AlertCircle,
  Clock, FileCheck, ArrowRight, ChevronDown, ChevronUp,
  CircleDot, Circle, ArrowUpRight,
} from "lucide-react";

// ─── Mock contract data ───────────────────────────────────────────────────────

const MOCK_CONTRACTS = [
  {
    id: "contract-1",
    title: "Fractional CFO Engagement",
    advisorName: "Sarah Chen",
    advisorRole: "Fractional CFO",
    advisorInitials: "SC",
    advisorColor: "bg-purple-500",
    advisorThreadId: "t_mock_sarah",
    status: "active",
    signedDate: "April 15, 2025",
    startDate: "April 22, 2025",
    endDate: "October 22, 2025",
    commitment: "15 hrs/week",
    payType: "hourly",
    hourlyRate: 350,
    weeklyBudget: 5250,
    totalValue: 136500,

    giveGets: {
      clientGives: [
        "Access to financial systems and data",
        "Weekly 1:1 with CEO (30 min)",
        "Board meeting attendance (quarterly)",
        "Timely feedback on deliverables",
      ],
      advisorGives: [
        "Series B financial model and investor narrative",
        "Board-ready monthly reporting package",
        "Cash flow management and runway planning",
        "Fundraising process support and data room prep",
      ],
    },

    outcomes: [
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

    paymentSchedule: [
      { period: "Apr 22 – Apr 28", amount: 5250, status: "paid", paidOn: "Apr 29, 2025" },
      { period: "Apr 29 – May 5", amount: 5250, status: "paid", paidOn: "May 6, 2025" },
      { period: "May 6 – May 12", amount: 5250, status: "paid", paidOn: "May 13, 2025" },
      { period: "May 13 – May 19", amount: 5250, status: "processing", paidOn: null },
      { period: "May 20 – May 26", amount: 5250, status: "upcoming", paidOn: null },
    ],

    documents: [
      { name: "Master Services Agreement", type: "MSA", size: "142 KB", date: "Apr 15, 2025" },
      { name: "Statement of Work – CFO Engagement", type: "SOW", size: "98 KB", date: "Apr 15, 2025" },
      { name: "NDA – Mutual Confidentiality", type: "NDA", size: "64 KB", date: "Apr 15, 2025" },
      { name: "IP Assignment & Work-for-Hire Addendum", type: "IP", size: "55 KB", date: "Apr 15, 2025" },
    ],

    terms: [
      { label: "Governing law", value: "State of Delaware, USA" },
      { label: "Notice period", value: "14 days written notice by either party" },
      { label: "IP ownership", value: "All deliverables are work-for-hire, owned by Acme Corp" },
      { label: "Confidentiality", value: "Mutual NDA, 3-year post-engagement term" },
      { label: "Non-solicitation", value: "12 months post-engagement" },
      { label: "Liability cap", value: "Limited to total fees paid in the prior 3 months" },
    ],

    conflictResolution: [
      "CXOwork acts as a neutral facilitator — not a legal arbiter.",
      "Either party may request CXOwork mediation within 7 days of a dispute.",
      "CXOwork will convene a call within 5 business days and issue a written recommendation.",
      "If mediation fails, disputes are resolved by binding arbitration under AAA Commercial Rules.",
      "Legal counsel for both parties should review the MSA for full conflict resolution terms.",
    ],
  },
];

// ─── Status helpers ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-green-50 text-green-700 border-green-200",
    completed: "bg-gray-100 text-gray-600 border-gray-200",
    draft: "bg-amber-50 text-amber-700 border-amber-200",
    terminated: "bg-red-50 text-red-600 border-red-200",
  };
  const labels: Record<string, string> = { active: "Active", completed: "Completed", draft: "Draft", terminated: "Terminated" };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${map[status] ?? map.draft}`}>
      {labels[status] ?? status}
    </span>
  );
}

function OutcomeStatusPill({ status }: { status: string }) {
  if (status === "completed")
    return <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full"><CheckCircle2 className="w-3 h-3" /> Done</span>;
  if (status === "in_progress")
    return <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full"><CircleDot className="w-3 h-3" /> In progress</span>;
  return <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full"><Circle className="w-3 h-3" /> Upcoming</span>;
}

function PaymentStatus({ status }: { status: string }) {
  if (status === "paid") return <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">Paid</span>;
  if (status === "processing") return <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">Processing</span>;
  return <span className="text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 px-2 py-0.5 rounded-full">Upcoming</span>;
}

// ─── Section accordion ────────────────────────────────────────────────────────

function Section({ icon: Icon, title, badge, children, defaultOpen = true }: {
  icon: React.ElementType; title: string; badge?: React.ReactNode;
  children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-display font-semibold text-gray-900 text-[15px]">{title}</span>
          {badge}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
      </button>
      {open && <div className="border-t border-gray-100">{children}</div>}
    </div>
  );
}

// ─── Compact milestone row (contracts page summary) ──────────────────────────

type Outcome = typeof MOCK_CONTRACTS[0]["outcomes"][0];

function CompactMilestoneRow({ outcome }: { outcome: Outcome }) {
  const doneCount = outcome.deliverables.filter(d => d.done).length;
  const totalCount = outcome.deliverables.length;
  const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  const dotColor = {
    completed: "bg-green-500",
    in_progress: "bg-blue-500",
    upcoming: "bg-gray-300",
  }[outcome.status] ?? "bg-gray-300";

  return (
    <div className="flex items-center gap-4 px-6 py-3.5 border-b border-gray-100 last:border-0">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900">{outcome.label}</p>
        <div className="flex items-center gap-3 mt-0.5">
          <p className="text-xs text-gray-500">Due {outcome.dueDate}{outcome.payment ? ` · $${outcome.payment.toLocaleString()} on completion` : ""}</p>
          {totalCount > 0 && (
            <div className="flex items-center gap-1.5">
              <div className="w-16 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${outcome.status === "completed" ? "bg-green-500" : "bg-blue-500"}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-[11px] text-gray-400">{doneCount}/{totalCount}</span>
            </div>
          )}
        </div>
      </div>
      <OutcomeStatusPill status={outcome.status} />
    </div>
  );
}

// ─── Contract detail view ─────────────────────────────────────────────────────

function ContractDetail({ contract, onBack }: { contract: typeof MOCK_CONTRACTS[0]; onBack: () => void }) {
  return (
    <div>
      {/* Breadcrumb */}
      <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-5 transition-colors">
        <ArrowRight className="w-3.5 h-3.5 rotate-180" /> Back to contracts
      </button>

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-full ${contract.advisorColor} text-white grid place-items-center font-bold text-base flex-shrink-0`}>
            {contract.advisorInitials}
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display text-[1.4rem] font-bold tracking-tight text-gray-900">{contract.title}</h1>
              <StatusBadge status={contract.status} />
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{contract.advisorName} · {contract.advisorRole} · Signed {contract.signedDate}</p>
          </div>
        </div>
      </div>

      {/* Key stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: "Contract value", value: `$${contract.totalValue.toLocaleString()}`, sub: "total estimated" },
          { label: "Weekly budget", value: `$${contract.weeklyBudget.toLocaleString()}`, sub: `${contract.commitment}` },
          { label: "Period", value: `${contract.startDate.split(" ").slice(0,2).join(" ")}`, sub: `→ ${contract.endDate.split(" ").slice(0,2).join(" ")}` },
          { label: "Rate", value: `$${contract.hourlyRate}/hr`, sub: "billed hourly" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
            <p className="text-xs text-gray-500 mb-0.5">{s.label}</p>
            <p className="font-display font-bold text-gray-900 text-[15px]">{s.value}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* 1. Gives & Gets */}
      <Section icon={Users} title="Gives & gets" defaultOpen={true}>
        <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
          <div className="px-6 py-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">You provide (Client)</p>
            <ul className="space-y-2">
              {contract.giveGets.clientGives.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 flex-shrink-0 mt-0.5" /> {g}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 py-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Advisor delivers</p>
            <ul className="space-y-2">
              {contract.giveGets.advisorGives.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" /> {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 2. Outcomes & milestones — compact summary */}
      <Section icon={Target} title="Outcomes & milestones" badge={
        <span className="ml-1 text-xs px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-full font-medium">
          {contract.outcomes.filter(o => o.status === "completed").length}/{contract.outcomes.length} done
        </span>
      }>
        <div>
          {contract.outcomes.map((o) => (
            <CompactMilestoneRow key={o.id} outcome={o} />
          ))}
        </div>
        <div className="px-6 py-3.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 flex-shrink-0" />
            Full deliverable details, sessions, and activity are on the milestones page.
          </p>
          <Link href="/dashboard/milestones"
            className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold transition whitespace-nowrap flex-shrink-0">
            View milestones <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </Section>

      {/* 3. Payment schedule */}
      <Section icon={DollarSign} title="Payment schedule" defaultOpen={false}>
        <div className="divide-y divide-gray-100">
          {contract.paymentSchedule.map((p, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3 gap-4">
              <div>
                <p className="text-sm text-gray-800 font-medium">{p.period}</p>
                {p.paidOn && <p className="text-xs text-gray-400 mt-0.5">Paid {p.paidOn}</p>}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-900">${p.amount.toLocaleString()}</span>
                <PaymentStatus status={p.status} />
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            Payments are processed every Monday for the prior week. Full payment history is in your billing portal.
          </p>
        </div>
      </Section>

      {/* 4. Contract documents */}
      <Section icon={FileCheck} title="Contract documents" defaultOpen={false}>
        <div className="divide-y divide-gray-100">
          {contract.documents.map((doc, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-3.5 gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4 text-gray-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{doc.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{doc.type} · {doc.size} · {doc.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition px-2 py-1 rounded-lg hover:bg-gray-100">
                  <ExternalLink className="w-3.5 h-3.5" /> View
                </button>
                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-800 transition px-2 py-1 rounded-lg hover:bg-gray-100">
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 flex-shrink-0" />
            These documents are read-only and have been reviewed by CXOwork's legal team. Contact support to request amendments.
          </p>
        </div>
      </Section>

      {/* 5. Key terms */}
      <Section icon={FileText} title="Key terms summary" defaultOpen={false}>
        <div className="divide-y divide-gray-100">
          {contract.terms.map((t, i) => (
            <div key={i} className="flex items-start justify-between gap-6 px-6 py-3.5">
              <p className="text-sm text-gray-500 flex-shrink-0 w-40">{t.label}</p>
              <p className="text-sm text-gray-900 text-right">{t.value}</p>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
          <p className="text-xs text-gray-500 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 flex-shrink-0" />
            This is a summary only. Full legal terms are in the MSA and SOW PDFs above.
          </p>
        </div>
      </Section>

      {/* 6. Conflict resolution */}
      <Section icon={Shield} title="Conflict resolution & CXOwork's role" defaultOpen={false}>
        <div className="px-6 py-5 space-y-3">
          {contract.conflictResolution.map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[11px] font-bold grid place-items-center flex-shrink-0 mt-0.5">{i + 1}</span>
              <p className="text-sm text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
        <div className="px-6 py-3 bg-amber-50 border-t border-amber-100">
          <p className="text-xs text-amber-800 flex items-start gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
            CXOwork facilitates but does not provide legal advice. We recommend both parties retain independent counsel. Full dispute resolution terms are in Section 12 of the MSA.
          </p>
        </div>
      </Section>
    </div>
  );
}

// ─── Contract list ────────────────────────────────────────────────────────────

function ContractRow({ contract, onClick }: { contract: typeof MOCK_CONTRACTS[0]; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-gray-300 transition text-left flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className={`w-11 h-11 rounded-full ${contract.advisorColor} text-white grid place-items-center font-bold flex-shrink-0`}>
          {contract.advisorInitials}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <p className="font-display font-semibold text-gray-900">{contract.title}</p>
            <StatusBadge status={contract.status} />
          </div>
          <p className="text-sm text-gray-500 mt-0.5 truncate">
            {contract.advisorName} · {contract.advisorRole} · Signed {contract.signedDate}
          </p>
          <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {contract.startDate} → {contract.endDate}</span>
            <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> ${contract.weeklyBudget.toLocaleString()}/wk</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {contract.commitment}</span>
          </div>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContractsPage() {
  const [selected, setSelected] = useState<string | null>(null);

  const contract = MOCK_CONTRACTS.find(c => c.id === selected);

  if (contract) {
    return <ContractDetail contract={contract} onBack={() => setSelected(null)} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">Contracts</h1>
        <p className="text-gray-500 text-sm mt-1">Your active and past engagement agreements.</p>
      </div>

      {/* Notice */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
        <Shield className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">
          All contracts are prepared and reviewed by CXOwork's legal team. Full documents are available as PDFs inside each contract.
        </p>
      </div>

      {/* List */}
      <div className="space-y-3">
        {MOCK_CONTRACTS.map(c => (
          <ContractRow key={c.id} contract={c} onClick={() => setSelected(c.id)} />
        ))}
      </div>
    </div>
  );
}
