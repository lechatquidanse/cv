import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CvPage } from "@/components/cv/CvPage"
import { findVariant, resolveCv } from "@/lib/cv/resolve"
import { jobVariants } from "@/lib/cv/variants"
import { SITE_URL } from "@/lib/site"

interface Params {
  params: { slug: string }
}

export const dynamicParams = false

export function generateStaticParams(): Params["params"][] {
  return jobVariants.map((variant) => ({ slug: variant.slug }))
}

export function generateMetadata({ params }: Params): Metadata {
  const variant = findVariant(params.slug)
  if (!variant) return {}
  const company = variant.fit?.company
  return {
    title: company ? `CV for ${company}` : undefined,
    alternates: { canonical: `${SITE_URL}${variant.slug}/` },
    robots: variant.indexable ? undefined : { index: false, follow: false },
  }
}

export default function JobVariantPage({ params }: Params) {
  const variant = findVariant(params.slug)
  if (!variant || !variant.slug) notFound()
  return <CvPage cv={resolveCv(variant)} />
}
