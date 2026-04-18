"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "motion/react"
import { Plus, Minus } from "lucide-react"
import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"

const faqCategories = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is CXOwork?",
        a: "CXOwork is an executive talent platform that connects growing companies with battle-tested fractional CFOs, CMOs, CTOs and COOs — without the full-time cost or a six-month search. We match companies to senior operators who work on flexible, milestone-driven engagements.",
      },
      {
        q: "Who is CXOwork for?",
        a: "CXOwork serves two sides of a market. For companies: startups from Seed to Series B, SMBs past $5M, and organisations in leadership transition. For advisors: recently exited executives, senior operators building fractional portfolios, consultants looking for embedded engagements, and board members extending their reach.",
      },
      {
        q: "How is CXOwork different from a traditional executive search firm?",
        a: "Traditional search firms take 3–6 months and charge 25–30% of annual salary. CXOwork delivers 3–5 matched advisors within days using AI-assisted fit scoring — and engagements are milestone-based, so you pay for outcomes, not hours. There are no placement fees.",
      },
      {
        q: "What types of fractional executives can I find on CXOwork?",
        a: "You can find fractional CFOs, CMOs, CTOs, COOs, CROs, CPOs, and strategic advisors across functions including finance, go-to-market, product, engineering, operations, and M&A. Advisors span industries from fintech and SaaS to healthcare, climate-tech, and enterprise software.",
      },
    ],
  },
  {
    category: "For Companies",
    questions: [
      {
        q: "How does the matching process work?",
        a: "You complete a 10-minute intake covering your company stage, industry, key challenges, and the type of executive you need. Our platform scores candidates across experience depth, availability, industry fit, and alignment to your goals — then surfaces your top 3–5 matches within 48–72 hours.",
      },
      {
        q: "How quickly can I engage an advisor?",
        a: "Most companies have their first advisor conversation within 48 hours of completing intake. Engagements typically begin within one week of that first call. In urgent situations — such as an imminent fundraise or a sudden leadership gap — we offer an expedited match pathway.",
      },
      {
        q: "What does a typical engagement look like?",
        a: "Engagements are structured around milestones rather than time. A typical engagement includes a scoping session to define deliverables, a milestone roadmap agreed by both parties, bi-weekly check-ins tracked on your Impact Dashboard, and a structured close-out with knowledge transfer. Duration ranges from 60-day sprints to rolling quarterly retainers.",
      },
      {
        q: "How are advisors vetted?",
        a: "Every advisor on CXOwork passes a multi-stage vetting process: credential and background verification, structured competency interviews, reference checks from prior engagements, and a profile review by our editorial team. Advisors maintain a public track record of sessions, client ratings, and outcomes on the platform.",
      },
      {
        q: "What does it cost to hire a fractional executive through CXOwork?",
        a: "There are no search or placement fees. Companies pay advisors directly at agreed milestone rates — typically structured as a monthly retainer or per-deliverable fee. Advisor rates on CXOwork range from $150–$400/hr equivalent, depending on seniority and function. CXOwork charges a small platform fee on each engagement.",
      },
      {
        q: "Can I work with more than one advisor at a time?",
        a: "Yes. Many companies run parallel engagements — for example, a fractional CFO for fundraising preparation alongside a fractional CMO for GTM strategy. Your Engagement Hub lets you manage all active advisors, milestones, and deliverables in one place.",
      },
    ],
  },
  {
    category: "For Advisors",
    questions: [
      {
        q: "How do I join CXOwork as an advisor?",
        a: "Click 'Become an Advisor' and complete your profile — including your career history, functional expertise, industry experience, and availability. Our team reviews applications within 3–5 business days. Approved advisors are immediately visible to matching companies.",
      },
      {
        q: "What kind of engagements will I receive?",
        a: "Engagements are matched to your stated expertise, availability, and preferred engagement type — sprint projects, ongoing retainers, or board advisory roles. You control how many concurrent clients you take on and can pause availability at any time.",
      },
      {
        q: "How does payment work for advisors?",
        a: "You set your own rate during onboarding. When a company accepts your match, you agree on milestone terms directly. CXOwork handles invoicing and payment processing — you receive payment within 5 business days of milestone completion, with no chasing clients for fees.",
      },
      {
        q: "What support does CXOwork provide to advisors?",
        a: "Advisors get access to the Advisor Workspace — a structured environment for onboarding new clients, managing deliverables, sharing documents, and tracking engagement health. We also provide contract templates, engagement playbooks, and a peer advisor community.",
      },
      {
        q: "Can I showcase previous client outcomes on my profile?",
        a: "Yes. After each engagement, clients leave structured outcome reviews linked to your profile — covering quality of advice, speed to impact, and likelihood to rehire. High-performing advisors receive a 'Verified Outcome' badge that increases match visibility.",
      },
    ],
  },
  {
    category: "Platform & Engagements",
    questions: [
      {
        q: "What is the Impact Dashboard?",
        a: "The Impact Dashboard is your real-time view of every active engagement — milestone progress, advisor activity, ROI metrics, and upcoming deliverables. It replaces hours-logged timesheets with outcome-based tracking, so you always know what value is being created.",
      },
      {
        q: "Are contracts managed on the platform?",
        a: "Yes. CXOwork provides standardised, legally reviewed engagement contracts that both parties sign digitally within the platform. Terms cover scope, milestones, IP ownership, confidentiality, and termination. Custom terms can be added for enterprise engagements.",
      },
      {
        q: "What happens if the match isn't right?",
        a: "If after your first working session you feel the fit is off, we offer a free rematch — no questions asked. Our goal is a long-term working relationship, not a one-time placement. We track match satisfaction and use it to continuously improve our scoring model.",
      },
      {
        q: "Is my company data and IP secure on CXOwork?",
        a: "All data shared on CXOwork is encrypted in transit and at rest. Advisors sign NDAs as part of every engagement agreement. Access to your documents and communication history is scoped to the specific engagement — no advisor can see data from another company's engagement.",
      },
      {
        q: "Does CXOwork operate internationally?",
        a: "Yes. CXOwork supports engagements across North America, Europe, the Middle East, and Asia-Pacific. Advisors indicate their preferred geographies and time zones. Milestone-based, async-friendly engagements work well across time zones, though we also facilitate real-time collaboration for companies that prefer it.",
      },
      {
        q: "How do I get started?",
        a: "Click 'Schedule Consultation' from the homepage. Our onboarding team will walk you through a 20-minute discovery call, help you define your leadership gap, and launch your first match within 24 hours of that call.",
      },
    ],
  },
]

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="overflow-hidden rounded-2xl transition-all duration-200"
      style={{
        border: open ? "1px solid rgba(37,99,235,0.30)" : "1px solid rgba(229,231,235,1)",
        backgroundColor: open ? "rgba(59,130,246,0.04)" : "#ffffff",
        boxShadow: open
          ? "0 4px 20px rgba(37,99,235,0.10)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span
          className="text-sm font-semibold leading-snug pr-4"
          style={{ color: open ? "#1D4ED8" : "#111827" }}
        >
          {q}
        </span>
        <span
          className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-200"
          style={{
            backgroundColor: open ? "rgba(37,99,235,0.12)" : "rgba(59,130,246,0.07)",
            color: "#2563EB",
          }}
        >
          {open
            ? <Minus className="h-3.5 w-3.5" />
            : <Plus className="h-3.5 w-3.5" />
          }
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div
              className="px-6 pb-5 text-sm leading-relaxed"
              style={{ color: "#4b5563", borderTop: "1px solid rgba(229,231,235,1)" }}
            >
              <p className="pt-4">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function FAQCategory({ category, questions, sectionIndex }: {
  category: string
  questions: { q: string; a: string }[]
  sectionIndex: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
      className="mb-12"
    >
      {/* Category label */}
      <div className="flex items-center gap-3 mb-5">
        <span className="pill-blue inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
          {category}
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "rgba(229,231,235,1)" }} />
      </div>

      {/* Questions */}
      <div className="flex flex-col gap-3">
        {questions.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} index={i} />
        ))}
      </div>
    </motion.div>
  )
}

export default function FAQPage() {
  return (
    <div className="bg-background min-h-screen">
      <Header />

      <main className="mx-auto max-w-3xl px-6 pt-36 pb-24">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span className="pill-blue mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: "#3B82F6", boxShadow: "0 0 5px #3B82F6" }} />
            Resources
          </span>
          <h1
            className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl"
            style={{ color: "#0a0a0a" }}
          >
            FAQs
          </h1>
          <p className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: "#6b7280" }}>
            Get quick answers to the most common questions about CXOwork — how it works, who it's for, and how to get started.
          </p>

          {/* Divider */}
          <div className="mt-8 h-px" style={{ backgroundColor: "rgba(229,231,235,1)" }} />
        </motion.div>

        {/* FAQ Categories */}
        {faqCategories.map((cat, i) => (
          <FAQCategory
            key={cat.category}
            category={cat.category}
            questions={cat.questions}
            sectionIndex={i}
          />
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid-overlay mt-6 rounded-3xl px-8 py-10 text-center"
          style={{
            background: "#fff",
            border: "1px solid rgba(59,130,246,0.15)",
            boxShadow: "0 4px 32px rgba(37,99,235,0.08)",
          }}
        >
          <h2 className="font-display text-xl font-bold" style={{ color: "#0a0a0a" }}>
            Still have questions?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-blue-600" style={{ opacity: 0.85 }}>
            Our team is happy to walk you through how CXOwork works for your specific situation.
          </p>
          <a
            href="/get-started"
            className="btn-blue-gradient mt-6 inline-flex items-center rounded-2xl px-7 py-3 text-sm font-semibold"
          >
            Schedule a Consultation
          </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
