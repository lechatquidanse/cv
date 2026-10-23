// Prints every CV variant from the static export to an A4 PDF next to its page:
//   out/Stephane-El-Manouni-CV.pdf, out/hey-mondo/Stephane-El-Manouni-CV-Heymondo.pdf, ...
// Run after `next build`. The PDF is the page's own print stylesheet, so web and PDF never drift.
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { chromium } from "playwright"
import { startServer } from "./serve.mjs"

// Read the variant list from the built pages rather than duplicating it here:
// each page links its own PDF.
function pdfTargets() {
  const pages = ["index.html", ...listVariantPages()]
  return pages.map((page) => {
    const html = readFileSync(join("out", page), "utf8")
    const match = html.match(/href="\/cv(\/[^"]+\.pdf)"/)
    if (!match) throw new Error(`No PDF link found in out/${page}`)
    return { page: `/cv/${page.replace(/index\.html$/, "")}`, pdf: join("out", match[1]) }
  })
}

// Job variants are not linked from the generic page, so read them from the build manifest.
function listVariantPages() {
  const manifest = JSON.parse(readFileSync(join(".next", "prerender-manifest.json"), "utf8"))
  return Object.keys(manifest.routes)
    .filter((route) => route !== "/" && !route.startsWith("/_") && !route.includes("."))
    .map((route) => `${route.slice(1)}/index.html`)
}

const server = await startServer()
const origin = `http://127.0.0.1:${server.address().port}`
const browser = await chromium.launch()

try {
  for (const target of pdfTargets()) {
    const page = await browser.newPage()
    await page.goto(origin + target.page, { waitUntil: "networkidle" })
    await page.evaluate(() => document.fonts.ready)
    await page.pdf({ path: target.pdf, format: "A4", printBackground: true, preferCSSPageSize: true })
    console.log(`${target.page} -> ${target.pdf}`)
    await page.close()
  }
} finally {
  await browser.close()
  server.close()
}
