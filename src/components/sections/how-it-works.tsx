import { ArrowRightIcon, DatabaseIcon, HardDriveIcon, RowsIcon } from "@phosphor-icons/react"

import { Reveal } from "@/components/reveal"
import { cn } from "@/lib/utils"

const flow = [
  {
    title: "OpenCode saves your work",
    body: "OpenCode stores sessions, messages, and tool parts in a SQLite database on your Mac.",
    detail: "~/.local/share/opencode/opencode.db",
    Icon: DatabaseIcon,
  },
  {
    title: "Hive reads it locally",
    body: "The history reader opens the database in read-only mode and queries only the sessions it needs.",
    detail: "No hosted transcript sync",
    Icon: HardDriveIcon,
  },
  {
    title: "Your history becomes useful",
    body: "A separate local index powers the Board, transcript navigation, and search while the source stays intact.",
    detail: "Board, search, and context",
    Icon: RowsIcon,
  },
] as const

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.05em] sm:text-5xl">
            Hive reads what OpenCode already saved.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            No account or hosted history service is required. Hive organizes the local record that already exists.
          </p>
        </Reveal>

        <div className="how-flow mt-14">
          {flow.map(({ title, body, detail, Icon }, index) => (
            <div key={title} className="contents">
              <Reveal
                className={cn(
                  "how-flow__item",
                  index === 0 && "is-first",
                  index === flow.length - 1 && "is-last",
                )}
                delay={index * 0.08}
              >
                <Icon aria-hidden="true" className="size-6 text-brand" weight="regular" />
                <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
                <code className="mt-6 block overflow-hidden text-ellipsis whitespace-nowrap font-mono text-xs text-foreground/75">
                  {detail}
                </code>
              </Reveal>
              {index < flow.length - 1 ? (
                <ArrowRightIcon aria-hidden="true" className="how-flow__arrow" weight="light" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
