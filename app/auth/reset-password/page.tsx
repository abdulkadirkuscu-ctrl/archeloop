"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { supabaseClient } from "../../../lib/supabaseClient";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/login`,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Check your email for a password reset link.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
            Reset Password
          </p>

          <h1 className="mt-4 text-4xl font-bold">Recover your account</h1>

          <p className="mt-4 text-stone-300">
            Enter your email and we’ll send you a password reset link.
          </p>

          <form onSubmit={handleReset} className="mt-8 space-y-4">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-yellow-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-yellow-300 px-6 py-4 font-semibold text-black transition hover:bg-yellow-200 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {message && <p className="mt-5 text-sm text-yellow-200">{message}</p>}

          <p className="mt-6 text-sm text-stone-400">
            Remembered your password?{" "}
            <Link href="/auth/login" className="text-yellow-300">
              Log in
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}