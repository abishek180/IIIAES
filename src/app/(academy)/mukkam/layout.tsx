import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader, SiteHeaderWithPath } from "@/components/layout/site-header";
import { SiteFooter, type FooterConfig } from "@/components/layout/site-footer";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { Em } from "@/components/ui/primitives";
import { getAcademySearchIndex } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { academyContact, academyNav, academySite } from "@/content/academy";
import { site } from "@/content/site";
import type { HeaderConfig } from "@/lib/types";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: {
    default: `${academySite.name} — Study acupuncture in Mukkam, Kozhikode`,
    template: `%s · ${academySite.shortName}`,
  },
  description: academySite.description,
  alternates: { canonical: b },
  openGraph: { siteName: academySite.name, locale: "en_IN", type: "website" },
};

const deadline = formatDate(academySite.admission.deadline);

const header: HeaderConfig = {
  brand: { title: academySite.shortName, subtitle: `${academySite.name} · Kozhikode`, subtitleShort: "IIIAES · Kozhikode", href: b },
  nav: academyNav,
  cta: { label: "Apply now", href: `${b}/admissions#apply` },
  contactHref: `${b}/contact`,
  quickLinks: [
    { label: "Courses", href: `${b}/courses` },
    { label: "Admissions", href: `${b}/admissions` },
    { label: "News", href: `${b}/news` },
    { label: "Contact", href: `${b}/contact` },
  ],
  crossLink: { label: "IIIAES main website", href: "/", description: "International Institute of Indian Acupuncture Science" },
  announcement: academySite.admission.open
    ? {
        text: `Admissions open for the ${academySite.admission.batch} · Apply by ${deadline}`,
        short: `Admissions open · Apply by ${deadline}`,
        href: `${b}/admissions#apply`,
        cta: "Apply",
      }
    : undefined,
  contact: { phoneHref: academyContact.contact.phoneHref, whatsappHref: academyContact.contact.whatsappHref, email: academyContact.contact.email },
};

const footer: FooterConfig = {
  brand: { title: academySite.shortName, subtitle: academySite.name, href: b },
  ctaTitle: (
    <>
      Your seat in the <Em tone="dark">{academySite.admission.batch}</Em> is waiting.
    </>
  ),
  primary: { label: "Apply now", href: `${b}/admissions#apply` },
  secondary: { label: "Book a campus visit", href: `${b}/contact` },
  columns: [
    {
      title: "Academy",
      links: [
        { label: "About the Academy", href: `${b}/about` },
        { label: "Campus & Facilities", href: `${b}/campus` },
        { label: "Faculty", href: `${b}/faculty` },
        { label: "Student Life", href: `${b}/student-life` },
        { label: "Gallery", href: `${b}/gallery` },
      ],
    },
    {
      title: "Study",
      links: [
        { label: "Courses", href: `${b}/courses` },
        { label: "Learning Modes", href: `${b}/learning-modes` },
        { label: "Admissions", href: `${b}/admissions` },
        { label: "FAQs", href: `${b}/faqs` },
      ],
    },
    {
      title: "Connect",
      links: [
        { label: "News & Updates", href: `${b}/news` },
        { label: "Contact & Directions", href: `${b}/contact` },
        { label: "IIIAES Main Website", href: "/" },
      ],
    },
  ],
  info: academyContact,
  note: academySite.affiliationNote,
};

export default function AcademyLayout({ children }: LayoutProps<"/mukkam">) {
  const searchIndex = getAcademySearchIndex();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: academySite.name,
    url: `${site.url}${b}`,
    logo: `${site.url}/brand/iiiaes-emblem.jpg`,
    telephone: academyContact.contact.phone,
    email: academyContact.contact.email,
    parentOrganization: { "@type": "EducationalOrganization", name: site.name, url: site.url },
    address: {
      "@type": "PostalAddress",
      addressLocality: academyContact.address.line1,
      addressRegion: academyContact.address.state,
      postalCode: academyContact.address.postalCode,
      addressCountry: "IN",
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Suspense fallback={<SiteHeader pathname="" config={header} searchIndex={[]} shell />}>
        <SiteHeaderWithPath config={header} searchIndex={searchIndex} />
      </Suspense>
      <main id="main">{children}</main>
      <SiteFooter config={footer} />
      <MobileActionBar
        items={[
          { label: "Courses", href: `${b}/courses`, icon: "courses" },
          { label: "Call", href: academyContact.contact.phoneHref, icon: "call" },
          { label: "Apply", href: `${b}/admissions#apply`, icon: "apply" },
          { label: "WhatsApp", href: academyContact.contact.whatsappHref, icon: "whatsapp" },
        ]}
      />
    </>
  );
}
