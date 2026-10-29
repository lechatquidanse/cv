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

export interface Spec {
  label: string
  value: string
}

export interface Profile {
  name: string
  headline: string
  /** The value proposition: as prominent as the name on screen. */
  valueLine: string
  /** Status pill, e.g. "Available · Remote EU". */
  status: string
  pitch: string
  /** Phrases of the pitch set in bold, so a skimming reader catches them. */
  pitchHighlights?: string[]
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
  specs: Spec[]
}

/** One project told as need → what I did → result. */
export interface RoleStory {
  title: string
  problem: string
  action: string
  result: string
  /** The result in a few characters, shown large, e.g. "100+ schools". */
  figure?: string
  /** Optional link to where the story continues on the page, e.g. the AI section. */
  more?: ExternalLink
}

/**
 * A piece of work inside a role, shown as cards: title → need → what I did → result.
 * `problem` and `figure` stay empty until confirmed (see docs/OPEN-QUESTIONS.md);
 * the need card is then left out.
 */
export interface RoleProject extends Omit<RoleStory, "problem"> {
  /** Stable id, referenced by variants to reorder and choose what prints. */
  id: string
  problem?: string
  /** The tools named in the work, shown as chips. */
  tech: string[]
  /** `false` keeps it on the website only; the printed CV shows two per role. */
  print?: boolean
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
  /** Recent roles: the work, told as cards. */
  projects: RoleProject[]
  /** Smaller contributions, on one line under the cards. */
  also?: string[]
  /** Earlier roles: one line instead of cards. */
  summary?: string
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

/** The app's store icon (file lives in public/). */
export interface AppIcon {
  src: string
  alt: string
}

/** A Foot Master Quiz challenge, told like a role story: need → what I built → result. */
export interface Challenge extends RoleStory {
  /** `false` keeps it on the website only. */
  print?: boolean
}

export interface Product {
  name: string
  role: string
  period: string
  headline: [string, string]
  summary: string
  challenges: Challenge[]
  metrics: Metric[]
  icon: AppIcon
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
  /** A faint one-colour screenshot behind the project tile (file in public/). */
  backdrop?: string
  /** `false` keeps it on the website only. */
  print?: boolean
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

/** One theme of a job offer, answered with existing evidence (no scores). */
export interface FitItem {
  theme: string
  evidence: string
}

export interface JobFit {
  company: string
  role: string
  offerUrl?: string
  /** Why this company, in the candidate's words; shown on the website only. */
  motivation?: string
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
  /** Phrases of the variant's pitch set in bold; required with `pitch`, since the profile's no longer match. */
  pitchHighlights?: string[]
  /** One line under a section title, tying it to the offer. */
  sectionIntros?: Partial<Record<SectionId, string>>
  /** Per role: project ids in order, and which of them the PDF prints. */
  roles?: Partial<Record<string, { order?: string[]; print?: string[] }>>
  /** Skill group labels to show first. */
  skillsFirst?: string[]
  fit?: JobFit
  pdfFileName: string
  /** Job-specific pages are shared by link only. */
  indexable: boolean
}
