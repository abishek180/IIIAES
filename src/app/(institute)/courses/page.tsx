import type { Metadata } from "next";
import Link from "next/link";
import { getCourses } from "@/lib/data";
import type { CourseLevel } from "@/lib/types";
import { PageHero } from "@/components/layout/page-hero";
import { CourseCard } from "@/components/cards";
import { ButtonLink, Container, Em, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Courses & Programmes",
  description: "Explore IIIAES programmes in acupuncture science — eligibility, duration and learning modes.",
  alternates: { canonical: "/courses" },
};

const levelOrder: CourseLevel[] = ["Undergraduate", "Postgraduate Diploma", "Diploma", "Certificate"];

export default function CoursesPage() {
  const courses = getCourses();
  const groups = levelOrder.map((level) => ({ level, items: courses.filter((c) => c.level === level) })).filter((g) => g.items.length);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Courses & Programmes" }]}
        eyebrow="Course catalogue"
        title={
          <>
            Courses & <Em tone="dark">programmes</Em>
          </>
        }
        description="Every programme lists its eligibility, duration and learning mode up front, so you can find the right fit quickly."
        actions={
          <>
            <ButtonLink href="/admissions">How to apply</ButtonLink>
            <ButtonLink href="/downloads" variant="outline-light">
              Download prospectus
            </ButtonLink>
          </>
        }
      />

      {/* Level jump links */}
      <Container className="sticky top-[5.25rem] z-20 mt-4 sm:top-24">
        <nav aria-label="Programme levels" className="no-scrollbar flex gap-2 overflow-x-auto rounded-full bg-white/85 p-1.5 ring-1 ring-ink-950/[0.05] backdrop-blur-xl sm:w-fit">
          {groups.map((g) => (
            <a key={g.level} href={`#${g.level.toLowerCase().replace(/\s+/g, "-")}`} className="h-9 shrink-0 rounded-full px-4 text-[0.8rem] leading-9 font-medium text-ink-700 hover:bg-paper hover:text-ink-950">
              {g.level}
              <span className="ml-1.5 text-ink-400">{g.items.length}</span>
            </a>
          ))}
        </nav>
      </Container>

      <Section className="pt-10 sm:pt-12">
        <Container className="space-y-16">
          {groups.map((g) => (
            <div key={g.level} id={g.level.toLowerCase().replace(/\s+/g, "-")}>
              <h2 className="font-display text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">{g.level}</h2>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {g.items.map((c) => (
                  <CourseCard key={c.slug} course={c} />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>

      <Container className="pb-16">
        <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-ink-950/[0.04]">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <caption className="p-6 pb-2 text-left font-display text-xl font-medium text-ink-950">Compare programmes</caption>
            <thead className="text-xs text-ink-400">
              <tr className="border-b border-line">
                <th scope="col" className="px-6 py-3 font-medium">Programme</th>
                <th scope="col" className="px-6 py-3 font-medium">Duration</th>
                <th scope="col" className="px-6 py-3 font-medium">Mode</th>
                <th scope="col" className="px-6 py-3 font-medium">Minimum eligibility</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {courses.map((c) => (
                <tr key={c.slug}>
                  <th scope="row" className="px-6 py-4 font-medium text-ink-950">
                    <Link href={`/courses/${c.slug}`} className="hover:underline hover:decoration-gold-500 hover:underline-offset-4">
                      {c.title}
                    </Link>
                  </th>
                  <td className="px-6 py-4 text-ink-600">{c.duration}</td>
                  <td className="px-6 py-4 text-ink-600">{c.modes.join(", ")}</td>
                  <td className="px-6 py-4 text-ink-600">{c.eligibility[0]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </>
  );
}
