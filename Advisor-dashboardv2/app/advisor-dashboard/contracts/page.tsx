"use client";

/**
 * /advisor-dashboard/contracts — Contracts list view.
 *
 * Shows all engagements (active + completed) as cards.
 * Clicking a card navigates to /advisor-dashboard/contracts/[id].
 */

import { useRouter } from "next/navigation";
import { CheckCircle2, Clock, Circle, ChevronRight, DollarSign, Calendar, Sparkles } from "lucide-react";
import { useProposals } from "@/lib/proposal-context";
import type { DraftContract } from "@/lib/proposal-context";

/* ─── Mock contract list ─────────────────────────────────────────────────── */

const CONTRACTS = [
  {
    id            : "1",
    title         : "Fractional CFO Engagement",
    status        : "Active",
    clientName    : "Alex Johnson",
    clientInitials: "AJ",
    avatarColor   : "bg-indigo-600",
    company       : "GrowthTech",
    role          : "Fractional CFO",
    value         : "$136,500",
    rate          : "$350/hr",
    period        : "Apr 22 – Oct 22, 2025",
    milestonesTotal: 4,
    milestonesDone : 1,
    nextPayment   : "May 13, 2025",
    nextAmount    : "$5,250",
    tags          : ["Series B", "SaaS"],
  },
  {
    id            : "2",
    title         : "Strategic Payments Advisor",
    status        : "Active",
    clientName    : "Marcus Rivera",
    clientInitials: "MR",
    avatarColor   : "bg-blue-600",
    company       : "PayFlow Labs",
    role          : "Strategic Advisor",
    value         : "$48,000",
    rate          : "$400/hr",
    period        : "Mar 1 – Aug 31, 2025",
    milestonesTotal: 3,
    milestonesDone : 1,
    nextPayment   : "Jun 1, 2025",
    nextAmount    : "$8,000",
    tags          : ["Fintech", "EU Expansion"],
  },
  {
    id            : "3",
    title         : "M&A Advisory Engagement",
    status        : "Completed",
    clientName    : "Priya Nair",
    clientInitials: "PN",
    avatarColor   : "bg-emerald-600",
    company       : "CloudBase",
    role          : "M&A Advisor",
    value         : "$75,000",
    rate          : "$500/hr",
    period        : "Oct 5, 2024 – Jan 31, 2025",
    milestonesTotal: 4,
    milestonesDone : 4,
    nextPayment   : null,
    nextAmount    : null,
    tags          : ["M&A", "Enterprise SaaS"],
  },
];

/* ─── Helpers ───────────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Active   : "bg-green-100 text-green-700 border-green-200",
    Completed: "bg-gray-100  text-gray-600  border-gray-200",
    Draft    : "bg-amber-100 text-amber-700 border-amber-200",
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border ${styles[status] ?? styles.Draft}`}>
      {status}
    </span>
  );
}

function MiniProgress({ done, total, status }: { done: number; total: number; status: string }) {
  const pct   = total > 0 ? (done / total) * 100 : 0;
  const color = status === "Completed" ? "bg-green-500" : "bg-blue-500";
  const Icon  = status === "Completed"
    ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
    : done > 0
      ? <Clock className="w-3.5 h-3.5 text-blue-500 shrink-0" />
      : <Circle className="w-3.5 h-3.5 text-gray-300 shrink-0" />;

  return (
    <div className="flex items-center gap-2">
      {Icon}
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden w-20">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11.5px] text-gray-400 shrink-0">{done}/{total} milestones</span>
    </div>
  );
}

/* ─── Draft contract card ────────────────────────────────────────────────── */

function DraftContractCard({
  draft,
  onDismiss,
}: {
  draft    : DraftContract;
  onDismiss: () => void;
}) {
  return (
    <div className="relative w-full text-left bg-white border-2 border-blue-300 rounded-xl p-5 shadow-sm">
      {/* New badge */}
      {draft.isNew && (
        <div className="absolute -top-2.5 left-5 flex items-center gap-1.5 bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow">
          <Sparkles className="w-3 h-3" />
          New contract
        </div>
      )}

      <div className="flex items-start gap-4">

        {/* Avatar */}
        <div className={`w-11 h-11 rounded-full ${draft.avatarColor} flex items-center justify-center text-white font-bold text-[14px] shrink-0`}>
          {draft.clientInit}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">

          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15.5px] font-bold text-gray-900 leading-snug">{draft.title}</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-amber-100 text-amber-700 border-amber-200">
                  Draft
                </span>
              </div>
              <p className="text-[12.5px] text-gray-500 mt-0.5">
                {draft.clientName} · {draft.company} · {draft.role}
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3">
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[13px] font-semibold text-gray-900">{draft.value}</span>
              <span className="text-[12px] text-gray-400">· {draft.rate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[12.5px] text-gray-500">{draft.period}</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
            <p className="text-[12px] text-blue-600 font-medium flex-1">
              Awaiting signatures from both parties to activate this contract.
            </p>
            <button
              type="button"
              onClick={onDismiss}
              className="text-[12px] text-gray-400 hover:text-gray-600 shrink-0"
            >
              Dismiss
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ─── Contract card ──────────────────────────────────────────────────────── */

function ContractCard({
  contract,
  onClick,
}: {
  contract: typeof CONTRACTS[number];
  onClick : () => void;
}) {
  const c = contract;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start gap-4">

        {/* Avatar */}
        <div className={`w-11 h-11 rounded-full ${c.avatarColor} flex items-center justify-center text-white font-bold text-[14px] shrink-0`}>
          {c.clientInitials}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">

          {/* Title row */}
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[15.5px] font-bold text-gray-900 leading-snug">{c.title}</span>
                <StatusBadge status={c.status} />
              </div>
              <p className="text-[12.5px] text-gray-500 mt-0.5 m-0">
                {c.clientName} · {c.company} · {c.role}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 shrink-0 mt-1 transition-colors" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {c.tags.map((tag) => (
              <span key={tag} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-3">

            {/* Value */}
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[13px] font-semibold text-gray-900">{c.value}</span>
              <span className="text-[12px] text-gray-400">· {c.rate}</span>
            </div>

            {/* Period */}
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[12.5px] text-gray-500">{c.period}</span>
            </div>

          </div>

          {/* Milestone progress + next payment */}
          <div className="flex flex-wrap items-center justify-between gap-3 mt-3 pt-3 border-t border-gray-100">

            <MiniProgress done={c.milestonesDone} total={c.milestonesTotal} status={c.status} />

            {c.nextPayment ? (
              <div className="text-[12px] text-gray-500">
                Next payment{" "}
                <span className="font-semibold text-gray-900">{c.nextAmount}</span>
                {" "}on {c.nextPayment}
              </div>
            ) : (
              <div className="text-[12px] text-green-600 font-medium">
                ✓ Engagement complete · {c.value} earned
              </div>
            )}

          </div>
        </div>
      </div>
    </button>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function ContractsListPage() {
  const router = useRouter();
  const { draftContracts, dismissNew } = useProposals();

  const active    = CONTRACTS.filter((c) => c.status === "Active");
  const completed = CONTRACTS.filter((c) => c.status === "Completed");

  const totalActive  = active.reduce((sum) => sum + 1, 0);
  const totalEarned  = "$184,500";  // mock aggregate
  const nextPayment  = "$13,500";   // mock

  return (
    <div>

      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold tracking-tight">Contracts</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your active engagements and completed work.
        </p>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Active engagements", value: String(totalActive),           sub: "currently running"    },
          { label: "Total earned",       value: totalEarned,                   sub: "across all contracts" },
          { label: "Next payout",        value: nextPayment,                   sub: "due May 13, 2025"     },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl px-4 py-3">
            <div className="text-[11px] text-gray-400 font-medium uppercase tracking-wide mb-0.5">{label}</div>
            <div className="text-[20px] font-bold text-gray-900">{value}</div>
            <div className="text-[11.5px] text-gray-400">{sub}</div>
          </div>
        ))}
      </div>

      {/* Draft contracts (from accepted proposals) */}
      {draftContracts.length > 0 && (
        <div className="mb-6">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Drafts · {draftContracts.length} — awaiting signatures
          </div>
          <div className="flex flex-col gap-3">
            {draftContracts.map((d) => (
              <DraftContractCard
                key={d.id}
                draft={d}
                onDismiss={() => dismissNew(d.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Active contracts */}
      {active.length > 0 && (
        <div className="mb-6">
          <div className="text-[12px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Active · {active.length}
          </div>
          <div className="flex flex-col gap-3">
            {active.map((c) => (
              <ContractCard
                key={c.id}
                contract={c}
                onClick={() => router.push(`/advisor-dashboard/contracts/${c.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed contracts */}
      {completed.length > 0 && (
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
            Completed · {completed.length}
          </div>
          <div className="flex flex-col gap-3">
            {completed.map((c) => (
              <ContractCard
                key={c.id}
                contract={c}
                onClick={() => router.push(`/advisor-dashboard/contracts/${c.id}`)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
