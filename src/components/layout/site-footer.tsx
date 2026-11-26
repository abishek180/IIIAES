import Link from "next/link";
import type { ReactNode } from "react";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { legalLinks, site } from "@/content/site";
import type { ContactInfo, NavLink } from "@/lib/types";
import { ButtonLink, Emblem } from "@/components/ui/primitives";

export type FooterConfig = {
  brand: { title: string; subtitle: string; href: string };
  ctaTitle: ReactNode;
  primary: NavLink;
  secondary: NavLink;
  columns: { title: string; links: NavLink[] }[];
  info: ContactInfo;
  /** Small line under the brand, e.g. institutional affiliation details */
  note?: ReactNode;
  watermark: string;
};

export function SiteFooter({ config }: { config: FooterConfig }) {
  const { info } = config;
  return (
    <footer className="px-2 pb-24 sm:px-3 sm:pb-3 lg:pb-3">
      <div className="relative overflow-hidden rounded-[28px] bg-ink-950 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          {/* CTA */}
          <div className="flex flex-col gap-8 border-b border-white/10 py-14 sm:py-20 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-2xl font-display text-4xl leading-[1.02] font-medium tracking-[-0.035em] text-balance sm:text-6xl">{config.ctaTitle}</h2>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={config.primary.href}>{config.primary.label}</ButtonLink>
              <ButtonLink href={config.secondary.href} variant="outline-light">
                {config.secondary.label}
              </ButtonLink>
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Link href={config.brand.href} className="flex items-center gap-3">
                <Emblem className="size-14" />
                <span className="font-display text-lg leading-tight font-semibold">
                  {config.brand.title}
                  <span className="block text-xs font-normal text-white/50">{config.brand.subtitle}</span>
                </span>
              </Link>
              {config.note && <p className="mt-5 max-w-sm text-xs leading-relaxed text-white/45">{config.note}</p>}
              <ul className="mt-8 space-y-3 text-sm text-white/70">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                  <span>
                    {info.address.line1}, {info.address.city}, {info.address.state} {info.address.postalCode}, {info.address.country}
                  </span>
                </li>
                <li>
                  <a href={info.contact.phoneHref} className="flex gap-3 hover:text-white">
                    <Phone className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                    {info.contact.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${info.contact.email}`} className="flex gap-3 hover:text-white">
                    <Mail className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                    {info.contact.email}
                  </a>
                </li>
                <li>
                  <a href={info.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-white">
                    <MessageCircle className="mt-0.5 size-4 shrink-0 text-gold-400" aria-hidden />
                    WhatsApp the admissions office
                  </a>
                </li>
              </ul>
            </div>
            {config.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-white/40 uppercase">{col.title}</p>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[0.92rem] text-white/75 transition-colors hover:text-gold-300">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col gap-4 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {site.copyrightYear} {site.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <Link key={l.label} href={l.href} className="hover:text-white">
                  {l.label}
                </Link>
              ))}
              {site.social.map((s) => (
                <a key={s.label} href={s.href} className="hover:text-white">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-20 -bottom-24 select-none font-display text-[11rem] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap text-white/[0.03] sm:text-[18rem]" aria-hidden>
          {config.watermark}
        </div>
      </div>
    </footer>
  );
}
