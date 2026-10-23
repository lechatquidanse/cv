import type React from "react"
import { formatMonth, formatPeriod, shortUrl } from "@/lib/cv/format"
import type { ResolvedCv } from "@/lib/cv/resolve"
import type { JobFit, Role } from "@/lib/cv/types"
import { SITE_URL } from "@/lib/site"
import { CheckIcon } from "./icons"

interface Props {
  cv: ResolvedCv
}

// Numbers are what a recruiter skims for, so they are set in bold wherever they appear.
// Years are dates, not results, and stay plain.
const NUMBER = /(\d(?:[\d,.]*\d)?(?:\s?(?:%|K\+|\+|★))?)/
const YEAR = /^(19|20)\d\d$/

function withBoldNumbers(text: string): React.ReactNode {
  return text
    .split(NUMBER)
    .map((part, i) => (i % 2 === 1 && !YEAR.test(part) ? <strong key={i} className="font-semibold text-ink">{part}</strong> : part))
}

/** "A. B. C." -> "A." — the printed CV keeps the opening sentence; the website has the rest. */
const firstSentence = (text: string) => text.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? text

function Heading({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <h2 className="mb-1.5 flex items-baseline justify-between border-b border-ink pb-1 font-mono text-[9.5px] font-medium uppercase tracking-[0.08em] text-muted">
      <span>{children}</span>
      {aside && <span className="normal-case tracking-normal">{aside}</span>}
    </h2>
  )
}

function KeyNumbers({ cv }: Props) {
  return (
    <dl className="grid grid-cols-5 gap-1.5">
      {cv.profile.keyNumbers.map((metric, i) => (
        <div
          key={metric.label}
          className={`flex flex-col-reverse rounded-lg border px-2.5 py-2 ${i === 0 ? "border-[#c5dacd] bg-accent-soft" : "border-rule"}`}
        >
          <dt className="mt-1 text-[9.5px] leading-tight text-muted">{metric.label}</dt>
          <dd className={`display text-[26px] leading-none ${i === 0 ? "text-accent" : ""}`}>{metric.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function Fit({ fit }: { fit: JobFit }) {
  const direct = fit.items.filter((item) => item.match === "strong").length
  return (
    <div className="rounded-[10px] border border-[#c5dacd] bg-accent-soft px-3.5 py-3">
      <div className="flex items-baseline justify-between gap-4">
        <h2 className="display text-[18px]">
          Your offer, <span className="text-accent">my evidence</span>
        </h2>
        <p className="font-mono text-[9.5px] text-accent-ink">
          {fit.role} · {direct} of {fit.items.length} requirements matched directly
        </p>
      </div>
      <ul className="mt-2 grid grid-cols-2 gap-x-5 gap-y-1 text-[10px] leading-snug">
        {fit.items.map((item) => (
          <li key={item.requirement} className="grid grid-cols-[12px_1fr] gap-1.5">
            <span
              className={`mt-px flex h-3 w-3 items-center justify-center rounded-full ${
                item.match === "strong" ? "bg-accent text-white" : "border border-accent text-accent"
              }`}
            >
              <CheckIcon size={8} />
            </span>
            <span>
              <span className="font-semibold">{item.requirement}</span>
              <span className="text-ink-2"> · {withBoldNumbers(item.evidence)}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RoleBlock({ role }: { role: Role }) {
  return (
    <article className="py-2">
      <div className="flex items-baseline justify-between gap-3">
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
      <ul className="mt-1 space-y-0.5 text-[11.5px] leading-snug text-ink-2">
        {role.achievements.map((a) => (
          <li key={a.id} className="grid grid-cols-[10px_1fr]">
            <span aria-hidden="true" className="text-accent">
              ›
            </span>
            <span>{withBoldNumbers(a.text)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1 pl-[10px] font-mono text-[9px] text-muted">{role.stack.join(" · ")}</p>
    </article>
  )
}

function Product({ cv }: Props) {
  const { product } = cv
  return (
    <section>
      <Heading aside={`${product.role} · ${product.period}`}>My own product · {product.name}</Heading>
      <h3 className="display text-[22px]">
        {product.headline[0]} <span className="text-accent">{product.headline[1]}</span>
      </h3>
      <p className="mt-1 text-[11.5px] leading-snug text-ink-2">{product.summary}</p>
      <dl className="mt-2 grid grid-cols-4 gap-1.5">
        {product.metrics.map((metric, i, all) => {
          const highlight = i === all.length - 1
          return (
            <div
              key={metric.label}
              className={`flex flex-col-reverse rounded-lg border px-2.5 py-1.5 ${highlight ? "border-[#c5dacd] bg-accent-soft" : "border-rule"}`}
            >
              <dt className="text-[9.5px] text-muted">{metric.label}</dt>
              <dd className={`display text-[22px] leading-none ${highlight ? "text-accent" : ""}`}>{metric.value}</dd>
            </div>
          )
        })}
      </dl>
      <ul className="mt-2.5 grid grid-cols-2 gap-x-5 gap-y-2 text-[10.5px] leading-snug">
        {product.challenges.map((challenge) => (
          <li key={challenge.title}>
            <span className="font-semibold">{challenge.title}.</span>{" "}
            <span className="text-ink-2">{withBoldNumbers(firstSentence(challenge.text))}</span>
          </li>
        ))}
      </ul>
      <p className="mt-1.5 font-mono text-[8.5px] text-muted">
        App Store and Google Play: “{product.name}” · {shortUrl(product.website.href)} · downloads: Google Play,{" "}
        {formatMonth(product.metrics[product.metrics.length - 1].asOf)}
      </p>
    </section>
  )
}

function Ai({ cv }: Props) {
  const { aiWorkflow } = cv
  return (
    <section>
      <Heading>AI at work · Claude Code</Heading>
      <h3 className="display text-[18px]">
        {aiWorkflow.headline[0]} <span className="text-accent">{aiWorkflow.headline[1]}</span>
      </h3>
      <ol className="mt-2 flex flex-wrap items-center gap-1 text-[10.5px]">
        {aiWorkflow.steps.map((step, i) => (
          <li key={step.title} className="flex items-center gap-1">
            {i > 0 && (
              <span aria-hidden="true" className="text-muted">
                →
              </span>
            )}
            <span className="rounded border border-rule px-1.5 py-0.5">
              <span className="font-mono text-accent">{i + 1}</span> {step.title}
            </span>
          </li>
        ))}
      </ol>
      <p className="mt-2 text-[11px] text-ink-2">
        {firstSentence(aiWorkflow.intro)} {withBoldNumbers(aiWorkflow.adoption)}
      </p>
    </section>
  )
}

function Projects({ cv }: Props) {
  return (
    <section>
      <Heading>Side projects</Heading>
      <ul className="space-y-1.5 text-[11px] leading-snug">
        {cv.projects.map((project) => (
          <li key={project.id}>
            <span className="font-semibold">{project.name}</span>
            <span className="text-muted"> · {project.kind} · {project.period}</span>
            {project.metrics.map((m) => (
              <span key={m.label} className="font-semibold text-accent">
                {" "}
                · {m.value} {m.label}
              </span>
            ))}
            <span className="block text-ink-2">{withBoldNumbers(firstSentence(project.summary))}</span>
            <span className="block font-mono text-[9px] text-muted">
              {project.stack.join(" · ")} · {shortUrl(project.links[0].href)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Skills({ cv }: Props) {
  return (
    <section>
      <Heading>Skills</Heading>
      <dl className="grid grid-cols-2 gap-x-5 gap-y-0.5 text-[10.5px]">
        {cv.skills.map((group) => (
          <div key={group.label} className="grid grid-cols-[72px_1fr] gap-1.5">
            <dt className="font-semibold">{group.label}</dt>
            <dd className="text-ink-2">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-2.5 grid grid-cols-2 gap-x-5 text-[10.5px]">
        <div>
          <h3 className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-muted">Education</h3>
          {cv.education.map((e) => (
            <p key={e.qualification}>
              <span className="font-semibold">{e.qualification}</span> <span className="text-ink-2">· {e.institution}</span>
            </p>
          ))}
        </div>
        <div>
          <h3 className="font-mono text-[8.5px] uppercase tracking-[0.08em] text-muted">Languages</h3>
          {cv.languages.map((l) => (
            <p key={l.name}>
              <span className="font-semibold">{l.name}</span> <span className="text-ink-2">· {l.level}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Invites the reader to the website, where the video, the AI workflow and every detail live. */
function WebsiteCallout({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="block rounded-[10px] bg-ink px-3.5 py-2.5 text-paper">
      <span className="display block text-[14px] leading-none">
        More on my <span className="text-[#9fd3b6]">website</span> →
      </span>
      <span className="mt-1 block text-[9px] leading-snug opacity-80">{children}</span>
      <span className="mt-1 block whitespace-nowrap font-mono text-[9px] font-medium">{shortUrl(href)}</span>
    </a>
  )
}

/**
 * The printed CV and its PDF: a two-page résumé built from the same content as the
 * website, but laid out for a recruiter's first read, numbers first.
 */
export function PrintCv({ cv }: Props) {
  const { profile, variant } = cv
  const websiteHref = `${SITE_URL}${variant.slug ? `${variant.slug}/` : ""}`
  return (
    <div data-print-only className="print-cv">
      <div className="print-page">
        <div className="grid grid-cols-[1fr_222px] items-start gap-4">
          <div>
            <p className="display text-[38px]">{profile.name}</p>
            <p className="mt-1.5 text-[13px] font-semibold">
              {profile.headline} <span className="font-normal text-accent">· {profile.status}</span>
            </p>
            <p className="mt-1 font-mono text-[9px] text-ink-2">
              {profile.email} · {profile.phone} · {profile.location}
              <br />
              {profile.linkedin.label} · {profile.github.label}
            </p>
          </div>
          <WebsiteCallout href={websiteHref}>App video, the AI workflow step by step and every achievement.</WebsiteCallout>
        </div>
        <p className="mt-3 text-[12.5px] leading-snug text-ink-2">{profile.pitch}</p>

        <div className="mt-4">
          <KeyNumbers cv={cv} />
        </div>

        {/* Page 1 answers "why me": the offer match for a job variant, the AI workflow otherwise. */}
        <div className="mt-4">{variant.fit ? <Fit fit={variant.fit} /> : <Ai cv={cv} />}</div>

        <section className="mt-4">
          <Heading aside={`${cv.yearsOfExperience} years · Paris → London → Barcelona · ${profile.workingLanguages}`}>
            Experience
          </Heading>
          {cv.roles.map((role) => (
            <RoleBlock key={role.id} role={role} />
          ))}
          <ul className="mt-1 border-t border-rule pt-2 text-[11px] leading-snug">
            {cv.earlierRoles.map((role) => (
              <li key={role.id} className="flex items-baseline justify-between gap-3 py-px">
                <span>
                  <span className="font-semibold">{role.company}</span>
                  <span className="text-ink-2">
                    {" "}
                    · {role.title} · {role.achievements.map((a) => a.text).join(" ")}
                  </span>
                </span>
                <span className="shrink-0 font-mono text-[9.5px] text-muted">
                  {formatPeriod(role.start, role.end)} · {role.location.split(",")[0]}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="print-page">
        <div className="space-y-6">
          <Product cv={cv} />
          {variant.fit && <Ai cv={cv} />}
          <Projects cv={cv} />
          <Skills cv={cv} />
        </div>
        <div className="mt-6">
          <WebsiteCallout href={websiteHref}>
            The full CV online: watch the app, follow the AI workflow and read every achievement. Content reviewed{" "}
            {formatMonth(cv.reviewedAt)}.
          </WebsiteCallout>
        </div>
      </div>
    </div>
  )
}
