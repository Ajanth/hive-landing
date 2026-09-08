import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  MathUtils,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  Vector3,
  Vector4,
  WebGLRenderer,
} from "three"

import { fragmentShader, TRAIL_COUNT, vertexShader } from "./galaxy-shaders"

const TRAIL_INTERVAL = 0.15
// Shorter than the ring buffer's 2.4-second cycle, with a smooth zero at both ends.
const TRAIL_LIFETIME = 2.25
const DESKTOP_STAR_COUNT = 1200
const MOBILE_STAR_COUNT = 650

export interface GalaxyController {
  dispose: () => void
}

function createGeometry(count: number) {
  const geometry = new BufferGeometry()
  const seeds = new Float32Array(count * 4)
  const colors = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  let seed = 73195
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 4294967296
  }
  const normal = () =>
    Math.sqrt(-2 * Math.log(Math.max(0.000001, random()))) *
    Math.cos(2 * Math.PI * random())
  const indigo = new Color("#656dd7")
  const silver = new Color("#d2d9f0")
  const color = new Color()

  for (let i = 0; i < count; i++) {
    const phase = random() * Math.PI * 2
    const kind = random()
    const stream = Math.floor(random() * 7)
    let radius: number
    let thickness: number
    if (kind < 0.68) {
      radius = 1.68 + stream * 0.105 + Math.sin(phase * 3 + stream * 0.26) * 0.21 + normal() * 0.012
      thickness = 0.018
    } else if (kind < 0.97) {
      radius = 1 + Math.pow(random(), 0.7) * 2.05
      thickness = 0.13
    } else {
      radius = 0.15 + random() * 5.8
      thickness = 0.7
    }
    seeds.set([radius, phase, normal() * thickness, random()], i * 4)
    const pale = random()
    color.copy(indigo).lerp(silver, pale < 0.45 ? 0.08 : pale)
    colors.set([color.r, color.g, color.b], i * 3)
    sizes[i] = 1.25 + Math.pow(random(), 1.2) * 1.5
  }

  geometry.setAttribute("position", new BufferAttribute(new Float32Array(count * 3), 3))
  geometry.setAttribute("aSeed", new BufferAttribute(seeds, 4))
  geometry.setAttribute("aColor", new BufferAttribute(colors, 3))
  geometry.setAttribute("aSize", new BufferAttribute(sizes, 1))
  return geometry
}

export function createGalaxy(
  canvas: HTMLCanvasElement,
  onFrame: (delta: number) => void,
  onUnavailableChange: (unavailable: boolean) => void,
): GalaxyController {
  const surface = canvas.parentElement!
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)")
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: true })
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = SRGBColorSpace
  const scene = new Scene()
  const camera = new PerspectiveCamera(42, 1, 0.1, 40)
  camera.position.z = 7.7
  const geometry = createGeometry(DESKTOP_STAR_COUNT)
  const trails = Array.from({ length: TRAIL_COUNT }, () => new Vector4())
  const trailMotion = Array.from({ length: TRAIL_COUNT }, () => new Vector4())
  const trailBirth = new Float64Array(TRAIL_COUNT).fill(-Infinity)
  const trailStrength = new Float32Array(TRAIL_COUNT)
  const uniforms = {
    uTime: { value: 0 },
    uAspect: { value: 1 },
    uDpr: { value: 1 },
    uCenter: { value: new Vector2() },
    uScale: { value: 1 },
    uMobile: { value: 0 },
    uPointer: { value: new Vector3(20, 20, 0) },
    uTrails: { value: trails },
    uTrailMotion: { value: trailMotion },
  }
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: AdditiveBlending,
  })
  const stars = new Points(geometry, material)
  stars.frustumCulled = false
  scene.add(stars)

  let bounds = surface.getBoundingClientRect()
  let boundsDirty = false
  let playing = !reducedMotion.matches
  let inView = true
  let disposed = false
  let contextLost = false
  let frameId = 0
  let previous = 0
  let time = 0
  let pointerInside = false
  let pointerClientX = 0
  let pointerClientY = 0
  let trailIndex = 0
  let lastTrailAt = -TRAIL_INTERVAL

  function canAnimate() {
    return playing && inView && !document.hidden && !disposed && !contextLost
  }

  function syncLoop() {
    if (!canAnimate()) {
      cancelAnimationFrame(frameId)
      frameId = 0
    } else if (!frameId) {
      previous = performance.now()
      frameId = requestAnimationFrame(animate)
    }
  }

  function resize() {
    bounds = surface.getBoundingClientRect()
    boundsDirty = false
    const width = Math.max(1, bounds.width)
    const height = Math.max(1, bounds.height)
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    renderer.setDrawingBufferSize(width, height, dpr)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    uniforms.uAspect.value = camera.aspect
    uniforms.uDpr.value = dpr
    const mobile = width <= 700
    geometry.setDrawRange(0, mobile ? MOBILE_STAR_COUNT : DESKTOP_STAR_COUNT)
    uniforms.uMobile.value = Number(mobile)
    uniforms.uCenter.value.set(mobile ? 0 : camera.aspect * 1.124, mobile ? -0.78 : 0)
    uniforms.uScale.value = mobile ? 0.61 : Math.min(1.18, 0.76 + camera.aspect * 0.25)
    if (!contextLost) renderer.render(scene, camera)
  }

  function onPointerMove(event: PointerEvent) {
    if (event.pointerType === "touch") return
    // Never read layout, allocate particle data, or render in a pointer event.
    pointerClientX = event.clientX
    pointerClientY = event.clientY
    pointerInside = true
  }

  function onPointerOut(event: PointerEvent) {
    if (!event.relatedTarget) pointerInside = false
  }

  function onBlur() {
    pointerInside = false
  }

  function onScroll() {
    boundsDirty = true
  }

  function animate(now: number) {
    frameId = 0
    if (!canAnimate()) return
    const delta = Math.min((now - previous) / 1000, 0.04)
    previous = now
    time += delta
    uniforms.uTime.value = time
    onFrame(delta)
    if (boundsDirty) {
      bounds = surface.getBoundingClientRect()
      boundsDirty = false
    }

    const active = pointerInside && pointerClientX >= bounds.left &&
      pointerClientX <= bounds.right && pointerClientY >= bounds.top &&
      pointerClientY <= bounds.bottom
    const pointer = uniforms.uPointer.value
    if (active) {
      const x = ((pointerClientX - bounds.left) / bounds.width * 2 - 1) * camera.aspect
      const y = 1 - (pointerClientY - bounds.top) / bounds.height * 2
      if (pointer.z < 0.001) {
        pointer.x = x
        pointer.y = y
      }
      const follow = 1 - Math.exp(-delta * 16)
      const dx = (x - pointer.x) * follow
      const dy = (y - pointer.y) * follow
      pointer.x += dx
      pointer.y += dy
      const vx = MathUtils.clamp(dx / Math.max(delta, 0.001), -9, 9)
      const vy = MathUtils.clamp(dy / Math.max(delta, 0.001), -9, 9)
      const speed = Math.min(2.7, Math.hypot(vx, vy) * 0.25)
      if (time - lastTrailAt >= TRAIL_INTERVAL && speed > 0.06) {
        trails[trailIndex].set(pointer.x, pointer.y, 0, 0)
        trailMotion[trailIndex].set(vx * 0.025, vy * 0.025, 0, 0)
        trailBirth[trailIndex] = time
        trailStrength[trailIndex] = 0.25 + speed
        trailIndex = (trailIndex + 1) % TRAIL_COUNT
        lastTrailAt = time
      }
    }
    pointer.z += (Number(active) - pointer.z) * (1 - Math.exp(-delta * 9))

    for (let i = 0; i < TRAIL_COUNT; i++) {
      const age = time - trailBirth[i]
      if (age >= TRAIL_LIFETIME) {
        trails[i].z = 0
        continue
      }
      const fade = 1 - MathUtils.smoothstep(age, 0.3, TRAIL_LIFETIME)
      const envelope = MathUtils.smoothstep(age, 0, 0.16) * fade * fade
      trails[i].z = envelope * trailStrength[i] * 1.35
      trails[i].w = 0.18 + Math.min(age, 0.7) * 0.13
      trailMotion[i].z = Math.sin(age * 2) * 0.075
      trailMotion[i].w = Math.cos(age * 2) * 0.075
    }

    renderer.render(scene, camera)
    frameId = requestAnimationFrame(animate)
  }

  function onReducedMotion() {
    playing = !reducedMotion.matches
    uniforms.uPointer.value.z = 0
    trailBirth.fill(-Infinity)
    for (const trail of trails) trail.z = 0
    if (!contextLost) renderer.render(scene, camera)
    syncLoop()
  }

  function onContextLost(event: Event) {
    event.preventDefault()
    contextLost = true
    onUnavailableChange(true)
    syncLoop()
  }

  function onContextRestored() {
    contextLost = false
    onUnavailableChange(false)
    resize()
    syncLoop()
  }

  const resizeObserver = new ResizeObserver(resize)
  const intersectionObserver = new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting
    syncLoop()
  })
  resizeObserver.observe(surface)
  intersectionObserver.observe(surface)
  window.addEventListener("pointermove", onPointerMove, { passive: true })
  window.addEventListener("pointerout", onPointerOut, { passive: true })
  window.addEventListener("blur", onBlur)
  window.addEventListener("scroll", onScroll, { passive: true })
  document.addEventListener("visibilitychange", syncLoop)
  reducedMotion.addEventListener("change", onReducedMotion)
  canvas.addEventListener("webglcontextlost", onContextLost)
  canvas.addEventListener("webglcontextrestored", onContextRestored)
  resize()
  syncLoop()

  return {
    dispose() {
      disposed = true
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerout", onPointerOut)
      window.removeEventListener("blur", onBlur)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("visibilitychange", syncLoop)
      reducedMotion.removeEventListener("change", onReducedMotion)
      canvas.removeEventListener("webglcontextlost", onContextLost)
      canvas.removeEventListener("webglcontextrestored", onContextRestored)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
    },
  }
}
