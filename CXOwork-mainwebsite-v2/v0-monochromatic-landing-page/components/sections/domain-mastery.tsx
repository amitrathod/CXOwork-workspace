"use client"

import { motion, useInView } from "motion/react"
import { useRef, useEffect, useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import Link from "next/link"
import { MapPin, Users, Clock, Target, ThumbsUp, ArrowRight } from "lucide-react"

// ─── Advisor data (same as hero) ───────────────────────────────────────────
const advisors = [
  {
    role: "Fractional CFO | Fintech & SaaS Finance Leader",
    location: "San Francisco, CA",
    bio: "Former VP Finance at Stripe — 15+ years building SaaS metrics frameworks and advising on Series A–C fundraising.",
    tags: ["Financial Modeling", "SaaS Metrics", "Fundraising", "Fintech"],
  },
  {
    role: "Strategic Advisor | Enterprise Partnerships & APAC Market Entry",
    location: "New York, NY",
    bio: "Ex-McKinsey partner with 20+ years in corporate strategy, APAC market entry, and Fortune 500 M&A due diligence.",
    tags: ["Strategy", "APAC", "Partnerships", "M&A"],
  },
  {
    role: "GTM Advisor | Product-Led Growth & Sales Enablement",
    location: "Austin, TX",
    bio: "Built GTM engines for 3 unicorns from $1M to $50M ARR with deep expertise in product-led growth and B2B SaaS.",
    tags: ["GTM", "PLG", "Sales Enablement", "B2B SaaS"],
  },
  {
    role: "Fractional CTO | Platform Architecture & Engineering Leadership",
    location: "Seattle, WA",
    bio: "Former CTO at two acquired Series C startups, scaling engineering teams from 5 to 80+ with AI/ML product depth.",
    tags: ["Architecture", "Eng Leadership", "AI/ML", "Cloud"],
  },
  {
    role: "Fractional CMO | Brand Strategy & Demand Generation",
    location: "Boston, MA",
    bio: "Former CMO at HubSpot — drove 3× pipeline growth through integrated brand and demand programs for B2B SaaS.",
    tags: ["Brand Strategy", "Demand Gen", "B2B SaaS", "Growth"],
  },
  {
    role: "Fractional COO | Operations & Scale Excellence",
    location: "Chicago, IL",
    bio: "Ex-Amazon operations leader who scaled 5 divisions from $10M to $200M+ through process automation and OKRs.",
    tags: ["Operations", "Supply Chain", "Process Design", "OKRs"],
  },
]

// ─── Stats ──────────────────────────────────────────────────────────────────
const stats = [
  { icon: Users,    value: "500+",   label: "Vetted Executives" },
  { icon: Clock,    value: "15+ Yrs", label: "Avg. Experience" },
  { icon: Target,   value: "1.2k",   label: "Missions Completed" },
  { icon: ThumbsUp, value: "99.8%",  label: "Client Satisfaction" },
]

// ─── Vetting steps ──────────────────────────────────────────────────────────
const vettingSteps = [
  { step: "01", label: "Application & Profile Review" },
  { step: "02", label: "Expert Panel Interview" },
  { step: "03", label: "Domain & Case Assessment" },
  { step: "04", label: "Reference Verification" },
]

// ─── Carousel ───────────────────────────────────────────────────────────────
function AdvisorCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    dragFree: true,
  })

  const autoplay = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    const timer = setInterval(autoplay, 3200)
    return () => clearInterval(timer)
  }, [autoplay])

  return (
    <div className="w-full overflow-hidden" ref={emblaRef}>
      <div className="flex py-3" style={{ alignItems: "stretch" }}>
        {advisors.map((a, i) => (
          <div key={i} className="flex-none flex" style={{ paddingRight: "16px", minWidth: 0 }}>
            <div
              className="card-glow w-80 rounded-2xl text-left flex flex-col"
              style={{
                border: "1px solid rgba(229,231,235,1)",
                background: "#ffffff",
                padding: "20px 22px 22px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              {/* Silhouette avatar */}
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full" style={{ background: "#f3f4f6", border: "1px solid #e5e7eb" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="8" r="4" fill="#d1d5db"/>
                  <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" fill="#d1d5db"/>
                </svg>
              </div>
              <p className="text-sm font-semibold leading-snug mb-2" style={{ color: "#1a1a1a" }}>
                {a.role}
              </p>
              <div className="flex items-center gap-1.5 mb-3">
                <MapPin className="h-3 w-3 flex-shrink-0" style={{ color: "#9ca3af" }} />
                <span className="text-xs font-medium" style={{ color: "#6b7280" }}>{a.location}</span>
              </div>
              <div className="mb-3" style={{ height: "1px", backgroundColor: "rgba(229,231,235,1)" }} />
              <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "#4b5563" }}>
                {a.bio}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {a.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                    style={{
                      border: "1px solid #d1d5db",
                      background: "#f3f4f6",
                      color: "#6b7280",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Main Section ────────────────────────────────────────────────────────────
export function DomainMastery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section ref={ref} id="domain-mastery" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Curated Expertise
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            C-Suite Domain Mastery.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Every advisor is hand-selected for their specific domain, industry, and
            company-stage experience — not just their credentials.
          </p>
        </motion.div>

        {/* ── Stats + Vetting (merged) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-14 overflow-hidden rounded-2xl"
          style={{
            border: "1px solid #e5e7eb",
            background: "#fafafa",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          {/* Stats row */}
          <div
            className="grid grid-cols-2 gap-px md:grid-cols-4"
            style={{ borderBottom: "1px solid rgba(229,231,235,1)", background: "rgba(229,231,235,1)" }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.18 + i * 0.07 }}
                className="flex flex-col items-center justify-center py-8 px-4 text-center"
                style={{ background: "rgba(250,251,255,1)" }}
              >
                <s.icon className="mb-2.5 h-4.5 w-4.5" style={{ color: "#9ca3af", width: "1.125rem", height: "1.125rem" }} />
                <span
                  className="font-display text-4xl font-bold tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #60A5FA 0%, #2563EB 60%, #4F46E5 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {s.value}
                </span>
                <span className="mt-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Vetting section */}
          <div className="px-8 py-8">
            <div className="mb-6 text-center">
              <p className="text-base font-bold text-foreground">
                Only the top 4% of applicants make it through.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Every CXO in our network passes a rigorous 4-stage vetting process before you ever see their profile.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {vettingSteps.map((v, i) => (
                <div
                  key={v.step}
                  className="flex items-center rounded-xl px-4 py-3"
                  style={{
                    background: "#f3f4f6",
                    border: "1px solid #d1d5db",
                  }}
                >
                  <span className="text-xs font-medium leading-snug" style={{ color: "#0a0a0a" }}>
                    {v.step} : {v.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Advisor Carousel ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <AdvisorCarousel />
        </motion.div>

        {/* ── CTAs ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/get-started"
            className="btn-blue-gradient rounded-full px-8 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Schedule Consultation Now
          </Link>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-sm font-semibold transition-colors hover:border-foreground/60"
            style={{ borderColor: "#0a0a0a", color: "#0a0a0a" }}
          >
            Find the Right Match
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
