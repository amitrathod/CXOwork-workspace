import { SmoothScroll } from "@/components/smooth-scroll"
import { StructuredData } from "@/components/structured-data"
import { Header } from "@/components/sections/header"
import { Hero } from "@/components/sections/hero"
import { StageSolutions } from "@/components/sections/stage-solutions"
import { DomainMastery } from "@/components/sections/domain-mastery"
import { NotesPreview } from "@/components/sections/notes-preview"
import { Platforms } from "@/components/sections/platforms"
import { Testimonials } from "@/components/sections/testimonials"
import { Features } from "@/components/sections/features"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <SmoothScroll>
      <StructuredData />
      <Header />
      <main>
        <Hero />
        <StageSolutions />
        <DomainMastery />
        <NotesPreview />
        <Platforms />
        <Testimonials />
        <Features />
        <CTA />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
