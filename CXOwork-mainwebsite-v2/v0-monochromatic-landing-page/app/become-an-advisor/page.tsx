import { Header } from "@/components/sections/header"
import { Footer } from "@/components/sections/footer"
import Link from "next/link"
import {
  Code2, Megaphone, TrendingUp, Package, Settings,
  BarChart2, UserCheck, Palette, Database, Scale, ArrowRight,
  CheckCircle2, MapPin, Building2, Timer, DollarSign
} from "lucide-react"

// ─── Benefit checklist items ──────────────────────────────────────────────────
const checklistItems = [
  {
    title: "Earn on your terms",
    sub: "Set your own rate and hours. No race to the bottom — CXOwork positions you at the premium tier.",
  },
  {
    title: "Work flexibly, across 1–3 engagements",
    sub: "Average 10–20 hrs/week per company — enough to make real impact without burning out.",
  },
  {
    title: "Zero search fees. Zero placement fees. Ever.",
    sub: "We earn by serving companies. Every match is completely free for advisors, for life.",
  },
  {
    title: "Matched only to companies that fit you",
    sub: "Our engine surfaces companies that align with your domain, stage preference, and availability.",
  },
  {
    title: "A network only the top 4% get into",
    sub: "Being part of CXOwork signals credibility — companies trust our bench before the first call.",
  },
  {
    title: "Contracts scoped to outcomes, not hours",
    sub: "Milestone-based engagements mean you're rewarded for results. Clear deliverables, clean exits.",
  },
]

// ─── Open Positions ───────────────────────────────────────────────────────────
export const openRoles = [
  {
    slug: "fractional-cto",
    icon: Code2,
    title: "Fractional CTO",
    subtitle: "Engineering & Platform Leadership",
    types: ["CTOs", "Head of Engineering", "Architects", "Technical Leaders"],
    commitment: "10–20 hrs / week",
    compensation: "$8,000–$20,000 / month",
    stage: "Series A–C",
    remote: "Remote-first",
    tags: ["Platform Architecture", "Team Scaling", "AI/ML", "Cloud Infra"],
    openings: 12,
    description:
      "Lead engineering strategy for high-growth startups. Define technical roadmap, scale teams from 5 to 80+, and bridge product vision with execution.",
  },
  {
    slug: "fractional-cmo",
    icon: Megaphone,
    title: "Fractional CMO",
    subtitle: "Brand Strategy & Demand Generation",
    types: ["CMOs", "Head of Marketing", "Creative Directors", "Growth"],
    commitment: "10–15 hrs / week",
    compensation: "$7,000–$18,000 / month",
    stage: "Seed–Series B",
    remote: "Remote-first",
    tags: ["Brand Strategy", "Demand Gen", "B2B SaaS", "Growth Marketing"],
    openings: 9,
    description:
      "Own brand, pipeline, and go-to-market for founder-led companies. Drive 3× pipeline growth through integrated brand and demand programs.",
  },
  {
    slug: "fractional-cro",
    icon: TrendingUp,
    title: "Fractional CRO / Sales Leader",
    subtitle: "Revenue & Sales Enablement",
    types: ["CROs", "Head of Sales", "Account Executives"],
    commitment: "15–20 hrs / week",
    compensation: "$8,000–$16,000 / month",
    stage: "Seed–Series B",
    remote: "Hybrid",
    tags: ["GTM", "PLG", "Sales Enablement", "B2B SaaS"],
    openings: 8,
    description:
      "Build and scale repeatable revenue engines from $0 to $10M+ ARR. Hire, coach, and structure sales orgs that survive beyond the founder.",
  },
  {
    slug: "fractional-cpo",
    icon: Package,
    title: "Fractional CPO / Product Leader",
    subtitle: "Product Strategy & Roadmap",
    types: ["Head of Product", "Product Managers", "Strategists"],
    commitment: "10–20 hrs / week",
    compensation: "$7,500–$16,000 / month",
    stage: "Seed–Series C",
    remote: "Remote-first",
    tags: ["Product Strategy", "OKRs", "Roadmapping", "User Research"],
    openings: 11,
    description:
      "Define and execute product vision aligned with company stage. Translate user insights into prioritised roadmaps that ship fast and land hard.",
  },
  {
    slug: "fractional-coo",
    icon: Settings,
    title: "Fractional COO",
    subtitle: "Operations & Scale Excellence",
    types: ["COOs", "Head of Operations", "Operations Managers"],
    commitment: "15–25 hrs / week",
    compensation: "$9,000–$20,000 / month",
    stage: "Series A–D",
    remote: "Hybrid",
    tags: ["Process Design", "OKRs", "Supply Chain", "Automation"],
    openings: 7,
    description:
      "Scale operations from scrappy to structured. Implement systems, OKRs, and process discipline that free the CEO to focus on growth.",
  },
  {
    slug: "fractional-cfo",
    icon: BarChart2,
    title: "Fractional CFO",
    subtitle: "Finance, Fundraising & SaaS Metrics",
    types: ["CFOs", "Accountants", "Financial Analysts"],
    commitment: "10–20 hrs / week",
    compensation: "$8,000–$18,000 / month",
    stage: "Seed–Series C",
    remote: "Remote-first",
    tags: ["Financial Modeling", "SaaS Metrics", "Fundraising", "FP&A"],
    openings: 14,
    description:
      "Own the financial narrative — from board-ready models to fundraise readiness. Guide CEOs through Series A–C with clean metrics and investor-grade storytelling.",
  },
  {
    slug: "fractional-chro",
    icon: UserCheck,
    title: "Fractional CHRO / People Leader",
    subtitle: "People Strategy & Talent",
    types: ["CHROs", "Head of People", "Head of Talent", "Recruiters"],
    commitment: "10–15 hrs / week",
    compensation: "$6,000–$14,000 / month",
    stage: "Seed–Series B",
    remote: "Remote-first",
    tags: ["Talent Strategy", "Culture", "Compensation Design", "L&D"],
    openings: 6,
    description:
      "Build the people infrastructure founders forget until it breaks. Culture, comp bands, hiring velocity, and performance frameworks — from zero to 100 employees.",
  },
  {
    slug: "fractional-design-leader",
    icon: Palette,
    title: "Fractional Design Leader",
    subtitle: "Product Design & Brand Experience",
    types: ["Head of Design", "Product Designers", "UX Researchers"],
    commitment: "10–15 hrs / week",
    compensation: "$6,000–$14,000 / month",
    stage: "Seed–Series B",
    remote: "Remote-first",
    tags: ["UX Research", "Design Systems", "Brand Identity", "Prototyping"],
    openings: 5,
    description:
      "Create design systems and user experiences that convert and retain. Lead design function, establish brand standards, and hire the first in-house designer.",
  },
  {
    slug: "fractional-cdo",
    icon: Database,
    title: "Fractional CDO / Data Leader",
    subtitle: "Data Strategy & AI/ML",
    types: ["Chief Data Officers", "Data Scientists", "ML Engineers"],
    commitment: "10–20 hrs / week",
    compensation: "$8,000–$18,000 / month",
    stage: "Series A–C",
    remote: "Remote-first",
    tags: ["Data Strategy", "ML Ops", "Analytics", "AI Products"],
    openings: 8,
    description:
      "Turn data into a competitive moat. Build the data stack, implement ML pipelines, and make the company AI-ready before the window closes.",
  },
  {
    slug: "fractional-general-counsel",
    icon: Scale,
    title: "Fractional General Counsel",
    subtitle: "Legal, Compliance & Contracts",
    types: ["Head of Legal", "Legal Counsel", "Compliance", "Contract Specialists"],
    commitment: "5–15 hrs / week",
    compensation: "$5,000–$14,000 / month",
    stage: "Seed–Series B",
    remote: "Remote-first",
    tags: ["Corporate Law", "Compliance", "Contract Review", "IP"],
    openings: 4,
    description:
      "Protect the company without the full-time GC overhead. Handle fundraise docs, employment agreements, IP strategy, and vendor contracts at startup speed.",
  },
]

export default function BecomeAnAdvisor() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-white py-24 md:py-32">
          {/* dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.10) 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Build your fractional career.
              <br />
              <span style={{ color: "#2563EB" }}>On your terms.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
              CXOwork matches experienced executives with high-growth startups. No search fees. No race to the bottom. Just high-impact work that fits your life.
            </p>

            {/* Checklist */}
            <div className="mx-auto mt-10 max-w-2xl">
              <ul className="space-y-5 text-left">
                {checklistItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0" style={{ color: "#2563EB" }} />
                    <div>
                      <p className="text-lg font-medium leading-snug text-gray-800">{item.title}</p>
                      <p className="mt-1 text-lg leading-relaxed text-gray-500">{item.sub}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/become-an-advisor/apply"
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.30)" }}
              >
                Apply as an Advisor
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 rounded-2xl border px-8 py-4 text-sm font-semibold transition-colors hover:border-gray-400"
                style={{ borderColor: "#d1d5db", color: "#374151" }}
              >
                See open roles ↓
              </a>
            </div>
          </div>
        </section>

        {/* ── Open Roles ── */}
        <section id="open-roles" className="border-t border-gray-100 bg-white py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-14 text-center">
              <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gray-400">Open Opportunities</p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                What role are you applying for?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-gray-500">
                These are active categories with companies waiting for a match. Click any role to see the full brief and apply.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {openRoles.map((role) => (
                <div
                  key={role.slug}
                  className="group flex flex-col rounded-2xl p-7 transition-shadow hover:shadow-md"
                  style={{ border: "1px solid #e5e7eb", background: "#ffffff" }}
                >
                  {/* Header */}
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                        style={{ background: "#f3f4f6", border: "1px solid #e5e7eb" }}
                      >
                        <role.icon className="h-5 w-5" style={{ color: "#6b7280" }} strokeWidth={1.8} />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-gray-900">{role.title}</h3>
                        <p className="text-sm text-gray-400">{role.subtitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mb-5 text-sm leading-relaxed text-gray-500">{role.description}</p>

                  {/* Meta */}
                  <div className="mb-5 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-1.5">
                      <Timer className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
                      <span className="text-xs text-gray-500">{role.commitment}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
                      <span className="text-xs text-gray-500">{role.compensation}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
                      <span className="text-xs text-gray-500">{role.stage}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-gray-300" />
                      <span className="text-xs text-gray-500">{role.remote}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {role.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full px-2.5 py-1 text-[11px] font-medium"
                        style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", color: "#6b7280" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Types */}
                  <div className="mb-6">
                    <p className="mb-2 text-[11px] font-medium uppercase tracking-widest text-gray-300">Roles included</p>
                    <p className="text-xs text-gray-500">{role.types.join(" · ")}</p>
                  </div>

                  {/* CTA */}
                  <div className="mt-auto flex gap-3">
                    <Link
                      href={`/become-an-advisor/apply`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ background: "#0a0a0a" }}
                    >
                      Apply Now
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href={`/become-an-advisor/roles/${role.slug}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium transition-colors hover:border-gray-400 hover:text-gray-900"
                      style={{ borderColor: "#e5e7eb", color: "#6b7280" }}
                    >
                      View details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="border-t border-gray-100 bg-gray-50 py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Ready to build your fractional portfolio?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-gray-500">
              Join 500+ vetted executives already working with high-growth companies. Application takes under 10 minutes.
            </p>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/become-an-advisor/apply"
                className="inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white"
                style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.30)" }}
              >
                Start Your Application
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400">
              {["No placement fees", "10-minute application", "Response within 48 hrs"].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-gray-300" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
