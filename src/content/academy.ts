import type { ContactInfo, LearningMode, NavItem } from "@/lib/types";
import { site } from "@/content/site";

/**
 * IIIAES Mukkam Academy — academy-specific content.
 * ⚠ PLACEHOLDER values must be replaced with verified details before launch.
 */
export const academySite = {
  name: "IIIAES Mukkam Academy",
  shortName: "Mukkam Academy",
  basePath: "/mukkam",
  description:
    "IIIAES Mukkam Academy — study acupuncture in Mukkam, Kozhikode. Offline, online and hybrid programmes, practical training facilities and admissions for the 2027 batch.",
  /** PLACEHOLDER — the exact legal relationship with IIIAES must be confirmed (owned / affiliated / agreement). */
  affiliationNote: "An academy of the International Institute of Indian Acupuncture Science (IIIAES). Affiliation details to be confirmed.",
  admission: {
    open: true,
    batch: "2027 batch",
    deadline: "2027-01-31",
    classesStart: "2027-03-01",
  },
} as const;

export const academyContact: ContactInfo = {
  address: { ...site.address }, // PLACEHOLDER — academy street address pending
  contact: { ...site.contact }, // PLACEHOLDER — academy phone/WhatsApp may differ from the institute
  mapEmbed: site.mapEmbed,
  mapLink: site.mapLink,
};

const b = academySite.basePath;

export const academyNav: NavItem[] = [
  {
    label: "Academy",
    href: `${b}/about`,
    children: [
      { label: "About the Academy", href: `${b}/about`, description: "Overview, vision and relationship with IIIAES" },
      { label: "Campus & Facilities", href: `${b}/campus`, description: "Classrooms and practical learning spaces" },
      { label: "Faculty", href: `${b}/faculty`, description: "Teachers and their subjects" },
      { label: "Student Life", href: `${b}/student-life`, description: "Workshops, sessions and events" },
      { label: "Gallery", href: `${b}/gallery`, description: "Photos and videos from campus" },
    ],
  },
  {
    label: "Courses",
    href: `${b}/courses`,
    children: [
      { label: "All Courses", href: `${b}/courses`, description: "Programmes available at Mukkam" },
      { label: "Learning Modes", href: `${b}/learning-modes`, description: "Offline, online and hybrid study" },
      { label: "FAQs", href: `${b}/faqs`, description: "Answers to common questions" },
    ],
  },
  { label: "Admissions", href: `${b}/admissions` },
  { label: "News", href: `${b}/news` },
  { label: "IIIAES Institute", href: "/" },
];

/** Academy-specific details layered on top of central course data. SAMPLE CONTENT. */
export const offerings: Record<string, { nextBatch: string; modes: LearningMode[]; schedule: string; seats?: string }> = {
  "bsc-acupuncture-science": { nextBatch: "March 2027", modes: ["Offline", "Hybrid"], schedule: "Weekdays, 9:30 AM – 3:30 PM" },
  "diploma-in-acupuncture": { nextBatch: "March 2027", modes: ["Offline", "Online", "Hybrid"], schedule: "Weekday or weekend batches" },
  "pg-diploma-clinical-acupuncture": { nextBatch: "April 2027", modes: ["Hybrid"], schedule: "Weekend contact sessions" },
  "certificate-in-acupressure": { nextBatch: "Monthly intake", modes: ["Offline", "Online"], schedule: "Weekend batches" },
};

export const learningModes: { mode: LearningMode; title: string; summary: string; points: string[] }[] = [
  {
    mode: "Offline",
    title: "Offline at Mukkam",
    summary: "Full classroom learning on campus with daily faculty contact.",
    points: ["Classes at the Mukkam campus", "Hands-on practical sessions every week", "Direct access to library and faculty"],
  },
  {
    mode: "Online",
    title: "Online classes",
    summary: "Live and recorded theory classes you can join from anywhere.",
    points: ["Live online lectures", "Study material shared digitally", "Practical components at campus, where required"],
  },
  {
    mode: "Hybrid",
    title: "Hybrid learning",
    summary: "Theory online, practical training in person — ideal for working learners.",
    points: ["Online theory modules", "Scheduled in-person practical blocks", "Supervised clinical sessions on campus"],
  },
];

/** PLACEHOLDER — describe only verified infrastructure. */
export const facilities = [
  { title: "Classrooms", text: "Bright, well-ventilated classrooms designed for focused theory sessions.", img: "/images/stock/students-writing.jpg" },
  { title: "Practical training room", text: "A dedicated space for supervised practical sessions and technique practice.", img: "/images/stock/acupuncture-treatment.jpg" },
  { title: "Clinical training", text: "Supervised clinical exposure for students in eligible programmes.", img: "/images/stock/acupuncture-needles.jpg" },
  { title: "Anatomy & study aids", text: "Models and visual aids to support anatomy and physiology learning.", img: "/images/stock/anatomy-model.jpg" },
  { title: "Library & reading space", text: "Reference books and a quiet space for self-study.", img: "/images/stock/library-reading.jpg" },
  { title: "Seminar space", text: "Room for workshops, guest sessions and academic events.", img: "/images/stock/seminar-speaker.jpg" },
];

/** PLACEHOLDER — faculty names, photos and qualifications must be supplied by the academy. */
export const faculty = [
  { name: "Faculty profile pending", role: "Principal", subjects: "Acupuncture principles" },
  { name: "Faculty profile pending", role: "Senior Faculty", subjects: "Clinical practice" },
  { name: "Faculty profile pending", role: "Faculty", subjects: "Anatomy & physiology" },
  { name: "Faculty profile pending", role: "Faculty", subjects: "Acupressure & practical training" },
];

export const whyStudy = [
  { title: "Practice from the start", text: "Practical sessions begin early, so theory is always connected to technique." },
  { title: "Small, guided batches", text: "Faculty can give individual attention during practical work." },
  { title: "Flexible modes", text: "Choose offline, online or hybrid study to fit your life." },
  { title: "Part of IIIAES", text: "Programmes follow the IIIAES curriculum and academic standards." },
];

export const activities = [
  { title: "Practical workshops", text: "Hands-on workshops on techniques and case handling.", img: "/images/stock/seminar-speaker.jpg" },
  { title: "Clinical sessions", text: "Supervised sessions that build real-world confidence.", img: "/images/stock/acupuncture-treatment.jpg" },
  { title: "Celebrations", text: "Onam, orientation days and certificate ceremonies.", img: "/images/stock/onam-celebration.jpg" },
];

export const academyFaqs: { group: string; items: { q: string; a: string }[] }[] = [
  {
    group: "Admissions",
    items: [
      { q: "How do I apply?", a: "Fill in the online application on the Admissions page. The admissions office will call you to verify details and documents." },
      { q: "What is the last date to apply?", a: "Applications for the 2027 batch close on 31 January 2027, or earlier if seats fill up." },
      { q: "Which documents do I need?", a: "Mark sheets and certificates of your qualifying exam, proof of age, photo ID and passport-size photographs." },
    ],
  },
  {
    group: "Courses & learning",
    items: [
      { q: "Can I study online?", a: "Yes, for selected programmes. Practical components may require attendance at the Mukkam campus." },
      { q: "Are there weekend batches?", a: "Weekend batches are available for some programmes. Check the course page for the schedule." },
      { q: "Who awards the qualification?", a: "Certification and awarding body details will be published in the official prospectus." },
    ],
  },
  {
    group: "Campus",
    items: [
      { q: "Where is the academy?", a: "The academy is in Mukkam, Kozhikode district, Kerala. See the Contact page for the map and directions." },
      { q: "Can I visit before applying?", a: "Yes. Call or WhatsApp the academy to arrange a campus visit during office hours." },
    ],
  },
];
