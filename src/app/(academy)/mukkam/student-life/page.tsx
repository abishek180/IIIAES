import type { Metadata } from "next";
import { getCalendar } from "@/lib/data";
import { academySite, activities } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { CalendarList } from "@/components/cards";
import { Container, Em, Photo, Section, SectionHeading } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "Student Life",
  description: "Workshops, practical sessions and academic events at the IIIAES Mukkam Academy.",
  alternates: { canonical: `${b}/student-life` },
};

export default function AcademyStudentLifePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "Student Life" }]}
        eyebrow="Student life"
        title={
          <>
            Learning that happens <Em tone="dark">together</Em>
          </>
        }
        description="Workshops, practical sessions and events that make learning practical and personal."
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <div className="grid gap-3 md:grid-cols-3">
            {activities.map((a) => (
              <div key={a.title} className="rounded-3xl bg-white p-2 ring-1 ring-ink-950/[0.04]">
                <Photo src={a.img} label={a.title} className="aspect-[4/3] rounded-[18px]" />
                <div className="p-5">
                  <h2 className="font-display text-xl font-medium tracking-tight text-ink-950">{a.title}</h2>
                  <p className="mt-1.5 text-sm text-ink-500">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Calendar" title={<>Upcoming <Em>events</Em></>} description="Workshops, examinations and academic dates." className="md:flex-col md:items-start" />
          <div className="rounded-3xl bg-paper p-3">
            <CalendarList events={getCalendar()} />
          </div>
        </Container>
      </Section>
    </>
  );
}
