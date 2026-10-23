"use client"

import type React from "react"
import { useEffect, useRef } from "react"

/**
 * Plays the AI steps' ticks once, in order, when the list scrolls into view.
 * Server-rendered ticks are already checked, so without JavaScript, with reduced
 * motion, or in print the list simply shows every step done.
 */
export function TickOnView({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (element.getBoundingClientRect().top < window.innerHeight * 0.6) return // already in view on load
    element.setAttribute("data-armed", "")
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.setAttribute("data-in-view", "")
        observer.disconnect()
      },
      { threshold: 0.4 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
