# Open questions

Facts kept out of the CV, or shown conservatively, until confirmed.

## Experience cards: what to fill in

Each recent role is shown as project cards: **title → the need → what I did → result**.
Edit the project in `lib/cv/content.ts` (field names in brackets). Leave a field out
rather than guess: a project without a need skips that card, one without a figure shows
its result in words. Answer only what you could defend in an interview.

| Role · project | Missing or to confirm | Field |
|---|---|---|
| ExpandNow · Unit tests | What you did beyond "introduced unit testing" (CI gate, test helpers, which modules first) | `action` |
| ExpandNow · PDF invoicing | Any figure for the speed-up from caching the header and footer (seconds per PDF, server load) | `figure`, `result` |
| Zeelo · Instalment billing | You wrote "focus on school first UK": should the card say UK schools came first, or lead with UK direct debit? | `problem`, `action` |
| Zeelo · Tech lead & mentoring | Any visible result: fewer review comments, faster onboarding, Kotlin or hexagonal services shipped | `figure`, `result` |
| Zeelo · Audit trail | Still on the website (not in the PDF). Keep it, merge it into Tech lead, or remove it? | `print` |
| Signaturit · E-signature | Which features you built yourself (signature flows, audit, API) | `action` |
| All projects | Are the tech chips right for each project? They only list tools named in the project | `tech` |
| WeTrack, IronWeb | Company websites, so their names link like the others (DigitasLBi links to digitas.com) | `companyUrl` |

## Still open

| Topic | Current state | To confirm |
|---|---|---|
| Heymondo motivation | Not shown | Why this role interests you, in your words |
| Deux Cinq year | Period reads "Freelance" | Year of the work |

## Decided (October 2026)

| Topic | Decision |
|---|---|
| ExpandNow invoicing | Need: deprecated, unmaintained, slow PDF library. Action: removed it (security risk), cached header and footer. Result: around 10,000 users every **month** (not week) |
| ExpandNow payments & logistics | Need: Sendcloud and Salesupply merchants could not join; Adyen on a deprecated version. Result in words only: no figure available |
| ExpandNow spec-to-test | Result: adopted by 4 developers and the PO; end-to-end tests behind each release; PO reviews from videos in Jira |
| Zeelo routing & maps | Removed from the CV |
| Zeelo tech lead | Need: no shared best practices. Weekly tech meeting; introduced Kotlin, DDD, hexagonal architecture; event sourcing brought to best practice; PR reviews |
| Signaturit scale | 50K signatures every week across Europe |
| Foot Master Quiz installs | 200K+ across App Store and Google Play (owner data) |
| Foot Master Quiz rating | 4.9★ (owner data) |
| Monthly users | Not shown |
| ExpandNow website | https://www.expandnow.com/ |
| AWS migration at ExpandNow | Not shown: no ownership |
| Zeelo instalment billing | Schools could not pay a full bus subscription up front and the company did not want a third-party pay-later provider; built recurring SEPA and UK direct-debit billing in-house on Stripe; 100+ schools signed in the first year |
| Earlier role titles | Kept as they are |
| Skills from older CVs | Not shown |
| "600+ database tests" | Dropped: "2,400+ tests" already makes the point |
| 2 Actors 1 Film | Not shown |
| Company one-liners | Confirmed |
| Knowledge sharing | Weekly tech meeting at Zeelo and Signaturit; at ExpandNow, mentoring on Claude Code setup |
| Spec-to-test origin | No QA team, no end-to-end tests, test cases hard for the product owner to validate; built with other teams' feedback |
