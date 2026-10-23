import { formatPeriod } from "@/lib/cv/format"
import type { Role } from "@/lib/cv/types"
import { TickOnView } from "./TickOnView"

const year = (date: string) => Number(date.slice(0, 4))

/**
 * Fifteen years at a glance: one bar per role on a shared year axis, recent roles
 * in the accent colour. Gaps are real (independent study, a break between roles).
 * Each bar names its company, shows the title and years on hover or focus, and
 * jumps to that role below.
 */
export function CareerTimeline({ roles }: { roles: Role[] }) {
  const ordered = [...roles].sort((a, b) => year(a.start) - year(b.start))
  const first = year(ordered[0].start)
  const last = Math.max(...ordered.map((role) => year(role.end ?? new Date().toISOString())))
  const span = last - first
  const ticks = [first, first + Math.round(span / 3), first + Math.round((2 * span) / 3), last]

  return (
    <TickOnView className="timeline mt-6">
      <ol aria-label="Career timeline" className="relative h-9">
        {ordered.map((role, i) => {
          const left = ((year(role.start) - first) / span) * 100
          const width = ((year(role.end ?? String(last)) - year(role.start)) / span) * 100
          return (
            <li
              key={role.id}
              className={`timeline-bar ${role.condensed ? "timeline-bar-earlier" : ""} ${left > 50 ? "timeline-bar-late" : ""}`}
              style={{ left: `${left}%`, width: `calc(${width}% - 2px)`, animationDelay: `${i * 0.08}s` }}
            >
              <a href={`#role-${role.id}`} className="timeline-link">
                <span className="timeline-label">{role.company}</span>
                <span className="timeline-tip">
                  <strong>{role.company}</strong> · {role.title} · {formatPeriod(role.start, role.end)}
                </span>
              </a>
            </li>
          )
        })}
      </ol>
      <div aria-hidden="true" className="mt-2 flex justify-between font-mono text-[10.5px] text-muted">
        {ticks.map((tick) => (
          <span key={tick}>{tick}</span>
        ))}
      </div>
    </TickOnView>
  )
}
