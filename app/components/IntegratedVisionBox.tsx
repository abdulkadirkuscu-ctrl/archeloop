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
    <div className="al-card mt-8 p-6">
      <p className="al-kicker">My Integrated Vision</p>

      <h3 className="mt-4 text-2xl font-semibold text-[var(--al-text)]">
        Imagine your Integrated Self.
      </h3>

      <p className="al-text mt-4">
        Describe how you are learning to live from your Integrated Self through
        this journey. Imagine yourself living from {integratedState} in real
        situations, relationships, choices, and moments of pressure.
      </p>

      <div className="al-soft-card mt-6 p-5">
        <p className="font-semibold text-[var(--al-accent)]">
          Reflection prompts
        </p>

        <ul className="al-text mt-4 space-y-2 text-sm leading-relaxed">
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
        className="al-textarea mt-6 disabled:opacity-70"
      />

      <div className="al-muted mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
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
                ? "al-button-primary"
                : "cursor-not-allowed border border-[var(--al-border)] bg-[var(--al-surface-deep)] text-[var(--al-text-muted)]"
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
            className="al-button-primary"
          >
            Edit My Vision
          </button>
        )}

        {saved && (
          <p className="al-badge">
            ✓ Saved to your Integration Journey.
          </p>
        )}
      </div>

      <p className="al-muted mt-5 text-sm leading-relaxed">
        Your vision is saved to your ArcheLoop account and can support your
        Triggered Pro reflections, Progress Dashboard, and Integration Journey.
      </p>
    </div>
  );
}