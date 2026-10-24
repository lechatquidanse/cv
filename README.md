# Stéphane El Manouni · CV

Live at **https://lechatquidanse.github.io/cv/**. A static Next.js export on GitHub Pages.

On screen the CV is one vertical page with a sticky bar (section links that follow the
reader, and the PDF). In print the page switches to its own one-page A4 résumé
(`components/cv/PrintCv.tsx`), built for a recruiter's first read: key numbers first, every
role with its results in bold, and a link back to the website for the rest. That print is the
downloadable PDF; both layouts read the same content, so they never drift apart.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local preview at http://localhost:3000 |
| `npm run build` | Static export to `out/` plus every PDF; fails on invalid CV content |
| `npm run pdf` | Re-prints the PDFs only (runs automatically after every build) |
| `npm test` | Checks the export: pages, links, PDFs (one A4 page; two for a job CV), no leaks, real-device widths, navigation, app icon |
| `npm run check` | All of the above, in order |
| `npm run serve` | Serves `out/` at http://127.0.0.1:4173/cv/, like GitHub Pages |

First time: `npm ci && npx playwright install chromium`.

Pushing to `main` runs the same steps in GitHub Actions and deploys only if every test passes.

## Editing the CV

All facts live in **`lib/cv/content.ts`**; components never hold CV text.

- Write only what you could defend in an interview. Unconfirmed facts go to `docs/OPEN-QUESTIONS.md`.
- Every metric has a `source` and an `asOf` month. Re-check them before each job search.
- Nothing internal to an employer: no ticket keys, internal URLs, client ids or screenshots.
- Each recent role is a list of `projects`, shown as cards: title → need (`problem`) →
  what I did (`action`, `tech`) → result (`figure`, `result`). Leave `problem` or `figure`
  out until confirmed; the card adapts. Smaller contributions go in `also`, earlier roles
  get a one-line `summary`.
- The PDF is the short version: a project, app challenge or side project with
  `print: false` stays on the website only, and only the first five skill groups are
  printed. The AI workflow section is not printed; its ExpandNow project is.
- Numbers inside any
  printed text are set in bold automatically.
- The generic PDF must fit one A4 page, a job PDF two: `npm test` fails otherwise, so shorten
  text rather than shrinking it. Each role prints its first 2 printable projects; mark a
  project `print: false` to keep it on the website only.
- The app icon lives in `public/media/fmq-icon.png` (256 px, from the iOS app icon).

## A CV for a specific job offer

Each offer gets its own page and PDF, e.g. `/cv/hey-mondo/`. To add one, append a variant to
`jobVariants` in **`lib/cv/variants.ts`**:

```ts
{
  slug: "acme",                       // → /cv/acme/
  headline: "Senior Backend Engineer · PHP",
  pitch: "…",                         // optional; must only restate facts from content.ts
  roles: { expandnow: { order: [...], print: [...] } },      // reorder projects, choose what prints
  sectionIntros: { experience: "…", ai: "…", app: "…" },   // one line under each section title
  skillsFirst: ["Backend", "Quality"],
  fit: { company: "Acme", role: "…", offerUrl: "…", items: [{ theme, evidence }] },
  pdfFileName: "Stephane-El-Manouni-CV-Acme.pdf",
  indexable: false,                   // job pages are shared by link, not indexed
}
```

The `fit` list becomes a "Why my background fits" section after the intro, and prints on
page 1 right under the key numbers. Use the
offer's 4–6 main themes and answer each with existing evidence; no scores or match badges.
`sectionIntros` tie each section to the offer. On a job page the main button reads
"Download my CV for <company>".

Suggested workflow for a new offer: paste the offer into Claude Code and ask it to propose a
variant from `content.ts` only, then review every `evidence` line yourself.
