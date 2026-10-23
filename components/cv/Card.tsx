import type React from "react"

/** One section of the page, and of the printed CV. */
export function Section({
  id,
  eyebrow,
  title,
  titleClassName = "",
  intro,
  printBreak,
  printOrder,
  printHidden,
  children,
}: {
  id: string
  eyebrow: string
  title: React.ReactNode
  titleClassName?: string
  /** One line under the title, set by job variants. */
  intro?: string
  /** Start a new A4 page before this section when printing. */
  printBreak?: boolean
  /** Position in the printed document when it differs from the page order. */
  printOrder?: number
  printHidden?: boolean
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="section"
      data-print-break={printBreak ? "" : undefined}
      data-screen-only={printHidden ? "" : undefined}
      style={printOrder ? ({ "--print-order": printOrder } as React.CSSProperties) : undefined}
    >
      <p className="eyebrow print:hidden">{eyebrow}</p>
      <h2 id={`${id}-title`} className={`mt-2 print:mt-0 ${titleClassName}`}>
        {title}
      </h2>
      {intro && (
        <p className="mt-2 max-w-[68ch] text-[14px] font-medium text-accent print:mt-0.5 print:max-w-none print:text-[11.5px]">{intro}</p>
      )}
      {children}
    </section>
  )
}

/** Section title as a small ruled label in print, for the plain CV sections. */
export const printLabelTitle =
  "print:border-b print:border-ink print:pb-1 print:font-mono print:text-[11px] print:font-medium print:normal-case print:tracking-[0.08em] print:text-muted"

export function Tile({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`tile ${className}`}>{children}</div>
}

/** A label/value list with hairline separators. */
export function SpecList({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid text-[13.5px] lg:grid-cols-2 lg:gap-x-8 print:grid-cols-2 print:gap-x-6 print:text-[12px]">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[84px_1fr] gap-2 border-t border-rule py-2 print:py-1">
          <dt className="pt-0.5 font-mono text-[10.5px] uppercase text-muted">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
