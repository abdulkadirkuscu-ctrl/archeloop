import type { Metadata } from "next";

import { Space_Grotesk, Manrope } from "next/font/google";

import CookieConsent from "./components/CookieConsent";
import "./globals.css";

const headingFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.archeloop.com"),
  title: {
    default: "ArcheLoop | Discover Your Shadow Loop",
    template: "%s | ArcheLoop",
  },
  description:
    "Discover your Shadow Loop, understand why it keeps repeating, and follow a path to break the loop.",
  keywords: [
    "ArcheLoop",
    "shadow work",
    "archetypes",
    "shadow loops",
    "nervous system",
    "somatic awareness",
    "self development",
    "relational dynamics",
    "body map",
    "integration journey",
  ],
  openGraph: {
    title: "ArcheLoop | Discover Your Shadow Loop",
    description:
      "Discover your Shadow Loop, understand why it keeps repeating, and follow a path to break the loop.",
    url: "https://www.archeloop.com",
    siteName: "ArcheLoop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArcheLoop | Discover Your Shadow Loop",
    description:
      "Discover your Shadow Loop, understand why it keeps repeating, and follow a path to break the loop.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${headingFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}