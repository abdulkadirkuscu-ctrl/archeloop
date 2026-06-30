"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { supabaseClient } from "../../../lib/supabaseClient";

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    router.push(redirectTo);
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-[#030712] text-stone-100">
      <Nav />

      <section className="px-6 py-24">
        <div className="mx-auto max-w-xl rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
            Login
          </p>

          <h1 className="mt-4 text-4xl font-bold">Welcome back</h1>

          <p className="mt-4 text-stone-300">
            Log in to access your ArcheLoop report, integration progress,
            trigger history, and monthly reviews.
          </p>

          <form onSubmit={handleLogin} className="mt-8 space-y-4">
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
              {loading ? "Logging In..." : "Log In"}
            </button>
          </form>

          {message && <p className="mt-5 text-sm text-yellow-200">{message}</p>}

          <div className="mt-6 space-y-2 text-sm text-stone-400">
            <p>
              New to ArcheLoop?{" "}
              <Link
                href={`/auth/signup?redirectTo=${encodeURIComponent(redirectTo)}`}
                className="text-yellow-300"
              >
                Create an account
              </Link>
            </p>

            <p>
              Forgot your password?{" "}
              <Link href="/auth/reset-password" className="text-yellow-300">
                Reset password
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}