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

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setVision(saved);
  }, [storageKey]);

  function saveVision() {
    localStorage.setItem(storageKey, vision);
    alert("Your integrated vision has been saved.");
  }

  return (
    <div className="rounded-[2rem] border border-yellow-300/20 bg-gradient-to-br from-yellow-300/10 via-[#0B1018] to-black p-8 shadow-[0_0_70px_rgba(216,183,120,0.08)]">
      <p className="text-sm uppercase tracking-[0.3em] text-yellow-300/70">
        My Integrated Vision™
      </p>

      <h2 className="mt-4 text-3xl font-semibold">
        Imagine yourself living as {integratedState}.
      </h2>

      <p className="mt-4 leading-relaxed text-stone-300">
        Where are you? Who is with you? What are you doing? What feels
        different? Describe the version of yourself you are becoming.
      </p>

      <textarea
        value={vision}
        onChange={(event) => setVision(event.target.value)}
        placeholder={`My ${integratedState} vision is...`}
        className="mt-6 min-h-40 w-full rounded-2xl border border-yellow-300/10 bg-black/40 p-5 text-stone-100 placeholder:text-stone-600 outline-none transition focus:border-yellow-300/50"
      />

      <button
        type="button"
        onClick={saveVision}
        className="mt-5 rounded-full bg-yellow-300 px-6 py-3 font-semibold text-black transition hover:bg-yellow-200"
      >
        Save My Vision
      </button>

      <p className="mt-4 text-sm text-stone-500">
        Saved privately in your browser.
      </p>
    </div>
  );
}