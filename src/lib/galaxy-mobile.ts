import type { GalaxyController } from "./galaxy-scene"

/** The same orbit on small screens, without downloading or compiling WebGL. */
export function createMobileGalaxy(canvas: HTMLCanvasElement, onFrame: (delta: number) => void): GalaxyController {
  const context = canvas.getContext("2d")
  if (!context) throw new Error("Canvas rendering is unavailable")
  const surface = canvas.parentElement!
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)")
  let seed = 73195
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const stars = Array.from({ length: 650 }, () => {
    const phase = random() * Math.PI * 2
    const stream = Math.floor(random() * 7)
    const scattered = random() > 0.68
    return {
      phase,
      radius: scattered ? 0.4 + random() * 1.1 : 0.73 + stream * 0.045 + Math.sin(phase * 3 + stream * 0.26) * 0.09,
      depth: (random() - 0.5) * (scattered ? 0.13 : 0.02),
      size: 0.8 + random() * 0.8,
      alpha: 0.3 + random() * 0.4,
      color: random() > 0.55 ? "#bfc5e7" : "#7f83d0",
    }
  })
  let width = 0
  let height = 0
  let frame = 0
  let lastFrame = 0
  let time = 0
  let visible = true
  let disposed = false

  function draw() {
    context!.clearRect(0, 0, width, height)
    const rx = width * 0.39
    const ry = height * 0.37
    const tilt = -0.42
    for (const star of stars) {
      const phase = star.phase + time * 0.018 / Math.max(0.4, star.radius)
      const x = Math.cos(phase) * rx * star.radius
      const y = Math.sin(phase) * ry * star.radius
      const px = width / 2 + x * Math.cos(tilt) - y * Math.sin(tilt)
      const py = height / 2 + x * Math.sin(tilt) + y * Math.cos(tilt) + star.depth * height
      context!.fillStyle = star.color
      context!.globalAlpha = star.alpha
      context!.fillRect(px, py, star.size, star.size)
    }
    context!.globalAlpha = 1
  }

  function canAnimate() {
    return !disposed && visible && !document.hidden && !reducedMotion.matches
  }

  function animate(now: number) {
    frame = 0
    if (!canAnimate()) return
    // Thirty frames per second is sufficient for the slow orbit and gentle card springs.
    if (now - lastFrame >= 30) {
      const delta = Math.min((now - lastFrame) / 1000, 0.06)
      lastFrame = now
      time += delta
      onFrame(delta)
      draw()
    }
    frame = requestAnimationFrame(animate)
  }

  function syncLoop() {
    if (!canAnimate()) {
      cancelAnimationFrame(frame)
      frame = 0
      draw()
    } else if (!frame) {
      lastFrame = performance.now()
      frame = requestAnimationFrame(animate)
    }
  }

  function resize() {
    const bounds = surface.getBoundingClientRect()
    width = Math.max(1, bounds.width)
    height = Math.max(1, bounds.height)
    const dpr = Math.min(devicePixelRatio || 1, 1.5)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    context!.setTransform(dpr, 0, 0, dpr, 0, 0)
    draw()
  }

  const resizeObserver = new ResizeObserver(resize)
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    syncLoop()
  })
  resizeObserver.observe(surface)
  intersectionObserver.observe(surface)
  reducedMotion.addEventListener("change", syncLoop)
  document.addEventListener("visibilitychange", syncLoop)
  resize()
  syncLoop()

  return {
    dispose() {
      disposed = true
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      reducedMotion.removeEventListener("change", syncLoop)
      document.removeEventListener("visibilitychange", syncLoop)
    },
  }
}
