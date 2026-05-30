import { notFound } from "next/navigation";
import { supabaseServer } from "../../../lib/supabaseServer";

export default async function SavedReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseServer
    .from("archeloop_reports")
    .select("report_data")
    .eq("id", id)
    .single();

  if (error || !data?.report_data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-700 p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
          ArcheLoop Report
        </p>

        <h1 className="mt-4 text-4xl font-semibold">
          Saved Report
        </h1>

        <p className="mt-4 text-gray-400">
          Your short report URL is working. Next we will connect this page to the full report design.
        </p>

        <pre className="mt-8 max-h-[500px] overflow-auto rounded-xl bg-gray-950 p-4 text-xs text-gray-300">
          {JSON.stringify(data.report_data, null, 2)}
        </pre>
      </div>
    </main>
  );
}