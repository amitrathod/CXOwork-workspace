"use client";

/**
 * /advisor-dashboard/meetings — Advisor meetings page.
 *
 * Lists all advisory sessions (upcoming + past) across engagements.
 * From the advisor's perspective: the client column shows who you're
 * meeting with (Alex Johnson / GrowthTech), not yourself.
 */

import { useState } from "react";
import { Clock, Users, ChevronRight, CheckCircle2, Video, Link as LinkIcon } from "lucide-react";

/* ─── Types ─────────────────────────────────────────────────────────────── */

type MeetingStatus = "upcoming" | "completed" | "cancelled";

interface Meeting {
  id          : string;
  title       : string;
  month       : string;
  day         : number;
  time        : string;
  duration    : string;
  participants: number;
  milestone   : string;
  milestoneId : string;
  status      : MeetingStatus;
  hasRecording: boolean;
  clientName  : string;
  clientInit  : string;
  clientColor : string;
  clientRole  : string;
}

/* ─── Mock data ─────────────────────────────────────────────────────────── */

const MEETINGS: Meeting[] = [
  {
    id: "m1", title: "Series B data room planning",
    month: "JUN", day: 3,
    time: "10:00 AM", duration: "1h", participants: 3,
    milestone: "Investor data room ready", milestoneId: "m3",
    status: "upcoming", hasRecording: false,
    clientName: "Alex Johnson", clientInit: "AJ", clientColor: "bg-indigo-600", clientRole: "GrowthTech",
  },
  {
    id: "m2", title: "Model review – scenarios",
    month: "MAY", day: 13,
    time: "10:00 AM", duration: "1h", participants: 2,
    milestone: "Series B financial model", milestoneId: "m1",
    status: "completed", hasRecording: true,
    clientName: "Alex Johnson", clientInit: "AJ", clientColor: "bg-indigo-600", clientRole: "GrowthTech",
  },
  {
    id: "m3", title: "Model review – P&L pass 1",
    month: "MAY", day: 6,
    time: "11:00 AM", duration: "45 min", participants: 3,
    milestone: "Series B financial model", milestoneId: "m1",
    status: "completed", hasRecording: true,
    clientName: "Alex Johnson", clientInit: "AJ", clientColor: "bg-indigo-600", clientRole: "GrowthTech",
  },
  {
    id: "m4", title: "Financial model kickoff",
    month: "APR", day: 28,
    time: "9:30 AM", duration: "1h", participants: 2,
    milestone: "Series B financial model", milestoneId: "m1",
    status: "completed", hasRecording: true,
    clientName: "Alex Johnson", clientInit: "AJ", clientColor: "bg-indigo-600", clientRole: "GrowthTech",
  },
  {
    id: "m5", title: "Board template scoping",
    month: "APR", day: 24,
    time: "2:00 PM", duration: "45 min", participants: 3,
    milestone: "Monthly board reporting template", milestoneId: "m2",
    status: "completed", hasRecording: true,
    clientName: "Alex Johnson", clientInit: "AJ", clientColor: "bg-indigo-600", clientRole: "GrowthTech",
  },
];

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function StatusChip({ status, hasRecording }: { status: MeetingStatus; hasRecording: boolean }) {
  if (status === "upcoming") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold border bg-blue-50 text-blue-600 border-blue-200">
        <Clock className="w-3 h-3" />Upcoming
      </span>
    );
  }
  if (status === "completed") {
    return (
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold border bg-green-50 text-green-600 border-green-200">
          <CheckCircle2 className="w-3 h-3" />Completed
        </span>
        {hasRecording && (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[12px] font-medium border border-gray-200 text-gray-500 bg-white">
            <Video className="w-3 h-3" />Rec
          </span>
        )}
      </div>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-semibold border bg-gray-50 text-gray-400 border-gray-200">
      Cancelled
    </span>
  );
}

function MeetingRow({ m }: { m: Meeting }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-5 hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer group">

      {/* Date block */}
      <div className="shrink-0 w-12 text-center">
        <div className="text-[10.5px] font-bold uppercase tracking-widest text-gray-400">{m.month}</div>
        <div className="text-[26px] font-bold text-gray-900 leading-tight">{m.day}</div>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-gray-100 shrink-0" />

      {/* Body */}
      <div className="flex-1 min-w-0">
        <div className="text-[15px] font-semibold text-gray-900 leading-snug">
          {m.status === "upcoming" ? `Upcoming: ${m.title}` : m.title}
        </div>

        {/* Meta row */}
        <div className="flex items-center flex-wrap gap-x-3 gap-y-1 mt-1.5">
          <span className="flex items-center gap-1 text-[12.5px] text-gray-500">
            <Clock className="w-3.5 h-3.5 text-gray-400" />
            {m.time} · {m.duration}
          </span>
          <span className="flex items-center gap-1 text-[12.5px] text-gray-500">
            <Users className="w-3.5 h-3.5 text-gray-400" />
            {m.participants} participants
          </span>
          <span className="flex items-center gap-1 text-[12.5px] text-blue-600 font-medium hover:underline">
            <LinkIcon className="w-3 h-3 text-blue-400" />
            {m.milestone}
          </span>
        </div>

        {/* Client row */}
        <div className="flex items-center gap-2 mt-2">
          <div className={`w-5 h-5 rounded-full ${m.clientColor} flex items-center justify-center text-white font-bold text-[9px] shrink-0`}>
            {m.clientInit}
          </div>
          <span className="text-[12.5px] text-gray-500">
            {m.clientName} · {m.clientRole}
          </span>
        </div>
      </div>

      {/* Right: status + chevron */}
      <div className="flex items-center gap-3 shrink-0">
        <StatusChip status={m.status} hasRecording={m.hasRecording} />
        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

type Filter = "all" | "upcoming" | "past";

export default function MeetingsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const total     = MEETINGS.length;
  const completed = MEETINGS.filter(m => m.status === "completed").length;
  const upcomingN = MEETINGS.filter(m => m.status === "upcoming").length;
  const hoursRaw  = MEETINGS.filter(m => m.status === "completed")
    .reduce((sum, m) => {
      if (m.duration.includes("45")) return sum + 0.75;
      return sum + 1;
    }, 0);
  const hoursLabel = hoursRaw % 1 === 0 ? `${hoursRaw}h` : `${hoursRaw}h`;

  const filtered = MEETINGS.filter(m => {
    if (filter === "upcoming") return m.status === "upcoming";
    if (filter === "past")     return m.status === "completed" || m.status === "cancelled";
    return true;
  });

  const TABS: { key: Filter; label: string }[] = [
    { key: "all",      label: "All"      },
    { key: "upcoming", label: "Upcoming" },
    { key: "past",     label: "Past"     },
  ];

  return (
    <div>

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[24px] font-semibold tracking-tight">Meetings</h1>
        <p className="text-sm text-gray-500 mt-1">
          All advisory sessions — scheduled, in progress, and past.
        </p>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: "Total sessions", value: String(total),    sub: "completed"           },
          { label: "Hours logged",   value: hoursLabel,       sub: "across all sessions" },
          { label: "Upcoming",       value: String(upcomingN), sub: "scheduled"          },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl px-4 py-3.5">
            <div className="text-[11.5px] text-gray-400 font-medium mb-0.5">{label}</div>
            <div className="text-[26px] font-bold text-gray-900 leading-tight">{value}</div>
            <div className="text-[12px] text-gray-400">{sub}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-1.5 mb-5">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setFilter(key)}
            className={`px-4 py-1.5 rounded-full text-[13.5px] font-medium border transition-colors ${
              filter === key
                ? "bg-gray-900 text-white border-gray-900"
                : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Meeting list */}
      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl px-6 py-12 text-center text-[13.5px] text-gray-400">
          No {filter === "upcoming" ? "upcoming" : filter === "past" ? "past" : ""} meetings found.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(m => <MeetingRow key={m.id} m={m} />)}
        </div>
      )}

    </div>
  );
}
