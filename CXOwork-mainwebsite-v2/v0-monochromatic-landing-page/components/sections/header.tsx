"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ChevronDown, Briefcase, Menu, X } from "lucide-react"
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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-6xl rounded-2xl bg-background/80 backdrop-blur-md border border-border shadow-lg"
    >
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" aria-hidden="true">
            <path d="M10.252 13.8458C5.89312 13.8458 5.89312 19.9994 10.252 19.9994H18.8094L14.7525 13.7624L10.252 13.8458Z" fill="#7B9BF8"/>
            <path d="M10.2521 13.8458C5.89327 13.8458 5.89327 19.9994 10.2521 19.9994C2.46388 20.0956 1.02161 6.92287 10.3183 6.92287L17.7228 6.83167L22.0787 13.7496L10.2222 13.8458H10.2521Z" fill="#2650F5"/>
            <path d="M9.92915 19.9943C10.0485 19.9978 10.1688 19.9995 10.2902 19.9995C10.1683 20.001 10.0479 19.9992 9.92915 19.9943C-2.80718 19.6299 -3.84802 0 10.0598 0H19.713L24.0398 6.82674L10.3564 6.9229C1.20521 6.9229 2.45944 19.6864 9.92915 19.9943Z" fill="#032EF4"/>
          </svg>
          <span className="font-display text-xl font-bold">
            <span style={{color:'#000'}}>CXO</span><span style={{color:'#000'}}>work</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("solutions")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-expanded={openDropdown === "solutions"}
              aria-haspopup="true"
            >
              Solutions
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === "solutions" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown === "solutions" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-48 rounded-xl border border-border bg-background/95 py-2 shadow-xl backdrop-blur-xl"
                >
                  {solutionsLinks.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      {link}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Industries Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setOpenDropdown("industries")}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
              aria-expanded={openDropdown === "industries"}
              aria-haspopup="true"
            >
              Industries
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${openDropdown === "industries" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {openDropdown === "industries" && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-52 rounded-xl border border-border bg-background/95 py-2 shadow-xl backdrop-blur-xl"
                >
                  {industriesLinks.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
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
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Become an Advisor
          </Link>
          <Link
            href="/faq"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Resources
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="#"
            className="hidden text-sm font-medium text-foreground transition-colors hover:text-muted-foreground sm:inline-block"
          >
            Log in
          </Link>
          <Link
            href="/get-started"
            className="btn-blue-gradient rounded-full px-5 py-2 text-sm font-medium"
          >
            Get Started
          </Link>
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border overflow-hidden"
          >
            <nav className="px-6 py-4 space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Solutions</p>
              {solutionsLinks.map((link) => (
                <Link key={link} href="#" className="block text-sm text-foreground py-1">{link}</Link>
              ))}
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider pt-2">Industries</p>
              {industriesLinks.map((link) => (
                <Link key={link} href="#" className="block text-sm text-foreground py-1">{link}</Link>
              ))}
              <Link href="/become-an-advisor" className="block text-sm text-foreground py-1">Become an Advisor</Link>
              <Link href="/faq" className="block text-sm text-foreground py-1">Resources</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
