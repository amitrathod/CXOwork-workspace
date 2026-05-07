"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Code2, Megaphone, TrendingUp, DollarSign, Settings2, Package,
  Users, ShieldCheck, ChevronRight, ChevronLeft,
  Sparkles, MapPin, Globe, Check, ArrowRight, X,
  Clock, Briefcase, Lock, Star, Send, ArrowLeft,
  Rocket, Cloud, Cpu, Search, Wrench, GitBranch,
  RefreshCw, Map, Target, BookOpen, Tag, BarChart3,
  PieChart, FileText, Award, Zap, Building, Heart,
  Plus, ChevronDown,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const LEVELS = [
  {
    id: "c-suite",
    label: "C-Suite",
    examples: "CEO, CTO, CFO, CMO, COO…",
    desc: "Top-tier strategic executives with full functional ownership and board-level visibility",
    rate: [8000, 16000],
    icon: Award,
  },
  {
    id: "vp",
    label: "VP Level",
    examples: "VP Engineering, VP Sales, VP Marketing…",
    desc: "Senior leaders who own a function end-to-end and manage teams of managers",
    rate: [5000, 10000],
    icon: Briefcase,
  },
  {
    id: "director",
    label: "Director",
    examples: "Director of Engineering, Director of Marketing…",
    desc: "Strong operators who manage delivery, teams, and cross-functional projects",
    rate: [3000, 7000],
    icon: Users,
  },
];

const FUNCTIONS = [
  { id: "Engineering", label: "Engineering", icon: Code2, desc: "Tech leadership, architecture, dev teams" },
  { id: "Revenue",     label: "Revenue",     icon: TrendingUp, desc: "Sales, GTM strategy, revenue growth" },
  { id: "Marketing",   label: "Marketing",   icon: Megaphone, desc: "Brand, demand gen, product marketing" },
  { id: "Finance",     label: "Finance",     icon: DollarSign, desc: "Financial strategy, fundraising, FP&A" },
  { id: "Operations",  label: "Operations",  icon: Settings2, desc: "Ops, process design, scaling" },
  { id: "Product",     label: "Product",     icon: Package, desc: "Product vision, roadmap, UX" },
  { id: "People",      label: "People & HR", icon: Users, desc: "Talent, culture, org design" },
  { id: "Security",    label: "Security",    icon: ShieldCheck, desc: "Cybersecurity, compliance, risk" },
];

// Outcomes keyed by function id
const OUTCOMES_BY_ROLE: Record<string, { label: string; icon: React.ElementType }[]> = {
  Engineering: [
    { label: "Build & launch an MVP", icon: Rocket },
    { label: "Scale engineering team (5→50)", icon: TrendingUp },
    { label: "Migrate to cloud / microservices", icon: Cloud },
    { label: "Implement AI/ML into product", icon: Cpu },
    { label: "Technical due diligence for fundraising", icon: Search },
    { label: "Fix tech debt & stabilise platform", icon: Wrench },
    { label: "Set up DevOps & CI/CD pipeline", icon: GitBranch },
    { label: "Prepare for SOC2 / ISO compliance", icon: ShieldCheck },
  ],
  Revenue: [
    { label: "Build a repeatable sales process", icon: RefreshCw },
    { label: "Go-to-market strategy for new product", icon: Map },
    { label: "Scale revenue 2x in 12 months", icon: TrendingUp },
    { label: "Build and manage SDR/AE team", icon: Users },
    { label: "Optimize conversion & pipeline", icon: Target },
    { label: "Enterprise sales playbook", icon: BookOpen },
    { label: "International expansion strategy", icon: Globe },
    { label: "Pricing & packaging overhaul", icon: Tag },
  ],
  Marketing: [
    { label: "Launch product to new market", icon: Rocket },
    { label: "Build brand from 0 to 1", icon: Award },
    { label: "Drive demand gen & pipeline", icon: Target },
    { label: "Content & SEO strategy", icon: FileText },
    { label: "Reposition existing brand", icon: RefreshCw },
    { label: "Build performance marketing engine", icon: BarChart3 },
  ],
  Finance: [
    { label: "Prepare for Series A/B fundraise", icon: DollarSign },
    { label: "Build financial model & projections", icon: BarChart3 },
    { label: "Set up accounting & reporting systems", icon: FileText },
    { label: "M&A preparation or due diligence", icon: Search },
    { label: "Cash flow management", icon: TrendingUp },
    { label: "Investor relations & board reporting", icon: PieChart },
  ],
  Operations: [
    { label: "Build company operating system", icon: Settings2 },
    { label: "Scale operations 10x", icon: TrendingUp },
    { label: "Implement OKR / performance framework", icon: Target },
    { label: "Supply chain optimization", icon: RefreshCw },
    { label: "International market operations", icon: Globe },
    { label: "Build customer success function", icon: Heart },
  ],
  Product: [
    { label: "Define 12-month product roadmap", icon: Map },
    { label: "Launch new product line", icon: Rocket },
    { label: "Improve user retention & NPS", icon: BarChart3 },
    { label: "Build product team from scratch", icon: Users },
    { label: "Redesign core product experience", icon: Zap },
    { label: "API / platform productization", icon: Code2 },
  ],
  People: [
    { label: "Build hiring process & employer brand", icon: Building },
    { label: "Scale team from 20 to 100", icon: TrendingUp },
    { label: "Culture & values definition", icon: Heart },
    { label: "Compensation & equity strategy", icon: DollarSign },
    { label: "Performance management system", icon: Target },
    { label: "Diversity, equity & inclusion", icon: Users },
  ],
  Security: [
    { label: "SOC2 or ISO 27001 certification", icon: Award },
    { label: "Security audit & risk assessment", icon: Search },
    { label: "HIPAA compliance readiness", icon: ShieldCheck },
    { label: "Incident response plan", icon: Zap },
    { label: "Security team hiring & leadership", icon: Users },
    { label: "Vendor security review program", icon: Check },
  ],
};

const DEFAULT_OUTCOMES: { label: string; icon: React.ElementType }[] = [
  { label: "Scale the business rapidly", icon: TrendingUp },
  { label: "Improve operational efficiency", icon: Settings2 },
  { label: "Prepare for fundraising", icon: DollarSign },
  { label: "Enter new markets", icon: Globe },
  { label: "Build and scale a team", icon: Users },
  { label: "Improve product or technology", icon: Rocket },
];

const STEP_LABELS = ["Role", "Outcome", "Location", "Timeline", "Summary"];
const TOTAL_STEPS = STEP_LABELS.length;

const INDUSTRY_OPTIONS = [
  "SaaS & Technology", "Fintech & Financial Services", "Healthcare & MedTech",
  "E-commerce & Retail", "Manufacturing & Operations", "Legal & Professional Services",
  "Climate & CleanTech", "EdTech", "Real Estate & PropTech",
  "Media & Entertainment", "Consumer Goods", "Other",
];

const JOB_FUNCTION_OPTIONS = [
  "Engineering & Technology", "Sales & Revenue", "Marketing & Growth",
  "Finance & Accounting", "Operations & Strategy", "Product Management",
  "People & HR", "Security & Compliance", "Business Development",
  "Customer Success", "Data & Analytics", "Legal & Regulatory",
];

// ─── AI Full-Page Experience ──────────────────────────────────────────────────

const AI_EXAMPLES = [
  "We're a Series A SaaS startup and need a fractional CTO to ship our MVP in 3 months, then hire our first 5 engineers.",
  "I'm the CEO of a fintech company and need a part-time CRO to build a repeatable outbound sales process.",
  "We need a fractional CMO to lead our rebrand and launch us into the enterprise market.",
];

function AIExperience({ onBack, onSubmit }: { onBack: () => void; onSubmit: (text: string) => void }) {
  const [text, setText] = useState("");
  const [exampleIdx, setExampleIdx] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const t = setInterval(() => setExampleIdx((i) => (i + 1) % AI_EXAMPLES.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => { textareaRef.current?.focus(); }, []);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-white transition text-sm font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to form
        </button>
        <Link href="/dashboard" className="flex items-center gap-2.5 opacity-90 hover:opacity-100 transition-opacity">
          <Image src="/logo.svg" alt="CXOwork" width={24} height={19} className="brightness-0 invert" />
          <span className="font-display font-bold text-[17px] tracking-tight text-white">CXOwork</span>
        </Link>
        <div className="w-28" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8">
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" /> AI-powered matching
            </span>
          </div>
          <div className="text-center space-y-3">
            <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">Describe what you need.</h1>
            <p className="text-gray-500 text-lg">Plain English is fine. We'll handle the matching, vetting, and intro.</p>
          </div>
          <div className="relative">
            <textarea ref={textareaRef} rows={6} value={text} onChange={(e) => setText(e.target.value)}
              placeholder={AI_EXAMPLES[exampleIdx]}
              className="w-full bg-gray-900 border border-gray-700 hover:border-gray-600 focus:border-blue-500 rounded-2xl px-5 py-4 pb-16 text-white text-base placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-none transition leading-relaxed"
            />
            <div className="absolute bottom-4 right-4 flex items-center gap-3">
              <span className={`text-xs ${text.length > 0 ? "text-gray-500" : "text-gray-700"}`}>{text.length} chars</span>
              <button onClick={() => text.trim().length > 10 && onSubmit(text)} disabled={text.trim().length <= 10}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition shadow-lg shadow-blue-900">
                <Send className="w-3.5 h-3.5" /> Find my match
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">What to include</p>
            <div className="flex flex-wrap gap-2">
              {["Your company stage", "The role you need", "Your main goal", "Hours per week", "Timeline"].map((h) => (
                <span key={h} className="px-3 py-1 bg-gray-800 text-gray-500 text-xs rounded-full">{h}</span>
              ))}
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-emerald-950/60 border border-emerald-800/40 rounded-xl">
            <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-300/80">Every advisor on CXOwork has signed an NDA with us before joining. Anything you share is legally protected.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="flex items-center gap-1.5 mb-8">
      {STEP_LABELS.map((label, i) => (
        <div key={label} className="flex-1 flex flex-col gap-1">
          <div className={`h-1 rounded-full transition-all duration-300 ${i < step ? "bg-blue-600" : i === step ? "bg-blue-400" : "bg-gray-200"}`} />
        </div>
      ))}
      <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">{step + 1}/{TOTAL_STEPS}</span>
    </div>
  );
}

// ─── Tag selector ─────────────────────────────────────────────────────────────

function TagSelector({ label, placeholder, selected, options, onChange, max = 3 }: {
  label: string; placeholder: string; selected: string[]; options: string[];
  onChange: (v: string[]) => void; max?: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function toggle(opt: string) {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else if (selected.length < max) {
      onChange([...selected, opt]);
    }
  }

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-medium text-gray-500 mb-1.5">{label} <span className="text-gray-400">(up to {max})</span></label>
      <div className="flex flex-wrap gap-1.5 mb-1.5">
        {selected.map((s) => (
          <span key={s} className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
            {s}
            <button onClick={() => onChange(selected.filter((x) => x !== s))} className="ml-0.5 hover:opacity-70 transition">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
        {selected.length < max && (
          <button onClick={() => setOpen((o) => !o)}
            className="inline-flex items-center gap-1 px-2.5 py-1 border border-dashed border-gray-300 text-gray-500 text-xs font-medium rounded-full hover:border-blue-400 hover:text-blue-600 transition">
            <Plus className="w-3 h-3" /> {placeholder}
          </button>
        )}
      </div>
      {open && (
        <div className="absolute top-full left-0 z-30 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 max-h-52 overflow-y-auto">
          {options.map((opt) => {
            const sel = selected.includes(opt);
            const full = !sel && selected.length >= max;
            return (
              <button key={opt} onClick={() => toggle(opt)} disabled={full}
                className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between transition ${sel ? "bg-blue-50 text-blue-700" : full ? "text-gray-300 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"}`}>
                {opt}
                {sel && <Check className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Step: Role ───────────────────────────────────────────────────────────────

function StepRole({ levels, onToggleLevel, roleFunction, onSelectFunction }: {
  levels: string[]; onToggleLevel: (id: string) => void;
  roleFunction: string; onSelectFunction: (id: string) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Who are you looking to hire?</h1>
        <p className="text-gray-500 mt-2">Tell us the seniority level and the function — we'll find the right match.</p>
      </div>

      {/* ── Part 1: Level ── */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Seniority level <span className="normal-case font-normal text-gray-400">(all 3 on by default)</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {LEVELS.map((level) => {
            const on = levels.includes(level.id);
            const Icon = level.icon;
            return (
              <button key={level.id} onClick={() => onToggleLevel(level.id)}
                className={`flex items-center gap-3 text-left px-4 py-4 rounded-xl border-2 transition-all ${on ? "border-blue-600 bg-blue-50 text-blue-800" : "border-gray-100 bg-white text-gray-700 hover:border-blue-200"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${on ? "bg-blue-100" : "bg-gray-100"}`}>
                  <Icon className={`w-4 h-4 ${on ? "text-blue-600" : "text-gray-500"}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-snug">{level.label}</p>
                  <p className={`text-[11px] mt-0.5 leading-snug ${on ? "text-blue-500" : "text-gray-400"}`}>{level.examples}</p>
                </div>
                {on && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Part 2: Function ── */}
      <div>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Function</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {FUNCTIONS.map((fn) => {
            const Icon = fn.icon;
            const on = roleFunction === fn.id;
            return (
              <button key={fn.id} onClick={() => onSelectFunction(fn.id)}
                className={`flex items-center gap-3 text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all ${on ? "border-blue-600 bg-blue-50 text-blue-800" : "border-gray-100 bg-white text-gray-700 hover:border-blue-200"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${on ? "bg-blue-100" : "bg-gray-100"}`}>
                  <Icon className={`w-4 h-4 ${on ? "text-blue-600" : "text-gray-500"}`} />
                </div>
                <span className="flex-1 leading-snug">{fn.label}</span>
                {on && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Step: Outcome ────────────────────────────────────────────────────────────

// ─── AI expand helpers ────────────────────────────────────────────────────────

const AI_EXPANSIONS: Record<string, string[]> = {
  Engineering: [
    "We're a {stage} startup looking for a fractional CTO to lead our engineering team. Our primary goal is to {goal}, and we need someone who can own the technical roadmap, scale our infrastructure, and mentor our growing developer team — all within the next 3–6 months.",
    "Our company is at an inflection point and needs senior engineering leadership on a part-time basis. We want to {goal}, while also building out our CI/CD pipeline, improving code quality standards, and preparing our platform for the next stage of growth.",
  ],
  Revenue: [
    "We're looking for a fractional CRO to help us build a repeatable, scalable sales motion. Our main objective is to {goal}, and we need someone who can audit our current pipeline, train our sales team, and own our go-to-market playbook.",
    "We need an experienced revenue leader who can hit the ground running. The goal is to {goal} within 6 months — this means redesigning our outbound process, tightening our ICP, and building a forecasting model our leadership team can trust.",
  ],
  Marketing: [
    "We're seeking a fractional CMO to elevate our brand and drive demand generation. The primary outcome we're targeting is to {goal}, and we need someone who can build the team, set the strategy, and execute across channels.",
    "Our marketing function needs senior leadership to help us {goal}. We want to build a content engine, establish our positioning, and create a pipeline of qualified leads — all while staying lean and capital-efficient.",
  ],
  Finance: [
    "We're preparing for our next fundraising round and need a fractional CFO to get us ready. The key goal is to {goal}, which includes building out our financial model, cleaning up our cap table, and preparing investor-ready materials.",
    "We need experienced finance leadership to help us {goal}. This involves setting up robust reporting systems, managing our burn rate, and ensuring we have the financial controls in place to support rapid growth.",
  ],
  Operations: [
    "We're scaling fast and need a fractional COO to bring structure and process to our operations. Our goal is to {goal} — this means designing our operating cadence, implementing OKRs, and building the systems that let our team execute without bottlenecks.",
    "We need an operations leader to help us {goal}. As we expand, we need someone to streamline our processes, improve cross-functional communication, and ensure we can scale without sacrificing quality or speed.",
  ],
  Product: [
    "We're looking for a fractional CPO to define and execute our product strategy. Our core objective is to {goal}, and we need someone who can work directly with engineering and design to ship the right things at the right time.",
    "We need senior product leadership to help us {goal}. This means refining our roadmap, improving our discovery process, and establishing a product culture focused on outcomes over output.",
  ],
  People: [
    "We're scaling our team rapidly and need a fractional CHRO to build the people infrastructure. Our primary goal is to {goal}, which includes building our hiring pipeline, establishing performance management, and creating a culture that attracts top talent.",
    "We need an experienced HR leader to help us {goal}. As we grow from {size} to the next stage, we need robust onboarding, clear career frameworks, and leadership that can help us retain our best people.",
  ],
  Security: [
    "We're preparing for enterprise customers and need a fractional CISO to get our security posture in order. Our main goal is to {goal}, which involves getting SOC 2 certified, implementing a security training program, and building an incident response plan.",
    "We need senior security leadership to help us {goal}. This means conducting a comprehensive audit, implementing security best practices across our stack, and ensuring we can pass enterprise security reviews.",
  ],
};

function getAIExpansion(roleFunction: string, description: string, outcomes: string[]): string {
  const templates = AI_EXPANSIONS[roleFunction] || AI_EXPANSIONS["Engineering"];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const goal = outcomes.length > 0 ? outcomes.slice(0, 2).join(" and ").toLowerCase() : description.slice(0, 60) || "achieve our key business goals";
  return template
    .replace("{goal}", goal)
    .replace("{stage}", "Series A")
    .replace("{size}", "20");
}

function StepOutcome({ roleFunction, selected, onSelect, description, onDescriptionChange }: {
  roleFunction: string; selected: string[]; onSelect: (v: string) => void;
  description: string; onDescriptionChange: (v: string) => void;
}) {
  const [expanding, setExpanding] = useState(false);
  const options = OUTCOMES_BY_ROLE[roleFunction] || DEFAULT_OUTCOMES;

  async function handleExpand() {
    if (!description.trim()) return;
    setExpanding(true);
    // Simulate a brief AI processing delay
    await new Promise(r => setTimeout(r, 900));
    const expanded = getAIExpansion(roleFunction, description, selected);
    onDescriptionChange(expanded);
    setExpanding(false);
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">What outcome are you trying to achieve?</h1>
        <p className="text-gray-500 mt-2">Select all that apply — this helps us find the best-fit advisor.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options.map((o) => {
          const Icon = o.icon;
          const on = selected.includes(o.label);
          return (
            <button key={o.label} onClick={() => onSelect(o.label)}
              className={`flex items-center gap-3 text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all ${on ? "border-blue-600 bg-blue-50 text-blue-800" : "border-gray-100 bg-white text-gray-700 hover:border-blue-200"}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${on ? "bg-blue-100" : "bg-gray-100"}`}>
                <Icon className={`w-4 h-4 ${on ? "text-blue-600" : "text-gray-500"}`} />
              </div>
              <span className="flex-1 leading-snug">{o.label}</span>
              {on && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="pt-2">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-sm font-semibold text-gray-800">Tell us more in your own words</p>
            <p className="text-sm text-gray-500 mt-0.5">Describe in 2–3 sentences what you want to accomplish in the next few weeks to 3 months.</p>
          </div>
          {description.trim().length > 0 && (
            <button
              onClick={handleExpand}
              disabled={expanding}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100 hover:border-blue-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {expanding ? (
                <>
                  <RefreshCw className="w-3 h-3 animate-spin" /> Expanding…
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3" /> Expand with AI
                </>
              )}
            </button>
          )}
        </div>
        <textarea rows={4} value={description} onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="e.g. We're launching our Series A in Q3 and need someone to own the technical roadmap, get our infrastructure investor-ready, and help us hire the first three engineers before the close."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none leading-relaxed"
        />
        {description.trim().length === 0 && (
          <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-blue-300" /> Start typing and the <span className="text-blue-500 font-medium">Expand with AI</span> button will appear
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Step: Location ───────────────────────────────────────────────────────────

function StepLocation({ selected, onSelect }: { selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Select your preferred advisor location.</h1>
        <p className="text-gray-500 mt-2">This helps surface the most relevant advisors, but your post is visible to all qualified candidates.</p>
      </div>
      <div className="flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
        <div className="p-1.5 bg-emerald-600 rounded-lg flex-shrink-0 mt-0.5"><Lock className="w-4 h-4 text-white" /></div>
        <div>
          <p className="text-sm font-semibold text-emerald-800">Confidentiality is built in</p>
          <p className="text-sm text-emerald-700 mt-0.5">Every advisor on CXOwork signs an NDA with us before joining the network. We share your brief only with advisors we think are a strong fit.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { id: "us", label: "U.S. only", desc: "Only advisors based in the United States", icon: MapPin },
          { id: "worldwide", label: "Worldwide", desc: "Advisors in any location — larger talent pool", icon: Globe },
        ].map((opt) => {
          const Icon = opt.icon;
          const on = selected === opt.id;
          return (
            <button key={opt.id} onClick={() => onSelect(opt.id)}
              className={`relative text-left p-5 rounded-2xl border-2 transition-all ${on ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-200"}`}>
              <div className="flex items-start justify-between mb-3">
                <Icon className={`w-6 h-6 ${on ? "text-blue-600" : "text-gray-500"}`} />
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${on ? "border-blue-600 bg-blue-600" : "border-gray-300"}`}>
                  {on && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
              </div>
              <p className={`font-bold text-lg ${on ? "text-blue-800" : "text-gray-900"}`}>{opt.label}</p>
              <p className="text-sm text-gray-500 mt-1">{opt.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step: Timeline ───────────────────────────────────────────────────────────

function StepTimeline({ hours, engagement, onChangeHours, onChangeEngagement }: {
  hours: string; engagement: string; onChangeHours: (v: string) => void; onChangeEngagement: (v: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">How would you like to engage?</h1>
        <p className="text-gray-500 mt-2">Help us understand the commitment level you're looking for.</p>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-500" /> Hours per week
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { id: "1-5",   label: "1–5 hrs/week",   desc: "Light-touch advisory, occasional check-ins", icon: Zap },
            { id: "5-10",  label: "5–10 hrs/week",   desc: "Light advisory, strategic guidance",          icon: Clock },
            { id: "10-20", label: "10–20 hrs/week",  desc: "Part-time fractional engagement",             icon: Briefcase },
            { id: "20-30", label: "20–30 hrs/week",  desc: "Significant fractional involvement",          icon: TrendingUp },
            { id: "30+",   label: "30+ hrs/week",    desc: "Near full-time fractional executive",         icon: Users },
          ].map((opt) => {
            const Icon = opt.icon;
            const on = hours === opt.id;
            return (
              <button key={opt.id} onClick={() => onChangeHours(opt.id)}
                className={`flex items-center gap-3 text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all ${on ? "border-blue-600 bg-blue-50 text-blue-800" : "border-gray-100 bg-white text-gray-700 hover:border-blue-200"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${on ? "bg-blue-100" : "bg-gray-100"}`}>
                  <Icon className={`w-4 h-4 ${on ? "text-blue-600" : "text-gray-500"}`} />
                </div>
                <span className="flex-1 leading-snug">{opt.label}</span>
                {on && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-blue-500" /> Engagement type
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "fractional", label: "Fractional", desc: "Embedded in your team, ongoing",    icon: Users },
            { id: "advisory",   label: "Advisory",   desc: "Strategic sessions & guidance",      icon: Sparkles },
            { id: "consulting", label: "Consulting", desc: "Project-based, defined scope",       icon: Briefcase },
          ].map((opt) => {
            const Icon = opt.icon;
            const on = engagement === opt.id;
            return (
              <button key={opt.id} onClick={() => onChangeEngagement(opt.id)}
                className={`flex items-center gap-3 text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all ${on ? "border-blue-600 bg-blue-50 text-blue-800" : "border-gray-100 bg-white text-gray-700 hover:border-blue-200"}`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${on ? "bg-blue-100" : "bg-gray-100"}`}>
                  <Icon className={`w-4 h-4 ${on ? "text-blue-600" : "text-gray-500"}`} />
                </div>
                <span className="flex-1 leading-snug">{opt.label}</span>
                {on && <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Step: Summary ────────────────────────────────────────────────────────────

function StepSummary({ levels, roleFunction, outcomes, description, location, hours, engagement }: {
  levels: string[]; roleFunction: string; outcomes: string[]; description: string; location: string; hours: string; engagement: string;
}) {
  const [companyName, setCompanyName] = useState("");
  const [industries, setIndustries] = useState<string[]>([]);
  const descriptionDraft = description;

  // Budget estimate: use highest selected level's rate
  const levelOrder = ["c-suite", "vp", "director"];
  const highestLevel = levelOrder.find(l => levels.includes(l));
  const levelData = LEVELS.find(l => l.id === highestLevel);
  const hm: Record<string, number> = { "1-5": 0.2, "5-10": 0.4, "10-20": 0.65, "20-30": 0.85, "30+": 1.0 };
  const em = engagement === "advisory" ? 0.7 : engagement === "consulting" ? 0.85 : 1.0;
  const h = hm[hours] || 0.65;
  const estMin = Math.round(((levelData?.rate[0] ?? 6000) * h * em) / 500) * 500;
  const estMax = Math.round(((levelData?.rate[1] ?? 13000) * h * em) / 500) * 500;
  const budgetStr = `$${estMin.toLocaleString()}–$${estMax.toLocaleString()}/mo`;

  const levelLabels = levels.map(l => LEVELS.find(lv => lv.id === l)?.label ?? l).join(", ");
  const fnData = FUNCTIONS.find(f => f.id === roleFunction);
  const roleDisplay = [levelLabels, fnData?.label].filter(Boolean).join(" · ");

  const summaryItems: { label: string; icon: React.ElementType; value: string }[] = [
    { label: "Looking for", icon: Briefcase, value: roleDisplay || "—" },
    { label: "Goals", icon: Target, value: outcomes.join(", ") || "—" },
    { label: "Location", icon: MapPin, value: location === "us" ? "U.S. only" : "Worldwide" },
    { label: "Commitment", icon: Clock, value: `${hours} hrs/week · ${engagement.charAt(0).toUpperCase() + engagement.slice(1)} · est. ${budgetStr}` },
    { label: "Description", icon: FileText, value: descriptionDraft.trim() || "—" },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Review your job brief</h1>
        <p className="text-gray-500 mt-1 text-sm">Make any edits before submitting — we'll take it from here.</p>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-50">
        {summaryItems.map(({ label, icon: Icon, value }) => (
          <div key={label} className="flex items-start gap-3 px-5 py-4">
            <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">{label}</p>
              <p className="text-sm font-medium text-gray-800 mt-0.5">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Company details */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
        <p className="text-sm font-semibold text-gray-700">A bit about your company</p>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">Company name</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g. Acme Corp"
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" />
        </div>
        <TagSelector
          label="Industry"
          placeholder="Add industry"
          selected={industries}
          options={INDUSTRY_OPTIONS}
          onChange={setIndustries}
          max={3}
        />
      </div>

      {/* NDA reminder */}
      <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800">
        <Lock className="w-4 h-4 text-emerald-600 flex-shrink-0" />
        <span>Every advisor signs an NDA with us before joining. Your details stay private.</span>
      </div>
    </div>
  );
}

// ─── Success ──────────────────────────────────────────────────────────────────

function StepSuccess({ role }: { role: string }) {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center text-center py-8 space-y-6">
      <div className="relative">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center">
          <Check className="w-12 h-12 text-blue-600" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <Star className="w-4 h-4 text-white" />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Your brief is submitted!</h1>
        <p className="text-gray-500 mt-2 max-w-md">Our matching team is reviewing your {role} brief right now.</p>
      </div>
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-left">
        <p className="text-sm font-semibold text-gray-700 mb-5">What happens next</p>
        <div className="space-y-5">
          {[
            { step: "1", label: "Brief under review", desc: "Our team reviews your requirements and verifies your brief.", done: true, time: "Right now" },
            { step: "2", label: "We will reach out", desc: "A member of our matching team will contact you to confirm your brief and ask any clarifying questions before we start searching.", done: false, time: "Within 12–24 hrs" },
            { step: "3", label: "Advisor shortlist prepared", desc: "We hand-pick 3–5 advisors who match your exact needs.", done: false, time: "Within 1–3 days" },
            { step: "4", label: "Profiles shared with you", desc: "You'll receive advisor profiles with bios, case studies, and rates.", done: false, time: "Within 3–5 days" },
            { step: "5", label: "Intro calls scheduled", desc: "Meet your top matches — no obligation, no pressure.", done: false, time: "Within the week" },
          ].map((s, i, arr) => (
            <div key={s.step} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${s.done ? "bg-green-500 text-white" : "bg-gray-100 text-gray-500"}`}>
                  {s.done ? <Check className="w-4 h-4" /> : s.step}
                </div>
                {i < arr.length - 1 && <div className="w-px flex-1 mt-2 bg-gray-100 min-h-[20px]" />}
              </div>
              <div className="flex-1 pb-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-800">{s.label}</p>
                  <p className="text-xs text-blue-600 font-medium whitespace-nowrap">{s.time}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-gray-500 max-w-sm">You'll receive an email once your advisor shortlist is ready.</p>
      <button onClick={() => router.push("/dashboard/engagements")}
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition flex items-center gap-2">
        Go to My Dashboard <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function GetMatchedPage() {
  const [showAI, setShowAI] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(0);

  const [levels, setLevels] = useState<string[]>(["c-suite", "vp", "director"]);
  const [roleFunction, setRoleFunction] = useState("");
  const [outcomes, setOutcomes] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [hours, setHours] = useState("");
  const [engagement, setEngagement] = useState("fractional");

  function toggleOutcome(v: string) {
    setOutcomes((prev) => prev.includes(v) ? prev.filter((o) => o !== v) : [...prev, v]);
  }

  function toggleLevel(id: string) {
    setLevels((prev) =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter((l) => l !== id) : prev  // keep at least 1
        : [...prev, id]
    );
  }

  function canNext() {
    if (step === 0) return levels.length > 0 && !!roleFunction;
    if (step === 1) return outcomes.length > 0;
    if (step === 2) return !!location;
    if (step === 3) return !!hours && !!engagement;
    return true;
  }

  function handleAISubmit() {
    if (!roleFunction) setRoleFunction("Engineering");
    if (outcomes.length === 0) setOutcomes(["Build & launch an MVP"]);
    if (!location) setLocation("worldwide");
    if (!hours) setHours("10-20");
    setShowAI(false);
    setStep(4);
  }

  if (showAI) return <AIExperience onBack={() => setShowAI(false)} onSubmit={handleAISubmit} />;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl"><StepSuccess role={FUNCTIONS.find(f => f.id === roleFunction)?.label ?? roleFunction} /></div>
      </div>
    );
  }

  const isLastStep = step === TOTAL_STEPS - 1;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top nav */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
        <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <Image src="/logo.svg" alt="CXOwork" width={28} height={22} />
          <span className="font-display font-bold text-[18px] tracking-tight text-gray-900">CXOwork</span>
        </Link>
        <button onClick={() => window.history.back()} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition">
          <X className="w-4 h-4" /> Cancel
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-10 pb-36">
          <ProgressBar step={step} />

          {step === 0 && <StepRole levels={levels} onToggleLevel={toggleLevel} roleFunction={roleFunction} onSelectFunction={setRoleFunction} />}
          {step === 1 && <StepOutcome roleFunction={roleFunction} selected={outcomes} onSelect={toggleOutcome} description={description} onDescriptionChange={setDescription} />}
          {step === 2 && <StepLocation selected={location} onSelect={setLocation} />}
          {step === 3 && <StepTimeline hours={hours} engagement={engagement} onChangeHours={setHours} onChangeEngagement={setEngagement} />}
          {step === 4 && <StepSummary levels={levels} roleFunction={roleFunction} outcomes={outcomes} description={description} location={location} hours={hours} engagement={engagement} />}
        </div>
      </div>

      {/* ── Persistent bottom bar — all steps including summary ── */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div />
          <div className="flex items-center gap-3">
            <button
              onClick={() => setStep((s) => s - 1)}
              disabled={step === 0}
              className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 text-gray-500 rounded-xl text-sm font-medium hover:bg-gray-50 transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            {!isLastStep ? (
              <button
                onClick={() => canNext() && setStep((s) => s + 1)}
                disabled={!canNext()}
                className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-blue-200"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition shadow-md shadow-blue-200"
              >
                Submit job post <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
