"use client"

import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"
import { useState } from "react"

const roles = [
  "Fractional CTO", "Fractional CMO", "Fractional CRO / Sales Leader",
  "Fractional CPO / Product Leader", "Fractional COO", "Fractional CFO",
  "Fractional CHRO / People Leader", "Fractional Design Leader",
  "Fractional CDO / Data Leader", "Fractional General Counsel",
]

const stages = ["Seed", "Series A", "Series B", "Series C+", "Any stage"]
const hours  = ["5–10 hrs/week", "10–15 hrs/week", "15–20 hrs/week", "20+ hrs/week"]

export default function AdvisorApply() {
  const [submitted, setSubmitted] = useState(false)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedStages, setSelectedStages] = useState<string[]>([])
  const [selectedHours, setSelectedHours] = useState("")

  const toggle = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val])
  }

  if (submitted) {
    return (
      <>
        <Header />
        <main className="flex min-h-[70vh] items-center justify-center bg-white px-6 py-24">
          <div className="text-center max-w-md">
            <div
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
            >
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-gray-900">Application received!</h1>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Thank you for applying to CXOwork. Our expert panel reviews every application within 48 hours. We'll reach out to schedule your panel interview.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white"
                style={{ background: "#0a0a0a" }}
              >
                Back to home
              </Link>
              <Link
                href="/become-an-advisor"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border px-6 py-3 text-sm font-medium text-gray-600"
                style={{ borderColor: "#e5e7eb" }}
              >
                See all roles
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="bg-white">

        {/* Breadcrumb */}
        <div className="border-b border-gray-100 bg-gray-50 py-4">
          <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 text-sm text-gray-400">
            <Link href="/become-an-advisor" className="flex items-center gap-1 hover:text-gray-700 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to all roles
            </Link>
          </div>
        </div>

        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-6">

            {/* Header */}
            <div className="mb-10">
              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-gray-400">Advisor Application</p>
              <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                Apply to join CXOwork
              </h1>
              <p className="mt-3 text-base leading-relaxed text-gray-500">
                Takes under 10 minutes. We review every application within 48 hours. No placement fees, ever.
              </p>
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
              className="space-y-8"
            >

              {/* Personal info */}
              <div
                className="rounded-2xl p-7 space-y-5"
                style={{ border: "1px solid #e5e7eb", background: "#fafafa" }}
              >
                <h2 className="font-display text-lg font-semibold text-gray-900">Your details</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">First name <span className="text-red-400">*</span></label>
                    <input required className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Last name <span className="text-red-400">*</span></label>
                    <input required className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Email address <span className="text-red-400">*</span></label>
                  <input required type="email" className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">LinkedIn profile URL <span className="text-red-400">*</span></label>
                  <input required type="url" className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" placeholder="https://linkedin.com/in/janesmith" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Current location</label>
                  <input className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors" placeholder="San Francisco, CA" />
                </div>
              </div>

              {/* Role selection */}
              <div
                className="rounded-2xl p-7 space-y-4"
                style={{ border: "1px solid #e5e7eb", background: "#fafafa" }}
              >
                <div>
                  <h2 className="font-display text-lg font-semibold text-gray-900">Which role(s) are you applying for?</h2>
                  <p className="mt-1 text-xs text-gray-400">Select all that apply</p>
                </div>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggle(selectedRoles, setSelectedRoles, role)}
                      className="rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all"
                      style={{
                        borderColor: selectedRoles.includes(role) ? "#0a0a0a" : "#e5e7eb",
                        background: selectedRoles.includes(role) ? "#0a0a0a" : "#ffffff",
                        color: selectedRoles.includes(role) ? "#ffffff" : "#374151",
                      }}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div
                className="rounded-2xl p-7 space-y-5"
                style={{ border: "1px solid #e5e7eb", background: "#fafafa" }}
              >
                <h2 className="font-display text-lg font-semibold text-gray-900">Your experience</h2>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Years of senior leadership experience <span className="text-red-400">*</span></label>
                  <select required className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors">
                    <option value="">Select…</option>
                    <option>5–8 years</option>
                    <option>8–12 years</option>
                    <option>12–20 years</option>
                    <option>20+ years</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Preferred company stage <span className="text-red-400">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {stages.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => toggle(selectedStages, setSelectedStages, s)}
                        className="rounded-full border px-4 py-2 text-xs font-medium transition-all"
                        style={{
                          borderColor: selectedStages.includes(s) ? "#0a0a0a" : "#e5e7eb",
                          background: selectedStages.includes(s) ? "#0a0a0a" : "#ffffff",
                          color: selectedStages.includes(s) ? "#ffffff" : "#6b7280",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Available hours per week <span className="text-red-400">*</span></label>
                  <div className="flex flex-wrap gap-2">
                    {hours.map((h) => (
                      <button
                        key={h}
                        type="button"
                        onClick={() => setSelectedHours(h)}
                        className="rounded-full border px-4 py-2 text-xs font-medium transition-all"
                        style={{
                          borderColor: selectedHours === h ? "#0a0a0a" : "#e5e7eb",
                          background: selectedHours === h ? "#0a0a0a" : "#ffffff",
                          color: selectedHours === h ? "#ffffff" : "#6b7280",
                        }}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-gray-600">Monthly rate expectation</label>
                  <select className="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400 transition-colors">
                    <option value="">Select…</option>
                    <option>$3,000–$6,000 / month</option>
                    <option>$6,000–$10,000 / month</option>
                    <option>$10,000–$15,000 / month</option>
                    <option>$15,000–$20,000 / month</option>
                    <option>$20,000+ / month</option>
                  </select>
                </div>
              </div>

              {/* Case study */}
              <div
                className="rounded-2xl p-7 space-y-5"
                style={{ border: "1px solid #e5e7eb", background: "#fafafa" }}
              >
                <div>
                  <h2 className="font-display text-lg font-semibold text-gray-900">Tell us about an outcome</h2>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">
                    Describe one specific engagement or project where you made a measurable impact — include the problem, your actions, and the result.
                  </p>
                </div>
                <div>
                  <textarea
                    required
                    rows={5}
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 outline-none focus:border-gray-400 transition-colors"
                    placeholder="e.g. At Series B SaaS company (ARR $4M), I was brought in as Fractional CRO to rebuild the sales org after a failed VP Sales hire. I restructured territories, redesigned the comp plan, and personally closed 3 enterprise deals in 90 days — growing ARR to $6.8M and reducing average sales cycle by 22%."
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="flex flex-col items-center gap-4">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto sm:px-12"
                  style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.25)" }}
                >
                  Submit Application
                  <ArrowRight className="h-4 w-4" />
                </button>
                <p className="flex items-center gap-1.5 text-xs text-gray-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-gray-300" />
                  Free to apply · No placement fees · Response within 48 hrs
                </p>
              </div>

            </form>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
