"use client"

import { motion, useInView } from "motion/react"
import { useRef } from "react"
import Link from "next/link"

const footerLinks = [
  "Solutions",
  "Industries",
  "Become an Advisor",
  "Resources",
  "Privacy",
]

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="border-t border-border bg-background"
    >
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2">
            <svg width="25" height="20" viewBox="0 0 25 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" aria-hidden="true">
              <path d="M10.252 13.8458C5.89312 13.8458 5.89312 19.9994 10.252 19.9994H18.8094L14.7525 13.7624L10.252 13.8458Z" fill="#d1d5db"/>
              <path d="M10.2521 13.8458C5.89327 13.8458 5.89327 19.9994 10.2521 19.9994C2.46388 20.0956 1.02161 6.92287 10.3183 6.92287L17.7228 6.83167L22.0787 13.7496L10.2222 13.8458H10.2521Z" fill="#9ca3af"/>
              <path d="M9.92915 19.9943C10.0485 19.9978 10.1688 19.9995 10.2902 19.9995C10.1683 20.001 10.0479 19.9992 9.92915 19.9943C-2.80718 19.6299 -3.84802 0 10.0598 0H19.713L24.0398 6.82674L10.3564 6.9229C1.20521 6.9229 2.45944 19.6864 9.92915 19.9943Z" fill="#6b7280"/>
            </svg>
            <span className="font-display text-lg font-bold">
              <span style={{ color: "#6b7280" }}>CXO</span><span style={{ color: "#9ca3af" }}>work</span>
            </span>
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6">
            {footerLinks.map((link) => (
              <Link
                key={link}
                href={link === "Become an Advisor" ? "/become-an-advisor" : "#"}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; 2026 CXOwork. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {/* LinkedIn */}
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            {/* X / Twitter */}
            <a
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="X (Twitter)"
            >
              <svg
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
