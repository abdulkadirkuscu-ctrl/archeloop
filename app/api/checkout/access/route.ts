import { NextResponse } from "next/server";
import { supabaseServer } from "../../../../lib/supabaseServer";

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "");

  if (!token) {
    return NextResponse.json({
      hasReportAccess: false,
      hasIntegrationAccess: false,
    });
  }

  const {
    data: { user },
  } = await supabaseServer.auth.getUser(token);

  if (!user) {
    return NextResponse.json({
      hasReportAccess: false,
      hasIntegrationAccess: false,
    });
  }

  const { data: orders } = await supabaseServer
    .from("archeloop_orders")
    .select("product, status")
    .eq("user_id", user.id)
    .in("status", ["paid", "private_access", "founding_access"]);

  const hasReportAccess =
    orders?.some(
      (order) => order.product === "report" || order.product === "bundle"
    ) || false;

  const hasIntegrationAccess =
    orders?.some(
      (order) => order.product === "integration" || order.product === "bundle"
    ) || false;

  return NextResponse.json({
    hasReportAccess,
    hasIntegrationAccess,
  });
}