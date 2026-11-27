import Image from "next/image";
import { Quote } from "lucide-react";
import type { Leader } from "@/content/leadership";
import { cn } from "@/lib/utils";
import { ArrowLink, Eyebrow, Photo } from "@/components/ui/primitives";

/**
 * Leader feature card, used on the homepage and the About page.
 * Shows the leader's own `message` as a quote when supplied; otherwise a neutral third-person introduction.
 * `partners` renders a compact row of other leaders (e.g. the Co-Founder) inside the card.
 */
export function FounderFeature({
  leader,
  intro,
  link,
  tone = "dark",
  reverse = false,
  partners = [],
}: {
  leader: Leader;
  intro: string;
  link?: { label: string; href: string };
  tone?: "dark" | "light";
  reverse?: boolean;
  partners?: Leader[];
}) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-2 overflow-hidden rounded-[28px] p-2",
        dark ? "bg-ink-950 text-white" : "bg-white text-ink-950 ring-1 ring-ink-950/[0.05]",
        reverse ? "sm:grid-cols-[1fr_minmax(0,18rem)] lg:grid-cols-[1fr_minmax(0,24rem)]" : "sm:grid-cols-[minmax(0,18rem)_1fr] lg:grid-cols-[minmax(0,24rem)_1fr]",
      )}
    >
      <Photo
        src={leader.photo}
        alt={`${leader.name}, ${leader.role}`}
        label={leader.name}
        tone={dark ? "dark" : "light"}
        focus={leader.focus}
        className={cn("aspect-[4/5] rounded-[22px] sm:aspect-auto sm:min-h-[26rem]", reverse && "sm:order-2")}
        sizes="(min-width:1024px) 24rem, (min-width:640px) 18rem, 100vw"
      />
      <div className={cn("flex flex-col p-5 sm:p-8 lg:p-12", reverse && "sm:order-1")}>
        <Eyebrow tone={dark ? "dark" : "light"}>{leader.role}</Eyebrow>
        <h3 className="mt-5 font-display text-3xl leading-tight font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">{leader.name}</h3>
        {leader.qualifications && (
          <p className={cn("mt-3 text-sm font-medium tracking-wide", dark ? "text-gold-300" : "text-gold-700")}>{leader.qualifications}</p>
        )}

        {leader.message ? (
          <figure className="mt-8">
            <Quote className="size-7 text-gold-400" aria-hidden />
            <blockquote className={cn("mt-4 space-y-4 border-l-2 border-gold-400 pl-5 text-base leading-relaxed sm:text-lg", dark ? "text-white/85" : "text-ink-700")}>
              {leader.message.map((para, i) =>
                i === leader.message!.length - 1 ? (
                  <p key={i} className={cn("font-display text-xl leading-snug font-medium sm:text-2xl", dark ? "text-gold-300" : "text-gold-700")}>
                    {para}
                  </p>
                ) : (
                  <p key={i}>{para}</p>
                ),
              )}
            </blockquote>
            <figcaption className={cn("mt-5 pl-5 text-sm font-semibold", dark ? "text-white" : "text-ink-950")}>— {leader.name}</figcaption>
          </figure>
        ) : (
          <p className={cn("mt-8 max-w-xl text-base leading-relaxed sm:text-lg", dark ? "text-white/75" : "text-ink-600")}>{intro}</p>
        )}

        {partners.length > 0 && (
          <ul className={cn("mt-8 flex flex-wrap gap-3 border-t pt-6", dark ? "border-white/10" : "border-line")}>
            {partners.map((p) => (
              <li key={p.name} className="flex items-center gap-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-2 ring-gold-400/60">
                  {p.photo && <Image src={p.photo} alt={p.name} fill sizes="48px" className="object-cover" style={{ objectPosition: p.focus }} />}
                </span>
                <span className="leading-tight">
                  <span className={cn("block text-[0.7rem] font-semibold tracking-[0.14em] uppercase", dark ? "text-white/60" : "text-ink-500")}>{p.role}</span>
                  <span className="block font-display font-medium">{p.name}</span>
                </span>
              </li>
            ))}
          </ul>
        )}

        {link && (
          <div className="mt-auto pt-8">
            <ArrowLink href={link.href} className={cn(dark && "text-white [&>span]:decoration-white/30")}>
              {link.label}
            </ArrowLink>
          </div>
        )}
      </div>
    </div>
  );
}
