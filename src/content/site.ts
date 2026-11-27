import type { NavItem, NavLink } from "@/lib/types";

/**
 * Institution-wide settings.
 * ⚠ Values marked PLACEHOLDER must be replaced with verified details from the institution.
 */
export const site = {
  name: "International Institute of Indian Acupuncture Science",
  shortName: "IIIAES",
  description:
    "International Institute of Indian Acupuncture Science (IIIAES) — academic programmes, admissions, notices and affiliated academies in acupuncture science.",
  // Set NEXT_PUBLIC_SITE_URL to the final domain (e.g. https://www.iiiaes.in). On Vercel the production domain is used automatically.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"),
  address: {
    line1: "Mukkam", // PLACEHOLDER — full street address pending
    city: "Kozhikode",
    state: "Kerala",
    postalCode: "673602", // PLACEHOLDER — verify PIN code
    country: "India",
  },
  contact: {
    phone: "+91 90000 00000", // PLACEHOLDER
    phoneHref: "tel:+919000000000", // PLACEHOLDER
    whatsappHref: "https://wa.me/919000000000", // PLACEHOLDER
    email: "info@iiiaes.example", // PLACEHOLDER
    hours: "Mon – Sat, 9:30 AM – 5:00 PM", // PLACEHOLDER
  },
  mapEmbed:
    "https://maps.google.com/maps?q=Mukkam%2C%20Kozhikode%2C%20Kerala&z=14&output=embed",
  mapLink: "https://maps.google.com/?q=Mukkam,Kozhikode,Kerala",
  // Links with href "#" are hidden until the real URLs are added.
  social: [
    // PLACEHOLDER — official social links pending
    { label: "Instagram", href: "#" },
    { label: "Facebook", href: "#" },
    { label: "YouTube", href: "#" },
  ],
  copyrightYear: 2026,
} as const;

export const mainNav: NavItem[] = [
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About IIIAES", href: "/about", description: "Overview, vision, mission and history" },
      { label: "Leadership", href: "/about#leadership", description: "The people guiding the institute" },
      { label: "Research & Publications", href: "/research", description: "Research activity and academic work" },
      { label: "Student Life", href: "/student-life", description: "Learning environment and activities" },
      { label: "Gallery", href: "/gallery", description: "Campus, sessions and events" },
    ],
  },
  {
    label: "Academics",
    href: "/academics",
    children: [
      { label: "Courses & Programmes", href: "/courses", description: "Full catalogue with eligibility" },
      { label: "Academic Approach", href: "/academics", description: "Theory, practice and clinical training" },
      { label: "Academic Calendar", href: "/academics#calendar", description: "Exams, deadlines and events" },
      { label: "Downloads", href: "/downloads", description: "Prospectus, forms and syllabus" },
    ],
  },
  { label: "Admissions", href: "/admissions" },
  {
    label: "Affiliation",
    href: "/affiliation",
    children: [
      { label: "Affiliation Overview", href: "/affiliation", description: "Criteria and process for institutions" },
      { label: "Affiliated Academies", href: "/academies", description: "Directory of approved centres" },
      { label: "Apply for Affiliation", href: "/affiliation#apply", description: "Submit an institutional enquiry" },
    ],
  },
  { label: "Notices", href: "/notices" },
  { label: "Mukkam Academy", href: "/mukkam" },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Institute",
    links: [
      { label: "About IIIAES", href: "/about" },
      { label: "Leadership", href: "/about#leadership" },
      { label: "Research & Publications", href: "/research" },
      { label: "Student Life", href: "/student-life" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    title: "Academics",
    links: [
      { label: "Courses & Programmes", href: "/courses" },
      { label: "Academic Approach", href: "/academics" },
      { label: "Academic Calendar", href: "/academics#calendar" },
      { label: "Downloads", href: "/downloads" },
    ],
  },
  {
    title: "Admissions",
    links: [
      { label: "How to Apply", href: "/admissions" },
      { label: "Eligibility", href: "/admissions#eligibility" },
      { label: "Notices & Circulars", href: "/notices" },
      { label: "Affiliation", href: "/affiliation" },
      { label: "Affiliated Academies", href: "/academies" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];
