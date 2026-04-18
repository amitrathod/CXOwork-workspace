"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import { Rocket, TrendingUp, LayoutGrid } from "lucide-react"

const BLUE = "#2563EB"
const BLUE_LIGHT = "#f3f4f6"
const BLUE_MID = "rgba(37,99,235,0.18)"

const stages = [
  {
    Icon: Rocket,
    title: "Seed to Series A",
    description:
      "Building the foundation. Matching you with 'Scrappy Architects' who specialise in product-market fit and initial team structures.",
    tags: ["Scale-Up Readiness", "Founder Partnership"],
  },
  {
    Icon: TrendingUp,
    title: "Growth & Expansion",
    description:
      "Optimisation at scale. Operators who have led Series B through Pre-IPO, focusing on operational efficiency and market dominance.",
    tags: ["Global Operations", "Profitability Models"],
  },
  {
    Icon: LayoutGrid,
    title: "Turnaround & Pivot",
    description:
      "Precision restructuring. Seasoned veterans who excel in high-stakes environments, restructuring for renewed velocity.",
    tags: ["Crisis Management", "Revenue Recovery"],
  },
]

export function StageSolutions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      ref={ref}
      id="stage-solutions"
      className="py-20 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, rgba(59,130,246,0.04) 0%, rgba(37,99,235,0.02) 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Right Fit. Every Stage.
          </p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Solutions for Every Stage.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            The requirements of a leader shift as your company evolves. We match
            the specific &ldquo;Stage DNA&rdquo; of our CXOs to your current
            architectural needs.
          </p>
        </motion.div>

        {/* Stage Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {stages.map((stage, i) => (
            <motion.div
              key={stage.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="card-glow group rounded-2xl bg-card p-7"
              style={{
                border: "1px solid rgba(229,231,235,1)",
                boxShadow: "0 2px 12px rgba(37,99,235,0.05), 0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              {/* Icon badge */}
              <div
                className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: BLUE_LIGHT }}
              >
                <stage.Icon
                  className="h-5 w-5"
                  style={{ color: "#9ca3af" }}
                  strokeWidth={1.8}
                />
              </div>

              {/* Title */}
              <h3 className="font-display text-lg font-semibold text-foreground">
                {stage.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {stage.description}
              </p>

              {/* Tags — TalentHive-style chip pills */}
              <div className="mt-5 flex flex-wrap gap-2">
                {stage.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tag-blue px-2.5 py-1 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
