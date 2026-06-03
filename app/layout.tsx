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
    default: "ArcheLoop | Understand. Interrupt. Integrate.",
    template: "%s | ArcheLoop",
  },
  description:
    "ArcheLoop is a symbolic self-awareness system for recognising emotional patterns, archetypes, shadow loops, nervous system responses, and relational dynamics.",
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
  ],
  openGraph: {
    title: "ArcheLoop | Understand. Interrupt. Integrate.",
    description:
      "A symbolic self-awareness system for recognising and interrupting recurring shadow patterns.",
    url: "https://www.archeloop.com",
    siteName: "ArcheLoop",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArcheLoop | Understand. Interrupt. Integrate.",
    description:
      "A symbolic self-awareness system for recognising and interrupting recurring shadow patterns.",
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