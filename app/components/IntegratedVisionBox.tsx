"use client";

import { useState } from "react";

export default function IntegratedVisionBox({
  journeySlug,
  integratedState,
}: {
  journeySlug: string;
  integratedState: string;
}) {
  const [visionText, setVisionText] = useState("");
  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(true);
  const [loading, setLoading] = useState(false);

  async function saveVision() {
    if (!visionText.trim()) {
      alert("Please write your Integrated Vision™ first.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/integrated-vision", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        journeySlug,
        visionText,
      }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Could not save your vision.");
      return;
    }

    setSaved(true);
    setEditing(false);
  }

  return (
    <div className="mt-8">
      <textarea
        value={visionText}
        onChange={(e) => setVisionText(e.target.value)}
        disabled={!editing}
        placeholder={`When I am living from ${integratedState}, I...`}
        className="min-h-[220px] w-full rounded-[2rem] border border-yellow-300/10 bg-black/40 p-6 text-stone-100 placeholder:text-stone-600 focus:border-yellow-300 focus:outline-none disabled:opacity-70"
      />

      <div className="mt-5 flex flex-wrap gap-3">
        {editing ? (
          <button
            type="button"
            onClick={saveVision}
            disabled={loading}
            className="rounded-full bg-yellow-300 px-7 py-3 font-semibold text-black transition hover:bg-yellow-200 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save My Vision™"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setEditing(true)}
            className="rounded-full bg-yellow-300 px-7 py-3 font-semibold text-black transition hover:bg-yellow-200"
          >
            Edit My Vision™
          </button>
        )}

        {saved && (
          <p className="flex items-center text-sm text-yellow-300">
            Saved to your Integration Journey™.
          </p>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-stone-500">
        Use this as your personal integration statement. Return to it whenever
        you log an activation, review your Progress Dashboard™, or practise this
        journey in real life.
      </p>
    </div>
  );
}