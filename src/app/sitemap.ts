import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAcademies, getAcademyOfferings, getCourses, getNotices } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const institute = ["", "/about", "/academics", "/courses", "/admissions", "/affiliation", "/academies", "/notices", "/research", "/student-life", "/gallery", "/downloads", "/contact", "/privacy", "/terms"];
  const academy = ["", "/about", "/courses", "/admissions", "/campus", "/learning-modes", "/faculty", "/student-life", "/news", "/gallery", "/faqs", "/contact"].map((p) => `/mukkam${p}`);
  return [
    ...[...institute, ...academy].map((p) => ({ url: `${site.url}${p}` })),
    ...getCourses().map((c) => ({ url: `${site.url}/courses/${c.slug}` })),
    ...getAcademyOfferings().map(({ course }) => ({ url: `${site.url}/mukkam/courses/${course.slug}` })),
    ...getNotices().map((n) => ({ url: `${site.url}/notices/${n.slug}`, lastModified: n.publishedAt })),
    ...getNotices({ site: "academy" }).map((n) => ({ url: `${site.url}/mukkam/news/${n.slug}`, lastModified: n.publishedAt })),
    ...getAcademies().map((a) => ({ url: `${site.url}/academies/${a.slug}` })),
  ];
}
