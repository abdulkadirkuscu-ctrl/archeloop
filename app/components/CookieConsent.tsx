"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("archeloop-cookie-consent");

    if (consent === "accepted") {
      setAccepted(true);
    } else if (!consent) {
      setVisible(true);
    }
  }, []);

  function acceptCookies() {
    localStorage.setItem("archeloop-cookie-consent", "accepted");
    setAccepted(true);
    setVisible(false);
  }

  function rejectCookies() {
    localStorage.setItem("archeloop-cookie-consent", "rejected");
    setVisible(false);
  }

  if (accepted) {
    return (
      <>
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
      </>
    );
  }

  if (!visible) return null;

  return (
  <div className="fixed bottom-6 left-6 right-6 z-50 mx-auto max-w-4xl">
    <div className="al-premium-card p-6">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-[var(--al-accent)]">
            Cookie Preferences
          </h3>

          <p className="al-text mt-3 max-w-2xl text-sm leading-relaxed">
            ArcheLoop uses cookies and similar technologies to improve site
            performance and understand website usage through Google Analytics.
            You can accept or reject analytics cookies. We only load Google
            Analytics if you choose Accept.
          </p>

          <Link
            href="/privacy-policy"
            className="mt-4 inline-block text-sm font-medium text-[var(--al-accent)] transition hover:opacity-70"
          >
            View Privacy Policy →
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={rejectCookies}
            className="al-button-secondary"
          >
            Reject
          </button>

          <button
            type="button"
            onClick={acceptCookies}
            className="al-button-primary"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  </div>
);
}