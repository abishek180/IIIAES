"use client";

import { useState } from "react";
import type { GalleryCategory, GalleryItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { GalleryGrid } from "@/components/sections";

const filters: ("All" | GalleryCategory)[] = ["All", "Campus", "Academic", "Clinical", "Events"];

export function GalleryFilter({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = filter === "All" ? items : items.filter((i) => i.category === filter);
  return (
    <>
      <div className="no-scrollbar -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="group" aria-label="Filter gallery">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "h-10 shrink-0 rounded-full px-5 text-sm font-medium transition-colors",
                filter === f ? "bg-ink-950 text-white" : "bg-white text-ink-600 ring-1 ring-ink-950/[0.06] hover:text-ink-950",
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <GalleryGrid items={shown} />
      </div>
    </>
  );
}
