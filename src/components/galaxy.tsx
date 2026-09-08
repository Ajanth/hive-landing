import { useLayoutEffect, useRef, useState } from "react"

import { FeatureOrbit } from "@/components/feature-orbit"
import { createFeatureOrbit } from "@/lib/feature-orbit"
import type { GalaxyController } from "@/lib/galaxy-scene"

export function Galaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const controllerRef = useRef<GalaxyController | null>(null)
  const [unavailable, setUnavailable] = useState(false)

  useLayoutEffect(() => {
    let disposed = false
    const orbit = createFeatureOrbit(canvasRef.current!.parentElement!)

    // Keep Three.js out of the initial text and CTA bundle.
    import("@/lib/galaxy-scene")
      .then(({ createGalaxy }) => {
        if (disposed || !canvasRef.current) return
        controllerRef.current = createGalaxy(
          canvasRef.current,
          orbit.step,
          setUnavailable,
        )
      })
      .catch((error: unknown) => {
        if (disposed) return
        setUnavailable(true)
        if (import.meta.env.DEV) console.warn("Galaxy rendering is unavailable", error)
      })

    return () => {
      disposed = true
      controllerRef.current?.dispose()
      controllerRef.current = null
      orbit.dispose()
    }
  }, [])

  return (
    <div className="galaxy">
      {unavailable && (
        <picture className="galaxy-fallback">
          <source media="(max-width: 700px)" srcSet="/hive-galaxy-mobile.webp" />
          <img src="/hive-galaxy.webp" alt="" width={1440} height={900} />
        </picture>
      )}
      <canvas className="galaxy-canvas" ref={canvasRef} aria-hidden="true" />
      <FeatureOrbit />
    </div>
  )
}
