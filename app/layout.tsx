import type React from "react"
import type { Metadata, Viewport } from "next"
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import { cv } from "@/lib/cv/content"
import { SITE_URL } from "@/lib/site"
import "./globals.css"

const display = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
  display: "swap",
})

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

const role = cv.profile.headline.split(" · ")[0]
const title = `${cv.profile.name} · ${role}`
const description = `${role} in ${cv.profile.location}: tested, readable PHP and Node.js backends for payments, e-signature and commerce, and Claude Code workflows that make AI output predictable.`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: `%s · ${cv.profile.name}` },
  description,
  authors: [{ name: cv.profile.name, url: SITE_URL }],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title,
    description,
    type: "profile",
    url: SITE_URL,
    siteName: cv.profile.name,
    locale: "en_GB",
    images: [{ url: `${SITE_URL}og.png`, width: 1200, height: 630, alt: title }],
  },
  twitter: { card: "summary_large_image", title, description, images: [`${SITE_URL}og.png`] },
}

export const viewport: Viewport = {
  themeColor: "#f7f6f2",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  )
}
