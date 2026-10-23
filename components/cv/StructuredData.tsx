import type { ResolvedCv } from "@/lib/cv/resolve"
import { SITE_URL } from "@/lib/site"

/**
 * schema.org ProfilePage + Person, so search engines can show the CV for people
 * searching "senior backend engineer Barcelona" and link it to GitHub and LinkedIn.
 * Built from the same content as the page; nothing here is hand-written.
 */
export function StructuredData({ cv }: { cv: ResolvedCv }) {
  const { profile } = cv
  const [city, country] = profile.location.split(", ")
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: SITE_URL,
    dateModified: cv.reviewedAt,
    mainEntity: {
      "@type": "Person",
      name: profile.name,
      jobTitle: profile.headline.split(" · ")[0],
      description: profile.pitch,
      url: SITE_URL,
      image: `${SITE_URL}og.png`,
      address: { "@type": "PostalAddress", addressLocality: city, addressCountry: country },
      sameAs: [profile.github.href, profile.linkedin.href, "https://lechatquidanse.github.io/"],
      knowsAbout: cv.skills.flatMap((group) => group.items),
      knowsLanguage: cv.languages.map((language) => language.name),
      alumniOf: cv.education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
    },
  }
  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps any text from closing the script element early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  )
}
