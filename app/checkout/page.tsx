"use client";

import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import { supabaseClient } from "../../lib/supabaseClient";

const products = [
  {
    id: "report",
    label: "Recommended First Step",
    title: "Find My Loop",
    subtitle: "Understand the pattern.",
    price: "£19",
    description:
      "Launch offer. Includes the 60-question assessment and full personalised ArcheLoop Report.",
    items: [
      "60-question Find My Loop assessment",
      "Primary & Secondary Shadow Loops",
      "Archetype & Element",
      "Nervous System Pattern",
      "Integrated Self",
      "Full ArcheLoop Report",
    ],
  },
  {
    id: "integration",
    label: "Transformation",
    title: "ArcheLoop Integration",
    subtitle: "Transform the pattern.",
    price: "£14.99/month",
    description:
      "Launch offer. Includes Triggered Pro, Progress Dashboard, Integration Journeys, My Integrated Vision, and personal tracking.",
    items: [
      "Triggered Pro",
      "Progress Dashboard",
      "Integration Journeys",
      "My Integrated Vision",
      "Monthly Review",
      "Personal Integration Tracking",
    ],
  },
  {
    id: "bundle",
    label: "Best Value",
    title: "Report + First Month Integration",
    subtitle: "Understand and begin transformation.",
    price: "£29",
    description:
      "Includes your full ArcheLoop Report and first month of ArcheLoop Integration.",
    items: [
      "Full ArcheLoop Report",
      "First month ArcheLoop Integration",
      "Triggered Pro",
      "Progress Dashboard",
      "Integration Journeys",
      "My Integrated Vision",
    ],
  },
];

export default function CheckoutPage() {
  const [selectedProduct, setSelectedProduct] = useState("bundle");
  const [accessCode, setAccessCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [completedProduct, setCompletedProduct] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      setIsLoggedIn(Boolean(session?.access_token));
      setCheckingSession(false);
    }

    checkSession();
  }, []);

  const selected = products.find((item) => item.id === selectedProduct);

  async function completeCheckout() {
    setLoading(true);

    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    if (!session?.access_token) {
      setLoading(false);
      alert("Please log in before checkout.");
      window.location.href = "/auth/login";
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: selectedProduct,
        email,
        accessCode,
        accessToken: session.access_token,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Could not complete checkout.");
      return;
    }

    if (data.url) {
      window.location.href = data.url;
      return;
    }

    setCompletedProduct(selectedProduct);
  }

  if (completedProduct) {
    return (
      <PageShell>
        <section className="al-section text-center">
          <div className="al-premium-card mx-auto max-w-4xl p-10">
            <p className="al-kicker">Access Confirmed</p>

            <h1 className="al-heading-xl">
              Your ArcheLoop access has been activated.
            </h1>

            <p className="al-text-lg mx-auto mt-6 max-w-2xl">
              Your access has been recorded. Your selected product is now
              available inside My Account.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="/account" className="al-button-primary">
                Go To My Account
              </a>

              {(completedProduct === "report" ||
                completedProduct === "bundle") && (
                <a href="/assessment" className="al-button-secondary">
                  Start Find My Loop
                </a>
              )}

              {(completedProduct === "integration" ||
                completedProduct === "bundle") && (
                <a href="/integration-home" className="al-button-secondary">
                  Open Integration Hub
                </a>
              )}
            </div>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container text-center">
          <p className="al-kicker">ArcheLoop Checkout</p>

          <h1 className="al-heading-xl">
            Choose your ArcheLoop access.
          </h1>

          <p className="al-text-lg mx-auto mt-6 max-w-3xl">
            Start with your personalised report, continue with integration, or
            choose the bundle to understand and begin transforming the pattern.
          </p>
        </div>
      </section>

            <section className="al-section-tight">
        <div className="al-container-wide grid gap-6 lg:grid-cols-3">
          {products.map((product) => {
            const active = selectedProduct === product.id;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProduct(product.id)}
                className={`p-7 text-left transition ${
                  active ? "al-premium-card" : "al-card hover:border-[var(--al-accent)]"
                }`}
              >
                <p className="al-kicker">{product.label}</p>

                <h2 className="mt-4 text-3xl font-bold text-[var(--al-accent)]">
                  {product.title}
                </h2>

                <p className="al-text mt-2">{product.subtitle}</p>

                <p className="mt-5 text-2xl font-semibold text-[var(--al-text)]">
                  {product.price}
                </p>

                <p className="al-text-lg mt-4">{product.description}</p>

                <div className="mt-6 space-y-3">
                  {product.items.map((item) => (
                    <p key={item} className="al-text text-sm">
                      ✓ {item}
                    </p>
                  ))}
                </div>

                <div
                  className={`mt-6 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                    active
                      ? "bg-[var(--al-accent)] text-[var(--al-bg)]"
                      : "border border-[var(--al-border)] text-[var(--al-accent)]"
                  }`}
                >
                  {active ? "Selected" : "Select This Option"}
                </div>
              </button>
            );
          })}
        </div>

        <div className="al-premium-card mx-auto mt-12 max-w-2xl p-8 text-center">
          <p className="al-kicker">Complete Checkout</p>

          <h2 className="al-heading-md">{selected?.title}</h2>

          <p className="al-text mt-2">
            Create or log in to your account first so your report, Integration access, trigger history, and progress can be saved.
          </p>

          {!checkingSession && !isLoggedIn && (
            <div className="al-card mt-6 p-5">
              <p className="font-semibold text-[var(--al-accent)]">
                Account required before checkout
              </p>

              <p className="al-text mt-3 text-sm">
                ArcheLoop access is saved to your account, so please create an account or log in before continuing.
              </p>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                <a
                  href="/auth/signup?redirectTo=/checkout"
                  className="al-button-primary"
                >
                  Create Account
                </a>

                <a
                  href="/auth/login?redirectTo=/checkout"
                  className="al-button-secondary"
                >
                  Log In
                </a>
              </div>
            </div>
          )}

          {!checkingSession && isLoggedIn && (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email optional"
                className="al-input mt-6"
              />

              <input
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Promo code optional"
                className="al-input mt-4"
              />

              <button
                type="button"
                onClick={completeCheckout}
                disabled={loading}
                className="al-button-primary mt-6 w-full disabled:opacity-50"
              >
                {loading ? "Completing..." : "Complete Checkout"}
              </button>

              <p className="al-text mt-5 text-sm">
                Payments are processed securely. If you have a private access code, you can enter it above.
              </p>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}