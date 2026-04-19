"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState, useCallback } from "react"
import { Play } from "lucide-react"

// ── Growth partner logos (all local grayscale PNGs) ──────────────────────────
const PARTNER_LOGOS = [
  { name: "Directful",      src: "/logos/directful.png"      },
  { name: "AffableONE",     src: "/logos/affableone.png"     },
  { name: "TechIO",         src: "/logos/techiosoft.png"     },
  { name: "BrickRed",       src: "/logos/brickred.png"       },
  { name: "ThinkIQ",        src: "/logos/thinkiq.png"        },
  { name: "Zuper",          src: "/logos/zuper.png"          },
  { name: "ConnectedStars", src: "/logos/connectedstars.png" },
  { name: "Echomd",         src: "/logos/echomd.png"         },
]

// Duplicate for seamless infinite loop
const TICKER_ITEMS = [...PARTNER_LOGOS, ...PARTNER_LOGOS]

function LogoTicker() {
  return (
    <div className="relative overflow-hidden py-6 mb-10">
      {/* Left fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20"
        style={{ background: "linear-gradient(to right, var(--background) 0%, transparent 100%)" }}
      />
      {/* Right fade */}
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20"
        style={{ background: "linear-gradient(to left, var(--background) 0%, transparent 100%)" }}
      />

      {/* Scrolling track */}
      <div
        className="flex items-center gap-14"
        style={{
          width: "max-content",
          animation: "logoTickerScroll 28s linear infinite",
        }}
      >
        {TICKER_ITEMS.map((logo, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={logo.name}
              style={{
                height: "28px",
                width: "auto",
                maxWidth: "120px",
                opacity: 0.85,
                objectFit: "contain",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const sibling = e.currentTarget.nextElementSibling as HTMLElement | null
                if (sibling) sibling.style.display = "inline"
              }}
            />
            {/* Text fallback — hidden until image fails */}
            <span
              style={{
                display: "none",
                fontSize: "13px",
                fontWeight: 600,
                color: "#6b7280",
                whiteSpace: "nowrap",
                letterSpacing: "0.03em",
              }}
            >
              {logo.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

const testimonials = [
  {
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "",
    company: "Zuper",
    logoSvg: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/zuper.png" alt="Zuper"
        style={{ height: "22px", width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }} />
    ),
    quote: "Found our fractional CFO in 4 days. Closed our Series B 3 months later.",
  },
  {
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "",
    company: "Directful",
    logoSvg: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/logos/directful.png" alt="Directful"
        style={{ height: "22px", width: "auto", filter: "brightness(0) invert(1)", opacity: 0.9 }} />
    ),
    quote: "Our GTM motion transformed in 60 days with a CXOwork CMO.",
  },
]

function VideoCard({ testimonial, index, isInView }: {
  testimonial: typeof testimonials[0]
  index: number
  isInView: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    if (videoRef.current) {
      videoRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 * index }}
      className="relative overflow-hidden cursor-pointer"
      style={{
        aspectRatio: "16/10",
        border: "1px solid rgba(59,130,246,0.20)",
        boxShadow: "0 4px 24px rgba(37,99,235,0.12), 0 1px 4px rgba(0,0,0,0.08)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={testimonial.videoSrc}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop
        preload="metadata"
      />

      {/* Dark gradient overlay — fades on hover */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.65) 100%)",
          opacity: hovered ? 0.45 : 1,
        }}
      />

      {/* Blue tint overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: "rgba(37,99,235,0.18)",
          opacity: hovered ? 0 : 1,
        }}
      />

      {/* Play button — hides when playing */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: playing ? 0 : 1 }}
      >
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full backdrop-blur-sm transition-transform duration-200 hover:scale-110"
          style={{
            backgroundColor: "rgba(255,255,255,0.20)",
            border: "1.5px solid rgba(255,255,255,0.40)",
          }}
        >
          <Play className="h-5 w-5 fill-white text-white" style={{ marginLeft: "2px" }} />
        </div>
      </div>

      {/* Quote — visible when not playing */}
      <div
        className="absolute top-5 left-5 right-5 transition-opacity duration-300"
        style={{ opacity: playing ? 0 : 1 }}
      >
        <p className="text-base font-medium leading-snug text-white/90 italic">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Company logo — bottom left */}
      <div className="absolute bottom-5 left-5">
        {testimonial.logoSvg}
      </div>
    </motion.div>
  )
}

export function NotesPreview() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="features" aria-labelledby="features-heading" className="bg-background py-20 md:py-28">
      <style>{`
        @keyframes logoTickerScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Social Proof
          </p>
          <h2 id="features-heading" className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            <span className="text-balance">Hear from our growth partners</span>
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            Our growth partners are our ambassadors — hear directly from the companies who scaled faster with CXOwork.
          </p>
        </motion.div>

        {/* Partner logo ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <LogoTicker />
        </motion.div>

        {/* Video Testimonials */}
        <div className="grid gap-5 sm:grid-cols-2">
          {testimonials.map((t, i) => (
            <VideoCard key={t.company} testimonial={t} index={i} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}
