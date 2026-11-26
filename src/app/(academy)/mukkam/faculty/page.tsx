import type { Metadata } from "next";
import { academySite, faculty } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Em, Photo, Section } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "Faculty",
  description: "Faculty of the IIIAES Mukkam Academy — teachers, qualifications and subjects.",
  alternates: { canonical: `${b}/faculty` },
};

export default function FacultyPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "Faculty" }]}
        eyebrow="Faculty"
        title={
          <>
            The people who <Em tone="dark">teach you</Em>
          </>
        }
        description="Faculty profiles, including qualifications and experience, will be published here once verified."
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {faculty.map((f, i) => (
              <li key={i} className="rounded-3xl bg-white p-2 ring-1 ring-ink-950/[0.04]">
                <Photo label="Faculty portrait" className="aspect-[4/5] rounded-[18px]" />
                <div className="p-3 pt-4">
                  <p className="font-display text-lg font-medium text-ink-950">{f.name}</p>
                  <p className="mt-0.5 text-sm text-gold-700">{f.role}</p>
                  <dl className="mt-3 space-y-1 border-t border-line pt-3 text-xs text-ink-500">
                    <div>
                      <dt className="inline text-ink-400">Subjects: </dt>
                      <dd className="inline">{f.subjects}</dd>
                    </div>
                    <div>
                      <dt className="inline text-ink-400">Qualification: </dt>
                      <dd className="inline">To be updated</dd>
                    </div>
                    <div>
                      <dt className="inline text-ink-400">Experience: </dt>
                      <dd className="inline">To be updated</dd>
                    </div>
                  </dl>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
