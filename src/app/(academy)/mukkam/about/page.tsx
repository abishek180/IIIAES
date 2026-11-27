import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Eye, Target } from "lucide-react";
import { academySite, whyStudy } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { ButtonLink, Container, Em, Emblem, Eyebrow, Photo, Section, SectionHeading } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "About the Academy",
  description: "About the IIIAES Mukkam Academy — overview, vision, mission and relationship with IIIAES.",
  alternates: { canonical: `${b}/about` },
};

export default function AcademyAboutPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "About" }]}
        eyebrow="About the academy"
        title={
          <>
            A campus for <Em tone="dark">serious learners</Em>
          </>
        }
        description="The IIIAES Mukkam Academy brings structured acupuncture education to Kozhikode — with practical training at its core."
        actions={<ButtonLink href={`${b}/admissions#apply`}>Apply now</ButtonLink>}
      />

      <Section>
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Photo src="/images/campus/iiiaes-campus.jpg" alt="The IIIAES campus building" label="Mukkam campus" className="aspect-[4/3]" sizes="(min-width:1024px) 50vw, 100vw" />
          <div>
            <Eyebrow>Overview</Eyebrow>
            <h2 className="mt-4 font-display text-3xl leading-tight font-medium tracking-[-0.03em] text-ink-950 sm:text-4xl">Theory in the classroom. Skill in the practical room.</h2>
            <div className="mt-6 space-y-4 leading-relaxed text-ink-600">
              {/* PLACEHOLDER — official academy introduction pending */}
              <p>
                The academy offers IIIAES programmes in offline, online and hybrid formats, so learners from Mukkam and across Kerala can study in the way that
                suits them.
              </p>
              <p>Every programme combines structured theory with supervised practical sessions, and clinical exposure where the programme requires it.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container className="grid gap-3 md:grid-cols-2">
          {[
            { icon: Eye, title: "Vision", text: "To make quality acupuncture education accessible to learners in north Kerala." },
            { icon: Target, title: "Mission", text: "To train confident, ethical practitioners through close guidance and hands-on practice." },
          ].map((v) => (
            <div key={v.title} className="rounded-3xl bg-paper p-7 sm:p-9">
              <v.icon className="size-6 text-gold-600" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-8 font-display text-2xl font-medium tracking-tight text-ink-950">{v.title}</h3>
              <p className="mt-3 text-lg leading-relaxed text-ink-600">{v.text}</p>
            </div>
          ))}
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Relationship with IIIAES" title={<>Part of a wider <Em>institution</Em></>} />
          <Link href="/" className="group mt-10 flex flex-col gap-6 rounded-3xl bg-ink-950 p-7 text-white sm:flex-row sm:items-center sm:p-10">
            <Emblem className="size-24 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-display text-2xl font-medium tracking-tight">International Institute of Indian Acupuncture Science</p>
              <p className="mt-2 max-w-2xl text-white/60">{academySite.affiliationNote} Courses, curriculum and examinations follow the IIIAES academic framework.</p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-300 group-hover:text-gold-200">
              Visit IIIAES <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </Link>
        </Container>
      </Section>

      <Section className="bg-white">
        <Container>
          <SectionHeading eyebrow="At a glance" title={<>What makes us <Em>different</Em></>} />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {whyStudy.map((w) => (
              <li key={w.title} className="rounded-3xl bg-paper p-7">
                <h3 className="font-display text-lg font-medium tracking-tight text-ink-950">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{w.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
