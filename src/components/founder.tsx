import { Quote } from "lucide-react";
import type { Leader } from "@/content/leadership";
import { ArrowLink, Eyebrow, Photo } from "@/components/ui/primitives";

/**
 * Founder / leader feature, used on the homepage and the About page.
 * Shows the leader's own `message` as a quote when supplied; otherwise a neutral third-person introduction.
 */
export function FounderFeature({ leader, intro, link }: { leader: Leader; intro: string; link?: { label: string; href: string } }) {
  return (
    <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-[28px] bg-ink-950 p-2 text-white sm:grid-cols-[minmax(0,18rem)_1fr] lg:grid-cols-[minmax(0,24rem)_1fr]">
      <Photo
        src={leader.photo}
        alt={`${leader.name}, ${leader.role}`}
        label={leader.name}
        tone="dark"
        focus={leader.focus}
        className="aspect-[4/5] rounded-[22px] sm:aspect-auto sm:min-h-[26rem]"
        sizes="(min-width:1024px) 24rem, (min-width:640px) 18rem, 100vw"
      />
      <div className="flex flex-col p-5 sm:p-8 lg:p-12">
        <Eyebrow tone="dark">{leader.role}</Eyebrow>
        <h3 className="mt-5 font-display text-3xl leading-tight font-medium tracking-[-0.03em] sm:text-4xl lg:text-5xl">{leader.name}</h3>
        {leader.qualifications && <p className="mt-3 text-sm font-medium tracking-wide text-gold-300">{leader.qualifications}</p>}

        {leader.message ? (
          <blockquote className="mt-8 border-l-2 border-gold-400 pl-5">
            <Quote className="size-6 text-gold-400" aria-hidden />
            <p className="mt-3 font-display text-xl leading-snug text-white/90 sm:text-2xl">{leader.message}</p>
          </blockquote>
        ) : (
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{intro}</p>
        )}

        {link && (
          <div className="mt-auto pt-8">
            <ArrowLink href={link.href} className="text-white [&>span]:decoration-white/30">
              {link.label}
            </ArrowLink>
          </div>
        )}
      </div>
    </div>
  );
}
