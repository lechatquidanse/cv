import type React from "react"
import { formatMonth, formatPeriod, staticFile } from "@/lib/cv/format"
import { roleLogos } from "@/lib/cv/logos"
import type { ResolvedCv } from "@/lib/cv/resolve"
import type { Actor, JobFit, Role, RoleProject, RoleStory, SectionId } from "@/lib/cv/types"
import { Section, SpecList, Tile } from "./Card"
import { withBoldNumbers, withHighlights } from "./BoldNumbers"
import { CareerTimeline } from "./CareerTimeline"
import { CountUp } from "./CountUp"
import { AppleIcon, ArrowIcon, DownloadIcon, MailIcon, PlayStoreIcon } from "./icons"
import { TickOnView } from "./TickOnView"

interface SectionProps {
  cv: ResolvedCv
}

const intro = (cv: ResolvedCv, id: SectionId) => cv.variant.sectionIntros?.[id]

const buttonPrimary =
  "flex items-center justify-center gap-2 rounded-[10px] bg-ink px-4 py-3 text-[15px] font-semibold text-paper no-underline transition-opacity hover:opacity-90"

/** The page's two main calls to action: quiet colour, a soft lift, an icon each. */
const heroButton =
  "inline-flex h-[50px] items-center justify-center gap-2.5 rounded-xl px-5 text-[15px] font-semibold no-underline transition-colors"
const heroPrimary = `${heroButton} btn-primary text-white`
const heroSecondary = `${heroButton} btn-secondary text-ink`

export function Hero({ cv }: SectionProps) {
  const { profile } = cv
  // The second half of the value line ("& …" or "— …") is set in the accent colour.
  const [valueLead, joiner, valueTail] = profile.valueLine.split(/ (&|—) /)
  const company = cv.variant.fit?.company
  return (
    <section id="top" aria-labelledby="top-title" className="pb-12 pt-8 lg:pb-16 lg:pt-14">
      <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft py-1 pl-2.5 pr-3 text-[12.5px] font-medium text-accent">
        <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent" />
        {profile.status}
      </p>

      {/* The name is a quiet label; the value line and the pitch carry the page. */}
      <h1 id="top-title" className="mt-6 text-[15px] font-medium text-ink-2 lg:mt-7 lg:text-[17px]">
        {profile.name}
        <span className="font-normal text-muted"> · {profile.headline.split(" · ")[0]}</span>
        <span className="sr-only">, {profile.headline}</span>
      </h1>

      <p className="display mt-3 max-w-[22ch] text-[40px] leading-[1.03] tracking-[-0.025em] [text-wrap:balance] lg:mt-3.5 lg:text-[64px] lg:leading-[1.02]">
        {valueLead}
        {valueTail && (
          <span className="text-accent">
            {" "}
            {joiner} {valueTail}
          </span>
        )}
      </p>

      <p className="mt-5 max-w-[40em] text-[17px] leading-[1.55] text-ink-2 [text-wrap:pretty] lg:mt-6 lg:text-[20px]">
        {withHighlights(profile.pitch, profile.pitchHighlights)}
      </p>

      <div className="mt-7 grid gap-2.5 sm:flex sm:flex-wrap sm:gap-3 lg:mt-8">
        <a href={cv.pdfHref} className={heroPrimary}>
          <DownloadIcon />
          {company ? `Download my CV for ${company}` : "Download CV"}
        </a>
        <a href={`mailto:${profile.email}`} className={heroSecondary}>
          <MailIcon />
          Email me
        </a>
      </div>

      <div className="mt-10 lg:mt-12">
        <SpecList items={profile.specs} />
      </div>

      {/* The one mention of the years: an invitation down to the experience. */}
      <a href="#experience" className="scroll-cue">
        My {cv.yearsOfExperience} years in production <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}

export function FitSection({ fit }: { fit: JobFit }) {
  return (
    <Section
      id="fit"
      eyebrow={`For ${fit.company} · ${fit.role}`}
      title="Why my background fits"
      titleClassName="display text-[30px] lg:text-[40px]"
    >
      <p className="mt-2 text-sm text-ink-2">
        The main themes of the offer, and where I have done that work.
        {fit.offerUrl && (
          <>
            {" "}
            <a href={fit.offerUrl} className="link">
              Read the offer
            </a>
          </>
        )}
      </p>
      {fit.motivation && <p className="mt-3 text-[15px] text-ink">{fit.motivation}</p>}
      <dl className="mt-4 border-y border-rule text-[14px]">
        {fit.items.map((item) => (
          <div key={item.theme} className="grid gap-1 border-b border-rule py-2.5 last:border-b-0 sm:grid-cols-[190px_1fr] sm:gap-4">
            <dt className="font-semibold">{item.theme}</dt>
            <dd className="text-ink-2">{item.evidence}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

/** The company name, linked to its website when there is one. */
function CompanyName({ role }: { role: Role }) {
  if (!role.companyUrl) return <>{role.company}</>
  return (
    <a href={role.companyUrl} className="company-link">
      {role.company}
      <span aria-hidden="true" className="ml-1 text-[0.75em] text-gold">
        ↗
      </span>
    </a>
  )
}

function RoleEntry({ role }: { role: Role }) {
  const logo = roleLogos[role.id]
  return (
    <article id={`role-${role.id}`} className="relative isolate border-t border-rule pt-8 first:border-t-0 first:pt-0 [&+&]:mt-12">
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element -- static export, decorative
        <img src={staticFile(logo)} alt="" aria-hidden="true" className="role-logo" />
      )}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="flex items-center gap-2.5 text-[18px] font-semibold lg:text-[20px]">
          {logo && (
            // eslint-disable-next-line @next/next/no-img-element -- static export, decorative
            <img src={staticFile(logo)} alt="" aria-hidden="true" className="role-logo-inline" />
          )}
          <span>
            <CompanyName role={role} /> <span className="font-normal text-ink-2">· {role.title}</span>
          </span>
        </h3>
        <p className="font-mono text-[11px] text-muted">
          {formatPeriod(role.start, role.end)} · {role.location.split(",")[0]}
        </p>
      </div>
      {role.context && (
        <p className="mt-1 text-[13.5px] text-muted">
          {role.context}
          {role.companyNote && ` · ${role.companyNote}`}
        </p>
      )}
      <div className="mt-5 grid gap-6 lg:gap-4">
        {role.projects.map((project, i) => (
          <ProjectFlow key={project.id} project={project} index={i} />
        ))}
      </div>
      {role.also && role.also.length > 0 && (
        <p className="mt-4 text-[13.5px] leading-relaxed text-muted">
          <span className="mr-2 font-mono text-[10.5px] tracking-[0.12em] text-gold">ALSO</span>
          {role.also.join(" ")}
        </p>
      )}
    </article>
  )
}

/**
 * One project as four cards joined by arrows: title → need → what I did → result.
 * Side by side on wide screens, stacked on phones. A project without a confirmed
 * need skips that card; one without a figure shows its result in words only.
 */
function ProjectFlow({ project, index }: { project: RoleProject; index: number }) {
  const arrow = (
    <li aria-hidden="true" className="flow-arrow">
      <ArrowIcon className="rotate-90 lg:rotate-0" />
    </li>
  )
  return (
    <ol className={`flow ${project.problem ? "" : "flow-no-need"}`} aria-label={project.title}>
      <li className="flow-card flow-title">
        <span className="font-mono text-[10.5px] tracking-[0.12em] text-[#7a5a22]">{String(index + 1).padStart(2, "0")}</span>
        <h4 className="display text-[21px] leading-[1.12] lg:mt-2.5">{project.title}</h4>
      </li>
      {project.problem && (
        <>
          {arrow}
          <li className="flow-card">
            <span className="flow-label">The need</span>
            <span className="mt-2 block text-[14px] leading-[1.55] text-ink-2">{withBoldNumbers(project.problem)}</span>
          </li>
        </>
      )}
      {arrow}
      <li className="flow-card">
        <span className="flow-label">What I did</span>
        <span className="mt-2 block text-[14px] leading-[1.55]">{project.action}</span>
        <span className="mt-3 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="rounded-md border border-[#e4e4de] bg-paper px-2 py-0.5 font-mono text-[10.5px] text-ink-2">
              {t}
            </span>
          ))}
        </span>
      </li>
      {arrow}
      <li className="flow-card flow-result">
        <span className="flow-label flex items-center gap-1.5 text-accent">
          <span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] text-white">
            ✓
          </span>
          Result
        </span>
        {project.figure && <span className="display mt-2.5 block text-[28px] leading-[1.05] text-accent">{project.figure}</span>}
        <span className={`mt-1.5 block leading-normal text-accent-ink ${project.figure ? "text-[13.5px]" : "mt-2.5 text-[15px] font-medium"}`}>
          {withBoldNumbers(project.result)}
        </span>
        {project.more && (
          <a href={project.more.href} className="link mt-auto pt-2.5 text-[13px] font-semibold text-accent">
            {project.more.label} ↓
          </a>
        )}
      </li>
    </ol>
  )
}

const storySteps = [
  { key: "problem", label: "The need" },
  { key: "action", label: "What I built" },
  { key: "result", label: "Result" },
] as const

/**
 * A project as need → what I built → result: three numbered steps joined by a line,
 * the result highlighted. Side by side on wide screens unless `stacked`; the steps
 * appear in turn the first time the block scrolls into view.
 */
function StoryFlow({ story, stacked = false }: { story: RoleStory; stacked?: boolean }) {
  return (
    <TickOnView className={`story tile h-full ${stacked ? "story-stacked" : "mt-4"}`}>
      <h4 className="text-[15px] font-semibold">{story.title}</h4>
      <ol className="story-steps">
        {storySteps.map((step, i) => (
          <li key={step.key} className={`story-step ${step.key === "result" ? "story-step-result" : ""}`}>
            <span aria-hidden="true" className="story-dot">
              {step.key === "result" ? "✓" : i + 1}
            </span>
            <span className="eyebrow block">{step.label}</span>
            {step.key === "result" && story.figure && (
              <span className="display mt-1.5 block text-[24px] leading-none text-accent">{story.figure}</span>
            )}
            <span className="story-text">{withBoldNumbers(story[step.key])}</span>
          </li>
        ))}
      </ol>
      {story.more && (
        <a href={story.more.href} className="link mt-4 inline-block text-[13.5px] font-medium text-accent">
          {story.more.label} ↓
        </a>
      )}
    </TickOnView>
  )
}

export function ExperienceSection({ cv }: SectionProps) {
  // Cities in the order they were lived in: Paris → London → Barcelona.
  const allRoles = [...cv.roles, ...cv.earlierRoles].reverse()
  const cities = Array.from(new Set(allRoles.map((role) => role.location.split(",")[0])))
  const lastYear = cv.reviewedAt.slice(0, 4)
  return (
    <Section
      id="experience"
      eyebrow={`${cv.profile.careerStart} → ${lastYear} · ${cities.join(" → ")}`}
      title="Experience"
      titleClassName="display text-[38px] lg:text-[48px]"
      intro={intro(cv, "experience")}
    >
      <p className="mt-3 text-[15px] text-muted">
        Each project read left to right: what was needed, what I did, what came out of it. Working languages:{" "}
        {cv.profile.workingLanguages}.
      </p>
      <CareerTimeline roles={[...cv.roles, ...cv.earlierRoles]} />
      <div className="mt-10">
        {cv.roles.map((role) => (
          <RoleEntry key={role.id} role={role} />
        ))}
      </div>
      <h3 className="eyebrow mt-12 border-t border-rule pt-5">Earlier, across Europe</h3>
      <ul className="mt-2 text-[14px]">
        {cv.earlierRoles.map((role) => (
          <li key={role.id} id={`role-${role.id}`} className="flex flex-wrap items-baseline justify-between gap-x-3 py-1.5">
            <span>
              <span className="font-semibold">
                <CompanyName role={role} />
              </span>{" "}
              · {role.title}
              <span className="text-ink-2"> · {role.summary}</span>
            </span>
            <span className="font-mono text-[11px] text-muted">
              {formatPeriod(role.start, role.end)} · {role.location.split(",")[0]}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-rule">
        <EducationAndLanguages cv={cv} />
      </div>
    </Section>
  )
}

const actorStyles: Record<Actor, string> = {
  Jira: "bg-[#e8edf5] text-[#2c4a73]",
  Claude: "bg-accent-soft text-accent",
  Developer: "bg-[#efeee8] text-ink-2",
  PO: "bg-[#f6ece0] text-[#7a4a17]",
}

export function AiSection({ cv }: SectionProps) {
  const { aiWorkflow } = cv
  return (
    <Section
      id="ai"
      eyebrow="Spec-to-test workflow · built at ExpandNow"
      title={
        <>
          {aiWorkflow.headline[0]} <span className="text-accent">{aiWorkflow.headline[1]}</span>
        </>
      }
      titleClassName="display text-[42px] lg:text-[56px]"
      intro={intro(cv, "ai")}
      band="soft"
    >
      <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-ink-2">
        {aiWorkflow.intro}
      </p>
      <TickOnView className="mt-6">
        <ol className="grid gap-2 lg:grid-cols-5">
          {aiWorkflow.steps.map((step, i) => (
            <li
              key={step.title}
              className="tile grid grid-cols-[26px_1fr] items-center gap-3 px-3 py-2.5 lg:grid-cols-1 lg:items-start lg:gap-2 lg:p-3"
            >
              <span className="check" style={{ animationDelay: `${i * 0.25}s` }} aria-hidden="true">
                ✓
              </span>
              <span>
                <span className="block text-sm font-semibold">{step.title}</span>
                <span className="block text-[12.5px] text-muted">{step.detail}</span>
                <span className="mt-1.5 flex flex-wrap gap-1" aria-label={`Done by: ${step.actors.join(", ")}`}>
                  {step.actors.map((actor) => (
                    <span key={actor} className={`rounded px-1.5 py-px font-mono text-[10px] font-medium ${actorStyles[actor]}`}>
                      {actor}
                    </span>
                  ))}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </TickOnView>
      <p className="mt-4 text-[14px] text-ink-2">{aiWorkflow.adoption}</p>
    </Section>
  )
}

/** Foot Master Quiz, the featured project. */
function ProductBlock({ cv }: SectionProps) {
  const { product } = cv
  const downloads = product.metrics.find((metric) => metric.label === "downloads") ?? product.metrics[0]
  return (
    <article className="mt-6">
      <p className="text-[13px] text-muted">
        {product.name} · {product.role} · {product.period}
      </p>
      <h3 className="display mt-1.5 text-[30px] lg:text-[40px]">
        {product.headline[0]} <span className="text-accent">{product.headline[1]}</span>
      </h3>

      <div className="mt-5 grid gap-6 lg:grid-cols-[160px_1fr] lg:gap-10">
        <div className="flex items-start gap-4 lg:flex-col">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, already sized */}
          <img
            src={staticFile(product.icon.src)}
            alt={product.icon.alt}
            width={128}
            height={128}
            className="app-icon app-icon-soft h-24 w-24 lg:h-32 lg:w-32"
          />
          <p className="text-[13px] leading-snug text-muted lg:mt-1">
            <span className="block font-semibold text-ink">{product.name}</span>
            iOS and Android
          </p>
        </div>
        <div>
          <p className="max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{product.summary}</p>

          <dl className="mt-4 grid grid-cols-3 gap-1.5 sm:grid-cols-5">
            {product.metrics.map((metric) => {
              const highlight = metric === downloads
              return (
                <div
                  key={metric.label}
                  className={`flex flex-col-reverse rounded-lg border px-2 py-1.5 lg:px-3 lg:py-2.5 ${
                    highlight ? "border-[#c5dacd] bg-accent-soft" : "border-rule bg-surface"
                  }`}
                >
                  <dt className={`mt-0.5 text-[10.5px] leading-tight lg:text-xs ${highlight ? "text-accent-ink" : "text-muted"}`}>
                    {metric.label}
                  </dt>
                  <dd className={`display text-xl leading-none tabular-nums lg:text-[26px] ${highlight ? "text-accent" : ""}`}>
                    <CountUp value={metric.value} />
                  </dd>
                </div>
              )
            })}
          </dl>
          <p className="mt-1 text-[11px] text-muted">
            Downloads and rating: {downloads.source}, {formatMonth(downloads.asOf)}.
          </p>

          <div className="mt-5 grid max-w-sm grid-cols-2 gap-2">
            <a href={product.appStore} className={`${buttonPrimary} py-2`}>
              <AppleIcon />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[9.5px] font-normal">Download on the</span>
                <span className="text-sm">App Store</span>
              </span>
            </a>
            <a href={product.googlePlay} className={`${buttonPrimary} py-2`}>
              <PlayStoreIcon />
              <span className="flex flex-col text-left leading-tight">
                <span className="text-[9.5px] font-normal">Get it on</span>
                <span className="text-sm">Google Play</span>
              </span>
            </a>
          </div>
          <a href={product.website.href} className="link mt-3 inline-block text-[13px] font-medium">
            {product.website.label}
          </a>
        </div>
      </div>

      <h3 className="eyebrow mt-8">Challenges I solved</h3>
      <ul className="mt-3 grid gap-3 lg:grid-cols-2">
        {product.challenges.map((challenge) => (
          <li key={challenge.title}>
            <StoryFlow story={challenge} stacked />
          </li>
        ))}
      </ul>
    </article>
  )
}

export function ProjectsSection({ cv }: SectionProps) {
  return (
    <Section
      id="projects"
      eyebrow="My own app and side projects"
      title="Projects"
      titleClassName="display text-[38px] lg:text-[48px]"
      intro={intro(cv, "projects")}
    >
      <ProductBlock cv={cv} />
      <h3 className="eyebrow mt-10 border-t border-rule pt-6">Side projects</h3>
      <div className="mt-3 grid gap-3 lg:grid-cols-[3fr_2fr]">
        {cv.projects.map((project) => (
          <Tile key={project.id} className="relative overflow-hidden p-4">
            {project.backdrop && (
              // eslint-disable-next-line @next/next/no-img-element -- static export, decorative
              <img src={staticFile(project.backdrop)} alt="" aria-hidden="true" className="tile-backdrop" />
            )}
            <p className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="text-[15px] font-semibold">
                {project.name} <span className="font-normal text-muted">· {project.kind}</span>
              </span>
              <span className="font-mono text-[11px] text-muted">
                {project.metrics.map((m) => `${m.value} ${m.label}`).join(" · ") || project.period}
                {project.metrics.length > 0 && ` · ${project.period}`}
              </span>
            </p>
            <p className="mt-1.5 text-[13.5px] leading-snug text-ink-2">{project.summary}</p>
            {project.points.length > 0 && (
              <ul className="mt-2 list-disc space-y-1 pl-4 text-[13.5px] text-ink-2 marker:text-rule-strong">
                {project.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
            <p className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 text-[13px]">
              {project.links.map((link) => (
                <a key={link.href} href={link.href} className="link">
                  {link.label}
                </a>
              ))}
            </p>
          </Tile>
        ))}
      </div>
    </Section>
  )
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="eyebrow mt-6">{children}</h3>
}

function EducationAndLanguages({ cv }: SectionProps) {
  return (
    <div className="grid gap-x-8 sm:grid-cols-2">
      <div>
        <SubHeading>Education</SubHeading>
        <ul className="mt-2 text-[14px]">
          {cv.education.map((e) => (
            <li key={e.qualification}>
              <span className="font-semibold">{e.qualification}</span> <span className="text-ink-2">· {e.institution}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <SubHeading>Languages</SubHeading>
        <ul className="mt-2 text-[14px]">
          {cv.languages.map((l) => (
            <li key={l.name}>
              <span className="font-semibold">{l.name}</span> <span className="text-ink-2">· {l.level}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function ContactSection({ cv }: SectionProps) {
  const { profile } = cv
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={
        <>
          Let’s <span className="text-accent">talk</span>
        </>
      }
      titleClassName="display text-[48px] lg:text-[64px]"
      band="dark"
    >
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-[15px] leading-relaxed text-ink-2">
            {profile.status}
            {/* The status may already name the city. */}
            {profile.status.includes(profile.location.split(",")[0]) ? "." : `. Based in ${profile.location}.`}
          </p>
          <a href={`mailto:${profile.email}`} className="link mt-5 block break-all text-lg font-semibold lg:text-xl">
            {profile.email}
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="link mt-2 inline-block text-[15px]">
            {profile.phone}
          </a>
        </div>
        <div>
          <ul className="border-t border-rule text-[14px]">
            {[profile.linkedin, profile.github].map((link) => (
              <li key={link.href} className="border-b border-rule py-3">
                <a href={link.href} className="link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={cv.pdfHref} className={`${buttonPrimary} mt-5`}>
            Download CV
          </a>
        </div>
      </div>
      <p className="mt-10 text-[12px] text-muted">Content reviewed {formatMonth(cv.reviewedAt)}.</p>
    </Section>
  )
}
