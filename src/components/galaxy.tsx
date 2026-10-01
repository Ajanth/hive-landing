import { useLayoutEffect, useRef, useState, useSyncExternalStore } from "react"

import { FeatureOrbit } from "@/components/feature-orbit"
import { createFeatureOrbit } from "@/lib/feature-orbit"
import type { GalaxyController } from "@/lib/galaxy-scene"

const mobileMedia = matchMedia("(max-width: 767px)")
function subscribeMobile(listener: () => void) {
  mobileMedia.addEventListener("change", listener)
  return () => mobileMedia.removeEventListener("change", listener)
}
function mobileSnapshot() { return mobileMedia.matches }

export function Galaxy() {
  const mobile = useSyncExternalStore(subscribeMobile, mobileSnapshot)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controllerRef = useRef<GalaxyController | null>(null)
  const [unavailableMode, setUnavailableMode] = useState<boolean | null>(null)

  useLayoutEffect(() => {
    let disposed = false
    const orbit = createFeatureOrbit(canvasRef.current!.parentElement!)

    async function start() {
      if (mobile) {
        const { createMobileGalaxy } = await import("@/lib/galaxy-mobile")
        if (!disposed && canvasRef.current) {
          controllerRef.current = createMobileGalaxy(canvasRef.current, orbit.step)
          setUnavailableMode(null)
        }
      } else {
        // Keep Three.js out of the initial text and CTA bundle, and off small screens.
        const { createGalaxy } = await import("@/lib/galaxy-scene")
        if (!disposed && canvasRef.current) {
          controllerRef.current = createGalaxy(canvasRef.current, orbit.step, (unavailable) => setUnavailableMode(unavailable ? mobile : null))
          setUnavailableMode(null)
        }
      }
    }
    void start()
      .catch((error: unknown) => {
        if (disposed) return
        setUnavailableMode(mobile)
        if (import.meta.env.DEV) console.warn("Galaxy rendering is unavailable", error)
      })

    return () => {
      disposed = true
      controllerRef.current?.dispose()
      controllerRef.current = null
      orbit.dispose()
    }
  }, [mobile])

  return (
    <div className="galaxy">
      {unavailableMode === mobile && (
        <picture className="galaxy-fallback">
          <source media="(max-width: 767px)" srcSet="/hive-galaxy-mobile.webp" />
          <img src="/hive-galaxy.webp" alt="" width={1440} height={900} />
        </picture>
      )}
      <canvas key={mobile ? "mobile" : "desktop"} className="galaxy-canvas" ref={canvasRef} aria-hidden="true" />
      <FeatureOrbit />
    </div>
  )
}
