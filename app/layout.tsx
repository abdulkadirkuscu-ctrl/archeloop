import Script from "next/script"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "ArcheLoop",
  description:
    "A symbolic self-awareness system for recognising and interrupting recurring shadow patterns.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>

        {/* Google Analytics */}

        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-D3WC89FT4W"
        />

        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-D3WC89FT4W');
          `}
        </Script>

      </head>

      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  )
}