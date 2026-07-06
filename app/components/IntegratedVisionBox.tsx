"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function loadVision() {
      const res = await fetch(
        `/api/integrated-vision?journeySlug=${encodeURIComponent(journeySlug)}`
      );

      const data = await res.json();

      if (data.visionText) {
        setVisionText(data.visionText);
        setEditing(false);
        setSaved(true);
      }
    }

    loadVision();
  }, [journeySlug]);

  async function saveVision() {
    if (!visionText.trim()) return;

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
    <div className="mt-8 rounded-[2rem] border border-yellow-300/10 bg-black/30 p-6">
      <p className="text-sm uppercase tracking-[0.25em] text-yellow-300/60">
        My Integrated Vision
      </p>

      <h3 className="mt-4 text-2xl font-semibold text-stone-100">
        Imagine your Integrated Self.
      </h3>

      <p className="mt-4 leading-relaxed text-stone-300">
  Describe how you are learning to live from your Integrated Self through
  this journey. Imagine yourself living from {integratedState} in real
  situations, relationships, choices, and moments of pressure.
</p>

      <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-[#030712] p-5">
        <p className="font-semibold text-yellow-300">Reflection prompts</p>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone-300">
          <li>• How do you think differently?</li>
          <li>• How do you respond under pressure?</li>
          <li>• What changes in your relationships?</li>
          <li>• What does {integratedState} look like in daily life?</li>
        </ul>
      </div>

      <textarea
        value={visionText}
        maxLength={2000}
        onChange={(e) => setVisionText(e.target.value)}
        disabled={!editing}
        placeholder={`When I am living from ${integratedState}, I...`}
        className="mt-6 min-h-[220px] w-full rounded-[2rem] border border-yellow-300/10 bg-black/40 p-6 text-stone-100 placeholder:text-stone-600 outline-none transition focus:border-yellow-300 disabled:opacity-70"
      />

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm text-stone-500">
        <p>{visionText.length} / 2000</p>
        <p>Your vision can be updated at any time.</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {editing ? (
          <button
            type="button"
            onClick={saveVision}
            disabled={loading || !visionText.trim()}
            className={`rounded-full px-7 py-3 font-semibold transition ${
              visionText.trim()
                ? "bg-yellow-300 text-black hover:bg-yellow-200"
                : "cursor-not-allowed bg-yellow-300/30 text-black/40"
            } disabled:opacity-60`}
          >
            {loading ? "Saving..." : "Save My Vision"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setEditing(true);
              setSaved(false);
            }}
            className="rounded-full bg-yellow-300 px-7 py-3 font-semibold text-black transition hover:bg-yellow-200"
          >
            Edit My Vision
          </button>
        )}

        {saved && (
          <p className="rounded-full border border-yellow-300/20 bg-yellow-300/10 px-5 py-3 text-sm text-yellow-200">
            ✓ Saved to your Integration Journey.
          </p>
        )}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-stone-500">
        Your vision is saved to your ArcheLoop account and can support your
        Triggered Pro reflections, Progress Dashboard, and Integration Journey.
      </p>
    </div>
  );
}