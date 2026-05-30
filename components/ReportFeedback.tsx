"use client";

import { useState } from "react";

export default function ReportFeedback() {
  const [accuracyScore, setAccuracyScore] = useState<number | null>(null);
  const [mostAccurate, setMostAccurate] = useState("");
  const [leastAccurate, setLeastAccurate] = useState("");
  const [recommend, setRecommend] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submitFeedback() {
    if (!accuracyScore) {
      alert("Please choose an accuracy score.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accuracyScore,
        mostAccurate,
        leastAccurate,
        recommend,
        email,
      }),
    });

    setLoading(false);

    if (res.ok) {
  setSubmitted(true);
} else {
  const data = await res.json();
alert(data.error || "Something went wrong. Please try again.");
}
  }

  if (submitted) {
    return (
      <div className="mt-16 rounded-2xl border border-gray-700 bg-black p-8 text-center">
        <h2 className="text-2xl font-semibold text-white">Thank you.</h2>
        <p className="mt-3 text-gray-400">
          Your feedback helps shape ArcheLoop for the first founding users.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-16 rounded-2xl border border-gray-700 bg-black p-8">
      <h2 className="text-2xl font-semibold text-white">
        Help Shape ArcheLoop™
      </h2>

      <p className="mt-3 text-gray-400">
        You are one of our first founding users. Your feedback helps us improve the report before paid access begins.
      </p>

      <div className="mt-8">
        <p className="font-medium text-white">
          How accurate was this report?
        </p>

        <div className="mt-4 grid grid-cols-5 gap-2 md:grid-cols-10">
          {[1,2,3,4,5,6,7,8,9,10].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setAccuracyScore(num)}
              className={`rounded-full border px-3 py-2 ${
                accuracyScore === num
                  ? "border-white bg-white text-black"
                  : "border-gray-600 bg-black text-white"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="font-medium text-white">
          What felt most accurate?
        </label>

        <textarea
          value={mostAccurate}
          onChange={(e) => setMostAccurate(e.target.value)}
          placeholder="What part of the report resonated most?"
          className="mt-3 min-h-[100px] w-full rounded-lg border border-gray-600 bg-black p-3 text-white"
        />
      </div>

      <div className="mt-8">
        <label className="font-medium text-white">
          What felt least accurate or unclear?
        </label>

        <textarea
          value={leastAccurate}
          onChange={(e) => setLeastAccurate(e.target.value)}
          placeholder="What felt wrong, confusing, or less relevant?"
          className="mt-3 min-h-[100px] w-full rounded-lg border border-gray-600 bg-black p-3 text-white"
        />
      </div>

      <div className="mt-8">
        <p className="font-medium text-white">
          Would you recommend ArcheLoop to a friend?
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          {["Yes", "Maybe", "No"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setRecommend(option)}
              className={`rounded-full border px-5 py-2 ${
                recommend === option
                  ? "border-white bg-white text-black"
                  : "border-gray-600 bg-black text-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <label className="font-medium text-white">
          Email optional
        </label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="mt-3 w-full rounded-lg border border-gray-600 bg-black p-3 text-white"
        />
      </div>

      <button
        type="button"
        onClick={submitFeedback}
        disabled={loading}
        className="mt-8 rounded-lg bg-white px-6 py-3 font-medium text-black disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Feedback"}
      </button>
    </div>
  );
}