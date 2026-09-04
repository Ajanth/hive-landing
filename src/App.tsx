import { MotionConfig } from "motion/react"

import {
  FeatureStory,
  FinalCta,
  Hero,
  HowItWorks,
  Integrations,
  Outcomes,
  Showcase,
  Trust,
} from "@/components/sections"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main-content"
        className="fixed top-3 left-3 z-[100] -translate-y-20 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <div className="min-h-[100dvh] overflow-x-clip bg-background text-foreground">
        <SiteHeader />
        <main id="main-content">
          <Hero />
          <Outcomes />
          <HowItWorks />
          <FeatureStory />
          <Showcase />
          <Integrations />
          <Trust />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  )
}

export default App
