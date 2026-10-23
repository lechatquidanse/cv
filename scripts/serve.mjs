// Serves the static export in out/ under the /cv base path, like GitHub Pages does.
// Usage: node scripts/serve.mjs [port]
import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { extname, join, normalize } from "node:path"

const BASE = "/cv"
const ROOT = join(process.cwd(), "out")
const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain",
  ".svg": "image/svg+xml",
}

export function startServer(port = 0) {
  const server = createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://localhost")
    if (!url.pathname.startsWith(BASE)) {
      res.writeHead(404).end()
      return
    }
    let file = normalize(join(ROOT, decodeURIComponent(url.pathname.slice(BASE.length))))
    if (!file.startsWith(ROOT)) {
      res.writeHead(403).end()
      return
    }
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html")
    if (!existsSync(file)) {
      res.writeHead(404).end()
      return
    }
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" })
    createReadStream(file).pipe(res)
  })
  return new Promise((resolve) => server.listen(port, "127.0.0.1", () => resolve(server)))
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const server = await startServer(Number(process.argv[2] ?? 4173))
  console.log(`Serving out/ at http://127.0.0.1:${server.address().port}${BASE}/`)
}
