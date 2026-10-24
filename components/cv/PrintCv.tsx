import type React from "react"
import { formatPeriod, shortUrl, staticFile } from "@/lib/cv/format"
import { roleLogos } from "@/lib/cv/logos"
import type { ResolvedCv } from "@/lib/cv/resolve"
import type { JobFit, Role, RoleProject } from "@/lib/cv/types"
import { SITE_URL } from "@/lib/site"
import { withBoldNumbers, withHighlights } from "./BoldNumbers"

interface Props {
  cv: ResolvedCv
}

// The printed CV is the one-page version: only items not marked `print: false`.
// The website has the rest.
const printed = <T extends { print?: boolean }>(items: T[]) => items.filter((item) => item.print !== false)
// A role prints at most this many projects, so the CV fits one page.
const PRINTED_PROJECTS = 2

function Heading({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <h2 className="mb-2 flex break-after-avoid items-baseline justify-between border-b border-rule pb-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-accent">
      <span>{children}</span>
      {aside && <span className="normal-case tracking-normal text-muted">{aside}</span>}
    </h2>
  )
}

function Header({ cv, websiteHref }: Props & { websiteHref: string }) {
  const { profile } = cv
  return (
    <div className="flex items-start justify-between gap-6">
      <div>
        <p className="whitespace-nowrap text-[13px] font-semibold">
          {profile.name}
          <span className="font-normal text-muted"> · {profile.headline.split(" · ")[0]}</span>
        </p>
        <p className="mt-0.5 text-[10.5px] text-accent">{profile.status}</p>
      </div>
      {/* One column of contact lines; the website is the one link to everything left out here. */}
      <address className="shrink-0 text-right font-mono text-[9.5px] not-italic leading-[1.7] text-ink-2">
        {profile.email} · {profile.phone}
        <br />
        {profile.linkedin.label} · {profile.github.label}
        <br />
        <a href={websiteHref} className="font-medium text-accent">
          Full CV: {shortUrl(websiteHref)} ↗
        </a>
      </address>
    </div>
  )
}

/** The value line and the pitch carry the page, as on the website's first screen. */
function ValueLine({ cv }: Props) {
  const { profile } = cv
  const [valueLead, joiner, valueTail] = profile.valueLine.split(/ (&|—) /)
  return (
    <div className="mt-4">
      <p className="display text-[21px] leading-[1.1] tracking-[-0.02em]">
        {valueLead}
        {valueTail && (
          <span className="text-accent">
            {" "}
            {joiner} {valueTail}
          </span>
        )}
      </p>
      <p className="mt-2 text-[12px] leading-normal text-ink-2">{withHighlights(profile.pitch, profile.pitchHighlights)}</p>
    </div>
  )
}

/** Core, architecture and ways of working, as on the website's first screen. */
function Specs({ cv }: Props) {
  return (
    <dl className="grid grid-cols-3 gap-6 text-[11px] leading-snug">
      {cv.profile.specs.map((spec) => (
        <div key={spec.label}>
          <dt className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted">{spec.label}</dt>
          <dd className="mt-1 text-ink-2">{spec.value}</dd>
        </div>
      ))}
    </dl>
  )
}

/** One project as four small cards: title → need → what I did → result, as on the website. */
function PrintProject({ project, index }: { project: RoleProject; index: number }) {
  const arrow = (
    <li aria-hidden="true" className="flex items-center justify-center text-[10px] text-gold">
      →
    </li>
  )
  const columns = project.problem
    ? "grid-cols-[0.5fr_12px_1fr_12px_1.4fr_12px_0.8fr]"
    : "grid-cols-[0.5fr_12px_2.4fr_12px_0.8fr]"
  return (
    <ol className={`mt-1.5 grid break-inside-avoid ${columns} text-[10px] leading-[1.4]`}>
      <li className="rounded-lg border border-[#e6d6b6] bg-gold-soft px-2.5 py-1.5">
        <span className="block font-mono text-[8px] tracking-[0.1em] text-[#7a5a22]">{String(index + 1).padStart(2, "0")}</span>
        <span className="display mt-0.5 block text-[12.5px] leading-[1.15]">{project.title}</span>
      </li>
      {project.problem && (
        <>
          {arrow}
          <li className="rounded-lg border border-rule px-2.5 py-1.5">
            <span className="block font-mono text-[7.5px] uppercase tracking-[0.1em] text-muted">The need</span>
            <span className="mt-0.5 block text-ink-2">{withBoldNumbers(project.problem)}</span>
          </li>
        </>
      )}
      {arrow}
      <li className="rounded-lg border border-rule px-2.5 py-1.5">
        <span className="block font-mono text-[7.5px] uppercase tracking-[0.1em] text-muted">What I did</span>
        <span className="mt-0.5 block">{project.action}</span>
        <span className="mt-0.5 block font-mono text-[8.5px] text-muted">{project.tech.join(" · ")}</span>
      </li>
      {arrow}
      <li className="rounded-lg border border-[#cfdcd3] bg-accent-soft px-2.5 py-1.5">
        <span className="block font-mono text-[7.5px] uppercase tracking-[0.1em] text-accent">✓ Result</span>
        {project.figure && <span className="display mt-0.5 block text-[15px] leading-[1.1] text-accent">{project.figure}</span>}
        <span className={`block text-accent-ink ${project.figure ? "" : "mt-0.5 font-medium"}`}>{withBoldNumbers(project.result)}</span>
      </li>
    </ol>
  )
}

function Fit({ fit }: { fit: JobFit }) {
  return (
    <section className="break-inside-avoid">
      <Heading aside={`${fit.role} · ${fit.company}`}>Why my background fits</Heading>
      <dl className="grid gap-y-1.5 text-[10.5px] leading-normal">
        {fit.items.map((item) => (
          <div key={item.theme} className="grid grid-cols-[124px_1fr] gap-3">
            <dt className="font-semibold">{item.theme}</dt>
            <dd className="text-ink-2">{withBoldNumbers(item.evidence)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function RoleBlock({ role }: { role: Role }) {
  const logo = roleLogos[role.id]
  return (
    // A role may continue on the next page between projects; its heading never ends a page.
    <article className="pb-3 last:pb-0 print:break-inside-auto">
      <div className="flex break-after-avoid items-center justify-between gap-3">
        <h3 className="flex items-center gap-1.5 text-[13px] font-semibold">
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element -- static export, decorative
            <img src={staticFile(logo)} alt="" aria-hidden="true" className="h-4 w-4 object-contain opacity-50 grayscale" />
          )}
          <span>
            {role.companyUrl ? <a href={role.companyUrl}>{role.company}</a> : role.company}
            {role.companyUrl && <span className="text-[9px] text-gold"> ↗</span>}
            <span className="font-normal text-ink-2"> · {role.title}</span>
            {role.context && <span className="text-[10px] font-normal text-muted"> · {role.context}</span>}
          </span>
        </h3>
        <p className="shrink-0 font-mono text-[9.5px] text-muted">
          {formatPeriod(role.start, role.end)} · {role.location.split(",")[0]}
        </p>
      </div>
      {printed(role.projects)
        .slice(0, PRINTED_PROJECTS)
        .map((project, i) => (
          <PrintProject key={project.id} project={project} index={i} />
        ))}
    </article>
  )
}

function Experience({ cv }: Props) {
  return (
    <section>
      <Heading aside="Paris → London → Barcelona">{cv.yearsOfExperience} years in production</Heading>
      {cv.roles.map((role) => (
        <RoleBlock key={role.id} role={role} />
      ))}
      {/* Earlier roles: one line each, dates only (the cities are in the heading). */}
      <ul className="mt-2 break-inside-avoid space-y-0.5 text-[10.5px] leading-normal">
        {cv.earlierRoles.map((role) => (
          <li key={role.id} className="flex items-baseline justify-between gap-3">
            <span>
              <span className="font-semibold">{role.company}</span>
              <span className="text-ink-2">
                {" "}
                · {role.title} · {role.summary}
              </span>
            </span>
            <span className="shrink-0 font-mono text-[9.5px] text-muted">{formatPeriod(role.start, role.end)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

/** Side projects, education and languages: one line each, the website has the rest. */
function MoreAboutMe({ cv, websiteHref }: Props & { websiteHref: string }) {
  const { product } = cv
  const appFigures = product.metrics.filter((metric) => ["downloads", "rating"].includes(metric.label))
  const rows = [
    {
      label: "Side projects",
      value: (
        <>
          <span className="font-semibold text-ink">{product.name}</span> · my own app, iOS and Android · {product.period} ·{" "}
          <span className="font-semibold text-accent">{appFigures.map((m) => `${m.value} ${m.label}`).join(" · ")}</span>
          {printed(cv.projects).map((project) => (
            <span key={project.id} className="block">
              <span className="font-semibold text-ink">{project.name}</span> · {project.kind} · {project.period}
              {project.metrics.map((m) => (
                <span key={m.label} className="font-semibold text-accent">
                  {" "}
                  · {m.value} {m.label}
                </span>
              ))}
            </span>
          ))}
        </>
      ),
    },
    { label: "Education", value: cv.education.map((e) => `${e.qualification}, ${e.institution}`).join(" · ") },
    { label: "Languages", value: cv.languages.map((l) => `${l.name} (${l.level})`).join(" · ") },
  ]
  return (
    <section className="break-inside-avoid">
      <Heading aside={`More on ${shortUrl(websiteHref)}`}>More about me</Heading>
      <dl className="space-y-1 text-[11px] leading-normal">
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[96px_1fr] gap-3">
            <dt className="font-semibold">{row.label}</dt>
            <dd className="text-ink-2">{row.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

/**
 * The printed CV and its PDF: a one-page résumé built from the same content as the
 * website, cut to what a recruiter reads first: who, the value line, core skills (or, on
 * a job variant, the offer match in their place), then each role's main projects as
 * cards, and one line each for side projects, education and languages. The website
 * (one link in the header) holds every other detail.
 */
export function PrintCv({ cv }: Props) {
  const { variant } = cv
  const websiteHref = `${SITE_URL}${variant.slug ? `${variant.slug}/` : ""}`
  return (
    <div data-print-only className="print-cv">
      <div className="space-y-4">
        <div>
          <Header cv={cv} websiteHref={websiteHref} />
          <ValueLine cv={cv} />
        </div>
        {variant.fit ? <Fit fit={variant.fit} /> : <Specs cv={cv} />}
        <Experience cv={cv} />
        <MoreAboutMe cv={cv} websiteHref={websiteHref} />
      </div>
    </div>
  )
}
