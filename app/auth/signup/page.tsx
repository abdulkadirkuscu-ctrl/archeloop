"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { supabaseClient } from "../../../lib/supabaseClient";

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabaseClient.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}${redirectTo}`,
      },
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    setMessage("Check your email to confirm your account.");
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
            Create Account
          </p>

          <h1 className="mt-4 text-4xl font-bold">Join ArcheLoop™</h1>

          <p className="mt-4 text-stone-300">
            Create your account to save your report, trigger history,
            integration progress, and monthly reviews.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-4">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-yellow-300"
            />

            <input
              type="password"
              required
              minLength={6}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none focus:border-yellow-300"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-yellow-300 px-6 py-4 font-semibold text-black transition hover:bg-yellow-200 disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {message && <p className="mt-5 text-sm text-yellow-200">{message}</p>}

          <p className="mt-6 text-sm text-stone-400">
            Already have an account?{" "}
            <Link
              href={`/auth/login?redirectTo=${encodeURIComponent(redirectTo)}`}
              className="text-yellow-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}