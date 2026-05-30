import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const { count, error } = await supabaseServer
    .from("archeloop_reports")
    .select("*", { count: "exact", head: true });

  if (error) {
    return NextResponse.json({ count: 0 });
  }

  return NextResponse.json({
    count: count || 0,
    remaining: Math.max(50 - (count || 0), 0),
  });
}