import { CvPage } from "@/components/cv/CvPage"
import { assertValidCv, resolveCv } from "@/lib/cv/resolve"

assertValidCv()

export default function HomePage() {
  return <CvPage cv={resolveCv()} />
}
