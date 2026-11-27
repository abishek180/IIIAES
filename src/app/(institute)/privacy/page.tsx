import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How the ${site.name} collects, uses and protects personal information submitted through its websites.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      description="How we collect, use and protect the information you share with us."
      updated="November 2026"
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              This website is operated by the {site.name} ({site.shortName}), {site.address.line1}, {site.address.city}, {site.address.state}, India. It also
              covers the IIIAES Mukkam Academy website at /mukkam.
            </p>
          ),
        },
        {
          heading: "What we collect",
          body: (
            <>
              <p>We only collect information you choose to give us through our forms:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>Enquiry forms: name, phone/WhatsApp number, email, course of interest and your message.</li>
                <li>Admission applications: personal details, contact details, qualification, course preferences and any documents you upload.</li>
                <li>Affiliation enquiries: institution and contact details, and information about your infrastructure.</li>
              </ul>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              Your information is used only to respond to your enquiry, process your application or affiliation request, and contact you about it. We do not sell
              your personal information or use it for unrelated marketing.
            </p>
          ),
        },
        {
          heading: "Storage, security and retention",
          body: (
            <p>
              Submissions are stored securely and are accessible only to authorised staff. Application records are kept only as long as needed for admission and
              legal purposes, after which they are deleted.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              In line with India’s Digital Personal Data Protection Act, 2023, you may ask to access, correct or delete the personal information you have shared, or
              withdraw your consent, by contacting us at {site.contact.email}.
            </p>
          ),
        },
        {
          heading: "Cookies and third parties",
          body: (
            <p>
              The website does not use advertising cookies. The contact page embeds Google Maps, which is subject to Google’s own privacy policy. Any analytics will
              be added only in a privacy-conscious form and disclosed here.
            </p>
          ),
        },
      ]}
    />
  );
}
