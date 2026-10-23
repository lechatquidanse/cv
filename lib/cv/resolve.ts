import { cv } from "./content"
import { allVariants, genericVariant } from "./variants"
import { staticFile } from "./format"
import { SECTION_IDS, type Achievement, type Cv, type DateValue, type Profile, type Role, type SkillGroup, type Variant } from "./types"

/** Content as one variant presents it: the same facts, selected and ordered. */
export interface ResolvedCv extends Omit<Cv, "profile" | "roles" | "skills"> {
  variant: Variant
  profile: Profile
  yearsOfExperience: number
  /** Recent roles, shown on the experience card. */
  roles: Role[]
  /** Earlier roles, condensed on the career card. */
  earlierRoles: Role[]
  skills: SkillGroup[]
  pdfHref: string
  /** Path of the page, relative to the base path: "/" or "/hey-mondo/". */
  path: string
}

// Counted to the content review date, not the build date, so the number only
// changes when someone has re-read the content.
const yearsOfExperience = Number(cv.reviewedAt.slice(0, 4)) - cv.profile.careerStart

function withYears(text: string): string {
  return text.replace("{years}", String(yearsOfExperience))
}

function byIds(achievements: Achievement[], ids: string[], roleId: string): Achievement[] {
  return ids.map((id) => {
    const found = achievements.find((a) => a.id === id)
    if (!found) throw new Error(`Unknown achievement "${id}" for role "${roleId}"`)
    return found
  })
}

function applyRole(role: Role, variant: Variant): Role {
  const override = variant.roles?.[role.id]
  if (!override) return role
  const ordered = override.order ? byIds(role.achievements, override.order, role.id) : role.achievements
  const featured = override.featured
  return {
    ...role,
    achievements: ordered.map((a) => (featured ? { ...a, featured: featured.includes(a.id) } : a)),
  }
}

function orderSkills(skills: SkillGroup[], first: string[] = []): SkillGroup[] {
  const head = first.map((label) => {
    const group = skills.find((s) => s.label === label)
    if (!group) throw new Error(`Unknown skill group "${label}"`)
    return group
  })
  return [...head, ...skills.filter((s) => !first.includes(s.label))]
}

export function resolveCv(variant: Variant = genericVariant): ResolvedCv {
  const roles = cv.roles.map((role) => applyRole(role, variant))
  return {
    ...cv,
    variant,
    profile: {
      ...cv.profile,
      headline: variant.headline ?? cv.profile.headline,
      status: variant.status ?? cv.profile.status,
      pitch: variant.pitch ?? cv.profile.pitch,
      specs: cv.profile.specs.map((spec) => ({ ...spec, value: withYears(spec.value) })),
      keyNumbers: cv.profile.keyNumbers.map((metric) => ({ ...metric, value: withYears(metric.value) })),
    },
    yearsOfExperience,
    roles: roles.filter((role) => !role.condensed),
    earlierRoles: roles.filter((role) => role.condensed),
    skills: orderSkills(cv.skills, variant.skillsFirst),
    pdfHref: staticFile(variant.slug ? `/${variant.slug}/${variant.pdfFileName}` : `/${variant.pdfFileName}`),
    path: variant.slug ? `/${variant.slug}/` : "/",
  }
}

export function findVariant(slug: string): Variant | undefined {
  return allVariants.find((variant) => variant.slug === slug)
}

/** "2019" -> 2019, "2019-03" -> 2019.17; used only for ordering checks. */
function toNumber(date: DateValue): number {
  const [year, month = "1"] = date.split("-")
  return Number(year) + (Number(month) - 1) / 12
}

const DATE = /^\d{4}(-\d{2})?$/
const MONTH = /^\d{4}-\d{2}$/

/**
 * Fails the build on content mistakes that would otherwise ship silently:
 * broken variant references, impossible dates, duplicate ids, unsourced numbers.
 */
export function validateCv(data: Cv = cv, variants: Variant[] = allVariants): string[] {
  const errors: string[] = []

  const roleIds = new Set<string>()
  data.roles.forEach((role, index) => {
    if (roleIds.has(role.id)) errors.push(`Duplicate role id "${role.id}"`)
    roleIds.add(role.id)
    if (!DATE.test(role.start)) errors.push(`${role.id}: bad start date "${role.start}"`)
    if (role.end && !DATE.test(role.end)) errors.push(`${role.id}: bad end date "${role.end}"`)
    if (role.end && toNumber(role.end) < toNumber(role.start)) errors.push(`${role.id}: ends before it starts`)
    const previous = data.roles[index - 1]
    if (previous && toNumber(previous.start) < toNumber(role.start)) {
      errors.push(`${role.id}: roles must be listed newest first`)
    }
    if (role.achievements.length === 0) errors.push(`${role.id}: no achievements`)
    if (new Set(role.achievements.map((a) => a.id)).size !== role.achievements.length) {
      errors.push(`${role.id}: duplicate achievement ids`)
    }
  })

  const metrics = [...data.profile.keyNumbers, ...data.product.metrics, ...data.projects.flatMap((p) => p.metrics)]
  for (const metric of metrics) {
    if (!metric.source || !MONTH.test(metric.asOf)) {
      errors.push(`Metric "${metric.label}" needs a source and an asOf month`)
    }
  }

  const slugs = new Set<string>()
  for (const variant of variants) {
    if (slugs.has(variant.slug)) errors.push(`Duplicate variant slug "${variant.slug}"`)
    slugs.add(variant.slug)
    if (variant.slug && !/^[a-z0-9-]+$/.test(variant.slug)) errors.push(`Bad variant slug "${variant.slug}"`)
    if (!variant.pdfFileName.endsWith(".pdf")) errors.push(`${variant.slug}: pdfFileName must end in .pdf`)
    for (const section of Object.keys(variant.sectionIntros ?? {})) {
      if (!(SECTION_IDS as readonly string[]).includes(section)) {
        errors.push(`variant "${variant.slug}": unknown section "${section}" in sectionIntros`)
      }
    }
    for (const roleId of Object.keys(variant.roles ?? {})) {
      if (!roleIds.has(roleId)) errors.push(`variant "${variant.slug}": unknown role "${roleId}"`)
    }
    try {
      resolveCv(variant)
    } catch (error) {
      errors.push(`variant "${variant.slug}": ${(error as Error).message}`)
    }
  }

  return errors
}

export function assertValidCv(): void {
  const errors = validateCv()
  if (errors.length > 0) throw new Error(`Invalid CV content:\n- ${errors.join("\n- ")}`)
}
