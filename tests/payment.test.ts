import { describe, it, expect } from "vitest";
import type {
  IPaymentTransaction,
  IPublishableListing,
  IBatchTotal,
} from "../src/types/payment.js";
import {
  PAYMENT_TRANSACTION_STATUSES,
  PAYMENT_STATUS_TRANSITIONS,
  LISTING_PRICE_CONFIG_KEY,
} from "../src/constants/payment.js";
import {
  batchPublishRequestSchema,
  checkoutSessionRequestSchema,
} from "../src/validators/payment.validator.js";

describe("Payment Transaction Types", () => {
  it("should create valid IPaymentTransaction", () => {
    const tx: IPaymentTransaction = {
      ID: "tx-123",
      sellerId: "seller-456",
      stripeSessionId: "cs_test_abc",
      stripePaymentIntentId: "pi_test_xyz",
      amount: 14.97,
      currency: "EUR",
      status: "Succeeded",
      listingIds: JSON.stringify(["l1", "l2", "l3"]),
      listingCount: 3,
      processedAt: "2026-02-24T10:00:00Z",
      webhookReceivedAt: "2026-02-24T10:00:01Z",
      createdAt: "2026-02-24T09:59:00Z",
      modifiedAt: "2026-02-24T10:00:01Z",
      createdBy: "seller-456",
      modifiedBy: "system",
    };
    expect(tx.status).toBe("Succeeded");
    expect(tx.listingCount).toBe(3);
  });

  it("should create valid IPublishableListing", () => {
    const listing: IPublishableListing = {
      ID: "listing-1",
      make: "Renault",
      model: "Clio",
      year: 2020,
      visibilityScore: 85,
      photoCount: 5,
      declarationId: "decl-1",
    };
    expect(listing.visibilityScore).toBe(85);
  });

  it("should create valid IBatchTotal", () => {
    const total: IBatchTotal = {
      count: 3,
      unitPriceCents: 499,
      totalCents: 1497,
      listingIds: ["l1", "l2", "l3"],
    };
    expect(total.totalCents).toBe(total.count * total.unitPriceCents);
  });
});

describe("Payment Constants", () => {
  it("should define all transaction statuses", () => {
    expect(PAYMENT_TRANSACTION_STATUSES).toContain("Pending");
    expect(PAYMENT_TRANSACTION_STATUSES).toContain("Succeeded");
    expect(PAYMENT_TRANSACTION_STATUSES).toContain("Failed");
    expect(PAYMENT_TRANSACTION_STATUSES).toContain("Refunded");
    expect(PAYMENT_TRANSACTION_STATUSES).toHaveLength(4);
  });

  it("should define valid status transitions", () => {
    expect(PAYMENT_STATUS_TRANSITIONS["Pending"]).toContain("Succeeded");
    expect(PAYMENT_STATUS_TRANSITIONS["Pending"]).toContain("Failed");
    expect(PAYMENT_STATUS_TRANSITIONS["Succeeded"]).toContain("Refunded");
    expect(PAYMENT_STATUS_TRANSITIONS["Failed"]).toHaveLength(0);
    expect(PAYMENT_STATUS_TRANSITIONS["Refunded"]).toHaveLength(0);
  });

  it("should enforce forward-only transitions (Pending cannot go back)", () => {
    expect(PAYMENT_STATUS_TRANSITIONS["Succeeded"]).not.toContain("Pending");
    expect(PAYMENT_STATUS_TRANSITIONS["Failed"]).not.toContain("Pending");
  });

  it("should define listing price config key", () => {
    expect(LISTING_PRICE_CONFIG_KEY).toBe("LISTING_PRICE_EUR");
  });
});

describe("Payment Validators", () => {
  describe("batchPublishRequestSchema", () => {
    it("should accept valid listing IDs", () => {
      const result = batchPublishRequestSchema.safeParse({
        listingIds: [
          "550e8400-e29b-41d4-a716-446655440001",
          "550e8400-e29b-41d4-a716-446655440002",
        ],
      });
      expect(result.success).toBe(true);
    });

    it("should reject empty array", () => {
      const result = batchPublishRequestSchema.safeParse({ listingIds: [] });
      expect(result.success).toBe(false);
    });

    it("should reject non-UUID strings", () => {
      const result = batchPublishRequestSchema.safeParse({
        listingIds: ["not-a-uuid"],
      });
      expect(result.success).toBe(false);
    });

    it("should reject more than 50 listings", () => {
      const ids = Array.from(
        { length: 51 },
        (_, i) => `550e8400-e29b-41d4-a716-${String(i).padStart(12, "0")}`,
      );
      const result = batchPublishRequestSchema.safeParse({ listingIds: ids });
      expect(result.success).toBe(false);
    });
  });

  describe("checkoutSessionRequestSchema", () => {
    it("should accept valid checkout request", () => {
      const result = checkoutSessionRequestSchema.safeParse({
        listingIds: ["550e8400-e29b-41d4-a716-446655440001"],
        successUrl: "https://auto.fr/publish/success",
        cancelUrl: "https://auto.fr/publish/",
      });
      expect(result.success).toBe(true);
    });

    it("should reject invalid URLs", () => {
      const result = checkoutSessionRequestSchema.safeParse({
        listingIds: ["550e8400-e29b-41d4-a716-446655440001"],
        successUrl: "not-a-url",
        cancelUrl: "https://auto.fr/publish/",
      });
      expect(result.success).toBe(false);
    });

    it("should reject missing listingIds", () => {
      const result = checkoutSessionRequestSchema.safeParse({
        successUrl: "https://auto.fr/publish/success",
        cancelUrl: "https://auto.fr/publish/",
      });
      expect(result.success).toBe(false);
    });
  });
});
