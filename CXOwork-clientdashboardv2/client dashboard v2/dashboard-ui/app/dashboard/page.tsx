"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useClient } from "@/lib/mock-context";
import { Search, Plus, BookOpen, Shield, CreditCard, ArrowRight, FileText, Clock } from "lucide-react";

// ─── Mock brief drafts ────────────────────────────────────────────────────────

const MOCK_DRAFTS = [
  { id: "d1", role: "CTO", outcome: "Build & launch an MVP", updatedAt: "2 hours ago", step: 3, totalSteps: 5 },
  { id: "d2", role: "CMO", outcome: "Launch product to new market", updatedAt: "Yesterday", step: 1, totalSteps: 5 },
];

// ─── Help resources ───────────────────────────────────────────────────────────

const HELP_FEATURED = {
  category: "Get started",
  title: "How to find and hire the right fractional executive",
  emoji: "🚀",
  href: "#",
};

const HELP_CARDS = [
  { category: "Engagements", title: "How fractional engagements work", emoji: "🤝", href: "#" },
  { category: "Payments", title: "How billing and payments work", emoji: "💳", href: "#" },
  { category: "Trust & safety", title: "NDA coverage and advisor vetting", emoji: "🛡️", href: "#" },
];

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  const router = useRouter();
  return (
    <div className="bg-white border border-gray-200 rounded-2xl px-8 py-16 flex flex-col items-center text-center">
      <div className="text-6xl mb-5">💼</div>
      <h2 className="text-lg font-semibold text-gray-900">No active engagements right now</h2>
      <p className="text-gray-500 text-sm mt-2 max-w-xs">Post a job and we'll match you with a vetted fractional executive, or browse and find one yourself.</p>
      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => router.push("/dashboard/find-cxo")}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
        >
          <Search className="w-4 h-4" /> Find a CXO
        </button>
        <button
          onClick={() => router.push("/get-matched")}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" /> Post a job
        </button>
      </div>
    </div>
  );
}

// ─── Draft card ───────────────────────────────────────────────────────────────

function DraftCard({ draft }: { draft: typeof MOCK_DRAFTS[0] }) {
  const router = useRouter();
  const pct = Math.round((draft.step / draft.totalSteps) * 100);
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 hover:shadow-sm transition">
      <div className="p-2.5 bg-amber-50 rounded-lg flex-shrink-0">
        <FileText className="w-4 h-4 text-amber-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-900">{draft.role} brief</p>
          <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full font-medium">Draft</span>
        </div>
        <p className="text-xs text-gray-500 mt-0.5 truncate">{draft.outcome}</p>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-1 bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs text-gray-500 flex-shrink-0">{draft.step}/{draft.totalSteps} steps</span>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="text-xs text-gray-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {draft.updatedAt}</span>
        <button
          onClick={() => router.push("/get-matched")}
          className="text-xs px-3 py-1.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { client } = useClient();
  const firstName = client.firstName || "there";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">{greeting}, {firstName}</h1>
        <Link
          href="/get-matched"
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" /> Post a job
        </Link>
      </div>

      {/* Drafts — shown when there are in-progress briefs */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Drafts in progress</h2>
          <Link href="/dashboard/briefs" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            View all briefs <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {MOCK_DRAFTS.map((d) => <DraftCard key={d.id} draft={d} />)}
      </div>

      {/* Overview */}
      <div className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900">Overview</h2>
        <EmptyState />
      </div>

      {/* Help and resources */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Help and resources</h2>
          <button className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            View all resources <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{HELP_FEATURED.category}</p>
            <h3 className="text-base font-semibold text-gray-900 max-w-sm">{HELP_FEATURED.title}</h3>
            <button className="mt-3 text-sm text-blue-600 border border-blue-600 rounded-lg px-3 py-1.5 hover:bg-blue-50 transition font-medium">
              Learn more
            </button>
          </div>
          <span className="text-6xl">{HELP_FEATURED.emoji}</span>
        </div>

        {/* Three cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {HELP_CARDS.map((card) => (
            <div key={card.title} className="bg-white border border-gray-200 rounded-2xl p-5 flex items-start justify-between hover:shadow-sm transition cursor-pointer">
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{card.category}</p>
                <p className="text-sm font-semibold text-gray-900 leading-snug">{card.title}</p>
              </div>
              <span className="text-3xl ml-3 flex-shrink-0">{card.emoji}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Profile completion nudge */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">
        <div className="p-3 bg-blue-100 rounded-xl flex-shrink-0">
          <Shield className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-blue-900">Complete your company profile</p>
          <p className="text-xs text-blue-600 mt-0.5">A complete profile helps advisors understand your business and respond faster.</p>
        </div>
        <Link href="/dashboard/profile" className="flex-shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1">
          Complete profile <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
