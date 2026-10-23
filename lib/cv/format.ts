import type { DateValue } from "./types"

/** "2019 – 2022", or "2024 – now" for a current role. Dates are shown as years. */
export function formatPeriod(start: DateValue, end?: DateValue): string {
  return `${start.slice(0, 4)} – ${end ? end.slice(0, 4) : "now"}`
}

/** "2026-10" -> "Oct 2026" */
export function formatMonth(value: string): string {
  const [year, month] = value.split("-")
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, 1))
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric", timeZone: "UTC" })
}

/** Prefixes a path to a static file with the deployment base path ("/cv" in production). */
export function staticFile(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}

/** "https://www.example.com/path/" -> "example.com/path", for URLs printed as text. */
export function shortUrl(href: string): string {
  return href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}
