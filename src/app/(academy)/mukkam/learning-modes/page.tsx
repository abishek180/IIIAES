import type { Metadata } from "next";
import Link from "next/link";
import { Check, Laptop, MonitorPlay, Minus, School } from "lucide-react";
import { getAcademyOfferings } from "@/lib/data";
import { academySite, learningModes } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink, Container, Em, Section, SectionHeading } from "@/components/ui/primitives";

const b = academySite.basePath;
const modeIcon = { Offline: School, Online: MonitorPlay, Hybrid: Laptop } as const;

export const metadata: Metadata = {
  title: "Learning Modes",
  description: "Offline, online and hybrid learning at the IIIAES Mukkam Academy — compare which mode suits you.",
  alternates: { canonical: `${b}/learning-modes` },
};

export default function LearningModesPage() {
  const offerings = getAcademyOfferings();
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "Learning Modes" }]}
        eyebrow="Learning modes"
        title={
          <>
            Offline, online or <Em tone="dark">hybrid</Em>
          </>
        }
        description="Choose how you learn. Practical training always happens in person, under supervision."
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <div className="grid gap-3 lg:grid-cols-3">
            {learningModes.map((m) => {
              const Icon = modeIcon[m.mode];
              return (
                <div key={m.mode} className="rounded-3xl bg-white p-7 ring-1 ring-ink-950/[0.04] sm:p-8">
                  <span className="grid size-12 place-items-center rounded-2xl bg-ink-950 text-gold-400" aria-hidden>
                    <Icon className="size-5" />
                  </span>
                  <h2 className="mt-8 font-display text-2xl font-medium tracking-tight text-ink-950">{m.title}</h2>
                  <p className="mt-2 text-ink-500">{m.summary}</p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5 text-sm text-ink-700">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <Check className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading eyebrow="Availability" title={<>Which courses offer <Em>which mode</Em></>} />
          <div className="mt-10 overflow-x-auto rounded-3xl bg-paper">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="text-xs text-ink-400">
                <tr className="border-b border-line">
                  <th scope="col" className="px-6 py-4 font-medium">Course</th>
                  {learningModes.map((m) => (
                    <th key={m.mode} scope="col" className="px-6 py-4 text-center font-medium">
                      {m.mode}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {offerings.map(({ course, offering }) => {
                  const modes = offering?.modes ?? course.modes;
                  return (
                    <tr key={course.slug}>
                      <th scope="row" className="px-6 py-4 font-medium text-ink-950">
                        <Link href={`${b}/courses/${course.slug}`} className="hover:underline hover:decoration-gold-500 hover:underline-offset-4">
                          {course.title}
                        </Link>
                      </th>
                      {learningModes.map((m) => (
                        <td key={m.mode} className="px-6 py-4 text-center">
                          {modes.includes(m.mode) ? (
                            <Check className="mx-auto size-5 text-gold-600" aria-label="Available" />
                          ) : (
                            <Minus className="mx-auto size-4 text-ink-300" aria-label="Not available" />
                          )}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={`${b}/admissions#apply`}>Apply now</ButtonLink>
            <ButtonLink href={`${b}/faqs`} variant="outline-dark">
              Read FAQs
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
