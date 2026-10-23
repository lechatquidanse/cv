/**
 * Positionings of the canonical content in ./content.ts.
 *
 * The generic CV lives at the site root; each job offer gets its own route
 * (/cv/<slug>/) and PDF. A variant may change the headline, pitch and status,
 * reorder or re-feature existing achievements, and answer the offer's main themes
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
        order: ["integrations", "invoicing", "testing", "e2e-workflow", "ai-mentoring"],
        featured: ["integrations", "invoicing", "testing", "e2e-workflow", "ai-mentoring"],
      },
    },
    sectionIntros: {
      experience: "15 years of PHP; the last two on Laravel with MySQL, integrating payment and logistics APIs.",
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
          evidence: "15 years of PHP, from Silex to Symfony and Laravel; Laravel and MySQL at ExpandNow (2024 – 2026)",
        },
        {
          theme: "APIs and integrations",
          evidence: "Adyen, Sendcloud and Salesupply at ExpandNow; Stripe direct debits at Zeelo; REST APIs since 2015",
        },
        {
          theme: "Testing and delivery",
          evidence: "Unit coverage from 0% to 15% on an untested codebase; one Docker image from laptop to production at Zeelo",
        },
        {
          theme: "Clean architecture",
          evidence: "DDD and CQRS in production; microservices at Signaturit; open-source Bicing API, 162★",
        },
        {
          theme: "AI applied to backend",
          evidence: "Spec-to-test workflow: user stories become scenarios approved by the product owner, then tested code; a weekly LLM content pipeline live in my app",
        },
      ],
    },
    pdfFileName: "Stephane-El-Manouni-CV-Heymondo.pdf",
    indexable: false,
  },
]

export const allVariants: Variant[] = [genericVariant, ...jobVariants]
