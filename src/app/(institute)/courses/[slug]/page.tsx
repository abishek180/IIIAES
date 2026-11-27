import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Award, CircleCheck, Clock, Download, GraduationCap, Laptop, MapPin, MessageCircle } from "lucide-react";
import { getAcademy, getCourse, getCourses } from "@/lib/data";
import { site } from "@/content/site";
import { PageHero } from "@/components/layout/page-hero";
import { CourseCard, FaqList } from "@/components/cards";
import { ButtonLink, Chip, Container, Section } from "@/components/ui/primitives";

export function generateStaticParams() {
  return getCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.summary,
    alternates: { canonical: `/courses/${course.slug}` },
  };
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "eligibility", label: "Eligibility" },
  { id: "structure", label: "Structure" },
  { id: "training", label: "Training" },
  { id: "admission", label: "Admission" },
  { id: "faqs", label: "FAQs" },
];

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  const centres = course.centres.map(getAcademy).filter((a) => a !== undefined);
  const related = getCourses().filter((c) => c.slug !== course.slug).slice(0, 3);

  const facts = [
    { icon: GraduationCap, label: "Qualification", value: course.qualification },
    { icon: Clock, label: "Duration", value: course.duration },
    { icon: Laptop, label: "Learning mode", value: course.modes.join(" · ") },
    { icon: MapPin, label: "Available at", value: centres.map((c) => c.location).join(", ") || "To be announced" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.summary,
    provider: { "@type": "EducationalOrganization", name: site.name, sameAs: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        breadcrumbs={[{ label: "Courses", href: "/courses" }, { label: course.title }]}
        eyebrow={course.level}
        title={course.title}
        description={course.summary}
        actions={
          <>
            <ButtonLink href="/admissions">Apply now</ButtonLink>
            <ButtonLink href="/contact" variant="outline-light">
              Enquire
            </ButtonLink>
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

      {/* In-page navigation */}
      <div className="sticky top-[5.25rem] z-20 mt-4 px-2 sm:top-24 sm:px-3">
        <Container className="px-3 sm:px-8">
          <nav aria-label="Course sections" className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-white/85 p-1.5 ring-1 ring-ink-950/[0.05] backdrop-blur-xl sm:w-fit">
            {tabs.map((t) => (
              <a key={t.id} href={`#${t.id}`} className="h-9 shrink-0 rounded-full px-4 text-[0.8rem] leading-9 font-medium text-ink-700 hover:bg-paper hover:text-ink-950">
                {t.label}
              </a>
            ))}
          </nav>
        </Container>
      </div>

      <Section className="pt-10 sm:pt-14">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div className="min-w-0 space-y-16">
            <section id="overview" aria-labelledby="overview-h">
              <h2 id="overview-h" className="font-display text-3xl font-medium tracking-tight text-ink-950">Overview</h2>
              <div className="mt-5 space-y-4 text-[1.02rem] leading-relaxed text-ink-600">
                {course.overview.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>

            <section id="eligibility" aria-labelledby="eligibility-h">
              <h2 id="eligibility-h" className="font-display text-3xl font-medium tracking-tight text-ink-950">Eligibility</h2>
              <ul className="mt-5 space-y-3">
                {course.eligibility.map((e) => (
                  <li key={e} className="flex gap-3 rounded-2xl bg-white p-4 ring-1 ring-ink-950/[0.04]">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-gold-600" aria-hidden />
                    <span className="text-ink-800">{e}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section id="structure" aria-labelledby="structure-h">
              <h2 id="structure-h" className="font-display text-3xl font-medium tracking-tight text-ink-950">Academic structure</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {course.structure.map((s) => (
                  <div key={s.title} className="rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04]">
                    <h3 className="font-display text-lg font-medium text-ink-950">{s.title}</h3>
                    <ul className="mt-4 space-y-2 text-sm text-ink-600">
                      {s.items.map((i) => (
                        <li key={i} className="flex gap-2.5">
                          <span className="mt-2 size-1 shrink-0 rounded-full bg-gold-500" aria-hidden />
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link href="/downloads" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-ink-950 underline decoration-gold-500 underline-offset-4">
                <Download className="size-4" aria-hidden /> Download full syllabus
              </Link>
            </section>

            <section id="training" aria-labelledby="training-h">
              <h2 id="training-h" className="font-display text-3xl font-medium tracking-tight text-ink-950">Practical & clinical training</h2>
              <p className="mt-5 text-[1.02rem] leading-relaxed text-ink-600">
                {course.practicalTraining ?? "Practical components are integrated into the course modules."}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {course.modes.map((m) => (
                  <Chip key={m}>{m}</Chip>
                ))}
              </div>
            </section>

            <section id="admission" aria-labelledby="admission-h">
              <h2 id="admission-h" className="font-display text-3xl font-medium tracking-tight text-ink-950">Admission process</h2>
              <ol className="mt-5 space-y-3">
                {course.admissionSteps.map((s, i) => (
                  <li key={s} className="flex items-center gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink-950/[0.04]">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ink-950 font-display text-sm font-semibold text-gold-400">{i + 1}</span>
                    <span className="text-ink-800">{s}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-950/[0.04]">
                  <p className="text-xs text-ink-400">Fees</p>
                  <p className="mt-1 font-medium text-ink-950">{course.fees ?? "Published in the official prospectus"}</p>
                </div>
                <div className="rounded-2xl bg-white p-5 ring-1 ring-ink-950/[0.04]">
                  <p className="flex items-center gap-1.5 text-xs text-ink-400">
                    <Award className="size-3.5" aria-hidden /> Certification
                  </p>
                  <p className="mt-1 font-medium text-ink-950">{course.awardingBody}</p>
                </div>
              </div>
            </section>

            <section id="faqs" aria-labelledby="faqs-h">
              <h2 id="faqs-h" className="font-display text-3xl font-medium tracking-tight text-ink-950">Frequently asked questions</h2>
              <div className="mt-5">
                <FaqList items={course.faqs} />
              </div>
            </section>
          </div>

          {/* Sticky apply card */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-3xl bg-ink-950 p-6 text-white">
              <p className="font-display text-xl font-medium">Interested in this programme?</p>
              <p className="mt-2 text-sm text-white/60">Apply online or speak to the admissions office about eligibility and batches.</p>
              <div className="mt-6 grid gap-2">
                <ButtonLink href="/admissions" className="w-full justify-between">
                  Apply now
                </ButtonLink>
                <a
                  href={site.contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-sm font-semibold hover:bg-white/10"
                >
                  <MessageCircle className="size-4" aria-hidden /> Ask on WhatsApp
                </a>
              </div>
            </div>
            {centres.length > 0 && (
              <div className="mt-3 rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04]">
                <p className="text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">Offered at</p>
                <ul className="mt-3 space-y-2">
                  {centres.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/academies/${a.slug}`} className="flex items-center gap-2 text-sm font-medium text-ink-950 hover:underline hover:decoration-gold-500 hover:underline-offset-4">
                        <MapPin className="size-4 text-gold-600" aria-hidden />
                        {a.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <h2 className="font-display text-3xl font-medium tracking-tight text-ink-950">Other programmes</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c) => (
              <CourseCard key={c.slug} course={c} className="bg-paper" />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
