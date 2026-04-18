"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"

const BLUE = "#9ca3af"
const BLUE_LIGHT = "rgba(156,163,175,0.18)"
const BLUE_MID = "rgba(156,163,175,0.28)"
const BLUE_DARK = "#6b7280"

// Illustration 01 — intake form with search/profile
function IllustrationDefine() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Background card */}
      <rect x="60" y="24" width="140" height="152" rx="12" fill="white" stroke={BLUE_MID} strokeWidth="1.5"/>
      {/* Header bar */}
      <rect x="60" y="24" width="140" height="32" rx="12" fill={BLUE_LIGHT}/>
      <rect x="60" y="44" width="140" height="12" fill={BLUE_LIGHT}/>
      {/* Avatar circle */}
      <circle cx="80" cy="40" r="10" fill={BLUE} opacity="0.15"/>
      <circle cx="80" cy="38" r="4" fill={BLUE} opacity="0.6"/>
      <path d="M73 49c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      {/* Title line */}
      <rect x="96" y="34" width="60" height="5" rx="2.5" fill={BLUE} opacity="0.3"/>
      <rect x="96" y="42" width="40" height="4" rx="2" fill={BLUE} opacity="0.18"/>
      {/* Divider */}
      <line x1="72" y1="62" x2="188" y2="62" stroke={BLUE_MID} strokeWidth="1"/>
      {/* Form rows */}
      {[78, 98, 118, 138].map((y, i) => (
        <g key={i}>
          <rect x="72" y={y} width="10" height="10" rx="2" fill={i < 2 ? BLUE : "white"} stroke={BLUE} strokeWidth="1.2" opacity={i < 2 ? 0.9 : 0.4}/>
          {i < 2 && <path d={`M${74} ${y+5} l2.5 2.5 4-4`} stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>}
          <rect x="88" y={y+2} width={i === 0 ? 70 : i === 1 ? 55 : i === 2 ? 80 : 45} height="5" rx="2.5" fill={BLUE} opacity={i < 2 ? 0.25 : 0.12}/>
        </g>
      ))}
      {/* Search loupe overlay */}
      <circle cx="188" cy="60" r="28" fill="white" stroke={BLUE_MID} strokeWidth="1"/>
      <circle cx="185" cy="57" r="14" fill={BLUE_LIGHT} stroke={BLUE} strokeWidth="2"/>
      <circle cx="185" cy="57" r="8" fill="white" stroke={BLUE} strokeWidth="1.5"/>
      <line x1="196" y1="68" x2="206" y2="78" stroke={BLUE} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Sparkle dots */}
      <circle cx="52" cy="80" r="4" fill={BLUE} opacity="0.15"/>
      <circle cx="240" cy="40" r="3" fill={BLUE} opacity="0.2"/>
      <circle cx="228" cy="150" r="5" fill={BLUE} opacity="0.1"/>
    </svg>
  )
}

// Illustration 02 — matched advisors / connected profiles
function IllustrationMatch() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Centre hub */}
      <circle cx="160" cy="100" r="26" fill={BLUE} opacity="0.12"/>
      <circle cx="160" cy="100" r="18" fill={BLUE} opacity="0.2"/>
      {/* Centre icon — checkmark star */}
      <path d="M152 100 l5 5 11-11" stroke={BLUE_DARK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Left profile card */}
      <rect x="28" y="64" width="68" height="72" rx="10" fill="white" stroke={BLUE_MID} strokeWidth="1.5"/>
      <circle cx="62" cy="86" r="12" fill={BLUE_LIGHT}/>
      <circle cx="62" cy="83" r="5" fill={BLUE} opacity="0.5"/>
      <path d="M50 100c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <rect x="38" y="108" width="48" height="4" rx="2" fill={BLUE} opacity="0.2"/>
      <rect x="44" y="116" width="36" height="3" rx="1.5" fill={BLUE} opacity="0.12"/>
      {/* Star badge on left card */}
      <circle cx="90" cy="68" r="10" fill={BLUE}/>
      <path d="M90 62 l1.5 4h4.2l-3.4 2.5 1.3 4L90 70l-3.6 2.5 1.3-4L84.3 66h4.2z" fill="white" opacity="0.9" transform="scale(0.7) translate(65 50)"/>
      <text x="87" y="72" fontSize="8" fill="white" fontWeight="700">★</text>
      {/* Right profile card */}
      <rect x="224" y="64" width="68" height="72" rx="10" fill="white" stroke={BLUE_MID} strokeWidth="1.5"/>
      <circle cx="258" cy="86" r="12" fill={BLUE_LIGHT}/>
      <circle cx="258" cy="83" r="5" fill={BLUE} opacity="0.5"/>
      <path d="M246 100c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <rect x="234" y="108" width="48" height="4" rx="2" fill={BLUE} opacity="0.2"/>
      <rect x="240" y="116" width="36" height="3" rx="1.5" fill={BLUE} opacity="0.12"/>
      {/* Score badge on right */}
      <rect x="222" y="58" width="36" height="16" rx="8" fill={BLUE}/>
      <text x="228" y="70" fontSize="8" fill="white" fontWeight="700">98% fit</text>
      {/* Connecting lines */}
      <line x1="96" y1="100" x2="134" y2="100" stroke={BLUE} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>
      <line x1="186" y1="100" x2="224" y2="100" stroke={BLUE} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>
      {/* Bottom third card (smaller) */}
      <rect x="106" y="148" width="108" height="36" rx="8" fill="white" stroke={BLUE_MID} strokeWidth="1.5"/>
      <circle cx="122" cy="166" r="8" fill={BLUE_LIGHT}/>
      <circle cx="122" cy="164" r="3.5" fill={BLUE} opacity="0.5"/>
      <rect x="136" y="161" width="50" height="3.5" rx="1.75" fill={BLUE} opacity="0.2"/>
      <rect x="136" y="168" width="36" height="3" rx="1.5" fill={BLUE} opacity="0.12"/>
      {/* Connecting line to bottom */}
      <line x1="160" y1="126" x2="160" y2="148" stroke={BLUE} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.5"/>
    </svg>
  )
}

// Illustration 03 — dashboard / measure ROI
function IllustrationMeasure() {
  return (
    <svg viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Main dashboard card */}
      <rect x="50" y="20" width="220" height="148" rx="12" fill="white" stroke={BLUE_MID} strokeWidth="1.5"/>
      {/* Top bar */}
      <rect x="50" y="20" width="220" height="30" rx="12" fill={BLUE_LIGHT}/>
      <rect x="50" y="38" width="220" height="12" fill={BLUE_LIGHT}/>
      {/* Traffic lights */}
      <circle cx="66" cy="35" r="5" fill={BLUE} opacity="0.25"/>
      <circle cx="80" cy="35" r="5" fill={BLUE} opacity="0.45"/>
      <circle cx="94" cy="35" r="5" fill={BLUE} opacity="0.75"/>
      {/* Title line */}
      <rect x="108" y="31" width="80" height="5" rx="2.5" fill={BLUE} opacity="0.2"/>
      {/* KPI row */}
      {[
        { x: 64, label: "ROI", val: "3.2×" },
        { x: 148, label: "Milestones", val: "8/10" },
        { x: 228, label: "NPS", val: "72" },
      ].map((kpi, i) => (
        <g key={i}>
          <rect x={kpi.x - 24} y="62" width="56" height="36" rx="8" fill={BLUE_LIGHT}/>
          <text x={kpi.x} y="80" textAnchor="middle" fontSize="11" fill={BLUE_DARK} fontWeight="700">{kpi.val}</text>
          <text x={kpi.x} y="91" textAnchor="middle" fontSize="7" fill={BLUE} opacity="0.6">{kpi.label}</text>
        </g>
      ))}
      {/* Bar chart */}
      <line x1="64" y1="154" x2="260" y2="154" stroke={BLUE_MID} strokeWidth="1"/>
      {[
        { x: 78, h: 30, op: 0.25 },
        { x: 104, h: 48, op: 0.35 },
        { x: 130, h: 38, op: 0.25 },
        { x: 156, h: 60, op: 0.5 },
        { x: 182, h: 44, op: 0.35 },
        { x: 208, h: 74, op: 0.7 },
        { x: 234, h: 88, op: 1 },
      ].map((bar, i) => (
        <rect key={i} x={bar.x - 9} y={154 - bar.h} width="18" height={bar.h} rx="4" fill={BLUE} opacity={bar.op}/>
      ))}
      {/* Trend line */}
      <polyline
        points="78,124 104,106 130,116 156,94 182,100 208,80 234,66"
        stroke={BLUE_DARK} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* Up arrow badge */}
      <circle cx="256" cy="36" r="12" fill={BLUE}/>
      <path d="M256 42 L256 30 M251 35 L256 30 L261 35" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Floating dots */}
      <circle cx="38" cy="60" r="5" fill={BLUE} opacity="0.15"/>
      <circle cx="290" cy="140" r="4" fill={BLUE} opacity="0.15"/>
    </svg>
  )
}

const platforms = [
  {
    step: "01",
    title: "Define your leadership gap",
    description:
      "Complete a quick intake in just 10 minutes. We learn your stage, industry, challenges, and what kind of executive you need.",
    Illustration: IllustrationDefine,
  },
  {
    step: "02",
    title: "Meet matched advisors",
    description:
      "Receive 3-5 pre-vetted executives with fit scores based on experience, availability, and alignment to your goals.",
    Illustration: IllustrationMatch,
  },
  {
    step: "03",
    title: "Engage and measure",
    description:
      "Start with milestone-based contracts. Track progress and ROI through real-time dashboards — not hours logged.",
    Illustration: IllustrationMeasure,
  },
]

export function Platforms() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="platforms" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            How It Works
          </p>
          <h2 className="max-w-lg font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">
              Fractional C-level exec fitting to your venture
            </span>
          </h2>
        </motion.div>

        {/* Platform Cards Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {platforms.map((platform, i) => (
            <motion.div
              key={platform.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="card-glow group overflow-hidden rounded-2xl bg-card"
              style={{
                border: "1px solid rgba(229,231,235,1)",
              }}
            >
              {/* Illustration area */}
              <div
                className="relative flex items-center justify-center overflow-hidden"
                style={{
                  background: "#f9fafb",
                  aspectRatio: "16/10",
                  padding: "16px",
                }}
              >
                <platform.Illustration />
                {/* Step badge */}
                <div
                  className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: "#4b5563", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}
                >
                  {platform.step}
                </div>
              </div>

              {/* Text */}
              <div className="px-6 py-5">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {platform.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {platform.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
