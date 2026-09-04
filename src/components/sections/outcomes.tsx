import { Reveal } from "@/components/reveal"
import { outcomes } from "@/content/landing"

export function Outcomes() {
  return (
    <section className="border-y border-border/70 py-16 md:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <h2 className="text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl">
            Work that remembers where it came from.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Hive gives agent work a visible place, useful memory, and a clear path back into the repository.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((outcome, index) => (
            <Reveal
              key={outcome.title}
              delay={index * 0.06}
              className="border-l border-border pl-5 lg:min-h-32 lg:pr-7"
            >
              <h3 className="text-base font-semibold">{outcome.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{outcome.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
