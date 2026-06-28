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
      <section className="px-6 pb-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
            Account Active
          </p>

          <h2 className="mt-4 text-3xl font-bold text-yellow-300">
            You are logged in.
          </h2>

          <p className="mt-4 text-stone-300">
            Signed in as {email}
          </p>

          <button
            onClick={signOut}
            className="mt-6 rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
          >
            Log Out
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 pb-10">
      <div className="mx-auto max-w-5xl rounded-[2rem] border border-yellow-300/20 bg-[#0B1018] p-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
          Save Your ArcheLoop Journey™
        </p>

        <h2 className="mt-4 text-3xl font-bold text-yellow-300">
          Create an account to keep your report, triggers, progress, and monthly reviews.
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-stone-300">
          Your account lets you return from any device and continue your integration journey without losing your data.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/auth/signup"
            className="rounded-full bg-yellow-300 px-8 py-4 font-semibold text-black transition hover:bg-yellow-200"
          >
            Create Account
          </Link>

          <Link
            href="/auth/login"
            className="rounded-full border border-yellow-300/20 bg-black/30 px-8 py-4 font-semibold text-yellow-200 transition hover:border-yellow-300/60"
          >
            Log In
          </Link>
        </div>
      </div>
    </section>
  );
}