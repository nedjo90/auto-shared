// ─── Payment Constants (Story 3-9) ────────────────────────────────────────

export const PAYMENT_TRANSACTION_STATUSES = ["Pending", "Succeeded", "Failed", "Refunded"] as const;

export type PaymentTransactionStatus = (typeof PAYMENT_TRANSACTION_STATUSES)[number];

/** Valid forward transitions for payment status (immutability enforcement). */
export const PAYMENT_STATUS_TRANSITIONS: Record<string, readonly string[]> = {
  Pending: ["Succeeded", "Failed"],
  Succeeded: ["Refunded"],
  Failed: [],
  Refunded: [],
} as const;

/** Default listing publication price config key. */
export const LISTING_PRICE_CONFIG_KEY = "LISTING_PRICE_EUR";
