// Founder/admin authorization - distinct from product entitlements
// (lib/entitlements.ts, which governs paid Report/Integration access).
// This does not introduce a parallel auth system: identity still comes
// from the same Supabase session every other page already relies on
// (lib/supabaseServerClient.ts / lib/supabaseClient.ts). This only adds
// an authorization check - an email allowlist - on top of that existing,
// already-authenticated user.
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;

  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email.toLowerCase());
}
