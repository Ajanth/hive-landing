import {
  BellRingingIcon,
  BinocularsIcon,
  ClockCounterClockwiseIcon,
  GitPullRequestIcon,
  TerminalWindowIcon,
} from "@phosphor-icons/react"

import { Reveal } from "@/components/reveal"

const features = [
  {
    title: "See what needs attention",
    body: "Now, Queue, and Done make active work, later work, and completed work visible without terminal archaeology.",
    detail: "Unread, processing, notes, reminders, bookmarks",
    Icon: BinocularsIcon,
  },
  {
    title: "Return without rereading",
    body: "Search every local session, open a readable transcript, and generate a recap when a long thread needs compression.",
    detail: "Global search, in-thread find, on-demand recap",
    Icon: ClockCounterClockwiseIcon,
  },
  {
    title: "Keep the next step attached",
    body: "Turn a useful message into a note, bookmark, or reminder without separating it from the conversation.",
    detail: "Source message retained with every artifact",
    Icon: BellRingingIcon,
  },
  {
    title: "Continue in the right checkout",
    body: "Resume an OpenCode session in your terminal or work beside the Board in the selected tree.",
    detail: "Terminal resume, worktrees, embedded workspace",
    Icon: TerminalWindowIcon,
  },
  {
    title: "Review before you ship",
    body: "Inspect commit grouping, pull request copy, and CI state while consequential Git actions stay visible.",
    detail: "Reviewed commits, pull requests, repository checks",
    Icon: GitPullRequestIcon,
  },
] as const

export function FeatureStory() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-4 sm:px-6 md:grid-cols-12 lg:px-8">
        <Reveal className="md:col-span-4 md:pr-8">
          <div className="md:sticky md:top-28">
            <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.05em] sm:text-5xl">
              One continuous work context.
            </h2>
            <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
              Hive connects the conversation, the selected checkout, the decision, and the next action.
            </p>
          </div>
        </Reveal>

        <div className="feature-ledger md:col-span-8">
          {features.map(({ title, body, detail, Icon }, index) => (
            <Reveal key={title} delay={index * 0.035}>
              <article className="feature-ledger__item">
                <Icon aria-hidden="true" className="size-6 text-brand" weight="regular" />
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">{title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {body}
                  </p>
                </div>
                <p className="font-mono text-xs leading-relaxed text-muted-foreground">{detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
