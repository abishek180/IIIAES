import type { Metadata } from "next";
import { getGallery } from "@/lib/data";
import { PageHero } from "@/components/layout/page-hero";
import { GalleryGrid } from "@/components/sections";
import { ButtonLink, Container, Em, Photo, Section, SectionHeading } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Student Life",
  description: "The learning environment and academic activities at IIIAES.",
  alternates: { canonical: "/student-life" },
};

const highlights = [
  { img: "/images/stock/acupuncture-treatment.jpg", title: "Practical sessions", text: "Regular hands-on sessions in small groups, guided by faculty." },
  { img: "/images/stock/workshop.jpg", title: "Workshops", text: "Specialised workshops on techniques, case management and allied topics." },
  { img: "/images/stock/graduation.jpg", title: "Academic events", text: "Seminars, orientation programmes and academic celebrations." },
  { img: "/images/stock/seminar.jpg", title: "Community outreach", text: "Awareness programmes and supervised community health activities." },
];

export default function StudentLifePage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Student Life" }]}
        eyebrow="Student life"
        title={
          <>
            A focused, <Em tone="dark">supportive</Em> place to learn
          </>
        }
        description="Small groups, close faculty guidance and plenty of hands-on practice."
      />
      <Section>
        <Container>
          <SectionHeading eyebrow="Learning environment" title={<>Life on <Em>campus</Em></>} />
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {highlights.map((h, i) => (
              <div key={h.title} className="grid grid-cols-[7rem_1fr] gap-4 rounded-3xl bg-white p-3 ring-1 ring-ink-950/[0.04] sm:grid-cols-[10rem_1fr]">
                <Photo src={h.img} label={h.title} className="aspect-square rounded-[18px]" sizes="160px" />
                <div className="py-2 pr-3">
                  <span className="font-display text-sm font-semibold text-gold-700">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-2 font-display text-xl font-medium tracking-tight text-ink-950">{h.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{h.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section className="bg-white">
        <Container>
          <SectionHeading eyebrow="Moments" title={<>From the <Em>gallery</Em></>} action={<ButtonLink href="/gallery" variant="outline-dark">Full gallery</ButtonLink>} />
          <div className="mt-10">
            <GalleryGrid items={getGallery().slice(0, 6)} />
          </div>
        </Container>
      </Section>
    </>
  );
}
