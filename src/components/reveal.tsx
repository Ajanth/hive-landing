"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

export function Reveal({
  children,
  className
}: {
  children: ReactNode
  className?: string
}) {
  const element = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(
    () => !("IntersectionObserver" in window)
  )

  useEffect(() => {
    if (!element.current) return
    if (!("IntersectionObserver" in window)) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(element.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={element}
      className={`${className ?? ""} reveal${visible ? " is-visible" : ""}`}
    >
      {children}
    </div>
  )
}
