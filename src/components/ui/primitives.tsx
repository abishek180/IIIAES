import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Camera } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";
import { cn, isExternal } from "@/lib/utils";

/* ---------- Layout ---------- */

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)} {...props} />;
}

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("py-16 sm:py-24", className)} {...props} />;
}

/* ---------- Typography ---------- */

/** Gold accent for one or two words inside a heading (same Inter Tight face as the heading). */
export function Em({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <em className={cn("font-display not-italic", className ?? (tone === "dark" ? "text-gold-400" : "text-gold-700"))}>
      {children}
    </em>
  );
}

export function Eyebrow({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em]",
        tone === "dark" ? "text-white/60" : "text-ink-500",
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-gold-400" aria-hidden />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  tone = "light",
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
        <h2
          className={cn(
            "mt-4 font-display text-[2rem] leading-[1.05] font-medium tracking-[-0.03em] text-balance sm:text-5xl",
            tone === "dark" ? "text-white" : "text-ink-950",
          )}
        >
          {title}
        </h2>
        {description && (
          <p className={cn("mt-4 text-base leading-relaxed text-pretty sm:text-lg", tone === "dark" ? "text-white/65" : "text-ink-500")}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ---------- Buttons ---------- */

type ButtonVariant = "gold" | "dark" | "light" | "outline-light" | "outline-dark";

const buttonBase =
  "group inline-flex items-center justify-center gap-3 rounded-full text-sm font-semibold transition-colors duration-300 select-none";

const buttonVariants: Record<ButtonVariant, { root: string; icon: string }> = {
  gold: { root: "bg-gold-400 text-ink-950 hover:bg-gold-300", icon: "bg-ink-950 text-gold-400" },
  dark: { root: "bg-ink-950 text-white hover:bg-ink-800", icon: "bg-gold-400 text-ink-950" },
  light: { root: "bg-white text-ink-950 hover:bg-paper", icon: "bg-ink-950 text-white" },
  "outline-light": { root: "border border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20", icon: "bg-white/15 text-white" },
  "outline-dark": { root: "border border-ink-950/20 bg-white/60 text-ink-950 hover:bg-white", icon: "bg-ink-950/[0.07] text-ink-950" },
};

export function ButtonLink({
  href,
  children,
  variant = "gold",
  icon = true,
  className,
  size = "md",
  newTab = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: boolean;
  size?: "sm" | "md";
  className?: string;
  /** Open in a new tab (adds an accessible hint for screen readers) */
  newTab?: boolean;
}) {
  const v = buttonVariants[variant];
  const classes = cn(
    buttonBase,
    v.root,
    size === "md" ? "h-12" : "h-10 text-[0.8rem]",
    icon ? (size === "md" ? "pr-1.5 pl-5" : "pr-1 pl-4") : "px-6",
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      {icon && (
        <span
          className={cn(
            "grid place-items-center rounded-full transition-transform duration-300 ease-(--ease-soft) group-hover:rotate-45",
            v.icon,
            size === "md" ? "size-9" : "size-8",
          )}
          aria-hidden
        >
          <ArrowUpRight className="size-4" strokeWidth={2.2} />
        </span>
      )}
    </>
  );
  if (isExternal(href)) {
    return (
      <a href={href} className={classes} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...(newTab ? { target: "_blank", rel: "noopener" } : {})}>
      {content}
    </Link>
  );
}

/** Small text link with an arrow, used in cards and lists. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-1.5 text-sm font-semibold text-ink-950", className)}>
      <span className="underline decoration-ink-950/20 underline-offset-4 transition-colors group-hover:decoration-gold-500">
        {children}
      </span>
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}

/* ---------- Chips & badges ---------- */

export function Chip({ children, tone = "light", className }: { children: ReactNode; tone?: "light" | "dark" | "gold"; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium whitespace-nowrap",
        tone === "light" && "bg-ink-950/[0.05] text-ink-700",
        tone === "dark" && "bg-white/10 text-white/80",
        tone === "gold" && "bg-gold-100 text-gold-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ---------- Media ---------- */

/**
 * Image slot. Shows the real photo when `src` is provided,
 * otherwise a neutral, clearly-labelled placeholder (no stock / AI imagery).
 */
export function Photo({
  src,
  alt,
  label,
  className,
  tone = "light",
  sizes = "(min-width: 1024px) 33vw, 100vw",
  focus,
}: {
  src?: string;
  alt?: string;
  label: string;
  className?: string;
  tone?: "light" | "dark";
  sizes?: string;
  /** CSS object-position, e.g. "center 20%" */
  focus?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl",
        tone === "light" ? "bg-paper-2 text-ink-950/[0.07]" : "bg-white/[0.04] text-white/[0.06]",
        className,
      )}
    >
      {src ? (
        <Image src={src} alt={alt ?? label} fill sizes={sizes} className="object-cover" style={{ objectPosition: focus }} />
      ) : (
        <>
          <div className="bg-dots absolute inset-0" aria-hidden />
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 text-xs font-medium",
              tone === "light" ? "text-ink-400" : "text-white/60",
            )}
          >
            <Camera className="size-3.5" aria-hidden />
            <span>{label}</span>
          </div>
        </>
      )}
    </div>
  );
}

/* ---------- Brand ---------- */

export function Emblem({ className, preload }: { className?: string; preload?: boolean }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-ink-950", className)}>
      <Image
        src="/brand/iiiaes-emblem.jpg"
        alt="IIIAES emblem"
        fill
        sizes="(min-width: 1024px) 420px, 160px"
        preload={preload}
        className="scale-[1.03] object-cover"
      />
    </span>
  );
}
