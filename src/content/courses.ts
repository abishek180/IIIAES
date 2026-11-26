import type { Course } from "@/lib/types";

/**
 * SAMPLE CONTENT — course names other than BSc Acupuncture Science, durations, eligibility,
 * structure and fees must be verified by the institution before publishing.
 * Awarding body details are intentionally left as "to be confirmed".
 */
const AWARDING_TBC = "Awarding body details to be confirmed by the institution";

export const courses: Course[] = [
  {
    slug: "bsc-acupuncture-science",
    title: "BSc Acupuncture Science",
    level: "Undergraduate",
    qualification: "Bachelor of Science in Acupuncture Science",
    summary:
      "A comprehensive undergraduate programme covering the foundations, methods and supervised clinical practice of acupuncture science.",
    overview: [
      "The BSc Acupuncture Science programme builds a strong foundation in the principles of acupuncture alongside human anatomy, physiology and allied health sciences.",
      "Students progress from theory to supervised practical sessions and structured clinical exposure, developing the knowledge and professional discipline expected of a practitioner.",
    ],
    duration: "3 years",
    eligibility: [
      "Higher Secondary (Plus Two) or equivalent from a recognised board",
      "Minimum age of 17 years at the time of admission",
      "Proficiency in English for academic study",
    ],
    modes: ["Offline", "Hybrid"],
    structure: [
      { title: "Year 1 — Foundations", items: ["History and principles of acupuncture", "Human anatomy", "Human physiology", "Meridian theory"] },
      { title: "Year 2 — Methods", items: ["Point location and needling techniques", "Diagnostic methods", "Pathology", "Supervised practical sessions"] },
      { title: "Year 3 — Clinical practice", items: ["Clinical case management", "Professional ethics and practice", "Clinical internship", "Project work"] },
    ],
    practicalTraining:
      "Practical sessions run throughout the programme, followed by a supervised clinical internship in the final year.",
    centres: ["mukkam"],
    admissionSteps: [
      "Check eligibility and choose your learning mode",
      "Submit the admission enquiry or application form",
      "Document verification by the admissions office",
      "Confirmation of admission and batch allotment",
    ],
    awardingBody: AWARDING_TBC,
    featured: true,
    faqs: [
      { q: "Is there an entrance examination?", a: "Admission requirements, including any entrance assessment, will be published in the official admission notification." },
      { q: "Can I study while working?", a: "The hybrid mode combines online theory with scheduled in-person practical sessions. Availability depends on the batch and centre." },
      { q: "Where are classes held?", a: "Offline and practical sessions are held at the Mukkam campus and approved affiliated academies." },
    ],
  },
  {
    slug: "diploma-in-acupuncture",
    title: "Diploma in Acupuncture",
    level: "Diploma",
    qualification: "Diploma in Acupuncture",
    summary:
      "A focused programme for learners who want practical, structured training in acupuncture methods and patient care.",
    overview: [
      "The diploma introduces the core theory of acupuncture and moves quickly into supervised hands-on practice.",
      "It is designed for learners who want a practical qualification with a clear path to further study.",
    ],
    duration: "1 year",
    eligibility: ["Higher Secondary (Plus Two) or equivalent", "Minimum age of 18 years"],
    modes: ["Offline", "Online", "Hybrid"],
    structure: [
      { title: "Semester 1", items: ["Principles of acupuncture", "Basic anatomy and physiology", "Point location"] },
      { title: "Semester 2", items: ["Needling techniques", "Common conditions", "Supervised practical sessions"] },
    ],
    practicalTraining: "Weekly supervised practical sessions and a short clinical observation period.",
    centres: ["mukkam"],
    admissionSteps: [
      "Check eligibility and learning mode",
      "Submit the enquiry or application form",
      "Document verification",
      "Admission confirmation",
    ],
    awardingBody: AWARDING_TBC,
    featured: true,
    faqs: [
      { q: "Is the online mode fully online?", a: "Theory can be completed online; practical components require attendance at a centre." },
      { q: "Can I continue to the BSc programme?", a: "Progression routes will be confirmed in the official prospectus." },
    ],
  },
  {
    slug: "pg-diploma-clinical-acupuncture",
    title: "PG Diploma in Clinical Acupuncture",
    level: "Postgraduate Diploma",
    qualification: "Postgraduate Diploma in Clinical Acupuncture",
    summary:
      "Advanced clinical training for graduates and practitioners seeking deeper case-based expertise.",
    overview: [
      "This programme deepens clinical reasoning through case studies, advanced techniques and supervised practice.",
      "It is intended for graduates of acupuncture or allied health disciplines.",
    ],
    duration: "1 year",
    eligibility: ["A bachelor's degree or diploma in acupuncture or an allied health discipline", "Professional experience is an advantage"],
    modes: ["Hybrid"],
    structure: [
      { title: "Advanced theory", items: ["Advanced diagnostics", "Evidence and research methods", "Integrative approaches"] },
      { title: "Clinical practice", items: ["Case-based learning", "Supervised clinical rotations", "Clinical dissertation"] },
    ],
    practicalTraining: "Supervised clinical rotations and a case-based dissertation.",
    centres: ["mukkam"],
    admissionSteps: ["Submit application with qualification documents", "Academic review", "Interaction with faculty", "Admission confirmation"],
    awardingBody: AWARDING_TBC,
    featured: true,
    faqs: [{ q: "Is prior clinical experience required?", a: "It is not mandatory, but it helps. The admissions team will advise based on your background." }],
  },
  {
    slug: "certificate-in-acupressure",
    title: "Certificate in Acupressure",
    level: "Certificate",
    qualification: "Certificate in Acupressure",
    summary:
      "A short introductory course in acupressure principles and self-care techniques, open to all learners.",
    overview: [
      "An accessible introduction to acupressure, suitable for beginners and wellness professionals.",
    ],
    duration: "3 months",
    eligibility: ["SSLC (Class 10) or equivalent", "Open to all age groups above 16"],
    modes: ["Offline", "Online"],
    structure: [{ title: "Course modules", items: ["Introduction to acupressure", "Key points and techniques", "Self-care practice", "Practical assessment"] }],
    centres: ["mukkam"],
    admissionSteps: ["Submit the enquiry form", "Batch confirmation", "Fee payment and enrolment"],
    awardingBody: AWARDING_TBC,
    faqs: [{ q: "Do I need a science background?", a: "No. The course is designed for beginners." }],
  },
];
