import { GithubLogoIcon, ListChecksIcon } from "@phosphor-icons/react"

import { Reveal } from "@/components/reveal"

export function Integrations() {
  return (
    <section className="border-y border-border/70 py-20 md:py-24">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
        <Reveal className="md:col-span-5">
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
            Bring team delivery in when it matters.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
            Hive keeps the core local. Linear and GitHub appear only when you connect them and the selected tree has context.
          </p>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 md:col-span-7">
          <Reveal className="integration-item">
            <ListChecksIcon aria-hidden="true" className="size-6 text-brand" />
            <h3 className="mt-6 text-lg font-semibold">Optional Linear handoff</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Draft a reviewable issue from a useful message, then choose its destination before creating it.
            </p>
          </Reveal>
          <Reveal className="integration-item" delay={0.08}>
            <GithubLogoIcon aria-hidden="true" className="size-6 text-brand" />
            <h3 className="mt-6 text-lg font-semibold">Repository-aware GitHub</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              See a linked pull request and its checks when the selected worktree exposes them.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
