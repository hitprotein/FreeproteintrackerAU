import type { Metadata, Viewport } from "next";
import { Barlow, Hanken_Grotesk } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const display = Barlow({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display" });
const body = Hanken_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

const DESC = "Find the protein in Australian takeaway like GYG and Nando's, compare meals, and track your daily protein for free. No account needed.";

export const metadata: Metadata = {
  metadataBase: new URL("https://freeproteintracker.com.au"),
  title: { default: "Australian Protein Finder & Free Tracker | FreeProteinTracker.com.au", template: "%s | FreeProteinTracker.com.au" },
  description: DESC,
  icons: {
    icon: [{ url: "/favicon-32x32.png", sizes: "32x32" }, { url: "/favicon-16x16.png", sizes: "16x16" }, { url: "/favicon.ico" }],
    apple: "/apple-touch-icon-180x180.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    siteName: "FreeProteinTracker.com.au", locale: "en_AU", type: "website", description: DESC,
    images: [{ url: "/share-image.png", width: 1200, height: 630, alt: "Free Protein Tracker Australia" }],
  },
  twitter: { card: "summary_large_image", images: ["/share-image.png"] },
  verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = { themeColor: "#111817" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "WebSite", name: "FreeProteinTracker.com.au", url: "https://freeproteintracker.com.au",
        }) }} />
        <SiteHeader />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
