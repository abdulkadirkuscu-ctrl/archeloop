// Shared entitlement check, extracted from the existing canonical logic in
// app/api/checkout/access/route.ts (also duplicated in app/trigger-history/page.tsx).
// Pure function over an already-fetched orders array - no new Supabase query.
export type OrderRecord = { product: string; status: string };

export function hasIntegrationAccess(
  orders: OrderRecord[] | null | undefined
): boolean {
  return (
    orders?.some(
      (order) => order.product === "integration" || order.product === "bundle"
    ) ?? false
  );
}
