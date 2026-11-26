import { Suspense } from "react";
import { SiteHeader, SiteHeaderWithPath } from "@/components/layout/site-header";
import { SiteFooter, type FooterConfig } from "@/components/layout/site-footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { Em } from "@/components/ui/primitives";
import { getNotices, getSearchIndex } from "@/lib/data";
import { footerNav, mainNav, site } from "@/content/site";
import type { HeaderConfig } from "@/lib/types";

const header: HeaderConfig = {
  brand: {
    title: site.shortName,
    subtitle: site.name,
    subtitleShort: "Indian Acupuncture Science",
    href: "/",
  },
  nav: mainNav,
  cta: { label: "Apply now", href: "/admissions" },
  contactHref: "/contact",
  quickLinks: [
    { label: "Courses", href: "/courses" },
    { label: "Admissions", href: "/admissions" },
    { label: "Notices", href: "/notices" },
    { label: "Downloads", href: "/downloads" },
  ],
  crossLink: { label: "IIIAES Mukkam Academy", href: "/mukkam", description: "Campus, facilities and admissions at Mukkam" },
  contact: { phoneHref: site.contact.phoneHref, whatsappHref: site.contact.whatsappHref, email: site.contact.email },
};

const footer: FooterConfig = {
  brand: { title: site.shortName, subtitle: site.name, href: "/" },
  ctaTitle: (
    <>
      Begin your journey in <Em tone="dark">acupuncture science.</Em>
    </>
  ),
  primary: { label: "Apply for admission", href: "/admissions" },
  secondary: { label: "Explore courses", href: "/courses" },
  columns: [
    footerNav[0],
    footerNav[1],
    { ...footerNav[2], links: [...footerNav[2].links, { label: "Mukkam Academy", href: "/mukkam" }] },
  ],
  info: site,
  watermark: "IIIAES",
};

export default function InstituteLayout({ children }: LayoutProps<"/">) {
  const searchIndex = getSearchIndex();
  const hasUrgentNotice = getNotices({ site: "institute" }).some((n) => n.priority === "urgent");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: `${site.url}/brand/iiiaes-emblem.jpg`,
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.line1,
      addressRegion: site.address.state,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Suspense fallback={<SiteHeader pathname="" config={header} searchIndex={searchIndex} />}>
        <SiteHeaderWithPath config={header} searchIndex={searchIndex} />
      </Suspense>
      <main id="main">{children}</main>
      <SiteFooter config={footer} />
      <MobileActionBar
        items={[
          { label: "Courses", href: "/courses", icon: "courses" },
          { label: "Notices", href: "/notices", icon: "notices", badge: hasUrgentNotice },
          { label: "Apply", href: "/admissions", icon: "apply" },
          { label: "WhatsApp", href: site.contact.whatsappHref, icon: "whatsapp" },
        ]}
      />
    </>
  );
}
