import { notFound } from "next/navigation";
import { supabaseServer } from "../../../lib/supabaseServer";
import FullReport from "../../../components/FullReport";

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

  await supabaseServer.from("archeloop_events").insert({
    event_name: "report_viewed",
    event_value: data.report_data?.primaryLoop || null,
  });

  return <FullReport reportData={data.report_data} />;
}