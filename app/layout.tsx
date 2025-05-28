import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Stéphane EL MANOUNI - Full-Stack Developer",
  description: "Professional CV of Stéphane EL MANOUNI, Full-Stack Developer & Open Source Contributor",
  keywords: "developer, full-stack, symfony, flutter, react, node.js, python, portfolio, cv, resume",
  authors: [{ name: "Stéphane EL MANOUNI" }],
  openGraph: {
    title: "Stéphane EL MANOUNI - Full-Stack Developer",
    description: "Professional CV of Stéphane EL MANOUNI, Full-Stack Developer & Open Source Contributor",
    type: "website",
    url: "https://lechatquidanse.github.io",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
