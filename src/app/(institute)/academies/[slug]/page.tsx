import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BadgeCheck, MapPin } from "lucide-react";
import { getAcademies, getAcademy, getCourse } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/layout/page-hero";
import { CourseCard } from "@/components/cards";
import { ButtonLink, Container, Photo, Section } from "@/components/ui/primitives";

export function generateStaticParams() {
  return getAcademies().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/academies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getAcademy(slug);
  if (!a) return {};
  return { title: `${a.name}, ${a.location}`, description: a.summary, alternates: { canonical: `/academies/${a.slug}` } };
}

export default async function AcademyPage({ params }: PageProps<"/academies/[slug]">) {
  const { slug } = await params;
  const academy = getAcademy(slug);
  if (!academy) notFound();
  const courses = academy.courses.map(getCourse).filter((c) => c !== undefined);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Academies", href: "/academies" }, { label: academy.location }]}
        eyebrow={academy.flagship ? "Flagship campus" : "Affiliated academy"}
        title={academy.name}
        description={academy.summary}
        actions={
          <>
            {academy.website && <ButtonLink href={academy.website}>Visit academy website</ButtonLink>}
            <ButtonLink href="/contact" variant={academy.website ? "outline-light" : "gold"}>
              Contact
            </ButtonLink>
          </>
        }
        aside={
          <dl className="space-y-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10">
            <div className="flex gap-3 bg-ink-950 p-5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
              <div>
                <dt className="text-xs text-white/60">Location</dt>
                <dd className="mt-0.5 text-sm font-medium">
                  {academy.location}, {academy.district}, {academy.state}
                </dd>
              </div>
            </div>
            <div className="flex gap-3 bg-ink-950 p-5">
              <BadgeCheck className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
              <div>
                <dt className="text-xs text-white/60">Affiliation status</dt>
                <dd className="mt-0.5 text-sm font-medium">
                  {academy.status}
                  {academy.validUntil && ` · valid until ${formatDate(academy.validUntil)}`}
                </dd>
              </div>
            </div>
          </dl>
        }
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
            <Photo src={academy.image ?? "/images/stock/kerala-building.jpg"} label="Campus" sizes="(min-width:1024px) 50vw, 100vw" className="col-span-2 aspect-[16/10] lg:row-span-2 lg:aspect-auto" />
            <Photo src="/images/stock/students-writing.jpg" label="Classroom" sizes="25vw" className="aspect-square" />
            <Photo src="/images/stock/acupuncture-treatment.jpg" label="Practical space" sizes="25vw" className="aspect-square" />
            <Photo src="/images/stock/library-shelves.jpg" label="Library" sizes="25vw" className="aspect-square" />
            <Photo src="/images/stock/onam-celebration.jpg" label="Events" sizes="25vw" className="aspect-square" />
          </div>
          <h2 className="mt-16 font-display text-3xl font-medium tracking-tight text-ink-950">Approved programmes</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
