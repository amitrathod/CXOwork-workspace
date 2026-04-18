"use client"

import { motion } from "motion/react"
import { Play } from "lucide-react"

export function Hero() {
  const subtitleText =
    "CXOwork connects growing companies with battle-tested fractional CFOs, CMOs, CTOs and COOs — without the full-time cost or six-month search."

  return (
    <section className="px-4 pt-24 pb-0 md:px-6 lg:px-8">
      <div className="mesh-hero grid-overlay relative mx-auto max-w-7xl overflow-hidden rounded-3xl">
        {/* Blue ambient blobs */}
        <div
          className="pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", filter: "blur(48px)" }}
        />
        <div
          className="pointer-events-none absolute bottom-1/3 right-1/4 h-64 w-64 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)", filter: "blur(32px)" }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-6 pt-16 pb-16 text-center md:pt-20 md:pb-20 lg:pt-24 lg:pb-24">

          {/* Announcement badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-6 inline-flex items-center rounded-full px-4 py-2 text-xs font-medium"
            style={{ background: "#e5e7eb", border: "1px solid #9ca3af", color: "#374151" }}
          >
            Fractional Executives. Real Impact. Zero Search Fees.
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto max-w-3xl font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl"
            style={{ color: "#0a0a0a" }}
          >
            Executive talent,
            <br />
            <span style={{ color: "#0a0a0a" }}>
              on your terms.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mx-auto mt-6 max-w-xl text-center text-sm leading-relaxed text-gray-600 md:text-base"
          >
            {subtitleText}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <a
              href="/get-started"
              className="btn-blue-gradient animate-glow-pulse inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold"
            >
              Get Matched Now →
            </a>
            <button
              className="inline-flex items-center gap-2 rounded-2xl border px-7 py-3.5 text-sm font-medium transition-colors hover:border-blue-400/40 hover:text-gray-900"
              style={{ borderColor: "#d1d5db", color: "#374151", backgroundColor: "#fff" }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full"
                style={{ backgroundColor: "#0a0a0a" }}
              >
                <Play className="h-2.5 w-2.5 fill-white text-white" style={{ marginLeft: "1px" }} />
              </span>
              Watch CXOwork in action
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
