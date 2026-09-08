type Feature = "notes" | "reminders" | "kanban" | "tasks" | "github"
type TextBounds = Pick<DOMRect, "left" | "right" | "top" | "bottom">

const DESKTOP_ANGLES: Record<Feature, number> = {
  kanban: 0, reminders: 67.5, tasks: 130, notes: 225, github: 305,
}
const MOBILE_ANGLES: Record<Feature, number> = {
  kanban: 0, reminders: 60, tasks: 120, notes: 180, github: 260,
}
const clamp = (value: number, low: number, high: number) =>
  Math.max(low, Math.min(high, value))

/** Layout works independently of WebGL; motion is stepped by the galaxy's RAF. */
export function createFeatureOrbit(surface: HTMLElement) {
  const cards = Array.from(surface.querySelectorAll<HTMLElement>(".feature-anchor"), (anchor) => ({
    anchor,
    plate: anchor.querySelector<HTMLElement>(".feature-card")!,
    feature: anchor.dataset.feature as Feature,
    baseAngle: Number(anchor.dataset.angle),
    left: 0, top: 0, width: 0, height: 0,
    x: 0, y: 0, vx: 0, vy: 0, angle: 0, va: 0,
    tx: 0, ty: 0, ta: 0,
  }))
  const copy = surface.parentElement!.querySelector<HTMLElement>(".hero-copy")!
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)")
  let bounds = surface.getBoundingClientRect()
  let textBounds: TextBounds[] = []
  let dirty = false
  let disposed = false
  let pointerInside = false
  let wasActive = false
  let clientX = 0
  let clientY = 0
  let px = 0
  let py = 0
  let influence = 0

  function keepInside(card: typeof cards[number]) {
    card.tx = clamp(card.tx, 16 - card.left, bounds.width - 16 - card.width - card.left)
    card.ty = clamp(card.ty, 16 - card.top, bounds.height - 28 - card.height - card.top)
    for (const text of textBounds) {
      const left = card.left + card.tx
      const top = card.top + card.ty
      if (left + card.width <= text.left || left >= text.right ||
          top + card.height <= text.top || top >= text.bottom) continue
      const pushRight = text.right - left
      const pushAbove = top + card.height - text.top
      const pushBelow = text.bottom - top
      if (pushAbove < pushRight && card.top + card.height <= text.top) card.ty -= pushAbove
      else if (pushBelow < pushRight && card.top >= text.bottom) card.ty += pushBelow
      else card.tx += pushRight
    }
  }

  function separateTargets() {
    for (const card of cards) keepInside(card)
    // Only five cards: keep neighboring labels readable without a physics engine.
    for (let pass = 0; pass < 6; pass++) {
      for (let i = 0; i < cards.length; i++) {
        for (let j = i + 1; j < cards.length; j++) {
          const a = cards[i]
          const b = cards[j]
          const ax = a.left + a.tx, ay = a.top + a.ty
          const bx = b.left + b.tx, by = b.top + b.ty
          const overlapX = Math.min(ax + a.width, bx + b.width) - Math.max(ax, bx) + 12
          const overlapY = Math.min(ay + a.height, by + b.height) - Math.max(ay, by) + 14
          if (overlapX <= 0 || overlapY <= 0) continue
          if (overlapX < overlapY) {
            const atx = a.tx, aty = a.ty, btx = b.tx, bty = b.ty
            const direction = a.left + a.width / 2 < b.left + b.width / 2 ? -1 : 1
            a.tx += overlapX * 0.5 * direction
            b.tx -= overlapX * 0.5 * direction
            keepInside(a)
            keepInside(b)
            const gap = direction < 0
              ? b.left + b.tx - (a.left + a.tx + a.width)
              : a.left + a.tx - (b.left + b.tx + b.width)
            if (gap >= 11.9) continue
            // At a viewport/text boundary, use the vertical space instead.
            a.tx = atx; a.ty = aty; b.tx = btx; b.ty = bty
          }
          const direction = a.top < b.top ? -1 : 1
          a.ty += overlapY * 0.5 * direction
          b.ty -= overlapY * 0.5 * direction
          keepInside(a)
          keepInside(b)
        }
      }
    }
  }

  function reset() {
    for (const card of cards) {
      card.x = card.y = card.vx = card.vy = card.angle = card.va = 0
      card.tx = card.ty = card.ta = 0
      card.plate.style.transform = `rotate(${card.baseAngle}deg)`
    }
    wasActive = false
    influence = 0
  }

  function measure() {
    bounds = surface.getBoundingClientRect()
    const mobile = bounds.width <= 700
    const cx = bounds.width * (mobile ? 0.5 : 0.69)
    const cy = bounds.height * (mobile ? 0.67 : 0.5)
    const rx = mobile ? Math.min(95, bounds.width * 0.5 - 98) : bounds.width * 0.19
    const ry = bounds.height * (mobile ? 0.23 : 0.33)
    const angles = mobile ? MOBILE_ANGLES : DESKTOP_ANGLES
    for (const card of cards) {
      const box = card.anchor.getBoundingClientRect()
      card.width = box.width
      card.height = box.height
      const angle = angles[card.feature] * Math.PI / 180
      const radius = !mobile && card.feature === "kanban" ? 1.35 : 1
      card.left = cx + Math.sin(angle) * rx * radius - card.width / 2
      card.top = cy - Math.cos(angle) * ry * radius - card.height / 2
      card.tx = card.ty = 0
    }
    // Measure actual text lines so cards can occupy the empty space around them.
    textBounds = Array.from(copy.querySelectorAll(".wordmark, h1 span, .hero-description, .download-button"))
      .flatMap((element) => {
        const range = document.createRange()
        range.selectNodeContents(element)
        const rects = element.matches(".download-button")
          ? [element.getBoundingClientRect()]
          : Array.from(range.getClientRects())
        return rects.map((rect) => ({
          left: rect.left - bounds.left - 16, right: rect.right - bounds.left + 16,
          top: rect.top - bounds.top - 14, bottom: rect.bottom - bounds.top + 14,
        }))
      })
    separateTargets()
    for (const card of cards) {
      card.left += card.tx
      card.top += card.ty
      card.anchor.style.left = `${card.left}px`
      card.anchor.style.top = `${card.top}px`
    }
    reset()
    dirty = false
  }

  function recordPointer(event: PointerEvent) {
    if (event.pointerType === "touch") return
    clientX = event.clientX
    clientY = event.clientY
    pointerInside = true
  }
  function leave(event: PointerEvent) { if (!event.relatedTarget) pointerInside = false }
  function blur() { pointerInside = false }
  function markDirty() { dirty = true }

  // Resize immediately, even while paused or using the static WebGL fallback.
  const observer = new ResizeObserver(measure)
  observer.observe(surface)
  observer.observe(copy)
  for (const card of cards) observer.observe(card.anchor)
  window.addEventListener("pointermove", recordPointer, { passive: true })
  window.addEventListener("pointerout", leave, { passive: true })
  window.addEventListener("blur", blur)
  window.addEventListener("scroll", markDirty, { passive: true })
  reducedMotion.addEventListener("change", reset)
  measure()
  void document.fonts.ready.then(() => { if (!disposed) measure() })

  return {
    step(dt: number) {
      if (disposed || reducedMotion.matches) return
      if (dirty) measure()
      const active = pointerInside && clientX >= bounds.left && clientX <= bounds.right &&
        clientY >= bounds.top && clientY <= bounds.bottom
      if (active) {
        const nextX = clientX - bounds.left
        const nextY = clientY - bounds.top
        if (!wasActive) { px = nextX; py = nextY }
        const smoothing = 1 - Math.exp(-dt * 14)
        px += (nextX - px) * smoothing
        py += (nextY - py) * smoothing
      }
      wasActive = active
      influence += (Number(active) - influence) * (1 - Math.exp(-dt * 9))
      const range = Math.min(225, bounds.width * 0.27)
      const amplitude = Math.min(66, bounds.width * 0.075) * 65 / 55
      for (const card of cards) {
        const mass = card.feature === "kanban" ? 0.45 : 1
        const dx = card.left + card.width / 2 - px
        const dy = card.top + card.height / 2 - py
        const d2 = dx * dx + dy * dy
        const near = Math.exp(-d2 / (range * range * 0.55)) * influence
        const force = amplitude * near * mass / Math.sqrt(d2 + 1800)
        card.tx = dx * force
        card.ty = dy * force
        card.ta = clamp(card.tx * 0.045, -2.5, 2.5)
      }
      separateTargets()

      // Analytic critically damped springs remain smooth at different frame rates.
      const omega = 8
      const decay = Math.exp(-omega * dt)
      for (const card of cards) {
        const dx = card.x - card.tx, dy = card.y - card.ty, da = card.angle - card.ta
        const ix = (card.vx + omega * dx) * dt
        const iy = (card.vy + omega * dy) * dt
        const ia = (card.va + omega * da) * dt
        card.x = card.tx + (dx + ix) * decay
        card.y = card.ty + (dy + iy) * decay
        card.angle = card.ta + (da + ia) * decay
        card.vx = (card.vx - omega * ix) * decay
        card.vy = (card.vy - omega * iy) * decay
        card.va = (card.va - omega * ia) * decay
        card.plate.style.transform = `translate3d(${card.x.toFixed(3)}px, ${card.y.toFixed(3)}px, 0) rotate(${(card.baseAngle + card.angle).toFixed(3)}deg)`
      }
    },
    dispose() {
      disposed = true
      observer.disconnect()
      window.removeEventListener("pointermove", recordPointer)
      window.removeEventListener("pointerout", leave)
      window.removeEventListener("blur", blur)
      window.removeEventListener("scroll", markDirty)
      reducedMotion.removeEventListener("change", reset)
    },
  }
}
