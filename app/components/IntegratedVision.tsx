"use client";

import { useEffect, useState } from "react";

export default function IntegratedVision({
  integratedState,
  journeyPath,
}: {
  integratedState: string;
  journeyPath: string;
}) {
  const storageKey = `archeloop-integrated-vision-${journeyPath}`;

  const [vision, setVision] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedVision = localStorage.getItem(storageKey);
    if (savedVision) setVision(savedVision);
  }, [storageKey]);

  function saveVision() {
    if (!vision.trim()) return;

    localStorage.setItem(storageKey, vision);
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.08)]">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
        My Integrated Vision
      </p>

      <h2 className="mt-4 text-3xl font-semibold text-stone-100">
        Meet your future self.
      </h2>

      <p className="mt-4 leading-relaxed text-stone-300">
        Describe the version of yourself you are becoming through the{" "}
        {journeyPath}. Imagine yourself after fully integrating this pattern.
      </p>

      <div className="mt-6 rounded-2xl border border-yellow-300/10 bg-black/30 p-5">
        <p className="font-semibold text-yellow-300">
          Reflection prompts
        </p>

        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-stone-300">
          <li>• How do you think differently?</li>
          <li>• How do you respond under pressure?</li>
          <li>• What changes in your relationships?</li>
          <li>• What does {integratedState} look like in real life?</li>
        </ul>
      </div>

      <textarea
        value={vision}
        maxLength={2000}
        onChange={(event) => setVision(event.target.value)}
        placeholder={`My ${integratedState} vision is...`}
        className="mt-6 min-h-44 w-full rounded-2xl border border-yellow-300/10 bg-black/40 p-5 text-stone-100 placeholder:text-stone-600 outline-none transition focus:border-yellow-300/50"
      />

      <div className="mt-3 flex items-center justify-between gap-4 text-sm text-stone-500">
        <p>{vision.length} / 2000</p>

        <p>Your vision can be updated at any time.</p>
      </div>

      <button
        type="button"
        onClick={saveVision}
        disabled={!vision.trim()}
        className={`mt-5 rounded-full px-6 py-3 font-semibold transition ${
          vision.trim()
            ? "bg-yellow-300 text-black hover:bg-yellow-200"
            : "cursor-not-allowed bg-yellow-300/30 text-black/40"
        }`}
      >
        Save My Vision
      </button>

      {saved && (
        <div className="mt-5 rounded-2xl border border-yellow-300/20 bg-yellow-300/10 p-4 text-yellow-200">
          ✓ Your Integrated Vision has been saved.
        </div>
      )}

      <p className="mt-4 text-sm text-stone-500">
        Your vision is stored privately on this device and can be updated at any
        time.
      </p>
    </div>
  );
}