import type { Metadata } from "next";
import { CircleCheck } from "lucide-react";
import { getAcademies, getCourses } from "@/lib/data";
import { PageHero } from "@/components/layout/page-hero";
import { AcademyCard, Steps } from "@/components/cards";
import { AffiliationForm } from "@/components/forms";
import { ButtonLink, Container, Em, Section, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Affiliation",
  description: "Affiliation with IIIAES — criteria, process and enquiry form for institutions.",
  alternates: { canonical: "/affiliation" },
};

/* PLACEHOLDER — official affiliation criteria to be supplied by the institution */
const criteria = [
  "A registered educational or healthcare institution",
  "Adequate classroom and practical training infrastructure",
  "Qualified faculty for the programmes applied for",
  "Administrative capacity for admissions and student records",
  "Commitment to IIIAES academic standards and examinations",
  "Compliance with applicable local regulations",
];

export default function AffiliationPage() {
  const academies = getAcademies();
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Affiliation" }]}
        eyebrow="For institutions"
        title={
          <>
            Partner with <Em tone="dark">IIIAES</Em>
          </>
        }
        description="Eligible institutions can apply to offer IIIAES programmes. Review the criteria, then send an enquiry — our team reviews every application individually."
        actions={
          <>
            <ButtonLink href="#apply">Apply for affiliation</ButtonLink>
            <ButtonLink href="/academies" variant="outline-light">
              Affiliated academies
            </ButtonLink>
          </>
        }
      />

      <Section>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="Criteria" title={<>Who can <Em>apply</Em></>} description="Institutions should meet the following minimum criteria. Final eligibility is confirmed during review." className="md:flex-col md:items-start" />
          <ul className="grid gap-2 sm:grid-cols-2">
            {criteria.map((c) => (
              <li key={c} className="flex gap-3 rounded-2xl bg-white p-5 text-sm text-ink-800 ring-1 ring-ink-950/[0.04]">
                <CircleCheck className="size-5 shrink-0 text-gold-600" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <div className="px-2 sm:px-3">
        <section className="rounded-[28px] bg-ink-950 py-16 text-white sm:py-24">
          <Container>
            <SectionHeading tone="dark" eyebrow="Process" title={<>From enquiry to <Em tone="dark">affiliation</Em></>} />
            <div className="mt-10">
              <Steps
                tone="dark"
                steps={[
                  { title: "Submit enquiry", text: "Share institution details and the programmes you are interested in." },
                  { title: "Document review", text: "The affiliation office reviews your documents and infrastructure." },
                  { title: "Inspection", text: "A visit may be arranged to assess facilities and faculty." },
                  { title: "Decision", text: "You will be informed of the outcome and next steps." },
                ]}
              />
            </div>
          </Container>
        </section>
      </div>

      <Section id="directory">
        <Container>
          <SectionHeading eyebrow="Directory" title={<>Affiliated <Em>academies</Em></>} action={<ButtonLink href="/academies" variant="outline-dark">Full directory</ButtonLink>} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {academies.map((a) => (
              <AcademyCard key={a.slug} academy={a} courseCount={a.courses.length} />
            ))}
          </div>
        </Container>
      </Section>

      <Section id="apply" className="bg-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Enquiry"
            title={<>Apply for <Em>affiliation</Em></>}
            description="Submitting this form starts a conversation — it is not an automatic approval. Supporting documents can be shared once the affiliation office contacts you."
            className="md:flex-col md:items-start"
          />
          <AffiliationForm courses={getCourses().map((c) => c.title)} />
        </Container>
      </Section>
    </>
  );
}
