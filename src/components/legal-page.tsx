import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Section } from "@/components/ui/primitives";

/** Simple long-form legal page layout. */
export function LegalPage({
  title,
  description,
  updated,
  sections,
}: {
  title: string;
  description: string;
  updated: string;
  sections: { heading: string; body: ReactNode }[];
}) {
  return (
    <>
      <PageHero breadcrumbs={[{ label: title }]} eyebrow="Legal" title={title} description={description} />
      <Section className="pt-10 sm:pt-14">
        <Container className="max-w-3xl">
          {/* PLACEHOLDER — draft text; must be reviewed and approved by the institution before launch */}
          <p className="rounded-2xl bg-gold-100 p-4 text-sm text-gold-700">
            Draft policy — last updated {updated}. The final version will be published after review by the institution.
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((s, i) => (
              <section key={s.heading} aria-labelledby={`legal-${i}`}>
                <h2 id={`legal-${i}`} className="font-display text-2xl font-medium tracking-tight text-ink-950">
                  {s.heading}
                </h2>
                <div className="mt-3 space-y-3 leading-relaxed text-ink-600">{s.body}</div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
