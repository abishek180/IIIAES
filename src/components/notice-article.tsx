import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, FileText } from "lucide-react";
import type { Notice } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/layout/page-hero";
import { NoticeRow, PriorityBadge } from "@/components/cards";
import { ArrowLink, Container, Section } from "@/components/ui/primitives";

/** Full notice page body, shared by the institute (/notices) and academy (/mukkam/news) sites. */
export function NoticeArticle({
  notice,
  more,
  basePath,
  breadcrumbs,
  listLabel = "All notices",
}: {
  notice: Notice;
  more: Notice[];
  basePath: string;
  breadcrumbs: { label: string; href?: string }[];
  listLabel?: string;
}) {
  const meta = [
    { label: "Published", value: formatDate(notice.publishedAt), icon: CalendarDays, highlight: false },
    notice.effectiveAt && { label: "Effective from", value: formatDate(notice.effectiveAt), icon: CalendarDays, highlight: false },
    notice.deadline && { label: "Deadline", value: formatDate(notice.deadline), icon: Clock, highlight: true },
  ].filter((m) => !!m);

  return (
    <>
      <PageHero
        breadcrumbs={breadcrumbs}
        eyebrow={notice.category}
        title={<span className="block text-[2.1rem] sm:text-5xl lg:text-6xl">{notice.title}</span>}
        description={notice.summary}
      />
      <Section className="pt-10 sm:pt-14">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <article className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <PriorityBadge priority={notice.priority} />
              {notice.archived && <span className="rounded-full bg-ink-950/5 px-2 py-0.5 text-[0.68rem] font-semibold tracking-wide text-ink-500 uppercase">Archived</span>}
            </div>
            <dl className="mt-4 grid gap-3 sm:grid-cols-3">
              {meta.map((m) => (
                <div key={m.label} className={m.highlight ? "rounded-2xl bg-gold-100 p-4" : "rounded-2xl bg-white p-4 ring-1 ring-ink-950/[0.04]"}>
                  <dt className="flex items-center gap-1.5 text-xs text-ink-500">
                    <m.icon className="size-3.5" aria-hidden />
                    {m.label}
                  </dt>
                  <dd className={m.highlight ? "mt-1 font-semibold text-gold-700" : "mt-1 font-medium text-ink-950"}>{m.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 max-w-2xl space-y-5 text-[1.05rem] leading-relaxed text-ink-700">
              {notice.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {notice.attachments?.length ? (
              <div className="mt-10">
                <h2 className="text-xs font-semibold tracking-[0.14em] text-ink-400 uppercase">Attachments</h2>
                <ul className="mt-3 space-y-2">
                  {notice.attachments.map((a) => (
                    <li key={a.label} className="flex items-center justify-between gap-4 rounded-2xl bg-white p-4 ring-1 ring-ink-950/[0.04]">
                      <span className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-paper" aria-hidden>
                          <FileText className="size-5 text-ink-500" />
                        </span>
                        <span>
                          <span className="block text-sm font-medium text-ink-950">{a.label}</span>
                          <span className="text-xs text-ink-500">PDF{a.size ? ` · ${a.size}` : ""}</span>
                        </span>
                      </span>
                      {/* TODO(cms): link to uploaded file */}
                      <span className="text-xs font-medium text-ink-400">Upload pending</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-10 flex flex-wrap items-center gap-6">
              {notice.related && <ArrowLink href={notice.related.href}>{notice.related.label}</ArrowLink>}
              <Link href={basePath} className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-950">
                <ArrowLeft className="size-4" aria-hidden /> {listLabel}
              </Link>
            </div>
          </article>

          <aside>
            <div className="rounded-3xl bg-white p-2 ring-1 ring-ink-950/[0.04] lg:sticky lg:top-28">
              <p className="p-4 pb-2 font-display text-lg font-medium text-ink-950">Latest</p>
              <ul className="divide-y divide-line">
                {more.map((n) => (
                  <li key={n.slug}>
                    <NoticeRow notice={n} compact basePath={basePath} />
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
