import type { Metadata } from "next";
import { getCalendar, getNotices } from "@/lib/data";
import { academySite } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { NoticeBoard } from "@/components/notice-board";
import { CalendarList } from "@/components/cards";
import { Container, Em, Section } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "News & Updates",
  description: "Admission dates, examination schedules, deadlines and circulars for the IIIAES Mukkam Academy.",
  alternates: { canonical: `${b}/news` },
};

export default function AcademyNewsPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "News & Updates" }]}
        eyebrow="News & updates"
        title={
          <>
            What’s happening at <Em tone="dark">Mukkam</Em>
          </>
        }
        description="Academy updates together with the official IIIAES notices that apply to Mukkam students."
      />
      <Section className="pt-10 sm:pt-14">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem]">
          <NoticeBoard notices={getNotices({ site: "academy", includeArchived: true })} basePath={`${b}/news`} />
          <aside className="lg:pt-[7.5rem]">
            <div className="rounded-3xl bg-white p-3 ring-1 ring-ink-950/[0.04] lg:sticky lg:top-28">
              <p className="p-3 font-display text-lg font-medium text-ink-950">Key dates</p>
              <CalendarList events={getCalendar()} />
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
