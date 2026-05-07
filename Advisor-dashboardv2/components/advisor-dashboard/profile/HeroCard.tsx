"use client";

import { useState } from "react";
import type { AdvisorProfile } from "@/types/advisor";

export function HeroCard({
  advisor,
  uid,
  completionPct,
  onSaved,
}: {
  advisor      : AdvisorProfile;
  uid          : string;
  completionPct: number;
  onSaved      : () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [headline, setHeadline] = useState(advisor.headline || "");
  const name = [advisor.firstName, advisor.lastName].filter(Boolean).join(" ") || "Your Name";
  const initials = ((advisor.firstName?.[0] || "") + (advisor.lastName?.[0] || "")).toUpperCase() || "?";

  const statusColors: Record<string, string> = {
    active:       "bg-emerald-100 text-emerald-800 border-emerald-200",
    under_review: "bg-amber-100 text-amber-800 border-amber-200",
    inactive:     "bg-gray-100 text-gray-600 border-gray-200",
  };
  const statusLabels: Record<string, string> = {
    active:       "Active",
    under_review: "Under Review",
    inactive:     "Inactive",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 mb-5">
      <div className="flex items-start gap-5">
        {/* Avatar */}
        <div className="shrink-0">
          {advisor.photoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={advisor.photoUrl} alt={name} className="w-20 h-20 rounded-full object-cover border border-gray-200" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-900 text-white grid place-items-center font-bold text-2xl">
              {initials}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h2 className="text-[20px] font-bold text-gray-900 m-0">{name}</h2>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[advisor.profileStatus] || ""}`}>
              {statusLabels[advisor.profileStatus] || advisor.profileStatus}
            </span>
          </div>
          {advisor.professionalTitle && (
            <p className="text-[13.5px] text-gray-600 mt-0.5">{advisor.professionalTitle}</p>
          )}
          {!editing ? (
            <p className="text-[13px] text-gray-500 mt-1">
              {advisor.headline || <span className="italic text-gray-400">No headline set</span>}
              <button type="button" onClick={() => setEditing(true)} className="ml-2 text-[11.5px] text-blue-600 hover:underline">Edit</button>
            </p>
          ) : (
            <div className="flex items-center gap-2 mt-1">
              <input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                style={{ background: "#fff", color: "#111827", colorScheme: "light" }}
                className="flex-1 px-2.5 py-1.5 border border-gray-300 rounded-lg text-[13px] focus:outline-none focus:border-blue-500"
              />
              <button type="button" onClick={() => { setEditing(false); onSaved(); }} className="px-3 py-1.5 rounded-lg text-[12.5px] font-semibold bg-gray-900 text-white hover:bg-black">Save</button>
              <button type="button" onClick={() => setEditing(false)} className="text-[12.5px] text-gray-500 hover:underline">Cancel</button>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-2">
            {advisor.location && (
              <span className="text-[11.5px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                📍 {advisor.location}
              </span>
            )}
            {advisor.hourlyRate && (
              <span className="text-[11.5px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 border border-gray-200">
                ${advisor.hourlyRate}/hr
              </span>
            )}
            {(advisor.selectedIndustries || []).slice(0, 2).map((ind) => (
              <span key={ind} className="text-[11.5px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Completion ring */}
        <div className="shrink-0 flex flex-col items-center gap-1">
          <svg width="52" height="52" viewBox="0 0 52 52">
            <circle cx="26" cy="26" r="22" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
            <circle
              cx="26" cy="26" r="22" fill="none"
              stroke={completionPct === 100 ? "#10b981" : "#3b82f6"}
              strokeWidth="4"
              strokeDasharray={`${(completionPct / 100) * 138.2} 138.2`}
              strokeLinecap="round"
              transform="rotate(-90 26 26)"
            />
            <text x="26" y="30" textAnchor="middle" fontSize="11" fontWeight="700" fill="#111827">{completionPct}%</text>
          </svg>
          <span className="text-[10.5px] text-gray-500">Complete</span>
        </div>
      </div>
    </div>
  );
}
