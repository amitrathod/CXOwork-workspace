"use client"

import { motion, useInView } from "motion/react"
import { useRef, useState, useCallback } from "react"
import { Play } from "lucide-react"

const testimonials = [
  {
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "",
    company: "MongoDB",
    logoSvg: (
      <svg viewBox="0 0 90 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
        <circle cx="7" cy="10" r="6" fill="white" opacity="0.9"/>
        <path d="M7 4 C7 4 10 7 10 10 C10 13 7 16 7 16 C7 16 4 13 4 10 C4 7 7 4 7 4Z" fill="#00ED64"/>
        <text x="17" y="14" fill="white" fontSize="11" fontWeight="700" fontFamily="system-ui">MongoDB</text>
      </svg>
    ),
    quote: "Found our fractional CFO in 4 days. Closed our Series B 3 months later.",
  },
  {
    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "",
    company: "Cloud Software Group",
    logoSvg: (
      <svg viewBox="0 0 130 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-5 w-auto">
        <path d="M4 13 Q4 8 9 8 Q11 5 14 7 Q16 4 20 6 Q23 4 25 8 Q28 8 28 13 Q28 16 25 16 L7 16 Q4 16 4 13Z" fill="white" opacity="0.9"/>
        <text x="33" y="14" fill="white" fontSize="10" fontWeight="700" fontFamily="system-ui">cloud™</text>
        <text x="33" y="19" fill="white" fontSize="6" fontFamily="system-ui" opacity="0.8">SOFTWARE GROUP</text>
      </svg>
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
        <p className="text-sm font-medium leading-snug text-white/90 italic">
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
      <div className="mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
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
