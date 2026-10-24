/**
 * Positionings of the canonical content in ./content.ts.
 *
 * The generic CV lives at the site root; each job offer gets its own route
 * (/cv/<slug>/) and PDF. A variant may change the headline, pitch and status,
 * reorder existing projects and choose which ones print, and answer the offer's main themes
 * with evidence. It must not introduce facts that content.ts does not hold.
 */
import type { Variant } from "./types"

export const genericVariant: Variant = {
  slug: "",
  pdfFileName: "Stephane-El-Manouni-CV.pdf",
  indexable: true,
}

export const jobVariants: Variant[] = [
  {
    slug: "hey-mondo",
    status: "Available · Barcelona · right to work in Spain",
    roles: {
      expandnow: {
        order: ["integrations", "invoicing", "unit-tests", "spec-to-test"],
        print: ["integrations", "invoicing"],
      },
      // Tech lead stays on the website; the fit block already names its Kotlin and hexagonal work.
      zeelo: { print: ["bnpl"] },
    },
    sectionIntros: {
      experience: "{years} years of PHP; the last two on Laravel with MySQL, integrating payment and logistics APIs.",
      ai: "AI applied to backend work: specs and tests keep the output predictable.",
      projects: "A B2C product I run end to end, with an API-only backend and safe releases.",
    },
    skillsFirst: ["Backend", "Architecture", "Quality", "Integrations"],
    fit: {
      company: "Heymondo",
      role: "Senior Backend Developer",
      offerUrl: "https://heymondo.factorial.es/job_posting/senior-backend-developer-323225",
      items: [
        {
          theme: "Laravel and MySQL",
          evidence: "{years} years of PHP, from Silex to Symfony and Laravel; Laravel and MySQL at ExpandNow (2024 – 2026)",
        },
        {
          theme: "APIs and integrations",
          evidence: "Stripe direct debits for 100+ schools at Zeelo; Adyen, Sendcloud and Salesupply at ExpandNow; REST APIs since 2015",
        },
        {
          theme: "Clean architecture",
          evidence: "DDD and CQRS at Signaturit, 50K signatures a week; Kotlin, hexagonal and event sourcing at Zeelo",
        },
        {
          theme: "Testing and AI",
          evidence: "Unit coverage from 0% to 15%; Playwright tests behind each release, from a Claude Code workflow",
        },
      ],
    },
    pdfFileName: "Stephane-El-Manouni-CV-Heymondo.pdf",
    indexable: false,
  },
]

export const allVariants: Variant[] = [genericVariant, ...jobVariants]
