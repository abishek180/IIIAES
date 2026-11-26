import type { Metadata } from "next";
import { getCourses } from "@/lib/data";
import { site } from "@/content/site";
import { PageHero } from "@/components/layout/page-hero";
import { ContactBlock } from "@/components/sections";
import { ContactForm } from "@/components/forms";
import { Container, Em, Section, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact the ${site.name} — address, phone, WhatsApp, email and location map.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Contact" }]}
        eyebrow="Contact"
        title={
          <>
            Let’s <Em tone="dark">talk.</Em>
          </>
        }
        description="Call, WhatsApp, email or visit us. For admission questions, the enquiry form is the quickest way to reach the right person."
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <ContactBlock heading={false} />
        </Container>
      </Section>
      <Section className="bg-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading eyebrow="Enquiry" title={<>Send us a <Em>message</Em></>} description="We usually respond within one working day." className="md:flex-col md:items-start" />
          <ContactForm courses={getCourses().map((c) => c.title)} />
        </Container>
      </Section>
    </>
  );
}
