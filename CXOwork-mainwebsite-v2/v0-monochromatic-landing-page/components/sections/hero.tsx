"use client"

import { motion } from "motion/react"
import { Calendar } from "lucide-react"

export function Hero() {
  const subtitleText =
    "CXOwork connects growing companies with battle-tested fractional CFOs, CMOs, CTOs and COOs — without the full-time cost or six-month search."

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#06091A", minHeight: "680px" }}
    >
      {/* Layer 1 — dim dot grid (always visible) */}
      <div className="hero-dots-dim" />

      {/* Layer 2 — bright dots revealed by animated sweep mask */}
      <div className="hero-dots-bright" />

      {/* Layer 3 — static blue radial glow pools */}
      <div className="hero-glow" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-36 pb-28 text-center md:pt-40 md:pb-32">

        {/* Announcement badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.14)",
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Fractional Executives. Real Impact. Zero Search Fees.
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mx-auto max-w-3xl font-display text-5xl font-bold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl"
          style={{ color: "#ffffff" }}
        >
          Executive talent,
          <br />
          <span style={{ color: "#3B5BFF" }}>on your terms.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-7 max-w-xl text-center text-sm leading-relaxed md:text-base"
          style={{ color: "rgba(255,255,255,0.50)" }}
        >
          {subtitleText}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          {/* Primary — solid blue, high contrast on dark bg */}
          <a
            href="/get-started"
            className="btn-blue-gradient animate-glow-pulse inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold"
          >
            Get Matched Now →
          </a>

          {/* Secondary — ghost with white border */}
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-medium transition-colors"
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.75)",
              background: "rgba(255,255,255,0.04)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = "rgba(255,255,255,0.35)"
              el.style.color = "#fff"
              el.style.background = "rgba(255,255,255,0.08)"
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = "rgba(255,255,255,0.18)"
              el.style.color = "rgba(255,255,255,0.75)"
              el.style.background = "rgba(255,255,255,0.04)"
            }}
          >
            <Calendar className="h-4 w-4 opacity-60" />
            Schedule Consultation Now
          </a>
        </motion.div>

      </div>
    </section>
  )
}
