import { describe, it, expect } from "vitest";
import {
  ROLES,
  CONSENT_TYPES,
  LISTING_STATUS,
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
});
