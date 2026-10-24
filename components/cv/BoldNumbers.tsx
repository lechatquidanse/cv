import type React from "react"

// Numbers are what a recruiter skims for, so they are set in bold wherever they appear.
// Years are dates, not results, and stay plain.
const NUMBER = /(\d(?:[\d,.]*\d)?(?:\s?(?:%|K\+|\+|★))?)/
const YEAR = /^(19|20)\d\d$/

export function withBoldNumbers(text: string): React.ReactNode {
  return text
    .split(NUMBER)
    .map((part, i) => (i % 2 === 1 && !YEAR.test(part) ? <strong key={i} className="font-semibold text-ink">{part}</strong> : part))
}

/** Sets the given phrases of a sentence in bold. */
export function withHighlights(text: string, phrases: string[] = []): React.ReactNode {
  if (phrases.length === 0) return text
  const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
  return text.split(new RegExp(`(${escaped.join("|")})`)).map((part, i) =>
    phrases.includes(part) ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      part
    ),
  )
}
