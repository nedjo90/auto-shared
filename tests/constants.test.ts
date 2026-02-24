import { describe, it, expect } from "vitest";
import {
  ROLES,
  CONSENT_TYPES,
  LISTING_STATUS,
  LISTING_STATUS_TRANSITIONS,
  isValidListingTransition,
  expandRolesWithHierarchy,
} from "../src/constants/index.js";

describe("Constants", () => {
  describe("ROLES", () => {
    it("should contain all 5 defined roles", () => {
      expect(ROLES).toHaveLength(5);
      expect(ROLES).toContain("visitor");
      expect(ROLES).toContain("buyer");
      expect(ROLES).toContain("seller");
      expect(ROLES).toContain("moderator");
      expect(ROLES).toContain("administrator");
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

  describe("expandRolesWithHierarchy", () => {
    it("should return empty array for empty input", () => {
      expect(expandRolesWithHierarchy([])).toEqual([]);
    });

    it("should return only visitor for visitor role", () => {
      expect(expandRolesWithHierarchy(["visitor"])).toEqual(["visitor"]);
    });

    it("should expand buyer to include visitor", () => {
      const result = expandRolesWithHierarchy(["buyer"]);
      expect(result).toContain("visitor");
      expect(result).toContain("buyer");
      expect(result).toHaveLength(2);
    });

    it("should expand seller to include buyer and visitor", () => {
      const result = expandRolesWithHierarchy(["seller"]);
      expect(result).toEqual(["visitor", "buyer", "seller"]);
    });

    it("should expand moderator to include seller, buyer, visitor", () => {
      const result = expandRolesWithHierarchy(["moderator"]);
      expect(result).toEqual(["visitor", "buyer", "seller", "moderator"]);
    });

    it("should expand administrator to include ALL roles (FR54 super-role)", () => {
      const result = expandRolesWithHierarchy(["administrator"]);
      expect(result).toEqual(["visitor", "buyer", "seller", "moderator", "administrator"]);
    });

    it("should use highest level when multiple roles are provided", () => {
      const result = expandRolesWithHierarchy(["buyer", "moderator"]);
      expect(result).toEqual(["visitor", "buyer", "seller", "moderator"]);
    });

    it("should handle duplicate roles in input", () => {
      const result = expandRolesWithHierarchy(["seller", "seller"]);
      expect(result).toEqual(["visitor", "buyer", "seller"]);
    });
  });

  describe("LISTING_STATUS_TRANSITIONS", () => {
    it("should define transitions for all listing statuses", () => {
      for (const status of LISTING_STATUS) {
        expect(LISTING_STATUS_TRANSITIONS).toHaveProperty(status);
        expect(Array.isArray(LISTING_STATUS_TRANSITIONS[status])).toBe(true);
      }
    });

    it("should allow draft -> published", () => {
      expect(LISTING_STATUS_TRANSITIONS.draft).toContain("published");
    });

    it("should allow published -> sold and published -> archived", () => {
      expect(LISTING_STATUS_TRANSITIONS.published).toContain("sold");
      expect(LISTING_STATUS_TRANSITIONS.published).toContain("archived");
    });

    it("should allow sold -> archived", () => {
      expect(LISTING_STATUS_TRANSITIONS.sold).toContain("archived");
    });

    it("should not allow archived -> anything", () => {
      expect(LISTING_STATUS_TRANSITIONS.archived).toHaveLength(0);
    });

    it("should not allow draft -> sold directly", () => {
      expect(LISTING_STATUS_TRANSITIONS.draft).not.toContain("sold");
    });
  });

  describe("isValidListingTransition", () => {
    it("should return true for valid transitions", () => {
      expect(isValidListingTransition("draft", "published")).toBe(true);
      expect(isValidListingTransition("published", "sold")).toBe(true);
      expect(isValidListingTransition("published", "archived")).toBe(true);
      expect(isValidListingTransition("sold", "archived")).toBe(true);
    });

    it("should return false for invalid transitions", () => {
      expect(isValidListingTransition("draft", "sold")).toBe(false);
      expect(isValidListingTransition("draft", "archived")).toBe(false);
      expect(isValidListingTransition("archived", "published")).toBe(false);
      expect(isValidListingTransition("sold", "published")).toBe(false);
      expect(isValidListingTransition("archived", "draft")).toBe(false);
    });

    it("should return false for same-status transition", () => {
      expect(isValidListingTransition("published", "published")).toBe(false);
      expect(isValidListingTransition("draft", "draft")).toBe(false);
    });
  });
});
