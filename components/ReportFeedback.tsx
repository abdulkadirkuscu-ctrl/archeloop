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
  const [testimonialPermission, setTestimonialPermission] = useState("");

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
        testimonialPermission,
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
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-10 text-center shadow-[0_0_70px_rgba(216,183,120,0.08)]">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Feedback Received
          </p>

          <h2 className="mt-5 text-4xl font-bold text-stone-100">
            Thank you.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-stone-300">
            Your feedback helps refine ArcheLoop™ for founding users before
            public launch.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl rounded-[2.5rem] border border-yellow-300/20 bg-gradient-to-br from-[#0B1018] via-[#050814] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.08)] md:p-10">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-yellow-300/70">
            Founding Feedback
          </p>

          <h2 className="mt-5 text-4xl font-bold text-stone-100 md:text-5xl">
            Help shape ArcheLoop™.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-relaxed text-stone-300">
            You are one of the first people experiencing the ArcheLoop Report™.
            Your feedback helps refine the system before paid public access
            begins.
          </p>
        </div>

        <div className="mt-10 rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6">
          <p className="font-semibold text-stone-100">
            How accurate was this report?
          </p>

          <div className="mt-5 grid grid-cols-5 gap-3 md:grid-cols-10">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setAccuracyScore(num)}
                className={`rounded-full border px-3 py-2 font-semibold transition ${
                  accuracyScore === num
                    ? "border-yellow-300 bg-yellow-300 text-black shadow-[0_0_30px_rgba(216,183,120,0.18)]"
                    : "border-yellow-300/10 bg-[#0B1018] text-stone-300 hover:border-yellow-300/60 hover:text-yellow-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6">
            <label className="font-semibold text-stone-100">
              What felt most accurate?
            </label>

            <textarea
              value={mostAccurate}
              onChange={(e) => setMostAccurate(e.target.value)}
              placeholder="What part of the report resonated most?"
              className="mt-4 min-h-[130px] w-full rounded-2xl border border-yellow-300/10 bg-[#030712] p-4 text-stone-100 placeholder:text-stone-600 focus:border-yellow-300 focus:outline-none"
            />
          </div>

          <div className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6">
            <label className="font-semibold text-stone-100">
              What felt unclear or less accurate?
            </label>

            <textarea
              value={leastAccurate}
              onChange={(e) => setLeastAccurate(e.target.value)}
              placeholder="What felt wrong, confusing, or less relevant?"
              className="mt-4 min-h-[130px] w-full rounded-2xl border border-yellow-300/10 bg-[#030712] p-4 text-stone-100 placeholder:text-stone-600 focus:border-yellow-300 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6">
            <p className="font-semibold text-stone-100">
              Would you recommend ArcheLoop™?
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {["Yes", "Maybe", "No"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRecommend(option)}
                  className={`rounded-full border px-5 py-2 font-semibold transition ${
                    recommend === option
                      ? "border-yellow-300 bg-yellow-300 text-black"
                      : "border-yellow-300/10 bg-[#0B1018] text-stone-300 hover:border-yellow-300/60 hover:text-yellow-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6">
            <p className="font-semibold text-stone-100">
              Can we anonymously use part of your feedback?
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {["Yes", "No"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setTestimonialPermission(option)}
                  className={`rounded-full border px-5 py-2 font-semibold transition ${
                    testimonialPermission === option
                      ? "border-yellow-300 bg-yellow-300 text-black"
                      : "border-yellow-300/10 bg-[#0B1018] text-stone-300 hover:border-yellow-300/60 hover:text-yellow-200"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6">
          <label className="font-semibold text-stone-100">
            Email optional
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-4 w-full rounded-2xl border border-yellow-300/10 bg-[#030712] p-4 text-stone-100 placeholder:text-stone-600 focus:border-yellow-300 focus:outline-none"
          />

          <p className="mt-3 text-sm text-stone-500">
            Add your email only if you are happy for us to follow up about your
            feedback.
          </p>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={submitFeedback}
            disabled={loading}
            className="rounded-full bg-yellow-300 px-8 py-4 text-lg font-semibold text-black transition hover:bg-yellow-200 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    </section>
  );
}