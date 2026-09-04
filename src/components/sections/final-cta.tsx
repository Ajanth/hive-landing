import { DownloadSimpleIcon } from "@phosphor-icons/react"

import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import { DOWNLOAD_URL } from "@/content/landing"

export function FinalCta() {
  return (
    <section className="py-24 md:py-32">
      <Reveal className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <img src="/hive-app-icon.webp" width={72} height={72} alt="" className="mx-auto size-18 rounded-xl" />
        <h2 className="mt-7 text-4xl leading-[1.05] font-semibold tracking-[-0.05em] sm:text-5xl">
          Free on macOS. Built for OpenCode.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Turn the history already on your Mac into a workspace you can use.
        </p>
        <Button
          size="lg"
          nativeButton={false}
          render={<a href={DOWNLOAD_URL} target="_blank" rel="noreferrer" />}
          className="mt-8 h-11 px-5"
        >
          <DownloadSimpleIcon data-icon="inline-start" aria-hidden="true" />
          Download for macOS
        </Button>
      </Reveal>
    </section>
  )
}
