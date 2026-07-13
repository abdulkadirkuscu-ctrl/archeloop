"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PageShell from "../../components/PageShell";
import { supabaseClient } from "../../../lib/supabaseClient";

type SessionStatus = "checking" | "ready" | "expired";

export default function UpdatePasswordPage() {
  const router = useRouter();

  const [sessionStatus, setSessionStatus] = useState<SessionStatus>(
    "checking"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">(
    ""
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkSession() {
      const { data, error } = await supabaseClient.auth.getUser();

      if (cancelled) return;

      setSessionStatus(error || !data.user ? "expired" : "ready");
    }

    checkSession();

    return () => {
      cancelled = true;
    };
  }, []);

  const passwordsMatch =
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    const { error } = await supabaseClient.auth.updateUser({ password });

    if (error) {
      setMessage(error.message);
      setMessageType("error");
      setLoading(false);
      return;
    }

    setMessage(
      "Your password has been updated. Redirecting to your account..."
    );
    setMessageType("success");
    setSuccess(true);
    setLoading(false);

    setTimeout(() => {
      router.push("/account");
      router.refresh();
    }, 1500);
  }

  return (
    <PageShell>
      <section className="al-section">
        <div className="al-container max-w-xl">
          <div className="al-card p-6 sm:p-8">
            <div className="text-center">
              <p className="al-kicker">Reset Password</p>

              <h1 className="al-heading-lg">Set a new password</h1>

              <p className="al-text mx-auto mt-4 max-w-lg">
                Choose a new password for your ArcheLoop account.
              </p>
            </div>

            {sessionStatus === "checking" && (
              <p className="al-muted mt-8 text-center text-sm" role="status">
                Checking your reset link...
              </p>
            )}

            {sessionStatus === "expired" && (
              <div className="mt-8 text-center">
                <p role="alert" className="text-sm text-red-400">
                  This password reset link is invalid or has expired.
                </p>

                <Link
                  href="/auth/reset-password"
                  className="al-button-secondary mt-6 inline-flex"
                >
                  Request a new reset link
                </Link>
              </div>
            )}

            {sessionStatus === "ready" && (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label
                      htmlFor="update-password"
                      className="block text-sm font-semibold text-[var(--al-text)]"
                    >
                      New password
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
                    id="update-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    minLength={8}
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    disabled={success}
                    className="w-full rounded-2xl border border-[var(--al-border)] bg-[var(--al-bg-soft)] px-5 py-4 text-[var(--al-text)] outline-none transition placeholder:text-[var(--al-text-muted)] focus:border-[var(--al-accent)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="update-confirm-password"
                    className="mb-2 block text-sm font-semibold text-[var(--al-text)]"
                  >
                    Confirm new password
                  </label>

                  <input
                    id="update-confirm-password"
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
                    disabled={success}
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
                  disabled={loading || success}
                  className="al-button-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Updating..." : "Update Password"}
                </button>
              </form>
            )}

            {message && (
              <div
                role={messageType === "error" ? "alert" : "status"}
                className={`mt-5 rounded-2xl border p-4 text-sm ${
                  messageType === "error"
                    ? "border-red-400/40 bg-red-400/10 text-red-300"
                    : "border-[var(--al-integrate)]/40 bg-[var(--al-integrate)]/10 text-[var(--al-integrate-soft)]"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
