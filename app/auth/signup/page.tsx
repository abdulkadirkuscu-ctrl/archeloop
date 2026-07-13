"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import PageShell from "../../components/PageShell";
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

  const requestedRedirect = searchParams.get("redirectTo");
  const redirectTo =
    requestedRedirect?.startsWith("/") &&
    !requestedRedirect.startsWith("//")
      ? requestedRedirect
      : "/account";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");
  const [loading, setLoading] = useState(false);

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.");
      setMessageType("error");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("The passwords do not match.");
      setMessageType("error");
      return;
    }

    setLoading(true);

    try {
      const emailRedirectTo = `${window.location.origin}/auth/confirm?next=${encodeURIComponent(
        redirectTo
      )}`;

      const { data, error } = await supabaseClient.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo,
        },
      });

      if (error) {
        setMessage(error.message);
        setMessageType("error");
        return;
      }

      if (data.session) {
        window.location.href = redirectTo;
        return;
      }

      setMessage(
        "Check your email and select the confirmation link to finish creating your account."
      );
      setMessageType("success");
    } catch {
      setMessage(
        "Something went wrong while creating your account. Please try again."
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container max-w-xl">
          <div className="al-card p-6 sm:p-8">
            <div className="text-center">
              <p className="al-kicker">Create Account</p>

              <h1 className="al-heading-lg">Join ArcheLoop</h1>

              <p className="al-text mx-auto mt-4 max-w-lg">
                Create your account to save your report, trigger history,
                integration progress, and monthly reviews.
              </p>
            </div>

            <form
              onSubmit={handleSignup}
              className="mt-8 space-y-5"
            >
              <div>
                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-sm font-semibold text-[var(--al-text)]"
                >
                  Email address
                </label>

                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-2xl border border-[var(--al-border)] bg-[var(--al-bg-soft)] px-5 py-4 text-[var(--al-text)] outline-none transition placeholder:text-[var(--al-text-muted)] focus:border-[var(--al-accent)]"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-4">
                  <label
                    htmlFor="signup-password"
                    className="block text-sm font-semibold text-[var(--al-text)]"
                  >
                    Create password
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="text-sm font-semibold text-[var(--al-accent)]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-2xl border border-[var(--al-border)] bg-[var(--al-bg-soft)] px-5 py-4 text-[var(--al-text)] outline-none transition placeholder:text-[var(--al-text-muted)] focus:border-[var(--al-accent)]"
                />

                <p className="al-muted mt-2 text-sm">
                  Use at least 8 characters. Your browser or password manager
                  may suggest a strong password.
                </p>
              </div>

              <div>
                <label
                  htmlFor="signup-confirm-password"
                  className="mb-2 block text-sm font-semibold text-[var(--al-text)]"
                >
                  Confirm password
                </label>

                <input
                  id="signup-confirm-password"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  placeholder="Enter the password again"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  aria-invalid={
                    confirmPassword.length > 0 && !passwordsMatch
                  }
                  className={`w-full rounded-2xl border bg-[var(--al-bg-soft)] px-5 py-4 text-[var(--al-text)] outline-none transition placeholder:text-[var(--al-text-muted)] ${
                    confirmPassword.length > 0 && !passwordsMatch
                      ? "border-red-400"
                      : passwordsMatch
                        ? "border-[var(--al-integrate)]"
                        : "border-[var(--al-border)] focus:border-[var(--al-accent)]"
                  }`}
                />

                {confirmPassword.length > 0 && (
                  <p
                    aria-live="polite"
                    className={`mt-2 text-sm ${
                      passwordsMatch
                        ? "text-[var(--al-integrate)]"
                        : "text-red-400"
                    }`}
                  >
                    {passwordsMatch
                      ? "Passwords match."
                      : "Passwords do not match."}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="al-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {message && (
              <div
                role={messageType === "error" ? "alert" : "status"}
                className={`mt-5 rounded-2xl border p-4 text-sm ${
                  messageType === "success"
                    ? "border-[var(--al-integrate)]/40 bg-[var(--al-integrate)]/10 text-[var(--al-integrate-soft)]"
                    : "border-red-400/40 bg-red-400/10 text-red-300"
                }`}
              >
                {message}
              </div>
            )}

            <p className="al-muted mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link
                href={`/auth/login?redirectTo=${encodeURIComponent(
                  redirectTo
                )}`}
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