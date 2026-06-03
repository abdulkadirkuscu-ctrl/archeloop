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
      <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-6 shadow-[0_0_60px_rgba(216,183,120,0.15)]">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-yellow-300">
              Cookie Preferences
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-300">
              ArcheLoop uses cookies and similar technologies to improve site
              performance and understand website usage through Google Analytics.
              By clicking Accept, you agree to the use of analytics cookies.
            </p>

            <Link
              href="/privacy-policy"
              className="mt-3 inline-block text-sm text-yellow-300 hover:text-yellow-200"
            >
              View Privacy Policy →
            </Link>
          </div>

          <div className="flex gap-3">
            <button
              onClick={rejectCookies}
              className="rounded-full border border-stone-700 px-5 py-2 text-sm text-stone-300 transition hover:border-stone-500"
            >
              Reject
            </button>

            <button
              onClick={acceptCookies}
              className="rounded-full bg-yellow-300 px-5 py-2 text-sm font-semibold text-black transition hover:bg-yellow-200"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}