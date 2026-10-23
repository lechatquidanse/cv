/** @type {import('next').NextConfig} */

// GitHub Pages serves this repository at https://lechatquidanse.github.io/cv/
const basePath = process.env.NODE_ENV === 'production' ? '/cv' : ''

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: basePath,
  env: {
    // Plain <a> links to static files (the generated PDFs) need the prefix explicitly.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
