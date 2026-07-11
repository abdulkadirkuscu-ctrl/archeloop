"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PageShell from "../../components/PageShell";
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
    <PageShell>
      <section className="al-section">
        <div className="al-container max-w-xl">
          <div className="al-card p-8">
            <p className="al-kicker">Login</p>

            <h1 className="al-heading-lg">Welcome back</h1>

            <p className="al-text mt-4">
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
                className="w-full rounded-2xl border border-[var(--al-border)] bg-[var(--al-bg-soft)] px-5 py-4 text-[var(--al-text)] placeholder:text-[var(--al-text-muted)] outline-none transition focus:border-[var(--al-accent)]"
              />

              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-2xl border border-[var(--al-border)] bg-[var(--al-bg-soft)] px-5 py-4 text-[var(--al-text)] placeholder:text-[var(--al-text-muted)] outline-none transition focus:border-[var(--al-accent)]"
              />

              <button
                type="submit"
                disabled={loading}
                className="al-button-primary w-full disabled:opacity-60"
              >
                {loading ? "Logging In..." : "Log In"}
              </button>
            </form>

            {message && (
              <p className="mt-5 text-sm text-[var(--al-accent)]">
                {message}
              </p>
            )}

            <div className="al-muted mt-6 space-y-2 text-sm">
              <p>
                New to ArcheLoop?{" "}
                <Link
                  href={`/auth/signup?redirectTo=${encodeURIComponent(redirectTo)}`}
                  className="font-semibold text-[var(--al-accent)]"
                >
                  Create an account
                </Link>
              </p>

              <p>
                Forgot your password?{" "}
                <Link
                  href="/auth/reset-password"
                  className="font-semibold text-[var(--al-accent)]"
                >
                  Reset password
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}