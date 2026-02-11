import { describe, it, expect } from "vitest";
import type {
  AlertComparisonOperator,
  AlertNotificationMethod,
  AlertSeverityLevel,
  AlertMetric,
  IConfigAlert,
  IAlertEvent,
} from "../src/types/config";

const MANAGED_FIELDS = {
  createdAt: "2026-02-11T00:00:00Z",
  createdBy: "admin",
  modifiedAt: "2026-02-11T00:00:00Z",
  modifiedBy: "admin",
};

describe("Alert Types", () => {
  describe("AlertComparisonOperator", () => {
    it("should allow valid comparison operators", () => {
      const operators: AlertComparisonOperator[] = ["above", "below", "equals"];
      expect(operators).toHaveLength(3);
    });
  });

  describe("AlertNotificationMethod", () => {
    it("should allow valid notification methods", () => {
      const methods: AlertNotificationMethod[] = ["in_app", "email", "both"];
      expect(methods).toHaveLength(3);
    });
  });

  describe("AlertSeverityLevel", () => {
    it("should allow valid severity levels", () => {
      const levels: AlertSeverityLevel[] = ["info", "warning", "critical"];
      expect(levels).toHaveLength(3);
    });
  });

  describe("AlertMetric", () => {
    it("should allow all supported alert metrics", () => {
      const metrics: AlertMetric[] = [
        "margin_per_listing",
        "api_availability",
        "daily_registrations",
        "daily_listings",
        "daily_revenue",
      ];
      expect(metrics).toHaveLength(5);
    });
  });

  describe("IConfigAlert", () => {
    it("should allow creating a complete alert config", () => {
      const alert: IConfigAlert = {
        ID: "a1",
        name: "Marge critique",
        metric: "margin_per_listing",
        thresholdValue: 8,
        comparisonOperator: "below",
        notificationMethod: "both",
        severityLevel: "critical",
        enabled: true,
        cooldownMinutes: 30,
        lastTriggeredAt: null,
        ...MANAGED_FIELDS,
      };
      expect(alert.metric).toBe("margin_per_listing");
      expect(alert.comparisonOperator).toBe("below");
      expect(alert.severityLevel).toBe("critical");
      expect(alert.enabled).toBe(true);
      expect(alert.cooldownMinutes).toBe(30);
    });

    it("should allow lastTriggeredAt as a string timestamp", () => {
      const alert: IConfigAlert = {
        ID: "a2",
        name: "API down",
        metric: "api_availability",
        thresholdValue: 95,
        comparisonOperator: "below",
        notificationMethod: "in_app",
        severityLevel: "warning",
        enabled: true,
        cooldownMinutes: 60,
        lastTriggeredAt: "2026-02-11T12:00:00Z",
        ...MANAGED_FIELDS,
      };
      expect(alert.lastTriggeredAt).toBe("2026-02-11T12:00:00Z");
    });
  });

  describe("IAlertEvent", () => {
    it("should allow creating an unacknowledged alert event", () => {
      const event: IAlertEvent = {
        ID: "e1",
        alertId: "a1",
        metric: "margin_per_listing",
        currentValue: 5.5,
        thresholdValue: 8,
        severity: "critical",
        message: "Margin per listing dropped to 5.50 EUR (threshold: 8.00 EUR)",
        acknowledged: false,
        acknowledgedBy: null,
        acknowledgedAt: null,
        createdAt: "2026-02-11T12:00:00Z",
      };
      expect(event.acknowledged).toBe(false);
      expect(event.acknowledgedBy).toBeNull();
    });

    it("should allow creating an acknowledged alert event", () => {
      const event: IAlertEvent = {
        ID: "e2",
        alertId: "a1",
        metric: "margin_per_listing",
        currentValue: 5.5,
        thresholdValue: 8,
        severity: "critical",
        message: "Margin per listing dropped to 5.50 EUR",
        acknowledged: true,
        acknowledgedBy: "admin-user-id",
        acknowledgedAt: "2026-02-11T13:00:00Z",
        createdAt: "2026-02-11T12:00:00Z",
      };
      expect(event.acknowledged).toBe(true);
      expect(event.acknowledgedBy).toBe("admin-user-id");
    });
  });
});
