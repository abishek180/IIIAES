import type { Academy, CalendarEvent, DownloadItem, GalleryItem } from "@/lib/types";

/**
 * SAMPLE CONTENT — affiliated academies must be verified before publishing.
 * Only list academies with a confirmed affiliation.
 */
export const academies: Academy[] = [
  {
    slug: "mukkam",
    name: "IIIAES Mukkam Academy",
    location: "Mukkam",
    district: "Kozhikode",
    state: "Kerala",
    summary:
      "The academy campus at Mukkam offering offline, online and hybrid programmes with dedicated practical learning spaces.",
    courses: ["bsc-acupuncture-science", "diploma-in-acupuncture", "pg-diploma-clinical-acupuncture", "certificate-in-acupressure"],
    status: "Active",
    flagship: true,
    image: "/images/campus/iiiaes-campus.jpg",
    website: "/mukkam",
  },
  {
    slug: "sample-academy-malappuram",
    name: "Sample Affiliated Academy",
    location: "Malappuram",
    district: "Malappuram",
    state: "Kerala",
    summary: "Placeholder profile to demonstrate the directory layout. Replace with a verified affiliated academy.",
    courses: ["diploma-in-acupuncture", "certificate-in-acupressure"],
    status: "Verification pending",
    image: "/images/campus/academy-malappuram.jpg",
  },
  {
    slug: "sample-academy-thrissur",
    name: "Sample Affiliated Academy",
    location: "Thrissur",
    district: "Thrissur",
    state: "Kerala",
    summary: "Placeholder profile to demonstrate the directory layout. Replace with a verified affiliated academy.",
    courses: ["certificate-in-acupressure"],
    status: "Verification pending",
    image: "/images/campus/academy-thrissur.jpg",
  },
];

/** SAMPLE CONTENT */
export const calendar: CalendarEvent[] = [
  { date: "2026-11-30", title: "Examination registration closes", type: "Examination" },
  { date: "2026-12-08", endDate: "2026-12-19", title: "Semester examinations", type: "Examination", location: "Mukkam campus" },
  { date: "2027-01-16", endDate: "2027-01-17", title: "Clinical case management workshop", type: "Workshop", location: "Mukkam campus" },
  { date: "2027-01-31", title: "Last date for 2027 admission applications", type: "Admission" },
  { date: "2027-02-15", title: "Orientation for the 2027 batch", type: "Academic" },
  { date: "2027-03-01", title: "Classes commence — 2027 batch", type: "Academic" },
];

/** SAMPLE CONTENT — href is null until the document is uploaded */
export const downloads: DownloadItem[] = [
  { title: "Prospectus 2027", category: "Prospectus", description: "Programmes, eligibility, fees and campus information", fileType: "PDF", size: "4.2 MB", updated: "2026-11-20", href: null },
  { title: "Admission application form", category: "Application Forms", description: "Printable form for offline applications", fileType: "PDF", size: "310 KB", updated: "2026-11-20", href: null },
  { title: "Affiliation application form", category: "Application Forms", description: "For institutions applying for affiliation", fileType: "DOCX", size: "95 KB", updated: "2026-10-01", href: null },
  { title: "BSc Acupuncture Science — syllabus", category: "Syllabus", fileType: "PDF", size: "1.1 MB", updated: "2026-09-12", href: null },
  { title: "Diploma in Acupuncture — syllabus", category: "Syllabus", fileType: "PDF", size: "640 KB", updated: "2026-09-12", href: null },
  { title: "Examination timetable — December 2026", category: "Circulars", fileType: "PDF", size: "180 KB", updated: "2026-11-18", href: null },
  { title: "Academic calendar 2027", category: "Circulars", fileType: "PDF", size: "120 KB", updated: "2026-10-28", href: null },
];

/** Placeholders until authentic photography is supplied (add `src` to show the real image). */
export const gallery: GalleryItem[] = [
  { title: "Campus entrance", category: "Campus", shape: "wide", src: "/images/campus/iiiaes-campus.jpg" },
  { title: "Practical session", category: "Academic", shape: "tall", src: "/images/stock/acupuncture-treatment.jpg" },
  { title: "Study hall", category: "Campus", shape: "square", src: "/images/campus/study-hall.jpg" },
  { title: "Clinical training", category: "Clinical", shape: "square", src: "/images/stock/acupuncture-needles.jpg" },
  { title: "Practical lab", category: "Clinical", shape: "square", src: "/images/stock/anatomy-model.jpg" },
  { title: "Annual event", category: "Events", shape: "square", src: "/images/campus/standing-ovation.jpg" },
  { title: "Seminar session", category: "Academic", shape: "wide", src: "/images/campus/students-studying.jpg" },
  { title: "Consultation room", category: "Clinical", shape: "wide", src: "/images/campus/consultation-room.jpg" },
];
