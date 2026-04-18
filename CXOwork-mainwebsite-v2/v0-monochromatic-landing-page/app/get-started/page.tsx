"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Code2, Megaphone, TrendingUp, Layers, Settings, DollarSign, Users, Pen, Database, Scale } from "lucide-react"

function CXOworkLogo() {
  return (
    <span className="inline-flex items-center gap-2">
      <svg width="24" height="20" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ height: 24, width: 24, flexShrink: 0 }} aria-hidden="true">
        <path d="M9.22678 12.4612C5.3038 12.4612 5.3038 17.9995 9.22678 17.9995H16.9285L13.2424 12.4612H9.22678Z" fill="#7B9BF8"/>
        <path d="M9.22691 12.4612C5.30394 12.4612 5.30394 17.9995 9.22691 17.9995C2.21748 18.0861 0.919442 6.23061 9.28648 6.23061H15.9767L19.8709 12.3747L9.19994 12.4612H9.22691Z" fill="#2650F5"/>
        <path d="M8.93623 17.9949C9.04363 17.998 9.15195 17.9995 9.2612 17.9995C9.15147 18.0009 9.04315 17.9993 8.93623 17.9949C-2.52646 17.6669 -3.46322 0 9.05379 0H17.7417L21.6359 6.14407L9.32075 6.23061C1.08469 6.23061 2.2135 17.7178 8.93623 17.9949Z" fill="#032EF4"/>
      </svg>
      <span className="font-display text-xl font-bold"><span style={{ color: '#032EF4' }}>CXO</span><span style={{ color: '#111' }}>work</span></span>
    </span>
  )
}

const TOTAL_STEPS = 6

const heroStatements = [
  "You're building something that matters. Let's make sure leadership doesn't become the bottleneck.",
  "Most breakthrough companies hit their first scaling wall between $1M and $5M. You don't have to figure it out alone.",
  "The right fractional executive doesn't just fill a seat. They change the trajectory.",
  "Every founder hits moments where the gap between where you are and where you need to be feels enormous. That gap has a name — and a solution.",
  "You're one step away from meeting an executive who's done exactly this before.",
  "Serious growth starts with a serious conversation. We'll reach out within one business day.",
]

const thankYouHeroStatement = "The window is open. The right executive is ready. Let's get started."

const industryOptions = [
  "SaaS & Technology",
  "Healthcare & MedTech",
  "Fintech & Financial Services",
  "Manufacturing & Operations",
  "E-commerce & Retail",
  "Legal & Professional Services",
  "Climate & CleanTech",
  "Other",
]

const companySizeOptions = [
  "Pre-revenue / Idea stage",
  "1–10 employees",
  "11–50 employees",
  "51–200 employees",
  "200+ employees",
]

const roleOptions = [
  { label: "Engineering", subtext: "CTOs, Head of Engineering, Architects, Technical Leaders", icon: Code2 },
  { label: "Marketing", subtext: "CMOs, Head of Marketing, Creative Directors, Growth", icon: Megaphone },
  { label: "Sales", subtext: "CROs, Head of Sales, Account Executives", icon: TrendingUp },
  { label: "Product", subtext: "Head of Product, Product Managers, Strategists", icon: Layers },
  { label: "Operations", subtext: "COOs, Head of Operations, Operations Managers", icon: Settings },
  { label: "Finance", subtext: "CFOs, Accountants, Financial Analysts", icon: DollarSign },
  { label: "People", subtext: "CHROs, Head of People, Head of Talent, Recruiters", icon: Users },
  { label: "Design", subtext: "Head of Design, Product Designers, UX Researchers", icon: Pen },
  { label: "Data", subtext: "Chief Data Officers, Data Scientists, ML Engineers", icon: Database },
  { label: "Legal", subtext: "Head of Legal, Legal Counsel, Compliance, Contract Specialists", icon: Scale },
]

const challengeOptions = [
  "Fundraising readiness",
  "Revenue growth",
  "Operational efficiency",
  "Go-to-market strategy",
  "Financial controls & reporting",
  "Tech infrastructure",
  "Team building & culture",
  "Board & investor relations",
]

// Pseudo-random profile count based on role selection
const profileCountByRole: Record<string, number> = {
  "Engineering": 34,
  "Marketing": 29,
  "Sales": 27,
  "Product": 31,
  "Operations": 24,
  "Finance": 22,
  "People": 18,
  "Design": 21,
  "Data": 26,
  "Legal": 15,
}

type FormData = {
  industry: string
  companySize: string
  role: string
  challenges: string[]
  email: string
  password: string
  confirmPassword: string
  phone: string
}

function MountainSVG() {
  return (
    <svg
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-lg opacity-30"
      aria-hidden="true"
    >
      {/* Back layer - darkest */}
      <path
        d="M0 600L150 350L280 450L400 200L520 380L650 280L800 600H0Z"
        fill="#0f1e5c"
      />
      {/* Middle layer */}
      <path
        d="M0 600L100 420L200 480L350 300L480 420L600 350L750 450L800 600H0Z"
        fill="#1e3a8a"
      />
      {/* Front layer - lightest */}
      <path
        d="M0 600L80 480L180 520L300 400L420 500L550 420L680 480L800 600H0Z"
        fill="#2563eb"
      />
      {/* Accent peaks */}
      <path
        d="M350 300L380 260L410 300"
        stroke="#7B9BF8"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M600 350L640 300L680 350"
        stroke="#7B9BF8"
        strokeWidth="2"
        fill="none"
      />
      {/* Top ridge line */}
      <path
        d="M150 350L280 450L400 200L520 380L650 280"
        stroke="#7B9BF8"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />
    </svg>
  )
}

function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border-2 px-5 py-3.5 text-left text-sm font-medium transition-all duration-200"
      style={selected
        ? { background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderColor: 'transparent', color: '#fff', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }
        : { borderColor: 'hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }
      }
      onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(37,99,235,0.4)' }}
      onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(var(--border))' }}
    >
      {label}
    </button>
  )
}

function RoleCard({
  label,
  subtext,
  icon: Icon,
  selected,
  onClick,
}: {
  label: string
  subtext: string
  icon: React.ElementType
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border-2 px-4 py-4 text-left transition-all duration-200"
      style={selected
        ? { background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderColor: 'transparent', color: '#fff', boxShadow: '0 4px 12px rgba(37,99,235,0.25)' }
        : { borderColor: 'hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }
      }
      onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(37,99,235,0.4)' }}
      onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(var(--border))' }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Icon className="h-4 w-4 flex-shrink-0" style={selected ? { color: 'rgba(255,255,255,0.85)' } : { color: 'hsl(var(--muted-foreground))' }} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <p className="text-xs leading-relaxed" style={selected ? { color: 'rgba(255,255,255,0.75)' } : { color: 'hsl(var(--muted-foreground))' }}>
        {subtext}
      </p>
    </button>
  )
}

function PillOption({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border-2 px-4 py-2 text-sm font-medium transition-all duration-200"
      style={selected
        ? { background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', borderColor: 'transparent', color: '#fff', boxShadow: '0 4px 12px rgba(37,99,235,0.20)' }
        : { borderColor: 'hsl(var(--border))', backgroundColor: 'hsl(var(--background))', color: 'hsl(var(--foreground))' }
      }
      onMouseEnter={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(37,99,235,0.4)' }}
      onMouseLeave={e => { if (!selected) (e.currentTarget as HTMLButtonElement).style.borderColor = 'hsl(var(--border))' }}
    >
      {label}
    </button>
  )
}

export default function GetStartedPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    industry: "",
    companySize: "",
    role: "",
    challenges: [],
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.industry !== ""
      case 2:
        return formData.companySize !== ""
      case 3:
        return formData.role !== ""
      case 4:
        return formData.challenges.length > 0
      case 5:
        return (
          formData.email.trim() !== "" &&
          formData.email.includes("@") &&
          formData.password.length >= 8 &&
          formData.password === formData.confirmPassword
        )
      case 6:
        return true // Phone is optional
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    if (canProceed()) {
      setIsSubmitted(true)
    }
  }

  const toggleChallenge = (challenge: string) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(challenge)
        ? prev.challenges.filter((c) => c !== challenge)
        : [...prev.challenges, challenge],
    }))
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
    }),
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              What best describes your industry?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {industryOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={formData.industry === option}
                  onClick={() => setFormData({ ...formData, industry: option })}
                />
              ))}
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              How large is your company?
            </h2>
            <div className="flex flex-col gap-3">
              {companySizeOptions.map((option) => (
                <OptionCard
                  key={option}
                  label={option}
                  selected={formData.companySize === option}
                  onClick={() => setFormData({ ...formData, companySize: option })}
                />
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                What role are you hiring for?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">Select the type of role you&apos;re looking to fill.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {roleOptions.map((option) => (
                <RoleCard
                  key={option.label}
                  label={option.label}
                  subtext={option.subtext}
                  icon={option.icon}
                  selected={formData.role === option.label}
                  onClick={() => setFormData({ ...formData, role: option.label })}
                />
              ))}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              What&apos;s your most pressing challenge right now?
            </h2>
            <p className="text-sm text-muted-foreground">Select all that apply</p>
            <div className="flex flex-wrap gap-3">
              {challengeOptions.map((option) => (
                <PillOption
                  key={option}
                  label={option}
                  selected={formData.challenges.includes(option)}
                  onClick={() => toggleChallenge(option)}
                />
              ))}
            </div>
          </div>
        )
      case 5: {
        const profileCount = formData.role ? (profileCountByRole[formData.role] ?? 24) : 24
        const passwordMismatch = formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword
        const passwordTooShort = formData.password.length > 0 && formData.password.length < 8
        return (
          <div className="space-y-5">
            {/* Profile count banner */}
            <div className="rounded-2xl border-2 border-border bg-background px-5 py-4 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                We found{" "}
                <span className="font-bold text-foreground">{profileCount}</span>{" "}
                CXOwork profiles with{" "}
                <span className="font-bold text-foreground">{formData.role || "expert"}</span>{" "}
                experience that are ready to start in{" "}
                <span className="font-bold text-foreground">1–2 weeks</span>
              </p>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
                Let&apos;s Get You Connected!
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Get connected with fractional talent uniquely qualified for your needs in{" "}
                <span className="font-semibold text-foreground">48 hours</span>.
                Screen candidates risk-free and find your perfect match.
              </p>
            </div>

            <div className="space-y-3">
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Work email"
                className="w-full rounded-xl border-2 border-border bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-[#2563EB] focus:outline-none"
              />
              <div>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Create password"
                  className="w-full rounded-xl border-2 border-border bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-[#2563EB] focus:outline-none"
                />
                {passwordTooShort && (
                  <p className="mt-1.5 text-xs text-red-500">Password must be at least 8 characters</p>
                )}
              </div>
              <div>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                  className="w-full rounded-xl border-2 border-border bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-[#2563EB] focus:outline-none"
                />
                {passwordMismatch && (
                  <p className="mt-1.5 text-xs text-red-500">Passwords do not match</p>
                )}
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              By creating an account you agree to our{" "}
              <a href="#" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
            </p>
          </div>
        )
      }
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-foreground md:text-3xl">
              Phone number
            </h2>
            <p className="text-sm text-muted-foreground">Optional</p>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+1 (555) 000-0000"
              className="w-full rounded-xl border-2 border-border bg-background px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-[#2563EB] focus:outline-none"
            />
          </div>
        )
      default:
        return null
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Side - Thank You */}
        <div className="flex min-h-[50vh] flex-1 flex-col justify-center bg-background px-8 py-12 lg:min-h-screen lg:px-16">
          <div className="mx-auto w-full max-w-md">
            {/* Logo */}
            <Link href="/" className="mb-12 inline-flex items-center gap-2">
              <CXOworkLogo />
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
                Thank you!
              </h1>
              <p className="text-lg text-muted-foreground">
                We&apos;ll be in touch within one business day.
              </p>
              <Link
                href="/"
                className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', boxShadow: '0 4px 20px rgba(37,99,235,0.30)' }}
              >
                <ChevronLeft className="h-4 w-4" />
                Back to homepage
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Dark with Hero Statement */}
        <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center px-8 py-12 lg:min-h-screen lg:px-16" style={{ backgroundColor: '#030d2e' }}>
          <div className="flex flex-col items-center gap-12 text-center">
            <MountainSVG />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-md font-display text-2xl font-bold leading-relaxed text-primary-foreground md:text-3xl"
            >
              {thankYouHeroStatement}
            </motion.p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Side - Form */}
      <div className="relative flex min-h-[50vh] flex-1 flex-col bg-background px-8 py-12 lg:min-h-screen lg:px-16">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
          {/* Logo */}
          <Link href="/" className="mb-8 inline-flex items-center gap-2">
            <CXOworkLogo />
          </Link>

          {/* Step Indicator */}
          <p className="mb-8 text-sm text-muted-foreground">
            Step {currentStep} of {TOTAL_STEPS}
          </p>

          {/* Form Content */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center gap-2 rounded-full border-2 border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:border-foreground disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </button>

            {currentStep === TOTAL_STEPS ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', boxShadow: '0 4px 20px rgba(37,99,235,0.30)' }}
              >
                Submit
                <ChevronRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-full px-7 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)', boxShadow: '0 4px 20px rgba(37,99,235,0.30)' }}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border">
          <motion.div
            className="h-full"
            style={{ background: 'linear-gradient(90deg, #2563EB, #1D4ED8)' }}
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Right Side - Dark with Hero Statement */}
      <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center px-8 py-12 lg:min-h-screen lg:px-16" style={{ backgroundColor: '#030d2e' }}>
        <div className="flex flex-col items-center gap-12 text-center">
          <MountainSVG />
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="max-w-md font-display text-2xl font-bold leading-relaxed text-primary-foreground md:text-3xl"
            >
              {heroStatements[currentStep - 1]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
