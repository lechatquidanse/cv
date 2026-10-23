import type React from "react"

/** One section of the page. The printed CV has its own layout (PrintCv). */
export function Section({
  id,
  eyebrow,
  title,
  titleClassName = "",
  intro,
  children,
}: {
  id: string
  eyebrow: string
  title: React.ReactNode
  titleClassName?: string
  /** One line under the title, set by job variants. */
  intro?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="section"
    >
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={`${id}-title`} className={`mt-2 ${titleClassName}`}>
        {title}
      </h2>
      {intro && (
        <p className="mt-2 max-w-[68ch] text-[14px] font-medium text-accent">{intro}</p>
      )}
      {children}
    </section>
  )
}


export function Tile({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`tile ${className}`}>{children}</div>
}

/** A label/value list with hairline separators. */
export function SpecList({ items }: { items: { label: string; value: React.ReactNode }[] }) {
  return (
    <dl className="grid text-[13.5px] lg:grid-cols-2 lg:gap-x-8">
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[84px_1fr] gap-2 border-t border-rule py-2">
          <dt className="pt-0.5 font-mono text-[10.5px] uppercase text-muted">{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
