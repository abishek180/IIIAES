import type { Metadata, Viewport } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} (${site.shortName})`,
    template: `%s · ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.shortName,
  keywords: ["acupuncture", "acupuncture course", "BSc Acupuncture Science", "acupuncture institute Kerala", "acupuncture Kozhikode", "Mukkam", "IIIAES"],
  authors: [{ name: site.name }],
  creator: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${interTight.variable}`}>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-full bg-gold-400 px-5 py-3 text-sm font-semibold text-ink-950 focus:translate-y-0"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
