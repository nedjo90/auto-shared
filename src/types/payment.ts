import type { IManagedFields } from "./common.js";
import type { PaymentTransactionStatus } from "../constants/payment.js";

// ─── Payment Transaction Types (Story 3-9) ──────────────────────────────────

export interface IPaymentTransaction extends IManagedFields {
  ID: string;
  sellerId: string;
  stripeSessionId: string | null;
  stripePaymentIntentId: string | null;
  amount: number;
  currency: string;
  status: PaymentTransactionStatus;
  listingIds: string | null; // JSON array
  listingCount: number;
  processedAt: string | null;
  webhookReceivedAt: string | null;
}

export interface IPublishableListing {
  ID: string;
  make: string | null;
  model: string | null;
  year: number | null;
  visibilityScore: number;
  photoCount: number;
  declarationId: string | null;
}

export interface IBatchTotal {
  count: number;
  unitPriceCents: number;
  totalCents: number;
  listingIds: string[];
}

export interface ICheckoutSessionResult {
  sessionId: string;
  sessionUrl: string;
}

export interface IPaymentSessionStatus {
  status: PaymentTransactionStatus;
  listingCount: number;
  listings: Array<{ ID: string; status: string }>;
}
