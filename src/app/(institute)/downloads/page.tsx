import type { Metadata } from "next";
import { Download, FileText } from "lucide-react";
import { getDownloads } from "@/lib/data";
import type { DownloadCategory } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { PageHero } from "@/components/layout/page-hero";
import { Container, Em, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Downloads",
  description: "Download the IIIAES prospectus, application forms, syllabus and official documents.",
  alternates: { canonical: "/downloads" },
};

const order: DownloadCategory[] = ["Prospectus", "Application Forms", "Syllabus", "Circulars"];

export default function DownloadsPage() {
  const items = getDownloads();
  const groups = order.map((category) => ({ category, items: items.filter((i) => i.category === category) })).filter((g) => g.items.length);
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Downloads" }]}
        eyebrow="Downloads"
        title={
          <>
            Documents & <Em tone="dark">forms</Em>
          </>
        }
        description="The prospectus, application forms, syllabus and official documents — all in one place."
      />
      <Section className="pt-10 sm:pt-14">
        <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[14rem_1fr]">
          <nav aria-label="Document categories" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:sticky lg:top-28 lg:mx-0 lg:flex-col lg:self-start lg:px-0">
            {groups.map((g) => (
              <a key={g.category} href={`#${g.category.toLowerCase().replace(/\s+/g, "-")}`} className="h-10 shrink-0 rounded-full bg-white px-4 text-sm leading-10 font-medium text-ink-700 ring-1 ring-ink-950/[0.05] hover:text-ink-950 lg:rounded-xl">
                {g.category}
              </a>
            ))}
          </nav>
          <div className="space-y-12">
            {groups.map((g) => (
              <section key={g.category} id={g.category.toLowerCase().replace(/\s+/g, "-")} aria-label={g.category}>
                <h2 className="font-display text-2xl font-medium tracking-tight text-ink-950">{g.category}</h2>
                <ul className="mt-4 divide-y divide-line rounded-3xl bg-white ring-1 ring-ink-950/[0.04]">
                  {g.items.map((d) => (
                    <li key={d.title} className="flex items-center gap-4 p-4 sm:p-5">
                      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-paper" aria-hidden>
                        <FileText className="size-5 text-ink-500" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-ink-950">{d.title}</p>
                        <p className="mt-0.5 text-xs text-ink-500">
                          {d.fileType}
                          {d.size && ` · ${d.size}`} · Updated {formatDate(d.updated)}
                        </p>
                        {d.description && <p className="mt-1 hidden text-sm text-ink-500 sm:block">{d.description}</p>}
                      </div>
                      {d.href ? (
                        <a href={d.href} download className="flex h-10 shrink-0 items-center gap-2 rounded-full bg-ink-950 px-4 text-sm font-semibold text-white hover:bg-ink-800">
                          <Download className="size-4" aria-hidden />
                          <span className="hidden sm:inline">Download</span>
                        </a>
                      ) : (
                        <span className="shrink-0 rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-ink-400">Coming soon</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
