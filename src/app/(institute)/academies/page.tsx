import type { Metadata } from "next";
import { getAcademies } from "@/lib/data";
import { PageHero } from "@/components/layout/page-hero";
import { AcademyCard } from "@/components/cards";
import { AffiliationCta } from "@/components/sections";
import { Container, Em, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Affiliated Academies",
  description: "Directory of IIIAES campuses and affiliated academies.",
  alternates: { canonical: "/academies" },
};

export default function AcademiesPage() {
  const academies = getAcademies();
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Affiliation", href: "/affiliation" }, { label: "Academies" }]}
        eyebrow="Directory"
        title={
          <>
            Affiliated <Em tone="dark">academies</Em>
          </>
        }
        description="Campuses and approved centres delivering IIIAES programmes. Only academies with verified affiliation are listed as active."
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <p className="text-sm text-ink-500">{academies.length} academies</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {academies.map((a) => (
              <AcademyCard key={a.slug} academy={a} courseCount={a.courses.length} />
            ))}
          </div>
        </Container>
      </Section>
      <AffiliationCta />
    </>
  );
}
