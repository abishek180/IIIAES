import type { Metadata } from "next";
import Link from "next/link";
import { CircleCheck, FileText, MessageCircle, Phone } from "lucide-react";
import { getCalendar, getCourses, getHeadlineNotice } from "@/lib/data";
import { site } from "@/content/site";
import { PageHero } from "@/components/layout/page-hero";
import { CalendarList, FaqList, Steps } from "@/components/cards";
import { ContactForm } from "@/components/forms";
import { ButtonLink, Container, Em, Section, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Admissions",
  description: "How to apply to IIIAES — eligibility, required documents, key dates and the admission process.",
  alternates: { canonical: "/admissions" },
};

const documents = [
  "Completed application form",
  "Qualifying examination mark sheets and certificates",
  "Proof of date of birth",
  "Government-issued photo ID (e.g. Aadhaar)",
  "Recent passport-size photographs",
  "Transfer / migration certificate, where applicable",
];

const faqs = [
  { q: "Can I apply online?", a: "Yes. Submit the enquiry form on this page and the admissions office will guide you through the full application." },
  { q: "When does the next batch begin?", a: "Key dates for the upcoming batch are listed in the admission calendar on this page." },
  { q: "Can I choose between offline and online learning?", a: "Many programmes offer more than one mode. The available modes are listed on each course page." },
  { q: "Who do I contact for help?", a: "Call or WhatsApp the admissions office during office hours, or send an enquiry using the form." },
];

export default function AdmissionsPage() {
  const courses = getCourses();
  const headline = getHeadlineNotice();
  const dates = getCalendar().filter((e) => e.type === "Admission" || e.type === "Academic");

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Admissions" }]}
        eyebrow="Admissions 2027"
        title={
          <>
            Your path to <Em tone="dark">admission</Em>
          </>
        }
        description="Four simple steps — from choosing a programme to confirming your seat. Check eligibility and documents before you apply."
        actions={
          <>
            <ButtonLink href="#apply">Start enquiry</ButtonLink>
            <ButtonLink href="/downloads" variant="outline-light">
              Application form (PDF)
            </ButtonLink>
          </>
        }
        aside={
          headline && (
            <Link href={`/notices/${headline.slug}`} className="block rounded-3xl bg-gold-400 p-6 text-ink-950 transition-colors hover:bg-gold-300">
              <p className="text-xs font-semibold tracking-[0.14em] uppercase opacity-60">Latest notice</p>
              <p className="mt-3 font-display text-xl leading-snug font-medium">{headline.title}</p>
              <p className="mt-4 text-sm font-semibold underline underline-offset-4">Read notice</p>
            </Link>
          )
        }
      />

      {/* Process */}
      <Section>
        <Container>
          <SectionHeading eyebrow="Process" title={<>How admission <Em>works</Em></>} />
          <div className="mt-10">
            <Steps
              steps={[
                { title: "Explore programmes", text: "Compare courses, durations and learning modes." },
                { title: "Check eligibility", text: "Confirm you meet the minimum requirements below." },
                { title: "Submit your enquiry", text: "Send the online form or a printed application." },
                { title: "Verification & confirmation", text: "The admissions office verifies documents and confirms your seat." },
              ]}
            />
          </div>
        </Container>
      </Section>

      {/* Eligibility */}
      <Section id="eligibility" className="bg-white">
        <Container>
          <SectionHeading eyebrow="Eligibility" title={<>Who can <Em>apply</Em></>} description="Minimum requirements for each programme. Full details are on each course page." />
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {courses.map((c) => (
              <div key={c.slug} className="flex flex-col rounded-3xl bg-paper p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-ink-500">
                      {c.level} · {c.duration}
                    </p>
                    <h3 className="mt-1 font-display text-xl font-medium tracking-tight text-ink-950">{c.title}</h3>
                  </div>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {c.eligibility.map((e) => (
                    <li key={e} className="flex gap-2.5 text-sm text-ink-700">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />
                      {e}
                    </li>
                  ))}
                </ul>
                <Link href={`/courses/${c.slug}`} className="mt-6 text-sm font-semibold text-ink-950 underline decoration-gold-500 underline-offset-4">
                  Course details
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Documents + dates */}
      <Section>
        <Container className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div id="documents" className="rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04] sm:p-8">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">Required documents</h2>
            <p className="mt-2 text-sm text-ink-500">Keep copies ready. Originals are checked during verification.</p>
            <ul className="mt-6 space-y-2">
              {documents.map((d) => (
                <li key={d} className="flex items-center gap-3 rounded-2xl bg-paper p-4 text-sm text-ink-800">
                  <FileText className="size-4 shrink-0 text-gold-600" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-ink-950 p-3 text-white sm:p-5">
            <h2 className="p-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">Key dates</h2>
            <CalendarList events={dates} tone="dark" />
          </div>
        </Container>
      </Section>

      {/* Enquiry form */}
      <Section id="apply" className="bg-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Apply" title={<>Start your <Em>enquiry</Em></>} description="Share your details and the admissions office will contact you with next steps." />
            <div className="mt-8 space-y-2">
              <a href={site.contact.phoneHref} className="flex items-center gap-3 rounded-2xl bg-paper p-4 text-sm font-medium text-ink-950 hover:bg-paper-2">
                <Phone className="size-4 text-gold-600" aria-hidden /> {site.contact.phone}
              </a>
              <a href={site.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-paper p-4 text-sm font-medium text-ink-950 hover:bg-paper-2">
                <MessageCircle className="size-4 text-gold-600" aria-hidden /> Chat on WhatsApp
              </a>
            </div>
          </div>
          <ContactForm courses={courses.map((c) => c.title)} />
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQs" title={<>Admission <Em>questions</Em></>} />
          <div className="mt-8">
            <FaqList items={faqs} />
          </div>
        </Container>
      </Section>
    </>
  );
}
