"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, FileText, Clock, CheckCircle, Archive, MoreHorizontal, ArrowRight } from "lucide-react";

type BriefStatus = "draft" | "published" | "archived";

interface Brief {
  id: string;
  role: string;
  outcome: string;
  status: BriefStatus;
  createdAt: string;
  updatedAt: string;
  step?: number;
  totalSteps?: number;
  proposals?: number;
  views?: number;
}

const MOCK_BRIEFS: Brief[] = [
  { id: "b1", role: "CTO", outcome: "Build & launch an MVP", status: "draft", createdAt: "Apr 28, 2025", updatedAt: "2 hours ago", step: 3, totalSteps: 5 },
  { id: "b2", role: "CMO", outcome: "Launch product to new market", status: "draft", createdAt: "Apr 27, 2025", updatedAt: "Yesterday", step: 1, totalSteps: 5 },
  { id: "b3", role: "CRO", outcome: "Build a repeatable sales process", status: "published", createdAt: "Apr 20, 2025", updatedAt: "Apr 20, 2025", proposals: 4, views: 38 },
  { id: "b4", role: "CFO", outcome: "Prepare for Series A fundraise", status: "archived", createdAt: "Mar 10, 2025", updatedAt: "Mar 22, 2025", proposals: 2, views: 14 },
];

const STATUS_CONFIG: Record<BriefStatus, { label: string; color: string; icon: React.ElementType }> = {
  draft:     { label: "Draft",     color: "bg-amber-50 text-amber-600 border-amber-200",   icon: Clock },
  published: { label: "Published", color: "bg-green-50 text-green-700 border-green-200",   icon: CheckCircle },
  archived:  { label: "Archived",  color: "bg-gray-100 text-gray-500 border-gray-200",     icon: Archive },
};

const TABS: { id: BriefStatus | "all"; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "draft",     label: "Drafts" },
  { id: "published", label: "Published" },
  { id: "archived",  label: "Archived" },
];

function BriefRow({ brief }: { brief: Brief }) {
  const router = useRouter();
  const cfg = STATUS_CONFIG[brief.status];
  const StatusIcon = cfg.icon;
  const pct = brief.step && brief.totalSteps ? Math.round((brief.step / brief.totalSteps) * 100) : null;

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-sm transition flex items-start gap-4">
      <div className="p-2.5 bg-blue-50 rounded-lg flex-shrink-0 mt-0.5">
        <FileText className="w-4 h-4 text-blue-500" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-semibold text-gray-900">{brief.role} brief</p>
          <span className={`text-xs px-2 py-0.5 border rounded-full font-medium flex items-center gap-1 ${cfg.color}`}>
            <StatusIcon className="w-3 h-3" /> {cfg.label}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-0.5 truncate">{brief.outcome}</p>

        {/* Draft progress */}
        {pct !== null && (
          <div className="flex items-center gap-2 mt-2 max-w-xs">
            <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-1 bg-blue-500 rounded-full" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-gray-500">{brief.step}/{brief.totalSteps} steps</span>
          </div>
        )}

        {/* Published stats */}
        {brief.status === "published" && (
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span>{brief.proposals} proposals</span>
            <span>{brief.views} views</span>
          </div>
        )}

        <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
          <Clock className="w-3 h-3" /> Updated {brief.updatedAt} · Created {brief.createdAt}
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {brief.status === "draft" && (
          <button
            onClick={() => router.push("/get-matched")}
            className="text-xs px-3 py-1.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center gap-1"
          >
            Continue <ArrowRight className="w-3 h-3" />
          </button>
        )}
        {brief.status === "published" && (
          <button className="text-xs px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-sm">
            Matched CXOs
          </button>
        )}
        {brief.status === "archived" && (
          <button className="text-xs px-3 py-1.5 border border-gray-200 text-gray-500 font-medium rounded-lg hover:bg-gray-50 transition">
            Repost
          </button>
        )}
        <button className="p-1.5 text-gray-500 hover:text-gray-500 hover:bg-gray-100 rounded-lg transition">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function BriefsPage() {
  const router = useRouter();
  const [tab, setTab] = useState<BriefStatus | "all">("all");

  const filtered = tab === "all" ? MOCK_BRIEFS : MOCK_BRIEFS.filter((b) => b.status === tab);

  const counts = {
    all: MOCK_BRIEFS.length,
    draft: MOCK_BRIEFS.filter((b) => b.status === "draft").length,
    published: MOCK_BRIEFS.filter((b) => b.status === "published").length,
    archived: MOCK_BRIEFS.filter((b) => b.status === "archived").length,
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">Job posts & proposals</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your CXO briefs — drafts, live posts, and archived.</p>
        </div>
        <button
          onClick={() => router.push("/get-matched")}
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" /> New job
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-200">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pb-2.5 px-3 text-sm font-medium border-b-2 transition flex items-center gap-1.5 ${
              tab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
              tab === t.id ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"
            }`}>
              {counts[t.id]}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white border border-gray-100 rounded-2xl py-16 flex flex-col items-center text-center">
            <span className="text-4xl mb-3">📋</span>
            <p className="text-sm font-medium text-gray-500">No {tab === "all" ? "" : tab} briefs yet</p>
            <button onClick={() => router.push("/get-matched")} className="mt-4 text-sm text-blue-600 hover:underline">
              Post your first brief →
            </button>
          </div>
        ) : (
          filtered.map((b) => <BriefRow key={b.id} brief={b} />)
        )}
      </div>
    </div>
  );
}
