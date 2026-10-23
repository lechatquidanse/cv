"use client"

import { useEffect, useRef, useState } from "react"

export interface NavSection {
  id: string
  label: string
  /** Highlight the link in the accent colour when current. */
  accent?: boolean
}

/**
 * Sticky top bar: section links that follow the reader, and the CV download.
 * The links are plain anchors, so the page works without JavaScript; with it,
 * the current section is marked with aria-current and kept visible in the row.
 */
export function SectionNav({ sections, pdfHref }: { sections: NavSection[]; pdfHref: string }) {
  const navRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const visible = new Set<string>()
    const pick = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      // The last section is often too short to reach the reading band.
      if (atBottom) return setActive(sections[sections.length - 1].id)
      setActive(sections.find((s) => visible.has(s.id))?.id ?? null)
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => (entry.isIntersecting ? visible.add(entry.target.id) : visible.delete(entry.target.id)))
        pick()
      },
      // The reading band starts below where anchored sections land (bar height + 12px,
      // see scroll-padding-top), so the section above never wins by a few pixels.
      { rootMargin: "-80px 0px -60% 0px" },
    )
    sections.forEach(({ id }) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })
    window.addEventListener("scroll", pick, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", pick)
    }
  }, [sections])

  // Keep the current link visible in the sideways-scrolling row on phones,
  // without moving the page itself.
  useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector<HTMLElement>('[aria-current="location"]')
    if (!nav || !link) return
    const outside = link.offsetLeft < nav.scrollLeft || link.offsetLeft + link.offsetWidth > nav.scrollLeft + nav.clientWidth
    if (outside) nav.scrollTo({ left: link.offsetLeft - 16 })
  }, [active])

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper print:hidden">
      <div className="page flex h-[var(--bar-h)] items-center gap-3">
        <nav ref={navRef} aria-label="Sections" className="nav-scroll -ml-2 min-w-0 flex-1 overflow-x-auto">
          <ul className="flex gap-0.5 sm:justify-center sm:gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="nav-chip"
                  aria-current={active === section.id ? "location" : undefined}
                  data-accent={section.accent ? "" : undefined}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={pdfHref}
          className="shrink-0 rounded-full bg-ink px-3 py-1.5 text-xs font-semibold text-paper no-underline transition-opacity hover:opacity-90"
        >
          CV <span className="sr-only">: download (PDF)</span>
        </a>
      </div>
    </header>
  )
}
