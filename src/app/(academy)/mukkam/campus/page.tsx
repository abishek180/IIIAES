import type { Metadata } from "next";
import { academyContact, academySite, facilities } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink, Container, Em, Photo, Section } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "Campus & Facilities",
  description: "Classrooms, practical training rooms, clinical training and library at the IIIAES Mukkam Academy campus.",
  alternates: { canonical: `${b}/campus` },
};

export default function CampusPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "Campus & Facilities" }]}
        eyebrow="Campus & facilities"
        title={
          <>
            Built for <Em tone="dark">hands-on</Em> learning
          </>
        }
        description="A compact campus where theory classrooms and practical training spaces sit side by side."
        actions={
          <>
            <ButtonLink href={`${b}/contact`}>Book a campus visit</ButtonLink>
            <ButtonLink href={academyContact.mapLink} variant="outline-light">
              Get directions
            </ButtonLink>
          </>
        }
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <ul className="grid gap-3 md:grid-cols-2">
            {facilities.map((f, i) => (
              <li key={f.title} className="group overflow-hidden rounded-3xl bg-white p-2 ring-1 ring-ink-950/[0.04]">
                <Photo src={f.img} label={f.title} className="aspect-[16/10] rounded-[18px]" sizes="(min-width:768px) 50vw, 100vw" />
                <div className="flex gap-5 p-5 sm:p-6">
                  <span className="font-display text-sm font-semibold text-gold-700">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h2 className="font-display text-2xl font-medium tracking-tight text-ink-950">{f.title}</h2>
                    <p className="mt-2 text-ink-500">{f.text}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center text-xs text-ink-400">Photos are representative. Campus photography will be updated.</p>
        </Container>
      </Section>
    </>
  );
}
