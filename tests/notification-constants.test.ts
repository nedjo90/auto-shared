import { describe, it, expect } from "vitest";
import {
  NOTIFICATION_TYPES,
  PREFERENCE_NOTIFICATION_TYPES,
  NOTIFICATION_TYPE_LABELS,
  NOTIFICATION_HUB_NAME,
  NOTIFICATION_EVENTS,
  NOTIFICATIONS_PAGE_SIZE,
} from "../src/constants/notification";

describe("Notification Constants (Story 5-2)", () => {
  it("should define all notification types", () => {
    expect(NOTIFICATION_TYPES).toContain("price_change");
    expect(NOTIFICATION_TYPES).toContain("sold");
    expect(NOTIFICATION_TYPES).toContain("new_message");
    expect(NOTIFICATION_TYPES).toContain("new_view");
    expect(NOTIFICATION_TYPES).toContain("new_contact");
    expect(NOTIFICATION_TYPES).toContain("report_handled");
    expect(NOTIFICATION_TYPES).toContain("system");
    expect(NOTIFICATION_TYPES).toHaveLength(9);
  });

  it("should define preference notification types (no system)", () => {
    expect(PREFERENCE_NOTIFICATION_TYPES).not.toContain("system");
    expect(PREFERENCE_NOTIFICATION_TYPES).toHaveLength(8);
  });

  it("should have labels for all types", () => {
    for (const type of NOTIFICATION_TYPES) {
      expect(NOTIFICATION_TYPE_LABELS[type]).toBeDefined();
      expect(typeof NOTIFICATION_TYPE_LABELS[type]).toBe("string");
    }
  });

  it("should define hub name", () => {
    expect(NOTIFICATION_HUB_NAME).toBe("notifications");
  });

  it("should define SignalR events", () => {
    expect(NOTIFICATION_EVENTS.newNotification).toBe("notification:new");
    expect(NOTIFICATION_EVENTS.unreadCountUpdate).toBe("notification:unread-count");
  });

  it("should define page size", () => {
    expect(NOTIFICATIONS_PAGE_SIZE).toBe(20);
  });
});
