/**
 * Data access layer. Every page reads content through these functions,
 * so replacing static content with a CMS/API later only changes this file.
 */
import { courses } from "@/content/courses";
import { notices } from "@/content/notices";
import { academies, calendar, downloads, gallery } from "@/content/misc";
import { mainNav } from "@/content/site";
import { academyNav, offerings } from "@/content/academy";
import { academyHero, instituteHero } from "@/content/hero";
import type { Notice, NoticePriority, SearchEntry, SiteKey } from "@/lib/types";

const priorityRank: Record<NoticePriority, number> = { urgent: 0, important: 1, normal: 2 };

export function getCourses() {
  return courses;
}

export function getFeaturedCourses() {
  return courses.filter((c) => c.featured);
}

export function getCourse(slug: string) {
  return courses.find((c) => c.slug === slug);
}

function inScope(scope: Notice["scope"], site: SiteKey) {
  return !scope || scope === "both" || scope === site;
}

/** Current notices for a site: pinned first, then by priority, then newest. */
export function getNotices({ includeArchived = false, site = "institute" as SiteKey } = {}) {
  return notices
    .filter((n) => (includeArchived || !n.archived) && inScope(n.scope, site))
    .toSorted((a, b) => {
      if (!!a.pinned !== !!b.pinned) return a.pinned ? -1 : 1;
      if (a.pinned && b.pinned && a.priority !== b.priority)
        return priorityRank[a.priority] - priorityRank[b.priority];
      return b.publishedAt.localeCompare(a.publishedAt);
    });
}

export function getNotice(slug: string, site: SiteKey = "institute") {
  return notices.find((n) => n.slug === slug && inScope(n.scope, site));
}

/** The single most important current notice, used for the announcement pill. */
export function getHeadlineNotice(site: SiteKey = "institute") {
  const list = getNotices({ site });
  return list.find((n) => n.priority === "urgent") ?? list[0];
}

/** Courses offered at an academy, merged with academy-specific batch details. */
export function getAcademyOfferings(academySlug = "mukkam") {
  return courses
    .filter((c) => c.centres.includes(academySlug))
    .map((course) => ({ course, offering: offerings[course.slug] }));
}

export function getAcademyOffering(slug: string, academySlug = "mukkam") {
  return getAcademyOfferings(academySlug).find((o) => o.course.slug === slug);
}

export function getAcademySearchIndex(): SearchEntry[] {
  const pages: SearchEntry[] = [
    { title: "Mukkam Academy — Home", href: "/mukkam", section: "Page" },
    ...academyNav.flatMap((item) =>
      item.children
        ? item.children.map((c) => ({ title: c.label, href: c.href, section: "Page" as const, keywords: c.description }))
        : [{ title: item.label, href: item.href, section: "Page" as const }],
    ),
    { title: "Apply online", href: "/mukkam/admissions#apply", section: "Page", keywords: "application form admission" },
    { title: "Required documents", href: "/mukkam/admissions#documents", section: "Page", keywords: "certificates" },
    { title: "Contact & directions", href: "/mukkam/contact", section: "Page", keywords: "phone whatsapp map location" },
    { title: "IIIAES main website", href: "/", section: "Page", keywords: "institute" },
  ];
  const unique = pages.filter((p, i, arr) => arr.findIndex((x) => x.href === p.href) === i);
  return [
    ...unique,
    ...getAcademyOfferings().map(({ course }) => ({ title: course.title, href: `/mukkam/courses/${course.slug}`, section: "Course" as const, keywords: `${course.level} ${course.duration}` })),
    ...getNotices({ site: "academy" }).map((n) => ({ title: n.title, href: `/mukkam/news/${n.slug}`, section: "Notice" as const, keywords: n.category })),
  ];
}

export function getAcademies() {
  return academies;
}

export function getAcademy(slug: string) {
  return academies.find((a) => a.slug === slug);
}

export function getCalendar() {
  return calendar.toSorted((a, b) => a.date.localeCompare(b.date));
}

export function getDownloads() {
  return downloads;
}

export function getGallery() {
  return gallery;
}

export function getSearchIndex(): SearchEntry[] {
  const pages: SearchEntry[] = [
    { title: "Home", href: "/", section: "Page" },
    ...mainNav.flatMap((item) =>
      item.children
        ? item.children.map((c) => ({ title: c.label, href: c.href, section: "Page" as const, keywords: c.description }))
        : [{ title: item.label, href: item.href, section: "Page" as const }],
    ),
    { title: "Contact", href: "/contact", section: "Page", keywords: "phone email whatsapp address location map" },
    { title: "Eligibility", href: "/admissions#eligibility", section: "Page", keywords: "admission requirements qualification" },
    { title: "Required documents", href: "/admissions#documents", section: "Page", keywords: "admission certificates" },
  ];
  const unique = pages.filter((p, i, arr) => arr.findIndex((x) => x.href === p.href) === i);
  return [
    ...unique,
    ...courses.map((c) => ({ title: c.title, href: `/courses/${c.slug}`, section: "Course" as const, keywords: `${c.level} ${c.duration} ${c.modes.join(" ")}` })),
    ...getNotices().map((n) => ({ title: n.title, href: `/notices/${n.slug}`, section: "Notice" as const, keywords: n.category })),
    ...academies.map((a) => ({ title: `${a.name} — ${a.location}`, href: `/academies/${a.slug}`, section: "Academy" as const, keywords: a.district })),
  ];
}

export function getHero(site: SiteKey) {
  return site === "academy" ? academyHero : instituteHero;
}
