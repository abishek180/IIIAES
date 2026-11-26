import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import type { ContactInfo, GalleryItem } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ButtonLink, Container, Em, Photo, Section, SectionHeading } from "@/components/ui/primitives";

const shapeClass: Record<GalleryItem["shape"], string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  return (
    <ul className="grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-2 sm:auto-rows-[12rem] sm:gap-3 lg:grid-cols-4">
      {items.map((g) => (
        <li key={g.title} className={shapeClass[g.shape]}>
          <Photo src={g.src} label={g.title} className="h-full" sizes="(min-width:1024px) 25vw, 50vw" />
        </li>
      ))}
    </ul>
  );
}

export function AffiliationCta() {
  return (
    <Section className="py-6 sm:py-6">
      <div className="px-2 sm:px-3">
        <div className="relative overflow-hidden rounded-[28px] bg-gold-400 text-ink-950">
          <div className="pointer-events-none absolute -right-24 -bottom-32 size-[28rem] rounded-full border-[3rem] border-ink-950/[0.06]" aria-hidden />
          <div className="pointer-events-none absolute -right-4 -bottom-12 size-[14rem] rounded-full border-[2rem] border-ink-950/[0.06]" aria-hidden />
          <Container className="relative flex flex-col gap-8 py-14 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold tracking-[0.16em] text-ink-950/60 uppercase">For institutions</p>
              <h2 className="mt-4 font-display text-[2rem] leading-[1.04] font-medium tracking-[-0.03em] text-balance sm:text-5xl">
                Offer IIIAES programmes at <em className="font-display text-ink-950/55 not-italic">your institution.</em>
              </h2>
              <p className="mt-4 max-w-xl text-base text-ink-950/70 sm:text-lg">
                Eligible institutions can apply for affiliation. Review the criteria and submit an enquiry — our team will guide you through the process.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/affiliation#apply" variant="dark">
                Apply for affiliation
              </ButtonLink>
              <ButtonLink href="/affiliation" variant="outline-dark">
                View criteria
              </ButtonLink>
            </div>
          </Container>
        </div>
      </div>
    </Section>
  );
}

export function ContactBlock({
  heading = true,
  className,
  info = site,
  contactHref = "/contact",
}: {
  heading?: boolean;
  className?: string;
  info?: ContactInfo;
  contactHref?: string;
}) {
  const channels = [
    { icon: Phone, label: "Call us", value: info.contact.phone, href: info.contact.phoneHref },
    { icon: MessageCircle, label: "WhatsApp", value: "Chat with admissions", href: info.contact.whatsappHref, external: true },
    { icon: Mail, label: "Email", value: info.contact.email, href: `mailto:${info.contact.email}` },
    { icon: MapPin, label: "Visit", value: `${info.address.line1}, ${info.address.city}`, href: info.mapLink, external: true },
  ];
  return (
    <div className={className}>
      {heading && (
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              We’re here to <Em>help.</Em>
            </>
          }
          description="Questions about courses, eligibility or admissions? Reach the institute directly."
          action={<ButtonLink href={contactHref} variant="outline-dark">Contact page</ButtonLink>}
        />
      )}
      <div className={cn("grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1.2fr]", heading && "mt-10")}>
        <div className="grid gap-3 sm:grid-cols-2">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-col rounded-3xl bg-white p-6 ring-1 ring-ink-950/[0.04] transition-colors hover:bg-ink-950 hover:text-white"
            >
              <span className="grid size-11 place-items-center rounded-full bg-paper text-ink-950 transition-colors group-hover:bg-gold-400" aria-hidden>
                <c.icon className="size-5" />
              </span>
              <span className="mt-8 text-xs text-ink-500 transition-colors group-hover:text-white/60">{c.label}</span>
              <span className="mt-1 font-medium break-words">{c.value}</span>
            </a>
          ))}
          <div className="flex items-center gap-3 rounded-3xl bg-white px-6 py-5 text-sm text-ink-600 ring-1 ring-ink-950/[0.04] sm:col-span-2">
            <Clock className="size-4 shrink-0 text-gold-600" aria-hidden />
            Office hours: {info.contact.hours}
          </div>
        </div>
        <div className="min-h-80 overflow-hidden rounded-3xl bg-paper-2 ring-1 ring-ink-950/[0.04]">
          <iframe
            src={info.mapEmbed}
            title={`Map showing ${info.address.line1}, ${info.address.city}`}
            className="h-full min-h-80 w-full grayscale-[0.4]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

export function ContactSection({ info, contactHref }: { info?: ContactInfo; contactHref?: string }) {
  return (
    <Section>
      <Container>
        <ContactBlock info={info} contactHref={contactHref} />
      </Container>
    </Section>
  );
}
