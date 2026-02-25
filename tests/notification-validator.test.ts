import { describe, it, expect } from "vitest";
import {
  notificationTypeSchema,
  updateNotificationPreferenceSchema,
  registerPushSubscriptionSchema,
} from "../src/validators/notification.validator";

describe("Notification Validators (Story 5-2)", () => {
  describe("notificationTypeSchema", () => {
    it("should accept valid types", () => {
      expect(notificationTypeSchema.parse("new_message")).toBe("new_message");
      expect(notificationTypeSchema.parse("price_change")).toBe("price_change");
      expect(notificationTypeSchema.parse("system")).toBe("system");
    });

    it("should reject invalid types", () => {
      expect(() => notificationTypeSchema.parse("invalid")).toThrow();
      expect(() => notificationTypeSchema.parse("")).toThrow();
    });
  });

  describe("updateNotificationPreferenceSchema", () => {
    it("should accept valid preference input", () => {
      const input = { type: "new_message", enabled: true };
      expect(updateNotificationPreferenceSchema.parse(input)).toEqual(input);
    });

    it("should accept disabling a type", () => {
      const input = { type: "price_change", enabled: false };
      expect(updateNotificationPreferenceSchema.parse(input)).toEqual(input);
    });

    it("should reject system type (not user-configurable)", () => {
      expect(() =>
        updateNotificationPreferenceSchema.parse({ type: "system", enabled: true }),
      ).toThrow();
    });

    it("should reject missing fields", () => {
      expect(() => updateNotificationPreferenceSchema.parse({ type: "new_message" })).toThrow();
      expect(() => updateNotificationPreferenceSchema.parse({ enabled: true })).toThrow();
    });
  });

  describe("registerPushSubscriptionSchema", () => {
    it("should accept valid push subscription", () => {
      const input = {
        endpoint: "https://fcm.googleapis.com/fcm/send/12345",
        p256dhKey: "base64key",
        authKey: "authkey",
        deviceLabel: "Chrome Desktop",
      };
      expect(registerPushSubscriptionSchema.parse(input)).toEqual(input);
    });

    it("should accept without deviceLabel", () => {
      const input = {
        endpoint: "https://fcm.googleapis.com/fcm/send/12345",
        p256dhKey: "base64key",
        authKey: "authkey",
      };
      const result = registerPushSubscriptionSchema.parse(input);
      expect(result.endpoint).toBe(input.endpoint);
    });

    it("should reject invalid endpoint URL", () => {
      expect(() =>
        registerPushSubscriptionSchema.parse({
          endpoint: "not-a-url",
          p256dhKey: "key",
          authKey: "key",
        }),
      ).toThrow();
    });

    it("should reject empty keys", () => {
      expect(() =>
        registerPushSubscriptionSchema.parse({
          endpoint: "https://example.com/push",
          p256dhKey: "",
          authKey: "key",
        }),
      ).toThrow();
    });
  });
});
