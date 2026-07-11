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
      <section className="al-section-tight">
        <div className="al-container al-premium-card p-10 text-center">
          <p className="al-kicker">Feedback Received</p>

          <h2 className="al-heading-lg">Thank you.</h2>

          <p className="al-text-lg mx-auto mt-5 max-w-2xl">
            Your feedback helps refine ArcheLoop™ and improve the report experience for early users.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="al-section">
      <div className="al-container al-premium-card p-8 md:p-10">
        <div className="text-center">
          <p className="al-kicker">Report Feedback</p>

          <h2 className="al-heading-lg">Help shape ArcheLoop™.</h2>

          <p className="al-text-lg mx-auto mt-5 max-w-3xl">
            You are one of the first people experiencing the ArcheLoop Report™.
            Your feedback helps refine the system and improve the experience for future users.
          </p>
        </div>

        <div className="al-soft-card mt-10 p-6">
          <p className="font-semibold text-[var(--al-text)]">
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
                    ? "border-[var(--al-accent)] bg-[var(--al-accent)] text-[var(--al-bg)]"
                    : "border-[var(--al-border)] bg-[var(--al-surface)] text-[var(--al-text-soft)] hover:border-[var(--al-accent)]"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <FeedbackTextarea
            label="What felt most accurate?"
            value={mostAccurate}
            onChange={setMostAccurate}
            placeholder="What part of the report resonated most?"
          />

          <FeedbackTextarea
            label="What felt unclear or less accurate?"
            value={leastAccurate}
            onChange={setLeastAccurate}
            placeholder="What felt wrong, confusing, or less relevant?"
          />
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <ChoiceGroup
            label="Would you recommend ArcheLoop™?"
            options={["Yes", "Maybe", "No"]}
            value={recommend}
            onChange={setRecommend}
          />

          <ChoiceGroup
            label="Can we anonymously use part of your feedback?"
            options={["Yes", "No"]}
            value={testimonialPermission}
            onChange={setTestimonialPermission}
          />
        </div>

        <div className="al-soft-card mt-6 p-6">
          <label className="font-semibold text-[var(--al-text)]">
            Email optional
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="mt-4 w-full rounded-2xl border border-[var(--al-border)] bg-[var(--al-bg-soft)] p-4 text-[var(--al-text)] placeholder:text-[var(--al-text-muted)] outline-none transition focus:border-[var(--al-accent)]"
          />

          <p className="al-muted mt-3 text-sm">
            Add your email only if you are happy for us to follow up about your
            feedback.
          </p>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={submitFeedback}
            disabled={loading}
            className="al-button-primary disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    </section>
  );
}

function FeedbackTextarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div className="al-soft-card p-6">
      <label className="font-semibold text-[var(--al-text)]">
        {label}
      </label>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-4 min-h-[130px] w-full rounded-2xl border border-[var(--al-border)] bg-[var(--al-bg-soft)] p-4 text-[var(--al-text)] placeholder:text-[var(--al-text-muted)] outline-none transition focus:border-[var(--al-accent)]"
      />
    </div>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="al-soft-card p-6">
      <p className="font-semibold text-[var(--al-text)]">
        {label}
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full border px-5 py-2 font-semibold transition ${
              value === option
                ? "border-[var(--al-accent)] bg-[var(--al-accent)] text-[var(--al-bg)]"
                : "border-[var(--al-border)] bg-[var(--al-surface)] text-[var(--al-text-soft)] hover:border-[var(--al-accent)]"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}