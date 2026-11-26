import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Paperclip, Pin } from "lucide-react";
import type { Academy, CalendarEvent, Course, Notice, NoticePriority } from "@/lib/types";
import { cn, dateParts, formatDate } from "@/lib/utils";
import { Chip, Photo } from "@/components/ui/primitives";

/* ---------- Course ---------- */

export function CourseCard({ course, className, href, extra }: { course: Course; className?: string; href?: string; extra?: string }) {
  return (
    <Link
      href={href ?? `/courses/${course.slug}`}
      className={cn(
        "group flex h-full flex-col rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04] transition-[box-shadow,transform] duration-500 ease-(--ease-soft) hover:-translate-y-1 hover:shadow-[0_24px_50px_-24px_rgba(15,15,15,0.3)] sm:p-7",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="flex flex-wrap items-center gap-2">
          <Chip tone="gold">{course.level}</Chip>
          {extra && <Chip>{extra}</Chip>}
        </span>
        <span className="grid size-10 place-items-center rounded-full bg-paper transition-colors duration-300 group-hover:bg-gold-400" aria-hidden>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
        </span>
      </div>
      <h3 className="mt-8 font-display text-2xl leading-tight font-medium tracking-[-0.02em] text-ink-950">{course.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-500">{course.summary}</p>
      <dl className="mt-auto grid grid-cols-2 gap-4 border-t border-line pt-5 text-sm">
        <div>
          <dt className="text-xs text-ink-400">Duration</dt>
          <dd className="mt-1 font-medium text-ink-950">{course.duration}</dd>
        </div>
        <div>
          <dt className="text-xs text-ink-400">Learning mode</dt>
          <dd className="mt-1 font-medium text-ink-950">{course.modes.join(" · ")}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-ink-400">Eligibility</dt>
          <dd className="mt-1 line-clamp-1 font-medium text-ink-950">{course.eligibility[0]}</dd>
        </div>
      </dl>
    </Link>
  );
}

/* ---------- Notice ---------- */

const priorityStyles: Record<NoticePriority, { label: string; className: string }> = {
  urgent: { label: "Urgent", className: "bg-ink-950 text-gold-300" },
  important: { label: "Important", className: "bg-gold-100 text-gold-700" },
  normal: { label: "", className: "" },
};

export function PriorityBadge({ priority }: { priority: NoticePriority }) {
  if (priority === "normal") return null;
  const p = priorityStyles[priority];
  return <span className={cn("rounded-full px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide uppercase", p.className)}>{p.label}</span>;
}

export function NoticeRow({ notice, compact, basePath = "/notices" }: { notice: Notice; compact?: boolean; basePath?: string }) {
  const { day, month } = dateParts(notice.publishedAt);
  return (
    <Link
      href={`${basePath}/${notice.slug}`}
      className="group flex gap-4 rounded-2xl p-4 transition-colors hover:bg-paper sm:gap-5 sm:p-5"
    >
      <div className="flex w-12 shrink-0 flex-col items-center rounded-xl bg-paper py-2 text-center transition-colors group-hover:bg-white sm:w-14">
        <span className="font-display text-xl leading-none font-semibold text-ink-950">{day}</span>
        <span className="mt-1 text-[0.65rem] font-medium tracking-wider text-ink-500 uppercase">{month}</span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-ink-500">{notice.category}</span>
          <PriorityBadge priority={notice.priority} />
          {notice.pinned && <Pin className="size-3.5 rotate-45 text-gold-600" aria-label="Pinned" />}
        </div>
        <h3 className="mt-1.5 font-medium leading-snug text-ink-950 group-hover:underline group-hover:decoration-gold-500 group-hover:underline-offset-4">{notice.title}</h3>
        {!compact && <p className="mt-1.5 line-clamp-2 text-sm text-ink-500">{notice.summary}</p>}
        {(notice.deadline || notice.attachments?.length) && (
          <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-500">
            {notice.deadline && (
              <span className="inline-flex items-center gap-1 font-medium text-gold-700">
                <Clock className="size-3.5" aria-hidden /> Deadline {formatDate(notice.deadline)}
              </span>
            )}
            {notice.attachments?.length ? (
              <span className="inline-flex items-center gap-1">
                <Paperclip className="size-3.5" aria-hidden /> {notice.attachments.length} attachment{notice.attachments.length > 1 ? "s" : ""}
              </span>
            ) : null}
          </div>
        )}
      </div>
      <ArrowUpRight className="mt-1 hidden size-4 shrink-0 text-ink-300 transition-colors group-hover:text-ink-950 sm:block" aria-hidden />
    </Link>
  );
}

/* ---------- Calendar ---------- */

const eventTone: Record<CalendarEvent["type"], string> = {
  Admission: "bg-gold-400",
  Examination: "bg-ink-950",
  Academic: "bg-ink-400",
  Workshop: "bg-gold-600",
};

export function CalendarList({ events, tone = "light" }: { events: CalendarEvent[]; tone?: "light" | "dark" }) {
  return (
    <ol className="relative space-y-1">
      {events.map((e) => {
        const { day, month } = dateParts(e.date);
        return (
          <li key={e.date + e.title} className={cn("flex items-start gap-4 rounded-2xl p-3", tone === "dark" ? "hover:bg-white/5" : "hover:bg-paper")}>
            <div className={cn("w-12 shrink-0 text-center", tone === "dark" ? "text-white" : "text-ink-950")}>
              <span className="block font-display text-2xl leading-none font-semibold">{day}</span>
              <span className={cn("text-[0.65rem] font-medium tracking-wider uppercase", tone === "dark" ? "text-white/50" : "text-ink-500")}>{month}</span>
            </div>
            <div className="min-w-0 pt-0.5">
              <p className={cn("font-medium leading-snug", tone === "dark" ? "text-white" : "text-ink-950")}>{e.title}</p>
              <p className={cn("mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs", tone === "dark" ? "text-white/50" : "text-ink-500")}>
                <span className="inline-flex items-center gap-1.5">
                  <span className={cn("size-1.5 rounded-full", eventTone[e.type])} aria-hidden />
                  {e.type}
                </span>
                {e.endDate && (
                  <span className="inline-flex items-center gap-1">
                    <CalendarDays className="size-3.5" aria-hidden /> until {formatDate(e.endDate)}
                  </span>
                )}
                {e.location && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" aria-hidden /> {e.location}
                  </span>
                )}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ---------- Academy ---------- */

export function AcademyCard({ academy, courseCount }: { academy: Academy; courseCount: number }) {
  return (
    <Link
      href={`/academies/${academy.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-ink-950/[0.04] transition-shadow duration-500 hover:shadow-[0_24px_50px_-24px_rgba(15,15,15,0.3)]"
    >
      <Photo src={academy.image} label={`${academy.location} campus`} className="aspect-[16/10] rounded-none" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          {academy.flagship && <Chip tone="gold">Flagship campus</Chip>}
          <Chip>{academy.status}</Chip>
        </div>
        <h3 className="mt-4 font-display text-xl font-medium tracking-tight text-ink-950">{academy.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
          <MapPin className="size-3.5" aria-hidden />
          {academy.location}, {academy.district}, {academy.state}
        </p>
        <div className="mt-auto flex items-center justify-between pt-6 text-sm">
          <span className="text-ink-500">
            {courseCount} approved programme{courseCount === 1 ? "" : "s"}
          </span>
          <ArrowUpRight className="size-4 text-ink-400 transition-all group-hover:rotate-45 group-hover:text-ink-950" aria-hidden />
        </div>
      </div>
    </Link>
  );
}

/* ---------- FAQ ---------- */

export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line rounded-3xl bg-white px-6 ring-1 ring-ink-950/[0.04]">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-medium text-ink-950">
            {f.q}
            <span className="relative mt-1 size-4 shrink-0" aria-hidden>
              <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 bg-ink-950" />
              <span className="absolute top-0 left-1/2 h-4 w-[1.5px] -translate-x-1/2 bg-ink-950 transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
            </span>
          </summary>
          <p className="mt-3 pr-10 text-sm leading-relaxed text-ink-500">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* ---------- Steps ---------- */

export function Steps({ steps, tone = "light" }: { steps: { title: string; text?: string }[]; tone?: "light" | "dark" }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.title} className={cn("relative rounded-3xl p-6", tone === "dark" ? "bg-white/[0.05] ring-1 ring-white/10" : "bg-white ring-1 ring-ink-950/[0.04]")}>
          <span className={cn("font-display text-sm font-semibold", tone === "dark" ? "text-gold-400" : "text-gold-700")}>{String(i + 1).padStart(2, "0")}</span>
          <p className={cn("mt-8 font-display text-lg leading-snug font-medium tracking-tight", tone === "dark" ? "text-white" : "text-ink-950")}>{s.title}</p>
          {s.text && <p className={cn("mt-2 text-sm leading-relaxed", tone === "dark" ? "text-white/55" : "text-ink-500")}>{s.text}</p>}
        </li>
      ))}
    </ol>
  );
}
