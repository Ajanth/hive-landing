import { ArrowRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react"
import { motion, useReducedMotion } from "motion/react"

import { HeroJourney } from "@/components/hero-journey"
import { OceanBackdrop } from "@/components/ocean-backdrop"
import { Button } from "@/components/ui/button"
import { DOWNLOAD_URL } from "@/content/landing"

export function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="top" className="hero-section">
      <OceanBackdrop />
      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-8 px-4 py-8 sm:px-6 md:min-h-[calc(100dvh-4rem)] md:grid-cols-12 md:py-12 lg:gap-12 lg:px-8">
        <motion.div
          className="md:col-span-5"
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="max-w-2xl text-[clamp(2.75rem,6vw,5.4rem)] leading-[0.94] font-semibold tracking-[-0.065em] text-balance">
            Your OpenCode work, in one place.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hive turns local OpenCode history into a calm Board, then keeps every next step attached.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" />}
              className="h-11 px-5 text-sm"
            >
              <DownloadSimpleIcon data-icon="inline-start" aria-hidden="true" />
              Download for macOS
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<a href="#how-it-works" />}
              className="h-11 px-5 text-sm"
            >
              See how it works
              <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="min-w-0 md:col-span-7"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroJourney />
        </motion.div>
      </div>
    </section>
  )
}
