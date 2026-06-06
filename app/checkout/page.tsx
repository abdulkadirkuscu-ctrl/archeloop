"use client";

import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const products = [
  {
    id: "report",
    label: "Product 1",
    title: "Find My Loop™",
    subtitle: "Understand the pattern.",
    price: "£29",
    description:
      "Includes the 60-question assessment and full personalised ArcheLoop Report™.",
    items: [
      "60-question Find My Loop™ assessment",
      "Primary & Secondary Shadow Loops™",
      "Archetype & Element",
      "Nervous System Pattern",
      "Integrated Self™",
      "Full ArcheLoop Report™",
    ],
  },
  {
    id: "integration",
    label: "Product 2",
    title: "ArcheLoop Integration™",
    subtitle: "Transform the pattern.",
    price: "£29/month",
    description:
      "Requires Find My Loop™. Includes Triggered Pro™, Progress Dashboard™, Integration Journeys™, My Integrated Vision™, and personal tracking.",
    items: [
      "Requires Find My Loop™ report",
      "Triggered Pro™",
      "Progress Dashboard™",
      "Integration Journeys™",
      "My Integrated Vision™",
      "Personal Integration Tracking™",
    ],
  },
  {
    id: "bundle",
    label: "Recommended",
    title: "Report + First Month Integration™",
    subtitle: "Understand and begin transformation.",
    price: "£39",
    description:
      "Includes your full ArcheLoop Report™ and first month of ArcheLoop Integration™. After the first month, Integration continues at £29/month.",
    items: [
      "Full ArcheLoop Report™",
      "First month ArcheLoop Integration™",
      "Triggered Pro™",
      "Progress Dashboard™",
      "Integration Journeys™",
      "My Integrated Vision™",
    ],
  },
];

export default function CheckoutPage() {
  const [selectedProduct, setSelectedProduct] = useState("bundle");
  const [accessCode, setAccessCode] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [completedProduct, setCompletedProduct] = useState("");

  const selected = products.find((item) => item.id === selectedProduct);

  async function completeCheckout() {
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product: selectedProduct,
        email,
        accessCode,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.error || "Could not complete checkout.");
      return;
    }

    if (selectedProduct === "integration" || selectedProduct === "bundle") {
      document.cookie =
        "archeloop_integration_access=true; path=/; max-age=2592000";
    }

    if (selectedProduct === "report" || selectedProduct === "bundle") {
      document.cookie =
        "archeloop_report_access=true; path=/; max-age=2592000";
    }

    setCompletedProduct(selectedProduct);
  }

  if (completedProduct) {
    return (
      <main className="min-h-screen bg-[#030712] text-stone-100">
        <Nav />

        <section className="px-6 py-28 text-center">
          <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 shadow-[0_0_80px_rgba(216,183,120,0.10)]">
            <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
              Founding Access Confirmed
            </p>

            <h1 className="mt-5 text-4xl font-bold md:text-5xl">
              Your ArcheLoop access has been activated.
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-stone-300">
              Your Founding Access checkout has been recorded. Your selected
              product is now available inside My Account.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/account"
                className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200"
              >
                Go To My Account
              </a>

              {(completedProduct === "report" ||
                completedProduct === "bundle") && (
                <a
                  href="/assessment"
                  className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
                >
                  Start Find My Loop™
                </a>
              )}

              {(completedProduct === "integration" ||
                completedProduct === "bundle") && (
                <a
                  href="/integration-home"
                  className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 font-semibold text-stone-300 transition hover:border-yellow-300/60 hover:text-yellow-200"
                >
                  Open Integration Hub™
                </a>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="relative overflow-hidden px-6 py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,183,120,0.18),transparent_42%)]" />

        <div className="relative mx-auto max-w-6xl text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            ArcheLoop Checkout
          </p>

          <h1 className="mt-5 text-4xl font-bold md:text-5xl">
            Choose your ArcheLoop access.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-stone-300">
            During Founding Access, you can complete checkout with a Founding
            Access code. This lets you experience the paid product journey
            before public pricing begins.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-3">
          {products.map((product) => {
            const active = selectedProduct === product.id;

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => setSelectedProduct(product.id)}
                className={`rounded-[2rem] border p-7 text-left transition ${
                  active
                    ? "border-yellow-300 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black shadow-[0_0_70px_rgba(216,183,120,0.08)]"
                    : "border-yellow-300/10 bg-[#0B1018] hover:border-yellow-300/40"
                }`}
              >
                <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
                  {product.label}
                </p>

                <h2 className="mt-4 text-3xl font-bold text-yellow-300">
                  {product.title}
                </h2>

                <p className="mt-2 text-stone-400">{product.subtitle}</p>

                <p className="mt-5 text-2xl font-semibold text-stone-100">
                  {product.price}
                </p>

                <p className="mt-4 leading-relaxed text-stone-300">
                  {product.description}
                </p>

                <div className="mt-6 space-y-3">
                  {product.items.map((item) => (
                    <p key={item} className="text-sm text-stone-300">
                      ✓ {item}
                    </p>
                  ))}
                </div>

                <div
                  className={`mt-6 rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                    active
                      ? "bg-yellow-300 text-black"
                      : "border border-yellow-300/20 bg-black/30 text-yellow-200"
                  }`}
                >
                  {active ? "Selected" : "Select This Option"}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-[2rem] border border-yellow-300/20 bg-black/40 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
            Complete Checkout
          </p>

          <h2 className="mt-4 text-3xl font-bold text-stone-100">
            {selected?.title}
          </h2>

          <p className="mt-2 text-stone-400">
            Enter your Founding Access code to unlock this product during the
            founding phase.
          </p>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email optional"
            className="mt-6 w-full rounded-2xl border border-yellow-300/10 bg-[#030712] p-4 text-stone-100 placeholder:text-stone-600 focus:border-yellow-300 focus:outline-none"
          />

          <input
            type="text"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
            placeholder="Enter Founding Access code"
            className="mt-4 w-full rounded-2xl border border-yellow-300/10 bg-[#030712] p-4 text-stone-100 placeholder:text-stone-600 focus:border-yellow-300 focus:outline-none"
          />

          <button
            type="button"
            onClick={completeCheckout}
            disabled={loading}
            className="mt-6 w-full rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200 disabled:opacity-50"
          >
            {loading ? "Completing..." : "Complete Founding Access Checkout"}
          </button>

          <p className="mt-5 text-xs leading-relaxed text-stone-500">
            Founding Access gives temporary access while ArcheLoop™ is being
            refined. Future access may require payment or an active
            subscription after public launch.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}