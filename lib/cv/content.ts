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
    headline: "Senior Backend Engineer · open to Staff",
    status: "Available · Remote EU",
    pitch:
      "I write calm, well-tested backend code that teammates can read and users can rely on. AI helps me go faster, inside the same specs and checks.",
    location: "Barcelona, Spain",
    email: "stephane.elmanouni@gmail.com",
    phone: "+34 635 16 07 80",
    website: { label: "lechatquidanse.github.io/cv", href: "https://lechatquidanse.github.io/cv/" },
    github: { label: "github.com/lechatquidanse", href: "https://github.com/lechatquidanse" },
    linkedin: { label: "linkedin.com/in/stephane-el-manouni", href: "https://www.linkedin.com/in/stephane-el-manouni/" },
    careerStart: 2011,
    workingLanguages: "French and English",
    pillars: [
      {
        id: "tested",
        title: "Tested",
        caption: "Specs and tests first",
      },
      {
        id: "readable",
        title: "Readable",
        caption: "DDD, clear boundaries",
      },
      {
        id: "users",
        title: "For users",
        caption: "Reliable and fast",
      },
    ],
    specs: [
      { label: "Core", value: "PHP, Symfony, Laravel, Node.js, TypeScript" },
      { label: "Design", value: "DDD, CQRS, event sourcing, hexagonal" },
      { label: "Domains", value: "Payments, e-signature, commerce, Claude AI" },
      { label: "Proof", value: "{years} yrs in production · 100K+ app downloads" },
    ],
    keyNumbers: [
      { value: "{years}", label: "years of PHP in production", source: "Career, since 2011", asOf: "2026-10" },
      { value: "100K+", label: "downloads of my own app", source: "Google Play listing", asOf: "2026-10" },
      { value: "10,000", label: "weekly users of invoicing I built", source: "ExpandNow", asOf: "2026-10" },
      { value: "0 → 15%", label: "unit coverage on an untested codebase", source: "ExpandNow", asOf: "2026-10" },
      { value: "162★", label: "GitHub stars on my open-source API", source: "GitHub", asOf: "2026-10" },
    ],
  },

  roles: [
    {
      id: "expandnow",
      company: "ExpandNow",
      companyNote: "formerly Kooomo",
      companyUrl: "https://kooomo.com",
      context: "SaaS e-commerce platform",
      title: "Senior Full-Stack Developer",
      location: "Barcelona, Spain",
      start: "2024",
      end: "2026",
      achievements: [
        {
          id: "e2e-workflow",
          text: "Built the team’s Claude Code workflow for end-to-end tests, adopted by 4 developers and the product owner.",
          featured: true,
        },
        {
          id: "integrations",
          text: "Integrated Salesupply, Sendcloud and Adyen into the platform’s logistics and payment workflows.",
          featured: true,
        },
        {
          id: "invoicing",
          text: "Delivered invoicing with automated PDF generation, used by around 10,000 users every week.",
        },
        {
          id: "testing",
          text: "Made unit testing a standard practice on a codebase with no tests: coverage from 0% to 15%.",
        },
      ],
      highlight: {
        title: "End-to-end testing workflow with Claude Code",
        text: "Turns a Jira story into tested code, one approved step at a time, against the real app: real browser, real login, no mocks.",
        points: [
          "The product owner approves the scope as Given / When / Then scenarios before any code.",
          "Stable test selectors and a committed task list fix the contract between backend, front end and tests.",
          "Tests are written one at a time, run against the real app and signed off by the developer.",
          "Review agents harden the tests, then a narrated video of each scenario is posted on the ticket.",
        ],
      },
      stack: ["PHP", "Laravel", "Node.js", "MySQL", "AWS", "Playwright"],
    },
    {
      id: "zeelo",
      company: "Zeelo",
      companyUrl: "https://zeelo.co/",
      context: "Bus transport for schools and employers",
      title: "Senior Back-End Developer",
      location: "Barcelona, Spain",
      start: "2022",
      end: "2023",
      achievements: [
        {
          id: "bnpl",
          text: "Built a Stripe “buy now, pay later” option for an English school, meeting UK legal requirements.",
          featured: true,
        },
        {
          id: "event-sourcing",
          text: "Developed an event-sourced Symfony application with DDD and CQRS, giving a complete audit trail.",
          featured: true,
        },
        {
          id: "routing-api",
          text: "Built the routing and map API in Node.js and TypeScript; one Docker image from laptop to production, through a move from Google Cloud to AWS.",
        },
        {
          id: "referent",
          text: "Coding-style referent for the team; supported developers through PR reviews on features.",
        },
      ],
      stack: ["PHP", "Symfony", "Node.js", "TypeScript", "Redis", "Docker", "AWS"],
    },
    {
      id: "signaturit",
      company: "Signaturit",
      companyUrl: "https://www.signaturit.com/",
      context: "Electronic-signature platform",
      title: "Senior Back-End Developer",
      location: "Barcelona, Spain",
      start: "2019",
      end: "2022",
      achievements: [
        {
          id: "esignature",
          text: "Shipped features on a legally valid electronic-signature platform, with DDD and CQRS across Symfony, Node.js and Kotlin microservices.",
          featured: true,
        },
        {
          id: "referent",
          text: "Coding-style referent; reviewed and supported colleagues’ PRs on features.",
        },
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
      achievements: [{ id: "client-apis", text: "Symfony APIs for external clients, from specification to documented service." }],
      stack: ["PHP", "Symfony"],
      condensed: true,
    },
    {
      id: "ironweb",
      company: "IronWeb",
      title: "Senior Back-End Developer",
      location: "London, UK",
      start: "2015",
      end: "2016",
      achievements: [{ id: "rest-apis", text: "REST APIs in PHP and Symfony." }],
      stack: ["PHP", "Symfony"],
      condensed: true,
    },
    {
      id: "digitas",
      company: "DigitasLBi",
      title: "PHP Development Engineer",
      location: "Paris, France",
      start: "2011",
      end: "2015",
      achievements: [{ id: "renault-cms", text: "Silex CMS for Renault’s marketing launches." }],
      stack: ["PHP", "Silex"],
      condensed: true,
    },
  ],

  aiWorkflow: {
    headline: ["Specs in.", "Tested code out."],
    intro:
      "At ExpandNow I built the team’s Claude Code workflow for end-to-end tests. Nothing ships until every step below has passed.",
    steps: [
      { title: "Read the ticket", detail: "Story, mockups, product owner", actors: ["Jira", "Claude"] },
      { title: "Agree the scope", detail: "Given / When / Then, approved by the PO", actors: ["Claude", "PO"] },
      { title: "Fix the contract", detail: "Stable selectors and a task list", actors: ["Claude", "Developer"] },
      { title: "Test one thing at a time", detail: "Real browser, real login, no mocks", actors: ["Claude", "Developer"] },
      { title: "Show the proof", detail: "Reviewed, then a narrated video on the ticket", actors: ["Claude", "Jira", "PO"] },
    ],
    adoption: "Adopted by 4 developers and the product owner.",
  },

  product: {
    name: "Foot Master Quiz",
    role: "Solo",
    period: "2023 – now",
    headline: ["Flutter to native in", "6 months"],
    summary:
      "My football quiz for iOS and Android, rebuilt in 2026 as SwiftUI and Jetpack Compose apps on a Supabase backend. Claude wrote most of the code; specs and tests decided what was done.",
    challenges: [
      {
        title: "Native rewrite, no regressions",
        text: "Moved live users from one Flutter app to two native apps under the same store listings. Each feature starts as one product spec and shared Gherkin scenarios, then ships backend, iOS, Android, in that order.",
      },
      {
        title: "Fair multiplayer backend",
        text: "Duels and a weekly league run on Supabase and PostgreSQL. The apps can only call 14 SQL functions, never tables; players sign in anonymously; scheduled jobs close leagues and purge old data. 600+ database tests.",
      },
      {
        title: "Trustworthy AI content",
        text: "Every Monday since October 2026, an AI agent drafts a 10-question quiz in 9 languages from the week’s football news, with 2 sources per answer. A validator with 56 tests and a 6-hour veto window decide what publishes.",
      },
      {
        title: "Safe releases",
        text: "A store upload starts only when every unit and end-to-end test passes and the database migrations are already live: the backend always ships before the apps.",
      },
    ],
    metrics: [
      { value: "118", label: "specs first", source: "Project repository", asOf: "2026-10" },
      { value: "784", label: "scenarios", source: "Project repository", asOf: "2026-10" },
      { value: "2,400+", label: "tests", source: "Project repository", asOf: "2026-10" },
      { value: "100K+", label: "downloads", source: "Google Play listing", asOf: "2026-10" },
    ],
    clip: {
      sources: [
        { src: "/media/fmq-preview.mp4", type: "video/mp4" },
        { src: "/media/fmq-preview.webm", type: "video/webm" },
      ],
      poster: "/media/fmq-preview-poster.webp",
      width: 360,
      height: 780,
      description:
        "Foot Master Quiz App Store preview: name the player, guess a player from his clubs, and a Duel won 4–3 against a friend.",
    },
    appStore: "https://apps.apple.com/us/app/foot-master-quiz/id6449471913",
    googlePlay: "https://play.google.com/store/apps/details?id=com.lcqd.footballerquiz",
    website: { label: "footballerquiz1.web.app", href: "https://footballerquiz1.web.app/" },
    stack: ["Swift", "SwiftUI", "Kotlin", "Jetpack Compose", "Supabase", "PostgreSQL", "Firebase"],
  },

  projects: [
    {
      id: "bicing",
      name: "Bicing",
      kind: "Open source",
      period: "2018 – 2019",
      summary:
        "Collects and serves availability data for Barcelona’s public bike-sharing stations, built during a year of independent study. Author of 253 of the API’s 254 commits.",
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
    },
  ],

  skills: [
    { label: "Backend", items: ["PHP", "Laravel", "Symfony", "Node.js", "TypeScript", "Kotlin", "REST APIs"] },
    { label: "Architecture", items: ["DDD", "CQRS", "Event sourcing", "Hexagonal", "Microservices"] },
    { label: "Quality", items: ["Unit testing", "BDD (Behat, Gherkin)", "Playwright end-to-end", "Code review"] },
    { label: "Data & cloud", items: ["MySQL", "PostgreSQL", "Redis", "AWS", "Google Cloud", "Docker", "CI/CD"] },
    { label: "AI", items: ["Claude Code", "Agent workflows", "Spec-driven development"] },
    { label: "Integrations", items: ["Stripe", "Adyen", "Sendcloud", "Salesupply"] },
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
