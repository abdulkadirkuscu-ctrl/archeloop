"use client";

export default function PrintReportLink() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="al-muted underline-offset-4 hover:underline hover:text-[var(--al-accent)]"
    >
      Save as PDF
    </button>
  );
}
