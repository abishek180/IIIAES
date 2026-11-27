import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, CircleCheck, Clock, FileText, MessageCircle, Phone } from "lucide-react";
import { getAcademyOfferings } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { academyContact, academyFaqs, academySite } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { FaqList, Steps } from "@/components/cards";
import { ApplicationForm } from "@/components/forms";
import { ButtonLink, Container, Em, Section, SectionHeading } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "Admissions",
  description: "Apply to the IIIAES Mukkam Academy — eligibility, documents, deadlines and online application for the 2027 batch.",
  alternates: { canonical: `${b}/admissions` },
};

const documents = [
  "Mark sheets & certificates of the qualifying exam",
  "Proof of date of birth",
  "Aadhaar or another government photo ID",
  "Two recent passport-size photographs",
  "Transfer certificate, if applicable",
];

export default function AcademyAdmissionsPage() {
  const offerings = getAcademyOfferings();
  const { admission } = academySite;
  const batches = [...new Set(offerings.map((o) => o.offering?.nextBatch).filter((x): x is string => !!x))];

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "Admissions" }]}
        eyebrow={admission.open ? `Admissions open · ${admission.batch}` : "Admissions"}
        title={
          <>
            Apply to <Em tone="dark">Mukkam Academy</Em>
          </>
        }
        description="Check your eligibility, keep your documents ready and apply online. The admissions office will call you within two working days."
        actions={
          <>
            <ButtonLink href="#apply">Start application</ButtonLink>
            <ButtonLink href={academyContact.contact.phoneHref} variant="outline-light">
              Call admissions
            </ButtonLink>
          </>
        }
        aside={
          <dl className="space-y-px overflow-hidden rounded-3xl ring-1 ring-white/10">
            {[
              { icon: Clock, label: "Last date to apply", value: formatDate(admission.deadline), gold: true },
              { icon: CalendarDays, label: "Classes begin", value: formatDate(admission.classesStart) },
              { icon: FileText, label: "Application fee", value: "As per prospectus" },
            ].map((r) => (
              <div key={r.label} className={r.gold ? "flex gap-3 bg-gold-400 p-5 text-ink-950" : "flex gap-3 bg-white/[0.06] p-5"}>
                <r.icon className={r.gold ? "mt-0.5 size-4 shrink-0" : "mt-0.5 size-4 shrink-0 text-gold-400"} aria-hidden />
                <div>
                  <dt className={r.gold ? "text-xs opacity-70" : "text-xs text-white/60"}>{r.label}</dt>
                  <dd className="mt-0.5 font-semibold">{r.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        }
      />

      <Section>
        <Container>
          <SectionHeading eyebrow="How it works" title={<>From application to <Em>admission</Em></>} />
          <div className="mt-10">
            <Steps
              steps={[
                { title: "Choose course & mode", text: "Pick a programme and offline, online or hybrid study." },
                { title: "Apply online", text: "Submit the form below and note your reference number." },
                { title: "Verification", text: "We call you, verify eligibility and check your documents." },
                { title: "Admission confirmed", text: "You receive confirmation and batch details." },
              ]}
            />
          </div>
        </Container>
      </Section>

      <Section id="eligibility" className="bg-white">
        <Container>
          <SectionHeading eyebrow="Eligibility" title={<>Can I <Em>apply?</Em></>} />
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {offerings.map(({ course, offering }) => (
              <div key={course.slug} className="rounded-3xl bg-paper p-6 sm:p-7">
                <p className="text-xs text-ink-500">
                  {course.duration} · {(offering?.modes ?? course.modes).join(" / ")}
                </p>
                <h3 className="mt-1 font-display text-xl font-medium tracking-tight text-ink-950">{course.title}</h3>
                <ul className="mt-4 space-y-2">
                  {course.eligibility.map((e) => (
                    <li key={e} className="flex gap-2.5 text-sm text-ink-700">
                      <CircleCheck className="mt-0.5 size-4 shrink-0 text-gold-600" aria-hidden />
                      {e}
                    </li>
                  ))}
                </ul>
                <Link href={`${b}/courses/${course.slug}`} className="mt-5 inline-block text-sm font-semibold text-ink-950 underline decoration-gold-500 underline-offset-4">
                  Course details
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="documents">
        <Container className="grid grid-cols-1 gap-3 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04] sm:p-8">
            <h2 className="font-display text-2xl font-medium tracking-tight text-ink-950 sm:text-3xl">Documents checklist</h2>
            <p className="mt-2 text-sm text-ink-500">You can upload copies with your application or bring them for verification.</p>
            <ul className="mt-6 space-y-2">
              {documents.map((d) => (
                <li key={d} className="flex items-center gap-3 rounded-2xl bg-paper p-4 text-sm text-ink-800">
                  <FileText className="size-4 shrink-0 text-gold-600" aria-hidden />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col rounded-3xl bg-ink-950 p-6 text-white sm:p-8">
            <h2 className="font-display text-2xl font-medium tracking-tight sm:text-3xl">Need help applying?</h2>
            <p className="mt-2 text-sm text-white/60">Our admissions team can guide you through the form over the phone.</p>
            <div className="mt-auto grid gap-2 pt-8">
              <a href={academyContact.contact.phoneHref} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-sm font-medium hover:bg-white/15">
                <Phone className="size-4 text-gold-400" aria-hidden /> {academyContact.contact.phone}
              </a>
              <a href={academyContact.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl bg-white/10 p-4 text-sm font-medium hover:bg-white/15">
                <MessageCircle className="size-4 text-gold-400" aria-hidden /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="apply" className="bg-white">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="Application"
              title={<>Apply <Em>online</Em></>}
              description="Fields marked * are required. Your details are stored securely and used only for admission purposes."
              className="md:flex-col md:items-start"
            />
          </div>
          <ApplicationForm courses={offerings.map((o) => o.course.title)} batches={batches} />
        </Container>
      </Section>

      <Section>
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQs" title={<>Admission <Em>questions</Em></>} action={<ButtonLink href={`${b}/faqs`} variant="outline-dark">All FAQs</ButtonLink>} />
          <div className="mt-8">
            <FaqList items={academyFaqs[0].items} />
          </div>
        </Container>
      </Section>
    </>
  );
}
