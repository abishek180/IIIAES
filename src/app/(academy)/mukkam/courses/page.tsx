import type { Metadata } from "next";
import Link from "next/link";
import { getAcademyOfferings } from "@/lib/data";
import { academySite } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { CourseCard } from "@/components/cards";
import { ButtonLink, Container, Em, Section } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "Courses",
  description: "Acupuncture courses available at the IIIAES Mukkam Academy — duration, eligibility, learning modes and next batch.",
  alternates: { canonical: `${b}/courses` },
};

export default function AcademyCoursesPage() {
  const offerings = getAcademyOfferings();
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "Courses" }]}
        eyebrow="Courses at Mukkam"
        title={
          <>
            Choose your <Em tone="dark">programme</Em>
          </>
        }
        description="All programmes follow the IIIAES curriculum. Learning modes and batches below are specific to the Mukkam campus."
        actions={
          <>
            <ButtonLink href={`${b}/admissions#apply`}>Apply now</ButtonLink>
            <ButtonLink href={`${b}/learning-modes`} variant="outline-light">
              Learning modes
            </ButtonLink>
          </>
        }
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {offerings.map(({ course, offering }) => (
              <CourseCard
                key={course.slug}
                course={{ ...course, modes: offering?.modes ?? course.modes }}
                href={`${b}/courses/${course.slug}`}
                extra={offering ? `Next: ${offering.nextBatch}` : undefined}
              />
            ))}
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl bg-white ring-1 ring-ink-950/[0.04]">
            <table className="w-full min-w-[44rem] text-left text-sm">
              <caption className="p-6 pb-2 text-left font-display text-xl font-medium text-ink-950">Compare at a glance</caption>
              <thead className="text-xs text-ink-400">
                <tr className="border-b border-line">
                  <th scope="col" className="px-6 py-3 font-medium">Programme</th>
                  <th scope="col" className="px-6 py-3 font-medium">Duration</th>
                  <th scope="col" className="px-6 py-3 font-medium">Modes at Mukkam</th>
                  <th scope="col" className="px-6 py-3 font-medium">Schedule</th>
                  <th scope="col" className="px-6 py-3 font-medium">Next batch</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {offerings.map(({ course, offering }) => (
                  <tr key={course.slug}>
                    <th scope="row" className="px-6 py-4 font-medium text-ink-950">
                      <Link href={`${b}/courses/${course.slug}`} className="hover:underline hover:decoration-gold-500 hover:underline-offset-4">
                        {course.title}
                      </Link>
                    </th>
                    <td className="px-6 py-4 text-ink-600">{course.duration}</td>
                    <td className="px-6 py-4 text-ink-600">{(offering?.modes ?? course.modes).join(", ")}</td>
                    <td className="px-6 py-4 text-ink-600">{offering?.schedule ?? "—"}</td>
                    <td className="px-6 py-4 font-medium text-gold-700">{offering?.nextBatch ?? "To be announced"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>
    </>
  );
}
