"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"

const AVATAR_COLORS = [
  { bg: "rgba(37,99,235,0.12)", text: "#2563EB" },
  { bg: "rgba(59,130,246,0.10)", text: "#3B82F6" },
  { bg: "rgba(37,99,235,0.15)", text: "#2563EB" },
  { bg: "rgba(29,78,216,0.10)", text: "#1D4ED8" },
  { bg: "rgba(59,130,246,0.08)", text: "#3B82F6" },
  { bg: "rgba(37,99,235,0.12)", text: "#2563EB" },
]

const col1 = [
  {
    name: "Sarah K.",
    title: "CEO, FinTrack",
    initials: "SK",
    color: 0,
    quote: "We needed a fractional CFO fast — our Series A close was 6 weeks out. CXOwork matched us with someone in 3 days who had done 11 SaaS fundraises. We closed on time.",
  },
  {
    name: "Marcus T.",
    title: "Co-Founder, Launchpad.io",
    initials: "MT",
    color: 1,
    quote: "Our GTM was broken. Within 2 weeks of engaging our CXOwork CMO advisor, we had a new ICP, a repositioned message, and our first enterprise pipeline. Game changer.",
  },
  {
    name: "Priya M.",
    title: "CEO, DataNest",
    initials: "PM",
    color: 2,
    quote: "I was spending 40% of my time on engineering decisions I wasn't qualified to make. Our fractional CTO stepped in and in 90 days rebuilt the team structure and cut our deploy time by 70%.",
  },
  {
    name: "James R.",
    title: "Founder, GreenFlow",
    initials: "JR",
    color: 3,
    quote: "CXOwork found us a COO who had scaled two climate-tech companies. She operationalized our entire growth engine in under a quarter. Couldn't have done it without this platform.",
  },
  {
    name: "Fatima A.",
    title: "CEO, Trellis Health",
    initials: "FA",
    color: 4,
    quote: "We were burning cash with no financial visibility. Our fractional CFO built our first real P&L model, renegotiated vendor contracts, and saved us $400k in year one.",
  },
]

const col2 = [
  {
    name: "Elena V.",
    title: "CEO, Medlytics",
    initials: "EV",
    color: 5,
    quote: "In 60 days our fractional CMO took us from zero brand presence to 3 enterprise pilots. She had done this exact motion at two other health-tech scaleups. The fit was uncanny.",
  },
  {
    name: "David C.",
    title: "Co-Founder, CloudPulse",
    initials: "DC",
    color: 0,
    quote: "Our CFO advisor helped us restructure the cap table, build an investor data room, and close our Series A in 14 weeks. Worth every dollar — and then some.",
  },
  {
    name: "Tanya B.",
    title: "CEO, HireLoop",
    initials: "TB",
    color: 1,
    quote: "Our strategic advisor had direct relationships with the enterprise procurement teams we were trying to crack. Three warm intros. Two pilots. One customer that's now 30% of ARR.",
  },
  {
    name: "Omar F.",
    title: "Founder, TradeStack",
    initials: "OF",
    color: 2,
    quote: "We had a legacy codebase and a team that was burning out. Our fractional CTO rewrote the engineering culture in 45 days — new rituals, new architecture, new energy. Still going strong.",
  },
  {
    name: "Ravi S.",
    title: "Co-Founder, Kerno",
    initials: "RS",
    color: 3,
    quote: "I was skeptical about fractional executives. Our CXOwork CFO changed my mind on day one. He had seen our exact situation at 4 other infra startups. The pattern recognition alone was worth it.",
  },
]

const col3 = [
  {
    name: "Lisa N.",
    title: "CEO, Vaultly",
    initials: "LN",
    color: 4,
    quote: "48 hours from intake to first advisor call. The matching was shockingly accurate — our fractional COO had built exactly the kind of fintech ops layer we needed. We were live in a week.",
  },
  {
    name: "Ryan K.",
    title: "Co-Founder, Sprinto",
    initials: "RK",
    color: 5,
    quote: "We were growing fast with zero process. Our COO advisor from CXOwork installed our OKR framework, hiring pipeline, and vendor stack in 60 days. We 3x'd headcount without chaos.",
  },
  {
    name: "Ananya S.",
    title: "CEO, LegalBridge",
    initials: "AS",
    color: 0,
    quote: "Our CMO advisor had 20 years in legaltech. She knew every content play, every influencer, every conference. Our inbound pipeline grew 4x in one quarter. Totally worth it.",
  },
  {
    name: "Chris W.",
    title: "Founder, NexaHR",
    initials: "CW",
    color: 1,
    quote: "CXOwork's CFO match helped us close our Series B. He ran investor comms, modelled scenarios, and coached me through every tough question in the data room. Absolutely indispensable.",
  },
  {
    name: "Isabelle M.",
    title: "CEO, Formly",
    initials: "IM",
    color: 2,
    quote: "We had great product-market fit but no repeatable sales motion. Our fractional CRO built the entire playbook in 8 weeks. First enterprise deal closed 3 weeks after that.",
  },
]

function Avatar({ initials, colorIndex }: { initials: string; colorIndex: number }) {
  const c = AVATAR_COLORS[colorIndex % AVATAR_COLORS.length]
  return (
    <div
      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold"
      style={{ backgroundColor: c.bg, color: c.text }}
    >
      {initials}
    </div>
  )
}

function TestimonialCard({ name, title, initials, color, quote }: {
  name: string; title: string; initials: string; color: number; quote: string
}) {
  return (
    <div
      className="rounded-2xl p-5 text-left"
      style={{
        border: "1px solid rgba(229,231,235,1)",
        backgroundColor: "rgba(59,130,246,0.02)",
        boxShadow: "0 2px 12px rgba(37,99,235,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        marginBottom: "16px",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-3">
        <Avatar initials={initials} colorIndex={color} />
        <div>
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-xs text-gray-500">{title}</p>
        </div>
        {/* LinkedIn badge */}
        <div
          className="ml-auto flex h-6 w-6 flex-shrink-0 items-center justify-center rounded"
          style={{ backgroundColor: "#0A66C2" }}
        >
          <svg viewBox="0 0 16 16" fill="white" className="h-3.5 w-3.5">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
          </svg>
        </div>
      </div>
      {/* Quote */}
      <p className="text-sm leading-relaxed text-gray-600">
        &ldquo;{quote}&rdquo;
      </p>
    </div>
  )
}

function ScrollColumn({ cards, duration, direction = "up" }: {
  cards: typeof col1
  duration: number
  direction?: "up" | "down"
}) {
  // Duplicate cards for seamless loop
  const doubled = [...cards, ...cards]

  return (
    <div className="relative overflow-hidden" style={{ height: "520px" }}>
      {/* Top fade */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 z-10"
        style={{
          height: "80px",
          background: "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
        }}
      />
      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 z-10"
        style={{
          height: "80px",
          background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
        }}
      />

      <div
        style={{
          animation: `scroll${direction === "up" ? "Up" : "Down"} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((card, i) => (
          <TestimonialCard key={i} {...card} />
        ))}
      </div>
    </div>
  )
}

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} id="testimonials" className="bg-background py-20 md:py-28 overflow-hidden">
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Realised Impact
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Don&apos;t just take our word for it.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            Founders and CEOs share how the right fractional executive — found fast — changed the trajectory of their company.
          </p>
        </motion.div>

        {/* 3-column scroll grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          <ScrollColumn cards={col1} duration={32} direction="up" />
          <div className="hidden sm:block">
            <ScrollColumn cards={col2} duration={38} direction="down" />
          </div>
          <div className="hidden lg:block">
            <ScrollColumn cards={col3} duration={34} direction="up" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
