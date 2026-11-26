import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import { academyContact, academyFaqs, academySite } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { FaqList } from "@/components/cards";
import { Container, Em, Section } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "FAQs",
  description: "Frequently asked questions about admissions, courses, learning modes and the IIIAES Mukkam Academy campus.",
  alternates: { canonical: `${b}/faqs` },
};

export default function FaqsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: academyFaqs.flatMap((g) => g.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } }))),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "FAQs" }]}
        eyebrow="FAQs"
        title={
          <>
            Questions, <Em tone="dark">answered</Em>
          </>
        }
        description="Quick answers about admissions, courses and the campus."
      />
      <Section className="pt-10 sm:pt-14">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[14rem_1fr]">
          <nav aria-label="FAQ topics" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:sticky lg:top-28 lg:mx-0 lg:flex-col lg:self-start lg:px-0">
            {academyFaqs.map((g) => (
              <a key={g.group} href={`#${g.group.toLowerCase().replace(/\W+/g, "-")}`} className="h-10 shrink-0 rounded-full bg-white px-4 text-sm leading-10 font-medium text-ink-700 ring-1 ring-ink-950/[0.05] hover:text-ink-950 lg:rounded-xl">
                {g.group}
              </a>
            ))}
          </nav>
          <div className="space-y-12">
            {academyFaqs.map((g) => (
              <section key={g.group} id={g.group.toLowerCase().replace(/\W+/g, "-")} aria-label={g.group}>
                <h2 className="font-display text-2xl font-medium tracking-tight text-ink-950">{g.group}</h2>
                <div className="mt-4">
                  <FaqList items={g.items} />
                </div>
              </section>
            ))}
            <div className="flex flex-col gap-4 rounded-3xl bg-ink-950 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <p className="font-display text-xl font-medium">Still have a question?</p>
              <div className="flex gap-2">
                <a href={academyContact.contact.phoneHref} className="flex h-11 items-center gap-2 rounded-full bg-white/10 px-5 text-sm font-semibold hover:bg-white/15">
                  <Phone className="size-4" aria-hidden /> Call
                </a>
                <a href={academyContact.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex h-11 items-center gap-2 rounded-full bg-gold-400 px-5 text-sm font-semibold text-ink-950 hover:bg-gold-300">
                  <MessageCircle className="size-4" aria-hidden /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
