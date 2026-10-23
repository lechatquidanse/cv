import type React from "react"
import { formatPeriod, shortUrl } from "@/lib/cv/format"
import type { ResolvedCv } from "@/lib/cv/resolve"
import type { JobFit, Role, RoleStory } from "@/lib/cv/types"
import { SITE_URL } from "@/lib/site"
import { withBoldNumbers } from "./BoldNumbers"

interface Props {
  cv: ResolvedCv
}

// The printed CV is the one-page version: only items not marked `print: false`.
// The website has the rest.
const printed = <T extends { print?: boolean }>(items: T[]) => items.filter((item) => item.print !== false)
// A role prints its story box and at most this many bullets, so the CV fits one page.
const PRINTED_BULLETS = 2

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
        <p className="display whitespace-nowrap text-[30px]">{profile.name}</p>
        <p className="mt-1 text-[11px] text-ink-2">{profile.status}</p>
      </div>
      {/* One column of contact lines; the website is the one link to everything left out here. */}
      <address className="shrink-0 text-right font-mono text-[9.5px] not-italic leading-[1.7] text-ink-2">
        {profile.email} · {profile.phone}
        <br />
        {profile.linkedin.label}
        <br />
        {profile.github.label}
        <br />
        <a href={websiteHref} className="font-medium text-accent">
          Full CV: {shortUrl(websiteHref)}
        </a>
      </address>
    </div>
  )
}

/** The value line, on its own full-width line under the header so it never wraps. */
function ValueLine({ cv }: Props) {
  return <p className="display mt-3 text-[18px] text-accent">{cv.profile.valueLine}</p>
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

const storySteps = [
  { key: "problem", label: "1 · The need" },
  { key: "action", label: "2 · What I built" },
  { key: "result", label: "✓ Result" },
] as const

/** Need → what I built → result in three short columns, like the website's story blocks. */
function PrintStory({ story }: { story: RoleStory }) {
  return (
    <div className="mt-2 break-inside-avoid rounded-lg border border-rule px-3 py-2">
      <p className="text-[11px] font-semibold">{story.title}</p>
      <ol className="mt-1 grid grid-cols-[1fr_1.35fr_0.85fr] gap-4 text-[10.5px] leading-snug text-ink-2">
        {storySteps.map((step) => (
          <li key={step.key}>
            <span className="block font-mono text-[8.5px] uppercase tracking-[0.08em] text-accent">{step.label}</span>
            {step.key === "result" && story.figure && (
              <span className="display mt-0.5 block text-[15px] leading-tight text-accent">{story.figure}</span>
            )}
            <span className={`mt-0.5 block ${step.key === "result" ? "font-medium text-ink" : ""}`}>
              {withBoldNumbers(story[step.key])}
            </span>
          </li>
        ))}
      </ol>
    </div>
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
  return (
    // A role may continue on the next page between bullets; its heading never ends a page.
    <article className="pb-6 last:pb-0 print:break-inside-auto">
      <div className="flex break-after-avoid items-baseline justify-between gap-3">
        <h3 className="text-[13.5px] font-semibold">
          {role.company}
          <span className="font-normal text-ink-2"> · {role.title}</span>
        </h3>
        <p className="shrink-0 font-mono text-[10px] text-muted">
          {formatPeriod(role.start, role.end)} · {role.location.split(",")[0]}
        </p>
      </div>
      {(role.context || role.companyNote) && (
        <p className="text-[10px] text-muted">{[role.context, role.companyNote].filter(Boolean).join(" · ")}</p>
      )}
      <ul className="mt-1.5 space-y-1 text-[11.5px] leading-normal text-ink-2">
        {printed(role.achievements)
          .slice(0, PRINTED_BULLETS)
          .map((a) => (
          <li key={a.id} className="grid grid-cols-[12px_1fr]">
            <span aria-hidden="true" className="text-accent">
              ›
            </span>
            <span>{withBoldNumbers(a.text)}</span>
          </li>
        ))}
      </ul>
      {role.story && <PrintStory story={role.story} />}
    </article>
  )
}

function Experience({ cv }: Props) {
  return (
    <section>
      <Heading aside="Paris → London → Barcelona">Experience</Heading>
      {cv.roles.map((role) => (
        <RoleBlock key={role.id} role={role} />
      ))}
      {/* Earlier roles: one line each, dates only (the cities are in the heading). */}
      <ul className="mt-1 break-inside-avoid space-y-0.5 text-[11px] leading-normal">
        {cv.earlierRoles.map((role) => (
          <li key={role.id} className="flex items-baseline justify-between gap-3">
            <span>
              <span className="font-semibold">{role.company}</span>
              <span className="text-ink-2">
                {" "}
                · {role.title} · {role.achievements.map((a) => a.text).join(" ")}
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
 * website, cut to what a recruiter reads first: who, the value line, core skills, the
 * offer match on a job variant, then each role as a story box and two bullets, and one
 * line each for side projects, education and languages. A job CV may flow onto a second
 * page. The website (one link in the header) holds every other detail.
 */
export function PrintCv({ cv }: Props) {
  const { profile, variant } = cv
  const websiteHref = `${SITE_URL}${variant.slug ? `${variant.slug}/` : ""}`
  return (
    <div data-print-only className="print-cv">
      <div className="space-y-5">
        <div>
          <Header cv={cv} websiteHref={websiteHref} />
          <ValueLine cv={cv} />
          <p className="mt-3 text-[12.5px] leading-normal text-ink-2">{profile.pitch}</p>
        </div>
        <Specs cv={cv} />
        {variant.fit && <Fit fit={variant.fit} />}
        <Experience cv={cv} />
        <MoreAboutMe cv={cv} websiteHref={websiteHref} />
      </div>
    </div>
  )
}
