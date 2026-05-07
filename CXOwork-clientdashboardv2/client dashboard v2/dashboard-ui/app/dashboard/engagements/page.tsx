"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { MOCK_MATCHES, MOCK_ADVISORS, type MockAdvisor, type MockMatch } from "@/lib/mock-data";
import { Star, MapPin, Clock, Heart, MessageSquare, Eye, FileSignature, CalendarClock, CheckCircle2 } from "lucide-react";

interface HydratedMatch { match: MockMatch; advisor: MockAdvisor }

// ─── Match card ───────────────────────────────────────────────────────────────

function MatchCard({ row, onMessage, onView, onOffer }: {
  row: HydratedMatch;
  onMessage: () => void;
  onView: () => void;
  onOffer: () => void;
}) {
  const a = row.advisor;
  const [saved, setSaved] = useState(false);
  const [screeningRequested, setScreeningRequested] = useState(false);

  const name = [a.firstName, a.lastName].filter(Boolean).join(" ");
  const initials = ((a.firstName?.[0] || "") + (a.lastName?.[0] || "")).toUpperCase();
  const avatarColor = a.photoColor || "bg-blue-600";

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md transition">
      <div className="flex items-start gap-4">

        {/* Avatar */}
        <button onClick={onView} className="flex-shrink-0">
          <div className={`w-14 h-14 rounded-full ${avatarColor} text-white grid place-items-center font-bold text-lg`}>
            {initials}
          </div>
        </button>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              {/* Name + badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <button onClick={onView} className="text-base font-semibold text-gray-900 hover:text-blue-600 transition">
                  {name}
                </button>
                {a.topRated && (
                  <span className="text-xs px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-full font-medium flex items-center gap-1">
                    ⭐ Top Rated
                  </span>
                )}
                {a.available && (
                  <span className="text-xs px-2 py-0.5 bg-green-50 text-green-600 border border-green-200 rounded-full font-medium">
                    Available now
                  </span>
                )}
              </div>

              {/* Headline */}
              <p className="text-[15px] text-gray-700 mt-0.5">{a.headline}</p>

              {/* Location + availability */}
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1 flex-wrap">
                <MapPin className="w-3 h-3 flex-shrink-0" /> {a.city}
                {a.availability && (
                  <><span className="mx-0.5">·</span><Clock className="w-3 h-3 flex-shrink-0 ml-0.5" /> {a.availability}</>
                )}
              </p>
            </div>

            {/* Save / heart */}
            <button
              onClick={() => setSaved(s => !s)}
              className={`p-2 rounded-xl border transition flex-shrink-0 ${
                saved ? "border-rose-200 bg-rose-50 text-rose-500" : "border-gray-200 text-gray-500 hover:border-rose-200 hover:text-rose-400"
              }`}
            >
              <Heart className="w-4 h-4" fill={saved ? "currentColor" : "none"} />
            </button>
          </div>

          {/* Rating + rate */}
          {(a.rating || a.hourlyRate) && (
            <div className="flex items-center gap-4 mt-2 text-sm">
              {a.rating && (
                <span className="flex items-center gap-1 text-gray-700 font-medium">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {a.rating}
                  {a.reviews && <span className="text-gray-500 font-normal">({a.reviews} reviews)</span>}
                </span>
              )}
              {a.hourlyRate && (
                <span className="text-gray-700 font-medium">
                  ${a.hourlyRate}<span className="text-gray-500 font-normal">/hr</span>
                </span>
              )}
            </div>
          )}

          {/* Bio */}
          {a.about && (
            <p className="text-[15px] text-gray-500 mt-2 leading-relaxed line-clamp-2">{a.about}</p>
          )}

          {/* Why this match */}
          {row.match.note && (
            <div className="mt-2.5 flex items-start gap-1.5 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 leading-relaxed">
              <span className="mt-0.5 flex-shrink-0">✦</span>
              <span><strong>Why this match: </strong>{row.match.note}</span>
            </div>
          )}

          {/* Skills */}
          {a.skills?.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {a.skills.slice(0, 4).map(s => (
                <span key={s} className="text-[13px] px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">{s}</span>
              ))}
              {a.skills.length > 4 && (
                <span className="text-[13px] px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">+{a.skills.length - 4}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Actions — bottom bar */}
      <div className="mt-4 pt-4 border-t border-gray-50 space-y-2.5">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onView}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
          >
            <Eye className="w-3.5 h-3.5" /> View details
          </button>
          <button
            onClick={onMessage}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-500 text-sm font-medium rounded-lg hover:bg-gray-50 transition"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Message
          </button>

          {/* Request screening */}
          {screeningRequested ? (
            <button
              disabled
              className="flex items-center gap-1.5 px-3 py-1.5 border border-green-200 bg-green-50 text-green-700 text-sm font-medium rounded-lg cursor-default"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Screening requested
            </button>
          ) : (
            <button
              onClick={() => setScreeningRequested(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition"
            >
              <CalendarClock className="w-3.5 h-3.5" /> Request screening
            </button>
          )}

          <button
            onClick={onOffer}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            <FileSignature className="w-3.5 h-3.5" /> Send an offer
          </button>
        </div>

        {/* Screening requested annotation */}
        {screeningRequested && (
          <div className="flex items-start gap-2 px-3 py-2.5 bg-green-50 border border-green-100 rounded-xl">
            <CalendarClock className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-800 leading-relaxed">
              <strong>Screening requested.</strong> CXOwork is approaching {a.firstName} to schedule an introductory screening call. You'll receive a notification once a time is confirmed — typically within 1–2 business days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MatchedCXOPage() {
  const router = useRouter();

  const visible: HydratedMatch[] = MOCK_MATCHES
    .filter(m => m.status !== "archived")
    .map(m => ({ match: m, advisor: MOCK_ADVISORS[m.advisorUid] }))
    .filter(r => !!r.advisor);

  function goMessage(row: HydratedMatch) {
    router.push(`/dashboard/messages?thread=t_mock_${row.match.advisorUid}`);
  }
  function goProfile(row: HydratedMatch) {
    router.push(`/dashboard/advisor-profile?advisorId=${row.match.advisorUid}`);
  }
  function goSendOffer(row: HydratedMatch) {
    router.push(`/dashboard/send-offer?advisorId=${row.match.advisorUid}`);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900">Matched CXO</h1>
        <p className="text-gray-500 text-sm mt-1">Executives our team has hand-picked for your needs. Reach out or start an engagement.</p>
      </div>
      <p className="text-xs text-gray-500">{visible.length} match{visible.length === 1 ? "" : "es"}</p>
      <div className="space-y-4">
        {visible.map(row => (
          <MatchCard
            key={row.match.id}
            row={row}
            onMessage={() => goMessage(row)}
            onView={() => goProfile(row)}
            onOffer={() => goSendOffer(row)}
          />
        ))}
      </div>
    </div>
  );
}
