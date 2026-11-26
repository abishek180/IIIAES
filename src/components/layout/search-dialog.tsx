"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { CornerDownLeft, Search, X } from "lucide-react";
import type { SearchEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

const sectionOrder: SearchEntry["section"][] = ["Page", "Course", "Notice", "Academy"];
const sectionLabel: Record<SearchEntry["section"], string> = {
  Page: "Pages",
  Course: "Courses",
  Notice: "Notices",
  Academy: "Academies",
};

export function SearchDialog({ open, onClose, index }: { open: boolean; onClose: () => void; index: SearchEntry[] }) {
  if (!open) return null;
  return <SearchPanel onClose={onClose} index={index} />;
}

function SearchPanel({ onClose, index }: { onClose: () => void; index: SearchEntry[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? index.filter((e) => `${e.title} ${e.keywords ?? ""} ${e.section}`.toLowerCase().includes(q))
      : index.filter((e) => e.section === "Page").slice(0, 8);
    return list.toSorted((a, b) => sectionOrder.indexOf(a.section) - sectionOrder.indexOf(b.section)).slice(0, 12);
  }, [query, index]);

  useEffect(() => {
    inputRef.current?.focus();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  const go = (entry: SearchEntry | undefined) => {
    if (!entry) return;
    onClose();
    router.push(entry.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
    if (e.key === "Enter") go(results[active]);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-3 pt-[10vh] sm:p-6 sm:pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" className="animate-fade-in absolute inset-0 bg-ink-950/50 backdrop-blur-sm" aria-label="Close search" onClick={onClose} />
      <div className="animate-fade-up relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-[0_40px_100px_-30px_rgba(15,15,15,0.6)]" onKeyDown={onKeyDown}>
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search className="size-5 shrink-0 text-ink-400" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Search courses, notices, pages…"
            className="h-16 w-full bg-transparent text-base text-ink-950 outline-none placeholder:text-ink-400"
            aria-label="Search"
            aria-controls="search-results"
            aria-activedescendant={results[active] ? `search-${active}` : undefined}
            role="combobox"
            aria-expanded="true"
            autoComplete="off"
          />
          <button type="button" onClick={onClose} className="grid size-8 shrink-0 place-items-center rounded-full bg-paper text-ink-500" aria-label="Close">
            <X className="size-4" />
          </button>
        </div>
        <ul id="search-results" role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-4 py-10 text-center text-sm text-ink-500">No results for “{query}”. Try a course name or notice type.</li>}
          {results.map((r, i) => {
            const showHeader = i === 0 || results[i - 1].section !== r.section;
            return (
              <li key={r.href + r.title} role="presentation">
                {showHeader && <p className="px-3 pt-3 pb-1.5 text-[0.68rem] font-semibold tracking-[0.14em] text-ink-400 uppercase">{sectionLabel[r.section]}</p>}
                <button
                  type="button"
                  id={`search-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                  className={cn("flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left text-sm", i === active ? "bg-paper text-ink-950" : "text-ink-700")}
                >
                  <span className="line-clamp-1">{r.title}</span>
                  {i === active && <CornerDownLeft className="size-4 shrink-0 text-ink-400" aria-hidden />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
