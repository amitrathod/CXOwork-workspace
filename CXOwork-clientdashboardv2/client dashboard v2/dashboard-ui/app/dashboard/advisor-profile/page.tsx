"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_ADVISORS, MOCK_MATCHES } from "@/lib/mock-data";
import { ArrowLeft, MapPin, Star, MessageSquare, FileSignature } from "lucide-react";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Chips({ items, gray }: { items: string[]; gray?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map(i => (
        <span
          key={i}
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
            gray ? "bg-gray-100 border-gray-200 text-gray-700" : "bg-blue-50 border-blue-100 text-blue-700"
          }`}
        >
          {i}
        </span>
      ))}
    </div>
  );
}

function AdvisorProfileInner() {
  const router = useRouter();
  const params = useSearchParams();
  const advisorId = params.get("advisorId") || "";
  const a = MOCK_ADVISORS[advisorId];

  if (!a) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-gray-500 text-sm">Advisor not found.</p>
        <button onClick={() => router.back()} className="mt-4 text-blue-600 text-sm hover:underline">← Go back</button>
      </div>
    );
  }

  const name = [a.firstName, a.lastName].filter(Boolean).join(" ");
  const initials = ((a.firstName?.[0] || "") + (a.lastName?.[0] || "")).toUpperCase();

  // Find the match note for this advisor
  const matchNote = MOCK_MATCHES.find(m => m.advisorUid === advisorId)?.note;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Back */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Matched CXOs
      </button>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start">

        {/* ── Left: main profile ── */}
        <div className="space-y-8">

          {/* Hero */}
          <div className="flex items-start gap-5">
            <div className="w-20 h-20 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-2xl flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{name}</h1>
              {a.headline && <p className="text-gray-500 mt-1">{a.headline}</p>}
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-gray-500">
                {a.city && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {a.city}
                  </span>
                )}
                {a.hourlyRate && (
                  <span className="font-semibold text-gray-800">${a.hourlyRate}/hr</span>
                )}
                <span className="flex items-center gap-1 text-amber-500 font-medium">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> 4.9
                  <span className="text-gray-500 font-normal">(12 reviews)</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {(a.selectedRoles || []).slice(0, 3).map(r => (
                  <span key={r} className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium">{r}</span>
                ))}
                <span className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">Available now</span>
              </div>
            </div>
          </div>

          {/* Why this match */}
          {matchNote && (
            <Section title="Why this match">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-sm text-blue-800 leading-relaxed">{matchNote}</p>
              </div>
            </Section>
          )}

          {/* About */}
          {a.about && (
            <Section title="About">
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{a.about}</p>
            </Section>
          )}

          {/* Industries */}
          {a.selectedIndustries?.length > 0 && (
            <Section title="Industries">
              <Chips items={a.selectedIndustries} />
            </Section>
          )}

          {/* Engagement types */}
          {a.engagementTypes?.length > 0 && (
            <Section title="Engagement types">
              <Chips items={a.engagementTypes} />
            </Section>
          )}

          {/* Core skills */}
          {a.skills?.length > 0 && (
            <Section title="Core skills">
              <Chips items={a.skills} gray />
            </Section>
          )}

          {/* Past experience placeholder */}
          <Section title="Experience">
            <div className="space-y-4">
              {[
                { title: "Chief Revenue Officer", company: "ScaleAI (Series B)", period: "2021 – 2023" },
                { title: "VP of Sales", company: "Fintech Startup", period: "2018 – 2021" },
              ].map(exp => (
                <div key={exp.title + exp.company} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gray-100 border border-gray-200 grid place-items-center flex-shrink-0 text-sm font-bold text-gray-500">
                    {exp.company[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{exp.title}</p>
                    <p className="text-xs text-gray-500">{exp.company} · {exp.period}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* ── Right: sticky action card ── */}
        <div className="sticky top-4 space-y-3">
          <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
            {a.hourlyRate && (
              <div className="text-center pb-3 border-b border-gray-100">
                <p className="text-2xl font-bold text-gray-900">${a.hourlyRate}<span className="text-base font-normal text-gray-500">/hr</span></p>
                <p className="text-xs text-gray-500 mt-0.5">Estimated · may vary by engagement</p>
              </div>
            )}

            <button
              onClick={() => router.push(`/dashboard/send-offer?advisorId=${advisorId}`)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition"
            >
              <FileSignature className="w-4 h-4" /> Send an offer
            </button>

            <button
              onClick={() => router.push(`/dashboard/messages?thread=t_mock_${advisorId}`)}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
            >
              <MessageSquare className="w-4 h-4" /> Send message
            </button>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2 text-xs text-gray-500">
            <p className="font-semibold text-gray-700">About this advisor</p>
            <p>✓ NDA signed with CXOwork</p>
            <p>✓ Identity & background verified</p>
            <p>✓ References available on request</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdvisorProfilePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-sm text-gray-500">Loading…</div>}>
      <AdvisorProfileInner />
    </Suspense>
  );
}
