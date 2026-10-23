import { CvPage } from "@/components/cv/CvPage"
import { StructuredData } from "@/components/cv/StructuredData"
import { assertValidCv, resolveCv } from "@/lib/cv/resolve"

assertValidCv()

export default function HomePage() {
  const cv = resolveCv()
  return (
    <>
      <StructuredData cv={cv} />
      <CvPage cv={cv} />
    </>
  )
}
