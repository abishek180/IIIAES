import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CalendarDays, CircleCheck, Clock, GraduationCap, Laptop, MessageCircle } from "lucide-react";
import { getAcademyOffering, getAcademyOfferings } from "@/lib/data";
import { academyContact, academySite } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { CourseCard, FaqList } from "@/components/cards";
import { ApplicationForm } from "@/components/forms";
import { ButtonLink, Container, Section } from "@/components/ui/primitives";

const b = academySite.basePath;

export function generateStaticParams() {
  return getAcademyOfferings().map(({ course }) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/mukkam/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const o = getAcademyOffering(slug);
  if (!o) return {};
  return {
    title: `${o.course.title} in Mukkam`,
    description: `${o.course.summary} Available at the IIIAES Mukkam Academy, Kozhikode.`,
    alternates: { canonical: `${b}/courses/${slug}` },
  };
}

export default async function AcademyCoursePage({ params }: PageProps<"/mukkam/courses/[slug]">) {
  const { slug } = await params;
  const found = getAcademyOffering(slug);
  if (!found) notFound();
  const { course, offering } = found;
  const modes = offering?.modes ?? course.modes;
  const others = getAcademyOfferings().filter((o) => o.course.slug !== slug).slice(0, 3);

  const facts = [
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: Laptop, label: "Modes at Mukkam", value: modes.join(" · ") },
    { icon: CalendarDays, label: "Next batch", value: offering?.nextBatch ?? "To be announced" },
    { icon: GraduationCap, label: "Schedule", value: offering?.schedule ?? "To be announced" },
  ];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "Courses", href: `${b}/courses` }, { label: course.title }]}
        eyebrow={course.level}
        title={course.title}
        description={course.summary}
        actions={
          <>
            <ButtonLink href="#apply">Apply for this course</ButtonLink>
            <a
              href={academyContact.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-5 text-sm font-semibold hover:bg-white/10"
            >
              <MessageCircle className="size-4" aria-hidden /> Ask on WhatsApp
            </a>
          </>
        }
        aside={
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 lg:grid-cols-1">
            {facts.map((f) => (
              <div key={f.label} className="flex gap-3 bg-ink-950 p-4 sm:p-5">
                <f.icon className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                <div>
                  <dt className="text-xs text-white/60">{f.label}</dt>
                  <dd className="mt-0.5 text-sm font-medium text-white">{f.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        }
      />

      <Section className="pt-10 sm:pt-14">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-12">
            <section aria-labelledby="ov">
              <h2 id="ov" className="font-display text-3xl font-medium tracking-tight text-ink-950">Overview</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-ink-600">
                {course.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
            <section aria-labelledby="el">
              <h2 id="el" className="font-display text-3xl font-medium tracking-tight text-ink-950">Eligibility</h2>
              <ul className="mt-4 space-y-2">
                {course.eligibility.map((e) => (
                  <li key={e} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink-950/[0.04]">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden />
                    <span className="text-ink-800">{e}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
          <div className="space-y-12">
            <section aria-labelledby="st">
              <h2 id="st" className="font-display text-3xl font-medium tracking-tight text-ink-950">What you’ll study</h2>
              <div className="mt-4 space-y-3">
                {course.structure.map((s) => (
                  <div key={s.title} className="rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04]">
                    <h3 className="font-display text-lg font-medium text-ink-950">{s.title}</h3>
                    <p className="mt-2 text-sm text-ink-600">{s.items.join(" · ")}</p>
                  </div>
                ))}
              </div>
              {course.practicalTraining && <p className="mt-4 rounded-2xl bg-gold-100 p-4 text-sm text-gold-700">{course.practicalTraining}</p>}
              <Link href={`/courses/${course.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-950 underline decoration-gold-500 underline-offset-4">
                Full programme details on the IIIAES website <ArrowUpRight className="size-4" aria-hidden />
              </Link>
            </section>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="max-w-4xl">
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink-950">Questions</h2>
          <div className="mt-6 [&>div]:bg-paper [&>div]:ring-0">
            <FaqList items={course.faqs} />
          </div>
        </Container>
      </Section>

      <Section id="apply">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <div>
            <h2 className="font-display text-4xl font-medium tracking-tight text-ink-950">Apply for {course.title}</h2>
            <p className="mt-4 text-ink-500">Takes about five minutes. You’ll get a reference number straight away.</p>
          </div>
          <ApplicationForm
            courses={getAcademyOfferings().map((o) => o.course.title)}
            defaultCourse={course.title}
            modes={modes}
            batches={[offering?.nextBatch ?? "Next available batch"]}
          />
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink-950">Other courses at Mukkam</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map(({ course: c, offering: o }) => (
              <CourseCard key={c.slug} course={{ ...c, modes: o?.modes ?? c.modes }} href={`${b}/courses/${c.slug}`} className="bg-paper" />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
