/** A year ("2019") or year-month ("2019-03"). */
export type DateValue = string

export interface ExternalLink {
  label: string
  href: string
}

/**
 * A number shown as evidence. Every metric records where it was read and when,
 * so it can be re-checked before it goes stale.
 */
export interface Metric {
  value: string
  label: string
  source: string
  /** Year-month the value was last checked, e.g. "2026-10". */
  asOf: string
}

/** One of the three "how I work" tiles in the intro. */
export interface Pillar {
  id: "tested" | "readable" | "users"
  title: string
  caption: string
}

export interface Spec {
  label: string
  value: string
}

export interface Profile {
  name: string
  headline: string
  /** Status pill, e.g. "Available · Remote EU". */
  status: string
  pitch: string
  location: string
  email: string
  phone: string
  website: ExternalLink
  github: ExternalLink
  linkedin: ExternalLink
  /** Year of the first professional role, used to compute "years of experience". */
  careerStart: number
  /** Languages used at work, shown with the cities in the experience section. */
  workingLanguages: string
  pillars: Pillar[]
  specs: Spec[]
  /** The numbers a recruiter should see first; headline of the printed CV. */
  keyNumbers: Metric[]
}

export interface Achievement {
  /** Stable id, referenced by variants to select and reorder bullets. */
  id: string
  text: string
  /** Shown on screen. Every achievement is always printed. */
  featured?: boolean
}

/** A piece of work inside a role that deserves more than one bullet. */
export interface RoleHighlight {
  title: string
  text: string
  points: string[]
}

export interface Role {
  id: string
  company: string
  /** Shown after the company name, e.g. "formerly Kooomo". */
  companyNote?: string
  companyUrl?: string
  /** What the company does, in a few words, for readers who do not know it. */
  context?: string
  title: string
  location: string
  start: DateValue
  /** Omit for a current role. */
  end?: DateValue
  achievements: Achievement[]
  highlight?: RoleHighlight
  stack: string[]
  /** Earlier roles are shown in a condensed list in the career section. */
  condensed?: boolean
}

export type Actor = "Jira" | "Claude" | "Developer" | "PO"

export interface WorkflowStep {
  title: string
  detail: string
  actors: Actor[]
}

/** The AI section: one real, adopted workflow rather than a list of tools. */
export interface AiWorkflow {
  headline: [string, string]
  intro: string
  steps: WorkflowStep[]
  adoption: string
}

/** A self-hosted, muted phone-format clip (files live in public/). */
export interface PhoneClip {
  /** In order of preference: MP4 for Safari, WebM for browsers without H.264. */
  sources: { src: string; type: string }[]
  poster: string
  width: number
  height: number
  description: string
}

export interface Challenge {
  title: string
  text: string
}

export interface Product {
  name: string
  role: string
  period: string
  headline: [string, string]
  summary: string
  challenges: Challenge[]
  metrics: Metric[]
  clip: PhoneClip
  appStore: string
  googlePlay: string
  website: ExternalLink
  stack: string[]
}

export interface Project {
  id: string
  name: string
  kind: string
  period: string
  summary: string
  points: string[]
  metrics: Metric[]
  links: ExternalLink[]
  stack: string[]
}

export interface SkillGroup {
  label: string
  items: string[]
}

export interface Education {
  qualification: string
  institution: string
}

export interface Language {
  name: string
  level: string
}

export interface Cv {
  profile: Profile
  roles: Role[]
  aiWorkflow: AiWorkflow
  product: Product
  projects: Project[]
  skills: SkillGroup[]
  education: Education[]
  languages: Language[]
  /** Year-month the content was last reviewed. */
  reviewedAt: string
}

/** One requirement from a job offer, answered with existing evidence. */
export interface FitItem {
  requirement: string
  evidence: string
  /** "partial" when the evidence is adjacent rather than direct. */
  match: "strong" | "partial"
}

export interface JobFit {
  company: string
  role: string
  offerUrl: string
  items: FitItem[]
}

export const SECTION_IDS = ["experience", "ai", "projects"] as const
export type SectionId = (typeof SECTION_IDS)[number]

/**
 * A positioning of the canonical content for one audience or job offer.
 * Variants select, reorder and re-introduce existing facts; they never add new ones.
 */
export interface Variant {
  /** URL segment; "" for the generic CV at the site root. */
  slug: string
  headline?: string
  status?: string
  pitch?: string
  /** One line under a section title, tying it to the offer. */
  sectionIntros?: Partial<Record<SectionId, string>>
  /** Per role: achievement ids in order, and which of them the screen shows. */
  roles?: Partial<Record<string, { order?: string[]; featured?: string[] }>>
  /** Skill group labels to show first. */
  skillsFirst?: string[]
  fit?: JobFit
  pdfFileName: string
  /** Job-specific pages are shared by link only. */
  indexable: boolean
}
