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
  theme: "dark",
  interval: 6000,
  // Accordion panels (homepage). Each panel: media (image or video) + caption (collapsed label) + title, text and link (expanded).
  slides: [
    {
      media: { type: "image", src: "/images/campus/iiiaes-campus.jpg", alt: "The IIIAES campus building at dusk", focus: "60% center" },
      caption: "Our campus",
      title: "A campus built for focus",
      text: "A modern home for acupuncture education in Mukkam, Kozhikode.",
      cta: { label: "About IIIAES", href: "/about" },
    },
    {
      media: { type: "image", src: "/images/campus/study-hall.jpg", alt: "The IIIAES study hall with tiered seating and a projection screen" },
      caption: "Study hall",
      title: "Learn in the study hall",
      text: "Tiered seating, projection and audio for lectures and seminars.",
      cta: { label: "Academics", href: "/academics" },
    },
    {
      media: { type: "image", src: "/images/campus/acupuncture-practice.jpg", alt: "A practitioner placing acupuncture needles on a patient's wrist", focus: "center 60%" },
      caption: "Acupuncture practice",
      title: "Precision in every point",
      text: "Learn point location and needling technique under expert supervision.",
      cta: { label: "Explore courses", href: "/courses" },
    },
    {
      media: { type: "image", src: "/images/stock/acupuncture-treatment.jpg", alt: "Supervised practical acupuncture session" },
      caption: "Hands-on practice",
      title: "Practice from the first term",
      text: "Supervised practical sessions build correct technique and confidence.",
      cta: { label: "Explore courses", href: "/courses" },
    },
    {
      media: { type: "image", src: "/images/campus/consultation-room.jpg", alt: "Consultation room for supervised clinical training" },
      caption: "Clinical exposure",
      title: "Supervised clinical training",
      text: "A calm consultation room where theory meets real practice.",
      cta: { label: "Admissions", href: "/admissions" },
    },
  ],
  title: { lead: "Rooted in tradition.", accent: "Advanced through science." },
  description:
    "Structured academic programmes in acupuncture science — combining classical understanding with practical and clinical education.",
  primary: { label: "Explore programmes", href: "/courses" },
  secondary: { label: "Admissions 2027", href: "/admissions", newTab: true },
};

export const academyHero: HeroContent = {
  theme: "dark",
  interval: 7000,
  slides: [
    { media: { type: "image", src: "/images/campus/iiiaes-campus.jpg", alt: "The IIIAES campus building at dusk", focus: "60% center" }, caption: "Mukkam campus" },
    { media: { type: "image", src: "/images/stock/acupuncture-needles.jpg", alt: "Close-up of acupuncture technique practice" }, caption: "Hands-on practice" },
    { media: { type: "image", src: "/images/campus/study-hall.jpg", alt: "The study hall at the Mukkam campus" }, caption: "Study hall" },
    { media: { type: "image", src: "/images/campus/consultation-room.jpg", alt: "Consultation room for supervised clinical training" }, caption: "Consultation room" },
  ],
  title: { lead: "Learn acupuncture", accent: "hands-on,", trail: "right here in Mukkam." },
  description: "Offline, online and hybrid programmes with practical training on campus — delivered by the IIIAES Mukkam Academy.",
  primary: { label: "Apply for 2027 batch", href: "/mukkam/admissions#apply" },
  secondary: { label: "Explore courses", href: "/mukkam/courses" },
};
