"use client";

import { useState } from "react";

export default function TriggeredWaitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function joinWaitlist() {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    setLoading(false);

   if (res.ok) {
  setSubmitted(true);
} else {
  const data = await res.json();
  alert(data.error || "Something went wrong");
}
  }

  if (submitted) {
    return (
      <div className="mt-16 rounded-2xl border border-gray-700 bg-black p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">
          You're on the waitlist.
        </h2>

        <p className="mt-3 text-gray-400">
          We'll let you know when I Am Triggered launches.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 rounded-2xl border border-gray-700 bg-black p-8">
      <h2 className="text-2xl font-semibold text-white">
        Join the I Am Triggered Waitlist
      </h2>

      <p className="mt-3 text-gray-400">
        ArcheLoop identifies the pattern.
        <br />
        I Am Triggered helps you interrupt it in real time.
      </p>

      <div className="mt-6 flex flex-col gap-3 md:flex-row">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-gray-600 bg-black p-3 text-white"
        />

        <button
          onClick={joinWaitlist}
          disabled={loading}
          className="rounded-lg bg-white px-6 py-3 font-medium text-black"
        >
          {loading ? "Joining..." : "Join Waitlist"}
        </button>
      </div>
    </div>
  );
}