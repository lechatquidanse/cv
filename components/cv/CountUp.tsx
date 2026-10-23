"use client"

import { useEffect, useRef } from "react"

// "200K+" -> 200, "K+"; "4.9★" -> 4.9, "★"; "10,000" -> 10000, "".
const PARTS = /^(\D*)([\d,.]+)(.*)$/

/**
 * A figure that counts up once when it first comes into view. The server renders the
 * final value, so without JavaScript, with reduced motion and in print it is simply shown.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = ref.current
    const match = value.match(PARTS)
    if (!element || !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const [, prefix, number, suffix] = match
    const end = Number(number.replace(/,/g, ""))
    const decimals = number.split(".")[1]?.length ?? 0
    const grouped = number.includes(",")
    const format = (n: number) =>
      prefix + (grouped ? Math.round(n).toLocaleString("en-US") : n.toFixed(decimals)) + suffix

    let frame = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const step = (now: number) => {
          const progress = Math.min(1, (now - start) / 1200)
          element.textContent = format(end * (1 - Math.pow(1 - progress, 3)))
          if (progress < 1) frame = requestAnimationFrame(step)
        }
        frame = requestAnimationFrame(step)
      },
      { threshold: 0.6 },
    )
    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}
