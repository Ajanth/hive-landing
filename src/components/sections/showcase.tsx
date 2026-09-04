import { ProductScreenshot } from "@/components/product-screenshot"
import { Reveal } from "@/components/reveal"
import { screenshotSlots } from "@/content/landing"

export function Showcase() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-3xl">
          <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.05em] sm:text-5xl">
            Built to make busy work readable.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Real Hive captures can drop into these prepared frames without changing the layout or image ratios.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-12 md:grid-rows-2">
          {screenshotSlots.map((slot, index) => (
            <Reveal key={slot.src} delay={index * 0.06} className={slot.className}>
              <figure className="flex h-full flex-col">
                <ProductScreenshot
                  src={slot.src}
                  alt={`${slot.title} in Hive`}
                  className={slot.aspectClassName}
                />
                <figcaption className="mt-4 grid gap-1 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-5">
                  <span className="text-sm font-semibold">{slot.title}</span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{slot.description}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
