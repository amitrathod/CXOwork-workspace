import { Footer } from "@/components/sections/footer"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeft, ArrowRight, DollarSign, Building2,
  MapPin, Timer, CheckCircle2, Users, Briefcase, Star
} from "lucide-react"
import { openRoles } from "../../page"

// ─── LinkedIn-quality JD data ─────────────────────────────────────────────────
const jdData: Record<string, {
  about: string[]
  responsibilities: string[]
  requiredQualifications: string[]
  niceToHave: string[]
  skills: string[]
  whatYouGet: string[]
  process: string[]
}> = {

  "fractional-cto": {
    about: [
      "We're matching several high-growth Series A–C companies with a Fractional CTO who can lead from day one. These are founders who have achieved product-market fit, are scaling fast, and need a seasoned technical co-pilot — someone who has been in the seat before and knows exactly what it takes to build a durable, scalable platform.",
      "You'll own the technical vision, make the hard architecture calls, and build the engineering team and culture needed to sustain rapid growth. This is a high-trust, high-leverage role where you'll partner directly with the CEO and board — not report to a VP.",
    ],
    responsibilities: [
      "Define and own the multi-quarter technical roadmap, aligned with product strategy and business milestones",
      "Evaluate and evolve the architecture — monolith vs. microservices, cloud provider strategy, data infrastructure, and security posture",
      "Build, structure, and scale engineering teams from 5 to 50+ through hiring, onboarding, and squad design",
      "Establish engineering operating rhythms: sprint cadence, incident management, on-call rotations, and code review standards",
      "Drive AI/ML capability assessment and roadmap — from embedding LLMs into existing features to building net-new AI products",
      "Represent technology credibly in board meetings, Series B/C investor due diligence, and enterprise customer conversations",
      "Partner with Product on roadmap feasibility, technical debt prioritisation, and build vs. buy decisions",
      "Establish engineering KPIs: deployment frequency, change failure rate, MTTR, and developer NPS",
      "Mentor and develop senior engineers into future tech leads and engineering managers",
    ],
    requiredQualifications: [
      "10+ years in software engineering, with at least 4 years in a CTO, VP Engineering, or equivalent leadership role",
      "Proven track record scaling SaaS or marketplace products from early traction through Series B or C",
      "Deep proficiency in at least one cloud platform (AWS, GCP, or Azure) and modern backend or full-stack architectures",
      "Experience hiring, structuring, and leading distributed engineering teams across time zones",
      "Demonstrated ability to balance technical debt, shipping velocity, and long-term platform health",
      "Executive communication skills — comfortable translating complex technical topics for founders, boards, and investors",
    ],
    niceToHave: [
      "Experience as a technical co-founder or first engineering hire at a venture-backed startup",
      "Familiarity with AI/ML infrastructure, LLM fine-tuning, or data platform engineering",
      "Background in Fintech, HealthTech, EdTech, or marketplace verticals",
      "Prior fractional CTO or advisory board experience",
    ],
    skills: [
      "System Architecture", "Cloud Infrastructure (AWS/GCP/Azure)", "Engineering Leadership",
      "AI/ML Integration", "SaaS Platforms", "Team Scaling", "Technical Roadmapping",
      "DevOps / SRE", "Board Communication", "M&A Technical Due Diligence",
    ],
    whatYouGet: [
      "$8,000–$20,000 per month retainer, based on hours per week and engagement scope",
      "Equity participation (0.1–0.5%) available for longer-term strategic engagements",
      "Full remote flexibility — async-first culture, overlap only for key strategic sessions",
      "Dedicated CXOwork success manager to support onboarding and engagement health",
      "Access to the CXOwork advisor community: peer CTO roundtables, benchmark data, and shared tooling",
    ],
    process: [
      "Submit your application — 10 minutes. We assess domain depth, past outcomes, and engagement history",
      "Expert panel interview with two senior engineering practitioners (45 minutes, technical + leadership focus)",
      "Profile approved and activated in our matching engine",
      "Curated intro call with matched founder — you choose whether to proceed",
      "Engagement kick-off and onboarding within 2 weeks of mutual agreement",
    ],
  },

  "fractional-cmo": {
    about: [
      "CXOwork is placing Fractional CMOs with ambitious Seed–Series B companies that have strong products but unbuilt demand engines. These founders understand that marketing is a growth lever — they just haven't had the senior operator to pull it.",
      "You'll own the full marketing function: brand narrative, pipeline programs, team hire, and channel strategy. You'll have a direct line to the CEO and full authority over the marketing budget. This is a builder role — not an optimiser of an existing machine.",
    ],
    responsibilities: [
      "Develop and own the company's brand positioning, messaging framework, and go-to-market narrative",
      "Build and execute integrated demand generation programs across paid, content, SEO, events, and ABM",
      "Define ICP (Ideal Customer Profile) in partnership with sales — segmentation, intent signals, and buyer journey",
      "Hire, onboard, and lead the first 2–5 marketing hires; manage agency and contractor relationships",
      "Establish marketing attribution, pipeline KPIs, and weekly reporting cadences for the CEO and board",
      "Drive 3× qualified pipeline growth within the first two quarters through high-ROI channel mix",
      "Lead product marketing — competitive positioning, launch playbooks, sales enablement collateral",
      "Build analyst and media relationships to increase share of voice in the company's category",
      "Collaborate with the product team on PLG (Product-Led Growth) motion, in-app engagement, and retention loops",
    ],
    requiredQualifications: [
      "8+ years in B2B marketing, with at least 3 years as a CMO or VP Marketing at a venture-backed company",
      "Documented track record of driving pipeline growth — ideally from $1M to $10M+ ARR",
      "Hands-on proficiency in at least two channels: content/SEO, paid acquisition, email nurture, ABM, or PLG",
      "Strong analytical capability — able to own marketing P&L, CAC/LTV modelling, and attribution reporting",
      "Experience building a marketing function from scratch, including first hires and first tech stack decisions",
      "Excellent written communication — able to personally write and edit high-quality brand and demand content",
    ],
    niceToHave: [
      "Experience marketing developer tools, API-first products, or highly technical B2B software",
      "Background leading marketing through a Series A or B fundraise narrative",
      "Existing relationships with B2B marketing communities, analyst firms, or industry media",
      "Prior fractional or interim CMO engagements",
    ],
    skills: [
      "B2B Demand Generation", "Brand Strategy", "Product Marketing", "Content Marketing",
      "ABM", "PLG", "Marketing Analytics", "Paid Acquisition", "SEO", "Sales Enablement",
      "Marketing Ops (HubSpot / Marketo)", "Executive Storytelling",
    ],
    whatYouGet: [
      "$7,000–$18,000 per month retainer based on hours and scope",
      "Performance bonus tied to pipeline and MQL targets (typically 15–25% of retainer)",
      "Remote-first engagements — async default with monthly strategic sessions",
      "Access to CXOwork's CMO peer network, content benchmarks, and shared playbook library",
      "Flexible contract terms — typically 3–6 months with strong renewal rate",
    ],
    process: [
      "Application with 2–3 pipeline growth case studies linked or attached (10 min)",
      "45-minute panel interview focused on GTM strategy and demand gen playbooks",
      "Profile approved and matched to active companies",
      "Founder intro call — marketing maturity and budget assessment",
      "Engagement kick-off within 2 weeks",
    ],
  },

  "fractional-cro": {
    about: [
      "We're placing Fractional CROs and Sales Leaders with companies that have found their first customers but haven't yet built the system that creates the next hundred. These are post-seed or Series A companies where the founder is still closing deals and knows that cannot continue.",
      "You will design the revenue architecture, hire the first quota-carrying reps, and — critically — prove the motion yourself by closing strategic accounts. This role is for operators who thrive in the zero-to-one phase of building a revenue organisation.",
    ],
    responsibilities: [
      "Audit the current sales process, pipeline health, and win/loss patterns — deliver a revenue architecture recommendation within 30 days",
      "Design and implement a repeatable, scalable sales methodology (MEDDIC, Sandler, Challenger, or custom)",
      "Build the full sales tech stack: CRM implementation, sequencing tools, conversation intelligence, and forecasting",
      "Define territory design, quota allocation, and compensation plans for AEs, SDRs, and SEs",
      "Hire, onboard, and ramp the first 3–10 quota-carrying reps — including job descriptions, interview scorecards, and ramp milestones",
      "Personally close 3–5 early enterprise or mid-market accounts to validate the sales motion",
      "Own the weekly revenue forecast and board-level pipeline reporting",
      "Establish Sales–Marketing SLAs: lead handoff criteria, MQL scoring, and feedback loops",
      "Build a customer success handoff process to protect NRR from day one",
    ],
    requiredQualifications: [
      "10+ years in B2B sales, with at least 3 years as CRO, VP Sales, or Head of Revenue at a startup",
      "Track record of building revenue from $0 to at least $5M ARR — ideally from scratch, not inheriting a team",
      "Hands-on experience hiring, coaching, and managing quota-carrying AEs and SDRs",
      "Deep CRM expertise — HubSpot or Salesforce implementation and administration",
      "Experience selling to mid-market or enterprise buyers with 3–9 month sales cycles",
      "Strong financial fluency — able to own a revenue forecast and model compensation plan economics",
    ],
    niceToHave: [
      "MEDDIC, Sandler, or Challenger certification",
      "Experience building a channel or partnership sales motion alongside direct sales",
      "Background in SaaS, marketplace, or API/developer-tool sales",
      "Prior fractional CRO or interim VP Sales experience",
    ],
    skills: [
      "Sales Process Design", "Revenue Forecasting", "Quota Setting", "CRM (Salesforce / HubSpot)",
      "MEDDIC / Sandler", "SDR & AE Hiring", "Enterprise Sales", "PLG Sales Motion",
      "Sales Enablement", "Pipeline Management", "Comp Plan Design", "CS Handoff",
    ],
    whatYouGet: [
      "$8,000–$16,000 per month retainer",
      "Performance commission on closed revenue — typically 3–8% of net new ARR generated (negotiable)",
      "Hybrid flexibility — most engagements require 2–3 days on-site per month",
      "Access to CXOwork's CRO peer network and revenue benchmarks by stage and vertical",
      "Typical engagement length 4–9 months — often extends through Series B hiring of a full-time CRO",
    ],
    process: [
      "Application with one sales-build case study: what you inherited, what you built, and the ARR outcome",
      "45-minute panel interview — revenue architecture, hiring, and forecasting deep-dive",
      "Profile approved and matched to active companies",
      "Founder intro call — pipeline and team assessment",
      "Engagement kick-off within 2 weeks",
    ],
  },

  "fractional-cpo": {
    about: [
      "CXOwork is matching Fractional CPOs and Product Leaders with Series A–C companies that have strong engineering and design but no disciplined product function. Roadmaps are built in Slack threads. Prioritisation is ad hoc. User insights are anecdotal. These companies need a product operator who has built the system before.",
      "You will define the north-star metric, establish the discovery and delivery rhythm, and own the roadmap end-to-end. You'll manage the first PMs, partner with Engineering and Design at the squad level, and translate user insight into shipped product bets.",
    ],
    responsibilities: [
      "Define the product vision, north-star metric, and multi-quarter roadmap aligned with company strategy",
      "Establish OKRs for each product squad — connecting individual work to company-level outcomes",
      "Build and lead structured discovery: customer interviews, JTBD frameworks, usability testing, and insight synthesis",
      "Own prioritisation — evaluate trade-offs between growth, retention, monetisation, and technical health",
      "Hire, manage, and develop the first 1–3 PMs; define the hiring bar and career ladder",
      "Partner with Engineering on sprint planning, estimation, and release management",
      "Lead product launches — go-to-market coordination, sales enablement, and success measurement",
      "Manage the product analytics stack and own A/B testing frameworks",
      "Create the product narrative for board meetings, fundraise materials, and enterprise sales cycles",
    ],
    requiredQualifications: [
      "8+ years in product management, with at least 3 years as Head of Product, VP Product, or CPO",
      "Track record of shipping 0→1 products and then scaling them to meaningful user and revenue outcomes",
      "Strong command of user research methods — interviews, surveys, usability testing, and synthesis",
      "Proficiency in product analytics: Mixpanel, Amplitude, Heap, or equivalent",
      "Proven track record of building and leading PM teams, including hiring and performance management",
      "Excellent written and verbal communication — able to write crisp PRDs, OKRs, and executive updates",
    ],
    niceToHave: [
      "Background in B2B SaaS, developer tools, or marketplace product management",
      "Experience shipping AI-powered product features or managing data science partnerships",
      "Certified Scrum Product Owner (CSPO) or SAFe Product Manager",
      "Prior fractional CPO or advisory board experience",
    ],
    skills: [
      "Product Strategy", "Roadmapping", "User Research", "OKRs", "A/B Testing",
      "Agile / Scrum", "Product Analytics (Mixpanel / Amplitude)", "PM Hiring",
      "Go-to-Market", "PRD Writing", "Stakeholder Management", "AI Product Development",
    ],
    whatYouGet: [
      "$7,500–$16,000 per month retainer based on hours and scope",
      "Equity participation available for long-term strategic engagements",
      "Remote-first and async-friendly — most companies use Notion, Linear, and Figma",
      "Access to CXOwork's CPO peer network and monthly product roundtables",
      "Typical engagement length 3–9 months",
    ],
    process: [
      "Application with 2–3 product case studies: problem, decision-making, and outcome (10 min)",
      "45-minute panel interview — roadmap trade-offs, discovery process, and PM leadership",
      "Profile approved and matched to active companies",
      "Founder intro call — product maturity and team assessment",
      "Engagement kick-off within 2 weeks",
    ],
  },

  "fractional-coo": {
    about: [
      "We are placing Fractional COOs with Series A–D companies that have outgrown informal coordination but haven't yet built the operational infrastructure to sustain scale. Decision-making is slow. Accountabilities are unclear. Cross-functional projects stall. The CEO is spending 40% of their week managing internal chaos.",
      "You will walk in, diagnose the highest-leverage operational gaps, and systematically fix them. This role requires someone who has scaled an operations function before — through hypergrowth, geographic expansion, or category leadership — and can build without perfect information.",
    ],
    responsibilities: [
      "Conduct a 30-day operational audit and deliver a prioritised transformation roadmap to the CEO",
      "Design and implement company-wide OKR frameworks, quarterly planning cycles, and weekly leadership reviews",
      "Own cross-functional project management — creating accountability structures across Product, Engineering, Sales, and Finance",
      "Streamline business operations through process automation, tooling decisions, and workflow design (Notion, Monday, ClickUp, or equivalent)",
      "Build and manage vendor relationships, procurement processes, and contract reviews",
      "Lead the 18-month headcount planning exercise in partnership with the CEO and CFO",
      "Prepare operational materials for board meetings, Series B/C data rooms, and investor updates",
      "Drive international expansion planning where relevant — entity setup, localisation, and in-market ops",
      "Identify and implement 40%+ reduction in operational overhead through process and tooling improvements",
    ],
    requiredQualifications: [
      "10+ years in operations or strategy, with at least 4 years as COO, VP Operations, or Chief of Staff",
      "Track record of scaling a company's operational infrastructure through at least one major growth phase",
      "Deep experience with OKR design, quarterly planning, and cross-functional alignment frameworks",
      "Strong financial fluency — comfortable working alongside CFO, owning vendor budgets, and modelling headcount plans",
      "Excellent project management skills — experienced with both waterfall and agile delivery methods",
      "Comfortable working 15–25 hours per week, with monthly on-site presence",
    ],
    niceToHave: [
      "McKinsey, BCG, Bain, or equivalent strategy consulting background",
      "Experience with international entity setup, EOR (Employer of Record) structures, or cross-border operations",
      "Background in marketplace, logistics, HealthTech, or SaaS operations",
      "Prior fractional COO or Chief of Staff experience",
    ],
    skills: [
      "OKR Design", "Cross-functional Alignment", "Process Automation", "Operational Excellence",
      "Headcount Planning", "Vendor Management", "Board Reporting", "Project Management",
      "Supply Chain", "Business Intelligence", "International Expansion", "Change Management",
    ],
    whatYouGet: [
      "$9,000–$20,000 per month retainer based on hours and scope",
      "Performance bonuses tied to operational KPI achievement (e.g. overhead reduction, NPS improvement)",
      "Hybrid flexibility — typically 2–3 days on-site per month",
      "Access to CXOwork's COO peer network, OKR implementation playbooks, and vendor benchmarks",
      "Engagements typically run 6–18 months — one of our longest average tenures",
    ],
    process: [
      "Application with one operational transformation case study: before state, interventions, and measurable after state",
      "45-minute panel interview — operational diagnosis, OKR design, and cross-functional leadership",
      "Profile approved and matched to active companies",
      "Founder intro call — operational maturity and gap assessment",
      "Kick-off within 2 weeks of mutual agreement",
    ],
  },

  "fractional-cfo": {
    about: [
      "CXOwork is placing Fractional CFOs with Seed–Series C companies that need financial leadership without the full-time cost. These companies are raising, scaling, or navigating a complexity inflection point — and they need a CFO who has seen more cap tables and data rooms than their CEO has.",
      "You will own the financial narrative, build the models the board trusts, and give the CEO a clear view of runway, burn, and growth economics at all times. You will also lead or support the fundraise process — managing the data room, coaching the CEO through investor conversations, and reviewing all transaction documents.",
    ],
    responsibilities: [
      "Build and maintain investor-grade financial models: 3-statement model, 5-year plan, scenario analysis, and fundraise bridge",
      "Own the SaaS metrics dashboard: ARR, MRR, NRR, GRR, CAC, LTV, payback period, and churn by cohort",
      "Lead full fundraise process management: data room preparation, investor narrative, diligence Q&A, and close coordination",
      "Manage FP&A function: monthly close, variance analysis, department-level P&L ownership, and quarterly reforecast",
      "Oversee relationships with auditors, legal counsel, banking partners, and existing investors",
      "Design executive compensation structures, equity refresh schedules, and option pool sizing",
      "Advise on M&A target evaluation, term sheet negotiation, and integration financial planning",
      "Implement and own financial controls, expense management policies, and ERP/accounting system (QuickBooks, NetSuite, or equivalent)",
      "Prepare board-ready financial packages: monthly board deck financials, quarterly investor updates, and annual budget presentations",
    ],
    requiredQualifications: [
      "10+ years in finance, with at least 4 years as CFO or VP Finance at a venture-backed company",
      "Track record through at least two equity fundraise processes (Series A, B, or venture debt) from model to close",
      "Deep fluency in SaaS unit economics and the ability to educate founders on what metrics VCs use and why",
      "Experience managing external auditors, Big 4 relationships, and audit-readiness for a growing company",
      "Strong knowledge of cap table management, 409A valuations, option plan mechanics, and secondary transactions",
      "Ability to act as the sole senior finance person — comfortable doing strategic and operational work simultaneously",
    ],
    niceToHave: [
      "CPA, CFA, or MBA from a top-15 institution",
      "Investment banking or Big 4 accounting background (Goldman, Morgan Stanley, Deloitte, PwC, etc.)",
      "Experience with R&D tax credits, international transfer pricing, or multi-entity consolidation",
      "Prior fractional CFO or interim finance leadership experience",
    ],
    skills: [
      "Financial Modelling (3-Statement)", "SaaS Metrics & Unit Economics", "Fundraise Management",
      "FP&A", "Board Reporting", "Equity Compensation Design", "M&A Advisory",
      "Audit Management", "NetSuite / QuickBooks", "Cap Table Management", "Scenario Planning",
    ],
    whatYouGet: [
      "$8,000–$18,000 per month retainer based on hours, complexity, and company stage",
      "Deal fees for M&A or fundraise advisory available for qualifying transactions (negotiated separately)",
      "Remote-first engagements — async by default, with monthly strategy sessions",
      "Access to CXOwork's CFO network, SaaS benchmark datasets, and shared financial model templates",
      "Average engagement length 4–12 months, with very high renewal rate post-fundraise",
    ],
    process: [
      "Application with at least one fundraise or financial transformation case study (10 min)",
      "45-minute panel focused on financial modelling, SaaS metrics, and investor narrative construction",
      "Profile approved and surfaced to matched companies",
      "Founder intro call — financial gap and runway assessment",
      "Engagement kick-off within 10 business days",
    ],
  },

  "fractional-chro": {
    about: [
      "We're matching Fractional CHROs and People Leaders with companies that have hit the inflection point where informal people management breaks. Between 20 and 100 employees, companies face the same crises: key attrition, pay equity gaps, inconsistent performance feedback, and no documented culture. These problems don't fix themselves.",
      "You will walk in and build the people infrastructure the company should have started building 30 employees ago. Comp bands, performance reviews, recruiting pipelines, onboarding programmes, and the cultural rituals that make good people stay.",
    ],
    responsibilities: [
      "Audit current people infrastructure — surface compensation equity gaps, compliance risks, and attrition root causes within 30 days",
      "Design and implement a complete performance management framework: review cycles, calibration sessions, and promotion criteria",
      "Build compensation bands, equity refresh schedules, and a total rewards philosophy benchmarked to market data (Radford, Levels.fyi, or Carta)",
      "Lead executive and senior individual contributor hiring — designing job specs, interview scorecards, and offer negotiation strategies",
      "Create a structured onboarding programme that reduces time-to-productivity from 90 days to 30 days",
      "Establish culture rituals: all-hands cadence, values reinforcement, manager training, and recognition programmes",
      "Design and launch annual and pulse engagement surveys — synthesise insights into an action plan",
      "Ensure compliance across all active employment jurisdictions — federal, state, and international",
      "Build the people team from scratch — first HRBP, recruiter, or People Ops hire",
    ],
    requiredQualifications: [
      "8+ years in People/HR leadership, with at least 3 years as CHRO, VP People, or Head of People",
      "Track record of scaling a people function from 20–30 to 100+ employees",
      "Strong working knowledge of US employment law — federal and multi-state compliance",
      "Experience with compensation benchmarking tools (Radford, Levels.fyi, Carta, or Pave)",
      "Proven ability to reduce unwanted attrition through a combination of culture, comp, and development programs",
      "Excellent executive communication and coaching skills — regularly advising CEOs on people strategy",
    ],
    niceToHave: [
      "SHRM-SCP, PHR, or equivalent certification",
      "Experience with international hiring and multi-jurisdiction compliance (UK, Canada, EU)",
      "Background in Employer of Record (EOR) implementation (Deel, Remote.com, Rippling)",
      "Prior fractional CHRO or People leadership advisory experience",
    ],
    skills: [
      "People Strategy", "Compensation Benchmarking", "Performance Management", "Recruiting Operations",
      "Employment Law", "Culture Design", "HRIS (Rippling / Workday / BambooHR)", "L&D",
      "Engagement Surveys", "Executive Coaching", "Org Design", "Equity Plan Administration",
    ],
    whatYouGet: [
      "$6,000–$14,000 per month retainer based on company size and scope",
      "Remote-first engagements — async-friendly with monthly on-site presence for culture work",
      "Access to CXOwork's CHRO peer network, comp benchmarking datasets, and shared policy templates",
      "Flexible contract terms — typically 4–8 months, often extending through the first in-house People hire",
      "Option to recruit your own successor as part of the engagement close process",
    ],
    process: [
      "Application with one people transformation case study: attrition problem, interventions, and outcome",
      "45-minute panel — compensation philosophy, performance design, and culture-building approach",
      "Profile approved and matched to active companies",
      "Founder intro call — people gap and team health assessment",
      "Kick-off within 2 weeks",
    ],
  },

  "fractional-design-leader": {
    about: [
      "We're placing Fractional Design Leaders with Seed–Series B companies that have strong engineering but an immature design function. The product works. Users are using it. But the experience is fragile, the brand is inconsistent, and the CEO knows both need to change before the next stage of growth.",
      "You will own design end-to-end: audit the current UX, build the design system, lead user research, and hire the first in-house designer. This is a strategic and hands-on role — you'll be both the director and the most senior individual contributor.",
    ],
    responsibilities: [
      "Conduct a comprehensive UX audit across all product surfaces and deliver a prioritised design roadmap within 30 days",
      "Build a scalable design system from scratch — component library, design tokens, typography, colour system, and spacing grid — in Figma",
      "Lead structured user research: user interviews, usability testing, card sorting, and synthesis into prioritised insights",
      "Partner with Engineering at the sprint level — handoff specs, component QA, and design review processes",
      "Define and own the visual brand identity if not yet established: logo, typography, colour, iconography, and motion guidelines",
      "Create the design narrative for fundraise decks, enterprise sales presentations, and marketing campaigns",
      "Hire and onboard the company's first in-house designer or design team (2–4 people)",
      "Establish design KPIs: usability benchmarks, task completion rates, SUS scores, and NPS by product area",
      "Manage freelancer and agency relationships for overflow design capacity",
    ],
    requiredQualifications: [
      "8+ years in product or UX design, with at least 3 years as Head of Design, Design Director, or Design Lead",
      "Expert proficiency in Figma — including component libraries, auto-layout, variables, and prototyping",
      "Strong portfolio demonstrating both UX (information architecture, flows, usability) and UI (visual design, design systems)",
      "Proven experience leading end-to-end user research: recruitment, interviews, synthesis, and product recommendations",
      "Track record of building design systems from zero and getting engineering adoption",
      "Experience hiring and managing designers, including interview process design and career development",
    ],
    niceToHave: [
      "Experience with motion design, Lottie animations, or Framer prototyping",
      "Background in B2B SaaS, developer tools, or fintech product design",
      "Proficiency in HTML/CSS — able to collaborate very closely with front-end engineers",
      "Prior fractional or advisory design leadership experience",
    ],
    skills: [
      "Product Design", "UX Research", "Design Systems (Figma)", "Interaction Design",
      "Brand Identity", "Usability Testing", "Information Architecture", "Accessibility (WCAG)",
      "Design Ops", "Framer / Prototyping", "Design Team Leadership", "Front-end Collaboration",
    ],
    whatYouGet: [
      "$6,000–$14,000 per month retainer based on hours and engagement scope",
      "Remote-first and async-friendly — most companies use Figma, Notion, and Linear",
      "Portfolio rights to all work created during the engagement",
      "Access to CXOwork's design peer network and monthly design critique sessions",
      "Flexible contract terms — typically 3–6 months",
    ],
    process: [
      "Application with portfolio link and 1–2 design system or UX research case studies (10 min)",
      "45-minute panel — design system critique exercise and user research approach discussion",
      "Profile approved and matched to active companies",
      "Founder intro call — design maturity audit and prioritisation session",
      "Engagement kick-off within 2 weeks",
    ],
  },

  "fractional-cdo": {
    about: [
      "We are placing Fractional CDOs and Data Leaders with Series A–C companies sitting on valuable product and customer data they cannot yet use. The data is there — unstructured, siloed, and underused. These companies need a senior data operator who can build the stack, define the model, and start shipping data-driven and AI-powered product features.",
      "This is a high-leverage, technical leadership role. You will own the data strategy, build or migrate the data infrastructure, and work side-by-side with product and engineering to turn data into a measurable competitive advantage.",
    ],
    responsibilities: [
      "Conduct a data infrastructure audit and define a target-state modern data stack architecture within 30 days",
      "Design and implement the company's semantic data model — events schema, entity definitions, truth sources, and metric definitions",
      "Build or migrate to a modern data stack: dbt + Snowflake/BigQuery + Fivetran/Airbyte + Looker/Metabase/PowerBI",
      "Lead ML engineering — feature store design, model training pipelines, A/B testing frameworks, and production model monitoring",
      "Evaluate and implement LLM-powered product features: RAG architectures, fine-tuning, prompt engineering, and AI agent workflows",
      "Establish data governance: access control, data quality SLAs, lineage documentation, and PII handling policies",
      "Build self-serve analytics capabilities — enabling non-technical stakeholders to answer product, marketing, and finance questions independently",
      "Ensure compliance with GDPR, CCPA, and any industry-specific data privacy regulations",
      "Build and lead the first data team: analytics engineers, data scientists, and ML engineers",
    ],
    requiredQualifications: [
      "10+ years in data engineering, data science, or analytics, with at least 4 years in a CDO, VP Data, or equivalent leadership role",
      "Hands-on experience implementing modern data stacks (dbt, Snowflake, BigQuery, Databricks, or equivalent)",
      "At least 2 production ML or AI systems shipped in a live product context",
      "Deep knowledge of data governance, privacy regulation (GDPR/CCPA), and data quality management",
      "Ability to hire, manage, and develop a data team of 3–10 engineers and scientists",
      "Executive communication skills — able to translate data strategy into business outcomes for boards and investors",
    ],
    niceToHave: [
      "Experience with LLM fine-tuning, RAG pipeline design, or AI agent architecture",
      "Background in Fintech, HealthTech, eCommerce, or marketplace data problems",
      "PhD or MSc in Statistics, Computer Science, or a related quantitative field",
      "Prior fractional CDO or advisory data leadership experience",
    ],
    skills: [
      "Data Strategy", "Modern Data Stack (dbt / Snowflake / BigQuery)", "ML Engineering",
      "LLM & RAG Architecture", "Data Governance", "Analytics Engineering",
      "Python / SQL", "A/B Testing", "Data Privacy (GDPR / CCPA)", "MLOps",
      "Team Leadership", "Business Intelligence (Looker / Metabase)",
    ],
    whatYouGet: [
      "$8,000–$18,000 per month retainer based on hours and technical complexity",
      "Equity participation available for longer-term strategic engagements (0.1–0.5%)",
      "Remote-first engagements across time zones — async by default",
      "Access to CXOwork's CDO peer network and AI/ML implementation playbooks",
      "Average engagement length 4–12 months, with very high renewal rate post data stack launch",
    ],
    process: [
      "Application with one data infrastructure transformation case study: before state, stack decisions, and business impact",
      "45-minute technical panel — data modelling exercise and ML pipeline design discussion",
      "Profile approved and matched to active companies",
      "Founder intro call — data maturity and infrastructure assessment",
      "Kick-off within 2 weeks",
    ],
  },

  "fractional-general-counsel": {
    about: [
      "CXOwork is placing Fractional General Counsels with Seed–Series B companies doing real business — closing enterprise contracts, raising institutional capital, and hiring across multiple jurisdictions. These companies have outgrown their startup lawyer but aren't ready for a full-time GC.",
      "You will be the company's primary legal point of contact. You will close commercial contracts at startup speed, lead fundraise legal processes from term sheet to close, and build the legal infrastructure that protects the company as it scales.",
    ],
    responsibilities: [
      "Review, negotiate, and close commercial agreements: MSAs, SaaS subscription agreements, SOWs, NDAs, data processing agreements, and enterprise license agreements",
      "Lead the legal side of fundraise processes — reviewing and negotiating term sheets, SARs, convertible notes, SAFEs, Series A/B preferred stock documents, and ancillary agreements",
      "Draft and manage employment documentation: offer letters, equity grant agreements, IP assignment agreements, and separation agreements",
      "Design and implement the company's IP strategy — trademark applications, patent evaluation, trade secret protection, and open-source license compliance",
      "Advise on data privacy compliance: GDPR, CCPA, HIPAA (where applicable), and cookie consent frameworks",
      "Manage outside counsel relationships and legal spend — selecting specialist counsel for litigation, IP, or international matters",
      "Support M&A or strategic partnership transactions: NDA-to-close project management, reps and warranties review, and integration legal planning",
      "Build the company's legal document repository, contract management system, and standard template library",
      "Advise the board on fiduciary duties, corporate governance, and D&O insurance coverage",
    ],
    requiredQualifications: [
      "JD from an ABA-accredited law school; active bar membership in good standing in at least one US state",
      "5+ years of corporate or technology law practice, with at least 2 years in an in-house GC, Deputy GC, or Senior Counsel role",
      "Track record managing legal aspects of at least two equity fundraise processes end-to-end",
      "Deep expertise in SaaS commercial contracts, software licensing, and technology transactions",
      "Solid working knowledge of employment law, equity compensation mechanics (ISO, NSO, RSU), and cap table implications",
      "Ability to operate autonomously as the sole senior legal resource — balancing strategic and transactional workloads",
    ],
    niceToHave: [
      "Big Law experience at a technology-focused firm (Cooley, Gunderson, Wilson Sonsini, Latham, etc.)",
      "International law experience: cross-border transactions, UK/EU company law, or GDPR compliance program design",
      "Experience with healthcare regulatory compliance (HIPAA, FDA), financial regulation (SEC, FINRA), or government contracting",
      "Prior fractional GC, outside general counsel, or legal advisory board experience",
    ],
    skills: [
      "Commercial Contracts (SaaS MSA / Enterprise)", "Equity Fundraise (Series A/B)",
      "Employment Law", "IP Strategy & Trademark", "GDPR / CCPA Compliance",
      "Corporate Governance", "M&A Transactions", "Outside Counsel Management",
      "Contract Negotiation", "Cap Table & Equity Mechanics", "Data Privacy", "Board Advisory",
    ],
    whatYouGet: [
      "$5,000–$14,000 per month retainer based on hours and legal complexity",
      "Remote-first and async-friendly — most work is document review, negotiation, and async legal counsel",
      "Access to CXOwork's legal peer network and a library of standard startup contract templates",
      "Flexible contract terms — typically 3–9 months, often extending through the company's next fundraise",
      "Option to build and transition to the company's first in-house legal team",
    ],
    process: [
      "Application + bar membership confirmation and one deal or fundraise case study (10 min)",
      "45-minute panel — commercial contract negotiation simulation and fundraise legal process walk-through",
      "Profile approved and surfaced to matching companies",
      "Founder intro call — legal risk profile and priority transaction assessment",
      "Engagement kick-off within 1–2 weeks",
    ],
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function generateStaticParams() {
  return openRoles.map((r) => ({ role: r.slug }))
}

export default async function RoleJDPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params
  const roleData = openRoles.find((r) => r.slug === role)
  const jd = jdData[role]

  if (!roleData || !jd) notFound()

  const Icon = roleData.icon

  return (
    <>
      {/* ── Branded header ── */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" aria-hidden="true">
              <path d="M10.252 13.8458C5.89312 13.8458 5.89312 19.9994 10.252 19.9994H18.8094L14.7525 13.7624L10.252 13.8458Z" fill="#7B9BF8"/>
              <path d="M10.2521 13.8458C5.89327 13.8458 5.89327 19.9994 10.2521 19.9994C2.46388 20.0956 1.02161 6.92287 10.3183 6.92287L17.7228 6.83167L22.0787 13.7496L10.2222 13.8458H10.2521Z" fill="#2650F5"/>
              <path d="M9.92915 19.9943C10.0485 19.9978 10.1688 19.9995 10.2902 19.9995C10.1683 20.001 10.0479 19.9992 9.92915 19.9943C-2.80718 19.6299 -3.84802 0 10.0598 0H19.713L24.0398 6.82674L10.3564 6.9229C1.20521 6.9229 2.45944 19.6864 9.92915 19.9943Z" fill="#032EF4"/>
            </svg>
            <span className="font-display text-xl font-bold" style={{ color: "#000" }}>CXOwork</span>
          </Link>

          <div className="hidden items-center gap-2 text-sm text-gray-400 md:flex">
            <Link href="/become-an-advisor" className="flex items-center gap-1 hover:text-gray-700 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" />
              All roles
            </Link>
            <span>·</span>
            <span className="font-medium text-gray-600">{roleData.title}</span>
          </div>

          <Link
            href="/become-an-advisor/apply"
            className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)" }}
          >
            Apply Now
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <main className="bg-white">

        {/* ── Role header ── */}
        <section className="border-b border-gray-100 bg-gray-50 py-12 md:py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">

              {/* Left: title + meta */}
              <div className="flex-1">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                    <Icon className="h-7 w-7" style={{ color: "#4b5563" }} strokeWidth={1.6} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Fractional Opportunity · CXOwork</p>
                    <p className="text-sm text-gray-500">{roleData.subtitle}</p>
                  </div>
                </div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
                  {roleData.title}
                </h1>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {[
                    { icon: Timer, label: roleData.commitment },
                    { icon: DollarSign, label: roleData.compensation },
                    { icon: Building2, label: roleData.stage },
                    { icon: MapPin, label: roleData.remote },
                  ].map((m) => (
                    <div key={m.label} className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                      <m.icon className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs font-medium text-gray-600">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Skill tags */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {jd.skills.map((skill) => (
                    <span key={skill} className="rounded-md px-2.5 py-1 text-[11px] font-medium" style={{ background: "#f3f4f6", color: "#374151", border: "1px solid #e5e7eb" }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: apply card */}
              <div className="w-full rounded-2xl p-6 md:w-72 md:flex-shrink-0" style={{ background: "#fff", border: "1px solid #e5e7eb" }}>
                <p className="mb-1 text-sm font-semibold text-gray-900">Ready to apply?</p>
                <p className="mb-5 text-xs leading-relaxed text-gray-500">
                  Application takes 10 minutes. We review within 48 hours and will reach out to schedule your panel interview.
                </p>
                <Link
                  href="/become-an-advisor/apply"
                  className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ background: "#0a0a0a" }}
                >
                  Apply Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-3 text-center text-[11px] text-gray-400">Free · No placement fees · Ever.</p>
                <div className="mt-5 space-y-2 border-t border-gray-100 pt-5">
                  {[
                    { icon: Timer, label: "10-min application" },
                    { icon: Users, label: "48-hr expert review" },
                    { icon: Briefcase, label: "Engagement within 2 wks" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2 text-xs text-gray-500">
                      <item.icon className="h-3.5 w-3.5 text-gray-300" />
                      {item.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── JD Body ── */}
        <section className="py-14">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 md:grid-cols-[1fr_256px]">

              {/* Main */}
              <div className="space-y-12">

                {/* About */}
                <div>
                  <h2 className="mb-4 font-display text-xl font-bold text-gray-900">About this opportunity</h2>
                  {jd.about.map((para, i) => (
                    <p key={i} className={`text-sm leading-relaxed text-gray-600 ${i > 0 ? "mt-3" : ""}`}>{para}</p>
                  ))}
                </div>

                {/* Responsibilities */}
                <div>
                  <h2 className="mb-4 font-display text-xl font-bold text-gray-900">Core responsibilities</h2>
                  <ul className="space-y-3">
                    {jd.responsibilities.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-300" />
                        <span className="text-sm leading-relaxed text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Required */}
                <div>
                  <h2 className="mb-4 font-display text-xl font-bold text-gray-900">Required qualifications</h2>
                  <ul className="space-y-3">
                    {jd.requiredQualifications.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#2563EB" }} />
                        <span className="text-sm leading-relaxed text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Nice to have */}
                <div>
                  <h2 className="mb-1 font-display text-xl font-bold text-gray-900">Nice to have</h2>
                  <p className="mb-4 text-xs text-gray-400">Not required — but will strengthen your match quality.</p>
                  <ul className="space-y-3">
                    {jd.niceToHave.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Star className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-200" />
                        <span className="text-sm leading-relaxed text-gray-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What you get */}
                <div className="rounded-2xl p-7" style={{ border: "1px solid #e5e7eb", background: "#fafafa" }}>
                  <h2 className="mb-4 font-display text-xl font-bold text-gray-900">Compensation & benefits</h2>
                  <ul className="space-y-3">
                    {jd.whatYouGet.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "#16a34a" }} />
                        <span className="text-sm leading-relaxed text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Process */}
                <div>
                  <h2 className="mb-4 font-display text-xl font-bold text-gray-900">Application process</h2>
                  <ol className="space-y-4">
                    {jd.process.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: "#4b5563" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-0.5 text-sm leading-relaxed text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ol>
                </div>

              </div>

              {/* Sidebar */}
              <div className="hidden md:block">
                <div className="sticky top-24 space-y-4">

                  <div className="rounded-2xl p-5" style={{ border: "1px solid #e5e7eb" }}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Roles included</p>
                    <ul className="space-y-2">
                      {roleData.types.map((t) => (
                        <li key={t} className="flex items-center gap-2 text-xs text-gray-600">
                          <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-300" />
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl p-5" style={{ border: "1px solid #e5e7eb" }}>
                    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">Key skills</p>
                    <div className="flex flex-wrap gap-1.5">
                      {jd.skills.slice(0, 6).map((s) => (
                        <span key={s} className="rounded-md px-2 py-1 text-[10px] font-medium" style={{ background: "#f3f4f6", color: "#4b5563" }}>{s}</span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/become-an-advisor/apply"
                    className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ background: "#0a0a0a" }}
                  >
                    Apply Now <ArrowRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href="/become-an-advisor"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium text-gray-500 transition-colors hover:border-gray-400"
                    style={{ borderColor: "#e5e7eb" }}
                  >
                    ← All roles
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="border-t border-gray-100 bg-gray-50 py-14">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-2xl font-bold text-gray-900">Looks like the right fit?</h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Application takes 10 minutes. No placement fees. Ever.
            </p>
            <Link
              href="/become-an-advisor/apply"
              className="mt-7 inline-flex items-center gap-2 rounded-2xl px-8 py-4 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, #2563EB, #1D4ED8)", boxShadow: "0 4px 20px rgba(37,99,235,0.25)" }}
            >
              Start Application <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
