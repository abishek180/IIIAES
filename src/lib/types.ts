/**
 * Content models for the IIIAES websites.
 * These mirror the future CMS collections (Courses, Notices, Academies, ...)
 * so the static content in /src/content can be swapped for a CMS without UI changes.
 */

export type LearningMode = "Offline" | "Online" | "Hybrid";

export type CourseLevel =
  | "Undergraduate"
  | "Postgraduate Diploma"
  | "Diploma"
  | "Certificate";

export type Course = {
  slug: string;
  title: string;
  level: CourseLevel;
  qualification: string;
  summary: string;
  overview: string[];
  duration: string;
  eligibility: string[];
  modes: LearningMode[];
  structure: { title: string; items: string[] }[];
  practicalTraining?: string;
  /** Academy slugs where this course is offered */
  centres: string[];
  admissionSteps: string[];
  fees?: string;
  awardingBody: string;
  faqs: { q: string; a: string }[];
  featured?: boolean;
};

export type NoticeCategory =
  | "Admission"
  | "Examination"
  | "Timetable"
  | "Deadline"
  | "Late Fee"
  | "Academic Calendar"
  | "Results"
  | "Circular"
  | "Events";

export type NoticePriority = "normal" | "important" | "urgent";

export type Notice = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
  category: NoticeCategory;
  priority: NoticePriority;
  /** ISO date (YYYY-MM-DD) */
  publishedAt: string;
  effectiveAt?: string;
  deadline?: string;
  pinned?: boolean;
  attachments?: { label: string; size?: string }[];
  related?: { label: string; href: string };
  /** Which website(s) show this notice. Defaults to both. */
  scope?: SiteKey | "both";
  /** In the CMS this is derived from the expiry date automatically */
  archived?: boolean;
};

export type Academy = {
  slug: string;
  name: string;
  location: string;
  district: string;
  state: string;
  summary: string;
  phone?: string;
  email?: string;
  /** Course slugs */
  courses: string[];
  status: "Active" | "Verification pending";
  validUntil?: string;
  flagship?: boolean;
  image?: string;
  website?: string;
};

export type CalendarEventType = "Admission" | "Examination" | "Academic" | "Workshop";

export type CalendarEvent = {
  date: string;
  endDate?: string;
  title: string;
  type: CalendarEventType;
  location?: string;
};

export type DownloadCategory = "Prospectus" | "Application Forms" | "Syllabus" | "Circulars";

export type DownloadItem = {
  title: string;
  category: DownloadCategory;
  description?: string;
  fileType: "PDF" | "DOCX";
  size?: string;
  updated: string;
  /** null until the institution supplies the document */
  href: string | null;
};

export type GalleryCategory = "Campus" | "Academic" | "Clinical" | "Events";

export type GalleryItem = {
  title: string;
  category: GalleryCategory;
  shape: "tall" | "wide" | "square";
  src?: string;
};

export type NavLink = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = NavLink & {
  children?: NavLink[];
};

export type SearchEntry = {
  title: string;
  href: string;
  section: "Page" | "Course" | "Notice" | "Academy";
  keywords?: string;
};

export type SiteKey = "institute" | "academy";

/** Per-site configuration for the shared header, menu, footer and action bar. */
export type HeaderConfig = {
  brand: { title: string; subtitle: string; subtitleShort: string; href: string };
  nav: NavItem[];
  cta: NavLink;
  contactHref: string;
  /** Large tiles at the top of the mobile menu */
  quickLinks: NavLink[];
  /** Link to the sister site, shown at the bottom of the mobile menu */
  crossLink?: NavLink;
  /** Gold strip shown above the header on the home page only */
  announcement?: { text: string; short: string; href: string; cta: string };
  contact: { phoneHref: string; whatsappHref: string; email: string };
};

export type ContactInfo = {
  address: { line1: string; city: string; state: string; postalCode: string; country: string };
  contact: { phone: string; phoneHref: string; whatsappHref: string; email: string; hours: string };
  mapEmbed: string;
  mapLink: string;
};
