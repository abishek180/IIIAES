import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getCalendar, getNotices } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/layout/page-hero";
import { NoticeBoard } from "@/components/notice-board";
import { CalendarList } from "@/components/cards";
import { Container, Em, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "News & Announcements",
  description: "Official IIIAES notices — admissions, examinations, timetables, results, deadlines and circulars.",
  alternates: { canonical: "/notices" },
};

export default function NoticesPage() {
  const all = getNotices({ includeArchived: true });
  const deadlines = getNotices()
    .filter((n) => n.deadline)
    .toSorted((a, b) => a.deadline!.localeCompare(b.deadline!))
    .slice(0, 3);

  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Notices" }]}
        eyebrow="Notice board"
        title={
          <>
            News & <Em tone="dark">announcements</Em>
          </>
        }
        description="Admission notifications, examination updates, deadlines and official circulars — all in one place."
        aside={
          deadlines.length > 0 && (
            <div className="rounded-3xl bg-white/[0.06] p-2 ring-1 ring-white/10">
              <p className="px-4 pt-3 pb-2 text-xs font-semibold tracking-[0.14em] text-gold-300 uppercase">Upcoming deadlines</p>
              <ul>
                {deadlines.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/notices/${n.slug}`} className="block rounded-2xl px-4 py-3 hover:bg-white/5">
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gold-300">
                        <Clock className="size-3.5" aria-hidden /> {formatDate(n.deadline!)}
                      </span>
                      <span className="mt-1 block text-sm font-medium text-white">{n.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )
        }
      />
      <Section className="pt-10 sm:pt-14">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem]">
          <NoticeBoard notices={all} />
          <aside className="lg:pt-[7.5rem]">
            <div className="rounded-3xl bg-white p-3 ring-1 ring-ink-950/[0.04] lg:sticky lg:top-28">
              <p className="p-3 font-display text-lg font-medium text-ink-950">Academic calendar</p>
              <CalendarList events={getCalendar()} />
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
