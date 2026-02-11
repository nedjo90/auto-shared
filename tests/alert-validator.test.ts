import { describe, it, expect } from "vitest";
import {
  configAlertInputSchema,
  alertComparisonOperatorSchema,
  alertNotificationMethodSchema,
  alertSeverityLevelSchema,
  alertMetricSchema,
} from "../src/validators/alert.validator";

describe("Alert Validators", () => {
  describe("alertMetricSchema", () => {
    it("should accept valid metrics", () => {
      expect(alertMetricSchema.safeParse("margin_per_listing").success).toBe(true);
      expect(alertMetricSchema.safeParse("api_availability").success).toBe(true);
      expect(alertMetricSchema.safeParse("daily_registrations").success).toBe(true);
      expect(alertMetricSchema.safeParse("daily_listings").success).toBe(true);
      expect(alertMetricSchema.safeParse("daily_revenue").success).toBe(true);
    });

    it("should reject invalid metrics", () => {
      expect(alertMetricSchema.safeParse("unknown_metric").success).toBe(false);
      expect(alertMetricSchema.safeParse("").success).toBe(false);
    });
  });

  describe("alertComparisonOperatorSchema", () => {
    it("should accept valid operators", () => {
      expect(alertComparisonOperatorSchema.safeParse("above").success).toBe(true);
      expect(alertComparisonOperatorSchema.safeParse("below").success).toBe(true);
      expect(alertComparisonOperatorSchema.safeParse("equals").success).toBe(true);
    });

    it("should reject invalid operators", () => {
      expect(alertComparisonOperatorSchema.safeParse("greater").success).toBe(false);
    });
  });

  describe("alertNotificationMethodSchema", () => {
    it("should accept valid methods", () => {
      expect(alertNotificationMethodSchema.safeParse("in_app").success).toBe(true);
      expect(alertNotificationMethodSchema.safeParse("email").success).toBe(true);
      expect(alertNotificationMethodSchema.safeParse("both").success).toBe(true);
    });

    it("should reject invalid methods", () => {
      expect(alertNotificationMethodSchema.safeParse("sms").success).toBe(false);
    });
  });

  describe("alertSeverityLevelSchema", () => {
    it("should accept valid levels", () => {
      expect(alertSeverityLevelSchema.safeParse("info").success).toBe(true);
      expect(alertSeverityLevelSchema.safeParse("warning").success).toBe(true);
      expect(alertSeverityLevelSchema.safeParse("critical").success).toBe(true);
    });

    it("should reject invalid levels", () => {
      expect(alertSeverityLevelSchema.safeParse("error").success).toBe(false);
    });
  });

  describe("configAlertInputSchema", () => {
    const validInput = {
      name: "Marge critique",
      metric: "margin_per_listing" as const,
      thresholdValue: 8,
      comparisonOperator: "below" as const,
      notificationMethod: "both" as const,
      severityLevel: "critical" as const,
      cooldownMinutes: 30,
    };

    it("should accept valid alert input", () => {
      const result = configAlertInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should default enabled to true", () => {
      const result = configAlertInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.enabled).toBe(true);
      }
    });

    it("should accept explicit enabled=false", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, enabled: false });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.enabled).toBe(false);
      }
    });

    it("should reject empty name", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, name: "" });
      expect(result.success).toBe(false);
    });

    it("should reject whitespace-only name", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, name: "   " });
      expect(result.success).toBe(false);
    });

    it("should reject name longer than 200 characters", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, name: "a".repeat(201) });
      expect(result.success).toBe(false);
    });

    it("should reject non-numeric thresholdValue", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, thresholdValue: "abc" });
      expect(result.success).toBe(false);
    });

    it("should reject cooldown below 1", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, cooldownMinutes: 0 });
      expect(result.success).toBe(false);
    });

    it("should reject cooldown above 10080", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, cooldownMinutes: 10081 });
      expect(result.success).toBe(false);
    });

    it("should reject fractional cooldown", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, cooldownMinutes: 5.5 });
      expect(result.success).toBe(false);
    });

    it("should reject invalid metric", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, metric: "invalid" });
      expect(result.success).toBe(false);
    });

    it("should reject invalid comparison operator", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, comparisonOperator: "gte" });
      expect(result.success).toBe(false);
    });

    it("should accept thresholdValue of 0", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, thresholdValue: 0 });
      expect(result.success).toBe(true);
    });

    it("should accept negative thresholdValue", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, thresholdValue: -5 });
      expect(result.success).toBe(true);
    });

    it("should trim whitespace from name", () => {
      const result = configAlertInputSchema.safeParse({ ...validInput, name: "  Test Alert  " });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.name).toBe("Test Alert");
      }
    });
  });
});
