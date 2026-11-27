import type { HeroContent } from "@/lib/types";

/**
 * Homepage heroes — designed to be edited from the CMS.
 *
 * To change the hero, edit the slides below (or, once the CMS is connected, the "Hero" entry):
 *  - image slide: { media: { type: "image", src: "/images/...", alt: "...", focus?: "center 30%" }, caption }
 *  - video slide: { media: { type: "video", src: "/videos/campus.mp4", poster: "/images/...jpg", alt: "..." }, caption }
 *    Videos play muted and looped. Keep them short (10–20 s), 1080p, H.264 MP4, under ~6 MB.
 *  - Order = display order. One slide = no rotation. `interval` controls how long each slide shows.
 */
export const instituteHero: HeroContent = {
  theme: "light",
  interval: 7000,
  slides: [
    { media: { type: "image", src: "/images/stock/kerala-building.jpg", alt: "Kerala-style tiled-roof building among coconut palms" }, caption: "Campus · Kerala" },
    { media: { type: "image", src: "/images/stock/acupuncture-treatment.jpg", alt: "Supervised practical acupuncture session" }, caption: "Practical training" },
    { media: { type: "image", src: "/images/stock/students-writing.jpg", alt: "Students taking notes in class" }, caption: "Classroom learning" },
    { media: { type: "image", src: "/images/stock/onam-celebration.jpg", alt: "Students in Kerala sarees arranging a pookalam for Onam" }, caption: "Campus life" },
  ],
  title: { lead: "Rooted in tradition.", accent: "Advanced through science." },
  description:
    "Structured academic programmes in acupuncture science — combining classical understanding with practical and clinical education.",
  primary: { label: "Explore programmes", href: "/courses" },
  secondary: { label: "Admissions 2027", href: "/admissions" },
};

export const academyHero: HeroContent = {
  theme: "dark",
  interval: 7000,
  slides: [
    { media: { type: "image", src: "/images/stock/kerala-campus-palms.jpg", alt: "Kerala campus building among coconut palms" }, caption: "Mukkam campus" },
    { media: { type: "image", src: "/images/stock/acupuncture-needles.jpg", alt: "Close-up of acupuncture technique practice" }, caption: "Hands-on practice" },
    { media: { type: "image", src: "/images/stock/classroom-teacher.jpg", alt: "Teacher guiding students in a classroom" }, caption: "Guided learning" },
  ],
  title: { lead: "Learn acupuncture", accent: "hands-on,", trail: "right here in Mukkam." },
  description: "Offline, online and hybrid programmes with practical training on campus — delivered by the IIIAES Mukkam Academy.",
  primary: { label: "Apply for 2027 batch", href: "/mukkam/admissions#apply" },
  secondary: { label: "Explore courses", href: "/mukkam/courses" },
};
