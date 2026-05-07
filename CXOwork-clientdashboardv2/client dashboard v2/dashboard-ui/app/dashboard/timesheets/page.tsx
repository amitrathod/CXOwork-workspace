"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock, DollarSign, ChevronDown, ChevronUp, ChevronLeft, ChevronRight,
  ExternalLink, TrendingUp, Calendar, Receipt, BarChart3, ArrowUpRight,
} from "lucide-react";
import { MOCK_TIMESHEETS, type MockTimesheet, type TimesheetWeek } from "@/lib/mock-data";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number) {
  return `$${n.toLocaleString()}`;
}

function hoursLabel(h: number) {
  const hrs = Math.floor(h);
  const mins = Math.round((h - hrs) * 60);
  return mins > 0 ? `${hrs}:${String(mins).padStart(2, "0")} hrs` : `${hrs}:00 hrs`;
}

// ─── Day bar chart row ────────────────────────────────────────────────────────

function DayRow({ day, maxHours, hourlyRate }: {
  day: { label: string; hoursDecimal: number; hoursDisplay: string };
  maxHours: number;
  hourlyRate: number;
}) {
  const pct = maxHours > 0 ? (day.hoursDecimal / maxHours) * 100 : 0;
  const amount = day.hoursDecimal * hourlyRate;
  const hasWork = day.hoursDecimal > 0;

  return (
    <div className="grid grid-cols-[140px_1fr_64px_80px] items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
      <p className={`text-sm ${hasWork ? "text-gray-800 font-medium" : "text-gray-400"}`}>{day.label}</p>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        {hasWork && (
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        )}
      </div>
      <p className={`text-sm text-right ${hasWork ? "text-gray-800 font-medium" : "text-gray-400"}`}>
        {day.hoursDisplay}
      </p>
      <p className={`text-sm text-right ${hasWork ? "text-gray-700" : "text-gray-300"}`}>
        {hasWork ? fmt(amount) : "—"}
      </p>
    </div>
  );
}

// ─── Week detail panel ────────────────────────────────────────────────────────

function WeekPanel({ week, hourlyRate, weeklyHoursLimit }: {
  week: TimesheetWeek;
  hourlyRate: number;
  weeklyHoursLimit: number;
}) {
  const maxHours = Math.max(...week.days.map(d => d.hoursDecimal), 1);
  const pctOfLimit = Math.min((week.totalHours / weeklyHoursLimit) * 100, 100);

  return (
    <div className="mt-4 space-y-4">
      {/* Week summary bar */}
      <div className="flex items-center gap-4 bg-gray-50 rounded-xl px-4 py-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-medium text-gray-500">Week limit usage</p>
            <p className="text-xs text-gray-500">{week.totalHours} of {weeklyHoursLimit} hrs</p>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${pctOfLimit >= 100 ? "bg-amber-500" : "bg-blue-500"}`}
              style={{ width: `${pctOfLimit}%` }}
            />
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xs text-gray-500">Total billed</p>
          <p className="text-base font-bold text-gray-900">{fmt(week.totalAmount)}</p>
          <p className="text-xs text-gray-400">{week.totalHoursDisplay} @ ${hourlyRate}/hr</p>
        </div>
      </div>

      {/* Day rows */}
      <div className="bg-white border border-gray-100 rounded-xl px-4 py-1">
        {/* Header */}
        <div className="grid grid-cols-[140px_1fr_64px_80px] gap-3 pb-2 pt-2 border-b border-gray-100 mb-1">
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Day</p>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Activity</p>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide text-right">Hours</p>
          <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide text-right">Amount</p>
        </div>
        {week.days.map(d => (
          <DayRow key={d.date} day={d} maxHours={maxHours} hourlyRate={hourlyRate} />
        ))}
      </div>
    </div>
  );
}

// ─── Contract timesheet card ──────────────────────────────────────────────────

function ContractTimesheetCard({ ts }: { ts: MockTimesheet }) {
  const [weekIdx, setWeekIdx] = useState(0);
  const [expanded, setExpanded] = useState(true);

  const currentWeek = ts.weeks[weekIdx];
  const totalBilledAllTime = ts.hoursSinceStart * ts.hourlyRate;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

      {/* Card header */}
      <div className="px-5 py-4 flex items-start justify-between gap-4 border-b border-gray-50">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-full ${ts.advisorColor} text-white grid place-items-center font-bold text-sm flex-shrink-0`}>
            {ts.advisorInitials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-gray-900 truncate">{ts.contractTitle}</p>
              <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                ts.status === "active" ? "bg-green-50 text-green-700 border border-green-100" : "bg-gray-100 text-gray-500"
              }`}>
                {ts.status === "active" ? "Active" : ts.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{ts.advisorName} · {ts.advisorRole} · ${ts.hourlyRate}/hr · {ts.weeklyHoursLimit} hrs/week limit</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Link
            href={`/dashboard/contracts`}
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition px-2.5 py-1.5 border border-gray-200 rounded-lg hover:border-blue-200"
          >
            <ExternalLink className="w-3 h-3" /> Contract
          </Link>
          <button
            onClick={() => setExpanded(e => !e)}
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 divide-x divide-gray-50 border-b border-gray-50">
        {[
          { label: "Last 24 hrs", value: hoursLabel(ts.hoursLast24h), sub: ts.hoursLast24h === 0 ? "No activity" : null, icon: Clock },
          { label: "This week",   value: hoursLabel(ts.hoursThisWeek),  sub: `of ${ts.weeklyHoursLimit} hr limit`, icon: Calendar },
          { label: "Last week",   value: hoursLabel(ts.hoursLastWeek),  sub: null, icon: BarChart3 },
          { label: "Since start", value: hoursLabel(ts.hoursSinceStart), sub: fmt(totalBilledAllTime) + " total", icon: TrendingUp },
        ].map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className="px-4 py-3 flex flex-col gap-0.5">
            <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{label}</p>
            <p className="text-lg font-bold text-gray-900 leading-snug">{value}</p>
            {sub && <p className="text-[11px] text-gray-400">{sub}</p>}
          </div>
        ))}
      </div>

      {/* Expandable week detail */}
      {expanded && currentWeek && (
        <div className="px-5 pb-5">
          {/* Week navigator */}
          <div className="flex items-center justify-between mt-4 mb-1">
            <p className="text-sm font-semibold text-gray-800">{currentWeek.weekLabel}</p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setWeekIdx(i => Math.min(i + 1, ts.weeks.length - 1))}
                disabled={weekIdx >= ts.weeks.length - 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs text-gray-500 px-1">{weekIdx + 1} / {ts.weeks.length}</span>
              <button
                onClick={() => setWeekIdx(i => Math.max(i - 1, 0))}
                disabled={weekIdx === 0}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <WeekPanel week={currentWeek} hourlyRate={ts.hourlyRate} weeklyHoursLimit={ts.weeklyHoursLimit} />
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TimesheetsPage() {
  const timesheets = MOCK_TIMESHEETS;

  // Aggregate totals across all hourly contracts
  const totalThisWeek = timesheets.reduce((sum, t) => sum + t.hoursThisWeek, 0);
  const totalBilledThisWeek = timesheets.reduce((sum, t) => sum + t.hoursThisWeek * t.hourlyRate, 0);
  const totalLastWeek = timesheets.reduce((sum, t) => sum + t.hoursLastWeek, 0);
  const totalBilledLastWeek = timesheets.reduce((sum, t) => sum + t.hoursLastWeek * t.hourlyRate, 0);
  const totalAllTime = timesheets.reduce((sum, t) => sum + t.hoursSinceStart, 0);
  const totalBilledAllTime = timesheets.reduce((sum, t) => sum + t.hoursSinceStart * t.hourlyRate, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">Timesheets</h1>
          <p className="text-gray-500 text-sm mt-1">Hours logged and weekly billing across your hourly engagements.</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full font-medium">
            <Receipt className="w-3.5 h-3.5" /> Hourly · Billed weekly
          </span>
        </div>
      </div>

      {/* Summary strip */}
      <div className="grid grid-cols-3 gap-4">
        {[
          {
            label: "This week",
            hours: hoursLabel(totalThisWeek),
            amount: fmt(totalBilledThisWeek),
            color: "blue",
          },
          {
            label: "Last week",
            hours: hoursLabel(totalLastWeek),
            amount: fmt(totalBilledLastWeek),
            color: "gray",
          },
          {
            label: "All time",
            hours: hoursLabel(totalAllTime),
            amount: fmt(totalBilledAllTime),
            color: "gray",
          },
        ].map(({ label, hours, amount, color }) => (
          <div key={label} className={`bg-white rounded-2xl border ${color === "blue" ? "border-blue-100" : "border-gray-100"} shadow-sm px-5 py-4`}>
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color === "blue" ? "text-blue-700" : "text-gray-900"}`}>{hours}</p>
            <p className="text-sm text-gray-500 mt-0.5">{amount} billed</p>
          </div>
        ))}
      </div>

      {/* Note: only hourly contracts show */}
      <div className="flex items-start gap-2.5 p-3.5 bg-amber-50 border border-amber-100 rounded-xl text-sm text-amber-800">
        <Receipt className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
        <span>Timesheets are only shown for <strong>hourly, billed weekly</strong> engagements. Fixed-price and monthly retainer contracts are tracked separately under <Link href="/dashboard/contracts" className="underline underline-offset-2 hover:text-amber-900">Contracts</Link>.</span>
      </div>

      {/* Per-contract timesheets */}
      <div className="space-y-5">
        {timesheets.map(ts => (
          <ContractTimesheetCard key={ts.contractId} ts={ts} />
        ))}
      </div>
    </div>
  );
}
