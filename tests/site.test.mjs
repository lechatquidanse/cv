// Checks the built site in out/ (run `npm run build && npm run pdf` first).
// Content rules (dates, ids, variant references) are enforced at build time by
// assertValidCv() in lib/cv/resolve.ts; these tests check what actually ships.
import assert from "node:assert/strict"
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { after, before, describe, test } from "node:test"
import { chromium, devices } from "playwright"
import { startServer } from "../scripts/serve.mjs"

const OUT = "out"
const pages = {
  generic: { path: "/cv/", file: "index.html", pdf: "Stephane-El-Manouni-CV.pdf" },
  heymondo: { path: "/cv/hey-mondo/", file: "hey-mondo/index.html", pdf: "hey-mondo/Stephane-El-Manouni-CV-Heymondo.pdf" },
}
const html = (name) => readFileSync(join(OUT, pages[name].file), "utf8")
const sectionIds = (name) => [...html(name).matchAll(/<section id="([^"]+)"/g)].map((m) => m[1])

function htmlFiles(dir = OUT) {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) return htmlFiles(path)
    return path.endsWith(".html") ? [path] : []
  })
}

describe("static pages", () => {
  test("the generic CV and each job variant are exported", () => {
    for (const page of Object.values(pages)) assert.ok(existsSync(join(OUT, page.file)), page.file)
  })

  test("sections appear in reading order, with one h1", () => {
    assert.deepEqual(sectionIds("generic"), ["top", "experience", "ai", "projects", "contact"])
    assert.deepEqual(sectionIds("heymondo"), ["top", "fit", "experience", "ai", "projects", "contact"])
    assert.equal(html("generic").match(/<h1/g)?.length, 1)
  })

  test("job variants are not indexed; the generic CV is", () => {
    assert.match(html("heymondo"), /<meta name="robots" content="noindex, nofollow"/)
    assert.doesNotMatch(html("generic"), /noindex/)
  })

  test("canonical URLs point at the deployed site", () => {
    assert.match(html("generic"), /<link rel="canonical" href="https:\/\/lechatquidanse\.github\.io\/cv\/"/)
    assert.match(html("heymondo"), /<link rel="canonical" href="https:\/\/lechatquidanse\.github\.io\/cv\/hey-mondo\/"/)
  })

  test("the Heymondo page frames each section for the offer; the generic page does not", () => {
    for (const line of ["integrating payment and logistics APIs", "AI applied to backend work", "A B2C product I run end to end"]) {
      assert.ok(html("heymondo").includes(line), line)
      assert.ok(!html("generic").includes(line), line)
    }
  })

  test("every internal link and asset resolves to a file in the export", () => {
    for (const file of htmlFiles()) {
      for (const [, ref] of readFileSync(file, "utf8").matchAll(/(?:href|src|poster)="(\/cv\/[^"#?]*)/g)) {
        const target = join(OUT, decodeURIComponent(ref.slice("/cv/".length)))
        const exists = existsSync(target) && (statSync(target).isFile() || existsSync(join(target, "index.html")))
        assert.ok(exists, `${file} links to missing ${ref}`)
      }
    }
  })

  test("no placeholders or employer-internal details ship", () => {
    const forbidden = [/\[YOUR/i, /TODO/, /lorem/i, /PRD-\d+/, /atlassian/i, /Zerogrey/i, /data-testid/, /@kooomo\.com/i]
    for (const file of htmlFiles()) {
      const text = readFileSync(file, "utf8")
      for (const pattern of forbidden) assert.doesNotMatch(text, pattern, `${file} contains ${pattern}`)
    }
  })
})

describe("PDFs", () => {
  for (const [name, page] of Object.entries(pages)) {
    test(`${name}: an A4 PDF of exactly 2 pages is linked and generated`, () => {
      assert.ok(html(name).includes(`href="/cv/${page.pdf}"`), "page links its PDF")
      const pdf = readFileSync(join(OUT, page.pdf), "latin1")
      assert.equal(pdf.match(/\/Type\s*\/Page[^s]/g)?.length, 2)
      const [, width, height] = pdf.match(/\/MediaBox\s*\[0 0 ([\d.]+) ([\d.]+)\]/) ?? []
      assert.ok(Math.abs(width - 595.28) < 1 && Math.abs(height - 841.89) < 1, `A4 media box, got ${width}×${height}`)
    })
  }
})

describe("in a browser", () => {
  let server
  let browser
  let origin

  before(async () => {
    server = await startServer()
    origin = `http://127.0.0.1:${server.address().port}`
    browser = await chromium.launch()
  })

  after(async () => {
    await browser?.close()
    server?.close()
  })

  async function open(path, options = { viewport: { width: 390, height: 844 } }, reducedMotion = "no-preference") {
    const context = await browser.newContext(options)
    const tab = await context.newPage()
    await tab.emulateMedia({ reducedMotion })
    await tab.goto(origin + path, { waitUntil: "networkidle" })
    return { tab, close: () => context.close() }
  }

  // Mobile browsers widen the layout viewport when anything sticks out of the page,
  // which shrinks everything; plain viewport sizes cannot catch that.
  for (const device of ["Pixel 7", "iPhone 13"]) {
    for (const [name, page] of Object.entries(pages)) {
      test(`${name} on ${device}: the page keeps the device width`, async () => {
        const { tab, close } = await open(page.path, { ...devices[device] })
        const { innerWidth, scrollWidth } = await tab.evaluate(() => ({
          innerWidth: window.innerWidth,
          scrollWidth: document.documentElement.scrollWidth,
        }))
        assert.equal(innerWidth, devices[device].viewport.width)
        assert.ok(scrollWidth <= innerWidth, `page is ${scrollWidth}px wide on a ${innerWidth}px screen`)
        await close()
      })
    }
  }

  test("no sideways overflow at tablet and desktop widths", async () => {
    for (const width of [768, 1440]) {
      const { tab, close } = await open(pages.heymondo.path, { viewport: { width, height: 900 } })
      const scrollWidth = await tab.evaluate(() => document.documentElement.scrollWidth)
      assert.ok(scrollWidth <= width, `${width}px: page is ${scrollWidth}px wide`)
      await close()
    }
  })

  test("the mouse wheel scrolls the page natively", async () => {
    const { tab, close } = await open(pages.generic.path, { viewport: { width: 1440, height: 900 } }, "reduce")
    await tab.mouse.move(700, 500)
    await tab.mouse.wheel(0, 300)
    await tab.waitForFunction(() => window.scrollY > 0)
    const scrolled = await tab.evaluate(() => window.scrollY)
    assert.ok(Math.abs(scrolled - 300) <= 2, `scrolled ${scrolled}px`)
    await close()
  })

  for (const width of [390, 1440]) {
    test(`${width}px: a section link lands below the sticky bar and becomes current`, async () => {
      const { tab, close } = await open(pages.generic.path, { viewport: { width, height: 844 } }, "reduce")
      await tab.click('nav[aria-label="Sections"] a[href="#ai"]')
      await tab.waitForFunction(() => document.querySelector('[aria-current="location"]')?.getAttribute("href") === "#ai")
      const { top, bar } = await tab.evaluate(() => ({
        top: document.getElementById("ai").getBoundingClientRect().top,
        bar: document.querySelector("header").getBoundingClientRect().height,
      }))
      assert.ok(Math.abs(top - (bar + 12)) <= 4, `#ai top at ${top}px with a ${bar}px bar`)
      await close()
    })
  }

  test("the end-to-end testing block links to the AI section", async () => {
    const { tab, close } = await open(pages.generic.path, undefined, "reduce")
    await tab.click('#experience a[href="#ai"]')
    await tab.waitForFunction(() => document.querySelector('[aria-current="location"]')?.getAttribute("href") === "#ai")
    await close()
  })

  test("the bottom of the page marks CONTACT as current", async () => {
    const { tab, close } = await open(pages.generic.path, undefined, "reduce")
    await tab.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
    await tab.waitForFunction(() => document.querySelector('[aria-current="location"]')?.getAttribute("href") === "#contact")
    await close()
  })

  test("the CV download stays visible while scrolling, on phone and desktop", async () => {
    for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 900 }]) {
      const { tab, close } = await open(pages.generic.path, { viewport }, "reduce")
      await tab.evaluate(() => document.getElementById("projects").scrollIntoView())
      assert.ok(await tab.locator("header a", { hasText: "CV" }).isVisible(), `${viewport.width}px`)
      const top = await tab.evaluate(() => document.querySelector("header").getBoundingClientRect().top)
      assert.equal(top, 0)
      await close()
    }
  })

  test("the skip link is the first tab stop and moves focus into the main content", async () => {
    const { tab, close } = await open(pages.generic.path)
    await tab.keyboard.press("Tab")
    assert.equal(await tab.evaluate(() => document.activeElement?.textContent), "Skip to content")
    await tab.keyboard.press("Enter")
    await tab.waitForFunction(() => document.activeElement?.id === "main")
    await close()
  })

  test("the app video is muted, inline, pausable and plays only while on screen", async () => {
    const { tab, close } = await open(pages.generic.path)
    const video = tab.locator("#projects video")
    assert.deepEqual(await video.evaluate((v) => [v.muted, v.playsInline, v.paused]), [true, true, true])
    await tab.evaluate(() => document.querySelector("#projects video").scrollIntoView({ block: "center" }))
    await tab.waitForFunction(() => !document.querySelector("#projects video").paused)
    await tab.getByRole("button", { name: "Pause video" }).click()
    await tab.waitForFunction(() => document.querySelector("#projects video").paused)
    await close()
  })

  test("with reduced motion the video never autoplays and the AI ticks are static", async () => {
    const { tab, close } = await open(pages.generic.path, undefined, "reduce")
    await tab.evaluate(() => document.querySelector("#projects video").scrollIntoView({ block: "center" }))
    await tab.waitForTimeout(500)
    assert.equal(await tab.evaluate(() => document.querySelector("#projects video").paused), true)
    assert.equal(await tab.locator("#ai [data-armed]").count(), 0)
    const animation = await tab.evaluate(() => getComputedStyle(document.querySelector("#ai .check")).animationName)
    assert.equal(animation, "none")
    await close()
  })

  test("the AI ticks play once when the section comes into view", async () => {
    const { tab, close } = await open(pages.generic.path)
    assert.equal(await tab.locator("#ai [data-armed]").count(), 1)
    await tab.evaluate(() => document.getElementById("ai").scrollIntoView())
    await tab.waitForSelector("#ai [data-in-view]")
    const iterations = await tab.evaluate(() => getComputedStyle(document.querySelector("#ai .check")).animationIterationCount)
    assert.equal(iterations, "1")
    await close()
  })
})
