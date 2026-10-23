/**
 * Positionings of the canonical content in ./content.ts.
 *
 * The generic CV lives at the site root; each job offer gets its own route
 * (/cv/<slug>/) and PDF. A variant may change the headline, pitch and status,
 * reorder or re-feature existing achievements, and map the offer's requirements
 * to evidence. It must not introduce facts that content.ts does not hold.
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
    headline: "Senior Backend Developer · PHP & Laravel",
    status: "Available · Barcelona, remote",
    pitch:
      "15 years of PHP, the last two in Laravel: calm, well-tested backend code that teammates can read and users can rely on. AI helps me go faster, inside the same checks.",
    roles: {
      expandnow: {
        order: ["integrations", "testing", "e2e-workflow", "invoicing"],
        featured: ["integrations", "testing"],
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
          requirement: "5+ years of PHP",
          evidence: "15 years of PHP, from Silex to Symfony and Laravel",
          match: "strong",
        },
        {
          requirement: "Laravel and its ecosystem",
          evidence: "Laravel at ExpandNow (2024 – 2026): integrations, invoicing, tests",
          match: "strong",
        },
        {
          requirement: "MySQL",
          evidence: "MySQL at ExpandNow; PostgreSQL and TimescaleDB elsewhere",
          match: "strong",
        },
        {
          requirement: "Unit testing, Git, Docker",
          evidence: "Unit coverage from 0% to 15%; one Docker image from laptop to production at Zeelo",
          match: "strong",
        },
        {
          requirement: "Clean / hexagonal architecture, microservices",
          evidence: "DDD and CQRS in production; microservices at Signaturit; Bicing API, 162★",
          match: "strong",
        },
        {
          requirement: "Integrate external services and APIs",
          evidence: "Stripe, Adyen, Sendcloud and Salesupply in payment and logistics flows",
          match: "strong",
        },
        {
          requirement: "Turn user needs into technical requirements",
          evidence: "Jira stories become PO-approved Gherkin and committed task lists",
          match: "strong",
        },
        {
          requirement: "Nice to have: AI applied to backend",
          evidence: "Claude Code workflow adopted by 4 developers and the PO; a weekly LLM content pipeline live in my app",
          match: "partial",
        },
        {
          requirement: "Lives in Spain, right to work",
          evidence: "Based in Barcelona since 2016",
          match: "strong",
        },
      ],
    },
    pdfFileName: "Stephane-El-Manouni-CV-Heymondo.pdf",
    indexable: false,
  },
]

export const allVariants: Variant[] = [genericVariant, ...jobVariants]
