"use client";

import { useEffect, useState } from "react";

export default function FoundingCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    async function loadCount() {
      const res = await fetch("/api/founding-count");
      const data = await res.json();

      setCount(data.count);
      setRemaining(data.remaining);
    }

    loadCount();
  }, []);

  if (count === null || remaining === null) {
    return null;
  }

  return (
    <div className="mt-6 rounded-2xl border border-yellow-300/30 bg-yellow-300/10 p-5 text-center">
      <p className="text-yellow-300 font-semibold text-lg">
        {count} / 50 Founding Reports Claimed
      </p>

      <p className="mt-2 text-gray-300">
  {remaining} founding spots remaining.
</p>

<p className="mt-3 text-sm text-gray-400">
  First 50 reports are free in exchange for feedback.
</p>
    </div>
  );
}