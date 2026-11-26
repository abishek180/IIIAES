import type { Metadata } from "next";
import { BookOpen, FlaskConical, Presentation, Users } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink, Container, Em, Section, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Research & Publications",
  description: "Research activities, workshops and academic publications at IIIAES.",
  alternates: { canonical: "/research" },
};

export default function ResearchPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Research & Publications" }]}
        eyebrow="Research"
        title={
          <>
            Inquiry that informs <Em tone="dark">practice</Em>
          </>
        }
        description="Case studies, student projects, workshops and academic work that strengthen the understanding of acupuncture science."
      />
      <Section>
        <Container>
          <SectionHeading eyebrow="Focus areas" title={<>Research <Em>activities</Em></>} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FlaskConical, title: "Clinical case studies", text: "Documented, supervised case work from clinical training." },
              { icon: BookOpen, title: "Student projects", text: "Final-year projects and dissertations on focused topics." },
              { icon: Presentation, title: "Workshops & seminars", text: "Sessions led by faculty and invited practitioners." },
              { icon: Users, title: "Collaborations", text: "Academic exchange with affiliated academies and partners." },
            ].map((a) => (
              <div key={a.title} className="rounded-3xl bg-white p-7 ring-1 ring-ink-950/[0.04]">
                <a.icon className="size-6 text-gold-600" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-10 font-display text-xl font-medium tracking-tight text-ink-950">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{a.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-white">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="Publications" title={<>Academic <Em>publications</Em></>} />
          <div className="mt-10 rounded-3xl border border-dashed border-ink-200 p-10 text-center sm:p-14">
            <p className="font-display text-xl font-medium text-ink-950">Publications will be listed here.</p>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
              Papers, proceedings and academic resources will appear here as they are published. Upcoming workshops are announced on the notice board.
            </p>
            <ButtonLink href="/notices" variant="dark" size="sm" className="mt-6">
              View notices
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </>
  );
}
