import { motion, useReducedMotion } from "motion/react"

export function OceanBackdrop() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="ocean-backdrop" aria-hidden="true">
      <motion.img
        src="/hive-ocean-current.webp"
        alt=""
        width={1536}
        height={1024}
        decoding="async"
        fetchPriority="high"
        animate={
          reduceMotion
            ? undefined
            : {
                x: ["0%", "-2.5%", "0%"],
                y: ["0%", "1.5%", "0%"],
                scale: [1.04, 1.1, 1.04],
              }
        }
        transition={{
          duration: 28,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
      <div className="ocean-backdrop__veil" />
    </div>
  )
}
