import { describe, it, expect } from "vitest";
import {
  MESSAGE_DELIVERY_STATUSES,
  MESSAGE_STATUS_TRANSITIONS,
  isValidMessageStatusTransition,
  CHAT_MAX_MESSAGE_LENGTH,
  CHAT_MESSAGES_PAGE_SIZE,
  CHAT_CONVERSATIONS_PAGE_SIZE,
  CHAT_HUB_NAME,
  CHAT_EVENTS,
} from "../src/constants/chat";

describe("Chat Constants", () => {
  describe("MESSAGE_DELIVERY_STATUSES", () => {
    it("should contain exactly 3 statuses", () => {
      expect(MESSAGE_DELIVERY_STATUSES).toHaveLength(3);
    });

    it("should include sent, delivered, read", () => {
      expect(MESSAGE_DELIVERY_STATUSES).toContain("sent");
      expect(MESSAGE_DELIVERY_STATUSES).toContain("delivered");
      expect(MESSAGE_DELIVERY_STATUSES).toContain("read");
    });
  });

  describe("MESSAGE_STATUS_TRANSITIONS", () => {
    it("should allow sent -> delivered", () => {
      expect(MESSAGE_STATUS_TRANSITIONS.sent).toContain("delivered");
    });

    it("should allow sent -> read", () => {
      expect(MESSAGE_STATUS_TRANSITIONS.sent).toContain("read");
    });

    it("should allow delivered -> read", () => {
      expect(MESSAGE_STATUS_TRANSITIONS.delivered).toContain("read");
    });

    it("should not allow any transition from read", () => {
      expect(MESSAGE_STATUS_TRANSITIONS.read).toHaveLength(0);
    });
  });

  describe("isValidMessageStatusTransition", () => {
    it("should accept valid transitions", () => {
      expect(isValidMessageStatusTransition("sent", "delivered")).toBe(true);
      expect(isValidMessageStatusTransition("sent", "read")).toBe(true);
      expect(isValidMessageStatusTransition("delivered", "read")).toBe(true);
    });

    it("should reject invalid transitions", () => {
      expect(isValidMessageStatusTransition("delivered", "sent")).toBe(false);
      expect(isValidMessageStatusTransition("read", "sent")).toBe(false);
      expect(isValidMessageStatusTransition("read", "delivered")).toBe(false);
    });

    it("should reject self-transitions", () => {
      expect(isValidMessageStatusTransition("sent", "sent")).toBe(false);
      expect(isValidMessageStatusTransition("delivered", "delivered")).toBe(false);
      expect(isValidMessageStatusTransition("read", "read")).toBe(false);
    });
  });

  describe("Config constants", () => {
    it("should have reasonable page sizes", () => {
      expect(CHAT_MESSAGES_PAGE_SIZE).toBeGreaterThan(0);
      expect(CHAT_CONVERSATIONS_PAGE_SIZE).toBeGreaterThan(0);
    });

    it("should have a max message length", () => {
      expect(CHAT_MAX_MESSAGE_LENGTH).toBe(2000);
    });

    it("should set hub name to chat", () => {
      expect(CHAT_HUB_NAME).toBe("chat");
    });
  });

  describe("CHAT_EVENTS", () => {
    it("should use domain:action naming", () => {
      expect(CHAT_EVENTS.messageSent).toBe("chat:message-sent");
      expect(CHAT_EVENTS.messageDelivered).toBe("chat:message-delivered");
      expect(CHAT_EVENTS.messageRead).toBe("chat:message-read");
    });
  });
});
