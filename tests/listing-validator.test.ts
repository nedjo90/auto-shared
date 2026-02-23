import { describe, it, expect } from "vitest";
import {
  listingPriceSchema,
  listingMileageSchema,
  listingDescriptionSchema,
  listingConditionSchema,
  listingTransmissionSchema,
  listingDriveTypeSchema,
  updateListingFieldSchema,
  validateListingField,
} from "../src/validators/listing.validator";

describe("listing validators", () => {
  describe("listingPriceSchema", () => {
    it("should accept valid prices", () => {
      expect(listingPriceSchema.parse(1500)).toBe(1500);
      expect(listingPriceSchema.parse(0.01)).toBe(0.01);
      expect(listingPriceSchema.parse(9999999.99)).toBe(9999999.99);
    });

    it("should reject zero", () => {
      expect(() => listingPriceSchema.parse(0)).toThrow();
    });

    it("should reject negative values", () => {
      expect(() => listingPriceSchema.parse(-100)).toThrow();
    });

    it("should reject values exceeding max", () => {
      expect(() => listingPriceSchema.parse(10000000)).toThrow();
    });
  });

  describe("listingMileageSchema", () => {
    it("should accept valid mileages", () => {
      expect(listingMileageSchema.parse(0)).toBe(0);
      expect(listingMileageSchema.parse(150000)).toBe(150000);
      expect(listingMileageSchema.parse(9999999)).toBe(9999999);
    });

    it("should reject negative values", () => {
      expect(() => listingMileageSchema.parse(-1)).toThrow();
    });

    it("should reject decimals", () => {
      expect(() => listingMileageSchema.parse(100.5)).toThrow();
    });

    it("should reject values exceeding max", () => {
      expect(() => listingMileageSchema.parse(10000000)).toThrow();
    });
  });

  describe("listingDescriptionSchema", () => {
    it("should accept valid descriptions", () => {
      const valid = "A".repeat(20);
      expect(listingDescriptionSchema.parse(valid)).toBe(valid);
    });

    it("should accept max-length descriptions", () => {
      const valid = "A".repeat(5000);
      expect(listingDescriptionSchema.parse(valid)).toBe(valid);
    });

    it("should reject too-short descriptions", () => {
      expect(() => listingDescriptionSchema.parse("Too short")).toThrow();
    });

    it("should reject too-long descriptions", () => {
      expect(() => listingDescriptionSchema.parse("A".repeat(5001))).toThrow();
    });

    it("should trim whitespace", () => {
      const padded = "  " + "A".repeat(20) + "  ";
      expect(listingDescriptionSchema.parse(padded)).toBe("A".repeat(20));
    });
  });

  describe("listingConditionSchema", () => {
    it("should accept valid conditions", () => {
      expect(listingConditionSchema.parse("Excellent")).toBe("Excellent");
      expect(listingConditionSchema.parse("Bon")).toBe("Bon");
      expect(listingConditionSchema.parse("Correct")).toBe("Correct");
      expect(listingConditionSchema.parse("A_restaurer")).toBe("A_restaurer");
    });

    it("should reject invalid conditions", () => {
      expect(() => listingConditionSchema.parse("Bad")).toThrow();
      expect(() => listingConditionSchema.parse("")).toThrow();
    });
  });

  describe("listingTransmissionSchema", () => {
    it("should accept manuelle and automatique", () => {
      expect(listingTransmissionSchema.parse("manuelle")).toBe("manuelle");
      expect(listingTransmissionSchema.parse("automatique")).toBe("automatique");
    });

    it("should reject invalid values", () => {
      expect(() => listingTransmissionSchema.parse("cvt")).toThrow();
    });
  });

  describe("listingDriveTypeSchema", () => {
    it("should accept valid drive types", () => {
      expect(listingDriveTypeSchema.parse("traction")).toBe("traction");
      expect(listingDriveTypeSchema.parse("propulsion")).toBe("propulsion");
      expect(listingDriveTypeSchema.parse("integrale")).toBe("integrale");
    });

    it("should reject invalid values", () => {
      expect(() => listingDriveTypeSchema.parse("4x4")).toThrow();
    });
  });

  describe("updateListingFieldSchema", () => {
    it("should accept valid input", () => {
      const input = {
        listingId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        fieldName: "price",
        value: "15000",
      };
      expect(updateListingFieldSchema.parse(input)).toEqual(input);
    });

    it("should reject invalid UUID", () => {
      expect(() =>
        updateListingFieldSchema.parse({
          listingId: "not-a-uuid",
          fieldName: "price",
          value: "15000",
        }),
      ).toThrow();
    });

    it("should reject empty fieldName", () => {
      expect(() =>
        updateListingFieldSchema.parse({
          listingId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
          fieldName: "",
          value: "15000",
        }),
      ).toThrow();
    });

    it("should accept empty value (for clearing)", () => {
      const input = {
        listingId: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
        fieldName: "price",
        value: "",
      };
      expect(updateListingFieldSchema.parse(input)).toEqual(input);
    });
  });

  describe("validateListingField", () => {
    it("should return null for valid price", () => {
      expect(validateListingField("price", "15000")).toBeNull();
    });

    it("should return error for invalid price", () => {
      expect(validateListingField("price", "-5")).not.toBeNull();
      expect(validateListingField("price", "abc")).not.toBeNull();
    });

    it("should return null for valid mileage", () => {
      expect(validateListingField("mileage", "50000")).toBeNull();
    });

    it("should return error for invalid mileage", () => {
      expect(validateListingField("mileage", "-1")).not.toBeNull();
      expect(validateListingField("mileage", "100.5")).not.toBeNull();
    });

    it("should return null for valid description", () => {
      expect(validateListingField("description", "A".repeat(25))).toBeNull();
    });

    it("should return error for short description", () => {
      expect(validateListingField("description", "short")).not.toBeNull();
    });

    it("should return null for valid condition", () => {
      expect(validateListingField("condition", "Excellent")).toBeNull();
      expect(validateListingField("condition", "A_restaurer")).toBeNull();
    });

    it("should return error for invalid condition", () => {
      expect(validateListingField("condition", "Invalid")).not.toBeNull();
    });

    it("should return null for valid transmission", () => {
      expect(validateListingField("transmission", "manuelle")).toBeNull();
    });

    it("should return error for invalid transmission", () => {
      expect(validateListingField("transmission", "CVT")).not.toBeNull();
    });

    it("should return null for valid driveType", () => {
      expect(validateListingField("driveType", "integrale")).toBeNull();
    });

    it("should return error for invalid driveType", () => {
      expect(validateListingField("driveType", "4WD")).not.toBeNull();
    });

    it("should return null for unknown fields (no validation)", () => {
      expect(validateListingField("unknownField", "anything")).toBeNull();
    });
  });
});
