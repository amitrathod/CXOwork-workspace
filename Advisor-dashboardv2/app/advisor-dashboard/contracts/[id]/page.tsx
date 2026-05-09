"use client";

/**
 * /advisor-dashboard/contracts/[id] — Advisor contract detail view.
 *
 * Shows a single engagement from the ADVISOR perspective:
 *   • "You provide (Advisor)" = deliverables you commit to
 *   • "Client provides"       = what the client owes you
 */

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Users,
  Globe,
  FileText,
  DollarSign,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  ExternalLink,
  AlertCircle,
} from "lucide-react";

/* ─── Mock contracts (keyed by id) ──────────────────────────────────────── */

const CONTRACTS: Record<string, {
  title         : string;
  status        : string;
  clientName    : string;
  clientInitials: string;
  avatarColor   : string;
  company       : string;
  role          : string;
  signedDate    : string;
  value         : string;
  valueSub      : string;
  weeklyBudget  : string;
  weeklyHrs     : string;
  periodStart   : string;
  periodEnd     : string;
  rate          : string;
  rateLabel     : string;
  advisorProvides: string[];
  clientProvides : string[];
  milestones    : { id: string; title: string; due: string; progress: number; total: number; status: string; bonus: string | null }[];
  documents     : { id: string; name: string; type: string; size: string; date: string }[];
  keyTerms      : { label: string; value: string }[];
  conflictSteps : string[];
  payments      : { period: string; hours: number; amount: string; status: string }[];
}> = {
  "1": {
    title         : "Fractional CFO Engagement",
    status        : "Active",
    clientName    : "Alex Johnson",
    clientInitials: "AJ",
    avatarColor   : "bg-indigo-600",
    company       : "GrowthTech",
    role          : "Fractional CFO",
    signedDate    : "April 15, 2025",
    value         : "$136,500",
    valueSub      : "total estimated",
    weeklyBudget  : "$5,250",
    weeklyHrs     : "15 hrs/week",
    periodStart   : "April 22,",
    periodEnd     : "→ October 22,",
    rate          : "$350/hr",
    rateLabel     : "Billed hourly",
    advisorProvides: [
      "Series B financial model and investor narrative",
      "Board-ready monthly reporting package",
      "Cash flow management and runway planning",
      "Fundraising process support and data room prep",
    ],
    clientProvides: [
      "Access to financial systems and data",
      "Weekly 1:1 with CEO (30 min)",
      "Board meeting attendance (quarterly)",
      "Timely feedback on deliverables",
    ],
    milestones: [
      { id: "m1", title: "Series B financial model",        due: "Due May 30, 2025",       progress: 2, total: 5, status: "in_progress", bonus: null },
      { id: "m2", title: "Monthly board reporting template", due: "Due May 15, 2025",       progress: 5, total: 5, status: "done",        bonus: null },
      { id: "m3", title: "Investor data room ready",        due: "Due July 1, 2025",       progress: 0, total: 6, status: "upcoming",    bonus: "$5,000 on completion" },
      { id: "m4", title: "Series B close support",          due: "Due September 30, 2025", progress: 0, total: 5, status: "upcoming",    bonus: "$10,000 on completion" },
    ],
    documents: [
      { id: "doc1", name: "Master Services Agreement",            type: "MSA", size: "142 KB", date: "Apr 15, 2025" },
      { id: "doc2", name: "Statement of Work – CFO Engagement",   type: "SOW", size: "98 KB",  date: "Apr 15, 2025" },
      { id: "doc3", name: "NDA",                                  type: "NDA", size: "64 KB",  date: "Apr 15, 2025" },
      { id: "doc4", name: "IP Assignment & Work-for-Hire Addendum", type: "IP", size: "55 KB", date: "Apr 15, 2025" },
    ],
    keyTerms: [
      { label: "Governing law",    value: "State of Delaware, USA" },
      { label: "Notice period",    value: "14 days written notice by either party" },
      { label: "IP ownership",     value: "All deliverables are work-for-hire, owned by Acme Corp" },
      { label: "Confidentiality",  value: "Mutual NDA, 3-year post-engagement term" },
      { label: "Non-solicitation", value: "12 months post-engagement" },
      { label: "Liability cap",    value: "Limited to total fees paid in the prior 3 months" },
    ],
    conflictSteps: [
      "CXOwork acts as a neutral facilitator — not a legal arbiter.",
      "Either party may request CXOwork mediation within 7 days of a dispute.",
      "CXOwork will convene a call within 5 business days and issue a written recommendation.",
      "If mediation fails, disputes are resolved by binding arbitration under AAA Commercial Rules.",
      "Legal counsel for both parties should review the MSA for full conflict resolution terms.",
    ],
    payments: [
      { period: "Apr 22 – Apr 28", hours: 15, amount: "$5,250", status: "Paid" },
      { period: "Apr 29 – May 5",  hours: 15, amount: "$5,250", status: "Paid" },
      { period: "May 6 – May 12",  hours: 15, amount: "$5,250", status: "Pending" },
      { period: "May 13 – May 19", hours: 15, amount: "$5,250", status: "Upcoming" },
    ],
  },

  "2": {
    title         : "Strategic Payments Advisor",
    status        : "Active",
    clientName    : "Marcus Rivera",
    clientInitials: "MR",
    avatarColor   : "bg-blue-600",
    company       : "PayFlow Labs",
    role          : "Strategic Advisor",
    signedDate    : "March 1, 2025",
    value         : "$48,000",
    valueSub      : "total estimated",
    weeklyBudget  : "$2,000",
    weeklyHrs     : "5 hrs/week",
    periodStart   : "March 1,",
    periodEnd     : "→ August 31,",
    rate          : "$400/hr",
    rateLabel     : "Billed hourly",
    advisorProvides: [
      "Payments infrastructure strategy roadmap",
      "EU regulatory compliance guidance",
      "Vendor & partnership evaluation",
      "Monthly executive briefings",
    ],
    clientProvides: [
      "Access to product & engineering teams",
      "Weekly sync with CTO (45 min)",
      "Regulatory filings and legal docs",
      "Prompt response to advisor queries",
    ],
    milestones: [
      { id: "m1", title: "EU expansion readiness report", due: "Due Apr 15, 2025", progress: 5, total: 5, status: "done",        bonus: null },
      { id: "m2", title: "Vendor shortlist & analysis",   due: "Due May 30, 2025", progress: 3, total: 4, status: "in_progress", bonus: "$3,000 on completion" },
      { id: "m3", title: "Go-live advisory support",      due: "Due Aug 31, 2025", progress: 0, total: 3, status: "upcoming",    bonus: null },
    ],
    documents: [
      { id: "doc1", name: "Master Services Agreement",  type: "MSA", size: "138 KB", date: "Mar 1, 2025" },
      { id: "doc2", name: "Statement of Work – Advisory", type: "SOW", size: "72 KB",  date: "Mar 1, 2025" },
      { id: "doc3", name: "NDA",                        type: "NDA", size: "61 KB",  date: "Mar 1, 2025" },
    ],
    keyTerms: [
      { label: "Governing law",    value: "State of California, USA" },
      { label: "Notice period",    value: "7 days written notice by either party" },
      { label: "IP ownership",     value: "Shared IP — joint ownership per SOW" },
      { label: "Confidentiality",  value: "Mutual NDA, 2-year post-engagement term" },
      { label: "Non-solicitation", value: "6 months post-engagement" },
      { label: "Liability cap",    value: "Limited to total fees paid in the prior 3 months" },
    ],
    conflictSteps: [
      "CXOwork acts as a neutral facilitator — not a legal arbiter.",
      "Either party may request CXOwork mediation within 7 days of a dispute.",
      "CXOwork will convene a call within 5 business days and issue a written recommendation.",
      "If mediation fails, disputes are resolved by binding arbitration under AAA Commercial Rules.",
      "Legal counsel for both parties should review the MSA for full conflict resolution terms.",
    ],
    payments: [
      { period: "Mar 1 – Mar 31", hours: 20, amount: "$8,000",  status: "Paid" },
      { period: "Apr 1 – Apr 30", hours: 20, amount: "$8,000",  status: "Paid" },
      { period: "May 1 – May 31", hours: 20, amount: "$8,000",  status: "Pending" },
    ],
  },

  "3": {
    title         : "M&A Advisory Engagement",
    status        : "Completed",
    clientName    : "Priya Nair",
    clientInitials: "PN",
    avatarColor   : "bg-emerald-600",
    company       : "CloudBase",
    role          : "M&A Advisor",
    signedDate    : "October 5, 2024",
    value         : "$75,000",
    valueSub      : "total paid",
    weeklyBudget  : "$6,250",
    weeklyHrs     : "12 hrs/week",
    periodStart   : "Oct 5, 2024",
    periodEnd     : "→ Jan 31, 2025",
    rate          : "$500/hr",
    rateLabel     : "Billed hourly",
    advisorProvides: [
      "Full M&A process management",
      "Target identification and outreach",
      "Due diligence coordination",
      "Deal structuring and term negotiation",
    ],
    clientProvides: [
      "Access to financials and data room",
      "Executive availability for buyer meetings",
      "Legal team coordination",
      "Decision authority on key deal terms",
    ],
    milestones: [
      { id: "m1", title: "Target list & outreach",         due: "Due Nov 1, 2024",  progress: 5, total: 5, status: "done", bonus: null },
      { id: "m2", title: "LOI signed with acquirer",       due: "Due Dec 1, 2024",  progress: 3, total: 3, status: "done", bonus: "$15,000 on completion" },
      { id: "m3", title: "Due diligence complete",         due: "Due Jan 15, 2025", progress: 4, total: 4, status: "done", bonus: null },
      { id: "m4", title: "Deal closed",                   due: "Due Jan 31, 2025", progress: 1, total: 1, status: "done", bonus: "$25,000 success fee" },
    ],
    documents: [
      { id: "doc1", name: "Master Services Agreement",    type: "MSA", size: "155 KB", date: "Oct 5, 2024" },
      { id: "doc2", name: "Statement of Work – M&A",      type: "SOW", size: "110 KB", date: "Oct 5, 2024" },
      { id: "doc3", name: "NDA",                          type: "NDA", size: "62 KB",  date: "Oct 5, 2024" },
      { id: "doc4", name: "Closing Summary Report",        type: "RPT", size: "88 KB",  date: "Feb 3, 2025" },
    ],
    keyTerms: [
      { label: "Governing law",    value: "State of New York, USA" },
      { label: "Notice period",    value: "14 days written notice by either party" },
      { label: "IP ownership",     value: "All deliverables owned by CloudBase" },
      { label: "Confidentiality",  value: "Mutual NDA, 5-year post-engagement term" },
      { label: "Non-solicitation", value: "24 months post-engagement" },
      { label: "Liability cap",    value: "Limited to total fees paid in the prior 6 months" },
    ],
    conflictSteps: [
      "CXOwork acts as a neutral facilitator — not a legal arbiter.",
      "Either party may request CXOwork mediation within 7 days of a dispute.",
      "CXOwork will convene a call within 5 business days and issue a written recommendation.",
      "If mediation fails, disputes are resolved by binding arbitration under AAA Commercial Rules.",
      "Legal counsel for both parties should review the MSA for full conflict resolution terms.",
    ],
    payments: [
      { period: "Oct 5 – Oct 31",  hours: 48, amount: "$24,000", status: "Paid" },
      { period: "Nov 1 – Nov 30",  hours: 48, amount: "$24,000", status: "Paid" },
      { period: "Dec 1 – Dec 31",  hours: 24, amount: "$12,000", status: "Paid" },
      { period: "Jan 1 – Jan 31",  hours: 30, amount: "$15,000", status: "Paid" },
    ],
  },
};

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active   : "bg-green-100 text-green-700 border-green-200",
    Completed: "bg-gray-100  text-gray-600  border-gray-200",
    Pending  : "bg-amber-100 text-amber-700 border-amber-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11.5px] font-semibold border ${styles[status] ?? styles.Pending}`}>
      {status}
    </span>
  );
}

function MilestoneIcon({ status }: { status: string }) {
  if (status === "done")        return <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />;
  if (status === "in_progress") return <Clock        className="w-4 h-4 text-blue-500  shrink-0 mt-0.5" />;
  return                               <Circle       className="w-4 h-4 text-gray-300  shrink-0 mt-0.5" />;
}

function MilestoneChip({ status }: { status: string }) {
  if (status === "done")        return <span className="text-[11.5px] font-medium text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" />Done</span>;
  if (status === "in_progress") return <span className="text-[11.5px] font-medium text-blue-600  flex items-center gap-1"><Clock        className="w-3 h-3" />In progress</span>;
  return                               <span className="text-[11.5px] font-medium text-gray-400  flex items-center gap-1"><Circle       className="w-3 h-3" />Upcoming</span>;
}

function ProgressBar({ value, max, status }: { value: number; max: number; status: string }) {
  const pct   = max > 0 ? (value / max) * 100 : 0;
  const color = status === "done" ? "bg-green-500" : status === "in_progress" ? "bg-blue-500" : "bg-gray-200";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11px] text-gray-400 shrink-0">{value}/{max}</span>
    </div>
  );
}

function Section({
  icon, title, badge, defaultOpen = true, children,
}: {
  icon: React.ReactNode; title: string; badge?: React.ReactNode;
  defaultOpen?: boolean; children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-gray-500">{icon}</span>
          <span className="text-[15px] font-semibold text-gray-900">{title}</span>
          {badge}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />}
      </button>
      {open && <div className="border-t border-gray-100">{children}</div>}
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function ContractDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router  = useRouter();
  const c       = CONTRACTS[id];

  if (!c) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center">
        <p className="text-gray-500 text-[15px]">Contract not found.</p>
        <button
          type="button"
          onClick={() => router.push("/advisor-dashboard/contracts")}
          className="mt-4 inline-flex items-center gap-1.5 text-[13px] text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to contracts
        </button>
      </div>
    );
  }

  const doneCount = c.milestones.filter((m) => m.status === "done").length;

  return (
    <div className="max-w-3xl mx-auto">

      {/* Back */}
      <button
        type="button"
        onClick={() => router.push("/advisor-dashboard/contracts")}
        className="inline-flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-900 mb-5 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to contracts
      </button>

      {/* Header card */}
      <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 mb-4">
        <div className="flex items-start gap-4">
          <div className={`w-11 h-11 rounded-full ${c.avatarColor} flex items-center justify-center text-white font-bold text-[15px] shrink-0`}>
            {c.clientInitials}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-[20px] font-bold text-gray-900 leading-snug m-0">{c.title}</h1>
              <StatusBadge status={c.status} />
            </div>
            <p className="text-[13px] text-gray-500 mt-0.5 m-0">
              {c.clientName} · {c.company} · {c.role} · Signed {c.signedDate}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-gray-100 border border-gray-100 rounded-lg mt-5 overflow-hidden">
          {[
            { label: "Contract value", value: c.value,        sub: c.valueSub  },
            { label: "Weekly budget",  value: c.weeklyBudget, sub: c.weeklyHrs },
            { label: "Period",         value: c.periodStart,  sub: c.periodEnd },
            { label: "Rate",           value: c.rate,         sub: c.rateLabel },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white px-4 py-3">
              <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">{label}</div>
              <div className="text-[16px] font-bold text-gray-900">{value}</div>
              <div className="text-[11.5px] text-gray-400">{sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">

        {/* Gives & Gets */}
        <Section icon={<Users className="w-4 h-4" />} title="Gives & gets">
          <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
            <div className="px-5 py-4">
              <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-3">You provide (Advisor)</div>
              <ul className="flex flex-col gap-2.5">
                {c.advisorProvides.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-gray-700 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="px-5 py-4">
              <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400 mb-3">Client provides</div>
              <ul className="flex flex-col gap-2.5">
                {c.clientProvides.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Circle className="w-4 h-4 text-gray-300 shrink-0 mt-0.5" />
                    <span className="text-[13.5px] text-gray-600 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* Milestones */}
        <Section
          icon={<Globe className="w-4 h-4" />}
          title="Outcomes & milestones"
          badge={
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              {doneCount}/{c.milestones.length} done
            </span>
          }
        >
          <div className="px-5 py-4 flex flex-col gap-4">
            {c.milestones.map((m) => (
              <div key={m.id} className="flex items-start gap-3">
                <MilestoneIcon status={m.status} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-[13.5px] font-semibold text-gray-900 leading-snug">{m.title}</div>
                      <div className="text-[12px] text-gray-400 mt-0.5">
                        {m.due}
                        {m.bonus && <span className="ml-1 text-green-600 font-medium">· {m.bonus}</span>}
                      </div>
                    </div>
                    <MilestoneChip status={m.status} />
                  </div>
                  <div className="mt-2">
                    <ProgressBar value={m.progress} max={m.total} status={m.status} />
                  </div>
                </div>
              </div>
            ))}
            <p className="text-[12px] text-gray-400 mt-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 shrink-0" />
              Full deliverable details, sessions, and activity are on the milestones page.
              <button type="button" className="text-blue-600 hover:underline font-medium">View milestones →</button>
            </p>
          </div>
        </Section>

        {/* Payment schedule */}
        <Section icon={<DollarSign className="w-4 h-4" />} title="Payment schedule" defaultOpen={false}>
          <div className="px-5 py-5">
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Billing cycle",  value: "Weekly" },
                { label: "Payment terms",  value: "Net 7"  },
                { label: "Next payment",   value: c.status === "Completed" ? "—" : "May 13, 2025" },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2.5">
                  <div className="text-[11px] text-gray-400 font-medium mb-0.5">{label}</div>
                  <div className="text-[13.5px] font-bold text-gray-900">{value}</div>
                </div>
              ))}
            </div>
            <div className="border border-gray-100 rounded-lg overflow-hidden">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-[11px] uppercase tracking-wide">
                    <th className="text-left px-4 py-2.5 font-semibold">Period</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Hours</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Amount</th>
                    <th className="text-left px-4 py-2.5 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {c.payments.map((row) => (
                    <tr key={row.period} className="hover:bg-gray-50">
                      <td className="px-4 py-2.5 text-gray-700">{row.period}</td>
                      <td className="px-4 py-2.5 text-gray-600">{row.hours} hrs</td>
                      <td className="px-4 py-2.5 font-semibold text-gray-900">{row.amount}</td>
                      <td className="px-4 py-2.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                          row.status === "Paid"    ? "bg-green-50 text-green-700 border-green-200" :
                          row.status === "Pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                     "bg-gray-50  text-gray-500  border-gray-200"
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Section>

        {/* Documents */}
        <Section icon={<FileText className="w-4 h-4" />} title="Contract documents">
          <div className="px-5 py-4 flex flex-col gap-2">
            {c.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between gap-3 border border-gray-100 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13.5px] font-semibold text-gray-900 truncate">{doc.name}</div>
                    <div className="text-[11.5px] text-gray-400">{doc.type} · {doc.size} · {doc.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button type="button" className="inline-flex items-center gap-1 text-[12.5px] text-gray-500 hover:text-blue-600 font-medium transition-colors">
                    <ExternalLink className="w-3.5 h-3.5" />View
                  </button>
                  <button type="button" className="inline-flex items-center gap-1 text-[12.5px] text-gray-500 hover:text-blue-600 font-medium transition-colors">
                    <Download className="w-3.5 h-3.5" />Download
                  </button>
                </div>
              </div>
            ))}
            <p className="text-[11.5px] text-gray-400 mt-1 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              These documents are read-only and have been reviewed by CXOwork&apos;s legal team. Contact support to request amendments.
            </p>
          </div>
        </Section>

        {/* Key terms */}
        <Section icon={<FileText className="w-4 h-4" />} title="Key terms summary">
          <div className="px-5 py-4">
            <div className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
              {c.keyTerms.map(({ label, value }) => (
                <div key={label} className="flex items-start justify-between gap-4 px-4 py-3 hover:bg-gray-50">
                  <span className="text-[13px] text-gray-500 shrink-0 w-36">{label}</span>
                  <span className="text-[13px] text-gray-900 font-medium text-right">{value}</span>
                </div>
              ))}
            </div>
            <p className="text-[11.5px] text-gray-400 mt-2.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 shrink-0" />
              This is a summary only. Full legal terms are in the MSA and SOW PDFs above.
            </p>
          </div>
        </Section>

        {/* Conflict resolution */}
        <Section icon={<AlertCircle className="w-4 h-4" />} title="Conflict resolution & CXOwork's role">
          <div className="px-5 py-4">
            <ol className="flex flex-col gap-3">
              {c.conflictSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-500 text-[11.5px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[13.5px] text-gray-700 leading-snug">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[12.5px] text-amber-800 m-0 leading-snug">
                CXOwork facilitates but does not provide legal advice. We recommend both parties retain independent counsel. Full dispute resolution terms are in Section 12 of the MSA.
              </p>
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
