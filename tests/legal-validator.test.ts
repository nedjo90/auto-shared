import { describe, it, expect } from "vitest";
import {
  legalDocumentKeySchema,
  publishLegalVersionInputSchema,
  acceptLegalDocumentInputSchema,
} from "../src/validators/legal.validator";

describe("Legal Validators", () => {
  describe("legalDocumentKeySchema", () => {
    it("should accept all valid legal document keys", () => {
      const validKeys = ["cgu", "cgv", "privacy_policy", "legal_notices"];
      for (const key of validKeys) {
        expect(legalDocumentKeySchema.safeParse(key).success).toBe(true);
      }
    });

    it("should reject invalid keys", () => {
      expect(legalDocumentKeySchema.safeParse("invalid").success).toBe(false);
      expect(legalDocumentKeySchema.safeParse("").success).toBe(false);
      expect(legalDocumentKeySchema.safeParse("terms").success).toBe(false);
    });
  });

  describe("publishLegalVersionInputSchema", () => {
    const validInput = {
      documentId: "a1b2c3d4-e5f6-7890-abcd-ef12345c0001",
      content: "Legal document content here",
    };

    it("should accept valid minimal input", () => {
      const result = publishLegalVersionInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.summary).toBe("");
        expect(result.data.requiresReacceptance).toBe(true);
      }
    });

    it("should accept full input with all fields", () => {
      const fullInput = {
        ...validInput,
        summary: "Updated privacy section",
        requiresReacceptance: false,
      };
      const result = publishLegalVersionInputSchema.safeParse(fullInput);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.summary).toBe("Updated privacy section");
        expect(result.data.requiresReacceptance).toBe(false);
      }
    });

    it("should reject empty documentId", () => {
      const result = publishLegalVersionInputSchema.safeParse({
        ...validInput,
        documentId: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject empty content", () => {
      const result = publishLegalVersionInputSchema.safeParse({
        ...validInput,
        content: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject whitespace-only content", () => {
      const result = publishLegalVersionInputSchema.safeParse({
        ...validInput,
        content: "   ",
      });
      expect(result.success).toBe(false);
    });

    it("should reject summary exceeding 500 characters", () => {
      const result = publishLegalVersionInputSchema.safeParse({
        ...validInput,
        summary: "x".repeat(501),
      });
      expect(result.success).toBe(false);
    });

    it("should trim whitespace from fields", () => {
      const result = publishLegalVersionInputSchema.safeParse({
        documentId: "  abc-123  ",
        content: "  Content here  ",
        summary: "  Summary  ",
      });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.documentId).toBe("abc-123");
        expect(result.data.content).toBe("Content here");
        expect(result.data.summary).toBe("Summary");
      }
    });
  });

  describe("acceptLegalDocumentInputSchema", () => {
    const validInput = {
      documentId: "a1b2c3d4-e5f6-7890-abcd-ef12345c0001",
      version: 1,
    };

    it("should accept valid input", () => {
      const result = acceptLegalDocumentInputSchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it("should reject empty documentId", () => {
      const result = acceptLegalDocumentInputSchema.safeParse({
        ...validInput,
        documentId: "",
      });
      expect(result.success).toBe(false);
    });

    it("should reject version 0", () => {
      const result = acceptLegalDocumentInputSchema.safeParse({
        ...validInput,
        version: 0,
      });
      expect(result.success).toBe(false);
    });

    it("should reject negative version", () => {
      const result = acceptLegalDocumentInputSchema.safeParse({
        ...validInput,
        version: -1,
      });
      expect(result.success).toBe(false);
    });

    it("should reject non-integer version", () => {
      const result = acceptLegalDocumentInputSchema.safeParse({
        ...validInput,
        version: 1.5,
      });
      expect(result.success).toBe(false);
    });

    it("should reject missing version", () => {
      const result = acceptLegalDocumentInputSchema.safeParse({
        documentId: "abc",
      });
      expect(result.success).toBe(false);
    });
  });
});
