"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown, Menu, X } from "lucide-react"
import Link from "next/link"

const solutionsLinks = [
  "Advisor Matching",
  "Engagement Hub",
  "Impact Dashboard",
  "Advisor Workspace",
]

const industriesLinks = [
  "Startups & Scale-ups",
  "SMBs & Mid-market",
  "Healthcare & MedTech",
  "Professional Services",
]

export function Header() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ background: "#000000" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <svg width="28" height="22" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M10.252 13.8458C5.89312 13.8458 5.89312 19.9994 10.252 19.9994H18.8094L14.7525 13.7624L10.252 13.8458Z" fill="#7B9BF8"/>
            <path d="M10.2521 13.8458C5.89327 13.8458 5.89327 19.9994 10.2521 19.9994C2.46388 20.0956 1.02161 6.92287 10.3183 6.92287L17.7228 6.83167L22.0787 13.7496L10.2222 13.8458H10.2521Z" fill="#2650F5"/>
            <path d="M9.92915 19.9943C10.0485 19.9978 10.1688 19.9995 10.2902 19.9995C10.1683 20.001 10.0479 19.9992 9.92915 19.9943C-2.80718 19.6299 -3.84802 0 10.0598 0H19.713L24.0398 6.82674L10.3564 6.9229C1.20521 6.9229 2.45944 19.6864 9.92915 19.9943Z" fill="#032EF4"/>
          </svg>
          <span className="font-display text-lg font-bold" style={{ color: "#ffffff" }}>
            CXOwork
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">

          {/* Solutions dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("solutions")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: openDropdown === "solutions" ? "#fff" : "rgba(255,255,255,0.60)" }}
              aria-expanded={openDropdown === "solutions"}
              aria-haspopup="true"
            >
              Solutions
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === "solutions" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown === "solutions" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.13 }}
                  className="absolute left-0 top-full mt-2 w-48 rounded-xl py-2 shadow-2xl"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {solutionsLinks.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="block px-4 py-2 text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.60)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}
                    >
                      {link}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industries dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("industries")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="flex items-center gap-1 text-sm font-medium transition-colors"
              style={{ color: openDropdown === "industries" ? "#fff" : "rgba(255,255,255,0.60)" }}
              aria-expanded={openDropdown === "industries"}
              aria-haspopup="true"
            >
              Industries
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === "industries" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown === "industries" && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.13 }}
                  className="absolute left-0 top-full mt-2 w-52 rounded-xl py-2 shadow-2xl"
                  style={{ background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {industriesLinks.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="block px-4 py-2 text-sm transition-colors"
                      style={{ color: "rgba(255,255,255,0.60)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}
                    >
                      {link}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/become-an-advisor"
            className="text-sm font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.60)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}
          >
            Become an Advisor
          </Link>

          <Link
            href="/faq"
            className="text-sm font-medium transition-colors"
            style={{ color: "rgba(255,255,255,0.60)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}
          >
            Resources
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="hidden text-sm font-medium transition-colors sm:inline-block"
            style={{ color: "rgba(255,255,255,0.60)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.60)")}
          >
            Log in
          </Link>

          {/* CTA — white on black for maximum contrast */}
          <Link
            href="/get-started"
            className="rounded-full px-5 py-2 text-sm font-bold transition-opacity hover:opacity-90"
            style={{ background: "#ffffff", color: "#000000" }}
          >
            Get Started
          </Link>

          {/* Mobile toggle */}
          <button
            className="p-2 lg:hidden"
            style={{ color: "rgba(255,255,255,0.75)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden lg:hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            <nav className="space-y-3 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.30)" }}>
                Solutions
              </p>
              {solutionsLinks.map((link) => (
                <Link key={link} href="#" className="block text-sm py-1" style={{ color: "rgba(255,255,255,0.70)" }}>
                  {link}
                </Link>
              ))}
              <p className="pt-2 text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.30)" }}>
                Industries
              </p>
              {industriesLinks.map((link) => (
                <Link key={link} href="#" className="block text-sm py-1" style={{ color: "rgba(255,255,255,0.70)" }}>
                  {link}
                </Link>
              ))}
              <Link href="/become-an-advisor" className="block text-sm py-1" style={{ color: "rgba(255,255,255,0.70)" }}>
                Become an Advisor
              </Link>
              <Link href="/faq" className="block text-sm py-1" style={{ color: "rgba(255,255,255,0.70)" }}>
                Resources
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
