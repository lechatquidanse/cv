import type { ResolvedCv } from "@/lib/cv/resolve"
import { AiSection, ContactSection, ExperienceSection, FitSection, Hero, ProjectsSection } from "./cards"
import { PrintCv } from "./PrintCv"
import { SectionNav, type NavSection } from "./SectionNav"

/** The whole CV for one variant: one scrolling page on screen, a two-page A4 résumé in print. */
export function CvPage({ cv }: { cv: ResolvedCv }) {
  const fit = cv.variant.fit
  const sections: NavSection[] = [
    ...(fit ? [{ id: "fit", label: "FIT", accent: true }] : []),
    { id: "experience", label: "EXPERIENCES" },
    { id: "ai", label: "AI", accent: true },
    { id: "projects", label: "PROJECTS" },
    { id: "contact", label: "CONTACT" },
  ]

  return (
    <>
      <a href="#main" className="skip-link print:hidden">
        Skip to content
      </a>
      <SectionNav sections={sections} pdfHref={cv.pdfHref} />
      <main id="main" tabIndex={-1} className="page focus:outline-none">
        <div data-screen-only>
          <Hero cv={cv} />
          {fit && <FitSection fit={fit} />}
          <ExperienceSection cv={cv} />
          <AiSection cv={cv} />
          <ProjectsSection cv={cv} />
          <ContactSection cv={cv} />
        </div>
        <PrintCv cv={cv} />
      </main>
    </>
  )
}
