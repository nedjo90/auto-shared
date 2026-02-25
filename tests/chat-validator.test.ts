import { describe, it, expect } from "vitest";
import {
  messageDeliveryStatusSchema,
  startConversationInputSchema,
  sendMessageInputSchema,
  getMessagesInputSchema,
  updateMessageStatusInputSchema,
} from "../src/validators/chat.validator";
import { CHAT_MAX_MESSAGE_LENGTH } from "../src/constants/chat";

describe("Chat Validators", () => {
  describe("messageDeliveryStatusSchema", () => {
    it("should accept valid statuses", () => {
      expect(messageDeliveryStatusSchema.safeParse("sent").success).toBe(true);
      expect(messageDeliveryStatusSchema.safeParse("delivered").success).toBe(true);
      expect(messageDeliveryStatusSchema.safeParse("read").success).toBe(true);
    });

    it("should reject invalid statuses", () => {
      expect(messageDeliveryStatusSchema.safeParse("pending").success).toBe(false);
      expect(messageDeliveryStatusSchema.safeParse("").success).toBe(false);
    });
  });

  describe("startConversationInputSchema", () => {
    it("should accept valid input", () => {
      const result = startConversationInputSchema.safeParse({
        listingId: "abc-123",
        buyerId: "user-456",
      });
      expect(result.success).toBe(true);
    });

    it("should reject empty listingId", () => {
      const result = startConversationInputSchema.safeParse({
        listingId: "",
        buyerId: "user-456",
      });
      expect(result.success).toBe(false);
    });

    it("should reject empty buyerId", () => {
      const result = startConversationInputSchema.safeParse({
        listingId: "abc-123",
        buyerId: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject missing fields", () => {
      expect(startConversationInputSchema.safeParse({}).success).toBe(false);
      expect(startConversationInputSchema.safeParse({ listingId: "abc" }).success).toBe(false);
    });

    it("should trim whitespace", () => {
      const result = startConversationInputSchema.safeParse({
        listingId: "  abc-123  ",
        buyerId: "  user-456  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.listingId).toBe("abc-123");
        expect(result.data.buyerId).toBe("user-456");
      }
    });
  });

  describe("sendMessageInputSchema", () => {
    it("should accept valid input", () => {
      const result = sendMessageInputSchema.safeParse({
        conversationId: "conv-123",
        content: "Hello, is this vehicle still available?",
      });
      expect(result.success).toBe(true);
    });

    it("should reject empty content", () => {
      const result = sendMessageInputSchema.safeParse({
        conversationId: "conv-123",
        content: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject whitespace-only content", () => {
      const result = sendMessageInputSchema.safeParse({
        conversationId: "conv-123",
        content: "   ",
      });
      expect(result.success).toBe(false);
    });

    it("should reject content exceeding max length", () => {
      const result = sendMessageInputSchema.safeParse({
        conversationId: "conv-123",
        content: "a".repeat(CHAT_MAX_MESSAGE_LENGTH + 1),
      });
      expect(result.success).toBe(false);
    });

    it("should accept content at max length", () => {
      const result = sendMessageInputSchema.safeParse({
        conversationId: "conv-123",
        content: "a".repeat(CHAT_MAX_MESSAGE_LENGTH),
      });
      expect(result.success).toBe(true);
    });
  });

  describe("getMessagesInputSchema", () => {
    it("should accept valid input with all fields", () => {
      const result = getMessagesInputSchema.safeParse({
        conversationId: "conv-123",
        cursor: "2026-02-25T10:00:00Z",
        limit: 50,
      });
      expect(result.success).toBe(true);
    });

    it("should accept input without optional fields", () => {
      const result = getMessagesInputSchema.safeParse({
        conversationId: "conv-123",
      });
      expect(result.success).toBe(true);
    });

    it("should reject limit > 100", () => {
      const result = getMessagesInputSchema.safeParse({
        conversationId: "conv-123",
        limit: 101,
      });
      expect(result.success).toBe(false);
    });

    it("should reject limit < 1", () => {
      const result = getMessagesInputSchema.safeParse({
        conversationId: "conv-123",
        limit: 0,
      });
      expect(result.success).toBe(false);
    });
  });

  describe("updateMessageStatusInputSchema", () => {
    it("should accept valid input", () => {
      const result = updateMessageStatusInputSchema.safeParse({
        conversationId: "conv-123",
        messageIds: JSON.stringify(["msg-1", "msg-2"]),
      });
      expect(result.success).toBe(true);
    });

    it("should reject empty messageIds", () => {
      const result = updateMessageStatusInputSchema.safeParse({
        conversationId: "conv-123",
        messageIds: "",
      });
      expect(result.success).toBe(false);
    });
  });
});
