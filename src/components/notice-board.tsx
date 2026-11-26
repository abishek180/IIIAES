"use client";

import { useMemo, useState } from "react";
import { Archive, Search } from "lucide-react";
import type { Notice, NoticeCategory } from "@/lib/types";
import { cn } from "@/lib/utils";
import { NoticeRow } from "@/components/cards";

const categories: ("All" | NoticeCategory)[] = [
  "All",
  "Admission",
  "Examination",
  "Timetable",
  "Deadline",
  "Late Fee",
  "Results",
  "Academic Calendar",
  "Circular",
  "Events",
];

export function NoticeBoard({ notices, basePath }: { notices: Notice[]; basePath?: string }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [showArchive, setShowArchive] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return notices.filter(
      (n) =>
        !!n.archived === showArchive &&
        (category === "All" || n.category === category) &&
        (!q || `${n.title} ${n.summary} ${n.category}`.toLowerCase().includes(q)),
    );
  }, [notices, category, query, showArchive]);

  const counts = useMemo(() => {
    const c = new Map<string, number>();
    for (const n of notices) if (!!n.archived === showArchive) c.set(n.category, (c.get(n.category) ?? 0) + 1);
    return c;
  }, [notices, showArchive]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Search notices</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-400" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notices and circulars"
            className="h-12 w-full rounded-full bg-white pr-4 pl-11 text-sm ring-1 ring-ink-950/[0.06] outline-none placeholder:text-ink-400 focus:ring-2 focus:ring-gold-400"
          />
        </label>
        <div className="flex rounded-full bg-white p-1 ring-1 ring-ink-950/[0.06]" role="group" aria-label="Notice status">
          {[
            { label: "Current", value: false },
            { label: "Archive", value: true },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={showArchive === o.value}
              onClick={() => {
                setShowArchive(o.value);
                setCategory("All");
              }}
              className={cn(
                "flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-medium transition-colors",
                showArchive === o.value ? "bg-ink-950 text-white" : "text-ink-600 hover:text-ink-950",
              )}
            >
              {o.value && <Archive className="size-3.5" aria-hidden />}
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="no-scrollbar -mx-5 mt-4 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Filter by category">
        <div className="flex gap-2 pb-1 sm:flex-wrap">
          {categories
            .filter((c) => c === "All" || counts.has(c))
            .map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "h-9 shrink-0 rounded-full px-4 text-[0.8rem] font-medium transition-colors",
                  category === c ? "bg-gold-400 text-ink-950" : "bg-white text-ink-600 ring-1 ring-ink-950/[0.06] hover:text-ink-950",
                )}
              >
                {c}
                {c !== "All" && <span className="ml-1.5 text-ink-400">{counts.get(c)}</span>}
              </button>
            ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-500" aria-live="polite">
        {filtered.length} {showArchive ? "archived " : ""}notice{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="mt-3 rounded-3xl bg-white p-2 ring-1 ring-ink-950/[0.04]">
        {filtered.length ? (
          <ul className="divide-y divide-line">
            {filtered.map((n) => (
              <li key={n.slug}>
                <NoticeRow notice={n} basePath={basePath} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-16 text-center text-sm text-ink-500">No notices match your filters.</p>
        )}
      </div>
    </div>
  );
}
