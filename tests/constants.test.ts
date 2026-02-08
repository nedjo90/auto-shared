import { describe, it, expect } from "vitest";
import { ROLES, CONSENT_TYPES, LISTING_STATUS } from "../src/constants/index.js";

describe("Constants", () => {
  describe("ROLES", () => {
    it("should contain all 5 defined roles", () => {
      expect(ROLES).toHaveLength(5);
      expect(ROLES).toContain("buyer");
      expect(ROLES).toContain("private_seller");
      expect(ROLES).toContain("professional_seller");
      expect(ROLES).toContain("moderator");
      expect(ROLES).toContain("admin");
    });
  });

  describe("CONSENT_TYPES", () => {
    it("should contain terms, privacy, marketing", () => {
      expect(CONSENT_TYPES).toHaveLength(3);
      expect(CONSENT_TYPES).toContain("terms");
      expect(CONSENT_TYPES).toContain("privacy");
      expect(CONSENT_TYPES).toContain("marketing");
    });
  });

  describe("LISTING_STATUS", () => {
    it("should contain all listing statuses", () => {
      expect(LISTING_STATUS).toHaveLength(7);
      expect(LISTING_STATUS).toContain("draft");
      expect(LISTING_STATUS).toContain("pending_review");
      expect(LISTING_STATUS).toContain("published");
      expect(LISTING_STATUS).toContain("rejected");
      expect(LISTING_STATUS).toContain("expired");
      expect(LISTING_STATUS).toContain("sold");
      expect(LISTING_STATUS).toContain("archived");
    });
  });
});
