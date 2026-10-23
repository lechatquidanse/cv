import type { ResolvedCv } from "@/lib/cv/resolve"
import { AiSection, ContactSection, ExperienceSection, FitSection, Hero, PrintSkills, ProjectsSection } from "./cards"
import { SectionNav, type NavSection } from "./SectionNav"

/** The whole CV for one variant: one scrolling page on screen, two A4 pages in print. */
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
        <Hero cv={cv} />
        {fit && <FitSection fit={fit} />}
        <ExperienceSection cv={cv} />
        <AiSection cv={cv} />
        <ProjectsSection cv={cv} />
        <PrintSkills cv={cv} />
        <ContactSection cv={cv} />
      </main>
    </>
  )
}
