/**
 * Canonical career data. This is the only place facts live.
 *
 * Rules for editing:
 * - Only write what is true and could be defended in an interview.
 * - Metrics carry a source and an `asOf` month; re-check them before each job search.
 * - Unconfirmed facts stay out of this file and go to docs/OPEN-QUESTIONS.md.
 * - Nothing internal to an employer: no ticket keys, internal URLs, client ids or screenshots.
 */
import type { Cv } from "./types"

export const cv: Cv = {
  reviewedAt: "2026-10",

  profile: {
    name: "Stéphane El Manouni",
    headline: "Senior Backend Engineer · PHP · Symfony · Laravel · AI-assisted engineering",
    valueLine: "I build software that works better for users & easier to evolve.",
    status: "Available · Barcelona or remote (EU)",
    pitch:
      "I combine product thinking, clean and robust engineering, and pragmatic use of AI to deliver software that solves real problems without creating unnecessary complexity.",
    pitchHighlights: ["product thinking", "clean and robust engineering", "pragmatic use of AI"],
    location: "Barcelona, Spain",
    email: "stephane.elmanouni@gmail.com",
    phone: "+34 635 16 07 80",
    website: { label: "lechatquidanse.github.io/cv", href: "https://lechatquidanse.github.io/cv/" },
    github: { label: "github.com/lechatquidanse", href: "https://github.com/lechatquidanse" },
    linkedin: { label: "linkedin.com/in/stephane-el-manouni", href: "https://www.linkedin.com/in/stephane-el-manouni/" },
    careerStart: 2011,
    workingLanguages: "French, English and Spanish",
    specs: [
      { label: "Core", value: "Claude, PHP, Symfony, Laravel, Node.js, TypeScript · MySQL, PostgreSQL, Redis" },
      { label: "Architecture", value: "DDD, CQRS, event sourcing, hexagonal, microservices · Docker, AWS" },
      { label: "Work", value: "Jira, agile, GitHub workflow, CI/CD, Playwright" },
    ],
  },

  roles: [
    {
      id: "expandnow",
      company: "ExpandNow",
      companyNote: "formerly Kooomo",
      companyUrl: "https://www.expandnow.com/",
      context: "SaaS e-commerce platform",
      title: "Senior Full-Stack Developer",
      location: "Barcelona, Spain",
      start: "2024",
      end: "2026",
      projects: [
        {
          id: "invoicing",
          title: "PDF invoicing",
          problem: "Merchants rely on PDF invoices, built by a deprecated, unmaintained and slow library.",
          action: "Replaced the library, removing its security risks, and cached the header and footer shared by every PDF.",
          tech: ["PHP", "Laravel", "Composer"],
          figure: "~10,000",
          result: "users every month.",
        },
        {
          id: "spec-to-test",
          title: "Spec‑to‑test workflow",
          problem: "No QA team, no end-to-end tests, and test cases the product owner found hard to validate.",
          action: "A Claude Code workflow: approved Given / When / Then scenarios, then one real-browser test at a time. Shaped with other teams’ feedback.",
          tech: ["Claude Code", "Playwright", "Gherkin", "Jira"],
          figure: "4 devs + PO",
          result: "adopted it. End-to-end tests back each release; the PO reviews a story from its video.",
          more: { label: "See the 5 steps", href: "#ai" },
        },
        {
          id: "integrations",
          title: "Payments & logistics",
          problem: "Merchants shipping with Sendcloud or Salesupply could not join, and the Adyen payments ran on a deprecated version that could no longer be maintained.",
          action: "Integrated Sendcloud and Salesupply logistics into order flows, and moved Adyen payments to a supported version.",
          tech: ["Adyen", "Sendcloud", "Salesupply"],
          result: "New merchants can join, with more payment and carrier options.",
          print: false,
        },
        {
          id: "unit-tests",
          title: "Unit tests",
          problem: "A codebase with no tests.",
          action: "Introduced unit testing to the codebase.",
          tech: ["PHP", "Laravel"],
          figure: "0% → 15%",
          result: "unit test coverage.",
          print: false,
        },
      ],
      also: [
        "Mentor the team on setting up and configuring Claude Code.",
        "On call for production, with AWS CloudWatch and Zendesk.",
      ],
      stack: ["PHP", "Laravel", "Node.js", "MySQL", "AWS", "Playwright"],
    },
    {
      id: "zeelo",
      company: "Zeelo",
      companyUrl: "https://zeelo.co/",
      context: "Bus transport for schools and employers",
      title: "Senior Backend Developer",
      location: "Barcelona, Spain",
      start: "2022",
      end: "2023",
      projects: [
        {
          id: "bnpl",
          title: "Instalment billing",
          problem: "Schools could not pay a full year of bus transport up front.",
          action: "Proposed building it in-house rather than paying a third-party pay-later provider. A scheduled job charges each period by SEPA or UK direct debit, through Stripe.",
          tech: ["Stripe", "SEPA direct debit", "UK direct debit"],
          figure: "100+ schools",
          result: "signed in the first year.",
        },
        {
          id: "tech-lead",
          title: "Tech lead & mentoring",
          problem: "No coding best practices shared across the team.",
          action: "Started a weekly tech meeting and set the standards: framework-agnostic code, dependency injection, a unit-tested domain. Introduced Kotlin and hexagonal architecture.",
          tech: ["Kotlin", "DDD", "Hexagonal", "Event sourcing"],
          figure: "6 engineers",
          result: "in 2 squads share one set of standards, kept consistent through pull-request reviews.",
        },
        {
          id: "event-sourcing",
          title: "Audit trail",
          action: "Built an event-sourced Symfony service, designed with DDD and CQRS.",
          tech: ["Symfony", "Event sourcing", "DDD", "CQRS"],
          result: "A full audit trail of every change.",
          print: false,
        },
      ],
      stack: ["PHP", "Symfony", "Kotlin", "Node.js", "TypeScript", "Stripe", "Redis", "Docker", "AWS"],
    },
    {
      id: "signaturit",
      company: "Signaturit",
      companyUrl: "https://www.signaturit.com/",
      context: "E-signature platform",
      title: "Senior Backend Developer",
      location: "Barcelona, Spain",
      start: "2019",
      end: "2022",
      projects: [
        {
          id: "esignature",
          title: "E‑signature",
          problem: "Signatures that are legally valid, on a platform split into microservices.",
          action: "Built features with DDD and CQRS across Symfony, Node.js and Kotlin microservices.",
          tech: ["Symfony", "Node.js", "Kotlin", "DDD", "CQRS"],
          figure: "50K",
          result: "signatures every week, across Europe.",
        },
      ],
      also: [
        "Ran a weekly tech meeting where developers share features, failures, successes and new tools.",
        "Kept coding standards consistent through pull-request reviews.",
      ],
      stack: ["PHP", "Symfony", "Node.js", "Kotlin", "Docker", "Jenkins", "AWS"],
    },
    {
      id: "wetrack",
      company: "WeTrack",
      title: "Full-Stack Developer",
      location: "Barcelona, Spain",
      start: "2016",
      end: "2018",
      projects: [],
      summary: "Symfony APIs for external clients, from specification to documented service.",
      stack: ["PHP", "Symfony"],
      condensed: true,
    },
    {
      id: "ironweb",
      company: "IronWeb",
      title: "Senior Backend Developer",
      location: "London, UK",
      start: "2015",
      end: "2016",
      projects: [],
      summary: "REST APIs in PHP and Symfony.",
      stack: ["PHP", "Symfony"],
      condensed: true,
    },
    {
      id: "digitas",
      company: "DigitasLBi",
      companyUrl: "https://www.digitas.com/",
      title: "PHP Development Engineer",
      location: "Paris, France",
      start: "2011",
      end: "2015",
      projects: [],
      summary: "Silex CMS for Renault’s marketing launches.",
      stack: ["PHP", "Silex"],
      condensed: true,
    },
  ],

  aiWorkflow: {
    headline: ["Specs in.", "Tested code out."],
    intro:
      "Built at ExpandNow, where there was no QA team and no end-to-end tests: a Jira story becomes tested code with Claude Code. Nothing ships until every step below has passed.",
    steps: [
      { title: "Read the story", detail: "Jira story, mockups, product owner", actors: ["Jira", "Claude"] },
      { title: "Agree the scope", detail: "Given / When / Then, approved by the product owner", actors: ["Claude", "PO"] },
      { title: "Lock the contract", detail: "Stable test selectors and a committed task list", actors: ["Claude", "Developer"] },
      { title: "Test one thing at a time", detail: "Real browser, real login, no mocks; signed off by the developer", actors: ["Claude", "Developer"] },
      { title: "Show the proof", detail: "Hardened by review agents, then a narrated video on the ticket", actors: ["Claude", "Jira", "PO"] },
    ],
    adoption: "Adopted by 4 developers and the product owner.",
  },

  product: {
    name: "Foot Master Quiz",
    role: "Solo",
    period: "2023 – now",
    headline: ["Flutter to native in", "6 months"],
    summary:
      "My football quiz for iOS and Android, rebuilt in 2026 as SwiftUI and Jetpack Compose apps on a Supabase backend. Claude wrote most of the code; specs and tests decided when it was done.",
    challenges: [
      {
        title: "Native rewrite, no regressions",
        problem: "Move live users from one Flutter app to two native apps, under the same store listings.",
        action: "Each feature starts as one product spec and shared Gherkin scenarios, then ships backend, iOS, Android, in that order.",
        result: "Native iOS and Android apps in 6 months.",
        print: false,
      },
      {
        title: "Fair multiplayer backend",
        problem: "Duels and a weekly league between players who sign in anonymously.",
        action: "The apps can only call 14 SQL functions, never tables; scheduled jobs close leagues and purge old data.",
        result: "Duels and the weekly league run on Supabase and PostgreSQL.",
      },
      {
        title: "Trustworthy AI content",
        problem: "A new 10-question quiz every week, in 9 languages, from the week’s football news.",
        action: "An AI agent drafts each quiz with 2 sources per answer; a validator with 56 tests and a 6-hour veto window decide what publishes.",
        result: "Published every Monday since October 2026.",
      },
      {
        title: "A/B tests",
        problem: "Know which changes keep players, and which bring new ones.",
        action: "A/B tested the order of the first quiz’s riddles against retention, and the Google Play store listing against acquisition.",
        figure: "+10%",
        result: "first-day retention from the new riddle order, and +8% device acquisitions on Google Play.",
        print: false,
      },
      {
        title: "Safe releases",
        problem: "A release must never break the live apps or their data.",
        action: "A store upload starts only when every unit and end-to-end test passes and the database migrations are already live.",
        result: "The backend always ships before the apps.",
        print: false,
      },
    ],
    metrics: [
      { value: "118", label: "product specs", source: "Project repository", asOf: "2026-10" },
      { value: "784", label: "Gherkin scenarios", source: "Project repository", asOf: "2026-10" },
      { value: "2,400+", label: "tests", source: "Project repository", asOf: "2026-10" },
      { value: "200K+", label: "downloads", source: "App Store and Google Play, owner data", asOf: "2026-10" },
      { value: "4.9★", label: "rating", source: "App Store and Google Play, owner data", asOf: "2026-10" },
    ],
    icon: { src: "/media/fmq-icon.png", alt: "Foot Master Quiz app icon" },
    appStore: "https://apps.apple.com/us/app/foot-master-quiz/id6449471913",
    googlePlay: "https://play.google.com/store/apps/details?id=com.lcqd.footballerquiz",
    website: { label: "footballerquiz1.web.app", href: "https://footballerquiz1.web.app/" },
    stack: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "Flutter", "Supabase", "PostgreSQL", "Firebase"],
  },

  projects: [
    {
      id: "bicing",
      name: "Bicing",
      kind: "Open source",
      period: "2018 – 2019",
      summary:
        "Open-source platform that collects, serves and predicts availability for Barcelona’s bike-sharing stations: Symfony API, Python machine learning, React front end. Built during a year of independent study; author of 253 of the API’s 254 commits.",
      points: [
        "Symfony REST API: DDD, CQRS and BDD with Behat; GitLab CI builds and ships Docker images.",
        "Python API that predicts bike availability with machine learning.",
        "React and TypeScript front end for the station map and statistics.",
      ],
      metrics: [{ value: "162", label: "GitHub stars", source: "GitHub", asOf: "2026-10" }],
      links: [
        { label: "API", href: "https://github.com/lechatquidanse/bicing-api" },
        { label: "Prediction", href: "https://github.com/lechatquidanse/bicing-prediction-api" },
        { label: "Front end", href: "https://github.com/lechatquidanse/bicing-user-interface-app" },
      ],
      stack: ["PHP", "Symfony", "TimescaleDB", "Python", "React", "TypeScript", "Docker"],
      backdrop: "/media/bicing.webp",
    },
    {
      id: "deux-cinq",
      name: "Deux Cinq",
      kind: "E-commerce",
      period: "Freelance",
      summary:
        "Online shop for a French low-alcohol beer brand on Shopify: theme customisation and Google Tag Manager tracking.",
      points: [],
      metrics: [],
      links: [{ label: "ladeuxcinq.com", href: "https://ladeuxcinq.com/" }],
      stack: ["Shopify", "Liquid", "JavaScript", "Google Tag Manager"],
      backdrop: "/media/deux-cinq.webp",
      print: false,
    },
  ],

  skills: [
    { label: "Backend", items: ["PHP", "Symfony", "Laravel", "Node.js", "TypeScript", "Python (APIs, automation)", "Kotlin", "REST APIs"] },
    { label: "Architecture", items: ["DDD", "CQRS", "Event sourcing", "Hexagonal architecture", "Microservices"] },
    { label: "Quality", items: ["Unit testing", "End-to-end testing (Playwright)", "BDD (Behat, Gherkin)", "Code review", "A/B testing"] },
    { label: "Data & cloud", items: ["MySQL", "PostgreSQL", "TimescaleDB", "Supabase", "Redis", "AWS", "AWS CloudWatch", "Google Cloud", "Docker", "CI/CD (GitLab CI, Jenkins)"] },
    { label: "AI", items: ["Claude Code", "AI agents", "Spec-driven development", "LLM content pipelines"] },
    { label: "Integrations", items: ["Stripe", "Adyen", "Sendcloud", "Salesupply", "SEPA and UK direct debit"] },
    { label: "Front end & mobile", items: ["React", "SwiftUI", "Jetpack Compose", "Flutter"] },
  ],

  education: [
    { qualification: "Master of Computer Science", institution: "Polytech Paris-UPMC" },
    { qualification: "Classes préparatoires (CPGE)", institution: "E.N.C.P.B." },
  ],

  languages: [
    { name: "French", level: "native" },
    { name: "English", level: "professional, TOEIC 910/990" },
    { name: "Spanish", level: "living in Barcelona since 2016" },
  ],
}
