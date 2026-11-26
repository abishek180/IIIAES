import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/** Dark inset hero used on every inner page — keeps the header treatment consistent. */
export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs = [],
  actions,
  aside,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  const crumbs = [{ label: "Home", href: "/" }, ...breadcrumbs];
  return (
    <div className="px-2 pt-2 sm:px-3 sm:pt-3">
      <section className={cn("relative overflow-hidden rounded-[28px] bg-ink-950 text-white", className)}>
        <div className="pointer-events-none absolute -top-40 right-[-10%] size-[36rem] rounded-full bg-gold-400/[0.08] blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-5 pt-28 pb-12 sm:px-8 sm:pt-36 sm:pb-16">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1 text-xs text-white/50">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="size-3" aria-hidden />}
                  {c.href && i < crumbs.length - 1 ? (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/80">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className={cn("mt-8 grid grid-cols-1 gap-10", !!aside && "lg:grid-cols-[1fr_22rem] lg:items-end")}>
            <div className="max-w-3xl">
              {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
              <h1 className="mt-4 font-display text-[2.5rem] leading-[1] font-medium tracking-[-0.04em] text-balance sm:text-6xl lg:text-7xl">{title}</h1>
              {description && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">{description}</p>}
              {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            </div>
            {aside}
          </div>
        </div>
      </section>
    </div>
  );
}
