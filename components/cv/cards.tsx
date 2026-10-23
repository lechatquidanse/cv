import type React from "react"
import { formatMonth, formatPeriod } from "@/lib/cv/format"
import type { ResolvedCv } from "@/lib/cv/resolve"
import type { Actor, JobFit, Pillar, Role, SectionId } from "@/lib/cv/types"
import { Section, SpecList, Tile } from "./Card"
import { AppleIcon, CheckIcon, LinesIcon, PersonIcon, PlayStoreIcon } from "./icons"
import { PhoneVideo } from "./PhoneVideo"
import { TickOnView } from "./TickOnView"

interface SectionProps {
  cv: ResolvedCv
}

const intro = (cv: ResolvedCv, id: SectionId) => cv.variant.sectionIntros?.[id]

const pillarIcons: Record<Pillar["id"], React.ReactNode> = {
  tested: <CheckIcon />,
  readable: <LinesIcon />,
  users: <PersonIcon />,
}

const buttonPrimary =
  "flex items-center justify-center gap-2 rounded-[10px] bg-ink px-4 py-3 text-[15px] font-semibold text-paper no-underline transition-opacity hover:opacity-90"
const buttonSecondary =
  "flex items-center justify-center rounded-[10px] border border-ink px-4 py-3 text-[15px] font-semibold no-underline transition-colors hover:bg-surface"

export function Hero({ cv }: SectionProps) {
  const { profile } = cv
  const [headlineMain, ...headlineRest] = profile.headline.split(" · ")
  const [firstName, ...lastNames] = profile.name.split(" ")
  return (
    <section id="top" aria-labelledby="top-title" className="pb-12 pt-8 lg:pt-12">
      <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft py-1 pl-2.5 pr-3 text-[12.5px] font-medium text-accent">
        <span aria-hidden="true" className="h-[7px] w-[7px] rounded-full bg-accent" />
        {profile.status}
      </p>

      <h1 id="top-title" className="display mt-4 text-[56px] leading-[0.92] lg:text-[80px]">
        {firstName}
        <br /> {lastNames.join(" ")}
      </h1>
      <p className="mt-3.5 text-[17px] font-semibold lg:text-[19px]">
        {headlineMain}
        {headlineRest.length > 0 && <span className="font-normal text-muted"> · {headlineRest.join(" · ")}</span>}
      </p>

      <p className="mt-3 max-w-[60ch] text-[15.5px] leading-relaxed text-ink-2 lg:text-[17px]">
        {profile.pitch}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <a href={cv.pdfHref} className={buttonPrimary}>
          Download CV
        </a>
        <a href={`mailto:${profile.email}`} className={buttonSecondary}>
          Email me
        </a>
      </div>

      <ul aria-label="How I work" className="mt-8 grid grid-cols-3 gap-2 lg:gap-3">
        {profile.pillars.map((pillar) => (
          <li key={pillar.id} className="tile px-2.5 py-3 lg:px-4 lg:py-4">
            <span className="text-accent">{pillarIcons[pillar.id]}</span>
            <span className="block">
              <span className="mt-1.5 block text-sm font-semibold lg:text-base">{pillar.title}</span>
              <span className="mt-0.5 block text-[11.5px] leading-snug text-muted lg:text-[13px]">
                {pillar.caption}
              </span>
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <SpecList items={profile.specs} />
      </div>
    </section>
  )
}

const matchLabel = { strong: "Direct match", partial: "Partial match" }

export function FitSection({ fit }: { fit: JobFit }) {
  return (
    <Section
      id="fit"
      eyebrow={`For ${fit.company}`}
      title={
        <>
          Your offer, <span className="text-accent">my evidence</span>
        </>
      }
      titleClassName="display text-[34px] lg:text-[44px]"
    >
      <p className="mt-2 text-sm text-ink-2">
        {fit.role} at {fit.company}.{" "}
        <a href={fit.offerUrl} className="link">
          Read the offer
        </a>
      </p>
      <ul className="mt-4 grid border-y border-rule text-[13.5px] lg:grid-cols-2 lg:gap-x-8">
        {fit.items.map((item) => (
          <li key={item.requirement} className="grid grid-cols-[22px_1fr] gap-2 border-b border-rule py-2 last:border-b-0">
            <span
              className={`mt-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full ${
                item.match === "strong" ? "bg-accent text-white" : "border border-accent text-accent"
              }`}
            >
              <CheckIcon size={11} />
              <span className="sr-only">{matchLabel[item.match]}</span>
            </span>
            <span>
              <span className="block font-semibold">{item.requirement}</span>
              <span className="block text-ink-2">{item.evidence}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function RoleEntry({ role }: { role: Role }) {
  return (
    <article className="border-t border-rule py-5 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="text-[16px] font-semibold lg:text-[17px]">
          {role.title} · {role.company}
          {role.companyNote && <span className="font-normal text-muted"> ({role.companyNote})</span>}
        </h3>
        <p className="font-mono text-[11px] text-muted">
          {formatPeriod(role.start, role.end)} · {role.location}
        </p>
      </div>
      <ul className="mt-2 max-w-[68ch] list-disc space-y-1.5 pl-4 text-[14.5px] leading-snug text-ink-2 marker:text-rule-strong">
        {role.achievements.filter((a) => a.featured).map((a) => (
          <li key={a.id}>
            {a.text}
          </li>
        ))}
      </ul>
      {role.highlight && (
        <div className="tile mt-4 p-4">
          <h4 className="text-[14px] font-semibold">{role.highlight.title}</h4>
          <p className="mt-1 text-[13.5px] text-ink-2">{role.highlight.text}</p>
          <ol className="mt-3 space-y-1.5 text-[13.5px] text-ink-2">
            {role.highlight.points.map((point, i) => (
              <li key={point} className="grid grid-cols-[22px_1fr] gap-2">
                <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>{point}</span>
              </li>
            ))}
          </ol>
          <a href="#ai" className="link mt-3 inline-block text-[13.5px] font-medium text-accent">
            See how it works in the AI section ↓
          </a>
        </div>
      )}
      <p className="mt-2 font-mono text-[11px] text-muted">{role.stack.join(" · ")}</p>
    </article>
  )
}

export function ExperienceSection({ cv }: SectionProps) {
  // Cities in the order they were lived in: Paris → London → Barcelona.
  const allRoles = [...cv.roles, ...cv.earlierRoles].reverse()
  const cities = Array.from(new Set(allRoles.map((role) => role.location.split(",")[0])))
  return (
    <Section
      id="experience"
      eyebrow={`${cv.yearsOfExperience} years in production`}
      title="Experiences"
      titleClassName="display text-[38px] lg:text-[48px]"
      intro={intro(cv, "experience")}
    >
      <p className="mt-3 font-mono text-[11.5px] text-muted">
        {cities.join(" → ")} · working languages: {cv.profile.workingLanguages}
      </p>
      <div className="mt-6">
        {cv.roles.map((role) => (
          <RoleEntry key={role.id} role={role} />
        ))}
      </div>
      <h3 className="eyebrow mt-4 border-t border-rule pt-5">Earlier, across Europe</h3>
      <ul className="mt-2 text-[14px]">
        {cv.earlierRoles.map((role) => (
          <li key={role.id} className="flex flex-wrap items-baseline justify-between gap-x-3 py-1.5">
            <span>
              <span className="font-semibold">
                {role.title} · {role.company}
              </span>
              <span className="text-ink-2"> · {role.achievements.map((a) => a.text).join(" ")}</span>
            </span>
            <span className="font-mono text-[11px] text-muted">
              {formatPeriod(role.start, role.end)} · {role.location}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-rule">
        <EducationAndLanguages cv={cv} />
      </div>
      <p className="mt-6 text-[13px] text-muted">
        Every achievement is in the downloadable CV.{" "}
        <a href={cv.pdfHref} className="link">
          Download it
        </a>
      </p>
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
      eyebrow="AI, predictably"
      title={
        <>
          {aiWorkflow.headline[0]} <span className="text-accent">{aiWorkflow.headline[1]}</span>
        </>
      }
      titleClassName="display text-[42px] lg:text-[56px]"
      intro={intro(cv, "ai")}
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
  const downloads = product.metrics[product.metrics.length - 1]
  return (
    <article className="mt-6">
      <p className="text-[13px] text-muted">
        {product.name} · {product.role} · {product.period}
      </p>
      <h3 className="display mt-1.5 text-[30px] lg:text-[40px]">
        {product.headline[0]} <span className="text-accent">{product.headline[1]}</span>
      </h3>

      <div className="mt-5 grid gap-6 lg:grid-cols-[200px_1fr] lg:gap-10">
        <div>
          <PhoneVideo clip={product.clip} />
        </div>
        <div>
          <p className="max-w-[60ch] text-[15px] leading-relaxed text-ink-2">{product.summary}</p>

          <dl className="mt-4 grid grid-cols-4 gap-1.5">
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
                  <dd className={`display text-xl leading-none lg:text-[28px] ${highlight ? "text-accent" : ""}`}>
                    {metric.value}
                  </dd>
                </div>
              )
            })}
          </dl>
          <p className="mt-1 text-[11px] text-muted">
            Downloads: {downloads.source}, {formatMonth(downloads.asOf)}.
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
      <ul className="mt-3 grid gap-2 lg:grid-cols-2">
        {product.challenges.map((challenge) => (
          <li key={challenge.title} className="tile p-4">
            <h4 className="text-[14.5px] font-semibold">{challenge.title}</h4>
            <p className="mt-1 text-[13.5px] leading-snug text-ink-2">{challenge.text}</p>
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
      eyebrow="My own product and side projects"
      title="Projects"
      titleClassName="display text-[38px] lg:text-[48px]"
      intro={intro(cv, "projects")}
    >
      <ProductBlock cv={cv} />
      <h3 className="eyebrow mt-10 border-t border-rule pt-6">Side projects</h3>
      <div className="mt-3 grid gap-3 lg:grid-cols-[3fr_2fr]">
        {cv.projects.map((project) => (
          <Tile key={project.id} className="p-4">
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
    >
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div>
          <p className="text-[15px] leading-relaxed text-ink-2">
            {profile.status}. Based in {profile.location}.
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
