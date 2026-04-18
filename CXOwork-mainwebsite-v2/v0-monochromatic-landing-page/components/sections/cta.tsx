"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState } from "react"
import { Check, ArrowRight } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "For Companies",
    description: "Growing businesses needing senior leadership now",
    featured: true,
    cta: "Start as a Company",
    href: "/get-started",
    features: [
      "Startups Seed-Series B",
      "SMBs past $5M",
      "Companies in transition",
      "Boards seeking interim execs",
    ],
  },
  {
    name: "For Advisors",
    description: "Senior operators on their own terms",
    featured: false,
    cta: "Join as an Advisor",
    href: "/become-an-advisor",
    features: [
      "CFOs/CMOs building fractional portfolios",
      "Recently exited executives",
      "Consultants for embedded engagements",
      "Board members extending reach",
    ],
  },
]

function AdvisorCTA({ cta, href }: { cta: string; href: string }) {
  return (
    <a
      href={href}
      className="mt-8 flex items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-all duration-200 hover:border-blue-500/40 hover:text-gray-900"
      style={{ borderColor: "rgba(37,99,235,0.35)", color: "#2563EB" }}
    >
      {cta}
      <ArrowRight className="h-3.5 w-3.5" />
    </a>
  )
}

export function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="cta" aria-labelledby="cta-heading" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid-overlay relative overflow-hidden rounded-3xl px-8 py-14 md:px-12"
          style={{
            background: "#fff",
            border: "1px solid rgba(59,130,246,0.15)",
            boxShadow: "0 4px 32px rgba(37,99,235,0.08)",
          }}
        >
          {/* Top ambient glow */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-32 w-96"
            style={{ background: "radial-gradient(ellipse, rgba(59,130,246,0.08) 0%, transparent 70%)", filter: "blur(20px)" }}
          />

          {/* Header */}
          <div className="relative mb-10 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Built For
            </p>
            <h2
              id="cta-heading"
              className="font-display text-3xl font-bold tracking-tight md:text-4xl"
              style={{ color: "#0a0a0a" }}
            >
              The window is open. Don&apos;t wait.
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground"
            >
              Two sides of the same market. Join 1,200+ companies and advisors
              on CXOwork. No search fees. Just the right executive, right now.
            </p>
          </div>

          {/* Cards */}
          <div className="relative grid items-stretch gap-5 md:grid-cols-2">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + 0.12 * i }}
                className={`group relative flex flex-col rounded-2xl border transition-all duration-300 ${
                  plan.featured
                    ? "text-primary-foreground shadow-2xl"
                    : "bg-card text-foreground hover:border-foreground/20 hover:shadow-lg"
                }`}
                style={
                  plan.featured
                    ? { background: "linear-gradient(135deg, #1a1a1a, #0a0a0a)", borderColor: "transparent", boxShadow: "0 4px 16px rgba(0,0,0,0.20)" }
                    : { borderColor: "rgba(37,99,235,0.30)", borderWidth: "1px", backgroundColor: "rgba(59,130,246,0.04)" }
                }
              >
                <div className="flex flex-1 flex-col p-7">
                  {/* Plan name */}
                  <p
                    className={`text-lg font-semibold ${
                      plan.featured ? "text-primary-foreground" : "text-foreground"
                    }`}
                  >
                    {plan.name}
                  </p>

                  {/* Description */}
                  <p
                    className={`mt-2 text-sm leading-relaxed ${
                      plan.featured
                        ? "text-primary-foreground/60"
                        : "text-muted-foreground"
                    }`}
                  >
                    {plan.description}
                  </p>

                  {/* Divider */}
                  <div
                    className={`my-6 h-px ${
                      plan.featured ? "bg-primary-foreground/10" : "bg-border"
                    }`}
                  />

                  {/* Features */}
                  <ul className="flex-1 space-y-3.5">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span
                          className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                            plan.featured
                              ? "bg-primary-foreground/15"
                              : "bg-foreground/5"
                          }`}
                        >
                          <Check
                            className={`h-2.5 w-2.5 ${
                              plan.featured
                                ? "text-primary-foreground/70"
                                : "text-foreground/60"
                            }`}
                            strokeWidth={3}
                          />
                        </span>
                        <span
                          className={`text-sm leading-snug ${
                            plan.featured
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  {plan.featured ? (
                    <Link
                      href={plan.href}
                      className="mt-8 flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition-all duration-200 bg-primary-foreground text-foreground hover:bg-primary-foreground/90"
                    >
                      {plan.cta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <AdvisorCTA cta={plan.cta} href={plan.href} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
