import type { Metadata } from "next";
import { getAcademyOfferings } from "@/lib/data";
import { academyContact, academySite } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { ContactBlock } from "@/components/sections";
import { ContactForm } from "@/components/forms";
import { ButtonLink, Container, Em, Section, SectionHeading } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "Contact & Directions",
  description: "Contact the IIIAES Mukkam Academy — phone, WhatsApp, email, address and directions to the Mukkam campus, Kozhikode.",
  alternates: { canonical: `${b}/contact` },
};

export default function AcademyContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "Contact" }]}
        eyebrow="Contact & directions"
        title={
          <>
            Visit us in <Em tone="dark">Mukkam</Em>
          </>
        }
        description="Call, WhatsApp or drop by during office hours. Campus visits can be arranged on request."
        actions={<ButtonLink href={academyContact.mapLink}>Open in Google Maps</ButtonLink>}
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <ContactBlock heading={false} info={academyContact} contactHref={`${b}/contact`} />
        </Container>
      </Section>
      <Section className="bg-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading
            eyebrow="Enquiry"
            title={<>Ask us <Em>anything</Em></>}
            description="Questions about courses, batches or campus visits — we usually reply within one working day."
            className="md:flex-col md:items-start"
          />
          <ContactForm courses={getAcademyOfferings().map((o) => o.course.title)} />
        </Container>
      </Section>
    </>
  );
}
