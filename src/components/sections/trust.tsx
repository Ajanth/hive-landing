import { CheckCircleIcon, DatabaseIcon, ShieldCheckIcon } from "@phosphor-icons/react"

import { Reveal } from "@/components/reveal"

const assurances = [
  "Built-in features do not upload OpenCode session history.",
  "Hive does not read agent credentials.",
  "There is no telemetry or remote logging.",
] as const

export function Trust() {
  return (
    <section id="privacy" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="trust-composition">
          <Reveal className="max-w-xl">
            <ShieldCheckIcon aria-hidden="true" className="size-8 text-brand" weight="regular" />
            <h2 className="mt-8 text-4xl leading-[1.05] font-semibold tracking-[-0.05em] sm:text-5xl">
              Your history stays local.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Hive adds organization without turning your OpenCode history into a hosted data source.
            </p>
            <ul className="mt-9 space-y-4">
              {assurances.map((assurance) => (
                <li key={assurance} className="flex items-start gap-3 text-sm leading-relaxed">
                  <CheckCircleIcon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand" weight="fill" />
                  {assurance}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="local-store-visual" delay={0.08}>
            <div className="local-store-visual__source">
              <DatabaseIcon aria-hidden="true" />
              <div>
                <span>OpenCode local store</span>
                <code>opencode.db</code>
              </div>
            </div>
            <div className="local-store-visual__connection" aria-hidden="true" />
            <div className="local-store-visual__index">
              <img src="/hive-app-icon.webp" width={44} height={44} alt="" className="size-11 rounded-xl" />
              <div>
                <span>Hive local index</span>
                <p>Search and navigation</p>
              </div>
            </div>
            <p className="local-store-visual__note">
              Network use covers updates, feedback you submit, optional Linear, explicit Git fetches, GitHub CLI checks for a selected tree, and workspace commands you run.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
