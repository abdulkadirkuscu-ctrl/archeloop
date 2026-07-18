import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "../../../lib/supabaseServerClient";
import { isAdminEmail } from "../../../lib/adminAuth";
import { getAdminStatsData } from "../../../lib/adminStats";

export async function GET() {
  // Authorization check runs before any admin data is queried - reuses the
  // same Supabase session (lib/supabaseServerClient.ts) every other page in
  // this app already relies on, plus the admin email allowlist
  // (lib/adminAuth.ts). This route is reachable directly (not only via the
  // /admin page), so it must perform this check independently rather than
  // trusting the caller.
  const supabaseAuth = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "Not authorized" }, { status: 403 });
  }

  try {
    const stats = await getAdminStatsData();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Unexpected admin stats error" },
      { status: 500 }
    );
  }
}
