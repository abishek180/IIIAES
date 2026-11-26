import type { Metadata } from "next";
import { getGallery } from "@/lib/data";
import { PageHero } from "@/components/layout/page-hero";
import { GalleryFilter } from "@/components/gallery-filter";
import { Container, Em, Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of the IIIAES campus, academic sessions and events.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Gallery" }]}
        eyebrow="Gallery"
        title={
          <>
            Campus, classes & <Em tone="dark">moments</Em>
          </>
        }
        description="Photographs from the campus, academic sessions, clinical training and events."
      />
      <Section className="pt-10 sm:pt-14">
        <Container>
          <GalleryFilter items={getGallery()} />
        </Container>
      </Section>
    </>
  );
}
