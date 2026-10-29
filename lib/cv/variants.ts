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
  // The PDF shows the AI workflow, the headline's proof; invoicing stays on the website.
  roles: { expandnow: { print: ["spec-to-test"] } },
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
        print: ["integrations"],
      },
      // Tech lead stays on the website; the fit block already names its Kotlin and hexagonal work.
      zeelo: { print: ["bnpl"] },
      // The fit block names Signaturit's scale; the role prints its result on one line.
      signaturit: { print: [] },
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
          proofs: [
            { did: "{years} years of PHP, from Silex to Symfony and Laravel" },
            { at: "ExpandNow", did: "Laravel and MySQL, 2024 – 2026" },
          ],
        },
        {
          theme: "APIs and integrations",
          proofs: [
            { at: "Zeelo", did: "Stripe direct debits for 100+ schools" },
            { at: "ExpandNow", did: "Adyen, Sendcloud and Salesupply" },
            { did: "REST APIs since 2015" },
          ],
        },
        {
          theme: "Clean architecture",
          proofs: [
            { at: "Signaturit", did: "DDD and CQRS, 50K signatures a week" },
            { at: "Zeelo", did: "Kotlin, hexagonal and event sourcing" },
          ],
        },
        {
          theme: "Testing and AI",
          proofs: [
            { at: "ExpandNow", did: "Unit coverage from 0% to 15%" },
            { at: "ExpandNow", did: "Playwright tests behind each release, from a Claude Code workflow" },
          ],
        },
      ],
    },
    pdfFileName: "Stephane-El-Manouni-CV-Heymondo.pdf",
    indexable: false,
  },
  {
    slug: "preply",
    headline: "Senior Backend Engineer · Product features · AI-augmented development",
    status: "Available · Barcelona · right to work in Spain",
    pitch:
      "{years} years of backend engineering. I ship product features with product owners, integrate third-party APIs, and put AI agents to work behind specs, tests and review gates.",
    pitchHighlights: ["product features", "third-party APIs", "behind specs, tests and review gates"],
    roles: {
      expandnow: {
        order: ["spec-to-test", "integrations", "invoicing", "unit-tests"],
        print: ["spec-to-test"],
      },
      zeelo: {
        order: ["bnpl", "tech-lead", "event-sourcing"],
        print: ["bnpl"],
      },
      // The fit block names Signaturit's scale; the role prints its result on one line.
      signaturit: { print: [] },
    },
    sectionIntros: {
      experience: "{years} years of backend work: product features, third-party integrations, and a test culture the team keeps.",
      ai: "AI as a thought partner: I keep architecture, business logic and security; specs and tests decide when it ships.",
      projects: "A B2C product I run end to end: A/B tests, an AI pipeline behind quality gates, 200K+ downloads.",
    },
    skillsFirst: ["Backend", "Integrations", "AI", "Quality", "Architecture"],
    fit: {
      company: "Preply",
      role: "Senior Backend Engineer",
      motivation: "My wife learned Italian on Preply, and everyone I know who has used it has told me great things about it.",
      items: [
        {
          theme: "Agentic AI workflows",
          proofs: [
            { at: "ExpandNow", did: "Claude Code spec-to-test workflow, adopted by 4 devs + PO" },
            { at: "Foot Master Quiz", did: "AI content agent, gated by 56 tests" },
          ],
        },
        {
          theme: "Product and A/B tests",
          proofs: [{ at: "Foot Master Quiz", did: "A/B tests: +10% first-day retention, +8% Play Store acquisition; 200K+ downloads" }],
        },
        {
          theme: "Third-party integrations",
          proofs: [
            { at: "Zeelo", did: "Stripe direct debit for 100+ schools" },
            { at: "ExpandNow", did: "Adyen, Sendcloud and Salesupply" },
          ],
        },
        {
          theme: "Test culture and reviews",
          proofs: [
            { at: "ExpandNow", did: "Unit coverage 0% to 15%; end-to-end tests behind each release" },
            { at: "Zeelo", did: "Standards for 2 squads, kept by PR reviews" },
          ],
        },
        {
          theme: "Monitoring and on-call",
          proofs: [
            { at: "ExpandNow", did: "On call with AWS CloudWatch and Zendesk" },
            { at: "Foot Master Quiz", did: "Releases gated by tests" },
          ],
        },
        {
          theme: "Scale, Node.js and TS",
          proofs: [
            { at: "Signaturit", did: "DDD/CQRS microservices, 50K signatures a week" },
            { at: "Zeelo", did: "Node.js and TypeScript in production" },
          ],
        },
      ],
    },
    pdfFileName: "Stephane-El-Manouni-CV-Preply.pdf",
    indexable: false,
  },
]

export const allVariants: Variant[] = [genericVariant, ...jobVariants]
