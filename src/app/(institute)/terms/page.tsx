import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for the websites of the ${site.name} and the IIIAES Mukkam Academy.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      description="The terms that apply when you use the IIIAES websites."
      updated="November 2026"
      sections={[
        {
          heading: "Information on this website",
          body: (
            <p>
              We aim to keep course, admission and notice information accurate and up to date. Official notifications, the prospectus and communication from the
              admissions office take precedence over general website content.
            </p>
          ),
        },
        {
          heading: "Applications and enquiries",
          body: (
            <p>
              Submitting an enquiry or application form does not guarantee admission or affiliation. All applications are subject to eligibility checks and
              document verification.
            </p>
          ),
        },
        {
          heading: "Use of content",
          body: (
            <p>
              Text, logos and images on this website belong to {site.shortName} or are used under licence. They may not be reproduced for commercial purposes
              without written permission.
            </p>
          ),
        },
        {
          heading: "External links",
          body: <p>Links to third-party websites are provided for convenience. We are not responsible for their content.</p>,
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms can be sent to {site.contact.email}.
            </p>
          ),
        },
      ]}
    />
  );
}
