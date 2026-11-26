import type { Metadata } from "next";
import { BookOpen, HeartPulse, Stethoscope } from "lucide-react";
import { getCalendar, getCourses } from "@/lib/data";
import type { CourseLevel } from "@/lib/types";
import { PageHero } from "@/components/layout/page-hero";
import { CalendarList, CourseCard } from "@/components/cards";
import { ButtonLink, Container, Em, Section, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Academics",
  description: "Academic structure, departments, teaching approach and academic calendar at IIIAES.",
  alternates: { canonical: "/academics" },
};

const levels: { level: CourseLevel; text: string }[] = [
  { level: "Undergraduate", text: "Degree-level study combining in-depth theory with extensive practical and clinical training." },
  { level: "Postgraduate Diploma", text: "Advanced clinical study for graduates and practising professionals." },
  { level: "Diploma", text: "Practical, career-focused programmes with structured hands-on training." },
  { level: "Certificate", text: "Short introductory courses open to beginners and wellness professionals." },
];

/* PLACEHOLDER — department names to be confirmed by the institution */
const departments = [
  { name: "Department of Acupuncture Science", text: "Principles, methods and techniques of acupuncture." },
  { name: "Department of Basic Medical Sciences", text: "Anatomy, physiology, pathology and allied sciences." },
  { name: "Department of Clinical Studies", text: "Supervised clinical practice, case management and internships." },
];

export default function AcademicsPage() {
  const courses = getCourses();
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Academics" }]}
        eyebrow="Academics"
        title={
          <>
            A clear structure for <Em tone="dark">serious study</Em>
          </>
        }
        description="Programmes at every level share one academic approach: strong theory, supervised practice and clinical application."
        actions={<ButtonLink href="/courses">Browse courses</ButtonLink>}
      />

      <Section>
        <Container>
          <SectionHeading eyebrow="Academic approach" title={<>Three stages of <Em>learning</Em></>} />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {[
              { icon: BookOpen, n: "01", title: "Theoretical education", text: "Structured modules covering acupuncture principles, meridian theory, anatomy, physiology and diagnostic methods." },
              { icon: HeartPulse, n: "02", title: "Practical learning", text: "Point location, needling and other techniques practised under faculty supervision in dedicated practical spaces." },
              { icon: Stethoscope, n: "03", title: "Clinical training", text: "Supervised clinical exposure and case work, integrated into programmes where applicable." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl bg-white p-7 ring-1 ring-ink-950/[0.04] sm:p-8">
                <div className="flex items-center justify-between">
                  <s.icon className="size-6 text-gold-600" strokeWidth={1.6} aria-hidden />
                  <span className="font-display text-sm font-semibold text-ink-300">{s.n}</span>
                </div>
                <h3 className="mt-10 font-display text-2xl font-medium tracking-tight text-ink-950">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{s.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading eyebrow="Academic structure" title={<>Programme <Em>levels</Em></>} />
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {levels.map((l) => {
              const count = courses.filter((c) => c.level === l.level).length;
              return (
                <li key={l.level} className="grid gap-2 py-6 sm:grid-cols-[16rem_1fr_auto] sm:items-center sm:gap-8">
                  <h3 className="font-display text-xl font-medium tracking-tight text-ink-950">{l.level}</h3>
                  <p className="text-ink-600">{l.text}</p>
                  <span className="text-sm text-ink-400">
                    {count} programme{count === 1 ? "" : "s"}
                  </span>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Departments" title={<>Academic <Em>departments</Em></>} />
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {departments.map((d) => (
              <div key={d.name} className="rounded-3xl bg-ink-950 p-7 text-white sm:p-8">
                <h3 className="font-display text-xl font-medium tracking-tight">{d.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">{d.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="calendar" className="bg-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading
            eyebrow="Academic calendar"
            title={<>Upcoming <Em>dates</Em></>}
            description="Examinations, admission deadlines and academic events. The full calendar is available in Downloads."
            action={<ButtonLink href="/downloads" variant="outline-dark">Download calendar</ButtonLink>}
            className="md:flex-col md:items-start"
          />
          <div className="rounded-3xl bg-paper p-3">
            <CalendarList events={getCalendar()} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Programmes" title={<>Featured <Em>courses</Em></>} action={<ButtonLink href="/courses" variant="dark">All courses</ButtonLink>} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courses.slice(0, 3).map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
