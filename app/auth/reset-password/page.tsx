"use client";

import { useState } from "react";
import Link from "next/link";
import PageShell from "../../components/PageShell";
import { supabaseClient } from "../../../lib/supabaseClient";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">(
    ""
  );
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/update-password`,
    });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
      setLoading(false);
      return;
    }

    setMessage("Check your email for a password reset link.");
    setMessageType("success");
    setLoading(false);
  }

  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container max-w-xl">
          <div className="al-card p-8">
            <p className="al-kicker">Reset Password</p>

            <h1 className="al-heading-lg">Recover your account</h1>

            <p className="al-text mt-4">
              Enter your email and we’ll send you a password reset link.
            </p>

            <form onSubmit={handleReset} className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="reset-email"
                  className="mb-2 block text-sm font-semibold text-[var(--al-text)]"
                >
                  Email address
                </label>

                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-[var(--al-border)] bg-[var(--al-bg-soft)] px-5 py-4 text-[var(--al-text)] placeholder:text-[var(--al-text-muted)] outline-none transition focus:border-[var(--al-accent)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="al-button-primary w-full disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>

            {message && (
              <p
                role={messageType === "error" ? "alert" : "status"}
                className={`mt-5 text-sm ${
                  messageType === "error"
                    ? "text-red-400"
                    : "text-[var(--al-accent)]"
                }`}
              >
                {message}
              </p>
            )}

            <p className="al-muted mt-6 text-sm">
              Remembered your password?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-[var(--al-accent)]"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}