import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNotice, getNotices } from "@/lib/data";
import { NoticeArticle } from "@/components/notice-article";

export function generateStaticParams() {
  return getNotices({ includeArchived: true }).map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/notices/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const notice = getNotice(slug);
  if (!notice) return {};
  return { title: notice.title, description: notice.summary, alternates: { canonical: `/notices/${notice.slug}` } };
}

export default async function NoticePage({ params }: PageProps<"/notices/[slug]">) {
  const { slug } = await params;
  const notice = getNotice(slug);
  if (!notice) notFound();

  return (
    <NoticeArticle
      notice={notice}
      more={getNotices().filter((n) => n.slug !== notice.slug).slice(0, 4)}
      basePath="/notices"
      breadcrumbs={[{ label: "Notices", href: "/notices" }, { label: notice.category }]}
    />
  );
}
