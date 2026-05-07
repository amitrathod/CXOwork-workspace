"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MOCK_ADVISORS, MOCK_MATCHES } from "@/lib/mock-data";
import {
  ChevronRight, Check, Send, ChevronDown, ChevronUp,
  Calendar, CreditCard, HelpCircle, Paperclip, ArrowLeft
} from "lucide-react";

// ─── Stepper ──────────────────────────────────────────────────────────────────

const STEPS = [
  { label: "View job post" },
  { label: "Matched CXOs" },
  { label: "Send offer" },
];

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0">
      {STEPS.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.label} className="flex items-center">
            <div className={`flex items-center gap-2 text-xs font-semibold ${active ? "text-blue-600" : done ? "text-blue-400" : "text-gray-500"}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${done ? "bg-blue-600 text-white" : active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"}`}>
                {done ? <Check className="w-3 h-3" /> : i + 1}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < STEPS.length - 1 && <ChevronRight className="w-3.5 h-3.5 text-gray-300 mx-2 flex-shrink-0" />}
          </div>
        );
      })}
    </div>
  );
}

// ─── Accordion ────────────────────────────────────────────────────────────────

function Accordion({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition text-left"
      >
        <span className="flex items-center gap-2.5 text-sm font-medium text-gray-800">
          {icon}
          {title}
        </span>
        {open ? <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0 text-sm text-gray-500 leading-relaxed border-t border-gray-100 bg-gray-50">
          <div className="pt-3">{children}</div>
        </div>
      )}
    </div>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-4">
      <h2 className="font-display text-base font-bold text-gray-900">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
  );
}

// ─── Advisor summary card (right column) ─────────────────────────────────────

function AdvisorCard({ advisorId }: { advisorId: string }) {
  const a = MOCK_ADVISORS[advisorId];
  if (!a) return null;
  const name = [a.firstName, a.lastName].filter(Boolean).join(" ");
  const initials = ((a.firstName?.[0] || "") + (a.lastName?.[0] || "")).toUpperCase();
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4 sticky top-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500">You're sending an offer to</h3>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-blue-600 text-white grid place-items-center font-bold text-base flex-shrink-0">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{name}</p>
          {a.headline && <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{a.headline}</p>}
          {a.city && <p className="text-xs text-gray-500 mt-0.5">📍 {a.city}</p>}
        </div>
      </div>

      {a.skills?.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1.5">Top skills</p>
          <div className="flex flex-wrap gap-1.5">
            {a.skills.slice(0, 5).map(s => (
              <span key={s} className="text-[11px] px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full border border-gray-200">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* Brief summary */}
      <div className="pt-2 border-t border-gray-100 space-y-2">
        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">Job post</h4>
        <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
          <p className="text-xs font-semibold text-gray-800">CRO · Build a repeatable sales process</p>
          <div className="flex flex-wrap gap-1">
            <span className="text-[11px] px-2 py-0.5 bg-white border border-gray-200 rounded-md text-gray-500">Fractional · 10–20 hrs/wk</span>
            <span className="text-[11px] px-2 py-0.5 bg-green-50 border border-green-200 text-green-700 rounded-md font-medium">Published</span>
          </div>
        </div>
      </div>

      {a.hourlyRate && (
        <div className="pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Advisor rate</span>
            <span className="text-sm font-bold text-gray-900">${a.hourlyRate}/hr</span>
          </div>
          <p className="text-[11px] text-gray-500 mt-1">Rate is set by the advisor and may be negotiated.</p>
        </div>
      )}
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

function SendOfferForm({ advisorId }: { advisorId: string }) {
  const router = useRouter();
  const a = MOCK_ADVISORS[advisorId];
  const name = a ? [a.firstName, a.lastName].filter(Boolean).join(" ") : "the advisor";

  const [contractTitle, setContractTitle] = useState("");
  const [workDesc, setWorkDesc] = useState("");
  const [payType, setPayType] = useState<"hourly" | "fixed">("hourly");
  const [hourlyRate, setHourlyRate] = useState(String(a?.hourlyRate || 350));
  const [weeklyLimit, setWeeklyLimit] = useState("20");
  const [totalAmount, setTotalAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [autoPayEnabled, setAutoPayEnabled] = useState(false);
  const [autoPayAmount, setAutoPayAmount] = useState("");
  const [tosChecked, setTosChecked] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <Check className="w-10 h-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Offer sent!</h2>
        <p className="text-gray-500 max-w-sm">
          Your offer has been sent to <strong>{name}</strong>. You'll receive a notification once they review and respond.
        </p>
        <button
          onClick={() => router.push("/dashboard/engagements")}
          className="mt-8 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold text-sm hover:bg-blue-700 transition"
        >
          Back to Matched CXOs
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ── Job details ── */}
      <section>
        <SectionHeading title="Job details" subtitle="Describe what you need and how you'll work together." />
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contract title <span className="text-red-400">*</span></label>
            <input
              value={contractTitle}
              onChange={e => setContractTitle(e.target.value)}
              placeholder="e.g. Fractional CRO – Sales Process Build-out"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Work description</label>
            <textarea
              rows={5}
              value={workDesc}
              onChange={e => setWorkDesc(e.target.value)}
              placeholder="Set clear expectations — what you need them to accomplish, key milestones, and how you'll work together."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex items-center justify-between mt-1">
              <button className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-500 transition">
                <Paperclip className="w-3.5 h-3.5" /> Attach file
              </button>
              <span className="text-xs text-gray-500">{workDesc.length}/5,000</span>
            </div>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── Contract terms ── */}
      <section>
        <SectionHeading title="Contract terms" />
        <div className="space-y-5">

          {/* Pay type */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">How would you like to pay?</label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "hourly", label: "Pay by the hour", desc: "Track hours and pay for time worked" },
                { id: "fixed",  label: "Fixed price",     desc: "Pay a set amount for the project" },
              ].map(opt => (
                <button key={opt.id} onClick={() => setPayType(opt.id as "hourly" | "fixed")}
                  className={`text-left p-4 rounded-xl border-2 transition ${payType === opt.id ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-gray-300"}`}>
                  <p className={`text-sm font-semibold ${payType === opt.id ? "text-blue-800" : "text-gray-800"}`}>{opt.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Hourly fields */}
          {payType === "hourly" && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Hourly rate</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">$</span>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={e => setHourlyRate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-1">Advisor's listed rate</p>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Weekly limit (hours)</label>
                <input
                  type="number"
                  value={weeklyLimit}
                  onChange={e => setWeeklyLimit(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="text-[11px] text-gray-500 mt-1">Max billable hours per week</p>
              </div>
            </div>
          )}

          {/* Fixed fields */}
          {payType === "fixed" && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Total amount</label>
              <div className="relative max-w-xs">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">$</span>
                <input
                  type="number"
                  value={totalAmount}
                  onChange={e => setTotalAmount(e.target.value)}
                  placeholder="0"
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Start date */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" /> Start date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-[11px] text-gray-500 mt-1">The contract begins on this date, subject to advisor acceptance.</p>
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── Automatic weekly payments ── */}
      <section>
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-base font-bold text-gray-900">Automatic weekly payments</h2>
            <p className="text-sm text-gray-500 mt-0.5">Optionally set a recurring weekly payment to the advisor.</p>
          </div>
          <button
            onClick={() => setAutoPayEnabled(v => !v)}
            className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 mt-0.5 ${autoPayEnabled ? "bg-blue-600" : "bg-gray-200"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${autoPayEnabled ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>

        {autoPayEnabled && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Weekly payment amount</label>
              <div className="relative max-w-xs">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-medium">$</span>
                <input
                  type="number"
                  value={autoPayAmount}
                  onChange={e => setAutoPayAmount(e.target.value)}
                  placeholder="0"
                  className="w-full border border-blue-200 rounded-xl pl-8 pr-3.5 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <p className="text-xs text-blue-700">
              <CreditCard className="w-3.5 h-3.5 inline mr-1" />
              This amount will be charged to your payment method each week, starting from the contract start date.
            </p>
          </div>
        )}
      </section>

      <div className="border-t border-gray-100" />

      {/* ── FAQ Accordions ── */}
      <section>
        <SectionHeading title="Learn more" />
        <div className="space-y-2.5">
          <Accordion
            title="What is a Contract Initiation Fee?"
            icon={<HelpCircle className="w-4 h-4 text-gray-500" />}
          >
            <p>
              CXOwork charges a one-time <strong>Contract Initiation Fee</strong> of <strong>$99</strong> when you send an offer and the advisor accepts.
              This covers vetting, NDA administration, and onboarding support. The fee is charged to your payment method on file only after both parties confirm the engagement.
            </p>
          </Accordion>

          <Accordion
            title="Add automatic weekly payments"
            icon={<CreditCard className="w-4 h-4 text-gray-500" />}
          >
            <p>
              Weekly payments let you pre-schedule a recurring payment to your advisor, separate from hourly billing.
              This is useful for retainer-style arrangements — for example, a flat $3,000/week regardless of exact hours.
              You can pause or cancel automatic payments at any time from your Contracts page.
            </p>
          </Accordion>

          <Accordion
            title="How do hourly contracts work?"
            icon={<HelpCircle className="w-4 h-4 text-gray-500" />}
          >
            <p>
              With hourly contracts, the advisor logs their hours in the CXOwork app. At the end of each week, you're billed for the hours worked — up to the weekly limit you set.
              You can review the work diary before payment is processed. Payments are released to the advisor 5 days after billing, giving you time to raise any disputes.
            </p>
          </Accordion>
        </div>
      </section>

      <div className="border-t border-gray-100" />

      {/* ── Terms of service ── */}
      <section>
        <label className="flex items-start gap-3 cursor-pointer group">
          <div
            onClick={() => setTosChecked(v => !v)}
            className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition ${tosChecked ? "border-blue-600 bg-blue-600" : "border-gray-300 bg-white group-hover:border-blue-400"}`}
          >
            {tosChecked && <Check className="w-3 h-3 text-white" />}
          </div>
          <span className="text-sm text-gray-500">
            I have read and agree to the{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">CXOwork Terms of Service</a>,{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">Privacy Policy</a>, and{" "}
            <a href="#" className="text-blue-600 hover:underline font-medium">Marketplace Terms</a>.
          </span>
        </label>
      </section>

      {/* ── CTA ── */}
      <div className="pt-2 pb-8">
        <button
          disabled={!contractTitle.trim() || !tosChecked}
          onClick={() => setSent(true)}
          className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" /> Send offer
        </button>
        <p className="text-[11px] text-gray-500 mt-2">
          The advisor has 7 days to accept or decline. You won't be charged until both parties confirm.
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SendOfferPageInner() {
  const router = useRouter();
  const params = useSearchParams();
  const advisorId = params.get("advisorId") || Object.keys(MOCK_ADVISORS)[0] || "";

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Top nav bar */}
      <div className="flex items-center justify-between mb-6 pb-5 border-b border-gray-200">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <Stepper current={2} />
        <div className="w-16" /> {/* spacer to center stepper */}
      </div>

      <h1 className="font-display text-[1.75rem] font-bold tracking-tight text-gray-900 mb-1">Send an offer</h1>
      <p className="text-gray-500 text-sm mb-8">Review the terms and send your offer to get started.</p>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-start">
        <SendOfferForm advisorId={advisorId} />
        <AdvisorCard advisorId={advisorId} />
      </div>
    </div>
  );
}

export default function SendOfferPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-sm text-gray-500">Loading…</div>}>
      <SendOfferPageInner />
    </Suspense>
  );
}
