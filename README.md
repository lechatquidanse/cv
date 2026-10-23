# Stéphane El Manouni · CV

Live at **https://lechatquidanse.github.io/cv/**. A static Next.js export on GitHub Pages.

On screen the CV is one vertical page with a sticky bar (section links that follow the
reader, and the PDF). In print the page switches to its own 2-page A4 résumé
(`components/cv/PrintCv.tsx`), built for a recruiter's first read: key numbers first, every
role with its results in bold, and a link back to the website for the rest. That print is the
downloadable PDF; both layouts read the same content, so they never drift apart.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Local preview at http://localhost:3000 |
| `npm run build` | Static export to `out/`; fails on invalid CV content |
| `npm run pdf` | Prints every variant to an A4 PDF inside `out/` (needs a build first) |
| `npm test` | Checks the export: pages, links, PDFs (2 A4 pages), no leaks, real-device widths, navigation, video |
| `npm run check` | All of the above, in order |
| `npm run serve` | Serves `out/` at http://127.0.0.1:4173/cv/, like GitHub Pages |

First time: `npm ci && npx playwright install chromium`.

Pushing to `main` runs the same steps in GitHub Actions and deploys only if every test passes.

## Editing the CV

All facts live in **`lib/cv/content.ts`**; components never hold CV text.

- Write only what you could defend in an interview. Unconfirmed facts go to `docs/OPEN-QUESTIONS.md`.
- Every metric has a `source` and an `asOf` month. Re-check them before each job search.
- Nothing internal to an employer: no ticket keys, internal URLs, client ids or screenshots.
- An achievement with `featured: true` shows on screen; every achievement is printed.
- `profile.keyNumbers` is the row of five numbers at the top of the PDF; numbers inside any
  printed text are set in bold automatically.
- Both PDFs must stay at exactly 2 A4 pages: `npm test` fails otherwise, so shorten text
  rather than adding a third page.
- The app video lives in `public/media/` (MP4 for Safari, WebM for other browsers, plus a poster).

## A CV for a specific job offer

Each offer gets its own page and PDF, e.g. `/cv/hey-mondo/`. To add one, append a variant to
`jobVariants` in **`lib/cv/variants.ts`**:

```ts
{
  slug: "acme",                       // → /cv/acme/
  headline: "Senior Backend Engineer · PHP",
  pitch: "…",                         // optional; must only restate facts from content.ts
  roles: { expandnow: { order: [...], featured: [...] } },   // reorder / re-feature bullets
  sectionIntros: { experience: "…", ai: "…", app: "…" },   // one line under each section title
  skillsFirst: ["Backend", "Quality"],
  fit: { company: "Acme", role: "…", offerUrl: "…", items: [{ requirement, evidence, match }] },
  pdfFileName: "Stephane-El-Manouni-CV-Acme.pdf",
  indexable: false,                   // job pages are shared by link, not indexed
}
```

The `fit` list becomes a "Your offer, my evidence" section after the intro, and prints on
page 1 right under the key numbers (the generic PDF shows the AI workflow there instead). `sectionIntros` tie each section to the offer. Mark a requirement `partial` when the evidence is adjacent rather than direct.
Never add a requirement you cannot back up; leave it out instead.

Suggested workflow for a new offer: paste the offer into Claude Code and ask it to propose a
variant from `content.ts` only, then review every `evidence` line yourself.
