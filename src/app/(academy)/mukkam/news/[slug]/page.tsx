import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNotice, getNotices } from "@/lib/data";
import { academySite } from "@/content/academy";
import { NoticeArticle } from "@/components/notice-article";

const b = academySite.basePath;

export function generateStaticParams() {
  return getNotices({ site: "academy", includeArchived: true }).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/mukkam/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const notice = getNotice(slug, "academy");
  if (!notice) return {};
  return { title: notice.title, description: notice.summary, alternates: { canonical: `${b}/news/${notice.slug}` } };
}

export default async function AcademyNoticePage({ params }: PageProps<"/mukkam/news/[slug]">) {
  const { slug } = await params;
  const notice = getNotice(slug, "academy");
  if (!notice) notFound();

  return (
    <NoticeArticle
      notice={notice}
      more={getNotices({ site: "academy" }).filter((n) => n.slug !== notice.slug).slice(0, 4)}
      basePath={`${b}/news`}
      listLabel="All updates"
      breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "News", href: `${b}/news` }, { label: notice.category }]}
    />
  );
}
