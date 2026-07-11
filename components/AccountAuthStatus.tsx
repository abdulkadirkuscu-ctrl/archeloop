"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseClient } from "../lib/supabaseClient";

export default function AccountAuthStatus() {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabaseClient.auth.getUser();
      setEmail(data.user?.email || null);
      setLoading(false);
    }

    loadUser();
  }, []);

  async function signOut() {
    await supabaseClient.auth.signOut();
    window.location.href = "/account";
  }

  if (loading) return null;

  if (email) {
    return (
      <section className="al-section-tight">
        <div className="al-container al-card p-8 text-center">
          <p className="al-kicker">Account Active</p>

          <h2 className="al-heading-md text-[var(--al-accent)]">
            You are logged in.
          </h2>

          <p className="al-text mt-4">
            Signed in as {email}
          </p>

          <button onClick={signOut} className="al-button-secondary mt-6">
            Log Out
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="al-section-tight">
      <div className="al-container al-card p-8 text-center">
        <p className="al-kicker">Save Your ArcheLoop Journey</p>

        <h2 className="al-heading-md text-[var(--al-accent)]">
          Create an account to keep your report, trigger history, progress, and monthly reviews.
        </h2>

        <p className="al-text mx-auto mt-4 max-w-3xl">
          Your account lets you return to your ArcheLoop Report, saved activations, Progress Dashboard, and Monthly Review from any device.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/auth/signup" className="al-button-primary">
            Create Account
          </Link>

          <Link href="/auth/login" className="al-button-secondary">
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
}