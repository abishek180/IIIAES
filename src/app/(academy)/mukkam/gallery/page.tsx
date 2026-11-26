import type { Metadata } from "next";
import { getGallery } from "@/lib/data";
import { academySite } from "@/content/academy";
import { PageHero } from "@/components/layout/page-hero";
import { GalleryFilter } from "@/components/gallery-filter";
import { Container, Em, Section } from "@/components/ui/primitives";

const b = academySite.basePath;

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from the IIIAES Mukkam Academy campus, practical sessions and events.",
  alternates: { canonical: `${b}/gallery` },
};

export default function AcademyGalleryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Mukkam Academy", href: b }, { label: "Gallery" }]}
        eyebrow="Gallery"
        title={
          <>
            Life at <Em tone="dark">the academy</Em>
          </>
        }
        description="Photos from the campus, practical sessions and events. Videos coming soon."
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <GalleryFilter items={getGallery()} />
        </Container>
      </Section>
    </>
  );
}
