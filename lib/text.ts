// Strips a trademark symbol (and its common encoded forms) from
// user-facing text. Some historical stored records (saved activations,
// the report-summary cookie) may have been written before the ™ symbol
// was removed from product names and could still contain it - this
// guarantees it never reaches the rendered UI without touching the
// stored data itself.
export function stripTrademark<T extends string | undefined | null>(value: T): T {
  if (!value) return value;
  return value.replace(/™|&trade;|&#8482;/gi, "").trim() as T;
}
