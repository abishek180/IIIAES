import type { Metadata } from "next";
import { Compass, Eye, Target } from "lucide-react";
import { site } from "@/content/site";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink, Container, Em, Eyebrow, Photo, Section, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "About Us",
  description: `About the ${site.name} — vision, mission, history and leadership.`,
  alternates: { canonical: "/about" },
};

/* PLACEHOLDER — leadership names, photos and messages must be supplied by the institution. */
const leadership = [
  { role: "Chairman", name: "Name to be announced" },
  { role: "Director", name: "Name to be announced" },
  { role: "Academic Director", name: "Name to be announced" },
  { role: "Registrar", name: "Name to be announced" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "About" }]}
        eyebrow="About IIIAES"
        title={
          <>
            Education in acupuncture, <Em tone="dark">done properly.</Em>
          </>
        }
        description={`The ${site.name} is an educational institution focused on structured academic programmes in acupuncture science.`}
      />

      <Section>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Photo src="/images/stock/campus-building.jpg" label="Institute campus" className="aspect-[4/3]" sizes="(min-width:1024px) 50vw, 100vw" />
          <div>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-tight font-medium tracking-[-0.03em] text-ink-950 sm:text-4xl">
              A focused institution for a focused discipline.
            </h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-600">
              {/* PLACEHOLDER — official institutional introduction pending */}
              <p>
                IIIAES brings together classical understanding of acupuncture with a modern academic structure — clear curricula, supervised practical
                training and an emphasis on ethical, responsible practice.
              </p>
              <p>
                From its base in Mukkam, Kozhikode, the institute supports learners through offline, online and hybrid programmes, and works with
                affiliated academies to make quality education more accessible.
              </p>
            </div>
            <ButtonLink href="/courses" variant="dark" className="mt-8">
              Explore programmes
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { icon: Eye, title: "Vision", text: "To be a trusted centre for acupuncture education — known for academic quality, ethical practice and accessible learning." },
              { icon: Target, title: "Mission", text: "To educate skilled, responsible practitioners through rigorous theory, practical training and a supportive learning community." },
              { icon: Compass, title: "Values", text: "Integrity, discipline, respect for tradition, openness to evidence and care for every learner." },
            ].map((v) => (
              <div key={v.title} className="rounded-3xl bg-paper p-7 sm:p-8">
                <v.icon className="size-6 text-gold-600" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-10 font-display text-2xl font-medium tracking-tight text-ink-950">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{v.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="history">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[14rem_1fr]">
          <Eyebrow>History</Eyebrow>
          <div>
            <p className="font-display text-[1.6rem] leading-[1.25] font-medium tracking-[-0.02em] text-ink-950 sm:text-4xl">
              Our story is still being written.{" "}
              <span className="text-ink-300">The institute’s full history and milestones will be published here once verified.</span>
            </p>
          </div>
        </Container>
      </Section>

      <Section id="leadership" className="bg-white">
        <Container>
          <SectionHeading eyebrow="Leadership" title={<>The people <Em>behind IIIAES</Em></>} description="Profiles of the institute’s leadership will be published here." />
          <ul className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {leadership.map((p) => (
              <li key={p.role}>
                <Photo label="Portrait" className="aspect-[4/5]" />
                <p className="mt-4 font-display text-lg font-medium text-ink-950">{p.name}</p>
                <p className="text-sm text-ink-500">{p.role}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
