import { describe, it, expect } from "vitest";
import {
  LISTING_FIELDS,
  LISTING_CONDITIONS,
  FIELD_CATEGORY_LABELS,
  FIELD_CATEGORY_ORDER,
  CERTIFIABLE_FIELDS,
  DECLARED_ONLY_FIELDS,
  LISTING_VALIDATION,
} from "../src/constants/listing";
import type { FieldCategory } from "../src/constants/listing";

describe("listing constants", () => {
  describe("LISTING_FIELDS", () => {
    it("should contain all expected fields", () => {
      expect(LISTING_FIELDS.length).toBeGreaterThan(25);
    });

    it("should have unique field names", () => {
      const names = LISTING_FIELDS.map((f) => f.fieldName);
      expect(new Set(names).size).toBe(names.length);
    });

    it("should only use valid categories", () => {
      const validCategories: FieldCategory[] = [
        "vehicle_identity",
        "technical_details",
        "condition_description",
        "pricing",
        "options_equipment",
      ];
      for (const field of LISTING_FIELDS) {
        expect(validCategories).toContain(field.category);
      }
    });

    it("should only use valid field types", () => {
      for (const field of LISTING_FIELDS) {
        expect(["certifiable", "declaredOnly"]).toContain(field.fieldType);
      }
    });

    it("should have French labels for all fields", () => {
      for (const field of LISTING_FIELDS) {
        expect(field.labelFr).toBeTruthy();
        expect(field.labelFr.length).toBeGreaterThan(0);
      }
    });

    it("should mark required fields correctly", () => {
      const requiredFields = LISTING_FIELDS.filter((f) => f.required);
      const requiredNames = requiredFields.map((f) => f.fieldName);
      expect(requiredNames).toContain("make");
      expect(requiredNames).toContain("model");
      expect(requiredNames).toContain("year");
      expect(requiredNames).toContain("fuelType");
      expect(requiredNames).toContain("mileage");
      expect(requiredNames).toContain("condition");
      expect(requiredNames).toContain("description");
      expect(requiredNames).toContain("price");
    });

    it("should mark certifiable fields correctly", () => {
      const certifiable = LISTING_FIELDS.filter((f) => f.fieldType === "certifiable");
      const certNames = certifiable.map((f) => f.fieldName);
      expect(certNames).toContain("plate");
      expect(certNames).toContain("vin");
      expect(certNames).toContain("make");
      expect(certNames).toContain("model");
      expect(certNames).toContain("fuelType");
      expect(certNames).toContain("co2GKm");
    });

    it("should mark declaredOnly fields correctly", () => {
      const declared = LISTING_FIELDS.filter((f) => f.fieldType === "declaredOnly");
      const declaredNames = declared.map((f) => f.fieldName);
      expect(declaredNames).toContain("price");
      expect(declaredNames).toContain("mileage");
      expect(declaredNames).toContain("description");
      expect(declaredNames).toContain("condition");
      expect(declaredNames).toContain("options");
    });
  });

  describe("LISTING_CONDITIONS", () => {
    it("should contain 4 condition values", () => {
      expect(LISTING_CONDITIONS).toHaveLength(4);
    });

    it("should contain the expected values", () => {
      expect(LISTING_CONDITIONS).toContain("Excellent");
      expect(LISTING_CONDITIONS).toContain("Bon");
      expect(LISTING_CONDITIONS).toContain("Correct");
      expect(LISTING_CONDITIONS).toContain("A_restaurer");
    });
  });

  describe("FIELD_CATEGORY_LABELS", () => {
    it("should have French labels for all categories", () => {
      const categories: FieldCategory[] = [
        "vehicle_identity",
        "technical_details",
        "condition_description",
        "pricing",
        "options_equipment",
      ];
      for (const cat of categories) {
        expect(FIELD_CATEGORY_LABELS[cat]).toBeTruthy();
      }
    });
  });

  describe("FIELD_CATEGORY_ORDER", () => {
    it("should contain all 5 categories", () => {
      expect(FIELD_CATEGORY_ORDER).toHaveLength(5);
    });

    it("should start with vehicle_identity", () => {
      expect(FIELD_CATEGORY_ORDER[0]).toBe("vehicle_identity");
    });

    it("should end with options_equipment", () => {
      expect(FIELD_CATEGORY_ORDER[4]).toBe("options_equipment");
    });
  });

  describe("CERTIFIABLE_FIELDS / DECLARED_ONLY_FIELDS", () => {
    it("should partition all fields", () => {
      expect(CERTIFIABLE_FIELDS.length + DECLARED_ONLY_FIELDS.length).toBe(LISTING_FIELDS.length);
    });

    it("should have no overlap", () => {
      const overlap = CERTIFIABLE_FIELDS.filter((f) => DECLARED_ONLY_FIELDS.includes(f));
      expect(overlap).toHaveLength(0);
    });
  });

  describe("LISTING_VALIDATION", () => {
    it("should define price constraints", () => {
      expect(LISTING_VALIDATION.price.min).toBe(0.01);
      expect(LISTING_VALIDATION.price.max).toBe(9999999.99);
    });

    it("should define mileage constraints", () => {
      expect(LISTING_VALIDATION.mileage.min).toBe(0);
      expect(LISTING_VALIDATION.mileage.max).toBe(9999999);
    });

    it("should define description constraints", () => {
      expect(LISTING_VALIDATION.description.minLength).toBe(20);
      expect(LISTING_VALIDATION.description.maxLength).toBe(5000);
    });

    it("should define condition values", () => {
      expect(LISTING_VALIDATION.condition.values).toEqual(LISTING_CONDITIONS);
    });

    it("should define transmission values", () => {
      expect(LISTING_VALIDATION.transmission.values).toContain("manuelle");
      expect(LISTING_VALIDATION.transmission.values).toContain("automatique");
    });

    it("should define driveType values", () => {
      expect(LISTING_VALIDATION.driveType.values).toContain("traction");
      expect(LISTING_VALIDATION.driveType.values).toContain("propulsion");
      expect(LISTING_VALIDATION.driveType.values).toContain("integrale");
    });
  });
});
